# ProInvestorHub Backlog

> Prioritized work items for proinvestorhub.com. Pick up the top unchecked P0, mark it in-progress, ship it, check it off.
>
> **Reference:** `~/Documents/_projects/_shared-docs/lead-gen-patterns.md` for design patterns and standards.

---

## 2026-07-14 — Portfolio Performance Report priority anchor
<!-- added 2026-07-14 — cross-portfolio prioritization from the BRSG Portfolio Performance Report (daily) -->

**Report snapshot (2026-07-14 daily):** 405 sessions (+142.9%), **1 conv**.

**Portfolio rank: TIER 3 (deferred).** Read the 405 sessions as **non-decision-grade** — they're the unidentified, non-organic Direct/referral traffic flagged in the Stability watch below (only 1 real GSC click). Lead capture is already built (exit-intent + drip + segmentation shipped), so **the "1 conv" is NOT a CRO gap** — it's a traffic-quality + measurement problem. Do not build conversion features against traffic that isn't real. Work these existing items, in order:

1. **Measurement first — finish the GA4 attribution + key-event cleanup** (P1 below, "unblocks all measurement"): import the GTM container, mark Key Events, enable bot + referral exclusion. Fleet checklist: `../_shared-docs/ga4-attribution-cleanup-checklist.html`. Until this is done, every number in this report is non-decision-grade for PIH.
2. **Fix mobile LCP on `/` (6.1s) and `/calculators` (5.8s)** (P0 Traffic below) — the two top entry points render "poor"; mobile is what's indexed.
3. **Push "cap rate calculator" to page 1** (P1 below) — vol 14,000, currently pos ~14–20; the single biggest latent organic unlock on the site.
4. **Run the broken-calculator-link remediation** (P2 below) — ~20 published posts link to dead calculator URLs (root cause fixed; needs the one-time script run). A real broken conversion mechanism.

*Defensive, batch with the fleet disavow work: the PBN-disavow item (P1 below).*

---

## 2026-07-14 — Active sprint (this session focus)
<!-- added 2026-07-14 /brsg-session — Bill promoted these to the top of the queue -->

Promoted to the top of the queue and being worked this session (in order). Detailed items still live in P1/P2 below — this is the running focus list.

