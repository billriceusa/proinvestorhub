# ProInvestorHub Backlog

> Prioritized work items for proinvestorhub.com. Pick up the top unchecked P0, mark it in-progress, ship it, check it off.
>
> **Reference:** `~/Documents/_projects/_shared-docs/lead-gen-patterns.md` for design patterns and standards.

---

## P0 — Do Next

### Conversion & Lead Capture
- [x] Exit-intent modal — mouse-toward-top (desktop) + rapid scroll-up (mobile) triggers lead magnet offer, localStorage 7-day cooldown after dismiss or submit
- [x] Email segmentation at signup — add one qualifying question ("What's your experience level?") to newsletter signup flow, store as Resend contact metadata, branch drip sequences

### Email Automation
- [x] Connect drip to Resend automation — drip 1-2 scheduled at signup via `scheduledAt`, drip 3-5 via daily cron `/api/cron/send-drip` (11 AM UTC)

### SEO Audit P0 — 2026-06-19 (/website-audit) <!-- added 2026-06-19 /website-audit -->
Re-audit of the 2026-06-13 findings + new issues. Full report: `~/website-audits/proinvestorhub.com-2026-06-19.html`. **Snapshot (28d → 2026-06-18):** GSC 989 impressions → **1 click**, avg pos 34; GA4 ~71 *organic* sessions (Bing 39 > Yahoo 13 > Google 12) + 12 AI-assistant sessions; DR 13 (spam-inflated); 1,390 indexable URLs. Foundations are excellent (rich Dataset/FAQPage schema, clean robots/sitemap, self-canonicals, no thin content) — the binding constraints are **SERP CTR, mobile speed on the two hub pages, and trustworthy measurement.** Items below are ordered by impact on the primary goals (traffic, then conversion). Tags: `[Traffic]` `[Conversion]` `[Both]`.
- [ ] **`[Traffic — sitewide CTR]` Stop Google doubling the brand in SERP titles.** Live results render "… **| ProInvestorHub | ProInvestorHub**". The raw `<title>` already ends in a *single* "| ProInvestorHub" (PR #64 fixed the in-app doubling); Google then auto-appends the site name on top. **Fix:** remove the brand from the Next.js metadata `title.template` (set template to `%s`, supply per-page brand only where intentional via `title.absolute`) so Google's auto-append provides it exactly once. Touches every one of 1,390 pages — highest-leverage single change. Effort **S**. Verify in live SERP after redeploy + reindex. *(Source: WebSearch SERP on Park Place/Griffin/BRRRR results + raw curl `<title>`.)*
- [ ] **`[Traffic — top entry points]` Fix mobile LCP on `/` (6.1s) and `/calculators` (5.8s).** Google "poor" (>4s); mobile is what's indexed. `/calculators/cap-rate` renders at 2.3s on the same stack, so this is a per-page hero/render-blocking problem, not a platform limit. Preload/prioritize the LCP hero element, defer non-critical JS (~200–227 KiB unused on the hubs). Effort **M**. Target <2.5s mobile. *(Source: PageSpeed lab, mobile.)*

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
- [ ] **`[Traffic — biggest single unlock]` Push "cap rate calculator" to page 1.** 298 impr/28d at pos ~14–20 (Ahrefs vol 14,000); `/calculators/cap-rate` already pulls 672 impr — the one term with real ranked demand. On-page is strong and already internally linked; blockers are authority + CTR. Add exact-anchor "cap rate calculator" links from the highest-traffic posts + sibling calcs, fix the page's unlabeled form inputs (a11y), pursue 2–3 quality links to the URL. Effort **S–M**.
- [ ] **`[Traffic]` Shorten the 3 over-60-char titles + trim 2 over-160 meta descriptions.** `/reports/investor-lenders` title 72 / meta 217, `/reports/rental-yield` title 87, `/financing` meta 235, `/blog/dscr-loans-explained` title 78 — all truncate in SERPs. Effort **S**. *(Source: raw curl `<title>`/`<meta>` on 5 pages.)*
- [ ] **`[Traffic — authority, defense]` Disavow the PBN/spam backlink profile.** 200+ junk referring domains (`*-seoexpress.store`, `rank-forge`, `link-baron`, `.shop`/`.store` PBNs) inflate DR 13 with negative-SEO-style links. Export Ahrefs refdomains → build + submit a disavow file → document a recurring link-hygiene check. Effort **M**.
- [ ] **`[Traffic — authority, offense]` Earn quality links to offset DR 13.** The HMDA "Most Active Lenders" + rental-yield reports carry Dataset/DataDownload schema and original data — distribute/pitch them (REI communities, journalists) as linkable data journalism; the 17 calculators are the other natural linkable assets (embed codes already shipped). Quality earned links are the right answer to the spam profile and unlock the page-2/3 cluster sitewide. Effort **M (ongoing)**.
- [ ] **`[Traffic — proven template]` Expand the lender head-to-head compare set.** `/lenders/compare/lima-one-vs-civic-financial` already sits at **pos 7.3** and `/lenders/reviews/griffin-funding` at pos 23.6 — the 652-page lenders cluster is the second cluster gaining traction. Build more high-intent "X vs Y" investor-lender compares where the template already reaches page 1. Effort **M**.
- Note: FAQPage + HowTo + WebApplication schema already present on calculators; Dataset/FAQPage/Article schema on reports (verified live 2026-06-19) — no schema *build* work needed, only the AEO content blocks in P2.

---

## P2 — Later

### SEO Audit P2 — 2026-06-19 (/website-audit) <!-- added 2026-06-19 /website-audit; refreshes & supersedes the 2026-06-13 P2 audit items -->
- [ ] **`[Both — AEO]` Lean into AI-engine citation.** 12 sessions already from ChatGPT/Copilot; robots allows GPTBot/OAI/Perplexity. ✅ *2026-06-23: shipped reusable `KeyTakeaways` answer-block on all 3 data reports (`src/components/key-takeaways.tsx`).* **Remaining:** extend key-takeaway blocks to the top guides (Sanity-driven — needs a schema/field or auto-extract); consider an `llms.txt` + clean canonical markdown for the report data; track AI-assistant referrals as a first-class GA4 channel (ties into the P1 GA4 cleanup). A distribution front that doesn't require out-ranking high-DR sites. Effort **S–M**.
- [ ] **`[Traffic]` Audit the 1,390-URL programmatic surface for thinness.** Large for a DR-13 site at ~71 organic sessions. Spot-check `/calculators/[metric]/[metro]`, `/lenders/*`, `/markets/*` for thin/near-duplicate pages; prune or consolidate to concentrate crawl budget + topical authority on pages that can rank. Effort **M**.
- [ ] **`[Traffic — quality/a11y]` Site-wide color-contrast fix.** Lighthouse a11y 91–96 with color-contrast failing on every page checked — run a pass against the brand tokens. (The cap-rate-calc form-label fix is folded into the P1 cap-rate item.) Effort **S–M**.
- [ ] **`[Technical]` Host + crawl hygiene.** Confirm the `www`→apex 308 consolidates cleanly (GSC shows some lender pages indexed under `www.`); add `<lastmod>` to the programmatic sitemap entries (only 82 of 1,390 carry it today). Effort **S**.
- [ ] Trim unused JavaScript on hub/calculator templates (~200–227 KiB, ~0.9s mobile on the hubs) — opportunistic, do alongside the P0 LCP fix.

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
- [ ] **Run published broken-calculator-link remediation** <!-- added 2026-06-08 /brsg-session --> — ~20 live posts link to dead calculator URLs (`/calculators/cash-flow`, `/calculators/rental-property`, `/calculators/house-flip`, `/calculators/rehab-estimator`). Root cause fixed in cron + editorial calendar this session; existing posts still need the one-time fix. Script ready: `node --env-file=.env.local scripts/fix-broken-calculator-links.mjs --apply` (needs `SANITY_API_WRITE_TOKEN` — lives in Vercel, not local). Run dry first.

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
