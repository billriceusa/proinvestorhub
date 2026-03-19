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
const catGettingStarted = await getCategoryRef('Getting Started', 'c2')
const catDealAnalysis = await getCategoryRef('Deal Analysis', 'c3')

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
// POST 5: Turnkey Rental Properties
// ══════════════════════════════════════════════════════
const turnkeyRentals = {
  _type: 'post',
  title: 'Turnkey Rental Properties: The Passive Investor\'s Guide',
  slug: { _type: 'slug', current: 'turnkey-rental-properties-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-06-01T10:00:00Z',
  excerpt: 'Everything you need to know about turnkey rental properties — how they work, the pros and cons, how to evaluate turnkey providers, expected returns, and red flags to watch for.',
  seo: {
    metaTitle: 'Turnkey Rental Properties: Complete Passive Investor Guide | ProInvestorHub',
    metaDescription: 'Complete guide to turnkey rental investing. Learn how turnkey properties work, expected returns (6-10% cash-on-cash), how to vet providers, common pitfalls, and alternatives.',
  },
  body: [
    p('tk01', 'Turnkey rental properties are the closest thing to a "set it and forget it" real estate investment. A turnkey provider acquires a distressed property, fully renovates it to rental-ready condition, places a tenant, and sells the stabilized property to an investor — often with property management already in place. You buy a property that is already cash-flowing from day one, with no renovation project to manage, no tenant to find, and no property manager to hire. The hard work has been done for you.'),
    pLink('tk02', [
      { text: 'The appeal is obvious, especially for investors who want rental property exposure without the time commitment of finding, renovating, and managing properties themselves. High-income professionals, out-of-state investors, and anyone who values their time more than the potential savings of doing it themselves are the natural turnkey audience. But the convenience comes at a cost — turnkey properties are priced at a premium because the provider needs to profit on the renovation, and the returns are typically lower than what a hands-on investor can achieve through strategies like ' },
      { text: 'BRRRR', href: '/blog/brrrr-method-complete-guide' },
      { text: '. This guide helps you evaluate whether turnkey investing is right for you and how to do it well if you decide to proceed.' },
    ]),

    h2('tk03', 'How Turnkey Investing Works'),
    p('tk04', 'The turnkey model has three participants: the provider (who sources, renovates, and sells the property), the investor (who buys the finished product), and the property manager (often a company owned by or affiliated with the turnkey provider). The provider profits from the spread between their acquisition and renovation cost and the sale price to you. A provider might buy a distressed property for $80,000, spend $30,000 on renovation, and sell it to you for $140,000 to $160,000. That $30,000 to $50,000 spread is their profit — and it is the premium you pay for the convenience of a turnkey product.'),
    pLink('tk05', [
      { text: 'As an investor, you finance the purchase (typically with a conventional investment property loan requiring 20 to 25 percent down), receive a property that is already rented and generating income, and begin collecting rent checks through the property manager. Your ' },
      { text: 'cash-on-cash return', href: '/calculators/cash-on-cash' },
      { text: ' on a well-selected turnkey property typically ranges from 6 to 10 percent — lower than a BRRRR deal or a value-add renovation, but achieved with dramatically less effort and risk.' },
    ]),

    h2('tk06', 'Pros of Turnkey Investing'),
    p('tk07', 'Immediate cash flow is the primary advantage. There is no renovation period, no vacancy while you find a tenant, and no ramp-up time. The property generates income from the day you close. This makes turnkey properties ideal for investors who need their capital working immediately. Passive management is the second advantage. The property manager handles tenant communications, maintenance requests, rent collection, and lease renewals. Your involvement is limited to reviewing monthly statements and making decisions on major repairs or vacancies.'),
    p('tk08', 'Out-of-state accessibility is a significant benefit. Turnkey providers operate in markets with strong rental fundamentals — often Midwest and Southeast markets like Indianapolis, Memphis, Kansas City, Cleveland, and Birmingham — where an investor based in a high-cost coastal market can buy cash-flowing properties at price points that would be impossible locally. And scalability is easier with turnkey: once you have a trusted provider and property manager, adding properties to your portfolio is a repeatable, systematic process.'),

    h2('tk09', 'Cons and Risks'),
    p('tk10', 'The premium pricing is the most significant drawback. You are paying retail (or above retail) for a property that the provider bought at a wholesale price. This compressed margin means your returns are lower and you have less equity cushion if the market declines. On a turnkey property purchased for $150,000, your actual equity position after closing may be only $5,000 to $15,000 above the resale value — meaning if you need to sell quickly, you could break even or lose money after transaction costs.'),
    p('tk11', 'Renovation quality varies dramatically between providers. Some turnkey companies do thorough, code-compliant renovations with quality materials. Others do cosmetic "lipstick" renovations — new paint and flooring over aging mechanicals, old roofs, and outdated plumbing. The difference is invisible in photos but becomes painfully apparent within 1 to 3 years when expensive systems start failing. This is why due diligence on the provider is more important than due diligence on any individual property.'),
    p('tk12', 'Property management conflicts of interest exist when the provider owns the management company. The provider has an incentive to sell you the property; the manager has an incentive to retain you as a client. These incentives can conflict with your interests when the property underperforms. Some provider-affiliated managers are excellent. Others prioritize retention over performance, tolerating bad tenants, deferring maintenance, and masking problems to keep you from leaving. Get references from investors who have worked with the provider for 3 or more years, not just recent buyers.'),

    h2('tk13', 'How to Evaluate Turnkey Providers'),
    p('tk14', 'The provider is your most important decision. A great provider with a mediocre property is better than a mediocre provider with a great-looking property. Evaluate providers on track record (how many properties have they sold, how long have they been operating, what do long-term customers say), renovation standards (do they have a written renovation scope, do they use licensed contractors, do they pull permits for all work), transparency (will they share the acquisition price, the renovation cost, and the inspection report), tenant placement (what are their screening criteria, what is their historical vacancy rate, what is average tenant tenure), and property management performance (what is the eviction rate, average days to re-rent, maintenance response time, and investor turnover rate).'),
    p('tk15', 'Red flags include providers who refuse to share renovation scopes or allow independent inspections, properties priced significantly above comparable sales in the neighborhood, guaranteed rent programs (the provider guarantees a specific rent amount regardless of occupancy — this is often a sign that the property is overpriced and the "guarantee" is built into the purchase price), and high-pressure sales tactics. The best turnkey providers are the ones who encourage you to do your own due diligence and who can provide references from investors who bought properties 3 to 5 years ago.'),

    h2('tk16', 'Analyzing a Turnkey Deal'),
    pLink('tk17', [
      { text: 'Even though the property is "turnkey," you must still run the numbers independently. Do not rely on the provider\'s pro forma — build your own. Use our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' with these inputs: actual comparable rents in the neighborhood (not the provider\'s estimate), a vacancy rate of 8 to 10 percent (higher than the provider will quote), property management at 8 to 10 percent of gross rent, maintenance at 10 percent of gross rent, capital expenditure reserves at 5 to 8 percent of gross rent, insurance at actual quoted rates, and property taxes at the current assessed rate (which may increase after your purchase). If the deal still cash flows with these conservative assumptions, it is likely a solid investment.' },
    ]),

    h2('tk18', 'Turnkey vs. DIY: Which Is Right for You?'),
    pLink('tk19', [
      { text: 'The turnkey vs. DIY decision comes down to time, expertise, and return expectations. If you earn a high income, have limited time, and are willing to accept 6 to 8 percent returns in exchange for true passivity, turnkey is a reasonable strategy. If you have more time than capital, enjoy the process of finding and improving properties, and want to maximize returns, a hands-on approach using strategies like ' },
      { text: 'BRRRR', href: '/blog/brrrr-method-complete-guide' },
      { text: ' or ' },
      { text: 'house hacking', href: '/blog/house-hacking-101-live-for-free' },
      { text: ' will generate higher returns per dollar invested. Many investors start with turnkey to get their first few properties producing income, then transition to value-add strategies as they gain confidence and market knowledge.' },
    ]),

    h2('tk20', 'The Bottom Line'),
    pLink('tk21', [
      { text: 'Turnkey investing is a legitimate, scalable strategy for building a rental portfolio without the time commitment of active investing. The key is choosing the right provider, running your own numbers with conservative assumptions, and going in with realistic return expectations. It is not the highest-return strategy in real estate, but for investors who prioritize passivity and immediate cash flow, it is one of the most accessible paths to ' },
      { text: 'building a real estate portfolio', href: '/blog/building-real-estate-portfolio' },
      { text: '.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 6: Property Management — DIY vs Hiring
// ══════════════════════════════════════════════════════
const propertyManagement = {
  _type: 'post',
  title: 'Property Management: DIY vs. Hiring a Manager — The Complete Decision Guide',
  slug: { _type: 'slug', current: 'property-management-diy-vs-hiring' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-06-04T10:00:00Z',
  excerpt: 'Should you self-manage your rental properties or hire a property manager? This guide covers costs, time commitment, breakeven analysis, and when to make the switch.',
  seo: {
    metaTitle: 'Property Management: DIY vs. Hiring a Manager | ProInvestorHub',
    metaDescription: 'Complete guide to the DIY vs. property manager decision. Learn the true costs, time commitment, breakeven analysis, how to find good managers, and when to make the transition.',
  },
  body: [
    p('pm01', 'Every rental property investor faces this decision: manage the property yourself or hire a professional property manager. It is one of the most consequential choices you will make because it affects your cash flow, your time, your stress level, and ultimately your ability to scale your portfolio. The right answer is not universal — it depends on your portfolio size, your proximity to the properties, your experience level, and how you value your time.'),
    pLink('pm02', [
      { text: 'The property management fee — typically 8 to 10 percent of gross rent — is the number that stops most new investors from hiring a manager. On a $1,500 per month rental, that is $120 to $150 per month. On a property that only cash flows $200 to $300 per month, giving up $150 to management feels like surrendering half your income. But this analysis misses the full picture. Self-management has real costs too — your time, your stress, and your opportunity cost of not using that time to find the next deal. This guide walks through the complete decision framework so you can make the right choice for your ' },
      { text: 'rental property portfolio', href: '/blog/building-real-estate-portfolio' },
      { text: '.' },
    ]),

    h2('pm03', 'What Property Managers Actually Do'),
    p('pm04', 'A property manager handles the day-to-day operations of your rental property. This includes marketing vacant units and showing the property to prospective tenants, screening applicants (credit checks, background checks, income verification, rental history), executing lease agreements, collecting rent and enforcing late fees, handling maintenance requests and coordinating repairs, conducting periodic property inspections, managing lease renewals and rent increases, handling tenant complaints and disputes, managing the eviction process when necessary, and providing monthly financial statements.'),
    pLink('pm05', [
      { text: 'For most investors, the highest-value functions are tenant placement and maintenance coordination. ' },
      { text: 'Screening tenants properly', href: '/blog/how-to-screen-tenants' },
      { text: ' requires access to screening services, knowledge of Fair Housing laws, and the discipline to enforce consistent criteria. Maintenance coordination requires a network of reliable contractors who respond quickly and charge fair prices. Both of these functions benefit significantly from experience and scale — a manager who oversees 200 units has better contractor relationships, better screening data, and better systems than a landlord managing 2 units.' },
    ]),

    h2('pm06', 'The True Cost of Self-Management'),
    p('pm07', 'Self-management is not free. It costs time. Estimate 3 to 5 hours per property per month for routine management — more during vacancies, maintenance events, or tenant issues. For a single property, that might be manageable. For 5 properties, it is 15 to 25 hours per month — a significant part-time job. And the time is not predictable. The emergency call comes at 11 PM on a Saturday, not during a convenient weekday hour.'),
    p('pm08', 'Self-management also has financial costs that are less obvious. Without established contractor relationships, you likely pay higher prices for maintenance and repairs. Without professional leasing systems, vacancies may take longer to fill — each week of vacancy on a $1,500 rental costs you $375. Without proper accounting systems, you may miss tax deductions or make bookkeeping errors. And without the legal knowledge that experienced managers accumulate, you face higher risk of Fair Housing violations, improper eviction procedures, or security deposit disputes.'),

    h2('pm09', 'Property Manager Fee Structures'),
    p('pm10', 'Management fees vary by market and company, but here are the standard components. Monthly management fee is 8 to 10 percent of collected rent (not gross rent — you do not pay management fees on vacant units). Tenant placement fee is 50 to 100 percent of one month\'s rent, charged when a new tenant is placed. Lease renewal fee is $100 to $300, charged when an existing tenant renews their lease. Maintenance markup is 0 to 20 percent above contractor costs — some managers pass through contractor invoices at cost, others add a coordination markup. Eviction management fee is $200 to $500 in addition to legal costs.'),
    pLink('pm11', [
      { text: 'The total annual cost of property management on a $1,500 per month rental with 5 percent vacancy and one tenant turnover per year is approximately $3,500 to $4,500 (management fees plus placement fee). On a property with a ' },
      { text: 'cash-on-cash return', href: '/calculators/cash-on-cash' },
      { text: ' of 10 percent before management and a total cash investment of $40,000, management reduces your return to approximately 7 to 8 percent. Whether that reduction is worth the time savings depends entirely on your personal situation.' },
    ]),

    h2('pm12', 'The Breakeven Analysis: When Hiring Makes Financial Sense'),
    p('pm13', 'Here is a framework for the decision. Calculate your effective hourly rate at your day job or business. If you earn $100,000 per year and work 2,000 hours, your effective rate is $50 per hour. Self-managing one property takes approximately 5 hours per month, costing you $250 per month in opportunity cost. If the property management fee is $150 per month, hiring a manager is actually cheaper than self-managing when measured against your earning potential. This analysis becomes even more compelling when you consider that those 5 hours per month spent self-managing could instead be spent analyzing deals, networking, or working on your portfolio strategy.'),
    p('pm14', 'The breakeven typically occurs at 3 to 5 properties for most investors. Below 3 properties, the fixed costs of management setup and the placement fees may not justify the time savings. Above 5 properties, self-management becomes a part-time job that competes directly with your primary income source. The exact breakeven depends on your income level, your proximity to the properties, and your tolerance for the operational aspects of landlording.'),

    h2('pm15', 'How to Find a Good Property Manager'),
    p('pm16', 'Not all property managers are equal. A bad property manager is worse than no property manager — they collect fees while providing minimal service, defer maintenance, tolerate bad tenants, and erode your returns. Screen property managers with the same rigor you screen tenants. Interview at least three companies. Ask for references from current clients and call them. Review their management agreement carefully — look for auto-renewal clauses, early termination fees, and vague language around maintenance markups.'),
    p('pm17', 'The best indicators of a quality property manager are low vacancy rates (how quickly they fill units compared to market average), low eviction rates (good screening prevents evictions), tenant retention rates (good management keeps tenants longer), response time (how quickly they respond to maintenance requests), and financial transparency (clear, detailed monthly statements with supporting documentation). Ask each candidate for their numbers on these metrics. A manager who cannot provide them is not tracking performance — which means they are not optimizing it.'),

    h2('pm18', 'When to Make the Transition'),
    p('pm19', 'Many investors start self-managing and transition to professional management as their portfolio grows. The right time to transition is when self-management starts affecting your ability to grow (you are spending so much time managing that you cannot analyze new deals), when you acquire out-of-state properties (remote self-management is difficult and risky), when you experience a major management failure (a bad eviction, a maintenance disaster, a Fair Housing complaint) that a professional could have prevented, or when your portfolio reaches the breakeven point where management fees are justified by the time savings.'),
    p('pm20', 'The transition does not have to be all-or-nothing. Some investors self-manage local properties and hire managers for out-of-state holdings. Others hire managers for the most management-intensive properties (older properties with more maintenance needs) and self-manage newer, lower-maintenance properties. Design the arrangement that maximizes your returns and minimizes your stress.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 7: Real Estate Crowdfunding Guide
// ══════════════════════════════════════════════════════
const crowdfundingGuide = {
  _type: 'post',
  title: 'Real Estate Crowdfunding: How to Invest Without Buying Property',
  slug: { _type: 'slug', current: 'real-estate-crowdfunding-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-06-08T10:00:00Z',
  excerpt: 'A complete guide to real estate crowdfunding — how platforms work, accredited vs. non-accredited options, expected returns, fees, risks, and how to evaluate crowdfunding investments.',
  seo: {
    metaTitle: 'Real Estate Crowdfunding Guide: Invest Without Buying Property | ProInvestorHub',
    metaDescription: 'Complete guide to real estate crowdfunding. Compare platforms (Fundrise, RealtyMogul, CrowdStreet), learn about returns, fees, risks, and how to build a diversified portfolio.',
  },
  body: [
    p('cf01', 'Real estate crowdfunding has democratized access to institutional-quality real estate investments. Before crowdfunding platforms emerged in the early 2010s, investing in commercial real estate, multifamily apartment complexes, or development projects required hundreds of thousands of dollars in capital, industry connections, and the ability to evaluate complex deal structures. Today, platforms like Fundrise, RealtyMogul, and CrowdStreet allow individual investors to participate in these deals with minimums as low as $10 — fundamentally changing who can access real estate returns.'),
    p('cf02', 'Crowdfunding is not a replacement for direct property ownership. It is a complement. Direct ownership gives you control, tax benefits, and the ability to force appreciation through improvements. Crowdfunding gives you diversification, passive income, access to asset classes you could not invest in directly, and the ability to deploy capital without the operational demands of being a landlord. Understanding where crowdfunding fits in your overall investment strategy is the key to using it effectively.'),

    h2('cf03', 'How Real Estate Crowdfunding Works'),
    p('cf04', 'Real estate crowdfunding platforms pool capital from multiple investors to fund real estate projects or portfolios. There are two primary models. In the fund model, you invest in a diversified fund managed by the platform. Your capital is spread across multiple properties, and you receive quarterly or monthly distributions based on the fund\'s overall performance. Fundrise\'s eREITs and eFunds are the most well-known example. You have minimal control over individual property selection — the fund managers make those decisions. In the individual deal model, the platform lists specific investment opportunities — a multifamily acquisition in Dallas, a ground-up development in Denver, a commercial building renovation in Atlanta — and you choose which deals to invest in. CrowdStreet, RealtyMogul, and EquityMultiple primarily use this model for accredited investors.'),
    p('cf05', 'Both models offer two types of returns: income (rental income or interest payments distributed to investors) and appreciation (profit from selling the property or fund shares at a higher value). Debt investments (you are lending money to a developer) provide fixed income with lower risk. Equity investments (you own a share of the property) provide higher potential returns but with more risk and less predictable income.'),

    h2('cf06', 'Accredited vs. Non-Accredited Investors'),
    p('cf07', 'SEC regulations divide investors into two categories that determine which crowdfunding opportunities are available to you. Accredited investors meet at least one of these criteria: annual income exceeding $200,000 (or $300,000 jointly with a spouse) for the past two years, net worth exceeding $1 million excluding your primary residence, or certain professional certifications (Series 7, 65, or 82). Non-accredited investors do not meet any of these thresholds.'),
    p('cf08', 'Most individual deal opportunities (CrowdStreet, EquityMultiple, RealtyMogul\'s private placements) are limited to accredited investors under SEC Regulation D. Non-accredited investors have access to fund-based products under Regulation A+ (Fundrise, DiversyFund, Groundfloor) and some Regulation CF offerings. The Regulation A+ exemption allows platforms to offer investments to all investors with certain limits, making these platforms the primary entry point for non-accredited investors.'),

    h2('cf09', 'Major Crowdfunding Platforms Compared'),
    h3('cf10', 'Fundrise'),
    p('cf11', 'Fundrise is the largest and most accessible platform with over $7 billion in real estate under management. Minimum investment starts at $10 for the Starter plan. The platform offers diversified eREIT and eFund products that invest across residential and commercial real estate. Historical returns have averaged 8 to 12 percent annually (a mix of income and appreciation). Fees are 1 percent annually (0.15 percent advisory fee plus 0.85 percent management fee). Fundrise is the best option for non-accredited investors and those starting with smaller amounts.'),

    h3('cf12', 'CrowdStreet'),
    p('cf13', 'CrowdStreet focuses on individual commercial real estate deals for accredited investors. Minimum investments start at $25,000 per deal. The platform specializes in institutional-quality projects: class A multifamily, office, industrial, and hospitality properties sponsored by experienced commercial operators. Target returns vary by deal but typically range from 12 to 20 percent IRR. CrowdStreet does not charge investors a platform fee — sponsors pay the placement fees. This is the platform for experienced investors who want to pick individual deals.'),

    h3('cf14', 'RealtyMogul'),
    p('cf15', 'RealtyMogul offers both fund products (available to all investors) and individual deals (accredited only). The MogulREIT I (income-focused) targets 6 to 8 percent annual distributions. The MogulREIT II (growth-focused) targets total returns of 10 to 14 percent. Individual deals are typically multifamily and commercial value-add projects with $25,000 to $35,000 minimums. RealtyMogul has a strong track record of sponsor vetting and has returned over $400 million in distributions to investors.'),

    h3('cf16', 'Groundfloor'),
    p('cf17', 'Groundfloor is unique in offering short-term real estate debt investments to non-accredited investors with a $10 minimum. You are lending money to house flippers and renovators — essentially acting as the hard money lender. Loans are graded A through G based on risk, with target returns of 6 to 14 percent on 6 to 18 month terms. Because these are debt investments with fixed terms and collateral, the risk profile is different from equity crowdfunding — lower upside but more predictable returns and shorter holding periods.'),

    h2('cf18', 'Expected Returns and Fees'),
    pLink('cf19', [
      { text: 'Crowdfunding returns vary significantly by platform, strategy, and vintage year. Conservative expectations for a diversified crowdfunding portfolio are 7 to 10 percent annually from fund-based products (mix of income and appreciation), 10 to 15 percent from individual equity deals (if you pick sponsors well), and 6 to 10 percent from debt investments (short-term lending). Fees reduce these returns by 1 to 2 percent annually. Always calculate your net return after fees and compare it to alternatives — a ' },
      { text: 'cash-on-cash return', href: '/calculators/cash-on-cash' },
      { text: ' of 8 to 12 percent on a directly owned rental property, for example, with more tax benefits and more control.' },
    ]),

    h2('cf20', 'Risks of Real Estate Crowdfunding'),
    p('cf21', 'Illiquidity is the primary risk. Most crowdfunding investments have 3 to 7 year hold periods with no secondary market. You cannot sell your position when you want — you wait for the fund to mature or the property to sell. Some platforms offer quarterly redemption programs, but these are limited and may be suspended during market stress (Fundrise paused redemptions during the 2022 rate spike). Sponsor risk is significant for individual deals — if the operator mismanages the project, your investment suffers regardless of market conditions. Platform risk exists if the crowdfunding company itself fails — your investments are in separate legal entities, but the servicing and reporting disruption can be significant.'),
    p('cf22', 'Lack of control is a fundamental characteristic, not a bug. You cannot force appreciation, cut expenses, raise rents, or make management decisions. You are entirely dependent on the sponsor and platform to execute. This is fine when you have high-quality operators — and it is devastating when you do not. Due diligence on the sponsor is the single most important factor in individual deal success.'),

    h2('cf23', 'How to Build a Crowdfunding Portfolio'),
    pLink('cf24', [
      { text: 'Diversification is your primary protection in crowdfunding. Spread capital across multiple platforms, strategies (equity and debt), property types (residential, commercial, industrial), and geographies. Start with a diversified fund product (Fundrise or RealtyMogul REITs) to establish a baseline allocation. As you gain experience and meet accredited investor thresholds, add individual deals on CrowdStreet or EquityMultiple for higher returns with more targeted exposure. Limit any single deal to 5 to 10 percent of your total crowdfunding allocation. And remember that crowdfunding should be one component of a broader ' },
      { text: 'real estate investment strategy', href: '/blog/real-estate-investing-beginners-guide-2026' },
      { text: ' — not the entire strategy. The tax benefits, leverage, and control of direct property ownership are advantages that crowdfunding cannot replicate.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 8: How to Calculate After Repair Value (ARV)
// ══════════════════════════════════════════════════════
const arvGuide = {
  _type: 'post',
  title: 'How to Calculate After Repair Value (ARV): The Investor\'s Guide',
  slug: { _type: 'slug', current: 'how-to-calculate-arv' },
  author: authorRef,
  categories: [catDealAnalysis],
  publishedAt: '2026-06-11T10:00:00Z',
  excerpt: 'Learn how to accurately calculate after repair value (ARV) for fix-and-flip and BRRRR deals — including comp selection, adjustment methods, common mistakes, and real-world examples.',
  seo: {
    metaTitle: 'How to Calculate ARV (After Repair Value): Investor Guide | ProInvestorHub',
    metaDescription: 'Step-by-step guide to calculating after repair value (ARV). Learn comp selection, adjustment methods, the 70% rule, common ARV mistakes, and how to use ARV in deal analysis.',
  },
  body: [
    pLink('ar01', [
      { text: 'After repair value — ARV — is the most important number in any fix-and-flip or ' },
      { text: 'BRRRR deal', href: '/blog/brrrr-method-complete-guide' },
      { text: '. It is the estimated market value of a property after all planned renovations are complete. Every other number in your deal analysis depends on the ARV: your maximum allowable offer, your rehab budget, your expected profit margin, and your refinance amount. Get the ARV right, and your deal analysis is built on solid ground. Get it wrong — even by 10 percent — and a deal that looks profitable on paper becomes a money pit in reality.' },
    ]),
    p('ar02', 'Calculating ARV is both an art and a science. The science is the comparable sales analysis — a structured process for identifying recently sold properties similar to what yours will become after renovation. The art is in the adjustments — accounting for the differences between your subject property and the comps in ways that reflect what buyers in your market will actually pay. This guide teaches both.'),

    h2('ar03', 'The Comparable Sales Method'),
    p('ar04', 'The comparable sales method — the same method appraisers use — is the foundation of ARV calculation. You are answering one question: what have similar properties in similar condition in similar locations sold for recently? The key word is "similar." Your comps must resemble what your property will look like after renovation — not what it looks like now. You are not comping a distressed property against other distressed properties. You are comping a renovated property against other renovated properties that have recently sold.'),

    h2('ar05', 'Step 1: Find Comparable Sales'),
    p('ar06', 'Start by searching for recent sales within a half-mile radius of your subject property. Use the MLS (through a real estate agent), Zillow, Redfin, or PropStream. Filter for properties that match your post-renovation property on these criteria: similar square footage (within 20 percent), similar bedroom and bathroom count (exact match preferred), similar lot size (within 25 percent for SFRs), similar property type (single-family, duplex, condo), and similar condition (renovated or updated, not distressed). Target 3 to 5 strong comps that sold within the last 3 to 6 months. In active markets, prioritize the most recent sales. In slower markets, you may need to extend to 6 to 12 months.'),

    h2('ar07', 'Step 2: Make Adjustments'),
    p('ar08', 'No two properties are identical. You need to adjust each comp\'s sale price to account for differences between the comp and your subject property. The standard adjustments are: square footage (add or subtract $40 to $100 per square foot depending on market — if the comp is 200 square feet larger, subtract the adjustment from the comp price), bedrooms (add or subtract $5,000 to $15,000 per bedroom depending on market), bathrooms (add or subtract $5,000 to $10,000 per bathroom), garage (add $10,000 to $25,000 for a 2-car garage versus no garage), lot size (typically minimal adjustment for standard residential lots), condition and finish quality (the most subjective adjustment — $5,000 to $30,000 depending on the gap), and location within the neighborhood (corner lots, busy streets, backing to commercial get negative adjustments).'),
    p('ar09', 'After adjustments, each comp\'s adjusted sale price should represent what the comp would have sold for if it were identical to your post-renovation subject property. If your 3 adjusted comps come in at $245,000, $252,000, and $248,000, your ARV estimate is approximately $248,000 (the average or median of the adjusted prices). If the adjusted prices are widely spread — $220,000, $260,000, $285,000 — your comps are not similar enough, and you need better ones.'),

    h2('ar10', 'Step 3: Validate with Active Listings'),
    p('ar11', 'After establishing your ARV from sold comps, check active listings (currently for sale) in the area. Your ARV should be at or below the price of comparable active listings. If similar renovated properties are currently listed at $240,000 to $250,000 and your ARV estimate is $275,000, something is wrong — either your comps are not representative, your adjustments are too aggressive, or the market has shifted since the most recent sales. Active listings represent the ceiling of what you can reasonably expect a buyer to pay.'),

    h2('ar12', 'The 70 Percent Rule'),
    pLink('ar13', [
      { text: 'The ' },
      { text: '70 percent rule', href: '/blog/70-percent-rule-house-flipping' },
      { text: ' is the standard quick-calculation formula for determining your maximum allowable offer (MAO) on a flip or BRRRR deal: MAO = (ARV × 0.70) − Rehab Costs. If your ARV is $250,000 and your estimated rehab cost is $40,000, your maximum offer is ($250,000 × 0.70) − $40,000 = $135,000. The 30 percent margin covers your closing costs (buying and selling), holding costs, financing costs, and profit. Run the full analysis in our ' },
      { text: 'fix and flip calculator', href: '/calculators/fix-flip' },
      { text: ' to model every cost line rather than relying solely on the 70 percent shortcut.' },
    ]),

    h2('ar14', 'Common ARV Mistakes'),
    p('ar15', 'Overestimating ARV is the number one mistake that causes investors to lose money on flips. The most common errors include using comps that are too far away (a comp across a highway or in a different school district may not be comparable even if it is close geographically), using comps that are too old (in a declining market, 6-month-old comps may overstate current values), over-improving for the neighborhood (installing $50,000 kitchens in a $200,000 neighborhood does not increase ARV proportionally), using listing prices instead of sold prices (what a seller asks and what a buyer pays are different things), and ignoring market trends (if prices are declining 1 percent per month, your ARV needs to reflect where the market will be when you list, not where it is today).'),

    h2('ar16', 'ARV for BRRRR Deals'),
    pLink('ar17', [
      { text: 'In a ' },
      { text: 'BRRRR deal', href: '/blog/brrrr-method-complete-guide' },
      { text: ', the ARV determines your refinance amount. Most lenders will refinance at 70 to 75 percent of appraised value. If your ARV is $250,000 and the lender refinances at 75 percent LTV, your new loan is $187,500. If your total investment (purchase + rehab + closing costs) was $175,000, you recover $12,500 cash plus you keep the property with $62,500 in equity. If your ARV estimate was wrong and the property only appraises at $220,000, the refinance only yields $165,000 — leaving $10,000 of your capital trapped in the deal. Use our ' },
      { text: 'BRRRR calculator', href: '/calculators/brrrr' },
      { text: ' to model different ARV scenarios and see how they affect your capital recovery.' },
    ]),

    h2('ar18', 'Building ARV Accuracy Over Time'),
    p('ar19', 'The best investors develop deep market knowledge that makes ARV estimation more accurate over time. They focus on specific neighborhoods or ZIP codes rather than broad markets. They track every sale in their target area — not just when they are actively analyzing a deal. They develop relationships with real estate agents who provide real-time market intelligence. They attend open houses of renovated properties to understand what finishes buyers expect and what they pay for. And they track their own ARV estimates against actual outcomes — comparing their projected ARV to the actual sale price or appraisal on every deal. This feedback loop is how you calibrate your ARV skills from educated guessing to reliable estimation.'),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [turnkeyRentals, propertyManagement, crowdfundingGuide, arvGuide]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 5b Content Seed: Turnkey, Property Management, Crowdfunding, ARV\n')

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
