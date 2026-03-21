#!/usr/bin/env node

/**
 * AI-Powered Glossary Enrichment
 * Uses Claude to generate rich body content for glossary terms missing body content.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... SANITY_API_WRITE_TOKEN=sk-... node scripts/enrich-glossary-ai.mjs
 *
 * Options:
 *   DRY_RUN=1        Preview without writing to Sanity
 *   BATCH_SIZE=10    Number of terms to process per run (default: 10)
 *   OFFSET=0         Skip first N empty terms (for resuming)
 */

import { createClient } from '@sanity/client'
import Anthropic from '@anthropic-ai/sdk'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-14',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const DRY_RUN = process.env.DRY_RUN === '1'
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '10', 10)
const OFFSET = parseInt(process.env.OFFSET || '0', 10)

// Portable Text helpers (matches existing enrich-glossary-batch pattern)
function h2(slug, n, text) {
  return {
    _type: 'block',
    _key: `${slug}-b${n}`,
    style: 'h2',
    children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
  }
}

function p(slug, n, text) {
  return {
    _type: 'block',
    _key: `${slug}-b${n}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

const SYSTEM_PROMPT = `You are writing educational content for ProInvestorHub, a real estate investing education platform. Write as a knowledgeable mentor explaining concepts to beginner-to-intermediate investors.

Rules:
- Write 500-800 words of expert-level educational content
- Use clear, direct language — no jargon without explanation
- Include specific numbers, formulas, or frameworks when applicable
- You may use hypothetical examples (e.g., "Let's say you find a property listed at $250K...") but NEVER present them as real personal experiences. Do not write "I once bought..." or "A client of mine..." — we do not lie.
- Structure the content with 4-6 sections, each with an H2 heading followed by 1-2 paragraphs
- Make content practical and actionable — readers should be able to use what they learn immediately
- Reference how this concept connects to other investing concepts when relevant

Output format: Return ONLY a JSON array of section objects. Each object has "heading" (string) and "body" (string — one or two paragraphs, can be long). No markdown, no code fences, just the JSON array.

Example output:
[
  {"heading": "What Is [Term]?", "body": "Explanation paragraph..."},
  {"heading": "The Formula", "body": "Formula and worked example..."},
  {"heading": "Why It Matters for Investors", "body": "Practical significance..."},
  {"heading": "Practical Tips", "body": "Actionable advice..."}
]`

async function generateBodyContent(term, definition, category) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    temperature: 0.7,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Write educational body content for this real estate investing glossary term:

Term: ${term}
Definition: ${definition}
Category: ${category}

Generate 4-6 sections covering: what it is, how it works (formula if applicable), why investors care, practical examples (hypothetical only), and actionable tips. Return ONLY a JSON array.`,
      },
    ],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude')
  }

  let jsonText = textBlock.text.trim()
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  return JSON.parse(jsonText)
}

function sectionsToPortableText(slug, sections) {
  const blocks = []
  let blockNum = 1

  for (const section of sections) {
    blocks.push(h2(slug, blockNum++, section.heading))
    // Split body into paragraphs if it contains double newlines
    const paragraphs = section.body.split('\n\n').filter((p) => p.trim())
    for (const para of paragraphs) {
      blocks.push(p(slug, blockNum++, para.trim()))
    }
  }

  return blocks
}

async function main() {
  console.log(`\n📚 Glossary AI Enrichment`)
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`)
  console.log(`   Batch size: ${BATCH_SIZE}, Offset: ${OFFSET}\n`)

  // Fetch all glossary terms
  const allTerms = await client.fetch(
    `*[_type == "glossaryTerm"] | order(term asc) {
      _id, term, "slug": slug.current, definition, category,
      "hasBody": defined(body) && length(body) > 0
    }`
  )

  const emptyTerms = allTerms.filter((t) => !t.hasBody)
  const batch = emptyTerms.slice(OFFSET, OFFSET + BATCH_SIZE)

  console.log(`   Total terms: ${allTerms.length}`)
  console.log(`   Terms with body: ${allTerms.length - emptyTerms.length}`)
  console.log(`   Terms needing enrichment: ${emptyTerms.length}`)
  console.log(`   Processing this batch: ${batch.length} (offset ${OFFSET})\n`)

  if (batch.length === 0) {
    console.log('✅ No terms to process. All done!')
    return
  }

  let success = 0
  let failed = 0

  for (let i = 0; i < batch.length; i++) {
    const term = batch[i]
    const num = OFFSET + i + 1
    console.log(
      `[${num}/${emptyTerms.length}] Generating: "${term.term}" (${term.category})...`
    )

    try {
      const sections = await generateBodyContent(
        term.term,
        term.definition,
        term.category
      )

      const blocks = sectionsToPortableText(term.slug, sections)

      if (DRY_RUN) {
        console.log(`   ✓ Generated ${sections.length} sections, ${blocks.length} blocks`)
        console.log(
          `   Sections: ${sections.map((s) => s.heading).join(' | ')}`
        )
      } else {
        await client
          .patch(term._id)
          .set({ body: blocks })
          .commit()
        console.log(
          `   ✓ Patched: ${sections.length} sections, ${blocks.length} blocks`
        )
      }

      success++
    } catch (err) {
      console.error(`   ✗ Failed: ${err.message}`)
      failed++
    }

    // Rate limit: wait between API calls
    if (i < batch.length - 1) {
      await sleep(1500)
    }
  }

  console.log(`\n📊 Results:`)
  console.log(`   Success: ${success}`)
  console.log(`   Failed: ${failed}`)
  console.log(
    `   Remaining: ${emptyTerms.length - OFFSET - batch.length}`
  )

  if (emptyTerms.length > OFFSET + BATCH_SIZE) {
    console.log(
      `\n💡 Run again with OFFSET=${OFFSET + BATCH_SIZE} to process the next batch`
    )
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
