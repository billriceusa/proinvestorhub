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

// ── Look up author and categories via GROQ ───────────
const author = await client.fetch(
  `*[_type == "author" && name == "Bill Rice"][0]{ _id }`
)
if (!author) {
  console.error('Author "Bill Rice" not found in Sanity')
  process.exit(1)
}
const authorRef = { _type: 'reference', _ref: author._id }
console.log(`Author: ${author._id}`)

async function getCategoryRef(title, key) {
  const cat = await client.fetch(
    `*[_type == "category" && title == $title][0]{ _id }`,
    { title }
  )
  if (!cat) {
    console.error(`Category "${title}" not found in Sanity`)
    process.exit(1)
  }
  console.log(`Category "${title}": ${cat._id}`)
  return { _type: 'reference', _ref: cat._id, _key: key }
}

const catGettingStarted = await getCategoryRef('Getting Started', 'c1')
const catTaxLegal = await getCategoryRef('Tax & Legal', 'c2')
const catStrategies = await getCategoryRef('Strategies', 'c3')
const catFinancing = await getCategoryRef('Financing', 'c4')

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

function pLink(key, segments) {
  const children = []
  const markDefs = []
  segments.forEach((seg, i) => {
    const spanKey = `${key}s${i}`
    if (seg.href) {
      const markKey = `${key}m${i}`
      markDefs.push({ _type: 'link', _key: markKey, href: seg.href })
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [markKey] })
    } else {
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [] })
    }
  })
  return { _type: 'block', _key: key, style: 'normal', markDefs, children }
}

