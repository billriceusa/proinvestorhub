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

const author = await client.fetch(`*[_type == "author" && name == "Bill Rice"][0]{ _id }`)
if (!author) { console.error('Author "Bill Rice" not found'); process.exit(1) }
const authorRef = { _type: 'reference', _ref: author._id }

async function getCategoryRef(title, key) {
  const cat = await client.fetch(`*[_type == "category" && title == $title][0]{ _id }`, { title })
  if (!cat) { console.error(`Category "${title}" not found`); process.exit(1) }
  return { _type: 'reference', _ref: cat._id, _key: key }
}

const catDealAnalysis = await getCategoryRef('Deal Analysis', 'c1')
const catStrategies = await getCategoryRef('Strategies', 'c2')
const catGettingStarted = await getCategoryRef('Getting Started', 'c3')
const catFinancing = await getCategoryRef('Financing', 'c4')
const catTaxLegal = await getCategoryRef('Tax & Legal', 'c5')
const catMarkets = await getCategoryRef('Markets', 'c6')

function h2(key, text) { return { _type: 'block', _key: key, style: 'h2', children: [{ _type: 'span', _key: key+'s', text }] } }
function h3(key, text) { return { _type: 'block', _key: key, style: 'h3', children: [{ _type: 'span', _key: key+'s', text }] } }
function p(key, text) { return { _type: 'block', _key: key, style: 'normal', children: [{ _type: 'span', _key: key+'s', text }] } }
function bq(key, text) { return { _type: 'block', _key: key, style: 'blockquote', children: [{ _type: 'span', _key: key+'s', text }] } }
function pLink(key, segments) {
  const children = [], markDefs = []
  segments.forEach((seg, i) => {
    const spanKey = `${key}s${i}`, markKey = `${key}m${i}`
    if (seg.href) {
      markDefs.push({ _type: 'link', _key: markKey, href: seg.href })
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [markKey] })
    } else {
      children.push({ _type: 'span', _key: spanKey, text: seg.text, marks: [] })
    }
  })
  return { _type: 'block', _key: key, style: 'normal', markDefs, children }
}

