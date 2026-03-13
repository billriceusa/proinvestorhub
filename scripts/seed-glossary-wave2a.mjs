#!/usr/bin/env node

/**
 * Seed Glossary Wave 2a — 26 NEW terms with full body content
 * Creates terms in a single transaction; skips any that already exist.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... node scripts/seed-glossary-wave2a.mjs
 *   # Dry-run (no writes):
 *   DRY_RUN=1 SANITY_API_WRITE_TOKEN=sk-... node scripts/seed-glossary-wave2a.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-12',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const DRY_RUN = process.env.DRY_RUN === '1'

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Set it in .env.local or pass it directly.')
  process.exit(1)
}

// ── Portable Text helpers ────────────────────────────────────────────

function h2(slug, n, text) {
  return {
    _type: 'block',
    _key: `${slug}-b${n}`,
    style: 'h2',
    children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
  }
}

function p(slug, n, text) {
  return {
    _type: 'block',
    _key: `${slug}-b${n}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `${slug}-s${n}`, text }],
  }
}

// ── Term definitions with full body content ──────────────────────────

const newTerms = [
  // 1. Accessory Dwelling Unit (ADU)
  {
    term: 'Accessory Dwelling Unit (ADU)',
    slug: 'adu',
    category: 'general',
    definition: 'A secondary housing unit built on the same lot as a primary residence. ADUs — also called granny flats, in-law suites, or casitas — are gaining popularity due to nationwide zoning reforms and the growing demand for affordable, flexible housing options.',
    body: (s) => [
      h2(s, 1, 'What Is an Accessory Dwelling Unit?'),
      p(s, 2, 'An accessory dwelling unit (ADU) is a self-contained living space located on the same property as a single-family home. ADUs have their own entrance, kitchen, bathroom, and sleeping area, and can be occupied by tenants, family members, or used as a home office. They represent one of the fastest-growing segments in residential real estate due to relaxed zoning laws across the country.'),
      h2(s, 3, 'Types of ADUs'),
      p(s, 4, 'ADUs come in several forms. Garage conversions transform an existing attached or detached garage into a livable unit — often the most cost-effective approach at $50,000–$150,000. Basement conversions work well in regions with below-grade construction, typically costing $60,000–$120,000. Detached ADUs are standalone structures built in the backyard, ranging from $100,000–$300,000 depending on size and finishes. Internal conversions carve a unit out of existing square footage within the primary home, and prefab or modular ADUs offer faster construction timelines at predictable costs.'),
      h2(s, 5, 'Zoning Reforms Driving ADU Growth'),
      p(s, 6, 'California led the charge with AB 68 and subsequent legislation effectively legalizing ADUs statewide by removing parking requirements, reducing setbacks, and preventing HOA bans. Oregon, Washington, and numerous cities across the country have followed suit. These reforms eliminate many of the barriers that historically made ADU construction difficult — from minimum lot sizes to owner-occupancy requirements. Investors should research local ADU ordinances carefully, as rules around size limits, design standards, and rental restrictions vary significantly by jurisdiction.'),
      h2(s, 7, 'ADU Investment Strategies'),
      p(s, 8, 'The most straightforward ADU strategy is building one on a property you already own to generate rental income — effectively creating a duplex from a single-family home. House hackers can live in the ADU and rent the main house, or vice versa. More advanced investors target properties with ADU potential, factoring the construction cost and future rental income into their acquisition analysis. In high-rent markets like Los Angeles or Portland, an ADU renting for $1,500–$2,500 per month can deliver a 10–15% return on the construction investment.'),
      h2(s, 9, 'Costs, Financing, and Rental Income'),
      p(s, 10, 'Total ADU costs typically range from $100,000 to $300,000 for new detached construction, with garage conversions at the lower end. Financing options include home equity loans (HELOCs), cash-out refinances, construction loans, and specialized ADU loan products offered by some lenders. Rental income potential depends on the local market — in major metros, ADUs can generate $1,200–$3,000 per month. The key calculation is whether the monthly rental income, minus any loan payments and maintenance, produces a positive cash-on-cash return that justifies the construction investment and effort.'),
    ],
  },

  // 2. Self-Storage Investing
  {
    term: 'Self-Storage Investing',
    slug: 'self-storage-investing',
    category: 'strategies',
    definition: 'Investing in self-storage facilities — a commercial real estate niche characterized by low management overhead, high operating margins of 40–60%, and recession-resistant demand. Self-storage benefits from life transitions like moves, divorces, downsizing, and business inventory needs.',
    body: (s) => [
      h2(s, 1, 'Why Self-Storage Attracts Investors'),
      p(s, 2, 'Self-storage is one of the most operator-friendly asset classes in commercial real estate. Operating margins routinely reach 40–60% because the product is simple — concrete, steel, and doors with no plumbing per unit, no kitchens, and minimal tenant improvement costs. Demand is driven by life events (moving, divorce, death, downsizing, military deployment) that occur regardless of economic conditions, which is why self-storage outperformed every other commercial real estate sector during the 2008 recession and the 2020 pandemic.'),
      h2(s, 3, 'Market Size and Fundamentals'),
      p(s, 4, 'The U.S. self-storage industry exceeds $40 billion in annual revenue with over 50,000 facilities nationwide. Approximately 10% of American households rent a storage unit. Despite consolidation by REITs like Public Storage, Extra Space, and CubeSmart, the market remains highly fragmented — roughly 75% of facilities are still owned by independent operators, creating acquisition opportunities for smaller investors willing to improve operations on mismanaged properties.'),
      h2(s, 5, 'Key Acquisition Metrics'),
      p(s, 6, 'When evaluating a self-storage facility, focus on price per square foot (typically $30–$80 for existing facilities), physical occupancy vs. economic occupancy (the gap reveals pricing upside), revenue per square foot, and expense ratio. A facility at 75% occupancy with below-market rents in a growing submarket represents a classic value-add opportunity. Drive-up units in secondary markets are often priced at $5–$15 per square foot per year, while climate-controlled units in urban areas command $12–$25.'),
      h2(s, 7, 'Management and Operations'),
      p(s, 8, 'Self-storage can be managed with minimal staff — many facilities operate with a single on-site manager or even remotely with smart locks and kiosks. Revenue management software automatically adjusts rates based on occupancy and demand, a practice called street-rate optimization. The tenant relationship is transactional: month-to-month leases, automated billing, and lien auction rights for delinquent tenants. This simplicity allows investors to manage facilities from a distance more easily than apartments or retail.'),
      h2(s, 9, 'Value-Add Strategies'),
      p(s, 10, 'Common value-add plays include raising below-market rents to street rates (often 15–30% increases at mom-and-pop facilities), adding climate-controlled units, installing boat/RV parking, improving online presence and implementing revenue management software, converting unused land to additional units, and adding tenant insurance programs. Each of these increases NOI and drives cap-rate-based value. Investors also benefit from expansion — adding units to an existing facility is often cheaper than ground-up development.'),
      h2(s, 11, 'REITs vs. Direct Ownership'),
      p(s, 12, 'Publicly traded self-storage REITs (Public Storage, Extra Space Storage, CubeSmart, Life Storage, National Storage Affiliates) offer liquid, passive exposure but trade at premium valuations with 4–5% cap rates. Direct ownership of smaller facilities — 100 to 500 units — typically offers 7–10% cap rates, hands-on value-add upside, and tax benefits through depreciation and cost segregation. Many investors start with a single facility, stabilize it, and use the cash flow to acquire the next one.'),
    ],
  },

  // 3. Mobile Home Park Investing
  {
    term: 'Mobile Home Park Investing',
    slug: 'mobile-home-park-investing',
    category: 'strategies',
    definition: 'A real estate strategy where the investor owns the land and infrastructure of a mobile home community while tenants own their individual homes. Mobile home parks offer affordable housing, low capital expenditure per unit, and strong demand driven by the nationwide housing affordability crisis.',
    body: (s) => [
      h2(s, 1, 'The Lot Rent Model'),
      p(s, 2, 'Unlike apartments where the landlord owns the building, mobile home park investors own the land and infrastructure — roads, water lines, sewer connections, and electrical systems — while tenants own their manufactured homes. Tenants pay monthly lot rent (typically $200–$700 depending on the market) for the right to place their home on the pad. This model means the investor has minimal responsibility for the homes themselves, dramatically reducing maintenance and capital expenditure costs compared to traditional multifamily.'),
      h2(s, 3, 'Low Capex, High Demand'),
      p(s, 4, 'When tenants own the homes, the park owner avoids roof replacements, HVAC repairs, appliance failures, and interior maintenance. Capital expenditures focus on community infrastructure — roads, utilities, common areas, and drainage. Per-unit capex is a fraction of what apartment owners spend. Meanwhile, demand is structural: with the median U.S. home price exceeding $400,000, manufactured housing at $50,000–$100,000 represents one of the last bastions of unsubsidized affordable housing. There are roughly 43,000 mobile home parks in America, and very few new ones are being built due to zoning restrictions.'),
      h2(s, 5, 'High Barriers to Entry'),
      p(s, 6, 'New mobile home park development is virtually impossible in most markets. Local zoning boards rarely approve new parks, making existing communities irreplaceable assets. This supply constraint protects existing owners from competition and supports long-term lot rent growth. Combined with the high cost of moving a manufactured home ($5,000–$15,000), tenant turnover is extremely low — often under 5% annually compared to 40–50% in apartments.'),
      h2(s, 7, 'Acquisition Analysis'),
      p(s, 8, 'Key metrics for evaluating a mobile home park include price per pad (lot), occupancy rate, lot rent relative to market, utility infrastructure (public vs. private water and sewer), and road conditions. Parks with city water and sewer trade at premiums because they eliminate the risk and expense of maintaining private systems. A typical acquisition analysis looks at current NOI, potential NOI at market rents and stabilized occupancy, and the capital needed to fill vacant lots and upgrade infrastructure.'),
      h2(s, 9, 'Value-Add: Billing Back Utilities and More'),
      p(s, 10, 'The most common value-add strategy is billing back utilities. Many older parks include water, sewer, and trash in lot rent — shifting these costs to tenants (with proper notice and sub-metering) can add $75–$150 per lot per month directly to NOI. Other value-add plays include raising below-market lot rents gradually (5–10% per year), filling vacant lots with new or used homes, removing park-owned homes by selling them to tenants, improving community amenities, and implementing professional management.'),
      h2(s, 11, 'Social Responsibility'),
      p(s, 12, 'Mobile home park investing carries a social responsibility dimension. These communities house families, retirees, and essential workers who have few affordable alternatives. Aggressive rent increases or neglected infrastructure can displace vulnerable residents. The most successful long-term operators balance profitability with community stewardship — maintaining safe, clean communities, investing in infrastructure, and implementing gradual, transparent rent increases. This approach reduces turnover, maintains occupancy, and builds a sustainable business.'),
    ],
  },

  // 4. Land Investing
  {
    term: 'Land Investing',
    slug: 'land-investing',
    category: 'strategies',
    definition: 'The acquisition of raw or undeveloped land for investment purposes. Land investing eliminates many headaches of traditional real estate — no tenants, no toilets, no maintenance — but requires specialized knowledge of zoning, entitlements, and market timing to generate returns.',
    body: (s) => [
      h2(s, 1, 'Types of Land Investments'),
      p(s, 2, 'Land investing spans a wide spectrum. Infill lots are vacant parcels in established neighborhoods zoned for residential or commercial construction — these offer the clearest path to value because surrounding development provides comparable pricing. Rural acreage appeals to recreational buyers, farmers, or long-term holders betting on population expansion. Development land sits in the path of growth and can be entitled, subdivided, or sold to builders. Agricultural land generates income through farming or leasing while appreciating over time. Each type requires different expertise and carries different risk profiles.'),
      h2(s, 3, 'Due Diligence for Land'),
      p(s, 4, 'Land due diligence is fundamentally different from improved property. Start with zoning — what can legally be built and at what density. Verify utility access: is municipal water, sewer, electricity, and gas available at the property line, or would you need wells, septic systems, and utility extensions? Confirm legal road access and check for easements, deed restrictions, and HOA covenants. Review flood maps, wetland delineations, and soil reports. A perc test determines if the land can support a septic system. Environmental concerns — contamination, endangered species, protected habitats — can kill a deal or create enormous liability.'),
      h2(s, 5, 'Creating Value Through Entitlements'),
      p(s, 6, 'Entitlement is the process of obtaining government approvals to develop land — rezoning, subdivision plats, site plans, environmental permits, and utility agreements. Raw land with no entitlements trades at a steep discount to entitled land because the entitlement process is expensive, time-consuming (often 12–36 months), and uncertain. Investors who successfully navigate entitlement can double or triple the value of a parcel without pouring a single foundation. This is one of the highest-return activities in real estate, but it requires political navigation, engineering consultants, and patience.'),
      h2(s, 7, 'Financing Challenges'),
      p(s, 8, 'Banks view raw land as high-risk collateral. Expect higher down payments (30–50%), shorter terms (3–10 years), and higher interest rates compared to improved property. Many land deals are purchased with cash or seller financing. Owner financing is common in land transactions because sellers often have no mortgage and prefer installment payments for tax benefits. Land contract (contract for deed) structures let buyers make payments directly to sellers while the seller retains title until the balance is paid.'),
      h2(s, 9, 'Buy, Sell, and Hold Strategies'),
      p(s, 10, 'The simplest land strategy is buying undervalued parcels at tax auctions or from motivated sellers, then reselling at market value — often doubling your money on small rural parcels. Buy-and-hold investors purchase land in the path of development and wait for growth to reach them, sometimes for years or decades. Active investors add value through entitlement, subdivision, or improvements (clearing, grading, utility installation) before selling to builders or end users at a premium. The key to all land strategies is buying at the right price — because land generates no income while you hold it, your carrying costs (taxes, insurance, loan payments) eat into returns every month.'),
    ],
  },

  // 5. Note Investing
  {
    term: 'Note Investing',
    slug: 'note-investing',
    category: 'strategies',
    definition: 'Purchasing mortgage notes — the debt secured by real estate — rather than the properties themselves. Note investors essentially become the bank, collecting payments from borrowers or working out non-performing loans for profit. Returns typically range from 8–15% depending on the note type and strategy.',
    body: (s) => [
      h2(s, 1, 'What Is Note Investing?'),
      p(s, 2, 'When someone takes out a mortgage, they sign a promissory note (the promise to repay) and a mortgage or deed of trust (the security instrument tied to the property). These notes can be bought and sold on a secondary market. When you purchase a mortgage note, you step into the lender\'s shoes — the borrower now makes their monthly payments to you. Note investing lets you earn interest income backed by real estate collateral without the responsibilities of property ownership, maintenance, or tenant management.'),
      h2(s, 3, 'Performing vs. Non-Performing Notes'),
      p(s, 4, 'Performing notes are loans where the borrower is making regular payments. You buy a performing note at a discount to the unpaid principal balance and collect the monthly payments, earning the spread. A $100,000 note purchased for $85,000 with a 7% interest rate yields strong returns on your actual investment. Non-performing notes (NPLs) are loans where the borrower has stopped paying — these trade at steep discounts (40–70 cents on the dollar) and require active workout strategies. NPLs offer higher potential returns but demand more expertise and carry more risk.'),
      h2(s, 5, 'NPL Workout Strategies'),
      p(s, 6, 'When you buy a non-performing note, you have several resolution paths. Loan modification restructures the terms (lower rate, extended term, principal reduction) to get the borrower paying again — often the most profitable outcome because a re-performing note can be resold at a premium. A short sale allows the borrower to sell the property for less than owed, with you accepting the proceeds. Deed in lieu of foreclosure transfers the property to you without a lengthy court process. Foreclosure is the last resort, giving you ownership of the property to sell or rent. The best note investors are skilled negotiators who find win-win solutions for borrowers in distress.'),
      h2(s, 7, 'Where to Buy Notes and Expected Returns'),
      p(s, 8, 'Notes are available from banks offloading non-performing assets, hedge funds liquidating portfolios, note brokers and trading platforms (like Paperstac and NotesDirect), and at note-specific conferences. Performing notes typically yield 8–12% annually on the purchase price. Non-performing notes can yield 15–30% when successfully worked out, but factor in time, legal costs, and the possibility of total loss. Institutional sellers often package notes in pools, requiring larger capital commitments, while individual notes from brokers allow smaller investors to get started.'),
      h2(s, 9, 'Risks and Considerations'),
      p(s, 10, 'Note investing is not passive. Non-performing notes require active management, legal expertise, and patience — workouts can take 6–24 months. Key risks include borrower bankruptcy (which halts collection efforts), property condition deterioration, junior lien position (second mortgages are riskier than firsts), and the cost of foreclosure ($5,000–$50,000 depending on the state). Due diligence must include reviewing the loan file for completeness, verifying the chain of title, assessing the property value relative to the unpaid balance, and understanding state-specific foreclosure timelines.'),
    ],
  },

  // 6. Tax Lien Investing
  {
    term: 'Tax Lien Investing',
    slug: 'tax-lien-investing',
    category: 'strategies',
    definition: 'Purchasing tax lien certificates at government auctions, which represent unpaid property taxes. The investor pays the delinquent taxes and earns interest — often 8–36% annually depending on the state — when the property owner redeems the lien. If the owner fails to pay, the investor may acquire the property.',
    body: (s) => [
      h2(s, 1, 'How Tax Liens Work'),
      p(s, 2, 'When property owners fail to pay their real estate taxes, the local government places a lien on the property. To recoup the lost tax revenue, counties and municipalities sell these liens at public auctions. The winning bidder pays the delinquent taxes and receives a tax lien certificate. The property owner then has a redemption period — typically 1–3 years — to pay back the taxes plus a statutory interest rate. If they redeem, the investor gets their principal back plus the interest. If they don\'t redeem within the allowed period, the investor can initiate foreclosure proceedings to take ownership of the property.'),
      h2(s, 3, 'Interest Rates by State'),
      p(s, 4, 'Tax lien interest rates vary dramatically by state and are set by statute. Florida offers up to 18% (bid down at auction), Illinois allows 18% per six-month period (effectively 36% annualized), Arizona caps at 16%, Iowa at 24%, and New Jersey at 18%. Some states like Texas and Georgia sell tax deeds directly instead of liens. At auction, competition often drives the effective rate below the maximum — in popular Florida counties, winning bids may be at 1–5% as institutional investors crowd the market. Less competitive rural auctions still offer rates near the statutory maximum.'),
      h2(s, 5, 'Tax Deed vs. Tax Lien States'),
      p(s, 6, 'States fall into two categories. Tax lien states sell the right to collect the delinquent taxes plus interest (the lien certificate). Tax deed states skip the lien and sell the property itself at auction, usually after a waiting period. Some states are hybrids, offering both. Tax lien investing is primarily an interest-rate play with property acquisition as a backup. Tax deed investing is primarily a property acquisition strategy. Understanding which system your target state uses is fundamental — the strategies, risks, and returns are quite different.'),
      h2(s, 7, 'The Auction Process'),
      p(s, 8, 'Tax lien auctions occur annually or semi-annually, with dates and parcel lists published weeks in advance. Many counties now conduct auctions online. Bidding formats vary: some auction the interest rate down (starting at the maximum and decreasing), others accept premium bids above the lien amount, and some use a rotational or random assignment system. Successful investors research parcel lists beforehand, eliminating properties with environmental issues, landlocked parcels, and those with other liens that could complicate ownership. Having a clear maximum bid strategy prevents overpaying in the competitive atmosphere of a live auction.'),
      h2(s, 9, 'Due Diligence and Risks'),
      p(s, 10, 'The biggest risk in tax lien investing is not the interest rate — it is what happens if you end up owning the property. Before bidding, research each parcel: Is there an actual structure? What condition is it in? Are there environmental contamination risks (gas stations, dry cleaners, industrial sites)? Are there other liens (IRS liens, mortgages, mechanic\'s liens) that might survive the tax sale? Is the property in a flood zone? Many novice investors chase high interest rates without considering that a redeemed lien at 8% is far better than owning a contaminated lot worth less than the taxes owed.'),
    ],
  },

  // 7. Real Estate Crowdfunding
  {
    term: 'Real Estate Crowdfunding',
    slug: 'real-estate-crowdfunding',
    category: 'strategies',
    definition: 'Online platforms that pool capital from multiple investors to fund real estate projects. Crowdfunding has democratized access to commercial real estate, allowing both accredited and non-accredited investors to participate in deals that previously required six- or seven-figure minimums.',
    body: (s) => [
      h2(s, 1, 'What Is Real Estate Crowdfunding?'),
      p(s, 2, 'Real estate crowdfunding platforms connect investors with sponsors (operators) who need capital for acquisitions, developments, or refinances. Instead of needing $250,000 to invest in a single apartment syndication, investors can deploy $500–$25,000 across multiple deals through an online platform. The platform handles investor relations, compliance, and distributions. Since the JOBS Act of 2012, the industry has grown from a handful of startups to a multi-billion-dollar ecosystem offering everything from individual debt deals to diversified REIT-like funds.'),
      h2(s, 3, 'Reg D vs. Reg A+ Offerings'),
      p(s, 4, 'Regulation D (Rule 506(b) and 506(c)) offerings are limited to accredited investors — individuals with $200,000+ income or $1 million+ net worth excluding their primary residence. These offerings have no cap on the amount raised and are the most common structure on platforms like CrowdStreet and RealtyMogul. Regulation A+ offerings are open to all investors regardless of accreditation status, but the issuer must file with the SEC and can raise up to $75 million. Fundrise pioneered the Reg A+ model, allowing anyone to invest with minimums as low as $10.'),
      h2(s, 5, 'Major Platforms Compared'),
      p(s, 6, 'Fundrise offers diversified eREIT and eFund products open to all investors with low minimums ($10+) and automated portfolio management. CrowdStreet focuses on individual commercial deals for accredited investors with minimums of $25,000+, giving investors more control over deal selection. RealtyMogul offers both individual deals and diversified REITs. Yieldstreet provides multi-asset alternative investments including real estate. Each platform differs in deal quality, transparency, fee structure, and historical returns. The best approach is to start with one platform, understand their model, and diversify as your experience and capital grow.'),
      h2(s, 7, 'Typical Returns and Fee Structures'),
      p(s, 8, 'Crowdfunding returns vary by deal type. Debt investments (short-term bridge loans) typically target 7–12% annually with lower risk. Equity investments in value-add or development projects target 12–20% IRR over a 3–7 year hold period. Preferred equity falls between the two. Fees include platform fees (1–2% annually), asset management fees, and promote/carried interest on equity deals. These fees reduce net returns, so always calculate the after-fee return. Historical average returns across major platforms have been 8–12% annually, though individual deal performance varies widely.'),
      h2(s, 9, 'Risks and Due Diligence'),
      p(s, 10, 'The primary risk in crowdfunding is illiquidity — once you invest, your capital is locked up for the deal\'s duration (typically 2–7 years) with limited or no ability to sell. Sponsor risk is significant: the platform vetted the deal, but the operator\'s execution determines your return. Review the sponsor\'s track record, the deal\'s capital structure (how much leverage), the market fundamentals, and the business plan assumptions. Platform risk also exists — if the platform goes under, your investments may become difficult to manage. Diversification across multiple deals and platforms is the best risk mitigation strategy.'),
    ],
  },

  // 8. Build-to-Rent (BTR)
  {
    term: 'Build-to-Rent (BTR)',
    slug: 'build-to-rent',
    category: 'strategies',
    definition: 'A real estate strategy involving new construction of single-family homes, townhomes, or small multifamily properties specifically designed and built for rental rather than for-sale housing. BTR has become a major institutional trend as renters increasingly seek the space and amenities of single-family living.',
    body: (s) => [
      h2(s, 1, 'The Build-to-Rent Trend'),
      p(s, 2, 'Build-to-rent has exploded from a niche strategy to a mainstream asset class. Institutional investors, homebuilders, and private developers are constructing entire communities of rental homes — complete with property management offices, amenity centers, and cohesive design standards. The trend is driven by demographics: millennials aging into family formation want single-family space but face affordability barriers to homeownership, while downsizing boomers prefer renting without maintenance responsibilities. BTR captures demand from both groups.'),
      h2(s, 3, 'Advantages of New Construction Rentals'),
      p(s, 4, 'Building new eliminates many risks of acquiring existing rentals. New homes come with builder warranties covering structural defects, mechanical systems, and appliances for 1–10 years, dramatically reducing maintenance costs in the early years. Energy-efficient construction (modern insulation, HVAC, windows) lowers utility costs and appeals to tenants. Purpose-built rental layouts can optimize for durability — LVP flooring, quartz countertops, and commercial-grade fixtures withstand tenant wear better than the finishes in for-sale homes. New properties also command premium rents, often 10–20% above comparable older inventory.'),
      h2(s, 5, 'Development Process'),
      p(s, 6, 'BTR development follows the same general process as for-sale construction: land acquisition, entitlement, design, permitting, site development, vertical construction, and lease-up. The key differences are in design (optimizing for rental durability and management efficiency rather than buyer preferences) and financing (construction loans that convert to permanent rental financing rather than lot releases). Total development timeline from land acquisition to stabilized occupancy is typically 18–36 months. Many individual investors partner with experienced builders rather than managing construction directly.'),
      h2(s, 7, 'Financing BTR Projects'),
      p(s, 8, 'Construction financing for BTR is available from banks, credit unions, and private lenders, typically requiring 20–30% equity, with the land often serving as initial equity contribution. Once construction is complete and the property is leased, the construction loan converts to permanent financing — either a conventional rental loan (for 1–4 units) or a commercial loan (for larger projects). The DSCR loan market has embraced BTR, offering term financing based on rental income rather than the borrower\'s personal income. Some builders offer turnkey BTR programs where they build on your lot with guaranteed rental projections.'),
      h2(s, 9, 'Market Selection and Risks'),
      p(s, 10, 'BTR works best in markets with strong population growth, job creation, and a gap between home prices and rents — Sun Belt cities like Phoenix, Dallas, Atlanta, Tampa, and Charlotte have seen the most BTR activity. Key risks include construction cost overruns, permitting delays, lease-up risk (will tenants materialize at projected rents?), and market timing — building takes 12–24 months, and market conditions can shift during construction. Rising material and labor costs have squeezed BTR margins in some markets. The most successful BTR investors lock in construction costs, secure pre-lease commitments, and build in growing markets with limited existing rental supply.'),
    ],
  },

  // 9. Coliving
  {
    term: 'Coliving',
    slug: 'coliving',
    category: 'strategies',
    definition: 'A rental strategy where individual bedrooms in a house are rented separately to unrelated tenants who share common areas like kitchens, living rooms, and bathrooms. Coliving can generate 2–3x the rental income of leasing the same property to a single tenant or family.',
    body: (s) => [
      h2(s, 1, 'The Per-Room Revenue Model'),
      p(s, 2, 'Coliving turns a traditional single-family rental on its head. Instead of renting a 4-bedroom house to one tenant for $2,000 per month, you rent each bedroom individually for $800–$1,200, generating $3,200–$4,800 per month from the same property. This per-room model works because the housing affordability crisis has made individual rooms an attractive option for young professionals, remote workers, students, and new-to-town transplants who value affordability and community over having an entire house to themselves.'),
      h2(s, 3, 'Target Demographics'),
      p(s, 4, 'Coliving appeals to several distinct groups. Young professionals (22–35) in expensive cities who cannot afford apartments on their own. Remote workers and digital nomads seeking furnished, flexible living. Graduate students and medical residents who need short-to-medium-term housing. International workers and recent transplants who lack local rental history. The common thread is affordability combined with convenience — coliving offers lower individual costs than studio apartments while providing fully furnished, all-inclusive living. Higher-end coliving spaces marketed as intentional communities can attract tenants willing to pay premium rates.'),
      h2(s, 5, 'Management Challenges'),
      p(s, 6, 'Coliving is more management-intensive than traditional rentals. You are managing individual personalities sharing intimate living spaces, which means conflict resolution becomes part of the job. Common issues include cleanliness disputes, noise complaints, guest policies, and shared-space etiquette. Successful coliving operators establish clear house rules, conduct thorough screening (personality fit matters as much as financial qualification), and maintain a responsive communication channel. Turnover is higher than traditional rentals — expect 6–12 month average stays — requiring ongoing marketing and tenant placement efforts.'),
      h2(s, 7, 'Furnishing and Setup Costs'),
      p(s, 8, 'Coliving units are typically furnished and all-inclusive (utilities, WiFi, sometimes cleaning). Initial furnishing costs run $2,000–$5,000 per bedroom and $3,000–$8,000 for common areas, depending on quality level. Budget-friendly furnishing from IKEA and Facebook Marketplace keeps costs down, while higher-end coliving commands premium rents with quality furniture and design. Expect to replace mattresses every 2–3 years and refresh common area furnishings annually. The all-inclusive model simplifies life for tenants but means the operator absorbs utility cost fluctuations.'),
      h2(s, 9, 'Lease Structures and Scaling'),
      p(s, 10, 'Most coliving operators use individual lease agreements per room with explicit shared-space terms, rather than joint leases. This protects the operator when one tenant leaves — the remaining tenants are unaffected. Month-to-month or 6-month leases offer flexibility for both parties. Scaling coliving requires systems: standardized furnishing packages, templated lease agreements, online applications, automated billing, and reliable cleaning services. Many investors start with one coliving house, prove the model, and expand to 3–5 houses before the management complexity requires dedicated staff or property management software.'),
    ],
  },

  // 10. Student Housing
  {
    term: 'Student Housing',
    slug: 'student-housing',
    category: 'strategies',
    definition: 'Rental properties located near colleges and universities, typically leased by the bedroom to students. Student housing offers reliable demand driven by enrollment, premium per-bedroom pricing, and the ability to generate strong cash flow in markets that might otherwise be challenging for traditional rentals.',
    body: (s) => [
      h2(s, 1, 'Per-Bedroom Pricing'),
      p(s, 2, 'Student housing economics revolve around per-bedroom pricing rather than per-unit pricing. A 4-bedroom house near a major university might rent for $1,800 as a family rental but $600–$900 per bedroom to students, generating $2,400–$3,600 per month. Each bedroom is leased individually with its own lease agreement, and rents are typically quoted on a per-person, per-month basis. This model mirrors how students think about housing costs — they compare what they will individually pay, not the total rent for the unit.'),
      h2(s, 3, 'Guaranteed Demand Near Major Schools'),
      p(s, 4, 'Large public universities with 20,000+ students and limited on-campus housing create structural demand for off-campus rentals. Schools like the University of Florida, Penn State, University of Michigan, and Texas A&M have thriving off-campus rental markets with near-100% occupancy during the academic year. The key is proximity — properties within walking or biking distance of campus command significant premiums. Demand is relatively recession-proof: enrollment at major universities remained stable or increased during economic downturns as people return to school when job markets weaken.'),
      h2(s, 5, 'Seasonal Turnover'),
      p(s, 6, 'The primary challenge of student housing is the annual turnover cycle. Most leases run August to July, creating a concentrated make-ready period every summer when units must be cleaned, repaired, and re-leased. Smart operators begin marketing for the following year in October–December, when students are planning ahead, and aim to have 80%+ of units pre-leased by February. This seasonal intensity is offset by the predictability — you know exactly when turnover happens and can plan accordingly. Summer vacancy can be mitigated by offering 12-month leases or sublease options.'),
      h2(s, 7, 'Co-Signer Requirements and Property Management'),
      p(s, 8, 'Students typically have limited credit history and income, making parental co-signers essential. Most student housing operators require a parent or guardian co-signer on every lease, which effectively transfers financial risk to an adult with established credit and income. This is one of the underappreciated advantages of student housing — your actual financial guarantor is a middle-aged professional, not a 20-year-old. Property management for student housing requires a firm but responsive approach: enforce lease terms consistently, respond to maintenance quickly, and build relationships with the university housing office for referrals.'),
      h2(s, 9, 'The Distance-to-Campus Premium'),
      p(s, 10, 'Location is even more critical in student housing than in traditional rentals. Properties within a 5-minute walk of campus can command 30–50% premiums over those a 15-minute drive away. Each block further from campus measurably reduces rent potential. The most valuable student housing properties are those closest to the academic core, major libraries, and student activity centers. Properties near Greek Row, popular bars, or student commercial districts also carry premiums. When analyzing student housing investments, walk the route a student would take to class — that experience determines your property\'s competitive position.'),
    ],
  },

  // 11. Debt Yield
  {
    term: 'Debt Yield',
    slug: 'debt-yield',
    category: 'analysis',
    definition: 'A lending metric calculated as Net Operating Income divided by the total loan amount, expressed as a percentage. Debt yield measures how quickly a lender could recoup their investment from property income alone, regardless of interest rate or amortization schedule. Most lenders require a minimum debt yield of 8–10%.',
    body: (s) => [
      h2(s, 1, 'What Is Debt Yield?'),
      p(s, 2, 'Debt yield is a risk assessment tool used by commercial real estate lenders to evaluate loan safety. The formula is straightforward: Debt Yield = Net Operating Income / Loan Amount × 100. If a property generates $100,000 in NOI and the loan is $1,000,000, the debt yield is 10%. This tells the lender that the property produces 10% of the loan amount each year in net income — a measure of how well the property\'s income covers the debt obligation independent of loan terms.'),
      h2(s, 3, 'Why Lenders Use Debt Yield Alongside DSCR'),
      p(s, 4, 'Debt Service Coverage Ratio (DSCR) — the traditional lending metric — can be manipulated by extending amortization periods or using interest-only structures. A 40-year amortization will produce a higher DSCR than a 25-year amortization on the same property, but the property\'s fundamental ability to cover the debt hasn\'t changed. Debt yield removes these variables entirely. It doesn\'t care about the interest rate, amortization period, or loan structure — it simply asks: what percentage of the loan amount does this property earn annually? This makes it a purer measure of property-level risk.'),
      h2(s, 5, 'Minimum Thresholds and What They Mean'),
      p(s, 6, 'Most CMBS lenders require a minimum debt yield of 8–10%. Banks and life insurance companies may accept slightly lower thresholds for trophy properties in primary markets. A debt yield of 10% means the lender would theoretically recover their entire loan in 10 years from NOI alone. Higher debt yields mean less risk for the lender and typically result in better loan terms. In practice, debt yield often becomes the binding constraint on loan sizing — the lender calculates the maximum loan amount that maintains their required debt yield, which may be lower than what DSCR or LTV would allow.'),
      h2(s, 7, 'Formula with Example'),
      p(s, 8, 'Consider a property with $150,000 NOI. You are seeking a $1,500,000 loan. Debt Yield = $150,000 / $1,500,000 = 10%. If the lender requires a minimum 10% debt yield, this loan amount works. But if you wanted $1,875,000, the debt yield drops to 8% ($150,000 / $1,875,000), which would be rejected. To improve the debt yield, you need to either increase NOI (raise rents, reduce expenses) or reduce the loan amount (larger down payment). This is why value-add investors focus on increasing NOI before refinancing — higher NOI supports larger loans at the same debt yield requirement.'),
      h2(s, 9, 'Relationship to LTV and DSCR'),
      p(s, 10, 'Loan sizing in commercial real estate is governed by three constraints: Loan-to-Value (LTV), DSCR, and debt yield. The binding constraint — whichever produces the smallest loan — determines the maximum loan amount. In low interest rate environments, debt yield often becomes the binding constraint because DSCR is easily satisfied with cheap debt. In high interest rate environments, DSCR typically binds because debt service increases. LTV constrains loan size based on appraised value. Sophisticated borrowers model all three to understand their maximum leverage and negotiate with lenders from a position of knowledge.'),
    ],
  },

  // 12. Gross Operating Income
  {
    term: 'Gross Operating Income',
    slug: 'gross-operating-income',
    category: 'analysis',
    definition: 'The total income a property generates after accounting for vacancy and credit losses, plus any ancillary income sources. Gross Operating Income (GOI) represents the realistic top-line revenue a property produces and serves as the starting point for calculating Net Operating Income.',
    body: (s) => [
      h2(s, 1, 'The GOI Formula'),
      p(s, 2, 'Gross Operating Income = Gross Potential Income − Vacancy and Credit Loss + Other Income. Gross Potential Income (GPI) is the maximum rent if every unit were occupied at market rates. Vacancy and credit loss accounts for units that sit empty and tenants who fail to pay — typically estimated at 5–10% of GPI. Other income includes laundry revenue, parking fees, pet rent, storage fees, late fees, and any other non-rental income. GOI tells you what the property will actually collect, not what it could theoretically earn.'),
      h2(s, 3, 'Relationship to Effective Gross Income'),
      p(s, 4, 'Gross Operating Income and Effective Gross Income (EGI) are often used interchangeably in practice, though some analysts draw subtle distinctions. Both represent the property\'s realistic total income after vacancy adjustments. The important thing is consistency in your analysis — use the same methodology when comparing properties. What matters most is that you start with the theoretical maximum (GPI), subtract realistic vacancy and collection losses, and add back other income sources to arrive at the actual revenue the property generates.'),
      h2(s, 5, 'Where GOI Fits in the Income Waterfall'),
      p(s, 6, 'The income waterfall for investment properties flows as follows: Gross Potential Income (100% occupancy at market rents) → minus Vacancy and Credit Loss → plus Other Income → equals Gross Operating Income → minus Operating Expenses → equals Net Operating Income (NOI) → minus Debt Service → equals Cash Flow Before Tax. GOI is the critical mid-point — it represents real revenue before expenses. A property with strong GOI but poor NOI has an expense problem. A property with low GOI has a revenue or occupancy problem. Identifying where in the waterfall the issue lies guides your improvement strategy.'),
      h2(s, 7, 'Example Calculation'),
      p(s, 8, 'Consider a 10-unit apartment building where each unit rents for $1,200 per month. Gross Potential Income = 10 units × $1,200 × 12 months = $144,000. Assuming 7% vacancy and credit loss: $144,000 × 0.07 = $10,080 lost to vacancy. Other income from laundry ($2,400/year) and parking ($3,600/year) = $6,000. Gross Operating Income = $144,000 − $10,080 + $6,000 = $139,920. This is the realistic annual revenue you would use to begin your expense analysis and calculate NOI.'),
      h2(s, 9, 'Using GOI in Property Analysis'),
      p(s, 10, 'GOI is most useful when comparing properties at the revenue level. Two properties might have identical asking prices but very different GOI profiles — one might have higher rents but more vacancy, while the other has stable occupancy with below-market rents. GOI also reveals upside: if a property\'s actual GOI is significantly below what market rents and typical vacancy rates would suggest, there is revenue growth potential through better management, rent increases, or improved occupancy. Track GOI trends over time — a declining GOI signals problems that need investigation before they erode NOI and property value.'),
    ],
  },

  // 13. Net Present Value (NPV)
  {
    term: 'Net Present Value (NPV)',
    slug: 'npv',
    category: 'analysis',
    definition: 'A financial metric that calculates the present value of all future cash flows from an investment, minus the initial investment cost. A positive NPV indicates the investment earns more than the required rate of return, making it a worthwhile use of capital.',
    body: (s) => [
      h2(s, 1, 'Understanding NPV'),
      p(s, 2, 'Net Present Value answers a fundamental question: is this investment worth more than it costs? NPV works by discounting every future dollar of cash flow back to today\'s value using a discount rate — your required rate of return. If the sum of all discounted future cash flows exceeds your initial investment, the NPV is positive, meaning the deal creates value. If NPV is negative, the deal destroys value relative to your alternative uses of capital. In essence, NPV tells you whether the investment generates enough return to justify tying up your money.'),
      h2(s, 3, 'The Discount Rate'),
      p(s, 4, 'The discount rate represents your opportunity cost — what you could earn by putting the same capital into your next-best alternative investment. If you can reliably earn 8% in index funds, your discount rate for real estate should be at least 8%, and arguably higher to compensate for illiquidity and management effort. Choosing the right discount rate is the most subjective part of NPV analysis. Too low a rate will make bad deals look good. Too high will make you reject reasonable opportunities. Most real estate investors use discount rates of 8–15% depending on the risk profile of the deal.'),
      h2(s, 5, 'Positive NPV = Good Deal'),
      p(s, 6, 'A positive NPV means the investment earns more than your required return. An NPV of $50,000 on a $200,000 investment means you are creating $50,000 of value above and beyond your required rate of return. An NPV of zero means the investment earns exactly your required return — acceptable but not exciting. A negative NPV means your money would work harder elsewhere. The beauty of NPV is its binary clarity: positive means go, negative means pass. It incorporates the time value of money, which simple metrics like total profit or average return ignore.'),
      h2(s, 7, 'NPV vs. IRR'),
      p(s, 8, 'NPV and IRR are related but serve different purposes. IRR tells you the rate of return — the discount rate at which NPV equals zero. NPV tells you the dollar value created. They can conflict: a short-term flip might have a higher IRR but lower NPV than a long-term hold because the hold generates more total dollars over time. When NPV and IRR conflict, NPV is generally the better decision criterion because it measures absolute value creation. However, IRR is more intuitive for comparing deals of different sizes and is the standard metric in syndication marketing.'),
      h2(s, 9, 'Using NPV in Real Estate Analysis'),
      p(s, 10, 'To calculate NPV for a rental property: estimate annual cash flows for your holding period (typically 5–10 years), estimate the sale proceeds in the final year (using a projected cap rate and terminal NOI), discount each year\'s cash flow and the sale proceeds back to present value using your required return rate, and subtract your total initial investment (down payment, closing costs, renovation). Excel\'s NPV function and financial calculators make this straightforward. NPV is especially valuable for comparing deals with different holding periods, cash flow patterns, and exit values — it reduces everything to a single comparable number.'),
    ],
  },

  // 14. Equity Multiple
  {
    term: 'Equity Multiple',
    slug: 'equity-multiple',
    category: 'analysis',
    definition: 'The ratio of total distributions received to total equity invested. An equity multiple of 2.0x means the investor doubled their money over the life of the investment. Widely used in syndications and fund investments to communicate total return in simple, absolute terms.',
    body: (s) => [
      h2(s, 1, 'What Equity Multiple Tells You'),
      p(s, 2, 'Equity multiple is the simplest measure of total investment return. The formula is: Equity Multiple = Total Distributions / Total Equity Invested. If you invest $100,000 and receive $200,000 in total distributions (cash flow plus return of capital at sale), your equity multiple is 2.0x — you doubled your money. A 1.0x multiple means you got your money back with no profit. Below 1.0x means you lost money. The metric accounts for every dollar received: interim cash flow distributions, refinance proceeds, and final sale proceeds.'),
      h2(s, 3, 'Typical Targets by Strategy'),
      p(s, 4, 'Equity multiple targets vary by deal type and hold period. Core/stabilized assets with low risk might target 1.5–1.8x over 5–7 years. Value-add multifamily deals typically target 1.8–2.2x over 3–5 years. Opportunistic or development deals aim for 2.0–3.0x or higher over 2–5 years, reflecting the higher risk. Ground-up development might target 2.5x+ but carries construction and lease-up risk. When evaluating a syndication, always consider the equity multiple in context of the hold period and risk profile — a 2.0x over 3 years is dramatically better than 2.0x over 10 years.'),
      h2(s, 5, 'Equity Multiple vs. IRR'),
      p(s, 6, 'Equity multiple and IRR are complementary metrics that tell different parts of the return story. The equity multiple tells you how much total money you made; IRR tells you how fast you made it. Two deals can have the same 2.0x equity multiple but very different IRRs: doubling your money in 3 years yields roughly 26% IRR, while doubling over 7 years yields about 10% IRR. Conversely, a high-IRR deal with a short hold might have a lower equity multiple than a lower-IRR deal held longer. Sophisticated investors evaluate both together — they want deals that are both large (high multiple) and fast (high IRR).'),
      h2(s, 7, 'How to Evaluate Equity Multiples in Syndications'),
      p(s, 8, 'When a syndicator projects a 2.0x equity multiple, scrutinize the assumptions behind it. What exit cap rate are they assuming? What rent growth? What expense inflation? Is the multiple driven primarily by cash flow or by projected appreciation at sale? A deal producing strong cash flow and moderate appreciation is more reliable than one projecting minimal cash flow but a massive windfall at sale. Also check whether the projected equity multiple accounts for all fees — acquisition fees, asset management fees, and disposition fees all reduce the net equity multiple to limited partners.'),
      h2(s, 9, 'Limitations of Equity Multiple'),
      p(s, 10, 'The equity multiple has two significant limitations. First, it ignores timing — a 2.0x return in 2 years is far superior to 2.0x in 10 years, but the equity multiple treats them identically. This is why IRR exists as a complementary metric. Second, equity multiple is a pre-tax figure that does not account for the investor\'s tax situation, depreciation benefits, or tax liability at sale. Two deals with identical 2.0x multiples can have very different after-tax returns depending on their depreciation profiles and the investor\'s marginal tax rate. Always evaluate equity multiple alongside IRR, cash-on-cash return, and tax implications for a complete picture.'),
    ],
  },

  // 15. Replacement Cost
  {
    term: 'Replacement Cost',
    slug: 'replacement-cost',
    category: 'analysis',
    definition: 'The total cost to construct a new building equivalent to an existing property, including land acquisition, construction, soft costs, and developer profit. Buying a property below its replacement cost provides a built-in margin of safety because new competition cannot be built for less than what you paid.',
    body: (s) => [
      h2(s, 1, 'What Is Replacement Cost?'),
      p(s, 2, 'Replacement cost represents the total price tag to build a property from scratch that is functionally equivalent to an existing building. It includes four major components: land cost, hard construction costs (materials and labor), soft costs (architecture, engineering, permits, legal, financing), and developer profit margin (typically 15–20%). When you can buy an existing property for less than the sum of these components, you are effectively getting a discount that no new competitor can match — they would have to spend more to build what you already own.'),
      h2(s, 3, 'Buying Below Replacement Cost'),
      p(s, 4, 'Purchasing below replacement cost creates a structural competitive advantage. If your apartment complex cost $120,000 per unit to acquire and replacement cost is $180,000 per unit, a developer would need to charge significantly higher rents to justify new construction — protecting your occupancy and rent levels. This margin of safety is most valuable in markets where new supply is the primary threat to rental income. During market downturns, replacement cost provides a floor — prices rarely stay below replacement cost for long because developers stop building, eventually tightening supply.'),
      h2(s, 5, 'Estimating Replacement Cost'),
      p(s, 6, 'To estimate replacement cost, start with land value — research recent land sales of comparable parcels in the area. Add hard construction costs, which vary dramatically by market ($150–$400+ per square foot depending on location, building type, and quality). Add soft costs at 20–30% of hard costs for permits, design, financing, legal, and other professional fees. Finally, add 15–20% developer profit margin, since no rational builder would undertake the risk of development without an expected profit. Local contractors, appraisers, and construction cost databases (like RSMeans) provide reliable cost data.'),
      h2(s, 7, 'Market Implications'),
      p(s, 8, 'When market prices exceed replacement cost, developers are incentivized to build new supply, which eventually puts downward pressure on rents and values. When prices are below replacement cost, developers stop building, supply tightens, and values eventually recover. This cycle drives real estate markets over decades. Understanding where your target market sits in this cycle helps you time acquisitions and assess risk. In markets where replacement cost has risen dramatically (due to labor shortages, material inflation, or regulatory costs), existing properties gain a widening competitive moat.'),
      h2(s, 9, 'Replacement Cost as New Supply Barrier'),
      p(s, 10, 'Rising construction costs have become a permanent feature of the real estate landscape. Labor shortages, supply chain disruptions, increasing regulatory requirements, and impact fees have pushed replacement costs to record levels in most markets. This structurally benefits owners of existing properties — the higher the cost to build new, the less new supply enters the market, and the more valuable existing inventory becomes. Savvy investors monitor construction cost trends alongside traditional metrics like cap rates and rent growth to understand the full competitive dynamics of their markets.'),
    ],
  },

  // 16. Yield on Cost
  {
    term: 'Yield on Cost',
    slug: 'yield-on-cost',
    category: 'analysis',
    definition: 'A development and value-add metric calculated as the stabilized Net Operating Income divided by the total project cost (acquisition plus renovation or construction). Yield on cost measures the return being created relative to the total capital deployed, and the spread over market cap rate indicates the value created.',
    body: (s) => [
      h2(s, 1, 'What Is Yield on Cost?'),
      p(s, 2, 'Yield on cost is the development world\'s equivalent of a cap rate, but applied to total project cost rather than purchase price. The formula is: Yield on Cost = Stabilized NOI / Total Project Cost × 100. Total project cost includes everything: land or acquisition price, hard construction or renovation costs, soft costs, financing costs during construction, and lease-up costs. Stabilized NOI is the projected net operating income once the project is fully leased and operating normally. A yield on cost of 8% on a project in a 6% cap rate market signals significant value creation.'),
      h2(s, 3, 'Yield on Cost vs. Market Cap Rate'),
      p(s, 4, 'The spread between yield on cost and the prevailing market cap rate is the key indicator of whether a development or value-add project creates value. If the market cap rate for stabilized apartment buildings is 5.5% and your project delivers a yield on cost of 7.5%, the 200-basis-point spread represents the value you have created through the development process. At a 5.5% cap rate, your project would be worth its stabilized NOI divided by 0.055 — significantly more than your total cost. This spread compensates for the risks of construction, lease-up, and market timing.'),
      h2(s, 5, 'Typical Targets'),
      p(s, 6, 'Developers and value-add investors typically target a yield on cost that is 150–250 basis points above the prevailing market cap rate for stabilized assets. In a 5% cap rate market, a target yield on cost of 6.5–7.5% is standard. If the spread is less than 100 basis points, the risk-adjusted return may not justify the effort and uncertainty of development or renovation. In higher cap rate markets, the absolute yield on cost target rises accordingly — in a 7% cap rate market, developers might target 9%+ yield on cost to justify the risk.'),
      h2(s, 7, 'Example Calculation'),
      p(s, 8, 'You acquire a 20-unit apartment building for $1,500,000 and invest $500,000 in renovations (new kitchens, bathrooms, landscaping, signage). Total project cost is $2,000,000. After renovations, you raise rents from $800 to $1,100 per unit and stabilize at 95% occupancy. Stabilized NOI after all expenses is $170,000. Yield on Cost = $170,000 / $2,000,000 = 8.5%. If comparable stabilized properties trade at 6% cap rates, the property\'s market value would be approximately $2,833,000 ($170,000 / 0.06) — creating $833,000 in value on a $2,000,000 total investment.'),
      h2(s, 9, 'Using Yield on Cost in Decision Making'),
      p(s, 10, 'Yield on cost should be calculated early in the analysis process to determine if a project is worth pursuing. Before making an offer on a value-add property, estimate the stabilized NOI (based on market rents and realistic expenses), calculate total project cost (acquisition plus renovation budget with contingency), and compute the yield on cost. Compare this to the market cap rate — if the spread is attractive, proceed with deeper due diligence. If the spread is thin or negative, the project does not create enough value to justify the risk. Yield on cost is also valuable for comparing different renovation scopes: a lighter touch at lower cost might produce a better yield on cost than a gut renovation with premium finishes.'),
    ],
  },

  // 17. Operating Agreement
  {
    term: 'Operating Agreement',
    slug: 'operating-agreement',
    category: 'legal',
    definition: 'The governing document of a Limited Liability Company (LLC) that defines member roles, profit and loss allocation, management structure, voting rights, capital contribution requirements, and procedures for dissolution. An operating agreement is essential for any real estate LLC, particularly those with multiple members.',
    body: (s) => [
      h2(s, 1, 'What an Operating Agreement Covers'),
      p(s, 2, 'An operating agreement is the internal rulebook for an LLC. It addresses how the company will be managed (member-managed vs. manager-managed), how profits and losses are distributed among members, what happens when additional capital is needed (capital calls), how decisions are made and votes are allocated, restrictions on transferring membership interests, procedures for admitting new members, buyout provisions if a member wants to exit, and dissolution procedures if the LLC is wound down. Without an operating agreement, the LLC defaults to state law — which rarely aligns with what the members actually want.'),
      h2(s, 3, 'Why It Matters in Real Estate'),
      p(s, 4, 'Real estate LLCs face situations that general business partnerships rarely encounter: capital-intensive acquisitions, refinancing decisions, major renovations, property sales, insurance claims, and tenant disputes. An operating agreement tailored to real estate addresses these scenarios explicitly. Who decides when to sell the property? What happens if one member cannot fund their share of a capital call? Can a member force a sale? These questions seem academic when everyone is getting along but become critical during disagreements, market downturns, or life changes like divorce or death. The operating agreement is your partnership prenup.'),
      h2(s, 5, 'Single-Member vs. Multi-Member LLCs'),
      p(s, 6, 'Single-member LLCs still benefit from an operating agreement even though there is no partner to govern. The document reinforces the separation between the individual and the LLC, strengthening the liability protection shield. Courts are more likely to respect the LLC\'s separate legal status (and not "pierce the corporate veil") when a formal operating agreement exists. For multi-member LLCs, the operating agreement is absolutely mandatory — it is the document that prevents misunderstandings and provides a framework for resolving disputes without litigation.'),
      h2(s, 7, 'Key Provisions for Real Estate LLCs'),
      p(s, 8, 'Real estate operating agreements should address several critical scenarios. Capital call provisions define how additional funding requests work — how much notice is required, what happens to non-contributing members (dilution, penalty interest, or forced buyout). Distribution waterfalls specify the order and amounts of profit distribution. Refinance and sale authority clarifies who can authorize major transactions and what approval thresholds are required. Right of first refusal prevents members from selling their interest to outsiders without offering it to existing members first. Deadlock provisions provide a mechanism for resolving disputes when members cannot agree on major decisions.'),
      h2(s, 9, 'Amendment Process and Attorney Involvement'),
      p(s, 10, 'Operating agreements should be living documents that can be amended as circumstances change, but the amendment process itself should be clearly defined — typically requiring unanimous consent or a supermajority vote. Amendments should be documented in writing and signed by all members. While online templates exist, real estate operating agreements should be drafted or reviewed by an attorney experienced in real estate and business law. The cost ($1,500–$5,000) is minimal compared to the potential cost of litigation when a poorly drafted agreement fails to address a critical scenario. Update your operating agreement whenever membership changes, new properties are acquired, or significant business decisions are made.'),
    ],
  },

  // 18. Estoppel Certificate
  {
    term: 'Estoppel Certificate',
    slug: 'estoppel-certificate',
    category: 'legal',
    definition: 'A signed statement by a tenant confirming the key terms of their lease, including rent amount, security deposit held, lease start and end dates, and whether any defaults or violations exist. Estoppel certificates are required during property acquisitions to verify the seller\'s representations about tenancy.',
    body: (s) => [
      h2(s, 1, 'What an Estoppel Certificate Confirms'),
      p(s, 2, 'An estoppel certificate (also called an estoppel letter or tenant estoppel) is a formal document signed by each tenant that verifies critical lease information. It typically confirms: the current monthly rent amount, the security deposit held by the landlord, the lease commencement and expiration dates, any renewal options, whether the tenant has prepaid any rent, whether any landlord defaults or violations exist, any side agreements or modifications to the written lease, and whether the tenant has any claims against the landlord. Once signed, the tenant is legally "estopped" (prevented) from later claiming different terms.'),
      h2(s, 3, 'Why Estoppels Are Required in Acquisitions'),
      p(s, 4, 'When you buy a rental property, you are relying on the seller\'s representations about the income — the rent roll, lease terms, and deposit amounts. But sellers have an incentive to inflate income or conceal problems. Estoppel certificates go directly to the tenants for independent verification. If a seller claims unit 4 pays $1,200 per month but the tenant\'s estoppel shows $1,000 plus a side agreement for free parking, you have discovered a $2,400 annual income discrepancy. Estoppels protect buyers from inheriting surprises and are standard practice in any multi-unit acquisition.'),
      h2(s, 5, 'Legal Implications'),
      p(s, 6, 'Estoppel certificates have binding legal effect. Once a tenant signs an estoppel confirming certain lease terms, they generally cannot later claim those terms were different. This protects the buyer who relied on the estoppel when purchasing the property. Conversely, if a tenant identifies problems in the estoppel — an unresolved maintenance issue, a dispute with the landlord, or a verbal agreement for reduced rent — the buyer is on notice and can negotiate the purchase price accordingly or require the seller to resolve the issues before closing.'),
      h2(s, 7, 'Timing in Due Diligence'),
      p(s, 8, 'Estoppel certificates should be requested early in the due diligence period, ideally within the first week after going under contract. Most purchase agreements give the seller 10–15 days to deliver signed estoppels from all tenants. If a tenant refuses to sign or delays, it raises a red flag — there may be a dispute or the lease terms may differ from what the seller represented. In commercial real estate, estoppels are standard in most leases (tenants are contractually required to respond). In residential transactions, they are less common but equally valuable, especially when buying buildings with month-to-month tenants or informal lease arrangements.'),
      h2(s, 9, 'Using Estoppels Strategically'),
      p(s, 10, 'Smart buyers use estoppel certificates not just for verification but as negotiating tools. If estoppels reveal below-market rents, verbal concessions, or pending maintenance obligations, these findings can justify a price reduction. If tenants report lease violations by the landlord, the buyer can require the seller to cure these issues before closing. Estoppels also serve as your baseline documentation when you take over the property — you have signed confirmation of every tenant\'s terms, deposits, and outstanding issues from day one of your ownership.'),
    ],
  },

  // 19. Phase I Environmental Assessment
  {
    term: 'Phase I Environmental Assessment',
    slug: 'phase-1-environmental',
    category: 'general',
    definition: 'A standardized environmental investigation that evaluates the likelihood of contamination on a property through historical records review, site reconnaissance, and regulatory database searches. Phase I assessments are required by most commercial lenders and provide the buyer with liability protection under federal environmental law.',
    body: (s) => [
      h2(s, 1, 'What a Phase I Covers'),
      p(s, 2, 'A Phase I Environmental Site Assessment (ESA) follows the ASTM E1527 standard and includes four components. Historical use review examines aerial photographs, fire insurance maps, city directories, and property records to determine past uses of the site and surrounding properties. Regulatory database searches check federal, state, and local databases for recorded contamination, underground storage tanks, hazardous waste generators, and spill incidents. Site reconnaissance is a physical inspection looking for evidence of contamination — stained soil, abandoned drums, suspect fill material, underground tank caps, or stressed vegetation. Interviews with current and past owners, occupants, and local officials provide additional context.'),
      h2(s, 3, 'When a Phase I Is Required'),
      p(s, 4, 'Most commercial real estate lenders require a Phase I ESA before funding a loan — banks do not want contaminated collateral. SBA loans universally require Phase I assessments. Even when not required by a lender, a Phase I is strongly recommended for any commercial acquisition, any property with a history of industrial or commercial use, properties near gas stations, dry cleaners, or manufacturing facilities, and any land purchase where future development is planned. The Phase I establishes the "innocent landowner" defense under CERCLA (Superfund law), protecting you from liability for pre-existing contamination.'),
      h2(s, 5, 'Cost and Timeline'),
      p(s, 6, 'A standard Phase I ESA costs $2,000–$5,000 depending on property size, complexity, and location. Reports typically take 2–4 weeks to complete. Costs increase for properties with complex histories, multiple parcels, or locations in heavily industrialized areas that require more extensive records research. Some environmental firms offer expedited timelines (1–2 weeks) for a premium. The Phase I report is valid for 180 days under ASTM standards, after which a limited update may be needed. Budget for this cost in your due diligence plan alongside inspections, appraisals, and title searches.'),
      h2(s, 7, 'Phase II: When Issues Are Found'),
      p(s, 8, 'If the Phase I identifies "recognized environmental conditions" (RECs) — evidence suggesting contamination may exist — a Phase II ESA is recommended. Phase II involves actual sampling and testing: soil borings, groundwater monitoring wells, vapor intrusion testing, or asbestos and lead paint surveys depending on the suspected contamination type. Phase II costs range from $5,000–$50,000+ depending on the scope. If contamination is confirmed, remediation costs can range from manageable ($20,000–$100,000) to deal-killing ($500,000+). The Phase II results determine whether the property is viable and at what price.'),
      h2(s, 9, 'Liability Protection'),
      p(s, 10, 'Under CERCLA, anyone who owns contaminated property can be held liable for cleanup costs — even if they did not cause the contamination. The "innocent landowner" and "bona fide prospective purchaser" defenses protect buyers who conducted appropriate due diligence (a Phase I ESA) before acquiring the property. Without a Phase I, you could be liable for millions in cleanup costs for contamination that existed decades before your purchase. This liability can attach to the property regardless of what your purchase agreement says — environmental liability runs with the land. For this reason alone, skipping a Phase I on commercial property is a risk that no informed investor should take.'),
    ],
  },

  // 20. Loss to Lease
  {
    term: 'Loss to Lease',
    slug: 'loss-to-lease',
    category: 'analysis',
    definition: 'The difference between a property\'s current in-place rents and the prevailing market rents, representing unrealized income potential. Loss to lease quantifies the upside available through rent increases at lease renewal or tenant turnover and is a key indicator of value-add opportunity.',
    body: (s) => [
      h2(s, 1, 'What Is Loss to Lease?'),
      p(s, 2, 'Loss to lease measures how much below market rent your tenants are currently paying. If market rent for a unit is $1,200 per month and the tenant pays $1,050, the loss to lease is $150 per month or $1,800 per year for that unit. Across a property, loss to lease quantifies the total revenue gap between what the property currently earns and what it could earn at market rates. This gap represents either a management failure (the previous owner was not keeping up with the market) or a deliberate strategy (retaining long-term tenants with below-market rents to minimize turnover).'),
      h2(s, 3, 'Loss to Lease as a Value-Add Indicator'),
      p(s, 4, 'Loss to lease is one of the most important metrics for value-add investors. A property with significant loss to lease has built-in upside that does not require physical improvements — you can increase income simply by raising rents to market levels as leases expire. This is sometimes called "organic" value-add because it does not require renovation capital. The value-add investor\'s playbook often combines closing the loss-to-lease gap through market-rate renewals with renovations that push rents above the current market, creating a double uplift in income.'),
      h2(s, 5, 'Formula and Example'),
      p(s, 6, 'Loss to Lease = (Market Rent − In-Place Rent) × Number of Units × 12 Months. Consider a 30-unit apartment building where current average rent is $950 and market rent is $1,050. Loss to Lease = ($1,050 − $950) × 30 × 12 = $36,000 per year. At a 6% cap rate, capturing this $36,000 in additional NOI would increase the property\'s value by $600,000. If the property costs $2,500,000, closing the loss-to-lease gap alone creates a 24% increase in value — before any physical improvements.'),
      h2(s, 7, 'How to Capture Loss to Lease'),
      p(s, 8, 'Loss to lease is captured primarily through two mechanisms: lease renewals and tenant turnover. At renewal, offer existing tenants a rent increase to market (or near market) — some will accept, some will leave. Turnover creates the opportunity to re-lease the unit at full market rent, often after performing minor cosmetic updates. The timeline for capturing loss to lease depends on the lease expiration schedule — if all leases expire within 12 months, you can close the gap quickly. If leases are staggered over 2–3 years, the capture is more gradual. Strategic renovations during turnover justify premium rents that exceed the current market, converting loss to lease into gain to lease.'),
      h2(s, 9, 'Analyzing Loss to Lease in Acquisitions'),
      p(s, 10, 'When evaluating an acquisition, always calculate loss to lease as part of your underwriting. Request a rent roll showing each unit\'s current rent and lease expiration date, then research market rents through comps, rental listings, and property management data. Be conservative in your market rent assumptions — the seller will paint the rosiest picture. Also consider why the loss to lease exists: is it simply poor management, or are there property condition issues that prevent charging market rents? A building with $50,000 in loss to lease but $200,000 in deferred maintenance may not be the value-add opportunity it appears.'),
    ],
  },

  // 21. Concessions
  {
    term: 'Concessions',
    slug: 'concessions',
    category: 'general',
    definition: 'Incentives offered by landlords to attract or retain tenants, such as a free month of rent, reduced security deposits, or move-in credits. Concessions reduce the effective rent received and can signal market weakness, but they are also a strategic tool for maintaining occupancy during lease-up or market softness.',
    body: (s) => [
      h2(s, 1, 'Types of Concessions'),
      p(s, 2, 'The most common concessions in rental real estate include free rent periods (one or two months free on a 12-month lease), reduced or waived security deposits, move-in specials or cash credits ($500–$1,000 off the first month), waived application or administrative fees, free parking or storage for a limited period, and upgrades or improvements at the landlord\'s expense (new appliances, fresh paint, upgraded fixtures). In commercial real estate, tenant improvement allowances (TIA) and free rent periods of several months are standard concessions built into lease negotiations.'),
      h2(s, 3, 'Impact on Effective Rent'),
      p(s, 4, 'Concessions directly reduce the effective rent — the actual revenue received per month over the lease term. If you offer one month free on a $1,500/month apartment with a 12-month lease, the tenant pays $16,500 over 12 months instead of $18,000. The effective monthly rent drops from $1,500 to $1,375, a 8.3% reduction. This distinction matters because the face rent ($1,500) is what appears on the lease and in market surveys, while the effective rent ($1,375) reflects your actual revenue. Lenders and appraisers look at effective rent when underwriting.'),
      h2(s, 5, 'When to Offer Concessions'),
      p(s, 6, 'Concessions are appropriate during lease-up of a new building when you need to fill units quickly, during seasonal slow periods (winter in most markets), when competing with newer or recently renovated buildings that offer superior amenities, when vacancy rates are rising market-wide, and when retaining a quality long-term tenant who might otherwise leave for a competitor. Concessions should be a deliberate, time-limited strategy — not a permanent fixture. If you find yourself offering ongoing concessions, your property may have a pricing, condition, or positioning problem that discounts alone won\'t solve.'),
      h2(s, 7, 'Concessions as a Market Signal'),
      p(s, 8, 'Rising concession activity in a market signals softening demand. When landlords across a submarket begin offering free months and reduced deposits, it indicates that supply is outpacing demand and rents are under pressure. For investors, this creates both caution and opportunity. Caution because your own properties may face pressure. Opportunity because sellers of underperforming properties may be willing to negotiate lower prices. Track concession trends through multifamily market reports, competitor mystery shopping, and conversations with local property management companies.'),
      h2(s, 9, 'Accounting Treatment'),
      p(s, 10, 'From an accounting perspective, concessions should be amortized over the lease term, not recognized in the month they are given. If you offer one month free on a 12-month lease at $1,500/month, you recognize $1,375/month in revenue for 12 months — not $0 in month one and $1,500 for months 2–12. This straight-line approach more accurately reflects the economic reality of the lease and produces consistent financial statements. For tax purposes, consult your CPA, but the general principle of amortizing concessions over the lease term applies. When underwriting an acquisition, always adjust the seller\'s reported income for any concessions to see the true effective revenue.'),
    ],
  },

  // 22. Effective Rent
  {
    term: 'Effective Rent',
    slug: 'effective-rent',
    category: 'analysis',
    definition: 'The actual rental income received per month after accounting for all concessions, free rent periods, and other incentives. Effective rent reveals the true revenue a landlord collects and is more meaningful than face rent (the stated lease amount) for investment analysis and property comparison.',
    body: (s) => [
      h2(s, 1, 'The Effective Rent Formula'),
      p(s, 2, 'Effective Rent = (Total Lease Value − Total Concessions) / Lease Term in Months. For example, a 12-month lease at $1,500/month ($18,000 total) with one month free ($1,500 concession) yields an effective rent of ($18,000 − $1,500) / 12 = $1,375 per month. If the tenant also received a $600 move-in credit, effective rent drops further to ($18,000 − $2,100) / 12 = $1,325. This calculation strips away the marketing veneer and shows what the landlord actually collects per month over the life of the lease.'),
      h2(s, 3, 'Why Effective Rent Matters More Than Face Rent'),
      p(s, 4, 'Face rent (the number on the lease) is what gets advertised, quoted in market surveys, and used in comps. But effective rent is what hits your bank account. Two properties advertising $1,500/month rents can have dramatically different effective rents if one is offering two months free while the other offers no concessions. An investor analyzing a property\'s income potential must look past face rents to effective rents for an accurate revenue picture. Lenders increasingly focus on effective rents when underwriting loans, especially in markets where concession activity is elevated.'),
      h2(s, 5, 'Using Effective Rent for Comparison'),
      p(s, 6, 'When shopping for properties or analyzing a market, effective rent is the apples-to-apples comparison metric. Property A advertises $1,600/month with no concessions (effective rent: $1,600). Property B advertises $1,700/month with two months free on a 12-month lease (effective rent: $1,417). Property B looks more expensive at face value but actually generates $183 less per month in real revenue. Market surveys that only report face rents can paint a misleading picture of market strength — always ask about concession levels to understand true effective rents across the competitive set.'),
      h2(s, 7, 'Impact on Property Valuation'),
      p(s, 8, 'Effective rent flows directly into income, which flows into NOI, which drives property value through cap rate-based valuation. A 100-unit building where face rents average $1,500 but effective rents average $1,375 (due to one month free concessions) has $150,000 less annual revenue than the face-rent analysis suggests. At a 6% cap rate, that $150,000 income gap represents a $2,500,000 reduction in property value. When underwriting an acquisition, always calculate NOI using effective rents, not face rents. Sellers and brokers will present the rosiest numbers — it is the buyer\'s job to normalize for concessions.'),
      h2(s, 9, 'Tracking Effective Rent Trends'),
      p(s, 10, 'Effective rent trends tell a more accurate story about market health than face rent trends. In a softening market, face rents may hold steady or even increase slightly while concessions grow, masking a decline in effective rents. Conversely, in a strengthening market, concessions burn off before face rents rise — effective rents improve first. Tracking your own portfolio\'s effective rent per unit over time reveals whether your revenue is genuinely growing or whether concessions are eroding your gains. Quarterly comparison of face rent vs. effective rent across your portfolio provides early warning of market shifts.'),
    ],
  },

  // 23. Cap Rate Expansion
  {
    term: 'Cap Rate Expansion',
    slug: 'cap-rate-expansion',
    category: 'analysis',
    definition: 'An increase in capitalization rates across a market, which corresponds to a decrease in property values relative to income. Cap rate expansion is driven by rising interest rates, reduced investor demand, or increased perceived risk, and represents the inverse of cap rate compression.',
    body: (s) => [
      h2(s, 1, 'What Is Cap Rate Expansion?'),
      p(s, 2, 'Cap rate expansion occurs when buyers demand higher yields to purchase properties, driving cap rates up and — because value equals NOI divided by cap rate — property values down. If a property generating $100,000 in NOI was worth $2,000,000 at a 5% cap rate and cap rates expand to 6%, the same property is now worth approximately $1,667,000 — a 17% decline in value with zero change in income. Cap rate expansion is the mathematical mechanism through which rising interest rates and shifting risk perceptions translate into lower real estate values.'),
      h2(s, 3, 'Drivers of Cap Rate Expansion'),
      p(s, 4, 'The primary driver is rising interest rates. When borrowing costs increase, leveraged returns compress, making real estate less attractive relative to alternative investments — buyers demand higher cap rates to compensate. Other drivers include economic uncertainty (investors require higher risk premiums), oversupply in specific markets (more competition for tenants drives down projected income growth), and capital market disruptions (reduced availability of debt capital). The 2022–2024 period demonstrated cap rate expansion in action as the Federal Reserve raised rates from near zero to 5%+, causing commercial real estate values to decline 15–30% in many sectors.'),
      h2(s, 5, 'Impact on Portfolio Values'),
      p(s, 6, 'Cap rate expansion erodes portfolio values even when properties perform well operationally. An investor who built a portfolio at 4.5% cap rates during the low-interest-rate era may see significant paper losses when the market reprices to 6% cap rates. This becomes a real problem when refinancing — if the property appraised at $2 million at purchase and is now worth $1.5 million due to cap rate expansion, a cash-out refinance is off the table and even a straight refinance may require additional equity. Investors with low-leverage acquisitions and strong cash flow can weather cap rate expansion; highly leveraged portfolios face distress.'),
      h2(s, 7, 'Hedging Strategies'),
      p(s, 8, 'The best hedge against cap rate expansion is buying right in the first place — acquiring properties with strong current cash flow rather than relying on value appreciation. Fixed-rate, long-term debt protects against the interest rate component of cap rate expansion. Growing NOI through rent increases and expense management can partially offset rising cap rates. Diversification across property types and markets reduces concentration risk. Some institutional investors use interest rate hedges (caps, swaps) on floating-rate debt. For most individual investors, conservative leverage (60–65% LTV), long-term fixed rates, and healthy cash reserves provide the most practical protection.'),
      h2(s, 9, 'Cap Rate Expansion as Buying Opportunity'),
      p(s, 10, 'While cap rate expansion hurts existing owners, it creates opportunities for buyers. Properties trading at 6–7% cap rates produce more cash flow per dollar invested than the same properties at 4–5% cap rates. Distressed sellers who over-leveraged during the compression cycle become motivated to sell at discounts. The investors who build wealth in real estate are those who buy during cap rate expansion (when deals cash flow well) and sell during cap rate compression (when values are inflated). Recognizing where you are in the cap rate cycle is one of the most important skills in real estate investing — it requires monitoring interest rate trends, capital flows, and investor sentiment across markets.'),
    ],
  },

  // 24. Rent Growth
  {
    term: 'Rent Growth',
    slug: 'rent-growth',
    category: 'analysis',
    definition: 'The year-over-year percentage increase in rental rates, measured at the property, submarket, or metro level. Rent growth is a primary driver of NOI growth, property appreciation, and long-term investment returns. National averages typically range from 3–5% annually, but market-level variation is significant.',
    body: (s) => [
      h2(s, 1, 'Why Rent Growth Matters'),
      p(s, 2, 'Rent growth is the engine of real estate value creation. Because property values in income-producing real estate are fundamentally driven by NOI, and the largest component of NOI is rental income, the rate at which rents grow directly determines how fast your property appreciates. A 3% annual rent increase on a property with a 6% cap rate creates roughly 3% annual appreciation from income growth alone — before accounting for market cap rate movements. Compound this over a 10-year hold and the impact on total returns is enormous.'),
      h2(s, 3, 'National Trends vs. Market Variation'),
      p(s, 4, 'National average rent growth has historically tracked 3–5% annually, roughly in line with inflation plus a small real premium. But national averages obscure massive variation. Sun Belt markets like Phoenix, Tampa, Nashville, and Raleigh have experienced 8–15% annual rent growth during demand surges. Stagnant markets in the Midwest or Northeast may see 1–2% growth. And within a single metro, rent growth varies dramatically by submarket, property class, and bedroom count. The opportunity lies in identifying markets and submarkets where rent growth will outpace the national average over your holding period.'),
      h2(s, 5, 'Drivers of Rent Growth'),
      p(s, 6, 'Three fundamental forces drive rent growth. Population growth creates demand — more people need more housing. When a metro adds residents through domestic migration, immigration, or natural increase, rental demand rises. Job growth, particularly in high-paying industries, creates renters who can afford higher rents. Supply constraints — limited new construction due to zoning, geography, construction costs, or NIMBYism — prevent the market from meeting growing demand. The markets with the strongest rent growth are those where demand drivers are robust and supply is constrained. Markets with weak demand drivers or unlimited buildable land tend to see below-average rent growth.'),
      h2(s, 7, 'Impact on NOI and Property Value'),
      p(s, 8, 'Rent growth compounds powerfully through the income waterfall. A 4% rent increase does not just add 4% to revenue — it adds 4% to the top line while expenses grow at a lower rate (typically 2–3%), creating outsized NOI growth. On a property with a 40% expense ratio, a 4% rent increase can produce 6%+ NOI growth. At a constant cap rate, this translates directly into 6%+ appreciation. Over a 5-year hold, the difference between 3% and 5% annual rent growth on a $2 million property can be $200,000+ in additional equity — a material difference in total returns.'),
      h2(s, 9, 'Projecting Rent Growth in Your Analysis'),
      p(s, 10, 'When underwriting a deal, rent growth assumptions drive your projected returns — so they must be realistic. Base your projections on historical market data (at least 5–10 years of rent trends), current supply pipeline (permits and construction starts), demand indicators (job growth, population migration, income trends), and comparable property performance. Be conservative: underwrite to 2–3% annual rent growth even in hot markets, and run a stress test at 0% growth. The best investors use conservative rent growth assumptions to find deals that work on day-one cash flow and treat above-average rent growth as a bonus, not a requirement for the deal to succeed.'),
    ],
  },

  // 25. Supply and Demand
  {
    term: 'Supply and Demand',
    slug: 'supply-and-demand',
    category: 'general',
    definition: 'The fundamental economic relationship between the availability of housing (supply) and the number of people seeking it (demand). Understanding supply and demand dynamics in a local market is the single most important factor in predicting rent growth, vacancy rates, and property appreciation.',
    body: (s) => [
      h2(s, 1, 'Supply Indicators'),
      p(s, 2, 'Supply in real estate is measured by the number of available units for rent or sale, plus the pipeline of new units under construction or in planning. Key supply indicators include building permits issued (a leading indicator of future supply), construction starts and completions, total units under construction as a percentage of existing inventory, and the absorption rate of newly delivered units. When the supply pipeline is large relative to existing inventory (5%+ under construction), the market is at risk of oversupply, which puts downward pressure on rents and upward pressure on vacancy. When the pipeline is thin (under 2%), supply constraints support rent growth.'),
      h2(s, 3, 'Demand Indicators'),
      p(s, 4, 'Housing demand is driven by population growth, household formation, job creation, income growth, and migration patterns. Strong demand indicators include net positive domestic migration (people moving into the metro from other parts of the country), robust job growth (particularly in diverse industries, not just one employer), rising household incomes, and a growing renter population (influenced by demographics, housing affordability, and lifestyle preferences). The most powerful demand signal is when multiple indicators align — a market with population growth, job creation, and rising incomes simultaneously is positioned for sustained rent growth and low vacancy.'),
      h2(s, 5, 'Market Equilibrium'),
      p(s, 6, 'A market is in equilibrium when the supply of housing roughly matches demand, resulting in stable rents and moderate vacancy (typically 5–7% for apartments). When demand exceeds supply, vacancy falls, rents rise, and eventually developers respond by building new units — restoring equilibrium. When supply exceeds demand, vacancy rises, concessions increase, rents stagnate, and developers pull back on new construction — again restoring equilibrium over time. This cycle takes years to play out, and understanding where your target market sits in the cycle helps you time acquisitions and set realistic return expectations.'),
      h2(s, 7, 'How to Research Local Market Dynamics'),
      p(s, 8, 'Start with macro data from the U.S. Census Bureau (population and migration), Bureau of Labor Statistics (employment), and the Federal Reserve (economic indicators). For real estate-specific data, CoStar, Yardi Matrix, RealPage, and CBRE provide submarket-level supply and demand metrics. Local sources include planning department permit data, economic development authority reports, and the local business journal. Walk the market: drive construction sites, count cranes, visit competing properties, and talk to local property managers and brokers. No data source replaces local market knowledge built through consistent engagement with the on-the-ground reality.'),
      h2(s, 9, 'Using Supply and Demand in Investment Decisions'),
      p(s, 10, 'The ideal investment market has strong demand drivers and constrained supply — population and jobs growing while construction is limited by geography, regulation, or costs. Avoid markets with weak demand and heavy supply pipelines, regardless of how attractive current cap rates appear. When analyzing a specific property, zoom in from the metro level to the submarket: supply and demand can vary dramatically within a city. A downtown submarket may have 8% of inventory under construction while a suburban submarket has 1%. Factor supply and demand analysis into your rent growth projections, vacancy assumptions, and exit cap rate expectations — they are the foundation upon which all other assumptions rest.'),
    ],
  },

  // 26. Gentrification
  {
    term: 'Gentrification',
    slug: 'gentrification',
    category: 'general',
    definition: 'The process by which a lower-income or underinvested neighborhood experiences an influx of higher-income residents, new businesses, and property investment, leading to rising property values and rents. Gentrification presents both investment opportunity and social responsibility considerations.',
    body: (s) => [
      h2(s, 1, 'Early Indicators of Gentrification'),
      p(s, 2, 'Experienced investors learn to recognize the early signals of neighborhood transformation. Specialty coffee shops, craft breweries, and artisanal restaurants appearing in formerly neglected commercial corridors are classic leading indicators. New bike lanes, improved streetscaping, and public art installations signal government investment in the area. An emerging arts district — galleries, studios, performance venues — often precedes broader gentrification by 3–5 years. Other early signals include a rising number of building permits, increasing home sale prices while rents remain affordable, and demographic shifts visible in census data (rising median income, increasing educational attainment, declining household size).'),
      h2(s, 3, 'Investment Opportunity: Buying Early'),
      p(s, 4, 'The investment thesis for gentrifying neighborhoods is simple: buy early, before the market fully recognizes the neighborhood\'s trajectory, and benefit from outsized appreciation as the transformation unfolds. Properties purchased at $80,000–$120,000 per unit in early-stage gentrifying neighborhoods have been known to appreciate to $200,000–$350,000 per unit over 5–10 years as the neighborhood transforms. The key is identifying neighborhoods in the early-to-middle stages — before institutional capital arrives and compresses cap rates. Look for neighborhoods adjacent to already-gentrified areas, near transit investments, or with historic housing stock that appeals to renovation-minded buyers.'),
      h2(s, 5, 'Displacement Concerns'),
      p(s, 6, 'Gentrification is controversial because rising rents and property values can displace long-term residents who can no longer afford to live in their neighborhood. Families, seniors, and small businesses that formed the fabric of the community may be priced out, replaced by higher-income newcomers. This displacement disproportionately affects communities of color and low-income households. Investors operating in gentrifying neighborhoods should acknowledge and grapple with these impacts — both because it is the right thing to do and because community opposition to displacement can trigger policy responses that directly affect investment returns.'),
      h2(s, 7, 'Social Responsibility for Investors'),
      p(s, 8, 'Responsible investing in gentrifying neighborhoods does not mean avoiding them — it means operating thoughtfully. Practical approaches include gradual rent increases rather than immediate jumps to market rate, maintaining affordable units alongside market-rate units, investing in property improvements that benefit existing tenants (not just cosmetic upgrades to justify rent hikes), supporting local businesses as commercial tenants, engaging with community organizations, and considering rent stabilization for long-term tenants. Some investors structure affordable housing set-asides within their portfolios, dedicating a percentage of units to below-market rents.'),
      h2(s, 9, 'Risk of Policy Backlash'),
      p(s, 10, 'Aggressive gentrification can provoke political responses that directly threaten investment returns. Rent control ordinances limit rent increases to a fixed annual percentage, capping revenue growth. Just-cause eviction laws restrict an owner\'s ability to remove tenants, complicating renovations and sales. Inclusionary zoning requires affordable units in new developments, increasing costs. Community benefit agreements may impose conditions on development projects. These policies have expanded rapidly in cities experiencing rapid gentrification — Portland, Minneapolis, Los Angeles, and New York have all enacted tenant protection legislation in response to displacement concerns. Investors should monitor local politics and factor regulatory risk into their analysis of gentrifying neighborhoods.'),
    ],
  },
]

// ── Main seed function ───────────────────────────────────────────────

async function seed() {
  // 1. Fetch existing slugs
  const existing = await client.fetch(
    `*[_type == "glossaryTerm" && defined(slug.current)]{ "slug": slug.current }`
  )
  const existingSlugs = new Set(existing.map((t) => t.slug))

  // 2. Filter out duplicates
  const termsToCreate = newTerms.filter((t) => !existingSlugs.has(t.slug))

  if (termsToCreate.length === 0) {
    console.log('All 26 terms already exist. Nothing to create.')
    return
  }

  console.log(`Found ${existingSlugs.size} existing glossary terms.`)
  console.log(`Creating ${termsToCreate.length} new terms...\n`)

  // 3. Build transaction
  const transaction = client.transaction()

  for (const t of termsToCreate) {
    console.log(`  + ${t.term}`)
    transaction.create({
      _type: 'glossaryTerm',
      term: t.term,
      slug: { _type: 'slug', current: t.slug },
      definition: t.definition,
      category: t.category,
      body: t.body(t.slug),
    })
  }

  if (DRY_RUN) {
    console.log('\n[DRY RUN] No changes written.')
    return
  }

  // 4. Commit
  console.log('\nCommitting transaction...')
  const result = await transaction.commit()
  console.log(`\nDone! Created ${result.results.length} glossary terms.`)
  console.log(`Total glossary: ${existingSlugs.size + termsToCreate.length} terms.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
