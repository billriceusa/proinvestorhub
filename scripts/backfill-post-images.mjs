#!/usr/bin/env node

/**
 * Backfill missing featured images (mainImage) on blog posts from Unsplash.
 *
 * For every published post without a mainImage.asset:
 *   1. Pick a topic-relevant Unsplash search query (cached per query).
 *   2. Choose a distinct landscape photo from the cached result pool.
 *   3. Trigger the Unsplash download endpoint (required by their API terms).
 *   4. Download the image bytes and upload them to Sanity as an asset.
 *   5. Patch the post: mainImage = { asset, alt, credit, creditUrl }.
 *
 * IDEMPOTENT + RESUMABLE: only processes posts still missing an image, so a
 * re-run continues where a prior run stopped (e.g. after a rate-limit pause).
 *
 * RATE LIMIT: the Unsplash demo tier allows 50 requests/hour. This script paces
 * itself (DELAY_MS between posts, default 80s) and, if it sees the remaining
 * budget run out, sleeps to the next hour window. ~115 posts ≈ 2.5–3 hours.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... UNSPLASH_ACCESS_KEY=... node scripts/backfill-post-images.mjs
 *   DRY_RUN=1 ... node scripts/backfill-post-images.mjs        # no writes, no Unsplash calls
 *   LIMIT=3 ... node scripts/backfill-post-images.mjs          # process at most 3 (for a test run)
 *   DELAY_MS=80000 ...                                          # pacing between posts
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g'
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY
const DRY_RUN = process.env.DRY_RUN === '1'
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : Infinity
const DELAY_MS = process.env.DELAY_MS ? Number(process.env.DELAY_MS) : 80_000
const UTM = 'utm_source=proinvestorhub&utm_medium=referral'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  apiVersion: '2026-03-14',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Topic → Unsplash search query. First matching keyword (in slug) wins.
// Queries are chosen to return clean, on-topic landscape imagery.
const TOPIC_RULES = [
  [/(flip|rehab|renovat|brrrr|arv|contractor)/, 'home renovation construction'],
  [/(dscr|hard-money|bridge|loan|financ|mortgage|refinance|heloc|lend|capital|fund|points|closing-cost)/, 'finance documents desk'],
  [/(tax|depreciation|1031|deduction|cpa|llc|liability|legal|insurance)/, 'tax documents calculator'],
  [/(wholesale|assign|off-market|buyers-list|negotiat)/, 'real estate handshake deal'],
  [/(multifamily|multi-family|apartment|duplex|triplex|syndicat|commercial|mixed-use|self-storage|mobile-home)/, 'apartment building exterior'],
  [/(short-term|vacation|airbnb|\bstr-)/, 'vacation rental home'],
  [/(tenant|landlord|property-management|eviction|section-8|screen)/, 'rental house keys'],
  [/(\bland\b|\badu\b|new-construction|\bbuild\b)/, 'suburban house land'],
  [/(market|city|cities|cap-rate|recession|cycle|analyze-real-estate-market)/, 'city skyline aerial'],
  [/(portfolio|scale|passive|wealth|roadmap|strategy|mentor|business-plan)/, 'modern house investment'],
  [/(house-hack|first-rental|first-property|beginner|start)/, 'cozy home exterior'],
  [/(note|tax-lien|crowdfund|ira|advisor|raise)/, 'investment growth chart'],
]
const FALLBACK_QUERY = 'modern house real estate'

function queryForPost(post) {
  const hay = `${post.slug || ''} ${post.title || ''}`.toLowerCase()
  for (const [re, q] of TOPIC_RULES) if (re.test(hay)) return q
  return FALLBACK_QUERY
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Cache of search results per query, plus a per-query cursor so each post in a
// cluster gets a DIFFERENT photo.
const searchCache = new Map() // query -> { photos: [], cursor: 0 }
let rateRemaining = 50

async function unsplash(url) {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } })
  const rem = res.headers.get('x-ratelimit-remaining')
  if (rem !== null) rateRemaining = Number(rem)
  if (res.status === 403 || res.status === 429) {
    console.log(`  ⚠ Unsplash rate-limited (status ${res.status}); sleeping 1 hour…`)
    await sleep(60 * 60 * 1000 + 30_000)
    return unsplash(url) // retry once after the window resets
  }
  if (!res.ok) throw new Error(`Unsplash ${res.status} for ${url}`)
  return res.json()
}

async function getPhotoFor(post) {
  const q = queryForPost(post)
  if (!searchCache.has(q)) {
    const data = await unsplash(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=30&orientation=landscape&content_filter=high`
    )
    searchCache.set(q, { photos: data.results || [], cursor: 0 })
  }
  const entry = searchCache.get(q)
  if (!entry.photos.length) throw new Error(`No Unsplash results for "${q}"`)
  const photo = entry.photos[entry.cursor % entry.photos.length]
  entry.cursor += 1
  return { photo, query: q }
}

async function main() {
  console.log(`\nBackfill Post Featured Images`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'} · delay ${DELAY_MS}ms · limit ${LIMIT}\n`)
  if (!DRY_RUN && !process.env.SANITY_API_WRITE_TOKEN) throw new Error('SANITY_API_WRITE_TOKEN required')
  if (!DRY_RUN && !UNSPLASH_KEY) throw new Error('UNSPLASH_ACCESS_KEY required')

  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**")) && !defined(mainImage.asset)]{ _id, title, "slug": slug.current } | order(publishedAt desc)`
  )
  console.log(`Posts missing a featured image: ${posts.length}\n`)

  let done = 0
  let failed = 0
  for (const post of posts) {
    if (done >= LIMIT) break
    try {
      const { photo, query } = DRY_RUN
        ? { photo: null, query: queryForPost(post) }
        : await getPhotoFor(post)

      if (DRY_RUN) {
        console.log(`  [dry] ${post.slug}  →  query "${query}"`)
        done += 1
        continue
      }

      // ToS: register the download.
      if (photo.links?.download_location) {
        await unsplash(photo.links.download_location)
      }

      // Fetch image bytes (sized for a hero).
      const imgUrl = `${photo.urls.raw}&w=1600&q=80&fm=jpg&fit=crop`
      const imgRes = await fetch(imgUrl)
      if (!imgRes.ok) throw new Error(`image fetch ${imgRes.status}`)
      const buf = Buffer.from(await imgRes.arrayBuffer())

      const asset = await client.assets.upload('image', buf, {
        filename: `${post.slug || photo.id}.jpg`,
        contentType: 'image/jpeg',
      })

      const alt = photo.alt_description || photo.description || `${query}`
      const credit = photo.user?.name || 'Unsplash'
      const creditUrl = photo.user?.links?.html ? `${photo.user.links.html}?${UTM}` : undefined

      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
            alt: alt.slice(0, 200),
            credit,
            ...(creditUrl ? { creditUrl } : {}),
          },
        })
        .commit()

      done += 1
      console.log(
        `  ✓ ${post.slug}  →  "${query}"  ·  ${credit}  ·  ${done}/${Math.min(posts.length, LIMIT)}  ·  rate left ${rateRemaining}`
      )
    } catch (err) {
      failed += 1
      console.log(`  ✗ ${post.slug}  →  ${err.message}`)
    }

    if (done < Math.min(posts.length, LIMIT)) await sleep(DELAY_MS)
  }

  console.log(`\nDone. Backfilled ${done}, failed ${failed}. Re-run to retry any failures.\n`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
