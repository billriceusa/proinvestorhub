# ProInvestorHub — Work Plan

**Written:** 2026-08-28  **Tier:** 3  **State:** dormant  **KPI:** organic sessions → lender / BiggerPockets outbound clicks
**Last data:** 1 organic click / 989 impressions / avg pos 34 (GSC, 28d ending 2026-06-18)  **Next review:** 2026-11-28
**Standard:** ../_portfolio/AEO-SEO-STANDARD-2026.md

---

## What this site is

A real-estate-investing education and lender-directory property on Next.js 15 + Sanity, positioned in
its own README as "the NerdWallet for Real Estate Investors." It monetises through outbound clicks —
BiggerPockets vertical finders (`src/lib/partner-links.ts`, UTM-tagged) and direct lender sites. There
are no affiliate parameters on the lender links; the revenue rail is referral traffic, not commissions.

It is the largest property in the fleet by URL count and the only one carrying four original
public-data reports (HMDA investor lending, HMDA lender rankings, ACS rental yield, HUD rent growth)
plus the RHFS American Rental Ownership Report. Those five are genuinely differentiated assets. Almost
everything else on the domain is generated from five hand-maintained TypeScript data files.

---

## Where it actually stands

Every number below carries its source and measurement date. Where a number used to come from Ahrefs
it is marked, because Bill no longer has an account and it cannot be refreshed (standard §5).

| Fact | Value | Source | Date |
|---|---|---|---|
| Organic clicks / impressions / avg position | 1 / 989 / 34 | GSC, 28d | 2026-06-18 |
| Distinct query×page rows with **any** impression | **113** (61 above the reporting floor) | `data/gsc-striking-distance.json` | 2026-05-14 → 2026-06-10 |
| Rows in striking distance (pos 11–20) | **4** | same file | same window |
| `cap rate calculator` on `/calculators/cap-rate` | 313 impr, **0 clicks**, pos 20.0 | same file | same window |
| Organic sessions (28d) | ~71 — Bing 39 > Yahoo 13 > **Google 12** | GA4, via `/website-audit` | 2026-06-19 |
| AI-assistant sessions (28d) | 12 | GA4, same audit | 2026-06-19 |
| Indexable URLs | 1,390 | `/website-audit` | 2026-06-19 |
| Sitemap URLs / with real `lastmod` | 1,408 / 1,235 | in-repo, `scripts/build-sitemap-dates.mjs` | 2026-07-14 |
| Referring domains / backlinks / DR | 369 / 714 / DR 13 | **Ahrefs — unrepeatable** | 2026-07-14 |
| Last commit | `3c175e2` | `git log` | 2026-07-31 |

**The single most important number is 113.** Across a 28-day window, a 1,390-URL site produced
impressions on 113 query-page pairs. That is not a ranking problem distributed thinly across the
surface — it is a surface that Google is almost entirely ignoring. Roughly 1,270 URLs generated
nothing at all.

