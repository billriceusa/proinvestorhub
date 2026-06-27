/**
 * The root layout title template is now `%s` (no brand suffix) so that search
 * engines append the site name to SERP titles exactly once. Some page titles —
 * CMS `seo.metaTitle` values and hand-written `metaTitle`s in data — still ship
 * with a trailing "| ProInvestorHub", which would re-introduce the doubled
 * "… | ProInvestorHub | ProInvestorHub" once the engine appends its own.
 *
 * normalizeTitle strips that trailing brand suffix so the raw <title> stays
 * brand-free. Pass the result as `metadata.title`.
 */
export function normalizeTitle(t?: string | null): string | undefined {
  if (!t) return undefined
  return t.replace(/\s*[|–—-]\s*ProInvestorHub\s*$/i, '').trim() || undefined
}
