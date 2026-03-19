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
const catStrategies = await getCategoryRef('Strategies', 'c2')
const catDealAnalysis = await getCategoryRef('Deal Analysis', 'c3')

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
// POST 5: Land Investing for Beginners
// ══════════════════════════════════════════════════════
const landInvesting = {
  _type: 'post',
  title: 'Land Investing for Beginners: How to Buy and Profit from Vacant Land',
  slug: { _type: 'slug', current: 'land-investing-beginners-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-06-29T10:00:00Z',
  excerpt: 'A beginner\'s guide to land investing — how to find, evaluate, and profit from vacant land through buy-and-hold, subdivision, seller financing, and development strategies.',
  seo: {
    metaTitle: 'Land Investing for Beginners: How to Profit from Vacant Land | ProInvestorHub',
    metaDescription: 'Complete beginner guide to land investing. Learn how to find cheap land, evaluate parcels, profit through seller financing and subdivision, and avoid common land buying mistakes.',
  },
  body: [
    p('la01', 'Land investing is the purest form of real estate — no tenants, no toilets, no termites. You buy a piece of vacant land, hold it until it appreciates, and sell it for a profit. Or you buy it at a deep discount and flip it quickly to another buyer. Or you subdivide it, develop it, or sell it on terms with seller financing. The simplicity is appealing, but land investing operates by different rules than residential or commercial real estate. There is no rental income, no depreciation, and no mortgage interest deduction. Your return comes entirely from buying right and selling strategically.'),
    p('la02', 'The land investing opportunity exists because vacant land is the most inefficiently priced asset class in real estate. Unlike houses, land is not listed on the MLS in any standardized way. There is no Zillow Zestimate for vacant lots. County tax assessments are often wildly inaccurate. And most land sellers are motivated by factors other than maximum price — they inherited the land and do not want it, they owe back taxes, or they simply forgot they owned it. These information asymmetries create opportunities for investors who understand how to find, evaluate, and acquire land at below-market prices.'),

    h2('la03', 'How Land Investing Works'),
    p('la04', 'The most common land investing model follows a straightforward process. You identify land owners who may be motivated to sell — typically through direct mail campaigns targeting owners of vacant lots in specific counties. You make offers at 20 to 40 percent of market value. A small percentage of owners accept. You close the purchase (often for cash at $2,000 to $20,000 for rural or exurban parcels). You list the land for sale at market value, typically offering seller financing (monthly payments) to maximize your buyer pool. The buyer pays you monthly installments over 3 to 10 years at 8 to 12 percent interest, generating passive income and a significant total return.'),
    p('la05', 'The economics are compelling. You buy a parcel for $5,000 that is worth $15,000 at retail. You sell it on terms — $500 down, $250 per month for 72 months at 10 percent interest. Your total collections over the life of the note are approximately $18,000 plus the $500 down payment — a 3.7x return on a $5,000 investment. If the buyer defaults (common with land notes), you get the land back and sell it again to a new buyer, potentially earning the same property twice.'),

    h2('la06', 'Finding Land Deals'),
    h3('la07', 'County Tax Delinquent Lists'),
    p('la08', 'Every county publishes a list of property owners who are delinquent on property taxes. These owners have demonstrated that they are not actively managing or valuing their land — they are not even paying the tax bill. Targeting delinquent land owners with purchase offers is one of the most effective acquisition strategies. Many counties publish these lists online or provide them upon request. Focus on counties where land values are $5,000 to $50,000 per parcel — high enough to generate meaningful profit but low enough that purchases can be funded with cash.'),

    h3('la09', 'Direct Mail Campaigns'),
    p('la10', 'The standard land investing acquisition method is sending direct mail offers to vacant land owners in target counties. You pull a list of vacant land parcels from the county assessor or a data provider like DataTree or PropStream, filter for your target parcel size and value range, and send a letter with a specific dollar offer. Response rates run 3 to 8 percent, and acceptance rates on responses run 10 to 30 percent. A campaign of 1,000 letters typically generates 2 to 10 accepted offers. The key is pricing your offers correctly — high enough that some sellers accept, low enough that every accepted deal is profitable.'),

    h2('la11', 'Evaluating Land Parcels'),
    p('la12', 'Land due diligence is different from residential property due diligence. You are evaluating access (does the parcel have legal road access or is it landlocked?), utilities (is water, electric, and sewer available or would they need to be brought in?), zoning (what can legally be built on the parcel?), topography (is the land buildable or is it steep, swampy, or in a flood zone?), environmental issues (wetlands, endangered species habitat, contamination), and title (is the title clean or are there liens, easements, or boundary disputes?). A parcel with no road access, no utilities, and wetland restrictions may be worth nothing regardless of its assessed value. Always research before you buy.'),

    h2('la13', 'Profit Strategies'),
    h3('la14', 'Cash Flip'),
    p('la15', 'Buy low, sell at market value for cash. The fastest exit but the lowest total return. Typical margins are 50 to 200 percent. List on Zillow, Facebook Marketplace, Craigslist, LandWatch, and Lands of America. Cash flips work best with parcels priced under $20,000 where the buyer pool is large.'),

    h3('la16', 'Seller Financing (Notes)'),
    pLink('la17', [
      { text: 'Sell the land on installment terms. This is the highest-return land strategy because you earn both the price markup and interest income over 3 to 10 years. ' },
      { text: 'Seller financing', href: '/blog/seller-financing-real-estate' },
      { text: ' dramatically expands your buyer pool because most people cannot or will not get a bank loan for raw land. You are the bank. Typical terms are $500 to $2,000 down, monthly payments of $150 to $500, and 8 to 12 percent interest over 3 to 10 years.' },
    ]),

    h3('la18', 'Subdivision'),
    p('la19', 'Buy a larger parcel and subdivide it into smaller lots, selling each lot individually. A 10-acre parcel purchased for $30,000 might subdivide into five 2-acre lots that sell for $15,000 each — $75,000 total versus $30,000 investment. Subdivision requires county approval, a surveyor, and sometimes infrastructure improvements (roads, utility easements). The profit margins can be exceptional but the timeline is longer (6 to 18 months for subdivision approval).'),

    h2('la20', 'Risks and Limitations'),
    p('la21', 'Land generates no income while you hold it. Unlike rental property, vacant land produces zero cash flow. You are betting entirely on your ability to sell at a profit. Property taxes are still due annually, creating a negative carry cost. Land is also less liquid than improved property — it can take months or years to find a buyer, especially for rural parcels. And land does not qualify for depreciation or most tax benefits available to rental property investors. These limitations make land investing a complement to, not a replacement for, income-producing real estate.'),

    h2('la22', 'Getting Started'),
    pLink('la23', [
      { text: 'Start small. Your first land deal should be a low-cost parcel ($2,000 to $5,000) in a county you have researched thoroughly. Send 500 to 1,000 direct mail offers, evaluate the responses, and close your first deal. The learning curve is steep on the first deal and flattens quickly. Many land investors scale to 5 to 10 deals per month within 6 to 12 months. The capital requirements are low compared to traditional ' },
      { text: 'rental property investing', href: '/blog/rental-property-investing-complete-guide' },
      { text: ', making land an accessible entry point for investors with limited capital.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 6: Real Estate Partnership Structures
// ══════════════════════════════════════════════════════
const partnershipGuide = {
  _type: 'post',
  title: 'Real Estate Partnership Structures: How to Split Deals the Right Way',
  slug: { _type: 'slug', current: 'real-estate-partnership-structures' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-07-03T10:00:00Z',
  excerpt: 'How to structure real estate partnerships — common deal splits, LLC operating agreements, equity vs. sweat equity, capital calls, and how to avoid the disputes that destroy partnerships.',
  seo: {
    metaTitle: 'Real Estate Partnership Structures: How to Split Deals | ProInvestorHub',
    metaDescription: 'Complete guide to real estate partnership structures. Learn about deal splits, LLC agreements, equity contributions, capital calls, and how to protect yourself in joint ventures.',
  },
  body: [
    p('pa01', 'Real estate partnerships accelerate portfolio growth by combining capital, expertise, credit, and time from multiple investors. The partner with money teams up with the partner who finds deals. The experienced investor mentors the beginner in exchange for deal participation. The high-income professional provides capital while the hands-on partner manages the project. These arrangements create value that neither partner could achieve alone — but they also create conflict when expectations are unclear, contributions are unbalanced, or exits are misaligned.'),
    p('pa02', 'More real estate partnerships end badly than end well, and the failure is almost always preventable. The issues are not financial or market-related — they are structural. Partners who do not define roles, contribution expectations, decision-making authority, and exit procedures before the deal closes are setting themselves up for disagreement when the first unexpected situation arises. And in real estate, unexpected situations are the norm. This guide covers the most common partnership structures, how to negotiate fair splits, and the operating agreement provisions that protect both parties.'),

    h2('pa03', 'Common Partnership Structures'),
    h3('pa04', 'Money Partner + Operations Partner'),
    p('pa05', 'The most common real estate partnership: one partner provides the capital (down payment, closing costs, and reserves) while the other partner finds the deal, manages the renovation (if applicable), places tenants, and handles ongoing property management. A typical split is 50/50 on cash flow and equity, with the money partner receiving a preferred return of 6 to 8 percent annually before profits are split. This preferred return compensates the money partner for the opportunity cost of their capital. The operations partner receives their share of profits in exchange for sweat equity — the value of their time, expertise, and deal-finding ability.'),

    h3('pa06', 'Equal Capital Partners'),
    p('pa07', 'Two or more investors contribute equal capital to acquire a property. The split is proportional to contribution — 50/50, 33/33/33, or 25/25/25/25. One partner is typically designated as the managing partner, responsible for day-to-day decisions, and receives either a management fee (similar to property management at 8 to 10 percent of gross rent) or a slightly larger share of profits in exchange for their additional time commitment. This structure works well when all partners are experienced and want to pool capital for larger deals.'),

    h3('pa08', 'Joint Venture (Project-Specific)'),
    p('pa09', 'A joint venture is a partnership formed for a single project — typically a flip, a development, or a value-add renovation. The JV dissolves after the project is completed and profits are distributed. JVs are simpler than ongoing partnerships because there is a defined exit timeline. Common JV splits for flips are 50/50 after the capital partner receives their investment back plus a preferred return, or 70/30 in favor of the capital partner with the 30 going to the operator who manages the project.'),

    h2('pa10', 'How to Structure the Split'),
    p('pa11', 'The right split depends on what each partner brings. A partner who provides 100 percent of the capital deserves more than a partner who makes phone calls. A partner who finds a deal at 30 percent below market has created more value than a partner who writes a check. There is no universal formula — splits are negotiated based on the relative value of each contribution.'),
    p('pa12', 'A good framework: the capital contribution is worth 40 to 60 percent of the deal (depending on the amount and the risk). The deal-finding ability is worth 10 to 20 percent. The project management (renovation, tenant placement, ongoing management) is worth 20 to 30 percent. The credit or guarantor risk (signing on the mortgage) is worth 5 to 15 percent. Add up each partner\'s contributions by value and the split follows naturally. Document this in the operating agreement so both parties understand the rationale.'),

    h2('pa13', 'The Operating Agreement'),
    pLink('pa14', [
      { text: 'Every real estate partnership should be structured through an ' },
      { text: 'LLC', href: '/blog/real-estate-llc-rental-properties' },
      { text: ' with a detailed operating agreement drafted by a real estate attorney. The operating agreement is the constitution of your partnership — it defines roles, responsibilities, financial arrangements, decision-making authority, and exit procedures. Never rely on a handshake, an email, or a generic template downloaded from the internet.' },
    ]),
    p('pa15', 'Critical operating agreement provisions include: capital contributions (how much each partner contributes and when), profit and loss allocation (how cash flow, equity, and tax benefits are split), management authority (who makes what decisions, what requires unanimous consent), capital calls (what happens if the property needs additional capital — can the managing partner call for additional contributions, and what happens if a partner cannot or will not contribute?), buyout provisions (how one partner can buy out the other, including valuation methodology and payment terms), dispute resolution (mediation before litigation), and exit provisions (how the partnership is dissolved and the property is sold or transferred).'),

    h2('pa16', 'Red Flags in Partnership Proposals'),
    p('pa17', 'Walk away from partnerships where the other party refuses to use an LLC and operating agreement (this protects both of you), where the split does not reflect actual contributions (a partner who contributes nothing but wants 50 percent is not a partner — they are a freeloader), where there is no defined exit strategy or buyout provision, where one partner wants total control without proportional capital at risk, or where the partner has a history of partnership disputes. Ask for references from previous partners — and actually call them.'),

    h2('pa18', 'When Partnerships Make Sense'),
    pLink('pa19', [
      { text: 'Partnerships make sense when they create value that neither partner can access alone. If you have capital but no deals, a partner with deal flow creates value. If you have deal-finding ability but no capital, a money partner creates value. If you want to acquire a property larger than your individual capital allows, pooling resources makes the deal possible. But partnerships add complexity, reduce control, and create potential for conflict. If you can do the deal yourself — even if it means starting smaller — solo ownership is simpler and keeps 100 percent of the returns. As you ' },
      { text: 'build your portfolio', href: '/blog/building-real-estate-portfolio' },
      { text: ', you will develop a sense for when partnership value exceeds partnership risk.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 7: Real Estate Due Diligence Checklist
// ══════════════════════════════════════════════════════
const dueDiligenceGuide = {
  _type: 'post',
  title: 'Real Estate Due Diligence: The Complete Investor Checklist',
  slug: { _type: 'slug', current: 'real-estate-due-diligence-checklist' },
  author: authorRef,
  categories: [catDealAnalysis],
  publishedAt: '2026-07-07T10:00:00Z',
  excerpt: 'The complete due diligence checklist for real estate investors — property inspection, financial analysis, title review, insurance, and market verification steps before closing any deal.',
  seo: {
    metaTitle: 'Real Estate Due Diligence Checklist for Investors | ProInvestorHub',
    metaDescription: 'Complete due diligence checklist for real estate investors. Cover property inspection, financial verification, title review, insurance quotes, and market analysis before closing.',
  },
  body: [
    p('dd01', 'Due diligence is the investigation period between your accepted offer and closing — the window where you verify that the property is what the seller says it is and the numbers work the way your analysis projects. This is the most important phase of any real estate transaction, and it is the phase that separates disciplined investors from those who lose money on bad deals. The cost of thorough due diligence is a few hundred to a few thousand dollars. The cost of skipping it can be tens of thousands in surprise repairs, legal issues, or negative cash flow.'),
    pLink('dd02', [
      { text: 'Most purchase contracts include a due diligence contingency (also called an inspection contingency) that gives you 7 to 21 days to investigate the property. If you discover problems that change your analysis, you can renegotiate the price, request repairs, or walk away and get your earnest money back. Once the contingency period expires, you are typically committed to close. Use every day of this window productively. This checklist covers every step, organized in the order you should execute them. Run the numbers through our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ' at each stage as new information adjusts your projections.' },
    ]),

    h2('dd03', 'Phase 1: Property Inspection (Days 1–5)'),
    h3('dd04', 'Professional Home Inspection'),
    p('dd05', 'Hire a licensed home inspector — budget $300 to $600 depending on property size and location. The inspector evaluates the structural integrity (foundation, framing, roof), mechanical systems (HVAC, plumbing, electrical), exterior condition (siding, windows, grading, drainage), and safety concerns (radon, mold, asbestos, lead paint). Request a written report with photos and estimated repair costs. This report is your primary negotiation tool — every issue identified is either a price reduction or a repair request.'),

    h3('dd06', 'Specialist Inspections'),
    p('dd07', 'Based on the general inspection results, you may need specialist evaluations: sewer scope ($150 to $300) — camera inspection of the sewer line from the property to the street. Critical for older properties with clay or cast iron pipes that are prone to root intrusion and collapse. Foundation inspection ($300 to $500) — if the general inspector flags foundation concerns. Roof inspection (often free from roofing contractors) — if the roof is over 15 years old. Pest inspection ($100 to $200) — termite and wood-destroying insect inspection. Mold testing ($200 to $600) — if moisture or mold is visible or suspected. Environmental assessment ($300 to $1,500) — for commercial properties or properties near gas stations, dry cleaners, or industrial sites.'),

    h2('dd08', 'Phase 2: Financial Verification (Days 3–10)'),
    h3('dd09', 'Rent Verification'),
    pLink('dd10', [
      { text: 'If the property is currently rented, request copies of all current leases, the rent roll (list of tenants and what they pay), and 12 months of rent payment history. Verify that the seller\'s stated rental income matches actual collections. If the property is vacant, verify that your projected rent is achievable by checking comparable rentals within a half-mile radius on Zillow, Apartments.com, and Craigslist. Visit competing rental listings in person to compare condition and amenities. Conservative rent estimates are critical — your entire ' },
      { text: 'cash flow analysis', href: '/calculators/rental-cashflow' },
      { text: ' depends on getting this number right.' },
    ]),

    h3('dd11', 'Expense Verification'),
    p('dd12', 'Verify every expense line in your analysis with actual data. Property taxes — check the county assessor website for the current assessed value and tax rate. Be aware that your purchase price may trigger a reassessment that increases property taxes. Insurance — get an actual quote from an insurance agent, not an estimate. Utilities — request 12 months of utility bills from the seller if the landlord pays any utilities. HOA fees — request the HOA financial statements and minutes from the last three board meetings. Look for special assessments, reserve fund shortfalls, and pending litigation. Maintenance history — request the seller\'s maintenance records for the past 2 to 3 years.'),

    h2('dd13', 'Phase 3: Title and Legal Review (Days 5–14)'),
    h3('dd14', 'Title Search'),
    p('dd15', 'Your title company or attorney conducts a title search to verify that the seller has clear, marketable title to the property. The title search reveals liens (mortgage liens, tax liens, mechanic\'s liens, judgment liens), easements (utility easements, access easements, conservation easements), encroachments (structures that cross property lines), and deed restrictions (covenants that limit use). Any issues must be resolved before closing. Title insurance protects you against undiscovered title defects — always purchase an owner\'s title insurance policy in addition to the lender\'s policy.'),

    h3('dd16', 'Zoning and Code Compliance'),
    p('dd17', 'Verify that the property\'s current use is legally permitted under the zoning code. This is especially important for multifamily properties — a property that was converted from single-family to duplex without proper permits may be non-conforming, creating liability and financing issues. Check for open building permits, code violations, and any pending zoning changes that could affect the property. Call the local building department and ask if there are any outstanding issues on the property address.'),

    h2('dd18', 'Phase 4: Market Verification (Days 7–14)'),
    h3('dd19', 'Comparable Sales Analysis'),
    pLink('dd20', [
      { text: 'Verify that the purchase price is at or below market value by analyzing 3 to 5 comparable recent sales within a half-mile radius. Calculate the ' },
      { text: 'ARV', href: '/blog/how-to-calculate-arv' },
      { text: ' if you plan to renovate. If the property is priced above comparable sales and you cannot negotiate a reduction, walk away.' },
    ]),

    h3('dd21', 'Neighborhood Assessment'),
    p('dd22', 'Drive the neighborhood at different times — morning, evening, and weekend. Walk the block. Talk to neighbors if possible. Check crime statistics on CrimeMapping or SpotCrime. Look for positive indicators (occupied homes, maintained yards, new construction, business activity) and negative indicators (boarded-up properties, excessive litter, abandoned vehicles, loitering). The neighborhood determines your tenant quality, vacancy rate, and long-term appreciation — a great property in a declining neighborhood is not a great deal.'),

    h2('dd23', 'Phase 5: Final Decision (Days 14–21)'),
    pLink('dd24', [
      { text: 'Compile all your findings and re-run your financial analysis with actual verified data — real insurance quotes, verified rents, actual property taxes, identified repair costs, and market-confirmed purchase price. If the deal still meets your investment criteria after incorporating all due diligence findings, proceed to close. If the numbers have changed materially, renegotiate or walk away. The discipline to walk away from a deal that does not work is the most valuable skill in real estate investing. There are always more deals — there is only one of your capital. Use our ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' and ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' to model the final numbers before making your go/no-go decision.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 8: How to Find a Real Estate Mentor
// ══════════════════════════════════════════════════════
const mentorGuide = {
  _type: 'post',
  title: 'How to Find a Real Estate Mentor (Without Paying for a Guru Program)',
  slug: { _type: 'slug', current: 'how-to-find-real-estate-mentor' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-07-10T10:00:00Z',
  excerpt: 'How to find a legitimate real estate mentor — where to look, how to approach them, what to offer in return, and how to avoid the paid guru programs that waste your money.',
  seo: {
    metaTitle: 'How to Find a Real Estate Mentor (Skip the Guru Programs) | ProInvestorHub',
    metaDescription: 'Learn how to find a real estate investing mentor without paying for expensive coaching programs. Covers where to find mentors, how to approach them, and what to offer in exchange.',
  },
  body: [
    p('mt01', 'A good real estate mentor can compress years of learning into months. They have made the mistakes you have not made yet, they know the market dynamics that books cannot teach, and they can evaluate your deals with pattern recognition that only comes from experience. The right mentor relationship is one of the highest-value assets a new investor can develop. The wrong one — particularly a paid "guru" program — can cost you thousands of dollars for information you could find for free and coaching that amounts to upselling you on the next tier of their program.'),
    p('mt02', 'The real estate industry has a guru problem. Social media is saturated with self-proclaimed experts selling $5,000 to $50,000 mentorship programs that promise to teach you their "proven system." Some of these programs deliver value. Most deliver recycled content, group Zoom calls with hundreds of participants, and relentless pressure to buy additional products. The best mentors are not selling mentorship — they are too busy investing. Finding them requires a different approach.'),

    h2('mt03', 'Where to Find Real Mentors'),
    h3('mt04', 'Local Real Estate Investment Associations (REIAs)'),
    p('mt05', 'REIAs are the single best place to find mentors. Every major metro has at least one REIA that meets monthly, and many have subgroups focused on specific strategies (wholesaling, landlording, flipping, commercial). Attend consistently — not once, but for months. The investors who show up regularly and contribute value to discussions are the ones who attract mentor interest. The key is to be useful, not needy. Ask intelligent questions. Offer to help with tasks. Share relevant market data or deal analysis. Experienced investors mentor people who demonstrate initiative, not people who ask to be mentored.'),

    h3('mt06', 'BiggerPockets and Online Communities'),
    p('mt07', 'BiggerPockets forums, Facebook groups, and Reddit communities like r/realestateinvesting contain investors at every experience level. The most helpful contributors — those who consistently provide detailed, thoughtful answers — are often willing to connect one-on-one if you approach them correctly. Engage meaningfully in discussions for weeks or months before sending a private message. When you do reach out, reference a specific post they wrote, explain what you are working on, and ask a specific question — not "will you be my mentor?" Nobody responds positively to that generic request.'),

    h3('mt08', 'Local Networking'),
    p('mt09', 'Real estate is a local business. Attend open houses for investment properties, foreclosure auctions, courthouse steps sales, and landlord association meetings. Introduce yourself to property managers, contractors, and real estate agents who work with investors — they know who the active investors in your market are. Ask for introductions. The real estate community in most markets is smaller than you think, and investors who are actively buying are usually willing to talk about what they do.'),

    h2('mt10', 'How to Approach a Potential Mentor'),
    p('mt11', 'The worst approach is asking someone to be your mentor. It puts all the obligation on them and offers nothing in return. The best approach is to build a relationship where mentorship happens naturally. Start by providing value — share a deal you found (even if you are not buying it), offer to help with a task they need done (driving for dollars, researching comparable sales, visiting properties), or share relevant market information. Demonstrate that you are taking action, not just talking about investing. Ask specific questions about their experience, not generic questions you could answer with a Google search.'),
    p('mt12', 'When you do ask for guidance, make it easy to say yes. Instead of "can you teach me everything about real estate investing," try "I am analyzing a duplex on Elm Street — would you be willing to look at my numbers for 15 minutes and tell me what I am missing?" Specific, time-bounded requests get answered. Open-ended requests get ignored.'),

    h2('mt13', 'What to Offer in Return'),
    p('mt14', 'The best mentor relationships are mutually beneficial. Consider what you can offer: time (experienced investors are busy — helping with research, property visits, or deal sourcing saves them time), a complementary skill (social media, data analysis, construction experience, legal knowledge), deal flow (if you are actively marketing for deals, sharing leads you cannot pursue yourself is valuable), and enthusiasm (investors who have been doing this for 20 years appreciate working with someone who is genuinely excited about learning). The goal is to create a relationship where your mentor benefits from helping you — not a charity arrangement where they give and you take.'),

    h2('mt15', 'Red Flags: Guru Programs to Avoid'),
    p('mt16', 'Avoid programs that promise guaranteed results or specific income levels. Avoid programs that require you to "invest in yourself" with a $10,000 to $50,000 upfront payment. Avoid programs that are primarily teaching you to teach others (multilevel marketing disguised as real estate education). Avoid anyone whose primary business model is selling courses rather than doing deals. And be skeptical of anyone who shows off luxury possessions (cars, watches, houses) as proof of their investing success — successful investors rarely need to convince you they are successful.'),

    h2('mt17', 'The DIY Alternative'),
    pLink('mt18', [
      { text: 'You do not need a mentor to get started. Between free resources like BiggerPockets, YouTube, podcasts, and comprehensive guides like those on ' },
      { text: 'ProInvestorHub', href: '/blog' },
      { text: ', you can learn enough to analyze and execute your first deal. Start with our ' },
      { text: 'beginner\'s guide', href: '/blog/real-estate-investing-beginners-guide-2026' },
      { text: ', use our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ' to run the numbers, and take action. A mentor accelerates the process, but action is the real teacher. Your first deal will teach you more than any mentor or course. Get started, make small mistakes you can afford, learn from them, and the mentor relationship will develop naturally as you become an active participant in your local investing community.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [landInvesting, partnershipGuide, dueDiligenceGuide, mentorGuide]

async function seed() {
  console.log('Wave 6b Content Seed: Land, Partnerships, Due Diligence, Mentor\n')

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
