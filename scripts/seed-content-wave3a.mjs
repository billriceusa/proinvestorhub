import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Set it in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2026-03-12',
  token,
  useCdn: false,
})

// ── Helper: Portable Text block builders ─────────────
let keyCounter = 0
function uid() {
  return 'w3a' + String(++keyCounter).padStart(3, '0')
}

function h2(key, text) {
  return { _type: 'block', _key: key, style: 'h2', children: [{ _type: 'span', _key: key + 's', text }] }
}
function h3(key, text) {
  return { _type: 'block', _key: key, style: 'h3', children: [{ _type: 'span', _key: key + 's', text }] }
}
function p(key, text) {
  return { _type: 'block', _key: key, style: 'normal', children: [{ _type: 'span', _key: key + 's', text }] }
}
function bq(key, text) {
  return { _type: 'block', _key: key, style: 'blockquote', children: [{ _type: 'span', _key: key + 's', text }] }
}

/**
 * Build a Portable Text paragraph with inline links.
 * Usage: pLinks('key', [ 'plain text', ['/href', 'link text'], 'more plain text' ])
 */
function pLinks(key, segments, style = 'normal') {
  const children = []
  const markDefs = []
  let i = 0
  for (const seg of segments) {
    if (typeof seg === 'string') {
      children.push({ _type: 'span', _key: key + 'c' + i, text: seg })
    } else {
      // seg is [href, linkText]
      const markKey = key + 'l' + i
      markDefs.push({ _key: markKey, _type: 'link', href: seg[0] })
      children.push({ _type: 'span', _key: key + 'c' + i, text: seg[1], marks: [markKey] })
    }
    i++
  }
  return { _type: 'block', _key: key, style, children, markDefs }
}

