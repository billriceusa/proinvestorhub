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

// ── Look up author by name ──────────────────────────
const authorDoc = await client.fetch(`*[_type == "author" && name == "Bill Rice"][0]{ _id }`)
if (!authorDoc) {
  console.error('Author "Bill Rice" not found in Sanity.')
  process.exit(1)
}
const authorRef = { _type: 'reference', _ref: authorDoc._id }

// ── Look up categories by title ─────────────────────
async function getCategoryRef(title) {
  const cat = await client.fetch(`*[_type == "category" && title == $title][0]{ _id }`, { title })
  if (!cat) {
    console.error(`Category "${title}" not found in Sanity.`)
    process.exit(1)
  }
  return { _type: 'reference', _ref: cat._id }
}

const catTax = await getCategoryRef('Tax & Legal')
const catAnalysis = await getCategoryRef('Deal Analysis')

// ── Helper: Portable Text block builders ─────────────
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
 * Build a paragraph with inline links.
 * segments: array of { text } or { text, href }
 */
function pLinked(key, segments) {
  const children = []
  const markDefs = []
  segments.forEach((seg, i) => {
    const spanKey = `${key}s${i}`
    if (seg.href) {
      const markKey = `${key}m${i}`
      markDefs.push({ _key: markKey, _type: 'link', href: seg.href })
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [markKey] })
    } else {
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [] })
    }
  })
  return { _type: 'block', _key: key, style: 'normal', markDefs, children }
}

