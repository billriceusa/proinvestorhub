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

const authorRef = { _type: 'reference', _ref: 'author-bill-rice' }

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

// ══════════════════════════════════════════════════════
// PILLAR GUIDE 3: Rental Property Investing Guide
// ══════════════════════════════════════════════════════
const rentalGuide = {
  _type: 'post',
  title: 'Rental Property Investing: The Complete Guide to Building Passive Income',
  slug: { _type: 'slug', current: 'rental-property-investing-complete-guide' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-strategies', _key: 'c1' },
    { _type: 'reference', _ref: 'cat-analysis', _key: 'c2' },
  ],
  publishedAt: '2026-03-19T10:00:00Z',
  excerpt: 'Everything you need to know about buying, financing, and managing rental properties for long-term wealth building and passive income.',
  seo: {
    metaTitle: 'Rental Property Investing: Complete Guide to Passive Income (2026)',
    metaDescription: 'Learn how to invest in rental properties. Complete guide covering deal analysis, financing, property management, and building a cash-flowing portfolio.',
  },
  body: [
    // Introduction
    p('rp01', 'Rental property investing is the most proven path to building lasting wealth in America. More millionaires have been created through real estate than any other asset class, and rental properties are the foundation of nearly every real estate fortune. The reason is simple: rental properties generate income while you sleep, appreciate over time, offer extraordinary tax advantages, and allow you to use leverage to multiply your returns.'),
    p('rp02', 'But rental property investing is not a get-rich-quick scheme. It is a get-rich-for-certain strategy — if you approach it with discipline, education, and a long-term mindset. The investors who build portfolios of ten, twenty, or fifty rental properties did not get there by accident. They learned to analyze deals, secure financing, manage properties, and scale systematically.'),
    p('rp03', 'This guide covers everything you need to know to buy your first rental property or grow an existing portfolio. We will walk through the four wealth drivers that make rentals so powerful, how to analyze deals like a professional, financing strategies for every stage, and the systems you need to scale. Whether you are starting with one single-family home or eyeing your first apartment building, the principles here will serve you for decades.'),

    // The 4 Wealth Drivers
    h2('rp04', 'The Four Wealth Drivers of Rental Property Investing'),
    p('rp05', 'Rental properties build wealth through four distinct mechanisms that work simultaneously. No other investment offers all four at once, and understanding them is critical to appreciating why rental real estate is so powerful.'),

    h3('rp06', 'Wealth Driver 1: Cash Flow'),
    p('rp07', 'Cash flow is the money left over after you collect rent and pay all expenses — mortgage, taxes, insurance, maintenance, vacancy reserves, and property management. Positive cash flow means you are getting paid every month to own an appreciating asset. A well-purchased rental property in most markets should generate $100 to $300 per month in cash flow per unit after all expenses.'),
    p('rp08', 'Cash flow is the heartbeat of your portfolio. It covers your expenses during vacancies, funds repairs, and provides income you can live on or reinvest. Properties that do not cash flow are speculating on appreciation alone, which adds risk. Always buy for cash flow first and treat appreciation as a bonus.'),

    h3('rp09', 'Wealth Driver 2: Appreciation'),
    p('rp10', 'Appreciation is the increase in your property\'s value over time. There are two types: market appreciation (the natural increase driven by inflation, population growth, and demand) and forced appreciation (the increase you create through renovations, raising rents, or improving management). The national average for market appreciation is roughly 3-5% per year, but with leverage, your equity growth rate is much higher.'),
    p('rp11', 'Consider a $200,000 property you bought with $40,000 down. If it appreciates 4% in a year, the property gained $8,000 in value. But your $40,000 investment just returned 20% from appreciation alone — that is the magic of leverage. Forced appreciation is even more powerful because you control it. Adding a bedroom, finishing a basement, or improving curb appeal can add tens of thousands in value on a timeline you choose.'),

    h3('rp12', 'Wealth Driver 3: Tax Benefits'),
    p('rp13', 'The tax code heavily favors real estate investors. Depreciation allows you to deduct a portion of the property\'s value every year as a paper loss, even while the property is actually increasing in value. This phantom deduction shelters your rental income from taxes and can even offset your other income if you qualify as a real estate professional. Add in mortgage interest deductions, operating expense write-offs, cost segregation, and 1031 exchanges, and you have a tax-advantaged wealth building engine that no other investment class can match.'),

    h3('rp14', 'Wealth Driver 4: Mortgage Paydown'),
    p('rp15', 'Every month your tenant pays rent, a portion of that rent goes toward paying down your mortgage principal. Your tenant is literally buying the property for you. On a 30-year mortgage, this starts slowly but accelerates over time as more of each payment goes to principal rather than interest. By year fifteen, the principal paydown alone can represent thousands of dollars per year in equity building — paid for entirely by your tenant.'),

    bq('rp16', 'The Four Wealth Drivers: Cash Flow + Appreciation + Tax Benefits + Mortgage Paydown = Compounding Wealth'),

    // Types of Rental Properties
    h2('rp17', 'Types of Rental Properties'),
    p('rp18', 'Not all rental properties are created equal. Each type has its own risk profile, return characteristics, and management requirements. Understanding the differences will help you choose the right property type for your goals, capital, and experience level.'),

    h3('rp19', 'Single-Family Rentals (SFRs)'),
    p('rp20', 'Single-family homes are the most common entry point for new investors. They are easy to finance (conventional loans with as little as 3-5% down if you house hack), easy to manage, and easy to sell when the time comes. SFRs tend to attract longer-term tenants — often families — which means lower turnover and more stable cash flow. The downside is that vacancy hits hard: when your one unit is empty, you have zero income but still owe the full mortgage.'),
    p('rp21', 'SFRs are best for investors who want simplicity, are starting with limited capital, and plan to build a portfolio one property at a time. They also appreciate faster than multi-family in many markets because they are priced based on comparable sales rather than income.'),

    h3('rp22', 'Small Multi-Family (2-4 Units)'),
    p('rp23', 'Duplexes, triplexes, and fourplexes are the sweet spot for many investors. They still qualify for residential financing (FHA, conventional, VA), but they generate multiple income streams from a single property. If one unit is vacant in a fourplex, you still have three tenants covering most of your expenses. The house hack strategy — living in one unit while renting the others — works exceptionally well with small multi-family.'),
    p('rp24', 'A duplex or fourplex also forces you to learn property management skills on a small scale before scaling to larger buildings. The numbers tend to be better than SFRs on a per-unit basis, and the additional income streams provide a margin of safety against vacancy and unexpected expenses.'),

    h3('rp25', 'Large Multi-Family (5+ Units)'),
    p('rp26', 'Apartment buildings with five or more units are classified as commercial real estate, which means different financing (commercial loans, typically 20-25% down with shorter terms), different valuation methods (income-based rather than comparable sales), and different management requirements. The advantage is scale: managing fifty units is not fifty times harder than managing one. Systems, economies of scale, and professional management make large multi-family surprisingly efficient.'),
    p('rp27', 'Large multi-family is where you can truly force appreciation because the property value is directly tied to net operating income. Raising rents by $50 per unit across a 20-unit building adds $12,000 per year in NOI, which at a 6% cap rate increases the property value by $200,000. That kind of value creation is not possible with single-family homes.'),

    h3('rp28', 'Short-Term Rentals and Other Niches'),
    p('rp29', 'Short-term rentals (Airbnb, VRBO) can generate significantly higher income than long-term rentals in the right markets but come with higher operating costs, more management intensity, and regulatory risk. Other niches include student housing, vacation rentals, corporate housing, and rent-by-the-room strategies. Each has unique economics — evaluate them based on the same fundamentals of cash flow, risk, and management requirements.'),

    // How to Analyze a Rental Deal
    h2('rp30', 'How to Analyze a Rental Property Deal'),
    p('rp31', 'Deal analysis is the most important skill in rental property investing. A great deal bought at the wrong price becomes a bad deal. A mediocre property bought at the right price can be a home run. You need to understand the key metrics and know how to calculate them accurately before making any offer.'),

    h3('rp32', 'Net Operating Income (NOI)'),
    p('rp33', 'Net operating income is the property\'s annual income after all operating expenses but before debt service (mortgage payments). NOI equals gross rental income minus vacancy allowance minus all operating expenses (property taxes, insurance, maintenance, property management, utilities if owner-paid, reserves for capital expenditures). NOI is the foundation for every other metric.'),
    bq('rp34', 'NOI = Gross Rental Income - Vacancy Allowance - Operating Expenses'),
    p('rp35', 'Use realistic expense assumptions. A common mistake is underestimating expenses to make the numbers work. Budget 8-10% of gross rent for vacancy, 8-10% for maintenance and capital expenditures, and 8-10% for property management even if you plan to self-manage (because you might not want to forever). Taxes, insurance, and any HOA fees are what they are — get exact numbers, do not estimate.'),

    h3('rp36', 'Cap Rate (Capitalization Rate)'),
    p('rp37', 'The cap rate measures the property\'s return as if you paid all cash. It is calculated by dividing NOI by the purchase price. A property with $12,000 in annual NOI and a $200,000 purchase price has a 6% cap rate. Cap rates let you compare properties regardless of financing. Higher cap rates generally mean higher returns but also higher risk. In most markets, residential rental cap rates range from 4% to 10%.'),
    bq('rp38', 'Cap Rate = NOI / Purchase Price x 100'),

    h3('rp39', 'Cash-on-Cash Return (CoC)'),
    p('rp40', 'Cash-on-cash return measures the actual return on the cash you invest. It is annual pre-tax cash flow divided by total cash invested (down payment, closing costs, and any rehab). If you invest $50,000 in cash and the property generates $5,000 per year in cash flow after all expenses and debt service, your cash-on-cash return is 10%. This is the metric that tells you how hard your actual dollars are working.'),
    bq('rp41', 'Cash-on-Cash Return = Annual Cash Flow / Total Cash Invested x 100'),

    h3('rp42', 'Worked Example: Analyzing a Rental Deal'),
    p('rp43', 'Let us walk through a real deal analysis. You find a single-family rental listed at $180,000. Comparable rentals show it should rent for $1,600 per month, or $19,200 per year in gross rent. Here are your projected numbers:'),
    p('rp44', 'Vacancy allowance at 8%: $1,536. Property taxes: $2,400. Insurance: $1,200. Maintenance and capex reserves at 10%: $1,920. Property management at 8%: $1,536. Total operating expenses: $8,592. NOI: $19,200 minus $8,592 equals $10,608. Cap rate: $10,608 divided by $180,000 equals 5.9%.'),
    p('rp45', 'Now add financing. You put 20% down ($36,000) plus $5,000 in closing costs for $41,000 total cash invested. Your mortgage on $144,000 at 7% for 30 years is $958 per month or $11,496 per year. Annual cash flow: $10,608 NOI minus $11,496 debt service equals negative $888. This deal does not cash flow with 20% down at 7% rates.'),
    p('rp46', 'This is exactly why you run the numbers before getting emotionally attached to a property. You might negotiate the price down to $155,000, find a lower interest rate, or determine that rents will be higher than estimated. Or you might walk away and find a better deal. The numbers do not lie. Use our rental cash flow calculator at /calculators/rental-cashflow to run these scenarios quickly.'),

    // Financing Options
    h2('rp47', 'Financing Your Rental Properties'),
    p('rp48', 'Financing strategy is just as important as deal selection. The right loan product can turn a marginal deal into a great one, and the wrong financing can make a good deal unprofitable. Here are the primary financing options for rental property investors.'),

    h3('rp49', 'Conventional Loans'),
    p('rp50', 'Conventional investment property loans require 15-25% down, good credit (typically 680+), and proof of income. Rates are usually 0.5-1% higher than primary residence rates. You can have up to ten conventional investment property loans through Fannie Mae guidelines. These offer the best rates and terms for qualified borrowers but require full documentation of income and assets.'),

    h3('rp51', 'DSCR Loans'),
    p('rp52', 'Debt Service Coverage Ratio loans qualify you based on the property\'s income rather than your personal income. If the property\'s rental income covers the mortgage payment (typically at a 1.0 to 1.25 ratio), you can qualify regardless of your W-2 or tax returns. DSCR loans are ideal for self-employed investors, those with complex tax returns, or investors scaling beyond ten conventional loans. Rates run 1-2% higher than conventional, but the flexibility is worth it for many investors.'),

    h3('rp53', 'FHA House Hacking'),
    p('rp54', 'FHA loans allow you to buy a 2-4 unit property with just 3.5% down if you live in one unit. This is the single most powerful strategy for a first-time investor. You get owner-occupied rates (the lowest available), minimal down payment, and the other units pay most or all of your mortgage. After one year, you can move out and do it again. Many investors have built portfolios of four or five properties using the house hack strategy repeatedly.'),

    h3('rp55', 'Portfolio and Private Lending'),
    p('rp56', 'Local banks and credit unions often offer portfolio loans that they keep on their books rather than selling to Fannie Mae. These can be more flexible on qualification but may have shorter terms or balloon payments. Private lenders — individuals who lend their own money — offer the most flexibility but at the highest cost. Private money is best used for short-term bridge financing or when speed is essential, not for long-term holds.'),

    // Finding Deals
    h2('rp57', 'How to Find Rental Property Deals'),
    p('rp58', 'Finding great deals is the number one challenge rental property investors face. The best deals are almost never listed on the MLS for full retail. You need multiple deal-finding channels working simultaneously to maintain a consistent pipeline of opportunities.'),

    h3('rp59', 'The MLS and Online Listings'),
    p('rp60', 'While the best deals rarely come from the MLS, it is still a valuable tool. Look for listings that have been on the market for 60 or more days, price reductions, estate sales, and REO (bank-owned) properties. These often signal motivated sellers. Work with an investor-friendly agent who understands your criteria and can set up automated searches that hit your inbox daily.'),

    h3('rp61', 'Off-Market Strategies'),
    p('rp62', 'Off-market deals — properties that are not publicly listed — offer the least competition and the best prices. Direct mail campaigns targeting absentee owners, pre-foreclosure lists, and properties with code violations can yield deals at 20-30% below market value. Driving for dollars — literally driving neighborhoods looking for distressed properties — is free and surprisingly effective. Wholesalers who have already negotiated deals under contract can be a steady source of off-market opportunities. Build relationships with probate attorneys, divorce attorneys, and estate planners who encounter motivated sellers regularly.'),

    // Due Diligence
    h2('rp63', 'The Due Diligence Checklist'),
    p('rp64', 'Once you have a property under contract, due diligence is your last line of defense before committing your capital. Never skip any of these steps, no matter how good the deal looks on paper.'),
    p('rp65', 'Get a professional home inspection by an inspector experienced with investment properties. Order a title search and title insurance. Review property tax history and check for any pending assessments. Verify insurance costs with actual quotes. Walk the property with your contractor to refine rehab estimates. Check flood zone status and environmental concerns. Review HOA documents if applicable. Verify rent estimates with at least three comparable properties. Confirm zoning allows your intended use. Check for any open permits or code violations with the city.'),
    p('rp66', 'Due diligence costs money — inspections, appraisals, and your time. But these costs are a fraction of what a bad deal will cost you. Think of due diligence as cheap insurance. If something major surfaces, you can renegotiate the price, ask for repairs, or walk away. Your contract should always include inspection and financing contingencies that protect your right to exit.'),

    // Property Management
    h2('rp67', 'Property Management: Self-Manage vs. Hiring a PM'),
    p('rp68', 'Property management is where the theory of passive income meets reality. Rental property investing can be passive, but only if you set up the right systems or hire the right people. The management decision impacts your cash flow, your time, and ultimately whether you stay in the game long enough to build wealth.'),

    h3('rp69', 'Self-Managing Your Rentals'),
    p('rp70', 'Self-management saves you 8-12% of gross rent in management fees, which can be the difference between a property that cash flows and one that does not. For your first few properties, self-management also teaches you the business from the ground up. You will learn tenant screening, maintenance coordination, lease enforcement, and market dynamics firsthand — knowledge that makes you a better investor even if you later hire a manager.'),
    p('rp71', 'The key to successful self-management is systems. Use property management software like Avail, TenantCloud, or RentRedi for online rent collection, maintenance requests, and lease management. Create standardized processes for everything: tenant screening criteria, move-in and move-out procedures, maintenance response protocols, and lease renewal timelines. Systems turn a chaotic side hustle into a streamlined business.'),

    h3('rp72', 'Hiring a Property Manager'),
    p('rp73', 'A professional property management company handles everything: marketing vacant units, screening tenants, collecting rent, coordinating maintenance, handling evictions, and ensuring legal compliance. The cost is typically 8-12% of gross rent plus leasing fees (often 50-100% of one month\'s rent for new tenant placement). Interview at least three property managers, ask for references from other investors, and understand their fee structure completely before signing.'),
    p('rp74', 'The right time to hire a property manager is when the opportunity cost of your time exceeds the management fee, when you are scaling beyond what you can handle, when your properties are geographically distant, or when you simply want to be hands-off. Many investors self-manage their first three to five properties and then transition to professional management as they scale.'),

    // Scaling
    h2('rp75', 'Scaling from 1 to 10 Properties'),
    p('rp76', 'Building a portfolio is a marathon, not a sprint. Most successful investors acquire one to two properties per year in the early stages, accelerating as they build systems, capital, and lending relationships. Here is a realistic scaling roadmap.'),
    p('rp77', 'Properties one and two: House hack or buy a single-family rental. Learn the fundamentals of deal analysis, financing, and management firsthand. Make mistakes on a small scale while the stakes are low. Properties three through five: Refine your systems, build your team (lender, agent, contractor, property manager), and start exploring small multi-family. Begin using DSCR loans or portfolio loans as your conventional loan count grows. Properties six through ten: At this stage, you should have reliable deal flow, established lending relationships, and proven management systems. Consider larger multi-family, syndications, or expanding to new markets.'),
    p('rp78', 'The biggest bottleneck in scaling is usually capital. Strategies to overcome this include BRRRR (recycling your capital through value-add refinancing), partnerships (splitting equity and responsibilities), seller financing (creative deal structures that reduce upfront capital), and home equity lines of credit on properties you already own.'),

    // Common Mistakes
    h2('rp79', 'Common Rental Property Investing Mistakes'),
    p('rp80', 'Overestimating income and underestimating expenses is the number one mistake new investors make. Always use conservative numbers — if you are pleasantly surprised by actual performance, great. If not, you are still profitable. Skipping the inspection, not budgeting for vacancy and capital expenditures, overpaying because of emotional attachment, and trying to do everything yourself are all mistakes that have derailed promising investors.'),
    p('rp81', 'Other common mistakes include not screening tenants thoroughly, neglecting property maintenance which leads to expensive deferred repairs, failing to set up proper legal entity structure for asset protection, not having adequate insurance coverage, and trying to scale too fast before mastering the fundamentals. Real estate rewards patience and discipline. Get the first deal right before worrying about the tenth.'),

    // Tools
    h2('rp82', 'Tools and Calculators'),
    p('rp83', 'Successful rental property investing is a numbers game, and the right tools make all the difference. Use our free rental cash flow calculator at /calculators/rental-cashflow to analyze any deal in minutes — plug in the purchase price, rent, expenses, and financing terms to instantly see cash flow, cash-on-cash return, and cap rate. Our cap rate calculator at /calculators/cap-rate lets you quickly compare properties across different markets and asset classes.'),
    p('rp84', 'Beyond calculators, build your toolkit with property management software, a reliable CRM for tracking leads and deals, and a spreadsheet or app for tracking your portfolio performance over time. The investors who treat this like a business and track their numbers religiously are the ones who build lasting wealth.'),

    // Conclusion
    h2('rp85', 'Getting Started: Your Next Steps'),
    p('rp86', 'Rental property investing is not complicated, but it does require education, analysis, and action. Start by learning your local market — what do properties cost, what do they rent for, what are the cap rates? Run the numbers on ten properties before making an offer on one. Talk to local investors, agents, and lenders to build your network. Then take action on a deal that meets your criteria.'),
    p('rp87', 'The best time to buy rental property was ten years ago. The second best time is now. Every month you wait is a month of rent you are not collecting, a month of appreciation you are not capturing, and a month of mortgage paydown you are not benefiting from. Your future self will thank you for starting today.'),
  ],
}