1. ✅ **DONE 2026-07-14 — `[Technical]` Host + crawl hygiene** — sitemap `<lastmod>` 82 → **1,235 of 1,408 URLs** (real git-derived dates, honest); `www`→apex 308 confirmed clean. → P2 Technical (details).
2. 🟡 **MOSTLY DONE 2026-07-14 — `[Traffic — quality/a11y]` Color-contrast pass** — utility greys darkened to AA (`text-light`→#707070, `text-muted`→#666666), verified live. **Remaining:** the accent-gold *usage* fix (small text on white / borderline on primary) — flagged, brand-sensitive. → P2.
3. ✅ **DONE 2026-07-14 — `[Trust/freshness]` Real `lastReviewed` on lender/compare data** — honest auto-refreshing stamp shipped (`content-freshness.ts`): explicit `lastReviewed` → "Reviewed", else git data-change date → "Updated". Optional per-record field added for a future rate-verification pass. → P2.
4. ✅ **DONE 2026-07-14 — `[Traffic — proven template]` Expand lender head-to-head compares** — +2 grounded Upright (Fund That Flip) compares (26 → 28), filling the one real brand gap. Top matchups now built; further expansion is low-demand/thin-risk — the real lever is authority (PR system). → P1.
5. **`[Traffic — biggest single unlock]` Push "cap rate calculator" to page 1** — internal-linking + on-page + a11y are done; the remaining lever is **authority + external links**, which is exactly what the new **PR & Backlink Sourcing System** is built to supply. → P1. *Blocked on the PR system (or manual outreach) — not a code task.*

**New consolidated system:** the former "disavow the PBN profile" (defense) + "earn quality links" (offense) P1 items are now merged into one buildable **PR & Backlink Sourcing System** (P1 below) — sourcing → contact enrichment (Apollo/scrape) → outreach/tracking → disavow hygiene loop, with a path to a BRSG org-level app.

---

## P0 — Do Next

### Conversion & Lead Capture
- [x] Exit-intent modal — mouse-toward-top (desktop) + rapid scroll-up (mobile) triggers lead magnet offer, localStorage 7-day cooldown after dismiss or submit
- [x] Email segmentation at signup — add one qualifying question ("What's your experience level?") to newsletter signup flow, store as Resend contact metadata, branch drip sequences

### Email Automation
- [x] Connect drip to Resend automation — drip 1-2 scheduled at signup via `scheduledAt`, drip 3-5 via daily cron `/api/cron/send-drip` (11 AM UTC)

### SEO Audit P0 — 2026-06-19 (/website-audit) <!-- added 2026-06-19 /website-audit -->
Re-audit of the 2026-06-13 findings + new issues. Full report: `~/website-audits/proinvestorhub.com-2026-06-19.html`. **Snapshot (28d → 2026-06-18):** GSC 989 impressions → **1 click**, avg pos 34; GA4 ~71 *organic* sessions (Bing 39 > Yahoo 13 > Google 12) + 12 AI-assistant sessions; DR 13 (spam-inflated); 1,390 indexable URLs. Foundations are excellent (rich Dataset/FAQPage schema, clean robots/sitemap, self-canonicals, no thin content) — the binding constraints are **SERP CTR, mobile speed on the two hub pages, and trustworthy measurement.** Items below are ordered by impact on the primary goals (traffic, then conversion). Tags: `[Traffic]` `[Conversion]` `[Both]`.
- [x] **`[Traffic — sitewide CTR]` Stop Google doubling the brand in SERP titles.** <!-- shipped 2026-06-27 /brsg-session --> Two root causes fixed and verified in the build's rendered `<title>` output: (a) root layout `title.template` was `%s | ProInvestorHub` → changed to `%s` so raw titles carry no brand and the engine appends the site name exactly once (`src/app/layout.tsx`); (b) **9 static pages** hard-coded the brand in their top-level `metadata.title` (lenders, lenders/finder, lenders/compare, start-here, markets, markets/states, calculators/cap-rate/cities, calculators/compare, authors/bill-rice) — stripped. `normalizeTitle` still strips brand from CMS/data titles (doc updated). Homepage keeps its intentional brand-leading title via `default`; studio (noindexed) left as-is. Trade-off: titles now rely on engine auto-append, so Bing/browser-tab titles show no brand suffix (acceptable — domain/favicon shows, og:site_name carries brand for social). **Still verify in live SERP after redeploy + reindex.** *(Source: WebSearch SERP on Park Place/Griffin/BRRRR + raw curl `<title>`.)*
- [x] **`[Traffic — top entry points]` Fix mobile LCP on `/` (6.1s) and `/calculators` (5.8s).** Google "poor" (>4s); mobile is what's indexed. `/calculators/cap-rate` renders at 2.3s on the same stack, so this is a per-page hero/render-blocking problem, not a platform limit. Preload/prioritize the LCP hero element, defer non-critical JS (~200–227 KiB unused on the hubs). Effort **M**. Target <2.5s mobile. *(Source: PageSpeed lab, mobile.)*
  - <!-- 2026-07-03 /brsg-session --> **RESOLVED — no longer reproduces; the 6.1s/5.8s numbers are stale (2026-06-19).** Re-measured the live prod pages under mobile throttling (4× CPU + Slow-4G, 412px viewport, cold cache per run — matching Lighthouse-mobile's profile). Median LCP: **`/` = 1.37s** (runs 1.33/1.48/1.37) · **`/calculators` = 1.39s** (1.34/1.39/1.41) · **`/calculators/cap-rate` = 1.47s** — all comfortably under the 2.5s "good" line. **On every page LCP == FCP**, and the LCP element is above-the-fold **text** (hero `<p>`/`<h1>`), not an image — so there's nothing to `priority`/preload and no font-block (next/font already defaults to `display:swap`). TTFB 120–238ms (all three are `○` statically prerendered — verified in `next build`). Root-cause of the old number: the 2026-06-19 lab run predated the late-June perf/metadata work and/or was a cold-serverless single-run anomaly; there is no per-page code defect. **Verify method caveat:** CDP *applied* throttling reads a touch more optimistically than Lighthouse *simulated* throttling, so a Google PSI run may land somewhat higher — but nowhere near 6s, and the structural signals (LCP=FCP, text LCP, low TTFB) are decisive. No code shipped — the correct outcome was to disprove the defect, not optimize a page that already passes. The unused-JS trim (measured **277 KB / 21 files** on `/`) stays a P2 TBT/INP item below, not an LCP blocker.

### Stability watch — 2026-06-29 automation bundle <!-- added 2026-06-29 /brsg-session -->
- **[CRITICAL per bundle] Non-organic traffic is unidentified + fragile.** 163 sessions/week but **0 organic GSC clicks** → all traffic is direct/referral/social from an unknown source that could vanish before it's ever measured. Resolved by the GA4 measurement work in P1 (identify the source in Traffic acquisition). Until then, treat session counts as non-decision-grade.
- **WoW deceleration:** 28d ≈ 48 sessions/day → 7d ≈ 23/day. Monitor; don't act until measurement is trustworthy.

---

## P1 — Soon

### Content System
- [x] Learning callout Sanity schema — new `callout` block type (key-concept, pro-tip, warning, example) with Lucide icons + colored left border in portable-text renderer
- [x] Sanity `inlineCta` block type — editors can place lead-magnet, newsletter, calculator, or lender-finder CTAs anywhere in article body
- [x] Guides as distinct content type — Sanity `guide` schema with difficulty, guideType, keyTakeaways, own template at `/guides/[slug]`, refactored listing page
- [x] Strategy comparison content — 6 comparison guides (BRRRR vs Buy-and-Hold, House Hacking vs Rental, etc.) via AI generation endpoint
- [x] Blog category page pagination — `/blog/category/[slug]` paginated at 12 posts per page

### SEO & Schema
- [x] FAQ schema on blog posts — `FAQPage` JSON-LD auto-extracted from H2/H3 headings containing "?" with following paragraph text as answers
- [x] HowTo schema on guide/how-to content — auto-detects step patterns in blog posts, adds HowTo JSON-LD
- [x] Site-wide search — `/search` page querying blog, glossary, newsletter. Search icon in header. WebSite SearchAction updated.

### Engagement
- [x] City page calculator embeds — pre-filled cap rate calculator link with city's median home price, rent, vacancy, tax data
- [x] Start-here sticky step nav — horizontal sticky nav bar with numbered steps, scroll-aware active highlighting
- [x] Calculator embed codes — collapsible embed code generator on all 9 calculators with iframe snippet + attribution backlink

### SEO Audit P1 — 2026-06-19 (/website-audit) <!-- added 2026-06-19 /website-audit; refreshes & supersedes the 2026-06-13 open items -->
- [x] Fix GA4 attribution load strategy — `lazyOnload` → `afterInteractive` so the referrer-bearing pageview fires on bounce. <!-- shipped 2026-06-13 -->
- [ ] **`[Both — unblocks all measurement]` Finish the GA4 attribution + key-event cleanup.** Sessions are still **91% "Direct"** (1,022 of 1,126) and the 8.5× MoM spike is **not corroborated by GSC** (impressions flat 895→989), so it's bot/referrer-loss, not real growth — session *and* conversion numbers are not decision-grade until this is fixed. Do: (a) GA4 Admin → enable bot-traffic exclusion + review referral-exclusion list; (b) confirm GTM (`GTM-5J446HT5`) GA4 page_view tag keeps `page_referrer` on all loads (DebugView); (c) **wire real key events** — email capture, calculator Save-Results, lender click-out, report dataset-download — only **3** key events fired in 28d, so the funnel is invisible. Fleet-wide BRSG pattern (agedleadsales too). Effort **S–M**.
  - <!-- 2026-06-29 /brsg-session --> **Code side is DONE — verified all 4 event families already push to dataLayer** (`newsletter_signup`/`lead_capture`/`lender_finder_email_capture`/`calculator_results_save` for leads; `bp_referral_click`/`lender_cta_click`/`tool_referral_click` for outbound; report download = `markets_interaction`). GA4 loads *through* GTM (`analytics.tsx` nulls the direct GA4 tag when `GTM_ID` is set), so the "only 3 key events" gap is GTM→GA4 mapping, not missing client code. **Staged deliverable:** `docs/analytics/gtm-container-proinvestorhub.json` (import-ready — maps the events → GA4 `generate_lead` + `partner_outbound_click`) + `docs/analytics/measurement-plan.md` (import + GA4-admin checklist). **Remaining = UI-only (Bill):** import container → mark the 2 as Key Events → GA4 Admin bot/referral-exclusion → identify the non-organic source in Traffic acquisition. (My MCP is 403 on the BRSG GA4 prop.)
- [ ] **`[Traffic — biggest single unlock]` Push "cap rate calculator" to page 1.** 298 impr/28d at pos ~14–20 (Ahrefs vol 14,000); `/calculators/cap-rate` already pulls 672 impr — the one term with real ranked demand. On-page is strong and already internally linked; blockers are authority + CTR. Add exact-anchor "cap rate calculator" links from the highest-traffic posts + sibling calcs, fix the page's unlabeled form inputs (a11y), pursue 2–3 quality links to the URL. Effort **S–M**. <!-- 2026-06-27 /brsg-session --> **Internal-linking lever is exhausted — verified live: 115 of 121 posts already link to `/calculators/cap-rate`, plus all sibling calculators, markets, hub, start-here, and resources (keyword-matched anchors).** The remaining blockers are purely **authority (DR 13) + external links** — internal links can't move this further (consistent with the 2026-06-05 "don't bulk-edit posts at DR 13" call). Open sub-items that *are* still actionable: the cap-rate form a11y labels, and 1 trivial gap (`cap-rate-compression-explained` post doesn't link the calculator — left unpatched; ~0 SEO value, not worth a fragile Portable-Text edit).
  - <!-- 2026-07-14 /brsg-session --> **Cap-rate form a11y labels — DONE (shipped in the site-wide calculator a11y sweep, see P2 below).** Every input on `/calculators/cap-rate` now carries a programmatic accessible name (8 text inputs via `useId`+`htmlFor`/`id`, the vacancy slider via `aria-label`) — verified 0 unlabeled controls post-hydration with Playwright. Removes the Lighthouse/axe "form elements without labels" hit on the page being pushed to page 1. The remaining lever stays **authority (DR 13) + external links**.
- [x] **`[Traffic]` Shorten the over-60-char titles + over-160 meta descriptions.** <!-- shipped 2026-06-27 /brsg-session --> Re-measured first (the 2026-06-19 numbers predated PR #64's title fixes): titles were mostly already fine. Trimmed: `/reports/rental-yield` title 66→60 + meta 168→159; `/reports/investor-lenders` meta 214→148; `/financing` meta ~230→145. `/blog/dscr-loans-explained` needed nothing — its Sanity `seo.metaTitle` already renders at 60 char (the "78" was the old `title` field). *(Source: computed lengths in-repo + live Sanity query.)*
- [ ] **`[Traffic — authority]` PR & Backlink Sourcing System** *(consolidates the former "disavow the PBN profile" defense + "earn quality links" offense into one buildable system)* <!-- consolidated 2026-07-14 /brsg-session -->

  **Why one system:** link *hygiene* (disavow) and link *acquisition* (digital PR / outreach) are two halves of one authority function. They share a data model — referring domains, prospect domains, contacts, outreach state — and one goal: move DR 13 up honestly and defend it. Running them together removes duplicate refdomain pulls and lets a single contact-enrichment pipeline serve both.

  **Grounding (live Ahrefs, 2026-07-14):**
  - proinvestorhub: **369 live referring domains / 714 backlinks, DR 13.** Proven competitor **kiavi.com: 2,418 refdomains / 72,561 backlinks** (~6.5× our refdomains) — *the gap is the prospect pool.*
  - **The profile is mostly spam:** the entire DR 0–39 tail (~285 of 369 domains) is Ahrefs `is_spam=true` PBN — recognizable networks on `*.store` (`*seoexpress*`, `*link-baron*`, `*rank-forge*`, `*outrank-hq*`) and `*.shop` SEO-tool clusters; only ~22 legitimate domains sit in that tail. **Programmatically filterable** via Ahrefs `is_spam` + TLD/name patterns — the disavow file can be auto-generated.

  **System components:**
  1. **Sourcing (opportunity discovery):**
     - *Backlink-gap* — domains linking to competitors (kiavi, lima-one, civic, roc, rcn, new-silver) but not to us (Ahrefs `all-backlinks` / gap).
     - *Unlinked brand mentions* — sites naming us with no link (Ahrefs Brand Radar / content search).
     - *Data-journalism targets* — pitch the original-data reports (HMDA "Most Active Lenders", rental-yield, rent-growth — all carry Dataset/DataDownload schema) to journalists, REI newsletters, niche communities. Those + the 17 calculators (embed codes shipped) are our natural linkable assets.
     - *Resource-page / roundup / broken-link* prospecting on REI + investor-financing keywords.
  2. **Contact enrichment:** for each prospect domain, resolve the right human + verified email — **Apollo.io API** (by domain + role: editor / content lead / SEO) as primary; **web-scrape** the site (about/team/contact pages, author bylines) as fallback. Verify deliverability before outreach.
  3. **Outreach & tracking:** per-opportunity-type templated-but-personalized pitches, follow-up cadence, response / link-won tracking. Candidate store: GHL (already our CRM) or a dedicated table; measure links acquired against GSC + Ahrefs.
  4. **Disavow hygiene loop (defense):** recurring Ahrefs refdomains export → auto-classify spam (`is_spam` + `*.store`/`*.shop` PBN patterns + low-DR tail) → maintain + submit `disavow.txt` in GSC → re-check on a cadence. First pass: the ~285-domain spam tail above.

  **Build path:**
  - *Phase 1 (now, per-site script):* pull gap + refdomains via the Ahrefs MCP → emit (a) a disavow file for the spam tail and (b) a ranked prospect list; Apollo-enrich contacts; output to CSV / Sanity-backed tracker. Run proinvestorhub first.
  - *Phase 2 (BRSG org-level app, `apps/brsg/`):* multi-tenant PR & backlink CRM across all BRSG-owned sites — shared prospect DB with cross-site dedupe, outreach queue, disavow management, reporting. This is **shared BRSG infrastructure** (lives in the BRSG scope, serves every owned site; ties into the "fleet disavow" note in the priority anchor). *Needs an Apollo API key; Ahrefs MCP + GHL + GSC already available.*

  **Guardrails:** genuine value-first outreach only — no spam that would recreate the very profile we're disavowing; no fabricated data in pitches ([[shared/feedback_no_fabricated_data]]); the data reports are the honest hook. Effort **L (system build; ongoing operation)**.
- [ ] **`[Traffic — proven template]` Expand the lender head-to-head compare set.** `/lenders/compare/lima-one-vs-civic-financial` already sits at **pos 7.3** and `/lenders/reviews/griffin-funding` at pos 23.6 — the 652-page lenders cluster is the second cluster gaining traction. Build more high-intent "X vs Y" investor-lender compares where the template already reaches page 1. Effort **M**. <!-- in progress 2026-06-27 /brsg-session --> **Added 9 brand-name matchups (17 → 26 compares), all data-grounded + build-verified** (`src/data/lender-comparisons.ts`). Batch 1: `kiavi-vs-corevest`, `lima-one-vs-roc-capital`, `roc-capital-vs-rcn-capital`, `kiavi-vs-civic-financial`. Batch 2: `kiavi-vs-griffin-funding`, `lima-one-vs-new-silver`, `new-silver-vs-rcn-capital`, `visio-lending-vs-lendency`, `angel-oak-vs-visio-lending`. Brought two prior orphans (**Roc Capital**, **Lendency**) into the link graph; `kiavi-vs-griffin-funding` targets our existing branded "griffin funding" demand (pos 24). metaTitles kept ≤60 char before brand. Remaining uncompared lenders are lower-brand (Upright/Fund-That-Flip, Aloha, OfferMarket).
  - <!-- 2026-07-14 /brsg-session --> **+2 Upright compares (26 → 28).** Filled the one real brand gap: **Upright (formerly Fund That Flip)** — a recognized fix-and-flip brand with genuine "X vs Fund That Flip" demand — had zero compares. Added `kiavi-vs-upright` and `groundfloor-vs-upright`, both grounded in the actual lender data (shared loan types are true intersections; angles synthesized from real credit floors/LTV/model). **Correction:** the `arrived` data slug is **NOT a bug to clean** — `lenders.ts:509` documents it's deliberately kept to preserve the live `/lenders/reviews/arrived` URL (changing it would break that URL); compare *slugs* use the "upright" brand name instead. **Objective call:** the top brand matchups are now built (28 compares across 20 lenders); further expansion is into low-demand pairs (Aloha, OfferMarket, Velocity) with diminishing SEO value and thin-page risk — the real remaining lever for this cluster is **authority/external links** (the PR & Backlink System), not more compares.
- Note: FAQPage + HowTo + WebApplication schema already present on calculators; Dataset/FAQPage/Article schema on reports (verified live 2026-06-19) — no schema *build* work needed, only the AEO content blocks in P2.

---

## P2 — Later

### SEO Audit P2 — 2026-06-19 (/website-audit) <!-- added 2026-06-19 /website-audit; refreshes & supersedes the 2026-06-13 P2 audit items -->
- [ ] **`[Both — AEO]` Lean into AI-engine citation.** 12 sessions already from ChatGPT/Copilot; robots allows GPTBot/OAI/Perplexity. ✅ *2026-06-23: shipped reusable `KeyTakeaways` answer-block on all 3 data reports (`src/components/key-takeaways.tsx`).* ✅ *2026-06-27: extended the AEO `KeyTakeaways` block to all 6 strategy guides — their existing `keyTakeaways` field already held answer-bearing fact sentences, so swapped the bespoke "What You'll Learn" objectives box for the semantic AEO component (`src/app/(site)/guides/[slug]/page.tsx`); one template change lit up all guides.* **Remaining:** consider an `llms.txt` + clean canonical markdown for the report data; track AI-assistant referrals as a first-class GA4 channel (ties into the P1 GA4 cleanup). A distribution front that doesn't require out-ranking high-DR sites. Effort **S–M**.
- [ ] **`[Traffic]` Audit the 1,390-URL programmatic surface for thinness.** Large for a DR-13 site at ~71 organic sessions. Spot-check `/calculators/[metric]/[metro]`, `/lenders/*`, `/markets/*` for thin/near-duplicate pages; prune or consolidate to concentrate crawl budget + topical authority on pages that can rank. Effort **M**.
- [~] **`[Traffic — quality/a11y]` Site-wide a11y: form labels + color-contrast.** Lighthouse a11y 91–96 with two recurring failure classes: unlabeled form controls and color-contrast.
  - <!-- 2026-07-14 /brsg-session --> **Form-label a11y — DONE site-wide.** Every user-facing form control now has a programmatic accessible name (was: 0 of them). Fixed across **29 files**: all 20 calculator components (text inputs via `useId`+`htmlFor`/`id`, 30 range sliders + 7 selects via `aria-label`, hint text wired with `aria-describedby`), all 8 lead-capture CTA components (email/name inputs — placeholder is not a label per WCAG 1.3.1/4.1.2), the compare deal-name inputs, and the `/search` + glossary search boxes. The `name="website"` honeypot was already correct (`aria-hidden`+`tabIndex=-1`, left as-is). Verified 0 unlabeled controls post-hydration via Playwright on cap-rate, dscr (selects), 1031-exchange (conditional-label edge case), compare, search, glossary. Typecheck + build clean; additive ARIA only, no logic/visual change.
  - <!-- 2026-07-14 /brsg-session --> **Color-contrast — utility greys DONE.** Audited the brand tokens against WCAG AA (measured ratios): the two neutral secondary-text greys failed and were darkened — `text-light` #9A9A9A (2.81:1 on white) → **#707070** (4.95 white / 4.62 surface); `text-muted` #6B6B6B (4.40:1 on surface-alt) → **#666666** (AA on white/surface/surface-alt). Verified live. **Flagged, not changed (brand identity):** the accent gold `#D4A843` fails as small text on white (2.21:1) and is borderline on primary (4.35:1 — passes only as *large* text); it's used via `text-accent` ~30× on mixed backgrounds. Fix is **usage-side** (reserve accent for large/decorative or on-dark; use primary or a darker gold for small text on white), not a token swap — do not blanket-change the brand gold. Effort **S** remaining.
- [x] **`[Technical]` Host + crawl hygiene.** <!-- shipped 2026-07-14 /brsg-session --> **DONE.** (a) `www`→apex **308 confirmed clean** live (`www/lenders` → 308 → apex, apex 200); the GSC `www.`-indexed lender pages will consolidate as Google recrawls. (b) **Sitemap `<lastmod>`: 82 → 1,235 of 1,408 URLs**, each from a *real* per-group last-change date (git history of the source/data file), never a blanket `now`. New `scripts/build-sitemap-dates.mjs` → `src/data/sitemap-dates.ts` (wired as a shallow-clone-safe `prebuild` hook); `sitemap.ts` applies it to lenders, compares, loan-types, state×loan-type (600), markets, city×strategy (208), states, reports + report-states, financing, categories, calculators, hubs. Pages with no honest date (glossary, some static hubs) correctly omit `lastmod`. Verified in served `sitemap.xml`.
- [x] **`[Trust/freshness]` Compare-page "Updated March 2026" stamp is hardcoded + stale.** <!-- added 2026-06-27; closed 2026-07-14 /brsg-session --> `src/app/(site)/lenders/compare/[slug]/page.tsx` hero hardcodes "Updated March 2026" on all 21 compare pages (now 3 months stale). Drive it from a real per-comparison `lastReviewed` field (or the lender-data verification date) rather than a literal — don't just bump the string without re-verifying the underlying lender rates/terms ([[shared/feedback_no_fabricated_data]]). Effort **S**.
  - <!-- 2026-07-14 /brsg-session --> **DONE — honest stamp re-surfaced.** `src/lib/content-freshness.ts` `freshnessStamp()` now drives the stamp from a *real, auto-refreshing* date: an explicit per-record `lastReviewed` (→ "Reviewed {Month YYYY}") when set, else the data file's **git last-change date** from `sitemap-dates.ts` (→ "Updated {Month YYYY}"). Added optional `lastReviewed` to `LenderComparison`. Surfaced on the compare hero + lenders index (verified live). **Honesty line held:** "Updated" = data last changed (git), *not* a rate re-verification — that's what the explicit `lastReviewed` override is for during a real rate pass. Never a frozen literal (the removed anti-pattern).
  - <!-- 2026-07-03 /brsg-session --> **Stale literal REMOVED** from both surfaces (found a second copy on the lenders index too): `lenders/compare/[slug]/page.tsx:219` and `lenders/page.tsx:76` no longer render "Updated March 2026". Neither `LenderComparison` nor `LenderData` carries a verification-date field, and the rates weren't re-verified this session, so a real date couldn't be honestly substituted — removing the false/frozen freshness claim is the integrity-correct interim fix (a hardcoded date that never changes is a staleness signal, not a freshness one; Google reads real freshness from sitemap `lastmod`/headers). **Remaining (data-ops, not code):** add a maintained `lastReviewed` field to the lender/comparison data and populate it *during* the next lender-rate verification pass, then re-surface a real "Updated {date}" stamp.
- [ ] Trim unused JavaScript on hub/calculator templates — measured **277 KB / 21 JS files** on `/` (2026-07-03). Opportunistic **TBT/INP** win, not an LCP blocker (LCP already passes — see the resolved P0 above). Levers: `next/dynamic` the below-fold/engagement widgets (`ExitIntentModal`, `StickyCTA`, `ToolRecommendations`, the CTA forms), consider `optimizePackageImports`. Effort **S–M**.

### Authority & Trust
- [ ] Guest author system — recruit 2-3 guest contributors with cross-web presence (LinkedIn, personal sites) to build domain E-E-A-T signals
- [ ] Testimonial/review system — user-submitted success stories or tool reviews for social proof

### Monetization (after 10K uniques/month)
- [ ] Display ads on informational pages only (Mediavine/Raptive) — never on lead capture pages
- [ ] Premium calculator features — PDF export, saved comparisons, alerts behind subscription ($5-10/mo)
- [ ] Newsletter sponsored placements — native ads in weekly newsletter at scale (2K+ subscribers)

### Technical
- [ ] Unified lead capture API — consolidate `/api/newsletter`, `/api/lender-lead`, `/api/calculator-results` into single `/api/lead` endpoint with `{ firstName, email, source, metadata }` interface
- [ ] GTM tracking migration — migrate all inline `dataLayer.push` calls across existing components to use `src/lib/tracking.ts` typed helpers
- [ ] A/B testing infrastructure — variant routing for CTA copy/placement testing via GTM or edge middleware
- [x] **Run published broken-calculator-link remediation** <!-- added 2026-06-08 /brsg-session; closed 2026-07-14 /brsg-session --> — ~20 live posts linked to dead calculator URLs (`/calculators/cash-flow`, `/calculators/rental-property`, `/calculators/house-flip`, `/calculators/rehab-estimator`). Root cause fixed in cron + editorial calendar. **VERIFIED RESOLVED 2026-07-14:** ran `scripts/fix-broken-calculator-links.mjs` dry (aliasing the write-scoped `SANITY_API_TOKEN` → `SANITY_API_WRITE_TOKEN`) — **0 links to fix, 0 posts touched.** Cross-checked with a GROQ query over every `post.body[].markDefs[].href`: the only 8 distinct calculator hrefs in live post bodies (`/calculators/1031-exchange`, `brrrr`, `cap-rate`, `cash-on-cash`, `fix-flip`, `mortgage`, `rental-cashflow`, `wholesale`) **all resolve to real routes.** No dead links remain — the remediation was already effected (prior run against Vercel-prod's token and/or content regen after the root-cause fix). No script run needed.

---

## Completed

- [x] **2026-06-23** "Where Rents Are Rising Fastest" data report — new HUD Fair Market Rents report at `/reports/rent-growth` ranking 2BR rent growth across 402 metros + 51 states (FY2026 vs FY2025). Pipeline `scripts/build-fmr.mjs` (HUD FMR API, reads `HUD_API_TOKEN` from `.env.local`); branded charts credit HUD, Dataset/Article/FAQPage schema, CSV download, wired into `/reports` + sitemap + reciprocal links. US median 2BR FMR +3.9% YoY. The press-friendly, link-bait companion to the rental-yield report.
- [x] **2026-06-23** AEO key-takeaway blocks on data reports — reusable `KeyTakeaways` component (answer-bearing, self-contained sentences) on rental-yield, investor-financing, and investor-lenders. Targets AI-engine citation ahead of DR-13 ranking limits. (Reports done; top guides still pending — see P2 AEO item.)
- [x] **2026-06-08** Calculator how-to-calculate enrichment (SEO content push) — added formula box, worked numeric example, and `HowTo` JSON-LD to the cap-rate, cash-on-cash, BRRRR, and mortgage/DSCR calculator pages to capture procedural "how to calculate X" search intent on the same URL (no cannibalization). GSC showed all earned impressions clustered on these queries at avg position 33. Added explainer-post cluster cross-links and a procedural FAQ to each.
- [x] **2026-06-08** Fixed broken-calculator-link generator (root cause) — `src/lib/cron/ai-content.ts` `writeArticle` prompt listed 3 non-existent calculator routes (`/calculators/cash-flow`, `/calculators/roi`, `/calculators/rehab-estimator`); replaced with the accurate 9-calculator list so every future AI post links to real tools. Also fixed 35 broken `/calculators/*` refs in `src/data/editorial-calendar.ts`.
- [x] **2026-06-08** Biased weekly content planner toward calculator clusters — added a "Content Priority" block to the `analyzeAndPlan` prompt steering new briefs toward how-to-calculate / formula / worked-example intent around the calculators (where the site already ranks), with tool↔guide cross-linking and an anti-thin-duplicate guard.
- [x] **2026-04-03** Lender Finder email gate — email capture step between form submit and results, with skip option, API route + email template
- [x] **2026-04-03** Calculator Save Results CTA — "Save These Results" email form on all 9 calculators, API route + email template
- [x] **2026-04-03** Header CTA button — "Find a Lender" button in desktop nav + mobile hamburger menu
- [x] **2026-04-03** Inline blog post CTAs — LeadMagnetCTA auto-injected after 3rd H2 heading, bottom newsletter replaced with lead magnet
- [x] **2026-04-03** Lead magnet distribution — LeadMagnetCTA added to calculators hub, start-here, market strategy pages
- [x] **2026-04-03** Table of Contents — auto-generated from H2/H3 headings, collapsible on mobile, anchor IDs with scroll offset
- [x] **2026-04-03** Blog pagination — 12 posts per page with server-rendered Previous/Next/page numbers
- [x] **2026-04-03** Tracking utility — `src/lib/tracking.ts` with typed GTM helpers for all lead capture and CTA events
- [x] **2026-04-03** 5-email drip sequence — day 1 (calculators), day 3 (first deal), day 5 (financing), day 7 (markets), day 10 (strategy) in `src/emails/drip-*.tsx`
- [x] **2026-04-03** Resource gating — Deal Analysis Checklist (sections 3-7) and Cap Rate Report (data table + rankings) gated behind email capture with localStorage unlock
- [x] **2026-04-03** Sticky scroll-triggered CTA bar — fixed bottom bar after 40% scroll, compact email form, dismissable per session, responsive desktop/mobile
- [x] **2026-04-08** Exit-intent modal — desktop mouseleave + mobile rapid scroll-up triggers, localStorage 7-day cooldown, lead magnet offer
- [x] **2026-04-08** Email segmentation — two-step signup (email → experience level), 3 tiers (beginner/some-experience/experienced), GA4 tracking, Resend segment support
- [x] **2026-04-08** Drip automation — drip 1-2 scheduled at signup via Resend `scheduledAt`, drip 3-5 via daily cron based on contact `created_at` age
- [x] **2026-04-08** Newsletter archive on web — `/newsletter` listing + `/newsletter/[slug]` individual issues, Sanity `newsletterIssue` schema, sitemap, nav links
- [x] **2026-04-08** Newsletter restructured — 6 sections, 2000 word max, AI decides trends vs education mix, featured lending partner rotation, 1-2 blog CTAs
- [x] **2026-04-08** Voice refinement — lending veteran + curious RE investing peer, collegial tone across newsletter AI, blog content AI, and welcome email
- [x] **2026-04-08** FAQ schema on blog posts — auto-extracts Q&A from headings with "?", adds FAQPage JSON-LD (2+ FAQs required)
- [x] **2026-04-08** Blog category pagination — 12 posts per page with Pagination component
- [x] **2026-04-08** Callout block type — key-concept, pro-tip, warning, example with Lucide icons + colored borders in Sanity + portable text
- [x] **2026-04-08** InlineCta block type — lead-magnet, newsletter, calculator, lender-finder CTAs placeable anywhere in article body
- [x] **2026-04-08** HowTo schema — auto-detects step patterns (Step 1:, 1., First,) in blog posts, adds HowTo JSON-LD
- [x] **2026-04-08** Start Here sticky nav — horizontal step progress bar with scroll-aware active state
- [x] **2026-04-08** Site-wide search — /search page, header search icon, WebSite SearchAction updated
- [x] **2026-04-08** City calculator pre-fill — cap rate calculator links on city pages with median price, rent, vacancy, tax data
- [x] **2026-04-08** Calculator embed codes — collapsible iframe snippet generator on all 9 calculators with attribution backlink
