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

// ── PILLAR GUIDE 1: BRRRR Method Complete Guide ──────
const brrrrGuide = {
  _type: 'post',
  title: 'The BRRRR Method: A Complete Guide to Building Wealth Through Real Estate',
  slug: { _type: 'slug', current: 'brrrr-method-complete-guide' },
  author: authorRef,
  categories: [{ _type: 'reference', _ref: 'cat-strategies', _key: 'c1' }],
  publishedAt: '2026-03-14T10:00:00Z',
  excerpt: 'The BRRRR method lets you buy, renovate, and refinance properties to recycle your capital infinitely. Here\'s how to execute each step and scale your portfolio.',
  seo: {
    metaTitle: 'BRRRR Method Explained: Complete Step-by-Step Guide (2026)',
    metaDescription: 'Learn the BRRRR strategy for real estate investing. Step-by-step guide covering how to Buy, Rehab, Rent, Refinance, and Repeat to build a portfolio.',
  },
  body: [
    // Introduction
    p('br01', 'The BRRRR method is one of the most powerful wealth-building strategies in real estate investing. It stands for Buy, Rehab, Rent, Refinance, and Repeat — a systematic approach that lets you recycle the same capital to acquire property after property, building a portfolio far faster than traditional buy-and-hold investing.'),
    p('br02', 'Unlike flipping, where you sell and move on, BRRRR lets you keep the asset. You force appreciation through renovation, capture that equity through refinancing, and deploy the recovered capital into your next deal. Done correctly, you can acquire rental properties with little to no money left in each deal — effectively building a portfolio on infinite returns.'),
    p('br03', 'This guide walks you through every step of the BRRRR process, from finding the right deal to scaling your portfolio. Whether you are closing your first deal or your tenth, the principles here will help you execute with confidence and avoid the mistakes that derail most investors.'),

    // What Is BRRRR
    h2('br04', 'What Is the BRRRR Method?'),
    p('br05', 'The BRRRR method is a real estate investment strategy popularized by Brandon Turner and the BiggerPockets community. Each letter represents a step in the process: Buy an undervalued property, Rehab it to force appreciation, Rent it to a qualified tenant, Refinance to pull your capital back out, and Repeat the process with the recovered funds.'),
    p('br06', 'The magic of BRRRR lies in the refinance step. In a traditional rental property purchase, your down payment and closing costs sit locked in the property forever. With BRRRR, you buy below market value, add value through renovation, and then refinance at the higher after-repair value (ARV). If you have executed well, the refinance gives you back most — or all — of your initial investment, which you then deploy into the next property.'),
    p('br07', 'Think of it this way: instead of needing $50,000 for each property you buy, you use the same $50,000 over and over. Your capital becomes a tool you lend to each deal temporarily, recovering it each time through the refinance.'),

    // Step 1: Buy
    h2('br08', 'Step 1: Buy — Finding the Right Deal'),
    p('br09', 'The buy step is where BRRRR deals are made or broken. You need to find properties that are significantly undervalued relative to what they will be worth after renovation. The target is simple: purchase at a price that allows you to recover all or most of your capital when you refinance at the after-repair value.'),
    p('br10', 'A common guideline is the 75% rule: your total investment (purchase price plus rehab costs plus closing costs and holding costs) should not exceed 75% of the after-repair value. This gives you enough equity cushion to refinance and get your money back.'),
    bq('br11', 'The 75% Rule: Purchase Price + Rehab + Closing/Holding Costs ≤ 75% of ARV'),

    h3('br12', 'Where to Find BRRRR Deals'),
    p('br13', 'The best BRRRR deals rarely come from the MLS. Properties listed on the open market are priced at or near market value, which leaves little room for the value-add component that makes BRRRR work. Focus on off-market strategies: direct mail to distressed property owners, driving for dollars to find neglected properties, networking with wholesalers who can bring you pre-negotiated deals, building relationships with probate attorneys and estate administrators, and contacting landlords of poorly maintained rental properties.'),
    p('br14', 'Wholesalers are particularly valuable for BRRRR investors. A good wholesaler does the marketing and negotiation legwork, bringing you properties at a discount in exchange for an assignment fee. Build relationships with three to five wholesalers in your target market and clearly communicate what you are looking for: property type, condition range, price range, and target neighborhoods.'),

    h3('br15', 'Analyzing the Numbers'),
    p('br16', 'Before making an offer on any BRRRR deal, you need to know four numbers with confidence: the after-repair value (ARV), the estimated rehab cost, the expected monthly rent, and the refinance terms you can realistically secure. Start with the ARV by pulling comparable sales — recently sold properties in the same area that are similar in size, condition, and features to what your property will look like after renovation.'),
    p('br17', 'Then work backward: if the ARV is $200,000 and you want to stay at 75% all-in, your total investment needs to be $150,000 or less. If rehab will cost $40,000 and closing and holding costs add up to $10,000, your maximum purchase price is $100,000. If you cannot acquire the property at or below that number, move on to the next deal. Discipline here is what separates profitable BRRRR investors from those who lose money.'),

    // Step 2: Rehab
    h2('br18', 'Step 2: Rehab — Renovating for Maximum Value'),
    p('br19', 'The rehab step is where you force appreciation — the concept of increasing a property\'s value through improvements rather than waiting for the market to lift prices. In BRRRR, your renovation strategy must accomplish two goals simultaneously: make the property attractive to quality tenants and maximize the appraised value for your refinance.'),

    h3('br20', 'Scoping the Renovation'),
    p('br21', 'Before you close on the property, you should have a detailed scope of work (SOW) that lists every repair and improvement you plan to make, along with estimated costs for each line item. Walk the property with your contractor and document everything: roofing, HVAC, plumbing, electrical, flooring, kitchen, bathrooms, paint, landscaping, and any structural issues.'),
    p('br22', 'Focus your renovation dollars on items that increase appraised value the most per dollar spent. Kitchens and bathrooms consistently deliver the highest return. New flooring, fresh paint, and updated fixtures create the perception of a fully renovated property at relatively low cost. Avoid over-improving for the neighborhood — a $50,000 kitchen in a $150,000 house will not appraise well.'),

    h3('br23', 'Managing Contractors'),
    p('br24', 'Contractor management is one of the biggest challenges in BRRRR investing. Get at least three bids for every project, check references, verify insurance and licensing, and never pay more than 50% upfront. Structure payments around milestones: a deposit to start, a payment at the midpoint, and the final payment upon completion and your sign-off.'),
    p('br25', 'Hold costs — the mortgage payments, insurance, taxes, and utilities you pay while the property is being renovated — add up quickly. A rehab that drags from six weeks to six months can eat thousands of dollars in additional holding costs. Set clear timelines with your contractor, visit the property regularly, and address issues immediately rather than letting them fester.'),

    h3('br26', 'Budgeting for the Unexpected'),
    p('br27', 'Every experienced BRRRR investor will tell you: rehab costs always run over budget. Always include a contingency of 10-20% of your total rehab budget. If your scope of work totals $40,000, budget $44,000-$48,000 to account for surprises behind walls, code upgrades, material price changes, and the inevitable scope creep that happens on every project.'),

    // Step 3: Rent
    h2('br28', 'Step 3: Rent — Placing Quality Tenants'),
    p('br29', 'Once renovation is complete, your next goal is to place a qualified tenant as quickly as possible. Every day the property sits vacant is money out of your pocket in holding costs. But speed should never come at the expense of tenant quality — a bad tenant will cost you far more in the long run than an extra week or two of vacancy.'),

    h3('br30', 'Setting the Right Rent'),
    p('br31', 'Research comparable rentals in the area to set a competitive rent price. Look at what similar properties are renting for on Zillow, Apartments.com, and Facebook Marketplace. Price slightly below the top of the market if you want to fill the unit quickly and attract multiple applicants. A property priced 5% below market rent will often fill in days rather than weeks, and the quality of your applicant pool will be higher because you are offering better value.'),

    h3('br32', 'Tenant Screening'),
    p('br33', 'Thorough tenant screening is non-negotiable. Run credit checks, background checks, and verify income (require at least three times the monthly rent in gross income). Contact previous landlords — not just the current one, who may give a glowing review just to get rid of a problem tenant. Ask specific questions: Did they pay on time? Did they give proper notice? Would you rent to them again?'),
    p('br34', 'Document everything and apply the same criteria to every applicant to ensure fair housing compliance. Use a written set of screening criteria that you apply uniformly: minimum credit score, income requirement, no eviction history, clean background check. Consistency protects you legally and helps you make objective decisions.'),

    h3('br35', 'Property Management Decision'),
    p('br36', 'Decide early whether you will self-manage or hire a property manager. Self-management saves the 8-12% management fee and gives you direct control, but it requires your time and availability. Professional management makes sense if you are investing out of state, scaling quickly, or simply value your time more than the management fee. For BRRRR investors planning to scale, professional management is usually the better long-term choice.'),

    // Step 4: Refinance
    h2('br37', 'Step 4: Refinance — Recovering Your Capital'),
    p('br38', 'The refinance is the step that makes BRRRR magical. This is where you convert the equity you created through renovation into cash you can use for your next deal. The goal is to refinance at the new, higher after-repair value and pull out enough to recover all or most of your original investment.'),

    h3('br39', 'How the Refinance Works'),
    p('br40', 'After your rehab is complete and you have a tenant in place, you approach a lender for a cash-out refinance. The lender will order an appraisal of the property at its current (post-renovation) value. Most conventional lenders will let you borrow up to 75% of the appraised value on an investment property. Some portfolio lenders and DSCR lenders may go up to 80%.'),
    p('br41', 'For example, if your property appraises at $200,000 and the lender offers 75% LTV, you can get a new loan for $150,000. If your total investment was $140,000 (purchase, rehab, closing, and holding costs), you get a check for $10,000 after paying off your original financing. You now own a cash-flowing rental property with $0 of your own money in the deal — or even a small profit.'),

    h3('br42', 'Seasoning Requirements'),
    p('br43', 'Most conventional lenders require a seasoning period — the time between when you purchased the property and when you can refinance based on the appraised value rather than the purchase price. Traditional banks typically require six months of seasoning. Some DSCR lenders have no seasoning requirement at all. Hard money lenders that offer a built-in refinance program may also have shorter or no seasoning periods.'),
    p('br44', 'Plan for seasoning from the beginning. If your lender requires six months, your timeline is: close on the property, complete the rehab in eight to twelve weeks, place a tenant, and apply for the refinance so that it closes on or after the six-month mark. Use the waiting period productively — stabilize the property, collect rent, and start looking for your next deal.'),

    h3('br45', 'Working with Lenders'),
    p('br46', 'Not all lenders understand BRRRR, and working with the wrong one can derail your strategy. Seek out lenders who specialize in investment properties: portfolio lenders, DSCR lenders, and community banks that hold loans in-house. These lenders evaluate deals differently than traditional mortgage lenders and are more likely to lend based on the property\'s income potential rather than your personal DTI ratio.'),
    p('br47', 'Before you close on your purchase, talk to your refinance lender. Confirm their seasoning requirements, maximum LTV, rate, and any restrictions. Some lenders will not refinance properties below a certain value or in certain condition categories. Having this conversation upfront prevents nasty surprises later.'),

    // Step 5: Repeat
    h2('br48', 'Step 5: Repeat — Scaling Your Portfolio'),
    p('br49', 'The repeat step is where BRRRR becomes a true wealth-building machine. Every dollar you recover from a refinance becomes the capital for your next deal. If you execute well and get most of your investment back, you can do two, four, or even six deals per year with the same pool of capital.'),
    p('br50', 'The compounding effect is powerful. After your first successful BRRRR deal, you have one cash-flowing property and your original capital back. After your second, you have two properties. After your fifth, you have five properties generating monthly cash flow, each building equity through tenant mortgage paydown and appreciation — all from the same initial investment.'),

    h3('br51', 'The Capital Recycling Math'),
    p('br52', 'Let\'s say you start with $60,000 in capital. Your first BRRRR deal has an all-in cost of $55,000, and after refinancing you recover $52,000. You now have $57,000 in capital ($52,000 recovered plus $5,000 you did not use). You do a second deal, spending $55,000 and recovering $50,000. After two deals, you have $52,000 in capital and two rental properties generating cash flow. After five deals, you still have most of your original $60,000, but you now own five properties worth a combined $1,000,000 with $250,000 in equity and $2,500 per month in combined cash flow.'),

    // BRRRR Math Example
    h2('br53', 'BRRRR Math Example: A Complete Worked Deal'),
    p('br54', 'Let\'s walk through a real-world BRRRR example with actual numbers.'),
    p('br55', 'You find a distressed three-bedroom, one-bathroom single-family home in a solid B-class neighborhood. Comparable renovated properties sell for $200,000 and rent for $1,600 per month.'),
    bq('br56', 'Purchase price: $110,000 | Rehab budget: $35,000 | Closing and holding costs: $8,000 | Total investment: $153,000'),
    p('br57', 'You purchase the property with a hard money loan at 90% of the purchase price. Your out-of-pocket costs are: 10% down payment ($11,000) + rehab costs ($35,000) + closing and holding costs ($8,000) = $54,000 total cash invested.'),
    p('br58', 'After completing the renovation in ten weeks, you place a tenant at $1,600 per month. After six months of seasoning, you refinance with a DSCR lender at 75% of the appraised value.'),
    bq('br59', 'Appraised value: $200,000 | New loan: $150,000 (75% LTV) | Pay off hard money loan: $99,000 | Cash back to you: $51,000'),
    p('br60', 'Your total cash invested was $54,000. You got $51,000 back. You have $3,000 left in the deal — and you own a property worth $200,000 with $50,000 in equity.'),
    bq('br61', 'Monthly rent: $1,600 | Monthly expenses (mortgage, taxes, insurance, PM, maintenance, vacancy reserve): $1,250 | Monthly cash flow: $350 | Annual cash flow: $4,200'),
    p('br62', 'Your cash-on-cash return on the $3,000 left in the deal is 140%. And you have $51,000 ready to deploy into your next BRRRR property.'),

    // Common Mistakes
    h2('br63', 'Common BRRRR Mistakes to Avoid'),
    p('br64', 'Overestimating ARV is the number one BRRRR killer. If you base your purchase price on an inflated after-repair value, you will not recover your capital on the refinance. Always use conservative comps and double-check your ARV with a real estate agent who knows the local market.'),
    p('br65', 'Underestimating rehab costs comes in at a close second. Unexpected foundation issues, outdated wiring, plumbing problems, and permitting delays can blow your budget. Always include a 15-20% contingency and get multiple contractor bids before committing to a deal.'),
    p('br66', 'Ignoring holding costs catches many investors off guard. Hard money interest, property taxes, insurance, and utilities during the rehab period add up fast. A three-month rehab timeline that stretches to six months can add $5,000-$10,000 to your total investment, which directly reduces how much capital you recover on the refinance.'),
    p('br67', 'Skipping tenant screening to fill a vacancy quickly is a mistake that can cost you thousands in eviction costs, property damage, and lost rent. A vacant property is expensive, but a bad tenant is more expensive. Never compromise on screening standards.'),
    p('br68', 'Not having your refinance lender lined up before closing on the purchase is a surprisingly common mistake. If you discover after the fact that your lender requires twelve months of seasoning instead of six, or caps LTV at 70% instead of 75%, your entire capital recycling plan falls apart.'),

    // When BRRRR Doesn't Work
    h2('br69', 'When the BRRRR Method Doesn\'t Work'),
    p('br70', 'BRRRR does not work in every market or for every deal. In high-cost markets where properties are priced close to or above their renovated value, finding deals that meet the 75% rule is extremely difficult. BRRRR works best in markets with a meaningful gap between distressed and renovated property values — typically B and C class neighborhoods in secondary and tertiary markets.'),
    p('br71', 'BRRRR also struggles when interest rates are very high. Higher rates reduce the loan amount you qualify for on the refinance and increase your monthly payment, squeezing cash flow. In a high-rate environment, you may need to leave more capital in each deal or accept lower cash flow per property.'),
    p('br72', 'If you have limited time, BRRRR may not be the right strategy. Each deal requires active involvement in finding the property, managing the rehab, placing tenants, and coordinating the refinance. It is significantly more labor-intensive than buying a turnkey rental. If you want passive income with minimal involvement, consider buy-and-hold with a property manager or real estate syndications.'),

    // Tools
    h2('br73', 'Tools for BRRRR Investors'),
    p('br74', 'Analyzing BRRRR deals requires precise math. Use our free BRRRR calculator at /calculators/brrrr to model your purchase price, rehab costs, ARV, rental income, and refinance terms. The calculator will show you exactly how much capital you will recover and your projected cash flow, cash-on-cash return, and equity position after the refinance.'),
    p('br75', 'Start with the calculator before making an offer on any deal. If the numbers do not work on the spreadsheet, they will not work in real life. And remember: the best deal you ever do might be the one you walk away from.'),
  ],
}

