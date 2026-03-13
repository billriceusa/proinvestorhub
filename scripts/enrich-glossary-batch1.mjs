#!/usr/bin/env node

/**
 * Enrich Glossary Batch 1 — Analysis & Metrics Terms
 * Patches 21 glossary terms with expert-level body content in Portable Text.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... node scripts/enrich-glossary-batch1.mjs
 *   # Dry-run (no writes):
 *   DRY_RUN=1 node scripts/enrich-glossary-batch1.mjs
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

// helpers
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ── term content ─────────────────────────────────────────────────────
const TERMS = {
  'cash-on-cash-return': (s) => [
    h2(s, 1, 'What Is Cash-on-Cash Return?'),
    p(s, 2, 'Cash-on-cash return (CoC) measures the annual pre-tax cash flow you receive relative to the actual cash you invested out of pocket. Unlike cap rate, which ignores financing entirely, CoC reflects the real return on your personal capital \u2014 making it the single most important metric for leveraged investors. If you put $40,000 down on a rental property and collect $4,800 per year in net cash flow after all expenses and debt service, your cash-on-cash return is 12%.'),
    h2(s, 3, 'The Cash-on-Cash Formula'),
    p(s, 4, 'Cash-on-Cash Return = Annual Pre-Tax Cash Flow / Total Cash Invested \u00d7 100. Total cash invested includes your down payment, closing costs, and any immediate renovation expenses \u2014 every dollar that left your bank account to acquire the asset. Annual pre-tax cash flow is your net operating income minus debt service (mortgage payments). For the example above: $4,800 / $40,000 \u00d7 100 = 12%.'),
    h2(s, 5, 'How Leverage Amplifies Cash-on-Cash Return'),
    p(s, 6, 'This is where CoC gets powerful. Consider a $200,000 property generating $14,000 NOI. Bought all-cash, your CoC is 7% ($14,000 / $200,000). Now finance it with 25% down ($50,000) and a mortgage costing $8,400/year. Your cash flow drops to $5,600, but your CoC jumps to 11.2% ($5,600 / $50,000). Leverage lets your capital work harder \u2014 but it cuts both ways. If rents drop or expenses spike, leveraged CoC can go negative while an all-cash deal merely shrinks.'),
    h2(s, 7, 'What Is a Good Cash-on-Cash Return?'),
    p(s, 8, 'Most experienced investors target 8\u201312% CoC or higher for stabilized buy-and-hold properties. In competitive coastal markets, 6\u20138% may be acceptable when paired with strong appreciation potential. In the Midwest or Southeast, 10\u201315% is achievable on cash-flowing rentals. Anything below 5% should raise questions \u2014 you can earn that in a savings account without the headaches of property management.'),
    h2(s, 9, 'Why Cash-on-Cash Return Matters'),
    p(s, 10, 'CoC answers the investor\'s core question: "What is my money actually earning?" It accounts for financing terms, which vary deal to deal. A property with a mediocre cap rate can deliver exceptional CoC returns with favorable loan terms, and vice versa. It also makes it straightforward to compare real estate returns against alternative investments like index funds, REITs, or private lending.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Always calculate CoC on conservative assumptions \u2014 use actual rents (not pro-forma), budget 5\u201310% for vacancy, and include a maintenance reserve. Recalculate CoC annually as your mortgage pays down and rents adjust. When comparing deals, calculate CoC at multiple leverage levels to see which property rewards your capital most efficiently. And remember: CoC is a snapshot metric. Pair it with IRR for a complete picture over a multi-year hold.'),
  ],

  'gross-rent-multiplier': (s) => [
    h2(s, 1, 'What Is Gross Rent Multiplier?'),
    p(s, 2, 'The gross rent multiplier (GRM) is a quick-and-dirty valuation metric that compares a property\'s purchase price to its gross annual rental income. It tells you, roughly, how many years of gross rent it would take to pay off the purchase price. Investors use GRM as a first-pass screening tool to rapidly compare properties before diving into deeper analysis.'),
    h2(s, 3, 'The GRM Formula'),
    p(s, 4, 'Gross Rent Multiplier = Property Price / Gross Annual Rent. If a property costs $300,000 and generates $36,000 per year in gross rent ($3,000/month), the GRM is 8.33. A lower GRM generally indicates a better deal from an income standpoint \u2014 you\'re paying fewer years of rent for the asset. A higher GRM means you\'re paying a premium, possibly banking on appreciation or other non-income factors.'),
    h2(s, 5, 'How to Use GRM Effectively'),
    p(s, 6, 'GRM is a screening tool, not an analysis tool. Use it to quickly compare similar properties in the same market. If one duplex trades at a 10 GRM and an identical one down the street is listed at a 7 GRM, the second one deserves a closer look. GRM varies dramatically by market \u2014 a 15 GRM might be standard in San Francisco while a 7 GRM is normal in Memphis. Always compare within the same submarket.'),
    h2(s, 7, 'GRM vs. Cap Rate'),
    p(s, 8, 'The critical limitation of GRM is that it completely ignores operating expenses. Two properties with identical GRMs can have wildly different profitability if one has high property taxes, insurance, or deferred maintenance. Cap rate accounts for expenses by using net operating income rather than gross rent. Think of GRM as the first filter and cap rate as the second. If a deal passes the GRM screen, graduate to a full cap rate and cash-flow analysis before making an offer.'),
    h2(s, 9, 'Why GRM Matters'),
    p(s, 10, 'Speed. When you\'re scanning 50 listings on a Saturday morning, you don\'t have time to build a full pro forma on each one. GRM lets you eliminate overpriced properties in seconds. It\'s also useful in markets where reliable expense data is hard to obtain \u2014 at minimum, you can compare price-to-rent ratios and focus your due diligence on the best candidates.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Build a GRM benchmark for every submarket you invest in by analyzing recent sales and their rental income. When a property\'s GRM is significantly below market average, investigate why \u2014 it could be a hidden gem or a hidden problem. Never rely on GRM alone to make purchase decisions; always follow up with a complete expense analysis and cap rate calculation. For multifamily, use actual rent rolls rather than asking rents to calculate GRM.'),
  ],

  'vacancy-rate': (s) => [
    h2(s, 1, 'What Is Vacancy Rate?'),
    p(s, 2, 'Vacancy rate measures the percentage of time a rental property sits unoccupied and generating no income. It is one of the most critical variables in any rental property analysis because even a few extra weeks of vacancy per year can dramatically erode your returns. Understanding and accurately projecting vacancy is the difference between a profitable investment and a money pit.'),
    h2(s, 3, 'The Vacancy Rate Formula'),
    p(s, 4, 'Vacancy Rate = (Vacant Days / Total Days in Period) \u00d7 100. If your unit sits empty for 18 days during a tenant turnover in a 365-day year, your vacancy rate is approximately 5%. For a portfolio, calculate it across all units: if you own 10 units and have a combined 200 vacant unit-days out of 3,650 total unit-days, your portfolio vacancy rate is 5.5%. The national average hovers between 5\u20138% for residential rental properties, though this varies widely by market and property type.'),
    h2(s, 5, 'How Vacancy Impacts Your Bottom Line'),
    p(s, 6, 'Vacancy hits you twice: you lose rental income and you still pay the mortgage, taxes, and insurance. On a property generating $2,000/month gross rent, each month of vacancy costs you that $2,000 in lost revenue plus the $1,200 mortgage payment you still owe \u2014 a $3,200 effective monthly loss. This is why smart investors budget 5\u201310% vacancy in every analysis, even if the property is currently fully occupied. Markets shift, tenants move, and units need turnover work.'),
    h2(s, 7, 'Why Vacancy Rate Matters'),
    p(s, 8, 'Vacancy rate directly impacts your net operating income, which drives property valuation and every return metric downstream. A seemingly small increase from 5% to 10% vacancy can turn a positive cash-flow property negative. Lenders scrutinize vacancy projections when underwriting loans. And in commercial real estate, vacancy rate is the primary indicator of market health \u2014 rising vacancy signals softening demand and potential rent declines.'),
    h2(s, 9, 'How to Reduce Vacancy'),
    p(s, 10, 'Price competitively \u2014 an extra $50/month in rent is meaningless if it causes an extra month of vacancy. Maintain your property well; tenants stay longer in well-kept units. Screen tenants thoroughly for stability and payment history. Offer lease renewal incentives 60\u201390 days before expiration. Start marketing the unit the moment you receive a move-out notice, not after the tenant leaves. Build relationships with local employers and relocation companies for a steady tenant pipeline.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Research your specific submarket\'s vacancy rate through Census data, local property management companies, and apartment association reports. Budget at least 5% vacancy even in hot rental markets \u2014 it accounts for turnover time between tenants, not just extended vacancies. For seasonal markets (college towns, vacation areas), budget 10\u201315% or more. Track your actual vacancy across your portfolio annually and compare it against your projections to refine future analyses.'),
  ],

  arv: (s) => [
    h2(s, 1, 'What Is After Repair Value (ARV)?'),
    p(s, 2, 'After repair value (ARV) is the estimated market value of a property after all planned renovations and improvements are complete. It is the cornerstone metric for fix-and-flip investors and BRRRR (Buy, Rehab, Rent, Refinance, Repeat) strategists. Every dollar you spend on acquisition and rehab is justified \u2014 or not \u2014 by the ARV. Get it wrong and you can lose tens of thousands of dollars on a single deal.'),
    h2(s, 3, 'How to Determine ARV'),
    p(s, 4, 'ARV is determined through comparable sales analysis (comps). Pull recently sold properties in the same neighborhood that are similar in size, age, bedroom/bathroom count, and \u2014 critically \u2014 renovation level to what your property will look like after rehab. Ideally, use 3\u20135 comps sold within the last 6 months and within a half-mile radius. Adjust for differences: add or subtract value for extra bedrooms, garage vs. no garage, lot size variations, and finish quality. The adjusted average of your comps is your ARV.'),
    h2(s, 5, 'The 70% Rule'),
    p(s, 6, 'The 70% rule is the most widely used ARV-based acquisition formula for flippers. It states: Maximum Purchase Price = ARV \u00d7 70% \u2212 Estimated Rehab Costs. If a property\'s ARV is $250,000 and it needs $40,000 in renovations, the maximum you should pay is ($250,000 \u00d7 0.70) \u2212 $40,000 = $135,000. The 30% margin covers holding costs, transaction costs, financing, and your profit. In competitive markets, some investors stretch to 75\u201380%, but this compresses margins and increases risk.'),
    h2(s, 7, 'ARV in the BRRRR Strategy'),
    p(s, 8, 'For BRRRR investors, ARV determines how much equity you can pull out during the refinance step. Most lenders will refinance at 70\u201375% of the appraised (post-rehab) value. If your ARV is $250,000, you can expect a refinance loan of $175,000\u2013$187,500. If your total acquisition plus rehab cost is $160,000, you recover most or all of your capital and keep the cash-flowing rental. This only works when you buy significantly below ARV \u2014 which is why accurate ARV estimation is non-negotiable.'),
    h2(s, 9, 'Why ARV Matters'),
    p(s, 10, 'ARV is the anchor for your entire deal analysis. Overestimate it and you overpay for the property, over-improve it, or both. Underestimate it and you pass on profitable deals. In fix-and-flip, ARV directly determines your profit margin. In BRRRR, it determines whether you can recycle your capital. Lenders, hard money lenders, and private investors all evaluate deals based on their own ARV assessment \u2014 your credibility depends on accurate estimates.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Never rely on Zillow\'s Zestimate or automated valuations for ARV \u2014 always pull actual comps from the MLS. Drive the comps in person to verify condition and neighborhood quality. Be honest about your renovation scope: if your comps are fully gut-renovated with high-end finishes and you\'re doing a cosmetic refresh, your ARV should be lower. Build a relationship with a local appraiser who can provide informal opinions before you commit to a deal. And always pad your rehab budget by 10\u201320% because renovations almost always cost more than planned.'),
  ],

  irr: (s) => [
    h2(s, 1, 'What Is Internal Rate of Return (IRR)?'),
    p(s, 2, 'Internal rate of return (IRR) is the discount rate that makes the net present value of all cash flows from an investment equal to zero. In plain language, it is the annualized rate of return that accounts for the timing and size of every cash inflow and outflow over the life of an investment. IRR is the gold standard metric for comparing investments with different hold periods, cash-flow patterns, and exit strategies.'),
    h2(s, 3, 'Why Timing Matters'),
    p(s, 4, 'IRR captures something that simple ROI misses entirely: the time value of money. A deal that returns $100,000 in profit in year one is dramatically more valuable than one returning $100,000 in year ten. Why? Because you can reinvest that year-one profit for nine additional years. IRR quantifies this difference. Two deals can have identical total ROI but vastly different IRRs because of when the cash arrives. The deal that returns capital faster almost always wins on an IRR basis.'),
    h2(s, 5, 'How IRR Is Calculated'),
    p(s, 6, 'IRR is solved iteratively \u2014 you cannot calculate it with a simple formula. The equation is: 0 = CF0 + CF1/(1+IRR)^1 + CF2/(1+IRR)^2 + ... + CFn/(1+IRR)^n, where CF0 is your initial investment (negative), and CF1 through CFn are your net cash flows in each period including the final sale. In practice, use Excel\'s IRR function, Google Sheets, or a financial calculator. Input your initial investment as a negative number, annual cash flows as positives, and include the sale proceeds plus final-year cash flow in the last period.'),
    h2(s, 7, 'Typical IRR Targets'),
    p(s, 8, 'For stabilized core real estate (fully leased, prime location, low risk), institutional investors target 6\u201310% IRR. Value-add deals \u2014 where you renovate, raise rents, or improve management \u2014 typically target 15\u201320% IRR. Opportunistic strategies like ground-up development or heavy distressed repositioning target 20%+ IRR. As an individual investor, your target depends on your risk tolerance, but most experienced investors won\'t pursue a deal below 12\u201315% projected IRR.'),
    h2(s, 9, 'Why IRR Matters'),
    p(s, 10, 'IRR lets you make apples-to-apples comparisons between fundamentally different investments. Should you flip a house in 6 months or hold a rental for 10 years? Should you invest in a syndication or buy your own property? IRR levels the playing field by normalizing returns to an annualized, time-weighted basis. It also forces you to think about exit timing \u2014 a deal with strong annual cash flow but a weak exit can still produce a disappointing IRR.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Always run IRR sensitivity analysis by varying your key assumptions: purchase price, rent growth, exit cap rate, and hold period. A deal that only hits your target IRR under optimistic assumptions is not a good deal. Be cautious of extremely high IRRs on short hold periods \u2014 flipping a house in 3 months for a 50% annualized IRR sounds great, but it only works if you can redeploy that capital immediately. For syndication evaluators, compare the sponsor\'s projected IRR against their track record of actual delivered IRRs.'),
  ],

  roi: (s) => [
    h2(s, 1, 'What Is Return on Investment (ROI)?'),
    p(s, 2, 'Return on investment (ROI) measures the total profit you earned relative to your total investment, expressed as a percentage. It is the broadest return metric in real estate because it captures all sources of return: cash flow, appreciation, tax benefits, and mortgage paydown. Unlike cash-on-cash return (which measures annual income only) or IRR (which weights timing), ROI gives you the big-picture answer to "how much did I make?"'),
    h2(s, 3, 'The ROI Formula'),
    p(s, 4, 'ROI = (Total Gain - Total Investment) / Total Investment \u00d7 100. Total gain includes your cumulative net cash flow over the hold period, the equity gained from appreciation, the principal paid down on your mortgage by tenants\' rent, and any tax benefits received. Total investment is the cash you put in: down payment, closing costs, and renovation expenses. For a 5-year hold example: you invest $50,000 cash, collect $20,000 cumulative cash flow, gain $30,000 in appreciation, and your tenants pay down $12,000 of mortgage principal. Total gain = $62,000. ROI = ($62,000 / $50,000) \u00d7 100 = 124%.'),
    h2(s, 5, 'ROI vs. Other Return Metrics'),
    p(s, 6, 'Cash-on-cash return measures annual cash income only and ignores appreciation, tax benefits, and equity buildup. IRR accounts for timing but requires a defined exit point. Cap rate measures property-level yield independent of financing. ROI captures everything but doesn\'t account for how long it took. A 100% ROI over 3 years is spectacular; over 20 years, it\'s mediocre. This is why sophisticated investors use ROI alongside IRR \u2014 ROI tells you the total magnitude, IRR tells you the annualized efficiency.'),
    h2(s, 7, 'The Four Wealth-Building Components'),
    p(s, 8, 'Real estate ROI comes from four simultaneous sources. Cash flow: the monthly income after all expenses and debt service. Appreciation: the property\'s value increase over time, both from market forces and forced appreciation through improvements. Mortgage paydown: your tenants\' rent payments reduce your loan balance, building equity you realize at sale. Tax benefits: depreciation offsets taxable income, and 1031 exchanges defer capital gains. No other asset class reliably delivers all four simultaneously, which is why real estate ROI often outperforms stocks on a total-return basis.'),
    h2(s, 9, 'Why ROI Matters'),
    p(s, 10, 'ROI is the metric you report at the end of a deal to evaluate whether the investment was worth your time, capital, and risk. It lets you compare completed deals against each other and against alternative investments. It also helps you set expectations for future investments. If your portfolio historically delivers 80\u2013120% total ROI over 5-year holds, you have a clear benchmark for evaluating new opportunities.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Track all four return components separately so you understand where your returns are actually coming from. A deal that looks great on total ROI but derives 90% of its return from appreciation was actually a bet on the market, not a sound investment. When projecting ROI for new deals, use conservative appreciation estimates (2\u20133% annually) and base your decision primarily on cash flow and equity buildup. Account for selling costs (agent commissions, closing costs, transfer taxes) in your gain calculation \u2014 they typically eat 6\u20138% of the sale price and can significantly reduce actual ROI.'),
  ],

  'operating-expense-ratio': (s) => [
    h2(s, 1, 'What Is Operating Expense Ratio (OER)?'),
    p(s, 2, 'The operating expense ratio measures operating expenses as a percentage of gross income. It tells you how much of every rental dollar gets consumed by the cost of running the property before debt service. A lower OER means more of your income flows to the bottom line. It is one of the most reliable indicators of property management efficiency and a critical tool for comparing properties of different sizes and types.'),
    h2(s, 3, 'The OER Formula'),
    p(s, 4, 'Operating Expense Ratio = Operating Expenses / Gross Operating Income \u00d7 100. Operating expenses include property taxes, insurance, maintenance, repairs, property management fees, utilities (if owner-paid), landscaping, pest control, and reserves for capital expenditures. They do not include debt service (mortgage payments) or depreciation. Gross operating income is your effective gross income \u2014 actual collected rent plus other income like laundry, parking, or application fees.'),
    h2(s, 5, 'Typical OER Ranges by Property Type'),
    p(s, 6, 'Single-family rentals typically run 35\u201345% OER, benefiting from tenant-paid utilities and lower common-area costs. Small apartment buildings (2\u201320 units) range from 40\u201350%. Larger apartment complexes with on-site management, amenities, and common areas run 45\u201355%. Older buildings with deferred maintenance or inefficient systems can push 50\u201370%. If a seller presents financials showing an OER below 30%, that is a major red flag \u2014 they are almost certainly underreporting expenses or deferring necessary maintenance.'),
    h2(s, 7, 'Why OER Matters'),
    p(s, 8, 'OER lets you benchmark a property\'s operational efficiency against market norms and identify both problems and opportunities. A property running a 60% OER in a market where comparable buildings average 48% may have bloated management costs, deferred maintenance driving up repair bills, or below-market rents dragging down the ratio. Conversely, a high OER can signal a value-add opportunity: fix the inefficiencies and your NOI jumps. Lenders and appraisers use OER to validate underwriting assumptions.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Always verify a seller\'s claimed expenses against actual bank statements, tax returns, and invoices \u2014 never accept a seller\'s pro-forma OER at face value. When building your own projections, research actual property tax rates, insurance quotes, and management fees for the market. Include a capital expenditure reserve of 5\u201310% of gross income even if the seller didn\'t budget one. Compare your target property\'s OER against at least three comparable properties to ensure your assumptions are realistic. A declining OER over time generally indicates improving management efficiency, while a rising OER may signal deferred maintenance catching up.'),
  ],

  'break-even-ratio': (s) => [
    h2(s, 1, 'What Is Break-Even Ratio (BER)?'),
    p(s, 2, 'The break-even ratio tells you what percentage of a property\'s gross income is consumed by operating expenses and debt service combined. It measures the minimum occupancy level required for a property to cover all its costs \u2014 operating expenses plus mortgage payments. It is fundamentally a risk metric: the lower your BER, the more vacancy and income loss you can absorb before the property starts losing money.'),
    h2(s, 3, 'The Break-Even Ratio Formula'),
    p(s, 4, 'Break-Even Ratio = (Operating Expenses + Debt Service) / Gross Operating Income \u00d7 100. If a property generates $120,000 in gross income, has $48,000 in operating expenses, and $54,000 in annual debt service, the BER is ($48,000 + $54,000) / $120,000 \u00d7 100 = 85%. This means you need at least 85% occupancy just to break even. Every point of vacancy below 85% means you\'re writing checks from your personal account.'),
    h2(s, 5, 'What Is a Healthy Break-Even Ratio?'),
    p(s, 6, 'A BER below 85% is generally considered healthy for residential rental properties. Below 80% provides a comfortable cushion. Below 75% is strong. Above 85% means you have very little margin for error \u2014 a single extended vacancy or unexpected repair could push you into negative cash flow. Above 90% is dangerous, and above 100% means the property is already cash-flow negative at current occupancy.'),
    h2(s, 7, 'Why Break-Even Ratio Matters'),
    p(s, 8, 'BER answers the question every leveraged investor should ask: "How bad can things get before I\'m losing money?" In a market downturn, rents may drop 5\u201310% and vacancy may double. If your BER is already at 90%, you\'re immediately underwater. If it\'s at 75%, you can weather significant adversity. Lenders use BER extensively in commercial underwriting \u2014 most require a BER below 85% to approve a loan. A low BER also gives you negotiating leverage with lenders because it demonstrates the deal\'s resilience.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Calculate BER for every acquisition using realistic expense projections, not the seller\'s numbers. Stress-test the ratio by increasing expenses 10% and reducing income 10% to see if the deal survives adversity. When comparing financing options, note how different loan terms affect BER \u2014 a higher interest rate or shorter amortization period increases debt service and pushes BER up. Value-add investors should calculate both the current BER and the projected stabilized BER to confirm the deal makes sense at both stages. If a deal\'s BER exceeds 85%, either negotiate a lower price, secure better financing, or walk away.'),
  ],

  'price-per-unit': (s) => [
    h2(s, 1, 'What Is Price Per Unit?'),
    p(s, 2, 'Price per unit is the total acquisition price of a multifamily property divided by the number of residential units. It is the most intuitive comparison metric in apartment investing, allowing you to quickly benchmark one building against another regardless of unit mix, age, or size. When an investor says "I bought at $95K per door," every experienced multifamily investor immediately understands the price point and can assess whether it\'s reasonable for that market.'),
    h2(s, 3, 'How to Calculate and Use Price Per Unit'),
    p(s, 4, 'Price Per Unit = Total Property Price / Number of Units. A 20-unit apartment building selling for $2,000,000 is $100,000 per unit. The calculation is simple; the interpretation requires market context. $100,000 per unit is extremely cheap in Boston or Denver but might be above market in parts of the Midwest or South. Always compare price per unit within the same submarket and among similar property classes (vintage, condition, unit size) for meaningful analysis.'),
    h2(s, 5, 'What Price Per Unit Tells You \u2014 and What It Does Not'),
    p(s, 6, 'Price per unit is a screening tool, not a valuation tool. It helps you quickly identify outliers \u2014 properties priced significantly above or below market on a per-unit basis deserve a closer look. However, it does not account for unit size (a building with 1,200 sq ft three-bedrooms vs. 500 sq ft studios at the same per-unit price is not an equal comparison), condition, location quality, or income potential. Always combine price per unit with cap rate, price per square foot, and cash flow analysis for a complete picture.'),
    h2(s, 7, 'Why Price Per Unit Matters'),
    p(s, 8, 'Institutional investors, brokers, and lenders all speak in price-per-unit terms when discussing multifamily. Knowing your market\'s typical range lets you instantly assess whether a deal is worth pursuing. It\'s also valuable for tracking market trends \u2014 rising price per unit across a submarket indicates cap rate compression and increasing competition. Replacement cost per unit (what it would cost to build new) sets an effective ceiling: if existing properties trade above replacement cost, new construction becomes more attractive than acquisition.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Build a database of price-per-unit comps for every submarket you target by tracking closed sales from CoStar, local brokers, or county records. Segment your data by property age, class (A/B/C), and unit size for meaningful comparisons. When evaluating a value-add deal, calculate both the current price per unit and the projected stabilized value per unit \u2014 the spread represents your potential equity creation. Be cautious of low price-per-unit deals that require massive capital expenditure per unit to stabilize; the total cost per unit (acquisition plus renovation) is what matters. In markets where institutional capital is active, price per unit tends to compress faster because large funds prioritize scale over yield.'),
  ],

  'price-per-square-foot': (s) => [
    h2(s, 1, 'What Is Price Per Square Foot?'),
    p(s, 2, 'Price per square foot divides a property\'s purchase price (or value) by its total livable square footage. It is the universal comparison metric in real estate, used by investors, agents, appraisers, and lenders to normalize property values across different sizes and configurations. While not a profitability metric, it is essential for identifying relative value within a market and making informed renovation decisions.'),
    h2(s, 3, 'How to Calculate Price Per Square Foot'),
    p(s, 4, 'Price Per Square Foot = Total Property Price / Total Livable Square Footage. A 2,000 sq ft property selling for $400,000 is $200 per square foot. For multifamily, you can calculate per the total building square footage or per individual unit. Always clarify whether the square footage includes common areas, garages, or unfinished basements \u2014 these significantly affect the calculation and can make comparisons misleading if not handled consistently.'),
    h2(s, 5, 'Why Market Context Is Everything'),
    p(s, 6, 'Price per square foot varies wildly by location, property type, and condition. Downtown Manhattan averages over $1,500/sq ft; parts of Cleveland average $50/sq ft. Even within a single city, price per square foot can double from one neighborhood to the next. This is why the metric is only meaningful in comparison to similar properties in the same submarket. Track the median price per square foot for your target areas using MLS data, and flag any property that deviates significantly \u2014 in either direction \u2014 for further investigation.'),
    h2(s, 7, 'Using Price Per Square Foot for Renovation Decisions'),
    p(s, 8, 'Price per square foot is invaluable for determining whether renovations will yield a positive return. If the market supports $200/sq ft for renovated homes and you can add 500 square feet for $100/sq ft in construction costs, the math works. But if you\'re spending $150/sq ft to renovate and the market caps at $175/sq ft, your margin is razor-thin. Use the gap between current price per square foot and renovated comps\' price per square foot to estimate your maximum profitable renovation budget.'),
    h2(s, 9, 'Why Price Per Square Foot Matters'),
    p(s, 10, 'This metric helps you quickly spot value anomalies. A property listed significantly below the neighborhood\'s average price per square foot might be undervalued due to cosmetic issues, poor marketing, or a motivated seller. Conversely, a property priced well above average needs to justify that premium with superior location, finishes, or amenities. Appraisers use price per square foot as a primary adjustment factor when comparing sales, so understanding it helps you predict appraised values.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Use price per square foot from sold comps (not listings) for accurate market data. Larger homes typically have a lower price per square foot than smaller homes in the same area \u2014 this is the "size premium discount" and is normal. When comparing properties, ensure you\'re using the same square footage source (tax records vs. MLS vs. actual measurement can differ by 10\u201315%). For income properties, pair price per square foot with rent per square foot to assess yield efficiency \u2014 a property at $150/sq ft with rent of $1.50/sq ft/month is equivalent to the 1% rule.'),
  ],

  'cap-rate-compression': (s) => [
    h2(s, 1, 'What Is Cap Rate Compression?'),
    p(s, 2, 'Cap rate compression occurs when property values rise faster than net operating income, causing cap rates to decline over time. If a property\'s NOI stays flat at $100,000 but its market value increases from $1,250,000 to $1,667,000, the cap rate compresses from 8% to 6%. This phenomenon has been one of the dominant themes in commercial real estate over the past two decades, driven by abundant capital chasing a limited supply of income-producing properties.'),
    h2(s, 3, 'What Drives Cap Rate Compression'),
    p(s, 4, 'Three primary forces compress cap rates. First, low interest rates reduce borrowing costs, enabling buyers to pay more and accept lower yields. When 10-year Treasury rates drop from 5% to 2%, the required return on real estate drops correspondingly. Second, institutional capital flow \u2014 pension funds, sovereign wealth funds, and private equity pouring billions into real estate \u2014 creates fierce competition for deals. Third, market perception of real estate as a safe-haven asset during periods of stock market volatility or inflation increases demand for property investments.'),
    h2(s, 5, 'Winners and Losers'),
    p(s, 6, 'Cap rate compression is excellent news for sellers and current property owners \u2014 your existing assets are worth more even if income hasn\'t changed. It is challenging for buyers because it means paying more per dollar of income, resulting in lower initial yields and tighter cash-flow margins. For new investors entering a market with historically compressed cap rates, the risk is that rates expand (revert higher), causing property values to decline even if income is stable or growing.'),
    h2(s, 7, 'Historical Context'),
    p(s, 8, 'In the early 2000s, multifamily cap rates in primary U.S. markets averaged 7\u20138%. By 2021, they had compressed to 3.5\u20134.5% in gateway cities. The rapid interest rate increases of 2022\u20132023 caused partial cap rate expansion (decompression) in many markets, particularly office and retail. Understanding where cap rates sit relative to their historical range and relative to prevailing interest rates is essential for determining whether a market offers value or is overheated.'),
    h2(s, 9, 'Why Cap Rate Compression Matters'),
    p(s, 10, 'If you bought a property at a 7% cap rate and sell when market cap rates have compressed to 5%, you earn a windfall gain \u2014 even without improving the property at all. Conversely, buying at a 4% cap rate in a rising-rate environment exposes you to significant value loss if cap rates expand to 6%. Understanding compression dynamics helps you time your acquisitions and dispositions strategically and avoid overpaying in frothy markets.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Track cap rate trends in your target markets quarterly using CoStar, Real Capital Analytics, or local broker reports. Compare current cap rates to the 10-year Treasury yield to assess the cap rate spread (see cap-rate-spread). When buying in a compressed cap rate environment, your investment thesis must rely on income growth (raising rents, reducing expenses) rather than further compression \u2014 don\'t bet on cap rates getting even lower. Build cap rate expansion into your stress tests: model what happens to your property\'s value if cap rates increase 100\u2013200 basis points.'),
  ],

  'effective-gross-income': (s) => [
    h2(s, 1, 'What Is Effective Gross Income (EGI)?'),
    p(s, 2, 'Effective gross income represents the realistic total income a property actually generates after accounting for vacancy, credit losses, and concessions, plus any ancillary income sources. It is the bridge between the theoretical maximum income (gross potential income) and the actual money hitting your bank account. EGI is the starting point for calculating net operating income and is the most honest top-line revenue figure in your analysis.'),
    h2(s, 3, 'The EGI Formula'),
    p(s, 4, 'Effective Gross Income = Gross Potential Income - Vacancy Loss - Credit Loss / Concessions + Other Income. Gross potential income assumes 100% occupancy at market rent. Vacancy loss reflects expected unoccupied time (typically 5\u201310%). Credit loss accounts for tenants who don\'t pay (budget 1\u20133%). Other income includes all non-rent revenue: laundry machines, parking fees, pet rent, storage unit fees, application fees, late fees, vending machines, and utility reimbursements.'),
    h2(s, 5, 'Why Other Income Matters'),
    p(s, 6, 'Ancillary income can meaningfully impact property value because it flows directly to NOI. Adding $200/month in parking revenue to a 20-unit building generates $48,000/year. At a 6% cap rate, that $48,000 in additional income adds $800,000 to the property\'s value. Smart multifamily operators systematically maximize other income through pet rent ($25\u201350/pet/month), reserved parking ($50\u2013100/spot/month), package lockers, laundry upgrades, storage units, and utility bill-back programs (RUBS \u2014 Ratio Utility Billing System).'),
    h2(s, 7, 'Why EGI Matters'),
    p(s, 8, 'EGI is the number your actual financial performance should track against. If you underwrote a deal based on EGI of $200,000 and you\'re only collecting $180,000, you have a 10% income shortfall that cascades through every downstream metric \u2014 NOI, debt coverage, cash-on-cash return, and property value. Lenders underwrite loans based on EGI, not gross potential income. Appraisers use EGI in the income approach to valuation. Getting EGI right is essential for accurate deal analysis.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Always verify EGI against actual rent rolls, bank deposits, and tax returns \u2014 never trust a broker\'s pro forma. Look for discrepancies between listed rents and collected rents (the difference reveals credit loss). Investigate other income line items to ensure they\'re sustainable and transferable to a new owner. When projecting EGI for acquisitions, use current actual rents rather than asking rents or market rents unless you\'re specifically underwriting a value-add rent increase. Build your vacancy and credit loss assumptions from local market data, not national averages.'),
  ],

  'gross-potential-income': (s) => [
    h2(s, 1, 'What Is Gross Potential Income (GPI)?'),
    p(s, 2, 'Gross potential income is the theoretical maximum revenue a property could generate if every unit were occupied at full market rent for the entire year with zero collection losses. It represents the income ceiling \u2014 the absolute best-case scenario. While no property ever achieves GPI in practice, it serves as the essential starting point for every income-based analysis in real estate investing.'),
    h2(s, 3, 'How to Calculate GPI'),
    p(s, 4, 'Gross Potential Income = Number of Units \u00d7 Market Rent Per Unit \u00d7 12. For a 10-unit building where each unit commands $1,500/month market rent, GPI is 10 \u00d7 $1,500 \u00d7 12 = $180,000. If the property has mixed unit types (studios, one-beds, two-beds), calculate GPI for each unit type separately using their respective market rents, then sum the totals. Use current market rent, not the actual rents being charged, to capture the property\'s true income potential.'),
    h2(s, 5, 'GPI vs. Actual Income'),
    p(s, 6, 'The gap between GPI and actual collected income reveals how much upside a property may have. If GPI is $180,000 but the property only collects $140,000, there\'s $40,000 of potential income being lost to below-market rents, vacancy, and credit losses. This gap is the primary opportunity that value-add investors target. However, a large gap can also signal deeper problems: persistent vacancy due to location issues, deferred maintenance driving away tenants, or market rents that are unrealistically high.'),
    h2(s, 7, 'Why GPI Is Never Achieved'),
    p(s, 8, 'Even the best-managed properties in the hottest markets experience some vacancy during tenant turnovers \u2014 cleaning, minor repairs, and releasing take time. Some tenants inevitably pay late or not at all. Market rents fluctuate seasonally. Lease renewals may include concessions or hold rents below market to retain good tenants. These realities are why sophisticated analysis always deducts vacancy and credit losses from GPI to arrive at effective gross income, which represents the realistic income figure.'),
    h2(s, 9, 'Why GPI Matters'),
    p(s, 10, 'GPI is the baseline that every other income metric builds from. It helps you quantify the value-add opportunity \u2014 the gap between current performance and full potential. It also serves as a benchmark for measuring management effectiveness: a property collecting 93% of GPI is outperforming one collecting 82%, all else being equal. When evaluating an acquisition, compare the seller\'s claimed rents to actual market rents to determine whether GPI is realistic or inflated.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Research actual market rents using Rentometer, Apartments.com, Zillow, and conversations with local property managers \u2014 do not rely on the seller\'s stated "market rent." When a property has below-market leases, calculate both current GPI (using actual rents) and market GPI (using market rents) to quantify the income upside. Remember that raising rents to market often triggers turnover, so factor in the short-term vacancy cost of a rent increase strategy. Review GPI assumptions annually as market rents shift \u2014 your analysis is only as good as your rent estimates.'),
  ],

  'pro-forma': (s) => [
    h2(s, 1, 'What Is a Pro Forma?'),
    p(s, 2, 'A pro forma is a projected financial statement that estimates a property\'s future income, expenses, and returns based on a set of assumptions. It is the document that turns a property listing into an investment analysis. Every real estate deal begins with a pro forma \u2014 the question is whether the assumptions behind it reflect reality or wishful thinking. The ability to build, interpret, and challenge a pro forma is the most critical skill in real estate investing.'),
    h2(s, 3, 'Seller Pro Forma vs. Buyer Pro Forma'),
    p(s, 4, 'A seller\'s pro forma is designed to make the property look as attractive as possible. It typically uses market rents (even if current tenants pay less), minimizes expense projections, assumes aggressive rent growth, and ignores capital expenditure needs. A buyer\'s pro forma should be the opposite: conservative rent estimates based on actual rent rolls, realistic expenses verified against T-12 actuals, modest growth assumptions, and adequate reserves. The gap between seller and buyer pro formas often determines the negotiation range.'),
    h2(s, 5, 'The T-12: Trailing Twelve Months'),
    p(s, 6, 'The T-12 is the last twelve months of actual financial performance \u2014 real collected rents, real paid expenses, real net income. It is the most important document in underwriting because it shows what the property actually did, not what someone thinks it might do. Always request the T-12 (monthly P&L statements for the past 12 months) and compare every line item against the seller\'s pro forma. Significant discrepancies between T-12 actuals and pro forma projections should be explained or challenged. Expenses on the pro forma that are 20%+ below T-12 actuals are a red flag.'),
    h2(s, 7, 'Key Pro Forma Components'),
    p(s, 8, 'A thorough pro forma includes: Gross Potential Income, vacancy and credit loss assumptions, other income, effective gross income, detailed operating expenses by category (taxes, insurance, management, maintenance, utilities, reserves), net operating income, debt service, pre-tax cash flow, and key metrics (cap rate, cash-on-cash return, DSCR, break-even ratio). Multi-year pro formas project these figures forward with annual rent growth, expense inflation, and a disposition (sale) assumption to calculate IRR.'),
    h2(s, 9, 'Why Pro Forma Matters'),
    p(s, 10, 'The pro forma is your decision-making tool. It tells you whether a deal pencils \u2014 whether the numbers support the price being asked. A well-built pro forma lets you stress-test assumptions: what if vacancy doubles, what if interest rates rise, what if rents grow at 2% instead of 5%? It forces you to think critically about every assumption and quantify the downside risk. Lenders require pro formas for commercial loan applications, and syndication investors evaluate sponsors based on the quality of their pro forma projections.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Build your own pro forma from scratch for every deal \u2014 never rely on the seller\'s or broker\'s version. Use T-12 actual data as your baseline and only deviate when you have a specific, justifiable reason (e.g., you\'re raising rents after renovation). Use conservative annual rent growth (2\u20133%) and expense inflation (3\u20134%). Always include capital expenditure reserves (5\u201310% of gross income). Run multiple scenarios: base case, downside case, and upside case. The deal should still make sense in your downside scenario. Share your pro forma assumptions with experienced investors for feedback \u2014 they will catch optimistic assumptions you may have overlooked.'),
  ],

  'absorption-rate': (s) => [
    h2(s, 1, 'What Is Absorption Rate?'),
    p(s, 2, 'Absorption rate measures how quickly properties are being sold or leased in a specific market over a given period. In sales markets, it tells you how many months of inventory remain based on the current pace of transactions. In leasing markets, it measures how quickly new or available space is being occupied. Absorption rate is the pulse check for market supply and demand dynamics and directly informs your investment timing, pricing strategy, and exit planning.'),
    h2(s, 3, 'How to Calculate Absorption Rate'),
    p(s, 4, 'For residential sales: Monthly Absorption Rate = Number of Sales in Period / Number of Months in Period. Then: Months of Inventory = Active Listings / Monthly Absorption Rate. If 60 homes sold in 6 months (10/month) and there are 200 active listings, there are 20 months of inventory. For rental absorption: Net Absorption = Units Occupied End of Period - Units Occupied Beginning of Period. Positive net absorption means demand is outpacing supply; negative means the market is softening.'),
    h2(s, 5, 'Interpreting Market Conditions'),
    p(s, 6, 'Generally, less than 4 months of inventory indicates a strong seller\'s market with rising prices. Four to 6 months is a balanced market. More than 6 months favors buyers, with potential price declines. Some analysts use absorption percentages: above 20% monthly absorption indicates a seller\'s market, while below 15% suggests a buyer\'s market. These thresholds vary by market, so always compare to local historical norms rather than relying solely on national benchmarks.'),
    h2(s, 7, 'Why Absorption Rate Matters'),
    p(s, 8, 'Absorption rate directly impacts your exit strategy. If you\'re flipping a house in a market with 3 months of inventory, you can price aggressively and expect a quick sale. With 12 months of inventory, you may hold the property much longer than projected, eating into profits through carrying costs. For development projects, absorption rate determines how quickly you can lease or sell units after completion \u2014 a slow absorption market can turn a profitable project into a disaster if you\'re carrying construction debt. For buy-and-hold investors, absorption rate indicates future rent growth potential: tight supply markets typically see stronger rent increases.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Track absorption rates monthly for your target markets using MLS data, CoStar, or local REALTOR association reports. Break down absorption by property type, price range, and submarket \u2014 city-wide averages can mask significant variation within neighborhoods. When planning a flip exit, multiply your expected hold time by 1.5 in markets with above-average inventory as a safety margin. For new construction or large renovation projects, underwrite a conservative absorption schedule \u2014 if the market absorbs 10 units/month, assume your project captures only a fraction of that. Monitor absorption trends (accelerating vs. decelerating) rather than just point-in-time snapshots for better predictive insight.'),
  ],

  comps: (s) => [
    h2(s, 1, 'What Are Comps?'),
    p(s, 2, 'Comps \u2014 short for comparable sales \u2014 are recently sold properties that are similar to the property you\'re analyzing. They are the foundation of real estate valuation. Whether you\'re buying, selling, refinancing, or contesting a tax assessment, comps are the primary evidence used to establish a property\'s fair market value. No tool, algorithm, or gut feeling is more reliable than well-selected comparable sales data.'),
    h2(s, 3, 'How to Pull Comps'),
    p(s, 4, 'The best comps meet five criteria. Location: same neighborhood or comparable area, ideally within a half-mile. Recency: sold within the last 3\u20136 months (use 6\u201312 months in slower markets). Size: within 15\u201320% of the subject property\'s square footage. Configuration: similar bedroom and bathroom count. Condition: similar renovation level and age. The MLS is the gold standard source for comp data; Redfin and Zillow provide less detailed but publicly accessible alternatives. Pull at least 3\u20135 comps for each analysis.'),
    h2(s, 5, 'Making Adjustments'),
    p(s, 6, 'No two properties are identical, which is why raw comp prices must be adjusted. Add value for features the comp lacks (e.g., if your subject has a garage and the comp doesn\'t, add the estimated value of a garage to the comp\'s price). Subtract value for features the comp has that yours doesn\'t. Common adjustment factors include square footage differences ($50\u2013150/sq ft depending on market), bedroom count ($5,000\u2013$15,000 per bedroom), garage ($10,000\u2013$25,000), lot size, pool, renovation level, and view. The adjusted comp prices should cluster around a tight range \u2014 that range is your indicated value.'),
    h2(s, 7, 'Why Comps Matter'),
    p(s, 8, 'Comps are the language of value in real estate. Appraisers use them to establish official value for lenders. Agents use them to set listing prices. Investors use them to calculate ARV and determine maximum offer prices. Tax assessors use them to establish assessed value. When you present well-researched comps to support your offer price, you gain credibility with sellers, brokers, and lenders. When you ignore comps and rely on estimates or online algorithms, you expose yourself to costly valuation errors.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Drive every comp in person before relying on it \u2014 photos can be deceiving, and you need to assess the neighborhood, street appeal, and condition firsthand. Be skeptical of outlier comps (very high or very low sales) \u2014 investigate whether the transaction was arm\'s-length or involved special circumstances (foreclosure, estate sale, family transfer). For fix-and-flip ARV estimation, your comps should represent the finished quality you\'re targeting \u2014 don\'t use high-end comps if you\'re doing a mid-range renovation. Build relationships with local agents who can provide off-market comp data and context about specific transactions.'),
  ],

  'fair-market-value': (s) => [
    h2(s, 1, 'What Is Fair Market Value (FMV)?'),
    p(s, 2, 'Fair market value is the price a property would sell for on the open market when both buyer and seller are acting in their own self-interest, have reasonable knowledge of the relevant facts, and are not under undue pressure to transact. It is a legal and financial concept used in appraisals, taxation, estate planning, insurance claims, and investment analysis. FMV is not what you want the property to be worth or what the seller is asking \u2014 it is what the market evidence says it is worth.'),
    h2(s, 3, 'Three Approaches to Determining FMV'),
    p(s, 4, 'Appraisers use three approaches. The Sales Comparison Approach (comps) is most common for residential properties: find similar recent sales and adjust for differences. The Income Approach capitalizes a property\'s net operating income to determine value (Value = NOI / Cap Rate), and is most relevant for investment properties. The Cost Approach estimates the cost to rebuild the structure from scratch plus land value minus depreciation, and is primarily used for unique or special-purpose properties. For investors, the income approach is the most critical because it directly connects property value to financial performance.'),
    h2(s, 5, 'The Income Approach for Investors'),
    p(s, 6, 'The income approach is where investor skill creates an edge. If you can increase a property\'s NOI through better management, renovations, rent increases, or expense reduction, you directly increase its fair market value. A property with $80,000 NOI valued at a 6% cap rate is worth $1,333,333. Increase NOI to $100,000 through value-add improvements and the property is now worth $1,666,667 \u2014 you created $333,334 in value. This forced appreciation is the foundation of the value-add investment strategy.'),
    h2(s, 7, 'Why Fair Market Value Matters'),
    p(s, 8, 'Understanding FMV prevents you from overpaying for acquisitions, underpricing dispositions, and making decisions based on emotion rather than evidence. It is the baseline for every negotiation. When you know a property\'s FMV and can support it with data, you negotiate from a position of strength. FMV also determines your property tax obligations, insurance coverage needs, estate planning implications, and refinancing capacity. Lenders will only lend based on appraised FMV, regardless of what you paid or what you think the property is worth.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Develop the ability to estimate FMV before seeing an appraisal \u2014 it sharpens your deal evaluation skills and helps you move quickly on good opportunities. Use multiple valuation approaches and look for convergence: if the comp approach says $500,000, the income approach says $520,000, and the cost approach says $510,000, you have strong confidence in a value around $500,000\u2013520,000. Be wary of "aspirational value" \u2014 what you think the property will be worth after your improvements. Buy based on current FMV and underwrite your improvements separately. Contest your property tax assessment if it exceeds FMV, using the same comp data an appraiser would use.'),
  ],

  'market-rent': (s) => [
    h2(s, 1, 'What Is Market Rent?'),
    p(s, 2, 'Market rent is the rent a property or unit would command on the open market under current conditions. It reflects what a qualified tenant would voluntarily pay, and a landlord would voluntarily accept, for a specific unit type in a specific location at a specific time. Market rent is the baseline for income projections, property valuation, and identifying investment opportunities. A property with rents significantly below market represents upside; one with rents above market carries vacancy risk.'),
    h2(s, 3, 'How to Determine Market Rent'),
    p(s, 4, 'Use multiple data sources for accuracy. Rentometer provides rent estimates by address based on comparable listings. Zillow and Apartments.com show current asking rents for competing units. Craigslist and Facebook Marketplace reveal what individual landlords are charging \u2014 often more reflective of true small-investor rental rates than institutional apartment data. Local property management companies provide the most accurate market rent information because they manage hundreds of units and see real-time leasing velocity. Survey at least 10\u201315 comparable units to establish a reliable market rent range.'),
    h2(s, 5, 'Below-Market Rent: Opportunity or Problem?'),
    p(s, 6, 'When existing rents are below market, you have a potential value-add opportunity. If a 10-unit building charges $900/unit when market rent is $1,100/unit, that\'s $24,000/year in untapped income. At a 6% cap rate, closing that gap adds $400,000 in property value. However, raising rents to market often triggers tenant turnover, requiring renovation, releasing costs, and temporary vacancy. Calculate whether the short-term costs of the transition are justified by the long-term income increase before committing.'),
    h2(s, 7, 'Above-Market Rent: Hidden Risk'),
    p(s, 8, 'Properties with rents above market levels face elevated vacancy risk. When current tenants leave, replacements will demand market rates. If the seller\'s income statements reflect above-market rents, the property is effectively overvalued. This commonly occurs when a seller has long-term tenants who accepted gradual rent increases above market or when a property benefited from a temporary supply shortage that has since resolved. Always verify that current rents are sustainable at market levels.'),
    h2(s, 9, 'Why Market Rent Matters'),
    p(s, 10, 'Market rent determines gross potential income, which drives property valuation through the income approach. Lenders underwrite loans using market rent, not actual rent, when actual rent is below market. Appraisers adjust their income projections based on market rent. And for investors, the spread between current rent and market rent is one of the most reliable indicators of value-add potential. Consistently tracking market rent in your target areas gives you an informational edge over less diligent competitors.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Track market rent quarterly in every submarket you invest in by monitoring new listings, talking to property managers, and reviewing rent survey reports. When acquiring a property, call comparable buildings as a prospective tenant to confirm actual market rents \u2014 don\'t rely solely on online estimates. Factor in concessions (free month, reduced deposit) that effectively lower the real rent below the stated amount. For rent increase planning, research your local rent control and rent stabilization laws \u2014 many jurisdictions limit the size and frequency of increases. Remember that market rent has a seasonal component: summer typically commands higher rents than winter in most markets.'),
  ],

  'highest-and-best-use': (s) => [
    h2(s, 1, 'What Is Highest and Best Use?'),
    p(s, 2, 'Highest and best use (HBU) is the appraisal concept that identifies the most profitable, legally permissible, and physically possible use of a parcel of real property. It is the use that produces the highest residual land value. HBU analysis is foundational to real estate valuation because a property\'s value is ultimately determined not just by what it is today, but by what it could potentially become. Investors who recognize HBU opportunities before the market prices them in capture outsized returns.'),
    h2(s, 3, 'The Four Tests of Highest and Best Use'),
    p(s, 4, 'Every HBU analysis must satisfy four sequential tests. Legally permissible: What does zoning, deed restrictions, environmental regulations, and building codes allow? Physically possible: Can the site physically support the proposed use given its size, shape, topography, soil conditions, and access? Financially feasible: Would the proposed use generate sufficient income to justify the cost of development? Maximally productive: Among all uses that pass the first three tests, which one produces the highest value? Each test is a filter \u2014 a use that fails any single test cannot be the highest and best use.'),
    h2(s, 5, 'HBU in Practice: Spotting Rezoning Opportunities'),
    p(s, 6, 'One of the most profitable plays in real estate investing is identifying properties whose current use does not match their highest and best use. A single-family house on a commercially zoned lot may be worth $200,000 as a house but $500,000 as a development site. A vacant parcel in the path of growth, currently zoned agricultural but likely to be rezoned residential, can multiply in value when the zoning change is approved. Successful investors monitor zoning changes, comprehensive plans, and infrastructure developments (new highways, transit lines, water/sewer extensions) to anticipate where HBU shifts will occur.'),
    h2(s, 7, 'Why Highest and Best Use Matters'),
    p(s, 8, 'HBU analysis prevents two costly mistakes. First, overpaying for a property because you valued it based on an unrealistic future use that isn\'t legally permissible or financially feasible. Second, underpaying yourself by selling a property at its current-use value when the land is worth significantly more under a different use. Every experienced developer evaluates land based on HBU, not current use. As an investor, thinking in HBU terms opens up opportunities invisible to investors focused solely on existing income.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Before any acquisition, check the property\'s zoning designation and read the applicable zoning code to understand what uses are permitted by right and by special exception. Review the municipality\'s comprehensive plan and future land use map \u2014 these documents telegraph where zoning changes are headed. Talk to local planning staff about pending zoning amendments or overlay districts that could affect your property. When evaluating a property with HBU potential above its current use, factor in the time and cost of entitlements (rezoning applications, variances, site plan approval) \u2014 the process can take 6\u201324 months and may not succeed. Partner with an experienced land use attorney for complex HBU plays.'),
  ],

  'rent-to-price-ratio': (s) => [
    h2(s, 1, 'What Is the Rent-to-Price Ratio?'),
    p(s, 2, 'The rent-to-price ratio compares a property\'s monthly rental income to its purchase price. It is commonly expressed as a percentage or referenced through the popular "1% rule" \u2014 if a property\'s monthly rent equals at least 1% of the purchase price, it passes the initial cash-flow screening. A $200,000 property renting for $2,000/month meets the 1% rule exactly. This ratio is the fastest way to determine whether a property has any chance of cash-flowing before running a detailed analysis.'),
    h2(s, 3, 'The 1% Rule and the 2% Rule'),
    p(s, 4, 'The 1% rule is a minimum threshold for most buy-and-hold investors. Properties meeting this benchmark generally cash-flow positively after expenses and debt service, though it\'s not guaranteed. The 2% rule (monthly rent >= 2% of purchase price) is an aggressive target pursued by investors focused purely on cash flow \u2014 a $100,000 property renting for $2,000/month. Properties meeting the 2% rule almost always produce strong cash flow but are typically found in lower-income neighborhoods with higher management intensity and tenant turnover. Between 0.5% and 0.8% is common in expensive coastal markets, where investors rely primarily on appreciation rather than cash flow.'),
    h2(s, 5, 'How Market Conditions Affect the Ratio'),
    p(s, 6, 'In appreciation-driven markets like San Francisco, Seattle, or Austin, rent-to-price ratios of 0.4\u20130.7% are normal. Investors in these markets accept lower cash flow (or even negative cash flow) in exchange for expected property value increases. In cash-flow markets like Memphis, Indianapolis, Cleveland, or Birmingham, ratios of 1.0\u20131.5% are achievable. Some distressed or lower-income areas hit 2%+ but carry higher risk. The ratio you target should match your investment strategy \u2014 cash flow investors need higher ratios; appreciation investors can accept lower ones.'),
    h2(s, 7, 'Why Rent-to-Price Ratio Matters'),
    p(s, 8, 'This ratio is the fastest screening filter in your toolkit. When browsing listings, you can calculate it in seconds and immediately eliminate properties that cannot cash flow. It also serves as a market-level indicator: tracking average rent-to-price ratios across markets helps you identify where to invest based on your strategy. A declining ratio in your target market signals that prices are rising faster than rents (cap rate compression), potentially making new acquisitions less attractive for cash-flow investors.'),
    h2(s, 9, 'Practical Tips'),
    p(s, 10, 'Use the 1% rule as a screening filter, not a decision-making tool. Many properties that meet the 1% rule have high expense ratios (older buildings, high-tax areas, rough neighborhoods) that eliminate the apparent cash-flow advantage. Conversely, a property at 0.9% in a low-tax state with minimal maintenance may cash-flow better than a 1.1% property in a high-tax, high-maintenance market. Always follow up with a full analysis including expenses, financing costs, and capital reserves. When analyzing a market, calculate the rent-to-price ratio for dozens of listings to establish the local range and identify outlier opportunities. The ratio works best for single-family and small multifamily; larger commercial properties are better evaluated using cap rate.'),
  ],

  'cap-rate-spread': (s) => [
    h2(s, 1, 'What Is the Cap Rate Spread?'),
    p(s, 2, 'The cap rate spread is the difference between the prevailing capitalization rate for a real estate asset class and a benchmark risk-free rate, typically the 10-year U.S. Treasury yield. If multifamily cap rates are 5.5% and the 10-year Treasury yields 4.0%, the cap rate spread is 150 basis points (1.5%). This spread represents the risk premium investors demand for owning real estate instead of risk-free government bonds. It is one of the most important macro-level indicators for timing real estate investment decisions.'),
    h2(s, 3, 'Historical Norms and What They Tell Us'),
    p(s, 4, 'Historically, the cap rate spread for institutional-quality commercial real estate has averaged 200\u2013400 basis points above the 10-year Treasury. During periods of strong investor demand for real estate (2015\u20132021), spreads compressed to 150\u2013250 bps as capital flooded the market. During periods of financial stress or uncertainty (2008\u20132009, 2020), spreads widened to 400\u2013600 bps as investors demanded higher premiums for the perceived risk. Understanding where the current spread sits relative to the historical average tells you whether real estate is attractively priced, fairly valued, or overvalued relative to risk-free alternatives.'),
    h2(s, 5, 'Narrow Spread: Caution Signal'),
    p(s, 6, 'When the cap rate spread is narrow (below 200 bps), real estate is offering a small premium over risk-free bonds. This typically occurs when too much capital is chasing too few deals, driving prices up and cap rates down. A narrow spread suggests real estate may be overvalued \u2014 you\'re not being adequately compensated for the illiquidity, management burden, and risk of owning property versus simply buying Treasury bonds. This is often a good time to be a seller rather than a buyer.'),
    h2(s, 7, 'Wide Spread: Opportunity Signal'),
    p(s, 8, 'When the spread widens above 300\u2013400 bps, real estate offers a substantial premium over bonds. Wide spreads typically occur during economic uncertainty, rising interest rates (which push Treasury yields up faster than cap rates adjust), or after market dislocations. These periods often present the best acquisition opportunities for investors with capital and conviction. The wide spread provides a cushion \u2014 even if cap rates expand somewhat, your income yield still significantly exceeds risk-free alternatives.'),
    h2(s, 9, 'Why Cap Rate Spread Matters'),
    p(s, 10, 'The cap rate spread contextualizes whether current real estate pricing makes sense within the broader investment landscape. Looking at cap rates in isolation is misleading \u2014 a 6% cap rate is attractive when Treasuries yield 2% (400 bps spread) but less compelling when Treasuries yield 5% (100 bps spread). The spread framework forces you to evaluate real estate as one option within a portfolio of potential investments, which is how institutional investors think and how individual investors should think too.'),
    h2(s, 11, 'Practical Tips'),
    p(s, 12, 'Monitor the 10-year Treasury yield weekly and compare it against prevailing cap rates in your target markets to track the spread. When spreads are at or below historical lows, slow your acquisition pace, tighten your underwriting standards, and focus on selling or refinancing existing assets. When spreads are at or above historical highs, accelerate acquisition activity \u2014 these are the windows that generate the best long-term returns. Different property types have different typical spreads: industrial and multifamily trade at tighter spreads than retail or office due to perceived lower risk. Factor the cap rate spread into your exit assumptions: if you\'re buying during a wide-spread period, you may benefit from spread compression (rising values) during your hold.'),
  ],
}

// ── main ──────────────────────────────────────────────────────────────
async function main() {
  const slugs = Object.keys(TERMS)
  console.log(`\nFetching ${slugs.length} glossary terms from Sanity...\n`)

  const query = `*[_type == "glossaryTerm" && slug.current in $slugs && !defined(body)]{ _id, term, "slug": slug.current }`
  const terms = await client.fetch(query, { slugs })

  if (terms.length === 0) {
    console.log('All terms already have body content -- nothing to do.')
    return
  }

  console.log(`Found ${terms.length} terms to enrich:\n`)
  terms.forEach((t) => console.log(`   - ${t.term} (${t.slug})`))
  console.log()

  let updated = 0
  let skipped = 0

  for (const term of terms) {
    const builder = TERMS[term.slug]
    if (!builder) {
      console.log(`No content defined for "${term.slug}" -- skipping`)
      skipped++
      continue
    }

    const body = builder(term.slug)

    if (DRY_RUN) {
      console.log(`[DRY RUN] Would patch "${term.term}" with ${body.length} blocks`)
    } else {
      await client.patch(term._id).set({ body }).commit()
      console.log(`Patched "${term.term}" -- ${body.length} blocks`)
    }

    updated++
    await sleep(500)
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