**What the surface is made of** (computed from the repo's data files, 2026-08-28):

| URL class | Count | Generated from |
|---|---:|---|
| `/lenders/[loanType]/[state]` | **600** | 12 loan types × 50 states |
| `/markets/[strategy]/[city]` | **200** | 4 strategies × 50 cities |
| `/reports/{rental-yield,investor-financing,investor-lenders}/[state]` | 153 | 3 × 51 |
| `/calculators/cap-rate/[city]` | 50 | 50 cities |
| `/markets/states/[state]` | 29 | states derived from those 50 cities |
| `/lenders/compare/[slug]` | 28 | hand-written pairings |
| `/lenders/reviews/[slug]` | 20 | hand-written lender records |
| `/lenders/[loanType]`, `/financing/[type]`, `/how-to-finance/[scenario]` | 12 + 12 + 8 | hand-written |
| Calculators + static + report hubs | ~45 | hand-written |
| Blog, glossary, guides, newsletter | remainder | Sanity — **not in this repo, not verified here** |

**1,032 URLs — about 74% of the indexable surface — are template expansions of five data files.**

Four defects in that surface, all verified in the repo on 2026-08-28:

1. **The state filter on `/lenders/[loanType]/[state]` is inert.** `src/app/(site)/lenders/[loanType]/[state]/page.tsx:55-58`
   filters `loanTypeLenders.filter((l) => l.nationwide || !l.loanTypeSlugs)` — there is no state
   predicate anywhere in it. All 50 state pages for a given loan type render the identical lender
   list under a heading that promises "{Loan Type} Lenders Serving {State}."
2. **26 of 50 states have prose; 24 do not.** `stateInvestingContext` in `src/data/us-states.ts`
   covers 26 states. The other 24 × 12 loan types = **288 pages** whose only state-specific content
   is the state's name substituted into boilerplate.
3. **The site publishes a number that is wrong.** `src/data/city-strategy-helpers.ts:416,437` and
   `src/app/(site)/markets/[strategy]/[city]/page.tsx:151` say "52 markets" / "#{rank} of 52." The
   dataset has **50** cities. That literal ships in body copy *and* inside FAQPage JSON-LD on 200 URLs.
4. **`src/data/cap-rate-cities.ts` has no provenance.** Median home price, median rent, cap rate,
   vacancy and property-tax rate for 50 cities, with no source attribution and no vintage anywhere in
   the file — unlike the report datasets, which all carry a `meta.source` block. 250 URLs rest on it,
   and `generateCityStrategyFAQs` turns it into ~1,200 mail-merged FAQ answers stating those figures
   as fact.

A fifth, smaller one: 20 lender review pages and 28 compare pages publish a `minRate` (e.g. `6.5`)
with no `ratesAsOf` field on `LenderData`. The 2026-07-14 freshness work added optional `lastReviewed`
to `LenderComparison` only.

**Also drifted:** `docs/paused-crons.md` states "the cron route handlers still exist under
`src/app/api/cron/`." They do not — neither `src/app/api/cron` nor `src/lib/cron` exists in this repo,
and `src/data/editorial-calendar.ts`, referenced in the backlog, is gone too. Anyone reading that doc
first will believe there is content automation here to stop. There is none.

---

## The thesis

ProInvestorHub is the property in this fleet most exposed to the market change the standard describes,
and the least able to respond to it. It is structurally a comparison platform and a lender directory —
precisely the class Google's March 2026 core update demoted (standard §4) — running at DR 13 in a
market where 65.3% of ChatGPT-cited pages are DR 81+. Its own backlog reached this conclusion twice
by different routes and then stopped: "internal links can't move this further… the remaining blockers
are purely authority (DR 13) + external links" (2026-06-27), and "further expansion is into low-demand
pairs… the real remaining lever is authority, not more compares" (2026-07-14). Both were correct.

The mistake would be to read "authority-bound" as "so go get authority." The offensive play the backlog
designed for that — the PR & Backlink Sourcing System — is architected end-to-end on the Ahrefs API
(`is_spam` classification, backlink-gap pulls, Brand Radar unlinked mentions). That API is gone, and
backlinks sit at the bottom of the AI-visibility correlation table anyway (~0.194, standard §2.2). The
honest position is that PIH cannot buy its way past DR 13 this quarter with the tools available.

What it *can* do is stop spending its crawl trust on 1,032 pages that produce nothing. Prune before you
plant is not a tidiness argument here. It is the only lever that is not authority-bound: the site is
asking Google to evaluate 1,390 URLs, four of which are within striking distance of a click, while
publishing a wrong market count and unsourced market data across 250 of them. That is an active
quality-signal liability on a domain that needs the opposite.

Hold, don't build. The five data reports are worth keeping alive because they are the one asset class
here that the March 2026 update rewarded. Everything else is maintenance.

---

## Now — the next three actions

**1. Decide the fate of the 800-page template surface, and ship the decision.**
Promotes the P2 item "Audit the 1,390-URL programmatic surface for thinness," which has been open and
unstarted since 2026-06-19. The audit is done — it is in the table above. What is left is a decision.
Recommended: `noindex, follow` on `/lenders/[loanType]/[state]` (600) and `/markets/[strategy]/[city]`
(200), using the same pattern CryptoLendingHub already built for its glossary — pages stay live and
keep passing internal link equity, they leave the sitemap and the index. Two `robots` exports plus a
sitemap filter. Expected effect: the crawlable, indexable surface drops from ~1,390 to ~590, and the
"52 markets" error and the unsourced city data leave the index with it. Owner: engineering, ~half a day.
*If the answer is "fix rather than prune," see action 2 — the fix is not small.*

**2. Resolve the three integrity defects on whatever survives action 1.**
The "52 markets" literal is wrong and is inside structured data; fix it or delete the pages carrying it.
The inert state filter must either become real (which requires a state-coverage field on `LenderData`
that does not exist — this is data collection, not code) or the class goes. Add `ratesAsOf` to
`LenderData` and populate it during a real rate pass, or drop `minRate` from the compare FAQ text that
asserts it. These are correctness items, not SEO items, and they are the reason the prune is defensible.
Owner: engineering, ~half a day after action 1 scopes it.

**3. Re-source every Ahrefs-dependent line in `BACKLOG.md` before anyone tries to execute it.**
The backlog's top-ranked item ("cap rate calculator, vol 14,000") and its largest system build (the PR &
Backlink System, Phases 1 and 2) both depend on an API Bill no longer has. Replace search volume with GSC
impressions as the proxy, replace refdomain/DR monitoring with the GSC Links report, and mark the
disavow-regeneration path as blocked rather than pending. This is 30 minutes of editing that prevents a
future session from spending a day discovering the tooling is gone. Owner: whoever next opens the backlog.

