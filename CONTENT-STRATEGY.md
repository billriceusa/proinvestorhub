# ProInvestorHub — Content Strategy (AEO/SEO)

**Written:** 2026-08-28  **Standard:** ../_portfolio/AEO-SEO-STANDARD-2026.md

This file does not restate the standard. Read §1 (what to stop), §3.1 (fan-out method), §4 (the
structural risk) and §5 (measurement without Ahrefs) first; everything here is the site-specific
application.

---

## What this site can win, and what it cannot

**Cannot.** ProInvestorHub is a lender directory and comparison platform at DR 13 (Ahrefs, 2026-07-14 —
the last obtainable reading). That is the exact structural category Google's March 2026 core update
demoted in favour of primary and institutional sources, and the category floor is real: affiliate sites
sit at ~34% of peak organic traffic and information blogs at ~28%. On the AI side, 65.3% of pages
ChatGPT cites are DR 81+ with a median of DR 90. Nothing in this plan closes a 77-point DR gap.

Concretely, the site should stop trying to win:
- head commercial terms owned by DR 80+ incumbents — "best DSCR lenders," "hard money lenders,"
  "real estate investing";
- geographic lender queries, where the honest answer is that PIH has no state-level lender data
  (see the prune list — the state filter does not filter);
- volume-driven blog expansion. 1,390 URLs produced impressions on **113 query-page pairs** in 28 days
  (`data/gsc-striking-distance.json`, 2026-05-14 → 2026-06-10). Post #122 has no plausible path.

**Can.** Three things, and they are narrow on purpose.

1. **Original public-data reports.** Five of them exist, each anchored to a real, republishable federal
   dataset with a documented pipeline: RHFS (`/reports/rental-ownership`), HMDA investor lending and
   HMDA lender rankings, ACS rental yield, HUD Fair Market Rents. This is the one content class the
   March 2026 update rewarded, and it is the only thing here a DR-90 encyclopedia cannot simply
   out-authority — it does not have the numbers.
2. **The calculator utility cluster.** 19 calculators, all with worked examples and formula boxes.
   `cap rate calculator` is the site's only term with genuine ranked demand: 313 impressions at
   position 20.0 with zero clicks (GSC, 28d to 2026-06-10). Utility pages survive zero-click search
   better than articles do, because the click *is* the product.
3. **Hand-written lender head-to-heads.** 28 pairings, each with a real editorial `angle` paragraph, and
   the class already ranks — `/lenders/compare/lima-one-vs-civic-financial` at position 7.3 (GSC,
   2026-06-19). This is the only template class on the site that earned a page-1 position.

Everything else on this domain is overhead.

---

## Audience and the queries that matter

The reader is an individual or small-portfolio residential investor — one to ten doors, buying with
DSCR or hard money, running the numbers themselves. Not institutional, not a first-time homebuyer.

Four query shapes actually matter here, in order of how well PIH is positioned:

| Shape | Example | PIH position |
|---|---|---|
| Tool / "calculate X" | cap rate calculator, cash-on-cash return calculator | Best position it has. Owns the on-page answer; loses the SERP to authority |
| Brand-vs-brand lender | kiavi vs lima one, griffin funding interest rates | Proven — one page 1, three Griffin queries in striking distance |
| Original-data claims | who owns rental property in america, what share of rentals are LLC-owned | Uncontested. The public answer set is stale 2018 RHFS; PIH has 2024 |
| Head commercial / geographic | best DSCR lenders, hard money lenders in Texas | Unwinnable at DR 13. Stop |

Bill's own first-hand credential — thirty years in lending, an agency P&L, and having actually bought
and financed investment property — appears nowhere in the site's voice. The pages read as a neutral
encyclopedia, which is the one thing that cannot be won here (standard §3.2). That is the cheapest
unexploited differentiator on the property.

---

## Fan-out coverage map

Method is standard §3.1: decompose the head query into the sub-questions an assistant would generate,
then record the URL and heading that answers each. Gaps are the queue.

**Verification note.** Every "answered" cell below was checked against the repo on 2026-08-28 —
route file, heading text, FAQ array or data field. Cells marked *(Sanity — unverified)* point at blog
or glossary content that lives in the CMS and is not in this repo; they need a GROQ check before anyone
relies on them.

### A. `/calculators/cap-rate` — head query: "cap rate calculator"
GSC: 313 impressions, 0 clicks, position 20.0 (28d to 2026-06-10).