// ── PILLAR GUIDE 2: Real Estate Investing for Beginners ──
const beginnersGuide = {
  _type: 'post',
  title: 'How to Start Investing in Real Estate: The Complete Beginner\'s Guide (2026)',
  slug: { _type: 'slug', current: 'real-estate-investing-beginners-guide-2026' },
  author: authorRef,
  categories: [{ _type: 'reference', _ref: 'cat-beginner', _key: 'c1' }],
  publishedAt: '2026-03-14T12:00:00Z',
  excerpt: 'Everything you need to know to make your first real estate investment in 2026 — from choosing a strategy to analyzing your first deal to closing.',
  seo: {
    metaTitle: 'How to Start Real Estate Investing: Beginner\'s Guide (2026)',
    metaDescription: 'Complete beginner\'s guide to real estate investing in 2026. Learn strategies, financing, deal analysis, and how to buy your first investment property.',
  },
  body: [
    // Introduction
    p('bg01', 'Real estate has created more wealth than any other asset class in history. It is the one investment vehicle where you can use leverage, generate income, build equity, and reduce your tax burden — all at the same time. And in 2026, despite higher interest rates and shifting market dynamics, the fundamentals that make real estate powerful remain unchanged.'),
    p('bg02', 'If you have been thinking about investing in real estate but have not taken the leap, this guide is for you. We will cover everything you need to know to make your first investment: how real estate builds wealth, which strategy fits your situation, how to analyze and finance deals, and how to build the team that will support your success.'),
    p('bg03', 'This is not theory. This is a practical, actionable roadmap that you can start executing today.'),

    // Why Real Estate
    h2('bg04', 'Why Real Estate Investing?'),
    p('bg05', 'Before diving into the how, it is worth understanding why real estate is such a powerful wealth builder. Unlike stocks, bonds, or other paper assets, real estate offers multiple simultaneous return drivers. No other investment gives you this combination of benefits in a single asset.'),
    p('bg06', 'Consider this: if you buy a $200,000 rental property with 25% down ($50,000), and the property appreciates 3% per year while generating $300 per month in cash flow, your total return in year one includes $3,600 in cash flow, $6,000 in appreciation, roughly $2,500 in mortgage paydown by your tenant, and thousands in tax benefits through depreciation. On your $50,000 investment, that is a total return well above 20% — and you have not even factored in the leverage multiplier.'),

    // 5 Ways RE Builds Wealth
    h2('bg07', 'The 5 Ways Real Estate Builds Wealth'),

    h3('bg08', '1. Cash Flow'),
    p('bg09', 'Cash flow is the money left over after collecting rent and paying all expenses — mortgage, taxes, insurance, property management, maintenance, and vacancy reserves. Positive monthly cash flow is the foundation of a sustainable real estate portfolio. It pays your bills today and gives you a financial cushion to weather vacancies and unexpected repairs.'),

    h3('bg10', '2. Appreciation'),
    p('bg11', 'Properties tend to increase in value over time. Historically, real estate has appreciated at roughly 3-5% per year nationally, though individual markets vary significantly. There are two types of appreciation: market appreciation, which happens naturally as demand rises and the area improves, and forced appreciation, where you increase value through renovations, better management, or increased rent.'),

    h3('bg12', '3. Tax Benefits'),
    p('bg13', 'Real estate offers some of the most favorable tax treatment of any investment. Depreciation allows you to deduct the cost of the building over 27.5 years, reducing your taxable income without any actual cash expense. Mortgage interest, property taxes, insurance, repairs, and management fees are all deductible. And when you sell, a 1031 exchange lets you defer capital gains taxes by rolling the proceeds into another investment property.'),

    h3('bg14', '4. Mortgage Paydown'),
    p('bg15', 'Every month your tenant pays rent, a portion of that payment goes toward paying down your mortgage principal. In effect, your tenant is buying the property for you. Over a 30-year loan, this amounts to the entire loan balance being paid off — equity you built without spending an additional dollar of your own money.'),

    h3('bg16', '5. Inflation Hedge'),
    p('bg17', 'Real estate is one of the best hedges against inflation. As the cost of living increases, so do rents and property values. Meanwhile, your mortgage payment — your largest expense — stays fixed. This means your cash flow naturally increases over time as rents rise while your costs remain stable. In an inflationary environment, real estate investors benefit while most other investors struggle.'),

    // Choosing Your Strategy
    h2('bg18', 'Choosing Your Investment Strategy'),
    p('bg19', 'There is no single "best" strategy in real estate. The right approach depends on your capital, time, risk tolerance, and goals. Here are six proven strategies, each suited to different investor profiles.'),

    h3('bg20', 'House Hacking'),
    p('bg21', 'Best for: First-time investors with limited capital. Buy a duplex, triplex, or fourplex, live in one unit, and rent out the rest. You can qualify for FHA financing with just 3.5% down and eliminate your housing expense while building equity. House hacking is the single lowest-barrier entry point into real estate investing.'),

    h3('bg22', 'Buy and Hold'),
    p('bg23', 'Best for: Patient investors focused on long-term wealth. Purchase properties, rent them to tenants, and hold them for years or decades. You benefit from all five wealth drivers simultaneously. This strategy requires more upfront capital (typically 20-25% down) but is the most proven path to building generational wealth.'),

    h3('bg24', 'BRRRR (Buy, Rehab, Rent, Refinance, Repeat)'),
    p('bg25', 'Best for: Active investors who want to scale quickly. Buy distressed properties below market value, renovate them, rent them out, then refinance to pull your capital back out. BRRRR lets you recycle the same capital across multiple deals, accelerating portfolio growth. It requires more knowledge and effort but produces outsized returns.'),

    h3('bg26', 'Fix and Flip'),
    p('bg27', 'Best for: Investors who want active income. Buy a distressed property, renovate it, and sell it for a profit. Flipping is more of a job than an investment — you are trading time and expertise for a one-time profit rather than building long-term wealth. But it can generate the capital to fund your first rental portfolio.'),

    h3('bg28', 'Short-Term Rentals'),
    p('bg29', 'Best for: Investors in tourism or high-demand markets. Platforms like Airbnb and VRBO let you earn two to three times what a long-term rental would generate. The trade-off is significantly more management effort and regulatory risk. Check local short-term rental regulations before pursuing this strategy.'),

    h3('bg30', 'Passive Syndication'),
    p('bg31', 'Best for: Investors with capital but limited time. Invest alongside a sponsor in larger commercial deals — typically apartment complexes or commercial properties. You provide the capital, the sponsor handles everything else. Returns are typically 8-15% annualized with hold periods of three to seven years. Minimum investments usually start at $25,000-$50,000.'),

    // Understanding the Numbers
    h2('bg32', 'Understanding the Numbers'),
    p('bg33', 'You do not need to be a math genius to invest in real estate, but you do need to understand four key metrics. These numbers tell you whether a deal is worth pursuing and how it will perform in your portfolio.'),

    h3('bg34', 'Net Operating Income (NOI)'),
    p('bg35', 'NOI is the property\'s annual income minus operating expenses. It does not include mortgage payments because it measures the property\'s performance independent of financing. Operating expenses include property taxes, insurance, property management, maintenance, vacancy reserves, and any owner-paid utilities.'),
    bq('bg36', 'NOI = Gross Rental Income - Operating Expenses'),

    h3('bg37', 'Cap Rate'),
    p('bg38', 'Cap rate is the ratio of NOI to the property\'s price or value. It tells you what return you would earn if you bought the property in all cash. Use cap rate to compare properties against each other, not as a standalone measure of quality. A 6% cap rate is not inherently better or worse than a 9% cap rate — it represents a different risk and return profile.'),
    bq('bg39', 'Cap Rate = NOI / Property Price × 100'),

    h3('bg40', 'Cash-on-Cash Return'),
    p('bg41', 'Cash-on-cash return measures the annual pre-tax cash flow divided by the total cash you invested. Unlike cap rate, it accounts for financing. This is the metric that tells you what return you are actually earning on your money. Most investors target 8-12% cash-on-cash return, though this varies by market and strategy.'),
    bq('bg42', 'Cash-on-Cash Return = Annual Cash Flow / Total Cash Invested × 100'),

    h3('bg43', 'Monthly Cash Flow'),
    p('bg44', 'Cash flow is the bottom line: how much money is left in your pocket each month after collecting rent and paying all expenses including the mortgage. Positive cash flow means the property is profitable from day one. Negative cash flow means you are subsidizing the property each month, which may be acceptable in high-appreciation markets but is risky for beginners.'),
    bq('bg45', 'Monthly Cash Flow = Monthly Rent - Mortgage - Taxes - Insurance - PM Fee - Maintenance Reserve - Vacancy Reserve'),
    p('bg46', 'Use our free calculators at /calculators to run these numbers on any deal you are considering. Never invest based on gut feeling — let the math guide your decisions.'),

    // Financing
    h2('bg47', 'Financing Your First Deal'),
    p('bg48', 'Financing is often the biggest hurdle for new investors. The good news: there are more options available than most people realize, and you do not need perfect credit or a massive bank account to get started.'),

    h3('bg49', 'FHA Loans (3.5% Down)'),
    p('bg50', 'If you are house hacking, FHA loans are the most accessible option. You can buy a one-to-four-unit property with just 3.5% down, as long as you live in one unit. On a $300,000 duplex, that is $10,500 down. The catch: FHA loans require mortgage insurance, and you must live in the property for at least one year before you can move out and convert it to a full rental.'),

    h3('bg51', 'Conventional Loans (15-25% Down)'),
    p('bg52', 'For investment properties where you will not be living in the property, conventional loans typically require 15-25% down. Rates are slightly higher than owner-occupied loans, and you will need a credit score of 680 or higher and a debt-to-income ratio below 43-45%. The advantage is straightforward terms and no mortgage insurance at 20% or more down.'),

    h3('bg53', 'DSCR Loans (Qualification Based on Rental Income)'),
    p('bg54', 'DSCR (Debt Service Coverage Ratio) loans are a game-changer for investors. Instead of qualifying based on your personal income and tax returns, these loans qualify based on the property\'s rental income. If the property generates enough rent to cover the mortgage payment (typically 1.0-1.25x), you qualify. This is how investors scale beyond four to ten conventional loans — there is no limit to how many DSCR loans you can have.'),

    h3('bg55', 'Creative Financing'),
    p('bg56', 'Seller financing, subject-to deals, and private money lending are tools that experienced investors use to acquire properties with little or no money from traditional lenders. Seller financing means the seller acts as the lender, accepting monthly payments from you instead of cash at closing. Subject-to means you take over the seller\'s existing mortgage payments. Private money comes from individual lenders — often people in your network — who earn interest by lending their capital for your deals.'),

    // Finding Deals
    h2('bg57', 'Finding Your First Deal'),
    p('bg58', 'Most new investors spend too long searching for the "perfect" deal and not enough time making offers. Your first deal does not need to be a home run. It needs to cash flow, be in a decent neighborhood, and teach you the ropes. Here is where to look.'),
    p('bg59', 'The MLS (Multiple Listing Service) is the most accessible source. Work with an investor-friendly real estate agent who can set up automated searches based on your criteria: price range, property type, target neighborhoods, and number of units. Look for properties that have been on the market for 30 or more days — these sellers may be more motivated to negotiate.'),
    p('bg60', 'Off-market deals offer better prices but require more effort to find. Direct mail campaigns, driving for dollars (physically driving neighborhoods and noting neglected properties), networking at local real estate investor meetups, and connecting with wholesalers are all effective methods. The less competition for a deal, the better price you are likely to get.'),
    p('bg61', 'Auctions — both foreclosure auctions and online platforms — can yield below-market deals but carry higher risk. You may not be able to inspect the property beforehand, and financing options are limited. Auctions are best suited for investors with cash or hard money access and the experience to evaluate properties quickly.'),

    // Analyzing a Deal
    h2('bg62', 'Analyzing a Deal: Step-by-Step Walkthrough'),
    p('bg63', 'Let\'s walk through a deal analysis together. You find a duplex listed at $250,000. Each unit rents for $1,200 per month. Here is how to evaluate it.'),
    bq('bg64', 'Monthly gross rent: $2,400 | Annual gross rent: $28,800'),
    p('bg65', 'First, the quick screen: does it pass the 1% rule? Monthly rent divided by purchase price should be at or above 1%. Here: $2,400 / $250,000 = 0.96%. It is close but slightly below. Worth further analysis, but this deal will need to be strong in other areas to compensate.'),
    p('bg66', 'Next, estimate operating expenses. A conservative estimate is 50% of gross rent for a property you are not self-managing. That puts expenses at $14,400 per year, leaving an NOI of $14,400.'),
    bq('bg67', 'Cap Rate: $14,400 / $250,000 = 5.76%'),
    p('bg68', 'Now factor in financing. With 25% down ($62,500) and a 30-year loan at 7% on $187,500, your monthly principal and interest payment is approximately $1,248.'),
    bq('bg69', 'Monthly cash flow: $2,400 rent - $1,200 expenses (50%) - $1,248 mortgage = -$48'),
    p('bg70', 'This deal is cash flow negative at these terms. You could negotiate the price down, increase rent (if market supports it), reduce your expense estimate by self-managing, or walk away and find a better deal. This is exactly why you run the numbers before making emotional decisions.'),

    // Building Your Team
    h2('bg71', 'Building Your Real Estate Team'),
    p('bg72', 'Real estate investing is a team sport. You cannot — and should not — try to do everything yourself. Here are the key team members you need.'),
    p('bg73', 'An investor-friendly real estate agent understands investment properties and can help you analyze deals, not just show you houses. Look for agents who invest themselves — they understand the numbers and the nuances. A lender who specializes in investment properties will know about DSCR loans, portfolio lending, and creative structuring that traditional mortgage brokers may not offer.'),
    p('bg74', 'A reliable contractor is essential if you are doing any renovation work. Start with small projects to test reliability and quality before trusting them with a full rehab. A property manager handles the day-to-day operations of your rental, from tenant screening to maintenance to rent collection. Interview at least three managers and ask about their vacancy rates, eviction rates, and fee structure.'),
    p('bg75', 'A real estate attorney reviews your contracts, helps structure your LLCs, and protects your interests in transactions. A CPA who specializes in real estate will save you thousands in taxes through depreciation strategies, entity structuring, and cost segregation studies. An insurance agent who understands landlord policies will ensure you have proper coverage for rental properties, which differs from standard homeowner\'s insurance.'),

    // Common Mistakes
    h2('bg76', 'Common Beginner Mistakes'),
    p('bg77', 'Analysis paralysis is the number one mistake. New investors spend months or years reading books and listening to podcasts without ever making an offer. You will learn more from your first deal than from a hundred hours of study. Set a deadline to make your first offer and stick to it.'),
    p('bg78', 'Overestimating rental income and underestimating expenses leads to deals that look great on paper but bleed money in reality. Always use conservative estimates: actual market rent (not what the seller claims), 50% expense ratio if you are not self-managing, and at least 5% vacancy even in strong rental markets.'),
    p('bg79', 'Skipping the inspection to save $300-$500 can lead to tens of thousands in unexpected repairs. Never skip the inspection on your first deal. Foundation issues, roof problems, plumbing failures, and electrical hazards are not visible to the untrained eye.'),
    p('bg80', 'Trying to time the market is a losing strategy. No one can consistently predict short-term market movements. The best time to buy is when you find a deal that cash flows today. Time in the market beats timing the market — this is as true for real estate as it is for stocks.'),
    p('bg81', 'Neglecting to build a cash reserve leaves you vulnerable to the unexpected. Before buying your first property, have three to six months of mortgage payments set aside in addition to your down payment. Vacancies, repairs, and delinquent tenants happen — your reserve fund is what keeps a temporary setback from becoming a financial crisis.'),

    // 90-Day Action Plan
    h2('bg82', 'Your First 90 Days: An Action Plan'),
    h3('bg83', 'Days 1-30: Foundation'),
    p('bg84', 'Define your investment goals: How much passive income do you want? What is your timeline? How much capital do you have? Choose your strategy based on your situation. Start educating yourself on your chosen strategy specifically — not real estate investing in general. Set up a business bank account. Get pre-approved with a lender so you know exactly what you can afford.'),

    h3('bg85', 'Days 31-60: Deal Hunting'),
    p('bg86', 'Connect with an investor-friendly agent in your target market. Set up automated MLS alerts. Start analyzing one deal per day using our calculators — even if you are not ready to buy yet, this builds your analytical muscle. Attend a local real estate investor meetup. Start building relationships with wholesalers and other investors.'),

    h3('bg87', 'Days 61-90: Take Action'),
    p('bg88', 'Make your first offer. Expect it to get rejected — that is normal. Make five more offers. Get your inspection, financing, and insurance lined up. Close on your first deal. If you have not found a deal that works in your market, expand your search area or adjust your criteria. The goal is not to find a perfect deal. The goal is to find a deal that meets your minimum criteria and move forward.'),

    // Resources
    h2('bg89', 'Resources to Get Started'),
    p('bg90', 'Use our free calculators at /calculators to analyze any deal in minutes. Browse our real estate investing glossary at /glossary to learn the terminology. Read our in-depth strategy guides on BRRRR, house hacking, and deal analysis in the guides section. And remember: the most important step is the first one. Stop researching and start analyzing real deals in your market today.'),
  ],
}