---

## Blocked on Bill

- **Register proinvestorhub.com in Bing Webmaster Tools** — ~15 min. Unblocks AI Citation Share data
  (standard §5), and on this property specifically it is not an AEO nicety: **Bing was PIH's largest
  organic source in the last measurement** (39 sessions vs Google's 12, GA4 28d to 2026-06-19). The
  site's biggest search channel is the one with no console attached.
- **Import the staged GTM container and mark two key events** — ~20 min. `docs/analytics/gtm-container-proinvestorhub.json`
  is import-ready; the code side was verified complete 2026-06-29. Until this lands, every session and
  conversion number on PIH is non-decision-grade (sessions were 91% "Direct," 1,022 of 1,126, and the
  8.5× MoM spike was not corroborated by GSC). Also enable GA4 bot-traffic exclusion and review the
  referral-exclusion list.
- **The prune decision itself** — noindex 800 URLs, or fund the data work to make them real. This is a
  strategy call, not an engineering one, and action 1 is blocked on it.
- **Confirm whether the sample-based disavow is still uploaded in GSC**, and accept that it cannot be
  regenerated to full coverage without Ahrefs. PIH has no manual action; this is low-stakes either way.

---

## Maintenance plan (quarterly)

A quarterly review here is about 45 minutes and consists of exactly this:

1. Pull GSC 28d: clicks, impressions, average position, and the count of query×page rows with
   impressions. Write all four into the `BACKLOG.md` status block with the date. The row count is the
   surface-health metric — track it, not the URL count.
2. Pull Bing Webmaster Tools → AI Performance: Citation Share and Topics. First read establishes a
   baseline; subsequent reads are the trend.
3. Pull GA4 with the source-only AI channel group (standard §5): organic sessions by engine, and
   outbound `partner_outbound_click` / `lender_cta_click` volume. If key events are still unmarked, the
   answer to "how did PIH do this quarter" is "unknown" — record that, don't estimate.
4. Re-verify the four reports still build and their upstream datasets have not moved (RHFS is roughly
   triennial; HMDA and HUD FMR are annual). A report that silently breaks is the only thing here worth
   an unscheduled fix.
5. Re-read the kill criteria below against the numbers just pulled and record pass/fail explicitly.

No content is written on this cadence. No new lender compares, no new city pages, no new posts. The
fleet's own evidence is 76 posts → 34 clicks in 80 days (workagedleads); PIH's is 1,390 URLs → 1 click
in 28 days. Volume is not the constraint on this property and never was.

---

## Kill criteria

Hold has an expiry. These are checked at each quarterly review and acted on without re-litigation.

**Gate 1 — the prune, due 2026-11-28.**
If the 800-page template surface has not been pruned or fixed by the 2026-11-28 review, prune it by
default. No further discussion: `noindex, follow` ships, the sitemap filter ships. A decision deferred
twice is a decision made.

**Gate 2 — the property, due 2027-05-31 (three quarterly reviews out).**
If **all three** of the following hold on 2027-05-31:
- trailing-28-day GSC clicks < 25 (baseline: 1 on 2026-06-18), **and**
- Bing Webmaster Tools AI Citation Share is effectively zero for the tracked crypto-free investor prompt
  set, **and**
- attributable outbound clicks (BiggerPockets + lender CTA, GA4) < 10 in the trailing month,

then PIH stops being a growth property. Reduce it to its defensible core — the five data reports, the
19 calculators, and the cap-rate cluster (roughly 120 URLs) — 301 everything else into the nearest hub,
and drop it to annual review with no work budget.

**Gate 3 — the domain, due 2027-05-31.**
If, in addition to Gate 2 failing, no report has earned a single third-party citation or press mention
since the American Rental Ownership Report shipped (2026-07-17), sunset the domain: migrate the five
reports to `billricestrategy.com/research`, 301 `proinvestorhub.com`, and let the registration lapse at
renewal. The reports are the asset; the domain is not.

**What would reverse this:** any single report earning coverage from a housing or personal-finance
reporter, or `/calculators/cap-rate` reaching the top 10 for its head term. Either would mean the
authority ceiling moved, and PIH would be re-tiered at the next review.

---

## Backlog items to close as invalidated

Per `../_portfolio/AEO-SEO-STANDARD-2026.md` §1. Close the *items*; leave the shipped code in place —
removing it costs time and buys nothing.

| Item in `BACKLOG.md` | Why it closes | Standard |
|---|---|---|
| `llms.txt` (shipped 2026-07-17, `src/app/llms.txt/route.ts`) and the trailing "consider clean canonical markdown per report" | Google states llms.txt is neither used nor harmful; of 137,210 domains studied, AI retrieval bots were 1.1% of requests and **zero** of the 404s on missing files came from AI systems | §1.1 |
| "FAQ schema on blog posts" and every item justified by FAQPage as a rich-result / CTR lever (P1 *SEO & Schema*) | FAQ rich results stopped rendering 2026-05-07; Search Console API support ended August 2026. The Q&A *prose* still earns its place — the markup justification does not | §1.2 |
| "HowTo schema on guide/how-to content" (`src/lib/howto-extract.ts`, `howToJsonLd` on the calculators) | HowTo rich results have been gone since 2023 | §1.3 |
| The closing note "FAQPage + HowTo + WebApplication schema already present… no schema *build* work needed" | Correct conclusion, wrong reason. Restate it as: schema is done and stays done for entity disambiguation and the rich results that still render — not as an AI-citation lever. Pooled DiD across 1,885 pages found AI Mode +2.4%, ChatGPT +2.2%, AI Overviews −4.6% | §1.3 |
| **PR & Backlink Sourcing System, Phases 1 and 2** | Not invalidated in principle, but **unexecutable as specified**: every sourcing input (Ahrefs `is_spam`, backlink gap, Brand Radar unlinked mentions) requires an account Bill no longer has. Rewrite around GSC Links + earned mentions, or close it. Note also that backlinks sit at the bottom of the AI-visibility correlation table (~0.194) while brand mentions sit at the top (0.66–0.71) | §5, §2.2 |
| "⚠️ PIH's disavow file is SAMPLE-BASED — re-run before relying on it… **This is the P0 of the defense half**" | The prescribed fix is a full Ahrefs referring-domains pull. It cannot be run. Downgrade from P0 and reframe: PIH has no manual action and near-zero traffic; a partial disavow is a low-stakes open item, not a priority | §5 |

Do **not** close: the `Organization` / `Person` entity layer with the canonical `@id` and `sameAs` set
(`src/lib/identity.ts`). That work is genuinely load-bearing and should be maintained (§1.3).

---

## Open questions I could not resolve

- **The Sanity corpus is invisible from this repo.** Roughly 121 blog posts, the glossary, six guides
  and the newsletter archive live in Sanity, not in git. I could not check them for thinness, duplication
  or fan-out coverage. Any prune decision on the *blog* half of the surface needs a GROQ pass first; the
  1,032-URL programmatic figure above deliberately excludes them.
- **Where "cap rate calculator, volume 14,000" came from, and whether it is still true.** It is an Ahrefs
  number and cannot be re-checked. What can be verified is GSC: 313 impressions in 28 days at position 20.
  Treat the impression count as the number, and the 14,000 as folklore until re-sourced.
- **Whether `cap-rate-cities.ts` has any source at all.** No attribution, no vintage, no comment in the
  file. Someone has to say where those 50 cities' medians came from, or the 250 pages built on them
  cannot honestly carry a freshness stamp.
- **Whether the `www` → apex consolidation finished.** GSC still showed `www.` lender URLs on 2026-06-19;
  the 308 was verified clean 2026-07-14. Needs one look at the Pages report to confirm it self-healed.
- **Whether the sample-based disavow is currently live in GSC**, and whether it was uploaded on a
  URL-prefix property (the disavow tool rejects `sc-domain`, as CryptoLendingHub discovered).
- **Whether anything still reads `data/performance-backlog.json`.** It is machine-generated advice from
  2026-06-12 that recommends actions already disproven elsewhere in the backlog. If nothing consumes it,
  it is noise that will mislead the next reader.