| # | Sub-question | Answered at |
|---|---|---|
| 1 | What is the cap rate formula? | `/calculators/cap-rate` H2 "How to Calculate Cap Rate (Formula & Example)" |
| 2 | How do I calculate it step by step? | Same section, Steps 1–3 + `howToJsonLd` |
| 3 | What counts as an operating expense? | H2 "How to Use the Cap Rate Calculator" |
| 4 | What vacancy rate should I assume? | Same H2 (5% default, stated with a caveat) |
| 5 | What is a good cap rate? | H2 "What Is a Good Cap Rate?" + range table |
| 6 | Does cap rate include the mortgage? | H2 "Cap Rate With a Mortgage" + FAQ 3 |
| 7 | Cap rate vs cash-on-cash return? | H2 "Cap Rate vs. Cash-on-Cash Return" → `/calculators/cash-on-cash` |
| 8 | What is NOI? | Linked to `/glossary/noi` from line 125 *(Sanity — unverified)* |
| 9 | What are cap rates in my city? | H2 "Cap Rates by City" → `/calculators/cap-rate/[city]` (50) — **but the underlying data has no source or vintage** |
| 10 | Is a higher cap rate always better? | **GAP.** The range table implies the risk trade-off; nothing states it. This is the most-asked follow-up on the term and the cheapest fill on the site |
| 11 | How do cap rates differ by property type (SFR / multifamily / commercial)? | **GAP** |
| 12 | What cap rate do lenders want to see? | **GAP** — and the one that would bridge the calculator into the lenders cluster, which is where the outbound clicks are |
| 13 | What is cap rate compression? | Partial. A `cap-rate-compression-explained` post exists (backlog, 2026-06-27) and is **not linked from the calculator** — the backlog explicitly left it unpatched |
| 14 | How do I go from cap rate to property value? | **GAP** (the inverse calculation — reverse-cap valuation — is not on the page) |

Four fills, all as sections on an existing strong page rather than new URLs (standard §3.1, step 5).

### B. `/lenders/dscr-loans` — head query: "DSCR loan lenders" / "DSCR loan requirements"

| # | Sub-question | Answered at |
|---|---|---|
| 1 | What is a DSCR loan? | `loan-types.ts` `description` + `heroContent`, rendered under H2 "What Are DSCR Loans" |
| 2 | What DSCR ratio do I need? | FAQ 1 on the page |
| 3 | What rate will I pay? | `typicalRateRange` "6.5%–8.5%" — **no source, no `ratesAsOf`** |
| 4 | What LTV / down payment? | `typicalLtvRange` "75%–80%" |
| 5 | What credit score? | `typicalMinCredit` "620–680" |
| 6 | Can a first-time investor qualify? | FAQ 2 |
| 7 | Does it work for short-term rentals? | FAQ 3 |
| 8 | DSCR vs conventional investment loan? | FAQ 4 |
| 9 | Can I close in an LLC? | `pros` bullet |
| 10 | Is there a limit on financed properties? | `pros` bullet + FAQ 4 |
| 11 | What are the prepayment penalties? | Partial — one `cons` bullet ("3–5 year step-down"), no explanation of how a step-down works |
| 12 | Who are the best DSCR lenders? | On-page lender list + `/lenders/reviews/[slug]` (20) |
| 13 | **How do I calculate my DSCR?** | **Defect, not a gap.** `/calculators/dscr` exists, but `loan-types.ts` sets `relatedCalculator: '/calculators/mortgage'` for `dscr-loans` — the page sends DSCR readers to the mortgage calculator. One-line fix |
| 14 | Which lenders do DSCR in my state? | **Answered falsely.** `/lenders/dscr-loans/[state]` renders 50 pages promising state coverage from a filter with no state predicate. See the prune list |
| 15 | What does a DSCR lender look for beyond the ratio? | **GAP** — reserves, seasoning, entity age. This is exactly where a thirty-year lending operator has something an encyclopedia does not |

### C. `/reports/rental-ownership` — head query: "who owns rental property in America"
The site's strongest AEO asset: 2024 RHFS microdata against a public answer set still citing 2018.