// ══════════════════════════════════════════════════════
// PILLAR GUIDE 4: Real Estate Tax Strategies
// ══════════════════════════════════════════════════════
const taxGuide = {
  _type: 'post',
  title: 'Real Estate Tax Strategies: How Investors Legally Pay Less in Taxes',
  slug: { _type: 'slug', current: 'real-estate-tax-strategies-guide' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-tax', _key: 'c1' },
  ],
  publishedAt: '2026-03-19T12:00:00Z',
  excerpt: 'The tax code is the real estate investor\'s best friend. Here\'s how depreciation, 1031 exchanges, cost segregation, and RE professional status can dramatically reduce your tax bill.',
  seo: {
    metaTitle: 'Real Estate Tax Strategies: How to Pay Less in Taxes (2026 Guide)',
    metaDescription: 'Complete guide to real estate tax strategies. Learn about depreciation, 1031 exchanges, cost segregation, and how to legally minimize your tax burden.',
  },
  body: [
    // Introduction
    p('tx01', 'The United States tax code is the single greatest wealth-building tool available to real estate investors. That is not an exaggeration. The government actively incentivizes real estate investment through a web of deductions, deferrals, and exemptions that can reduce — and in many cases eliminate — your tax burden on rental income, capital gains, and even your W-2 earnings.'),
    p('tx02', 'Most people think of taxes as an unavoidable cost of earning money. Real estate investors know better. With the right strategies, you can earn hundreds of thousands of dollars in rental income and pay little to nothing in taxes — legally, ethically, and exactly as the tax code intends. The investors who understand these strategies build wealth dramatically faster than those who do not, because every dollar saved in taxes is a dollar that can be reinvested.'),
    p('tx03', 'This guide covers the major tax strategies available to real estate investors in 2026. We will walk through depreciation, cost segregation, bonus depreciation, 1031 exchanges, real estate professional status, passive activity rules, capital gains strategies, entity structures, and self-directed retirement accounts. By the end, you will have a comprehensive understanding of the tools at your disposal and a framework for working with your CPA to minimize your tax bill legally.'),

    // Why RE Is Tax Advantaged
    h2('tx04', 'Why Real Estate Is the Most Tax-Advantaged Investment'),
    p('tx05', 'The government wants people to invest in real estate because real estate provides housing, creates jobs, and drives economic activity. To encourage this investment, the tax code offers benefits that are simply not available for stocks, bonds, or business income. You can deduct depreciation on a building that is actually increasing in value. You can defer capital gains taxes indefinitely through 1031 exchanges. You can deduct mortgage interest, repairs, travel, and dozens of other expenses against your rental income.'),
    p('tx06', 'Consider a stock investor who earns $100,000 in dividends and pays roughly $23,800 in federal taxes (at the 23.8% qualified dividend rate). Now consider a real estate investor who earns $100,000 in net rental income but uses depreciation to show a paper loss of $20,000. That investor pays zero federal income tax on the rental income and may even use the loss to offset other income. Same economic result, vastly different tax outcome. This is not a loophole — it is exactly how Congress designed the system.'),

    // Depreciation
    h2('tx07', 'Depreciation: The Phantom Tax Deduction'),
    p('tx08', 'Depreciation is the cornerstone of real estate tax strategy. The IRS allows you to deduct the cost of a building over its useful life — 27.5 years for residential rental property and 39 years for commercial property. This deduction exists because the IRS assumes buildings wear out over time and lose value, even though well-maintained real estate typically appreciates. The result is a deduction for an expense you never actually pay — a phantom loss that reduces your taxable income.'),
    p('tx09', 'Here is how it works. You buy a rental property for $275,000. The land is worth $55,000 (land cannot be depreciated), so the depreciable basis is $220,000. Divided by 27.5 years, your annual depreciation deduction is $8,000. If the property generates $12,000 in net rental income before depreciation, your taxable rental income drops to just $4,000. You keep $12,000 in your pocket but only pay taxes on $4,000.'),
    bq('tx10', 'Annual Depreciation = (Purchase Price - Land Value) / 27.5 years'),
    p('tx11', 'Depreciation is not optional — the IRS requires you to take it whether you want to or not (they will recapture it when you sell regardless). When you eventually sell the property, the IRS recaptures the depreciation at a 25% rate. But if you hold long enough and use a 1031 exchange to defer the sale, you can avoid paying that recapture indefinitely. Many investors never pay depreciation recapture in their lifetime, passing the tax basis to their heirs who receive a stepped-up basis at death.'),

    // Cost Segregation
    h2('tx12', 'Cost Segregation: Accelerated Depreciation on Steroids'),
    p('tx13', 'Cost segregation is one of the most powerful and underutilized tax strategies in real estate. A standard depreciation schedule spreads deductions over 27.5 or 39 years. A cost segregation study reclassifies components of the building into shorter depreciation categories — 5, 7, and 15-year property — allowing you to front-load your deductions and get massive tax savings in the first few years of ownership.'),
    p('tx14', 'A cost segregation study is conducted by a qualified engineer or CPA firm that physically inspects the property and identifies components that qualify for accelerated depreciation. Carpet, appliances, cabinetry, and certain fixtures typically qualify as 5-year property. Fencing, landscaping, parking lots, and site improvements qualify as 15-year property. The remaining structural components stay on the 27.5 or 39-year schedule.'),
    p('tx15', 'The results can be dramatic. On a $500,000 residential rental property, a standard depreciation schedule gives you about $14,500 per year. A cost segregation study might reclassify $150,000 of components into shorter-life categories, generating $50,000 or more in first-year deductions. For high-income investors, this can save $15,000-$25,000 in taxes in year one alone.'),

    h3('tx16', 'When Cost Segregation Makes Sense'),
    p('tx17', 'Cost segregation studies typically cost $5,000 to $15,000, so they need to generate enough tax savings to justify the expense. As a general rule, cost segregation makes sense on properties valued at $500,000 or more, though it can be worthwhile on smaller properties for investors in high tax brackets. The return on investment for a cost segregation study is often 5:1 to 10:1 in first-year tax savings.'),

    // Bonus Depreciation
    h2('tx18', 'Bonus Depreciation: Current Rules and Phase-Down'),
    p('tx19', 'Bonus depreciation allows you to deduct a percentage of qualifying asset costs in the first year rather than spreading them over their useful life. Under the Tax Cuts and Jobs Act of 2017, 100% bonus depreciation was available through 2022. Since then, it has been phasing down: 80% in 2023, 60% in 2024, 40% in 2025, and 20% in 2026. Unless Congress extends it, bonus depreciation will be fully phased out after 2026.'),
    p('tx20', 'Bonus depreciation applies to the short-life components identified in a cost segregation study (5, 7, and 15-year property). At 20% in 2026, a cost segregation study that identifies $150,000 in short-life components generates $30,000 in first-year bonus depreciation deductions. While this is less dramatic than the 100% era, it still provides meaningful tax savings, especially when combined with standard first-year depreciation on the remaining amount.'),
    p('tx21', 'The strategic implication: if you are considering a large acquisition, the remaining bonus depreciation adds urgency. Every year of delay means less bonus depreciation available. Work with your CPA to model the tax impact of purchasing in 2026 versus waiting.'),

    // 1031 Exchanges
    h2('tx22', '1031 Exchanges: Deferring Capital Gains Indefinitely'),
    p('tx23', 'A 1031 exchange, named after Section 1031 of the Internal Revenue Code, allows you to sell an investment property and defer all capital gains taxes by reinvesting the proceeds into a like-kind replacement property. This is arguably the most powerful wealth-building tool in real estate because it lets you trade up to larger, better properties without ever paying taxes on the gains from previous properties.'),
    p('tx24', 'The rules are specific and must be followed precisely. You must use a qualified intermediary (QI) — a neutral third party who holds the sale proceeds. You cannot touch the money yourself at any point, or the exchange is disqualified. The replacement property must be of equal or greater value, and you must reinvest all of the net proceeds from the sale. Any cash you take out (called boot) is taxable.'),
    p('tx25', 'There are two critical deadlines. You must identify potential replacement properties within 45 days of selling and must close on the replacement property within 180 days. Miss either deadline, even by one day, and the entire exchange fails and the full capital gain becomes taxable. These deadlines are the most common reason 1031 exchanges fail.'),
    bq('tx26', '1031 Exchange Timeline: 45 days to identify replacement property, 180 days to close'),

    h3('tx27', 'How Much a 1031 Exchange Saves'),
    p('tx28', 'Consider an investor who bought a property for $200,000 ten years ago and sells it for $400,000. The $200,000 gain would be subject to federal long-term capital gains tax (15-20%), depreciation recapture tax (25% on approximately $72,000 of depreciation taken), state income taxes, and the 3.8% Net Investment Income Tax. Total tax bill: easily $60,000 to $80,000. A 1031 exchange defers all of it.'),
    p('tx29', 'Many investors use 1031 exchanges serially — exchanging from one property to the next throughout their investing career, deferring all gains. When they pass away, their heirs receive a stepped-up cost basis, effectively eliminating all the deferred gains permanently. This strategy, sometimes called "swap till you drop," is one of the most tax-efficient wealth transfer strategies that exists.'),

    // Real Estate Professional Status
    h2('tx30', 'Real Estate Professional Status: The Ultimate Tax Advantage'),
    p('tx31', 'Real estate professional status (REPS) is the holy grail of real estate tax strategy. Under normal rules, rental income is classified as passive income, and losses from rental properties can only offset other passive income (with a limited $25,000 allowance for active participants). REPS changes this entirely — it reclassifies your rental losses as non-passive, allowing them to offset any income, including W-2 wages, business income, and investment income.'),
    p('tx32', 'To qualify for REPS, you must meet two tests. First, you must spend more than 750 hours during the year in real property trades or businesses in which you materially participate. Second, more than half of your total working hours must be in real property trades or businesses. Both tests must be met. Activities that count include property management, maintenance, construction, acquisition, development, and leasing.'),
    p('tx33', 'The tax savings can be enormous. A married couple where one spouse qualifies as a real estate professional with $50,000 in depreciation losses from rental properties can use those losses to offset $50,000 of the other spouse\'s W-2 income, saving $15,000 to $20,000 in taxes. Combined with cost segregation, some real estate professionals generate six-figure paper losses that eliminate their entire tax bill.'),

    h3('tx34', 'Material Participation and Hour Tracking'),
    p('tx35', 'To use REPS status, you must also materially participate in each rental activity. The IRS provides seven tests for material participation, but the most common is spending more than 500 hours per year on the activity. Alternatively, you can elect to group all of your rental properties as a single activity, which makes the 500-hour threshold much easier to meet. This grouping election is made on your tax return and, once made, is generally irrevocable.'),
    p('tx36', 'Keep meticulous records of your hours. The IRS frequently audits REPS claims, and the burden of proof is on you. Use a dedicated time-tracking app or spreadsheet that records the date, hours, and activity performed. Contemporaneous records (logged at the time) carry far more weight than reconstructed records after the fact.'),

    // Passive Activity Rules
    h2('tx37', 'Passive Activity Rules and the $25,000 Allowance'),
    p('tx38', 'For investors who do not qualify as real estate professionals, passive activity rules limit how rental losses can be used. Rental losses are passive losses and can generally only offset passive income. However, there is an important exception: active participants in rental real estate can deduct up to $25,000 in rental losses against non-passive income.'),
    p('tx39', 'To be an active participant, you must own at least 10% of the property and be involved in management decisions (approving tenants, setting rent, approving expenditures). The $25,000 allowance begins to phase out when your modified adjusted gross income (MAGI) exceeds $100,000 and is fully eliminated at $150,000. For high-income investors, this allowance disappears entirely, making real estate professional status even more valuable.'),
    p('tx40', 'Passive losses that you cannot use in the current year are not lost — they are suspended and carried forward to future years. You can use them when you have passive income to offset, or they are fully released when you dispose of the property in a taxable sale.'),

    // Capital Gains
    h2('tx41', 'Capital Gains Strategies'),
    p('tx42', 'When you sell an investment property, you face two types of federal capital gains tax: long-term capital gains tax (0%, 15%, or 20% depending on your income) and depreciation recapture tax (25% on accumulated depreciation). If your modified adjusted gross income exceeds $250,000 (single) or $200,000 (married filing jointly), you also owe the 3.8% Net Investment Income Tax (NIIT) on the gain.'),
    p('tx43', 'The simplest strategy for managing capital gains is to hold properties for more than one year to qualify for long-term rates. Properties sold within a year are taxed as ordinary income, which can be 37% at the highest bracket — more than double the long-term rate. For fix-and-flip investors, this is a critical consideration. Holding a flip for 366 days instead of 330 days can save tens of thousands in taxes.'),
    p('tx44', 'Beyond holding period, the primary strategies for minimizing capital gains are 1031 exchanges (defer indefinitely), installment sales (spread the gain over multiple years), opportunity zone investments (potential exclusion of gains), and charitable giving strategies such as donating appreciated property or using a charitable remainder trust.'),

    // Entity Structure
    h2('tx45', 'Entity Structure for Real Estate Investors'),
    p('tx46', 'The right entity structure provides asset protection, tax efficiency, and operational flexibility. Most real estate investors use some combination of LLCs, S-corporations, and holding companies. However, the best structure depends on your specific situation — there is no one-size-fits-all answer.'),
    p('tx47', 'A single-member LLC is the most common structure for holding rental properties. It provides liability protection (separating your personal assets from the property) while maintaining pass-through taxation — the LLC\'s income and losses flow through to your personal tax return. Multi-member LLCs work well for partnerships. For investors with significant rental income, an S-corporation election can provide self-employment tax savings on management fees.'),
    p('tx48', 'A holding company structure — where a parent LLC owns individual LLCs for each property — adds another layer of protection. If a lawsuit arises on one property, the other properties in separate LLCs are protected. This is especially important as your portfolio grows. The cost of forming and maintaining multiple LLCs varies by state but is generally a worthwhile investment for portfolios of three or more properties.'),

    // Self-Directed IRA
    h2('tx49', 'Self-Directed IRA and Roth Strategies'),
    p('tx50', 'A self-directed IRA (SDIRA) allows you to invest retirement funds directly in real estate. A traditional SDIRA uses pre-tax dollars and grows tax-deferred — you pay taxes when you withdraw in retirement. A self-directed Roth IRA uses after-tax dollars, but all growth and withdrawals in retirement are tax-free. Buying rental property inside a Roth IRA means the cash flow and eventual sale proceeds are never taxed.'),
    p('tx51', 'The rules are strict. All expenses must be paid from the IRA, and all income must flow back into the IRA. You cannot provide sweat equity (doing repairs yourself), and you cannot buy from or sell to disqualified persons (yourself, family members, certain business associates). Violations result in the entire IRA being distributed and taxed. Despite the complexity, the Roth SDIRA strategy is extraordinarily powerful for long-term investors.'),
    p('tx52', 'A Roth conversion strategy — converting traditional IRA funds to a Roth and paying the tax now, then investing the Roth funds in real estate — can be particularly powerful for younger investors with decades of tax-free growth ahead. Work with a self-directed IRA custodian and a knowledgeable CPA to execute this strategy correctly.'),

    // Year-End Tax Planning Checklist
    h2('tx53', 'Year-End Tax Planning Checklist for Real Estate Investors'),
    p('tx54', 'The time to plan your tax strategy is not April 15 — it is throughout the year and especially in the fourth quarter. Here is your year-end checklist: Review your rental income and expense projections for the year. Calculate your expected depreciation deductions. Evaluate whether cost segregation makes sense on any properties acquired during the year. Determine if you qualify for real estate professional status and ensure your hour logs are complete.'),
    p('tx55', 'Additionally, consider whether to accelerate any deductible expenses into the current year — major repairs, prepaying insurance or property taxes, purchasing equipment or tools. Review any properties you plan to sell and model the tax impact of a 1031 exchange versus a taxable sale. Ensure your entity structure is optimized. Maximize contributions to retirement accounts, including self-directed IRAs. Finally, schedule a meeting with your CPA before year-end to review your strategy and make any final adjustments.'),

    // Disclaimer
    h2('tx56', 'Important Disclaimer'),
    p('tx57', 'This guide is for educational purposes only and does not constitute tax, legal, or financial advice. Tax laws are complex, change frequently, and vary by state. Your specific tax situation depends on numerous individual factors. Always consult with a qualified CPA or tax attorney before implementing any tax strategy. The strategies discussed here are legal and commonly used, but proper execution requires professional guidance tailored to your circumstances.'),
    p('tx58', 'That said, do not let the complexity discourage you. The tax advantages of real estate are real, significant, and available to every investor willing to learn the rules and work with competent advisors. The investors who take the time to understand and implement these strategies build wealth dramatically faster than those who simply file their returns and pay whatever the software says they owe.'),
  ],
}