// ── CLUSTER POST 1: How to Analyze a Rental Property ──
const analyzeRental = {
  _type: 'post',
  title: 'How to Analyze a Rental Property in Under 5 Minutes',
  slug: { _type: 'slug', current: 'how-to-analyze-rental-property' },
  author: authorRef,
  categories: [{ _type: 'reference', _ref: 'cat-analysis', _key: 'c1' }],
  publishedAt: '2026-03-15T10:00:00Z',
  excerpt: 'A fast, repeatable framework for evaluating rental properties using cap rate, cash-on-cash return, and the 1% rule.',
  seo: {
    metaTitle: 'How to Analyze a Rental Property in 5 Minutes (Step-by-Step)',
    metaDescription: 'Learn the 5-minute rental property analysis framework. Calculate cap rate, cash-on-cash return, and cash flow to quickly evaluate any deal.',
  },
  body: [
    p('ar01', 'Most real estate investors waste hours analyzing deals that should have been eliminated in minutes. The best investors have a fast, repeatable screening process that quickly identifies the deals worth deeper analysis and filters out the rest. Here is the five-step framework I use to analyze any rental property in under five minutes.'),
    p('ar02', 'This is not a replacement for full due diligence. It is a triage process — a way to quickly determine whether a deal deserves your time and attention before you invest hours in inspections, contractor bids, and lender conversations.'),

    h2('ar03', 'Step 1: Apply the 1% Rule'),
    p('ar04', 'The 1% rule is the fastest screen in real estate. Divide the monthly rent by the purchase price. If the result is 1% or higher, the deal passes the initial screen. If it is below 1%, the deal will likely struggle to cash flow with financing.'),
    bq('ar05', '1% Rule: Monthly Rent / Purchase Price ≥ 1%'),
    p('ar06', 'For example, a $200,000 property that rents for $2,000 per month meets the 1% rule exactly ($2,000 / $200,000 = 1.0%). A $300,000 property renting for $2,200 per month does not ($2,200 / $300,000 = 0.73%).'),
    p('ar07', 'The 1% rule is a blunt instrument. It does not account for property taxes, insurance costs, or local expense variations. But it eliminates the obvious losers immediately. In high-cost markets like San Francisco or New York, almost nothing meets the 1% rule, so investors there rely more heavily on appreciation and different return metrics. In Midwest and Southern markets, the 1% rule is an effective first filter.'),

    h2('ar08', 'Step 2: Estimate Expenses at 50%'),
    p('ar09', 'For a quick analysis, estimate that operating expenses will consume 50% of gross rental income. This is known as the 50% rule and is a surprisingly accurate rule of thumb for most residential rental properties. Operating expenses include property taxes, insurance, property management (8-12%), maintenance and repairs (5-10%), vacancy reserve (5-8%), and capital expenditure reserve.'),
    bq('ar10', '50% Rule: Operating Expenses ≈ 50% of Gross Rent'),
    p('ar11', 'On a property renting for $2,000 per month, estimate $1,000 per month in operating expenses. This is a conservative estimate for a property in decent condition. Newer properties may run closer to 40%, while older properties or those in high-tax areas may run 55-60%. But 50% is the best starting point for a quick analysis.'),
    p('ar12', 'A critical point: the 50% rule does not include your mortgage payment. That comes in step four. The 50% is strictly for operating expenses — the costs you would have even if you owned the property free and clear.'),

    h2('ar13', 'Step 3: Calculate NOI'),
    p('ar14', 'Now calculate the net operating income by subtracting estimated expenses from gross rental income.'),
    bq('ar15', 'NOI = Annual Gross Rent - Annual Operating Expenses'),
    p('ar16', 'Using our $2,000 per month rental: Annual gross rent is $24,000. At 50% expenses, operating costs are $12,000. NOI is $12,000.'),
    p('ar17', 'NOI is the property\'s earning power before financing. It is the foundation for every other metric you will calculate, and it is the number that lenders look at when evaluating DSCR loans. A property with a strong NOI can support a mortgage and still generate positive cash flow for you.'),

    h2('ar18', 'Step 4: Run the Cap Rate'),
    p('ar19', 'Divide the NOI by the purchase price to get the cap rate.'),
    bq('ar20', 'Cap Rate = NOI / Purchase Price × 100'),
    p('ar21', 'With an NOI of $12,000 on a $200,000 property: $12,000 / $200,000 = 6.0% cap rate.'),
    p('ar22', 'Cap rate tells you the unlevered return — what you would earn if you paid all cash. It is most useful for comparing properties against each other. In general, a 5-6% cap rate is typical in stable Class A markets, 6-8% in Class B markets, and 8% or above in Class C or emerging markets. There is no universally "good" cap rate — the right number depends on the market and your investment goals.'),
    p('ar23', 'If the cap rate is significantly below what comparable properties are trading at, the property may be overpriced. If it is significantly above, investigate why — there may be hidden issues, or you may have found a genuine deal.'),

    h2('ar24', 'Step 5: Factor in Financing for Cash-on-Cash Return'),
    p('ar25', 'Now layer in your financing to see what return you actually earn on your invested cash. Subtract the annual mortgage payment from the NOI to get your annual pre-tax cash flow. Then divide that by your total cash invested (down payment plus closing costs).'),
    bq('ar26', 'Annual Cash Flow = NOI - Annual Mortgage Payments'),
    bq('ar27', 'Cash-on-Cash Return = Annual Cash Flow / Total Cash Invested × 100'),
    p('ar28', 'On our $200,000 property with 25% down ($50,000 plus $5,000 in closing costs): the mortgage on $150,000 at 7% over 30 years is about $998 per month, or $11,976 per year. Annual cash flow is $12,000 NOI minus $11,976 mortgage equals $24. Cash-on-cash return is $24 / $55,000 = 0.04%.'),
    p('ar29', 'That is a terrible cash-on-cash return, and it tells you this deal barely breaks even with financing at current rates. You would need to negotiate a lower price, find higher rent, or find a way to reduce expenses to make this deal work. This is exactly the kind of insight the five-minute analysis gives you before you waste time on deeper due diligence.'),

    h2('ar30', 'The Complete Example: A Deal That Works'),
    p('ar31', 'Now let\'s run through a deal that passes the screening. You find a triplex listed at $240,000. Unit A rents for $950, Unit B for $900, and Unit C for $850. Total monthly rent: $2,700.'),
    bq('ar32', 'Step 1 — 1% Rule: $2,700 / $240,000 = 1.13%. Passes.'),
    bq('ar33', 'Step 2 — 50% Rule: Estimated expenses = $1,350/month or $16,200/year.'),
    bq('ar34', 'Step 3 — NOI: $32,400 gross rent - $16,200 expenses = $16,200 NOI.'),
    bq('ar35', 'Step 4 — Cap Rate: $16,200 / $240,000 = 6.75%. Solid for a B-class market.'),
    p('ar36', 'Now financing: 25% down = $60,000 plus $5,000 closing costs = $65,000 total cash invested. Mortgage on $180,000 at 7% for 30 years = $1,198/month or $14,376/year.'),
    bq('ar37', 'Step 5 — Cash Flow: $16,200 NOI - $14,376 mortgage = $1,824/year or $152/month.'),
    bq('ar38', 'Cash-on-Cash Return: $1,824 / $65,000 = 2.8%.'),
    p('ar39', 'At 2.8% cash-on-cash, this deal is not incredible, but it is positive cash flow on day one with conservative estimates. If you can negotiate the price down to $220,000 or self-manage to reduce expenses to 40%, the returns improve significantly. This is a deal worth deeper analysis — schedule the inspection and pull the comps.'),

    h2('ar40', 'When to Go Deeper and When to Walk Away'),
    p('ar41', 'If a property passes all five steps with at least positive cash flow and a reasonable cash-on-cash return (ideally 6% or higher), it is worth your time for deeper analysis: get an inspection, verify actual rent comps, check property tax history, and talk to your lender. If it fails the 1% rule by a wide margin or shows negative cash flow in step five, move on immediately. There are thousands of properties on the market — do not waste time forcing a bad deal to work.'),
    p('ar42', 'Use our free rental property calculator at /calculators/rental to run this analysis in seconds. Plug in the numbers, adjust your assumptions, and see exactly how a deal will perform before you ever make an offer.'),
  ],
}