| # | Sub-question | Answered at |
|---|---|---|
| 1 | Who owns most rental property in America? | Hero + FAQ 1 |
| 2 | Do individuals or LLCs own more? | H2 on the property-vs-unit flip; 58.9% of properties vs 43.0% of units + FAQ 3 |
| 3 | Are mom-and-pop landlords leaving? | Three-wave trend section + FAQ 2 |
| 4 | Do most landlords have a mortgage? | FAQ 4 + prose at lines 198–199 (free-and-clear share, computed from RHFS) |
| 5 | How big is a typical rental portfolio? | Full entity + size tables |
| 6 | What share of rentals are single-unit? | H2 "U.S. rental housing is overwhelmingly single-unit" |
| 7 | What is the median rental property worth? | Value section |
| 8 | What is the RHFS? | FAQ 5 |
| 9 | Where do I get the underlying data? | CSV downloads + `Dataset` / `DataDownload` schema |
| 10 | **How was this computed?** | **GAP.** `/reports/rental-yield`, `/investor-financing` and `/investor-lenders` each have a `/methodology` route. `rental-ownership` — the flagship — has none. For a page whose whole value is citability, this is the highest-priority gap on the site |
| 11 | **Who owns rentals in my state?** | **GAP.** The other three reports have `[state]` routes (51 each). This one is national-only |
| 12 | Do institutions own most rentals? | Partial. The 2026-07-17 AEO evaluation deliberately deprioritised this angle as locked by high-DR incumbents — a defensible call, but the question still gets asked and the page should answer it briefly rather than cede it |
| 13 | What does this mean for a small investor? | Closing section ("Ownership is the macro backdrop…") |

### D. `/lenders/compare/[slug]` — head query: "{Lender A} vs {Lender B}"
28 pages. `lima-one-vs-civic-financial` at position 7.3 (GSC, 2026-06-19) — the only page-1 template.

| # | Sub-question | Answered at |
|---|---|---|
| 1 | Which is better for investors? | Hero + per-pair `angle` (28 hand-written paragraphs) + FAQ 1 |
| 2 | What products do both offer? | H2 "Full Comparison" table + FAQ 2 |
| 3 | Who has lower rates? | FAQ 3, from `minRate` — **no verification date on `LenderData`** |
| 4 | What are each one's strengths and weaknesses? | H2 "Pros & Cons" |
| 5 | What credit score does each require? | Comparison table row |
| 6 | What LTV does each allow? | Comparison table row |
| 7 | How fast does each close? | Present for some pairs via the `angle`; not a table row — inconsistent |
| 8 | Which is better for a first deal? | Partial — surfaces only where the `angle` happens to say so |
| 9 | Which states does each lend in? | **GAP**, and unfixable without lender state-coverage data |
| 10 | What do borrowers say about each? | **GAP.** No review or complaint synthesis anywhere on the site |
| 11 | What if neither fits? | "Not Sure? Try Our Lender Finder" → `/lenders/finder` |
| 12 | Is there a third option? | H2 "Related Comparisons" |

**What the map says overall.** The gaps cluster in two places: the *risk and trade-off* half of every
commercial question (higher cap rate → more risk; what a lender looks for beyond the ratio; what
borrowers complain about), and *methodology* on the flagship report. Both are answerable from Bill's
own experience and from data already in the repo. Neither requires a new URL.

---

## Prune list

This matters more than anything above. 1,032 of ~1,390 indexable URLs are template expansions of five
data files, and the site produced impressions on 113 query-page pairs in 28 days.

**The test to apply, per class:** (a) does the class have a source-attributed, dated dataset behind it;
(b) does the template produce a materially different answer per URL, or only substituted names;
(c) has any URL in the class earned an impression in the last 28 days; (d) does anything on the page
make a factual claim that is not true. Fail (a), (b) or (d) → prune. Pass all four → keep and deepen.

