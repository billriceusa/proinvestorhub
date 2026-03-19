import { cities, type CityCapRate } from './cap-rate-cities'

export type Strategy = {
  slug: string
  title: string
  shortTitle: string
  description: string
  metaTitle: string
  metaDescription: string
  scoreFn: (city: CityCapRate) => number
  scoreLabel: string
  scoreExplainer: string
  heroIntro: string
  methodology: string
  relatedCalculators: { href: string; label: string }[]
  relatedArticles: { href: string; label: string }[]
  /** City-specific editorial insights keyed by slug. Only top/notable cities need entries. */
  cityInsights: Record<string, string>
}

/**
 * Normalize a value to a 0–10 scale given a min and max range.
 * Values outside the range are clamped.
 */
function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(10, ((value - min) / (max - min)) * 10))
}

export const strategies: Strategy[] = [
  {
    slug: 'cash-flow',
    title: 'Best Cities for Cash Flow Investing in 2026',
    shortTitle: 'Cash Flow',
    description:
      'Markets ranked by cash flow potential — factoring in rent-to-price ratio, cap rate, vacancy, and property taxes.',
    metaTitle:
      'Best Cities for Cash Flow Real Estate Investing 2026 | ProInvestorHub',
    metaDescription:
      'Data-driven rankings of the best US cities for cash flow real estate investing in 2026. Compare rent-to-price ratios, cap rates, vacancy rates, and property taxes across 50 markets.',
    scoreFn: (city) => {
      const rentToPrice = normalize(city.rentToPrice * 100, 0.25, 1.3) * 3
      const capRate = normalize(city.avgCapRate, 2.5, 12) * 3
      const lowVacancy = normalize(12 - city.vacancyRate, 0, 8) * 2
      const lowTax = normalize(3 - city.propertyTaxRate, 0, 3) * 2
      return Math.round(((rentToPrice + capRate + lowVacancy + lowTax) / 10) * 10) / 10
    },
    scoreLabel: 'Cash Flow Score',
    scoreExplainer:
      'Weighted composite: rent-to-price ratio (30%), cap rate (30%), low vacancy (20%), low property taxes (20%). Scale 0–10.',
    heroIntro:
      'Cash flow investing is the foundation of financial freedom through real estate. The best cash flow markets combine high rents relative to purchase price, reasonable vacancy rates, and manageable property taxes. These markets generate positive monthly income from day one — money that covers your mortgage, builds reserves, and eventually replaces your earned income. This ranking uses a weighted composite score to identify the markets where the numbers are most likely to work in your favor.',
    methodology:
      'Each city is scored on a 0–10 scale using four weighted factors: rent-to-price ratio (30% weight) — the percentage of home value collected as monthly rent, the single best quick indicator of cash flow potential; average cap rate (30%) — net operating income relative to property value, measuring the unlevered return on investment; vacancy rate (20%, inverted) — lower vacancy means more reliable income and less lost revenue; and property tax rate (20%, inverted) — lower taxes mean more of your rental income reaches the bottom line. Data sources include Census ACS, Zillow, Redfin, and county assessor records.',
    relatedCalculators: [
      { href: '/calculators/rental-cashflow', label: 'Rental Cash Flow Calculator' },
      { href: '/calculators/cash-on-cash', label: 'Cash-on-Cash Return Calculator' },
      { href: '/calculators/cap-rate', label: 'Cap Rate Calculator' },
    ],
    relatedArticles: [
      { href: '/blog/best-cash-flow-markets-2026', label: 'Best Markets for Cash Flow Investing in 2026' },
      { href: '/blog/rental-property-investing-complete-guide', label: 'Rental Property Investing: Complete Guide' },
      { href: '/blog/how-to-buy-first-rental-property', label: 'How to Buy Your First Rental Property' },
    ],
    cityInsights: {
      'detroit-mi': 'Detroit tops the cash flow rankings due to its extremely low entry prices and high rent-to-price ratios. The key is neighborhood selection — focus on stabilizing areas with active renovation and avoid blocks with high vacancy. Corktown, Midtown, and Grandmont-Rosedale offer the best risk-adjusted cash flow.',
      'cleveland-oh': 'Cleveland delivers consistent cash flow with a diversified healthcare and education economy. The Tremont and Ohio City neighborhoods have seen institutional investor activity, validating the rental demand thesis. Property taxes are the main drag — factor them carefully.',
      'memphis-tn': 'Memphis is the established turnkey rental capital of the US. Multiple turnkey providers operate here with proven track records, making it accessible for out-of-state investors. The FedEx logistics hub provides employment stability that supports reliable rental demand.',
      'indianapolis-in': 'Indianapolis is the best-balanced cash flow market in the country — positive population growth, diversified economy, landlord-friendly laws, and prices that still support the 1% rule in many neighborhoods. It checks every box for a first-time out-of-state investor.',
      'birmingham-al': 'Birmingham combines strong cap rates with the lowest property taxes in this ranking (0.43%). That tax advantage adds $2,000–$4,000 per year to your bottom line compared to Ohio markets with similar cap rates. The UAB medical center anchors a growing healthcare employment cluster.',
      'kansas-city-mo': 'Kansas City spans two states, giving investors a choice of Missouri or Kansas tax treatment. The Crossroads and Midtown neighborhoods are gentrifying rapidly, offering both cash flow today and appreciation upside.',
      'little-rock-ar': 'Little Rock is overlooked by most investors, which is exactly why the numbers still work. Low competition, low property taxes, and stable government-sector employment create a quiet but reliable cash flow market.',
      'oklahoma-city-ok': 'Oklahoma City pairs strong population growth (4.5%) with cash-flow-friendly pricing. The energy sector has diversified into aerospace and tech, reducing the boom-bust cyclicality that historically affected Oklahoma markets.',
    },
  },
  {
    slug: 'brrrr',
    title: 'Best Cities for the BRRRR Strategy in 2026',
    shortTitle: 'BRRRR',
    description:
      'Markets ranked by BRRRR viability — factoring in affordable entry prices, cap rates, population growth, and rent-to-price ratio.',
    metaTitle:
      'Best Cities for BRRRR Real Estate Investing 2026 | ProInvestorHub',
    metaDescription:
      'Data-driven rankings of the best US cities for the BRRRR strategy in 2026. Find markets with low entry prices, strong rents, and population growth to Buy, Rehab, Rent, Refinance, Repeat.',
    scoreFn: (city) => {
      // BRRRR needs: low price (affordable rehab deals), good cap rate (refinance works),
      // population growth (demand for rentals), decent rent-to-price (cash flow post-refi)
      const affordability = normalize(800000 - city.medianHomePrice, 0, 750000) * 2.5
      const capRate = normalize(city.avgCapRate, 2.5, 12) * 3
      const growth = normalize(city.populationGrowth, -4, 16) * 2
      const rentToPrice = normalize(city.rentToPrice * 100, 0.25, 1.3) * 2.5
      return Math.round(((affordability + capRate + growth + rentToPrice) / 10) * 10) / 10
    },
    scoreLabel: 'BRRRR Score',
    scoreExplainer:
      'Weighted composite: cap rate (30%), affordable entry price (25%), rent-to-price ratio (25%), population growth (20%). Scale 0–10.',
    heroIntro:
      'The BRRRR strategy — Buy, Rehab, Rent, Refinance, Repeat — is the fastest way to scale a rental portfolio with limited capital. But BRRRR only works in markets where the math supports each step: purchase prices low enough to find distressed deals, rents high enough to support the refinanced mortgage, cap rates strong enough to make the numbers work, and population growth to ensure ongoing tenant demand. This ranking identifies the markets where all four conditions align.',
    methodology:
      'Each city is scored on a 0–10 scale using four weighted factors: cap rate (30% weight) — higher cap rates mean the refinanced property is more likely to cash flow; affordable entry price (25%) — lower median prices mean lower acquisition and rehab costs, making it easier to recycle capital; rent-to-price ratio (25%) — ensures the refinanced mortgage payment is covered by rental income; and population growth (20%) — growing markets have growing rental demand, reducing vacancy risk on newly renovated properties. Data sources include Census ACS, Zillow, Redfin, and county assessor records.',
    relatedCalculators: [
      { href: '/calculators/brrrr', label: 'BRRRR Calculator' },
      { href: '/calculators/rental-cashflow', label: 'Rental Cash Flow Calculator' },
      { href: '/calculators/cash-on-cash', label: 'Cash-on-Cash Return Calculator' },
    ],
    relatedArticles: [
      { href: '/blog/brrrr-method-complete-guide', label: 'The BRRRR Method: Complete Guide' },
      { href: '/blog/brrrr-rehab-cost-estimation', label: 'BRRRR Rehab Costs: How to Estimate' },
      { href: '/blog/hard-money-loans-explained', label: 'Hard Money Loans Explained' },
    ],
    cityInsights: {
      'indianapolis-in': 'Indianapolis is the top BRRRR market because it combines affordable prices with strong population growth. Distressed properties are widely available in neighborhoods like Fountain Square and Irvington, and the refinance appraisals support capital recovery because comparable renovated properties sell well.',
      'detroit-mi': 'Detroit offers the lowest entry prices for BRRRR, but be cautious — appraisals on refinance can be challenging in some neighborhoods where there are not enough comparable renovated sales. Focus on areas with active renovation to ensure your ARV holds up.',
      'memphis-tn': 'Memphis has a deep pool of distressed properties and established contractor networks familiar with investor renovations. The turnkey infrastructure means you can find rehab crews who specialize in investor-grade renovations, keeping costs predictable.',
      'birmingham-al': 'Birmingham BRRRR deals benefit from ultra-low property taxes, which means your post-refinance cash flow is stronger than equivalent deals in higher-tax states. Southside and Avondale are seeing renovation activity that supports after-repair values.',
      'cleveland-oh': 'Cleveland has strong BRRRR fundamentals but higher property taxes reduce post-refinance cash flow. Target the west side neighborhoods where renovation comps are well-established and hard money lenders are comfortable lending.',
      'oklahoma-city-ok': 'Oklahoma City combines affordable prices with one of the strongest population growth rates on this list. The south side and Capitol Hill neighborhoods have significant BRRRR potential as the market expands outward from downtown.',
      'huntsville-al': 'Huntsville is the growth outlier — 14.2% population growth combined with low taxes. Higher entry prices than other BRRRR markets, but the appreciation component of BRRRR is exceptionally strong here.',
      'columbus-oh': 'Columbus BRRRR deals benefit from Intel-driven growth. The Linden and Hilltop neighborhoods offer distressed inventory at prices that make the 70% rule work, and the growing population supports rental demand post-renovation.',
    },
  },
  {
    slug: 'house-hacking',
    title: 'Best Cities for House Hacking in 2026',
    shortTitle: 'House Hacking',
    description:
      'Markets ranked by house hacking viability — factoring in affordable entry, strong rents, low vacancy, and population growth.',
    metaTitle:
      'Best Cities for House Hacking 2026 | ProInvestorHub',
    metaDescription:
      'Data-driven rankings of the best US cities for house hacking in 2026. Find affordable markets with strong rents where you can live for free (or close to it) while building equity.',
    scoreFn: (city) => {
      // House hacking needs: affordable entry (FHA-friendly prices), good rents (to offset mortgage),
      // low vacancy (reliable tenants), population growth (demand), livability (income proxy)
      const affordability = normalize(600000 - city.medianHomePrice, 0, 550000) * 3
      const rentToPrice = normalize(city.rentToPrice * 100, 0.25, 1.3) * 2.5
      const lowVacancy = normalize(12 - city.vacancyRate, 0, 8) * 2
      const growth = normalize(city.populationGrowth, -4, 16) * 1.5
      const livability = normalize(city.medianHouseholdIncome, 30000, 110000) * 1
      return Math.round(((affordability + rentToPrice + lowVacancy + growth + livability) / 10) * 10) / 10
    },
    scoreLabel: 'House Hack Score',
    scoreExplainer:
      'Weighted composite: affordable entry price (30%), rent-to-price ratio (25%), low vacancy (20%), population growth (15%), livability/income (10%). Scale 0–10.',
    heroIntro:
      'House hacking is the most powerful first move in real estate investing. Buy a duplex, triplex, or fourplex with an owner-occupied loan (FHA with 3.5% down), live in one unit, and rent the others to cover your mortgage. The best house hacking markets combine affordable purchase prices (to qualify with FHA), strong rental demand (to keep units occupied), and population growth (to ensure appreciation while you build equity). This ranking identifies the markets where the math is most likely to let you live for free — or close to it.',
    methodology:
      'Each city is scored on a 0–10 scale using five weighted factors: affordable entry price (30% weight) — lower prices mean FHA-qualifying is easier and your mortgage payment is lower; rent-to-price ratio (25%) — higher ratios mean tenant rents are more likely to cover the entire mortgage; low vacancy rate (20%) — reliable tenant occupancy in the other units; population growth (15%) — growing demand for housing supports both rents and appreciation; and livability/median income (10%) — you are going to live here, so quality of life matters. Data sources include Census ACS, Zillow, Redfin, and county assessor records.',
    relatedCalculators: [
      { href: '/calculators/mortgage', label: 'Mortgage/DSCR Calculator' },
      { href: '/calculators/rental-cashflow', label: 'Rental Cash Flow Calculator' },
      { href: '/calculators/cash-on-cash', label: 'Cash-on-Cash Return Calculator' },
    ],
    relatedArticles: [
      { href: '/blog/house-hacking-101-live-for-free', label: 'House Hacking 101: Live for Free' },
      { href: '/blog/how-to-buy-first-rental-property', label: 'How to Buy Your First Rental Property' },
      { href: '/blog/how-to-screen-tenants', label: 'How to Screen Tenants: Complete Checklist' },
    ],
    cityInsights: {
      'indianapolis-in': 'Indianapolis is arguably the best house hacking city in America. Duplexes and triplexes in Fountain Square, Irvington, and Broad Ripple are available at FHA-friendly prices, rents easily cover the mortgage, and the city is growing. The perfect combination for a first-time investor-occupant.',
      'kansas-city-mo': 'Kansas City duplexes in Westport, Midtown, and the Crossroads are livable neighborhoods where you would actually want to live — a crucial factor in house hacking. Strong rents and moderate prices make the math work on 2–4 unit properties.',
      'louisville-ky': 'Louisville shotgun-style duplexes in the Highlands and Germantown are classic house hack properties. Low property taxes boost your effective return, and the walkable neighborhoods attract quality tenants for the other unit.',
      'columbus-oh': 'Columbus house hacking benefits from the massive OSU student population and Intel-driven growth. Properties near campus are the obvious play, but the Short North and Clintonville also offer strong rental demand with better long-term tenant quality.',
      'huntsville-al': 'Huntsville is the growth pick for house hacking. Higher entry prices than Midwest markets, but 14.2% population growth means your property is appreciating while your tenants pay down your mortgage. Ultra-low property taxes sweeten the deal.',
      'oklahoma-city-ok': 'Oklahoma City offers affordable multifamily properties with strong population growth. The Plaza District and Paseo Arts District are livable neighborhoods with good rental demand. No state income tax on rental income is a bonus.',
      'des-moines-ia': 'Des Moines is a sleeper house hacking market. Low vacancy (5.8%), positive population growth, and affordable prices mean your units stay rented and your mortgage gets paid. The insurance/financial sector economy provides stable tenant employment.',
      'richmond-va': 'Richmond combines East Coast livability with affordable multifamily prices. The Fan District and Church Hill have strong rental demand from VCU students and young professionals. A great house hack market if you want to be within striking distance of DC.',
    },
  },
  {
    slug: 'appreciation',
    title: 'Best Cities for Real Estate Appreciation in 2026',
    shortTitle: 'Appreciation',
    description:
      'Markets ranked by appreciation potential — factoring in population growth, income growth, low vacancy, and economic momentum.',
    metaTitle:
      'Best Cities for Real Estate Appreciation 2026 | ProInvestorHub',
    metaDescription:
      'Data-driven rankings of the best US cities for real estate appreciation in 2026. Find markets with explosive population growth, strong job markets, and rising property values.',
    scoreFn: (city) => {
      // Appreciation needs: population growth, high incomes, low vacancy, moderate-high prices (signal demand)
      const growth = normalize(city.populationGrowth, -4, 16) * 4
      const income = normalize(city.medianHouseholdIncome, 30000, 120000) * 2.5
      const lowVacancy = normalize(12 - city.vacancyRate, 0, 8) * 2
      const demand = normalize(city.population, 100000, 3000000) * 1.5
      return Math.round(((growth + income + lowVacancy + demand) / 10) * 10) / 10
    },
    scoreLabel: 'Appreciation Score',
    scoreExplainer:
      'Weighted composite: population growth (40%), median household income (25%), low vacancy (20%), metro size/demand (15%). Scale 0–10.',
    heroIntro:
      'Appreciation investing is the long game — buying in markets where property values are rising because of fundamental demand drivers. The best appreciation markets share common traits: explosive population growth fueled by job creation, high and rising household incomes that support increasing home prices, tight vacancy that signals demand exceeding supply, and a large enough metro to sustain momentum. These markets may not cash flow strongly today, but the equity gains over 5 to 10 years can dwarf the returns from cash flow alone.',
    methodology:
      'Each city is scored on a 0–10 scale using four weighted factors: population growth (40% weight) — the strongest single predictor of long-term price appreciation; median household income (25%) — higher incomes support higher purchase prices and continued price growth; low vacancy rate (20%) — tight supply signals strong demand relative to available housing; and metro population size (15%) — larger metros have more economic diversity and deeper buyer pools, supporting price stability. Data sources include Census ACS, Zillow, Redfin, and BLS employment data.',
    relatedCalculators: [
      { href: '/calculators/cash-on-cash', label: 'Cash-on-Cash Return Calculator' },
      { href: '/calculators/cap-rate', label: 'Cap Rate Calculator' },
      { href: '/calculators/mortgage', label: 'Mortgage/DSCR Calculator' },
    ],
    relatedArticles: [
      { href: '/blog/building-real-estate-portfolio', label: 'Building a Portfolio: From 1 to 10 Properties' },
      { href: '/blog/real-estate-investing-beginners-guide-2026', label: 'Real Estate Investing: Beginner\'s Guide 2026' },
      { href: '/blog/real-estate-tax-strategies-guide', label: 'Tax Strategies for Real Estate Investors' },
    ],
    cityInsights: {
      'raleigh-nc': 'Raleigh Research Triangle has the strongest appreciation thesis on this list: 15% population growth, $72K median income, and a tech/biotech job engine that is adding high-paying positions faster than housing can be built. Apple, Google, and Epic Games have all expanded here.',
      'austin-tx': 'Austin price correction from 2023–2024 peaks has created a re-entry opportunity. The fundamentals remain exceptional — 15% population growth, $75K median income, and a tech employer base that includes Tesla, Apple, Samsung, and Oracle. The multifamily oversupply is temporary.',
      'charlotte-nc': 'Charlotte is the banking capital of the Southeast with 12.5% population growth. Bank of America, Wells Fargo, and a growing fintech sector drive high-income employment. The BeltLine-style trail system and urban development are accelerating property value gains in NoDa and South End.',
      'phoenix-az': 'Phoenix semiconductor investment (TSMC, Intel) is transforming the east Valley into a tech corridor. Population growth of 11% and strong income growth support continued appreciation. The west Valley offers the best entry points for investors positioning for the next decade.',
      'nashville-tn': 'Nashville has shifted from a cash flow market to an appreciation play. No state income tax, vibrant culture, and corporate relocations (Oracle, Amazon, AllianceBernstein) continue to drive population and price growth. East Nashville and the Gulch lead appreciation.',
      'boise-id': 'Boise saw explosive appreciation from 2020–2023 and prices have stabilized. The 12% population growth and remote worker migration from the Bay Area continue, but the pace of appreciation has moderated. Low vacancy (4.2%) and limited new supply support the long-term thesis.',
      'huntsville-al': 'Huntsville is the dark horse appreciation market. NASA, defense contractors, and the FBI all have major operations here, driving 14.2% population growth. The combination of ultra-low property taxes and high-income employment makes this a cash-flow-plus-appreciation hybrid.',
      'jacksonville-fl': 'Jacksonville benefits from Florida migration trends with more affordable entry than Miami, Tampa, or Orlando. The deepwater port expansion and financial services sector provide economic diversity beyond tourism. No state income tax amplifies investor returns.',
    },
  },
]

export type CityWithScore = CityCapRate & {
  score: number
}

/**
 * Returns all cities scored and sorted for a given strategy.
 */
export function getCitiesForStrategy(strategySlug: string): CityWithScore[] {
  const strategy = strategies.find((s) => s.slug === strategySlug)
  if (!strategy) return []

  return cities
    .map((city) => ({
      ...city,
      score: strategy.scoreFn(city),
    }))
    .sort((a, b) => b.score - a.score)
}
