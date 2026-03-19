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
const catFinancing = await getCategoryRef('Financing', 'c3')
const catStrategies = await getCategoryRef('Strategies', 'c4')

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
// POST 1: How to Buy Your First Rental Property
// ══════════════════════════════════════════════════════
const firstRentalProperty = {
  _type: 'post',
  title: 'How to Buy Your First Rental Property: A Step-by-Step Guide',
  slug: { _type: 'slug', current: 'how-to-buy-first-rental-property' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-05-18T10:00:00Z',
  excerpt: 'A practical, step-by-step guide to buying your first rental property — from setting financial goals and getting pre-approved to analyzing deals, making offers, and managing tenants.',
  seo: {
    metaTitle: 'How to Buy Your First Rental Property: Step-by-Step Guide | ProInvestorHub',
    metaDescription: 'Complete step-by-step guide to buying your first rental property. Learn how to set goals, get financing, analyze deals, make offers, and start generating rental income.',
  },
  body: [
    p('fr01', 'Buying your first rental property is the single most important step in building a real estate portfolio. It is also the most intimidating. The gap between reading about real estate investing and actually owning an income-producing property feels enormous — and that gap keeps thousands of aspiring investors on the sidelines every year. This guide bridges that gap with a practical, step-by-step process that takes you from "I want to invest in real estate" to "I own a cash-flowing rental property."'),
    pLink('fr02', [
      { text: 'The truth is that buying your first rental property is not fundamentally different from buying a home to live in. The mechanics are the same: find a property, get financing, make an offer, close the deal. What is different is the analytical framework. When you buy a primary residence, you are choosing a place to live. When you buy a rental property, you are making a business decision that must be supported by numbers. This guide will teach you to think like an investor — using tools like our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' and ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' to evaluate deals objectively.' },
    ]),

    h2('fr03', 'Step 1: Define Your Investment Goals'),
    p('fr04', 'Before you look at a single property, get clear on what you want your rental to accomplish. Are you investing for monthly cash flow — income that supplements or replaces your salary? Are you investing for long-term appreciation — building wealth through property value growth over 10 to 20 years? Or are you pursuing a combination of both? Your goals determine your strategy, your target market, and the type of property you should buy.'),
    p('fr05', 'Cash flow investors typically target properties in Midwest and Southeast markets where purchase prices are lower relative to rental rates. A $150,000 property renting for $1,500 per month has a 1 percent rent-to-price ratio — the rough benchmark for positive cash flow after expenses. Appreciation investors target coastal and high-growth markets where property values are increasing but cash flow is thin or negative. Most first-time investors should prioritize cash flow because it creates a financial cushion that protects you while you learn. A property that cash flows $200 to $400 per month gives you room for unexpected expenses without dipping into personal savings.'),

    h2('fr06', 'Step 2: Get Your Finances in Order'),
    p('fr07', 'Investment property financing has different requirements than primary residence loans. Expect to put down 20 to 25 percent for a conventional investment property mortgage. If you are buying a property you will live in and rent out part of — house hacking — you can use FHA loans with as little as 3.5 percent down or conventional loans with 5 percent down. Your credit score should be 680 or higher for the best rates, though some programs accept 620. Lenders will count 75 percent of expected rental income toward your qualifying income, which helps your debt-to-income ratio.'),
    pLink('fr08', [
      { text: 'Beyond the down payment, budget for closing costs (2 to 5 percent of purchase price), an initial reserve fund (3 to 6 months of mortgage payments plus expenses), and any immediate repairs or improvements the property needs before renting. A common mistake is draining all your savings for the down payment and having nothing left for reserves. Use our ' },
      { text: 'mortgage calculator', href: '/calculators/mortgage' },
      { text: ' to model your monthly payment under different down payment and rate scenarios.' },
    ]),

    h2('fr09', 'Step 3: Choose Your Market'),
    pLink('fr10', [
      { text: 'You do not have to invest where you live. In fact, many investors get better returns by investing in markets with stronger fundamentals than their home market. Evaluate markets based on rent-to-price ratio (monthly rent divided by purchase price — target 0.7 percent or higher), population growth (growing markets have growing rental demand), job diversification (avoid one-industry towns), landlord-friendly laws (some states make eviction fast and straightforward while others take months), and property tax rates (high taxes eat into cash flow). See our ' },
      { text: 'best cash flow markets guide', href: '/blog/best-cash-flow-markets-2026' },
      { text: ' for data-driven market picks.' },
    ]),
    p('fr11', 'If you are investing locally, your advantage is that you can inspect properties yourself, build relationships with contractors and property managers, and respond to issues quickly. If you are investing out of state, a great property manager becomes essential — they are your eyes, ears, and hands on the ground. Either approach works. What matters is that the numbers work.'),

    h2('fr12', 'Step 4: Analyze Properties Like an Investor'),
    pLink('fr13', [
      { text: 'This is where most first-time investors either succeed or fail. Running the numbers honestly — not optimistically — is the single most important skill in real estate investing. For every property you consider, calculate: gross rental income (market rent times 12 months), effective gross income (minus vacancy allowance of 5 to 8 percent), operating expenses (property taxes, insurance, property management at 8 to 10 percent, maintenance at 10 percent of rent, capital expenditure reserves at 5 to 10 percent), ' },
      { text: 'net operating income', href: '/glossary/noi' },
      { text: ' (effective gross income minus operating expenses), and cash flow (NOI minus mortgage payment). If the cash flow is negative, the deal does not work — no matter how nice the property looks.' },
    ]),
    pLink('fr14', [
      { text: 'Run every deal through our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: '. Compare the ' },
      { text: 'cash-on-cash return', href: '/calculators/cash-on-cash' },
      { text: ' (annual cash flow divided by total cash invested) against your target — most investors aim for 8 to 12 percent. And calculate the ' },
      { text: 'cap rate', href: '/calculators/cap-rate' },
      { text: ' (NOI divided by purchase price) to benchmark the property against market norms. If you cannot make the numbers work at asking price, either negotiate or walk away. There are always more deals.' },
    ]),

    h2('fr15', 'Step 5: Build Your Team'),
    p('fr16', 'Real estate investing is a team sport. Before you make your first offer, have these people in place: a real estate agent who works with investors (not just homebuyers — investor-friendly agents understand cap rates, NOI, and rental comps), a lender with investment property experience who has already pre-approved you, a home inspector who is thorough and independent, a property manager (even if you plan to self-manage initially, having a manager lined up gives you a backup plan), and a real estate attorney or closing agent familiar with investment transactions in your state.'),
    p('fr17', 'The most important team member for a first-time investor is a property manager, even if you do not hire one immediately. Interview two or three property managers in your target market before you buy. They can tell you what rents are realistic, what neighborhoods perform well, what tenant quality looks like, and what maintenance costs to expect. This market intelligence is invaluable — and it costs you nothing during the interview process.'),

    h2('fr18', 'Step 6: Make an Offer and Close'),
    p('fr19', 'When you find a property that meets your criteria, make an offer that makes the deal work for you — not the seller. Your offer price should be based on your analysis, not the listing price. Include contingencies for inspection, financing, and appraisal. During due diligence, verify that the property condition matches your assumptions, rents match market comps, taxes and insurance are accurate, and there are no hidden issues (foundation problems, code violations, environmental concerns). If due diligence reveals problems that change your numbers, renegotiate or walk away.'),
    p('fr20', 'The closing process for an investment property is similar to a primary residence purchase. You will sign loan documents, transfer funds, and receive the keys. Budget 30 to 45 days from accepted offer to closing for a financed purchase. Cash purchases can close in as little as 10 to 14 days. After closing, your focus shifts to getting the property rent-ready and finding your first tenant.'),

    h2('fr21', 'Step 7: Prepare and Rent the Property'),
    pLink('fr22', [
      { text: 'Before listing the property for rent, complete any necessary repairs or improvements. Focus on clean, functional, and durable — not luxury. Fresh paint, clean carpets (or replace with LVP flooring), functioning appliances, and good curb appeal are the priorities. Price your rent competitively by checking comparable rentals on Zillow, Apartments.com, and Craigslist within a half-mile radius. Price slightly below market if you want to minimize vacancy on your first property — a property that rents in 2 weeks at $50 below market is better than one that sits vacant for 6 weeks at full price.' },
    ]),
    pLink('fr23', [
      { text: 'Screen tenants thoroughly — this is where landlording succeeds or fails. Check credit, criminal background, rental history, employment verification, and references. Set minimum criteria in advance (credit score, income of 3 times monthly rent, no evictions) and apply them consistently to every applicant. Our ' },
      { text: 'tenant screening guide', href: '/blog/how-to-screen-tenants' },
      { text: ' covers the full process including Fair Housing compliance.' },
    ]),

    h2('fr24', 'Step 8: Manage and Optimize'),
    p('fr25', 'Once your tenant is in place, your job shifts to property management. Whether you self-manage or hire a property manager, the priorities are the same: collect rent on time, respond to maintenance requests promptly, keep the property in good condition, and build a reserve fund for capital expenditures. Track every dollar of income and expense from day one — you will need this for tax purposes and for evaluating whether the property is performing as projected.'),
    pLink('fr26', [
      { text: 'Review your property performance quarterly. Compare actual income and expenses against your original projections. If the property is underperforming, diagnose why — is it higher maintenance costs, longer vacancy, or lower-than-expected rent? Each problem has a solution, but you need data to identify it. And once your first property is stabilized and performing well, start planning for property number two. The hardest part of real estate investing is getting started. Once you own one property, scaling to two, five, or ten follows a ' },
      { text: 'proven portfolio-building playbook', href: '/blog/building-real-estate-portfolio' },
      { text: '.' },
    ]),

    h2('fr27', 'Common First-Time Investor Mistakes'),
    pLink('fr28', [
      { text: 'The most common mistakes first-time investors make are all avoidable. Overestimating rental income by using optimistic rather than conservative rent estimates. Underestimating expenses by forgetting vacancy, maintenance reserves, and capital expenditure. Skipping the inspection to save $400 and discovering $15,000 in foundation repairs. Buying based on emotion rather than numbers. And undercapitalizing — spending every dollar on the down payment and having no reserves for surprises. See our full breakdown of ' },
      { text: 'real estate investing mistakes', href: '/blog/real-estate-investing-mistakes' },
      { text: ' organized by investor stage.' },
    ]),

    h2('fr29', 'Your First Rental Property Checklist'),
    pLink('fr30', [
      { text: 'Use this as your action checklist: define your investment criteria (cash flow target, market, property type, budget), get pre-approved for financing, choose your market and learn the rental comps, analyze at least 20 properties before making an offer (practice makes the numbers feel natural), build your team (agent, lender, inspector, property manager), make offers based on your analysis, close with proper due diligence, prepare and rent the property, screen tenants carefully, and track performance from day one. The gap between aspiring investor and actual investor is exactly one property. Run the numbers using our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ', find a deal that works, and take the first step.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: Real Estate LLC — Do You Need One?
// ══════════════════════════════════════════════════════
const realEstateLLC = {
  _type: 'post',
  title: 'Real Estate LLC: Do You Need One for Your Rental Properties?',
  slug: { _type: 'slug', current: 'real-estate-llc-rental-properties' },
  author: authorRef,
  categories: [catTaxLegal],
  publishedAt: '2026-05-21T10:00:00Z',
  excerpt: 'Should you put your rental properties in an LLC? This guide covers liability protection, tax implications, financing impacts, costs, and when an LLC makes sense for real estate investors.',
  seo: {
    metaTitle: 'Real Estate LLC: Do You Need One for Rental Properties? | ProInvestorHub',
    metaDescription: 'Complete guide to LLCs for real estate investors. Learn about liability protection, tax benefits, financing implications, setup costs, and when an LLC makes sense for your portfolio.',
  },
  body: [
    p('ll01', 'Should you hold your rental properties in an LLC? This is one of the most frequently asked questions in real estate investing — and one of the most frequently answered with oversimplified advice. The internet is full of people who insist that every investor must have an LLC from day one, and equally full of accountants who say it is often unnecessary for small portfolios. The truth depends on your specific situation: how many properties you own, how much equity you have at risk, your state laws, and your financing strategy.'),
    p('ll02', 'This guide cuts through the noise with a practical framework for deciding whether an LLC makes sense for your real estate investments. We cover what an LLC actually protects (and what it does not), the tax implications, how LLCs affect your ability to get financing, the costs involved, and alternative protection strategies that may be simpler and cheaper.'),

    h2('ll03', 'What an LLC Actually Protects'),
    p('ll04', 'A limited liability company creates a legal separation between your personal assets and your business assets. If someone is injured on your rental property and sues, the LLC limits their claim to the assets inside the LLC — the rental property itself and any cash in the LLC bank account. Your personal home, personal savings, retirement accounts, and other properties held outside the LLC are generally protected from the lawsuit. This is the core value proposition: asset protection through legal separation.'),
    p('ll05', 'However, LLC protection is not absolute. Courts can "pierce the corporate veil" and reach your personal assets if you fail to maintain the LLC properly. Common veil-piercing triggers include commingling personal and LLC funds (using the LLC bank account for personal expenses), failing to maintain separate books and records, undercapitalizing the LLC (not keeping enough funds in the LLC to cover its obligations), and treating the LLC as your alter ego rather than a separate entity. An LLC only protects you if you treat it as a genuinely separate business entity.'),

    h2('ll06', 'LLC Tax Treatment for Real Estate'),
    pLink('ll07', [
      { text: 'By default, a single-member LLC is treated as a "disregarded entity" for federal tax purposes. This means the LLC itself does not file a separate tax return — all income and expenses flow through to your personal tax return on Schedule E, exactly as they would if you owned the property in your personal name. There is no tax advantage or disadvantage from the LLC structure itself. The ' },
      { text: 'same depreciation rules', href: '/blog/real-estate-depreciation-tax-benefit' },
      { text: ', expense deductions, and ' },
      { text: 'tax strategies', href: '/blog/real-estate-tax-strategies-guide' },
      { text: ' apply whether you hold properties personally or in an LLC.' },
    ]),
    p('ll08', 'Multi-member LLCs (where you have partners) are taxed as partnerships by default, filing Form 1065 and issuing K-1s to each member. This adds complexity and accounting costs but is often necessary when multiple investors own a property together. Some investors elect S-corp taxation for their LLC to save on self-employment taxes, but this rarely makes sense for passive rental income since rental income is already exempt from self-employment tax.'),

    h2('ll09', 'How LLCs Affect Financing'),
    p('ll10', 'This is where LLCs create the most practical friction for real estate investors. Conventional mortgages (Fannie Mae and Freddie Mac loans) cannot be held in an LLC — they require a personal borrower. If you buy a property with a conventional mortgage and then transfer it to an LLC, you technically trigger the due-on-sale clause, which gives the lender the right to demand full repayment of the loan. In practice, most lenders do not enforce the due-on-sale clause for transfers to single-member LLCs where the borrower is the sole member, but the risk exists.'),
    pLink('ll11', [
      { text: 'The financing alternative for LLC-owned properties is commercial or portfolio lending. ' },
      { text: 'DSCR loans', href: '/blog/dscr-investor-financing-guide' },
      { text: ' can be taken in an LLC name because they are underwritten based on the property income rather than the borrower\'s personal income. Portfolio loans from local banks can also be structured with LLC borrowers. The trade-off is that commercial and DSCR loans typically have higher interest rates (0.5 to 1.5 percent higher than conventional), shorter terms, and higher closing costs. For a single property, the added financing cost of using an LLC may exceed the value of the liability protection.' },
    ]),

    h2('ll12', 'When an LLC Makes Sense'),
    p('ll13', 'An LLC becomes increasingly valuable as your portfolio grows and your equity exposure increases. Here is a practical framework. For your first one to two properties with conventional financing and limited equity, an LLC is often unnecessary — your landlord insurance policy provides the primary liability protection, and the financing complications outweigh the benefits. For three to five properties or when you have significant equity (more than $200,000 to $300,000 across your portfolio), an LLC starts to make financial sense. The asset protection justifies the additional costs and complexity.'),
    p('ll14', 'For six or more properties, most serious investors use LLCs. Some use a separate LLC for each property (maximum protection but highest administrative costs) while others group two to four properties per LLC (reasonable protection with manageable overhead). The series LLC, available in about 20 states, offers a middle ground — a single LLC with separate "series" that each provide independent liability protection, reducing formation and maintenance costs compared to multiple separate LLCs.'),

    h2('ll15', 'LLC Setup Costs and Ongoing Requirements'),
    p('ll16', 'Formation costs vary by state. Filing fees range from $50 (many states) to $800 (California\'s infamous annual franchise tax). If you use an attorney, add $500 to $1,500 for an operating agreement and proper setup. Online formation services cost $100 to $300 plus state filing fees. Ongoing costs include annual state reports or franchise taxes ($0 to $800 per year depending on the state), a separate bank account, separate bookkeeping, and potentially a separate tax return if the LLC has multiple members. For a single-member LLC in most states, the annual cost is under $200 — a reasonable insurance premium for asset protection.'),

    h2('ll17', 'Alternatives to an LLC'),
    p('ll18', 'An LLC is not the only way to protect your assets. Umbrella insurance policies provide $1 million to $5 million in liability coverage above your landlord policy for $200 to $500 per year — often cheaper than LLC formation and maintenance. Land trusts provide privacy (your name does not appear in public records) but do not provide liability protection on their own. Proper insurance coverage (landlord policy with adequate liability limits, plus an umbrella policy) is the foundation of any asset protection strategy, with or without an LLC. Most real estate attorneys recommend insurance as the first layer of protection and LLCs as the second layer for investors with significant portfolios.'),

    h2('ll19', 'The Bottom Line'),
    pLink('ll20', [
      { text: 'Do not let LLC analysis paralysis prevent you from buying your ' },
      { text: 'first rental property', href: '/blog/how-to-buy-first-rental-property' },
      { text: '. Start with proper insurance coverage. As your portfolio grows and your equity exposure increases, add LLC protection. Consult a real estate attorney in your state for specific guidance — LLC laws and benefits vary significantly by jurisdiction. The right asset protection strategy is the one that matches the size and risk profile of your portfolio, not the one that sounds most impressive on a podcast.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 3: Hard Money Loans Explained
// ══════════════════════════════════════════════════════
const hardMoneyLoans = {
  _type: 'post',
  title: 'Hard Money Loans: What They Are, How They Work, and When to Use Them',
  slug: { _type: 'slug', current: 'hard-money-loans-explained' },
  author: authorRef,
  categories: [catFinancing],
  publishedAt: '2026-05-25T10:00:00Z',
  excerpt: 'Everything investors need to know about hard money loans — how they work, typical rates and terms in 2026, when they make sense, how to find lenders, and alternatives to consider.',
  seo: {
    metaTitle: 'Hard Money Loans Explained: Rates, Terms & When to Use Them | ProInvestorHub',
    metaDescription: 'Complete guide to hard money loans for real estate investors. Learn how hard money works, 2026 rates (10-15%), typical terms, when to use them, and how to find reputable lenders.',
  },
  body: [
    p('hm01', 'Hard money loans are one of the most powerful — and most misunderstood — financing tools in real estate investing. They are short-term, asset-based loans provided by private lenders rather than banks or credit unions. The loan is secured by the property being purchased, and the lender\'s primary underwriting criterion is the property\'s value — not the borrower\'s income, employment history, or tax returns. This makes hard money loans fast, flexible, and accessible to investors who cannot qualify for conventional financing or who need to close quickly.'),
    pLink('hm02', [
      { text: 'The trade-off is cost. Hard money loans carry interest rates of 10 to 15 percent with 1 to 4 points in origination fees, compared to 6 to 8 percent for conventional mortgages. Terms are short — typically 6 to 18 months — with either interest-only payments or no payments until maturity. Hard money is not cheap money. It is speed money, flexibility money, and bridge money. Used correctly, hard money loans enable profitable deals that would otherwise be impossible. Used carelessly, they can destroy an investor\'s returns. This guide covers how hard money works, when it makes sense, and how to use it strategically as part of your ' },
      { text: 'investment financing toolkit', href: '/blog/dscr-investor-financing-guide' },
      { text: '.' },
    ]),

    h2('hm03', 'How Hard Money Loans Work'),
    pLink('hm04', [
      { text: 'A hard money lender evaluates the deal, not the borrower. When you apply for a hard money loan, the lender asks: What is the property worth? What will it be worth after improvements? What is the purchase price? How much rehab is needed? The lender\'s primary concern is the ' },
      { text: 'loan-to-value ratio', href: '/glossary/ltv' },
      { text: ' (LTV) — the ratio of the loan amount to the property\'s current value or after-repair value (ARV). Most hard money lenders cap loans at 65 to 75 percent of ARV. If a property has an ARV of $300,000, the maximum loan is $195,000 to $225,000, which must cover both the purchase price and the rehab budget.' },
    ]),
    p('hm05', 'The application process is fast. Where a conventional mortgage takes 30 to 45 days to close, a hard money loan can close in 7 to 14 days. Some experienced borrowers with established lender relationships close in as little as 5 days. The documentation requirements are minimal: a purchase contract, a scope of work for rehab (if applicable), proof of funds for the down payment, and basic borrower information. No tax returns, no W-2s, no pay stubs, no two months of bank statements. The property is the qualification.'),

    h2('hm06', 'Hard Money Rates and Terms in 2026'),
    p('hm07', 'Hard money lending is competitive, and terms vary significantly by lender, market, and borrower experience. Here are the typical ranges in the current market. Interest rates run 10 to 15 percent annually. Experienced borrowers with track records can negotiate down to 9 to 10 percent. First-time borrowers typically pay 12 to 15 percent. Origination fees (points) range from 1 to 4 points — each point is 1 percent of the loan amount. A 2-point fee on a $200,000 loan is $4,000, paid at closing.'),
    p('hm08', 'Loan terms are 6 to 18 months, with 12 months being the most common. Extensions are usually available for 1 to 2 percent of the remaining balance. LTV limits are 65 to 75 percent of ARV for purchase and rehab loans, or 60 to 70 percent of as-is value for bridge loans. Down payment requirements are 10 to 30 percent of the purchase price, depending on the lender and the deal. Rehab funds are typically held in escrow and disbursed in draws as work is completed and inspected.'),

    h2('hm09', 'When to Use Hard Money'),
    h3('hm10', 'Fix and Flip Projects'),
    pLink('hm11', [
      { text: 'Hard money is the standard financing tool for house flipping. You buy a distressed property, renovate it, and sell it within 3 to 9 months. The short timeline matches the short loan term, and the high interest rate is offset by the profit margin on the flip. Our ' },
      { text: 'fix and flip calculator', href: '/calculators/fix-flip' },
      { text: ' models the full deal including hard money costs so you can see whether the profit margin justifies the financing expense.' },
    ]),

    h3('hm12', 'BRRRR Strategy — The Acquisition Phase'),
    pLink('hm13', [
      { text: 'In the ' },
      { text: 'BRRRR strategy', href: '/blog/brrrr-method-complete-guide' },
      { text: ', hard money finances the initial purchase and rehab. Once the property is renovated and rented, you refinance into a long-term ' },
      { text: 'DSCR loan', href: '/blog/dscr-investor-financing-guide' },
      { text: ' or conventional mortgage. The hard money loan is a bridge that gets you into the deal quickly, and the refinance repays it. The key is ensuring that the ARV and rental income support the refinance — run the numbers through our ' },
      { text: 'BRRRR calculator', href: '/calculators/brrrr' },
      { text: ' before committing.' },
    ]),

    h3('hm14', 'Competitive Auction and Off-Market Deals'),
    p('hm15', 'When a property hits the auction block or an off-market seller wants a fast close, conventional financing is too slow. Hard money lets you close in 7 to 14 days, making your offer competitive against cash buyers. The speed premium (higher interest and points) is worth it if the purchase price is significantly below market value — which is typically the case at auctions and with motivated off-market sellers.'),

    h2('hm16', 'How to Find Hard Money Lenders'),
    p('hm17', 'Start with local real estate investment associations (REIAs) — most hard money lenders network heavily at local investor meetings. Ask experienced investors in your market who they use. Online platforms like LendingHome, Kiavi, and Lima One Capital offer hard money loans nationally with streamlined digital applications. Local private lenders (individuals or small lending companies) may offer more flexible terms and relationship-based pricing, though their capital capacity is typically smaller than national platforms.'),
    p('hm18', 'When evaluating lenders, compare the total cost of capital — not just the interest rate. A lender charging 11 percent with 2 points may be cheaper than one charging 10 percent with 4 points on a short-term loan. Ask about draw schedules for rehab funds (some lenders disburse quickly, others take weeks), extension fees, prepayment penalties, and the lender\'s experience with your property type and market. The best hard money lender is one who has financed hundreds of deals similar to yours and can close predictably.'),

    h2('hm19', 'Hard Money vs. Other Financing Options'),
    pLink('hm20', [
      { text: 'Hard money is not the only option for investment property financing. ' },
      { text: 'DSCR loans', href: '/blog/dscr-investor-financing-guide' },
      { text: ' offer 30-year terms at lower rates for stabilized rental properties. Conventional investment property mortgages have the lowest rates but the most qualification requirements. ' },
      { text: 'Seller financing', href: '/blog/seller-financing-real-estate' },
      { text: ' can be cheaper than hard money with more flexible terms. Private money from individual investors may offer relationship-based terms. Choose hard money when speed and flexibility matter more than cost — and when your exit strategy (sale or refinance) can absorb the higher financing expenses.' },
    ]),

    h2('hm21', 'Hard Money Risks and Mistakes'),
    p('hm22', 'The biggest risk in hard money lending is not having a clear exit strategy. If your flip takes longer than expected, your rehab goes over budget, or the market softens and your property does not sell at ARV, you are stuck paying 12 percent interest on a loan that was supposed to be repaid months ago. Extension fees add up. Some hard money loans have default provisions that increase the interest rate to 18 to 24 percent if the loan matures without repayment. Always model your worst-case scenario — what happens if the project takes 50 percent longer and costs 20 percent more than planned? If the deal still works under those assumptions, proceed. If not, the margin is too thin for hard money.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 4: Subject-To Financing
// ══════════════════════════════════════════════════════
const subjectTo = {
  _type: 'post',
  title: 'Subject-To Financing: How to Buy Properties Without Getting a New Loan',
  slug: { _type: 'slug', current: 'subject-to-financing-guide' },
  author: authorRef,
  categories: [catFinancing],
  publishedAt: '2026-05-28T10:00:00Z',
  excerpt: 'A comprehensive guide to subject-to financing in real estate — how it works, the legal framework, due-on-sale clause risks, deal structuring, and when this creative strategy makes sense.',
  seo: {
    metaTitle: 'Subject-To Financing: Buy Properties Without a New Loan | ProInvestorHub',
    metaDescription: 'Learn how subject-to financing works in real estate investing. Covers mechanics, due-on-sale clause risks, deal structuring, seller motivation, legal considerations, and examples.',
  },
  body: [
    p('st01', 'Subject-to financing is one of the most powerful creative acquisition strategies in real estate — and one of the least understood. When you buy a property "subject to" the existing mortgage, you take ownership of the property while the seller\'s original mortgage stays in place. You do not get a new loan. You do not go through bank underwriting. The seller\'s name stays on the mortgage, but you own the property, collect the rent, and make the mortgage payments. The deed transfers to you; the loan does not.'),
    p('st02', 'This strategy allows investors to acquire properties with little or no money down, at interest rates that may be significantly lower than what is available in the current market, and without the qualification requirements of traditional lending. A seller who locked in a 3.5 percent mortgage rate in 2021 is carrying financing that an investor cannot replicate in today\'s 7 percent rate environment. Buying that property subject-to means inheriting that below-market rate — a massive advantage for cash flow.'),

    h2('st03', 'How Subject-To Transactions Work'),
    p('st04', 'The mechanics are straightforward. The seller signs the deed over to you at closing. You are now the legal owner of the property. The existing mortgage remains in the seller\'s name with their original lender. You agree to make the mortgage payments on the seller\'s behalf. The seller\'s credit is still tied to the loan, and the loan still appears on their credit report. From the lender\'s perspective, nothing has changed — the same loan is being paid on the same property by the same borrower (on paper). From a legal ownership perspective, everything has changed — you own the property.'),
    p('st05', 'At closing, you will sign a purchase agreement, a warranty deed transferring ownership, an authorization for the seller to allow you to make payments and communicate with the lender, and often a memorandum of agreement that outlines each party\'s responsibilities. The closing can be handled by a title company or real estate attorney. The seller receives whatever equity payment you negotiate (often minimal), and you take over the property and the mortgage payments.'),

    h2('st06', 'The Due-on-Sale Clause: The Elephant in the Room'),
    p('st07', 'Every subject-to discussion must address the due-on-sale clause. Nearly all conventional mortgages contain a provision that gives the lender the right to demand full repayment of the loan if the property is transferred to a new owner. This is the due-on-sale clause, and it exists in virtually every Fannie Mae and Freddie Mac loan. In theory, when you buy a property subject-to and the deed transfers, the lender could invoke the due-on-sale clause and demand that the full loan balance be paid immediately.'),
    p('st08', 'In practice, lenders rarely enforce the due-on-sale clause when the mortgage payments are being made on time. Lenders are in the business of collecting interest, not calling loans due. Calling a loan due creates administrative costs, potential legal proceedings, and the risk of the property going to foreclosure — outcomes that are worse for the lender than simply continuing to receive monthly payments. That said, the risk is not zero. Some lenders do enforce due-on-sale clauses, particularly during periods of rising interest rates when they want to replace below-market loans with higher-rate loans. You must understand and accept this risk before pursuing subject-to deals.'),

    h2('st09', 'Why Sellers Agree to Subject-To'),
    p('st10', 'Subject-to deals work because certain sellers are in situations where a traditional sale is difficult or impossible. Common motivations include: the seller is behind on payments and facing foreclosure — a subject-to sale stops the foreclosure process and protects their credit from a foreclosure judgment. The seller owes more than the property is worth (underwater) and cannot sell conventionally without bringing money to closing. The seller needs to relocate quickly for a job, divorce, or family emergency and does not have time for a traditional listing. The property needs repairs that make it difficult to sell on the retail market. The seller is burned out as a landlord and wants to walk away from the property and the management responsibilities.'),
    p('st11', 'In each of these scenarios, the seller is motivated by a problem, and the subject-to buyer provides a solution. The key to ethical subject-to investing is ensuring that the seller understands the transaction fully — particularly that their name remains on the mortgage and their credit is affected by your payment performance. Transparent communication and proper legal documentation protect both parties.'),

    h2('st12', 'Deal Structuring: How the Numbers Work'),
    pLink('st13', [
      { text: 'Consider this example. A seller has a property worth $250,000 with a remaining mortgage balance of $220,000 at 3.5 percent interest. Their monthly payment is $1,200 (principal, interest, taxes, and insurance). The property rents for $2,000 per month. In today\'s market, a new investor loan at 7.5 percent on a $250,000 property requires 25 percent down ($62,500) and carries a monthly payment of approximately $1,750. With subject-to, you acquire the property for $5,000 to $10,000 (catching up the seller\'s back payments or providing a small equity payment), inherit the $1,200 monthly payment, and collect $2,000 in rent — generating $800 per month in gross cash flow before operating expenses. Compare that to the conventional scenario where your cash flow would be approximately $250 per month after the higher mortgage payment. Use our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' to model subject-to deals against traditional financing.' },
    ]),

    h2('st14', 'Subject-To vs. Other Creative Strategies'),
    pLink('st15', [
      { text: 'Subject-to is one of several creative financing strategies. ' },
      { text: 'Seller financing', href: '/blog/seller-financing-real-estate' },
      { text: ' is different — with seller financing, the seller owns the property free and clear and creates a new loan directly to you. There is no existing mortgage to worry about. A wrap-around mortgage is a hybrid where the seller creates a new loan to you at a higher rate while continuing to pay their existing mortgage at the lower rate, profiting from the spread. A lease option gives you the right to purchase the property at a future date while leasing it in the interim — no ownership transfer occurs until you exercise the option. Each strategy has its place. Subject-to is most powerful when the existing loan has favorable terms (low rate, high remaining balance) that you want to preserve.' },
    ]),

    h2('st16', 'Risks and Mitigation'),
    p('st17', 'Beyond the due-on-sale risk, subject-to deals carry additional considerations. The seller\'s credit is tied to your performance — if you miss payments, the seller\'s credit suffers and they may have legal recourse against you. The seller may file bankruptcy, creating complications with the property. Insurance can be complex — you need to ensure the property is properly insured with you as the owner and loss payee while the mortgage still references the seller. Property taxes must be paid on time to avoid lien priority issues. And the loan will eventually need to be refinanced or paid off — subject-to is a strategy for acquiring and holding properties, not a permanent financing solution.'),
    p('st18', 'Mitigate these risks by working with a real estate attorney experienced in subject-to transactions, setting up automatic payments to ensure the mortgage is never late, obtaining proper landlord insurance in your name, monitoring the loan status regularly, and having a clear exit strategy — either refinancing into your own loan within 2 to 5 years or selling the property and paying off the existing mortgage from the proceeds.'),

    h2('st19', 'Getting Started with Subject-To'),
    pLink('st20', [
      { text: 'Subject-to is an advanced strategy that requires strong deal analysis skills, clear legal documentation, and honest communication with sellers. Start by mastering the fundamentals of ' },
      { text: 'rental property analysis', href: '/blog/how-to-analyze-rental-property' },
      { text: ' and understanding how different financing structures affect your returns. Build a relationship with a real estate attorney who understands creative financing. Look for motivated sellers through direct mail, driving for dollars, and networking with wholesalers. And always model the worst case — if the lender calls the loan due, can you refinance or sell quickly enough to protect your position? If yes, subject-to can be one of the most capital-efficient strategies in your investing toolkit.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [firstRentalProperty, realEstateLLC, hardMoneyLoans, subjectTo]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 5a Content Seed: First Rental Property, LLC, Hard Money, Subject-To\n')

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
