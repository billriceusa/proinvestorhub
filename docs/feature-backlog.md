# ProInvestorHub — Feature Backlog

**Purpose:** A development-ready backlog of tools and content for proinvestorhub.com, prioritized by SEO demand × winnability × genuine usefulness. Every item below is specified enough to pick up and build.

**Strategic thesis:** The site already wins the *"analyze a deal"* job (9 live calculators + lender finder/compare). The undefended white space — and the literal brand promise — is **financing**: *"if you need financing and don't know what type or where to get it, you come here."* That's where low SEO difficulty, the highest commercial value (CPC $4–$12), and brand fit all line up, and no single lender can own it because each sells only one product.

**Data note:** All search volumes are real Ahrefs US figures (June 2026). KD = Ahrefs Keyword Difficulty (0–100). CPC in USD. Site Domain Rating ≈ 13 — winnability is the binding constraint. Strategy doc (living): `~/Documents/proinvestorhub/features/feature-roadmap.html`.

**Conventions for new calculators** (match existing 9):
- Component: `src/components/calculators/<name>-calculator.tsx` — `'use client'`, local `InputField`/`ResultRow` helpers, `useCalculatorState`, `CalculatorActions`, `SaveResultsCTA`, `formatCurrency`/`parseCurrencyInput`. Sticky results card (`lg:col-span-2`), inputs `lg:col-span-3`.
- Route: `src/app/(site)/calculators/<slug>/page.tsx` — `Metadata` w/ canonical, `JsonLd` (calculator + breadcrumb + faq + howTo), H1 + intro, `<Calculator/>`, `CalculatorEmbed`, then "How to Calculate (formula + worked example)" + topic sections with internal links.
- Register in the `calculators` array in `src/app/(site)/calculators/page.tsx`. Header nav links to the `/calculators` hub only — no nav change needed.
- State hydrates from a base64-JSON `?s=` param (`encode/decodeCalculatorState`). Pure-math tools need no data pipeline.
- Verify: `npx tsc --noEmit`, `npx eslint <files>`, `npx next build`, then serve + screenshot before "done."

**Status legend:** `DONE` shipped · `READY` fully specced, buildable now · `SPEC` needs a short design pass · `BLOCKED` needs a decision (see Open Decisions).

---

## Track A — The Financing Authority (flagship)

### A1 · Financing Matcher tool — `SPEC` · priority: flagship
"Tell us your deal, we'll tell you how to fund it." A wizard → ranked shortlist of financing types with *why-it-fits / why-not* → routes into the existing lender directory.
- **Targets the undefended decision SERPs:** "best loan for investment property" (900, KD 42), "how to finance a rental property / a flip / a BRRRR" (head terms small at ~150/mo but bank-page + Reddit/Quora SERPs an interactive answer can win via AI Overviews/snippets). The *volume* lives in the per-type pages (A2) the matcher routes to.
- **Inputs (wizard):** deal type (buy-hold SFR/small-multi · large multi/commercial · flip · ground-up · STR · wholesale · land) · investor stage (first deal / scaling 1–10 / portfolio 10+ / passive) · property condition (turnkey / cosmetic / heavy rehab / tear-down) · exit (hold / flip / BRRRR refi / 1031) · credit band (760+/700–759/640–699/<640) · income docs (W-2 / self-employed / no-income-verify) · cash available (banded) · timeline (<14d vs 30–45d) · financed-property count · owner-occupy? (unlocks FHA/VA/house-hack).
- **Output:** scored cards per financing type (fit %, rate range, speed, down %, pros/cons, "best when…/avoid if…") + CTA to matching lenders. Show *chains* not single products (e.g. BRRRR = hard money now → DSCR refi later).
- **Routing logic (illustrative):** flip+heavy-rehab+fast → hard money/fix-flip; buy-hold+self-employed+past conventional cap → DSCR→portfolio; first deal+low cash+owner-occ → FHA/VA/HomeReady; strong W-2+turnkey+first few → conventional; no cash+creative-tolerant → seller finance/subject-to/lease-option (with risk flags); large/commercial owner-occ → SBA 504/7a/commercial/mezzanine.
- **Build:** stateless decision engine (rules table in `src/data/`), multi-step UI. Reuse lender data in `src/data/lenders.ts` + `loan-types.ts` for routing. The existing `/lenders/finder` matches lender-given-loan-type; this matches *loan-type-given-deal* — distinct, sits upstream.
- **Acceptance:** every input combo yields ≥1 financing type with reasoning; no dead ends; links resolve to live lender/loan-type pages; JSON-LD for the decision queries.
- **Depends on:** A2 type pages (for routing destinations) ideally land in parallel. Decision #2 (monetization).

