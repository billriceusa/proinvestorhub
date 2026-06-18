/**
 * The root layout sets a title template of `%s | ProInvestorHub`. Some page
 * titles — CMS `seo.metaTitle` values and hand-written `metaTitle`s in data —
 * already include that brand suffix, which produced doubled titles like
 * "… | ProInvestorHub | ProInvestorHub".
 *
 * normalizeTitle strips a trailing brand suffix so the template appends it
 * exactly once. Pass the result as `metadata.title`.
 */
export function normalizeTitle(t?: string | null): string | undefined {
  if (!t) return undefined
  return t.replace(/\s*[|–—-]\s*ProInvestorHub\s*$/i, '').trim() || undefined
}
