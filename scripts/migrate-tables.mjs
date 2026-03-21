#!/usr/bin/env node

/**
 * Migrate blockquote blocks that contain markdown table syntax (pipe-delimited)
 * into simpleTable objects in Sanity.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... node scripts/migrate-tables.mjs
 *   DRY_RUN=1 SANITY_API_WRITE_TOKEN=sk-... node scripts/migrate-tables.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-14',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const DRY_RUN = process.env.DRY_RUN === '1'

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * Check if a block's text looks like a markdown table (pipe-delimited rows).
 */
function looksLikeTable(text) {
  if (!text || !text.includes('|')) return false
  // Split on — (em dash) which is how the tables appear to be flattened,
  // or on newlines if present
  const parts = text.includes('\n')
    ? text.split('\n').filter((l) => l.trim())
    : text.split(' — ').filter((l) => l.trim())
  // Need at least a header + 1 data row worth of pipe-delimited content
  // Check for multiple pipe characters suggesting columns
  const pipeCount = (text.match(/\|/g) || []).length
  return pipeCount >= 3 && parts.length >= 2
}

/**
 * Parse pipe-and-dash-delimited text into table rows.
 * Handles two formats:
 * 1. Standard markdown: "| H1 | H2 |\n|---|---|\n| C1 | C2 |"
 * 2. Flattened with em dashes: "H1: V1 | V2 — H2: V3 | V4 — ..."
 */
function parseTableText(text) {
  // Try standard markdown table first
  if (text.includes('\n')) {
    const lines = text.split('\n').filter((l) => l.trim())
    if (lines.length >= 2 && lines[0].includes('|')) {
      const rows = []
      for (const line of lines) {
        if (/^\|?[\s-:|]+\|?$/.test(line)) continue // skip separator
        const cells = line
          .split('|')
          .map((c) => c.trim())
          .filter((_, i, arr) => i > 0 && i < arr.length)
        if (cells.length > 0) {
          rows.push({ _key: randomKey(), cells })
        }
      }
      if (rows.length >= 2) return rows
    }
  }

  // Try flattened format: "Key: Val1 | Val2 — Key2: Val3 | Val4"
  if (text.includes(' — ') && text.includes('|')) {
    const segments = text.split(' — ').filter((s) => s.trim())
    if (segments.length >= 2) {
      // Check if first segment has the header pattern "Header1 | Header2 | Header3"
      const firstSegment = segments[0]
      if (firstSegment.includes('|') && !firstSegment.includes(':')) {
        // First segment is the header row
        const headerCells = firstSegment.split('|').map((c) => c.trim())
        const rows = [{ _key: randomKey(), cells: headerCells }]
        for (let i = 1; i < segments.length; i++) {
          const seg = segments[i]
          // Format: "Label: Val1 | Val2"
          const colonIdx = seg.indexOf(':')
          if (colonIdx > -1) {
            const label = seg.slice(0, colonIdx).trim()
            const values = seg.slice(colonIdx + 1).split('|').map((c) => c.trim())
            rows.push({ _key: randomKey(), cells: [label, ...values] })
          } else {
            const cells = seg.split('|').map((c) => c.trim())
            rows.push({ _key: randomKey(), cells })
          }
        }
        return rows
      }

      // All segments are "Key: Value" pairs — convert to 2-column table
      const rows = [{ _key: randomKey(), cells: ['Feature', 'Details'] }]
      for (const seg of segments) {
        const colonIdx = seg.indexOf(':')
        if (colonIdx > -1) {
          const key = seg.slice(0, colonIdx).trim()
          const val = seg.slice(colonIdx + 1).trim()
          rows.push({ _key: randomKey(), cells: [key, val] })
        } else {
          rows.push({ _key: randomKey(), cells: [seg.trim(), ''] })
        }
      }
      if (rows.length >= 3) return rows
    }
  }

  return null
}

async function main() {
  console.log(`\nMigrate Table Blocks`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`)

  // Find all posts and glossary terms with body content
  const docs = await client.fetch(
    `*[_type in ["post", "glossaryTerm"] && defined(body)]{ _id, _type, title, body }`
  )

  console.log(`Found ${docs.length} documents to check\n`)

  let totalMigrated = 0

  for (const doc of docs) {
    if (!doc.body || !Array.isArray(doc.body)) continue

    const newBody = []
    let changed = false

    for (const block of doc.body) {
      // Only check block-type items (not images, partnerCta, etc.)
      if (block._type !== 'block') {
        newBody.push(block)
        continue
      }

      // Get the full text of the block
      const text = (block.children || []).map((c) => c.text || '').join('')

      if (looksLikeTable(text)) {
        const rows = parseTableText(text)
        if (rows && rows.length >= 2) {
          console.log(`  [TABLE] "${doc.title}" — converting block to table (${rows.length} rows)`)
          newBody.push({
            _type: 'simpleTable',
            _key: block._key || randomKey(),
            rows,
          })
          changed = true
          continue
        }
      }

      newBody.push(block)
    }

    if (changed) {
      totalMigrated++
      if (!DRY_RUN) {
        await client.patch(doc._id).set({ body: newBody }).commit()
        console.log(`  ✓ Updated: ${doc.title}`)
      } else {
        console.log(`  [DRY RUN] Would update: ${doc.title}`)
      }
    }
  }

  console.log(`\nDone. ${totalMigrated} documents ${DRY_RUN ? 'would be' : 'were'} updated.`)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
