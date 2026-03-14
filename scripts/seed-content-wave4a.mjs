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
 * Build a paragraph block with inline links.
 * segments: array of { text } or { text, href }
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
// POST 1: ADU Investing Guide
// ══════════════════════════════════════════════════════
const aduInvestingGuide = {
  _type: 'post',
  title: 'ADU Investing: The Complete Guide to Accessory Dwelling Units',
  slug: { _type: 'slug', current: 'adu-investing-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-04-21T10:00:00Z',
  excerpt: 'How to build, finance, and profit from accessory dwelling units (ADUs) — including types, costs, zoning considerations, and ROI analysis for real estate investors.',
  seo: {
    metaTitle: 'ADU Investing Guide: How to Profit from Accessory Dwelling Units | ProInvestorHub',
    metaDescription: 'Complete guide to ADU investing for real estate investors. Learn ADU types, costs ($50K-$300K), financing options, zoning rules, rental income potential, and ROI analysis.',
  },
  body: [
    // ── Introduction ──────────────────────────────────
    p('ad01', 'Accessory dwelling units have gone from a niche zoning curiosity to one of the most compelling investment opportunities in residential real estate. ADUs — also known as granny flats, in-law suites, backyard cottages, or casitas — are secondary housing units built on a single-family residential lot. They represent a rare convergence of favorable policy, strong demand, and attractive investor economics that is reshaping how smart investors think about single-family properties.'),
    p('ad02', 'The numbers tell a compelling story. Cities across the country are loosening zoning restrictions to encourage ADU construction as a solution to the housing affordability crisis. California, Oregon, Washington, and dozens of major metro areas have passed legislation making ADU permitting faster, cheaper, and more accessible. Meanwhile, rents continue to climb in most markets, and the demand for smaller, more affordable rental units far exceeds supply. For investors, this means the ability to add a second income stream to an existing property — or to acquire properties specifically for ADU potential — at a time when regulations are increasingly favorable.'),
    pLink('ad03', [
      { text: 'This guide covers everything you need to know about ADU investing in 2026: the different types of ADUs and their cost ranges, how to finance construction, navigating zoning and permitting, analyzing rental income potential, and calculating your return on investment. Whether you are adding an ' },
      { text: 'ADU', href: '/glossary/adu' },
      { text: ' to a property you already own or acquiring a property specifically for its ADU potential, the strategies here will help you make data-driven decisions.' },
    ]),

    // ── Section 1: What Is an ADU? ──────────────────
    h2('ad04', 'What Is an ADU and Why Do Investors Care?'),
    p('ad05', 'An accessory dwelling unit is a self-contained residential unit located on the same lot as a primary single-family home. It has its own entrance, kitchen, bathroom, and living space. ADUs can be attached to the main house, built as a separate structure in the backyard, or converted from existing space like a garage or basement. The key distinction is that the ADU is secondary to the primary residence — it exists on a lot that is already zoned for single-family use.'),
    p('ad06', 'For investors, ADUs represent something unusual in real estate: the ability to increase a property\'s income without buying additional land or navigating commercial zoning. A single-family home that rents for $2,000 per month becomes a dual-income property generating $3,200 per month when you add a one-bedroom ADU that rents for $1,200. That additional income transforms the property\'s cash flow, cap rate, and overall return profile — often turning a break-even deal into a strong performer.'),
    p('ad07', 'The investment thesis is straightforward. You are adding habitable square footage to an existing lot at a cost per square foot that is typically lower than new construction. You are creating rental income that is secured by a housing unit in a market where small, affordable units are in critically short supply. And you are doing it in a regulatory environment that is becoming more permissive, not less. Cities want ADUs because they add housing supply without changing neighborhood character. Investors want ADUs because they generate income. That alignment of interests is rare in real estate, and it creates a window of opportunity.'),

    // ── Section 2: Types of ADUs ─────────────────────
    h2('ad08', 'Types of ADUs: Detached, Attached, Garage Conversion, and Basement'),

    h3('ad09', 'Detached ADUs'),
    p('ad10', 'A detached ADU is a standalone structure built in the backyard or side yard of an existing property. These are the most common type of new ADU construction and offer the most design flexibility. Typical detached ADUs range from 400 to 1,200 square feet, with one or two bedrooms. Because they are separate from the main house, they provide maximum privacy for both the primary tenant and the ADU tenant — which translates to higher rental rates and lower turnover. The downside is cost: detached ADUs require their own foundation, utility connections, and full construction, making them the most expensive option at $150,000 to $300,000 or more depending on size, finishes, and local construction costs.'),

    h3('ad11', 'Attached ADUs'),
    p('ad12', 'An attached ADU is an addition built onto the existing primary residence. It shares at least one wall with the main house but has its own separate entrance, kitchen, and bathroom. Attached ADUs are generally less expensive than detached units because they can leverage the existing structure\'s foundation, roofline, and utility connections. Costs typically range from $100,000 to $200,000. The trade-off is less privacy and potential noise issues between the units. Attached ADUs work well when the lot is too small for a separate structure or when the primary home\'s layout allows for a natural addition.'),

    h3('ad13', 'Garage Conversions'),
    p('ad14', 'Converting an existing garage into a living space is often the most cost-effective ADU strategy, with costs ranging from $50,000 to $150,000. The structure already exists — you are adding insulation, drywall, plumbing, electrical, a kitchen, and a bathroom to an enclosed space. Many cities have streamlined permitting for garage conversions specifically because they involve minimal new construction. The primary consideration is parking: if your city requires off-street parking, converting the garage may require adding a parking pad elsewhere on the lot. Some jurisdictions have eliminated parking requirements for ADUs entirely, which makes garage conversions even more attractive.'),

    h3('ad15', 'Basement Conversions'),
    p('ad16', 'In markets where homes have full basements, converting the basement into an ADU can be highly cost-effective at $50,000 to $120,000. The space, foundation, and basic utility infrastructure already exist. The main challenges are ceiling height (most codes require a minimum of 7 feet), egress windows for bedrooms (required by building code for safety), moisture control, and creating a separate entrance. Basement ADUs work best in colder climates where basements are standard and in older neighborhoods with homes built over full foundations. They are less common in the Sun Belt and western states where slab foundations dominate.'),

    // ── Section 3: ADU Costs and Budgeting ───────────
    h2('ad17', 'ADU Costs: What to Budget in 2026'),
    p('ad18', 'Understanding the full cost picture is critical before committing to an ADU project. Construction costs vary dramatically by type, location, size, and finish level. Here is a realistic breakdown based on current market conditions.'),

    h3('ad19', 'Construction Cost Ranges'),
    p('ad20', 'Garage conversion: $50,000 to $150,000. This is the lowest-cost option because the shell structure exists. Costs depend on the extent of plumbing and electrical work required and the quality of finishes. Basement conversion: $50,000 to $120,000. Similar to garage conversions, the space exists but needs to be finished to habitable standards. Costs are driven by moisture remediation, egress requirements, and ceiling height. Attached ADU: $100,000 to $200,000. Sharing walls and infrastructure with the main house reduces costs compared to detached construction. Detached ADU: $150,000 to $300,000 or more. Full new construction with separate foundation, utilities, and structure. Prefabricated or modular detached ADUs can reduce costs to $120,000 to $200,000 for standard configurations.'),

    h3('ad21', 'Soft Costs to Include'),
    p('ad22', 'Construction costs are only part of the picture. Budget 15 to 25 percent of construction costs for soft costs including: architectural and engineering plans ($5,000 to $15,000), permit fees ($2,000 to $15,000 depending on jurisdiction), impact fees or school fees (some cities charge $5,000 to $20,000), utility connection fees ($3,000 to $10,000 for new service lines), survey and site preparation ($2,000 to $5,000), and project management or general contractor markup (10 to 20 percent of construction costs). A detached ADU with $200,000 in construction costs might have $40,000 to $50,000 in soft costs, bringing the total project to $240,000 to $250,000.'),

    h3('ad23', 'How to Reduce ADU Costs'),
    p('ad24', 'Prefab and modular ADUs have emerged as a cost-saving option. Companies like Abodu, Villa, and Boxabl offer pre-designed units that are manufactured off-site and installed on your property. These units can reduce construction timelines from 6 to 12 months down to 2 to 4 months and lower costs by 10 to 30 percent compared to custom construction. The trade-off is less design flexibility. Other cost-saving strategies include choosing a garage or basement conversion over new construction, keeping the ADU under 500 square feet to reduce materials and some permit requirements, using standard finishes rather than custom, and acting as your own general contractor if you have construction management experience.'),

    // ── Section 4: Financing Your ADU ────────────────
    h2('ad25', 'How to Finance an ADU'),
    pLink('ad26', [
      { text: 'ADU financing has improved significantly as the market has matured. Several loan products now specifically target ADU construction, in addition to traditional options. Here are the primary financing paths available to investors.' },
    ]),

    h3('ad27', 'Home Equity Loans and HELOCs'),
    pLink('ad28', [
      { text: 'If you own the property with significant equity, a home equity loan or ' },
      { text: 'HELOC', href: '/glossary/heloc' },
      { text: ' is often the simplest financing option. You borrow against your existing equity to fund construction. Current HELOC rates range from 7 to 9 percent, and you can draw funds as needed during construction rather than taking a lump sum. The advantage is speed and simplicity — no separate construction loan closing, no draw schedules to manage. The disadvantage is that your primary property secures the loan, so you are adding risk to an existing asset.' },
    ]),

    h3('ad29', 'Construction Loans'),
    p('ad30', 'A construction loan provides funds specifically for building the ADU. These are short-term loans (typically 12 to 18 months) that disburse in stages as construction progresses. Once the ADU is complete, you refinance into permanent financing. Construction loan rates are typically 8 to 12 percent with 1 to 2 points in origination fees. They require detailed construction plans, contractor bids, and a project timeline. Construction loans make sense for larger projects where you do not have sufficient equity for a HELOC or prefer to keep your existing financing in place.'),

    h3('ad31', 'DSCR Loans for ADU Properties'),
    pLink('ad32', [
      { text: 'Once your ADU is complete and rented, you can refinance the entire property — primary residence plus ADU — using a ' },
      { text: 'DSCR loan', href: '/blog/dscr-investor-financing-guide' },
      { text: ' based on the combined rental income. This is the strategy many investors use: finance construction with short-term capital (HELOC, construction loan, or cash), complete and rent the ADU, then refinance based on the higher income. The DSCR refinance captures the increased property value and income stream, often allowing you to recover a significant portion of your construction investment.' },
    ]),

    h3('ad33', 'Cash-Out Refinance'),
    p('ad34', 'After the ADU is built and the property has been reappraised, a cash-out refinance lets you pull equity from the increased property value. If your property was worth $500,000 before the ADU and appraises at $650,000 after, a 75 percent LTV cash-out refinance provides a $487,500 loan. If your existing mortgage balance was $350,000, you receive $137,500 in cash — potentially recovering most or all of your ADU construction costs while keeping the new income stream. This is the ADU equivalent of the BRRRR strategy.'),

    h3('ad35', 'Renovation and ADU-Specific Loan Programs'),
    p('ad36', 'Several loan products have emerged specifically for ADU financing. FHA 203(k) loans allow you to finance the purchase of a property and ADU construction in a single loan. Fannie Mae\'s HomeStyle Renovation loan covers ADU construction for owner-occupied properties. Some state and local programs offer ADU-specific loans or grants — California\'s CalHFA ADU program, for example, provides junior loans up to $40,000 for ADU construction. Check your state housing finance agency for ADU incentive programs, as new ones are launching regularly.'),

    // ── Section 5: Zoning and Permitting ─────────────
    h2('ad37', 'Navigating ADU Zoning and Permitting'),
    p('ad38', 'Zoning and permitting is where many ADU projects stall. The good news is that the regulatory environment is moving decisively in favor of ADUs. The challenge is that rules vary significantly by state, county, and city — and sometimes even by neighborhood within a city.'),

    h3('ad39', 'The National ADU Trend'),
    p('ad40', 'California led the way with statewide legislation in 2016 that effectively overrode local zoning barriers to ADUs. Since then, Oregon, Washington, Vermont, and Connecticut have passed similar statewide ADU legalization. Major cities including Portland, Seattle, Minneapolis, Austin, and Denver have adopted permissive ADU ordinances. The direction is clear: more jurisdictions are making ADUs easier to build, not harder. Even traditionally restrictive suburban communities are opening up as the housing affordability crisis intensifies.'),

    h3('ad41', 'Key Zoning Factors to Research'),
    p('ad42', 'Before investing in an ADU project, verify these zoning requirements in your target jurisdiction: Is the property zoned for ADU construction? Most single-family residential zones now allow ADUs, but some still restrict them. What is the maximum ADU size allowed? Common limits are 800 to 1,200 square feet or 50 percent of the primary home\'s living area. Are there setback requirements? Rear and side yard setbacks of 4 to 5 feet are typical, but some jurisdictions have reduced or eliminated them for ADUs. Is owner occupancy required? Some cities require the property owner to live in either the primary unit or the ADU. This can affect your investment strategy if you plan to rent both units. Is off-street parking required? Many cities have eliminated parking requirements for ADUs, especially near transit. Are there design standards? Some jurisdictions require the ADU to match the architectural style of the primary residence.'),

    h3('ad43', 'The Permitting Process'),
    p('ad44', 'The ADU permitting process typically involves submitting architectural plans to your local building department, paying permit and impact fees, undergoing plan review (2 to 12 weeks depending on jurisdiction), obtaining a building permit, completing construction with required inspections, and receiving a certificate of occupancy. Total permitting timeline varies from 4 weeks in streamlined jurisdictions to 6 months or more in complex ones. California has mandated 60-day review periods for ADU permits. Some cities offer expedited review for pre-approved ADU plans, which can reduce the timeline significantly.'),

    // ── Section 6: Rental Income and ROI ─────────────
    h2('ad45', 'ADU Rental Income Potential and ROI Analysis'),
    pLink('ad46', [
      { text: 'The financial case for ADUs comes down to a straightforward calculation: does the additional rental income justify the construction investment? Use our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' and ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' to model your specific scenario.' },
    ]),

    h3('ad47', 'Typical ADU Rental Income'),
    p('ad48', 'ADU rental rates depend on location, size, and finish quality. As a general framework: studio and one-bedroom ADUs (400 to 600 square feet) typically rent for 40 to 60 percent of what a comparable one-bedroom apartment commands in the area. Two-bedroom ADUs (600 to 1,000 square feet) rent for 50 to 70 percent of a comparable two-bedroom apartment. In a market where one-bedroom apartments rent for $1,500 per month, a well-built 600-square-foot ADU might rent for $900 to $1,100. In higher-cost markets like coastal California or the Pacific Northwest, ADU rents of $1,500 to $2,500 per month are common.'),

    h3('ad49', 'ROI Calculation Example'),
    p('ad50', 'Consider this example: you build a detached ADU for a total cost of $200,000 (including soft costs). The ADU rents for $1,400 per month, generating $16,800 per year in gross income. After vacancy (5 percent), maintenance, insurance, and property tax increase, net operating income from the ADU is approximately $13,500 per year. If you financed the ADU with a HELOC at 8 percent interest-only, your annual interest cost is $16,000 — meaning the ADU is slightly negative on a cash flow basis in year one. However, you have added $150,000 to $200,000 in property value (ADUs typically add 60 to 80 percent of their construction cost to property value), and rents will increase over time while your financing cost remains fixed or can be refinanced.'),
    pLink('ad51', [
      { text: 'The long-term picture is more compelling. Over 5 years, assuming 3 percent annual rent growth, the ADU generates roughly $89,000 in cumulative gross rent. After 5 years, you refinance the full property at its new appraised value, potentially recovering your entire ADU investment while keeping the income stream. The ' },
      { text: 'cash-on-cash return', href: '/calculators/cash-on-cash' },
      { text: ' improves each year as rents grow faster than financing costs. By year 3 to 5, most well-executed ADU investments are generating strong positive cash flow and significant equity upside.' },
    ]),

    h3('ad52', 'Short-Term Rental ADU Strategy'),
    p('ad53', 'In markets that allow short-term rentals, ADUs can generate significantly higher income as Airbnb or VRBO listings. A one-bedroom ADU that rents for $1,200 per month as a long-term rental might generate $2,500 to $3,500 per month as a short-term rental — doubling or tripling the income. The trade-off is higher management costs, more turnover, regulatory risk (short-term rental rules are tightening in many cities), and seasonal income variability. For investors in tourist-heavy or high-demand markets, the short-term rental ADU strategy can dramatically accelerate ROI.'),

    // ── Section 7: Value-Add Strategy ────────────────
    h2('ad54', 'The ADU Value-Add Strategy: Buying Properties for ADU Potential'),
    p('ad55', 'One of the most powerful ADU investment strategies is acquiring single-family properties specifically because they have ADU potential that the current owner has not exploited. You buy a single-family home with a large backyard or an existing garage in a city that allows ADUs, build the unit, stabilize with tenants, and then either hold the dual-income property or sell at the higher value.'),
    p('ad56', 'This is a value-add play that can create $100,000 or more in equity through the construction process. The key is finding properties where the lot size, zoning, and existing structures support ADU construction — and where the current price reflects only the single-family use. Look for properties with oversized lots (7,000+ square feet is ideal), existing detached garages that can be converted, neighborhoods where ADU rents are strong, and jurisdictions with streamlined ADU permitting.'),
    pLink('ad57', [
      { text: 'Pair this strategy with the ' },
      { text: 'BRRRR method', href: '/blog/brrrr-method-complete-guide' },
      { text: ': buy the property, build the ADU (the rehab phase), rent both units, refinance at the new appraised value to recover your capital, and repeat with the next property. The ADU-BRRRR hybrid is one of the most capital-efficient scaling strategies available to residential investors today.' },
    ]),

    // ── Section 8: Risks and Considerations ──────────
    h2('ad58', 'Risks and Considerations'),
    p('ad59', 'ADU investing is not without risk. Construction projects routinely exceed budgets by 10 to 20 percent. Permitting delays can add months to your timeline. Rent projections may not materialize if the local market softens. And some cities are tightening short-term rental rules, which can undermine the highest-income ADU strategy.'),
    p('ad60', 'Construction risk is the biggest concern. Unlike buying an existing rental, building an ADU means managing a construction project with all its complexities: contractor reliability, material cost fluctuations, weather delays, inspection failures, and change orders. Budget a contingency of at least 15 percent above your construction estimate, and add 2 to 3 months to your projected timeline.'),
    p('ad61', 'Financing risk also deserves attention. If you finance the ADU with a variable-rate HELOC and interest rates rise, your carrying cost increases while your rental income stays fixed until the next lease renewal. Model your worst-case scenario: what happens if rates increase 2 percent and the ADU takes 3 months longer to complete and rent?'),

    // ── Conclusion ───────────────────────────────────
    h2('ad62', 'Getting Started with ADU Investing'),
    pLink('ad63', [
      { text: 'ADU investing sits at the intersection of favorable regulation, strong rental demand, and investor-friendly economics. The window is open today in a way it was not five years ago, and the trend toward more permissive ADU policies shows no signs of reversing. Start by researching your target market\'s ADU regulations. Run the numbers using our ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' to model the income side and our ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' to evaluate the total return. Get construction estimates from at least three contractors. And remember that the best ADU investments start with the right property — one where the lot, zoning, and neighborhood all support a high-performing accessory unit.' },
    ]),
    pLink('ad64', [
      { text: 'For more on maximizing rental property returns, explore our ' },
      { text: 'complete rental property investing guide', href: '/blog/rental-property-investing-complete-guide' },
      { text: '. And check the ' },
      { text: 'ADU glossary entry', href: '/glossary/adu' },
      { text: ' for a quick reference on key terms and definitions.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: Self-Storage Investing Guide
// ══════════════════════════════════════════════════════
const selfStorageGuide = {
  _type: 'post',
  title: 'Self-Storage Investing: How to Get Started',
  slug: { _type: 'slug', current: 'self-storage-investing-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-04-24T10:00:00Z',
  excerpt: 'A comprehensive guide to self-storage investing — why it\'s recession-resistant, how the economics work, and how to evaluate, finance, and manage storage facilities.',
  seo: {
    metaTitle: 'Self-Storage Investing Guide: How to Get Started | ProInvestorHub',
    metaDescription: 'Learn how to invest in self-storage facilities. Covers facility types, unit economics, cap rates (6-10%), management strategies, and financing options for investors.',
  },
  body: [
    // ── Introduction ──────────────────────────────────
    p('ss01', 'Self-storage is one of the most overlooked and misunderstood asset classes in commercial real estate — and one of the most consistently profitable. While most investors obsess over apartment buildings and single-family rentals, self-storage facilities quietly generate 20 to 30 percent cash-on-cash returns, maintain occupancy above 90 percent through recessions, and require a fraction of the management intensity of residential rental properties. The self-storage industry represents over $44 billion in annual revenue across nearly 60,000 facilities in the United States. And despite that scale, the market remains remarkably fragmented: roughly 70 percent of facilities are still owned by independent operators, not institutional players. This fragmentation creates opportunity for individual investors.'),
    p('ss02', 'This guide breaks down everything you need to know about self-storage investing in 2026. We will cover why self-storage has earned its reputation as a recession-resistant asset class, the different types of facilities and their economics, how to evaluate and underwrite a storage deal, financing options, and management strategies — whether you plan to self-manage or hire a third-party operator.'),

    // ── Section 1: Why Self-Storage? ─────────────────
    h2('ss03', 'Why Self-Storage Is a Premier Asset Class'),

    h3('ss04', 'Recession Resistance'),
    p('ss05', 'Self-storage has outperformed every other commercial real estate sector during economic downturns — including the 2008 financial crisis and the 2020 pandemic. The reason is counterintuitive: demand for storage increases during both good times and bad. When the economy is strong, people accumulate more possessions and need space to store them. When the economy contracts, people downsize their homes, relocate for employment, or go through life transitions (divorce, death, military deployment) that create urgent storage needs. In the 2008 recession, self-storage REITs declined only 3.8 percent while the overall REIT index dropped over 37 percent. During COVID, storage occupancy rates actually increased as people converted living spaces into home offices.'),

    h3('ss06', 'Low Maintenance and Operating Costs'),
    p('ss07', 'Compared to residential and multifamily properties, self-storage facilities have dramatically lower maintenance requirements. There are no kitchens to renovate, no HVAC systems in individual units (non-climate-controlled), no plumbing in most units, and no tenants calling at midnight about a leaky faucet. The primary maintenance concerns are roof, pavement, gate systems, and pest control. Operating expense ratios for self-storage run 30 to 40 percent of gross revenue, compared to 40 to 50 percent for multifamily properties. That lower expense ratio translates directly to higher margins.'),

    h3('ss08', 'High Profit Margins'),
    pLink('ss09', [
      { text: 'The combination of low operating costs and relatively high rental rates per square foot makes self-storage one of the highest-margin property types. A well-run facility generates a ' },
      { text: 'net operating income', href: '/glossary/noi' },
      { text: ' margin of 55 to 70 percent — meaning 55 to 70 cents of every dollar in revenue flows to the bottom line before debt service. That margin creates substantial cash flow even at moderate occupancy levels.' },
    ]),

    h3('ss10', 'Fragmented Market with Consolidation Opportunity'),
    p('ss11', 'The top six publicly traded self-storage REITs (Public Storage, Extra Space, CubeSmart, Life Storage, National Storage, and Global Self Storage) control about 25 percent of the total market. The remaining 75 percent is owned by small operators, many of whom manage their facilities passively without modern technology, dynamic pricing, or professional marketing. This creates two types of opportunity: acquiring underperforming facilities at favorable cap rates and implementing value-add improvements, and building new facilities in underserved markets where demand exceeds supply.'),

    // ── Section 2: Types of Storage Facilities ───────
    h2('ss12', 'Types of Self-Storage Facilities'),

    h3('ss13', 'Drive-Up (Non-Climate-Controlled)'),
    p('ss14', 'Drive-up storage is the traditional model: single-story metal or concrete buildings with exterior-facing roll-up doors that tenants can drive directly to. These facilities are the least expensive to build and operate. Construction costs run $25 to $45 per square foot, and there are minimal utility costs since units are not climate-controlled. Drive-up facilities work best in suburban and rural markets where land is inexpensive and tenants store items that do not require temperature or humidity control (furniture, boxes, seasonal equipment, vehicles). Rental rates for drive-up units typically range from $0.50 to $1.00 per square foot per month.'),

    h3('ss15', 'Climate-Controlled'),
    p('ss16', 'Climate-controlled storage facilities maintain temperature between 55 and 85 degrees Fahrenheit and control humidity levels. These are typically multi-story interior-access buildings that look more like commercial offices than traditional storage. Construction costs are higher at $60 to $100 per square foot due to HVAC systems, insulation, and multi-story construction. However, rental rates are 25 to 50 percent higher than drive-up units — typically $1.00 to $2.00 per square foot per month. Climate-controlled facilities command premium rents because they protect sensitive items: electronics, artwork, wine, documents, pharmaceuticals, and business inventory. They perform best in urban and suburban markets with higher population density and incomes.'),

    h3('ss17', 'Boat and RV Storage'),
    p('ss18', 'Specialized vehicle storage — boats, RVs, trailers, and classic cars — is a high-demand niche with limited supply. Many residential neighborhoods and HOAs prohibit street or driveway storage of large vehicles, creating forced demand. Boat and RV storage can be open (uncovered parking), covered (canopy or carport structure), or enclosed (fully enclosed garage-style units). Monthly rates range from $50 to $75 for open parking to $200 to $500 for enclosed units. The economics are attractive because the infrastructure required is minimal — a paved or gravel lot with lighting and fencing can generate meaningful income with very low operating costs.'),

    h3('ss19', 'Portable and Container Storage'),
    p('ss20', 'A growing segment of the storage market uses portable containers (like PODS or similar products) that are delivered to the customer\'s location, loaded, and then transported to a central storage facility. This model combines storage with moving services and commands premium pricing. As an investor, the portable storage model requires a depot location and container fleet, making it more operationally complex but potentially more profitable per unit than traditional storage.'),

    // ── Section 3: Unit Economics ─────────────────────
    h2('ss21', 'Self-Storage Unit Economics: Revenue Per Square Foot'),
    pLink('ss22', [
      { text: 'Understanding unit economics is essential to evaluating any storage deal. The key metric is revenue per square foot, which varies by unit size, type, and market. Here is a framework for modeling storage income using a ' },
      { text: 'cap rate calculator', href: '/calculators/cap-rate' },
      { text: ' and realistic assumptions.' },
    ]),

    h3('ss23', 'Revenue by Unit Size'),
    p('ss24', 'Smaller units generate higher revenue per square foot than larger units. A 5x5 unit (25 square feet) might rent for $50 to $75 per month, which is $2.00 to $3.00 per square foot. A 10x10 unit (100 square feet) typically rents for $100 to $175 per month, or $1.00 to $1.75 per square foot. A 10x20 unit (200 square feet) rents for $150 to $250 per month, or $0.75 to $1.25 per square foot. A 10x30 unit (300 square feet) rents for $200 to $325 per month, or $0.67 to $1.08 per square foot. The optimal unit mix depends on your market, but most successful facilities weight toward smaller units (5x5 through 10x10) which maximize revenue per square foot and serve the broadest customer base.'),

    h3('ss25', 'Occupancy and Effective Revenue'),
    p('ss26', 'Physical occupancy — the percentage of units rented — is the headline metric, but effective occupancy tells the real story. Effective occupancy accounts for concessions, discounts, and delinquencies. A facility might show 95 percent physical occupancy but only 88 percent effective occupancy after accounting for first-month-free promotions and tenants who are behind on rent. Target stabilized physical occupancy of 88 to 93 percent. Below 85 percent, the facility likely has a demand, marketing, or pricing problem. Above 95 percent, you are probably underpricing your units and leaving money on the table.'),

    h3('ss27', 'Ancillary Revenue'),
    p('ss28', 'Smart operators generate additional income beyond unit rentals. Common ancillary revenue sources include: tenant insurance (required by most facilities, generating $10 to $20 per tenant per month in commissions), late fees ($20 to $50 per occurrence), merchandise sales (locks, boxes, packing supplies), truck rental commissions, and administrative fees ($20 to $30 charged at move-in). Ancillary revenue can add 5 to 10 percent to a facility\'s top-line income. On a facility generating $500,000 in rental revenue, that is an additional $25,000 to $50,000 per year.'),

    // ── Section 4: Acquisition vs Ground-Up ──────────
    h2('ss29', 'Buying an Existing Facility vs. Building New'),

    h3('ss30', 'Acquiring an Existing Facility'),
    pLink('ss31', [
      { text: 'Buying an existing storage facility lets you generate income from day one. Existing facilities come with an established customer base, operating history, and measurable financials. You can evaluate actual income and expense data rather than projecting. ' },
      { text: 'Cap rates', href: '/glossary/cap-rate' },
      { text: ' for self-storage acquisitions currently range from 6 to 10 percent depending on market, facility quality, and occupancy. Class A facilities (climate-controlled, urban, well-maintained) in strong markets trade at 5 to 7 percent cap rates. Class B and C facilities (older, rural, deferred maintenance) in secondary markets trade at 7 to 10 percent cap rates — and these are where the best value-add opportunities exist.' },
    ]),

    h3('ss32', 'Value-Add Self-Storage'),
    p('ss33', 'The highest returns in self-storage come from acquiring underperforming facilities and improving them. Common value-add strategies include: raising below-market rents (many mom-and-pop operators have not raised rates in years), implementing dynamic pricing software, improving marketing and web presence to increase occupancy, adding climate-controlled units in an existing non-climate building, converting unused space into additional units, adding boat and RV parking on excess land, and installing security features (cameras, gate access, lighting) that justify higher rates. A facility acquired at a 9 percent cap rate can often be repositioned to a 6 or 7 percent cap rate within 18 to 24 months through these improvements — creating substantial equity and cash flow growth.'),

    h3('ss34', 'Ground-Up Development'),
    p('ss35', 'Building a new storage facility offers the highest potential returns but also the highest risk and longest timeline. Total development costs — including land, construction, soft costs, and lease-up reserves — typically run $8 to $12 million for a standard 50,000 to 80,000 square foot facility. It takes 12 to 18 months to build and another 18 to 36 months to reach stabilized occupancy. During the lease-up period, the facility operates at a loss. Ground-up development makes sense when you have identified an underserved market with strong demand indicators (population growth, household income, limited existing supply) and when acquisition prices in the area are too high to generate acceptable returns.'),

    // ── Section 5: Management ────────────────────────
    h2('ss36', 'Self-Storage Management: Self-Managed vs. Third-Party'),

    h3('ss37', 'Self-Management'),
    p('ss38', 'Self-managing a storage facility is significantly less time-intensive than managing residential rentals. There are no midnight plumbing emergencies, no lease-up showings for individual apartments, and no complex move-in and move-out inspections. A small to mid-size facility (100 to 300 units) can often be managed with one on-site manager working part-time or full-time, supplemented by technology. Modern storage management software (SiteLink, Yardi Breeze, storEDGE) handles online rentals, payment processing, delinquency management, and reporting. Automated gate access and security cameras reduce the need for on-site presence. Many smaller facilities operate successfully with no full-time on-site staff at all.'),

    h3('ss39', 'Third-Party Management'),
    p('ss40', 'Third-party management companies operate your facility for a fee — typically 6 to 8 percent of gross revenue. For a facility generating $400,000 in annual revenue, that is $24,000 to $32,000 per year. In exchange, you get professional management, established operating procedures, vendor relationships, and marketing expertise. Third-party management makes sense when you are an out-of-state investor, when you own multiple facilities and need operational consistency, or when you want a truly passive investment. The best third-party managers bring institutional-level operations to individually owned facilities.'),

    // ── Section 6: Financing ─────────────────────────
    h2('ss41', 'Financing Self-Storage Investments'),
    p('ss42', 'Self-storage financing differs from residential investment financing. Here are the primary options.'),

    h3('ss43', 'SBA Loans'),
    p('ss44', 'The Small Business Administration 504 and 7(a) loan programs are popular for self-storage acquisitions. SBA 504 loans offer up to 90 percent financing at fixed rates, with terms up to 25 years. The borrower puts 10 percent down, a Certified Development Company provides 40 percent, and a bank provides 50 percent. SBA 7(a) loans offer similar leverage with slightly more flexibility but variable rates. SBA loans require the borrower to actively manage the business, making them ideal for owner-operators.'),

    h3('ss45', 'Commercial Mortgage Loans'),
    p('ss46', 'Traditional commercial lenders (banks, credit unions, CMBS) offer mortgage loans for storage facilities with 25 to 35 percent down, 15 to 25 year amortization, and rates of 6.5 to 9 percent in the current market. These loans are underwritten based on the property\'s income, the borrower\'s financial strength, and the facility\'s physical condition. Loan-to-value ratios top out at 65 to 75 percent for most commercial storage loans.'),

    h3('ss47', 'Seller Financing'),
    pLink('ss48', [
      { text: 'Many self-storage owners — particularly older operators looking to retire — are willing to carry financing. ' },
      { text: 'Seller financing', href: '/blog/seller-financing-real-estate' },
      { text: ' allows you to negotiate the down payment, interest rate, and terms directly with the seller. Common structures include 10 to 20 percent down, 5 to 7 percent interest, and a 5 to 10 year term with a balloon payment. Seller financing avoids bank underwriting entirely and can close much faster than institutional lending.' },
    ]),

    // ── Section 7: Due Diligence ─────────────────────
    h2('ss49', 'Due Diligence: Evaluating a Self-Storage Deal'),
    pLink('ss50', [
      { text: 'Before acquiring any storage facility, perform thorough due diligence. Use a ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' to model returns and a ' },
      { text: 'cap rate calculator', href: '/calculators/cap-rate' },
      { text: ' to benchmark the purchase price against the income.' },
    ]),
    p('ss51', 'Key due diligence items include: request 3 years of profit and loss statements and tax returns. Verify actual occupancy against the rent roll — physically inspect units to confirm occupied versus vacant. Analyze the unit mix and compare rental rates to market comps using platforms like SpareFoot or SelfStorage.com. Assess the physical condition: roof, pavement, doors, electrical, HVAC (if climate-controlled), and security systems. Research the competitive supply within a 3 to 5 mile radius. Evaluate demand drivers: population growth, new housing construction, military bases, universities. Identify deferred maintenance and estimate capital expenditure requirements for the next 5 years.'),

    // ── Conclusion ───────────────────────────────────
    h2('ss52', 'Getting Started in Self-Storage'),
    pLink('ss53', [
      { text: 'Self-storage is a compelling asset class for investors seeking recession-resistant cash flow with lower management intensity than residential properties. Start by educating yourself on the local market: how many facilities exist in your target area, what are they charging, and what is the occupancy rate? Analyze deals using the ' },
      { text: 'cap rate', href: '/glossary/cap-rate' },
      { text: ' and ' },
      { text: 'NOI', href: '/glossary/noi' },
      { text: ' frameworks. Network with existing storage operators and brokers who specialize in the asset class (Marcus and Millichap, Argus Self Storage Advisors). And consider starting with a smaller facility (50 to 150 units) where the acquisition price is manageable and the learning curve is less expensive. The fragmented nature of the industry means that individual investors can still compete effectively against institutional buyers — especially in secondary and tertiary markets where the big REITs are not looking.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 3: Mobile Home Park Investing
// ══════════════════════════════════════════════════════
const mobileHomeParkGuide = {
  _type: 'post',
  title: 'Mobile Home Park Investing: A Beginner\'s Guide',
  slug: { _type: 'slug', current: 'mobile-home-park-investing' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-04-28T10:00:00Z',
  excerpt: 'How mobile home park investing works, why lot rent economics make it uniquely profitable, and how to evaluate, finance, and add value to manufactured housing communities.',
  seo: {
    metaTitle: 'Mobile Home Park Investing: Beginner\'s Guide | ProInvestorHub',
    metaDescription: 'Complete guide to mobile home park investing. Learn lot rent economics, value-add strategies, financing options, due diligence, and cap rates for manufactured housing communities.',
  },
  body: [
    // ── Introduction ──────────────────────────────────
    p('mh01', 'Mobile home parks — more accurately called manufactured housing communities — are one of the best-kept secrets in real estate investing. While most investors chase single-family rentals, multifamily apartments, and commercial properties, mobile home parks quietly deliver some of the strongest risk-adjusted returns in the entire real estate universe. The business model is elegant in its simplicity: you own the land and infrastructure, tenants own their homes and pay you lot rent, and your maintenance responsibilities are dramatically lower than any other rental property type.'),
    p('mh02', 'The numbers are compelling. Well-run mobile home parks generate cap rates of 7 to 12 percent — significantly higher than multifamily apartments in most markets. Operating expense ratios are 30 to 40 percent, compared to 45 to 55 percent for apartment buildings. Tenant turnover is remarkably low because moving a manufactured home costs $5,000 to $15,000, creating a natural retention mechanism that no apartment landlord can replicate. And perhaps most importantly, new supply is virtually nonexistent — municipalities across the country have effectively stopped approving new mobile home park zoning, making existing parks an irreplaceable asset.'),
    p('mh03', 'This guide covers the fundamentals of mobile home park investing: how the business model works, how to evaluate a park, value-add strategies that drive outsized returns, financing options, and the due diligence process that separates successful investors from those who get burned.'),

    // ── Section 1: The Business Model ────────────────
    h2('mh04', 'How the Mobile Home Park Business Model Works'),

    h3('mh05', 'Lot Rent: The Core Revenue Stream'),
    pLink('mh06', [
      { text: 'The fundamental economics of a mobile home park are different from any other rental property. In a traditional rental, you own the structure and are responsible for maintaining it — roofs, plumbing, HVAC, appliances, and everything in between. In a mobile home park, you own the land and the infrastructure (roads, water lines, sewer or septic, electrical distribution, and common areas), but the tenants own their individual homes. Your revenue comes from lot rent — a monthly fee each tenant pays for the right to place their home on your land and use your infrastructure. National average lot rents range from $200 to $500 per month in most markets, with higher-demand areas commanding $600 to $1,000 or more. Calculate your potential ' },
      { text: 'NOI', href: '/glossary/noi' },
      { text: ' by multiplying lot rent times occupied lots minus operating expenses.' },
    ]),
    p('mh07', 'This structure has profound implications for investors. Your maintenance exposure is limited to common areas and infrastructure — you are not replacing roofs, fixing plumbing, or painting units. When a tenant\'s furnace breaks, it is their furnace to fix. When their roof leaks, it is their responsibility. This dramatically reduces your operating expenses and management headaches compared to apartment investing.'),

    h3('mh08', 'Why Tenants Stay: The Built-In Retention Mechanism'),
    p('mh09', 'Moving a manufactured home costs $5,000 to $15,000 or more, depending on the size and distance. Many older homes cannot be moved at all without risking structural damage. This creates an economic barrier to leaving that is unique to mobile home parks. Annual turnover in well-managed parks runs 5 to 10 percent, compared to 40 to 60 percent in apartment complexes. Low turnover means lower vacancy loss, lower marketing costs, and more predictable cash flow. It also means that modest, consistent lot rent increases of $10 to $25 per year are easily absorbed by tenants who face far higher costs to relocate.'),

    h3('mh10', 'The Supply Constraint'),
    p('mh11', 'Since the 1990s, new mobile home park development has effectively stopped in most of the United States. Local zoning boards routinely deny applications for new manufactured housing communities due to NIMBY opposition and outdated stigmas about mobile homes. The result is a fixed — and shrinking — supply of parks. Approximately 50,000 parks exist nationally, and that number decreases each year as some parks are redeveloped into higher-density housing. A fixed supply with growing demand (affordable housing is in crisis) creates a favorable pricing environment for existing park owners.'),

    // ── Section 2: Lot Rent Economics ────────────────
    h2('mh12', 'Understanding Lot Rent Economics'),
    p('mh13', 'Lot rent economics are the financial engine of mobile home park investing. Understanding how lot rents compare across markets and how they drive value creation is essential to making smart acquisitions.'),

    h3('mh14', 'Market Lot Rent Comparisons'),
    p('mh15', 'Lot rents vary dramatically by region. In the Midwest and Southeast, average lot rents run $200 to $400 per month. In the Mountain West and Pacific Northwest, $400 to $700 is common. In coastal California and the Northeast, lot rents can exceed $1,000 per month. The key metric is not absolute lot rent but lot rent relative to alternative housing costs. In a market where the cheapest one-bedroom apartment rents for $1,200 per month, a lot rent of $500 per month (where the tenant owns their home free and clear) represents a massive affordability advantage. That affordability gap is what drives demand and ensures occupancy.'),

    h3('mh16', 'The Lot Rent Increase Formula'),
    p('mh17', 'One of the most powerful value creation tools in mobile home park investing is raising below-market lot rents. Many parks owned by long-term operators have lot rents that are 20 to 40 percent below market rates. A park with 100 lots at $250 per month where the market rate is $375 represents $150,000 per year in unrealized revenue. Raising rents to market over 2 to 3 years (typically $25 to $50 per year in increments) increases NOI from $150,000 to $300,000. At an 8 percent cap rate, that NOI increase translates to $1,875,000 in additional property value — created simply by adjusting rents to what the market supports.'),
    bq('mh18', 'Value = NOI / Cap Rate. Increasing NOI by $150,000 at an 8% cap rate creates $1,875,000 in equity.'),

    // ── Section 3: Value-Add Strategies ──────────────
    h2('mh19', 'Value-Add Strategies for Mobile Home Parks'),
    p('mh20', 'The highest returns in mobile home park investing come from acquiring parks with specific problems and fixing them. Here are the primary value-add strategies.'),

    h3('mh21', 'Fill Vacant Lots'),
    p('mh22', 'A park with vacant lots is leaving money on the table. Each vacant lot represents lost monthly revenue. Filling vacant lots requires either purchasing used manufactured homes ($10,000 to $30,000 each), buying new manufactured homes ($40,000 to $80,000 each), or incentivizing tenants to move their homes onto your lots. The most cost-effective approach is sourcing used homes, performing basic renovations, and either renting them (the park-owned home model) or selling them to tenants on contract (the preferred model, since it shifts maintenance responsibility to the tenant). A $20,000 investment in a used home placed on a vacant lot generating $400 per month in lot rent produces a 24 percent annual return on that lot-fill investment alone.'),

    h3('mh23', 'Sub-Meter Utilities'),
    p('mh24', 'Many older parks include water, sewer, and sometimes electricity in the lot rent. This means the park owner absorbs utility costs that can be significant — water bills alone can run $50 to $100 per lot per month. Sub-metering or billing back utilities shifts this cost to tenants (who then have an incentive to conserve) and directly increases NOI. Converting from master-metered to individually sub-metered water and sewer can add $50 to $100 per lot per month to NOI. On a 100-lot park, that is $60,000 to $120,000 per year in additional income — a significant value-add with relatively low implementation costs ($500 to $1,500 per meter installed).'),

    h3('mh25', 'Improve Infrastructure'),
    p('mh26', 'Deferred maintenance on infrastructure — roads, water lines, sewer systems, electrical distribution, and drainage — is common in parks owned by passive operators. Improving infrastructure serves multiple purposes: it reduces ongoing maintenance costs, improves tenant satisfaction and retention, supports higher lot rents, and makes the park more attractive to future buyers or lenders. Paving gravel roads, replacing aging water lines, upgrading electrical pedestals, and improving drainage are the most impactful infrastructure investments. Budget $2,000 to $5,000 per lot for comprehensive infrastructure improvements on a deferred-maintenance park.'),

    h3('mh27', 'Improve Management and Enforce Rules'),
    p('mh28', 'Many independently owned parks have lax enforcement of community rules — abandoned vehicles, unmaintained homes, unauthorized pets, and subletting are common issues. Implementing and enforcing reasonable community standards improves the park\'s appearance, reduces liability, and attracts higher-quality tenants. Professional management does not mean heavy-handed management. It means consistent enforcement, clear communication, and a commitment to maintaining the community as a safe, attractive place to live. This "soft" value-add costs little to implement but has a meaningful impact on tenant retention, rent growth, and resale value.'),

    // ── Section 4: Financing ─────────────────────────
    h2('mh29', 'Financing Mobile Home Park Investments'),

    h3('mh30', 'Agency Financing (Fannie Mae and Freddie Mac)'),
    p('mh31', 'For parks with 5 or more units, agency-backed commercial loans offer the best terms: 25 to 30 year amortization, non-recourse lending, fixed rates of 5.5 to 7.5 percent, and loan-to-value ratios up to 80 percent. The catch is that agency lenders have strict requirements — the park must have a strong occupancy rate (typically 85 percent or higher), good physical condition, and a market that supports the underwriting. Parks with significant deferred maintenance or low occupancy may not qualify for agency financing initially.'),

    h3('mh32', 'Portfolio and Local Bank Loans'),
    p('mh33', 'Local banks and credit unions that understand manufactured housing are valuable lending partners for mobile home park investors. These portfolio lenders keep loans on their own balance sheet and can be more flexible than agency programs. Expect 20 to 25 percent down, 15 to 25 year amortization, and rates of 7 to 9 percent. The advantage is flexibility — a portfolio lender may finance a park with lower occupancy or deferred maintenance that an agency lender would decline. Building a relationship with a local lender who understands mobile home parks is a significant competitive advantage.'),

    h3('mh34', 'Seller Financing'),
    pLink('mh35', [
      { text: '' },
      { text: 'Seller financing', href: '/blog/seller-financing-real-estate' },
      { text: ' is more common in mobile home park transactions than in almost any other real estate asset class. Many park owners are older operators who have owned their parks for decades. They are often willing to carry financing for tax reasons (installment sale treatment spreads capital gains over time) and because they want a predictable income stream in retirement. Typical seller financing terms include 10 to 20 percent down, 5 to 7 percent interest, 5 to 15 year terms, and sometimes interest-only periods. Seller-financed deals can close in 30 to 45 days with minimal closing costs.' },
    ]),

    // ── Section 5: Due Diligence ─────────────────────
    h2('mh36', 'Due Diligence: What to Inspect Before You Buy'),
    p('mh37', 'Mobile home park due diligence is more complex than residential property due diligence because you are evaluating infrastructure systems that do not exist in a typical rental property. Here are the critical items to assess.'),

    h3('mh38', 'Infrastructure Assessment'),
    p('mh39', 'Water system: Is the park on city water or a private well? City water is strongly preferred — private wells require EPA testing, maintenance, and can be a liability. Sewer system: Is the park on city sewer or private septic? City sewer is preferred. If the park uses a private lagoon or package treatment plant, budget $500,000 to $2 million for potential replacement. Electrical: Are the electrical pedestals up to code? Are they 100-amp or 200-amp service? Older parks with undersized electrical service require upgrades. Roads: Paved or gravel? What condition? Road paving costs $3 to $8 per square foot. Conduct a Phase I environmental assessment on every park acquisition — manufactured housing communities can have soil contamination from old heating oil tanks, improper waste disposal, or adjacent commercial properties.'),

    h3('mh40', 'Zoning and Legal Review'),
    p('mh41', 'Verify the park\'s zoning designation and confirm that it is legally conforming (not just grandfathered as a non-conforming use). Non-conforming parks may face restrictions on expansion, lot filling, or rebuilding after disaster. Review the lease agreements with all tenants. Confirm that park-owned homes have clear titles. Check for any pending litigation, code violations, or government orders. Understand the local and state regulations governing manufactured housing communities — some states have strong tenant protection laws that limit rent increases and eviction procedures.'),

    h3('mh42', 'Tenant Quality and Occupancy'),
    pLink('mh43', [
      { text: 'Physically inspect the park and every occupied lot. The condition of tenant-owned homes tells you about the quality of your tenant base. Are homes well-maintained or deteriorating? Are yards clean or cluttered with debris? What is the mix of owner-occupied versus park-owned homes? Parks where 80 percent or more of homes are tenant-owned and maintained generally perform better than parks with high percentages of park-owned rental homes. Calculate your potential income using a ' },
      { text: 'rental cash flow calculator', href: '/calculators/rental-cashflow' },
      { text: ' with realistic vacancy and expense assumptions.' },
    ]),

    // ── Section 6: Risks ─────────────────────────────
    h2('mh44', 'Risks of Mobile Home Park Investing'),
    p('mh45', 'Mobile home park investing is not without risk. Infrastructure failures can be expensive — a failing private sewer system can cost $1 million or more to replace. Environmental contamination can create significant liability. Tenant relations require skill, especially when implementing rent increases or enforcing new community standards. Regulatory risk exists in states that have or are considering rent control for manufactured housing communities. And financing can be challenging for parks with low occupancy or deferred maintenance, creating a catch-22 where you need capital to fix problems but cannot get capital until problems are fixed.'),
    p('mh46', 'The biggest risk, however, is buying the wrong park. Parks with private utilities (wells, septic, or lagoons) have dramatically higher downside than parks on city utilities. Parks in declining markets with shrinking populations may struggle with occupancy. And parks in flood zones or areas with environmental contamination can become liabilities rather than assets. Thorough due diligence and conservative underwriting are your best protection.'),

    // ── Conclusion ───────────────────────────────────
    h2('mh47', 'Getting Started with Mobile Home Park Investing'),
    pLink('mh48', [
      { text: 'Mobile home park investing offers a unique combination of high cap rates, low maintenance requirements, built-in tenant retention, and constrained supply. Start by evaluating deals using the ' },
      { text: 'cap rate', href: '/calculators/cap-rate' },
      { text: ' and ' },
      { text: 'rental cash flow', href: '/calculators/rental-cashflow' },
      { text: ' calculators. Focus on parks with city water and sewer, occupancy above 75 percent (with room to fill vacant lots), and lot rents below market rate (giving you room for value-add rent increases). Build relationships with brokers who specialize in manufactured housing communities and with local banks that understand the asset class. And budget conservatively — mobile home park infrastructure surprises tend to be expensive, so a 15 to 20 percent capital reserve above your acquisition cost is prudent for your first deal.' },
    ]),
    pLink('mh49', [
      { text: 'For more context on alternative real estate investment strategies, explore our ' },
      { text: 'complete beginner\'s guide to real estate investing', href: '/blog/real-estate-investing-beginners-guide-2026' },
      { text: '.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 4: Note Investing Guide
// ══════════════════════════════════════════════════════
const noteInvestingGuide = {
  _type: 'post',
  title: 'Note Investing: How to Buy Real Estate Debt for Passive Income',
  slug: { _type: 'slug', current: 'note-investing-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-05-01T10:00:00Z',
  excerpt: 'A comprehensive guide to note investing — how to buy mortgage debt, the difference between performing and non-performing notes, returns, risks, and how to get started.',
  seo: {
    metaTitle: 'Note Investing Guide: How to Buy Real Estate Debt | ProInvestorHub',
    metaDescription: 'Learn how to invest in real estate notes (mortgage debt). Covers performing vs non-performing notes, due diligence, returns (8-30%+), risks, and how to build a note portfolio.',
  },
  body: [
    // ── Introduction ──────────────────────────────────
    p('ni01', 'Most real estate investors think about buying properties. Note investors think about buying debt. Instead of owning a rental property and dealing with tenants, maintenance, and property management, a note investor owns the mortgage — the piece of paper that entitles you to receive monthly payments of principal and interest from the borrower. You become the bank.'),
    p('ni02', 'Note investing is one of the most genuinely passive forms of real estate investing. When you buy a performing note, your investment generates monthly cash flow without any of the operational headaches of property ownership. No tenants to screen, no toilets to fix, no property taxes to manage, no midnight phone calls. Just a borrower making payments on a mortgage that you own. The concept is simple, but the execution requires knowledge of note valuation, due diligence, legal frameworks, and workout strategies.'),
    pLink('ni03', [
      { text: 'This guide covers everything you need to know to get started with note investing: how notes work, the critical distinction between performing and non-performing notes, where to buy notes, how to conduct due diligence, expected returns, risks, and advanced strategies like partial notes and note funds. Whether you are looking for a truly passive income stream or a way to diversify beyond physical property ownership, note investing deserves a place in your ' },
      { text: 'real estate investment strategy', href: '/blog/real-estate-investing-beginners-guide-2026' },
      { text: '.' },
    ]),

    // ── Section 1: What Is Note Investing? ───────────
    h2('ni04', 'What Is Note Investing?'),
    p('ni05', 'A real estate note — also called a mortgage note or promissory note — is a legal document that represents a borrower\'s promise to repay a loan used to purchase real property. The note specifies the loan amount, interest rate, payment schedule, and maturity date. It is paired with a deed of trust or mortgage that pledges the property as collateral. Together, these two documents create a secured debt obligation.'),
    pLink('ni06', [
      { text: 'When a homeowner gets a mortgage from a bank, the bank holds the note. But banks do not always keep their notes — they frequently sell them on the secondary market to other banks, hedge funds, investment firms, and individual investors. When you buy a note, you step into the bank\'s shoes. The borrower makes their monthly payment to you (or your loan servicer) instead of the original lender. You earn interest income just like the bank did. And if the borrower stops paying, you have the same foreclosure rights the bank had because the property secures the debt. For a deeper understanding of the legal instrument, see our glossary entry on ' },
      { text: 'promissory notes', href: '/glossary/promissory-note' },
      { text: '.' },
    ]),

    h3('ni07', 'The Note vs. The Property'),
    p('ni08', 'This distinction is fundamental. When you buy a note, you do not own the property. The borrower owns the property. You own the debt that is secured by the property. If the borrower pays as agreed, you collect payments and never interact with the property at all. If the borrower defaults, you have the right to foreclose and take ownership of the property — but foreclosure is a last resort, not the primary strategy. Your role as a note investor is that of a lender, not a landlord.'),

    // ── Section 2: Performing vs Non-Performing ──────
    h2('ni09', 'Performing Notes vs. Non-Performing Notes'),
    p('ni10', 'The note investing world divides into two fundamentally different strategies based on whether the borrower is making payments. Understanding the distinction is critical because the risk profile, return expectations, due diligence requirements, and exit strategies are completely different.'),

    h3('ni11', 'Performing Notes'),
    p('ni12', 'A performing note is one where the borrower is current on payments. They are making their monthly mortgage payment on time and in full. Buying a performing note is the closest thing to buying a bond in real estate: you purchase the note at a price that reflects the remaining balance, interest rate, and term, and you collect predictable monthly cash flow for the life of the note. Returns on performing notes typically range from 8 to 15 percent annually, depending on the interest rate, purchase price discount, and remaining term. A note with a $100,000 balance and a 7 percent interest rate that you purchase for $85,000 generates a yield significantly higher than 7 percent because you paid less than face value. This discount — buying a dollar of debt for 85 cents — is where the return enhancement comes from.'),
    p('ni13', 'Performing note investing is genuinely passive. You hire a loan servicer (typically $25 to $35 per month) who collects payments from the borrower, manages the escrow account for taxes and insurance, sends tax documents, and handles borrower communications. You receive a monthly direct deposit of principal and interest. The primary risks are the borrower stopping payment (the note becomes non-performing) and prepayment (the borrower pays off the loan early, returning your capital but ending the income stream).'),

    h3('ni14', 'Non-Performing Notes'),
    p('ni15', 'A non-performing note (NPL) is one where the borrower has stopped making payments — typically 90 or more days delinquent. Non-performing notes trade at steep discounts: 30 to 70 cents on the dollar depending on the collateral value, borrower situation, and state foreclosure timeline. The potential returns are much higher — 15 to 30 percent or more — but so are the risks and the active management requirements.'),
    p('ni16', 'When you buy a non-performing note, you are buying a problem to solve. The borrower is not paying, and you need to figure out why and determine the best path forward. Options include: loan modification (restructuring the terms so the borrower can resume payments), forbearance agreement (a temporary plan to cure the delinquency), short sale (the borrower sells the property for less than the note balance, with your approval), deed in lieu of foreclosure (the borrower voluntarily transfers the property to you, avoiding formal foreclosure), and foreclosure (the legal process to take ownership of the property). The best outcome is often a loan modification that turns the non-performing note into a performing note — you bought the note at 50 cents on the dollar and now have a performing asset generating monthly payments on the full balance.'),

    // ── Section 3: Where to Buy Notes ────────────────
    h2('ni17', 'Where to Buy Real Estate Notes'),
    p('ni18', 'Notes are not listed on the MLS. The note trading market is less transparent than the property market, but multiple channels exist for finding and acquiring notes at every scale.'),

    h3('ni19', 'Note Exchanges and Trading Platforms'),
    p('ni20', 'Online platforms have democratized note trading. Paperstac is the largest peer-to-peer note trading platform, offering performing and non-performing notes with detailed due diligence packages. LoanMLS is another marketplace where note sellers list assets. Notes Direct, Waterfall Asset Management, and other platforms offer curated note pools. These exchanges allow you to browse available notes, review collateral files, and make offers directly. Minimum investments start as low as $5,000 to $10,000 for individual notes, though most institutional-quality notes trade at $25,000 to $100,000 or more.'),

    h3('ni21', 'Banks and Credit Unions'),
    p('ni22', 'Banks sell non-performing loans to clean up their balance sheets and recover capital. Community banks and credit unions are more accessible than large institutions and often sell smaller note pools (5 to 50 notes) at negotiable prices. Building relationships with bank asset disposition officers is a long-term strategy that can yield consistent deal flow. Banks typically sell NPLs in bulk through sealed-bid auctions, though some will negotiate individual note sales with established buyers.'),

    h3('ni23', 'Private Sellers and Note Brokers'),
    p('ni24', 'Private note holders — individuals who sold a property with seller financing and now hold a note — often want to cash out before the note matures. Note brokers connect these sellers with investors. The private note market is where some of the best deals exist because private note holders are not sophisticated institutional sellers — they are often motivated by life events (retirement, medical expenses, divorce) and willing to sell at significant discounts. Note brokers typically charge 1 to 3 points as a finder\'s fee, paid by the seller.'),

    h3('ni25', 'Hedge Funds and Note Funds'),
    p('ni26', 'For larger investors, hedge funds and note funds offer pooled note investments with professional management. Minimum investments typically start at $50,000 to $250,000. These funds acquire large portfolios of notes and employ teams of workout specialists to maximize recovery on non-performing assets. Returns vary but typically target 10 to 18 percent annually. The advantage is diversification and professional management. The disadvantage is less control, management fees (typically 1 to 2 percent annually plus a performance fee), and limited liquidity.'),

    // ── Section 4: Due Diligence ─────────────────────
    h2('ni27', 'Note Investing Due Diligence'),
    p('ni28', 'Due diligence on a note is fundamentally different from due diligence on a property. You are evaluating three things: the collateral (the property), the borrower, and the paper (the legal documents).'),

    h3('ni29', 'Collateral Review'),
    pLink('ni30', [
      { text: 'Even though you are buying debt rather than property, the property securing that debt is your ultimate protection. Order a broker price opinion (BPO) or drive-by appraisal to estimate the current property value. Calculate the ' },
      { text: 'loan-to-value ratio', href: '/glossary/ltv' },
      { text: ' — the ratio of the remaining note balance to the current property value. A note with an LTV of 60 percent is much safer than one at 90 percent because you have more equity cushion if you need to foreclose. Check for environmental issues, structural problems, code violations, and tax liens on the property. Even if you never intend to own the property, you need to know its condition because it is your collateral.' },
    ]),

    h3('ni31', 'Borrower Evaluation'),
    p('ni32', 'For performing notes, review the borrower\'s payment history — how many on-time payments, any late payments in the last 12 to 24 months, and the overall payment trend. For non-performing notes, understand why the borrower stopped paying. Is it a temporary hardship (job loss, medical issue) with potential for recovery, or a permanent situation? Is the property owner-occupied (borrowers fight harder to keep their primary residence) or an investment property? Is the borrower responsive to communication? A non-performing note where the borrower is cooperative and willing to work out a modification is worth significantly more than one where the borrower has abandoned the property.'),

    h3('ni33', 'Paper Review'),
    p('ni34', 'The legal documents must be complete and enforceable. Review the original promissory note and deed of trust or mortgage. Verify the chain of title — every transfer of the note from the original lender to you must be properly documented through endorsements and allonges. A broken chain of title can make the note unenforceable. Confirm that the note is recorded properly with the county. Check for junior liens, tax liens, and other encumbrances that could affect your position. For non-performing notes, review any prior modification agreements, forbearance plans, or demand letters. Hire a note attorney to review the collateral file before purchasing any note above $25,000.'),

    // ── Section 5: Returns and Pricing ───────────────
    h2('ni35', 'Note Investing Returns and Pricing'),
    pLink('ni36', [
      { text: 'Note returns vary dramatically based on the type of note, purchase price, and workout outcome. Here is a framework for understanding note pricing and expected returns. Model your potential returns using our ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: '.' },
    ]),

    h3('ni37', 'Performing Note Returns: 8 to 15 Percent'),
    p('ni38', 'Performing first-lien notes typically trade at 80 to 95 cents on the dollar, depending on the interest rate, remaining term, borrower credit quality, and property type. A note with a 7 percent interest rate purchased at 85 cents on the dollar yields approximately 9 to 10 percent. A note with a 9 percent rate purchased at 90 cents yields approximately 11 to 12 percent. Higher-yield notes (10 percent or above) on riskier collateral can yield 12 to 15 percent. The key variable is the purchase price discount — the wider the discount, the higher your yield.'),

    h3('ni39', 'Non-Performing Note Returns: 15 to 30 Percent or More'),
    p('ni40', 'Non-performing notes trade at 30 to 70 cents on the dollar. The actual return depends entirely on the workout outcome. If you buy a note at 50 cents on the dollar and successfully modify it into a performing note at the full balance, your yield can exceed 30 percent. If you foreclose and sell the property, your return depends on the property\'s market value minus foreclosure costs and holding costs. If the borrower reinstates (cures the delinquency and resumes payments), you earn the full interest rate on a note you purchased at a discount. The average non-performing note investor targets 15 to 25 percent returns, acknowledging that some deals will exceed 30 percent and others will break even or lose money.'),

    h3('ni41', 'Pricing Framework'),
    p('ni42', 'Note pricing is driven by three primary factors. Investment-to-value (ITV) is the ratio of your purchase price to the current property value — this measures your downside protection. A note with a $50,000 purchase price on a property worth $100,000 has a 50 percent ITV, meaning you have significant equity cushion. Unpaid principal balance (UPB) discount is the percentage below face value — a note with a $100,000 UPB purchased for $65,000 is at a 35 percent discount. And yield-to-maturity calculates your total return if the borrower pays the note to term, accounting for the purchase discount and the interest rate.'),

    // ── Section 6: Risks ─────────────────────────────
    h2('ni43', 'Risks of Note Investing'),
    p('ni44', 'Note investing carries specific risks that differ from property ownership risks. Understanding these risks upfront is essential to protecting your capital.'),

    h3('ni45', 'Default Risk'),
    p('ni46', 'The borrower may stop paying. For performing notes, this transforms your passive income stream into an active workout project. You will need to decide whether to modify, foreclose, or negotiate a deed in lieu. Each option has costs and timeline implications. Foreclosure in particular can be expensive ($5,000 to $50,000 depending on the state) and time-consuming (6 months to 3 years depending on the state\'s foreclosure process).'),

    h3('ni47', 'Collateral Risk'),
    p('ni48', 'The property securing your note may decline in value. If the property\'s market value drops below the note balance (negative equity), the borrower has an incentive to walk away. Environmental contamination, structural issues, or neighborhood decline can also impair your collateral. Always know the condition and value of the property before buying the note.'),

    h3('ni49', 'Legal and Title Risk'),
    p('ni50', 'Notes with broken chains of title, missing documents, or improperly executed assignments may be difficult or impossible to enforce. Buying a note without a thorough paper review is gambling, not investing. Budget $500 to $1,500 for a title search and legal review on every note acquisition.'),

    h3('ni51', 'Liquidity Risk'),
    p('ni52', 'Notes are not liquid investments. You cannot sell a note on a stock exchange with instant execution. Selling a note requires finding a buyer, negotiating a price, and completing due diligence — a process that can take weeks or months. If you need your capital back quickly, you may have to sell at a deeper discount than you originally paid. Invest only capital you can commit for the duration of the note\'s expected hold period.'),

    // ── Section 7: Partial Notes ─────────────────────
    h2('ni53', 'Advanced Strategy: Partial Notes'),
    p('ni54', 'A partial note purchase is an arrangement where you buy a specified number of payments from a note holder rather than the entire remaining balance. For example, a note has 240 payments remaining, and you purchase the right to receive the next 60 payments. After those 60 payments, the remaining 180 payments revert to the original note holder.'),
    p('ni55', 'Partial notes serve two purposes. For investors, they lower the capital requirement — instead of paying $80,000 for a full note, you might pay $25,000 for 60 payments. For note sellers, partials allow them to access some cash now while retaining the long-term income stream. Returns on partial note purchases are typically 12 to 18 percent because the seller accepts a discount on the payments they are selling in exchange for immediate liquidity.'),

    // ── Section 8: Note Funds ────────────────────────
    h2('ni56', 'Note Funds: Pooled Note Investing'),
    p('ni57', 'Note funds pool investor capital to purchase portfolios of notes — typically 20 to 200 or more notes per fund. This provides diversification that individual note investors cannot achieve on their own. If one note in a 100-note portfolio defaults catastrophically, the impact on overall fund returns is minimal. Note funds are managed by experienced operators who handle all due diligence, servicing, and workout activities. Most note funds target 8 to 15 percent annual returns for performing note strategies and 12 to 20 percent for non-performing note strategies. Minimum investments range from $50,000 to $250,000, and most have 3 to 7 year lock-up periods.'),

    // ── Conclusion ───────────────────────────────────
    h2('ni58', 'Getting Started with Note Investing'),
    pLink('ni59', [
      { text: 'Note investing offers a genuinely different path to real estate returns — one that eliminates property management entirely and positions you as the bank rather than the landlord. Start with performing first-lien notes if you want passive income with moderate risk. Move into non-performing notes as you develop workout skills and build relationships in the note trading community. Use our ' },
      { text: 'cash-on-cash return calculator', href: '/calculators/cash-on-cash' },
      { text: ' to model potential returns at different purchase prices and yields.' },
    ]),
    p('ni60', 'The most important rule in note investing is the same as in all real estate: do your due diligence. Evaluate the collateral, evaluate the borrower, and evaluate the paper. Never buy a note without a title search and legal review. Never buy a note without knowing the property\'s current value. And never invest more in a single note than you can afford to lose. Diversification across multiple notes, geographies, and note types is the foundation of a sustainable note investing strategy.'),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [aduInvestingGuide, selfStorageGuide, mobileHomeParkGuide, noteInvestingGuide]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 4a Content Seed: ADU, Self-Storage, Mobile Home Park, Note Investing\n')

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
