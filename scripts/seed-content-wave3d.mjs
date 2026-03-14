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

const catStrategies = await getCategoryRef('Strategies', 'c1')
const catMarkets = await getCategoryRef('Markets', 'c1')

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
 * Each link gets a markDef entry and the span gets the mark applied.
 */
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
// POST 1: Building a Real Estate Portfolio
// ══════════════════════════════════════════════════════
const portfolioPost = {
  _type: 'post',
  title: 'Building a Real Estate Portfolio: From 1 to 10 Properties',
  slug: { _type: 'slug', current: 'building-real-estate-portfolio' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-03-31T10:00:00Z',
  excerpt: 'A step-by-step roadmap for scaling from your first rental to a 10+ property portfolio — including financing strategies, entity structuring, and performance tracking.',
  seo: {
    metaTitle: 'How to Build a Real Estate Portfolio: 1 to 10 Properties | ProInvestorHub',
    metaDescription: 'Step-by-step guide to building a real estate portfolio from scratch. Learn financing strategies at each stage, entity structuring, and portfolio performance metrics.',
  },
  body: [
    // ── Introduction ──
    h2('bp01', 'The Portfolio Mindset'),
    p('bp02', 'Real estate investing is not about buying a single rental property and collecting rent checks. It is about building a portfolio — a collection of income-producing assets that compound equity over time, accelerate your velocity of money, and generate truly passive income streams. The difference between someone who "owns a rental" and someone who "builds a portfolio" comes down to intention, systems, and strategy.'),
    p('bp03', 'Velocity of money is the concept that matters most here. Every dollar you invest should cycle back to you as quickly as possible so you can redeploy it into the next deal. A single rental might generate $300 per month in cash flow. A 10-property portfolio generating $300 per month each produces $3,000 monthly — and the equity growth compounds across all properties simultaneously.'),
    p('bp04', 'This guide walks you through the entire journey from property one to property ten and beyond. At each stage, the financing strategies change, the management demands shift, and the opportunities expand. Understanding what comes next allows you to make better decisions at every step.'),
    bq('bp05', 'The goal is not to own properties. The goal is to build a wealth-generating machine that works whether you show up or not.'),

    // ── Property 1 ──
    h2('bp06', 'Property 1: The Foundation'),
    p('bp07', 'Your first property is your education. Every mistake you make here costs less than it will at scale, and every lesson you learn pays dividends for the next nine acquisitions. The key is to start with a deal that generates positive cash flow from day one — even if the margin is thin.'),
    h3('bp08', 'Financing Your First Deal'),
    p('bp09', 'Conventional financing is your best tool for property one. An FHA loan requires just 3.5 percent down and allows you to purchase a property with up to four units as long as you live in one of them. This house hack strategy lets you live for free or near-free while building equity and landlord experience. If you prefer not to live in the property, a conventional loan with 20 percent down is the standard path. Interest rates on owner-occupied properties are significantly lower than investment property rates, which is why house hacking remains the most efficient entry point.'),
    h3('bp10', 'What to Buy'),
    p('bp11', 'For your first deal, simplicity wins. A single-family rental or a small multifamily (duplex, triplex, or fourplex) in a market you understand is ideal. Avoid the temptation to chase complex deals like commercial properties or heavy renovations. Your goal is to learn property management firsthand — screening tenants, handling maintenance calls, understanding lease agreements, and tracking income and expenses.'),
    pLink('bp12', [
      { text: 'Run the numbers before you buy using a ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: '. Target positive cash flow from day one, even if it is only $100 to $200 per month after all expenses. The cash flow is secondary to the education at this stage, but you should never start with a property that loses money.' },
    ]),

    // ── Properties 2-4 ──
    h2('bp13', 'Properties 2 Through 4: Building Momentum'),
    p('bp14', 'Once you have your first property stabilized with a paying tenant and predictable cash flow, the compounding begins. Properties two through four are where most investors find their rhythm and start building real momentum.'),
    h3('bp15', 'Using BRRRR to Recycle Capital'),
    pLink('bp16', [
      { text: 'The ' },
      { text: 'BRRRR method', href: '/blog/brrrr-method-complete-guide' },
      { text: ' — Buy, Rehab, Rent, Refinance, Repeat — is the most capital-efficient way to scale at this stage. You buy a distressed property below market value, renovate it to force appreciation, rent it out, then refinance at the new appraised value to pull your original capital back out. If executed correctly, you end up with a fully rented property with a mortgage and most or all of your cash returned to you for the next deal.' },
    ]),
    pLink('bp17', [
      { text: 'Use a ' },
      { text: 'BRRRR calculator', href: '/calculators/brrrr' },
      { text: ' to model your rehab budget, after-repair value, and refinance proceeds before committing to a deal. The math has to work on paper before it works in reality.' },
    ]),
    h3('bp18', 'Reinvesting Cash Flow'),
    p('bp19', 'Your first property is now generating cash flow. Rather than spending it, channel every dollar into your next down payment. If property one generates $300 per month, that is $3,600 per year toward your next acquisition. Combine that with savings from your day job and any capital recycled through BRRRR deals, and you can acquire one to two properties per year at this stage.'),
    h3('bp20', 'Building Systems Early'),
    p('bp21', 'This is the stage where systems become essential. Set up a dedicated business bank account for your rental income and expenses. Use accounting software to track every dollar — categorized by property. Create a maintenance request process so tenants know exactly how to report issues. Document your tenant screening criteria so every application is evaluated consistently. These systems feel like overkill at two properties, but they become lifesavers at five.'),
    p('bp22', 'Conventional loans are still available at this stage. Fannie Mae allows up to ten financed properties per borrower, so you have runway. Interest rates will be slightly higher on investment properties (typically 0.5 to 0.75 percent above owner-occupied rates), and you will need 20 to 25 percent down on each deal unless you are using BRRRR refinancing.'),

    // ── Properties 5-10 ──
    h2('bp23', 'Properties 5 Through 10: Scaling Operations'),
    p('bp24', 'At five properties, everything changes. The management burden crosses a threshold where self-management becomes a liability rather than a cost savings. The financing landscape shifts. And the strategic decisions you make here determine whether you build a portfolio that runs itself or one that runs you into the ground.'),
    h3('bp25', 'Professional Property Management'),
    pLink('bp26', [
      { text: 'Hiring a ' },
      { text: 'property manager', href: '/glossary/property-management' },
      { text: ' becomes essential at five or more units. A good property manager costs 8 to 10 percent of gross rent but pays for itself in reduced vacancy, faster maintenance response, better tenant screening, and — critically — your time back. At five properties, self-managing means you are running a part-time business. At ten properties, it is a full-time job. Unless property management IS your business, delegate it.' },
    ]),
    h3('bp27', 'DSCR Loans and Alternative Financing'),
    pLink('bp28', [
      { text: 'As you approach conventional loan limits, ' },
      { text: 'DSCR loans', href: '/blog/dscr-investor-financing-guide' },
      { text: ' become your primary financing tool. DSCR (Debt Service Coverage Ratio) loans qualify based on the property\'s income rather than your personal income. This is a game-changer for scaling because your debt-to-income ratio from your W-2 job becomes irrelevant. As long as the property\'s rental income covers the mortgage payment by a ratio of 1.0 to 1.25, the loan gets approved.' },
    ]),
    p('bp29', 'DSCR loans typically require 20 to 25 percent down and carry interest rates 1 to 2 percent higher than conventional loans. The trade-off is worth it: you can acquire properties without being constrained by personal income limits, and many DSCR lenders have no limit on the number of loans you can carry simultaneously.'),
    h3('bp30', 'Geographic Diversification'),
    p('bp31', 'Concentrating all ten properties in a single zip code exposes you to localized risk — a major employer closing, a natural disaster, or a shift in local housing policy. By properties five through ten, consider diversifying across two to three markets. This does not mean buying randomly across the country. Choose markets deliberately based on job growth, population trends, landlord-friendly laws, and rent-to-price ratios.'),

    // ── The 10+ Property Wall ──
    h2('bp32', 'The 10-Plus Property Wall'),
    p('bp33', 'Ten financed properties is where Fannie Mae draws the line for conventional loans. This is not the end of the road — it is a transition point. Your financing toolkit expands into commercial and portfolio territory, and your entity structure needs to mature.'),
    h3('bp34', 'Portfolio Loans and Commercial Financing'),
    pLink('bp35', [
      { text: '' },
      { text: 'Portfolio loans', href: '/glossary/portfolio-loan' },
      { text: ' are held by the originating bank rather than sold to Fannie Mae or Freddie Mac. This means the bank sets its own underwriting criteria. Local and regional banks are often the best sources for portfolio loans because they understand local markets and value long-term banking relationships. Terms are typically shorter (5 to 10 year balloons with 20 to 25 year amortization), and rates may be slightly higher, but there is no limit on the number of properties you can finance.' },
    ]),
    p('bp36', 'Commercial loans become relevant when you start acquiring larger multifamily properties (five or more units). These loans are underwritten based on the property\'s net operating income and are evaluated as business loans rather than consumer mortgages. The underwriting is more rigorous but the ceiling is much higher.'),
    h3('bp37', 'Entity Structuring'),
    p('bp38', 'At ten or more properties, holding everything in your personal name creates unacceptable liability exposure. Most investors at this scale use LLCs to hold their properties — either individual LLCs per property or a series LLC structure that provides liability separation between properties under a single parent entity. Consult a real estate attorney in your state, as LLC laws and series LLC availability vary significantly by jurisdiction.'),
    p('bp39', 'Some investors also consider forming a holding company that owns the individual property LLCs. This creates a clean organizational chart and can simplify banking relationships. The right structure depends on your state, your portfolio size, and your long-term goals. Do not try to figure this out alone — work with a CPA and attorney who specialize in real estate investing.'),
    h3('bp40', 'Syndication and Joint Ventures'),
    p('bp41', 'Beyond ten properties, many investors begin partnering with others. Joint ventures allow you to combine capital with partners on individual deals. Syndication is a more formal structure where you raise capital from passive investors to acquire larger properties. Both approaches let you scale beyond your personal capital constraints, but they come with legal requirements (especially syndication, which is regulated by the SEC) and relationship management complexity.'),

    // ── Portfolio Performance Metrics ──
    h2('bp42', 'Portfolio Performance Metrics'),
    p('bp43', 'Building a portfolio is meaningless if you are not tracking its performance. Establish a quarterly review cadence where you evaluate the entire portfolio — not just individual properties. The following metrics should be on your dashboard.'),
    pLink('bp44', [
      { text: 'Total Portfolio NOI: your combined ' },
      { text: 'net operating income', href: '/glossary/noi' },
      { text: ' across all properties. This is your top-line profitability metric. Track it monthly and look for trends. If total NOI is declining, diagnose whether the issue is rising expenses, falling rents, or increasing vacancy.' },
    ]),
    pLink('bp45', [
      { text: 'Average Cap Rate: the weighted average ' },
      { text: 'cap rate', href: '/calculators/cap-rate' },
      { text: ' across your portfolio tells you what return your properties are generating relative to their market value. If your average cap rate is declining over time, your properties are appreciating faster than your NOI is growing — which is not necessarily bad, but it changes your strategy.' },
    ]),
    p('bp46', 'Occupancy Rate: track your portfolio-wide occupancy rate. A healthy portfolio maintains 92 to 95 percent occupancy. Below 90 percent, you have a systemic problem — either your rents are above market, your properties need capital improvements, or your management is underperforming.'),
    pLink('bp47', [
      { text: 'Cash-on-Cash Return by Property: use a ' },
      { text: 'cash-on-cash calculator', href: '/calculators/cash-on-cash' },
      { text: ' to evaluate each property individually. Properties consistently underperforming your portfolio average are candidates for disposition or capital improvement. Properties outperforming deserve more capital allocation — consider refinancing to buy similar properties in the same market.' },
    ]),
    p('bp48', 'Equity Growth Rate: track how fast your total portfolio equity is growing from a combination of mortgage paydown, appreciation, and forced appreciation through renovations. This is your true wealth-building metric.'),
    p('bp49', 'Debt Coverage Ratio: your portfolio-wide DCR should stay above 1.25. This means your total rental income is at least 125 percent of your total debt service. Below 1.25, you are too tightly leveraged and a single vacancy or major repair could create a cash flow crisis.'),
    p('bp50', 'Total Monthly Cash Flow: the bottom line. After all expenses, debt service, property management fees, and reserves contributions, how much cash does your portfolio put in your pocket each month? Track this number obsessively. It is the most tangible measure of your portfolio\'s performance.'),

    // ── Common Scaling Mistakes ──
    h2('bp51', 'Common Scaling Mistakes'),
    p('bp52', 'The path from one to ten properties is littered with avoidable errors. Understanding these common mistakes before you encounter them can save you years of setbacks and hundreds of thousands of dollars.'),
    h3('bp53', 'Overleveraging'),
    pLink('bp54', [
      { text: 'The most dangerous mistake in portfolio building is excessive ' },
      { text: 'leverage', href: '/glossary/leverage' },
      { text: '. Keep your portfolio-wide loan-to-value ratio below 70 percent. This gives you a 30 percent equity cushion to absorb market downturns, vacancy spikes, and unexpected capital expenditures. Investors who leverage to 80 or 90 percent LTV across their portfolio are one bad year away from forced sales.' },
    ]),
    h3('bp55', 'Geographic Concentration'),
    p('bp56', 'Owning ten properties on the same street feels efficient until the neighborhood declines or a single event (plant closure, flood, rezoning) impacts all of them simultaneously. Diversify across neighborhoods, cities, or states as your portfolio grows. The management complexity of multiple markets is a worthwhile trade-off for reduced concentration risk.'),
    h3('bp57', 'Neglecting Reserves'),
    p('bp58', 'Every property should contribute $200 to $300 per unit per month to a capital reserve fund. This covers roof replacements, HVAC failures, unit turnovers, and other major expenses that are inevitable but unpredictable. Investors who skip reserves are borrowing from their future selves — and the bill always comes due at the worst possible time.'),
    h3('bp59', 'Self-Managing Too Many Properties'),
    p('bp60', 'There is a hero complex in real estate investing that says managing your own properties proves you are a "real" investor. In reality, self-managing beyond four or five properties usually means you are doing a mediocre job at property management while neglecting the higher-value work of deal sourcing, portfolio strategy, and relationship building. Hire a property manager and focus on being the CEO of your portfolio, not the maintenance coordinator.'),
    h3('bp61', 'Skipping Entity Structuring'),
    p('bp62', 'Holding multiple properties in your personal name exposes your entire net worth to liability from any single property. A slip-and-fall lawsuit at property three could put properties one through nine at risk. Set up proper entity structuring early — ideally before property three — and transfer properties into LLCs as you acquire them.'),

    // ── Action Plan ──
    h2('bp63', 'Your Portfolio Building Action Plan'),
    pLink('bp64', [
      { text: 'Building a real estate portfolio is a multi-year endeavor that rewards patience, discipline, and systematic execution. Start with property one using the best financing available to you. Master the fundamentals of tenant management and property operations. Then scale methodically — using tools like the ' },
      { text: 'BRRRR method', href: '/blog/brrrr-method-complete-guide' },
      { text: ' to recycle capital, DSCR loans to break through conventional limits, and professional management to buy back your time.' },
    ]),
    pLink('bp65', [
      { text: 'Use ProInvestorHub\'s ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' and ' },
      { text: 'cap rate calculator', href: '/calculators/cap-rate' },
      { text: ' to evaluate every deal before you buy. Track your portfolio metrics quarterly. And remember: the goal is not to own the most properties — it is to build the most efficient, highest-performing portfolio you can. Ten well-chosen properties can generate more wealth than fifty poorly chosen ones.' },
    ]),
    pLink('bp66', [
      { text: 'If you are just getting started, read our ' },
      { text: 'beginner\'s guide to real estate investing', href: '/blog/real-estate-investing-beginners-guide-2026' },
      { text: ' for the foundational knowledge you need before your first deal. And explore our ' },
      { text: 'glossary', href: '/glossary/leverage' },
      { text: ' for definitions of every term mentioned in this guide, including ' },
      { text: 'NOI', href: '/glossary/noi' },
      { text: ', ' },
      { text: '1031 exchanges', href: '/glossary/1031-exchange' },
      { text: ', and ' },
      { text: 'portfolio loans', href: '/glossary/portfolio-loan' },
      { text: '.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: Best Markets for Cash Flow in 2026
// ══════════════════════════════════════════════════════
const marketsPost = {
  _type: 'post',
  title: 'Best Markets for Cash Flow Real Estate Investing in 2026',
  slug: { _type: 'slug', current: 'best-cash-flow-markets-2026' },
  author: authorRef,
  categories: [catMarkets],
  publishedAt: '2026-04-03T10:00:00Z',
  excerpt: 'Data-driven analysis of the best U.S. markets for rental property cash flow in 2026 — plus the framework for evaluating any market yourself.',
  seo: {
    metaTitle: 'Best Cash Flow Real Estate Markets 2026 | ProInvestorHub',
    metaDescription: 'Data-driven guide to the best U.S. markets for cash flow investing in 2026. Includes rent-to-price ratios, population growth data, and a market evaluation framework.',
  },
  body: [
    // ── What Makes a Cash Flow Market ──
    h2('mk01', 'What Makes a Cash Flow Market'),
    p('mk02', 'Not all real estate markets are created equal for rental investors. Some markets reward you with strong monthly cash flow from day one. Others offer long-term appreciation but leave you writing checks every month to cover the mortgage. Understanding the difference — and knowing how to identify each — is the foundational skill of market selection.'),
    pLink('mk03', [
      { text: 'The single most important metric for identifying a ' },
      { text: 'cash flow', href: '/glossary/cash-flow' },
      { text: ' market is the rent-to-price ratio. This is calculated by dividing the monthly rent by the purchase price. A ratio above 0.7 percent indicates a strong cash flow market. Above 1.0 percent is exceptional. Below 0.5 percent means you are almost certainly buying for appreciation, not income.' },
    ]),
    p('mk04', 'Cash flow markets share several common characteristics: affordable home prices relative to rents, steady population growth driven by job creation, diversified economies that do not depend on a single employer or industry, landlord-friendly legal environments, and reasonable property tax and insurance costs. The best markets check all of these boxes.'),
    p('mk05', 'Appreciation markets — think San Francisco, New York, Los Angeles — offer the opposite profile: high home prices, relatively low rents (as a percentage of price), and the promise that property values will increase over time. These markets can work for investors with deep pockets and long time horizons, but they are poor choices for investors who need cash flow to cover expenses, build reserves, and fund future acquisitions.'),

    // ── Market Evaluation Framework ──
    h2('mk06', 'The Market Evaluation Framework'),
    p('mk07', 'Before diving into specific markets, you need a repeatable framework for evaluating any market. This six-factor scoring system gives you an objective way to compare cities and identify opportunities that match your investment criteria.'),
    h3('mk08', 'Factor 1: Rent-to-Price Ratio'),
    p('mk09', 'Calculate the median monthly rent divided by the median home price. Above 0.8 percent scores high, 0.6 to 0.8 percent scores medium, below 0.6 percent scores low. Data sources include Zillow Rent Index, Census American Community Survey, and local MLS data. This is your primary screen — if the rent-to-price ratio does not work, no amount of population growth or landlord-friendly laws will save the deal.'),
    h3('mk10', 'Factor 2: Population Growth Rate'),
    p('mk11', 'Growing populations create rental demand. Look for markets with consistent positive population growth over the past five to ten years and projections for continued growth. Census data and state demographic offices provide this data. Markets losing population face declining rents and increasing vacancy — avoid them regardless of how cheap properties appear.'),
    h3('mk12', 'Factor 3: Job Market Diversification'),
    p('mk13', 'A city built on a single industry is a ticking time bomb for landlords. When that industry contracts, tenants lose jobs, move away, and stop paying rent. Look for markets with diverse employment across healthcare, education, government, technology, manufacturing, and services. Bureau of Labor Statistics data and local economic development reports provide employment breakdowns by sector.'),
    h3('mk14', 'Factor 4: Landlord-Tenant Law Favorability'),
    p('mk15', 'Some states make it easy to operate as a landlord. Others make it nearly impossible to evict non-paying tenants, impose rent control, or require extensive (and expensive) tenant protections. Generally, southeastern and midwestern states are more landlord-friendly, while northeastern and west coast states favor tenants. Research eviction timelines, security deposit rules, and rent control laws before entering any market.'),
    h3('mk16', 'Factor 5: Property Tax Rate'),
    p('mk17', 'Property taxes are your largest non-mortgage expense and they vary dramatically by location. Texas markets offer strong cash flow but property tax rates of 2.0 to 2.5 percent can eat into returns. Ohio and Indiana markets often have rates below 1.5 percent. Always factor the actual property tax rate into your cash flow analysis — not a national average.'),
    h3('mk18', 'Factor 6: Insurance Costs'),
    p('mk19', 'Insurance costs have spiked in many markets due to climate-related risks. Florida, Louisiana, and coastal Texas markets now have insurance premiums two to four times the national average. This does not make them uninvestable, but you must account for the true cost. Inland markets in the Midwest and Southeast generally have the lowest insurance costs, which directly improves cash flow.'),

    // ── Top 10 Markets ──
    h2('mk20', 'Top 10 Markets for Cash Flow in 2026'),
    p('mk21', 'The following markets stand out for their combination of strong rent-to-price ratios, population growth, economic diversification, and investor-friendly environments. These are not the only cash flow markets in America, but they represent the best balance of return potential and risk mitigation heading into 2026.'),

    h3('mk22', '1. Cleveland, Ohio'),
    p('mk23', 'Cleveland consistently ranks among the best cash flow markets in the country. With a median home price around $100,000 and median rents near $1,000, the rent-to-price ratio approaches 1.0 percent — exceptional by any standard. The Cleveland Clinic and University Hospitals provide stable healthcare employment, and the cost of living keeps tenant turnover low. Property taxes are moderate and Ohio landlord-tenant law is balanced. Entry costs are low enough that investors can acquire multiple properties quickly.'),

    h3('mk24', '2. Detroit, Michigan'),
    p('mk25', 'Detroit offers some of the highest rent-to-price ratios in the country, with ratios frequently exceeding 1.1 percent in stable neighborhoods. The city\'s revitalization over the past decade has been remarkable — billions in investment, growing population in the urban core, and a diversifying economy beyond automotive. The key is neighborhood selection: stick to areas with established rental demand and avoid speculative plays in unproven neighborhoods. Insurance costs are higher than the Midwest average but manageable.'),

    h3('mk26', '3. Memphis, Tennessee'),
    p('mk27', 'Memphis has been a turnkey rental investor favorite for over a decade, and for good reason. Rent-to-price ratios around 0.9 percent, strong institutional rental demand from FedEx and healthcare employers, no state income tax, and landlord-friendly laws make it one of the most straightforward markets for cash flow investing. The turnkey rental infrastructure in Memphis is well-developed, making it an excellent choice for out-of-state investors.'),

    h3('mk28', '4. Indianapolis, Indiana'),
    p('mk29', 'Indianapolis combines Midwestern affordability with genuine economic diversification. The rent-to-price ratio sits around 0.85 percent, and the economy spans healthcare (Eli Lilly, IU Health), logistics, technology, and government. Indiana is a landlord-friendly state with reasonable eviction timelines. Property taxes are moderate and insurance costs are low. The Indianapolis rental market is deep enough to support both single-family and small multifamily strategies.'),

    h3('mk30', '5. Birmingham, Alabama'),
    p('mk31', 'Birmingham offers one of the lowest entry points among major metros. With rent-to-price ratios near 0.9 percent and median home prices well below $150,000, investors can build a diversified portfolio with relatively modest capital. The University of Alabama at Birmingham is a major employer, and the city\'s healthcare and financial services sectors provide economic stability. Alabama is a landlord-friendly state with low property taxes.'),

    h3('mk32', '6. Kansas City, Missouri'),
    p('mk33', 'Kansas City straddles the line between cash flow market and growth market — and that is what makes it attractive. Rent-to-price ratios around 0.8 percent provide solid cash flow, while population growth and economic expansion offer appreciation upside. The metro area spans Missouri and Kansas, giving investors flexibility in tax and regulatory environments. Major employers span tech, healthcare, government, and logistics.'),

    h3('mk34', '7. St. Louis, Missouri'),
    p('mk35', 'St. Louis is one of the most undervalued markets in America. Rent-to-price ratios around 0.85 percent, a diversified economy anchored by healthcare (BJC, SSM Health), defense (Scott Air Force Base), and financial services (Edward Jones), and median home prices below $200,000 create strong cash flow fundamentals. The market has been overlooked by institutional investors, which keeps prices affordable for individual investors.'),

    h3('mk36', '8. Columbus, Ohio'),
    p('mk37', 'Columbus is Ohio\'s growth story. Unlike Cleveland and other Rust Belt cities, Columbus has seen consistent population growth driven by Ohio State University, a burgeoning tech sector, and a diversified economy. Rent-to-price ratios around 0.75 percent are slightly lower than other markets on this list, but the appreciation potential and economic growth offset the thinner cash flow margins. Strong rental demand from the university keeps vacancy rates low.'),

    h3('mk38', '9. Jacksonville, Florida'),
    p('mk39', 'Jacksonville is Florida\'s best cash flow market. While Miami, Tampa, and Orlando have seen prices appreciate beyond cash flow viability, Jacksonville maintains rent-to-price ratios around 0.7 percent with strong population growth. The city is a major military and logistics hub, and Florida\'s lack of state income tax benefits landlords directly. Insurance costs are higher than inland markets — factor in hurricane coverage when running your numbers.'),

    h3('mk40', '10. San Antonio, Texas'),
    p('mk41', 'San Antonio offers a rare combination in Texas: cash flow viability. While Austin and Dallas have appreciated beyond easy cash flow, San Antonio maintains rent-to-price ratios around 0.7 percent. The military (Joint Base San Antonio is the largest military installation in the Department of Defense), healthcare, and a growing tech sector provide employment stability. Texas has no state income tax but high property taxes (2.0 to 2.2 percent), so run your numbers carefully.'),

    // ── Emerging Markets ──
    h2('mk42', 'Emerging Markets to Watch'),
    p('mk43', 'Beyond the established cash flow markets, several emerging cities deserve your attention. These markets offer exceptional rent-to-price ratios, growing economies, and have not yet been discovered by institutional investors.'),
    p('mk44', 'Huntsville, Alabama is experiencing explosive growth driven by NASA, defense contractors, and the Mazda-Toyota manufacturing plant. The city\'s tech and engineering workforce creates strong rental demand, and entry prices remain affordable. Rent-to-price ratios above 0.85 percent are common.'),
    p('mk45', 'Tulsa, Oklahoma has invested heavily in attracting remote workers through the Tulsa Remote program, offering $10,000 incentives for relocation. The city\'s energy sector has diversified into renewable energy and aerospace. Low property taxes and landlord-friendly laws make Tulsa an attractive cash flow play.'),
    p('mk46', 'Dayton, Ohio offers some of the highest rent-to-price ratios in the country — frequently exceeding 1.0 percent. Wright-Patterson Air Force Base is the largest single-site employer in Ohio, providing stable, long-term rental demand. Home prices are among the lowest on this list, enabling rapid portfolio building.'),
    p('mk47', 'Little Rock, Arkansas combines government employment (state capital), healthcare, and logistics employment with very low entry costs. Rent-to-price ratios above 0.85 percent and Arkansas landlord-friendly laws make it a compelling option for investors seeking maximum cash flow.'),

    // ── Markets to Approach Carefully ──
    h2('mk48', 'Markets to Approach with Caution'),
    p('mk49', 'Not every market works for cash flow investing. High-cost coastal metros present challenges that make positive cash flow extremely difficult to achieve without enormous down payments.'),
    p('mk50', 'San Francisco, New York City, and Los Angeles all have rent-to-price ratios below 0.4 percent — meaning the rent collected covers a much smaller portion of the purchase price. Add rent control regulations (in effect in all three cities), high property taxes, expensive insurance, and tenant-friendly eviction laws, and the cash flow math becomes nearly impossible. These markets can work for appreciation plays, but expecting monthly cash flow is unrealistic for most investors.'),
    p('mk51', 'Other markets to evaluate carefully include coastal Florida (insurance costs have tripled in some areas), New Orleans (insurance plus flood risk), and markets heavily dependent on a single employer or industry. Always stress-test your numbers: what happens if rent drops 10 percent, vacancy increases to 10 percent, or a major repair hits? If the deal cannot survive a moderate downturn, the market is too expensive for cash flow investing.'),

    // ── Out-of-State Investing ──
    h2('mk52', 'Out-of-State Investing Logistics'),
    pLink('mk53', [
      { text: 'If the best cash flow markets are not where you live, you will need to invest out of state. This is increasingly common and entirely manageable with the right systems. The cornerstone is professional ' },
      { text: 'property management', href: '/glossary/property-management' },
      { text: '. Budget 8 to 10 percent of gross rent for management fees, and vet property management companies thoroughly before committing. Ask for their current vacancy rate, average time to fill a unit, eviction rate, and maintenance markup policy.' },
    ]),
    p('mk54', 'Build your local team before buying your first property in any new market. You need a real estate agent who works with investors (not just homebuyers), a reliable contractor for inspections and minor repairs, and a property management company. Many investors also establish relationships with local lenders who specialize in investment properties.'),
    p('mk55', 'Plan at least one due diligence trip to any new market before your first purchase. Drive the neighborhoods, visit properties, meet your team in person, and get a feel for the rental demand. After your first acquisition, you can manage subsequent purchases remotely, but that initial boots-on-the-ground visit is invaluable.'),
    p('mk56', 'Remote monitoring tools have made out-of-state investing significantly easier. Smart locks, security cameras, moisture sensors, and property management software provide real-time visibility into your properties from anywhere. These are not luxuries — they are essential tools for the remote investor.'),

    // ── Analyze Any Market Yourself ──
    h2('mk57', 'How to Analyze Any Market Yourself'),
    pLink('mk58', [
      { text: 'You do not need to rely on lists like this one. With the right tools and data, you can evaluate any market in America for cash flow viability. Start by identifying the median home price and median rent in your target market using Zillow, Census data, or local MLS reports. Calculate the rent-to-price ratio. If it is above 0.7 percent, proceed with deeper analysis.' },
      { text: '' },
    ]),
    pLink('mk59', [
      { text: 'Next, model a specific deal using the ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: '. Input the median home price, expected rent, local property tax rate, insurance estimate, and management fees. The calculator will show you projected monthly cash flow, annual cash-on-cash return, and key operating metrics. Run three scenarios: optimistic, realistic, and pessimistic. If the deal cash flows in the pessimistic scenario, the market passes the test.' },
    ]),
    pLink('mk60', [
      { text: 'Evaluate the ' },
      { text: 'cap rate', href: '/calculators/cap-rate' },
      { text: ' for the market by dividing the annual NOI (rent minus operating expenses, excluding mortgage) by the property price. Cap rates above 7 percent indicate strong cash flow potential. Between 5 and 7 percent is moderate. Below 5 percent suggests an appreciation-focused market.' },
    ]),
    pLink('mk61', [
      { text: 'Finally, calculate the ' },
      { text: 'cash-on-cash return', href: '/calculators/cash-on-cash' },
      { text: ' — your annual pre-tax cash flow divided by the total cash you invested (down payment, closing costs, and any rehab). A cash-on-cash return above 8 percent is strong. Above 12 percent is exceptional. This metric tells you how hard your actual invested dollars are working compared to alternatives like index funds or bonds.' },
    ]),
    pLink('mk62', [
      { text: 'For a deeper dive into rental analysis methodology, read our guide on ' },
      { text: 'how to analyze a rental property', href: '/blog/how-to-analyze-rental-property' },
      { text: '. And explore the complete ' },
      { text: 'rental property investing guide', href: '/blog/rental-property-investing-complete-guide' },
      { text: ' for strategies on building a portfolio across multiple markets.' },
    ]),

    // ── Conclusion ──
    h2('mk63', 'Finding Your Market'),
    p('mk64', 'The best cash flow market is the one that matches your capital, risk tolerance, and investment goals. A Cleveland investor with $50,000 to deploy faces a different opportunity set than a San Antonio investor with $200,000. Both can build wealth through rental real estate — they just need to choose markets where the math works in their favor.'),
    pLink('mk65', [
      { text: 'Focus on fundamentals: rent-to-price ratio, population growth, job diversification, and landlord-friendly laws. Run every deal through a ' },
      { text: 'cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' before making an offer. Build a local team you trust. And remember that the best time to invest in a cash flow market is before everyone else discovers it. The emerging markets on this list will not stay under the radar forever.' },
    ]),
    pLink('mk66', [
      { text: 'Explore our glossary for definitions of key terms like ' },
      { text: 'cash flow', href: '/glossary/cash-flow' },
      { text: ', ' },
      { text: 'cap rate', href: '/glossary/cap-rate' },
      { text: ', ' },
      { text: 'vacancy rate', href: '/glossary/vacancy-rate' },
      { text: ', ' },
      { text: 'appreciation', href: '/glossary/appreciation' },
      { text: ', and ' },
      { text: 'property management', href: '/glossary/property-management' },
      { text: '.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [portfolioPost, marketsPost]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 3d Content Seed: 2 blog posts\n')

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