// ══════════════════════════════════════════════════════
// POST 1: How to Use Leverage in Real Estate
// ══════════════════════════════════════════════════════
const leverageGuide = {
  _type: 'post',
  title: 'How to Use Leverage in Real Estate: The Investor\'s Guide',
  slug: { _type: 'slug', current: 'how-to-use-leverage-real-estate' },
  author: authorRef,
  categories: [catFinancing],
  publishedAt: '2026-06-15T10:00:00Z',
  excerpt: 'How leverage amplifies real estate returns — and risk. Learn how debt-to-equity ratios work, optimal leverage levels, and how to avoid overleveraging your portfolio.',
  seo: {
    metaTitle: 'How to Use Leverage in Real Estate Investing | ProInvestorHub',
    metaDescription: 'Complete guide to real estate leverage. Learn how debt amplifies returns, optimal leverage ratios, when to use vs. avoid leverage, and how to protect your portfolio from overleveraging.',
  },
  body: [
    p('lv01', 'Leverage is the single most powerful concept in real estate investing — and the most dangerous when misunderstood. In its simplest form, leverage means using borrowed money to control an asset worth more than your cash investment. When you put $50,000 down on a $250,000 property, you are using 5:1 leverage. If that property appreciates 10 percent to $275,000, you have gained $25,000 on a $50,000 investment — a 50 percent return on your cash. Without leverage, a 10 percent return on $250,000 in cash is still $25,000, but you needed five times more capital to earn it.'),
    pLink('lv02', [
      { text: 'This magnification effect is why real estate consistently creates more millionaires than any other asset class. But leverage cuts both ways. If that same property drops 10 percent to $225,000, you have lost $25,000 on your $50,000 investment — a 50 percent loss. At higher leverage ratios, a 20 percent decline wipes out your entire equity position. Understanding how to use leverage wisely — and when not to use it — is what separates investors who build generational wealth from those who lose everything in a downturn. Use our ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' to model how different leverage levels affect your returns.' },
    ]),

    h2('lv03', 'How Leverage Works in Real Estate'),
    p('lv04', 'Leverage in real estate works through mortgage financing. When you buy a $300,000 rental property with 25 percent down ($75,000), you borrow $225,000 from a lender. You control a $300,000 asset with $75,000 of your own money. Your leverage ratio is 3:1 (the property is worth three times your cash investment) and your loan-to-value ratio is 75 percent. The property generates rental income that covers the mortgage payment and operating expenses, with the remaining cash flow going to you. Meanwhile, the tenant is paying down your loan principal, and the property is (hopefully) appreciating in value.'),
    p('lv05', 'The return on your investment is calculated on your cash invested, not the total property value. If the property generates $6,000 per year in net cash flow after all expenses and mortgage payments, your cash-on-cash return is $6,000 divided by $75,000 — an 8 percent return. But your total return includes principal paydown (approximately $4,000 per year in early years), appreciation (historically 3 to 4 percent nationally, or $9,000 to $12,000 per year on a $300,000 property), and tax benefits (depreciation shelters a portion of your rental income). When you add these together, your total return on $75,000 invested can easily reach 15 to 25 percent annually — a return that is nearly impossible to achieve with stocks, bonds, or unlevered real estate.'),

    h2('lv06', 'The Four Returns of Leveraged Real Estate'),
    pLink('lv07', [
      { text: 'Leveraged real estate generates returns in four simultaneous ways, which is why it outperforms most other investments on a risk-adjusted basis. Cash flow is the monthly income remaining after all expenses and mortgage payments. Principal paydown is the portion of each mortgage payment that reduces your loan balance — your tenant is literally buying the property for you. Appreciation is the increase in property value over time, magnified by leverage (a 5 percent increase on a $300,000 property is a 20 percent return on a $75,000 down payment). And ' },
      { text: 'tax benefits', href: '/blog/real-estate-tax-strategies-guide' },
      { text: ' include depreciation, mortgage interest deduction, and the ability to defer gains through ' },
      { text: '1031 exchanges', href: '/blog/1031-exchange-rules-complete-guide' },
      { text: '. No other investment offers all four simultaneously.' },
    ]),

    h2('lv08', 'Optimal Leverage Levels'),
    p('lv09', 'More leverage is not always better. The optimal leverage level balances return magnification with risk management. For most residential rental investors, 70 to 80 percent LTV (20 to 30 percent down payment) is the sweet spot. At this level, your cash-on-cash returns are strong, the property is almost certainly cash flow positive, and you have enough equity cushion to weather a moderate market decline without going underwater.'),
    p('lv10', 'Higher leverage (90 to 97 percent LTV through FHA or VA loans) is available for owner-occupied properties and house hacking. This maximizes your capital efficiency but leaves virtually no equity cushion. It works well in growing markets where appreciation quickly builds equity, but it is risky in flat or declining markets. Lower leverage (50 to 60 percent LTV) reduces risk and increases cash flow but requires more capital per property, slowing portfolio growth. This approach makes sense for investors prioritizing income over growth, or for those with substantial capital who want lower risk.'),

    h2('lv11', 'The Dangers of Overleveraging'),
    pLink('lv12', [
      { text: 'Overleveraging — using too much debt relative to equity and income — is the most common way real estate investors fail. The warning signs include negative cash flow that requires you to subsidize the property from personal income, debt service coverage ratios below 1.0 (the property does not generate enough income to cover the mortgage), no cash reserves for maintenance, vacancies, or market downturns, and variable-rate debt that could become unaffordable if rates rise. The 2008 financial crisis destroyed investors who were overleveraged — properties that were worth less than their mortgages, with no cash flow to service the debt and no reserves to survive the downturn. See our analysis of the ' },
      { text: 'biggest real estate investing mistakes', href: '/blog/real-estate-investing-mistakes' },
      { text: ' for more on how overleveraging unfolds.' },
    ]),

    h2('lv13', 'Leverage Strategies by Portfolio Stage'),
    h3('lv14', 'Properties 1–3: Maximum Leverage for Growth'),
    pLink('lv15', [
      { text: 'Early in your portfolio, capital is your biggest constraint. Use maximum reasonable leverage (75 to 80 percent LTV for investment properties, 96.5 percent FHA for ' },
      { text: 'house hacking', href: '/blog/house-hacking-101-live-for-free' },
      { text: ') to get into as many properties as possible while prices are accessible. The risk is manageable because you have limited total exposure.' },
    ]),

    h3('lv16', 'Properties 4–7: Balanced Leverage'),
    pLink('lv17', [
      { text: 'As your portfolio grows, start building equity cushion. Target 70 to 75 percent LTV on new acquisitions. Refinance early properties that have appreciated to pull equity for new purchases (' },
      { text: 'BRRRR strategy', href: '/blog/brrrr-method-complete-guide' },
      { text: '). Maintain 6 months of reserves per property.' },
    ]),

    h3('lv18', 'Properties 8+: Selective Leverage'),
    pLink('lv19', [
      { text: 'At scale, focus shifts from growth to stability. Consider paying down mortgages on properties in markets with less growth potential. Use ' },
      { text: 'DSCR loans', href: '/blog/dscr-investor-financing-guide' },
      { text: ' for portfolio lending flexibility. Maintain higher equity ratios (50 to 65 percent LTV) across the portfolio to weather market cycles. The goal is a portfolio that survives a 2008-level downturn without forced sales.' },
    ]),

    h2('lv20', 'Key Leverage Metrics to Track'),
    pLink('lv21', [
      { text: 'Track these metrics across your portfolio: Debt-to-Equity Ratio — total debt divided by total equity. Below 2:1 is conservative, 2:1 to 3:1 is moderate, above 4:1 is aggressive. Debt Service Coverage Ratio (DSCR) — ' },
      { text: 'NOI', href: '/glossary/noi' },
      { text: ' divided by annual debt service. Target 1.25 or higher, meaning the property generates 25 percent more income than needed to service the debt. Loan-to-Value (LTV) — total loans divided by total property value. Below 70 percent is conservative, 70 to 80 percent is moderate, above 80 percent is aggressive. Cash reserve ratio — total liquid reserves divided by monthly debt obligations. Target 6 months minimum.' },
    ]),

    h2('lv22', 'The Bottom Line'),
    pLink('lv23', [
      { text: 'Leverage is the engine that makes real estate investing accessible and profitable. Used wisely, it allows you to build a portfolio worth millions starting with relatively modest capital. Used recklessly, it can wipe you out. The key principles are: never leverage so heavily that a vacancy or market decline creates financial distress, always maintain cash reserves, use fixed-rate debt whenever possible, and increase your equity position as your portfolio matures. Run the numbers on every deal using our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ' to ensure your leverage level produces positive cash flow under conservative assumptions.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: Real Estate vs. Stocks
// ══════════════════════════════════════════════════════
const realEstateVsStocks = {
  _type: 'post',
  title: 'Real Estate vs. Stocks: A Complete Comparison for Investors',
  slug: { _type: 'slug', current: 'real-estate-vs-stocks-comparison' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-06-18T10:00:00Z',
  excerpt: 'Should you invest in real estate or stocks? A data-driven comparison of returns, risk, liquidity, tax benefits, time commitment, and how to allocate between both asset classes.',
  seo: {
    metaTitle: 'Real Estate vs. Stocks: Complete Comparison | ProInvestorHub',
    metaDescription: 'Real estate vs. stocks: compare historical returns, risk profiles, tax advantages, liquidity, time commitment, and learn how to allocate between both for maximum wealth building.',
  },
  body: [
    p('rs01', 'Real estate versus stocks is the oldest debate in personal finance — and the most misleading, because it frames the question as either/or when the answer for most investors is both. Still, understanding the structural differences between these two asset classes is essential for making smart allocation decisions. Real estate and stocks generate wealth through fundamentally different mechanisms, carry different risk profiles, offer different tax advantages, and require different levels of involvement. This guide lays out the comparison honestly so you can decide how to allocate your capital.'),

    h2('rs02', 'Historical Returns'),
    p('rs03', 'The S&P 500 has returned approximately 10 percent annually (7 percent inflation-adjusted) over the past century, including dividends. Real estate returns are harder to measure because they depend heavily on leverage, location, and management. Unlevered real estate (buying properties outright with cash) has historically returned 4 to 6 percent annually from appreciation alone — below stocks. But almost nobody buys real estate without leverage. Levered real estate — the way most investors actually invest — has historically produced total returns (cash flow + appreciation + principal paydown + tax benefits) of 12 to 20 percent on invested capital. The leverage is what makes real estate competitive with and often superior to stock returns.'),
    p('rs04', 'The comparison is not apples-to-apples. Stock returns are typically unlevered (most investors do not buy stocks on margin). Real estate returns are typically levered (most investors use mortgages). Comparing levered real estate to unlevered stocks is like comparing a sprinter with a running start to one starting from a standstill. If you lever stocks the same way (buying on margin), the returns would be higher — but so would the risk. Real estate gets more favorable leverage terms because the underlying asset (real property) is a more stable form of collateral than stocks.'),

    h2('rs05', 'The Tax Advantage'),
    pLink('rs06', [
      { text: 'This is where real estate wins decisively. The U.S. tax code is structurally favorable to real estate investors in ways that do not apply to stock investors. ' },
      { text: 'Depreciation', href: '/blog/real-estate-depreciation-tax-benefit' },
      { text: ' allows you to deduct the value of the building (not the land) over 27.5 years, creating a paper loss that shelters rental income from taxation — even when the property is actually appreciating. Mortgage interest is deductible. Operating expenses are deductible. And when you sell, you can defer capital gains indefinitely through ' },
      { text: '1031 exchanges', href: '/blog/1031-exchange-rules-complete-guide' },
      { text: ', rolling your equity into a new property without paying taxes. Stocks offer no equivalent tax shelter. Dividends are taxed annually. Capital gains are taxed when you sell. There is no mechanism to defer stock gains through reinvestment the way 1031 exchanges work for real estate.' },
    ]),

    h2('rs07', 'Liquidity'),
    p('rs08', 'Stocks win on liquidity. You can sell a stock in seconds during market hours and receive cash within two business days. Selling a property takes 30 to 90 days minimum — longer in slow markets. This illiquidity is actually both a disadvantage and an advantage. The disadvantage is obvious: you cannot access your capital quickly. The advantage is behavioral: real estate investors are less likely to panic-sell during market downturns because selling is difficult and slow. Stock investors who sell during crashes (and many do) lock in losses that patient real estate investors avoid simply because the friction of selling prevents impulsive decisions.'),

    h2('rs09', 'Time Commitment'),
    p('rs10', 'Index fund investing requires virtually zero time after the initial allocation decision. Buy a total market index fund, set up automatic contributions, and check it once a quarter. Active real estate investing — finding deals, managing properties, coordinating maintenance, screening tenants — is a part-time job for the first few properties and a full-time job for larger portfolios. Property management can be outsourced (at 8 to 10 percent of gross rent), making real estate more passive, but it is never as passive as owning an index fund. The time commitment is the single biggest reason many high-income investors choose stocks over real estate, or invest in real estate through passive vehicles like REITs or crowdfunding.'),

    h2('rs11', 'Risk Comparison'),
    p('rs12', 'Both asset classes carry risk, but the nature of the risk is different. Stock risk is primarily market risk and volatility — the S&P 500 dropped 34 percent in March 2020, 38 percent in 2008, and 49 percent in 2000-2002. Real estate risk is more localized and operational — a bad tenant, an unexpected repair, a regional economic decline, or overleveraging. Real estate prices are less volatile than stock prices on a day-to-day basis (partly because real estate is not repriced in real time), but individual property risk can be concentrated — one bad property can produce a significant loss.'),
    p('rs13', 'The risk mitigation strategies are different too. Stock risk is mitigated through diversification (index funds spread risk across thousands of companies). Real estate risk is mitigated through due diligence, conservative underwriting, cash reserves, and proper insurance. Both approaches work, but they require different skills and temperaments.'),

    h2('rs14', 'The Case for Both'),
    pLink('rs15', [
      { text: 'The smartest allocation for most investors includes both real estate and stocks. Stocks provide liquidity, diversification, and truly passive growth through tax-advantaged retirement accounts (401k, IRA). Real estate provides tax-advantaged current income, leveraged appreciation, and a hedge against inflation (rents and property values tend to rise with inflation, while fixed-rate mortgage payments do not). A common allocation for investors in their 30s and 40s is to maximize tax-advantaged stock contributions (401k, IRA) while building a ' },
      { text: 'real estate portfolio', href: '/blog/building-real-estate-portfolio' },
      { text: ' with after-tax capital. The stocks provide long-term retirement security; the real estate provides current income and faster wealth building through leverage.' },
    ]),

    h2('rs16', 'When to Prioritize Real Estate'),
    pLink('rs17', [
      { text: 'Prioritize real estate when you have a high income but limited investment accounts (real estate offers tax shelter that stocks in taxable accounts do not), when you are willing to trade time for higher returns, when you want current income rather than deferred growth, and when you have access to markets with favorable ' },
      { text: 'cash flow dynamics', href: '/blog/best-cash-flow-markets-2026' },
      { text: '. Real estate is also a better choice when interest rates are low relative to cap rates, because leverage is cheap and cash flow is easier to achieve.' },
    ]),

    h2('rs18', 'When to Prioritize Stocks'),
    p('rs19', 'Prioritize stocks when you have limited time for active investing, when you are early in your career and should maximize retirement account contributions, when you need liquidity for near-term goals, when real estate prices in your market do not support positive cash flow, and when you prefer true diversification across thousands of companies rather than concentrated bets on individual properties. There is no wrong answer — both asset classes build wealth. The question is which allocation matches your goals, temperament, and life stage.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 3: Section 8 Investing Guide
// ══════════════════════════════════════════════════════
const section8Guide = {
  _type: 'post',
  title: 'Section 8 Investing: How to Profit from Government-Backed Rental Income',
  slug: { _type: 'slug', current: 'section-8-investing-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-06-22T10:00:00Z',
  excerpt: 'A practical guide to Section 8 (Housing Choice Voucher) investing — how the program works, the financial advantages, tenant screening, property requirements, and common pitfalls.',
  seo: {
    metaTitle: 'Section 8 Investing Guide: Government-Backed Rental Income | ProInvestorHub',
    metaDescription: 'Complete guide to Section 8 real estate investing. Learn how Housing Choice Vouchers work, financial advantages, property inspection requirements, tenant screening, and ROI analysis.',
  },
  body: [
    p('s801', 'Section 8 — officially the Housing Choice Voucher Program — is the largest federal rental assistance program in the United States, providing housing subsidies to approximately 2.3 million households. For real estate investors, Section 8 represents something rare: a government-backed revenue stream that pays a significant portion of your rent directly to you, on time, every month. The Department of Housing and Urban Development (HUD) funds the program through local Public Housing Authorities (PHAs), and the demand for Section 8-accepted properties far exceeds the supply in most markets.'),
    pLink('s802', [
      { text: 'The investment thesis is straightforward. Section 8 tenants receive a voucher that covers 60 to 100 percent of the Fair Market Rent (FMR) set by HUD for your area. The PHA deposits the subsidy directly into your bank account on the first of each month. The tenant pays the difference between the subsidy and the actual rent — typically $0 to $400 per month. Because the majority of rent is government-guaranteed, your vacancy risk and collection risk are dramatically lower than with market-rate tenants. This guide covers how to evaluate whether Section 8 investing fits your ' },
      { text: 'portfolio strategy', href: '/blog/building-real-estate-portfolio' },
      { text: '.' },
    ]),

    h2('s803', 'How Section 8 Works for Landlords'),
    p('s804', 'The process starts when a tenant with a housing voucher finds your property and wants to rent it. You agree on a rental price (which must be at or below the FMR for your area). The PHA inspects the property to ensure it meets Housing Quality Standards (HQS) — a set of minimum habitability requirements covering safety, sanitation, and structural integrity. If the property passes inspection, the PHA approves the tenancy, signs a Housing Assistance Payment (HAP) contract with you, and begins depositing the subsidy portion of rent directly to your account.'),
    p('s805', 'The HAP contract protects both parties. It guarantees you receive the subsidy as long as the tenant remains in compliance with program rules and the property continues to meet HQS standards. The contract runs for one year and renews annually. The PHA conducts annual inspections to verify the property still meets standards. If you maintain the property properly, the subsidy continues indefinitely. This predictability is the core financial advantage — you have a long-term, government-backed income stream.'),

    h2('s806', 'Financial Advantages'),
    h3('s807', 'Guaranteed Partial Rent'),
    p('s808', 'The PHA pays its portion of the rent directly to you on a fixed schedule — typically the first of each month. This is not dependent on the tenant having a good month financially. The subsidy is government-funded and arrives regardless of the tenant\'s employment status, health, or personal circumstances. For most Section 8 tenancies, the PHA subsidy covers 70 to 100 percent of total rent. Collection risk on the PHA portion is essentially zero.'),

    h3('s809', 'Lower Vacancy'),
    p('s810', 'Demand for Section 8-accepted properties dramatically exceeds supply in most markets. HUD reports that only about 1 in 4 eligible families receives a voucher due to funding limitations, and voucher holders have 60 to 120 days to find a landlord who accepts Section 8. Many landlords refuse Section 8 tenants, which concentrates demand on the properties that do accept them. The result is that your Section 8 property fills faster and stays occupied longer than comparable market-rate properties. Average Section 8 tenant tenure is 4 to 7 years, compared to 1 to 2 years for market-rate tenants.'),

    h3('s811', 'Competitive Rental Rates'),
    p('s812', 'A common misconception is that Section 8 rents are below market. In many markets, HUD Fair Market Rents are at or near actual market rents — and in some lower-cost neighborhoods, FMR can actually exceed what the market-rate tenant pool would pay. This means Section 8 can generate premium rents in certain areas, particularly in C-class neighborhoods where the market-rate tenant pool has lower incomes but HUD FMR reflects metro-wide rental data.'),

    h2('s813', 'Property Requirements and Inspections'),
    pLink('s814', [
      { text: 'Your property must pass an HQS inspection before a Section 8 tenant can move in, and must pass annual re-inspections to maintain the HAP contract. HQS standards cover: working smoke detectors, no lead-based paint hazards (for pre-1978 properties), functioning plumbing, heating, and electrical systems, no structural defects or safety hazards, adequate sanitation (working toilet, sink, tub), proper ventilation and natural light, and secure locks on exterior doors and windows. These standards are not onerous for a well-maintained property — they represent basic habitability. If your property passes a standard home inspection, it will almost certainly pass HQS. The most common HQS failures are missing smoke detectors, chipped paint on pre-1978 properties, and minor plumbing issues — all inexpensive fixes.' },
    ]),

    h2('s815', 'Tenant Screening for Section 8'),
    pLink('s816', [
      { text: 'Having a voucher does not make someone a good tenant. You should screen Section 8 applicants with the same rigor you apply to market-rate applicants — credit check, criminal background, rental history, and references. The voucher guarantees a portion of rent, but the tenant\'s behavior, property care, and compliance with lease terms are still on them. Apply your ' },
      { text: 'tenant screening checklist', href: '/blog/how-to-screen-tenants' },
      { text: ' consistently. Fair Housing laws apply — you cannot discriminate based on source of income (including Section 8) in many states and localities, but you can apply the same screening criteria to all applicants.' },
    ]),

    h2('s817', 'Common Pitfalls'),
    p('s818', 'Bureaucratic delays are the biggest operational frustration. Initial inspections can take 2 to 6 weeks depending on PHA workload, during which the property sits vacant. Re-inspection failures can temporarily suspend rent payments until repairs are completed and verified. PHA staff turnover and communication gaps can create confusion. Build these timelines into your financial projections — the guaranteed income is worth the bureaucratic friction, but plan for it.'),
    p('s819', 'The tenant\'s portion of rent (their copay) can still be a collection challenge. While the PHA portion is guaranteed, the tenant portion is not. Some Section 8 tenants pay $0 in tenant copay (the subsidy covers the full rent), which eliminates this risk entirely. Others pay $100 to $400 per month, which is subject to the same collection risks as any other tenant payment. Target properties and rent levels where the tenant copay is minimal.'),

    h2('s820', 'Is Section 8 Right for You?'),
    pLink('s821', [
      { text: 'Section 8 is ideal for investors who prioritize cash flow stability over appreciation, who invest in B and C neighborhoods where the tenant pool is strongest, who maintain their properties well (HQS inspections reward good maintenance), and who have the patience to work within a government bureaucracy. It is less suitable for investors in A-class neighborhoods (where market-rate rents exceed FMR), for those who want to maximize rent growth (FMR adjustments lag market rents in hot markets), or for investors who are not willing to meet HQS standards consistently. For a balanced view of different approaches, explore our ' },
      { text: 'complete rental property investing guide', href: '/blog/rental-property-investing-complete-guide' },
      { text: '.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 4: Rental Property Insurance Guide
// ══════════════════════════════════════════════════════
const insuranceGuide = {
  _type: 'post',
  title: 'Rental Property Insurance: What Every Investor Needs to Know',
  slug: { _type: 'slug', current: 'rental-property-insurance-guide' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-06-25T10:00:00Z',
  excerpt: 'A complete guide to rental property insurance — what it covers, what it doesn\'t, how much it costs in 2026, umbrella policies, and how to protect your portfolio without overpaying.',
  seo: {
    metaTitle: 'Rental Property Insurance Guide for Investors | ProInvestorHub',
    metaDescription: 'Complete guide to rental property insurance. Learn about landlord policies, liability coverage, umbrella insurance, cost factors, and how to protect your investment portfolio.',
  },
  body: [
    p('in01', 'Rental property insurance is the most important expense in your investment budget that you hope never to use. A standard landlord insurance policy — technically called a dwelling fire or DP-3 policy — protects your investment property from physical damage, liability claims, and lost rental income. It is fundamentally different from a homeowner\'s policy, and using a homeowner\'s policy on a rental property can result in a denied claim when you need coverage most. Your lender requires it. Your financial survival may depend on it.'),
    p('in02', 'Insurance costs have risen dramatically since 2022, particularly in Florida, Louisiana, Texas, and other coastal and disaster-prone states. In some Florida markets, annual landlord insurance premiums have more than doubled, turning previously cash-flow-positive properties negative. Insurance is no longer a line item you can estimate at "1 percent of property value" and move on. It requires careful shopping, accurate risk assessment, and strategic decision-making about coverage levels and deductibles. This guide covers what you need to know to protect your portfolio without destroying your cash flow.'),

    h2('in03', 'Landlord Insurance vs. Homeowner Insurance'),
    p('in04', 'A landlord (DP-3) policy is designed for properties you do not live in. It covers the structure, your liability as a landlord, and lost rental income if the property becomes uninhabitable due to a covered event. It does not cover the tenant\'s personal belongings (that is their renter\'s insurance responsibility) or damage caused by the tenant\'s negligence. A homeowner\'s policy assumes you occupy the property — if your insurer discovers you are renting it out, they can deny claims or cancel the policy entirely. Never use a homeowner\'s policy on a rental property.'),

    h2('in05', 'What Landlord Insurance Covers'),
    h3('in06', 'Dwelling Coverage'),
    p('in07', 'Dwelling coverage pays to repair or replace the physical structure if it is damaged by covered perils — fire, wind, hail, lightning, falling objects, vandalism, and certain water damage. Coverage should equal the replacement cost of the structure (not the market value or the purchase price). Replacement cost is what it would cost to rebuild the structure at current material and labor prices. In 2026, construction costs run $150 to $300 per square foot depending on location and build quality. A 1,500-square-foot property with a replacement cost of $225,000 needs $225,000 in dwelling coverage.'),

    h3('in08', 'Liability Coverage'),
    p('in09', 'Liability coverage protects you if someone is injured on your property and sues you. A tenant slips on an icy walkway, a visitor falls through a rotten porch board, a child is injured by a defective railing — these are the scenarios liability coverage addresses. Standard landlord policies include $100,000 to $300,000 in liability coverage. This is almost always insufficient. A single serious injury lawsuit can result in judgments of $500,000 to $2 million or more. Increase your base liability to $300,000 to $500,000, and then add an umbrella policy for additional protection.'),

    h3('in10', 'Loss of Rental Income'),
    pLink('in11', [
      { text: 'If a covered event (fire, storm damage, etc.) makes your property uninhabitable, loss of rental income coverage pays the rent you would have collected during the repair period. This coverage is critical because a major repair can take 3 to 12 months, and without rental income you are paying the mortgage from personal funds. Most landlord policies provide 12 months of lost rental income coverage by default. Calculate whether that duration is sufficient using our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' to model the impact of lost income scenarios.' },
    ]),

    h2('in12', 'What Landlord Insurance Does NOT Cover'),
    p('in13', 'Standard landlord policies exclude flood damage (requires a separate flood policy through NFIP or private insurers), earthquake damage (requires a separate earthquake policy), sewer backup damage (available as an endorsement for $50 to $150 per year — add it), normal wear and tear, damage caused intentionally by the tenant, pest infestation, and acts of war or nuclear events. The most important exclusion for investors is flood. If your property is in a flood zone (or even near one), you need separate flood insurance. FEMA flood maps are publicly available — check them for every property you purchase.'),

    h2('in14', 'Umbrella Insurance'),
    pLink('in15', [
      { text: 'An umbrella policy provides liability coverage above and beyond your individual property policies. A $1 million umbrella policy costs $200 to $400 per year and covers claims that exceed your base policy limits across all your properties. A $2 million umbrella costs $300 to $600 per year. For the cost, umbrella insurance is the best protection available to rental property investors. Most insurance professionals recommend an umbrella policy equal to your net worth — if you have $1 million in total assets, carry $1 million in umbrella coverage. Combined with ' },
      { text: 'LLC protection', href: '/blog/real-estate-llc-rental-properties' },
      { text: ', umbrella insurance creates a strong liability shield around your portfolio.' },
    ]),

    h2('in16', 'How to Reduce Insurance Costs'),
    p('in17', 'Shop annually. Insurance pricing varies significantly between carriers, and your current carrier\'s renewal rate may not be competitive. Get quotes from at least three insurers every renewal period. Increase your deductible — moving from a $1,000 to a $2,500 deductible can reduce premiums by 10 to 20 percent. You self-insure the first $2,500 of any claim, which is manageable if you maintain proper reserves. Bundle policies with one carrier for multi-policy discounts. Improve the property — updated roofing, electrical, plumbing, and security systems can qualify for premium reductions. And avoid filing small claims — a claim history drives premiums up more than any other factor.'),

    h2('in18', 'Insurance in Your Deal Analysis'),
    pLink('in19', [
      { text: 'Always get an actual insurance quote before buying a property — especially in Florida, Louisiana, Texas, Oklahoma, and other high-risk states. A property that appears to cash flow at an estimated insurance cost of $1,200 per year may actually cost $3,500 per year to insure, turning the deal negative. Include the real insurance cost in your ' },
      { text: 'rental cash flow analysis', href: '/calculators/rental-cashflow' },
      { text: ' and your ' },
      { text: 'cap rate calculation', href: '/calculators/cap-rate' },
      { text: '. Insurance is not optional, and the cost varies too much by market and property to estimate — always use actual quotes.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [leverageGuide, realEstateVsStocks, section8Guide, insuranceGuide]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 6a Content Seed: Leverage, RE vs Stocks, Section 8, Insurance\n')

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
