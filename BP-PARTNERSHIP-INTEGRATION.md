# BiggerPockets Partnership Integration — Implementation Notes & Lessons Learned

> Completed March 15, 2026. Documents the full implementation of the BiggerPockets referral partnership on ProInvestorHub, including architecture decisions, what worked, what didn't, and next steps.

---

## What Was Built

A referral CTA system that drives traffic from ProInvestorHub articles to BiggerPockets' professional finder verticals (lenders, agents, tax pros, financial advisors, property managers). BiggerPockets tracks referrals via UTM parameters and pays per qualified lead.

### Components

| File | Purpose |
|------|---------|
| `src/lib/partner-links.ts` | Centralized config for 5 BP verticals + UTM link builder |
| `src/components/partner-cta.tsx` | `PartnerCTA` (inline) and `PartnerCTAGroup` (bottom-of-article) |
| `src/sanity/schemaTypes/partner-cta.ts` | Sanity object schema so editors can insert CTAs in article bodies |
| `src/sanity/schemaTypes/block-content.ts` | Updated to include `partnerCta` in the array |
| `src/components/portable-text.tsx` | Renders `partnerCta` blocks inside portable text |
| `src/components/analytics.tsx` | GA4 direct tracking fallback alongside existing GTM |
| `src/app/(site)/blog/[slug]/page.tsx` | `PartnerCTAGroup` added below every article body |

### Sanity Content

5 high-intent articles published, each with a topic-matched inline CTA:

1. **How to Find an Investor-Friendly Real Estate Agent in 2026** → agents vertical
2. **DSCR Loans Explained: Complete Guide (2026)** → lenders vertical
3. **How to Find a Real Estate CPA** → tax vertical
4. **When Should You Hire a Property Manager?** → property-managers vertical
5. **Do You Need a Financial Advisor for RE Investing?** → finance vertical

---

## UTM Tracking Schema

All outbound links follow this pattern:

```
https://www.biggerpockets.com/business/finder/{vertical}
  ?utm_source=proinvestorhub
  &utm_medium=referral
  &utm_campaign=bp-finder-{vertical}
  &utm_content={inline-cta|bottom-cta}
  &utm_term={article-slug}
```

BiggerPockets can filter by `utm_source=proinvestorhub` to see all referral traffic, then drill down by vertical, placement type, and source article.

---

## Analytics Setup

- **GTM dataLayer**: All CTA clicks push a `bp_referral_click` event with `bp_vertical`, `cta_placement`, `article_slug`, and `destination_url`
- **GA4 fallback**: If `NEXT_PUBLIC_GTM_ID` is not set, GA4 loads directly via `NEXT_PUBLIC_GA_MEASUREMENT_ID` (G-W64237445E)
- **Key Event**: `bp_referral_click` marked as a key event in GA4 for conversion tracking

### Vercel Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-W64237445E` | GA4 measurement ID |
| `NEXT_PUBLIC_GTM_ID` | (set if using GTM) | Takes priority over direct GA4 |

---

## Lessons Learned

### 1. Always start from the deployed codebase

The local repo had diverged significantly from what was deployed on Vercel (3 local commits vs 28 on GitHub). The local version used `/posts/` routes while the live site used `/blog/`. This caused wasted work building against the wrong codebase. **Always `git fetch origin` and verify you're on the correct branch before starting work.**

### 2. Sanity schema must be deployed to cloud before patching documents

Attempting to append `partnerCta` blocks to article bodies failed with `_type must be one of "block,image"` until the schema was deployed via the MCP `deploy_schema` tool. The Sanity Content Lake validates mutations against the deployed schema, not local code. **Deploy schema changes before attempting content mutations that use new types.**

### 3. Sanity CLI auth vs MCP auth are separate

`npx sanity schema deploy` failed with 401 (missing `sanity.project/deployStudio` grant), but the Sanity MCP `deploy_schema` tool worked fine with its own auth. **When CLI auth fails, the MCP tool is a viable alternative for schema deployment.**

### 4. GTM and GA4 serve different roles — don't duplicate

The deployed site already had GTM. Adding GA4 gtag directly alongside GTM would cause double-counting. The solution: GA4 only loads when GTM is NOT configured (`if (!GA_MEASUREMENT_ID || GTM_ID) return null`). **Check existing analytics infrastructure before adding new tracking.**

### 5. PR merge timing matters for multi-commit branches

The GA4 fallback commit was pushed to the PR branch but the PR was merged before GitHub picked it up, resulting in only the first commit being included. **Push all commits before requesting merge, or verify all commits appear in the PR.**

### 6. Use `dataLayer.push()` for event tracking — it works for both GTM and GA4

The existing codebase tracked `cta_click` events via `dataLayer.push()`. Using the same pattern for `bp_referral_click` ensures events are captured regardless of whether GTM or direct GA4 is configured. **Standardize on dataLayer for event tracking in codebases that may use either GTM or GA4.**

### 7. Sanity `create_documents_from_markdown` is powerful but fragile

Creating articles via the Sanity MCP worked well for 4 of 5 articles, but the financial advisor article failed on first attempt due to markdown parsing issues (double-dashes, tables). Retrying with simplified markdown succeeded. **Keep markdown simple when using `create_documents_from_markdown` — avoid complex tables and special characters.**

---

## Next Steps

1. **Add partner CTAs to existing articles** — the 30+ existing articles don't have inline CTAs yet. Use Sanity Studio to insert `partnerCta` blocks into the body of high-traffic articles.
2. **Monitor `bp_referral_click` conversions** — check GA4 weekly to see which articles and verticals drive the most clicks. Double down on high-performers.
3. **A/B test CTA copy** — the `heading` and `description` fields in the Sanity schema allow per-article customization. Test different messaging.
4. **Add CTAs to calculator pages** — the DSCR calculator, mortgage calculator, etc. are natural fits for the lenders vertical CTA.
5. **Sitemap 500 error** — the sitemap.xml returns 500 on production. This is a pre-existing issue unrelated to this integration. Investigate the Sanity client connection in `src/app/sitemap.ts`.
6. **Content velocity** — publish 2-3 new high-intent articles per week targeting keywords that map to BP verticals (e.g., "hard money lenders near me", "1031 exchange qualified intermediary").