// ══════════════════════════════════════════════════════
// POST 1: Real Estate Depreciation
// ══════════════════════════════════════════════════════
const depreciation = {
  _type: 'post',
  title: 'Real Estate Depreciation: The Tax Benefit Every Investor Should Know',
  slug: { _type: 'slug', current: 'real-estate-depreciation-tax-benefit' },
  author: authorRef,
  categories: [
    { ...catTax, _key: 'c1' },
  ],
  publishedAt: '2026-03-20T10:00:00Z',
  excerpt: 'How real estate depreciation, bonus depreciation, and cost segregation can save investors tens of thousands annually — updated for 2026 tax law.',
  seo: {
    metaTitle: 'Real Estate Depreciation Tax Benefits 2026 | ProInvestorHub',
    metaDescription: 'Learn how rental property depreciation, 100% bonus depreciation, and cost segregation studies can dramatically reduce your tax bill. Updated for 2026.',
  },
  body: [
    // Introduction
    p('dp01', 'If you own rental property, depreciation is the single most powerful tax benefit in your arsenal. It allows you to deduct the cost of your building over time as a paper loss — reducing your taxable rental income even when your property is actually going up in value. For many investors, depreciation is the difference between owing thousands in taxes and owing nothing at all.'),
    p('dp02', 'But depreciation goes far beyond the standard annual deduction. With bonus depreciation permanently restored to 100% under the One Big Beautiful Bill Act and cost segregation studies becoming accessible to smaller investors, the opportunities for 2026 and beyond are extraordinary. This guide breaks down exactly how depreciation works, what changed in 2026, and how to maximize every dollar of deductions legally available to you.'),
    pLinked('dp03', [
      { text: 'If you are new to real estate tax strategy, start with our ' },
      { text: 'comprehensive tax strategies guide', href: '/blog/real-estate-tax-strategies-guide' },
      { text: ' for the full picture. This article goes deep on depreciation specifically — the mechanics, the math, and the strategies that separate sophisticated investors from everyone else.' },
    ]),

    // Section 1: How Depreciation Works
    h2('dp04', 'How Depreciation Works: The 27.5-Year Residential Schedule'),
    p('dp05', 'The IRS considers residential rental buildings to have a useful life of 27.5 years. This means you can deduct 1/27.5 (approximately 3.636%) of the building\'s depreciable cost basis every year for 27.5 years. Commercial properties use a 39-year schedule. Land is never depreciable — only the building and its improvements.'),

    h3('dp06', 'Calculating Your Depreciable Cost Basis'),
    p('dp07', 'Your cost basis is not simply the purchase price. It includes the purchase price plus certain closing costs (title insurance, recording fees, transfer taxes, attorney fees related to the purchase) minus the value of the land. The land value is typically determined by the county tax assessment ratio, an appraisal, or a reasonable estimate based on comparable vacant lots.'),
    p('dp08', 'Here is the formula: Depreciable Cost Basis = Purchase Price + Eligible Closing Costs − Land Value.'),
    p('dp09', 'Example: You purchase a rental property for $350,000. Closing costs that can be added to basis total $6,000. The county assessment allocates 20% to land. Land value = $350,000 × 20% = $70,000. Depreciable cost basis = $350,000 + $6,000 − $70,000 = $286,000.'),

    h3('dp10', 'The Straight-Line Depreciation Formula'),
    p('dp11', 'Annual depreciation = Depreciable cost basis ÷ 27.5. Using our example: $286,000 ÷ 27.5 = $10,400 per year. That is $10,400 you can deduct from your rental income every year for 27.5 years — a total of $286,000 in deductions over the life of the property. If your rental property generates $18,000 in net rental income before depreciation, your taxable rental income drops to just $7,600.'),
    p('dp12', 'In the first year, depreciation is prorated based on the month you place the property in service. The IRS uses a mid-month convention, meaning you get half a month of depreciation for the month you close. A property placed in service in March gets 9.5 months of depreciation in year one.'),

    bq('dp13', 'Key point: Depreciation is a non-cash deduction. You are not spending any money — it is a paper loss that reduces your tax bill while your property can simultaneously be appreciating in real value.'),

    // Section 2: Bonus Depreciation in 2026
    h2('dp14', 'Bonus Depreciation in 2026: The One Big Beautiful Bill Act'),
    p('dp15', 'Bonus depreciation allows you to deduct a large percentage of certain property components in the first year, rather than spreading the deduction over their normal depreciation schedule. Under the Tax Cuts and Jobs Act of 2017, bonus depreciation was set at 100% but began phasing down: 80% in 2023, 60% in 2024, 40% in 2025, and 20% in 2026 before disappearing entirely.'),
    p('dp16', 'The One Big Beautiful Bill Act changed everything. Signed into law in 2025, it permanently restored 100% bonus depreciation for qualifying property placed in service after January 19, 2025. This is the most significant depreciation update in years, and it is the big 2026 development that most competing guides have not yet covered.'),

    h3('dp17', 'What Qualifies for 100% Bonus Depreciation'),
    p('dp18', 'Bonus depreciation applies to tangible personal property with a recovery period of 20 years or less. In a rental property context, this includes 5-year property (appliances, carpeting, certain fixtures), 7-year property (office furniture, security systems), and 15-year property (land improvements such as fencing, parking lots, landscaping, sidewalks). Critically, the building structure itself — the 27.5-year residential property — does not qualify for bonus depreciation. You still depreciate the building on the standard straight-line schedule.'),
    p('dp19', 'This is where cost segregation becomes essential. Without a cost segregation study, you are depreciating the entire building over 27.5 years. With one, an engineer identifies all the components that qualify as 5-, 7-, or 15-year property, and you can take 100% bonus depreciation on those components in year one. The impact on your tax bill can be massive.'),

    h3('dp20', 'What This Means for Investors in 2026'),
    p('dp21', 'If you purchased a rental property in 2024 or early 2025 before January 20, you were limited to reduced bonus depreciation rates. Properties placed in service after January 19, 2025 qualify for the full 100%. If you are acquiring property in 2026, you have the maximum benefit available. For investors who were waiting for bonus depreciation to phase out before making moves, the permanent restoration changes the calculus entirely — the tax advantage of accelerated depreciation is here to stay.'),

    // Section 3: Cost Segregation Studies
    h2('dp22', 'Cost Segregation Studies: Accelerating Depreciation Legally'),
    pLinked('dp23', [
      { text: 'A ' },
      { text: 'cost segregation study', href: '/glossary/cost-segregation' },
      { text: ' is an engineering-based analysis that identifies building components which can be reclassified from 27.5-year property into shorter depreciation categories (5, 7, or 15 years). Typically, a cost segregation study reclassifies 20-40% of a building\'s cost basis into these accelerated categories, with 30% being a common benchmark for residential rental properties.' },
    ]),

    h3('dp24', 'How a Cost Segregation Study Works'),
    p('dp25', 'A qualified engineer or cost segregation firm inspects your property (or reviews construction documents for new builds) and identifies every component that qualifies for accelerated depreciation. Electrical systems serving specific equipment, decorative lighting, certain flooring, cabinetry, appliances, landscaping, parking areas, and dozens of other items can be reclassified. The firm produces a detailed report that your CPA uses to file amended returns or apply to current-year taxes.'),
    p('dp26', 'Study costs vary based on property size and complexity. For a typical single-family rental or small multifamily, expect $2,800 to $5,000. For larger commercial or apartment properties, costs range from $5,000 to $10,000 or more. The key question is always ROI — and for most properties worth $300,000 or more, the return on a cost segregation study is extraordinary.'),

    h3('dp27', 'Cost Segregation ROI Example'),
    p('dp28', 'Consider a $500,000 rental property with a depreciable basis of $400,000 (after subtracting $100,000 for land). Without cost segregation, your annual depreciation is $400,000 ÷ 27.5 = $14,545. With a cost segregation study that reclassifies 30% of the basis:'),
    p('dp29', 'Reclassified amount: $400,000 × 30% = $120,000. With 100% bonus depreciation, you deduct the full $120,000 in year one. Remaining basis of $280,000 continues on the 27.5-year schedule at $10,182 per year. Total year-one depreciation: $120,000 + $10,182 = $130,182.'),
    p('dp30', 'At the 37% federal tax bracket, that $130,182 deduction saves $48,167 in federal taxes in year one alone. Compare that to $14,545 × 37% = $5,382 without cost segregation. The cost segregation study cost you $4,000 and saved you an additional $42,785 in year one. That is a roughly 10:1 return on investment.'),

    bq('dp31', 'Rule of thumb: If your rental property has a depreciable basis of $250,000 or more, a cost segregation study almost certainly pays for itself many times over — especially with 100% bonus depreciation restored.'),

    // Section 4: Depreciation Recapture
    h2('dp32', 'Depreciation Recapture: What Happens When You Sell'),
    pLinked('dp33', [
      { text: 'There is no free lunch in tax law, and ' },
      { text: 'depreciation', href: '/glossary/depreciation' },
      { text: ' is no exception. When you sell a property, the IRS "recaptures" all the depreciation you have taken (or could have taken, whether you claimed it or not) and taxes it at a special 25% rate. This is separate from and in addition to any capital gains tax on the appreciation.' },
    ]),

    h3('dp34', 'Calculating Depreciation Recapture'),
    p('dp35', 'Suppose you bought a property for $500,000 with a $400,000 depreciable basis. Over seven years of ownership, you took $101,818 in depreciation ($14,545 × 7). Your adjusted basis is now $398,182 ($500,000 − $101,818). You sell for $600,000.'),
    p('dp36', 'Your total gain is $201,818 ($600,000 − $398,182). This breaks into two components: capital appreciation of $100,000 ($600,000 − $500,000 purchase price), taxed at long-term capital gains rates (0%, 15%, or 20% depending on income), and depreciation recapture of $101,818, taxed at 25%. If you are in the 20% capital gains bracket, your tax bill is: $100,000 × 20% = $20,000 plus $101,818 × 25% = $25,455. Total: $45,455.'),

    h3('dp37', 'How 1031 Exchanges Defer Recapture'),
    pLinked('dp38', [
      { text: 'A ' },
      { text: '1031 exchange', href: '/blog/1031-exchange-rules-complete-guide' },
      { text: ' allows you to sell a property and reinvest the proceeds into a like-kind replacement property, deferring all capital gains and depreciation recapture taxes indefinitely. The deferred depreciation recapture carries forward to the replacement property — but if you continue exchanging throughout your lifetime, the ' },
      { text: '1031 exchange', href: '/glossary/1031-exchange' },
      { text: ' "swap till you drop" strategy means your heirs receive a stepped-up basis at your death, effectively eliminating the recapture permanently.' },
    ]),
    p('dp39', 'This is why depreciation recapture should not scare you away from claiming every dollar of depreciation available. The recapture tax rate of 25% is lower than the top income tax rate of 37%, and with 1031 exchanges, you may never pay it at all. The math strongly favors taking the deduction now and dealing with recapture later — or never.'),

    // Section 5: Real Estate Professional Status
    h2('dp40', 'Real Estate Professional Status: Unlocking Passive Loss Deductions'),
    p('dp41', 'By default, the IRS classifies rental income as passive income, which means rental losses (including depreciation) can only offset other passive income. If you have a W-2 job earning $300,000 and your rental properties generate $50,000 in depreciation losses, those losses are suspended — they cannot reduce your W-2 taxes. They carry forward and can be used when you sell or when you have passive income to offset.'),
    p('dp42', 'Real Estate Professional Status (REPS) changes this entirely. If you qualify, your rental losses become non-passive and can offset any type of income, including W-2 wages, business income, and investment income. For high-income investors, REPS combined with cost segregation and bonus depreciation can reduce taxable income by hundreds of thousands of dollars.'),

    h3('dp43', 'Qualification Requirements'),
    p('dp44', 'To qualify for REPS, you must meet two tests. First, you must spend more than 750 hours during the tax year in real property trades or businesses in which you materially participate. Second, more than half of your total working hours for the year must be in real property trades or businesses. Both spouses\' hours cannot be combined — one spouse must independently meet both tests.'),
    p('dp45', 'Real property trades or businesses include development, redevelopment, construction, reconstruction, acquisition, conversion, rental, operation, management, and brokerage. Property management, dealing with tenants, maintenance oversight, bookkeeping for rentals, and searching for new properties all count. You must also materially participate in each rental activity — which is easiest if you elect to aggregate all rental activities into a single activity on your tax return.'),

    h3('dp46', 'Common Audit Triggers'),
    p('dp47', 'The IRS scrutinizes REPS claims closely, especially for taxpayers who also hold full-time W-2 jobs. If you work 2,000 hours at a day job, you need more than 2,000 hours in real estate to meet the more-than-half test — that is nearly impossible. REPS is most achievable for investors whose spouse manages the properties full-time, investors who have left W-2 employment, or full-time real estate professionals like agents and brokers. Keep detailed contemporaneous time logs — after-the-fact reconstructions are much weaker in an audit.'),

    p('dp48', 'Note: Even without REPS, there is a partial exception. If your modified adjusted gross income is below $100,000, you can deduct up to $25,000 in rental losses against non-passive income. This phases out between $100,000 and $150,000 MAGI.'),

    // Section 6: Worked Example
    h2('dp49', 'Worked Example: Standard Depreciation vs. Cost Segregation'),
    p('dp50', 'Let us compare two investors who each purchase a $400,000 duplex with a depreciable basis of $320,000 (land value of $80,000). Both are in the 32% federal tax bracket. Investor A uses standard straight-line depreciation. Investor B commissions a cost segregation study.'),

    h3('dp51', 'Investor A: Standard Depreciation'),
    p('dp52', 'Annual depreciation: $320,000 ÷ 27.5 = $11,636 per year. Annual tax savings: $11,636 × 32% = $3,724. Over five years, total depreciation: $58,182. Total tax savings: $18,618.'),

    h3('dp53', 'Investor B: Cost Segregation + Bonus Depreciation'),
    p('dp54', 'The cost segregation study reclassifies 32% of the basis ($102,400) into 5-, 7-, and 15-year property. With 100% bonus depreciation, all $102,400 is deducted in year one. Remaining basis: $217,600 on the 27.5-year schedule at $7,913 per year.'),
    p('dp55', 'Year one depreciation: $102,400 + $7,913 = $110,313. Year one tax savings: $110,313 × 32% = $35,300. Years two through five depreciation: $7,913 per year. Years two through five tax savings: $7,913 × 32% = $2,532 per year.'),
    p('dp56', 'Over five years, total depreciation: $110,313 + ($7,913 × 4) = $141,965. Total tax savings: $35,300 + ($2,532 × 4) = $45,428. Cost segregation study fee: $3,500. Net five-year tax savings advantage over Investor A: $45,428 − $18,618 − $3,500 = $23,310.'),

    bq('dp57', 'The time value of money makes Investor B\'s advantage even greater. Getting $35,300 in tax savings in year one versus spreading $18,618 evenly over five years means Investor B can reinvest that cash immediately — into another property, into renovations, or into the market.'),

    // Conclusion
    h2('dp58', 'Putting It All Together'),
    pLinked('dp59', [
      { text: 'Depreciation is not just a tax deduction — it is a wealth-building accelerator. Every rental property investor should understand the basics of straight-line depreciation, evaluate cost segregation for properties with a depreciable basis above $250,000, and consider how bonus depreciation (now permanently at 100%) can supercharge year-one deductions. Use our ' },
      { text: 'cash-on-cash calculator', href: '/calculators/cash-on-cash' },
      { text: ' and ' },
      { text: 'BRRRR calculator', href: '/calculators/brrrr' },
      { text: ' to model how depreciation affects your after-tax returns on specific deals.' },
    ]),
    pLinked('dp60', [
      { text: 'For a broader view of how depreciation fits into your overall ' },
      { text: 'real estate tax strategy', href: '/blog/real-estate-tax-strategies-guide' },
      { text: ', including 1031 exchanges, entity structuring, and passive loss rules, read our full tax strategies guide. And explore key terms like ' },
      { text: 'depreciation', href: '/glossary/depreciation' },
      { text: ', ' },
      { text: 'cost segregation', href: '/glossary/cost-segregation' },
      { text: ', and ' },
      { text: 'cost basis', href: '/glossary/cost-basis' },
      { text: ' in our investor glossary.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: How to Calculate NOI
// ══════════════════════════════════════════════════════
const noi = {
  _type: 'post',
  title: 'How to Calculate NOI: A Step-by-Step Guide for Real Estate Investors',
  slug: { _type: 'slug', current: 'how-to-calculate-noi' },
  author: authorRef,
  categories: [
    { ...catAnalysis, _key: 'c1' },
  ],
  publishedAt: '2026-03-24T10:00:00Z',
  excerpt: 'Net Operating Income is the single most important number in rental property analysis. Learn exactly how to calculate it with a real-world example.',
  seo: {
    metaTitle: 'How to Calculate NOI (Net Operating Income) | ProInvestorHub',
    metaDescription: 'Step-by-step guide to calculating Net Operating Income for rental properties. Includes formula, real-world example, common mistakes, and benchmarks by property type.',
  },
  body: [
    // Introduction
    p('no01', 'If there is one number every real estate investor must know how to calculate, it is Net Operating Income. NOI tells you how much money a property actually makes from operations before debt service and taxes. It is the foundation for calculating cap rates, determining property value, qualifying for commercial loans, and comparing investment opportunities. Get NOI wrong, and every other analysis built on top of it falls apart.'),
    pLinked('no02', [
      { text: 'Yet ' },
      { text: 'NOI', href: '/glossary/noi' },
      { text: ' is one of the most commonly miscalculated metrics in real estate. Investors routinely include expenses that do not belong (mortgage payments, capital expenditures) or exclude expenses that do (vacancy allowance, management fees). This guide walks through the formula step by step, shows you exactly what to include and exclude, and works a complete real-world example so you can calculate NOI accurately on any property.' },
    ]),

    // Section 1: The NOI Formula
    h2('no03', 'The NOI Formula'),
    p('no04', 'The formula for Net Operating Income is: Effective Gross Income minus Operating Expenses equals NOI. That is it — three components. But the devil is in the details of what goes into each one.'),

    h3('no05', 'Gross Potential Rent'),
    p('no06', 'Start with Gross Potential Rent (GPR) — the total annual rent the property would generate if every unit were occupied and every tenant paid in full for twelve months. For a duplex where each unit rents for $1,200 per month, GPR is $1,200 × 2 units × 12 months = $28,800.'),

    h3('no07', 'Other Income'),
    p('no08', 'Add any other income the property generates: laundry machine revenue, parking fees, pet rent, storage unit fees, application fees, or late fees. For our duplex example, assume $0 in other income to keep things simple. Gross Potential Income = GPR + Other Income = $28,800.'),

    h3('no09', 'Vacancy and Credit Loss'),
    pLinked('no10', [
      { text: 'No property runs at 100% occupancy forever. You need a ' },
      { text: 'vacancy allowance', href: '/glossary/vacancy-rate' },
      { text: ' to account for turnover, vacant periods between tenants, and the occasional tenant who does not pay. A standard vacancy allowance for residential rentals is 5-8% of gross potential income. Use actual vacancy data for the property if available, or local market vacancy rates as a guide.' },
    ]),
    p('no11', 'For our duplex: Vacancy allowance at 5% = $28,800 × 5% = $1,440. Effective Gross Income (EGI) = $28,800 − $1,440 = $27,360.'),

    bq('no12', 'Formula: Effective Gross Income = Gross Potential Income − Vacancy and Credit Loss'),

    // Section 2: What IS Included in Operating Expenses
    h2('no13', 'What IS Included in Operating Expenses'),
    pLinked('no14', [
      { text: '' },
      { text: 'Operating expenses', href: '/glossary/operating-expenses' },
      { text: ' are the recurring costs required to operate the property. These are the expenses you subtract from EGI to arrive at NOI. Every one of these should be included in your analysis:' },
    ]),

    p('no15', 'Property taxes: Your annual property tax bill. For our duplex, $3,000 per year. This is usually the single largest operating expense and is public record — verify it, do not guess.'),
    p('no16', 'Insurance: Landlord insurance covering the building, liability, and loss of rent. For our duplex, $1,800 per year. Get actual quotes — premiums vary significantly by location, property age, and coverage levels.'),
    p('no17', 'Property management: Whether you self-manage or hire a property manager, include this cost. Professional management typically runs 8-10% of collected rent. For our duplex at 10%: $27,360 × 10% = $2,736 per year. Even if you self-manage, include this expense — your time has value, and you may not always want to manage the property yourself.'),
    p('no18', 'Maintenance and repairs: Budget 5-10% of gross rent for ongoing maintenance — plumbing, electrical, HVAC servicing, painting, minor repairs, and general upkeep. For our duplex at 7.5%: $28,800 × 7.5% = $2,160. Newer properties can trend lower; older properties should budget higher.'),
    p('no19', 'Utilities (if landlord-paid): Water, sewer, trash, gas, or electric — include any utilities the landlord covers. In many small multifamily properties, the landlord pays water and trash. For our duplex, assume tenants pay all utilities: $0.'),
    p('no20', 'Landscaping and snow removal: If you pay for lawn care, landscaping, or snow removal, include it. For our duplex, assume this is included in the maintenance budget.'),
    p('no21', 'HOA fees: If the property is in a homeowners association, include the annual HOA dues. Not applicable for our duplex example.'),
    p('no22', 'Miscellaneous: Advertising for vacancies, legal fees, accounting, pest control, and other recurring costs. Budget $300-$500 per year for a small property. For our duplex: $500.'),

    // Section 3: What is NOT Included
    h2('no23', 'What is NOT Included in NOI'),
    p('no24', 'This is where most investors make mistakes. The following items are NOT operating expenses and must NOT be included in your NOI calculation:'),

    p('no25', 'Mortgage payments (principal and interest): Debt service is not an operating expense. NOI measures the property\'s operating performance independent of how it is financed. Two investors can own identical properties with very different mortgage payments — NOI should be the same for both. Mortgage payments come out below the NOI line when calculating cash flow.'),
    p('no26', 'Capital expenditure reserves (CapEx): Roof replacement, HVAC replacement, new windows, parking lot repaving — these are capital improvements, not operating expenses. While you should absolutely budget for CapEx (typically 5-10% of gross rent set aside monthly), it does not go into the NOI calculation. CapEx is accounted for separately in your cash flow analysis.'),
    p('no27', 'Depreciation: This is a tax deduction, not an actual operating expense. It does not involve any cash outflow and has no place in NOI.'),
    p('no28', 'Income taxes: Your personal income tax obligation depends on your tax situation, not the property\'s operations. Not part of NOI.'),
    p('no29', 'Principal paydown: This is a financing activity, not an operating expense. It increases your equity but does not affect NOI.'),

    bq('no30', 'The golden rule: If an expense would exist regardless of whether the property has a mortgage, include it in NOI. If it only exists because of financing or tax treatment, exclude it.'),

    // Section 4: Step-by-Step Example
    h2('no31', 'Step-by-Step Example: $250K Duplex'),
    p('no32', 'Let us work through a complete NOI calculation for a $250,000 duplex where each unit rents for $1,200 per month.'),

    h3('no33', 'Step 1: Calculate Gross Potential Income'),
    p('no34', 'Unit A rent: $1,200/month × 12 = $14,400. Unit B rent: $1,200/month × 12 = $14,400. Other income: $0. Gross Potential Income: $28,800.'),

    h3('no35', 'Step 2: Subtract Vacancy Allowance'),
    p('no36', 'Vacancy rate: 5%. Vacancy allowance: $28,800 × 5% = $1,440. Effective Gross Income: $28,800 − $1,440 = $27,360.'),

    h3('no37', 'Step 3: Calculate Operating Expenses'),
    p('no38', 'Property taxes: $3,000. Insurance: $1,800. Property management (10%): $2,736. Maintenance and repairs (7.5% of gross rent): $2,160. Miscellaneous: $500. Total Operating Expenses: $10,196.'),

    h3('no39', 'Step 4: Calculate NOI'),
    p('no40', 'NOI = Effective Gross Income − Total Operating Expenses. NOI = $27,360 − $10,196 = $17,164.'),

    p('no41', 'This duplex generates $17,164 per year in Net Operating Income — about $1,430 per month before debt service. That is the property\'s earning power from operations alone.'),

    // Section 5: NOI → Cap Rate → Valuation
    h2('no42', 'From NOI to Cap Rate to Property Valuation'),
    pLinked('no43', [
      { text: 'NOI is the numerator in the ' },
      { text: 'cap rate', href: '/glossary/cap-rate' },
      { text: ' formula, making it essential for property valuation — especially for commercial and multi-family properties valued on income rather than comparable sales.' },
    ]),

    h3('no44', 'The Cap Rate Formula'),
    p('no45', 'Cap Rate = NOI ÷ Property Value. For our duplex: $17,164 ÷ $250,000 = 6.87%. This tells you the property\'s unlevered yield — the return you would earn if you paid all cash.'),

    h3('no46', 'Reverse Engineering: What Should You Pay?'),
    pLinked('no47', [
      { text: 'The more powerful use of the cap rate formula is working backwards. If you know the NOI and your target cap rate, you can calculate what you should pay: Property Value = NOI ÷ Target Cap Rate. If you want a 7.5% cap rate: $17,164 ÷ 0.075 = $228,853. That means you should offer no more than about $229,000 for this property to achieve your target return. Use our ' },
      { text: 'cap rate calculator', href: '/calculators/cap-rate' },
      { text: ' to run these numbers quickly on any deal.' },
    ]),
    pLinked('no48', [
      { text: 'For a deeper comparison of how cap rate and cash-on-cash return measure different aspects of a deal, see our guide on ' },
      { text: 'cash-on-cash vs. cap rate', href: '/blog/cash-on-cash-vs-cap-rate' },
      { text: '.' },
    ]),

    // Section 6: NOI → DSCR
    h2('no49', 'From NOI to DSCR: Will the Property Qualify for Financing?'),
    p('no50', 'Lenders use the Debt Service Coverage Ratio (DSCR) to determine whether a property generates enough income to cover its mortgage payments. DSCR = NOI ÷ Annual Debt Service. Most lenders require a minimum DSCR of 1.20 to 1.25, meaning the property needs to earn 20-25% more than the mortgage payment.'),

    h3('no51', 'DSCR Calculation Example'),
    p('no52', 'Our duplex\'s NOI is $17,164. Assume a $200,000 loan at 7.5% interest on a 30-year amortization. Monthly payment: approximately $1,398. Annual debt service: $1,398 × 12 = $16,776. DSCR = $17,164 ÷ $16,776 = 1.02.'),
    p('no53', 'A DSCR of 1.02 means the property barely covers its debt service with just 2% cushion. Most lenders would decline this loan — they want at least 1.20. The property generates just $388 per year ($32/month) in cash flow after the mortgage, leaving almost no margin for unexpected expenses.'),

    h3('no54', 'How Small NOI Improvements Change Everything'),
    pLinked('no55', [
      { text: 'What if you could increase rents by just $100 per unit per month? Additional annual income: $100 × 2 units × 12 months = $2,400. After 5% vacancy: $2,280 net. After 10% management: $2,052 net addition to NOI. New NOI: $17,164 + $2,052 = $19,216. New DSCR: $19,216 ÷ $16,776 = 1.15. Still below 1.20, but much closer. An additional $50/unit gets you to about 1.20. This illustrates how sensitive DSCR is to small changes in NOI — and why accurate NOI calculation matters. Model different scenarios with our ' },
      { text: 'rental cashflow calculator', href: '/calculators/rental-cashflow' },
      { text: '.' },
    ]),

    // Section 7: NOI Benchmarks
    h2('no56', 'NOI Benchmarks: Expense Ratios by Property Type'),
    pLinked('no57', [
      { text: 'The expense ratio (Total Operating Expenses ÷ ' },
      { text: 'Effective Gross Income', href: '/glossary/effective-gross-income' },
      { text: ') tells you how efficiently a property operates. Lower is better — it means more of each rent dollar flows to NOI.' },
    ]),

    p('no58', 'Single-family rentals typically have expense ratios of 40-50%. The higher ratio reflects the lack of economies of scale — one vacancy is 100% vacancy, and per-unit management costs are higher. Small multifamily (2-4 units) usually runs 35-45%, benefiting from shared systems (one roof, one lot, one insurance policy) and reduced per-unit vacancy risk.'),
    p('no59', 'Large multifamily (5+ units) typically achieves 30-40% expense ratios thanks to economies of scale in management, maintenance, and vendor contracts. Well-run large apartment complexes can push below 35%. Commercial properties vary widely — triple-net leases can have expense ratios near 5-10% (the tenant pays almost everything), while gross-lease office buildings might run 45-55%.'),
    p('no60', 'If your property\'s expense ratio is significantly higher than these benchmarks, investigate where the overrun is coming from. Property taxes too high? Appeal the assessment. Insurance premiums elevated? Shop multiple carriers. Management fees excessive? Negotiate or switch managers. Bringing an inefficient property\'s expense ratio in line with benchmarks is one of the most straightforward ways to improve NOI — and therefore property value.'),

    // Conclusion
    h2('no61', 'Mastering NOI: Your Foundation for Better Deals'),
    pLinked('no62', [
      { text: 'NOI is not just a number — it is the lens through which professional investors evaluate every deal. It drives cap rate valuations, determines loan eligibility, and reveals whether a property truly cash flows or just looks good on the surface. Calculate it accurately, use realistic expense assumptions, and always verify inputs with actual data rather than pro forma projections from sellers. For a complete framework on evaluating rental properties beyond NOI, read our guide on ' },
      { text: 'how to analyze rental property', href: '/blog/how-to-analyze-rental-property' },
      { text: '. And use our ' },
      { text: 'cash-on-cash calculator', href: '/calculators/cash-on-cash' },
      { text: ' to see how NOI translates into your actual return on invested capital.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [depreciation, noi]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 3c Content Seed: 2 blog posts\n')

  // Check for existing posts by slug to avoid duplicates
  const slugs = posts.map((p) => p.slug.current)
  const existing = await client.fetch(
    `*[_type == "post" && slug.current in $slugs]{ slug }`,
    { slugs }
  )
  const existingSlugs = new Set(existing.map((d) => d.slug.current))

  if (existingSlugs.size > 0) {
    console.log('Found existing posts (will skip):')
    for (const slug of existingSlugs) {
      console.log(`  - ${slug}`)
    }
    console.log()
  }

  const newPosts = posts.filter((p) => !existingSlugs.has(p.slug.current))

  if (newPosts.length === 0) {
    console.log('All posts already exist. Nothing to seed.')
    return
  }

  const transaction = client.transaction()

  for (const post of newPosts) {
    console.log(`  + ${post.title}`)
    transaction.create(post)
  }

  console.log(`\nCommitting ${newPosts.length} posts...`)
  const result = await transaction.commit()
  console.log(`Done! Created ${result.results.length} documents.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