// ══════════════════════════════════════════════════════
// CLUSTER POST 5: DSCR Loans Explained
// ══════════════════════════════════════════════════════
const dscrLoans = {
  _type: 'post',
  title: 'DSCR Loans Explained: How to Qualify Based on Rental Income, Not Your W-2',
  slug: { _type: 'slug', current: 'dscr-loans-explained' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-financing', _key: 'c1' },
  ],
  publishedAt: '2026-03-20T10:00:00Z',
  excerpt: 'DSCR loans let investors qualify based on the property\'s income, not personal income. Here\'s how they work, what they cost, and when they make sense.',
  seo: {
    metaTitle: 'DSCR Loans Explained: Qualify Without W-2 Income (2026 Guide)',
    metaDescription: 'Learn how DSCR loans work for real estate investors. Qualify based on rental income, not personal income. Rates, requirements, and when to use them.',
  },
  body: [
    // Introduction
    p('ds01', 'If you have ever been turned down for an investment property loan because your tax returns show too little income — even though your rental properties generate strong cash flow — you are not alone. Traditional lenders look at your personal income, debt-to-income ratio, and tax returns to qualify you. For self-employed investors, full-time landlords, and anyone who takes aggressive deductions, this creates an absurd catch-22: the better your tax strategy, the harder it is to qualify for your next loan.'),
    p('ds02', 'DSCR loans solve this problem entirely. A Debt Service Coverage Ratio loan qualifies you based on the property\'s ability to generate income, not your personal financial profile. If the property\'s rental income covers the monthly mortgage payment, you can qualify — regardless of your W-2, tax returns, or how many other properties you own. For serious investors looking to scale, DSCR loans are a game-changer.'),

    // What Is a DSCR Loan
    h2('ds03', 'What Is a DSCR Loan?'),
    p('ds04', 'A DSCR loan is a type of non-QM (non-qualified mortgage) loan designed specifically for real estate investors. Instead of verifying your personal income through tax returns, pay stubs, and W-2s, the lender evaluates whether the property\'s rental income is sufficient to cover the loan payments. The key metric is the Debt Service Coverage Ratio — the ratio of the property\'s gross rental income to its total debt obligations.'),
    bq('ds05', 'DSCR = Gross Monthly Rental Income / Total Monthly Debt Service (PITIA)'),
    p('ds06', 'PITIA stands for Principal, Interest, Taxes, Insurance, and Association dues (HOA). If a property rents for $2,000 per month and the total PITIA is $1,600, the DSCR is 1.25. A DSCR of 1.0 means the property breaks even — rental income exactly covers the payment. Most lenders require a minimum DSCR between 1.0 and 1.25, though some will go as low as 0.75 for strong borrowers (meaning the property does not fully cover its payments from rent).'),

    // How Qualification Works
    h2('ds07', 'How DSCR Loan Qualification Works'),
    p('ds08', 'The qualification process for a DSCR loan is dramatically simpler than a conventional loan. There is no income verification, no tax return review, and no calculation of your personal debt-to-income ratio. The lender focuses on three things: the property\'s income potential, your credit score, and your down payment.'),
    p('ds09', 'The lender will typically order a rent survey or appraisal with a rental analysis to determine the property\'s fair market rent. This is compared to the proposed monthly payment to calculate the DSCR. If you already have a lease in place, many lenders will use the actual lease amount. For properties with existing rental history, this is straightforward. For new purchases, the appraiser\'s rental estimate determines your qualification.'),
    p('ds10', 'Credit score requirements are generally 660 to 680 minimum, with better rates available at 720 and above. Down payment requirements typically range from 20% to 25%, though some lenders require more for lower DSCR ratios or lower credit scores. Reserves of 6-12 months of PITIA payments are commonly required. You will also need to provide proof of landlord experience (though some lenders waive this for higher down payments).'),

    // Rates and Terms
    h2('ds11', 'DSCR Loan Rates and Terms'),
    p('ds12', 'DSCR loan rates are typically 1% to 2.5% higher than conventional investment property rates. In the current market, expect rates in the 7.5% to 9.5% range depending on your credit score, down payment, DSCR ratio, and the lender. While this is more expensive than conventional financing, the trade-off is qualification flexibility and the ability to scale without income limitations.'),
    p('ds13', 'Standard terms include 30-year fixed-rate mortgages, though some lenders offer adjustable-rate options, interest-only periods, or 40-year terms. Loan amounts typically range from $100,000 to $2,000,000 or more. There are no limits on the number of DSCR loans you can have — this is one of their biggest advantages over conventional loans, which cap out at ten.'),

    h3('ds14', 'DSCR vs. Conventional: Side-by-Side Comparison'),
    p('ds15', 'Income verification: Conventional requires full documentation (tax returns, W-2s, pay stubs). DSCR requires none — qualification is based on property income only. Maximum loan count: Conventional allows up to ten investment property loans. DSCR has no limit. Down payment: Conventional requires 15-25%. DSCR requires 20-25%. Interest rate: Conventional typically 6.5-8%. DSCR typically 7.5-9.5%. Closing timeline: Conventional 30-45 days. DSCR 21-30 days (faster due to simpler documentation).'),

    // Who Are DSCR Loans For
    h2('ds16', 'Who DSCR Loans Are For'),
    p('ds17', 'DSCR loans are ideal for several types of investors. Self-employed individuals whose tax returns do not reflect their true earning power because of business deductions and write-offs. Full-time real estate investors who live off rental income and may not have traditional W-2 employment. Investors scaling beyond ten properties who have maxed out their conventional loan options. Foreign nationals who cannot provide U.S. income documentation. High-net-worth individuals who prefer not to disclose their complete financial picture.'),
    p('ds18', 'DSCR loans are not ideal for house hackers (you typically need to buy as an investment property, not a primary residence), investors buying properties with below-market rents that will not cover the payment, or borrowers who qualify easily for conventional loans — the higher rate is an unnecessary cost if you can get conventional financing.'),

    // Application Process
    h2('ds19', 'The DSCR Loan Application Process'),
    p('ds20', 'Applying for a DSCR loan is faster and requires less paperwork than a conventional loan. Here is what to expect: Step one, submit an application with basic information — property details, purchase price, estimated rental income, and your credit score range. Step two, the lender orders a property appraisal that includes a rental survey to verify market rent. Step three, you provide proof of down payment funds, property insurance, and any required reserves. Step four, the lender underwrites the deal based on the DSCR calculation, your credit score, and the property appraisal.'),
    p('ds21', 'The entire process typically takes 21 to 30 days from application to closing — faster than conventional loans because there is no income verification, employment verification, or debt-to-income calculation. Some lenders can close DSCR loans in as few as 14 days for experienced borrowers with clean files.'),

    // Pros and Cons
    h2('ds22', 'Pros and Cons of DSCR Loans'),
    h3('ds23', 'Advantages'),
    p('ds24', 'No income verification required — your tax returns and W-2s are irrelevant. No limit on the number of loans you can have. Faster closing times due to simplified documentation. Available to self-employed, foreign nationals, and investors who do not qualify conventionally. Can close in an LLC or entity name, which provides asset protection and simplifies portfolio management.'),

    h3('ds25', 'Disadvantages'),
    p('ds26', 'Higher interest rates compared to conventional loans — expect to pay 1-2.5% more. Larger down payment requirements, typically 20-25% minimum. Higher closing costs due to non-QM loan pricing. The property must support the debt — if rents are too low relative to the payment, you will not qualify. Prepayment penalties are common (3-5 year terms), which limits your ability to refinance or sell without penalty.'),

    // DSCR vs Conventional Decision
    h2('ds27', 'When to Use DSCR vs. Conventional Financing'),
    p('ds28', 'Use conventional financing when you can qualify based on your income and have fewer than ten investment property loans. The lower rates save thousands of dollars over the life of the loan. Switch to DSCR when you have maxed out conventional options, when your tax returns do not support conventional qualification, when you want to close faster, or when you want to close in an LLC name (most conventional lenders require personal ownership).'),
    p('ds29', 'Many investors use a hybrid strategy: conventional loans for their first several properties (to get the best rates) and then DSCR loans to continue scaling beyond the conventional limit. This maximizes your cost savings on early properties while preserving the ability to grow indefinitely.'),

    // Improving Your DSCR
    h2('ds30', 'How to Improve Your DSCR Ratio'),
    p('ds31', 'If a property\'s DSCR falls short of the lender\'s minimum, there are several strategies to improve it. Increase the down payment — a larger down payment reduces the loan amount and therefore the monthly payment, improving the DSCR. Negotiate a lower purchase price to reduce the loan amount. Find a lender with a lower interest rate. Add value to increase rental income — if the property has below-market rents, show the lender comparable rents and your plan to increase them after closing. Consider an interest-only loan option, which reduces the monthly payment by eliminating the principal portion.'),
    p('ds32', 'Use our mortgage calculator at /calculators/mortgage to model different scenarios. Plug in various down payments, interest rates, and rental income assumptions to see how each variable affects your DSCR. Even small changes can move a deal from unqualified to approved. The numbers always tell the story — run them before you write an offer.'),
  ],
}