// ── CLUSTER POST 2: BRRRR Rehab Cost Estimation ──
const rehabCosts = {
  _type: 'post',
  title: 'BRRRR Rehab Costs: How to Estimate Renovation Budgets Like a Pro',
  slug: { _type: 'slug', current: 'brrrr-rehab-cost-estimation' },
  author: authorRef,
  categories: [{ _type: 'reference', _ref: 'cat-strategies', _key: 'c1' }],
  publishedAt: '2026-03-16T10:00:00Z',
  excerpt: 'Accurate rehab estimates make or break a BRRRR deal. Here\'s how to build a scope of work, get contractor bids, and budget for the unexpected.',
  seo: {
    metaTitle: 'How to Estimate Rehab Costs for BRRRR Deals (2026 Guide)',
    metaDescription: 'Learn to estimate renovation costs for BRRRR real estate deals. Includes cost ranges by project type, contractor tips, and budget templates.',
  },
  body: [
    p('rc01', 'In BRRRR investing, the rehab budget is the number that makes or breaks your deal. Overestimate, and you will pass on good deals. Underestimate, and you will leave money in the deal that you cannot recover on the refinance — or worse, run out of funds mid-renovation. The ability to estimate rehab costs accurately is the single most valuable skill a BRRRR investor can develop.'),
    p('rc02', 'This guide gives you a systematic approach to estimating renovation costs, including price ranges for common projects, a framework for building your scope of work, and the hard-learned lessons that separate successful rehabbers from those who blow their budgets.'),

    h2('rc03', 'Why Rehab Estimates Matter More in BRRRR'),
    p('rc04', 'In a fix-and-flip, a rehab cost overrun reduces your profit. In BRRRR, it does something worse: it reduces the capital you recover on the refinance. Remember, the goal of BRRRR is to get all or most of your investment back when you refinance. If your rehab costs $15,000 more than planned, that is $15,000 less you recover — money that cannot be deployed into your next deal.'),
    p('rc05', 'The math is unforgiving. Say your total budget is $150,000 and you planned to refinance at $200,000 (75% LTV = $150,000 loan). If the rehab goes $15,000 over budget, your total investment is now $165,000, but you still only get $150,000 from the refinance. You have $15,000 stuck in the deal that should be funding your next property.'),

    h2('rc06', 'The Three Levels of Renovation'),
    h3('rc07', 'Level 1: Cosmetic Rehab ($10-$25 per square foot)'),
    p('rc08', 'A cosmetic rehab is the lightest touch. The property is structurally sound, mechanicals (HVAC, plumbing, electrical) are in working order, and the renovation focuses on making the property look and feel updated. Typical cosmetic work includes interior and exterior paint ($2-5/sqft), new flooring such as LVP or carpet ($3-7/sqft), updated light fixtures and hardware ($500-1,500 total), kitchen refresh with painted cabinets and new hardware and countertops ($3,000-8,000), bathroom refresh with new vanity and fixtures and re-grouted tile ($1,500-4,000 per bath), and landscaping and curb appeal improvements ($1,000-3,000).'),
    p('rc09', 'Cosmetic rehabs are ideal for BRRRR because they deliver the highest return per dollar. A $15,000 cosmetic rehab on a 1,200-square-foot house can add $40,000 or more in value. The key is finding properties that are ugly but structurally sound — the classic "lipstick on a pig" approach.'),

    h3('rc10', 'Level 2: Moderate Rehab ($25-$60 per square foot)'),
    p('rc11', 'A moderate rehab goes beyond cosmetics. You are replacing some systems, doing significant kitchen and bathroom work, and possibly addressing minor structural issues. Common moderate rehab items include full kitchen remodel with new cabinets, countertops, and appliances ($8,000-20,000), full bathroom remodel with new tub/shower, tile, vanity, and toilet ($5,000-12,000 per bath), HVAC replacement ($4,000-8,000), electrical panel upgrade ($1,500-3,000), plumbing repairs or partial re-pipe ($2,000-8,000), roof repair or partial replacement ($3,000-8,000), window replacement ($300-700 per window), and drywall repair or replacement in affected areas ($2-5/sqft).'),
    p('rc12', 'Moderate rehabs carry more risk because the scope can expand once you open up walls. What looks like a simple bathroom remodel can turn into a plumbing overhaul once you discover corroded pipes behind the tile. Budget conservatively and expect surprises.'),

    h3('rc13', 'Level 3: Full Gut Rehab ($60-$120+ per square foot)'),
    p('rc14', 'A full gut rehab means taking the property down to the studs and rebuilding. Everything gets replaced: all mechanicals, drywall, insulation, flooring, kitchen, bathrooms, windows, roof, and possibly structural elements. Gut rehabs are typically reserved for severely distressed properties purchased at a deep discount.'),
    p('rc15', 'Full gut rehabs are high-risk, high-reward. The purchase price is usually very low, and the value-add potential is enormous. But the execution risk is also the highest. Gut rehabs require experienced contractors, detailed permitting, and deep pockets for the inevitable surprises. If you are new to BRRRR, start with cosmetic or moderate rehabs and work your way up to gut projects.'),

    h2('rc16', 'Building Your Scope of Work'),
    p('rc17', 'A scope of work (SOW) is a detailed document that lists every item to be repaired, replaced, or installed, along with materials specifications and quantities. Your SOW is the foundation of your rehab budget and your contractor agreement. Without it, you are guessing — and guessing is how budgets blow up.'),
    p('rc18', 'Walk the property room by room and document everything. For each room, note the condition of the walls, ceiling, floor, windows, doors, trim, electrical outlets and switches, plumbing fixtures, and lighting. Take photos of every deficiency. Then create a line-item list organized by category.'),
    p('rc19', 'Your SOW categories should include: demolition, structural, roofing, HVAC, plumbing, electrical, insulation, drywall, paint (interior and exterior), flooring, kitchen (cabinets, countertops, appliances, backsplash, sink, faucet), bathrooms (tub/shower, tile, vanity, toilet, faucet, mirror), doors and trim, windows, hardware and fixtures, landscaping and exterior, and cleaning and dumpster.'),
    p('rc20', 'For each line item, specify the quantity, material, and expected cost. "New flooring" is not a scope item. "Install 1,200 sqft of luxury vinyl plank flooring, LifeProof brand, color Sterling Oak" is a scope item. The more specific your SOW, the more accurate your bids will be, and the fewer disputes you will have with contractors mid-project.'),

    h2('rc21', 'Getting Contractor Bids'),
    p('rc22', 'Always get at least three bids from licensed, insured contractors. Provide each contractor with the same SOW so you are comparing apples to apples. Ask for an itemized bid, not a lump sum — you need to see where the money is going so you can identify outliers and negotiate intelligently.'),
    p('rc23', 'When evaluating bids, the lowest price is not always the best choice. Look at the contractor\'s track record with investor projects, their proposed timeline, their payment terms, and how detailed their bid is. A contractor who provides a vague, low-ball bid is more likely to hit you with change orders mid-project than one who provides a thorough, slightly higher estimate.'),
    p('rc24', 'Ask every contractor for at least three references from recent projects. Call those references and ask specific questions: Did the project finish on time? Was the final cost within 10% of the original bid? How did the contractor handle unexpected issues? Would you hire them again? A ten-minute phone call can save you thousands.'),

    h2('rc25', 'The Contingency Rule: Budget 10-20% Extra'),
    p('rc26', 'No matter how detailed your SOW and how accurate your bids, unexpected costs will arise. Hidden water damage behind walls, asbestos in old flooring, termite damage in the subfloor, code violations that require upgrades, and material price increases all add up. The contingency is not a nice-to-have — it is a requirement.'),
    p('rc27', 'For cosmetic rehabs where the risk of surprises is low, a 10% contingency is reasonable. For moderate rehabs, budget 15%. For gut rehabs, 20% is the minimum. Apply the contingency to your entire rehab budget, not individual line items. If your line-item budget totals $40,000, your working budget should be $44,000-$48,000.'),
    p('rc28', 'Here is the critical part: include the contingency in your deal analysis. When you calculate whether a BRRRR deal meets the 75% rule, use the budget-plus-contingency number, not the base budget. If the deal only works at the base budget, it does not really work — because the base budget is the best-case scenario, not the expected case.'),

    h2('rc29', 'Red Flags That Blow Budgets'),
    p('rc30', 'Certain issues are notorious for turning a manageable rehab into a money pit. Foundation problems are the biggest red flag. Repairing a foundation can cost $5,000-$30,000 or more, and foundation issues often cause cascading damage to walls, floors, and plumbing. If you see significant foundation cracks, uneven floors, or doors that will not close properly, get a structural engineer\'s assessment before making an offer.'),
    p('rc31', 'Old plumbing — particularly galvanized steel or polybutylene pipes — can require a full re-pipe costing $5,000-$15,000. Knob-and-tube electrical wiring or a Federal Pacific electrical panel both require full replacement for safety and insurance reasons, typically $8,000-$15,000. Extensive mold remediation can run $2,000-$10,000 depending on the scope. And any property with significant fire or flood damage carries risk that is difficult to estimate without opening walls.'),
    p('rc32', 'None of these issues are automatic deal-killers, but they must be reflected in your purchase price. If a full re-pipe adds $10,000 to your rehab budget, you need to pay $10,000 less for the property to maintain your margins.'),

    h2('rc33', 'Example Rehab Budget Breakdown'),
    p('rc34', 'Here is a real-world budget for a 1,100-square-foot, three-bedroom, one-bathroom BRRRR property — a moderate cosmetic rehab in a B-class neighborhood.'),
    bq('rc35', 'Demolition and debris removal: $1,500 | Interior paint (walls, ceilings, trim): $3,500 | Exterior paint: $2,500 | LVP flooring throughout: $4,400 | Kitchen (cabinets, counters, appliances, sink): $9,000 | Bathroom (vanity, toilet, tub surround, tile floor): $4,500 | Light fixtures and ceiling fans: $800 | Electrical (update outlets, new panel breakers): $1,200 | Plumbing (new faucets, supply lines, drain clearing): $900 | HVAC servicing and duct cleaning: $600 | Windows (5 replacements): $2,500 | Interior doors (6) and hardware: $1,200 | Landscaping and exterior cleanup: $1,800 | Dumpster and cleaning: $800'),
    bq('rc36', 'Subtotal: $35,200 | 15% contingency: $5,280 | Total rehab budget: $40,480'),
    p('rc37', 'This budget puts the rehab at roughly $32-$37 per square foot, squarely in the moderate cosmetic range. The property was purchased at $95,000 with an ARV of $185,000. Total all-in cost including purchase, rehab, and holding costs was $142,000, well within the 75% threshold of $138,750. After refinancing at 75% LTV, the investor recovered $138,750 and had approximately $3,250 left in the deal.'),
    p('rc38', 'Track your actual costs against the budget throughout the project. Use a simple spreadsheet with columns for each line item: budgeted amount, actual amount, and variance. Review it weekly. If you see costs trending above budget early in the project, address it immediately — do not wait until the money runs out.'),
  ],
}