### A2 · Definitive financing pillar + per-type cluster (25–30 pages) — `SPEC` · priority: high
Neutral, authoritative page per financing type, hub-and-spoke off a master pillar `/real-estate-financing/` (or `/financing/`). Sub-pillars: buy-and-hold, fix-and-flip, creative, commercial, no-money-down. Each type page: what it is · who it's for · rates/terms · pros/cons · qualification · how to get one · **embedded calculator** · "compare to alternatives" · lender CTA. Connects to existing `/lenders/[loanType]` pages and reviews.
- **Lead with the low-KD cluster to bank authority fast:**

  | Page | Vol/mo | KD | CPC |
  |---|---|---|---|
  | subject to real estate | 3,000 | 0 | $4.00 |
  | portfolio loan | 2,100 | 5 | $4.00 |
  | real estate syndication | 4,100 | 6 | $2.50 |
  | mezzanine financing | 2,000 | 7 | $5.00 |
  | wraparound mortgage | 1,700 | 7 | $0.02 |
  | blanket loan | 700 | 0 | $4.00 |
  | transactional funding | 500 | 0 | $5.00 |
  | house hacking | 5,600 | 10 | $0.05 |
  | brrrr method | 5,900 | 17 | $0.04 |
  | seller financing | 10,000 | 20 | $0.25 |
  | creative financing real estate | 350 | 1 | $2.50 |
  | gap funding real estate | 60 | 0 | $7.00 |

- **Then contest the big head terms:** hard money loan (8,300, KD 63, $6), dscr loan (50,000, KD 54, $4 — the anchor; page-1 has DR 44–46 lender sites + Reddit, so contestable with depth + the calculator + state cluster), construction loan (27,000, KD 49, mostly consumer — cover for completeness).
- **Full type universe to cover:** conventional investor, DSCR, hard money, private money, fix-and-flip, bridge, construction, HELOC, cash-out refi, BRRRR refi, portfolio, blanket, commercial, SBA 504, SBA 7a, seller financing, subject-to, lease option, wraparound, JV/partnerships, syndication, crowdfunding, SDIRA, Solo 401k, FHA house-hack, VA, 1031 financing, mezzanine, gap, transactional.
- **Internal linking:** pillar ↔ every type page; matcher (A1) links out to each type; calculators embed on relevant type pages; "vs" pages link both sides; state pages roll up to parent type.
- **Why better than incumbents:** Investopedia/NerdWallet/Rocket cover head terms but are thin on creative/niche; lender blogs only cover what they sell. Neutral + comprehensive + interactive + honest risk flags is the moat.
- **Acceptance:** pillar + ≥10 lead-cluster type pages live with embedded calculators and lender CTAs; each interlinks; no fabricated rates (cite or omit per `feedback_no_fabricated_data`).

### A3 · Programmatic long-tail (state × type, scenario, "vs") — `BLOCKED` (Decision #3) · priority: phase 2
- **State × type:** DSCR state pages nearly undefended — `dscr loan florida` (1,400, KD 0), `texas` (1,200, KD 4), `ohio`/`michigan` (KD 0). Roll 50 states × top types (DSCR, hard money, fix-and-flip) = hundreds of pages.
- **Scenario:** `/how-to-finance/a-flip`, `/a-rental-with-no-money`, `/a-brrrr-deal`, `/an-airbnb` — matches conversational/AI queries.
- **"Vs":** `/dscr-vs-hard-money`, `/dscr-vs-conventional`, `/hard-money-vs-private-money` — currently owned by single-product lender blogs.
- **⚠ Quality gate required:** hundreds of templated pages is exactly the scaled-content pattern we retired this session (see `docs/paused-crons.md`). Ships ONLY with a real per-page data backbone (state rate/lender data, not boilerplate), a dedup gate, and human review — never an auto-publisher. Hold until A2 type pillars prove out.

---

## Track B — Equity-Unlock & Financing-Bridge calculators (quick wins, highest CPC)

