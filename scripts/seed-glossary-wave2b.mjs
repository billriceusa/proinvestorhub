#!/usr/bin/env node

/**
 * Seed Glossary Wave 2B — 26 NEW glossary terms with full body content
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... node scripts/seed-glossary-wave2b.mjs
 *   # Dry-run (no writes):
 *   DRY_RUN=1 node scripts/seed-glossary-wave2b.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-12',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const DRY_RUN = process.env.DRY_RUN === '1'

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Set it in .env.local or pass it directly.')
  process.exit(1)
}

// ── helpers ──────────────────────────────────────────────────────────

function h2(slug, n, text) {
  return {
    _type: 'block',
    _key: `${slug}-b${n}`,
    style: 'h2',
    children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
  }
}

function p(slug, n, text) {
  return {
    _type: 'block',
    _key: `${slug}-b${n}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
  }
}

// ── term definitions ─────────────────────────────────────────────────

const newTerms = [
  // 1. Real Estate Cycle
  {
    term: 'Real Estate Cycle',
    slug: 'real-estate-cycle',
    category: 'general',
    definition: 'The recurring pattern of four phases — recovery, expansion, hyper-supply, and recession — that real estate markets move through over an average 18-year cycle. Understanding where a market sits in the cycle is essential for timing acquisitions, dispositions, and development decisions.',
    body: (s) => [
      h2(s, 1, 'What Is the Real Estate Cycle?'),
      p(s, 2, 'The real estate cycle describes the predictable pattern of booms and busts that property markets experience over time. Research going back to the 1800s shows that U.S. real estate follows a roughly 18-year cycle, though individual markets can deviate significantly from the national average. The cycle is driven by the interplay of supply and demand, interest rates, construction timelines, demographic shifts, and investor sentiment. Understanding the cycle does not guarantee perfect timing, but it gives investors a framework for making smarter decisions about when to buy aggressively, when to hold, and when to sell.'),
      h2(s, 3, 'Phase 1: Recovery'),
      p(s, 4, 'Recovery follows the bottom of a recession. Vacancy rates are high but stabilizing, rents are flat or barely rising, and new construction is almost nonexistent because developers cannot justify building at current prices. Properties trade at steep discounts. This is where contrarian investors make their best purchases — buying distressed assets well below replacement cost. The challenge is recognizing recovery in real time because sentiment is overwhelmingly negative and financing is difficult to obtain. Key indicators include declining vacancy rates, absorption turning positive, and distressed sales volume decreasing.'),
      h2(s, 5, 'Phase 2: Expansion'),
      p(s, 6, 'During expansion, job growth accelerates, vacancy rates fall below the long-term average, rents rise meaningfully, and investor confidence builds. New construction begins in response to tightening supply, but deliveries lag demand because it takes 18–36 months to plan, permit, and build. This is the sweet spot for real estate investors. Properties purchased during recovery show strong appreciation, cash flows improve, and refinancing to pull out equity becomes feasible. Expansion is also when value-add strategies work best because rising rents justify renovation capital expenditures.'),
      h2(s, 7, 'Phase 3: Hyper-Supply'),
      p(s, 8, 'Hyper-supply begins when construction deliveries outpace absorption. Vacancy rates start climbing, rent growth decelerates, and concessions reappear. The market still feels healthy on the surface because rents are near their peak, but the underlying fundamentals are deteriorating. Developers keep breaking ground on projects greenlit during expansion, adding more supply to a softening market. This is the time to sell non-core assets, lock in long-term fixed-rate debt, build cash reserves, and avoid speculative development. Investors who mistake late-cycle conditions for mid-cycle expansion get caught holding overpriced assets.'),
      h2(s, 9, 'Phase 4: Recession'),
      p(s, 10, 'Recession brings falling rents, rising vacancy, negative absorption, and values declining from peak levels. Construction halts as projects become economically unviable. Distressed sales increase as overleveraged owners and developers face foreclosure. Credit tightens dramatically. While painful for those caught unprepared, recession creates the buying opportunities that generate outsized returns in the next recovery phase. Investors with cash and patience can acquire assets at 20–40% below replacement cost. The key is having liquidity and conservative leverage going into the downturn.'),
      h2(s, 11, 'Investment Strategies by Phase'),
      p(s, 12, 'During recovery, accumulate — buy distressed assets at deep discounts with conservative leverage. During expansion, optimize — execute value-add plays, refinance to pull equity, and grow your portfolio. During hyper-supply, defend — sell marginal properties, reduce leverage, strengthen cash reserves, and lock in fixed rates. During recession, prepare — preserve capital, negotiate with distressed sellers, and position for the next recovery. The investors who consistently build wealth are those who match their strategy to the cycle rather than fighting it.'),
    ],
  },

  // 2. Interest Rate Risk
  {
    term: 'Interest Rate Risk',
    slug: 'interest-rate-risk',
    category: 'financing',
    definition: 'The risk that changes in prevailing interest rates will negatively impact a real estate investment through increased borrowing costs, reduced property values, or diminished buyer demand. Rising rates compress property values because higher cap rates reduce what investors will pay for the same income stream.',
    body: (s) => [
      h2(s, 1, 'What Is Interest Rate Risk?'),
      p(s, 2, 'Interest rate risk is the potential for financial loss resulting from changes in interest rates. In real estate, this risk manifests in multiple ways: your variable-rate mortgage payment increases, the value of your property declines as cap rates rise, potential buyers and refinancing options dry up, and the overall cost of capital increases across your portfolio. Interest rate risk is arguably the most significant macro risk facing real estate investors because rates influence every aspect of property economics — from acquisition pricing to exit valuations.'),
      h2(s, 3, 'How Rates Affect Property Values'),
      p(s, 4, 'Property values and interest rates have an inverse relationship, mediated through cap rates. When interest rates rise, investors demand higher returns (higher cap rates) to compensate for the increased cost of borrowing and the availability of better yields in bonds and other fixed-income alternatives. A property generating $100,000 in NOI is worth $1.43 million at a 7% cap rate but only $1.25 million at an 8% cap rate — a $180,000 decline in value from a single percentage point shift. This relationship is especially pronounced in commercial real estate where income-based valuation dominates.'),
      h2(s, 5, 'Floating vs. Fixed Rate Exposure'),
      p(s, 6, 'Investors with adjustable-rate mortgages, bridge loans, or floating-rate commercial debt face direct exposure to rate increases. A $500,000 variable-rate loan that adjusts from 6% to 8% increases annual interest payments by $10,000. Fixed-rate debt eliminates this risk for the loan term but may carry a higher initial rate. The choice between floating and fixed is essentially a bet on the direction of rates. In a rising rate environment, investors with fixed-rate debt enjoy a significant competitive advantage because their cost of capital remains constant while competitors face increasing expenses.'),
      h2(s, 7, 'Hedging with Long-Term Fixed Debt'),
      p(s, 8, 'The most straightforward hedge against interest rate risk is locking in long-term fixed-rate financing. A 30-year fixed-rate mortgage eliminates rate risk entirely for the life of the loan. Commercial investors can secure 7–10 year fixed terms through CMBS or agency debt. While fixed rates may be higher than introductory variable rates, the predictability they provide is invaluable for long-term hold strategies. The real cost of a variable rate is not just the current payment — it is the uncertainty of every future payment for the life of the loan.'),
      h2(s, 9, 'Refinance Risk and ARM Adjustments'),
      p(s, 10, 'Refinance risk occurs when a loan matures or a balloon payment comes due in a high-rate environment. An investor who acquired a property with a 5-year bridge loan at 6% may face refinancing into a 9% permanent loan, drastically reducing cash flow and potentially pushing the property into negative territory. ARM adjustments create similar risk on a scheduled basis. A 5/1 ARM that adjusts from 5.5% to 8% after the initial fixed period can turn a profitable rental into a cash drain overnight. Always model worst-case rate scenarios before taking on adjustable or short-term debt.'),
      h2(s, 11, 'Protecting Your Portfolio'),
      p(s, 12, 'Build rate risk mitigation into every deal. Stress-test cash flows at rates 2–3% above current levels before acquiring any property. Maintain cash reserves sufficient to cover increased payments during rate spikes. Stagger loan maturities across your portfolio so you are never forced to refinance everything simultaneously. Consider interest rate caps on variable-rate loans — they cost money upfront but limit your maximum exposure. Most importantly, buy with enough margin that your deals work even in a higher-rate environment, rather than depending on rates staying low.'),
    ],
  },

  // 3. Inflation Hedge
  {
    term: 'Inflation Hedge',
    slug: 'inflation-hedge',
    category: 'general',
    definition: 'The characteristic of real estate to preserve and grow purchasing power during inflationary periods. As the general price level rises, rents increase, property values appreciate, and fixed-rate mortgage debt becomes effectively cheaper in real terms — making real estate one of the best natural inflation hedges available to individual investors.',
    body: (s) => [
      h2(s, 1, 'What Is an Inflation Hedge?'),
      p(s, 2, 'An inflation hedge is an asset that maintains or increases its value as the purchasing power of currency declines. Real estate is widely considered one of the strongest inflation hedges because it is a tangible, supply-constrained asset with income streams that adjust upward with the general price level. Unlike cash or bonds, which lose purchasing power during inflation, real property tends to appreciate in nominal terms while generating increasing rental income. This dual benefit — rising values and rising income — makes real estate a cornerstone of inflation-resistant portfolios.'),
      h2(s, 3, 'How Rents Rise with Inflation'),
      p(s, 4, 'Rental income naturally adjusts upward during inflationary periods because housing is a necessity that consumes a relatively fixed percentage of household income. As wages and the cost of living increase, landlords can raise rents accordingly. Historically, rents have tracked or exceeded the Consumer Price Index over the long term. Multi-family properties with annual lease renewals can adjust rents more quickly than commercial properties locked into long-term leases, though commercial leases often include CPI escalation clauses that provide automatic inflation adjustments.'),
      h2(s, 5, 'Property Values and Replacement Cost'),
      p(s, 6, 'Inflation drives up the cost of land, labor, and building materials — the core inputs of real property. When it costs more to build new housing, the value of existing housing rises because buyers compare purchase prices against replacement costs. A property that cost $300,000 to build five years ago might cost $400,000 to replicate today, establishing a higher floor for the existing property value. This replacement cost dynamic creates a natural value escalator that protects real estate investors from the wealth erosion that inflation inflicts on holders of financial assets.'),
      h2(s, 7, 'Fixed-Rate Debt in Inflationary Times'),
      p(s, 8, 'Perhaps the most powerful inflation benefit for leveraged real estate investors is the erosion of fixed-rate debt in real terms. If you lock in a $300,000 mortgage at 6.5% and inflation runs at 5% annually, you are effectively repaying the loan with cheaper dollars each year. Your monthly payment stays constant in nominal terms but shrinks in purchasing-power terms. Meanwhile, your rental income is rising with inflation, creating an expanding spread between income and debt service. This is why experienced investors aggressively pursue long-term fixed-rate financing during inflationary periods.'),
      h2(s, 9, 'Real vs. Nominal Returns'),
      p(s, 10, 'It is essential to distinguish between nominal returns (before adjusting for inflation) and real returns (after inflation adjustment). A property that appreciates 8% in a year with 5% inflation delivered only a 3% real return. However, leveraged real estate still outperforms most asset classes on a real-return basis because the inflation benefits compound across multiple dimensions: rising rents, appreciating values, eroding debt, and depreciating tax shields. Historically, U.S. residential real estate has delivered 4–6% real annual returns when accounting for all sources of return including cash flow, appreciation, and tax benefits.'),
      h2(s, 11, 'Historical Performance'),
      p(s, 12, 'During the high-inflation period of the 1970s, residential real estate values roughly tripled while the dollar lost more than half its purchasing power. Investors who held leveraged rental properties through that era built generational wealth. The 2021–2023 inflationary period showed similar dynamics: home values surged 30–40% in many markets while rents posted record increases. The lesson is consistent across decades: investors who own real assets with fixed-rate debt and inflation-adjustable income are the primary beneficiaries of inflationary environments, while savers and bondholders are the primary victims.'),
    ],
  },

  // 4. 1% Rule
  {
    term: '1% Rule',
    slug: 'one-percent-rule',
    category: 'analysis',
    definition: 'A quick screening guideline stating that a rental property\'s monthly rent should equal at least 1% of its purchase price. A $200,000 property should generate at least $2,000 per month in rent. The rule provides a fast initial filter but should never replace thorough cash flow analysis.',
    body: (s) => [
      h2(s, 1, 'What Is the 1% Rule?'),
      p(s, 2, 'The 1% rule is a back-of-the-napkin screening tool that helps investors quickly identify properties with potential for positive cash flow. The rule states that a property\'s gross monthly rent should be at least 1% of its total acquisition cost (purchase price plus any immediate repairs). If a property costs $200,000 all-in and rents for $2,000 per month, it meets the 1% rule. If it only rents for $1,500, it fails and is unlikely to cash flow positively with conventional financing. The rule is not a substitute for detailed analysis, but it eliminates obviously overpriced properties in seconds.'),
      h2(s, 3, 'Using the 1% Rule as a Screening Filter'),
      p(s, 4, 'When you are scanning dozens of listings on Zillow or the MLS, you do not have time to build a full pro forma on every property. The 1% rule lets you instantly sort properties into "worth analyzing further" and "skip." Pull up the listing price, estimate market rent from Rentometer or comparable listings, and divide. If monthly rent divided by purchase price equals 0.01 or higher, the property passes the screen and merits a deeper look. If it falls below 0.7%, move on — the math almost never works for cash flow investors at that ratio regardless of how favorable the financing.'),
      h2(s, 5, 'Example Calculation'),
      p(s, 6, 'Consider a duplex listed at $250,000 where each unit rents for $1,300 per month, yielding $2,600 in gross monthly rent. The ratio is $2,600 / $250,000 = 1.04% — it passes the 1% rule. Now consider a single-family home listed at $350,000 that rents for $2,200 per month. The ratio is $2,200 / $350,000 = 0.63% — it fails significantly. Even with a modest down payment and favorable interest rate, the single-family home is very unlikely to produce positive monthly cash flow after accounting for taxes, insurance, maintenance, and vacancy.'),
      h2(s, 7, 'Limitations and Market Reality'),
      p(s, 8, 'The 1% rule has become increasingly difficult to achieve in many U.S. markets. In high-cost cities like San Francisco, Seattle, or Austin, rent-to-price ratios of 0.4–0.6% are common, and properties that meet the 1% rule may only exist in lower-quality neighborhoods with higher management intensity. The rule also fails to account for significant variations in property taxes, insurance costs, and HOA fees across markets. A property at 1% in Texas (where property taxes can reach 2.5% of value) will cash flow very differently than a 1% property in Alabama (where taxes might be 0.5%). Always follow the 1% screen with a full expense analysis.'),
      h2(s, 9, 'The 2% Rule for Aggressive Investors'),
      p(s, 10, 'Some investors use a stricter 2% rule — requiring monthly rent to equal 2% of purchase price. A $100,000 property would need to generate $2,000 per month. Properties that meet the 2% rule are rare and typically found in lower-income neighborhoods of Midwest and Southern cities. While the cash flow numbers look spectacular on paper, 2% properties often come with higher vacancy rates, more tenant turnover, greater maintenance demands, and more management headaches. The higher rent-to-price ratio compensates for higher risk and operating costs.'),
      h2(s, 11, 'Practical Application'),
      p(s, 12, 'Use the 1% rule as your first filter but never your final analysis. Properties passing the 1% screen should then be evaluated with a full cash flow analysis including realistic vacancy (5–10%), property management (8–10% of rent), maintenance (8–10%), capital expenditure reserves (5–8%), property taxes, insurance, and debt service. A property at 1.1% might still cash flow negatively if it has high taxes and insurance, while a property at 0.9% might work with below-market financing or strong appreciation potential. The rule is a starting point, not a destination.'),
    ],
  },

  // 5. 50% Rule
  {
    term: '50% Rule',
    slug: 'fifty-percent-rule',
    category: 'analysis',
    definition: 'A rule of thumb estimating that operating expenses on a rental property will consume approximately 50% of gross rental income, excluding mortgage payments. This allows investors to quickly estimate net operating income by halving gross rent, providing a fast initial assessment of cash flow potential.',
    body: (s) => [
      h2(s, 1, 'What Is the 50% Rule?'),
      p(s, 2, 'The 50% rule states that, on average, a rental property\'s total operating expenses — everything except the mortgage payment — will eat up roughly half of its gross rental income. If a property generates $3,000 per month in gross rent, the rule estimates $1,500 in operating expenses and $1,500 in net operating income (NOI). Subtract the monthly mortgage payment from that $1,500 to estimate cash flow. This rule exists because new investors consistently underestimate expenses, budgeting only for the obvious costs while ignoring the dozens of smaller expenses that accumulate over time.'),
      h2(s, 3, 'Quick NOI Estimation'),
      p(s, 4, 'The 50% rule makes NOI estimation nearly instant. Take gross monthly rent, cut it in half, and you have your estimated NOI. For a fourplex generating $6,000 per month, estimated NOI is $3,000. If the mortgage payment is $2,200, estimated monthly cash flow is $800. This takes 10 seconds compared to the 30 minutes needed for a detailed expense analysis. Use it when scanning listings, attending open houses, or evaluating a potential deal a wholesaler sends you. If the 50% rule estimate shows negative cash flow, the deal probably does not work unless expenses are unusually low.'),
      h2(s, 5, 'When the 50% Rule Is Accurate'),
      p(s, 6, 'The rule tends to be most accurate for older multi-family properties with moderate property taxes, which represent the largest category of investment properties. For a 20-year-old fourplex or small apartment building, actual expenses typically range from 45–55% of gross income, making the rule a reasonable approximation. The rule accounts for property taxes, insurance, maintenance, capital expenditure reserves, vacancy, property management fees, landscaping, utilities paid by the owner, and administrative costs. It also implicitly includes the cost of occasional large expenses like roof replacements or HVAC failures averaged over time.'),
      h2(s, 7, 'When the 50% Rule Misses'),
      p(s, 8, 'The rule can significantly overestimate expenses for newer single-family rentals in low-tax states. A brand-new construction home with a home warranty, low property taxes, and a quality tenant might run at 30–35% expenses. Conversely, the rule can underestimate expenses for older properties in high-tax states, buildings where the landlord pays utilities, or properties with deferred maintenance. A 1960s apartment building in New Jersey with landlord-paid heat and water could easily run at 60–65% expenses. Always use the 50% rule as a starting point and adjust based on property-specific factors.'),
      h2(s, 9, 'What Is Included in the 50%'),
      p(s, 10, 'The 50% covers all operating expenses: property taxes (often the largest single line item), property insurance, maintenance and repairs, capital expenditure reserves (roof, HVAC, water heater, appliances), vacancy loss, property management fees (even if self-managing — your time has value), lawn care and snow removal, legal and accounting fees, advertising costs for tenant placement, pest control, and any landlord-paid utilities. It does not include mortgage principal and interest, which are financing costs rather than operating expenses. This distinction is important because NOI must be calculated before debt service.'),
      h2(s, 11, 'From Quick Estimate to Real Analysis'),
      p(s, 12, 'Use the 50% rule to screen deals quickly, then validate with actual numbers before making an offer. Request the seller\'s actual operating statements or T-12. Call insurance agents for real quotes. Look up the exact property tax assessment. Get bids from property management companies. Budget specific amounts for vacancy and maintenance based on the property\'s age and condition. The 50% rule should agree with your detailed analysis within 5–10 percentage points. If it does not, investigate why — either the property has unusually high or low expenses for a specific reason, or your detailed estimates are missing something.'),
    ],
  },

  // 6. Rent Roll
  {
    term: 'Rent Roll',
    slug: 'rent-roll',
    category: 'general',
    definition: 'A document listing every unit in a rental property along with the current tenant, lease terms, monthly rent, security deposit, and occupancy status. The rent roll is the foundational income document for evaluating any multi-family acquisition and serves as the starting point for underwriting property value and cash flow.',
    body: (s) => [
      h2(s, 1, 'What Is a Rent Roll?'),
      p(s, 2, 'A rent roll is a detailed register of every rental unit in a property, providing a snapshot of the income picture at a given point in time. It typically includes unit numbers, tenant names, lease start and end dates, monthly rent amounts, security deposits held, pet deposits, any additional fees, and current occupancy status. For a fourplex, the rent roll fits on a single page. For a 200-unit apartment complex, it may span several pages and include additional fields like unit size, bedroom count, and market rent comparisons. The rent roll is the first document any serious buyer requests when evaluating an acquisition.'),
      h2(s, 3, 'Why the Rent Roll Is Critical for Acquisitions'),
      p(s, 4, 'The rent roll drives property valuation. In commercial real estate, value equals NOI divided by cap rate, and NOI starts with gross rental income — which comes directly from the rent roll. A rent roll showing $10,000 per month in total rent produces a different valuation than one showing $12,000. The rent roll also reveals upside potential: units rented significantly below market represent an opportunity to increase income through lease renewals or turnover. Conversely, units rented above market may indicate future income decline. Every acquisition analysis begins with the rent roll.'),
      h2(s, 5, 'How to Verify a Rent Roll'),
      p(s, 6, 'Never take a seller\'s rent roll at face value. Verify it through multiple sources. Request estoppel certificates from each tenant — these are signed documents where tenants confirm their lease terms, rent amount, and deposit. Compare the rent roll against actual bank deposit records for the past 12 months. Request copies of all current leases and compare them against the rent roll figures. Look for discrepancies: inflated rents, phantom tenants, missing concessions, or side agreements not reflected in the official rent roll. Experienced sellers sometimes "dress up" the rent roll before listing by raising rents or filling vacancies with friends and family.'),
      h2(s, 7, 'Red Flags to Watch For'),
      p(s, 8, 'Be wary of a rent roll showing recent large rent increases just before listing — the seller may have jacked rents to inflate the property value without testing whether those rents are sustainable. Watch for tenants on month-to-month leases throughout the building, which could mean mass departures after closing. Multiple units with the same move-in date suggest the seller filled vacancies hastily to present a better occupancy picture. Any tenant paying rent in cash with no lease is a red flag. And if the total rent roll income does not match the bank deposits on the T-12, investigate why before proceeding.'),
      h2(s, 9, 'Rent Roll vs. T-12'),
      p(s, 10, 'The rent roll and the trailing 12-month operating statement (T-12) are complementary documents that serve different purposes. The rent roll shows what is happening today — current rents, current tenants, current lease terms. The T-12 shows what actually happened over the past year — actual income collected, actual expenses paid, actual vacancy experienced. The rent roll tells you potential; the T-12 tells you reality. A property might have a perfect rent roll today but a T-12 showing chronic vacancy, collection losses, and high turnover. Always analyze both documents together to get the complete picture.'),
      h2(s, 11, 'Using the Rent Roll in Your Analysis'),
      p(s, 12, 'Start by comparing each unit\'s rent against current market rents using Rentometer, Zillow rent estimates, or comparable listings. Calculate the total mark-to-market rental income — what the property would generate if every unit were leased at market rates. The difference between current rent roll income and market potential represents your value-add opportunity. Next, assess lease rollover risk by mapping lease expiration dates. If 60% of leases expire in the same month, you face significant re-leasing risk. Finally, factor in any below-market leases with long remaining terms that cannot be adjusted until renewal.'),
    ],
  },

  // 7. Trailing 12 (T-12)
  {
    term: 'Trailing 12 (T-12)',
    slug: 'trailing-12',
    category: 'analysis',
    definition: 'A financial statement summarizing the actual income and operating expenses of a rental property over the most recent 12 consecutive months. The T-12 is the gold standard for underwriting investment property acquisitions because it reflects real-world performance rather than projections or estimates.',
    body: (s) => [
      h2(s, 1, 'What Is a Trailing 12?'),
      p(s, 2, 'A trailing 12-month operating statement — universally called a "T-12" — is a month-by-month financial summary of a property\'s actual performance over the past year. It shows gross rental income, other income sources, vacancy and collection losses, and every operating expense category, resulting in a bottom-line net operating income figure. The T-12 is the most important document in any property acquisition because it tells you what the property actually earned and spent, not what the seller hopes or claims it will do in the future.'),
      h2(s, 3, 'Why the T-12 Is the Gold Standard'),
      p(s, 4, 'Pro forma projections are opinions. Tax returns are filed months after the fact and may be structured to minimize reported income. But a T-12 backed by bank statements is evidence. It captures seasonal variations in utility costs, month-to-month vacancy fluctuations, actual maintenance expenses, and real collection patterns. When a seller says "this property generates $120,000 in NOI," the T-12 either confirms that claim or exposes it as wishful thinking. Lenders require T-12s for commercial property underwriting precisely because they are the most reliable measure of a property\'s income-producing capacity.'),
      h2(s, 5, 'What to Look for in a T-12'),
      p(s, 6, 'Examine monthly income trends: are rents stable, increasing, or declining? Look at vacancy patterns — a property showing 100% occupancy every month for 12 straight months is suspicious for any multi-family property. Review each expense category for anomalies. A month with zero maintenance expense followed by a month with $15,000 suggests deferred maintenance or one-time capital items mixed with operating expenses. Compare utility costs against similar properties — inflated utilities might indicate deferred maintenance on aging systems. Add up all income and verify it matches the rent roll multiplied by 12, adjusted for actual vacancy.'),
      h2(s, 7, 'T-12 vs. T-3 vs. Pro Forma'),
      p(s, 8, 'A T-3 covers only the most recent three months and is useful for spotting very recent trends but too short to capture seasonal variations or annual expenses like property taxes and insurance renewals. A pro forma is a forward-looking projection of what the property could earn under new ownership, often with optimistic rent increases and understated expenses. Sophisticated investors use all three: the T-12 as the baseline for current performance, the T-3 to identify recent momentum or deterioration, and the pro forma to model the upside under their specific operating plan. Never pay pro forma pricing based on the seller\'s projections — pay T-12 pricing and capture the upside yourself.'),
      h2(s, 9, 'Seller Manipulation Tactics'),
      p(s, 10, 'Some sellers manipulate T-12s to inflate apparent value. Common tactics include deferring maintenance for 12 months to suppress expense figures, performing capital improvements but categorizing them as operating expenses in prior years (making the T-12 year look better), pre-paying expenses in the prior year, filling vacancies with below-market tenants just to show occupancy, and including non-recurring income as if it were ongoing. Protect yourself by requesting two or three years of operating statements to identify trends, plus bank statements to verify actual deposits match reported income.'),
      h2(s, 11, 'Requesting Supporting Documentation'),
      p(s, 12, 'A T-12 is only as reliable as the documents behind it. Request bank statements showing actual rental deposits for all 12 months. Ask for property tax bills to verify that line item. Request insurance policy declarations pages showing actual premiums. Get copies of utility bills for landlord-paid services. Ask for maintenance invoices for any large repair items shown on the T-12. If the seller cannot or will not produce supporting documentation, treat every line item on the T-12 with skepticism and underwrite more conservatively. The willingness of a seller to provide backup documents often tells you more about the accuracy of the T-12 than the T-12 itself.'),
    ],
  },

  // 8. CapEx Reserve
  {
    term: 'CapEx Reserve',
    slug: 'capex-reserve',
    category: 'general',
    definition: 'A cash reserve fund specifically designated for major capital expenditures — large, infrequent expenses like roof replacements, HVAC systems, water heaters, and flooring. Most investors budget 5–10% of gross rental income monthly into a CapEx reserve to avoid being blindsided by five-figure repair bills.',
    body: (s) => [
      h2(s, 1, 'What Is a CapEx Reserve?'),
      p(s, 2, 'A capital expenditure (CapEx) reserve is money set aside each month to cover the eventual cost of replacing major property components. Unlike routine maintenance — fixing a leaky faucet or patching drywall — capital expenditures involve replacing entire systems or components with useful lives measured in years or decades. A new roof costs $8,000–$15,000. An HVAC replacement runs $5,000–$10,000. These expenses are inevitable; the only question is when they will occur. A CapEx reserve ensures you have the funds available when that day comes, rather than scrambling for emergency financing or depleting your operating accounts.'),
      h2(s, 3, 'Industry Standard: 5–10% of Gross Income'),
      p(s, 4, 'Most experienced investors and property managers allocate 5–10% of gross rental income to CapEx reserves. On a property generating $2,000 per month in rent, that means setting aside $100–$200 per month ($1,200–$2,400 per year). The appropriate percentage depends on the property\'s age and condition. A newer property (built within the last 10 years) with modern systems can lean toward 5%. An older property with aging mechanicals, an original roof, and galvanized plumbing should budget closer to 10% or even higher. Failing to budget for CapEx is the most common financial mistake new investors make.'),
      h2(s, 5, 'Major CapEx Items and Costs'),
      p(s, 6, 'The big-ticket items that CapEx reserves cover include: roof replacement ($8,000–$15,000 for a single-family home, lasting 20–30 years), HVAC system ($5,000–$10,000, lasting 15–20 years), water heater ($1,000–$2,500, lasting 10–15 years), kitchen appliances ($3,000–$6,000 for a full set, lasting 10–15 years), flooring ($3,000–$8,000, lasting 7–15 years depending on material), exterior paint ($3,000–$7,000, every 7–10 years), plumbing overhaul ($5,000–$15,000 for repiping), electrical panel upgrade ($2,000–$4,000), driveway and parking lot resurfacing ($3,000–$10,000), and windows ($5,000–$15,000 for a full replacement).'),
      h2(s, 7, 'Capital Planning Spreadsheet'),
      p(s, 8, 'Sophisticated investors create a capital planning spreadsheet for each property. List every major component, its current age, estimated useful life, and replacement cost. Calculate the remaining useful life and divide the replacement cost by the remaining years to determine the annual reserve needed for each component. Sum all components for the total annual CapEx reserve requirement. This approach is far more precise than the percentage-of-rent method because it accounts for the specific condition and age of each system. Update the spreadsheet annually and whenever a major component is replaced, resetting its useful life clock.'),
      h2(s, 9, 'Component Useful Life Estimates'),
      p(s, 10, 'Use these general guidelines for planning: asphalt shingle roof 20–25 years, metal roof 40–60 years, HVAC system 15–20 years, gas furnace 15–20 years, central air conditioner 12–15 years, tank water heater 8–12 years, tankless water heater 15–20 years, garbage disposal 8–12 years, dishwasher 9–13 years, refrigerator 13–17 years, washing machine 10–14 years, carpet 5–8 years (depending on tenant turnover), hardwood refinishing 10–15 years, interior paint 3–5 years between tenants, exterior paint 7–10 years, vinyl siding 20–30 years, and concrete driveway 25–30 years.'),
      h2(s, 11, 'CapEx Reserves in Deal Analysis'),
      p(s, 12, 'Always include CapEx reserves as a line item in your property analysis, separate from maintenance and repairs. A deal that shows positive cash flow before CapEx reserves but negative cash flow after accounting for them is not truly cash flow positive — you are borrowing from the future to fund today\'s returns. When comparing deals, use consistent CapEx reserve assumptions so you are comparing apples to apples. And when negotiating purchase price, a property inspection revealing aging systems is your leverage to either reduce the price by the estimated near-term CapEx or require the seller to complete replacements before closing.'),
    ],
  },

  // 9. Occupancy Rate
  {
    term: 'Occupancy Rate',
    slug: 'occupancy-rate',
    category: 'analysis',
    definition: 'The percentage of available rental units in a property or market that are currently occupied by tenants. Occupancy rate directly impacts rental income, property valuation, and financing eligibility. A rate above 95% is considered excellent, while rates below 90% warrant investigation into the underlying causes.',
    body: (s) => [
      h2(s, 1, 'What Is Occupancy Rate?'),
      p(s, 2, 'Occupancy rate measures how much of a property\'s rental capacity is actually producing income. It is calculated by dividing the number of occupied units by the total number of available units and multiplying by 100. A 20-unit apartment building with 18 occupied units has a 90% occupancy rate. This metric is fundamental to every aspect of rental property investing — it determines income, drives valuation, influences financing terms, and signals market health. An investor who ignores occupancy dynamics is flying blind.'),
      h2(s, 3, 'Occupancy Rate Benchmarks'),
      p(s, 4, 'In the residential rental market, a 95% or higher occupancy rate is considered excellent and indicates strong demand relative to supply. Rates between 90% and 94% are good but suggest some softness that merits monitoring. Rates between 85% and 89% indicate a concerning level of vacancy that will pressure cash flow and may signal management problems, pricing issues, or market softening. Anything below 85% is a red flag requiring immediate investigation and action. These benchmarks vary by property type and market — student housing near a university might maintain 98% during the school year but drop to 60% in summer.'),
      h2(s, 5, 'Physical vs. Economic Occupancy'),
      p(s, 6, 'Physical occupancy measures whether units are physically occupied, regardless of whether rent is being collected. Economic occupancy measures the percentage of potential gross income actually collected. A property can have 95% physical occupancy but only 85% economic occupancy if several tenants are behind on rent or receiving concessions. Economic occupancy is the more important metric because it reflects actual income. A unit occupied by a non-paying tenant is economically worse than a vacant unit because you bear the cost of potential eviction while collecting no rent. Always ask for both physical and economic occupancy figures.'),
      h2(s, 7, 'Seasonal Variation'),
      p(s, 8, 'Occupancy rates fluctuate seasonally in most markets. Rental demand peaks in late spring and summer when people prefer to move, families want to settle before the school year, and weather is conducive to relocating. Winter months typically see lower demand and longer vacancy periods. Smart landlords time lease expirations to avoid the slowest months — never let a lease expire in December if you can help it. Structure leases to roll over during May through August when tenant demand is strongest. In vacation markets, the pattern reverses: peak occupancy during tourist season with extended vacancies in the off-season.'),
      h2(s, 9, 'Impact on Valuation and Financing'),
      p(s, 10, 'Occupancy rate directly impacts property valuation because income-based valuation methods start with actual or stabilized income. A 100-unit property at 92% occupancy generates less income — and is therefore worth less — than the same property at 97% occupancy. However, below-market occupancy can represent an opportunity if the buyer can improve management and fill vacancies. Lenders also scrutinize occupancy rates. Most commercial lenders require a minimum 85–90% occupancy rate for loan approval, and some require the property to maintain minimum occupancy as a loan covenant, with violation triggering default provisions.'),
      h2(s, 11, 'Strategies to Maximize Occupancy'),
      p(s, 12, 'Price units competitively — a vacant unit earning $0 is worse than an occupied unit earning $50 below market. Begin marketing units the moment you receive a move-out notice, not after the tenant leaves. Maintain properties attractively so tenants renew and prospective tenants are impressed during showings. Offer renewal incentives to good tenants 60–90 days before lease expiration. Respond to maintenance requests promptly — tenants who feel heard and respected stay longer. Build relationships with local employers, relocation companies, and real estate agents who can refer tenants. Track your occupancy monthly and investigate any sustained decline immediately rather than waiting for the problem to compound.'),
    ],
  },

  // 10. Lease-Up Period
  {
    term: 'Lease-Up Period',
    slug: 'lease-up-period',
    category: 'general',
    definition: 'The time required to bring a newly constructed, renovated, or repositioned property from initial availability to stabilized occupancy, typically defined as 90–95% occupied. During lease-up, the property operates below its income potential, requiring owners to budget for income shortfalls and aggressive marketing costs.',
    body: (s) => [
      h2(s, 1, 'What Is a Lease-Up Period?'),
      p(s, 2, 'The lease-up period is the transitional phase between when a property becomes available for tenancy and when it reaches stabilized occupancy — the long-term occupancy level the market supports, typically 92–95%. This period applies to brand-new construction, buildings that have undergone major renovation, or properties that have been repositioned for a different tenant profile. During lease-up, the owner faces a challenging combination of minimal income, ongoing carrying costs (mortgage, taxes, insurance, utilities), and significant marketing expenses. Properly budgeting for the lease-up period is critical to avoiding cash flow crises.'),
      h2(s, 3, 'Budgeting for Lost Income'),
      p(s, 4, 'The most common mistake in development and heavy renovation projects is underestimating the lease-up period. Every month a unit sits vacant costs the owner not only lost rent but also the full carrying cost of that unit — its share of the mortgage, property taxes, insurance, and utilities. For a 20-unit building with $1,500 average rent and $800 per unit in carrying costs, each month of complete vacancy costs $46,000. Budget conservatively: assume 12–18 months to reach stabilized occupancy for new construction apartments, 6–12 months for renovated properties, and 3–6 months for repositioned assets with modest improvements. Hold reserves to cover the full deficit.'),
      h2(s, 5, 'Marketing Strategy During Lease-Up'),
      p(s, 6, 'Lease-up marketing requires a different approach than filling occasional vacancies. Start marketing 60–90 days before the first units are available. Create professional listing photos and virtual tours. List on every major rental platform — Zillow, Apartments.com, Facebook Marketplace, and local sites. Consider hiring a leasing agent or offering referral bonuses. Host open houses and broker events. Invest in signage, especially for properties with street visibility. The goal is to create a pipeline of interested tenants so that units are spoken for before they are physically ready. Marketing costs during lease-up typically run 3–5x normal ongoing marketing spend.'),
      h2(s, 7, 'Concession Strategy'),
      p(s, 8, 'Concessions — incentives offered to attract tenants — are a common lease-up tool. One month free rent on a 12-month lease is the most traditional concession, effectively reducing the annual rent by 8.3% while maintaining the headline rental rate. Other concessions include reduced security deposits, waived application fees, free parking, or gift cards. Use concessions strategically: offer them early in the lease-up when you most need to build momentum, then reduce or eliminate them as occupancy approaches stabilization. Track effective rent (actual rent collected divided by lease months) to understand the true cost of your concession strategy.'),
      h2(s, 9, 'Typical Timelines by Property Type'),
      p(s, 10, 'New construction Class A apartments in strong markets typically lease up at 8–15 units per month and reach stabilization in 12–18 months for a 200-unit building. Class B renovated apartments lease faster because they target a broader renter pool and can achieve stabilization in 6–12 months for a 50-unit building. Single-family rental portfolios scattered across a metro can lease individual homes in 2–4 weeks per unit. Student housing near universities leases on an academic calendar — you either fill it for the school year or carry it empty until next fall. Senior living communities have the longest lease-up periods, often 24–36 months, because the decision cycle for aging residents is lengthy and emotional.'),
      h2(s, 11, 'Managing Lease-Up Risk'),
      p(s, 12, 'Mitigate lease-up risk through conservative underwriting, adequate reserves, and flexible financing. Negotiate interest-only loan payments during the lease-up period to reduce carrying costs. Phase construction or renovation so units come online gradually rather than all at once. Set competitive initial rents — it is better to lease up quickly at slightly below market and raise rents at renewal than to hold out for top-of-market rents and extend the vacancy period. Track leasing velocity weekly and adjust pricing or concessions immediately if absorption falls below projections. The lease-up period is a race against your reserves, and speed matters more than maximizing day-one rents.'),
    ],
  },

  // 11. Stabilized Occupancy
  {
    term: 'Stabilized Occupancy',
    slug: 'stabilized-occupancy',
    category: 'analysis',
    definition: 'The expected long-term occupancy rate a property will maintain under normal market conditions after the initial lease-up period is complete. Typically ranges from 92–95% for well-managed residential properties and serves as the baseline assumption for pro forma financial projections and income-based property valuations.',
    body: (s) => [
      h2(s, 1, 'What Is Stabilized Occupancy?'),
      p(s, 2, 'Stabilized occupancy is the occupancy level a property is expected to sustain over the long term under competent management and normal market conditions. It is not 100% because some level of vacancy is unavoidable — tenants move, units require turnover preparation, and the leasing process takes time. For most residential rental properties, stabilized occupancy falls between 92% and 95%, meaning you should plan for 5–8% of your units being vacant at any given time as a normal cost of doing business. This figure is foundational to pro forma financial analysis and property valuation.'),
      h2(s, 3, 'Market-Dependent Variations'),
      p(s, 4, 'Stabilized occupancy varies by market, property type, and submarket. In supply-constrained markets with strong demand — think urban cores with limited new construction — stabilized occupancy might be 96–98%. In overbuilt suburban markets or areas with declining population, stabilized occupancy could be 88–90%. Student housing stabilizes at 95%+ during the academic year but the annual average may be 85% when accounting for summer vacancy. Class A luxury apartments typically stabilize 1–2% below market average because they serve a narrower renter pool that is more price-sensitive and mobile.'),
      h2(s, 5, 'Stabilized Occupancy in Pro Forma Analysis'),
      p(s, 6, 'Every pro forma financial projection is built on an assumed stabilized occupancy rate. This assumption directly determines projected income, which cascades through NOI, cash flow, return metrics, and property valuation. A property with $100,000 in gross potential rent projected at 95% stabilized occupancy shows $95,000 in effective gross income. The same property projected at 90% shows $90,000 — a $5,000 annual income difference that translates to a $71,000 value difference at a 7% cap rate. Always verify that the pro forma stabilized occupancy assumption is realistic for the specific submarket and property class.'),
      h2(s, 7, 'Current Occupancy vs. Stabilized Occupancy'),
      p(s, 8, 'Current occupancy is a snapshot of how many units are filled today. Stabilized occupancy is the long-term expectation. These two figures can diverge significantly in both directions. A newly acquired property with deferred maintenance might have 80% current occupancy but 94% stabilized occupancy potential once the new owner invests in improvements and better management. Conversely, a property showing 98% current occupancy might be unsustainably priced below market — when rents are raised to market levels, some tenants will leave and occupancy will settle at the stabilized rate. Understanding the gap between current and stabilized occupancy is key to identifying value-add opportunities.'),
      h2(s, 9, 'Impact on Valuation'),
      p(s, 10, 'Lenders and appraisers use stabilized occupancy — not current occupancy — to determine a property\'s value for financing purposes. If a property is below stabilized occupancy, lenders will typically value it based on current actual income until stabilization is achieved, which means you may receive less favorable loan terms during the lease-up or turnaround period. Once the property reaches stabilized occupancy, you can refinance based on the higher stabilized income. This is a core mechanic of the BRRRR strategy: buy below stabilized occupancy, improve the property, achieve stabilization, and refinance at the higher stabilized value to pull out your initial investment.'),
      h2(s, 11, 'Practical Application'),
      p(s, 12, 'Research stabilized occupancy for your target market by reviewing Census data, consulting local property management companies, and analyzing apartment market reports from firms like CoStar or CBRE. Use the lower end of the range in your underwriting to build in a margin of safety. If market data suggests 93–96% stabilized occupancy for your property type and submarket, underwrite at 93%. Track your portfolio\'s actual occupancy quarterly and compare it against your stabilized assumptions. If actual occupancy consistently exceeds your projections, your underwriting is conservative — which is exactly where you want to be.'),
    ],
  },

  // 12. Triple Net Lease (NNN)
  {
    term: 'Triple Net Lease (NNN)',
    slug: 'triple-net-lease',
    category: 'general',
    definition: 'A lease structure in which the tenant pays all property operating expenses — property taxes, building insurance, and maintenance costs — in addition to base rent. NNN leases create a truly passive investment for the landlord and are the dominant lease type in single-tenant retail and commercial properties.',
    body: (s) => [
      h2(s, 1, 'What Is a Triple Net Lease?'),
      p(s, 2, 'A triple net lease (NNN) is a commercial lease agreement where the tenant assumes responsibility for all three major categories of property operating expenses: property taxes (the first "N"), building insurance (the second "N"), and common area maintenance including structural repairs (the third "N"). The landlord receives base rent with virtually no operating expenses to manage or pay. This structure makes NNN properties among the most passive forms of real estate investment — some owners joke that their only responsibility is depositing the rent check and filing their taxes.'),
      h2(s, 3, 'Why NNN Leases Appeal to Passive Investors'),
      p(s, 4, 'For investors seeking truly hands-off income, NNN leases are the gold standard. The tenant handles everything from property taxes to roof repairs to snow removal. There are no midnight maintenance calls, no property management fees to pay, and no expense variability eating into your returns. Your income is predictable and fixed (or escalating on a known schedule) for the duration of the lease, which typically runs 10–25 years. This predictability makes NNN properties particularly popular with retirees, 1031 exchange buyers looking to simplify, and high-net-worth individuals who want real estate returns without real estate headaches.'),
      h2(s, 5, 'Credit Tenant NNN Investments'),
      p(s, 6, 'The most sought-after NNN investments are leased to "credit tenants" — publicly traded companies or large franchisees with strong financial backing. Think McDonald\'s, Walgreens, Dollar General, Starbucks, or CVS. The value of a credit tenant NNN property is driven primarily by the strength of the tenant\'s credit and the remaining lease term. A Walgreens with 20 years remaining on a corporate-guaranteed NNN lease trades at a premium (lower cap rate, higher price) because the income stream is considered nearly as safe as a bond. Typical cap rates for credit tenant NNN properties range from 5% to 7%, depending on the tenant, location, and remaining lease term.'),
      h2(s, 7, 'Cap Rates and Pricing'),
      p(s, 8, 'NNN property pricing is driven by three factors: tenant credit quality, remaining lease term, and location. A brand-new Chick-fil-A with a 20-year corporate-guaranteed lease in a growing suburb might trade at a 4.5% cap rate. A regional restaurant chain with 5 years remaining in a secondary market might trade at an 8% cap rate. Every year of remaining lease term that burns off slightly increases the cap rate (decreasing value) because the certainty of future income diminishes. Investors must balance the desire for strong credit tenants against the lower yields those tenants command. Higher cap rates mean more income but more risk.'),
      h2(s, 9, 'Lease Term and Re-Leasing Risk'),
      p(s, 10, 'The biggest risk in NNN investing is what happens when the lease expires. If McDonald\'s vacates your property after 20 years, you are left with a building specifically designed for a fast-food restaurant in a location that McDonald\'s has decided is no longer profitable. Re-leasing can be challenging and expensive — you may need to renovate the space, accept a lower-credit tenant, or offer significant concessions. Smart NNN investors pay close attention to lease renewal options, remaining term, and the adaptability of the building for alternative tenants. Properties with 5 years or less remaining on the lease carry significantly more risk and should be priced accordingly.'),
      h2(s, 11, 'NNN Lease Considerations'),
      p(s, 12, 'Before investing in a NNN property, read the actual lease document carefully. Verify exactly which expenses are the tenant\'s responsibility — some leases labeled as "NNN" are actually modified net leases where the landlord retains responsibility for roof and structural repairs. Check for rental escalations — a flat-rate NNN lease with no increases loses purchasing power to inflation over a 20-year term. Understand the tenant\'s right to sublease or assign the lease. Evaluate the location\'s long-term viability — demographics can shift dramatically over a 20-year lease term. And always get a Phase I environmental assessment, especially for gas stations, dry cleaners, or auto service tenants who may leave contamination liabilities behind.'),
    ],
  },

  // 13. Gross Lease
  {
    term: 'Gross Lease',
    slug: 'gross-lease',
    category: 'general',
    definition: 'A lease structure in which the landlord pays all or most property operating expenses — including property taxes, insurance, and maintenance — and the tenant pays a single, all-inclusive rent amount. Gross leases are standard in residential rentals and common in multi-tenant office buildings.',
    body: (s) => [
      h2(s, 1, 'What Is a Gross Lease?'),
      p(s, 2, 'A gross lease, sometimes called a full-service lease, is a rental agreement where the tenant pays one fixed rental amount and the landlord is responsible for all property operating expenses. The tenant\'s financial obligation is simple and predictable: pay rent. Everything else — property taxes, insurance, maintenance, repairs, and often utilities — falls on the landlord. Virtually every residential rental in America operates on a gross lease basis. In commercial real estate, gross leases are most common in multi-tenant office buildings where dividing expenses among tenants would be impractical.'),
      h2(s, 3, 'Gross Lease vs. NNN Lease'),
      p(s, 4, 'The fundamental difference is who bears the expense risk. In a gross lease, the landlord absorbs all operating cost increases. If property taxes jump 20% or insurance premiums spike after a hurricane, the landlord\'s NOI decreases while the tenant\'s rent stays the same. In a NNN lease, those increases are passed directly to the tenant. For this reason, gross lease rents are significantly higher than NNN rents on a per-square-foot basis — the higher rent compensates the landlord for taking on expense risk. A space that might lease for $15/SF NNN could lease for $25/SF gross, with the $10 differential covering estimated expenses plus a risk margin.'),
      h2(s, 5, 'Modified Gross Leases'),
      p(s, 6, 'Many commercial leases fall somewhere between a pure gross lease and a pure NNN lease. A modified gross lease assigns specific expense categories to the tenant while the landlord retains others. Common structures include the tenant paying utilities and janitorial services while the landlord covers taxes, insurance, and structural maintenance. Another variation is the "base year stop" — the landlord pays all expenses in the first year, establishing a baseline, and the tenant pays their proportional share of any increases above that baseline in subsequent years. Modified gross leases attempt to balance simplicity for the tenant with expense protection for the landlord.'),
      h2(s, 7, 'Expense Risk for the Landlord'),
      p(s, 8, 'The primary challenge of gross leases is that the landlord bears all expense risk. Property taxes can increase unpredictably due to reassessments. Insurance premiums fluctuate with claims history and market conditions. Maintenance costs escalate as buildings age. Utility costs vary with weather and energy prices. If you sign a 5-year gross lease and expenses increase 3% annually while rent escalates only 2%, your NOI erodes every year. This is why accurate expense budgeting is critical before setting gross lease rents. Underestimate expenses and your seemingly profitable property becomes a money loser.'),
      h2(s, 9, 'Budgeting and Rent Setting'),
      p(s, 10, 'Setting the right gross lease rent requires detailed expense forecasting. Start with current actual expenses and project increases over the lease term. Add a margin for unexpected costs — at least 5–10% above your baseline projection. Factor in the target NOI you need to achieve your return requirements. The resulting figure is your minimum gross lease rent. Compare this against market rents for similar properties. If the market rent supports your expense projections with adequate margin, the deal works. If market rents are below your calculated minimum, the property cannot generate acceptable returns under a gross lease structure and you should consider a different property or a modified lease structure.'),
      h2(s, 11, 'Gross Leases in Residential Investing'),
      p(s, 12, 'For residential rental investors, the gross lease is simply how the business works — tenants expect to pay one rental amount and have the landlord handle everything else. This means residential investors must be disciplined about expense management. Track every expense category monthly. Shop insurance annually to ensure competitive rates. Appeal property tax assessments when values are overstated. Perform preventive maintenance to avoid expensive emergency repairs. Build CapEx reserves for major replacements. And raise rents annually to at least keep pace with expense increases. The investors who thrive with gross leases are those who manage expenses as aggressively as they pursue income growth.'),
    ],
  },

  // 14. Property Tax Assessment
  {
    term: 'Property Tax Assessment',
    slug: 'property-tax-assessment',
    category: 'general',
    definition: 'The value assigned to a property by a local government assessor for the purpose of calculating property taxes. The assessed value may differ significantly from the property\'s market value and serves as the base upon which the local tax rate (millage) is applied to determine the annual tax bill.',
    body: (s) => [
      h2(s, 1, 'What Is a Property Tax Assessment?'),
      p(s, 2, 'A property tax assessment is the local government\'s official determination of your property\'s value for taxation purposes. The county assessor (or equivalent official) assigns an assessed value based on factors including recent sales of comparable properties, the property\'s size and features, its location, and its current use. This assessed value is then multiplied by the local tax rate (expressed as a mill rate, where one mill equals $1 per $1,000 of assessed value) to calculate your annual property tax bill. Property taxes are typically the single largest operating expense for rental properties, making the assessment a critical factor in investment returns.'),
      h2(s, 3, 'Assessed Value vs. Market Value'),
      p(s, 4, 'In many jurisdictions, assessed value and market value are different numbers. Some states assess properties at a percentage of market value — California\'s Proposition 13, for example, limits assessed value to the purchase price plus a maximum 2% annual increase, regardless of how much the property has appreciated. Other states assess at full market value but apply homestead exemptions or assessment caps that reduce the taxable amount. Understanding your state\'s assessment methodology is essential because a property\'s tax bill can change dramatically after a sale. A property assessed at $200,000 under the current owner might be reassessed at $350,000 (market value) after you purchase it, potentially doubling the tax bill.'),
      h2(s, 5, 'Reassessment Triggers'),
      p(s, 6, 'Most jurisdictions reassess properties when certain events occur. The most common trigger is a property sale — the new purchase price often becomes the basis for the new assessment. Significant renovations that increase the property\'s value can also trigger reassessment. Some jurisdictions conduct periodic mass reassessments every 2–5 years, adjusting all properties simultaneously. In Proposition 13 states, the assessment resets to market value upon sale, which means long-held properties may have artificially low assessments that balloon after transfer. Always calculate the post-purchase assessed value and resulting tax bill before closing — the seller\'s current tax bill is irrelevant to your future operating costs.'),
      h2(s, 7, 'Appealing Your Assessment'),
      p(s, 8, 'Property owners have the right to appeal their assessments, and successful appeals are more common than most investors realize. Studies suggest that 30–40% of properties are over-assessed, and a significant portion of appeals result in reductions. The appeal process typically involves filing a formal protest within a specified deadline (often 30–60 days after the assessment notice), providing evidence that the assessed value exceeds fair market value, and presenting your case before an assessment review board. Evidence can include recent comparable sales, an independent appraisal, documentation of property defects, or income data showing the property cannot support the assessed value.'),
      h2(s, 9, 'Impact on NOI and Investment Returns'),
      p(s, 10, 'Property taxes flow directly through to NOI and every downstream return metric. A $2,000 annual increase in property taxes reduces NOI by $2,000 and, at a 7% cap rate, reduces property value by approximately $28,500. For a leveraged investor, that $2,000 reduction comes entirely out of cash flow, potentially dropping cash-on-cash return by a full percentage point or more. This is why sophisticated investors include property tax due diligence in their acquisition analysis. Calculate the taxes based on your expected post-purchase assessment, not the seller\'s current tax bill, and budget for future increases based on local reassessment patterns.'),
      h2(s, 11, 'Assessment Caps and Exemptions'),
      p(s, 12, 'Several states offer protections that limit property tax increases. California\'s Proposition 13 caps annual increases at 2% until sale. Florida\'s Save Our Homes cap limits increases to 3% for homesteaded properties. Texas has homestead exemptions and a 10% annual cap on homestead assessment increases. However, most of these protections apply only to primary residences, not investment properties. Investment properties are typically assessed at full market value and reassessed regularly. Know the specific rules in your investment market — they can make a material difference in your operating expenses and the relative competitiveness of different markets for buy-and-hold investing.'),
    ],
  },

  // 15. Rent Increase
  {
    term: 'Rent Increase',
    slug: 'rent-increase',
    category: 'general',
    definition: 'An upward adjustment in the rental rate charged to a tenant, typically implemented at lease renewal. Strategic rent increases are essential for maintaining property income in line with market conditions, offsetting rising operating expenses, and maximizing the property\'s value over time.',
    body: (s) => [
      h2(s, 1, 'Why Rent Increases Matter'),
      p(s, 2, 'Rent increases are not optional for long-term rental property success — they are essential. Operating expenses rise every year: property taxes increase, insurance premiums climb, maintenance costs inflate, and utility rates go up. If rents stay flat while expenses grow at 3% annually, your NOI erodes year after year. Over a 10-year hold, flat rents with 3% annual expense growth can cut your cash flow in half. Beyond expense management, rent increases directly impact property value in income-based valuation. A $100 monthly increase across 10 units adds $12,000 in annual NOI, which at a 7% cap rate adds approximately $171,000 in property value.'),
      h2(s, 3, 'Market-Based Rent Analysis'),
      p(s, 4, 'Before raising rents, research what the market supports. Use tools like Rentometer, Zillow Rent Zestimates, Apartments.com, and local classified listings to determine current market rents for comparable units in your area. Compare your current rents against these benchmarks. If the market supports $1,500 for your unit type but you are charging $1,300, you have room to increase. If you are already at $1,500, pushing to $1,600 risks losing your tenant to a cheaper alternative. The goal is to stay within 3–5% of market rent — high enough to maximize income but not so high that you trigger excessive turnover.'),
      h2(s, 5, 'CPI-Tied and Fixed Increases'),
      p(s, 6, 'Some landlords include automatic annual rent increases in the lease agreement, tied either to a fixed percentage (typically 3–5%) or to the Consumer Price Index (CPI). Fixed increases provide predictability for both parties and avoid the discomfort of annual negotiations. CPI-tied increases ensure rents keep pace with inflation but can vary unpredictably — CPI was 1.2% in 2020 but 9.1% in 2022. A common compromise is a fixed minimum increase (e.g., 2%) with a CPI adjustment if inflation exceeds that floor. Include the escalation language in your lease so increases are expected rather than surprising.'),
      h2(s, 7, 'Notice Requirements'),
      p(s, 8, 'Every jurisdiction has specific legal requirements for rent increase notices. Most states require 30–60 days written notice for month-to-month tenancies. For annual leases, the increase typically takes effect at renewal with notice given 60–90 days before the lease expires. Some rent-controlled jurisdictions have additional requirements including specific notice formats, maximum allowable increases, and registration with local housing authorities. Failure to comply with notice requirements can invalidate the increase entirely. Know and follow your local rules precisely — a small procedural error can cost you months of increased rent.'),
      h2(s, 9, 'Rent Control Considerations'),
      p(s, 10, 'In rent-controlled markets — including parts of California, New York, Oregon, and several major cities — annual rent increases are capped by law, typically between 3% and 10% depending on the jurisdiction. Some rent control ordinances only apply to buildings constructed before a certain date, while others cover all rental housing. In controlled markets, you must understand the specific maximum allowable increase, the process for applying for hardship increases above the cap, and any exemptions that might apply to your property. Rent control fundamentally changes the investment calculus because your ability to raise rents to market levels is legally restricted.'),
      h2(s, 11, 'Balancing Rent Growth vs. Tenant Retention'),
      p(s, 12, 'Every rent increase risks tenant turnover, and turnover is expensive. Between lost rent during vacancy (typically 2–4 weeks), unit preparation costs (cleaning, painting, minor repairs), marketing expenses, and the time cost of showing the unit and processing applications, a single turnover can cost $2,000–$5,000. A $50 monthly rent increase generates only $600 in additional annual revenue — if that increase triggers a turnover, it takes 3–8 years to recover the turnover cost. This is why moderate, consistent annual increases (3–5%) are more profitable than large, sporadic jumps. Good tenants who pay on time, maintain the property, and renew without drama are worth keeping, even if it means accepting slightly below-market rent.'),
    ],
  },

  // 16. Wraparound Mortgage
  {
    term: 'Wraparound Mortgage',
    slug: 'wraparound-mortgage',
    category: 'financing',
    definition: 'A form of secondary financing in which the seller creates a new mortgage that "wraps around" the existing mortgage. The buyer makes payments to the seller at a higher interest rate, and the seller continues making payments on the original loan, profiting from the interest rate spread between the two loans.',
    body: (s) => [
      h2(s, 1, 'What Is a Wraparound Mortgage?'),
      p(s, 2, 'A wraparound mortgage — also called a "wrap" — is a creative financing technique where the seller finances the buyer\'s purchase by creating a new, larger mortgage that encompasses the seller\'s existing mortgage. The buyer makes a single monthly payment to the seller at an agreed-upon interest rate. The seller then uses part of that payment to continue making payments on the original underlying mortgage and keeps the difference. The buyer gets financing without going through a traditional lender, and the seller earns income from the spread between the two interest rates. Wraps are most commonly used when conventional financing is difficult to obtain or when the seller has a below-market-rate existing mortgage.'),
      h2(s, 3, 'How the Rate Spread Works'),
      p(s, 4, 'The seller\'s profit comes from the difference between the interest rate on the wrap mortgage and the rate on the underlying original mortgage. For example, if the seller\'s existing mortgage carries a 4% rate and the wrap mortgage charges the buyer 7%, the seller earns a 3% spread on the amount of the existing mortgage. On a $200,000 underlying loan, a 3% spread generates approximately $6,000 per year in interest income for the seller. Additionally, the wrap mortgage is typically larger than the existing mortgage (including the seller\'s equity), so the seller earns the full 7% on the portion above the existing loan balance. This dual income stream makes wraps attractive for sellers who want ongoing investment returns.'),
      h2(s, 5, 'Due-on-Sale Risk'),
      p(s, 6, 'The most significant risk in a wraparound mortgage is the due-on-sale clause present in virtually all conventional mortgages originated since 1982. This clause gives the lender the right to demand full repayment of the loan if the property is sold or transferred. Because a wrap effectively transfers the property to the buyer while leaving the original loan in place, the lender could technically call the loan due. In practice, most lenders do not enforce the due-on-sale clause as long as payments are current, but the risk exists. If the lender does call the loan, the buyer must obtain replacement financing or face foreclosure. This risk should be clearly disclosed and understood by both parties.'),
      h2(s, 7, 'Legal Documentation'),
      p(s, 8, 'Proper legal documentation is essential for a wraparound mortgage. The key documents include: a wraparound promissory note detailing the loan amount, interest rate, payment schedule, and maturity date; a wraparound deed of trust or mortgage securing the note against the property; a disclosure of the underlying mortgage terms; an agreement specifying who will service the underlying loan payments; and escrow instructions if a third-party servicer will handle payment collection and distribution. Both parties should have independent legal counsel review all documents. Many states have specific requirements for seller-financed transactions that must be followed to ensure enforceability.'),
      h2(s, 9, 'When Sellers Use Wraparound Mortgages'),
      p(s, 10, 'Sellers typically offer wraps in several scenarios: when the property is difficult to sell through conventional channels, when the seller wants ongoing income rather than a lump-sum payment, when the seller has a below-market interest rate they want to monetize, or when the buyer cannot qualify for traditional financing. Wraps are also popular with investor-sellers who want to defer capital gains taxes through an installment sale while earning interest income. The wrap structure allows the seller to remain invested in real estate returns without the responsibilities of property ownership, making it an attractive retirement strategy for landlords looking to exit active management.'),
      h2(s, 11, 'Buyer Protections'),
      p(s, 12, 'Buyers in a wraparound mortgage need specific protections. The most critical is ensuring the seller actually makes the underlying mortgage payments. If the seller collects the wrap payment but stops paying the original mortgage, the underlying lender can foreclose — wiping out the buyer\'s interest. Protections include requiring payments be made through a neutral third-party loan servicer who pays the underlying mortgage first, recording the wrap mortgage to establish the buyer\'s lien position, requiring the seller to provide monthly proof that the underlying mortgage is current, and including default remedies that allow the buyer to make underlying mortgage payments directly if the seller fails to do so.'),
    ],
  },

  // 17. Contract for Deed
  {
    term: 'Contract for Deed',
    slug: 'contract-for-deed',
    category: 'financing',
    definition: 'An installment sale agreement in which the buyer makes payments directly to the seller over time, but legal title to the property does not transfer until the full purchase price is paid or a specified milestone is reached. Also called a land contract, installment land contract, or agreement for deed.',
    body: (s) => [
      h2(s, 1, 'What Is a Contract for Deed?'),
      p(s, 2, 'A contract for deed is a seller-financed arrangement where the buyer takes possession and equitable interest in the property but the seller retains legal title until the contract terms are fulfilled — typically full payment of the purchase price or a substantial portion of it. The buyer makes regular installment payments to the seller, much like mortgage payments, and gains the benefits of ownership (use, improvement, tax deductions) while the seller retains the security of legal title. This structure has been used for over a century in American real estate and remains a viable creative financing tool, particularly for properties and buyers that do not fit conventional lending criteria.'),
      h2(s, 3, 'Equitable vs. Legal Title'),
      p(s, 4, 'The distinction between equitable and legal title is central to understanding contracts for deed. Equitable title gives the buyer the right to use, occupy, and benefit from the property. Legal title — the actual recorded deed — remains with the seller until the contract conditions are met. This creates a split ownership arrangement where the buyer has most of the practical benefits of ownership but the seller has the ultimate legal protection. Once the buyer fulfills the contract (typically by making all payments or refinancing into a conventional mortgage), the seller is obligated to deliver a deed transferring legal title to the buyer.'),
      h2(s, 5, 'Default Provisions'),
      p(s, 6, 'Default provisions in a contract for deed are critical and vary significantly by state. In some states, if the buyer defaults on payments, the seller can cancel the contract through a relatively quick process (30–60 days notice), reclaim the property, and keep all payments made to date — essentially treating the buyer like a tenant being evicted. In other states, the buyer has built up an equitable interest that must be protected through a formal foreclosure process, similar to a mortgage default. The legal treatment of default has significant implications for both parties and is one reason why state-specific legal counsel is essential. Recent regulatory trends have moved toward greater buyer protection.'),
      h2(s, 7, 'State-Specific Regulations'),
      p(s, 8, 'Contract for deed regulations vary dramatically by state. Minnesota requires contracts to be recorded and gives buyers extensive cure rights. Texas enacted strong consumer protection laws requiring specific disclosures and giving buyers the right to convert to a deed-of-trust arrangement. Some states require sellers to provide annual accounting of payments applied to principal and interest. Others limit the forfeiture remedy if the buyer has paid a certain percentage of the purchase price. Before entering into a contract for deed in any state, both parties must understand the specific legal requirements, recording obligations, and default remedies applicable in that jurisdiction.'),
      h2(s, 9, 'Buyer Pros and Cons'),
      p(s, 10, 'For buyers, the primary advantage is access to property ownership without qualifying for a conventional mortgage. Buyers with credit issues, self-employment income that is difficult to document, or insufficient down payment funds can negotiate directly with a motivated seller. Payments build equity over time, and many contracts allow the buyer to refinance into a conventional mortgage at any point. The disadvantages include the risk of losing all accumulated equity if you default (in forfeiture states), lack of legal title until the contract is fulfilled, the risk that the seller could encumber the property or face their own financial difficulties, and typically higher interest rates than conventional loans.'),
      h2(s, 11, 'Seller Pros and Cons'),
      p(s, 12, 'For sellers, a contract for deed offers the ability to sell a property that may be difficult to move through conventional channels, earn interest income on the financed amount, defer capital gains through installment sale treatment, and retain title as security against buyer default. The risks include the buyer defaulting after making improvements that complicate reclamation, the property deteriorating under the buyer\'s care, potential lengthy legal proceedings to regain possession in some states, and the administrative burden of managing the installment payments. Sellers should require the buyer to maintain property insurance naming the seller as an additional insured and should consider using a third-party servicer to handle payment processing and escrow.'),
    ],
  },

  // 18. Assignment of Contract
  {
    term: 'Assignment of Contract',
    slug: 'assignment-of-contract',
    category: 'legal',
    definition: 'The transfer of a buyer\'s rights and obligations under a real estate purchase contract to a third party. Assignment is the core mechanism of wholesale real estate — the wholesaler enters into a purchase agreement with the seller, then assigns that contract to an end buyer for a fee, profiting without ever taking title to the property.',
    body: (s) => [
      h2(s, 1, 'What Is an Assignment of Contract?'),
      p(s, 2, 'An assignment of contract is a legal transfer where the original buyer (the assignor) sells their position in a purchase agreement to a new buyer (the assignee). The assignee steps into the original buyer\'s shoes, assuming all rights and obligations under the contract — including the right to purchase the property at the agreed-upon price and terms. The original buyer receives an assignment fee for transferring this right. The seller\'s position does not change; they still sell the property on the same terms to whoever shows up at closing. Assignment is the simplest and most capital-efficient way to profit from real estate without owning property.'),
      h2(s, 3, 'Assignment as the Core of Wholesaling'),
      p(s, 4, 'Real estate wholesaling is built on the assignment of contract. The process works like this: the wholesaler identifies a motivated seller and negotiates a purchase contract at a below-market price. The wholesaler then markets the contract to their buyer list — typically fix-and-flip investors or landlords looking for discounted properties. When a buyer agrees to purchase the contract rights, the wholesaler assigns the contract for a fee. At closing, the end buyer pays the original purchase price plus the assignment fee, the seller receives their agreed-upon price, and the wholesaler collects their fee. The wholesaler never owns the property, never arranges financing, and risks only the earnest money deposit.'),
      h2(s, 5, 'Typical Assignment Fees'),
      p(s, 6, 'Assignment fees vary widely depending on the deal size, market, and the spread between the contract price and the property\'s actual value. For residential properties, assignment fees typically range from $5,000 to $20,000, with $10,000 being a common target for experienced wholesalers. On larger commercial or multi-family deals, assignment fees can reach $50,000 or more. The fee is justified by the value the wholesaler provides: finding the deal, negotiating with the seller, and delivering an off-market opportunity to the end buyer. The end buyer is willing to pay the fee because the total cost (purchase price plus assignment fee) is still below what they would pay for a comparable property on the open market.'),
      h2(s, 7, 'The "And/Or Assigns" Clause'),
      p(s, 8, 'For a contract to be assignable, it must not prohibit assignment. Most standard real estate purchase contracts do not address assignment at all, which generally means assignment is permitted by default. However, savvy wholesalers include explicit "and/or assigns" language in the buyer field — for example, "John Smith and/or assigns" as the buyer name. This makes the right to assign unambiguous. Some sellers and their agents may resist this language, recognizing it as a sign of wholesaling activity. In those cases, the wholesaler can use their LLC name as the buyer and assign the LLC\'s interest, or opt for a double close instead of an assignment.'),
      h2(s, 9, 'Disclosure Requirements'),
      p(s, 10, 'Disclosure requirements for contract assignments vary by state and are evolving. Some states require the wholesaler to disclose to the seller that they intend to assign the contract. Others require disclosure of the assignment fee amount. A growing number of states are implementing regulations requiring wholesalers to hold a real estate license or at least register with the state. Regardless of legal requirements, transparency tends to produce better outcomes. Many experienced wholesalers disclose their role upfront, explaining to the seller that they may assign the contract and that the assignment does not change the seller\'s terms. Honesty builds trust and reduces the risk of legal challenges.'),
      h2(s, 11, 'When Assignment Does Not Work'),
      p(s, 12, 'Assignment has limitations. Some purchase contracts explicitly prohibit assignment — particularly bank-owned (REO) properties, HUD homes, and properties sold through listing agents who include non-assignment clauses. When assignment is not possible, the alternative is a double close: the wholesaler actually purchases the property and immediately resells it to the end buyer in two separate transactions. Assignment also becomes impractical when the assignment fee is very large relative to the purchase price, because the end buyer may balk at the visible markup on the closing statement. In those situations, a double close hides the profit margin from both the seller and the end buyer.'),
    ],
  },

  // 19. Double Close
  {
    term: 'Double Close',
    slug: 'double-close',
    category: 'strategies',
    definition: 'A wholesaling technique involving two back-to-back real estate closings on the same day — the wholesaler first purchases the property from the seller (A-to-B transaction) and immediately resells it to the end buyer (B-to-C transaction). A double close is used when contract assignment is not possible or when the wholesaler wants to keep their profit margin confidential.',
    body: (s) => [
      h2(s, 1, 'What Is a Double Close?'),
      p(s, 2, 'A double close — also called a simultaneous close or same-day flip — is a transaction structure where the wholesaler (Party B) completes two separate real estate closings in rapid succession. In the first transaction (A-to-B), the wholesaler purchases the property from the original seller (Party A) at the negotiated below-market price. In the second transaction (B-to-C), the wholesaler immediately sells the property to the end buyer (Party C) at a higher price. The difference between the two prices, minus closing costs, is the wholesaler\'s profit. Both transactions typically occur on the same day, often within hours or even minutes of each other at the same title company.'),
      h2(s, 3, 'Why Use a Double Close Instead of Assignment?'),
      p(s, 4, 'There are several reasons wholesalers choose a double close over a simple assignment. First, when the profit margin is large — say $40,000 or more — an assignment makes that fee visible on the closing statement to both seller and buyer, which can cause either party to feel the deal is unfair and attempt to renegotiate or back out. A double close creates two separate closing statements, so neither party sees the wholesaler\'s spread. Second, some contracts prohibit assignment but do not prevent the buyer from closing and immediately reselling. Third, some states have regulations that make assignments legally complex, while a standard purchase-and-sale requires no special licensing.'),
      h2(s, 5, 'Transactional Funding'),
      p(s, 6, 'The challenge with a double close is that the wholesaler needs funds to complete the A-to-B purchase before receiving the proceeds from the B-to-C sale. Transactional funding solves this problem. Transactional lenders provide short-term capital — sometimes for just a few hours — secured by the B-to-C contract as proof that the wholesaler has an immediate exit. The lender wires the purchase funds for the A-to-B closing, and as soon as the B-to-C closing funds, the transactional lender is repaid. Transactional funding fees typically range from 1–2% of the A-to-B purchase price for same-day closings, plus a flat fee. Some title companies will allow the C buyer\'s funds to be used for the A-to-B closing, eliminating the need for transactional funding entirely.'),
      h2(s, 7, 'Title Company Requirements'),
      p(s, 8, 'Not all title companies will facilitate double closings. Some have internal policies against same-day flips, and others are unfamiliar with the process. Before committing to a double close strategy, establish relationships with 2–3 title companies in your market that are experienced with simultaneous closings and willing to handle the mechanics. Key requirements include: the title company must be comfortable closing both transactions the same day, they must be willing to use the C buyer\'s funds to complete the A transaction (or accept transactional funding), and they must provide separate closing statements for each transaction. Finding investor-friendly title companies is one of the first steps any serious wholesaler should take.'),
      h2(s, 9, 'A-to-B Then B-to-C Mechanics'),
      p(s, 10, 'The typical double close proceeds as follows: the A-to-B closing occurs first — the wholesaler (or their transactional lender) wires purchase funds, the deed transfers from seller to wholesaler, and the transaction is recorded. Immediately after, the B-to-C closing begins — the end buyer\'s funds are wired, the deed transfers from wholesaler to end buyer, the transactional lender is repaid, and the wholesaler receives their profit. The entire process can take as little as one hour if both transactions are scheduled back-to-back at the same title company. Some wholesalers close A-to-B in the morning and B-to-C in the afternoon, while others close them within minutes.'),
      h2(s, 11, 'Costs vs. Assignment'),
      p(s, 12, 'A double close is more expensive than an assignment because it involves two full real estate transactions, each with their own closing costs. The wholesaler pays closing costs on both the A-to-B purchase and the B-to-C sale, including title fees, recording fees, transfer taxes (in applicable states), and transactional funding costs. Total transaction costs for a double close typically run $3,000–$8,000, compared to nearly zero for an assignment. However, a double close protects your profit margin from scrutiny, prevents deal blowups caused by visible assignment fees, and allows you to wholesale properties with non-assignable contracts. For deals with spreads above $15,000–$20,000, the additional cost of a double close is usually worthwhile for the confidentiality it provides.'),
    ],
  },

  // 20. Bird Dog
  {
    term: 'Bird Dog',
    slug: 'bird-dog',
    category: 'general',
    definition: 'A person who locates potential investment properties and passes the leads to real estate investors in exchange for a referral fee. Bird dogging is an entry point into real estate investing that requires no capital, credit, or experience — just hustle and the ability to identify motivated sellers or undervalued properties.',
    body: (s) => [
      h2(s, 1, 'What Is a Bird Dog in Real Estate?'),
      p(s, 2, 'The term "bird dog" comes from hunting — bird dogs are trained to locate and point out game birds for the hunter. In real estate, a bird dog is someone who scouts for potential investment properties and brings those leads to active investors. The bird dog does not negotiate, contract, or close deals — they simply find opportunities and get paid a referral fee when the investor successfully closes on a lead they provided. It is the lowest-barrier entry point into real estate investing, requiring nothing more than knowledge of what investors look for, the initiative to drive neighborhoods and talk to homeowners, and a reliable investor to bring deals to.'),
      h2(s, 3, 'Typical Bird Dog Fees'),
      p(s, 4, 'Bird dog fees range from $500 to $5,000 per deal that closes, with $1,000–$2,000 being the most common range for residential properties. The fee is paid by the investor, not the seller, and is typically contingent on the investor actually purchasing the property — no close, no fee. Some investors pay a flat fee per accepted lead regardless of whether it closes, usually $250–$500, to incentivize volume. Others pay a percentage of the profit, typically 5–10%, which can be lucrative on high-margin deals. The fee structure should be agreed upon in writing before the bird dog starts sourcing deals to avoid disputes.'),
      h2(s, 5, 'Legal Considerations'),
      p(s, 6, 'The legality of bird dogging varies by state and exists in a gray area. In some states, finding properties for a fee without a real estate license is considered unlicensed brokerage activity, which is illegal. Other states permit bird dogging as long as the bird dog is not negotiating terms, writing contracts, or representing buyers or sellers. The key legal distinction is between providing information (generally legal) and facilitating a transaction (requires a license). To stay on the right side of the law, bird dogs should limit their activity to providing property addresses and owner contact information to investors, without negotiating or advising either party. Consult a real estate attorney in your state for specific guidance.'),
      h2(s, 7, 'Building Investor Relationships'),
      p(s, 8, 'A bird dog\'s success depends entirely on the quality of their investor relationships. Start by attending local real estate investor association (REIA) meetings, joining Facebook groups for local investors, and networking at real estate events. Identify 2–3 active investors who are consistently buying properties in your area. Learn exactly what they are looking for: target neighborhoods, property types, price ranges, minimum profit margins, and preferred deal structures. The more precisely you can match deals to an investor\'s specific criteria, the more valuable you become and the more deals you will close. A bird dog who brings 10 random leads is less valuable than one who brings 2 highly targeted leads that match the investor\'s exact buy box.'),
      h2(s, 9, 'How to Find Deals'),
      p(s, 10, 'Effective bird dogs use a combination of driving for dollars (physically canvassing neighborhoods for distressed properties), monitoring public records for pre-foreclosures and probate filings, scanning Craigslist and Facebook Marketplace for FSBO listings, building relationships with mail carriers and utility workers who notice vacancies, attending estate sales and auctions, and simply talking to people in target neighborhoods. The best bird dogs develop a keen eye for distress signals: overgrown lawns, boarded windows, code violation notices, multiple newspapers piling up, and properties that clearly stand out from their maintained neighbors.'),
      h2(s, 11, 'Transitioning to Wholesaling'),
      p(s, 12, 'Bird dogging is often a stepping stone to wholesaling, which offers significantly higher earnings potential. Once you have developed the ability to find deals consistently and understand what investors want, the natural next step is putting properties under contract yourself and assigning or double-closing for larger fees. The transition requires learning contract negotiation, understanding purchase agreements, building relationships with title companies, and potentially obtaining a real estate license (recommended in states with strict bird dogging regulations). Many successful wholesalers started as bird dogs, learning the fundamentals of deal finding and investor preferences before taking on the additional responsibilities and risks of contracting properties directly.'),
    ],
  },

  // 21. Proof of Funds
  {
    term: 'Proof of Funds',
    slug: 'proof-of-funds',
    category: 'financing',
    definition: 'Documentation demonstrating that a buyer has sufficient financial resources to complete a real estate purchase. Proof of funds is typically required when submitting offers on properties, particularly for cash purchases, auction bidding, and wholesale contracts where the seller needs assurance that the buyer can close.',
    body: (s) => [
      h2(s, 1, 'What Is Proof of Funds?'),
      p(s, 2, 'Proof of funds (POF) is a document or set of documents that verifies a buyer has the financial capacity to close a real estate transaction. It assures the seller — and their agent — that the offer is serious and backed by real capital, not just wishful thinking. In competitive markets, a strong proof of funds can be the difference between your offer being accepted and being tossed in the recycling bin. Sellers and listing agents use POF as a screening mechanism to separate serious buyers from tire-kickers, and many will not even consider an offer without it.'),
      h2(s, 3, 'What Qualifies as Proof of Funds'),
      p(s, 4, 'Acceptable proof of funds documentation includes: recent bank statements (within 30–60 days) showing liquid balances sufficient to cover the purchase price and closing costs; a letter from a bank or financial institution confirming available funds; brokerage statements showing liquid investment accounts; a line of credit letter from a bank or private lender showing available and uncommitted credit; or a hard money pre-approval letter specifying the lender\'s commitment to fund the deal. For all-cash offers, bank statements are the gold standard. For financed purchases, a mortgage pre-approval letter from a reputable lender serves a similar purpose but is technically proof of borrowing capacity rather than proof of funds on hand.'),
      h2(s, 5, 'When Proof of Funds Is Needed'),
      p(s, 6, 'POF is required or strongly recommended in several scenarios. Cash offers always require proof of funds — without it, the seller has no way to verify you can actually close without financing. Auction bidding typically requires POF registration before you can even place a bid, with the requirement ranging from a bank letter to a cashier\'s check deposited with the auction company. Wholesale contracts benefit from POF because motivated sellers are already skeptical and need reassurance. Bank-owned (REO) property offers universally require POF or pre-approval. And in competitive multiple-offer situations, a strong POF accompanying your offer signals financial strength and closing certainty.'),
      h2(s, 7, 'Proof of Funds Letters from Lenders'),
      p(s, 8, 'Many hard money lenders, private lenders, and even some conventional lenders will issue proof of funds letters for established borrowers. These letters state that the lender has reviewed the borrower\'s application and is prepared to fund a transaction up to a specified amount, subject to standard due diligence on the property. This is particularly useful for wholesalers and investors who may not have the cash on hand but have access to financing. The letter demonstrates to the seller that the buyer can close, even though the funds will come from a lender rather than the buyer\'s personal accounts. Be aware that some sellers and agents distinguish between cash POF and lender POF and may prefer the former.'),
      h2(s, 9, 'Strengthening Your Offers with POF'),
      p(s, 10, 'A well-presented proof of funds package strengthens your offer in several ways. First, it demonstrates seriousness — you have taken the time to organize your finances and document your capacity. Second, it reduces the seller\'s risk of the deal falling through due to financing issues. Third, it can justify a lower offer price — a seller may accept a lower cash offer with strong POF over a higher financed offer with uncertain approval. When submitting POF, redact sensitive information like full account numbers (show only last four digits) and remove any transactions that are not relevant. Present a clean, professional document that instills confidence.'),
      h2(s, 11, 'Practical Tips'),
      p(s, 12, 'Keep your proof of funds documentation current — bank statements older than 60 days are typically not accepted. If you use multiple accounts to fund purchases, consolidate your POF into a single summary showing total available capital. Build relationships with lenders who will issue POF letters quickly — when a deal comes in hot, you may need POF within hours, not days. For wholesalers, establish a POF solution before you start marketing to sellers, because you will need it to accompany every offer. And never fabricate proof of funds — using fake bank statements or inflated letters is fraud and can result in criminal prosecution, in addition to destroying your reputation in the investing community.'),
    ],
  },

  // 22. Hard Money Points
  {
    term: 'Hard Money Points',
    slug: 'hard-money-points',
    category: 'financing',
    definition: 'Upfront origination fees charged by hard money lenders, where each "point" equals 1% of the total loan amount. Hard money loans typically charge 2–4 points at closing in addition to monthly interest, making the total cost of borrowing significantly higher than conventional financing.',
    body: (s) => [
      h2(s, 1, 'What Are Hard Money Points?'),
      p(s, 2, 'Points on a hard money loan are origination fees charged by the lender at closing, calculated as a percentage of the loan amount. One point equals 1% of the loan. On a $200,000 hard money loan, two points cost $4,000, three points cost $6,000, and four points cost $8,000. These fees are charged in addition to the monthly interest rate and any other fees (processing, underwriting, inspection fees). Points are the lender\'s primary profit mechanism on short-term loans and represent the cost of fast, flexible capital that does not require the extensive documentation and time that conventional lending demands.'),
      h2(s, 3, 'Calculating Total Cost of a Hard Money Loan'),
      p(s, 4, 'To evaluate a hard money loan, you must calculate the total cost including points, interest, and fees over the expected loan term. Consider a $200,000 hard money loan at 12% interest and 3 points for a 6-month fix-and-flip project. The points cost $6,000 at closing. Monthly interest payments are $2,000 ($200,000 x 12% / 12). Over 6 months, total interest is $12,000. Add a $1,500 origination/processing fee. Total cost: $6,000 (points) + $12,000 (interest) + $1,500 (fees) = $19,500. On a $200,000 loan for 6 months, that equates to an effective annualized cost of approximately 19.5%. This must be factored into your flip profit calculation before you commit to the deal.'),
      h2(s, 5, 'Negotiating Points'),
      p(s, 6, 'Points are negotiable, particularly if you are an experienced borrower with a track record of successful projects and timely repayments. First-time hard money borrowers typically pay full price — 3–4 points. Repeat borrowers who have completed 3–5 successful projects with the same lender can often negotiate down to 2 points. High-volume borrowers doing 10+ deals per year may negotiate to 1–1.5 points. Other negotiating levers include offering a higher interest rate in exchange for lower points (reducing upfront cash outlay), bringing a larger down payment, or providing additional collateral. Competition among hard money lenders also creates room to negotiate — get quotes from at least three lenders before committing.'),
      h2(s, 7, 'Points vs. Rate Trade-Off'),
      p(s, 8, 'Many hard money lenders offer flexibility to trade points for rate, or vice versa. You might choose between 3 points at 11% interest or 2 points at 13% interest. The optimal choice depends on how long you expect to hold the loan. On a short-term flip (3–4 months), lower points with a higher rate usually saves money because the higher interest accrues for fewer months. On a longer-term hold (9–12 months), lower rates with higher points may be cheaper because the rate savings compound over more months. Run both scenarios with your specific loan amount and expected timeline before choosing. The crossover point — where the options cost the same — is typically around 6–8 months.'),
      h2(s, 9, 'Impact on Flip Profit Margins'),
      p(s, 10, 'Hard money costs directly reduce your flip profit margin, and points are a significant component. On a flip with an ARV of $300,000, a purchase price of $200,000, $50,000 in renovation costs, and a $200,000 hard money loan at 3 points and 12% for 6 months, your hard money costs total approximately $19,500. Add $15,000 in buying and selling transaction costs, and your total costs reach $284,500, leaving a gross profit of only $15,500 — a thin 5.2% margin that leaves little room for error. This is why experienced flippers are ruthless about controlling hard money costs: every point saved goes directly to the bottom line.'),
      h2(s, 11, 'Reducing Your Hard Money Costs'),
      p(s, 12, 'Beyond negotiating points and rates, several strategies reduce overall hard money costs. Complete projects faster — every month you shave off the timeline saves a full month of interest. Bring more cash to the deal to reduce the loan amount (and therefore the dollar amount of each point). Build a track record and loyalty with one or two lenders to earn preferential pricing. Consider private money from individual investors who may charge lower points than institutional hard money lenders. And always maintain a reserve fund so you do not need to request a loan extension, which typically costs an additional 1–2 points plus continued interest charges.'),
    ],
  },

  // 23. Exit Strategy
  {
    term: 'Exit Strategy',
    slug: 'exit-strategy',
    category: 'strategies',
    definition: 'A predetermined plan for how an investor will ultimately profit from or divest a real estate investment. Every property acquisition should have a primary exit strategy and at least one backup plan before the purchase is made. Common exit strategies include selling for appreciation, refinancing to hold, and executing a 1031 exchange.',
    body: (s) => [
      h2(s, 1, 'Why Every Deal Needs an Exit Strategy'),
      p(s, 2, 'The biggest mistake novice investors make is buying a property without a clear plan for how they will ultimately profit from it. An exit strategy is not something you figure out later — it is determined before you make the offer. Your exit strategy dictates your purchase price, renovation scope, financing structure, hold period, and target returns. A fix-and-flip has completely different acquisition criteria than a buy-and-hold rental, which is different from a BRRRR deal. Without a defined exit, you cannot underwrite the deal properly, and you risk ending up with a property that does not fit any profitable strategy.'),
      h2(s, 3, 'Exit Strategy Types'),
      p(s, 4, 'The primary exit strategies in real estate are: sell the property for a profit after renovation (fix-and-flip), refinance into permanent financing and hold as a long-term rental (BRRRR), hold long-term for cash flow and appreciation then sell (buy-and-hold), execute a 1031 exchange to defer taxes and trade into a larger or better-performing property, sell on a seller-financed note to earn interest income over time, or wholesale the contract or property to another investor. Each strategy has different timelines, capital requirements, risk profiles, and return structures. The best investors are proficient in multiple exit strategies so they can pivot when market conditions change.'),
      h2(s, 5, 'Backup Exit Strategies'),
      p(s, 6, 'Every deal should have at least one backup exit strategy in case the primary plan fails. A fix-and-flip should have a rental backup: if the property does not sell at the target ARV, can you rent it and still cash flow? A BRRRR deal should pencil as a reasonable long-term hold even if the refinance does not return 100% of your capital. A development project should have an alternative use plan if the market shifts during construction. The acid test for any deal is: if everything goes wrong — if the market drops 10%, renovations run 20% over budget, and the project takes twice as long as planned — can you still survive the deal without catastrophic loss? If not, the margins are too thin.'),
      h2(s, 7, 'Market-Dependent Exit Planning'),
      p(s, 8, 'Your exit strategy must account for current and anticipated market conditions. In a seller\'s market with rapidly appreciating values, flipping and selling are attractive exits because buyer demand is strong and properties sell quickly. In a buyer\'s market with declining values, holding for cash flow becomes more prudent because selling into weakness destroys returns. Interest rate environments also affect exits: high rates make refinancing more expensive (affecting BRRRR) and reduce buyer pools (affecting sales). Smart investors adjust their exit strategies based on where they believe the market is heading, not where it has been.'),
      h2(s, 9, 'Timeline Planning'),
      p(s, 10, 'Every exit strategy has an associated timeline that must be planned in advance. Fix-and-flip exits should target 3–6 months from acquisition to sale to minimize holding costs. BRRRR refinances typically occur at 6–12 months, after renovations are complete and the property has seasoned enough to qualify for conventional financing (most lenders require 6-month seasoning). Buy-and-hold exits are planned in 5–10 year windows, targeting optimal market conditions and tax treatment. 1031 exchanges have strict IRS timelines: 45 days to identify replacement properties and 180 days to close. Build these timelines into your financial projections and financing structure from day one.'),
      h2(s, 11, 'Exit Strategy and Deal Analysis'),
      p(s, 12, 'Your exit strategy determines how you analyze and underwrite every deal. For a flip, you focus on ARV, renovation costs, and speed — cash flow is irrelevant because you are not holding long enough to collect meaningful rent. For a BRRRR, you need the property to appraise at a value that allows you to refinance out most or all of your capital while still cash flowing at the new loan amount. For buy-and-hold, you prioritize cash flow and long-term appreciation potential over short-term profit. For a 1031 exchange exit, you need to identify replacement properties that meet the like-kind requirement and provide equal or greater value. Match your analysis methodology to your intended exit, and always run the numbers through your backup exit strategy as well.'),
    ],
  },

  // 24. Scope of Work (SOW)
  {
    term: 'Scope of Work (SOW)',
    slug: 'scope-of-work',
    category: 'general',
    definition: 'A comprehensive, itemized document detailing every renovation task, material specification, and cost estimate for a property improvement project. The SOW serves as the blueprint for contractors, the basis for comparing bids, and the control document for managing budgets and timelines during execution.',
    body: (s) => [
      h2(s, 1, 'What Is a Scope of Work?'),
      p(s, 2, 'A scope of work is the master document that defines exactly what will be done to a property during renovation or rehabilitation. It breaks the project into individual line items — each specifying the work to be performed, the materials to be used, quantities, and expected costs. A well-written SOW eliminates ambiguity between the investor and the contractor. Instead of "renovate the kitchen," a proper SOW specifies: demolish existing cabinets and countertops, install 24 linear feet of shaker-style cabinets in white, install quartz countertops in Calacatta pattern, install stainless steel undermount sink with pull-down faucet, and so on. This level of detail prevents disputes, controls costs, and ensures the finished product matches your vision.'),
      h2(s, 3, 'Key Line Items in a Renovation SOW'),
      p(s, 4, 'A comprehensive SOW covers every trade and finish in the project. Major categories include: demolition (removal of existing materials, debris hauling, dumpster rental), framing (structural repairs, wall modifications, additions), electrical (panel upgrades, rewiring, fixture installation, code compliance), plumbing (repiping, fixture installation, water heater, drain lines), HVAC (furnace, AC, ductwork, thermostats), insulation and drywall, interior finishes (flooring, trim, paint, hardware), kitchen (cabinets, countertops, appliances, backsplash), bathrooms (vanities, tile, fixtures, shower/tub), exterior (roofing, siding, windows, doors, landscaping), and miscellaneous (permits, inspections, cleaning, staging). Each category contains multiple specific line items with individual cost estimates.'),
      h2(s, 5, 'Quantities and Material Specifications'),
      p(s, 6, 'Vague specifications lead to cost overruns and quality disputes. Your SOW should specify exact materials and quantities. Instead of "new flooring throughout," write: "Install luxury vinyl plank flooring, Shaw Floorte Pro Endura Plus, color Driftwood, in all bedrooms, living room, and hallways — approximately 1,200 square feet including 10% waste factor." This level of specificity enables accurate bidding, ensures multiple contractors are quoting the same work, and gives you a clear standard for evaluating the finished product. Keep a reference file of your preferred materials with model numbers and prices so you can quickly build SOWs for future projects.'),
      h2(s, 7, 'Getting Contractor Bids'),
      p(s, 8, 'The SOW is your tool for obtaining apples-to-apples bids from multiple contractors. Walk the property with each contractor, review the SOW line by line, and ask them to price each item. Having all contractors bid on the same detailed scope eliminates the "I didn\'t know you wanted that" problem and makes it easy to compare proposals. Get at least three bids for the overall project. For specialty work (electrical, plumbing, HVAC), get separate bids from licensed subcontractors even if your general contractor will manage them. The SOW also becomes part of the construction contract — the contractor is agreeing to complete this specific scope for this specific price.'),
      h2(s, 9, 'Change Order Management'),
      p(s, 10, 'Change orders — modifications to the original scope after work has begun — are the primary source of budget overruns on renovation projects. Some change orders are unavoidable: you open a wall and discover termite damage or obsolete wiring that must be addressed. Others are avoidable: the investor decides mid-project to upgrade countertops or add a bathroom. Your SOW should include a change order process: any scope addition or modification must be documented in writing, priced by the contractor, and approved by the investor before work begins. Never approve verbal change orders. Track all change orders in a running log that updates the total project budget in real time. Set a contingency budget of 10–15% of the SOW total for unforeseen issues.'),
      h2(s, 11, 'Building Your SOW Template'),
      p(s, 12, 'Create a master SOW template that you refine with each project. Start with a comprehensive list of every possible line item organized by trade category. For each new project, walk the property with your template in hand, checking off items that apply and adding quantities and specifications. Over time, your template will include standard material selections, typical costs per unit, preferred vendors, and notes from lessons learned on past projects. A battle-tested SOW template is one of the most valuable tools in a renovation investor\'s arsenal — it ensures consistency, speeds up the estimation process, and catches items that might otherwise be overlooked until they become expensive surprises mid-project.'),
    ],
  },

  // 25. Comparative Market Analysis (CMA)
  {
    term: 'Comparative Market Analysis (CMA)',
    slug: 'cma',
    category: 'analysis',
    definition: 'An informal estimate of a property\'s market value prepared by a real estate agent based on recent comparable sales, active listings, and expired listings in the area. CMAs are less formal and less expensive than licensed appraisals but provide valuable data for investment analysis and offer pricing.',
    body: (s) => [
      h2(s, 1, 'What Is a Comparative Market Analysis?'),
      p(s, 2, 'A comparative market analysis — universally called a CMA — is a valuation estimate prepared by a real estate agent using data from the Multiple Listing Service (MLS). Unlike a formal appraisal performed by a licensed appraiser, a CMA is an informal opinion of value based on the agent\'s analysis of comparable properties. CMAs examine three categories of data: recently sold comparable properties (to establish what buyers have actually paid), active listings (to show current competition), and expired or withdrawn listings (to reveal pricing levels the market rejected). The CMA synthesizes this data into a recommended value range for the subject property.'),
      h2(s, 3, 'How Agents Pull CMAs'),
      p(s, 4, 'A CMA starts with identifying comparable properties — homes similar to the subject in location, size, age, condition, and features. The agent searches the MLS for properties within a defined radius (typically 0.5–1 mile), with similar square footage (within 10–20%), the same bedroom and bathroom count, and comparable construction quality and age. Ideally, the agent selects 3–5 comps that sold within the last 3–6 months. For each comp, the agent notes the sale price, days on market, and any significant differences from the subject property. In markets with limited recent sales, the agent may need to expand the search radius or time period to find adequate comparables.'),
      h2(s, 5, 'Adjustments for Differences'),
      p(s, 6, 'No two properties are identical, so the agent adjusts comparable sale prices to account for differences between each comp and the subject property. If a comp has a two-car garage and the subject has a one-car garage, the comp\'s price is adjusted downward by the estimated value of the difference (perhaps $10,000–$15,000). If the subject has a renovated kitchen and the comp had an original kitchen, the comp\'s price is adjusted upward. Common adjustment factors include bedroom and bathroom count, garage size, lot size, pool, basement finish level, age, condition, and specific upgrades. These adjustments are more art than science and depend heavily on the agent\'s local market knowledge.'),
      h2(s, 7, 'CMA vs. Appraisal'),
      p(s, 8, 'A CMA and an appraisal serve similar purposes but differ in formality, authority, and cost. An appraisal is performed by a licensed, state-certified appraiser following Uniform Standards of Professional Appraisal Practice (USPAP), typically costs $400–$700, and is required by lenders before issuing a mortgage. A CMA is prepared by a real estate agent, is typically provided free of charge (especially to prospective clients), and carries no legal weight for lending purposes. However, a well-prepared CMA can be equally accurate because both processes rely on the same fundamental methodology: comparable sales analysis with adjustments. For investment analysis, a CMA provides more than sufficient accuracy for making offer decisions.'),
      h2(s, 9, 'Using CMAs for Investment Analysis'),
      p(s, 10, 'Investors use CMAs in several ways. Before making an offer, a CMA establishes the property\'s current as-is value and, with comp selection focused on renovated properties, its potential after-repair value. When evaluating a flip, compare the purchase price against the CMA value to confirm there is sufficient margin. For rental properties, CMAs help determine market value for refinancing purposes. When considering a sale, a CMA reveals the optimal listing price. For BRRRR deals, request two CMAs from different agents — one for as-is value and one for projected value after renovations — to bracket the value range and stress-test your refinance assumptions.'),
      h2(s, 11, 'Getting CMAs from Agents'),
      p(s, 12, 'Real estate agents provide CMAs as a business development tool — it is their way of demonstrating expertise and earning your listing or buyer representation. To request a CMA, contact a local agent who specializes in your target area and ask for a market analysis. Be transparent about being an investor; many agents are happy to work with investors who bring repeat business. Build relationships with 2–3 agents who understand investment properties and can provide CMAs quickly when you need them. Return the favor by using those agents when you buy or sell. Keep in mind that CMAs have limitations: they reflect the agent\'s judgment, which varies in quality, and they rely on MLS data, which may not capture off-market sales or distressed transactions that are relevant to investment pricing.'),
    ],
  },

  // 26. Highest and Best Use Analysis
  {
    term: 'Highest and Best Use Analysis',
    slug: 'highest-best-use-analysis',
    category: 'analysis',
    definition: 'A formal appraisal methodology that determines the most profitable, legally permissible, physically possible, and financially feasible use of a property. Highest and best use analysis identifies whether a property is being used optimally or whether a different use would create significantly more value.',
    body: (s) => [
      h2(s, 1, 'What Is Highest and Best Use Analysis?'),
      p(s, 2, 'Highest and best use (HBU) is a foundational concept in real estate appraisal and investment analysis. It asks a simple but powerful question: "What is the most valuable thing you could do with this property?" The answer is not always what the property is currently being used for. A single-family home on a commercially zoned corner lot might be worth $300,000 as a residence but $800,000 as a development site for a retail building. An aging apartment building might be worth more as a teardown-and-rebuild than as a renovated hold. HBU analysis provides the framework for identifying these value-creation opportunities and making informed decisions about property use, investment, and development.'),
      h2(s, 3, 'The Four Tests of Highest and Best Use'),
      p(s, 4, 'Every potential use must pass four sequential tests. First, it must be legally permissible — allowed by current zoning, building codes, deed restrictions, environmental regulations, and other legal constraints. A use that violates zoning is not the highest and best use regardless of its profitability. Second, it must be physically possible — the site must be capable of supporting the proposed use in terms of size, shape, topography, soil conditions, access, and utilities. Third, it must be financially feasible — the use must generate sufficient income or value to justify the cost of development or conversion. Fourth, it must be maximally productive — among all uses that pass the first three tests, the highest and best use is the one that produces the greatest net return or value.'),
      h2(s, 5, 'Test 1: Legally Permissible'),
      p(s, 6, 'The legal analysis begins with current zoning. What uses does the zoning classification allow by right? What uses require a conditional use permit or variance? Are there overlay districts, historic preservation requirements, or environmental restrictions that limit development options? Review deed restrictions and HOA covenants that may further constrain use. Consider future zoning changes — a property in a transitional area may have rezoning potential that dramatically changes its highest and best use. If the most profitable use requires a zoning change, assess the likelihood and cost of obtaining that change. A use that requires rezoning is only considered the HBU if the rezoning is reasonably probable.'),
      h2(s, 7, 'Rezoning Opportunities'),
      p(s, 8, 'Some of the most profitable real estate strategies involve changing a property\'s zoning to unlock higher-value uses. Converting a residentially zoned parcel to commercial or mixed-use zoning can multiply the land value. Obtaining a density bonus that allows more units per acre increases the development potential of multi-family sites. Securing approval for a planned unit development (PUD) can enable creative site plans that extract more value than standard zoning permits. Rezoning is not guaranteed — it requires navigating political processes, community opposition, and planning department requirements. But investors who master the rezoning process gain access to value-creation opportunities that most competitors cannot or will not pursue.'),
      h2(s, 9, 'Land vs. Improved Property Analysis'),
      p(s, 10, 'HBU analysis treats vacant land and improved (built-upon) property differently. For vacant land, the question is: "What should be built here?" The analysis considers all legally permissible and physically possible building types, estimates development costs and projected values for each, and identifies the use that generates the highest residual land value. For improved property, the analysis has an additional dimension: is the existing improvement the highest and best use of the land, or would demolishing the improvement and starting over create more value? This demolition-versus-renovation decision is critical for investors evaluating older properties on valuable land.'),
      h2(s, 11, 'Value Creation Through Use Change'),
      p(s, 12, 'The practical investment application of HBU analysis is identifying properties where a change in use would create significant value. Examples include converting a single-family home to a multi-unit rental through legal conversion or ADU construction, transitioning a retail property to a mixed-use development with residential above, repurposing an obsolete office building as residential lofts, changing a property from long-term rental to short-term vacation rental (or vice versa), and developing vacant or underutilized land for its most productive use. In each case, the investor profits from the gap between the property\'s value in its current use and its value in the higher use, minus the cost of making the transition. This is the essence of value creation in real estate — finding properties being used below their potential and unlocking that potential through strategic action.'),
    ],
  },
]

// ── main ─────────────────────────────────────────────────────────────

async function seed() {
  console.log(DRY_RUN ? '*** DRY RUN — no writes ***\n' : '')

  // 1. Fetch existing slugs
  const existing = await client.fetch(
    `*[_type == "glossaryTerm" && defined(slug.current)]{ "slug": slug.current }`
  )
  const existingSlugs = new Set(existing.map((t) => t.slug))
  console.log(`Found ${existingSlugs.size} existing glossary terms.\n`)

  // 2. Filter out duplicates
  const termsToCreate = newTerms.filter((t) => !existingSlugs.has(t.slug))

  if (termsToCreate.length === 0) {
    console.log('All 26 terms already exist. Nothing to create.')
    return
  }

  const skipped = newTerms.length - termsToCreate.length
  if (skipped > 0) {
    console.log(`Skipping ${skipped} term(s) that already exist.`)
  }
  console.log(`Creating ${termsToCreate.length} new glossary terms...\n`)

  // 3. Build transaction
  const transaction = client.transaction()

  for (const t of termsToCreate) {
    console.log(`  + ${t.term}`)
    transaction.create({
      _type: 'glossaryTerm',
      term: t.term,
      slug: { _type: 'slug', current: t.slug },
      definition: t.definition,
      category: t.category,
      body: t.body(t.slug),
    })
  }

  if (DRY_RUN) {
    console.log('\n*** DRY RUN — skipping commit ***')
    console.log(`Would create ${termsToCreate.length} terms.`)
    return
  }

  // 4. Commit
  console.log('\nCommitting transaction...')
  const result = await transaction.commit()
  console.log(`Done! Created ${result.results.length} new glossary terms.`)
  console.log(`Total glossary: ${existingSlugs.size + termsToCreate.length} terms.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
