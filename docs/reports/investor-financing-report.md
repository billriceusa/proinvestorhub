# Build Spec — The Investor Financing Report

A proinvestorhub.com editorial **data report** built entirely on **HMDA** (Home
Mortgage Disclosure Act) data — public domain, no licensing risk, designed to
earn backlinks and become an annually-cited reference.

> Status: **approved, Phase 1 in progress** (2026-06-14).
> Decisions locked: hero metric = **investor rate premium** (denial rate = #2);
> v1 geography = **national + 50 states + DC** (metros deferred to v1.1).

---

## 1. Why this report

Nearly every linkable real-estate report in the wild covers **prices, rents, or
flipping ROI**. Almost nobody owns the **financing** angle. HMDA's
investment-property occupancy flag lets us publish *the* data no one mines: how,
where, and at what cost investors actually get funded.

- **Public domain** (U.S. government) — we can publish charts, tables, **and the
  derived dataset itself**. Zero licensing risk.
- **Uniquely credible from a financing site** — ATTOM/Redfin/Zillow can't tell
  the financing story; we can.
- **Geographically deep** — 50 states + DC now, ~380 metros + 3,000+ counties
  later = a large local-pickup surface ("one study, 50 local angles").
- **Repeatable annually** — HMDA releases every spring, so the report becomes the
  default citation and compounds links year over year.

**Positioning:** *"The definitive picture of how real estate investors finance
their deals — and where it's hardest, cheapest, and most leveraged."*

---

## 2. Analytical spine (metrics)

Universe = loan-level records filtered to `occupancy_type == 3` (investment
property) AND `derived_dwelling_category == "Single Family (1-4 Units):Site-Built"`.
Every metric is computed per **state** (v1) and later per metro/county.

| Metric | Field logic | Headline it powers |
|---|---|---|
| **Investor rate premium** ⭐ HERO | median investor `interest_rate` − median owner-occupant (`occupancy_type=1`) rate | "How much more investors pay to borrow — by state" |
| **Investor denial rate** (#2) | `action_taken=3` ÷ (`action_taken` in {1,3}) | "The hardest states to get an investment-property loan" |
| **Investor loan volume** | `action_taken=1`, count + Σ`loan_amount` | "Where investors borrow the most" |
| **Investor market share** | investor originations ÷ all originations (denominator from aggregations API) | "Where investors dominate the mortgage market" |
| **Investor leverage** | median `combined_loan_to_value_ratio` | "Where investors put the least down" |
| **DSCR / business-purpose proxy** ⭐ | share with `business_or_commercial_purpose=1` | "Where investors borrow through LLC / business-purpose loans" |
| **Equity extraction** | share with `loan_purpose=32` (cash-out refi) | "Where investors pull cash out of rentals" |
| **Top denial reasons** | `denial_reason_1..4` distribution | "Why investor loans get rejected" |

`interest_rate` and `loan_amount` are disclosed (unbinned) in the public file, so
the hero rate-premium metric is clean.

---

## 3. Methodology & coverage caveats (state these plainly — transparency earns citations)

- **Financed-only.** HMDA records only loans, so **all-cash investor purchases are
  invisible.** Frame the report precisely as *"how investors finance"* — our lane —
  and cite Redfin/ATTOM cash-share figures for context.
- **Business-purpose loans partially covered.** Per **12 CFR 1003.3(c)(10)**,
  business-purpose dwelling loans are reported **only** when they are a purchase,
  home-improvement, or refinance — captures most DSCR purchase/refi loans but
  undercounts the full private-lending universe. Report as a floor, not the total.
- **Agricultural/farm loans excluded** (1003.3(c)(9)) — rural/ag investor loans drop out.
- **Privacy binning** in the public modified LAR: `property_value` rounded to
  nearest $10k midpoint; `debt_to_income_ratio` and `applicant_age` bucketed.
  `loan_amount` and `interest_rate` are disclosed.
- **Small-filer partial exemption:** some fields carry `Exempt`/`1111` codes —
  exclude those rows from rate/LTV medians and report coverage %.
- **Latest data year:** 2025 modified LAR released ~March 2026; the Data Browser
  dataset serves 2024 with 2025 loading. The build script confirms the latest
  served year at runtime by probing the aggregations endpoint.

No fabricated figures — every number is computed from the file or omitted.

---

## 4. Data pipeline

Single annual build script → committed static JSON (matches the site's
pure/static prerender pattern; no runtime data fetch).

**`scripts/build-hmda-investor.mjs`** (idempotent + resumable, mirrors
`backfill-post-images.mjs`):

1. **Denominators** — aggregations endpoint per state/year for *all-loan* counts
   (fast, occupancy not needed):
   `GET /v2/data-browser-api/view/aggregations?states=<ST>&years=<Y>&actions_taken=1&loan_purposes=1,31,32`
2. **Investor numerators** — stream loan-level CSV per state-year:
   `GET /v2/data-browser-api/view/csv?states=<ST>&years=<Y>&actions_taken=1,3&loan_purposes=1,31,32`
   then filter rows to `occupancy_type=3` + SF 1-4 client-side; also tally
   `occupancy_type=1` rate medians for the premium comparison; discard raw.
3. **Compute** all §2 metrics per state + a national roll-up.
4. **Emit** `src/data/hmda-investor/{national,states}.json` (compact aggregates) +
   `public/data/investor-financing-<year>.csv` (downloadable derived dataset).
5. No auth/token/rate-limit. Throttle heavy state pulls defensively; cache raw CSV
   to a temp dir for resumability.

---

## 5. Page architecture (Next.js App Router, `(site)` route group)

New **`/reports`** hub (also sets up future data reports):

- **`/reports`** — index of data reports.
- **`/reports/investor-financing`** — national flagship: answer-box top-line stats,
  rate-premium + denial-rate maps, ranked top/bottom-10 tables, methodology link,
  CSV download, embeddable charts.
- **`/reports/investor-financing/[state]`** — 51 programmatic state pages driven by
  the committed dataset (real data, not thin auto-content — the legitimate,
  data-backed version of the previously-gated programmatic play).
- **`/reports/investor-financing/methodology`** — sources, field logic, §3 caveats,
  citation guidance.

**Interactive:** sortable/filterable ranking table (reuse calculator-table
styling); US choropleth map with rate-premium / denial-rate / share toggles (the
embeddable asset).

**JSON-LD** (`json-ld.tsx`): add **`Dataset`** schema (Google Dataset Search
eligibility + "citable data" signal) alongside `Article`, `BreadcrumbList`,
`FAQPage`.

**Wiring:** link from `/financing` pillar, hard-money + DSCR calculators, and a
header "Research/Reports" nav entry (nav change = **pause for approval**).

---

## 6. Promotion & link-acquisition kit

- **"See your state" hook** — each state page is a ready pitch to that state's
  business journal / local press ("Investors face the toughest financing in <State>").
- **Embeddable map + charts** with copy-paste embed code (each embed = a backlink).
- **Downloadable CSV** — journalists cite sources that hand them clean data.
- **Press list:** HousingWire, National Mortgage Professional, REI INK, local
  business journals, BiggerPockets, REI newsletters.
- **Lead angles:** biggest investor rate premiums; where DSCR/business-purpose
  borrowing is surging; where investor denial rates spike.
- **Annual cadence** — "<year> vs <prior>" refresh each spring.

---

## 7. Build phases (each through the standard verify gate)

1. **Data pipeline** — `build-hmda-investor.mjs`; validate against raw Data Browser; commit JSON + CSV.
2. **Report hub + national page** — content, tables, `Dataset` JSON-LD.
3. **Choropleth map + ranking table** components.
4. **51 state pages** + methodology page.
5. **Wiring** — sitemap, internal links; **pause** for header-nav approval.
6. **Verify** — tsc/eslint/build (static prerender), screenshot national + one state, hand-check 3 metrics against the HMDA Data Browser.
7. **Outreach kit** — separate doc.

---

## Appendix — verified HMDA Data Browser API reference (June 2026)

**Base:** `https://ffiec.cfpb.gov/v2/data-browser-api/view/` — GET-only, **no auth/token**.

| Purpose | Endpoint |
|---|---|
| Aggregations (geo/LEI subset, JSON) | `/aggregations` |
| Nationwide aggregations | `/nationwide/aggregations` |
| Loan-level CSV (streamed) | `/csv` |
| Nationwide loan-level CSV | `/nationwide/csv` |
| Filer list | `/filers` |

Every request needs `years` + ≥1 data filter; non-nationwide endpoints also need
exactly one geo filter (`states` | `msamds` | `counties`) and/or `leis`.

**Critical:** there is **no occupancy filter** on the API — `occupancy_type` is a
CSV field only, not an aggregation dimension (the API silently ignores unknown
params). Isolate investment property by downloading the CSV and filtering
`occupancy_type==3` client-side.

Working examples (verified live):
```
# aggregation: MI 2024 home-purchase originations
https://ffiec.cfpb.gov/v2/data-browser-api/view/aggregations?states=MI&years=2024&actions_taken=1&loan_purposes=1

# loan-level CSV (filter occupancy_type=3 locally)
https://ffiec.cfpb.gov/v2/data-browser-api/view/csv?states=MI&years=2024&actions_taken=1&loan_purposes=1
```

**Field codes:**
- `occupancy_type`: 1 principal · 2 second · **3 investment**
- `action_taken`: **1 originated** · 2 approved-not-accepted · **3 denied** · 4 withdrawn · 5 incomplete · 6 purchased · 7 preapproval denied · 8 preapproval approved-not-accepted
- `loan_purpose`: 1 purchase · 2 improvement · 31 refinance · 32 cash-out refi · 4 other · 5 n/a
- `loan_type`: 1 conventional · 2 FHA · 3 VA · 4 USDA
- `business_or_commercial_purpose`: 1 business/commercial · 2 not · 1111 exempt
- `derived_dwelling_category`: `Single Family (1-4 Units):Site-Built` (+ Manufactured / Multifamily variants)
- Geo: `activity_year`, `state_code` (2-letter), `county_code` (5-digit FIPS), `census_tract` (11-digit), `derived_msa_md` (5-digit)

**Sources:**
- API: https://ffiec.cfpb.gov/documentation/api/data-browser/
- Field codes: https://ffiec.cfpb.gov/documentation/publications/loan-level-datasets/lar-data-fields
- Public LAR schema: https://ffiec.cfpb.gov/documentation/publications/loan-level-datasets/public-lar-schema
- Bulk modified-LAR: https://ffiec.cfpb.gov/data-publication/modified-lar
- Exclusions (12 CFR 1003.3): https://www.consumerfinance.gov/rules-policy/regulations/1003/3/
- 2025 release: https://www.consumerfinance.gov/about-us/newsroom/2025-hmda-data-on-mortgage-lending-now-available/