The most under-competed valuable cluster: very low KD, meaningful volume, highest CPCs on the board ($10–12). The "investment property" qualifier filters out the banks. Every tool bridges portfolio management → financing the next deal.

### B1 · Investor HELOC / Equity-Unlock calculator — `DONE` (shipped this branch)
- **Route:** `/calculators/heloc` · **Component:** `heloc-calculator.tsx`
- **Targets:** "heloc on rental property" (2,100, KD 1, $10), "heloc on investment property" (1,600, KD 1, $12), "home equity loan on rental property" (450, KD 0, $11), "how much equity do i have" (450), "cash out refinance rental property" (300, KD 2, $10). ~5,000/mo combined.
- **Computes:** tappable equity = (value × max CLTV) − balance; current equity & %; new CLTV; interest-only or amortizing monthly cost; **buying power** = how many next-deal down payments it funds. Honest investor caveats (lower CLTV, higher rates, fewer lenders). CTA → DSCR/cash-out lenders.
- **Verified:** tsc/eslint/next build clean; screenshot empty + populated ($300k/$150k/75% → $75k tappable, 1 deal, $200k buying power).

### B2 · Dedicated DSCR loan calculator — `READY` · priority: high
- **Route:** `/calculators/dscr` · **Targets:** "dscr loan calculator" (3,200, KD 52, $1.80). Pairs with the 50k DSCR pillar (A2). The current Mortgage calc does payment math but not DSCR *qualification*.
- **Inputs:** monthly rent (or annual gross) · PITIA (principal, interest, taxes, insurance, HOA/assoc) · target DSCR (lender min, default 1.0–1.25) · loan amount or purchase+down · rate/term.
- **Outputs:** DSCR = NOI or rent ÷ PITIA (state which basis; many DSCR lenders use gross rent ÷ PITIA) · qualifying status vs target · max loan that still clears target DSCR · rate-tier note (don't fabricate live rates — frame as "higher DSCR generally earns better pricing").
- **Acceptance:** DSCR math correct on both gross-rent and NOI conventions (let user pick); clear pass/fail vs lender min; links to DSCR lender list + DSCR pillar.

### B3 · Cash-out refinance (investor) + "when to refinance" break-even — `READY` · priority: high
- **Routes:** `/calculators/cash-out-refinance` and/or `/calculators/when-to-refinance`.
- **Targets:** "when to refinance" (1,400, KD 5, $1.60), "cash out refinance rental property" (300, KD 2, $10), "refinance rental property" (400, KD 2, $9).
- **Computes (cash-out):** new loan at target LTV, cash to borrower = new loan − old balance − costs, new payment vs old, blended cost. **(Break-even):** monthly savings, break-even months = closing costs ÷ monthly savings, lifetime interest delta.
- **Acceptance:** both refinance flavors covered; surfaces the "pull equity vs sell" tie-in to Track C2; lender CTA.

### B4 · Hard money + mortgage points + closing cost — `READY` · priority: medium
- **Hard money calculator** `/calculators/hard-money` — "hard money loan calculator" (1,000, KD 8, $2.50). Inputs: purchase, rehab, ARV, LTV/LTC caps, points, rate, term, holding months → total borrowed, points cost, monthly interest (usually interest-only), total financing cost, cash-to-close. Easy win; feeds flip audience.
- **Mortgage points calculator** `/calculators/mortgage-points` — "mortgage points calculator" (2,100, KD 25, $0.50). Cost of buying points vs monthly savings + break-even.
- **Closing cost calculator** `/calculators/closing-costs` — "closing cost calculator" (15,000, KD 46) — stretch SERP but a strong **link magnet**; build for links + completeness, not a fast rank.

---

## Track C — Complete the deal-analysis suite & optimize existing

### C1 · Rental Property Depreciation calculator — `READY` · priority: medium
- **Route:** `/calculators/depreciation` · **Targets:** "rental property depreciation calculator" (1,100, KD 33); rides "depreciation calculator" (8,400) + "schedule e" (12,000) via a tool+guide hub.
- **Inputs:** purchase price, land value % (non-depreciable), placed-in-service date, capital improvements. **Outputs:** annual straight-line over 27.5 yrs (residential), cumulative, estimated annual tax shield, recapture note. Pure math. Beatable (Stessa/TurboTenant rank but link-thin).

### C2 · Sell-vs-Rent (hold) calculator — `READY` · priority: medium
- **Route:** `/calculators/sell-vs-rent` · **Targets:** "sell vs rent calculator" (150, KD 0), "sell or rent calculator" (50), "when to sell rental property" (100). Wide open (DR-5 sites rank).
- **Inputs:** current value, mortgage balance, rent, expenses, expected appreciation, sale costs, tax basis. **Outputs:** 5/10-yr net-worth comparison of sell-and-reinvest vs hold-and-rent, IRR each path. **Surface the refi alternative** ("instead of selling, a cash-out unlocks $X") → links B1/B3.

### C3 · Micro rule-checkers: NOI, GRM, 1% / 2% / 50% / 70% — `READY` · priority: low
- Trivially winnable, trivial to build, bookmark-worthy quick screens that interlink the suite. "noi calculator" (350, KD 0), "gross rent multiplier calculator" (150, KD 5), "1 percent rule" (250, KD 9), "70 rule calculator" (150, KD 5), "50 percent rule" (60, KD 1). Can be one combined "Quick Rules" page or small standalone tools. (Note: fix-flip already covers 70%-rule context — avoid cannibalizing; cross-link instead.)

### C4 · SEO-optimize the 9 existing calculators — `SPEC` · priority: high (low effort, high leverage)
- They exist but must actually *target* their head terms: cap rate (14,000, KD 5 — biggest winnable volume, currently has 50-city programmatic), rental cash flow vs "rental property calculator" (7,400, KD 33), BRRRR (700, KD 1), cash-on-cash (2,200, KD 28).
- **Actions:** audit title/H1/meta/intro copy against the exact head term; ensure calculator + breadcrumb + faq + howTo JSON-LD on each; build a unified **"Investor Tools" hub** so the flagship rental calc passes internal-link equity to the long-tail tools (this is how a DR-13 site climbs); add a cross-tool recommendation strip. No new tools — pure on-page + interlinking.

---

## Track D — Portfolio layer (retention, NOT SEO) — `SPEC` · priority: low

Logged-in dashboard: equity, cash flow, net worth, and "how far does my equity go" across all properties (aggregate tappable equity → fund next N acquisitions; the portfolio-level extension of B1).
- **Honest reality check:** the literal terms — "real estate portfolio tracker", "rental property tracker", "equity tracker" — all return ~20–30 searches/mo. Stessa owns this through brand, not SEO. **Build as the destination the free calculators feed** ("save this analysis to your portfolio" → lender match), not as a traffic source.
- **Heaviest build:** requires accounts + data persistence. Lowest priority. Sequence after Tracks A–C have momentum.

---

## Open Decisions (gating)

1. **Property-data investment.** *Recommend:* pure-math + free HUD Fair Market Rents now (~80% of winnable demand needs zero data pipeline); defer paid Rentcast/ATTOM until we want address-level rent-estimate & comps traffic — and gate any AI/feed number behind the reliability rule (`feedback_ai_data_feed_trust_gate`). Unlocks a future data-gated tier: rent estimator ("how much rent can I charge" parent ~26k traffic potential), comps finder, address-level value. **Do NOT chase the Airbnb/STR calculator on SEO** — AirDNA's moat is the dataset, not the math.
2. **Lender-referral monetization drives the matcher.** The $10–12 CPCs and the whole financing pillar assume routing qualified investors to the lenders we already review (`/api/lender-lead` exists). *Recommend:* yes — matcher + calculator CTAs = "get matched with a lender."
3. **Programmatic aggressiveness (A3).** *Recommend:* prove A2 per-type pillars first; only then template state×type with a data-backed template + dedup/quality gate — never the auto-publisher we retired.

## Suggested build order
1. **B1 Investor HELOC** — DONE (proof of pattern).
2. **C4 optimize existing 9 + Investor Tools hub** — highest leverage, low effort; captures cap rate (14k) volume already half-built.
3. **B2 DSCR calc + B3 cash-out/when-to-refinance** — deepen the financing bridge, all low-KD/high-CPC.
4. **A2 financing pillar + lead-cluster type pages** — bank topical authority on the low-KD creative/niche set.
5. **A1 Financing Matcher** — the flagship, once type pages exist to route into.
6. **C1/C2/C3 gap-fill calculators**, then **A3 programmatic** (gated), then **D portfolio layer**.