// ══════════════════════════════════════════════════════
// POST 1: Property Management Checklist
// ══════════════════════════════════════════════════════
const propertyManagementChecklist = {
  _id: 'post-property-management-checklist-investors',
  _type: 'post',
  title: 'How to Create a Property Management Checklist That Protects Your Investment',
  slug: { _type: 'slug', current: 'property-management-checklist-investors' },
  author: authorRef,
  categories: [catGettingStarted],
  publishedAt: '2026-07-28T08:00:00Z',
  excerpt: 'Build a comprehensive property management checklist covering tenant screening, maintenance scheduling, financial tracking, and legal compliance to protect your rental investment portfolio.',
  seo: {
    metaTitle: 'Property Management Checklist for Real Estate Investors | ProInvestorHub',
    metaDescription: 'Complete property management checklist for landlords and investors. Covers tenant screening, maintenance schedules, rent collection, inspections, and legal compliance to protect your rental properties.',
  },
  body: [
    p('pm01', 'The difference between investors who build lasting wealth through rental properties and those who burn out within five years almost always comes down to systems. Not market timing, not deal selection, not even financing strategy — systems. Specifically, the repeatable processes you follow every single month to manage your properties, screen your tenants, maintain your buildings, and track your finances. A property management checklist is the foundation of those systems, and creating one that actually works requires understanding what goes wrong when you wing it.'),
    p('pm02', 'Without a checklist, you rely on memory and good intentions. You forget to schedule the annual furnace inspection until it breaks in January. You skip the drive-by inspection and miss the unauthorized pet that is destroying your carpet. You deposit rent checks without reconciling against your ledger and realize three months later that one tenant has been short-paying by fifty dollars every month. You neglect to send the lease renewal notice within the window required by your state and end up with a month-to-month tenant you cannot easily remove. Each of these mistakes is small in isolation. Together, they compound into thousands of dollars in lost income, deferred maintenance, and legal exposure.'),
    p('pm03', 'A good property management checklist prevents these failures by converting institutional knowledge into a repeatable process. It works whether you manage one unit or one hundred. It works whether you self-manage or hire a property manager, because even with a manager, you need a checklist to verify that the manager is doing their job. Here is how to build one from scratch.'),

    h2('pm04', 'Tenant Screening Checklist'),
    p('pm05', 'Tenant screening is the single most impactful activity in property management. A bad tenant costs you six to twelve months of rent between eviction costs, lost income, and unit turnover expenses. A good tenant pays on time, maintains the property, and renews their lease year after year. Your screening checklist must be applied consistently to every applicant to protect you from both bad tenants and fair housing complaints.'),
    p('pm06', 'Start with a written rental application that collects the applicant name, current and previous addresses for the past three years, employment history and current income, Social Security number for credit and background checks, personal and professional references, and authorization to verify all information provided. Every adult who will occupy the unit must complete a separate application.'),
    h3('pm07', 'Verification Steps'),
    p('pm08', 'Run a credit check through a tenant screening service like TransUnion SmartMove, RentPrep, or your property management software. Look for a minimum credit score of 620 for most markets, though this threshold varies. More important than the score itself is the pattern — look for collections from previous landlords, recent bankruptcies, or a history of late payments on recurring obligations. A low score from medical debt is very different from a low score caused by eviction judgments.'),
    p('pm09', 'Verify income by requiring the two most recent pay stubs and calling the employer directly. The standard threshold is that monthly gross income should be at least three times the monthly rent. For self-employed applicants, request two years of tax returns and six months of bank statements. Call previous landlords — not just the current one, who may give a glowing reference simply to get rid of a problem tenant. Ask specific questions: Did the tenant pay rent on time? Did they give proper notice? Would you rent to them again? Was there any property damage beyond normal wear and tear?'),
    pLink('pm10', [
      { text: 'Run a criminal background check and eviction history search. Be aware that many states and municipalities have adopted ' },
      { text: 'fair housing restrictions', href: '/blog/real-estate-legal-guide-investors' },
      { text: ' on how criminal history can be used in tenant screening decisions. Know your local laws before making any decision based on criminal records. Document your screening criteria in writing and apply them identically to every applicant. This documentation is your primary defense against discrimination claims.' },
    ]),

    h2('pm11', 'Move-In Checklist'),
    p('pm12', 'The move-in process sets the tone for the entire tenancy and creates the documentation you will need if there is a dispute at move-out. Your move-in checklist should include a detailed condition report completed by both you and the tenant, with photographs of every room, every appliance, and any existing damage. Both parties sign and date the report. This single document will save you more money over your investing career than almost any other piece of paper you create.'),
    p('pm13', 'Before the tenant moves in, confirm that all utilities have been transferred to the tenant name. Provide the tenant with a move-in packet that includes emergency contact numbers, maintenance request procedures, rent payment instructions, a copy of the signed lease, the condition report, and a summary of tenant responsibilities for lawn care, snow removal, and other property maintenance. Change all locks between tenants — this is required by law in some states and is simply good practice everywhere.'),

    h2('pm14', 'Monthly Property Management Tasks'),
    p('pm15', 'Create a monthly recurring checklist that covers the following items. First, rent collection and reconciliation. On the first of each month, verify that rent has been received from every unit. By the fifth, send late notices to any tenant who has not paid. By the tenth, begin the formal collection process required by your state, which typically starts with a pay-or-quit notice. Track every payment in your accounting software with the date received, amount, and any late fees applied.'),
    pLink('pm16', [
      { text: 'Second, review your financial statements. Every month, reconcile your bank account against your property management ledger. Review income versus expenses for each property. Calculate your actual ' },
      { text: 'cash-on-cash return', href: '/blog/cash-on-cash-return-explained' },
      { text: ' against your projected return. Identify any properties where expenses are trending above budget and investigate the cause. This monthly financial review takes thirty minutes and prevents the slow financial bleed that kills investor returns.' },
    ]),
    p('pm17', 'Third, conduct drive-by inspections of all properties at least once per month. You do not need to enter the unit. Simply drive past and observe the exterior condition. Are there unauthorized vehicles or excessive trash? Is the lawn being maintained? Are there signs of unauthorized occupants or pets? Drive-by inspections catch problems early and demonstrate to tenants that you are an attentive landlord, which encourages them to maintain the property.'),

    h2('pm18', 'Quarterly Maintenance Schedule'),
    p('pm19', 'Preventive maintenance is cheaper than emergency repairs by a factor of four to ten. Your quarterly checklist should rotate through the major building systems so that every system receives attention at least once per year. In the first quarter, focus on plumbing — check for leaks under sinks, test water heater temperature and pressure relief valves, inspect toilet flappers and fill valves, and clear slow drains. In the second quarter, focus on HVAC — replace air filters, clean condensate drains, inspect ductwork for leaks, and schedule the annual AC tune-up before summer.'),
    p('pm20', 'In the third quarter, focus on exterior maintenance — inspect the roof for missing or damaged shingles, clean gutters and downspouts, check grading around the foundation for proper drainage, and inspect exterior paint or siding for damage. In the fourth quarter, focus on safety systems — test smoke detectors and carbon monoxide detectors, inspect fire extinguishers, check handrails and stair treads, and verify that all exterior lighting is functional. Replace batteries in all detectors annually even if they test fine. Document every inspection with dates, findings, and any corrective action taken.'),

    h2('pm21', 'Annual Tasks and Lease Renewals'),
    p('pm22', 'Sixty to ninety days before a lease expires, send the tenant a lease renewal offer. Include any rent adjustment you plan to make. Research comparable rents in the area before setting your renewal rate — overpricing a renewal and losing a good tenant is far more expensive than accepting a below-market rent increase. Tenant turnover costs range from one to three months of rent when you factor in vacancy, cleaning, repairs, marketing, and screening costs. A five percent rent increase that causes a good tenant to leave is a net loss.'),
    p('pm23', 'Conduct a formal interior inspection of each unit at least once per year, with proper notice as required by your state (typically 24 to 48 hours). Use a standardized inspection form that covers every room, every appliance, and all safety systems. Compare the current condition against the move-in condition report. Address maintenance issues immediately and document any lease violations in writing with a timeline for correction.'),
    pLink('pm24', [
      { text: 'Review your insurance coverage annually. Confirm that your policy limits reflect current replacement costs, which may have increased due to construction cost inflation. Verify that your liability coverage is adequate — most investors carry at least one million dollars per occurrence. If you hold properties in an ' },
      { text: 'LLC', href: '/blog/how-to-set-up-property-llc' },
      { text: ', confirm that the LLC is named as the insured on each policy. Review your umbrella policy to ensure it coordinates with your individual property policies.' },
    ]),

    h2('pm25', 'Emergency Response Protocol'),
    p('pm26', 'Your checklist must include an emergency response protocol that tenants can follow when something goes wrong at two in the morning. Define what constitutes an emergency — fire, flood, gas leak, no heat in winter, sewage backup, break-in, or any situation that threatens life, health, or property. Provide tenants with a 24-hour emergency number. For self-managing landlords, this is your cell phone. For larger portfolios, use an answering service that can triage calls and dispatch contractors.'),
    p('pm27', 'Maintain a list of reliable emergency contractors including a plumber, electrician, HVAC technician, locksmith, and general handyman. Vet these contractors in advance — do not wait until you have a burst pipe at midnight to start searching for a plumber. Negotiate rates in advance and keep their contact information in your property management software, your phone, and a printed backup. Response time matters enormously for water damage in particular. A burst pipe addressed within thirty minutes causes hundreds of dollars in damage. The same pipe left for six hours causes tens of thousands.'),

    h2('pm28', 'Record-Keeping and Documentation'),
    p('pm29', 'Every interaction with a tenant should be documented in writing. Every maintenance request, every inspection, every rent payment, every notice, every complaint, and every resolution. Use property management software like Buildium, AppFolio, or Rent Manager for portfolios of five or more units. For smaller portfolios, a spreadsheet system works if you are disciplined about updating it. The documentation serves two purposes — it protects you legally if a dispute escalates to court, and it provides the data you need to make informed decisions about rent pricing, capital improvements, and property disposition.'),
    pLink('pm30', [
      { text: 'Keep digital copies of every lease, every addendum, every inspection report, and every contractor invoice organized by property and year. Back up these files to cloud storage. When tax season arrives, you will need clean records of all income and expenses for each property to claim your ' },
      { text: 'deductions', href: '/blog/real-estate-tax-deductions-complete-list' },
      { text: '. When you sell a property, you will need the capital improvement records to calculate your adjusted basis. When you refinance, the lender will want operating statements. Clean records make every one of these processes faster and more profitable.' },
    ]),

    h2('pm31', 'Building Your System'),
    pLink('pm32', [
      { text: 'Start with a simple spreadsheet or printed checklist and refine it over time. The first version will not be perfect, and that is fine. The goal is to have a system that you actually use consistently, not a theoretically perfect system that sits in a drawer. As your portfolio grows, invest in property management software that automates reminders, tracks maintenance requests, and generates financial reports. Use our ' },
      { text: 'investment calculators', href: '/calculators' },
      { text: ' to evaluate whether each property in your portfolio is still meeting your return targets. A property management checklist is not a static document — it is a living system that evolves as you learn what works for your specific properties, tenants, and market. The investors who succeed long-term are the ones who treat property management as a professional operation, not a casual side hustle.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 2: Real Estate Tax Deductions Complete List
// ══════════════════════════════════════════════════════
const taxDeductions = {
  _id: 'post-real-estate-tax-deductions-complete-list',
  _type: 'post',
  title: 'Real Estate Investing Tax Deductions: The Complete 2026 List',
  slug: { _type: 'slug', current: 'real-estate-tax-deductions-complete-list' },
  author: authorRef,
  categories: [catTaxLegal],
  publishedAt: '2026-07-28T14:00:00Z',
  excerpt: 'Every tax deduction available to real estate investors in 2026, from depreciation and mortgage interest to travel, home office, and pass-through deductions with practical examples.',
  seo: {
    metaTitle: 'Real Estate Tax Deductions 2026: Complete List for Investors | ProInvestorHub',
    metaDescription: 'Complete list of real estate investing tax deductions for 2026. Covers depreciation, mortgage interest, repairs, travel, insurance, professional fees, and the pass-through deduction with real examples.',
  },
  body: [
    p('td01', 'Tax deductions are the silent engine of real estate investing wealth. Two investors can own identical properties with identical cash flow, and the one who understands and claims every available deduction will accumulate significantly more wealth over a twenty-year period. The tax code is explicitly designed to reward real estate investors — depreciation alone lets you deduct the cost of a building over time even as it appreciates in value, creating a paper loss that shelters real income from taxation. But depreciation is just the beginning. The complete list of deductions available to real estate investors is extensive, and most investors leave money on the table every single year.'),
    p('td02', 'This guide covers every deduction available to real estate investors in 2026. Some apply to every landlord with a single rental property. Others require specific entity structures or income levels. All of them require proper documentation — the deduction only exists if you can prove it to the IRS. Keep receipts, maintain mileage logs, and work with a CPA who specializes in real estate. The cost of that CPA is itself a deduction.'),

    h2('td03', 'Depreciation'),
    p('td04', 'Depreciation is the most powerful deduction in real estate because it allows you to deduct the cost of your property over its useful life even though the property may actually be increasing in value. Residential rental property is depreciated over 27.5 years using the straight-line method. Commercial property is depreciated over 39 years. The land component of your purchase is not depreciable, so you must allocate your purchase price between land and improvements. Most investors use the county tax assessment ratio as a starting point — if the county values the land at twenty percent and improvements at eighty percent of assessed value, you can typically use a similar ratio for your depreciation calculation.'),
    p('td05', 'On a $300,000 rental property with a $240,000 depreciable basis, your annual depreciation deduction is approximately $8,727. That is $8,727 in income that you receive but do not pay current taxes on. Over 27.5 years, you deduct the entire $240,000. If your marginal tax rate is 32 percent, depreciation saves you roughly $2,793 per year in federal taxes alone on a single property. Scale that across ten properties and the savings are substantial.'),

    h3('td06', 'Cost Segregation Studies'),
    p('td07', 'A cost segregation study is an engineering analysis that reclassifies components of your building into shorter depreciation schedules. Carpeting, appliances, landscaping, parking lots, and certain fixtures can be depreciated over 5, 7, or 15 years instead of 27.5 or 39 years. With bonus depreciation still available (though phasing down), cost segregation can accelerate hundreds of thousands of dollars in deductions into the early years of ownership. Cost segregation studies typically cost $5,000 to $15,000 and are most cost-effective on properties valued at $500,000 or more. The study fee itself is deductible.'),

    h2('td08', 'Mortgage Interest'),
    p('td09', 'Every dollar of mortgage interest you pay on a rental property is fully deductible against your rental income. There is no limit on the number of properties or the total amount of mortgage interest you can deduct on investment properties — the limitations that apply to personal residence mortgage interest do not apply to rental properties. This includes interest on first mortgages, second mortgages, home equity loans used for investment purposes, and private money loans. If you pay points to obtain a mortgage on a rental property, those points are deducted over the life of the loan rather than in the year paid.'),

    h2('td10', 'Repairs and Maintenance'),
    p('td11', 'Ordinary repairs and maintenance expenses are fully deductible in the year incurred. This includes fixing a leaky faucet, patching drywall, replacing a broken window, repainting a unit between tenants, servicing the HVAC system, unclogging drains, replacing door locks, and repairing appliances. The key distinction is between a repair (which maintains the property in its current condition) and an improvement (which adds value, extends useful life, or adapts the property to a new use). Repairs are deducted immediately. Improvements must be capitalized and depreciated over their useful life.'),
    p('td12', 'The IRS provides safe harbors that help clarify this distinction. Under the de minimis safe harbor, you can deduct individual items costing $2,500 or less (or $5,000 if you have audited financial statements) without capitalizing them, even if they might otherwise be considered improvements. Under the routine maintenance safe harbor, you can deduct the cost of maintenance you reasonably expect to perform more than once during the property useful life. Replacing a roof is an improvement. Replacing a few shingles is a repair. Replacing an entire HVAC system is an improvement. Servicing and repairing the existing system is a repair.'),

    h2('td13', 'Property Taxes'),
    p('td14', 'State and local property taxes on your investment properties are fully deductible against your rental income. Unlike personal property taxes, which are subject to the $10,000 SALT deduction cap, property taxes on investment properties have no cap. If you own ten properties and pay $50,000 per year in total property taxes, the entire $50,000 is deductible. Make sure you are deducting the actual taxes paid during the tax year, which may differ from the tax assessment if your jurisdiction bills in advance or arrears.'),

    h2('td15', 'Insurance Premiums'),
    p('td16', 'All insurance premiums related to your rental properties are deductible. This includes hazard insurance, landlord liability insurance, flood insurance, umbrella policies that cover your rental properties, and rent guarantee insurance. If you have a portfolio policy that covers multiple properties, the entire premium is deductible. Workers compensation insurance for any employees is also deductible, as is health insurance if you qualify as a real estate professional.'),

    h2('td17', 'Professional Services'),
    pLink('td18', [
      { text: 'Fees paid to accountants, attorneys, property managers, and other professionals in connection with your rental activity are deductible. CPA fees for preparing your Schedule E and related tax forms are deductible. Attorney fees for lease review, eviction proceedings, entity formation, and real estate closings are deductible. ' },
      { text: 'Property management fees', href: '/blog/property-management-checklist-investors' },
      { text: ' — typically 8 to 12 percent of collected rent — are deductible. Bookkeeping fees, real estate coaching fees, and investment advisory fees related to your rental portfolio are all deductible.' },
    ]),

    h2('td19', 'Travel Expenses'),
    p('td20', 'If you travel to manage or maintain your rental properties, those travel expenses are deductible. For local travel, deduct either the standard mileage rate (67 cents per mile in 2026) or actual vehicle expenses including gas, maintenance, insurance, and depreciation. You must maintain a mileage log that records the date, destination, business purpose, and miles driven for each trip. Trips to properties for inspections, rent collection, maintenance oversight, tenant showings, and contractor meetings all qualify.'),
    p('td21', 'For out-of-town properties, you can deduct airfare, hotel, rental car, and meals (at 50 percent for meals) when the primary purpose of the trip is to manage or maintain your rental properties. If you combine business and personal travel, you can only deduct the business portion. Keep detailed records showing the business purpose of each trip. A week-long vacation to Florida with one afternoon visiting a potential investment property is not a deductible business trip. A three-day trip to inspect your rental properties with one afternoon at the beach is.'),

    h2('td22', 'Home Office Deduction'),
    p('td23', 'If you use a dedicated space in your home exclusively and regularly for rental property management, you can claim the home office deduction. The simplified method allows you to deduct five dollars per square foot of office space, up to 300 square feet, for a maximum deduction of $1,500. The regular method calculates the percentage of your home used for business and applies that percentage to your actual home expenses including mortgage interest, property taxes, utilities, insurance, and depreciation. The regular method produces a larger deduction but requires more recordkeeping.'),

    h2('td24', 'Operating Expenses'),
    p('td25', 'Routine operating expenses are all deductible. This category includes advertising costs for tenant placement, including listing fees on rental websites. It includes utilities that you pay as the landlord — common in multifamily properties where water, sewer, trash, or common area electric are landlord-paid. It includes landscaping and snow removal. It includes pest control. It includes supplies like cleaning products, keys, lockboxes, and maintenance materials. It includes bank fees on your rental property accounts. It includes software subscriptions for property management, accounting, and tenant screening.'),

    h2('td26', 'Pass-Through Deduction (Section 199A)'),
    pLink('td27', [
      { text: 'The qualified business income deduction under Section 199A allows eligible real estate investors to deduct up to 20 percent of their net rental income from their taxable income. For a rental operation generating $50,000 in net income, this deduction could reduce your taxable rental income to $40,000. The deduction is available to investors who hold rental properties through pass-through entities such as sole proprietorships, partnerships, S corporations, and ' },
      { text: 'LLCs', href: '/blog/how-to-set-up-property-llc' },
      { text: '. Income thresholds and phase-outs apply — for 2026, the deduction begins to phase out at $191,950 for single filers and $383,900 for married filing jointly.' },
    ]),

    h2('td28', '1031 Exchange'),
    p('td29', 'While not technically a deduction, the 1031 exchange allows you to defer capital gains taxes indefinitely by reinvesting the proceeds from a property sale into a like-kind replacement property. You must identify the replacement property within 45 days of the sale and close within 180 days. The exchange must be facilitated by a qualified intermediary — you cannot touch the sale proceeds. When executed correctly, a 1031 exchange allows you to sell a property with significant appreciation, avoid paying the capital gains tax (which could be 20 to 30 percent of the gain when you include federal, state, and depreciation recapture taxes), and reinvest the full amount into a larger property. Investors who chain 1031 exchanges throughout their careers can defer millions in capital gains taxes.'),

    h2('td30', 'Frequently Overlooked Deductions'),
    p('td31', 'Several deductions are commonly missed by real estate investors. Loan origination fees and mortgage application costs are deductible, amortized over the life of the loan. Legal fees for tenant disputes and evictions are deductible. Continuing education costs, including real estate investing courses, books, seminars, and coaching programs, are deductible if they maintain or improve skills in your rental business. Association dues for real estate investor groups like your local REIA are deductible. Even the cost of your internet service and cell phone can be partially deducted to the extent they are used for rental property management.'),
    pLink('td32', [
      { text: 'The difference between a good real estate investment and a great one often comes down to tax strategy. Use our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ' to model your returns, then work with a real estate CPA to ensure you are capturing every deduction available. A specialist CPA typically saves investors three to five times their fee in additional deductions and tax optimization strategies that generalist accountants miss.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 3: How to Raise Capital for Real Estate Deals
// ══════════════════════════════════════════════════════
const raiseCapital = {
  _id: 'post-how-to-raise-capital-real-estate',
  _type: 'post',
  title: 'How to Raise Capital for Real Estate Deals',
  slug: { _type: 'slug', current: 'how-to-raise-capital-real-estate' },
  author: authorRef,
  categories: [catFinancing],
  publishedAt: '2026-07-29T08:00:00Z',
  excerpt: 'Learn how to raise private capital for real estate deals including private money lending, joint ventures, syndications, and self-directed IRA partnerships with practical structuring advice.',
  seo: {
    metaTitle: 'How to Raise Capital for Real Estate Deals | ProInvestorHub',
    metaDescription: 'Complete guide to raising capital for real estate investing. Covers private money lenders, joint ventures, syndications, self-directed IRAs, and SEC compliance for capital raises.',
  },
  body: [
    p('rc01', 'Every real estate investor eventually hits the same wall: you can find deals, you can analyze deals, you can manage properties — but you run out of your own money. The investors who break through this barrier and scale to significant portfolios do so by learning how to raise capital from other people. This is not a shortcut or a hack. It is the fundamental skill that separates small-time landlords from serious real estate operators. When you can raise capital, you are no longer limited by your own savings, your own credit score, or your own borrowing capacity. You are limited only by your ability to find good deals and execute them.'),
    p('rc02', 'Raising capital for real estate requires understanding three things: the legal frameworks that govern how you can solicit and accept investor money, the financial structures that align your interests with your investors, and the relationship-building skills that create trust between you and the people who write you checks. All three are essential. A great deal structure means nothing if you cannot legally offer it. Perfect legal compliance means nothing if nobody trusts you enough to invest. And all the trust in the world means nothing if your deal structure does not protect your investors and compensate you fairly.'),

    h2('rc03', 'Private Money Lending'),
    p('rc04', 'The simplest form of capital raising is private money lending. You borrow money from an individual — a friend, family member, colleague, or acquaintance — and secure it with a mortgage or deed of trust against the property. The lender receives a fixed interest rate (typically 8 to 12 percent annually) and their investment is secured by the real property. If you default, the lender can foreclose and take the property, just like a bank.'),
    p('rc05', 'Private money lending is attractive because it is straightforward, both legally and financially. The lender makes a loan. You pay interest. The loan is secured by real estate. There is no equity sharing, no complex operating agreements, and in most states, no securities law compliance is required because the transaction is structured as a loan, not an investment. A real estate attorney can draft the promissory note, mortgage or deed of trust, and personal guarantee in a few hours for a few hundred dollars.'),
    p('rc06', 'To find private money lenders, start with your existing network. Mention at a dinner party or networking event that you pay 10 percent interest on loans secured by real estate, and watch how quickly people get interested. Many successful professionals have money sitting in savings accounts earning near zero. A 10 percent return secured by a tangible asset is enormously appealing to someone whose alternative is a 4 percent CD. Your parents, in-laws, former colleagues, dentist, accountant, and real estate agent all know people with money who would welcome a better return.'),

    h2('rc07', 'Joint Ventures'),
    pLink('rc08', [
      { text: 'A joint venture is a partnership on a single deal where one party brings the capital and the other brings the expertise, deal sourcing, and management. The typical JV split is 50/50 — the money partner puts up 100 percent of the capital and the operating partner does 100 percent of the work. Profits and losses are split equally. Some JVs use different splits like 60/40 or 70/30 depending on the relative contributions and risk. A ' },
      { text: 'well-drafted partnership agreement', href: '/blog/real-estate-investing-partner-agreements' },
      { text: ' is essential for any joint venture.' },
    ]),
    p('rc09', 'Joint ventures work well for house flips, BRRRR deals, and small multifamily acquisitions where the total capital required is under $500,000 and the project timeline is 6 to 18 months. The key advantage of a JV is simplicity — two parties, one deal, a clear timeline, and a defined exit strategy. The key risk is misalignment. Before entering any JV, both parties must agree on the business plan, the exit timeline, the decision-making authority, the dispute resolution process, and what happens if additional capital is required. Put everything in writing. Handshake deals between friends are how friendships end.'),

    h2('rc10', 'Syndications'),
    p('rc11', 'A real estate syndication is a structure where a sponsor (also called the general partner or GP) raises capital from multiple passive investors (limited partners or LPs) to acquire and manage a property. Syndications are the primary vehicle for acquiring large commercial properties — apartment complexes, office buildings, shopping centers, and industrial properties that require millions of dollars in equity. The sponsor finds the deal, arranges financing, manages the property, and executes the business plan. The investors provide the equity capital and receive passive returns.'),
    p('rc12', 'Syndication economics typically work as follows. Investors contribute 80 to 95 percent of the required equity. The sponsor contributes 5 to 20 percent. Returns to investors follow a preferred return structure — investors receive a 6 to 10 percent annual preferred return before the sponsor receives any profit share. After the preferred return is met, remaining profits are split between the sponsor (20 to 40 percent) and the investors (60 to 80 percent). This structure is called a waterfall because returns flow first to investors and then cascade to the sponsor.'),
    p('rc13', 'Syndications are securities. This means they are regulated by the SEC and by state securities agencies. You cannot legally raise syndication capital without complying with federal and state securities laws. Most syndications use one of two SEC exemptions: Regulation D Rule 506(b), which allows you to raise unlimited capital from up to 35 non-accredited investors and unlimited accredited investors but prohibits general solicitation and advertising; or Regulation D Rule 506(c), which allows general solicitation and advertising but restricts investors to verified accredited investors only. A securities attorney is not optional — it is required.'),

    h2('rc14', 'Self-Directed IRA Partnerships'),
    p('rc15', 'Millions of Americans have retirement accounts — IRAs, 401(k)s, and other qualified plans — that they would like to invest in real estate but do not know how. Self-directed IRAs allow account holders to invest in real estate, private notes, and other alternative assets through a custodian that specializes in non-traditional investments. When you raise capital, self-directed IRA holders represent a significant pool of potential investors.'),
    p('rc16', 'A self-directed IRA can participate in your deals as a private money lender (the IRA makes the loan, and interest payments go back into the IRA tax-deferred) or as a limited partner in a syndication (the IRA holds the LP interest, and distributions flow back into the IRA). The critical rule is that the IRA holder cannot receive any personal benefit from the investment — no personal guarantees, no personal use of the property, and no transactions with disqualified persons (family members, fiduciaries, or entities controlled by the IRA holder). Violations result in the entire IRA being distributed and taxed, so strict compliance is essential.'),

    h2('rc17', 'Building Your Investor Pipeline'),
    p('rc18', 'Raising capital is fundamentally a relationship business. Your first deal will be funded by people who know and trust you personally — family, friends, and close professional contacts. Your second and third deals will be funded by referrals from your first investors, who are now evangelists because you delivered on your promises and returned their capital with a strong yield. By your fifth or sixth deal, you will have a waiting list of investors asking to participate in your next project.'),
    p('rc19', 'Build your credibility systematically. Document your track record meticulously — every deal, every return, every timeline. Create a professional investor package for each deal that includes the executive summary, property details, financial projections, market analysis, risk factors, and your biography and track record. Share educational content about real estate investing on social media, at local real estate investor association meetings, and through a personal blog or newsletter. People invest with operators they know, like, and trust. Creating content and speaking at events builds all three.'),

    h2('rc20', 'Structuring the Deal'),
    pLink('rc21', [
      { text: 'Regardless of which capital-raising method you use, the deal structure must accomplish three things: protect the investor principal to the extent possible, provide the investor with a competitive risk-adjusted return, and compensate you fairly for your expertise and effort. The most common mistake new capital raisers make is being too generous with investors on their first deal, setting expectations they cannot sustain on subsequent deals. If you offer investors 15 percent preferred returns on your first deal because you are desperate for capital, every future investor will expect the same terms. Start with market-rate terms and let your ' },
      { text: 'deal analysis', href: '/blog/how-to-analyze-rental-property' },
      { text: ' determine what you can actually afford to pay.' },
    ]),
    p('rc22', 'Every capital raise should be documented with professional legal agreements drafted by a real estate attorney or securities attorney. For private money loans, you need a promissory note, mortgage or deed of trust, and personal guarantee. For joint ventures, you need an operating agreement or joint venture agreement. For syndications, you need a private placement memorandum, operating agreement, and subscription agreement. Do not use templates you found online. The legal fees for proper documentation are a small fraction of the capital you are raising, and they protect both you and your investors.'),

    h2('rc23', 'Common Mistakes to Avoid'),
    p('rc24', 'Do not raise capital before you have a deal. Investors want to invest in a specific property with a specific business plan, not in your general intention to buy real estate someday. Do not raise capital from people who cannot afford to lose their investment — real estate deals carry real risk, and your grandmother life savings should not be in your fix-and-flip project. Do not skip the legal structure because it is expensive — the cost of securities law violations ranges from fines and disgorgement of profits to criminal prosecution. Do not promise specific returns — projected returns are not guaranteed returns, and representing them otherwise is fraud.'),
    pLink('rc25', [
      { text: 'Raising capital is a skill that compounds over time. Your first raise will be difficult, awkward, and small. Your tenth will be relatively easy because you have a track record, a network, and confidence born from experience. Start with a single private money lender on a single deal. Use our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ' to model the returns for both you and your capital partner. Execute the deal perfectly. Return their capital with interest on time. Then do it again, slightly bigger. That is how every successful real estate operator started.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 4: Foreclosure Investing Guide
// ══════════════════════════════════════════════════════
const foreclosureInvesting = {
  _id: 'post-foreclosure-investing-guide',
  _type: 'post',
  title: 'Foreclosure Investing: How to Buy Bank-Owned and Auction Properties',
  slug: { _type: 'slug', current: 'foreclosure-investing-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-07-29T14:00:00Z',
  excerpt: 'A practical guide to buying foreclosure properties including pre-foreclosures, auction bidding, and REO purchases with strategies for evaluating deals and avoiding common pitfalls.',
  seo: {
    metaTitle: 'Foreclosure Investing Guide: Auctions, REOs & Pre-Foreclosures | ProInvestorHub',
    metaDescription: 'How to buy foreclosure properties for investment. Covers pre-foreclosure, auction bidding, REO purchases, due diligence, financing, and strategies to profit from distressed properties.',
  },
  body: [
    p('fi01', 'Foreclosure properties represent one of the most reliable sources of below-market real estate deals. When a borrower defaults on their mortgage, the lender initiates a legal process to reclaim the property, and that process creates opportunities at every stage — before the auction, at the auction, and after the auction when the bank owns the property and wants it off their books. Investors who understand the foreclosure process and develop systems for finding, evaluating, and acquiring distressed properties can consistently buy at 20 to 40 percent below market value.'),
    p('fi02', 'But foreclosure investing is not the get-rich-quick opportunity that late-night television ads suggest. It requires specialized knowledge of the legal process in your state, the ability to evaluate properties quickly and accurately with limited access, significant cash reserves for auction purchases, and the emotional discipline to walk away from deals that do not meet your criteria. The investors who profit from foreclosures are methodical, patient, and well-capitalized. The ones who lose money are impulsive, underfunded, and fail to do their homework.'),

    h2('fi03', 'Understanding the Foreclosure Timeline'),
    p('fi04', 'The foreclosure process varies significantly by state, but the general timeline follows a predictable pattern. The borrower misses payments, typically for 90 to 120 days before the lender files a formal notice. In judicial foreclosure states, the lender files a lawsuit and must obtain a court judgment before the property can be sold. This process takes 6 to 18 months depending on the state and court backlog. In non-judicial foreclosure states, the lender follows a statutory process that involves filing a notice of default, waiting a prescribed cure period (typically 90 days), and then scheduling a trustee sale. Non-judicial foreclosures typically complete in 4 to 8 months.'),
    p('fi05', 'This timeline creates three distinct buying opportunities. The pre-foreclosure period is from the first missed payment through the auction date. The auction (also called the trustee sale or sheriff sale) is the public sale where the property is sold to the highest bidder. The REO period (Real Estate Owned) begins if no third party buys the property at auction and the lender takes it back. Each stage offers different advantages, risks, and buying strategies.'),

    h2('fi06', 'Pre-Foreclosure Investing'),
    p('fi07', 'Pre-foreclosure investing means contacting homeowners who have received a notice of default or lis pendens (in judicial states) and negotiating a purchase before the property goes to auction. The homeowner is motivated because they face foreclosure on their credit record, a deficiency judgment for any balance remaining after the sale, and the stress of losing their home. You offer a solution — a quick cash purchase at a price that is below market but high enough to pay off their mortgage and allow them to walk away without a foreclosure on their record.'),
    p('fi08', 'Finding pre-foreclosure properties requires monitoring public records. Notices of default and lis pendens are filed with the county recorder or clerk of court and become public record. Services like PropertyRadar, Foreclosure.com, and RealtyTrac aggregate these filings and make them searchable. Some investors also build direct mail campaigns targeting homeowners in default. The key is speed — once a notice is filed, many investors are competing for the same deal, and the homeowner often signs with whoever contacts them first with a credible offer.'),
    pLink('fi09', [
      { text: 'The primary advantage of pre-foreclosure purchases is that you can inspect the property before buying, negotiate terms with a motivated seller, and use conventional ' },
      { text: 'financing options', href: '/blog/portfolio-loans-real-estate-investors' },
      { text: '. The primary disadvantage is competition — you are competing with other investors, some of whom are willing to pay more or close faster. Success in pre-foreclosures requires consistent outreach, excellent negotiation skills, and the ability to close quickly.' },
    ]),

    h2('fi10', 'Buying at the Foreclosure Auction'),
    p('fi11', 'The foreclosure auction is where properties are sold on the courthouse steps (or online, in an increasing number of jurisdictions) to the highest bidder. The lender sets the opening bid, usually equal to the amount owed on the mortgage plus fees and interest. If no one bids above the opening bid, the lender takes the property back as REO. If investors bid above the opening, the highest bidder wins the property.'),
    p('fi12', 'Auction purchases require cash — certified funds or cashier check, typically due within 24 hours of winning the bid. There is no financing contingency, no inspection contingency, and no title insurance at the time of purchase. You are buying the property as-is, sight-unseen in many cases, with whatever title issues exist. Junior liens are typically wiped out by the foreclosure sale, but senior liens (like a first mortgage if a second mortgage is foreclosing) survive and become your responsibility. IRS tax liens may or may not survive depending on whether the IRS was properly notified. HOA liens often survive in super-lien states.'),
    p('fi13', 'Before bidding at any auction, you must conduct thorough title research. Pull a full title search from a title company or do it yourself at the county recorder office. Identify every lien, mortgage, judgment, and encumbrance on the property. Determine which liens will be extinguished by the foreclosure sale and which will survive. Drive by the property to assess its exterior condition, photograph it, and research comparable sales in the neighborhood. Your maximum bid should be based on the after-repair value minus your renovation budget minus your desired profit minus a cushion for unexpected expenses.'),

    h2('fi14', 'Buying REO Properties'),
    p('fi15', 'When a property does not sell at auction, it becomes Real Estate Owned — a bank-owned property. The lender now owns it and wants to dispose of it as quickly as possible. Banks are not in the business of managing real estate, and every REO on their books requires maintenance, insurance, property taxes, and regulatory capital reserves. They are motivated sellers, though their motivation is often constrained by institutional bureaucracy.'),
    pLink('fi16', [
      { text: 'REO properties are typically listed by a real estate agent who specializes in bank-owned properties. You can find them on the MLS, on bank REO websites (such as HomePath for Fannie Mae, HomeSteps for Freddie Mac, and HUDHomeStore for FHA), and on aggregation sites like Auction.com. The advantage of REOs over auctions is that you can inspect the property, obtain title insurance, use financing, and include standard contingencies in your offer. The disadvantage is that REOs are priced closer to market value because the bank has had the property appraised and the listing agent has provided a broker price opinion. Discounts of 10 to 25 percent below market are typical for REOs that need significant repairs. Study our guide on ' },
      { text: 'analyzing rental properties', href: '/blog/how-to-analyze-rental-property' },
      { text: ' to ensure your offer price supports your investment thesis.' },
    ]),

    h2('fi17', 'Due Diligence for Foreclosure Properties'),
    p('fi18', 'Foreclosure properties present unique due diligence challenges. Many have been vacant for months or years, leading to deferred maintenance, vandalism, and environmental issues. Previous owners may have stripped the property of appliances, fixtures, copper plumbing, and even HVAC components before vacating. In cold climates, frozen and burst pipes in vacant properties cause extensive water damage. Mold is common in properties that have been closed up without climate control.'),
    p('fi19', 'For pre-foreclosure and REO purchases where you can inspect, budget 30 to 50 percent more for renovations than your initial estimate. For auction purchases where interior access is limited, budget 50 to 100 percent more. Walk the exterior carefully. Look for foundation cracks, roof damage, broken windows, signs of water intrusion, and evidence of pest infestation. Talk to neighbors — they often know the history of the property, including how long it has been vacant, whether there have been break-ins, and whether there are any known issues with the property.'),

    h2('fi20', 'Financing Foreclosure Purchases'),
    p('fi21', 'Auction purchases require cash. This is non-negotiable — you must have the funds available before you bid. For investors without sufficient cash reserves, hard money lenders can provide proof of funds letters and wire funds quickly, but you must have the lending arrangement in place before the auction. Some auction platforms have partnered with lenders to offer financing, but these programs are limited and may not be available in your market.'),
    p('fi22', 'Pre-foreclosure and REO purchases offer more financing flexibility. Conventional loans, FHA 203(k) renovation loans, hard money loans, and private money all work for these acquisitions. The 203(k) loan is particularly useful because it allows you to finance both the purchase price and the renovation cost in a single loan. For investors using the BRRRR strategy — buy, rehab, rent, refinance, repeat — hard money for the initial purchase and renovation, followed by a conventional refinance once the property is stabilized, is the standard approach.'),

    h2('fi23', 'Building Your Foreclosure Deal Pipeline'),
    p('fi24', 'Successful foreclosure investors do not chase individual deals. They build systems that produce a steady pipeline of opportunities. Subscribe to foreclosure listing services for your target markets. Attend courthouse auctions consistently — even if you do not bid, you learn the process, identify your competition, and begin to recognize opportunities. Build relationships with REO listing agents who can alert you to new listings before they hit the MLS. Network with bankruptcy attorneys, divorce attorneys, and probate attorneys who may have clients looking to sell distressed properties quickly.'),
    pLink('fi25', [
      { text: 'Set strict buying criteria and do not deviate from them regardless of how attractive a deal appears. Your criteria should specify the maximum percentage of after-repair value you will pay, the minimum profit margin you require, the maximum renovation budget you are comfortable managing, and the geographic area you focus on. Discipline in your criteria is what separates profitable foreclosure investors from those who buy someone else problem. Use our ' },
      { text: 'investment calculators', href: '/calculators' },
      { text: ' to verify that every potential deal meets your minimum return thresholds before committing capital.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 5: Cash-on-Cash vs ROI vs IRR
// ══════════════════════════════════════════════════════
const cocVsRoiVsIrr = {
  _id: 'post-cash-on-cash-vs-roi-vs-irr',
  _type: 'post',
  title: 'Cash-on-Cash Return vs. ROI vs. IRR: Which Metric Matters Most?',
  slug: { _type: 'slug', current: 'cash-on-cash-vs-roi-vs-irr' },
  author: authorRef,
  categories: [catDealAnalysis],
  publishedAt: '2026-07-30T08:00:00Z',
  excerpt: 'Understand the differences between cash-on-cash return, ROI, and IRR with real examples showing when each metric is most useful for evaluating real estate investments.',
  seo: {
    metaTitle: 'Cash-on-Cash Return vs ROI vs IRR Explained for Investors | ProInvestorHub',
    metaDescription: 'Compare cash-on-cash return, ROI, and IRR for real estate investing. Learn which return metric matters most for rental properties, flips, and value-add deals with clear calculation examples.',
  },
  body: [
    p('cv01', 'Real estate investors throw around return metrics like cash-on-cash return, ROI, and IRR as if they are interchangeable. They are not. Each metric measures something different, applies to different investment scenarios, and can lead you to opposite conclusions about the same deal. An investment that looks mediocre by one measure can look exceptional by another. Understanding what each metric actually measures — and when to use it — is the difference between analyzing deals like a professional and making decisions based on incomplete information.'),
    p('cv02', 'The confusion is understandable. All three metrics are expressed as percentages and all three attempt to answer the same fundamental question: Is this investment worth my money? But they answer that question from different angles, over different time horizons, and with different assumptions. A rental property investor evaluating a buy-and-hold deal needs a different primary metric than a house flipper evaluating a six-month project, and both need a different metric than a syndicator evaluating a five-year value-add apartment deal. Here is how each metric works, when to use it, and what it misses.'),

    h2('cv03', 'Cash-on-Cash Return'),
    pLink('cv04', [
      { text: 'Cash-on-cash return measures the annual pre-tax cash flow you receive relative to the total cash you invested. The formula is simple: annual pre-tax cash flow divided by total cash invested, expressed as a percentage. If you invest $50,000 in cash (down payment plus closing costs plus initial repairs) and the property generates $5,000 per year in cash flow after all expenses and debt service, your ' },
      { text: 'cash-on-cash return', href: '/blog/cash-on-cash-return-explained' },
      { text: ' is 10 percent.' },
    ]),
    p('cv05', 'The strength of cash-on-cash return is its simplicity and its focus on what matters most to rental property investors: how much cash is this property putting in my pocket relative to how much cash I put in? It accounts for leverage because it measures cash flow after debt service. If you buy a $250,000 property with $50,000 down and finance the rest, your cash-on-cash return reflects the effect of that leverage — you are measuring the return on your $50,000, not on the full $250,000 property value.'),
    p('cv06', 'The weakness of cash-on-cash return is that it only measures one year of cash flow and ignores the other sources of investment return — principal paydown, appreciation, and tax benefits. A property with a modest 8 percent cash-on-cash return might also be generating 3 percent annual appreciation, 2 percent return from principal paydown, and 2 percent from tax savings through depreciation. The total return is 15 percent, but cash-on-cash only captures 8 percent of it. This metric also ignores the time value of money — a dollar received today is worth more than a dollar received in five years, and cash-on-cash does not account for this.'),

    h2('cv07', 'Return on Investment (ROI)'),
    p('cv08', 'ROI measures your total profit as a percentage of your total investment. The formula is: (total gain minus total investment) divided by total investment. For a house flip, if you invest $200,000 total (purchase, renovation, holding costs, and selling costs) and sell for $260,000, your total gain is $60,000 and your ROI is 30 percent. For a rental property held for five years, you would add up all the cash flow received, the principal paid down, and the appreciation realized at sale, subtract your total investment, and divide by your total investment.'),
    p('cv09', 'ROI is the most intuitive return metric because it answers the question everyone wants to know: how much money did I make relative to how much I put in? It captures all sources of return — cash flow, appreciation, principal paydown, and any value created through renovations or improved management. For this reason, ROI is the best metric for comparing completed investments where you know the final numbers.'),
    p('cv10', 'The critical weakness of ROI is that it does not account for time. A 30 percent ROI on a house flip sounds impressive until you learn the project took two years. That same 30 percent over two years is roughly equivalent to 14 percent per year — still solid but a very different story. Meanwhile, a 20 percent ROI on a flip that took four months annualizes to approximately 60 percent. ROI treats a dollar earned in month one identically to a dollar earned in year five, which makes it a poor tool for comparing investments with different holding periods.'),

    h2('cv11', 'Internal Rate of Return (IRR)'),
    p('cv12', 'The internal rate of return is the most sophisticated of the three metrics and the one used by institutional investors and commercial real estate professionals. IRR is the discount rate that makes the net present value of all cash flows equal to zero. In plain terms, it is the annualized rate of return that accounts for both the magnitude and the timing of every dollar that goes in and comes out of the investment.'),
    p('cv13', 'Consider a value-add apartment deal where you invest $100,000 on day one, receive $8,000 per year in distributions for years one through three, then receive $15,000 per year in distributions for years four and five as the renovations take effect and rents increase, then receive your $100,000 back plus $50,000 in appreciation when the property sells at the end of year five. Your total cash received is $54,000 in distributions plus $150,000 at sale, totaling $204,000 on a $100,000 investment — an ROI of 104 percent. But the IRR of this investment is approximately 19.5 percent because the IRR model accounts for the fact that you did not receive most of that return until year five.'),
    p('cv14', 'IRR is the best metric for evaluating investments where the cash flows vary significantly over time, which is common in value-add deals, development projects, and any investment with a planned capital event (sale or refinance). It is also the best metric for comparing investments with different holding periods because it automatically annualizes the return. A five-year deal with a 19.5 percent IRR is directly comparable to a three-year deal with a 22 percent IRR.'),
    p('cv15', 'The weakness of IRR is complexity — it requires a financial calculator or spreadsheet to compute, and it is sensitive to assumptions about the timing and magnitude of future cash flows. Small changes in the assumed exit cap rate or the renovation timeline can swing the IRR by several percentage points. IRR also has a mathematical quirk: it assumes that all interim cash flows are reinvested at the same rate as the IRR itself, which is often unrealistic. If a deal has a 25 percent IRR and you receive distributions that you reinvest at 8 percent, your actual return will be lower than the IRR suggests.'),

    h2('cv16', 'When to Use Each Metric'),
    h3('cv17', 'Use Cash-on-Cash Return When'),
    p('cv18', 'You are evaluating buy-and-hold rental properties where your primary goal is passive income. Cash-on-cash return tells you how much cash the property will put in your pocket each year relative to your initial investment. Target 8 to 12 percent cash-on-cash for most rental properties. Anything above 12 percent is exceptional. Below 6 percent, the risk-reward ratio may not justify the management burden. Compare your cash-on-cash return against alternative passive investments like dividend stocks or bonds to ensure real estate is earning a premium for the additional effort and illiquidity.'),

    h3('cv19', 'Use ROI When'),
    p('cv20', 'You are evaluating completed investments or comparing investments with similar time horizons. ROI is ideal for house flips because the holding period is short and relatively consistent. It is also useful for looking back at past investments to assess your overall performance. Calculate ROI after you sell a property to measure your actual return. Compare the ROI across your completed deals to identify which strategies and markets have produced the best results.'),

    h3('cv21', 'Use IRR When'),
    p('cv22', 'You are evaluating value-add deals, syndications, development projects, or any investment where the cash flows change significantly over the holding period. IRR is the standard metric for commercial real estate and institutional investing because it captures the time value of money. When a syndicator presents you with a projected 18 percent IRR, you can compare that directly against other syndications, private equity funds, or even a simple stock market index fund that has historically returned approximately 10 percent annually.'),

    h2('cv23', 'Practical Example: Same Property, Three Metrics'),
    p('cv24', 'Consider a $400,000 duplex purchased with $100,000 down. Annual cash flow after all expenses and debt service is $9,000. Over a five-year hold, the property appreciates to $480,000. Principal paydown over five years totals $28,000. You sell for $480,000, pay off the remaining mortgage of $272,000, and net $208,000 after selling costs. Your cash-on-cash return in year one is 9 percent ($9,000 divided by $100,000). Your total ROI over five years is 153 percent ($45,000 cash flow plus $28,000 principal paydown plus $80,000 appreciation, totaling $153,000, divided by $100,000). Your IRR is approximately 21 percent, accounting for the timing of all cash flows.'),
    pLink('cv25', [
      { text: 'Each metric tells a different part of the story. Cash-on-cash says you are earning a respectable 9 percent annual yield on your cash. ROI says your total return over five years was 153 percent. IRR says your time-adjusted annualized return was 21 percent. All three are accurate. None is complete alone. Use our ' },
      { text: 'investment calculators', href: '/calculators' },
      { text: ' to compute all three metrics for any deal you are evaluating, and use the right metric for the right decision.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 6: How to Set Up a Property LLC
// ══════════════════════════════════════════════════════
const propertyLLC = {
  _id: 'post-how-to-set-up-property-llc',
  _type: 'post',
  title: 'How to Set Up a Property LLC in Any State',
  slug: { _type: 'slug', current: 'how-to-set-up-property-llc' },
  author: authorRef,
  categories: [catTaxLegal],
  publishedAt: '2026-07-30T14:00:00Z',
  excerpt: 'Step-by-step guide to forming an LLC for rental properties, including state selection, operating agreements, EIN registration, bank accounts, and transferring property into the LLC.',
  seo: {
    metaTitle: 'How to Set Up a Property LLC for Real Estate Investing | ProInvestorHub',
    metaDescription: 'Complete guide to setting up an LLC for real estate investments. Covers formation steps, operating agreements, registered agents, EIN, bank accounts, and transferring properties into an LLC.',
  },
  body: [
    p('ll01', 'Forming a limited liability company for your rental properties is one of the most common recommendations in real estate investing, and for good reason. An LLC creates a legal barrier between your investment properties and your personal assets. If a tenant slips on ice, a contractor sues for non-payment, or any other liability arises from your rental property, the LLC structure means the claim is against the LLC, not against you personally. Your personal bank accounts, your home, your retirement accounts, and your other investments are protected — provided you set up and maintain the LLC correctly.'),
    p('ll02', 'But the decision to form an LLC involves tradeoffs. There are formation costs, annual fees, additional tax filings, and financing complications. Some lenders will not make loans to LLCs or will charge higher rates. Transferring an existing property into an LLC can trigger the due-on-sale clause in your mortgage. And the liability protection is not absolute — courts can pierce the corporate veil if you commingle funds, fail to maintain the LLC as a separate entity, or are personally negligent. This guide walks you through the entire process and helps you decide whether, when, and how to structure your properties in LLCs.'),

    h2('ll03', 'Choosing Your State of Formation'),
    p('ll04', 'You can form an LLC in any state, regardless of where you live or where your properties are located. However, if you form in a state other than where the property is located, you will need to register the LLC as a foreign entity in the property state, which means additional fees and filings. For most investors, the simplest and cheapest approach is to form the LLC in the state where the property is located. Wyoming and Nevada are popular for their strong asset protection statutes and privacy features, but the additional cost and complexity of foreign registration often outweigh the benefits for investors with properties in a single state.'),
    p('ll05', 'If you own properties in multiple states, consider forming a separate LLC in each state where you own property, with a holding company LLC in your home state or a favorable jurisdiction like Wyoming that owns the individual property LLCs. This structure provides state-specific liability protection (a claim against one LLC does not reach properties held in a different LLC) and keeps the entity structure clean for tax and management purposes.'),

    h2('ll06', 'Step-by-Step Formation Process'),
    h3('ll07', 'Step 1: Choose a Name'),
    p('ll08', 'Your LLC name must be unique within the state of formation and must include the designation LLC or Limited Liability Company. Most states allow you to search their business name database online. Choose a name that is professional and does not reveal personal information — "123 Main Street LLC" or "Sunset Properties LLC" rather than "John Smith Rentals LLC." If you plan to form multiple LLCs for different properties, establish a naming convention that scales: "Sunset Holdings 1 LLC," "Sunset Holdings 2 LLC," and so on.'),

    h3('ll09', 'Step 2: Appoint a Registered Agent'),
    p('ll10', 'Every LLC must designate a registered agent — a person or company authorized to receive legal documents and official correspondence on behalf of the LLC. You can serve as your own registered agent if you have a physical address in the formation state, but most investors use a commercial registered agent service for privacy and convenience. Registered agent services cost $50 to $300 per year and provide a professional address that keeps your home address off public records.'),

    h3('ll11', 'Step 3: File Articles of Organization'),
    p('ll12', 'The articles of organization (called a certificate of formation in some states) is the document that officially creates the LLC. You file it with the Secretary of State or equivalent agency. Filing fees range from $50 in states like Kentucky and Mississippi to $500 in Massachusetts. The articles typically require the LLC name, the registered agent name and address, the principal office address, the names of the members or managers, and whether the LLC is member-managed or manager-managed. Most states allow online filing with immediate or same-day processing.'),

    h3('ll13', 'Step 4: Draft an Operating Agreement'),
    p('ll14', 'The operating agreement is the internal governing document of the LLC. Even though most states do not require you to file the operating agreement, you absolutely must have one. For a single-member LLC, the operating agreement establishes that the LLC is a separate entity from you, defines how the LLC operates, and provides evidence of the separation between personal and business activities that is essential for maintaining liability protection.'),
    pLink('ll15', [
      { text: 'For a multi-member LLC — which includes any LLC with a ' },
      { text: 'partner', href: '/blog/real-estate-investing-partner-agreements' },
      { text: ' — the operating agreement is critical. It defines each member capital contribution, profit and loss allocation, management responsibilities, voting rights, distribution schedule, what happens when a member wants to exit, what happens if a member dies or becomes incapacitated, and how disputes are resolved. Do not use a generic template. Have a real estate attorney draft or review your operating agreement.' },
    ]),

    h3('ll16', 'Step 5: Obtain an EIN'),
    p('ll17', 'An Employer Identification Number is your LLC tax identification number, issued by the IRS. You need it to open a bank account, file tax returns, and conduct business. Applying for an EIN is free and can be done online at IRS.gov in about five minutes. The EIN is issued immediately. A single-member LLC is treated as a disregarded entity for tax purposes by default, meaning all income and expenses flow through to your personal tax return on Schedule E. A multi-member LLC is treated as a partnership by default and must file Form 1065 annually.'),

    h3('ll18', 'Step 6: Open a Dedicated Bank Account'),
    p('ll19', 'Open a separate bank account in the LLC name using the EIN. This is not optional — commingling personal and LLC funds is one of the primary ways courts justify piercing the corporate veil and removing your liability protection. All rental income must be deposited into the LLC account. All property expenses must be paid from the LLC account. If you need to contribute personal funds to the LLC, document it as a capital contribution. If you take money out, document it as a distribution. Never use the LLC account for personal expenses.'),

    h2('ll20', 'Transferring Property into the LLC'),
    p('ll21', 'If you already own rental properties in your personal name, transferring them into an LLC requires a quitclaim deed or warranty deed from you individually to the LLC. Record the deed with the county recorder office. The transfer may trigger transfer taxes in some jurisdictions, though many states exempt transfers between an individual and their wholly-owned LLC. More importantly, the transfer may trigger the due-on-sale clause in your mortgage, which gives the lender the right to demand full repayment of the loan.'),
    p('ll22', 'In practice, most residential lenders do not enforce the due-on-sale clause for transfers into single-member LLCs because the Garn-St. Germain Act provides an exemption for transfers that do not change beneficial ownership. However, this is not guaranteed. Some investors mitigate this risk by notifying the lender, by keeping the insurance policy in their personal name with the LLC as additional insured, or by waiting to transfer until they refinance into a commercial loan in the LLC name. Consult with a real estate attorney before transferring any property with an existing mortgage.'),

    h2('ll23', 'Maintaining Your LLC'),
    pLink('ll24', [
      { text: 'An LLC that exists only on paper provides no protection. You must maintain the LLC as a separate entity from yourself. This means keeping separate bank accounts, signing all contracts in your capacity as manager or member of the LLC (not in your personal capacity), maintaining adequate insurance in the LLC name, filing annual reports and paying annual fees required by the state, keeping meeting minutes or written consents for major decisions, and filing tax returns on time. If you fail to maintain the LLC, a plaintiff attorney can argue that the LLC is merely your alter ego and persuade a court to pierce the corporate veil. Review your ' },
      { text: 'tax deductions', href: '/blog/real-estate-tax-deductions-complete-list' },
      { text: ' annually to ensure you are capturing the LLC formation and maintenance costs, which are themselves deductible business expenses.' },
    ]),

    h2('ll25', 'One LLC or Multiple LLCs'),
    p('ll26', 'The standard recommendation is one LLC per property or one LLC per small group of properties. The logic is straightforward — if all your properties are in a single LLC, a liability claim against one property exposes the equity in all properties. If each property is in its own LLC, a claim against one property can only reach the assets of that specific LLC. However, maintaining multiple LLCs creates additional cost and administrative burden. Each LLC requires its own bank account, its own annual report, and its own tax filing.'),
    p('ll27', 'A practical compromise for investors with 3 to 10 properties is to group properties by risk profile. High-liability properties (multifamily, properties with pools, older buildings) get their own LLCs. Lower-risk properties (newer single-family homes with long-term tenants) can be grouped 2 to 4 per LLC. A holding company LLC at the top of the structure owns the individual property LLCs and provides an additional layer of protection. This structure balances liability protection with administrative practicality. As your portfolio grows beyond 10 properties, the cost of individual LLCs becomes relatively small per property and the liability isolation becomes increasingly valuable.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 7: Portfolio Loans Explained
// ══════════════════════════════════════════════════════
const portfolioLoans = {
  _id: 'post-portfolio-loans-real-estate-investors',
  _type: 'post',
  title: 'Portfolio Loans Explained: How to Scale Beyond Conventional Limits',
  slug: { _type: 'slug', current: 'portfolio-loans-real-estate-investors' },
  author: authorRef,
  categories: [catFinancing],
  publishedAt: '2026-07-31T08:00:00Z',
  excerpt: 'How portfolio loans work for real estate investors, including qualification criteria, typical terms, how to find portfolio lenders, and strategies for scaling past the conventional 10-property limit.',
  seo: {
    metaTitle: 'Portfolio Loans for Real Estate Investors: Scale Beyond 10 Properties | ProInvestorHub',
    metaDescription: 'How portfolio loans help real estate investors scale beyond conventional mortgage limits. Covers DSCR loans, blanket mortgages, portfolio lender qualification, and strategies for financing 10+ properties.',
  },
  body: [
    p('pl01', 'Every real estate investor who buys rental properties with conventional financing eventually hits the same ceiling: Fannie Mae and Freddie Mac limit individual borrowers to ten financed properties. Your first four properties qualify for standard conventional terms — the best rates, lowest down payments, and most borrower-friendly underwriting. Properties five through ten require higher reserves and face stricter underwriting. After ten, the conventional lending window closes entirely. This is where portfolio loans enter the picture, and understanding them is essential for any investor who plans to scale beyond a small portfolio.'),
    p('pl02', 'A portfolio loan is a mortgage originated and held by the lending institution rather than sold to Fannie Mae, Freddie Mac, or another secondary market investor. Because the lender keeps the loan on their own balance sheet, they can set their own underwriting criteria. They are not bound by agency guidelines regarding the number of financed properties, the borrower income requirements, or even the property type. This flexibility makes portfolio loans the primary financing tool for investors building larger rental portfolios.'),

    h2('pl03', 'How Portfolio Loans Differ from Conventional Mortgages'),
    p('pl04', 'Conventional mortgages follow a standardized set of guidelines established by Fannie Mae and Freddie Mac. The property must appraise at or above the purchase price. The borrower must meet specific debt-to-income ratio thresholds. The property must be in habitable condition. The loan must fit within conforming loan limits. These rules exist because the lender intends to sell the loan — and the buyer (Fannie or Freddie) demands standardization.'),
    p('pl05', 'Portfolio lenders write their own rules. A community bank might offer a 25-year amortization with a 7-year balloon payment, an 80 percent loan-to-value ratio, and qualification based on the property rental income rather than the borrower personal income. A credit union might offer a 20-year fully amortizing loan at a rate one percent higher than conventional but with no limit on the number of financed properties. A DSCR lender might offer a 30-year loan with qualification based entirely on the property debt service coverage ratio, requiring no personal income documentation at all. The terms vary widely because each portfolio lender has different capital sources, risk appetites, and target borrowers.'),

    h2('pl06', 'Types of Portfolio Loans'),
    h3('pl07', 'Community Bank Portfolio Loans'),
    p('pl08', 'Community banks and regional banks are the traditional source of portfolio loans for real estate investors. These banks have loan officers who understand local markets and make lending decisions based on the overall relationship, not just a credit score and a debt-to-income ratio. They often offer better rates than specialty lenders because their cost of capital is lower. The typical community bank portfolio loan features a 20 to 25-year amortization, a 5 to 10-year balloon (meaning the remaining balance is due at the end of that period), 75 to 80 percent LTV, and a rate that is 0.5 to 1.5 percent higher than conventional rates. Many community banks will also provide lines of credit secured by your existing portfolio equity, which is invaluable for funding new acquisitions quickly.'),

    h3('pl09', 'DSCR Loans'),
    pLink('pl10', [
      { text: 'Debt Service Coverage Ratio loans have become the dominant portfolio loan product for real estate investors over the past five years. DSCR lenders qualify the loan based on the property income, not the borrower income. If the property generates enough rental income to cover the mortgage payment with a cushion (typically a DSCR of 1.20 or higher, meaning the property income is 120 percent of the debt service), the loan is approved regardless of the borrower personal income, employment status, or number of existing properties. This makes DSCR loans ideal for self-employed investors, investors scaling rapidly, and investors with complex tax returns that make documenting income difficult. Learn how to ' },
      { text: 'analyze rental property deals', href: '/blog/how-to-analyze-rental-property' },
      { text: ' to ensure your DSCR meets lender requirements.' },
    ]),
    p('pl11', 'DSCR loan terms typically include a 30-year fixed or adjustable rate, 75 to 80 percent LTV, rates 1 to 3 percent higher than conventional, and prepayment penalties of 3 to 5 years. The higher rate is the cost of the no-income-documentation convenience. For investors whose properties cash flow comfortably, the higher rate is a reasonable price for the ability to scale without income verification limitations.'),

    h3('pl12', 'Blanket Mortgages'),
    p('pl13', 'A blanket mortgage is a single loan secured by multiple properties. Instead of having ten separate mortgages on ten properties, you have one blanket loan covering all ten. This simplifies your payments and can provide better terms due to the larger loan size and diversified collateral. Blanket mortgages typically include a release clause that allows you to sell individual properties and remove them from the blanket lien by paying down a specified portion of the loan balance. These loans are available from community banks, credit unions, and some specialty lenders.'),

    h2('pl14', 'Finding Portfolio Lenders'),
    p('pl15', 'Portfolio lenders do not advertise on television or buy Super Bowl ads. Finding them requires networking and research. Start with community banks and credit unions in your target market. Call the commercial lending department and ask if they originate loans for small residential rental portfolios. Many community banks have dedicated real estate investor lending programs but do not market them aggressively. Your local real estate investor association (REIA) is an excellent resource — ask other investors who they use for financing. Mortgage brokers who specialize in investment properties can also connect you with portfolio lenders in your market.'),
    p('pl16', 'For DSCR loans, the market is now large enough that several national lenders compete aggressively on rates and terms. Companies like Kiavi, Visio Lending, Lima One Capital, and RCN Capital originate DSCR loans nationwide. Working with a mortgage broker who specializes in investor loans is often the most efficient way to compare DSCR offerings because brokers have relationships with multiple lenders and can quickly identify the best terms for your specific situation.'),

    h2('pl17', 'Qualification Criteria'),
    p('pl18', 'Portfolio lender qualification criteria vary, but common requirements include a credit score of 660 to 720 minimum (lower than the 740 that gets you the best conventional rates, but not dramatically lower), 6 to 12 months of reserves for each financed property, 20 to 25 percent down payment, and a property that meets minimum rental income thresholds. Some portfolio lenders also require personal guarantees, real estate experience (measured in number of properties owned or years of landlording), and a minimum net worth relative to the total loan amount.'),
    pLink('pl19', [
      { text: 'The most important qualification factor for portfolio lenders is your track record. A borrower with ten successfully managed rental properties and a clean payment history on all existing mortgages is a low-risk borrower regardless of their debt-to-income ratio. Build your relationship with a portfolio lender early — before you need them. Open a business account, deposit your rental income, and develop a relationship with the commercial loan officer. When you are ready to finance property eleven, the relationship and track record will make the approval process significantly smoother. Calculate your ' },
      { text: 'cash-on-cash return', href: '/blog/cash-on-cash-return-explained' },
      { text: ' on each property to demonstrate strong portfolio performance to potential lenders.' },
    ]),

    h2('pl20', 'Scaling Strategy'),
    p('pl21', 'The most effective financing strategy for building a large rental portfolio combines conventional and portfolio lending. Use conventional loans for your first ten properties to capture the best rates. Then transition to portfolio loans — either DSCR loans or community bank portfolio products — for properties eleven and beyond. As your portfolio grows, periodically refinance groups of properties into blanket mortgages to simplify your debt structure and potentially negotiate better terms based on the relationship and total loan volume.'),
    p('pl22', 'Some investors also use a strategy of acquiring properties with hard money or bridge financing, renovating and stabilizing them, and then refinancing into portfolio loans once the property is generating market-rate rent. This approach allows you to capture value-add returns on the front end and lock in long-term financing on the back end. The key is maintaining strong reserves throughout the process — portfolio lenders want to see that you have enough liquidity to weather vacancies, unexpected repairs, and market downturns. A large portfolio with thin reserves is a recipe for trouble. A large portfolio with 12 to 18 months of reserves per property is a well-managed operation that lenders compete to serve.'),
  ],
}

// ══════════════════════════════════════════════════════
// POST 8: Mixed-Use Property Investing
// ══════════════════════════════════════════════════════
const mixedUse = {
  _id: 'post-mixed-use-property-investing-guide',
  _type: 'post',
  title: 'Mixed-Use Property Investing: Combining Residential and Commercial',
  slug: { _type: 'slug', current: 'mixed-use-property-investing-guide' },
  author: authorRef,
  categories: [catStrategies],
  publishedAt: '2026-07-31T14:00:00Z',
  excerpt: 'How to invest in mixed-use properties that combine retail, office, or commercial space with residential units for diversified income streams, tax advantages, and stronger returns.',
  seo: {
    metaTitle: 'Mixed-Use Property Investing Guide for Real Estate Investors | ProInvestorHub',
    metaDescription: 'Complete guide to mixed-use property investing. Learn how to evaluate buildings with both commercial and residential tenants, finance them, manage diverse tenant types, and maximize returns.',
  },
  body: [
    p('mu01', 'Mixed-use properties — buildings that combine commercial space on the ground floor with residential units above — are among the most compelling investment opportunities in real estate. They offer income diversification that pure residential or pure commercial properties cannot match, a natural hedge against market cycles, and access to value-add strategies on both the commercial and residential sides of the building. A well-located mixed-use property with a coffee shop on the ground floor and four apartments above generates income from two fundamentally different tenant types with different lease structures, different market drivers, and different risk profiles. When the residential market softens, commercial rents may hold. When commercial vacancies rise, residential demand may still be strong.'),
    p('mu02', 'Mixed-use properties are also deeply misunderstood by many investors. Residential investors see the commercial component as intimidating. Commercial investors view the residential units as a management headache. This creates a market inefficiency — mixed-use properties are often undervalued relative to what you would pay for the residential and commercial components separately. Investors who develop expertise in both residential and commercial management can exploit this inefficiency consistently.'),

    h2('mu03', 'Types of Mixed-Use Properties'),
    p('mu04', 'The most common mixed-use configuration is vertical mixed-use: commercial space on the ground floor with residential units on upper floors. This is the classic Main Street building found in thousands of small towns and urban neighborhoods across the country. The ground floor might house a restaurant, retail shop, professional office, or service business. The upper floors contain one to twenty residential units depending on the size of the building.'),
    p('mu05', 'Horizontal mixed-use describes properties where commercial and residential uses occupy separate structures on the same parcel or in the same development. A small apartment complex with a standalone commercial building at the street front is horizontal mixed-use. Live-work units — spaces designed for residents to both live and operate a business in the same unit — are another form of mixed-use that has gained popularity with the rise of remote work and home-based businesses.'),

    h2('mu06', 'Financial Advantages'),
    pLink('mu07', [
      { text: 'Mixed-use properties typically generate higher total income per square foot than comparable single-use buildings because commercial tenants pay higher rents per square foot than residential tenants, and the commercial space commands a premium for ground-floor, street-facing visibility. A 5,000 square foot mixed-use building with 2,000 square feet of ground-floor commercial space at $18 per square foot and 3,000 square feet of residential space at $12 per square foot generates $72,000 annually — more than the same building would generate as pure residential ($60,000) or pure commercial with higher vacancy risk. Calculate the true returns with our ' },
      { text: 'investment calculators', href: '/calculators' },
      { text: '.' },
    ]),
    p('mu08', 'Commercial leases in mixed-use properties are typically triple-net or modified gross, meaning the commercial tenant pays a portion of the property taxes, insurance, and common area maintenance in addition to base rent. This shifts operating expenses from the landlord to the tenant and increases the effective net operating income. Commercial leases also tend to be longer — 3 to 10 years versus 1 year for residential — providing more predictable income. And commercial leases include annual rent escalations, typically 2 to 3 percent per year or tied to the Consumer Price Index, which provides built-in income growth.'),

    h2('mu09', 'Evaluating Mixed-Use Deals'),
    p('mu10', 'Analyzing a mixed-use property requires evaluating the residential and commercial components separately and then combining them. For the residential units, analyze comparable rents for similar units in the neighborhood, vacancy rates for the submarket, and the condition of the units relative to market expectations. For the commercial space, analyze the current lease terms (remaining term, rent escalations, tenant obligations), the creditworthiness and business viability of the commercial tenant, and comparable commercial rents in the area.'),
    p('mu11', 'Pay particular attention to the commercial tenant. A vacant commercial space in a mixed-use building is far more expensive than a vacant apartment because commercial spaces take longer to lease (3 to 12 months versus 2 to 4 weeks for residential) and often require significant tenant improvement allowances to attract a new business. A strong commercial tenant with a long-term lease provides stable income. A weak commercial tenant on a short-term lease represents a potential vacancy problem that could last months.'),
    pLink('mu12', [
      { text: 'The capitalization rate for mixed-use properties typically falls between residential and commercial cap rates for the market. If residential properties trade at 6 percent cap rates and commercial properties trade at 7.5 percent cap rates in your market, mixed-use properties should trade at approximately 6.5 to 7 percent. Understanding the right cap rate for mixed-use in your market is essential for making competitive offers without overpaying. Read our guide on ' },
      { text: 'investment metrics', href: '/blog/cash-on-cash-vs-roi-vs-irr' },
      { text: ' to understand how cap rates relate to your total return.' },
    ]),

    h2('mu13', 'Financing Mixed-Use Properties'),
    p('mu14', 'Financing is where mixed-use investing gets complicated. If the property has four or fewer residential units and the owner occupies one of them, the property may qualify for FHA or conventional residential financing, even with the commercial component. FHA specifically allows mixed-use properties where the commercial space is no more than 49 percent of the total floor area. This means you could buy a mixed-use building with as little as 3.5 percent down with FHA financing — an extraordinary opportunity for new investors.'),
    p('mu15', 'If the property does not qualify for residential financing — either because it has more than four residential units, the commercial space exceeds 49 percent, or you are not owner-occupying — you will need commercial financing. Commercial loans for mixed-use properties typically require 20 to 30 percent down, have shorter amortization periods (20 to 25 years), and may include balloon payments. DSCR lenders and community banks are the most common sources of mixed-use financing for small to mid-size buildings.'),

    h2('mu16', 'Management Considerations'),
    p('mu17', 'Managing a mixed-use property requires familiarity with both residential landlord-tenant law and commercial lease management. Residential tenants are protected by habitability standards, security deposit regulations, eviction procedures, and fair housing laws. Commercial tenants operate under commercial lease terms that are generally more negotiable and less regulated. You need to understand both frameworks.'),
    p('mu18', 'The operational challenges of mixed-use include managing shared systems (HVAC, plumbing, electrical) that serve both commercial and residential tenants, allocating utility costs between different tenant types, managing parking (commercial tenants need customer parking during business hours; residential tenants need parking evenings and weekends), and addressing potential conflicts between commercial and residential uses — a restaurant that generates cooking odors, noise, and late-night trash pickup can create complaints from upstairs residents.'),

    h2('mu19', 'Value-Add Strategies'),
    p('mu20', 'Mixed-use properties offer value-add opportunities on both sides of the building. On the residential side, standard apartment renovation strategies apply — updating kitchens and bathrooms, adding in-unit laundry, improving common areas, and achieving market-rate rents. On the commercial side, value-add strategies include subdividing a large commercial space into multiple smaller units (a single 3,000 square foot space rented to one tenant at $15 per foot might generate more income as three 1,000 square foot spaces at $20 per foot each), upgrading the storefront facade to attract higher-quality tenants, and negotiating percentage rent clauses that allow you to share in the commercial tenant revenue growth.'),
    p('mu21', 'The most powerful value-add strategy for mixed-use properties is converting underutilized space. Many older mixed-use buildings have basements, attics, or upper floors that are currently used for storage or are completely vacant. Converting this space into additional residential units or leasable commercial space can dramatically increase the property income and value. Zoning approval and building code compliance are required, but the economics are compelling because you are creating new income-producing space without acquiring additional land.'),

    h2('mu22', 'Getting Started'),
    pLink('mu23', [
      { text: 'Mixed-use investing rewards patience and local market knowledge. Start by studying the mixed-use buildings in your target neighborhood. Walk the commercial corridors and note which businesses are thriving and which are struggling. Talk to commercial tenants about their lease terms and satisfaction with their spaces. Study the residential rental market above and around commercial corridors. The best mixed-use investments are in walkable neighborhoods with strong retail demand, stable residential populations, and limited new construction. These buildings have been generating income for decades and will continue to do so with competent ownership and management. Learn the ' },
      { text: 'fundamentals of property analysis', href: '/blog/how-to-analyze-rental-property' },
      { text: ' before making your first mixed-use offer, because the dual nature of these properties demands a thorough understanding of both residential and commercial valuation.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 9: Real Estate Investing with a Partner
// ══════════════════════════════════════════════════════
const partnerAgreements = {
  _id: 'post-real-estate-investing-partner-agreements',
  _type: 'post',
  title: 'Real Estate Investing with a Partner: Agreements, Splits, and Red Flags',
  slug: { _type: 'slug', current: 'real-estate-investing-partner-agreements' },
  author: authorRef,
  categories: [catTaxLegal],
  publishedAt: '2026-08-01T08:00:00Z',
  excerpt: 'How to structure real estate partnerships including equity splits, operating agreements, decision-making authority, exit strategies, and red flags that signal a bad partnership.',
  seo: {
    metaTitle: 'Real Estate Partnership Guide: Agreements, Splits & Red Flags | ProInvestorHub',
    metaDescription: 'How to structure a real estate investing partnership. Covers equity splits, operating agreements, capital contributions, decision-making, buyout clauses, dispute resolution, and warning signs.',
  },
  body: [
    p('pa01', 'Partnerships accelerate real estate investing. One partner brings capital, the other brings deal-finding ability. One partner manages renovations, the other handles tenant relations. One partner has a full-time income that supports mortgage qualification, the other has the time to manage the day-to-day operations. The right partnership doubles your capacity while halving your risk. The wrong partnership destroys friendships, consumes years of legal fees, and can bankrupt both parties. The difference between the two outcomes is almost always determined before the first property is purchased — in the partnership agreement.'),
    p('pa02', 'Every real estate partnership starts with optimism. Both partners envision the profits, the portfolio growth, and the eventual financial freedom. Nobody enters a partnership planning for disagreements about capital calls, disputes about renovation budgets, or fights about when to sell. But these conflicts arise in nearly every partnership because real estate investing involves continuous decisions made under uncertainty with significant financial stakes. The partnership agreement does not prevent disagreements — it provides a framework for resolving them without destroying the relationship or the investment.'),

    h2('pa03', 'Types of Real Estate Partnership Structures'),
    pLink('pa04', [
      { text: 'The most common structure for a real estate investing partnership is a limited liability company with two or more members. The ' },
      { text: 'LLC', href: '/blog/how-to-set-up-property-llc' },
      { text: ' provides liability protection for all partners and flexibility in how profits, losses, and management responsibilities are allocated. The operating agreement of the LLC is the partnership agreement — it is the single most important document in the partnership.' },
    ]),
    p('pa05', 'Alternatively, partners can form a limited partnership where one or more general partners have management authority and personal liability while limited partners contribute capital and have no management authority or personal liability beyond their investment. This structure is common in syndications and larger deals but less practical for small partnerships where both parties want management involvement. A tenancy-in-common arrangement where each partner owns an undivided interest in the property is the simplest structure but provides no liability protection and creates complications in decision-making, financing, and property transfers.'),

    h2('pa06', 'Defining Contributions and Equity Splits'),
    p('pa07', 'The partnership agreement must clearly define what each partner is contributing and what percentage of ownership they receive in return. Contributions fall into three categories: capital (cash for down payments, closing costs, reserves, and renovations), credit (the ability to qualify for and guarantee a mortgage), and sweat equity (time spent finding deals, managing renovations, handling property management, and performing administrative tasks).'),
    p('pa08', 'The simplest split is 50/50 when both partners contribute equally. But equal contribution is rare. More often, one partner contributes more capital while the other contributes more time. A common arrangement is that the capital partner puts up 100 percent of the money and the operating partner does 100 percent of the work, with profits split 50/50. Another arrangement gives the capital partner a preferred return (say 8 percent annually) on their invested capital before any profit split, with remaining profits split 60/40 in favor of the operating partner who creates value through their work.'),
    p('pa09', 'Whatever split you choose, document the rationale and make it specific. Vague language like "profits will be split equitably" is an invitation to litigation. Specify the exact percentage split, whether the split applies to operating cash flow, refinance proceeds, and sale proceeds equally or differently, and how capital contributions and capital calls are handled. If one partner contributes $100,000 and the other contributes $50,000, does the first partner receive their extra $50,000 back before profits are split? Or is it treated as equity that earns a proportionally larger share of all returns? These details must be resolved before the partnership is formed, not after a disagreement arises.'),

    h2('pa10', 'Decision-Making Authority'),
    p('pa11', 'Define who makes what decisions. Routine decisions — approving repairs under a certain dollar threshold, screening tenants using established criteria, paying regular operating expenses — should be delegated to one partner who serves as the managing member. Major decisions — buying or selling properties, taking on new debt, making capital improvements above a defined threshold, admitting new partners, or changing the business strategy — should require unanimous or majority consent depending on the number of partners.'),
    p('pa12', 'The dollar threshold for the distinction between routine and major decisions should be explicit. One partner should have authority to approve expenses up to $5,000 (or whatever amount you agree on) without the other partner approval. Above that threshold, both partners must agree. This prevents operational paralysis (you do not want to need two signatures to fix a leaky pipe) while protecting against unilateral major decisions (you do not want your partner renovating a kitchen for $30,000 without your agreement).'),

    h2('pa13', 'Capital Calls and Additional Investments'),
    p('pa14', 'What happens when the property needs more money than originally budgeted? A roof replacement that costs $15,000, a three-month vacancy during a market downturn, or a major plumbing repair can all require additional capital beyond the initial reserves. The partnership agreement must specify how capital calls work: How much notice is required? What is each partner obligation to contribute? What happens if one partner cannot or will not contribute their share?'),
    p('pa15', 'Common approaches include mandatory pro-rata capital calls where each partner must contribute proportionally to their ownership, optional capital calls where the contributing partner receives additional equity or a preferred return on the additional capital, and loan provisions where the partnership borrows from one partner at a market interest rate. The worst outcome is having no provision at all, which leads to one partner covering the shortfall and resenting the other, or both partners refusing to contribute and the property falling into disrepair.'),

    h2('pa16', 'Exit Strategy and Buyout Provisions'),
    p('pa17', 'Every partnership must have a defined exit mechanism because every partnership ends. Partners retire, relocate, divorce, die, disagree, or simply want to cash out. Without a buyout provision, a partner who wants to exit has no clean way to do so. They cannot sell their interest on the open market (who wants to buy into an existing partnership with a stranger as your co-owner?) and they cannot force the sale of the property without litigation.'),
    p('pa18', 'The most common buyout structures include a right of first refusal (if one partner wants to sell their interest, the other partner has the right to purchase it at the same terms being offered by an outside buyer), a shotgun clause (one partner names a price and the other must either buy at that price or sell at that price — this ensures the price is fair because the naming partner does not know which side of the transaction they will be on), and a forced sale provision (if the partners cannot agree on a buyout price, the property is listed for sale and the proceeds are distributed according to the operating agreement).'),
    p('pa19', 'Include provisions for death and disability. If one partner dies, does their interest pass to their estate? Does the surviving partner have the right or obligation to purchase the deceased partner interest? If a partner becomes permanently disabled and cannot fulfill their management responsibilities, how is their role reassigned and is their equity split adjusted? These are uncomfortable conversations to have when forming a partnership, but they are far worse to have in a hospital room or a probate court.'),

    h2('pa20', 'Red Flags in Real Estate Partnerships'),
    p('pa21', 'Certain warning signs indicate a partnership is likely to end badly. A partner who resists putting the agreement in writing is a partner who wants flexibility to redefine the terms later — always in their favor. A partner who insists on controlling all the finances without transparency is a partner you cannot trust. A partner who has had multiple failed partnerships in the past has demonstrated a pattern. A partner who brings no capital and no credit but expects a large equity split is a partner who is not sharing the risk.'),
    p('pa22', 'Other red flags include mismatched risk tolerance (one partner wants conservative buy-and-hold while the other wants aggressive leverage and flipping), mismatched time horizons (one partner wants to sell in three years while the other wants to hold for twenty), poor communication habits (if they are slow to respond to texts and emails during the courtship phase, they will be worse during the management phase), and unrealistic financial expectations (if they expect 30 percent annual returns without understanding how the numbers work, they will be disappointed and blame you).'),

    h2('pa23', 'Dispute Resolution'),
    pLink('pa24', [
      { text: 'Include a mandatory dispute resolution process in the partnership agreement. Mediation first, arbitration second, litigation as a last resort. Mediation costs a fraction of litigation, preserves the relationship, and produces outcomes both parties can live with far more often than a courtroom. Specify that the mediation and arbitration will be conducted by a professional with real estate experience. A mediator who understands ' },
      { text: 'deal analysis', href: '/blog/how-to-analyze-rental-property' },
      { text: ', property valuation, and investor economics will be far more effective than a general commercial mediator.' },
    ]),
    pLink('pa25', [
      { text: 'The best real estate partnerships are built on complementary skills, aligned incentives, and thorough documentation. Find a partner whose strengths compensate for your weaknesses. Create a financial structure that rewards each partner proportionally to their contribution and risk. Put everything in writing. Review and update the agreement annually. And have the difficult conversations — about money, about exit strategies, about what happens when things go wrong — before you write the first check. Use our ' },
      { text: 'calculators', href: '/calculators' },
      { text: ' to model the deal together so both partners understand the expected returns, the risks, and the timeline before committing capital.' },
    ]),
  ],
}

// ══════════════════════════════════════════════════════
// POST 10: Real Estate Investment Spreadsheet Guide
// ══════════════════════════════════════════════════════
const spreadsheetGuide = {
  _id: 'post-real-estate-investment-spreadsheet-guide',
  _type: 'post',
  title: 'How to Build a Real Estate Investment Spreadsheet That Actually Works',
  slug: { _type: 'slug', current: 'real-estate-investment-spreadsheet-guide' },
  author: authorRef,
  categories: [catDealAnalysis],
  publishedAt: '2026-08-01T14:00:00Z',
  excerpt: 'Build a rental property analysis spreadsheet from scratch with formulas for cash flow, cap rate, cash-on-cash return, and IRR that help you evaluate deals in minutes instead of hours.',
  seo: {
    metaTitle: 'Real Estate Investment Spreadsheet: Build Your Own Deal Analyzer | ProInvestorHub',
    metaDescription: 'Step-by-step guide to building a real estate investment spreadsheet. Includes formulas for cash flow, cap rate, cash-on-cash return, debt service, NOI, and multi-year projections.',
  },
  body: [
    p('ss01', 'A real estate investment spreadsheet is the most important tool in your deal analysis toolkit. It takes a property from a listing you found online and converts it into a set of numbers that tell you whether to pursue the deal, pass on it, or make an offer at a lower price. Professional investors analyze dozens of deals for every one they purchase, and a well-built spreadsheet allows you to evaluate a property in fifteen minutes with enough accuracy to make an informed go or no-go decision. The alternative — running numbers by hand, guessing at expenses, or relying on the seller stated returns — leads to bad acquisitions that drain your portfolio.'),
    p('ss02', 'The spreadsheet you build does not need to be complicated. Complexity creates false precision — a 47-tab model with Monte Carlo simulations and sensitivity analyses looks impressive but does not make better decisions than a clean, well-structured single-sheet model with accurate assumptions. What matters is that the spreadsheet captures the key inputs, calculates the metrics that drive your investment decisions, and is structured so you can update the inputs quickly as you analyze new properties. Here is how to build one from scratch.'),

    h2('ss03', 'Section 1: Property Information and Purchase Inputs'),
    p('ss04', 'The top of your spreadsheet should capture the basic property information and purchase parameters. Create input cells for the property address, purchase price, closing costs (estimate 2 to 4 percent of purchase price for investor purchases), renovation or repair budget, and the financing terms — down payment percentage, loan amount, interest rate, loan term, and monthly mortgage payment (principal and interest). The mortgage payment can be calculated automatically using the PMT function in Excel or Google Sheets: PMT(monthly rate, total payments, loan amount). For a $200,000 loan at 7 percent over 30 years, the formula is PMT(0.07/12, 360, -200000), which returns approximately $1,331 per month.'),
    p('ss05', 'Also include the total cash required to close, which is the sum of the down payment, closing costs, and renovation budget. This is the denominator in your cash-on-cash return calculation and represents the total amount of cash you must have available to complete the acquisition. For a $250,000 property with 25 percent down, 3 percent closing costs, and a $15,000 renovation budget, your total cash required is $62,500 plus $7,500 plus $15,000, totaling $85,000.'),

    h2('ss06', 'Section 2: Income'),
    p('ss07', 'Create a line item for each unit rental income. If you are analyzing a single-family rental, this is one line. For a fourplex, you need four lines. Include a line for other income sources — application fees, late fees, pet fees, laundry income, parking fees, and storage fees. Below the individual lines, calculate the gross potential income (all units rented at market rate for 12 months) and then apply a vacancy and credit loss factor. Use 5 to 8 percent for strong markets with low vacancy and 8 to 12 percent for softer markets or properties that are not yet stabilized. The result is your effective gross income.'),
    pLink('ss08', [
      { text: 'Research actual market rents, not the rents the seller claims the property can achieve. Use Zillow, Rentometer, and Craigslist to find comparable rentals in the neighborhood. If the property is occupied, request copies of the current leases. If the seller claims the property can rent for $1,500 per unit but comparable properties in the area rent for $1,200, use $1,200 in your analysis. You can always adjust your offer if you believe the property can achieve higher rents after renovations, but your base case should reflect current market conditions. Our ' },
      { text: 'rental property analysis guide', href: '/blog/how-to-analyze-rental-property' },
      { text: ' covers income estimation in detail.' },
    ]),

    h2('ss09', 'Section 3: Operating Expenses'),
    p('ss10', 'Operating expenses are where most beginning investors make their biggest analytical mistakes — they dramatically underestimate expenses, which inflates the projected returns and leads to purchases that underperform. Your expense section should include separate line items for property taxes (verify with the county assessor — do not use the seller tax bill, which may reflect a lower assessed value), insurance (get a quote for your specific property and coverage level), property management (8 to 12 percent of effective gross income, even if you self-manage — this accounts for the value of your time and allows you to hire a manager later without destroying your cash flow), maintenance and repairs (budget 8 to 15 percent of gross income depending on the property age and condition), capital expenditure reserves (budget 5 to 10 percent of gross income for major replacement items like roof, HVAC, water heater, and appliances), water and sewer (if landlord-paid), trash collection, landscaping, snow removal, HOA fees (if applicable), and any other recurring expenses.'),
    p('ss11', 'A common rule of thumb is that total operating expenses will consume 45 to 55 percent of gross income for residential rental properties, excluding debt service. If your expense projection shows 30 percent of gross income, you are probably missing something. If it shows 60 percent, you may be in a high-tax jurisdiction or the property has unusually high insurance costs. The 50 percent rule is a useful sanity check, not a substitute for detailed expense analysis.'),

    h2('ss12', 'Section 4: Key Metrics'),
    p('ss13', 'With your income and expense sections complete, you can calculate the metrics that drive your investment decision. Net Operating Income (NOI) equals effective gross income minus total operating expenses. The cap rate equals NOI divided by the purchase price — this tells you the property yield independent of financing. Annual cash flow equals NOI minus annual debt service (the total of 12 monthly mortgage payments). Cash-on-cash return equals annual cash flow divided by total cash invested. These four numbers — NOI, cap rate, cash flow, and cash-on-cash return — form the foundation of every rental property analysis.'),
    pLink('ss14', [
      { text: 'Add a debt service coverage ratio (DSCR) calculation: NOI divided by annual debt service. A DSCR of 1.25 means the property income covers the mortgage payment by 125 percent, leaving a 25 percent cushion for unexpected expenses or vacancies. Most lenders require a minimum DSCR of 1.20 to 1.25. A DSCR below 1.0 means the property does not generate enough income to cover the mortgage — a red flag that the deal does not work at the proposed purchase price and financing terms. For a deeper understanding of these metrics, read our comparison of ' },
      { text: 'cash-on-cash return, ROI, and IRR', href: '/blog/cash-on-cash-vs-roi-vs-irr' },
      { text: '.' },
    ]),

    h2('ss15', 'Section 5: Multi-Year Projections'),
    p('ss16', 'A single-year snapshot tells you whether a property works today. A multi-year projection tells you how the investment performs over your planned holding period. Create a five or ten-year projection that includes annual rent increases (use 2 to 3 percent per year as a conservative assumption), annual expense increases (also 2 to 3 percent — expenses generally rise in line with or slightly faster than rents), principal paydown on the mortgage (your loan amortization schedule shows how much principal is paid each year), and projected property appreciation (use 2 to 4 percent annually, consistent with long-term national averages, adjusted for your specific market).'),
    p('ss17', 'The multi-year projection allows you to calculate your total return at various exit points. If you sell at the end of year five, your total return includes five years of cash flow, five years of principal paydown, and the difference between your sale price and purchase price minus selling costs. Express this as both a total ROI and an IRR to get the complete picture. The IRR calculation in Excel uses the XIRR function, which takes an array of cash flows and an array of dates and returns the annualized internal rate of return.'),

    h2('ss18', 'Section 6: Sensitivity Analysis'),
    p('ss19', 'The most useful addition to any investment spreadsheet is a simple sensitivity analysis that shows how your returns change under different assumptions. Create a table that varies two inputs — typically the purchase price and the vacancy rate — and shows the resulting cash-on-cash return for each combination. This allows you to quickly see your downside — if vacancy runs at 15 percent instead of 8 percent, does the property still generate positive cash flow? If you pay $10,000 more than your initial offer, how much does that reduce your return?'),
    p('ss20', 'You can build a sensitivity table in Excel using a two-variable data table (Data > What-If Analysis > Data Table). In Google Sheets, you will need to create the table manually with formulas that reference your input cells. Either way, the sensitivity table transforms your spreadsheet from a point estimate (the deal returns 9.5 percent) into a range of outcomes (the deal returns between 6 percent and 12 percent depending on vacancy and rent growth), which is a much more honest and useful way to evaluate a deal.'),

    h2('ss21', 'Common Spreadsheet Mistakes'),
    p('ss22', 'The most common mistake is using the seller provided expense numbers without verification. Sellers have every incentive to understate expenses — they may exclude management fees because they self-manage, defer maintenance to inflate cash flow, or use an insurance policy with inadequate coverage. Always build your expense budget from scratch using your own research and quotes. The second most common mistake is ignoring capital expenditure reserves. A property that shows positive cash flow but has a 20-year-old roof, a 15-year-old HVAC system, and original water heater is not really cash flowing — the deferred maintenance is a liability that will come due and will consume several years of cash flow when it does.'),
    p('ss23', 'The third mistake is analyzing a deal at list price only. Your spreadsheet should tell you the maximum price you can pay and still meet your minimum return thresholds. Work backward from your target cash-on-cash return to determine your maximum purchase price. If the seller is asking $300,000 but your spreadsheet shows that the deal only works at $275,000, your offer is $275,000. The spreadsheet removes emotion from the negotiation.'),

    h2('ss24', 'Putting It All Together'),
    pLink('ss25', [
      { text: 'Build your spreadsheet once, refine it over your first five deals, and use it for every deal you evaluate going forward. The disciplined use of a standardized analysis tool is what separates successful investors from those who buy on gut instinct and regret it later. Your spreadsheet forces you to research actual rents, actual expenses, and actual financing terms for every property before making an offer. It calculates the metrics that matter — NOI, cash flow, ' },
      { text: 'cash-on-cash return', href: '/blog/cash-on-cash-return-explained' },
      { text: ', cap rate, DSCR, and IRR — and presents them in a format that supports a clear go or no-go decision.' },
    ]),
    pLink('ss26', [
      { text: 'Start with Google Sheets so your analysis is accessible from anywhere and shareable with partners, lenders, and mentors. Save a blank template version and create a copy for each property you analyze. Over time, your collection of completed analyses becomes a database of market knowledge — you will be able to look back at deals you analyzed, compare them to deals you purchased, and refine your assumptions based on actual performance data. Combine your spreadsheet with our ' },
      { text: 'online calculators', href: '/calculators' },
      { text: ' for quick initial screening, then use the full spreadsheet for deals that pass your preliminary criteria. This two-step process lets you screen dozens of deals efficiently and perform deep analysis only on the ones that merit serious consideration.' },
    ]),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [
  propertyManagementChecklist,
  taxDeductions,
  raiseCapital,
  foreclosureInvesting,
  cocVsRoiVsIrr,
  propertyLLC,
  portfolioLoans,
  mixedUse,
  partnerAgreements,
  spreadsheetGuide,
]

async function seed() {
  console.log('Wave 8a Content Seed: 10 posts\n')

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
    transaction.createOrReplace(post)
  }

  console.log(`\nCommitting ${newPosts.length} posts...`)
  const result = await transaction.commit()
  console.log(`Done! Created ${result.results.length} documents.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