// ══════════════════════════════════════════════════════
// DSCR & Investor Financing: The Complete Guide
// ══════════════════════════════════════════════════════
const dscrFinancingGuide = {
  _type: 'post',
  title: 'DSCR & Investor Financing: The Complete Guide',
  slug: { _type: 'slug', current: 'dscr-investor-financing-guide' },
  // author and categories set dynamically below
  publishedAt: '2026-03-17T10:00:00Z',
  excerpt: 'Everything investors need to know about DSCR loans, conventional financing, hard money, and portfolio loans — from an independent, unbiased perspective.',
  seo: {
    metaTitle: 'DSCR Loans & Investor Financing Guide 2026 | ProInvestorHub',
    metaDescription: 'Complete guide to DSCR loans, conventional mortgages, hard money, and portfolio loans for real estate investors. Independent analysis with calculator tools.',
  },
  body: [
    // ── Introduction ──────────────────────────────────
    pLinks('df01', [
      'Financing is the engine that powers real estate investing. The right loan product can transform a marginal deal into a wealth-building machine, while the wrong one can erode your returns or disqualify you from buying altogether. Yet most investor education glosses over financing or pushes a single product. This guide takes a different approach: we break down every major financing option available to real estate investors in 2026 — ',
      ['/blog/dscr-loans-explained', 'DSCR loans'],
      ', conventional mortgages, ',
      ['/glossary/hard-money-loan', 'hard money'],
      ', and portfolio loans — from an independent, unbiased perspective.',
    ]),
    p('df02', 'We are not a lender. We do not originate loans or earn referral fees. Our only agenda is helping you make smarter financing decisions based on your specific situation, portfolio size, and investment strategy. Whether you are buying your first rental or your fiftieth, the information here will help you choose the right loan, negotiate better terms, and avoid costly mistakes.'),
    pLinks('df03', [
      'By the end of this guide, you will understand exactly how ',
      ['/glossary/dscr', 'DSCR'],
      ' loans work, when they make sense versus conventional financing, how to calculate your own DSCR ratio, and how each loan type fits into strategies like the ',
      ['/blog/brrrr-method-complete-guide', 'BRRRR method'],
      '. Let us start with the fundamentals.',
    ]),

    // ── Section 1: What Is a DSCR Loan? ──────────────
    h2('df04', 'What Is a DSCR Loan?'),
    pLinks('df05', [
      'A DSCR loan is a non-qualified mortgage (non-QM) designed specifically for real estate investors. Unlike conventional loans that evaluate your personal income, tax returns, and debt-to-income ratio, a DSCR loan qualifies you based on one thing: whether the property\'s rental income covers the loan payment. The metric at the center of it all is the Debt Service Coverage Ratio, or ',
      ['/glossary/dscr', 'DSCR'],
      '.',
    ]),
    h3('df06', 'The DSCR Formula'),
    bq('df07', 'DSCR = Net Operating Income (NOI) / Annual Debt Service'),
    pLinks('df08', [
      ['/glossary/noi', 'Net operating income'],
      ' is the property\'s annual rental income minus operating expenses (property taxes, insurance, maintenance, vacancy reserves, and property management). Annual debt service is the total of all mortgage payments for the year, including principal, interest, taxes, insurance, and any HOA dues — often abbreviated as PITIA.',
    ]),
    p('df09', 'A DSCR of 1.0 means the property\'s income exactly covers the debt payment — it breaks even. A DSCR of 1.25 means the property generates 25% more income than the payment requires, providing a cushion. A DSCR below 1.0 means the property does not fully cover its own debt from rental income.'),
    p('df10', 'Here is a simple example. A rental property generates $2,400 per month in gross rent. After property taxes ($250/mo), insurance ($100/mo), and maintenance reserves ($200/mo), the effective income is $1,850 per month, or $22,200 per year. The annual mortgage payment (PITIA) is $18,000. The DSCR is $22,200 divided by $18,000, which equals 1.23. This property would qualify with most DSCR lenders.'),
    h3('df11', 'Why Rental Income Matters More Than Your W-2'),
    p('df12', 'Traditional lenders care about your personal income because they are lending to you. DSCR lenders care about the property\'s income because they are effectively lending to the property. This distinction is critical. If you are a self-employed investor who takes aggressive tax deductions, your tax returns might show $40,000 in income even though your rental portfolio generates $200,000 in gross rents. A conventional lender sees an underqualified borrower. A DSCR lender sees a strong property that cash flows well above the debt payment.'),
    p('df13', 'This is why DSCR loans have become the preferred financing tool for serious portfolio investors. Your personal income situation becomes irrelevant. Each property stands on its own merits. You could have fifty properties and qualify for a fifty-first — as long as that property\'s rental income covers the payment.'),

    // ── Section 2: DSCR vs. Conventional vs. Hard Money vs. Portfolio ──
    h2('df14', 'DSCR vs. Conventional vs. Hard Money vs. Portfolio Loans'),
    p('df15', 'Every investor financing option exists for a reason. None is universally superior — each serves a different situation, strategy, and stage of portfolio growth. Understanding the trade-offs between these four primary loan types is essential to building an efficient capital stack.'),

    h3('df16', 'Conventional Investment Property Loans'),
    p('df17', 'Conventional loans are the gold standard for investors who can qualify. They offer the lowest interest rates (currently 6.5% to 7.5% for investment properties), the best terms (30-year fixed), and the most favorable closing costs. The catch is qualification: you need full income documentation (W-2s, tax returns, pay stubs), a strong debt-to-income ratio (typically under 45%), a credit score of 680 or higher, and 15% to 25% down depending on the property type.'),
    p('df18', 'Conventional loans are originated under Fannie Mae and Freddie Mac guidelines, which means they are standardized, widely available, and competitively priced. However, these same guidelines create a hard ceiling: you can have a maximum of ten financed investment properties under conventional guidelines. This is the "ten-loan problem" that pushes scaling investors toward DSCR and portfolio alternatives.'),

    h3('df19', 'DSCR Loans'),
    p('df20', 'DSCR loans fill the gap where conventional loans fall short. No income verification, no DTI calculation, no limit on the number of loans. Rates are higher — typically 7% to 9% in the current market — but the flexibility is the trade-off. DSCR loans typically require 20% to 25% down, a credit score of 660 or higher, and 6 to 12 months of reserves. They can close in an LLC name, which conventional loans generally cannot. Closing timelines are often faster at 21 to 30 days because the documentation burden is lighter.'),

    h3('df21', 'Hard Money Loans'),
    pLinks('df22', [
      ['/glossary/hard-money-loan', 'Hard money loans'],
      ' are short-term, asset-based loans provided by private lenders or specialized lending companies. They are designed for speed and flexibility, not long-term holds. Rates range from 10% to 14%, terms are typically 6 to 24 months, and loan-to-value ratios cap at 60% to 75% of the property\'s after-repair value (ARV). Origination fees of 2 to 4 points are standard.',
    ]),
    p('df23', 'Hard money is the financing of choice for fix-and-flip investors and the "Buy" step in the BRRRR strategy. When you need to close in 7 to 14 days on a distressed property, no conventional or DSCR lender can match that speed. The high cost is acceptable because the loan is held for months, not years. You are paying a premium for speed and flexibility, then refinancing into permanent financing once the property is stabilized.'),

    h3('df24', 'Portfolio Loans'),
    p('df25', 'Portfolio loans are originated and held by local banks and credit unions on their own balance sheet — they are not sold to Fannie Mae or Freddie Mac. This means the lender can set their own qualification criteria, which often means more flexibility than conventional guidelines. Rates typically fall between 7% and 10%, and terms vary widely. Some offer 30-year fixed rates, others use 5 to 7 year adjustable rates or balloon structures.'),
    p('df26', 'Portfolio lenders are especially valuable for investors with complex financial situations, unusual property types, or relationships with local banks. A portfolio lender who knows your track record may approve deals that no standardized underwriting system would touch. The trade-off is less standardization — rates, terms, and requirements vary significantly from lender to lender, so you need to shop aggressively.'),

    h3('df27', 'Side-by-Side Comparison'),
    p('df28', 'Qualification basis: Conventional uses personal income and DTI. DSCR uses property rental income. Hard money uses property value (ARV). Portfolio varies by lender but often blends borrower and property factors.'),
    p('df29', 'Income documentation: Conventional requires full docs (tax returns, W-2s, pay stubs). DSCR requires none. Hard money requires none. Portfolio varies — some require full docs, others are flexible.'),
    p('df30', 'Interest rates (2026): Conventional 6.5% to 7.5%. DSCR 7% to 9%. Hard money 10% to 14%. Portfolio 7% to 10%.'),
    pLinks('df31', [
      ['/glossary/ltv', 'LTV'],
      ' limits: Conventional 75% to 85%. DSCR 75% to 80%. Hard money 60% to 75% of ARV. Portfolio 70% to 80%.',
    ]),
    p('df32', 'Loan count limits: Conventional maxes out at 10. DSCR has no limit. Hard money has no limit. Portfolio varies by lender.'),
    p('df33', 'Closing speed: Conventional 30 to 45 days. DSCR 21 to 30 days. Hard money 7 to 14 days. Portfolio 21 to 45 days.'),
    p('df34', 'Best use case: Conventional is best for your first 1 to 10 properties if you qualify on income. DSCR is best for scaling beyond 10 or when personal income documentation is a problem. Hard money is best for acquisitions, rehabs, and bridge financing. Portfolio is best for unusual deals and relationship-based lending.'),

    // ── Section 3: DSCR Loan Requirements in 2026 ─────
    h2('df35', 'DSCR Loan Requirements in 2026'),
    p('df36', 'DSCR lending has matured significantly since it emerged as a niche product. Today, dozens of lenders compete for investor business, which has driven down rates and standardized requirements. Here is what you need to know about qualifying for a DSCR loan in the current market.'),

    h3('df37', 'Minimum DSCR Ratio'),
    p('df38', 'Most lenders require a minimum DSCR of 1.0 to 1.25. A DSCR of 1.0 means the property breaks even — income exactly covers the payment. A DSCR of 1.25 provides a 25% cushion above the payment. Some lenders offer "no-ratio" DSCR programs where the ratio is not calculated at all, but these typically require higher down payments (30% or more), higher credit scores (700+), and charge premium rates. The sweet spot for most deals is a DSCR of 1.15 to 1.30, which gives you comfortable qualification while keeping your capital efficient.'),

    h3('df39', 'Credit Score Requirements'),
    p('df40', 'The minimum credit score for most DSCR lenders is 660, though some will go as low as 620 with compensating factors like a higher down payment or a very strong DSCR ratio. Expect rate pricing tiers: 660 to 679 gets the highest rates, 680 to 699 is mid-tier, 700 to 719 is better, and 720 and above gets the best available rates. The rate difference between a 660 and a 740 credit score can be 1% to 1.5% or more, which translates to hundreds of dollars per month on a typical investment property loan.'),

    h3('df41', 'Down Payment and Reserves'),
    p('df42', 'Standard down payment requirements are 20% to 25% of the purchase price. Some lenders require 25% for lower DSCR ratios (under 1.0) or lower credit scores. Cash reserves of 6 to 12 months of PITIA payments are typically required, held in a liquid account. These reserves demonstrate that you can cover the mortgage during vacancy or unexpected expenses. Some lenders will count equity in other properties or retirement accounts toward the reserve requirement.'),

    h3('df43', 'Eligible Property Types'),
    p('df44', 'DSCR loans cover a wide range of investment properties. Single-family rentals (1 unit) are the most common. Small multi-family properties (2 to 4 units) qualify under residential DSCR programs. Commercial multi-family (5+ units) requires commercial DSCR products with different underwriting. Short-term rentals (Airbnb, VRBO) are eligible with many lenders, though they may use projected income from platforms like AirDNA rather than a traditional rent survey. Condos and townhomes are generally eligible, with some lenders having warrantable condo requirements.'),

    h3('df45', 'No-Ratio DSCR Programs'),
    p('df46', 'No-ratio DSCR programs are a relatively new development. The lender does not calculate or require a minimum DSCR — the property does not need to cash flow from day one. These programs are designed for investors buying in high-appreciation markets where rents may not cover the payment immediately but are expected to grow. The trade-off is cost: expect higher rates (typically 0.5% to 1% above standard DSCR), higher down payments (25% to 30%), and stricter credit requirements (700+). No-ratio programs can also work for investors who plan to renovate and increase rents after closing.'),

    // ── Section 4: How to Calculate Your DSCR ─────────
    h2('df47', 'How to Calculate Your DSCR: Step-by-Step'),
    pLinks('df48', [
      'Let us walk through a complete DSCR calculation using a realistic example. This is the exact process a lender uses to evaluate your deal, and it is the same process you should use before making an offer. You can run these numbers instantly with our ',
      ['/calculators/rental-cashflow', 'rental cash flow calculator'],
      '.',
    ]),

    h3('df49', 'Step 1: Determine Gross Rental Income'),
    p('df50', 'Start with the property\'s fair market rent. For this example, we will use a $300,000 single-family rental that commands $2,200 per month in rent based on comparable properties. Annual gross rental income: $2,200 times 12 equals $26,400.'),

    h3('df51', 'Step 2: Adjust for Vacancy'),
    p('df52', 'No property is rented 365 days a year forever. Apply a vacancy factor of 5% to 10% depending on your market. We will use 7% for this example. Vacancy adjustment: $26,400 times 7% equals $1,848. Effective gross income: $26,400 minus $1,848 equals $24,552.'),

    h3('df53', 'Step 3: Subtract Operating Expenses'),
    p('df54', 'Operating expenses include property taxes, insurance, maintenance, property management, and reserves for capital expenditures. For our $300,000 property: Property taxes $3,600 per year. Insurance $1,800 per year. Maintenance and capex reserves (10% of gross rent) $2,640 per year. Property management (8% of gross rent) $2,112 per year. Total operating expenses: $10,152 per year.'),

    h3('df55', 'Step 4: Calculate Net Operating Income'),
    pLinks('df56', [
      ['/glossary/noi', 'NOI'],
      ' equals effective gross income minus total operating expenses. NOI: $24,552 minus $10,152 equals $14,400 per year.',
    ]),
    bq('df57', 'NOI = $24,552 (Effective Gross Income) - $10,152 (Operating Expenses) = $14,400'),

    h3('df58', 'Step 5: Calculate Annual Debt Service'),
    pLinks('df59', [
      'With 25% down ($75,000), your loan amount is $225,000. At a DSCR loan rate of 8% on a 30-year ',
      ['/glossary/amortization', 'amortization'],
      ' schedule, the monthly principal and interest payment is approximately $1,651. Add monthly property tax escrow ($300) and insurance escrow ($150), and the total monthly PITIA is $2,101. Annual debt service: $2,101 times 12 equals $25,212.',
    ]),

    h3('df60', 'Step 6: Calculate the DSCR'),
    bq('df61', 'DSCR = $14,400 (NOI) / $25,212 (Annual Debt Service) = 0.57'),
    p('df62', 'Wait — a DSCR of 0.57? That is well below the 1.0 minimum. This property does not qualify for a standard DSCR loan at these numbers. This is an important lesson: not every property pencils out for DSCR financing.'),
    p('df63', 'Note that many DSCR lenders use a simpler calculation: gross monthly rent divided by total monthly PITIA payment. In our case, that would be $2,200 divided by $2,101, which equals 1.047 — a much more favorable number that would qualify with most lenders. The difference comes down to whether the lender uses gross rent or NOI in the numerator. Always confirm which formula your specific lender uses, as it dramatically affects qualification.'),
    pLinks('df64', [
      'Use our ',
      ['/calculators/mortgage', 'mortgage calculator'],
      ' to model different scenarios. Adjusting the down payment to 30% ($90,000 loan of $210,000) drops the monthly payment to $1,961 total PITIA, giving a gross rent DSCR of 1.12 — comfortably qualifying. Small changes in down payment and rate have outsized effects on your DSCR.',
    ]),

    // ── Section 5: The 10-Loan Problem ────────────────
    h2('df65', 'The 10-Loan Problem: Why Conventional Loans Hit a Wall'),
    p('df66', 'One of the most important structural constraints in real estate investing is rarely discussed outside of experienced investor circles: the Fannie Mae conventional loan limit. Under current guidelines, an individual borrower can have a maximum of ten financed properties (including their primary residence) with conventional mortgages. This is not ten loans total — it is ten properties with conventional financing of any kind.'),
    p('df67', 'For investors in the early stages, this feels like a non-issue. But if you are buying one or two properties per year, you will hit the ten-property wall in five to seven years. At that point, conventional lenders will decline your application regardless of your income, credit score, or track record. Your portfolio could be generating $500,000 per year in net cash flow and it would not matter — the guideline is absolute.'),

    h3('df68', 'How DSCR Solves the 10-Loan Problem'),
    p('df69', 'DSCR loans have no portfolio limit. You can have ten, twenty, fifty, or a hundred DSCR loans. Each property is evaluated independently based on its own rental income and debt service. There is no aggregation of your total portfolio debt, no global DTI calculation, and no limit on total loan count. Each acquisition is a standalone underwriting decision.'),
    p('df70', 'This is the portfolio scaling unlock. The most common strategy among successful investors is to use conventional financing for their first ten properties (capturing the lowest available rates), then switch to DSCR for properties eleven and beyond. Some investors refinance their early conventional loans into DSCR once they hit the limit, freeing up conventional capacity for new purchases with even better terms.'),
    p('df71', 'The math makes this clear: if you plan to build a portfolio of twenty or more properties, DSCR loans are not optional — they are essential. The slightly higher rate (1% to 2% above conventional) is the cost of unlimited scalability. Across a large enough portfolio, the ability to keep acquiring properties generates far more wealth than the interest savings of staying under ten conventional loans.'),

    // ── Section 6: DSCR in the BRRRR Strategy ─────────
    h2('df72', 'DSCR Loans in the BRRRR Strategy'),
    pLinks('df73', [
      'The ',
      ['/blog/brrrr-method-complete-guide', 'BRRRR strategy'],
      ' — Buy, Rehab, Rent, Refinance, Repeat — is the most capital-efficient way to build a rental portfolio. And DSCR loans are the "Refinance" step that makes the entire cycle work.',
    ]),

    h3('df74', 'How BRRRR Works with DSCR Financing'),
    pLinks('df75', [
      'Step one: Buy a distressed property below market value using ',
      ['/glossary/hard-money-loan', 'hard money'],
      ' or cash. Step two: Rehab the property to increase its value and make it rent-ready. Step three: Rent the property to a qualified tenant at market rent. Step four: Refinance the hard money into a long-term DSCR loan based on the property\'s new appraised value and rental income. Step five: Repeat with the capital you recovered in the refinance.',
    ]),
    p('df76', 'Here is why DSCR loans are ideal for the refinance step. After rehab, the property\'s appraised value is significantly higher than your purchase price plus rehab cost. A DSCR cash-out refinance at 75% of the new appraised value can return most or all of your original investment. And because the DSCR lender qualifies you based on the property\'s new rental income — not your personal income — the refinance is straightforward even if you have multiple properties in various stages of the BRRRR cycle.'),
    pLinks('df77', [
      'Consider this example: You buy a distressed property for $180,000 and invest $40,000 in rehab, for a total of $220,000 invested. After rehab, the property appraises at $300,000 and rents for $2,200 per month. A DSCR cash-out refinance at 75% LTV gives you a loan of $225,000 — recovering $5,000 more than your total investment. You now own a cash-flowing rental with none of your own money in the deal. Use our ',
      ['/calculators/brrrr', 'BRRRR calculator'],
      ' to model your own scenarios.',
    ]),

    // ── Section 7: When NOT to Use DSCR ───────────────
    h2('df78', 'When NOT to Use a DSCR Loan'),
    p('df79', 'DSCR loans are powerful, but they are not always the right choice. Using them when a cheaper or more suitable alternative exists costs you money unnecessarily. Here are the situations where you should look elsewhere.'),

    h3('df80', 'When You Have Strong W-2 Income and Fewer Than 10 Properties'),
    p('df81', 'If you are a high-income W-2 earner with clean tax returns, a low debt-to-income ratio, and fewer than ten financed properties, conventional loans will save you 1% to 2% in interest rate. On a $250,000 loan, that is $2,500 to $5,000 per year in interest savings — real money that flows directly to your bottom line. Do not pay a DSCR premium when you can qualify conventionally. Save DSCR for when you actually need it.'),

    h3('df82', 'When You Need Short-Term Bridge Financing'),
    p('df83', 'DSCR loans are designed for long-term holds, typically with 30-year terms. If you are buying a property to flip or rehab over 6 to 12 months, a hard money loan or bridge loan is more appropriate. Hard money lenders specialize in speed and short-term flexibility. Yes, the rate is higher, but you only hold the loan for months rather than decades. The total interest cost on a 12% hard money loan held for 6 months is often less than the closing costs alone on a DSCR loan you plan to pay off quickly.'),

    h3('df84', 'When the Property Does Not Cash Flow'),
    p('df85', 'If a property\'s rental income does not cover the debt payment at a 1.0 DSCR or higher, you will not qualify for a standard DSCR loan. Some no-ratio programs exist, but they come with significant cost premiums. If you are buying in a high-appreciation market where rents lag property values, conventional financing or a portfolio lender with flexible underwriting may be better options. Buying a property that does not cash flow is a risky bet on appreciation — make sure you can absorb the negative cash flow from personal income.'),

    h3('df86', 'When You Are House Hacking'),
    p('df87', 'DSCR loans are for investment properties, not primary residences. If you plan to live in one unit of a multi-family property, FHA loans (3.5% down), VA loans (0% down for veterans), or conventional owner-occupied loans will give you dramatically better rates and lower down payments. House hacking with owner-occupied financing is still the single best strategy for a first-time investor.'),

    // ── Section 8: How to Shop DSCR Lenders ───────────
    h2('df88', 'How to Shop DSCR Lenders: Getting the Best Deal'),
    p('df89', 'The DSCR lending market is competitive, and rates, fees, and terms vary significantly between lenders. Shopping aggressively can save you thousands of dollars on a single loan. Here is how to approach the process.'),

    h3('df90', 'Get at Least Three Quotes'),
    p('df91', 'Never accept the first quote you receive. Get rate sheets from at least three DSCR lenders, ideally including both national lenders (companies like Kiavi, Lima One, Visio, and Angel Oak) and local or regional lenders who may offer competitive pricing for their market. Make sure you are comparing apples to apples: same loan amount, same LTV, same credit score tier.'),

    h3('df92', 'Compare Origination Fees and Closing Costs'),
    p('df93', 'Interest rate is not the only cost. Origination fees (measured in "points" — each point is 1% of the loan amount) can range from 0.5 to 3 points depending on the lender. On a $250,000 loan, the difference between 1 point and 2.5 points is $3,750 in upfront cost. Some lenders offer lower rates with higher points, or higher rates with lower points. Calculate the break-even point: if a lower rate saves you $100 per month but costs $3,000 more in points, the break-even is 30 months. If you plan to hold the property for five-plus years, paying more points for a lower rate makes sense.'),

    h3('df94', 'Understand Prepayment Penalties'),
    p('df95', 'Many DSCR loans include prepayment penalties — a fee charged if you pay off the loan within a specified period (typically 3 to 5 years). Common structures include a flat percentage (3% of the balance if paid off in year one, 2% in year two, 1% in year three) or a yield maintenance formula. If you plan to refinance, sell, or execute a BRRRR strategy with a short hold period, prepayment penalties can be a deal-killer. Some lenders offer no-prepayment-penalty options at a slightly higher rate — this flexibility is often worth the premium.'),

    h3('df96', 'Ask About Interest-Only Options'),
    pLinks('df97', [
      'Interest-only DSCR loans allow you to pay only the interest portion for an initial period (typically 5 to 10 years), with the full principal-and-interest payment kicking in afterward. This maximizes cash flow during the interest-only period and improves your DSCR ratio since the monthly payment is lower. The trade-off is that you are not building equity through ',
      ['/glossary/amortization', 'amortization'],
      ' during the interest-only period. For investors focused on cash flow and scaling, interest-only can be a powerful tool. For those planning to hold long-term and build equity, a fully amortizing loan is usually better.',
    ]),

    h3('df98', 'Check Rate Lock Policies'),
    p('df99', 'In a rising rate environment, locking your rate early protects you from increases between application and closing. Ask each lender about their rate lock period (30, 45, or 60 days is common), the cost of a rate lock extension, and whether you can float down if rates drop before closing. Some lenders lock at application, others at commitment — know the policy before you submit your application.'),

    // ── Section 9: DSCR Calculator ────────────────────
    h2('df100', 'Calculate Your DSCR Before You Buy'),
    pLinks('df101', [
      'Running the numbers before making an offer is non-negotiable. Use our ',
      ['/calculators/mortgage', 'mortgage calculator'],
      ' to model different financing scenarios — adjust your down payment, interest rate, and loan term to see how each variable affects your monthly payment and DSCR ratio.',
    ]),
    pLinks('df102', [
      'For a comprehensive deal analysis, our ',
      ['/calculators/rental-cashflow', 'rental cash flow calculator'],
      ' lets you input all income and expense assumptions to calculate NOI, cash flow, ',
      ['/calculators/cash-on-cash', 'cash-on-cash return'],
      ', and DSCR in one place. Our ',
      ['/calculators/brrrr', 'BRRRR calculator'],
      ' models the full Buy-Rehab-Rent-Refinance cycle to project your capital recovery and returns.',
    ]),
    p('df103', 'The most expensive mistake in real estate investing is buying a property that does not perform. Five minutes with a calculator can save you five years of negative cash flow. Run the numbers on every deal, every time, without exception.'),

    // ── Conclusion ────────────────────────────────────
    h2('df104', 'Choosing the Right Financing for Your Next Investment'),
    p('df105', 'There is no single best loan for every investor. The right financing depends on where you are in your investing journey, your personal financial profile, your investment strategy, and the specific deal in front of you.'),
    pLinks('df106', [
      'If you are just starting and have strong W-2 income, conventional loans offer the best rates and should be your first choice for properties one through ten. As you approach the ten-property limit or if your tax situation makes conventional qualification difficult, DSCR loans become the clear path forward. For value-add strategies like ',
      ['/blog/brrrr-method-complete-guide', 'BRRRR'],
      ', a combination of ',
      ['/glossary/hard-money-loan', 'hard money'],
      ' for acquisition and DSCR for permanent financing is the proven playbook.',
    ]),
    pLinks('df107', [
      'The investors who build the largest portfolios are the ones who master financing. They understand every loan product, shop aggressively, and match the right loan to the right deal. They use conventional rates when they can get them, DSCR flexibility when they need it, hard money speed when it matters, and portfolio relationships when nothing else fits. Start learning your financing options now — before you need them. Explore our ',
      ['/blog/rental-property-investing-complete-guide', 'complete rental property investing guide'],
      ' for the full picture of building a wealth-generating portfolio.',
    ]),
  ],
}

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 3a Content Seed: DSCR & Investor Financing Guide\n')

  // Look up author by name
  const author = await client.fetch(
    `*[_type == "author" && name == $name][0]{ _id }`,
    { name: 'Bill Rice' }
  )
  if (!author) {
    console.error('Author "Bill Rice" not found in Sanity. Create the author first.')
    process.exit(1)
  }
  console.log(`  Author: Bill Rice (${author._id})`)
  dscrFinancingGuide.author = { _type: 'reference', _ref: author._id }

  // Look up Financing category by title
  const financingCat = await client.fetch(
    `*[_type == "category" && title == $title][0]{ _id }`,
    { title: 'Financing' }
  )
  if (!financingCat) {
    console.error('Category "Financing" not found in Sanity. Create the category first.')
    process.exit(1)
  }
  console.log(`  Category: Financing (${financingCat._id})`)
  dscrFinancingGuide.categories = [
    { _type: 'reference', _ref: financingCat._id, _key: 'c1' },
  ]

  // Check for existing post by slug
  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id, slug }`,
    { slug: dscrFinancingGuide.slug.current }
  )

  if (existing) {
    console.log(`\n  Post already exists: "${dscrFinancingGuide.title}" — skipping.`)
    return
  }

  console.log(`\n  + ${dscrFinancingGuide.title}`)
  console.log('  Committing...')
  const result = await client.create(dscrFinancingGuide)
  console.log(`  Done! Created document: ${result._id}`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