// ── CLUSTER POST 3: House Hacking 101 ──
const houseHacking = {
  _type: 'post',
  title: 'House Hacking 101: How to Live for Free While Building Wealth',
  slug: { _type: 'slug', current: 'house-hacking-101-live-for-free' },
  author: authorRef,
  categories: [
    { _type: 'reference', _ref: 'cat-beginner', _key: 'c1' },
    { _type: 'reference', _ref: 'cat-strategies', _key: 'c2' },
  ],
  publishedAt: '2026-03-17T10:00:00Z',
  excerpt: 'House hacking lets you eliminate your largest expense while building equity. Here\'s how to find, finance, and manage your first house hack.',
  seo: {
    metaTitle: 'House Hacking 101: How to Live for Free (Complete Guide)',
    metaDescription: 'Learn how to house hack your way to free housing. Complete guide to FHA loans, multi-family properties, and managing tenants in your own building.',
  },
  body: [
    p('hh01', 'Housing is the single largest expense for most Americans, consuming 30-40% of gross income. What if you could eliminate that expense entirely — and build wealth while doing it? That is the promise of house hacking, and it is the most accessible entry point into real estate investing available today.'),
    p('hh02', 'House hacking means buying a property, living in part of it, and renting out the rest to cover your mortgage — and ideally generate positive cash flow on top. It works because owner-occupied financing offers dramatically better terms than investment property loans: lower down payments, lower interest rates, and less stringent qualification requirements.'),
    p('hh03', 'Whether you are a first-time homebuyer or a seasoned renter looking to make the leap into investing, house hacking is the strategy that can change your financial trajectory more than any other single decision.'),

    h2('hh04', 'What Is House Hacking?'),
    p('hh05', 'At its core, house hacking is simple: you live in a property and rent out part of it to offset your housing costs. The rental income reduces or eliminates your mortgage payment, and in the best cases, it puts money in your pocket every month. You are simultaneously a homeowner, a landlord, and an investor — building equity, generating income, and learning the fundamentals of real estate investing with training wheels on.'),
    p('hh06', 'House hacking works because of an asymmetry in mortgage lending. Owner-occupied loans (where you live in the property) come with far better terms than investor loans. You can put as little as 3.5% down with an FHA loan versus 20-25% on an investment property. You get lower interest rates. And you can buy properties with up to four units using residential (not commercial) financing. This asymmetry is the edge that makes house hacking so powerful.'),

    h2('hh07', 'Types of House Hacks'),
    h3('hh08', 'The Classic: Duplex, Triplex, or Fourplex'),
    p('hh09', 'The most common and most effective house hack involves buying a small multi-family property — a duplex (two units), triplex (three units), or fourplex (four units). You live in one unit and rent out the others. Properties with up to four units qualify for residential financing, meaning you can use FHA, conventional, or VA loans with low down payments.'),
    p('hh10', 'A fourplex is the holy grail of house hacking. With three units generating rent, the numbers almost always work in your favor. Even in moderately priced markets, three rented units can cover the entire mortgage, taxes, insurance, and maintenance — leaving you with free housing and possibly positive cash flow.'),

    h3('hh11', 'Room Rental (Rent by the Room)'),
    p('hh12', 'If multi-family properties are too expensive or too scarce in your market, rent-by-the-room is an alternative. Buy a single-family home with extra bedrooms, live in the primary bedroom, and rent out the other rooms. This approach generates more income per square foot than renting an entire unit because tenants pay a premium for furnished rooms with shared common areas. A four-bedroom house that would rent for $1,800 as a whole might generate $600-$800 per room, or $1,800-$2,400 from three rented rooms.'),
    p('hh13', 'The downside: you are sharing your living space with tenants. This requires a higher tolerance for housemates and clear house rules. It is best suited for younger investors or those comfortable with a communal living arrangement.'),

    h3('hh14', 'Accessory Dwelling Unit (ADU)'),
    p('hh15', 'An ADU — also called a granny flat, in-law suite, or guest house — is a separate living unit on the same lot as your primary residence. You can buy a property with an existing ADU, or build one on a property you already own. Live in one unit and rent the other. ADUs are increasingly popular as cities loosen zoning restrictions, and they offer more privacy than rent-by-the-room while being cheaper than buying a full multi-family property.'),

    h2('hh16', 'Financing Your House Hack'),
    h3('hh17', 'FHA Loans: 3.5% Down'),
    p('hh18', 'FHA loans are the most popular financing option for house hackers. With just 3.5% down and credit scores as low as 580, they make homeownership accessible to nearly anyone with stable income. On a $300,000 duplex, your down payment is just $10,500. Compare that to the $60,000-$75,000 you would need for a conventional investment property loan on the same price.'),
    p('hh19', 'FHA loans do require mortgage insurance premium (MIP), which adds to your monthly payment. But the cost of MIP is almost always offset by the lower down payment and interest rate. You must live in the property as your primary residence for at least 12 months. After that, you can move out, keep the FHA loan in place, and rent all units — converting the property to a full investment.'),

    h3('hh20', 'VA Loans: 0% Down'),
    p('hh21', 'If you are an eligible veteran or active-duty service member, VA loans offer the ultimate house hacking advantage: zero down payment on properties with up to four units. No mortgage insurance. Competitive rates. A VA-funded fourplex is the single most capital-efficient way to start investing in real estate. The only requirement is living in one unit as your primary residence.'),

    h3('hh22', 'Conventional Loans: 5-15% Down'),
    p('hh23', 'Conventional loans with 5% down are available for owner-occupied properties, and some programs allow as little as 3% down for first-time buyers. While the rates and terms are slightly less favorable than FHA for lower credit scores, conventional loans do not require upfront mortgage insurance if you put 20% down, and the PMI can be removed once you reach 20% equity.'),

    h2('hh24', 'Finding House Hack Properties'),
    p('hh25', 'Search for small multi-family properties on the MLS using an investor-friendly agent. Filter for duplexes, triplexes, and fourplexes in neighborhoods where you would be comfortable living. Look at areas with strong rental demand — near colleges, hospitals, military bases, and downtown areas with good employment.'),
    p('hh26', 'Evaluate the property as an investment, not as a personal home. It does not matter if the kitchen is not your dream kitchen or the neighborhood is not your ideal location. What matters is: will the rental income from the other units cover the mortgage? Is the property in a safe area with stable or growing demand? Are the units rentable in their current condition? Focus on the numbers first and the aesthetics second.'),
    p('hh27', 'Off-market opportunities exist for multi-family properties too. Drive neighborhoods you like and look for "For Rent" signs on duplexes and fourplexes — the owners of those properties are landlords who might be willing to sell. Direct mail to owners of 2-4 unit properties who have owned for 10 or more years can also yield motivated sellers.'),

    h2('hh28', 'Running the Numbers on a House Hack'),
    p('hh29', 'Let\'s analyze a real house hack deal. You find a triplex listed at $350,000. Unit 1 (where you will live) would rent for $1,100 on the open market. Unit 2 rents for $1,050, and Unit 3 rents for $1,000. You are buying with an FHA loan at 3.5% down.'),
    bq('hh30', 'Purchase price: $350,000 | Down payment (3.5%): $12,250 | Closing costs: ~$8,000 | Total cash needed: ~$20,250'),
    p('hh31', 'Your monthly FHA mortgage payment including principal, interest, taxes, insurance, and MIP will be approximately $2,600. Your rental income from Units 2 and 3 is $2,050 per month.'),
    bq('hh32', 'Your monthly housing cost: $2,600 mortgage - $2,050 rental income = $550 out of pocket'),
    p('hh33', 'Instead of paying $1,100 in rent for a comparable apartment, you are paying $550 to live in your own property while building equity and gaining landlord experience. That is a $550 monthly savings — $6,600 per year — plus you are building equity through mortgage paydown and potential appreciation.'),
    p('hh34', 'When you move out after year one and rent Unit 1 for $1,100, total rental income becomes $3,150, and monthly cash flow after the mortgage is $550 positive. You have just created a cash-flowing investment property with a total out-of-pocket cost of about $20,000.'),

    h2('hh35', 'Managing Tenants in Your Own Building'),
    p('hh36', 'Living in the same building as your tenants creates a unique dynamic. You are their landlord and their neighbor, and maintaining clear boundaries is essential. Establish professional expectations from day one: use a written lease, collect rent through an online platform (not cash under the door), and handle maintenance requests through a formal process.'),
    p('hh37', 'Set boundaries around your personal space and time. Tenants should not knock on your door at 10 PM for a non-emergency. Establish quiet hours, shared space rules (if applicable), and a clear process for submitting maintenance requests. The more professional your approach, the smoother the relationship will be.'),
    p('hh38', 'Screen tenants just as rigorously as you would for a property you do not live in. In some ways, it is even more important because these people will be your neighbors. Run credit and background checks, verify income and employment, check rental references, and trust your gut. A strong tenant makes your house hack a pleasure. A bad one makes it a nightmare.'),

    h2('hh39', 'The Exit Strategy: Rinse and Repeat'),
    p('hh40', 'The beauty of house hacking is that it is repeatable. After living in your first house hack for 12 months (the FHA occupancy requirement), you can move out, keep the property as a full rental, and buy your next house hack with another FHA loan. Yes, you can have only one FHA loan at a time, but once you move to a new primary residence and get a new FHA loan, the old one stays in place on the original property.'),
    p('hh41', 'Some investors house hack every one to two years, accumulating properties along the way. After five years, you could own three or four cash-flowing multi-family properties — all acquired with 3.5% down and owner-occupied financing. This is one of the fastest and lowest-risk paths to building a meaningful rental portfolio.'),

    h2('hh42', 'A Real-World House Hacking Timeline'),
    p('hh43', 'Year 1: Buy a fourplex with FHA (3.5% down). Live in one unit, rent three. Your out-of-pocket housing cost drops to near zero. Year 2: Move out of Unit 1, rent it. The property now generates $400-$600 per month in positive cash flow. Buy your second house hack — a duplex — with a new owner-occupied loan. Year 3: Both properties are stabilized and generating income. You now have six units producing cash flow. Year 4-5: Repeat the process or transition to buying investment properties outright using the cash flow and equity you have built.'),
    p('hh44', 'In five years, you could have 8-12 units, significant equity, and monthly cash flow that exceeds what most people earn from a year of stock market returns. And it all started with one decision: to hack your housing costs instead of paying someone else\'s mortgage.'),
  ],
}