| Class | Count | Verdict | Why |
|---|---:|---|---|
| `/lenders/[loanType]/[state]` | **600** | **`noindex, follow`, or delete** | Fails (b) and (d). The state filter has no state predicate (`[state]/page.tsx:55-58`) — all 50 states show the same lender list under a heading promising state coverage. 24 of 50 states have no `stateInvestingContext` prose at all, so 288 pages are pure name substitution |
| `/markets/[strategy]/[city]` | **200** | **`noindex, follow`** | Fails (a), (b) and (d). Built from an unsourced 50-row file; `generateCityStrategyFAQs` mail-merges ~6 FAQ answers per page (~1,200 total) into FAQPage JSON-LD; and every one of them says "of 52 markets" when there are 50 |
| `/calculators/cap-rate/[city]` | 50 | **Keep — conditionally** | Same unsourced data, but a genuinely different job (pre-filled calculator per city) and it feeds the one term with ranked demand. Condition: add a source and vintage to `cap-rate-cities.ts`. If nobody can say where those numbers came from, this class goes too |
| `/markets/states/[state]` | 29 | **Consolidate into `/markets/states`** | Derived from the same 50 cities; a state with one city in the set is a one-row page |
| `/reports/*/[state]` | 153 | **Keep** | The only programmatic class passing all four tests: real federal datasets with `meta.source` and a vintage in every file, distinct values per state, and a documented pipeline |
| `/lenders/compare/[slug]` | 28 | **Keep and deepen** | 28 hand-written angles, real lender data, and the only template class with a page-1 position. Fix the undated `minRate` and add close-speed and state coverage as table rows if the data can be got |
| `/lenders/reviews/[slug]` | 20 | **Keep** | Hand-written; three Griffin Funding queries sit in striking distance (pos 15–19) |
| `/lenders/[loanType]`, `/financing/[type]`, `/how-to-finance/[scenario]` | 32 | **Keep** | Hand-written, real FAQ arrays, the natural fan-out landing pages |
| Blog + glossary (Sanity) | unknown | **Audit before deciding** | Not in this repo. Needs a GROQ pass for word count, near-duplicates and zero-impression URLs before any judgement |

**Net effect of the recommended prune:** indexable surface drops from ~1,390 to roughly 590 without
deleting a single page a human might land on. `noindex, follow` — the pattern CryptoLendingHub already
built for its glossary — keeps every page live and still passing internal link equity while removing it
from the index and the sitemap. It costs two `robots` exports and a sitemap filter.

**Do not delete the URLs outright** unless the state class is being retired for good. Deletion breaks
the internal link graph that 115 of 121 posts already depend on, and it forfeits the option to make
these pages real if lender state-coverage data ever gets collected.

---

## Content formats that earn here

In descending order of evidence, not enthusiasm:

1. **Original public-data reports on underused federal datasets.** Proven category, proven format, and
   the fleet has the pipelines. The gating factor is not building more — it is that the ones already
   shipped have never been promoted to a single reporter.
2. **Calculator pages with the formula, a worked numeric example, and the answer above the fold.**
   Already the site's house style; keep it.
3. **Hand-written brand-vs-brand comparisons.** One page-1 position out of 28 is a real hit rate at
   DR 13. Note the backlog's own honest conclusion (2026-07-14): the top brand matchups are built, and
   further pairs are low-demand and thin-risk. Deepen, don't extend.
4. **Answers written from having actually done it.** Unused. What a DSCR lender checks besides the
   ratio; why a high cap rate is often a warning; what a 3–5 year step-down prepay actually costs you
   on an early refinance. None of that is on the site and none of it is on the encyclopedias either.

What does **not** earn here: more city pages, more state pages, more compare pairs, more posts.

---

## Cadence

Honest and capacity-based, per standard §3.3 — there is no credible 2026 study on optimal publishing
frequency, and any number quoted as optimal is invented.

**PIH's cadence is: nothing scheduled.** This is a Tier 3 hold. Content work happens only when it is
one of the three "Now" actions in `WORK-PLAN.md`, and right now none of them is content.

When the prune has shipped and there is capacity, the first content unit is **not a post** — it is the
`/reports/rental-ownership/methodology` page, because it unblocks citability on the site's best asset.
After that, the four fan-out gaps on `/calculators/cap-rate`, added as sections to the existing page.

Two rules that survive regardless of cadence: never batch-publish (staggering is a scaled-content-abuse
defence, not a ranking tactic), and never churn `dateModified` or sitemap `lastmod` without substantive
change. PIH's sitemap already does this correctly — 1,235 of 1,408 URLs carry a real git-derived date
and pages with no honest date correctly omit `lastmod`. Keep it that way.

---

## Page shape standard

Site-specific application of standard §3.2:

- **The answer in the first 30% of the page.** 44.2% of AI citations come from the opening third
  (Indig, 2026-02-18, one study, not replicated — but the edit is free). Calculator pages already do
  this; the loan-type pages bury the answer under a hero paragraph.
