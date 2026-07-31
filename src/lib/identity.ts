/**
 * Canonical Bill Rice identity — mirrored copy. Do not edit in isolation.
 *
 * Source of truth: ~/Code/_shared-docs/bill-rice-identity.md
 * Reference implementation: billrice.com/src/lib/identity.ts
 *
 * billrice.com holds the authoritative DESCRIPTION of the person. This site
 * emits a REFERENCE node carrying the same @id, so crawlers resolve one entity
 * instead of a site-local duplicate. Describe the *relationship* here (role on
 * this site, what he's known for in this niche) — never a competing bio,
 * sameAs list, or `url`.
 */

/** One URI for the person, on every domain. Never re-mint this per site. */
export const BILL_RICE_ID = 'https://billrice.com/#person'

/** The person's own canonical page — schema.org `url`, not a sameAs entry. */
export const BILL_RICE_URL = 'https://billrice.com'

/** Name as it appears in bylines, for matching CMS-authored content. */
export const BILL_RICE_NAME = 'Bill Rice'

/**
 * Identity profiles only. Entries 1-5 verified 2026-07-29; substack.com/@billrice
 * verified and added 2026-07-31 as the only edge to the anonymous Person
 * node Substack emits on every theleadbrief.com post.
 * Note the canonical LinkedIn form: www + trailing slash.
 */
export const BILL_RICE_SAME_AS = [
  'https://www.wikidata.org/wiki/Q139037772',
  'https://www.linkedin.com/in/billrice/',
  'https://x.com/billrice',
  'https://www.youtube.com/@billricestrategy',
  'https://medium.com/@billrice',
  'https://substack.com/@billrice',
] as const

/** The reference node this site emits in place of a local Person description. */
export const billRicePersonRef = {
  '@type': 'Person',
  '@id': BILL_RICE_ID,
  name: BILL_RICE_NAME,
  url: BILL_RICE_URL,
  sameAs: [...BILL_RICE_SAME_AS],
}

/** Reference-by-id, for author / founder / publisher slots. */
export const billRiceRef = { '@id': BILL_RICE_ID }