// ── CLUSTER POST 4: Cash-on-Cash vs Cap Rate ──
const cocVsCap = {
  _type: 'post',
  title: 'Cash-on-Cash Return vs. Cap Rate: Which Metric Should You Use?',
  slug: { _type: 'slug', current: 'cash-on-cash-vs-cap-rate' },
  author: authorRef,
  categories: [{ _type: 'reference', _ref: 'cat-analysis', _key: 'c1' }],
  publishedAt: '2026-03-18T10:00:00Z',
  excerpt: 'Cap rate and cash-on-cash return measure different things. Here\'s when to use each metric and why smart investors track both.',
  seo: {
    metaTitle: 'Cash-on-Cash Return vs Cap Rate: Key Differences Explained',
    metaDescription: 'Understand the difference between cap rate and cash-on-cash return. Learn when to use each metric to analyze real estate investment deals.',
  },
  body: [
    p('cv01', 'Cap rate and cash-on-cash return are the two most commonly used metrics in real estate investing, and they are also the two most commonly confused. New investors often use them interchangeably, which leads to flawed deal analysis and bad investment decisions. These metrics measure fundamentally different things, and understanding the distinction is essential to evaluating deals accurately.'),
    p('cv02', 'Here is the short version: cap rate measures the property\'s return. Cash-on-cash return measures your return. They are related but distinct, and you need both to make informed investment decisions.'),

    h2('cv03', 'Cap Rate: The Property\'s Unlevered Return'),
    p('cv04', 'Capitalization rate — cap rate — is the ratio of a property\'s net operating income (NOI) to its purchase price or current market value. It tells you what percentage return the property generates on its total value, as if you paid all cash.'),
    bq('cv05', 'Cap Rate = Net Operating Income / Property Price × 100'),
    p('cv06', 'For example, a property generating $18,000 in annual NOI and priced at $250,000 has a cap rate of 7.2%. This means the property produces a 7.2% annual return on its total value, independent of how you finance it.'),
    p('cv07', 'The key word is "unlevered." Cap rate strips out financing entirely. It does not care whether you pay cash, put 20% down, or use a hard money loan. This makes cap rate the purest measure of a property\'s income-producing ability relative to its price. It is the metric you use to compare properties against each other — and against other investment options — on a level playing field.'),

    h2('cv08', 'Cash-on-Cash Return: Your Personal Return on Investment'),
    p('cv09', 'Cash-on-cash (CoC) return measures the annual pre-tax cash flow relative to the total cash you actually invested in the property. Unlike cap rate, it accounts for financing — which is why it is the more relevant metric for most investors, since most investors use leverage.'),
    bq('cv10', 'Cash-on-Cash Return = Annual Pre-Tax Cash Flow / Total Cash Invested × 100'),
    p('cv11', 'Annual pre-tax cash flow is what remains after you subtract all expenses, including the mortgage payment, from your rental income. Total cash invested includes your down payment, closing costs, and any rehab costs you paid out of pocket.'),
    p('cv12', 'Continuing the example above: if you buy the $250,000 property with 25% down ($62,500) plus $5,000 in closing costs, your total cash invested is $67,500. Your annual mortgage payment on a $187,500 loan at 7% is approximately $14,976. Your annual cash flow is $18,000 NOI minus $14,976 mortgage = $3,024. Your cash-on-cash return is $3,024 / $67,500 = 4.5%.'),

    h2('cv13', 'Same Property, Different Metrics: A Side-by-Side Example'),
    p('cv14', 'Let\'s look at how cap rate and cash-on-cash return tell different stories about the same property under different financing scenarios.'),
    p('cv15', 'Property: A duplex listed at $300,000. Gross annual rent: $36,000. Operating expenses: $16,200 (45% of rent). NOI: $19,800.'),
    bq('cv16', 'Cap Rate: $19,800 / $300,000 = 6.6%. This number stays the same no matter how you finance it.'),

    h3('cv17', 'Scenario A: All Cash Purchase'),
    p('cv18', 'You pay $300,000 in cash plus $3,000 in closing costs. Total cash invested: $303,000. Annual cash flow equals NOI because there is no mortgage: $19,800.'),
    bq('cv19', 'Cash-on-Cash Return: $19,800 / $303,000 = 6.5%. Nearly identical to the cap rate, as expected with an all-cash purchase.'),

    h3('cv20', 'Scenario B: 25% Down Conventional Loan at 7%'),
    p('cv21', 'Down payment: $75,000. Closing costs: $6,000. Total cash invested: $81,000. Annual mortgage payment on $225,000 at 7% for 30 years: approximately $17,964. Annual cash flow: $19,800 - $17,964 = $1,836.'),
    bq('cv22', 'Cash-on-Cash Return: $1,836 / $81,000 = 2.3%. Leverage at 7% interest actually hurts your cash return here.'),

    h3('cv23', 'Scenario C: 25% Down at 5.5% Interest'),
    p('cv24', 'Same down payment and closing costs: $81,000 total cash invested. Annual mortgage payment at 5.5%: approximately $15,324. Annual cash flow: $19,800 - $15,324 = $4,476.'),
    bq('cv25', 'Cash-on-Cash Return: $4,476 / $81,000 = 5.5%. Better, but still below the cap rate.'),

    p('cv26', 'Notice what happened: the cap rate stayed at 6.6% in every scenario, but the cash-on-cash return changed dramatically based on financing terms. This is why cap rate alone is not enough to evaluate a deal. And it illustrates a critical principle: leverage only improves your return when the interest rate on your debt is lower than the cap rate. When your mortgage rate exceeds the cap rate, leverage actually makes your return worse.'),

    h2('cv27', 'When to Use Cap Rate'),
    p('cv28', 'Use cap rate when comparing properties against each other. Because it strips out financing, cap rate gives you an apples-to-apples comparison of how efficiently different properties convert their value into income. A 7% cap rate property is producing more income per dollar of value than a 5% cap rate property, regardless of how either is financed.'),
    p('cv29', 'Cap rate is also useful for comparing real estate to other asset classes. If treasury bonds yield 4.5% and you can buy a rental property at a 7% cap rate, the 2.5% spread is your risk premium for the additional work and risk of real estate investing. If cap rates compress to 5%, the risk premium shrinks, and you may decide the effort is not worth it.'),
    p('cv30', 'Use cap rate for valuation. In commercial real estate, properties are valued based on their NOI and the prevailing cap rate for that market and property type. If similar properties are trading at a 6% cap rate and a property generates $24,000 in NOI, its estimated value is $400,000 ($24,000 / 0.06). This valuation approach does not apply perfectly to small residential properties, but it provides a useful reference point.'),

    h2('cv31', 'When to Use Cash-on-Cash Return'),
    p('cv32', 'Use cash-on-cash return when evaluating how a specific deal will perform for your financial situation. This is the metric that answers the question most investors actually care about: "What return am I earning on the money I am putting in?" If you have $60,000 to invest and one deal offers 8% cash-on-cash while another offers 4%, the first deal puts $4,800 in your pocket annually versus $2,400. That is a real, tangible difference in your life.'),
    p('cv33', 'Cash-on-cash return is also the metric that reveals the power — and danger — of leverage. A property with a modest cap rate can produce an excellent cash-on-cash return with favorable financing, and a high cap rate property can produce poor cash returns if the debt terms are unfavorable. You cannot know how a deal will actually perform without running the cash-on-cash calculation with your specific financing terms.'),

    h2('cv34', 'The Leverage Effect Explained'),
    p('cv35', 'Leverage is the use of borrowed money to amplify returns. In real estate, the leverage effect means that when your cap rate exceeds your mortgage interest rate, financing increases your cash-on-cash return above the cap rate. When the mortgage rate exceeds the cap rate, financing decreases your return below the cap rate. This is called positive leverage and negative leverage.'),
    bq('cv36', 'Positive Leverage: Cap Rate > Mortgage Rate → CoC Return > Cap Rate'),
    bq('cv37', 'Negative Leverage: Cap Rate < Mortgage Rate → CoC Return < Cap Rate'),
    p('cv38', 'In the current interest rate environment, where mortgage rates on investment properties are in the 6.5-7.5% range, you need properties with cap rates above 7% to benefit from positive leverage. This is why cash flow has become harder to achieve in many markets — the math only works when the spread between cap rate and mortgage rate is favorable.'),
    p('cv39', 'This does not mean you should never buy a property with negative leverage. If you believe in the long-term appreciation potential and rent growth of a market, a property that is slightly negative on leverage today may become strongly positive in two to three years as rents increase while your fixed-rate mortgage stays the same. But you need to go in with your eyes open about the short-term cash flow implications.'),

    h2('cv40', 'Which Metric Is "Better"?'),
    p('cv41', 'Neither. They answer different questions. Cap rate tells you about the property. Cash-on-cash return tells you about the deal, given your specific financing. Smart investors calculate both for every deal and use them together.'),
    p('cv42', 'Start with cap rate to screen and compare properties. Is the cap rate competitive for the market and property class? Then run cash-on-cash return to evaluate how the deal performs with your actual financing terms. Does it meet your return threshold? Together, these two metrics give you a complete picture of a deal\'s income potential — from the property level to the investor level.'),
    p('cv43', 'Use our free calculators at /calculators/rental to run both metrics on any deal in seconds. Plug in the purchase price, rent, expenses, and financing terms, and see the cap rate and cash-on-cash return side by side. The numbers will tell you everything you need to know about whether a deal is worth pursuing.'),
  ],
}

// ── All posts ────────────────────────────────────────
const posts = [brrrrGuide, beginnersGuide, analyzeRental, rehabCosts, houseHacking, cocVsCap]

// ── Run Seed ─────────────────────────────────────────
async function seed() {
  console.log('Wave 1 Content Seed: 2 pillar guides + 4 cluster posts\n')

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