// ══════════════════════════════════════════════════════
// CLUSTER POST 6: The 70% Rule for Flipping Houses
// ══════════════════════════════════════════════════════
const seventyPercentRule = {
  _type: 'post',
  title: 'The 70% Rule for Flipping Houses: How to Calculate Your Maximum Offer',
  slug: { _type: 'slug', current: '70-percent-rule-house-flipping' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-strategies', _key: 'c1' },
    { _type: 'reference', _ref: 'cat-analysis', _key: 'c2' },
  ],
  publishedAt: '2026-03-21T10:00:00Z',
  excerpt: 'The 70% rule is the most used formula in house flipping. Here\'s how to calculate your maximum allowable offer and when to adjust the formula.',
  seo: {
    metaTitle: 'The 70% Rule for Flipping Houses: Calculate Max Offer Price',
    metaDescription: 'Learn the 70% rule for house flipping. Calculate maximum offer price using ARV and rehab costs. Includes examples and when to adjust the formula.',
  },
  body: [
    // Introduction
    p('sr01', 'Every successful house flipper has a number — a maximum purchase price above which they will not buy, no matter how good the property looks or how excited they are about the deal. That number keeps you profitable when your gut says to stretch and your emotions say to keep bidding. For most flippers, that number comes from the 70% rule — the most widely used formula in the house flipping business.'),
    p('sr02', 'The 70% rule is simple, fast, and effective. It gives you a quick maximum allowable offer (MAO) that, if followed with discipline, ensures you have enough margin to cover your holding costs, selling costs, and profit. Ignore it, and you are gambling. Follow it, and you are running a business.'),

    // What Is the 70% Rule
    h2('sr03', 'What Is the 70% Rule?'),
    p('sr04', 'The 70% rule states that you should pay no more than 70% of a property\'s after-repair value (ARV) minus the estimated rehab costs. The ARV is what the property will be worth after all renovations are complete. The rehab cost is your total estimated renovation budget. The 30% margin that remains is designed to cover your holding costs, selling costs, and profit.'),
    bq('sr05', 'Maximum Offer Price = ARV x 70% - Rehab Costs'),
    p('sr06', 'The formula works because it builds in a predictable profit margin regardless of the property price point. Whether you are flipping a $150,000 starter home or a $500,000 suburban house, the math scales proportionally. The 30% cushion accounts for the expenses that eat into every flip\'s profit — and trust us, those expenses are higher than most new flippers expect.'),

    // Worked Example
    h2('sr07', 'Worked Example: Calculating Your Maximum Offer'),
    p('sr08', 'Let us walk through a real-world example. You find a distressed three-bedroom, two-bathroom ranch in a neighborhood where renovated homes sell for $250,000. Your contractor estimates the property needs $40,000 in renovation: new kitchen ($15,000), two updated bathrooms ($10,000), flooring throughout ($6,000), paint and fixtures ($4,000), and HVAC replacement ($5,000).'),
    p('sr09', 'Applying the 70% rule: $250,000 (ARV) x 70% = $175,000 minus $40,000 (rehab) = $135,000. Your maximum offer is $135,000. If the seller wants $160,000, you walk away. If you can negotiate to $130,000, you have a deal with extra cushion built in.'),
    p('sr10', 'Let us verify the profit margin. You buy at $135,000 and spend $40,000 on rehab, so you are all in at $175,000. You sell at $250,000. Selling costs at 8% (agent commissions plus closing costs): $20,000. Holding costs over four months (mortgage payments, taxes, insurance, utilities): $5,000. Your profit: $250,000 minus $175,000 minus $20,000 minus $5,000 = $50,000. That is a 28.6% return on your $175,000 investment in four months.'),

    // Why 70% and Not Another Number
    h2('sr11', 'Why 70% and Not 80% or 60%?'),
    p('sr12', 'The 70% figure exists because decades of house flipping experience have shown that the remaining 30% reliably covers the three categories of costs that come out of every deal. Selling costs typically run 8-10% of the sale price (real estate agent commissions, closing costs, transfer taxes, title insurance). Holding costs add 3-5% (mortgage payments, property taxes, insurance, utilities, and lawn care during renovation and the sales period). That leaves 15-19% for your profit.'),
    p('sr13', 'Seventy percent is the sweet spot that balances profitability with deal flow. If you use 60%, you will rarely find deals because your offers will be too low. If you use 80%, you will win more deals but your margins will be razor-thin, leaving no room for the inevitable surprises that every flip brings — the hidden water damage, the electrical panel that needs replacing, the two extra months it takes to sell.'),

    // What Is in the 30% Margin
    h2('sr14', 'What Is Actually in the 30% Margin?'),
    h3('sr15', 'Selling Costs (8-10%)'),
    p('sr16', 'Real estate agent commissions are typically 5-6% of the sale price (split between buyer\'s and seller\'s agents). Closing costs for the seller add another 1-2%, including title insurance, transfer taxes, recording fees, and attorney fees in states that require them. Staging costs, photography, and any buyer concessions (like paying for a home warranty or covering some closing costs) can add another 1%. On a $250,000 sale, total selling costs are typically $20,000 to $25,000.'),

    h3('sr17', 'Holding Costs (3-5%)'),
    p('sr18', 'Holding costs are the expenses you pay for every day you own the property. Hard money or private money loan payments (often 10-14% interest, interest-only) are the biggest line item. Property taxes are prorated daily. Insurance on a vacant renovation project costs more than standard homeowner\'s insurance. Utilities (electric, water, gas) must stay on during construction. Lawn care and snow removal keep the property looking maintained. On a $175,000 all-in deal, holding costs of $1,500 to $2,000 per month add up fast if your rehab or sales timeline extends.'),

    h3('sr19', 'Profit (15-19%)'),
    p('sr20', 'The remaining margin is your profit, and it needs to be meaningful to justify the risk. House flipping carries real risk — market downturns, cost overruns, extended hold times, and unexpected issues are part of the business. A minimum acceptable profit of $25,000 per flip is a reasonable threshold for most investors. Some experienced flippers target $40,000 to $50,000 minimum. If the 70% rule shows a projected profit below your minimum threshold, pass on the deal.'),

    // When to Use a Different Percentage
    h2('sr21', 'When to Use a Different Percentage'),
    p('sr22', 'The 70% rule is a guideline, not a law. Market conditions, property price point, and your experience level should all influence whether you adjust the percentage up or down.'),
    p('sr23', 'Use a lower percentage (60-65%) when the rehab is extensive and risky (structural issues, foundation work, fire damage), when the property is in a slow-moving market where homes sit for months, when you are new and cannot afford a mistake, or when the ARV is uncertain (limited comparable sales, unique property). The extra margin compensates for higher risk and uncertainty.'),
    p('sr24', 'Use a higher percentage (75-80%) when the property is in a hot market where renovated homes sell within days, when the rehab is cosmetic only (paint, flooring, fixtures), when the ARV is highly certain based on multiple recent comparable sales, or when you are experienced and have reliable contractors who deliver on time and on budget. In these scenarios, the lower risk justifies a thinner margin.'),

    // Common Mistakes
    h2('sr25', 'Common 70% Rule Mistakes'),
    p('sr26', 'The most common mistake is inflating the ARV to make the numbers work. Wishful thinking kills flips. Use the most conservative comparable sales, not the highest. If three comps sold for $240,000, $250,000, and $270,000, use $245,000 as your ARV — not $270,000. The second most common mistake is underestimating rehab costs. Always get a detailed contractor bid before making an offer, and add 10-15% contingency for surprises.'),
    p('sr27', 'Other mistakes include forgetting to factor in holding costs during the sales period (the property is finished but might take two to three months to sell), ignoring seasonal market patterns (listing in January is different from listing in May), not accounting for financing costs in the rehab budget, and emotional attachment — falling in love with a property and paying more than the formula dictates. The numbers do not care about your feelings. Follow them.'),

    // Advanced: Building Your Own Formula
    h2('sr28', 'Advanced: Building Your Own Deal Formula'),
    p('sr29', 'As you gain experience, you should develop your own deal formula that reflects your specific market, cost structure, and profit requirements. Start with the ARV and work backward, accounting for every cost explicitly rather than relying on a single percentage.'),
    p('sr30', 'Here is how to build your custom formula. Start with ARV (use conservative comps). Subtract selling costs (calculate precisely based on your market — commissions, closing costs, concessions). Subtract holding costs (calculate monthly and multiply by your expected hold time). Subtract your minimum required profit (your personal threshold). Subtract rehab costs (detailed contractor bid plus contingency). What remains is your maximum purchase price.'),
    bq('sr31', 'Custom MAO = ARV - Selling Costs - Holding Costs - Minimum Profit - Rehab Costs'),
    p('sr32', 'This approach is more work than the 70% rule, but it is more accurate for your specific situation. Use the 70% rule as a quick screening tool when you first see a property, then run your custom formula for a detailed analysis before making an offer. Use our free fix-flip calculator at /calculators/fix-flip to run both analyses in seconds.'),
  ],
}

