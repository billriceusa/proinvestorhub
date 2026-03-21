#!/usr/bin/env node

/**
 * Set Bill Rice as author on all posts missing an author reference.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... node scripts/set-author-all-posts.mjs
 *   DRY_RUN=1 SANITY_API_WRITE_TOKEN=sk-... node scripts/set-author-all-posts.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-14',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const DRY_RUN = process.env.DRY_RUN === '1'
const AUTHOR_ID = 'author-bill-rice'

async function main() {
  console.log(`\nSet Author on All Posts`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`)

  // Verify the author exists
  const author = await client.fetch(`*[_id == $id][0]{ _id, name }`, { id: AUTHOR_ID })
  if (!author) {
    console.error(`Author ${AUTHOR_ID} not found in Sanity. Run seed script first.`)
    process.exit(1)
  }
  console.log(`Author: ${author.name} (${author._id})`)

  // Find posts without an author
  const postsWithoutAuthor = await client.fetch(
    `*[_type == "post" && !defined(author)] { _id, title }`
  )

  // Find posts that have an author (for reporting)
  const postsWithAuthor = await client.fetch(
    `*[_type == "post" && defined(author)] { _id }`
  )

  console.log(`\nPosts with author: ${postsWithAuthor.length}`)
  console.log(`Posts without author: ${postsWithoutAuthor.length}\n`)

  if (postsWithoutAuthor.length === 0) {
    console.log('All posts already have an author assigned.')
    return
  }

  let success = 0
  for (const post of postsWithoutAuthor) {
    if (DRY_RUN) {
      console.log(`[DRY RUN] Would set author on: "${post.title}"`)
    } else {
      await client
        .patch(post._id)
        .set({
          author: {
            _type: 'reference',
            _ref: AUTHOR_ID,
          },
        })
        .commit()
      console.log(`Set author on: "${post.title}"`)
    }
    success++
  }

  console.log(`\nDone. ${success} posts ${DRY_RUN ? 'would be' : ''} updated.`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
