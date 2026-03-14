/**
 * add-crosslinks.mjs
 *
 * Scans all blog post body blocks for glossary term mentions and converts
 * the FIRST occurrence of each term into a Portable Text link pointing to
 * /glossary/{slug}.
 *
 * Usage:
 *   node --env-file=.env.local scripts/add-crosslinks.mjs          # dry run
 *   node --env-file=.env.local scripts/add-crosslinks.mjs --apply  # apply changes
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-12',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const DRY_RUN = !process.argv.includes('--apply')

if (DRY_RUN) {
  console.log('🔍 DRY RUN — pass --apply to write changes\n')
}

// ── Fetch all glossary terms ──────────────────────────────────────
const glossaryTerms = await client.fetch(
  `*[_type == "glossaryTerm" && defined(slug.current)] | order(length(term) desc) {
    term,
    "slug": slug.current
  }`
)

console.log(`Loaded ${glossaryTerms.length} glossary terms`)

// Build lookup: normalize term text → slug
// Sort by length desc so longer terms match first (e.g. "cash-on-cash return" before "cash")
const termMap = glossaryTerms.map((t) => ({
  pattern: new RegExp(`\\b(${escapeRegex(t.term)})\\b`, 'i'),
  term: t.term,
  slug: t.slug,
  href: `/glossary/${t.slug}`,
}))

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ── Fetch all posts ──────────────────────────────────────────────
const posts = await client.fetch(
  `*[_type == "post" && defined(body)] { _id, title, "slug": slug.current, body }`
)

console.log(`Processing ${posts.length} posts...\n`)

let totalLinksAdded = 0
const transaction = client.transaction()
let patchCount = 0

for (const post of posts) {
  const linkedSlugs = new Set() // track which terms we've already linked in this post
  let postLinksAdded = 0

  // First pass: find which terms already have links in the body
  for (const block of post.body || []) {
    if (block._type !== 'block') continue
    for (const child of block.children || []) {
      if (child.marks && child.marks.length > 0) {
        // Check if this span has an existing link mark
        for (const mark of block.markDefs || []) {
          if (mark._type === 'link' && mark.href?.startsWith('/glossary/')) {
            const existingSlug = mark.href.replace('/glossary/', '')
            linkedSlugs.add(existingSlug)
          }
        }
      }
    }
  }

  // Second pass: add links for unlinked terms
  const newBody = (post.body || []).map((block) => {
    if (block._type !== 'block') return block
    if (block.style === 'h2' || block.style === 'h3' || block.style === 'h4') return block

    let modified = false
    const newMarkDefs = [...(block.markDefs || [])]
    const newChildren = []

    for (const child of block.children || []) {
      if (child._type !== 'span' || !child.text || (child.marks && child.marks.length > 0)) {
        newChildren.push(child)
        continue
      }

      let text = child.text
      let segments = [{ text, linked: false }]

      for (const entry of termMap) {
        if (linkedSlugs.has(entry.slug)) continue

        const newSegments = []
        let matched = false

        for (const seg of segments) {
          if (seg.linked || matched) {
            newSegments.push(seg)
            continue
          }

          const match = seg.text.match(entry.pattern)
          if (match) {
            matched = true
            linkedSlugs.add(entry.slug)

            const idx = match.index
            const matchedText = match[1]

            if (idx > 0) {
              newSegments.push({ text: seg.text.slice(0, idx), linked: false })
            }
            newSegments.push({ text: matchedText, linked: true, href: entry.href, term: entry.term })
            if (idx + matchedText.length < seg.text.length) {
              newSegments.push({ text: seg.text.slice(idx + matchedText.length), linked: false })
            }
          } else {
            newSegments.push(seg)
          }
        }

        segments = newSegments
      }

      // Convert segments back to spans
      if (segments.length === 1 && !segments[0].linked) {
        newChildren.push(child)
      } else {
        modified = true
        let spanIdx = 0
        for (const seg of segments) {
          if (seg.linked) {
            const markKey = `gl${block._key}${spanIdx}`
            newMarkDefs.push({
              _type: 'link',
              _key: markKey,
              href: seg.href,
            })
            newChildren.push({
              _type: 'span',
              _key: `${child._key}g${spanIdx}`,
              text: seg.text,
              marks: [markKey],
            })
            postLinksAdded++
          } else {
            newChildren.push({
              _type: 'span',
              _key: `${child._key}g${spanIdx}`,
              text: seg.text,
              marks: [],
            })
          }
          spanIdx++
        }
      }
    }

    if (modified) {
      return { ...block, children: newChildren, markDefs: newMarkDefs }
    }
    return block
  })

  if (postLinksAdded > 0) {
    console.log(`  ${post.title}: +${postLinksAdded} glossary links`)
    totalLinksAdded += postLinksAdded

    if (!DRY_RUN) {
      transaction.patch(post._id, { set: { body: newBody } })
      patchCount++
    }
  } else {
    console.log(`  ${post.title}: (no new links needed)`)
  }
}

console.log(`\nTotal: ${totalLinksAdded} glossary links to add across ${posts.length} posts`)

if (!DRY_RUN && patchCount > 0) {
  console.log(`\nCommitting ${patchCount} patches...`)
  await transaction.commit()
  console.log('Done!')
} else if (DRY_RUN) {
  console.log('\nRe-run with --apply to commit changes.')
}