// ══════════════════════════════════════════════════════
// CLUSTER POST 7: How to Find Off-Market Real Estate Deals
// ══════════════════════════════════════════════════════
const offMarketDeals = {
  _type: 'post',
  title: 'How to Find Off-Market Real Estate Deals: 7 Proven Strategies',
  slug: { _type: 'slug', current: 'how-to-find-off-market-deals' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-strategies', _key: 'c1' },
  ],
  publishedAt: '2026-03-22T10:00:00Z',
  excerpt: 'The best deals never hit the MLS. Here are 7 proven strategies for finding off-market properties before other investors see them.',
  seo: {
    metaTitle: 'How to Find Off-Market Real Estate Deals: 7 Proven Methods',
    metaDescription: 'Discover 7 proven strategies to find off-market real estate deals. Direct mail, driving for dollars, networking, and more ways to find deals before the MLS.',
  },
  body: [
    // Introduction
    p('om01', 'The biggest challenge in real estate investing is not analyzing deals, financing them, or managing properties. It is finding them. The best real estate deals — the ones with enough margin to guarantee a profit — almost never appear on the MLS. By the time a property is publicly listed, dozens of investors have already seen it, and the price reflects the competition. If you want to consistently buy below market value, you need to master the art of finding off-market deals.'),
    p('om02', 'An off-market deal is any transaction where the property is not publicly listed for sale. The seller might not even know they want to sell until you reach out. These deals offer less competition, more negotiating power, and typically better prices. The trade-off is that finding them requires proactive effort, consistent marketing, and relationship building. The investors who build reliable off-market deal pipelines have a permanent competitive advantage.'),

    // Why Off-Market
    h2('om03', 'Why Off-Market Deals Are Better'),
    p('om04', 'Off-market deals offer three fundamental advantages. First, less competition. When a property is on the MLS, every investor, wholesaler, and flipper in the market sees it. Multiple offers drive the price up and terms in the seller\'s favor. Off-market, you are often the only buyer at the table. Second, better prices. Sellers who are not on the MLS often have a reason — they want privacy, they need speed, or they are dealing with a difficult situation (probate, divorce, financial distress). These motivations translate to willingness to accept below-market offers. Third, relationship-based negotiation. Off-market deals are conversations, not bidding wars. You can structure creative terms — seller financing, extended closing timelines, subject-to deals — that are nearly impossible in competitive MLS transactions.'),

    // Strategy 1: Direct Mail
    h2('om05', 'Strategy 1: Direct Mail Campaigns'),
    p('om06', 'Direct mail is the workhorse of off-market deal finding. You send physical letters or postcards to targeted property owners — typically absentee landlords, owners of properties with code violations, estates, and properties with high equity. The response rate is low (typically 1-3%), but the deals that come through are often exactly what you are looking for: motivated sellers willing to negotiate.'),
    p('om07', 'The keys to effective direct mail are targeting and consistency. Build your mailing list from county tax records, filtering for absentee owners, long-term ownership (20+ years), properties with high equity, and properties that show signs of distress. Services like PropStream, ListSource, and BatchLeads make building targeted lists straightforward.'),
    p('om08', 'Send your mailers consistently — at least once per month to the same list. The first mailing will generate some calls, but the third, fourth, and fifth mailings to the same list will generate more because repetition builds familiarity and catches sellers at the right moment. Your message should be personal, direct, and specific: "I want to buy your property at 123 Main Street. I can close quickly and buy as-is. Call me."'),

    // Strategy 2: Driving for Dollars
    h2('om09', 'Strategy 2: Driving for Dollars'),
    p('om10', 'Driving for dollars means physically driving through target neighborhoods looking for properties that show signs of distress or vacancy: overgrown lawns, boarded windows, full gutters, accumulated mail, peeling paint, or code violation notices. When you find one, record the address, look up the owner through county records, and reach out via mail, phone, or door knock.'),
    p('om11', 'This strategy is free (aside from gas), highly targeted (you are identifying genuinely distressed properties), and surprisingly effective. Use apps like DealMachine or the DFD app to photograph properties, skip-trace the owners, and send mail directly from your phone. The best driving-for-dollars investors create routes and drive them weekly, building a list of target properties over time. Many of their best deals come from properties they have been tracking for months, making contact at exactly the right moment.'),

    // Strategy 3: Wholesaler Relationships
    h2('om12', 'Strategy 3: Wholesaler Relationships'),
    p('om13', 'Wholesalers are real estate professionals who specialize in finding distressed properties and negotiating contracts at below-market prices. They then assign (sell) those contracts to investors for an assignment fee. Building relationships with reliable wholesalers gives you access to a steady stream of pre-negotiated off-market deals without doing the marketing yourself.'),
    p('om14', 'The key is finding good wholesalers — and that requires networking. Attend local real estate investor meetups, join BiggerPockets forums for your market, and ask experienced investors who they buy from. A good wholesaler provides accurate ARV estimates, honest rehab assessments, and deals at prices that still work after their assignment fee. A bad wholesaler inflates ARVs, understates rehab costs, and brings deals that only work if everything goes perfectly. Vet every deal independently regardless of who brings it to you.'),
    p('om15', 'Build relationships with three to five wholesalers and clearly communicate your buying criteria: property types, price range, condition range, and target neighborhoods. Wholesalers prioritize the buyers who close — so when a good deal comes through, move quickly and follow through. Your reputation as a reliable closer is what keeps the best deals flowing to you.'),

    // Strategy 4: Real Estate Agent Networking
    h2('om16', 'Strategy 4: Real Estate Agent Networking'),
    p('om17', 'Investor-friendly real estate agents can be an excellent source of off-market deals. Agents hear about properties before they hit the MLS — pocket listings, coming-soon properties, and situations where sellers are considering listing but have not committed. An agent who understands your criteria can bring you deals before the competition ever sees them.'),
    p('om18', 'Find agents who specialize in investment properties or who invest themselves. They understand cap rates, cash flow, and ARV — and they know which deals are actually good versus which just look good on a listing sheet. Offer to be easy to work with: provide proof of funds, close on time, and do not nickel-and-dime on inspections. Agents prioritize buyers who close smoothly, so make yourself the buyer every agent wants to call first.'),

    // Strategy 5: Online Platforms
    h2('om19', 'Strategy 5: Online Platforms and Data Tools'),
    p('om20', 'Technology has made off-market deal finding dramatically more efficient. PropStream combines property data, owner information, mortgage details, and skip-tracing into a single platform. BatchLeads offers similar capabilities with a mobile-friendly driving-for-dollars integration. These tools let you build targeted lists, skip-trace owners, send direct mail, and track your outreach all in one place.'),
    p('om21', 'Other platforms worth exploring include auction sites (Auction.com, Hubzu) for bank-owned properties, Crexi and LoopNet for commercial and multi-family deals, local Facebook groups where wholesalers and investors post deals, and Craigslist where motivated sellers sometimes list directly. The technology does not replace relationships, but it dramatically accelerates your ability to find and reach motivated sellers.'),

    // Strategy 6: Probate and Pre-Foreclosure
    h2('om22', 'Strategy 6: Probate and Pre-Foreclosure Lists'),
    p('om23', 'Probate properties — real estate owned by someone who has died — represent one of the most consistent sources of motivated sellers. Heirs often want to liquidate the property quickly, especially if it is in another state, needs repairs, or is causing family disputes. Probate proceedings are public record, and you can access filings at the county courthouse or through data services.'),
    p('om24', 'Pre-foreclosure lists identify homeowners who have received a notice of default or lis pendens — they are behind on their mortgage and facing foreclosure. These owners are often motivated to sell quickly to avoid the damage of a foreclosure on their credit. Approach these situations with empathy and professionalism: you are offering a solution to a stressful problem, not taking advantage. Many pre-foreclosure sellers are relieved to have a clean exit rather than losing the property at auction.'),
    p('om25', 'Both lists are available through county records, data services (PropStream, ATTOM Data), and specialized list providers. The sellers on these lists often have high equity (especially probate), are motivated by circumstance rather than price expectations, and are willing to sell below market in exchange for speed and convenience.'),

    // Strategy 7: Community Networking
    h2('om26', 'Strategy 7: Community Networking and Word of Mouth'),
    p('om27', 'Never underestimate the power of simply telling people what you do. Tell your friends, family, neighbors, coworkers, and anyone you meet that you buy houses. Carry business cards that say "I Buy Houses" with your phone number. Join your local real estate investor association (REIA). Attend landlord meetups. Build relationships with attorneys, accountants, property managers, and contractors who encounter motivated sellers in their work.'),
    p('om28', 'Word-of-mouth deals are often the best because they come with built-in trust. When a friend refers their elderly neighbor who wants to sell, you start the conversation with credibility rather than cold outreach. These deals close faster, with less negotiation friction, and often at fair prices that work for both parties. The more people who know you buy houses, the more deals will find you.'),

    // Building a Deal Pipeline
    h2('om29', 'Building a Consistent Deal Pipeline'),
    p('om30', 'No single strategy will deliver enough deals on its own. The most successful investors run three to five deal-finding channels simultaneously. They send direct mail monthly, drive for dollars weekly, maintain wholesaler relationships, attend networking events, and use online tools to identify opportunities. This multi-channel approach creates a consistent pipeline where new leads are always coming in.'),
    p('om31', 'Track your pipeline like a business. Know how many leads each channel generates, what percentage convert to offers, and what percentage of offers close. Over time, you will see which channels produce the best deals in your market and can allocate your time and money accordingly. Treat deal finding as marketing — it is a numbers game that rewards consistency, tracking, and optimization.'),

    // Analyzing Off-Market Deals
    h2('om32', 'How to Analyze an Off-Market Deal Differently'),
    p('om33', 'Off-market deals require a different analysis mindset than MLS properties. There is no listing price anchoring your expectations — you must determine value independently. Pull your own comparable sales, drive the neighborhood, and talk to local agents about what renovated properties sell for. Be especially thorough with your ARV estimate because there is no market-tested listing price to validate your numbers.'),
    p('om34', 'Off-market sellers also create opportunities for creative deal structures that are rare on the MLS. Seller financing, subject-to existing mortgages, lease-option agreements, and extended closing timelines are all negotiable when you are dealing directly with a motivated seller. These structures can dramatically improve your returns by reducing the cash you need upfront or providing below-market financing terms.'),

    // Negotiation Tips
    h2('om35', 'Negotiation Tips for Off-Market Deals'),
    p('om36', 'Off-market negotiation is fundamentally different from MLS bidding. There is no listing agent controlling the process, no competing offers creating urgency, and often no professional representation on the seller\'s side. Your job is to understand the seller\'s motivation and structure a deal that solves their problem while meeting your investment criteria.'),
    p('om37', 'Listen more than you talk. Ask the seller why they are considering selling, what their timeline looks like, and what is most important to them — price, speed, or convenience. Many off-market sellers will accept a lower price in exchange for a fast close, an as-is sale, or certainty that the deal will not fall through. Make your initial offer reasonable — lowball offers destroy trust and end conversations. Leave room to negotiate, but show the seller you are serious and fair.'),
    p('om38', 'Always present your offer in writing, even for off-market deals. A written offer demonstrates professionalism and seriousness. Include proof of funds or a pre-qualification letter. Set a response deadline to create urgency without pressure. And always be prepared to walk away — the willingness to walk is your greatest negotiating tool. There will always be another deal.'),
  ],
}

