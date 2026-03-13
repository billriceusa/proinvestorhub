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

const newTerms = [
  // ── Financing & Loans ──────────────────────────────
  { term: 'Amortization', slug: 'amortization', category: 'financing', definition: 'The process of spreading loan payments over time. Each payment includes both principal and interest, with early payments being mostly interest and later payments being mostly principal. A 30-year amortization schedule means the loan is fully paid off in 30 years.' },
  { term: 'Adjustable Rate Mortgage (ARM)', slug: 'adjustable-rate-mortgage', category: 'financing', definition: 'A mortgage with an interest rate that changes periodically based on a benchmark index. ARMs typically start with a lower rate than fixed-rate mortgages but carry the risk of rate increases. Common structures include 5/1 ARM (fixed for 5 years, then adjusts annually).' },
  { term: 'Balloon Payment', slug: 'balloon-payment', category: 'financing', definition: 'A large, lump-sum payment due at the end of a loan term. Balloon loans have lower monthly payments but require refinancing or a large cash payment when the balloon comes due. Common in commercial real estate and hard money lending.' },
  { term: 'Bridge Loan', slug: 'bridge-loan', category: 'financing', definition: 'A short-term loan used to bridge the gap between purchasing a new property and selling an existing one, or between acquisition and long-term financing. Bridge loans typically have higher interest rates and terms of 6-24 months.' },
  { term: 'Conventional Loan', slug: 'conventional-loan', category: 'financing', definition: 'A mortgage not insured by a government agency (FHA, VA, USDA). Conventional loans typically require higher credit scores and larger down payments (15-25% for investment properties) but offer competitive rates and fewer restrictions.' },
  { term: 'FHA Loan', slug: 'fha-loan', category: 'financing', definition: 'A mortgage insured by the Federal Housing Administration that allows down payments as low as 3.5%. FHA loans are popular for house hacking because they can be used on 1-4 unit properties as long as the borrower lives in one unit.' },
  { term: 'Private Money Lending', slug: 'private-money-lending', category: 'financing', definition: 'Loans from individual investors rather than institutional lenders. Private money lenders offer flexible terms and faster closings but typically charge higher interest rates. Commonly used for fix-and-flip projects and short-term financing needs.' },
  { term: 'Seller Financing', slug: 'seller-financing', category: 'financing', definition: 'A transaction where the property seller acts as the lender, allowing the buyer to make payments directly to them instead of obtaining a bank mortgage. Terms are negotiable and can be advantageous when conventional financing is difficult to obtain.' },
  { term: 'Debt-to-Income Ratio (DTI)', slug: 'dti', category: 'financing', definition: 'The percentage of gross monthly income that goes toward paying debts. Lenders use DTI to determine borrowing capacity. Most conventional lenders require a DTI below 43-45%, though investment property income can help offset this.' },
  { term: 'Points', slug: 'points', category: 'financing', definition: 'Fees paid to a lender at closing, where each point equals 1% of the loan amount. Discount points buy down the interest rate, while origination points cover lender processing fees. On a $200,000 loan, one point equals $2,000.' },
  { term: 'Pre-Approval', slug: 'pre-approval', category: 'financing', definition: 'A lender\'s conditional commitment to lend a specific amount based on a review of the borrower\'s financial information. Pre-approval is stronger than pre-qualification and signals to sellers that the buyer is serious and capable of closing.' },
  { term: 'Refinance', slug: 'refinance', category: 'financing', definition: 'Replacing an existing mortgage with a new one, typically to get a lower interest rate, change loan terms, or access equity through a cash-out refinance. Cash-out refinancing is a key component of the BRRRR strategy.' },
  { term: 'Underwriting', slug: 'underwriting', category: 'financing', definition: 'The process by which a lender evaluates the risk of a loan by analyzing the borrower\'s creditworthiness, the property\'s value, and the overall deal structure. Underwriting determines whether a loan is approved and under what terms.' },

  // ── Analysis & Metrics ─────────────────────────────
  { term: 'Return on Investment (ROI)', slug: 'roi', category: 'analysis', definition: 'The total return on an investment expressed as a percentage of the total amount invested. In real estate, ROI accounts for cash flow, appreciation, mortgage paydown, and tax benefits over the entire holding period.' },
  { term: 'Operating Expense Ratio (OER)', slug: 'operating-expense-ratio', category: 'analysis', definition: 'The ratio of operating expenses to gross operating income, expressed as a percentage. A lower OER indicates more efficient property management. Typical OERs range from 35-80% depending on property type and age.' },
  { term: 'Break-Even Ratio', slug: 'break-even-ratio', category: 'analysis', definition: 'The occupancy level at which a property\'s income exactly covers all expenses including debt service. Calculated as (Operating Expenses + Debt Service) / Gross Operating Income. A lower break-even ratio indicates less risk.' },
  { term: 'Price Per Unit', slug: 'price-per-unit', category: 'analysis', definition: 'The total purchase price of a multi-family property divided by the number of units. Used to quickly compare multi-family properties of different sizes within the same market. A fourplex at $400,000 has a price per unit of $100,000.' },
  { term: 'Price Per Square Foot', slug: 'price-per-square-foot', category: 'analysis', definition: 'The property price divided by its total livable square footage. A standard metric for comparing properties of different sizes. Varies significantly by market, property type, and condition.' },
  { term: 'Capitalization Rate Compression', slug: 'cap-rate-compression', category: 'analysis', definition: 'When cap rates decrease across a market, meaning property values are rising faster than rents. Cap rate compression increases property values for current owners but makes new acquisitions less attractive from a cash flow perspective.' },
  { term: 'Effective Gross Income (EGI)', slug: 'effective-gross-income', category: 'analysis', definition: 'Gross potential rental income minus vacancy and credit losses, plus any other income (laundry, parking, pet fees). EGI represents the realistic income a property will generate and is used to calculate NOI.' },
  { term: 'Gross Potential Income', slug: 'gross-potential-income', category: 'analysis', definition: 'The maximum rental income a property could generate if 100% occupied at market rent with no concessions or losses. This theoretical maximum serves as the starting point for income analysis before accounting for vacancy and collection losses.' },
  { term: 'Pro Forma', slug: 'pro-forma', category: 'analysis', definition: 'A projected financial statement for a property based on assumptions about future income, expenses, and financing. Investors use pro forma analysis to evaluate potential deals, but should always verify assumptions against actual operating data.' },
  { term: 'Absorption Rate', slug: 'absorption-rate', category: 'analysis', definition: 'The rate at which available properties in a market are sold or leased over a given time period. A high absorption rate indicates strong demand and typically favors sellers/landlords, while a low rate favors buyers/tenants.' },

  // ── Property Types & Classifications ────────────────
  { term: 'Multi-Family Property', slug: 'multi-family-property', category: 'general', definition: 'A residential property with two or more housing units. Includes duplexes (2 units), triplexes (3), fourplexes (4), and apartment buildings (5+). Properties with 1-4 units qualify for residential financing, while 5+ units require commercial loans.' },
  { term: 'Single-Family Rental (SFR)', slug: 'single-family-rental', category: 'general', definition: 'A detached single-family home purchased as an investment and rented to tenants. SFRs typically appreciate more than multi-family properties, attract longer-term tenants, and are easier to finance and eventually sell.' },
  { term: 'Commercial Real Estate', slug: 'commercial-real-estate', category: 'general', definition: 'Property used for business purposes including office buildings, retail spaces, industrial properties, and multi-family properties with 5+ units. Commercial properties are valued primarily on income production and use different financing than residential properties.' },
  { term: 'Mixed-Use Property', slug: 'mixed-use-property', category: 'general', definition: 'A property that combines residential and commercial uses, such as retail on the ground floor with apartments above. Mixed-use properties can diversify income streams and may qualify for special financing programs.' },
  { term: 'Class A Property', slug: 'class-a-property', category: 'general', definition: 'The highest-quality properties in terms of construction, location, and amenities. Class A properties are typically newer, well-maintained, in prime locations, and command the highest rents. They offer lower risk but also lower cap rates.' },
  { term: 'Class B Property', slug: 'class-b-property', category: 'general', definition: 'Properties that are older or in less prime locations than Class A but are well-maintained and functional. Class B properties are the sweet spot for many investors because they offer moderate risk, decent cash flow, and value-add potential through renovations.' },
  { term: 'Class C Property', slug: 'class-c-property', category: 'general', definition: 'Older properties in less desirable locations that may need significant renovations. Class C properties offer the highest cap rates and cash flow potential but come with higher vacancy, more maintenance issues, and more management challenges.' },
  { term: 'Turnkey Property', slug: 'turnkey-property', category: 'general', definition: 'A fully renovated, tenant-occupied property sold by a company that also provides property management. Turnkey properties allow investors to start earning rental income immediately without dealing with renovations, though they typically cost more than distressed properties.' },

  // ── Tax & Legal ────────────────────────────────────
  { term: 'Cost Segregation', slug: 'cost-segregation', category: 'tax', definition: 'A tax strategy that accelerates depreciation deductions by identifying and reclassifying components of a building into shorter depreciation schedules (5, 7, or 15 years instead of 27.5 or 39). Can generate significant tax savings in the early years of ownership.' },
  { term: 'Bonus Depreciation', slug: 'bonus-depreciation', category: 'tax', definition: 'A tax provision allowing investors to deduct a large percentage of certain asset costs in the first year of ownership rather than spreading the deduction over the asset\'s useful life. Often used in conjunction with cost segregation studies.' },
  { term: 'Capital Gains Tax', slug: 'capital-gains-tax', category: 'tax', definition: 'Tax paid on the profit from selling a property. Short-term capital gains (held less than one year) are taxed as ordinary income. Long-term capital gains (held more than one year) are taxed at lower rates of 0%, 15%, or 20% depending on income level.' },
  { term: 'Passive Income', slug: 'passive-income', category: 'tax', definition: 'Income from business activities in which the taxpayer does not materially participate, including rental income. Passive income and losses have special tax treatment — passive losses can only offset passive income unless you qualify as a real estate professional.' },
  { term: 'Real Estate Professional Status', slug: 'real-estate-professional-status', category: 'tax', definition: 'An IRS designation requiring 750+ hours per year in real estate activities and more than half of working hours in real estate. This status allows investors to deduct rental losses against non-passive income, providing significant tax benefits.' },
  { term: 'LLC (Limited Liability Company)', slug: 'llc', category: 'tax', definition: 'A business structure commonly used by real estate investors to hold properties. LLCs provide personal liability protection, separating investment assets from personal assets. Most investors create a separate LLC for each property or small group of properties.' },
  { term: 'Self-Directed IRA', slug: 'self-directed-ira', category: 'tax', definition: 'A retirement account that allows investors to use IRA funds to purchase real estate, among other alternative investments. All income and gains grow tax-deferred (traditional) or tax-free (Roth), but strict rules govern transactions to avoid prohibited activities.' },
  { term: 'Depreciation Recapture', slug: 'depreciation-recapture', category: 'tax', definition: 'When you sell a property, the IRS "recaptures" depreciation deductions you previously claimed by taxing that amount at a rate of up to 25%. This is a key consideration when calculating the true after-tax profit on a sale and why many investors use 1031 exchanges.' },
  { term: 'Opportunity Zone', slug: 'opportunity-zone', category: 'tax', definition: 'A designated low-income community where investors can receive tax benefits for investing capital gains. Benefits include deferral of capital gains taxes and potential elimination of taxes on new gains from the Opportunity Zone investment if held for 10+ years.' },

  // ── Strategies ─────────────────────────────────────
  { term: 'Buy and Hold', slug: 'buy-and-hold', category: 'strategies', definition: 'A long-term investment strategy where properties are purchased and held for years or decades, generating ongoing rental income while benefiting from appreciation, mortgage paydown, and tax advantages. The most proven wealth-building approach in real estate.' },
  { term: 'Value-Add Investing', slug: 'value-add-investing', category: 'strategies', definition: 'A strategy focused on purchasing underperforming properties and increasing their value through renovations, better management, rent increases, or expense reduction. Value-add creates "forced appreciation" independent of market movements.' },
  { term: 'Wholesale Real Estate', slug: 'wholesale-real-estate', category: 'strategies', definition: 'A strategy where an investor contracts to buy a property (usually distressed) and assigns or sells that contract to another buyer for a fee, without ever taking ownership. Wholesaling requires minimal capital but significant marketing and negotiation skills.' },
  { term: 'Subject-To Financing', slug: 'subject-to-financing', category: 'strategies', definition: 'Acquiring a property "subject to" the existing mortgage, meaning the buyer takes ownership while the seller\'s loan stays in place. The buyer makes the mortgage payments but the loan remains in the seller\'s name. A creative financing strategy for investors.' },
  { term: 'Lease Option', slug: 'lease-option', category: 'strategies', definition: 'An agreement giving the tenant the right (but not the obligation) to purchase the property at a predetermined price within a specified period. Investors use lease options to control properties with minimal capital and generate income while building toward ownership.' },
  { term: 'Real Estate Syndication', slug: 'real-estate-syndication', category: 'strategies', definition: 'A partnership between a sponsor (general partner) who manages the deal and limited partners who provide capital. Syndications allow investors to participate in larger deals passively, typically commercial properties or apartment complexes.' },
  { term: 'Midterm Rental (MTR)', slug: 'midterm-rental', category: 'strategies', definition: 'Properties rented for 1-6 months, commonly to traveling professionals, medical workers, or corporate relocations. MTRs often generate higher income than long-term rentals with less turnover than short-term rentals and fewer regulatory restrictions.' },
  { term: 'Arbitrage (Rental)', slug: 'rental-arbitrage', category: 'strategies', definition: 'Leasing a property long-term and subletting it as a short-term rental on platforms like Airbnb, profiting from the difference between long-term rent and short-term income. Requires landlord permission and careful market analysis.' },

  // ── Property Management ────────────────────────────
  { term: 'Property Management', slug: 'property-management', category: 'general', definition: 'The operation, oversight, and maintenance of real estate properties on behalf of the owner. Professional property managers typically charge 8-12% of collected rent and handle tenant screening, rent collection, maintenance, and legal compliance.' },
  { term: 'Tenant Screening', slug: 'tenant-screening', category: 'general', definition: 'The process of evaluating potential tenants through credit checks, background checks, employment verification, rental history, and references. Thorough screening is the single most important step in reducing vacancy, evictions, and property damage.' },
  { term: 'Cap Ex (Capital Expenditures)', slug: 'capex', category: 'general', definition: 'Major expenses for replacing or upgrading property components with useful lives beyond one year — roofs, HVAC systems, water heaters, appliances, flooring. Smart investors reserve 5-10% of gross rent for future cap ex to avoid surprise cash outlays.' },
  { term: 'Deferred Maintenance', slug: 'deferred-maintenance', category: 'general', definition: 'Maintenance and repairs that have been postponed, allowing a property to deteriorate. Deferred maintenance can create buying opportunities (discounted price) but also represents hidden costs that must be factored into deal analysis.' },
  { term: 'Net Lease', slug: 'net-lease', category: 'general', definition: 'A lease structure where the tenant pays some or all property expenses in addition to rent. Single net (N): tenant pays taxes. Double net (NN): taxes + insurance. Triple net (NNN): taxes + insurance + maintenance. NNN leases are popular with passive investors.' },
  { term: 'Rent-to-Price Ratio', slug: 'rent-to-price-ratio', category: 'analysis', definition: 'Monthly rent divided by purchase price, expressed as a percentage. The "1% rule" suggests that monthly rent should equal at least 1% of the purchase price for positive cash flow. A $200,000 property should rent for at least $2,000/month by this guideline.' },
  { term: 'Section 8 Housing', slug: 'section-8', category: 'general', definition: 'The federal Housing Choice Voucher Program where the government subsidizes rent for low-income tenants. Landlords receive guaranteed partial payment from the government, reducing vacancy risk, though properties must meet HUD inspection standards.' },

  // ── Market Analysis ────────────────────────────────
  { term: 'Comparable Sales (Comps)', slug: 'comps', category: 'analysis', definition: 'Recently sold properties similar to the subject property in location, size, condition, and features. Comps are the primary method for determining a property\'s fair market value. Appraisers, agents, and investors all rely on comps for pricing decisions.' },
  { term: 'Fair Market Value (FMV)', slug: 'fair-market-value', category: 'analysis', definition: 'The price a property would sell for on the open market between a willing buyer and seller, both having reasonable knowledge of relevant facts. FMV is determined through comparative market analysis, appraisals, or income-based valuation methods.' },
  { term: 'Appraisal', slug: 'appraisal', category: 'general', definition: 'A professional estimate of a property\'s market value conducted by a licensed appraiser. Lenders require appraisals before issuing mortgages to ensure the property is worth at least the loan amount. The appraisal can make or break a deal.' },
  { term: 'Due Diligence', slug: 'due-diligence', category: 'general', definition: 'The investigation and analysis period after a purchase contract is signed, during which the buyer verifies the property\'s condition, financials, legal status, and market position. Due diligence typically includes inspections, title searches, rent roll verification, and expense review.' },
  { term: 'Market Rent', slug: 'market-rent', category: 'analysis', definition: 'The rental rate a property would command in the current market based on comparable rentals in the area. Properties rented below market rent represent upside potential, while those above market rent may face vacancy risk when leases expire.' },
  { term: 'Highest and Best Use', slug: 'highest-and-best-use', category: 'analysis', definition: 'The most profitable, legally permissible, physically possible, and financially feasible use of a property. This appraisal concept helps investors identify whether a property is being used optimally or if a different use would generate more value.' },
  { term: 'Zoning', slug: 'zoning', category: 'general', definition: 'Local government regulations that dictate how a property can be used — residential, commercial, industrial, mixed-use, etc. Zoning laws affect what you can build, rental restrictions (including short-term rental bans), and property value. Always verify zoning before purchasing.' },

  // ── Deal Structure & Closing ───────────────────────
  { term: 'Earnest Money', slug: 'earnest-money', category: 'general', definition: 'A deposit made by the buyer when submitting an offer, demonstrating serious intent to purchase. Typically 1-3% of the purchase price, earnest money is held in escrow and applied to the down payment at closing. It may be forfeitable if the buyer backs out without a valid contingency.' },
  { term: 'Escrow', slug: 'escrow', category: 'general', definition: 'A neutral third party that holds funds, documents, and instructions during a real estate transaction until all conditions are met. Escrow also refers to the account where lenders hold funds for property taxes and insurance as part of the monthly mortgage payment.' },
  { term: 'Title Insurance', slug: 'title-insurance', category: 'general', definition: 'Insurance that protects the buyer and lender against claims or defects in the property\'s title — such as undisclosed liens, forgeries, or ownership disputes. Title insurance is a one-time premium paid at closing and is required by most lenders.' },
  { term: 'Closing Costs', slug: 'closing-costs', category: 'general', definition: 'Fees and expenses paid at the closing of a real estate transaction beyond the property price. For buyers, these typically include loan origination fees, appraisal, title insurance, recording fees, and prepaid taxes/insurance. Usually 2-5% of the purchase price.' },
  { term: 'Contingency', slug: 'contingency', category: 'general', definition: 'A condition in a purchase contract that must be satisfied before the sale can close. Common contingencies include financing, inspection, appraisal, and title contingencies. Investors sometimes waive contingencies to strengthen offers in competitive markets.' },

  // ── Advanced Concepts ──────────────────────────────
  { term: 'Leverage', slug: 'leverage', category: 'general', definition: 'Using borrowed money to increase the potential return on investment. In real estate, a 25% down payment gives you 4:1 leverage — you control a $400,000 asset with $100,000. Leverage amplifies both gains and losses.' },
  { term: 'Forced Appreciation', slug: 'forced-appreciation', category: 'strategies', definition: 'Increasing a property\'s value through deliberate actions rather than waiting for market appreciation. Methods include renovations, rent increases, expense reduction, and adding amenities. Forced appreciation is central to value-add and BRRRR strategies.' },
  { term: 'Cash Reserve', slug: 'cash-reserve', category: 'general', definition: 'Money set aside for unexpected expenses, vacancies, and emergencies. Most lenders require 3-6 months of reserves per property. Savvy investors maintain reserves covering mortgage payments, insurance, taxes, and major repairs.' },
  { term: 'Portfolio Loan', slug: 'portfolio-loan', category: 'financing', definition: 'A mortgage held by the originating bank rather than sold on the secondary market. Portfolio loans offer more flexible terms and can be useful for investors who have hit conventional loan limits (typically 10 financed properties) or have non-standard income situations.' },
  { term: 'Blanket Mortgage', slug: 'blanket-mortgage', category: 'financing', definition: 'A single mortgage that covers multiple properties. As properties are sold, a release clause removes them from the mortgage. Blanket mortgages simplify financing for portfolio investors but require all properties to serve as cross-collateral.' },
  { term: 'Real Estate Investment Trust (REIT)', slug: 'reit', category: 'general', definition: 'A company that owns, operates, or finances income-producing real estate and trades on stock exchanges like a stock. REITs must distribute at least 90% of taxable income as dividends, providing passive real estate exposure without direct property ownership.' },
  { term: 'Exchange Accommodation Titleholder (EAT)', slug: 'exchange-accommodation-titleholder', category: 'tax', definition: 'A third party that temporarily holds title to a replacement property in a reverse 1031 exchange, where the investor acquires the replacement property before selling the relinquished property. The EAT holds the property for up to 180 days.' },
  { term: 'Qualified Intermediary (QI)', slug: 'qualified-intermediary', category: 'tax', definition: 'A facilitator in a 1031 exchange who holds the sale proceeds from the relinquished property and uses them to acquire the replacement property. The investor cannot touch the funds directly — using a QI is required for a valid 1031 exchange.' },
  { term: 'Cap Rate Spread', slug: 'cap-rate-spread', category: 'analysis', definition: 'The difference between a property\'s cap rate and a risk-free benchmark (usually the 10-year Treasury yield). A wider spread suggests real estate is relatively attractive compared to bonds, while a narrow spread may indicate overvaluation.' },
  { term: 'Waterfall Distribution', slug: 'waterfall-distribution', category: 'general', definition: 'A profit-sharing structure in real estate partnerships and syndications where returns are distributed in tiers. Typically, limited partners receive a preferred return first, then profits are split between general and limited partners at increasing ratios as performance thresholds are met.' },
  { term: 'Preferred Return', slug: 'preferred-return', category: 'general', definition: 'A minimum return promised to limited partners in a syndication before the general partner receives any profit split. A typical preferred return is 6-8% annually. It\'s not guaranteed but is prioritized in the distribution waterfall.' },
]

async function seed() {
  // Fetch existing slugs to avoid duplicates
  const existing = await client.fetch(
    `*[_type == "glossaryTerm" && defined(slug.current)]{ "slug": slug.current }`
  )
  const existingSlugs = new Set(existing.map(t => t.slug))

  const termsToCreate = newTerms.filter(t => !existingSlugs.has(t.slug))

  if (termsToCreate.length === 0) {
    console.log('All terms already exist. Nothing to create.')
    return
  }

  console.log(`Found ${existingSlugs.size} existing terms.`)
  console.log(`Creating ${termsToCreate.length} new glossary terms...\n`)

  const transaction = client.transaction()

  for (const t of termsToCreate) {
    console.log(`  + ${t.term}`)
    transaction.create({
      _type: 'glossaryTerm',
      term: t.term,
      slug: { _type: 'slug', current: t.slug },
      definition: t.definition,
      category: t.category,
    })
  }

  console.log('\nCommitting...')
  const result = await transaction.commit()
  console.log(`Done! Created ${result.results.length} new glossary terms.`)
  console.log(`Total glossary: ${existingSlugs.size + termsToCreate.length} terms.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
