/**
 * fix-broken-calculator-links.mjs
 *
 * One-time remediation: earlier AI-generated posts link to calculator URLs that
 * don't exist (the cron prompt listed wrong paths — fixed in src/lib/cron/ai-content.ts).
 * This rewrites the broken hrefs in published post bodies to the correct routes.
 *
 * Usage:
 *   node --env-file=.env.local scripts/fix-broken-calculator-links.mjs           # dry run
 *   node --env-file=.env.local scripts/fix-broken-calculator-links.mjs --apply   # write changes
 *
 * Requires SANITY_API_WRITE_TOKEN in env (lives in Vercel prod / .env.local).
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

// Broken path -> correct route. Keys are exact path segments; matched as substrings
// of the href so both relative ("/calculators/cash-flow") and absolute
// ("https://proinvestorhub.com/calculators/cash-flow") forms are handled.
// None of these keys is a substring of a valid route, so plain replace is safe.
const REWRITES = {
  '/calculators/cash-flow': '/calculators/rental-cashflow',
  '/calculators/rental-property': '/calculators/rental-cashflow',
  '/calculators/house-flip': '/calculators/fix-flip',
  '/calculators/rehab-estimator': '/calculators/fix-flip',
  '/calculators/roi': '/calculators/cash-on-cash',
}

function fixHref(href) {
  if (typeof href !== 'string') return href
  let next = href
  for (const [broken, correct] of Object.entries(REWRITES)) {
    if (next.includes(broken)) next = next.split(broken).join(correct)
  }
  return next
}

async function main() {
  console.log(DRY_RUN ? '🔍 DRY RUN — pass --apply to write changes\n' : '✍️  APPLYING changes\n')

  const posts = await client.fetch(
    `*[_type == "post" && defined(body)]{ _id, "slug": slug.current, body }`
  )

  let postsChanged = 0
  let linksFixed = 0

  for (const post of posts) {
    let postTouched = false
    const newBody = post.body.map((block) => {
      if (!block || !Array.isArray(block.markDefs)) return block
      const newMarkDefs = block.markDefs.map((md) => {
        if (!md || typeof md.href !== 'string') return md
        const fixed = fixHref(md.href)
        if (fixed !== md.href) {
          linksFixed++
          postTouched = true
          return { ...md, href: fixed }
        }
        return md
      })
      return postTouched ? { ...block, markDefs: newMarkDefs } : block
    })

    if (postTouched) {
      postsChanged++
      console.log(`  ${post.slug}`)
      if (!DRY_RUN) {
        await client.patch(post._id).set({ body: newBody }).commit()
      }
    }
  }

  console.log(`\n${DRY_RUN ? 'Would fix' : 'Fixed'} ${linksFixed} link(s) across ${postsChanged} post(s).`)
  if (DRY_RUN) console.log('Re-run with --apply to commit changes.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