// ══════════════════════════════════════════════════════
// CLUSTER POST 8: 1031 Exchange Rules
// ══════════════════════════════════════════════════════
const exchangeRules = {
  _type: 'post',
  title: '1031 Exchange Rules: The Complete Guide to Tax-Deferred Real Estate Exchanges',
  slug: { _type: 'slug', current: '1031-exchange-rules-complete-guide' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-tax', _key: 'c1' },
  ],
  publishedAt: '2026-03-23T10:00:00Z',
  excerpt: 'A 1031 exchange can save you hundreds of thousands in capital gains taxes. Here are the rules, timelines, and strategies you need to know.',
  seo: {
    metaTitle: '1031 Exchange Rules: Complete Guide for Real Estate Investors',
    metaDescription: 'Complete guide to 1031 exchange rules. Learn the 45-day and 180-day deadlines, like-kind requirements, and strategies to defer capital gains taxes.',
  },
  body: [
    // Introduction
    p('ex01', 'A 1031 exchange is the single most powerful tax-deferral tool available to real estate investors. Named after Section 1031 of the Internal Revenue Code, it allows you to sell an investment property, reinvest the proceeds into a new property, and defer all capital gains taxes — potentially forever. Investors who master 1031 exchanges build portfolios worth millions while paying little to nothing in capital gains taxes along the way.'),
    p('ex02', 'The concept is simple: instead of selling a property and paying a massive tax bill, you exchange it for another property and keep all your equity working for you. But while the concept is simple, the rules are specific and unforgiving. Miss a deadline by one day, touch the proceeds with your own hands, or fail to meet the reinvestment requirements, and the entire exchange is disqualified. The tax bill you were trying to defer becomes immediately due.'),
    p('ex03', 'This guide covers every rule you need to know, the deadlines you must meet, the strategies that maximize your tax savings, and the mistakes that derail even experienced investors. Whether you are planning your first exchange or your tenth, understanding these rules is essential to protecting your wealth.'),

    // What Is a 1031 Exchange
    h2('ex04', 'What Is a 1031 Exchange?'),
    p('ex05', 'A 1031 exchange — also called a like-kind exchange or a Starker exchange — allows you to sell an investment or business-use property and defer capital gains taxes by reinvesting the proceeds into another qualifying property. The key word is defer: you are not avoiding taxes permanently (at least in theory), you are postponing them to a future date. In practice, through serial exchanges and the stepped-up basis at death, many investors defer capital gains taxes permanently.'),
    p('ex06', 'The exchange must meet specific requirements to qualify. Both the property you sell (the relinquished property) and the property you buy (the replacement property) must be held for investment or used in a trade or business. Primary residences and properties held primarily for resale (flips) do not qualify. The properties must be like-kind, which in real estate is interpreted broadly — virtually any real property can be exchanged for any other real property. A single-family rental can be exchanged for an apartment building, a vacant lot, or a commercial office building.'),

    // The Rules
    h2('ex07', 'The Core Rules of a 1031 Exchange'),

    h3('ex08', 'Like-Kind Requirement'),
    p('ex09', 'The like-kind requirement is more flexible than most investors realize. In real estate, like-kind means any real property held for investment or business use. A residential rental qualifies for exchange into commercial property, raw land, a multi-family building, or even a Delaware Statutory Trust (DST). The only real exclusions are primary residences, property held for resale (dealer property), and property outside the United States (domestic property cannot be exchanged for foreign property and vice versa).'),

    h3('ex10', 'Equal or Greater Value'),
    p('ex11', 'To fully defer all capital gains taxes, the replacement property must be of equal or greater value than the relinquished property, and you must reinvest all of the net equity (sale proceeds minus selling costs). If you buy a replacement property of lesser value or pocket some of the proceeds, the difference is called boot and is taxable. Boot can be cash you receive, debt relief (if your new mortgage is smaller than your old one), or non-like-kind property received in the exchange.'),

    h3('ex12', 'Qualified Intermediary (QI)'),
    p('ex13', 'A qualified intermediary is the linchpin of a 1031 exchange. The QI is a neutral third party who holds the sale proceeds between the sale of your relinquished property and the purchase of your replacement property. You cannot touch, control, or have access to the funds at any point during the exchange. If the proceeds pass through your hands — even briefly, even accidentally — the exchange is disqualified.'),
    p('ex14', 'You must engage your QI before closing on the sale of your relinquished property. The QI prepares the exchange documents, receives the sale proceeds from the closing, and later disburses the funds to purchase the replacement property. QI fees typically range from $750 to $1,500 for a standard exchange. Choose a QI with errors and omissions insurance and a fidelity bond to protect against fraud or insolvency — your entire exchange proceeds are in their custody.'),

    // 45-Day Identification Period
    h2('ex15', 'The 45-Day Identification Period'),
    p('ex16', 'Starting from the day you close on the sale of your relinquished property, you have exactly 45 calendar days to identify potential replacement properties in writing. This is one of the most commonly failed requirements because 45 days passes quickly, especially in competitive markets where good properties are hard to find.'),
    p('ex17', 'Your identification must be specific and in writing, delivered to the QI or another party to the exchange (not your agent or attorney unless they qualify). You must include the street address and legal description or other unambiguous description of each property you are considering.'),

    h3('ex18', 'The Three Identification Rules'),
    p('ex19', 'The IRS provides three alternatives for how many properties you can identify. The three-property rule allows you to identify up to three properties regardless of their total value. This is the most commonly used rule and the simplest to comply with. The 200% rule allows you to identify any number of properties as long as their combined fair market value does not exceed 200% of the value of the relinquished property. The 95% rule allows you to identify any number of properties of any value, but you must actually acquire at least 95% of the total value identified — a near-impossible threshold that is rarely used.'),
    p('ex20', 'Most investors use the three-property rule. Identify your top choice, a strong backup, and a third option as a safety net. The 200% rule is useful when you plan to exchange into multiple smaller properties — for example, selling one large building and buying several single-family rentals.'),

    // 180-Day Closing Deadline
    h2('ex21', 'The 180-Day Closing Deadline'),
    p('ex22', 'You must close on your replacement property within 180 calendar days of selling your relinquished property. This 180-day period runs concurrently with the 45-day identification period — it is not 45 days plus 180 days. So you really have 135 days from the end of your identification period to close.'),
    p('ex23', 'There is one additional wrinkle: the 180-day deadline can be shortened by your tax return due date. If your tax return is due (including extensions) before the 180th day, the exchange must be completed by the earlier date. This typically only affects investors who close on their relinquished property in October, November, or December. The solution is simple: file an extension for your tax return to ensure you have the full 180 days.'),
    bq('ex24', 'Critical Deadlines: 45 days to identify, 180 days to close. No extensions, no exceptions.'),

    // Boot and Partial Exchanges
    h2('ex25', 'Boot and Partial Exchanges'),
    p('ex26', 'Boot is the term for any value received in a 1031 exchange that does not qualify for tax deferral. Cash boot is the most common — if you receive any cash from the exchange, that cash is taxable. Mortgage boot occurs when the debt on your replacement property is less than the debt on your relinquished property — the debt reduction is treated as taxable boot. Even minor oversights, like receiving a security deposit refund or prorated rent from the relinquished property outside the exchange, can create taxable boot.'),
    p('ex27', 'Partial exchanges are allowed — you do not have to defer 100% of the gain. Some investors intentionally take some boot to access cash while still deferring the majority of the gain. For example, on a $200,000 gain, you might take $30,000 in cash boot (paying taxes on that portion) and defer the remaining $170,000 through the exchange. This can be a reasonable strategy when you need liquidity.'),

    // Reverse 1031 Exchanges
    h2('ex28', 'Reverse 1031 Exchanges'),
    p('ex29', 'A reverse 1031 exchange allows you to acquire the replacement property before selling the relinquished property. This is useful when you find a great replacement property but have not yet sold your current property — you do not want to lose the deal waiting for your sale to close.'),
    p('ex30', 'Reverse exchanges are more complex and more expensive than forward exchanges. An Exchange Accommodation Titleholder (EAT) — typically an LLC controlled by the QI — takes title to either the replacement property or the relinquished property during the exchange period. The same 45-day identification and 180-day closing rules apply. Reverse exchange costs typically run $5,000 to $15,000 due to the additional legal and holding structure required.'),
    p('ex31', 'Despite the higher cost, reverse exchanges are a valuable tool for investors in competitive markets. The ability to buy first and sell second gives you certainty that your replacement property is secured before you let go of your current one.'),

    // Improvement Exchanges
    h2('ex32', 'Improvement (Build-to-Suit) Exchanges'),
    p('ex33', 'An improvement exchange, also called a build-to-suit or construction exchange, allows you to use exchange proceeds to acquire a property and make improvements to it — with the improved property serving as the replacement. This is useful when you want to exchange into a property that needs significant renovation or when you want to build on vacant land.'),
    p('ex34', 'The mechanics are similar to a reverse exchange. The EAT acquires the replacement property, improvements are made using exchange funds while the EAT holds title, and the improved property is transferred to you when the exchange closes. All improvements must be completed within the 180-day exchange period. Any improvements made after the exchange period do not count toward the replacement property value for exchange purposes.'),

    // Common Mistakes
    h2('ex35', 'Common 1031 Exchange Mistakes'),
    p('ex36', 'The most fatal mistake is missing the deadlines. The 45-day identification period and 180-day closing deadline are absolute — there are no extensions, no grace periods, and no exceptions (with very limited disaster relief provisions). Set multiple calendar reminders, work backward from the deadlines, and have backup properties identified before day 45.'),
    p('ex37', 'Other common mistakes include engaging the QI too late (the QI must be involved before the sale closes — not after), touching the proceeds (even a brief deposit into your personal account disqualifies the exchange), buying replacement property of lesser value and creating unnecessary taxable boot, attempting to exchange a primary residence or a flip property that does not qualify, and failing to reinvest all net proceeds.'),
    p('ex38', 'Related-party exchanges — exchanging with family members or entities you control — are subject to special rules and a two-year holding requirement. If either party disposes of the exchanged property within two years, the deferred gain becomes taxable. Consult your tax advisor before any related-party exchange.'),

    // How Much You Save: Worked Example
    h2('ex39', 'How Much a 1031 Exchange Saves: Worked Example'),
    p('ex40', 'Let us quantify the savings with a detailed example. You bought a rental property ten years ago for $300,000 and have taken $109,000 in depreciation (10 years of straight-line depreciation on $275,000 depreciable basis at $10,909 per year). Your adjusted basis is now $191,000 ($300,000 minus $109,000). You sell the property for $500,000.'),
    p('ex41', 'Your total gain is $309,000 ($500,000 minus $191,000). This breaks down into $200,000 in capital appreciation ($500,000 minus $300,000 purchase price) and $109,000 in depreciation recapture. The tax bill without a 1031 exchange: depreciation recapture at 25% is $27,250, long-term capital gains at 20% is $40,000, Net Investment Income Tax at 3.8% is $11,742, and state taxes (assuming 5%) are $15,450. Total tax bill: $94,442.'),
    p('ex42', 'With a 1031 exchange into a $550,000 replacement property, your tax bill is zero. You keep the full $94,442 invested and working for you. At a 7% annual return, that $94,442 grows to over $185,000 in ten years. The 1031 exchange did not just save you money — it put nearly $100,000 of additional capital to work building wealth.'),

    // When NOT to Do a 1031
    h2('ex43', 'When NOT to Do a 1031 Exchange'),
    p('ex44', 'A 1031 exchange is not always the right move. If you are in a low tax bracket and the capital gains taxes would be minimal, the cost and complexity of the exchange may not be justified. If you need the cash for other purposes — paying off debt, starting a business, personal expenses — taking the tax hit and accessing the money might be the better choice. If you cannot find a suitable replacement property within the 45-day identification period, forcing a purchase just to complete the exchange can lead to buying a bad deal.'),
    p('ex45', 'Additionally, if you plan to leave real estate investing entirely, there is no benefit to deferring taxes into another property. The deferred gain becomes payable when you eventually sell without exchanging. However, if you plan to hold until death, the stepped-up basis effectively eliminates the deferred gain for your heirs — which is why "swap till you drop" remains one of the most powerful wealth transfer strategies in existence.'),

    // Glossary Connection
    h2('ex46', 'Key 1031 Exchange Terms'),
    p('ex47', 'Understanding the terminology is essential for successful exchanges. Relinquished property is the property you are selling. Replacement property is the property you are buying. Qualified intermediary is the neutral party holding exchange funds. Boot is taxable value received in the exchange. Like-kind refers to the broad category of qualifying real property. Exchange period is the 180-day window for completing the exchange. Identification period is the 45-day window for identifying replacement properties.'),
    p('ex48', 'For a comprehensive glossary of real estate investing terms, including all 1031 exchange terminology, visit our investor glossary. A clear understanding of these terms will help you communicate effectively with your QI, attorney, and CPA when planning and executing your exchange strategy.'),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [rentalGuide, taxGuide, dscrLoans, seventyPercentRule, offMarketDeals, exchangeRules]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 2 Content Seed: 2 pillar guides + 4 cluster posts\n')

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
