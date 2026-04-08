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

---

## P1 — Soon

### Content System
- [x] Learning callout Sanity schema — new `callout` block type (key-concept, pro-tip, warning, example) with Lucide icons + colored left border in portable-text renderer
- [x] Sanity `inlineCta` block type — editors can place lead-magnet, newsletter, calculator, or lender-finder CTAs anywhere in article body
- [ ] Guides as distinct content type — create Sanity `guide` schema (longer than posts, multi-section, own template), replace the hollow `/guides` redirect with real guide pages
- [ ] Strategy comparison content — "BRRRR vs Buy-and-Hold", "House Hacking vs Cash Flow Investing" etc. High-intent search terms with no existing content
- [x] Blog category page pagination — `/blog/category/[slug]` paginated at 12 posts per page

### SEO & Schema
- [x] FAQ schema on blog posts — `FAQPage` JSON-LD auto-extracted from H2/H3 headings containing "?" with following paragraph text as answers
- [x] HowTo schema on guide/how-to content — auto-detects step patterns in blog posts, adds HowTo JSON-LD
- [x] Site-wide search — `/search` page querying blog, glossary, newsletter. Search icon in header. WebSite SearchAction updated.

### Engagement
- [x] City page calculator embeds — pre-filled cap rate calculator link with city's median home price, rent, vacancy, tax data
- [x] Start-here sticky step nav — horizontal sticky nav bar with numbered steps, scroll-aware active highlighting
- [x] Calculator embed codes — collapsible embed code generator on all 9 calculators with iframe snippet + attribution backlink

---

## P2 — Later

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

---

## Completed

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
