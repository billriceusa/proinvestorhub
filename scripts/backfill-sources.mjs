#!/usr/bin/env node

/**
 * Backfill sources/references on existing blog posts using AI.
 *
 * For each post without sources, extracts the body text, sends it to Claude
 * to identify factual claims and find authoritative primary sources, then
 * patches the post with the sources array.
 *
 * Features:
 * - Resumable: skips posts that already have sources
 * - Rate-limited: 1-second delay between API calls
 * - Dry run mode: preview without writing
 * - Batch size control
 *
 * Usage:
 *   node scripts/backfill-sources.mjs                    # process all posts
 *   DRY_RUN=1 node scripts/backfill-sources.mjs          # preview only
 *   BATCH_SIZE=10 node scripts/backfill-sources.mjs      # limit to 10 posts
 *   START_AT=20 node scripts/backfill-sources.mjs        # skip first 20
 */

import { createClient } from '@sanity/client'
import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'

const DRY_RUN = process.env.DRY_RUN === '1'
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '0', 10) || Infinity
const START_AT = parseInt(process.env.START_AT || '0', 10) || 0

// Sanity client using CLI auth token
const sanityConfig = JSON.parse(
  readFileSync(`${process.env.HOME}/.config/sanity/config.json`, 'utf-8')
)
const client = createClient({
  projectId: 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-14',
  token: sanityConfig.authToken,
  useCdn: false,
})

// Anthropic client
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Extract plain text from Portable Text body
 */
function bodyToText(body) {
  if (!body || !Array.isArray(body)) return ''
  return body
    .filter((b) => b._type === 'block')
    .map((block) => {
      const style = block.style || 'normal'
      const text = (block.children || []).map((c) => c.text || '').join('')
      if (style === 'h2' || style === 'h3' || style === 'h4') {
        return `\n## ${text}\n`
      }
      return text
    })
    .join('\n\n')
}

/**
 * Ask Claude to identify sources for factual claims in the article
 */
async function findSourcesForArticle(title, bodyText) {
  const prompt = `Analyze this real estate investing article and identify all factual claims, statistics, data points, rate benchmarks, regulatory references, and market data. For each one, find the most authoritative PRIMARY source URL.

## Article Title
${title}

## Article Text
${bodyText}

## Source Selection Rules
- ALWAYS cite the original/primary source, not a secondary aggregator
- Prefer in this order:
  1. Government data: Federal Reserve (FRED), Census Bureau, BLS, HUD, FHFA, IRS publications
  2. GSE data: Fannie Mae, Freddie Mac surveys/reports
  3. Industry associations: NAR (nar.realtor), MBA, NAHB
  4. Academic/research: Harvard Joint Center for Housing Studies, Urban Institute
  5. Market data: Zillow Research, Redfin Data Center, CoreLogic, ATTOM Data
  6. Legal/regulatory: State statutes, IRS.gov, CFPB
  7. Financial media: WSJ, Bloomberg
- Use REAL, known URLs for these organizations. Use the most specific page/report URL you can.
- If you cannot find a specific authoritative URL for a claim, omit it — do NOT make up URLs
- Target 5-15 sources per article

Respond with ONLY valid JSON (no markdown, no code fences):
{
  "sources": [
    {
      "title": "Descriptive title of the source/report/page",
      "url": "https://...",
      "publisher": "Organization name"
    }
  ]
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response')
  }

  let text = textBlock.text.trim()
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  const parsed = JSON.parse(text)
  return parsed.sources || []
}

async function main() {
  console.log(`\nBackfill Sources on Blog Posts`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Batch size: ${BATCH_SIZE === Infinity ? 'all' : BATCH_SIZE}`)
  console.log(`Start at: ${START_AT}\n`)

  // Fetch all posts without sources (or with empty sources)
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current) && defined(body)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      body,
      "hasSourcesAlready": defined(sources) && count(sources) > 0
    }`
  )

  const needsSources = posts.filter((p) => !p.hasSourcesAlready)
  console.log(`Total posts: ${posts.length}`)
  console.log(`Already have sources: ${posts.length - needsSources.length}`)
  console.log(`Need sources: ${needsSources.length}\n`)

  const toProcess = needsSources.slice(START_AT, START_AT + BATCH_SIZE)
  console.log(`Processing ${toProcess.length} posts (starting at index ${START_AT})...\n`)

  let successCount = 0
  let errorCount = 0
  const today = new Date().toISOString().split('T')[0]

  for (let i = 0; i < toProcess.length; i++) {
    const post = toProcess[i]
    const idx = START_AT + i + 1
    const bodyText = bodyToText(post.body)

    if (!bodyText || bodyText.length < 200) {
      console.log(`  [${idx}] SKIP (too short): ${post.title}`)
      continue
    }

    try {
      console.log(`  [${idx}/${START_AT + toProcess.length}] Processing: ${post.title}`)
      const sources = await findSourcesForArticle(post.title, bodyText)

      if (!sources || sources.length === 0) {
        console.log(`    → No sources found, skipping`)
        continue
      }

      console.log(`    → Found ${sources.length} sources`)

      if (!DRY_RUN) {
        const sanitySource = sources.map((s) => ({
          _type: 'source',
          _key: randomKey(),
          title: s.title,
          url: s.url,
          publisher: s.publisher,
          dateAccessed: today,
        }))

        await client.patch(post._id).set({ sources: sanitySource }).commit()
        console.log(`    ✓ Saved`)
      } else {
        for (const s of sources.slice(0, 3)) {
          console.log(`    - ${s.title} (${s.publisher})`)
        }
        if (sources.length > 3) console.log(`    ... and ${sources.length - 3} more`)
      }

      successCount++
    } catch (err) {
      errorCount++
      console.log(`    ✗ Error: ${err.message || err}`)
    }

    // Rate limit: wait between API calls
    if (i < toProcess.length - 1) {
      await sleep(1500)
    }
  }

  console.log(`\nDone!`)
  console.log(`  Processed: ${successCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log(`  ${DRY_RUN ? '(DRY RUN — no changes written)' : ''}`)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
