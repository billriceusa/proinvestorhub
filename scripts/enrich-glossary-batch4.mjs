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

/* ── Helper: build Portable Text blocks ─────────────────────────── */

let blockCounter = 0

function h2(slug, text) {
  blockCounter++
  return {
    _type: 'block',
    _key: `${slug}-b${blockCounter}`,
    style: 'h2',
    children: [{ _type: 'span', _key: `${slug}-s${blockCounter}`, text }],
  }
}

function p(slug, text) {
  blockCounter++
  return {
    _type: 'block',
    _key: `${slug}-b${blockCounter}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `${slug}-s${blockCounter}`, text }],
  }
}

/* ── Term content ───────────────────────────────────────────────── */

const termContent = {
  'appreciation': (s) => [
    h2(s, 'What Is Real Estate Appreciation?'),
    p(s, 'Appreciation is the increase in a property\'s value over time. It is one of the four wealth-building pillars of real estate investing alongside cash flow, mortgage paydown, and tax advantages. Understanding appreciation, and the difference between natural and forced appreciation, is critical for building a long-term investment strategy.'),
    h2(s, 'Natural vs Forced Appreciation'),
    p(s, 'Natural appreciation occurs when broad market forces push property values upward. Inflation, population growth, job market expansion, and limited housing supply all contribute to natural appreciation. Historically, U.S. residential real estate has appreciated at an average annual rate of 3-5% nationally, though this varies significantly by market. Coastal and high-growth metros often outpace this average, while rural or declining markets may see little to no natural appreciation.'),
    p(s, 'Forced appreciation is value you create through deliberate action. Renovating a dated kitchen, adding a bedroom, converting unused space into a rentable unit, or improving property management to increase net operating income are all forms of forced appreciation. Unlike natural appreciation, forced appreciation is within your control and does not depend on market conditions. For commercial and multi-family properties valued on income, increasing NOI by even a modest amount can produce outsized gains in property value.'),
    h2(s, 'How Leverage Amplifies Appreciation'),
    p(s, 'One of real estate\'s most powerful features is the ability to control a large asset with a relatively small amount of capital. If you put 20% down on a $200,000 property and it appreciates 5% in a year, the property gains $10,000 in value. But your actual cash invested was only $40,000, meaning your return on equity from appreciation alone is 25%. This 5x leverage effect is why even modest appreciation rates can produce outsized wealth over time.'),
    h2(s, 'Appreciation as an Investment Strategy'),
    p(s, 'While appreciation can be a tremendous wealth builder, experienced investors know that you should never buy a property banking solely on appreciation. Markets are cyclical, and properties can decline in value for years. The safest approach is to buy properties that cash flow from day one and treat appreciation as a bonus. Cash flow keeps you solvent during downturns while appreciation builds long-term wealth during upswings.'),
    p(s, 'Some markets are considered "appreciation markets" where values rise quickly but rental yields are thin, while others are "cash flow markets" where purchase prices are low relative to rents. Many successful investors balance their portfolio across both market types to capture appreciation upside while maintaining consistent cash flow.'),
    h2(s, 'Key Takeaways'),
    p(s, 'Appreciation is a powerful but unpredictable component of real estate returns. Focus on forced appreciation where you have control, use leverage wisely to amplify gains, and never rely on natural appreciation to make a deal work. Properties that cash flow on day one with appreciation upside represent the ideal investment profile.'),
  ],

  'cash-flow': (s) => [
    h2(s, 'What Is Cash Flow in Real Estate?'),
    p(s, 'Cash flow is the money left over after all property expenses are paid. It is the lifeblood of a rental property portfolio and the metric that separates sustainable investing from speculation. Positive cash flow means your property is paying you every month. Negative cash flow means you are subsidizing your tenants\' housing out of pocket.'),
    h2(s, 'The Cash Flow Formula'),
    p(s, 'The formula is straightforward: Gross Rental Income minus Vacancy Allowance minus Operating Expenses minus Debt Service equals Cash Flow. Gross rental income is the total rent collected. Vacancy allowance accounts for the months a unit sits empty, typically estimated at 5-10% of gross rent. Operating expenses include property taxes, insurance, maintenance, repairs, property management fees, utilities paid by the owner, landscaping, and reserves for capital expenditures. Debt service is your monthly mortgage payment including principal and interest.'),
    p(s, 'For example, a property renting for $1,500 per month with a 7% vacancy allowance, $500 in monthly operating expenses, and a $750 mortgage payment produces: $1,500 - $105 (vacancy) - $500 (expenses) - $750 (debt service) = $145 per month in cash flow.'),
    h2(s, 'Why Cash Flow Is King'),
    p(s, 'Cash flow is the only component of real estate returns that you can deposit in the bank today. Appreciation is unrealized until you sell or refinance. Mortgage paydown builds equity but is illiquid. Tax benefits reduce your obligation but are not income. Cash flow is real, tangible, and recurring. It pays the bills during vacancies, covers unexpected repairs, and funds your next acquisition.'),
    p(s, 'More importantly, positive cash flow protects you during downturns. Properties that cash flow can survive market corrections because income covers expenses regardless of what the property is worth on paper. Negatively cash-flowing properties become a liability when markets decline because you are losing money every month on an asset that is also declining in value.'),
    h2(s, 'Cash Flow vs Appreciation Markets'),
    p(s, 'Some markets, like the Midwest and Southeast, offer strong rental yields relative to purchase prices, making positive cash flow easier to achieve. These are considered cash flow markets. Other markets, like coastal California or New York, have high property values relative to rents, making positive cash flow nearly impossible without a large down payment. These appreciation markets rely on value increases for returns.'),
    p(s, 'Many investors target a minimum of $100-$200 per door per month in cash flow after all expenses. This threshold ensures the property is not just breaking even but actually producing meaningful income. On a per-unit basis, this translates to $1,200-$2,400 per year per door, which compounds significantly across a portfolio of 10, 20, or 50 units.'),
    h2(s, 'Protecting Your Cash Flow'),
    p(s, 'The biggest threats to cash flow are unexpected vacancies, deferred maintenance surprises, and underestimating operating expenses. Conservative underwriting with realistic vacancy assumptions, proper maintenance reserves, and thorough due diligence before purchase are the best defenses. Never trust a seller\'s pro forma without verifying actual income and expenses.'),
  ],

  'equity': (s) => [
    h2(s, 'What Is Equity in Real Estate?'),
    p(s, 'Equity is the difference between your property\'s current market value and the outstanding balance on your mortgage. If your property is worth $300,000 and you owe $200,000 on the mortgage, you have $100,000 in equity. Equity represents your ownership stake in the property and is one of the primary ways real estate builds wealth over time.'),
    h2(s, 'How Equity Builds'),
    p(s, 'Equity grows through three primary mechanisms. First, mortgage paydown occurs every month as your tenants\' rent pays down your loan balance. With a standard amortizing mortgage, each payment reduces the principal owed, slowly increasing your equity position. In the early years of a 30-year mortgage, most of each payment goes to interest, but over time an increasing share goes to principal.'),
    p(s, 'Second, natural appreciation increases your property\'s market value. If your $300,000 property appreciates 4% in a year, it is now worth $312,000, adding $12,000 in equity without any action on your part. Third, forced appreciation through renovations and improvements can create equity on an accelerated timeline. A $20,000 kitchen renovation that adds $40,000 in value creates $20,000 in equity instantly.'),
    h2(s, 'Accessing Your Equity'),
    p(s, 'Equity is only useful if you can access it. The three primary methods are a Home Equity Line of Credit (HELOC), a cash-out refinance, and a sale. A HELOC provides a revolving line of credit secured by the property, allowing you to draw funds as needed and pay them back over time. A cash-out refinance replaces your existing mortgage with a larger one, giving you the difference in cash. Selling the property converts all equity to cash but eliminates the income stream.'),
    p(s, 'Many investors use the BRRRR strategy (Buy, Rehab, Rent, Refinance, Repeat) to access equity created through forced appreciation. After renovating a property and increasing its value, they refinance to pull out their initial investment and redeploy that capital into the next deal.'),
    h2(s, 'The Equity vs Cash Flow Trade-Off'),
    p(s, 'There is an inherent tension between equity and cash flow. Paying down your mortgage faster builds equity but reduces cash flow. Refinancing to access equity increases your loan balance and monthly payment, reducing cash flow. Investing in higher-appreciation markets often means lower rental yields and thinner cash flow.'),
    p(s, 'Smart investors balance both. Early in your investing career, cash flow is critical because it provides financial stability and funds future acquisitions. As your portfolio matures and you have more properties producing income, equity becomes increasingly valuable as a tool for scaling through refinancing and leveraging into larger deals.'),
    h2(s, 'Key Takeaway'),
    p(s, 'Equity is your silent wealth builder. It grows automatically through tenant-funded mortgage paydown and market appreciation while you focus on cash flow. The most successful investors find ways to strategically access equity to accelerate portfolio growth without sacrificing the cash flow that keeps their business sustainable.'),
  ],

  'multi-family-property': (s) => [
    h2(s, 'What Is a Multi-Family Property?'),
    p(s, 'A multi-family property is any residential building with two or more separate housing units under one roof or on one parcel. This ranges from duplexes and triplexes to large apartment complexes with hundreds of units. For investors, the critical dividing line is between 1-4 units, which are classified as residential, and 5+ units, which are classified as commercial. This distinction affects financing, valuation, and management approach.'),
    h2(s, 'Residential Multi-Family: 2-4 Units'),
    p(s, 'Properties with 2-4 units qualify for residential financing, including FHA loans with as little as 3.5% down if you live in one of the units. This makes small multi-family properties the ideal entry point for new investors through house hacking. You live in one unit and rent out the others, often covering your entire mortgage payment with rental income. Conventional investment loans on 2-4 unit properties typically require 20-25% down.'),
    p(s, 'Duplexes, triplexes, and fourplexes are valued using comparable sales just like single-family homes, which means appraisals are based on what similar properties have sold for rather than income production. This can work in your favor if you find a property with below-market rents that you can increase after purchase.'),
    h2(s, 'Commercial Multi-Family: 5+ Units'),
    p(s, 'Properties with five or more units enter commercial territory. They are valued based on income using the cap rate formula (NOI / Cap Rate = Value), which means increasing income or reducing expenses directly increases property value. Commercial financing requires larger down payments (typically 25-30%), shorter loan terms (5-10 year balloons with 25-30 year amortization), and is underwritten based on the property\'s income rather than the borrower\'s personal income.'),
    h2(s, 'Economies of Scale'),
    p(s, 'Multi-family properties offer significant economies of scale compared to single-family rentals. One roof covers multiple units. One plumbing stack serves multiple kitchens. One property management visit handles multiple tenants. Marketing costs are spread across more units. This efficiency advantage grows with size, which is why per-unit operating costs tend to decline as properties get larger.'),
    h2(s, 'Price Per Unit Analysis'),
    p(s, 'When evaluating multi-family properties, price per unit is a quick comparison metric. A fourplex at $400,000 has a price per unit of $100,000, while a 10-unit building at $800,000 has a price per unit of $80,000. All else being equal, the lower price per unit offers more opportunity, though unit size, condition, and location must also be factored in. Comparing price per unit across similar properties in the same market quickly identifies potential deals.'),
    h2(s, 'Why Multi-Family Is Popular'),
    p(s, 'Multi-family investing is popular because it is easier to achieve positive cash flow than with single-family rentals. Multiple income streams from one property reduce vacancy risk since one vacant unit does not eliminate 100% of your income. Scaling is faster because acquiring one 8-unit building is more efficient than buying eight individual houses. For these reasons, many investors start with small multi-family properties and scale into larger commercial multi-family as their experience and capital grow.'),
  ],

  'single-family-rental': (s) => [
    h2(s, 'What Is a Single-Family Rental?'),
    p(s, 'A single-family rental, commonly abbreviated SFR, is a detached single-family home purchased as an investment property and leased to tenants. SFRs represent the largest segment of the rental housing market in the United States and are the most common starting point for new real estate investors. Their familiarity, straightforward financing, and broad market appeal make them an accessible entry point into rental property investing.'),
    h2(s, 'Advantages of Single-Family Rentals'),
    p(s, 'SFRs typically appreciate faster than multi-family properties because their buyer pool is larger. When you sell, your potential buyers include both investors and homeowners, which creates more competition and higher sale prices. SFRs also tend to attract longer-term tenants, particularly families with children who value school districts, yard space, and neighborhood stability. Tenant turnover is a major expense in rental investing, so longer average tenancy directly improves returns.'),
    p(s, 'Management is simpler with SFRs. Each property has one tenant, one lease, and one set of systems to maintain. There are no shared walls, common areas, or disputes between neighboring tenants. Financing is also more straightforward with conventional residential loans available at competitive rates with 20-25% down for investment properties.'),
    h2(s, 'Disadvantages of Single-Family Rentals'),
    p(s, 'The most significant disadvantage of SFRs is the lack of economy of scale. Each property requires its own roof, HVAC system, water heater, and maintenance schedule. There is no efficiency gained by having multiple units under one roof. Portfolio growth means acquiring and managing properties across multiple locations, which increases complexity.'),
    p(s, 'The other major drawback is binary vacancy risk. When your SFR is vacant, you are earning zero income while still paying the mortgage, taxes, and insurance. A duplex or fourplex with one vacancy still generates income from the occupied units. With an SFR, one vacancy equals 100% vacancy.'),
    h2(s, 'SFR vs Multi-Family Comparison'),
    p(s, 'Choosing between SFRs and multi-family properties depends on your goals and market. SFRs excel in appreciation, tenant quality, and exit flexibility. Multi-family properties win on cash flow, vacancy protection, and scalability. Many experienced investors hold both, using SFRs in high-appreciation markets and multi-family in cash flow markets.'),
    p(s, 'For new investors, SFRs offer a gentler learning curve. You can start with a single property, learn property management fundamentals, and use that experience to scale into multi-family or commercial properties. The key is to run every SFR purchase through the same rigorous analysis you would apply to any investment, ensuring positive cash flow after all expenses including vacancy reserves, maintenance, and capital expenditures.'),
    h2(s, 'Key Considerations'),
    p(s, 'When investing in SFRs, focus on markets with strong job growth, population growth, and landlord-friendly regulations. Evaluate properties on a price-to-rent ratio basis and ensure each deal meets your minimum cash flow threshold. Build a reliable team including a property manager, contractor, and real estate agent who understands investor needs. A well-selected SFR in a growing market can deliver consistent returns for decades.'),
  ],

  'commercial-real-estate': (s) => [
    h2(s, 'What Is Commercial Real Estate?'),
    p(s, 'Commercial real estate encompasses properties used for business purposes or any residential property with five or more units. The major categories include multi-family apartments, office buildings, retail centers, industrial warehouses, and special-purpose properties like hotels and self-storage facilities. Commercial real estate operates under fundamentally different rules than residential investing, with distinct valuation methods, financing structures, and risk profiles.'),
    h2(s, 'Income-Based Valuation'),
    p(s, 'The most important distinction is valuation. While residential properties are valued by comparable sales, commercial properties are valued on income using the formula: Property Value = Net Operating Income / Capitalization Rate. This means increasing a property\'s NOI directly increases its value. If a property produces $100,000 in NOI and the market cap rate is 8%, the property is worth $1,250,000. Increase the NOI to $120,000 and the value jumps to $1,500,000. This direct link between income and value is what makes commercial real estate so powerful for value-add investors.'),
    h2(s, 'Commercial Financing'),
    p(s, 'Commercial loans differ from residential mortgages in several key ways. Down payments are typically 25-30% or higher. Loan terms are shorter, often 5, 7, or 10 years with a balloon payment at maturity, even though the amortization schedule may be 25-30 years. Interest rates may be higher, and the property\'s income is the primary underwriting factor rather than the borrower\'s personal income. This means strong-performing properties can be easier to finance than residential properties for investors with limited W-2 income.'),
    h2(s, 'Triple Net Leases'),
    p(s, 'In commercial real estate, triple net (NNN) leases shift nearly all operating expenses to the tenant, including property taxes, insurance, and maintenance. NNN-leased properties are among the most passive real estate investments available. The tenant runs and maintains the building while the landlord collects rent. The creditworthiness of the tenant is paramount in NNN investing since a Walgreens or McDonald\'s-backed lease carries far less risk than a local business.'),
    h2(s, 'Risk Profile'),
    p(s, 'Commercial real estate carries a different risk profile than residential. Vacancy periods tend to be longer since finding commercial tenants takes more time than residential ones. Economic downturns can hit commercial tenants harder, leading to business closures and lease defaults. The higher capital requirements mean larger losses on deals that go wrong. However, the professional nature of commercial tenants, longer lease terms (5-10+ years), and income-based valuation create opportunities for sophisticated investors to build significant wealth.'),
    h2(s, 'Getting Started in Commercial'),
    p(s, 'Most investors transition into commercial real estate after building experience with residential properties. Starting with small multi-family properties of 5-20 units is the most common path. This provides exposure to commercial financing, income-based valuation, and professional property management while keeping deal sizes manageable. As your experience and investor network grow, you can scale into larger apartments, retail, or industrial properties.'),
  ],

  'mixed-use-property': (s) => [
    h2(s, 'What Is a Mixed-Use Property?'),
    p(s, 'A mixed-use property combines two or more types of use within a single building or development, most commonly residential units above ground-floor commercial space. Think of an apartment building with a coffee shop and dry cleaner on the street level, or a row of townhomes with retail storefronts at ground level. Mixed-use properties are common in urban areas, walkable neighborhoods, and downtown districts.'),
    h2(s, 'Diversified Income Streams'),
    p(s, 'The primary advantage of mixed-use properties is income diversification. When retail vacancies rise during economic downturns, residential demand often remains stable because people always need housing. Conversely, during residential market softness, established commercial tenants on long-term leases provide reliable income. This diversification can smooth out overall portfolio volatility and reduce the risk of total income loss.'),
    p(s, 'Commercial tenants on the ground floor typically pay higher per-square-foot rents than residential tenants above, which can boost overall property returns. Commercial leases are also typically longer, ranging from 3 to 10 years compared to one-year residential leases, providing more predictable income.'),
    h2(s, 'Financing Considerations'),
    p(s, 'Financing mixed-use properties can be more complex than single-use properties. If the property is majority residential by square footage or unit count, some lenders will underwrite it as a residential property. If it is majority commercial, commercial financing terms apply. Some lenders specialize in mixed-use and offer programs that account for both income streams. Interest rates, down payment requirements, and loan terms depend on the property\'s composition and the lender\'s classification.'),
    h2(s, 'Zoning Requirements'),
    p(s, 'Zoning is the most critical factor in mixed-use investing. Not all areas permit mixed-use development, and where it is allowed, specific zoning designations dictate what commercial uses are permitted, parking requirements, signage rules, and density limitations. Always verify zoning before purchasing. A property in a mixed-use zone has significantly different development rights and value than an identical structure in a purely residential zone.'),
    h2(s, 'Management Complexity'),
    p(s, 'Managing mixed-use properties requires competence in both residential and commercial property management, which are distinct skill sets. Residential tenants have different legal protections, lease structures, and expectations than commercial tenants. Many mixed-use property owners hire property managers experienced in both sectors or use separate managers for the residential and commercial components.'),
    h2(s, 'Investor Opportunity'),
    p(s, 'Mixed-use properties appeal to investors seeking diversification within a single asset. They are often found in gentrifying neighborhoods where rising foot traffic benefits ground-floor businesses while improving residential desirability. The combination of commercial cash flow with residential appreciation potential makes mixed-use a compelling strategy for investors comfortable with the added complexity.'),
  ],

  'class-a-property': (s) => [
    h2(s, 'What Is a Class A Property?'),
    p(s, 'Class A properties represent the highest tier in real estate quality classification. These are the newest buildings in the best locations with the finest construction, modern amenities, and premium finishes. In multi-family, think luxury apartment complexes with fitness centers, pools, and concierge services. In commercial, think LEED-certified office towers in central business districts. Class A properties attract the highest rents and the most creditworthy tenants.'),
    h2(s, 'Investment Characteristics'),
    p(s, 'Class A properties offer the lowest risk profile in real estate. Vacancy rates are typically the lowest in their market because the quality and location attract strong demand. Tenant turnover is minimal because the properties are desirable places to live or operate a business. Maintenance costs are low in the early years because everything is new. These factors combine to create stable, predictable income streams.'),
    p(s, 'The trade-off for this stability is lower returns. Class A properties command premium prices, resulting in the lowest cap rates in their market, often 4-6%. Cash flow is thin or nonexistent on a leveraged basis, meaning investors in Class A are primarily making an appreciation play. The high acquisition cost also means larger capital requirements and less room for error.'),
    h2(s, 'Who Invests in Class A'),
    p(s, 'Class A properties are the domain of institutional investors, REITs, pension funds, and high-net-worth individuals seeking capital preservation over yield. These buyers prioritize safety of principal and long-term appreciation over monthly cash flow. For individual investors, Class A properties are difficult to justify on a cash-flow basis, though they can serve as a portfolio anchor providing stability alongside higher-yielding Class B and C holdings.'),
    h2(s, 'Premium Rents and Low Vacancy'),
    p(s, 'Class A rents are the highest in their market, often 30-50% above Class B and 50-100% above Class C. This premium pricing limits the tenant pool to higher-income renters, which reduces the risk of payment default and property damage. Vacancy rates in Class A properties typically run 2-5%, well below market averages. The combination of high rents and low vacancy provides consistent top-line revenue.'),
    h2(s, 'When Class A Makes Sense'),
    p(s, 'Class A investments make sense for investors who prioritize capital preservation, have long time horizons, and do not need current income from their real estate holdings. They are appropriate in high-growth markets where appreciation potential is strong and for portfolios that already have sufficient cash flow from other holdings. If you need monthly income from your investments, Class A is generally not the right choice.'),
  ],

  'class-b-property': (s) => [
    h2(s, 'What Is a Class B Property?'),
    p(s, 'Class B properties sit in the middle of the real estate quality spectrum. These are typically older properties, usually 10-30 years old, in solid but not premium locations. They are well-maintained and functional but lack the modern amenities and finishes of Class A. Think of a 1990s apartment complex that has been kept in good condition or a well-maintained office building in a suburban business park.'),
    h2(s, 'The Sweet Spot for Investors'),
    p(s, 'Class B properties are widely considered the sweet spot for real estate investors, and for good reason. They offer a compelling combination of moderate cash flow, reasonable appreciation potential, and value-add opportunity that is difficult to find in other property classes. Cap rates typically fall in the 6-9% range, providing enough spread over financing costs to generate positive cash flow while still offering meaningful appreciation upside.'),
    p(s, 'The tenant base for Class B properties is the largest segment of renters: working professionals, families, and small businesses. These tenants are generally reliable, take reasonable care of the property, and represent a deep pool that keeps vacancy manageable. Vacancy rates in Class B properties typically run 5-10%, higher than Class A but significantly lower than Class C.'),
    h2(s, 'Value-Add Opportunity'),
    p(s, 'The real power of Class B investing lies in value-add potential. Because these properties are older, there are almost always opportunities to increase value through strategic improvements. Updating kitchens and bathrooms, adding in-unit laundry, improving landscaping, or adding amenities like a dog park or package lockers can justify rent increases of $50-200 per unit per month. These renovations can transform a Class B property into a Class B+ or even Class A- asset at a fraction of the cost of buying Class A.'),
    p(s, 'For multi-family properties valued on income, these rent increases directly translate to higher property values. A $100/month rent increase across 20 units adds $24,000 in annual NOI, which at a 7% cap rate increases property value by approximately $343,000.'),
    h2(s, 'Risk-Adjusted Returns'),
    p(s, 'When measured on a risk-adjusted basis, Class B properties often deliver the best returns in real estate. They avoid the razor-thin margins and high acquisition costs of Class A while sidestepping the management headaches, high vacancy, and unpredictable capital expenditures of Class C. The moderate risk profile and solid return potential make Class B the workhorse asset class for building a sustainable rental portfolio.'),
    h2(s, 'Key Takeaway'),
    p(s, 'If you are building a rental portfolio focused on long-term wealth creation, Class B properties deserve the most attention. They offer the best balance of current income, appreciation potential, and value-add opportunity with a manageable risk profile. Most successful portfolio investors hold a core of Class B assets.'),
  ],

  'class-c-property': (s) => [
    h2(s, 'What Is a Class C Property?'),
    p(s, 'Class C properties are older buildings, typically 30+ years old, in less desirable locations. They may have deferred maintenance, outdated systems, and functional obsolescence. The surrounding neighborhoods tend to have lower median incomes, higher crime rates, and fewer amenities. In multi-family, think of a 1960s or 1970s apartment complex that has seen minimal updating. These properties are at the value end of the real estate spectrum.'),
    h2(s, 'Highest Cap Rates'),
    p(s, 'Class C properties offer the highest cap rates in their market, often 8-12% or more. This elevated yield reflects the higher risk associated with these assets. The large spread between cap rate and financing costs can produce strong cash flow on paper, which attracts investors seeking high current income. However, the gap between projected and actual cash flow is often wider with Class C properties due to the higher incidence of vacancy, collection loss, and unexpected maintenance costs.'),
    h2(s, 'Management Intensity'),
    p(s, 'Class C properties are significantly more management intensive than Class A or B. Tenant turnover is higher, and the turnover process is more expensive due to greater wear and damage. Collection issues are more frequent, requiring more aggressive accounts receivable management. Maintenance requests are more common because older systems break down more often. Crime and liability concerns may require additional security measures. Professional property management is essential for Class C unless you are an experienced hands-on landlord.'),
    h2(s, 'Higher Vacancy and Maintenance'),
    p(s, 'Vacancy rates in Class C properties typically run 10-20%, sometimes higher. Finding quality tenants is more challenging because the tenant pool willing to live in Class C conditions and locations overlaps with the pool most likely to have credit issues, unstable employment, or problematic rental histories. Thorough tenant screening becomes even more critical. Maintenance and capital expenditure costs are also higher because older buildings have older roofs, plumbing, electrical, and HVAC systems that require more frequent repair and replacement.'),
    h2(s, 'Cash Flow Opportunity with Higher Risk'),
    p(s, 'The appeal of Class C investing is the high potential cash flow. Properties can be acquired at low price points, and even moderate rents produce strong yields relative to the investment. For experienced investors with strong management systems, Class C properties can be highly profitable. The key is accurate underwriting that accounts for the true costs of managing these assets, including realistic vacancy, maintenance, and capital expenditure assumptions.'),
    h2(s, 'Who Should Invest in Class C'),
    p(s, 'Class C investing is not for beginners. It requires deep management expertise, a high tolerance for hands-on problem solving, and sufficient cash reserves to handle the inevitable surprises. Investors who succeed with Class C typically have established property management teams, strong vendor relationships, and the operational discipline to enforce lease terms consistently. If you are just starting out, gain experience with Class B properties before venturing into Class C territory.'),
  ],

  'turnkey-property': (s) => [
    h2(s, 'What Is a Turnkey Property?'),
    p(s, 'A turnkey property is a fully renovated rental property sold with a tenant already in place and property management arranged. The buyer can start collecting rent immediately without dealing with renovations, tenant placement, or finding a manager. Turnkey companies typically acquire distressed properties, renovate them to rental-ready condition, place tenants, and then sell the packaged investment to out-of-state investors seeking passive income.'),
    h2(s, 'The Passive Entry Point'),
    p(s, 'Turnkey investing is the most passive way to own direct real estate. Everything is done for you: the renovation, the tenant, and the management. This makes turnkey properties attractive to busy professionals, out-of-state investors, and anyone who wants rental income without the time commitment of managing renovations and tenant placement. You can build a portfolio of turnkey rentals across multiple markets without visiting any of the properties.'),
    h2(s, 'The Premium Over DIY'),
    p(s, 'The convenience of turnkey comes at a cost. Turnkey properties are priced at a premium above what you would pay if you found, renovated, and tenanted the property yourself. The turnkey company earns its profit on the spread between their acquisition and renovation costs and the sale price to you. This premium typically ranges from 10-25% above DIY cost, which reduces your potential returns compared to a hands-on investor doing the same deal.'),
    p(s, 'Whether this premium is worth paying depends on your situation. If you lack the time, expertise, or local presence to execute a renovation and tenant placement, paying the turnkey premium may be a reasonable trade-off. Your time has value, and mistakes on a self-managed renovation can easily cost more than the turnkey premium.'),
    h2(s, 'Due Diligence on Turnkey Providers'),
    p(s, 'Not all turnkey companies are created equal, and the range of quality is enormous. The best providers deliver genuinely well-renovated properties with quality tenants and responsive property management. The worst cut corners on renovations, inflate rent projections, and provide poor ongoing management. Before investing with any turnkey provider, verify their track record by speaking with multiple current investors, inspect the quality of their renovations, review actual financial performance of properties they have sold, and research the property management company separately.'),
    h2(s, 'Out-of-State Investing Vehicle'),
    p(s, 'Turnkey investing is the primary vehicle for out-of-state real estate investing. Investors in high-cost markets like San Francisco or New York can access strong cash flow markets in the Midwest, Southeast, or Texas through turnkey providers. This geographic arbitrage allows you to invest where the numbers work while living where you choose. The key to success is building a strong relationship with a reputable turnkey provider and property manager in your target market.'),
    h2(s, 'Key Considerations'),
    p(s, 'Always run the numbers independently using conservative assumptions. Verify the actual market rent with a local property manager who is not affiliated with the turnkey company. Inspect the property or hire an independent inspector. Confirm the tenant\'s lease terms and payment history. Turnkey investing can be an excellent strategy for building passive income, but only when you perform the same level of due diligence you would apply to any real estate investment.'),
  ],

  'property-management': (s) => [
    h2(s, 'What Is Property Management?'),
    p(s, 'Property management is the operation, oversight, and day-to-day management of rental real estate on behalf of the owner. This includes tenant screening and placement, rent collection, maintenance coordination, lease enforcement, accounting, and legal compliance. Property management can be handled by the owner (self-management) or delegated to a professional property management company.'),
    h2(s, 'DIY vs Professional Management'),
    p(s, 'Self-managing your properties saves the management fee and gives you direct control over every decision. You choose the tenants, set the maintenance priorities, and handle issues personally. This hands-on approach builds deep operational knowledge that makes you a better investor. However, self-management requires significant time, availability for emergencies, and knowledge of landlord-tenant law.'),
    p(s, 'Professional management frees your time and provides expertise you may lack. Professional managers have established systems for screening, maintenance, and legal compliance. They handle the 2 AM emergency calls, the difficult tenant conversations, and the eviction process. The trade-off is cost and reduced control. A professional manager may not care for your property with the same attention you would.'),
    h2(s, 'Typical Property Management Fees'),
    p(s, 'Professional property managers typically charge 8-12% of collected rent as their monthly management fee. In addition, most charge a tenant placement fee equal to 50-100% of one month\'s rent for finding and placing new tenants. Some also charge fees for lease renewals, maintenance markups, eviction management, and other services. On a $1,500/month rental, expect to pay $120-$180 per month in management fees plus placement fees during turnover.'),
    h2(s, 'When to Hire a Property Manager'),
    p(s, 'Consider hiring a property manager when you own properties in distant markets, when your portfolio grows beyond what you can personally manage, when you value your time more than the management fee, or when dealing with difficult tenant situations that require legal expertise. Many investors self-manage their first 1-5 properties to learn the business and then transition to professional management as they scale.'),
    h2(s, 'What Good Property Managers Do'),
    p(s, 'A quality property manager earns their fee through thorough tenant screening that reduces vacancy and evictions, prompt maintenance response that preserves property value and tenant satisfaction, accurate financial reporting that keeps you informed, knowledge of local landlord-tenant law that keeps you compliant, and proactive communication about issues before they become problems. The best managers function as true partners in your investment business.'),
    h2(s, 'Self-Managing Your First Property'),
    p(s, 'Even if you plan to use professional management long-term, self-managing your first property teaches invaluable lessons. You will learn what good screening looks like, how maintenance costs add up, how to handle tenant communications, and what it takes to keep a rental profitable. This experience makes you a better judge of property managers and a more informed investor. Start with one property, build your systems, and scale from there.'),
  ],

  'tenant-screening': (s) => [
    h2(s, 'What Is Tenant Screening?'),
    p(s, 'Tenant screening is the process of evaluating prospective tenants to determine their suitability for your rental property. A thorough screening process examines credit history, criminal background, employment and income verification, rental history, and personal references. Effective screening is the single most impactful action a landlord can take to protect their investment. The cost of a bad tenant, including lost rent, property damage, legal fees, and turnover expenses, can easily reach $5,000 to $30,000 or more.'),
    h2(s, 'The Screening Process'),
    p(s, 'A comprehensive screening starts with a rental application that collects the applicant\'s personal information, employment details, income, rental history, and consent for background checks. From there, you or your screening service will pull a credit report, run a criminal background check, verify employment and income through pay stubs or employer contact, contact previous landlords for rental history, and check references.'),
    p(s, 'Credit checks reveal payment patterns, outstanding debts, collections, bankruptcies, and eviction records. Most landlords look for a minimum credit score of 600-650, though this varies by market and property class. More important than the score itself is the pattern: consistent on-time payments suggest a reliable tenant, while recent collections or missed payments are red flags.'),
    h2(s, 'Fair Housing Compliance'),
    p(s, 'Every aspect of your screening process must comply with the Fair Housing Act, which prohibits discrimination based on race, color, national origin, religion, sex, familial status, or disability. Many states and municipalities add additional protected classes. To stay compliant, establish written screening criteria before you begin receiving applications and apply those criteria consistently to every applicant. Document your decisions and the objective reasons behind them.'),
    h2(s, 'Red Flags to Watch For'),
    p(s, 'Frequent moves with no clear explanation, gaps in rental history, reluctance to provide previous landlord contacts, income that does not meet your minimum threshold (typically 3x monthly rent), recent evictions, and inconsistencies between the application and verification results are all warning signs. Trust the data over your gut feeling. Many landlords have been burned by applicants who seemed great in person but had disqualifying backgrounds.'),
    h2(s, 'Screening Criteria and Consistency'),
    p(s, 'Establish clear, objective screening criteria before you begin the process. Common standards include minimum credit score, minimum income relative to rent (3x is standard), no evictions in the past 5-7 years, no relevant criminal convictions, and positive landlord references. Apply these criteria identically to every applicant. Consistency protects you legally and ensures you are selecting the best tenants based on objective qualifications rather than subjective impressions.'),
    h2(s, 'The Cost of Cutting Corners'),
    p(s, 'Skipping or rushing tenant screening is the most expensive mistake a landlord can make. A bad tenant can cost months of lost rent during the eviction process, thousands in property damage, legal fees, and the opportunity cost of having a non-performing unit in your portfolio. Spending $30-50 on a thorough screening is the highest-return investment in rental property ownership. Never let the pressure of a vacant unit push you into placing an unqualified tenant.'),
  ],

  'capex': (s) => [
    h2(s, 'What Are Capital Expenditures?'),
    p(s, 'Capital expenditures, commonly called capex, are major expenses that improve or replace a significant component of a property. Unlike routine maintenance that keeps things running day to day, capex addresses the large-ticket items that wear out over time and must eventually be replaced. Roofs, HVAC systems, water heaters, flooring, appliances, parking lots, and siding are all examples of capital expenditures. Understanding and planning for capex is essential for accurate investment analysis and long-term profitability.'),
    h2(s, 'Capex vs Maintenance'),
    p(s, 'The distinction between capex and maintenance matters for both financial planning and tax treatment. Routine maintenance includes things like patching a small roof leak, servicing an HVAC unit, or fixing a leaky faucet. These are ongoing operating expenses that are fully deductible in the year incurred. Capital expenditures are major replacements or improvements that extend the useful life of the property, such as replacing the entire roof, installing a new HVAC system, or renovating a kitchen. Capex is depreciated over its useful life rather than deducted immediately.'),
    h2(s, 'Capex Reserve Planning'),
    p(s, 'Smart investors set aside a portion of rental income each month to build a capex reserve fund. The standard recommendation is 5-10% of gross rent, with the higher end appropriate for older properties. On a property collecting $1,500 per month in rent, setting aside 8% means $120 per month or $1,440 per year going into your capex reserve. This fund ensures you have cash available when a major component fails.'),
    h2(s, 'Big Ticket Item Costs'),
    p(s, 'Knowing the approximate cost of major replacements helps you plan and budget. A roof replacement typically costs $8,000-$15,000 for a single-family home and lasts 20-30 years. HVAC replacement runs $5,000-$10,000 with a lifespan of 15-20 years. Water heaters cost $1,000-$2,000 and last 10-15 years. A full kitchen renovation runs $10,000-$25,000, while bathroom renovations cost $5,000-$15,000. Flooring replacement ranges from $3,000-$8,000 depending on material and square footage.'),
    h2(s, 'Capital Planning'),
    p(s, 'Before purchasing a property, assess the age and condition of every major component. A property with a 25-year-old roof, 18-year-old HVAC, and original water heater from 1998 is a capex time bomb. You could be facing $20,000-$30,000 in replacements within the first few years of ownership. Factor these upcoming costs into your purchase price negotiation and ensure your deal analysis accounts for them.'),
    p(s, 'Create a capital plan for each property that lists every major component, its current age, estimated remaining useful life, and projected replacement cost. This plan prevents surprises and allows you to budget systematically rather than reacting to emergencies. Review and update the plan annually as components age and costs change.'),
    h2(s, 'Impact on Deal Analysis'),
    p(s, 'Many new investors underestimate capex when analyzing deals, leading to disappointing returns. Always include a capex reserve line item in your cash flow projections. If a property looks profitable only when you ignore capex, it is not truly profitable. Real profitability accounts for the full cost of owning and maintaining the asset over time, including the inevitable replacement of major components.'),
  ],

  'deferred-maintenance': (s) => [
    h2(s, 'What Is Deferred Maintenance?'),
    p(s, 'Deferred maintenance refers to repair and upkeep tasks that have been postponed by the current owner. This can range from minor cosmetic issues like peeling paint and worn carpet to major structural concerns like a deteriorating roof, failing HVAC system, or plumbing problems. Deferred maintenance is both an opportunity and a risk for real estate investors, and the key to profiting from it is accurate assessment and budgeting.'),
    h2(s, 'Opportunity: Buying at a Discount'),
    p(s, 'Properties with significant deferred maintenance often sell at a discount because they are less attractive to owner-occupant buyers and less experienced investors. This discount creates opportunity for investors willing to tackle the needed repairs. If a property is worth $250,000 in good condition but has $30,000 in deferred maintenance, purchasing it for $200,000 creates $20,000 in instant equity after repairs. This is the foundation of the value-add investment strategy.'),
    p(s, 'Sellers who have deferred maintenance often lack the capital or motivation to make repairs, which means they may be motivated to negotiate on price. Identifying deferred maintenance items gives you concrete, quantifiable reasons to justify a lower offer. Every leaking faucet, cracked window, and worn-out appliance is a negotiation point.'),
    h2(s, 'Risk: Hidden Costs'),
    p(s, 'The risk of deferred maintenance lies in underestimating its scope and cost. What appears to be a simple plumbing fix can reveal corroded pipes throughout the building. A small roof leak may indicate widespread sheathing damage. Outdated electrical systems may require a complete rewire to meet current code. These hidden costs can quickly erode or eliminate the purchase discount you negotiated.'),
    h2(s, 'The Importance of Inspection'),
    p(s, 'A thorough property inspection by a qualified inspector is non-negotiable when buying properties with deferred maintenance. General home inspectors provide a broad overview, but specialized inspections for roofing, plumbing, electrical, foundation, and HVAC systems may be warranted depending on the property\'s condition. Walk the property with a contractor to get repair estimates before finalizing your purchase.'),
    h2(s, 'Budget 1.5-2x Your Estimates'),
    p(s, 'The most important rule when budgeting for deferred maintenance repairs is to multiply your initial estimate by 1.5 to 2 times. Renovation projects almost always cost more than expected due to hidden issues discovered during work, material price fluctuations, contractor change orders, and scope creep. If your contractor estimates $40,000 to address all deferred maintenance, budget $60,000-$80,000 and structure your deal to work at the higher number.'),
    h2(s, 'Negotiation Strategy'),
    p(s, 'Use deferred maintenance as a negotiation tool. Get detailed repair estimates from contractors and present them to the seller as justification for a price reduction. In many cases, sellers are aware of the issues and expect to negotiate. Frame your offer as fair by showing the math: after-repair value minus repair costs minus your required profit margin equals your offer price. This structured approach is more compelling than arbitrary lowball offers.'),
    h2(s, 'Key Takeaway'),
    p(s, 'Deferred maintenance is where experienced investors find some of their best deals. The combination of discounted purchase price and forced appreciation through repairs can create significant equity quickly. But success requires accurate assessment, conservative budgeting, and the ability to manage renovations effectively. Never buy a deferred maintenance property without a clear understanding of the full scope and cost of needed repairs.'),
  ],

  'net-lease': (s) => [
    h2(s, 'What Is a Net Lease?'),
    p(s, 'A net lease is a commercial lease structure in which the tenant pays some or all of the property\'s operating expenses in addition to base rent. Net leases shift financial responsibility from the landlord to the tenant, making them among the most passive forms of real estate investment. There are three tiers of net lease: single net (N), double net (NN), and triple net (NNN), each shifting progressively more expenses to the tenant.'),
    h2(s, 'The Three Net Lease Structures'),
    p(s, 'In a single net lease (N), the tenant pays base rent plus property taxes. The landlord remains responsible for insurance and maintenance. In a double net lease (NN), the tenant pays base rent plus property taxes and insurance. The landlord handles maintenance and structural repairs. In a triple net lease (NNN), the tenant pays base rent plus property taxes, insurance, and all maintenance costs. The landlord\'s only responsibility is structural integrity, and even that is sometimes passed to the tenant in an absolute NNN lease.'),
    h2(s, 'NNN: The Most Passive Investment'),
    p(s, 'Triple net leases are the gold standard for passive real estate investment. With the tenant covering taxes, insurance, and maintenance, the landlord\'s role is reduced to collecting rent and occasionally managing the building\'s structure. Many NNN investors describe their properties as "mailbox money" because their primary activity is depositing rent checks. This passivity makes NNN properties especially attractive to retirees, busy professionals, and investors seeking hands-off income.'),
    h2(s, 'Tenant Credit Quality'),
    p(s, 'In net lease investing, the creditworthiness of the tenant is paramount. A NNN lease is only as valuable as the tenant\'s ability and commitment to pay. Investment-grade tenants like national pharmacy chains, fast food franchisees, dollar stores, and medical practices backed by large health systems provide the most reliable income. The stronger the tenant\'s credit, the lower the risk, and correspondingly the lower the cap rate.'),
    p(s, 'Cap rates on NNN properties with investment-grade tenants typically range from 4-6%, while NNN properties with local or less creditworthy tenants may trade at 7-9%. The spread reflects the risk difference: a Walgreens-backed 15-year NNN lease is far more reliable than a local restaurant on a 5-year NNN lease.'),
    h2(s, 'Common in Commercial Real Estate'),
    p(s, 'Net leases are predominantly a commercial real estate structure. They are standard in retail, industrial, medical, and office properties. Residential leases are almost always gross leases where the landlord pays operating expenses. For investors transitioning from residential to commercial, understanding net lease structures is essential because they fundamentally change how you analyze and compare properties.'),
    h2(s, 'Investment Considerations'),
    p(s, 'When evaluating net lease properties, focus on tenant credit quality, lease term remaining, rent escalation clauses, and location. Longer lease terms with built-in annual rent increases provide the most predictable long-term income. Properties in strong locations with good demographics are easier to re-lease if the current tenant vacates. Net lease investing rewards patience and thorough due diligence with some of the most consistent and passive income in real estate.'),
  ],

  'section-8': (s) => [
    h2(s, 'What Is Section 8?'),
    p(s, 'Section 8, formally known as the Housing Choice Voucher Program, is a federal government program administered by local Public Housing Authorities that provides rental assistance to low-income families, the elderly, and people with disabilities. Under the program, the government pays a portion of the tenant\'s rent directly to the landlord, with the tenant responsible for the difference. For investors, Section 8 represents a unique opportunity with distinct advantages and challenges.'),
    h2(s, 'How Section 8 Works for Landlords'),
    p(s, 'To participate, landlords list their property with the local Housing Authority and agree to accept Section 8 tenants. The Housing Authority inspects the property to ensure it meets Housing Quality Standards (HQS). Once approved, the landlord signs a Housing Assistance Payment (HAP) contract. Each month, the Housing Authority pays its portion of the rent directly to the landlord via direct deposit, and the tenant pays their portion, which is typically 30% of their adjusted gross income.'),
    h2(s, 'Pros: Reliable Payment and Low Vacancy'),
    p(s, 'The government-guaranteed portion of rent is the primary attraction. This payment arrives reliably every month regardless of economic conditions. During recessions, when market-rate tenants may lose jobs and stop paying rent, Section 8 payments continue uninterrupted. Additionally, Section 8 waitlists in most areas are long, often years, which means tenants who receive vouchers tend to stay in place for extended periods to avoid losing their benefit. This combination of reliable payment and long tenancy can reduce both vacancy and collection risk.'),
    h2(s, 'Cons: Inspections and Payment Limits'),
    p(s, 'Section 8 properties must pass annual HQS inspections conducted by the Housing Authority. These inspections enforce standards for safety, sanitation, and habitability that may require repairs or upgrades beyond what a landlord would otherwise prioritize. Failing an inspection can result in payment suspension until issues are corrected. Additionally, Section 8 sets Fair Market Rent limits for each area, which may be below what you could charge on the open market in rapidly appreciating neighborhoods.'),
    h2(s, 'Tenant Quality Varies'),
    p(s, 'Section 8 tenants, like any tenant pool, range from excellent to problematic. The voucher program itself does not guarantee tenant quality. Some Section 8 tenants are responsible, long-term renters who take excellent care of the property. Others may cause significant damage or create management challenges. Thorough tenant screening is just as important for Section 8 applicants as for market-rate tenants. You can and should still check credit, criminal background, and rental history.'),
    h2(s, 'How to Participate'),
    p(s, 'Contact your local Public Housing Authority to learn about their landlord programs and Fair Market Rent levels. Ensure your property meets or can be brought to HQS standards. List your property with the Housing Authority and begin accepting applicants with vouchers. Many investors find that dedicating a portion of their portfolio to Section 8 provides a reliable income baseline while maintaining market-rate units for higher potential returns.'),
    h2(s, 'Is Section 8 Right for You?'),
    p(s, 'Section 8 works best for investors in Class B and C properties where market rents are at or near Fair Market Rent limits. In these properties, Section 8 provides guaranteed income without sacrificing rental rate. In Class A or high-rent markets, Section 8 payment limits may fall well below market rate, making the program less attractive. Evaluate the numbers for your specific market and property to determine if Section 8 participation makes financial sense.'),
  ],

  'appraisal': (s) => [
    h2(s, 'What Is a Real Estate Appraisal?'),
    p(s, 'An appraisal is a professional assessment of a property\'s market value conducted by a licensed appraiser. Lenders require appraisals before issuing mortgages to ensure the property is worth at least the loan amount. For investors, understanding how appraisals work is critical because appraisal values directly impact your ability to finance, refinance, and exit properties. The appraisal can make or break a deal, particularly in the BRRRR strategy.'),
    h2(s, 'Three Appraisal Approaches'),
    p(s, 'Appraisers use three primary methods to determine value. The sales comparison approach examines recent sales of similar properties in the area and adjusts for differences in size, condition, features, and location. This is the most common approach for residential properties. The income approach calculates value based on the property\'s income-producing capability, using net operating income and market cap rates. This is the most relevant approach for investment properties, particularly commercial and multi-family.'),
    p(s, 'The cost approach estimates the value by calculating the cost to rebuild the structure from scratch plus the land value, minus depreciation. This approach is used primarily for unique properties, new construction, and special-purpose buildings where comparable sales are limited.'),
    h2(s, 'The Income Approach for Investors'),
    p(s, 'For rental property investors, the income approach is the most important valuation method to understand. This approach values a property based on the income it generates, making it particularly relevant for multi-family and commercial properties. The appraiser examines the property\'s actual and market rents, vacancy rates, operating expenses, and net operating income to derive a value using market cap rates. If your property\'s income exceeds the market average, it should appraise higher. If it underperforms, it will appraise lower.'),
    h2(s, 'Appraisal Gap Risk'),
    p(s, 'An appraisal gap occurs when the appraised value comes in below the contracted purchase price. This is a common risk in competitive markets where bidding wars push prices above market value. When this happens, the lender will only loan based on the appraised value, leaving the buyer to cover the gap with additional cash or renegotiate the purchase price. Including an appraisal contingency in your purchase contract protects you by allowing you to walk away or renegotiate if the appraisal comes in low.'),
    h2(s, 'Challenging an Appraisal'),
    p(s, 'If you believe an appraisal is inaccurate, you can challenge it through a reconsideration of value (ROV) process. Provide the appraiser or lender with additional comparable sales that support a higher value, evidence of property improvements not captured in the appraisal, or corrections to factual errors. Challenges are most effective when you can present concrete data the appraiser may have missed, such as recently sold comparables or documented renovation costs.'),
    h2(s, 'Impact on BRRRR Refinance'),
    p(s, 'In the BRRRR strategy, the refinance appraisal is the most critical step. After buying a distressed property, renovating it, and renting it, you refinance based on the new appraised value to pull out your invested capital. If the property appraises at your target, you recover your capital and move to the next deal. If it appraises below your target, your capital remains trapped in the property. Before starting a BRRRR deal, research comparable sales thoroughly to ensure the after-repair value supports your refinance plan.'),
  ],

  'due-diligence': (s) => [
    h2(s, 'What Is Due Diligence?'),
    p(s, 'Due diligence is the comprehensive investigation of a property before completing a purchase. It is your opportunity to verify every assumption in your deal analysis, uncover hidden problems, and confirm that the investment meets your criteria. The due diligence period, typically 10-30 days after going under contract, is when you conduct inspections, review documents, and perform the research needed to make an informed buy-or-walk decision.'),
    h2(s, 'Property Inspection'),
    p(s, 'A professional property inspection is the foundation of due diligence. A qualified inspector examines the structure, roof, foundation, plumbing, electrical, HVAC, and major systems. For older properties or those with known issues, specialized inspections for foundation, sewer scope, mold, radon, or environmental hazards may be warranted. Never skip the inspection to save a few hundred dollars. The cost of discovering a $20,000 foundation problem after closing dwarfs the $400-600 inspection fee.'),
    h2(s, 'Title Search and Review'),
    p(s, 'The title search examines the property\'s ownership history to identify any liens, encumbrances, easements, or title defects that could affect your ownership. Tax liens, mechanic\'s liens, judgment liens, and unresolved claims from previous owners can all cloud the title. Title insurance protects you against undiscovered defects, but reviewing the title search results yourself or with an attorney ensures you understand what you are buying.'),
    h2(s, 'Rent Roll and Financial Verification'),
    p(s, 'For income-producing properties, verify the rent roll by reviewing actual leases, bank statements showing rent deposits, and tenant payment history. Sellers may inflate rents or omit problem tenants. Request at least 12 months of profit and loss statements and compare them against your own projections. Look for discrepancies between reported income and actual deposits, and between reported expenses and reasonable expectations for the property type and age.'),
    h2(s, 'Estoppel Certificates'),
    p(s, 'An estoppel certificate is a signed document from each tenant confirming the terms of their lease, including rent amount, security deposit, lease expiration, and any special agreements. Estoppels protect you from discovering after closing that the seller made verbal concessions or side deals with tenants that differ from the written lease. Always require estoppel certificates for multi-family acquisitions.'),
    h2(s, 'Environmental and Regulatory Review'),
    p(s, 'Depending on the property, environmental due diligence may include Phase I or Phase II environmental assessments to identify contamination. Zoning verification confirms the property\'s permitted uses. Building code compliance ensures there are no outstanding violations. Flood zone determination affects insurance requirements and costs. For commercial properties, ADA compliance should also be evaluated.'),
    h2(s, 'The Checklist Approach'),
    p(s, 'Develop a standardized due diligence checklist and use it for every acquisition. A systematic approach ensures you never overlook a critical item under the pressure of a tight timeline. Your checklist should cover physical inspection, financial verification, legal and title review, insurance, environmental, zoning, and market analysis. As you complete more transactions, refine your checklist based on lessons learned. Due diligence is your last line of defense before committing capital, so treat it with the rigor it deserves.'),
  ],

  'zoning': (s) => [
    h2(s, 'What Is Zoning?'),
    p(s, 'Zoning is the system of local government regulations that controls how land and buildings can be used within specific geographic areas. Zoning designations dictate whether a property can be used for residential, commercial, industrial, mixed-use, or agricultural purposes, along with specific rules about building height, density, setbacks, parking, and signage. For real estate investors, understanding zoning is essential because it determines what you can and cannot do with a property.'),
    h2(s, 'Common Zoning Classifications'),
    p(s, 'Residential zoning (R-1, R-2, R-3, etc.) designates land for housing, with different categories for single-family, multi-family, and high-density development. Commercial zoning (C-1, C-2, etc.) permits business activities including retail, office, and services. Industrial zoning (I-1, I-2) allows manufacturing, warehousing, and heavy commercial operations. Mixed-use zoning permits combinations of residential and commercial use within the same building or development. Agricultural zoning (A-1) designates land for farming and related activities.'),
    h2(s, 'Zoning Changes and Value Creation'),
    p(s, 'One of the most powerful value creation strategies in real estate is purchasing property in anticipation of or in conjunction with a zoning change. Land zoned agricultural that gets rezoned to residential can increase in value by 10x or more. A single-family parcel rezoned for multi-family development immediately becomes more valuable because it can support higher-density construction and greater income production. Savvy investors monitor municipal planning discussions and comprehensive plans to identify areas where zoning changes are likely.'),
    h2(s, 'Short-Term Rental Regulations'),
    p(s, 'Short-term rental zoning is one of the fastest-changing regulatory areas in real estate. Many municipalities have enacted restrictions or outright bans on Airbnb-style rentals in residential zones. Some require special permits, limit the number of days per year a property can be rented short-term, or restrict short-term rentals to owner-occupied properties. Always verify short-term rental regulations before purchasing a property intended for that use. Regulations can change after purchase, potentially eliminating your business model.'),
    h2(s, 'ADU Allowances'),
    p(s, 'Accessory Dwelling Units (ADUs) are secondary housing units on a single-family lot, such as converted garages, basement apartments, or backyard cottages. Many cities are expanding ADU allowances as a way to increase housing supply. Where permitted, ADUs can significantly increase a property\'s income and value. Check your local zoning code for ADU rules regarding size limits, owner-occupancy requirements, parking, and setbacks before planning an ADU project.'),
    h2(s, 'Always Check Before Buying'),
    p(s, 'Never purchase an investment property without verifying its zoning designation and understanding what uses are permitted. Contact the local planning or zoning department to confirm the current zoning, any pending changes, and any variances or conditional use permits associated with the property. A property\'s zoning determines its highest and best use, which ultimately determines its value. Making assumptions about zoning without verification is one of the most costly mistakes an investor can make.'),
  ],

  'earnest-money': (s) => [
    h2(s, 'What Is Earnest Money?'),
    p(s, 'Earnest money is a deposit made by a buyer when submitting an offer on a property to demonstrate serious intent to purchase. It signals to the seller that the buyer is committed and not simply tying up the property while shopping for alternatives. Earnest money is held by a neutral third party, typically a title company or escrow agent, and is applied toward the buyer\'s down payment or closing costs at closing.'),
    h2(s, 'How Much Earnest Money Is Expected'),
    p(s, 'Earnest money deposits typically range from 1-3% of the purchase price, though this varies by market and deal type. On a $200,000 property, expect to deposit $2,000-$6,000. In competitive markets, buyers may offer larger earnest money deposits to stand out and demonstrate stronger commitment. In softer markets, smaller deposits may be acceptable. The amount is negotiable between buyer and seller as part of the purchase agreement.'),
    h2(s, 'Held in Escrow'),
    p(s, 'Earnest money is not paid directly to the seller. It is deposited into an escrow account held by a neutral third party, usually the title company or the buyer\'s real estate attorney. The funds remain in escrow until closing, when they are applied to the purchase price. This arrangement protects both parties by ensuring the funds are available and properly accounted for throughout the transaction.'),
    h2(s, 'Forfeiture Risk'),
    p(s, 'If the buyer backs out of the deal without a valid contingency, the seller may be entitled to keep the earnest money as compensation for taking the property off the market. This is why contingencies in the purchase contract are critical. Financing, inspection, and appraisal contingencies give the buyer legal grounds to cancel the contract and recover their earnest money if specified conditions are not met. Without contingencies, walking away means losing your deposit.'),
    h2(s, 'Earnest Money as a Negotiation Tool'),
    p(s, 'A larger earnest money deposit can strengthen your offer in a competitive situation. It tells the seller you are financially committed and less likely to back out. Some investors use larger deposits strategically when competing against multiple offers, particularly when they are confident in the deal. Conversely, a very small earnest money deposit may signal to the seller that the buyer is not fully committed, potentially weakening the offer.'),
    h2(s, 'Protecting Your Deposit'),
    p(s, 'Always include appropriate contingencies in your purchase contract to protect your earnest money. Understand exactly what conditions allow you to cancel and recover your deposit, and be aware of the deadlines for exercising each contingency. If you need to cancel, do so in writing before the contingency deadline expires. Once a contingency period passes, your earnest money may become non-refundable. Work with a real estate attorney to ensure your contract adequately protects your deposit.'),
  ],

  'escrow': (s) => [
    h2(s, 'What Is Escrow?'),
    p(s, 'Escrow refers to a neutral third-party arrangement where funds or documents are held until specific conditions are met. In real estate, the term applies to two distinct contexts: transaction escrow during a property purchase, and mortgage escrow for ongoing tax and insurance payments. Understanding both types is essential for navigating real estate transactions and managing rental properties.'),
    h2(s, 'Transaction Escrow'),
    p(s, 'During a property purchase, an escrow agent or title company acts as a neutral intermediary between buyer and seller. The buyer\'s earnest money, the lender\'s loan funds, and the seller\'s deed are all held in escrow until all conditions of the sale are met. Once the buyer\'s financing is confirmed, inspections are complete, title is clear, and all documents are signed, the escrow agent disburses funds to the seller and records the deed, completing the transfer of ownership.'),
    p(s, 'The escrow process ensures neither party is disadvantaged during the transaction. The seller does not sign over the deed until they are assured of payment, and the buyer does not release funds until they are assured of clean title and satisfactory condition. The escrow agent\'s fiduciary duty is to both parties, making the process fair and transparent.'),
    h2(s, 'Mortgage Escrow'),
    p(s, 'After closing, most mortgage lenders require borrowers to pay a portion of annual property taxes and homeowner\'s insurance with each monthly mortgage payment. These funds are collected into a mortgage escrow account managed by the loan servicer. When tax and insurance bills come due, the servicer pays them from the escrow account. This protects the lender by ensuring that taxes and insurance are always paid, preventing tax liens and coverage lapses.'),
    h2(s, 'Escrow Analysis'),
    p(s, 'Lenders perform an annual escrow analysis to ensure the account balance is sufficient to cover upcoming tax and insurance payments. If property taxes or insurance premiums increase, your monthly escrow payment increases, which raises your total monthly mortgage payment. If there is a surplus, you may receive a refund. If there is a shortage, you will need to either pay a lump sum or accept a higher monthly payment to make up the difference.'),
    h2(s, 'Escrow for Investors'),
    p(s, 'As an investor with multiple properties, escrow accounts across several loans can tie up significant capital. Some loans allow you to waive escrow by paying a slightly higher interest rate or meeting certain equity thresholds, freeing you to manage tax and insurance payments yourself. This gives you more control over your cash flow but requires the discipline to set aside funds and pay bills on time. Missing a tax payment can result in penalties and even a tax lien sale.'),
    h2(s, 'Key Takeaway'),
    p(s, 'Escrow exists to manage risk and ensure smooth transactions for all parties. During a purchase, it protects both buyer and seller. During the life of a mortgage, it ensures critical bills are paid. Understanding how escrow works in both contexts helps you manage your investments more effectively and avoid surprises that can impact cash flow.'),
  ],

  'title-insurance': (s) => [
    h2(s, 'What Is Title Insurance?'),
    p(s, 'Title insurance is a form of indemnity insurance that protects real estate buyers and lenders against financial loss from defects in a property\'s title. Unlike most insurance that protects against future events, title insurance protects against past events: unknown liens, forged documents, errors in public records, undisclosed heirs, or other issues in the property\'s ownership history that could threaten your claim to ownership. Title insurance is purchased at closing with a one-time premium.'),
    h2(s, 'Owner\'s Policy vs Lender\'s Policy'),
    p(s, 'There are two types of title insurance. A lender\'s policy, also called a loan policy, protects the mortgage lender\'s interest in the property up to the loan amount. It is required by virtually all lenders as a condition of issuing a mortgage. An owner\'s policy protects the buyer\'s equity in the property and covers the full purchase price. While an owner\'s policy is optional, it is strongly recommended. If a title defect surfaces after closing, the owner\'s policy protects your investment; without it, you bear the full cost of defending or resolving the claim.'),
    h2(s, 'The Title Search Process'),
    p(s, 'Before issuing a policy, the title company conducts a thorough title search examining public records going back decades. The search traces the chain of ownership, identifies any recorded liens (tax liens, mechanic\'s liens, judgment liens), easements, encumbrances, and restrictions affecting the property. A clear title search means no issues were found, and the title company will issue the policy. If issues are discovered, they must be resolved before closing or listed as exceptions in the policy.'),
    h2(s, 'What Title Insurance Covers'),
    p(s, 'Title insurance covers a range of title defects including forgery and fraud in the chain of title, undisclosed or unknown heirs who may claim ownership, errors in public records, undisclosed liens from previous owners, boundary disputes, and missing documents or incorrect legal descriptions. If any of these issues arise after closing, the title insurance company will defend your ownership and cover financial losses up to the policy amount.'),
    h2(s, 'One-Time Premium'),
    p(s, 'Unlike other insurance types with annual premiums, title insurance is paid once at closing. The cost varies by state and property value but typically ranges from $500 to $3,500 for a residential property. Some states regulate title insurance rates while others allow competitive pricing. When buying multiple investment properties, these premiums add up, but the protection they provide against catastrophic title defects makes them a worthwhile investment.'),
    h2(s, 'Why Investors Need Title Insurance'),
    p(s, 'As a real estate investor, you are more likely to encounter title issues than a typical homebuyer because investment properties may have more complex ownership histories, previous investors who may have cut corners, or distressed sellers with unresolved financial obligations. Properties acquired through foreclosure, probate, or tax sale carry elevated title risk. Always purchase an owner\'s title insurance policy and review the title search results carefully before closing on any investment property.'),
  ],

  'closing-costs': (s) => [
    h2(s, 'What Are Closing Costs?'),
    p(s, 'Closing costs are the fees and expenses incurred by the buyer and seller to complete a real estate transaction, beyond the property\'s purchase price. For buyers, closing costs typically range from 2-5% of the purchase price. On a $200,000 investment property, expect $4,000-$10,000 in closing costs. These costs must be factored into your deal analysis because they increase your total capital outlay and reduce your return on investment.'),
    h2(s, 'Common Buyer Closing Costs'),
    p(s, 'Buyer closing costs include loan origination fees (0.5-1% of loan amount), appraisal fee ($400-700), credit report fee, title search and title insurance premiums, recording fees, attorney fees where required, survey costs, and prepaid items including property taxes, homeowner\'s insurance, and mortgage interest for the partial first month. Some costs are fixed regardless of purchase price while others scale with the loan amount or property value.'),
    h2(s, 'Origination and Discount Points'),
    p(s, 'Loan origination fees compensate the lender for processing the mortgage. Discount points are optional fees paid upfront to reduce the interest rate, where each point equals 1% of the loan amount. On a $160,000 loan, one point costs $1,600. Whether buying down the rate makes sense depends on how long you plan to hold the property and the break-even point between the upfront cost and monthly savings.'),
    h2(s, 'Prepaid Items'),
    p(s, 'Prepaid closing costs include items you would eventually pay anyway but must fund upfront. Property taxes are typically prorated based on the closing date. Homeowner\'s insurance must be paid for the first year at closing. If your mortgage includes an escrow account, the lender may require an initial escrow deposit of two or more months of taxes and insurance. These prepaids can add $2,000-$5,000 to your closing costs depending on local tax rates and insurance premiums.'),
    h2(s, 'Seller Concessions'),
    p(s, 'Seller concessions occur when the seller agrees to pay a portion of the buyer\'s closing costs, reducing the buyer\'s out-of-pocket expense. Concessions are common in buyer\'s markets and can be negotiated as part of the purchase contract. For investment properties, most conventional lenders allow seller concessions of up to 2% of the purchase price. Asking for concessions effectively reduces your total acquisition cost without changing the official purchase price.'),
    h2(s, 'Budgeting Closing Costs in Deal Analysis'),
    p(s, 'Always include closing costs in your deal analysis. Your true cost basis for the property is the purchase price plus closing costs plus any immediate repairs. Many new investors focus only on the down payment and are surprised by the additional thousands required at closing. For a $200,000 property with 25% down, you need $50,000 for the down payment plus $6,000-$10,000 for closing costs, meaning your total cash requirement is $56,000-$60,000 before any renovation costs.'),
    h2(s, 'Reducing Closing Costs'),
    p(s, 'You can reduce closing costs by shopping lenders for competitive origination fees, negotiating seller concessions, comparing title company pricing where permitted, and asking for lender credits in exchange for a slightly higher interest rate. Some investors build relationships with title companies that offer discounted rates for repeat customers. While you cannot eliminate closing costs entirely, strategic negotiation and comparison shopping can save thousands across a portfolio of acquisitions.'),
  ],

  'contingency': (s) => [
    h2(s, 'What Is a Contingency?'),
    p(s, 'A contingency is a condition written into a real estate purchase contract that must be satisfied before the sale can close. Contingencies protect the buyer by providing legal grounds to cancel the contract and recover earnest money if specific conditions are not met. The most common contingencies are financing, inspection, appraisal, and title contingencies. Together, they form your safety net during the purchase process.'),
    h2(s, 'Financing Contingency'),
    p(s, 'A financing contingency allows the buyer to cancel the contract if they are unable to secure the specified mortgage within a defined timeframe. If your loan application is denied or you cannot obtain financing at the terms outlined in the contract, this contingency lets you walk away with your earnest money intact. For investment property buyers, financing contingencies are especially important because investment loans have stricter underwriting standards and higher denial rates than primary residence mortgages.'),
    h2(s, 'Inspection Contingency'),
    p(s, 'The inspection contingency gives the buyer the right to have the property professionally inspected and to negotiate repairs, credits, or cancellation based on the findings. This is arguably the most important contingency for investors because it is your opportunity to uncover hidden defects, assess the property\'s true condition, and verify that your renovation budget is accurate. The inspection contingency typically includes a deadline by which inspections must be completed and requests submitted.'),
    h2(s, 'Appraisal Contingency'),
    p(s, 'An appraisal contingency allows the buyer to cancel or renegotiate if the appraised value comes in below the purchase price. Since lenders base loan amounts on appraised value, a low appraisal can leave the buyer responsible for covering the gap with additional cash. The appraisal contingency protects against this scenario by giving you the option to walk away or negotiate a price reduction.'),
    h2(s, 'Title Contingency'),
    p(s, 'A title contingency allows the buyer to cancel if the title search reveals unresolvable defects, liens, or encumbrances that prevent clear title transfer. While title issues are relatively rare, they can be deal-killers when they arise. Tax liens, mechanic\'s liens from previous renovations, boundary disputes, and unresolved claims from prior owners are all issues that a title contingency protects against.'),
    h2(s, 'Waiving Contingencies'),
    p(s, 'In competitive markets with multiple offers, buyers sometimes waive contingencies to make their offer more attractive to sellers. A non-contingent offer is more appealing because it reduces the risk of the deal falling through. However, waiving contingencies transfers all risk to the buyer. Waiving the inspection contingency means you accept the property as-is. Waiving the financing contingency means you forfeit earnest money if your loan falls through. Waiving the appraisal contingency means you cover any gap between appraised value and purchase price.'),
    h2(s, 'Risk vs Reward of Waiving'),
    p(s, 'Some experienced investors strategically waive contingencies on deals where the risk is manageable and the potential reward justifies it. For example, waiving the inspection contingency on a property you have already walked with a contractor and assessed thoroughly carries less risk than waiving it on a property you have only seen photos of. The key is understanding exactly what risk you are assuming and ensuring you have the financial reserves to absorb worst-case scenarios. Never waive contingencies on your first few deals while you are still building your evaluation skills.'),
  ],

  'leverage': (s) => [
    h2(s, 'What Is Leverage in Real Estate?'),
    p(s, 'Leverage is the use of borrowed money to increase the potential return on an investment. In real estate, leverage means using a mortgage to control a property worth far more than the cash you invest. When you put 25% down on a $200,000 property, you are using 4:1 leverage, controlling $200,000 in real estate with $50,000 of your own money. This amplification effect is one of real estate\'s most powerful wealth-building mechanisms.'),
    h2(s, 'Using Other People\'s Money'),
    p(s, 'The concept of OPM, other people\'s money, is central to real estate investing. Your mortgage is funded by depositors at a bank. Your tenants\' rent payments service that mortgage. Over time, your tenants are effectively buying the property for you while you retain the equity, appreciation, and tax benefits. This is why real estate has created more millionaires than any other asset class. No other investment allows you to use this level of leverage with this stability.'),
    h2(s, 'Amplification Works Both Ways'),
    p(s, 'Leverage amplifies gains, but it equally amplifies losses. If your $200,000 property appreciates 10%, you gain $20,000 on your $50,000 investment, a 40% return. But if the property declines 10%, you lose $20,000 on your $50,000 investment, a 40% loss. If the property declines 25%, your entire $50,000 equity is wiped out. This is how investors got into trouble during the 2008 financial crisis, overleveraged properties lost value, rents declined, and investors could not cover their mortgage payments.'),
    h2(s, 'Positive Leverage vs Negative Leverage'),
    p(s, 'Positive leverage occurs when the return on the property exceeds the cost of borrowing. If your property yields 8% and your mortgage rate is 6%, you earn a positive spread on the borrowed portion. Negative leverage occurs when borrowing costs exceed the property\'s return. If your property yields 5% but your mortgage costs 7%, you are paying more for the borrowed money than it earns, which drags down your overall return. Always verify that a deal produces positive leverage before committing.'),
    h2(s, 'Appropriate Leverage Levels'),
    p(s, 'Conservative investors typically use 70-80% leverage (20-30% down), which provides meaningful amplification while maintaining a sufficient equity cushion to weather market fluctuations. More aggressive investors may push to 90-95% leverage through strategies like house hacking with FHA loans, but this leaves very little margin for error. The right leverage level depends on your risk tolerance, cash reserves, and the stability of the property\'s income stream.'),
    p(s, 'As a general rule, start with moderate leverage on your first few properties and only increase it as your experience, cash reserves, and portfolio stability grow. Having multiple properties with conservative leverage is safer and more sustainable than having one or two properties leveraged to the maximum.'),
    h2(s, 'Key Takeaway'),
    p(s, 'Leverage is the engine that makes real estate investing accessible and powerful. Used wisely, it allows you to build a portfolio that would be impossible with cash alone. Used recklessly, it can devastate your finances. The discipline of maintaining positive leverage, adequate reserves, and conservative loan-to-value ratios is what separates successful long-term investors from those who get wiped out in the next downturn.'),
  ],

  'cash-reserve': (s) => [
    h2(s, 'What Are Cash Reserves?'),
    p(s, 'Cash reserves are liquid funds set aside to cover unexpected expenses, vacancies, and capital expenditures across your rental portfolio. They are your financial safety net, the buffer between a temporary setback and a financial crisis. Without adequate reserves, a single vacancy, major repair, or combination of both can force you to sell a property at a loss, miss mortgage payments, or go into personal debt to cover investment expenses.'),
    h2(s, 'How Much Is Enough'),
    p(s, 'The standard recommendation is 3-6 months of total expenses per property, including mortgage payment, taxes, insurance, and average maintenance costs. For a property with $1,500 in monthly expenses, this means $4,500-$9,000 in reserves. More conservative investors maintain 6-12 months of reserves, particularly for Class C properties or properties with older systems that may require expensive repairs. The right amount depends on the property\'s age, condition, tenant stability, and your overall financial situation.'),
    h2(s, 'Lender Requirements'),
    p(s, 'Most lenders require investment property borrowers to demonstrate cash reserves at closing, typically 2-6 months of mortgage payments per property. As you acquire more properties, the cumulative reserve requirement grows. A portfolio of five properties with $1,200 monthly payments each requires $12,000-$36,000 in verified reserves just to satisfy lender requirements. These reserves must be in liquid accounts such as checking, savings, or money market funds. Retirement accounts may count at a discounted value.'),
    h2(s, 'Emergency Fund vs Opportunity Fund'),
    p(s, 'Sophisticated investors maintain two separate reserve pools. The emergency fund covers unexpected costs like major repairs, legal fees, and extended vacancies. This money should never be invested or deployed; it exists solely as insurance against disaster. The opportunity fund is capital set aside for acquiring deals that arise unexpectedly, such as a motivated seller offering a below-market price with a tight closing deadline. Keeping these funds separate prevents the temptation of raiding your safety net for acquisitions.'),
    h2(s, 'Replenishment Strategy'),
    p(s, 'When you draw from reserves for an emergency, replenishing them should be your top priority before making any new acquisitions. Direct a fixed percentage of monthly cash flow, typically 5-10%, back into your reserve account until it reaches your target level. Some investors automate this by setting up a separate savings account for each property with automatic transfers from the rent deposit account. The discipline of consistent replenishment ensures your reserves are always funded when you need them.'),
    h2(s, 'Reserves and Portfolio Growth'),
    p(s, 'Cash reserves are often the limiting factor in portfolio growth. Each new property requires additional reserves, which means you cannot deploy all of your available capital into down payments. A common mistake among aggressive investors is stretching their reserves too thin across too many properties, leaving them vulnerable to a single bad month. Grow your portfolio at a pace that allows your reserve fund to keep up, and you will build a portfolio that can weather any storm.'),
  ],

  'reit': (s) => [
    h2(s, 'What Is a REIT?'),
    p(s, 'A Real Estate Investment Trust (REIT) is a company that owns, operates, or finances income-producing real estate. REITs allow individual investors to earn dividends from real estate investments without buying, managing, or financing properties themselves. To qualify as a REIT, a company must distribute at least 90% of its taxable income to shareholders as dividends, which is why REITs typically offer attractive yields.'),
    h2(s, 'Public vs Private REITs'),
    p(s, 'Publicly traded REITs are listed on stock exchanges and can be bought and sold like any stock. They offer complete liquidity, meaning you can sell your shares at market price on any trading day. Private REITs, also called non-traded REITs, are not listed on exchanges and have limited liquidity. Investors typically must hold for a defined period, often 5-10 years. Private REITs may offer higher yields and less market volatility because they are not subject to daily stock market fluctuations, but they carry higher risk due to illiquidity and less regulatory oversight.'),
    h2(s, 'Liquid Real Estate Exposure'),
    p(s, 'The primary advantage of publicly traded REITs is liquidity. Buying and selling direct real estate takes weeks or months, involves significant transaction costs, and requires large capital commitments. With REITs, you can gain or exit real estate exposure in seconds with minimal transaction costs. This makes REITs suitable for investors who want real estate in their portfolio but value liquidity, diversification, and simplicity over the control and tax benefits of direct ownership.'),
    h2(s, 'Dividend Yields'),
    p(s, 'REIT dividend yields typically range from 4-8%, with some specialty and high-yield REITs paying even more. These yields are competitive with many direct real estate investments and significantly higher than most bonds and savings accounts. However, REIT dividends are generally taxed as ordinary income rather than at the lower qualified dividend rate, which reduces the after-tax return. The 90% distribution requirement ensures consistent dividend payments but limits the company\'s ability to retain earnings for growth.'),
    h2(s, 'REITs vs Direct Ownership'),
    p(s, 'REITs and direct property ownership are complementary strategies, not competitors. Direct ownership offers control, tax advantages like depreciation, and the ability to use leverage and force appreciation. REITs offer liquidity, diversification, professional management, and no minimum investment. Many successful real estate investors hold both: direct properties for cash flow, tax benefits, and wealth building, alongside REITs for liquid diversification and passive income.'),
    h2(s, 'Types of REITs'),
    p(s, 'REITs span every sector of real estate. Equity REITs own and operate properties, earning revenue from rents. Mortgage REITs (mREITs) invest in mortgage-backed securities and earn income from interest. There are REITs specializing in apartments, offices, retail, industrial, healthcare, data centers, cell towers, self-storage, and timber. This variety allows investors to target specific real estate sectors based on their market outlook and income goals.'),
    h2(s, 'Key Consideration'),
    p(s, 'While REITs provide real estate exposure, they behave more like stocks than direct real estate in the short term. Publicly traded REIT prices fluctuate with the stock market, meaning they can decline 20-30% in a market crash even if the underlying real estate values are stable. If you need the inflation hedge and stability of real estate, direct ownership is more reliable. If you need liquidity and diversification, REITs fill that role effectively.'),
  ],

  'waterfall-distribution': (s) => [
    h2(s, 'What Is a Waterfall Distribution?'),
    p(s, 'A waterfall distribution is a structured method for allocating profits in a real estate partnership or syndication. Profits flow through a series of tiers, like water cascading over multiple levels of a waterfall. Each tier has different allocation percentages between the limited partners (LPs, who provide capital) and the general partner (GP, who manages the deal). The structure is designed to align interests by rewarding the GP more as returns exceed certain thresholds.'),
    h2(s, 'Typical Waterfall Structure'),
    p(s, 'A common waterfall has three to four tiers. The first tier is the preferred return, where all distributions go to LPs until they have received a specified annual return on their invested capital, typically 6-8%. The second tier is the catch-up, where the GP receives a disproportionate share of distributions until they have caught up to a specified percentage of total profits. The third and subsequent tiers split remaining profits between LPs and GPs at predetermined ratios that become increasingly favorable to the GP as returns climb higher.'),
    h2(s, 'Example Waterfall'),
    p(s, 'Consider this example: 8% preferred return to LPs, then a GP catch-up to achieve a 70/30 LP/GP overall split, then 70/30 LP/GP split on profits up to 15% IRR, then 50/50 LP/GP on all profits above 15% IRR. If the deal generates a 20% IRR, the GP earns significantly more than if the deal only achieves a 10% IRR. This structure incentivizes the GP to maximize returns because their compensation accelerates at higher performance levels.'),
    h2(s, 'Alignment of Interests'),
    p(s, 'The waterfall structure aligns GP and LP interests in several ways. The preferred return ensures LPs receive a minimum return before the GP earns any profit share, protecting LP capital from underperforming deals. The escalating GP share at higher tiers incentivizes the GP to outperform because their economic benefit increases meaningfully with better results. If the deal performs poorly, the GP earns little or nothing. If it performs exceptionally, the GP is well compensated. This alignment is the foundation of a fair syndication.'),
    h2(s, 'Negotiate the Terms'),
    p(s, 'As a passive investor (LP), understanding the waterfall is essential for evaluating syndication deals. Key terms to scrutinize include the preferred return percentage, whether it is cumulative (unpaid preferred amounts carry forward) or non-cumulative, the profit split ratios at each tier, the IRR hurdles that trigger tier changes, and whether the GP has a capital contribution. Not all waterfalls are created equal, and the difference between a 70/30 and 60/40 split can represent tens of thousands of dollars on a meaningful investment.'),
    h2(s, 'Common Pitfalls'),
    p(s, 'Watch for waterfall structures that appear investor-friendly but contain provisions that shift economics toward the GP. Asset management fees, disposition fees, refinance fees, and promote calculations based on equity multiples rather than IRR can all reduce LP returns. The best syndication sponsors are transparent about their fee structure and can clearly explain how they make money at various performance levels. If you do not fully understand the waterfall, do not invest until you do.'),
    h2(s, 'Key Takeaway'),
    p(s, 'Waterfall distributions are the economic engine of real estate syndications. They determine how profits are shared between the people who provide the capital and the people who manage the deal. As an LP, your returns are directly determined by the waterfall terms, so understanding, evaluating, and negotiating these terms is as important as evaluating the property itself.'),
  ],

  'preferred-return': (s) => [
    h2(s, 'What Is a Preferred Return?'),
    p(s, 'A preferred return is the minimum annualized return that limited partners (LPs) must receive before the general partner (GP) earns any profit share or carried interest. It is the first tier in a waterfall distribution and serves as a baseline return on invested capital. Preferred returns in real estate syndications typically range from 6-8% annually, though they can be higher or lower depending on deal risk, market conditions, and the GP\'s track record.'),
    h2(s, 'How Preferred Return Works'),
    p(s, 'When a syndication generates distributable cash flow, the preferred return is paid first. For example, if you invest $100,000 in a syndication with an 8% preferred return, the first $8,000 in annual distributions goes to you before the GP receives any profit share. If the deal generates $10,000 attributable to your investment, you receive your $8,000 preferred return, and the remaining $2,000 is split according to the waterfall structure. If the deal generates only $6,000, you receive all $6,000 and the GP receives nothing from the profit share.'),
    h2(s, 'Cumulative vs Non-Cumulative'),
    p(s, 'This is a critical distinction that many passive investors overlook. A cumulative preferred return means that any unpaid preferred amounts from one period carry forward to the next. If the deal cannot pay the full 8% preferred in year one, the shortfall accrues and must be paid in future periods before the GP receives any profit share. A non-cumulative preferred return does not carry forward, meaning the GP can begin earning their share once the current period\'s preferred is met, regardless of past shortfalls.'),
    p(s, 'Cumulative preferred returns are significantly more protective for LPs. They ensure that the GP does not profit until LPs have received their full target return across the entire investment period. Always confirm whether a preferred return is cumulative, and strongly favor cumulative structures when evaluating syndication opportunities.'),
    h2(s, 'Not a Guarantee'),
    p(s, 'Despite the name, a preferred return is not a guaranteed payment. It is a priority in the distribution order, meaning LPs get paid first, but only from available cash flow and proceeds. If the property does not generate sufficient income, the preferred return may not be fully paid. The property could underperform, require unexpected capital contributions, or generate losses. The preferred return establishes your priority position in the distribution waterfall but does not eliminate investment risk.'),
    h2(s, 'Priority in the Waterfall'),
    p(s, 'The preferred return sets the foundation for the entire waterfall distribution. It defines the return level below which the GP does not participate in profits, creating a meaningful incentive for the GP to deliver at least the preferred return. Above the preferred return, additional profits are split according to the waterfall tiers. The preferred return effectively says: LPs get their base return first, and then we share the upside.'),
    h2(s, 'Evaluating Preferred Returns'),
    p(s, 'When comparing syndication deals, the preferred return is one of several factors to evaluate. A higher preferred return is generally better for LPs, but it must be considered alongside the profit split ratios, the GP\'s track record, the deal\'s risk profile, and the overall projected returns. An 8% preferred return with a 70/30 split may be more favorable than a 10% preferred with a 50/50 split if the deal outperforms. Analyze the waterfall as a complete structure rather than focusing on any single component.'),
    h2(s, 'Key Takeaway'),
    p(s, 'The preferred return is your priority position as a passive investor. It ensures you receive a minimum return before the deal sponsor profits, aligning incentives and protecting your capital. Always confirm whether the preferred return is cumulative, understand that it is a priority not a guarantee, and evaluate it within the context of the complete waterfall structure and deal economics.'),
  ],
}

/* ── Main execution ─────────────────────────────────────────────── */

const slugs = Object.keys(termContent)

async function main() {
  console.log(`\nEnrich Glossary Batch 4 — ${slugs.length} terms`)
  console.log('─'.repeat(50))

  // Fetch terms that need body content
  const terms = await client.fetch(
    `*[_type == "glossaryTerm" && slug.current in $slugs && !defined(body)]{ _id, term, "slug": slug.current }`,
    { slugs }
  )

  if (terms.length === 0) {
    // Also check for terms that exist but already have body
    const existing = await client.fetch(
      `*[_type == "glossaryTerm" && slug.current in $slugs]{ _id, term, "slug": slug.current, "hasBody": defined(body) }`,
      { slugs }
    )
    if (existing.length > 0) {
      console.log(`All ${existing.length} terms already have body content.`)
      const missing = slugs.filter(s => !existing.find(e => e.slug === s))
      if (missing.length > 0) {
        console.log(`\nTerms not found in Sanity (may need seeding first):`)
        missing.forEach(s => console.log(`  - ${s}`))
      }
    } else {
      console.log('No matching terms found in Sanity. Ensure terms are seeded first.')
      console.log(`Looked for slugs: ${slugs.join(', ')}`)
    }
    return
  }

  console.log(`Found ${terms.length} terms needing body content:\n`)

  let updated = 0
  let errors = 0

  for (const term of terms) {
    const contentFn = termContent[term.slug]
    if (!contentFn) {
      console.log(`  SKIP  ${term.term} — no content defined for slug "${term.slug}"`)
      continue
    }

    // Reset block counter for each term
    blockCounter = 0
    const body = contentFn(term.slug)

    try {
      await client.patch(term._id).set({ body }).commit()
      updated++
      console.log(`  ✓  ${term.term} (${body.length} blocks)`)
    } catch (err) {
      errors++
      console.error(`  ✗  ${term.term}: ${err.message}`)
    }

    // 500ms delay between updates
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('\n' + '─'.repeat(50))
  console.log(`Done. Updated: ${updated} | Errors: ${errors} | Skipped: ${terms.length - updated - errors}`)

  // Report any slugs that weren't found
  const foundSlugs = terms.map(t => t.slug)
  const notFound = slugs.filter(s => !foundSlugs.includes(s))
  if (notFound.length > 0) {
    // Check if they already had body content
    const alreadyDone = await client.fetch(
      `*[_type == "glossaryTerm" && slug.current in $slugs && defined(body)]{ "slug": slug.current }`,
      { slugs: notFound }
    )
    const alreadySlugs = alreadyDone.map(t => t.slug)
    const trulyMissing = notFound.filter(s => !alreadySlugs.includes(s))

    if (alreadySlugs.length > 0) {
      console.log(`\nAlready had body content (${alreadySlugs.length}):`)
      alreadySlugs.forEach(s => console.log(`  - ${s}`))
    }
    if (trulyMissing.length > 0) {
      console.log(`\nNot found in Sanity (${trulyMissing.length}):`)
      trulyMissing.forEach(s => console.log(`  - ${s}`))
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