- **Question-formatted H2s.** 78.4% of question-linked citations came from headings in the same study.
  `/calculators/cap-rate` is the model ("What Is a Good Cap Rate?", "Does cap rate include the
  mortgage?"). `/lenders/[loanType]` is not ("What Are DSCR Loans" is close; "Pros & Cons" is not).
- **Name entities explicitly.** "Kiavi," not "the lender." "Lima One Capital," not "the competitor."
  Highly-cited content averaged 20.6% proper nouns vs 5–8% for standard English.
- **One honest table per commercial page.** Already standard here.
- **Every number carries a source and a vintage on the page**, not just in the repo. The reports do
  this. The lender data and the city data do not, and both make numeric claims.

---

## Schema: keep / don't bother

**Keep, because it still renders or disambiguates:** `Breadcrumb`, `Article`, `Dataset` /
`DataDownload` on the reports, `SoftwareApplication` / `WebApplication` on the calculators, and above
all the `Organization` + `Person` entity layer with the canonical `@id` and complete `sameAs`
(`src/lib/identity.ts`). That entity work, shipped across the fleet 2026-07-29→31, is the load-bearing
piece and should be maintained.

**Stop justifying, leave the code:** `FAQPage` (no rich result since 2026-05-07), `HowTo` (gone since
2023), and any framing of schema as an AI-citation lever. The pooled difference-in-differences across
1,885 pages found AI Mode +2.4%, ChatGPT +2.2%, AI Overviews −4.6% (standard §1.3). Removing the
existing JSON-LD costs time and buys nothing; writing *new* items justified by it costs Bill's attention,
which is the scarce resource.

**Never add:** `Speakable` (no current evidence), `DefinedTermSet`.

One caveat worth holding: that DiD study sampled pages already receiving 100+ citations, so it does not
test whether schema helps a page earn its *first* citation. The burden of proof has shifted; it has not
been settled.

---

## Measurement

No Ahrefs. Every Ahrefs-dependent number in `BACKLOG.md` — "vol 14,000," "DR 13," "369 refdomains,"
and the entire `is_spam`-based disavow regeneration path — must be re-sourced or marked unknown.

| Need | Tool | PIH status |
|---|---|---|
| Clicks, impressions, position, and **the count of query×page rows with impressions** | Google Search Console | In place. That row count (113 on 2026-06-10) is the surface-health metric for this site — track it |
| Generative AI impressions | GSC Search Generative AI report | Impressions only, no clicks |
| **AI citation share** | **Bing Webmaster Tools → AI Performance** | **Not registered.** Highest-value unclaimed measurement on this property — and note Bing was PIH's *largest organic source* (39 sessions vs Google's 12, GA4 28d to 2026-06-19) |
| AI referral sessions | GA4 custom channel group, **source-only** | Not built. The native "AI Assistant" channel matches source *and* medium and undercounts badly; Claude was removed from its list and Perplexity was never in it. Domain set is in standard §5 |
| Outbound conversion | GA4 key events `generate_lead` + `partner_outbound_click` | Code side verified complete 2026-06-29; container never imported, events never marked. Until then, unmeasured |
| Search volume | GSC impressions as proxy | Sufficient at this scale |
| Backlinks / toxicity | GSC Links report | Lower resolution than Ahrefs. Accept it |

Track citations and mentions as two KPIs, not one: 62% of AI citations produce no brand mention
(Semrush × Indig, 2026-06-09). And keep the volume reality check in view — ChatGPT is 92.4% of LLM
referral sessions across 6.77M sessions on 166 GA4 properties (Previsible, 2026-07-06). AI-referral
optimisation is ChatGPT optimisation.

---

## What not to write

- **Any new page in a class on the prune list.** No new city pages, no new state pages, no new
  strategy×city combinations.
- **New lender compare pairs.** The backlog's own 2026-07-14 conclusion: the top brand matchups are
  built; the rest are low-demand and carry thin-page risk.
- **Anything justified by llms.txt, FAQPage rich results, HowTo, or "schema helps AI cite us."**
  See the invalidated table in `WORK-PLAN.md`.
- **A number without a source and a date.** Especially rates, cap rates, medians and market data. The
  site currently ships several — that is the defect being fixed, not a precedent.
- **Blog posts as a volume play.** The fleet's own datapoint is 76 posts → 34 clicks in 80 days
  (workagedleads). PIH's is 1,390 URLs → 1 click in 28 days.
- **A "2026 guide" refresh that only changes the year.** Freshness churn without substantive change
  violates Google guidance, and AI-cited content averages roughly three years old (standard §2.4).
  Authority beats freshness.
