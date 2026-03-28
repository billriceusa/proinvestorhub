/**
 * US states data for programmatic lender directory pages.
 * Maps state abbreviations, names, slugs, and regional context.
 */

export type USState = {
  name: string
  slug: string
  abbreviation: string
  region: 'northeast' | 'southeast' | 'midwest' | 'southwest' | 'west'
}

export const usStates: USState[] = [
  { name: 'Alabama', slug: 'alabama', abbreviation: 'AL', region: 'southeast' },
  { name: 'Alaska', slug: 'alaska', abbreviation: 'AK', region: 'west' },
  { name: 'Arizona', slug: 'arizona', abbreviation: 'AZ', region: 'southwest' },
  { name: 'Arkansas', slug: 'arkansas', abbreviation: 'AR', region: 'southeast' },
  { name: 'California', slug: 'california', abbreviation: 'CA', region: 'west' },
  { name: 'Colorado', slug: 'colorado', abbreviation: 'CO', region: 'west' },
  { name: 'Connecticut', slug: 'connecticut', abbreviation: 'CT', region: 'northeast' },
  { name: 'Delaware', slug: 'delaware', abbreviation: 'DE', region: 'northeast' },
  { name: 'Florida', slug: 'florida', abbreviation: 'FL', region: 'southeast' },
  { name: 'Georgia', slug: 'georgia', abbreviation: 'GA', region: 'southeast' },
  { name: 'Hawaii', slug: 'hawaii', abbreviation: 'HI', region: 'west' },
  { name: 'Idaho', slug: 'idaho', abbreviation: 'ID', region: 'west' },
  { name: 'Illinois', slug: 'illinois', abbreviation: 'IL', region: 'midwest' },
  { name: 'Indiana', slug: 'indiana', abbreviation: 'IN', region: 'midwest' },
  { name: 'Iowa', slug: 'iowa', abbreviation: 'IA', region: 'midwest' },
  { name: 'Kansas', slug: 'kansas', abbreviation: 'KS', region: 'midwest' },
  { name: 'Kentucky', slug: 'kentucky', abbreviation: 'KY', region: 'southeast' },
  { name: 'Louisiana', slug: 'louisiana', abbreviation: 'LA', region: 'southeast' },
  { name: 'Maine', slug: 'maine', abbreviation: 'ME', region: 'northeast' },
  { name: 'Maryland', slug: 'maryland', abbreviation: 'MD', region: 'northeast' },
  { name: 'Massachusetts', slug: 'massachusetts', abbreviation: 'MA', region: 'northeast' },
  { name: 'Michigan', slug: 'michigan', abbreviation: 'MI', region: 'midwest' },
  { name: 'Minnesota', slug: 'minnesota', abbreviation: 'MN', region: 'midwest' },
  { name: 'Mississippi', slug: 'mississippi', abbreviation: 'MS', region: 'southeast' },
  { name: 'Missouri', slug: 'missouri', abbreviation: 'MO', region: 'midwest' },
  { name: 'Montana', slug: 'montana', abbreviation: 'MT', region: 'west' },
  { name: 'Nebraska', slug: 'nebraska', abbreviation: 'NE', region: 'midwest' },
  { name: 'Nevada', slug: 'nevada', abbreviation: 'NV', region: 'west' },
  { name: 'New Hampshire', slug: 'new-hampshire', abbreviation: 'NH', region: 'northeast' },
  { name: 'New Jersey', slug: 'new-jersey', abbreviation: 'NJ', region: 'northeast' },
  { name: 'New Mexico', slug: 'new-mexico', abbreviation: 'NM', region: 'southwest' },
  { name: 'New York', slug: 'new-york', abbreviation: 'NY', region: 'northeast' },
  { name: 'North Carolina', slug: 'north-carolina', abbreviation: 'NC', region: 'southeast' },
  { name: 'North Dakota', slug: 'north-dakota', abbreviation: 'ND', region: 'midwest' },
  { name: 'Ohio', slug: 'ohio', abbreviation: 'OH', region: 'midwest' },
  { name: 'Oklahoma', slug: 'oklahoma', abbreviation: 'OK', region: 'southwest' },
  { name: 'Oregon', slug: 'oregon', abbreviation: 'OR', region: 'west' },
  { name: 'Pennsylvania', slug: 'pennsylvania', abbreviation: 'PA', region: 'northeast' },
  { name: 'Rhode Island', slug: 'rhode-island', abbreviation: 'RI', region: 'northeast' },
  { name: 'South Carolina', slug: 'south-carolina', abbreviation: 'SC', region: 'southeast' },
  { name: 'South Dakota', slug: 'south-dakota', abbreviation: 'SD', region: 'midwest' },
  { name: 'Tennessee', slug: 'tennessee', abbreviation: 'TN', region: 'southeast' },
  { name: 'Texas', slug: 'texas', abbreviation: 'TX', region: 'southwest' },
  { name: 'Utah', slug: 'utah', abbreviation: 'UT', region: 'west' },
  { name: 'Vermont', slug: 'vermont', abbreviation: 'VT', region: 'northeast' },
  { name: 'Virginia', slug: 'virginia', abbreviation: 'VA', region: 'southeast' },
  { name: 'Washington', slug: 'washington', abbreviation: 'WA', region: 'west' },
  { name: 'West Virginia', slug: 'west-virginia', abbreviation: 'WV', region: 'southeast' },
  { name: 'Wisconsin', slug: 'wisconsin', abbreviation: 'WI', region: 'midwest' },
  { name: 'Wyoming', slug: 'wyoming', abbreviation: 'WY', region: 'west' },
]

export function getStateBySlug(slug: string): USState | undefined {
  return usStates.find((s) => s.slug === slug)
}

export function getStateByAbbreviation(abbr: string): USState | undefined {
  return usStates.find((s) => s.abbreviation === abbr.toUpperCase())
}

/** State-specific investing context for richer programmatic pages */
export const stateInvestingContext: Record<string, {
  highlights: string
  landlordFriendly: 'friendly' | 'moderate' | 'strict'
  noStateTax: boolean
  keyMarkets: string[]
}> = {
  alabama: {
    highlights: 'Ultra-low property taxes, strong cap rates in Birmingham and Huntsville, landlord-friendly laws. Huntsville is one of the fastest-growing metros in the US driven by NASA, defense, and tech.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Birmingham', 'Huntsville', 'Mobile', 'Montgomery'],
  },
  arizona: {
    highlights: 'Explosive population growth, TSMC semiconductor investment transforming the east Valley, strong appreciation play. Phoenix metro is one of the top markets for long-term appreciation.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'],
  },
  california: {
    highlights: 'Highest property values in the US, strong appreciation but challenging cash flow. Strict rent control in major cities. Out-of-state investors often use California equity to invest in cash-flow markets.',
    landlordFriendly: 'strict',
    noStateTax: false,
    keyMarkets: ['Los Angeles', 'San Diego', 'Sacramento', 'Riverside', 'San Francisco'],
  },
  colorado: {
    highlights: 'Strong appreciation market, growing tech and outdoor recreation economies. Denver metro has high prices but consistent demand. Colorado Springs offers more affordable entry points.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins'],
  },
  florida: {
    highlights: 'No state income tax, massive population inflows, strong STR markets. Florida is the top destination for out-of-state investors. Jacksonville, Tampa, and Orlando offer different investment profiles.',
    landlordFriendly: 'friendly',
    noStateTax: true,
    keyMarkets: ['Jacksonville', 'Tampa', 'Orlando', 'Miami', 'Fort Lauderdale'],
  },
  georgia: {
    highlights: 'Atlanta is a top-tier investment market with strong population growth, major corporate relocations, and diverse neighborhoods. Savannah and Augusta offer smaller-market opportunities.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Atlanta', 'Savannah', 'Augusta', 'Columbus'],
  },
  idaho: {
    highlights: 'Boise saw explosive growth from remote worker migration. Prices have stabilized but population growth continues. Low property taxes and strong quality of life drive ongoing demand.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls'],
  },
  illinois: {
    highlights: 'Chicago suburbs offer strong cash flow despite high property taxes. Downstate markets like Springfield and Peoria provide affordable entry points. Watch property tax reassessments carefully.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Chicago', 'Aurora', 'Naperville', 'Springfield'],
  },
  indiana: {
    highlights: 'Indianapolis is the top-rated cash flow market in the US — positive population growth, diversified economy, landlord-friendly laws, and prices that still support the 1% rule.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend'],
  },
  michigan: {
    highlights: 'Detroit offers the lowest entry prices and highest cap rates in the country, but requires careful neighborhood selection. Grand Rapids and Ann Arbor provide more stable appreciation plays.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Detroit', 'Grand Rapids', 'Ann Arbor', 'Lansing'],
  },
  minnesota: {
    highlights: 'Minneapolis-St. Paul is a stable, diversified market with strong employment (healthcare, 3M, Target, UnitedHealth). Higher entry prices but low vacancy and reliable rental demand.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth'],
  },
  missouri: {
    highlights: 'Kansas City spans two states offering tax flexibility. St. Louis provides some of the best cash flow numbers in the Midwest. Both markets have strong, diversified economies.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia'],
  },
  nevada: {
    highlights: 'Las Vegas offers strong STR income and population growth. No state income tax. Major corporate relocations and the Raiders/F1 have transformed the metro. Reno is a growing tech hub.',
    landlordFriendly: 'friendly',
    noStateTax: true,
    keyMarkets: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas'],
  },
  'new-jersey': {
    highlights: 'Highest property taxes in the US, but strong rental demand and proximity to NYC/Philadelphia. Cash flow is challenging but appreciation is consistent in transit-connected towns.',
    landlordFriendly: 'strict',
    noStateTax: false,
    keyMarkets: ['Newark', 'Jersey City', 'Paterson', 'Trenton'],
  },
  'new-york': {
    highlights: 'NYC is one of the most regulated rental markets in the country. Upstate markets (Rochester, Buffalo, Syracuse) offer much better cash flow. Rent stabilization laws require careful due diligence.',
    landlordFriendly: 'strict',
    noStateTax: false,
    keyMarkets: ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
  },
  'north-carolina': {
    highlights: 'Raleigh-Durham Research Triangle is a top appreciation market with 15% population growth. Charlotte is the banking capital of the Southeast. Both offer strong investment fundamentals.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Charlotte', 'Raleigh', 'Durham', 'Greensboro', 'Wilmington'],
  },
  ohio: {
    highlights: 'Cleveland, Columbus, and Cincinnati offer strong cash flow with affordable prices. Columbus is growing fastest (Intel investment). Higher property taxes are the main drag on returns.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Columbus', 'Cleveland', 'Cincinnati', 'Dayton'],
  },
  oklahoma: {
    highlights: 'Oklahoma City pairs 4.5% population growth with cash-flow-friendly pricing. No state income tax on rent. Economy has diversified beyond energy into aerospace and tech.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow'],
  },
  pennsylvania: {
    highlights: 'Philadelphia offers strong cash flow in select neighborhoods. Pittsburgh is a stable, affordable market with healthcare and education anchors. Property taxes vary wildly by county.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Reading'],
  },
  'south-carolina': {
    highlights: 'Charleston and Greenville are growing rapidly with strong tourism and manufacturing. Low property taxes and landlord-friendly laws. Charleston STR market is particularly strong.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Charleston', 'Greenville', 'Columbia', 'Myrtle Beach'],
  },
  tennessee: {
    highlights: 'Nashville has shifted from cash flow to appreciation. Memphis is the established turnkey rental capital. No state income tax. Knoxville and Chattanooga offer balanced profiles.',
    landlordFriendly: 'friendly',
    noStateTax: true,
    keyMarkets: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'],
  },
  texas: {
    highlights: 'No state income tax, massive population growth, business-friendly environment. Austin, Dallas, Houston, and San Antonio each offer different investment profiles. High property taxes (2-3%) offset the income tax advantage.',
    landlordFriendly: 'friendly',
    noStateTax: true,
    keyMarkets: ['Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth'],
  },
  utah: {
    highlights: 'Salt Lake City has strong appreciation driven by tech corridor growth ("Silicon Slopes"). Higher entry prices but exceptional population growth and economic fundamentals.',
    landlordFriendly: 'friendly',
    noStateTax: false,
    keyMarkets: ['Salt Lake City', 'Provo', 'Ogden', 'St. George'],
  },
  virginia: {
    highlights: 'Northern Virginia (DC suburbs) offers stable appreciation driven by government and tech employment. Richmond is a growing market with better cash flow. Hampton Roads provides military-anchored demand.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Virginia Beach', 'Richmond', 'Arlington', 'Norfolk'],
  },
  washington: {
    highlights: 'Seattle tech economy drives strong appreciation. No state income tax. Tacoma and Spokane offer more affordable entry. Washington has strict landlord-tenant laws — know the rules.',
    landlordFriendly: 'strict',
    noStateTax: true,
    keyMarkets: ['Seattle', 'Tacoma', 'Spokane', 'Bellevue'],
  },
  wisconsin: {
    highlights: 'Milwaukee offers strong cash flow with affordable entry prices. Madison is a stable college-town market. Moderate property taxes and solid rental demand across the state.',
    landlordFriendly: 'moderate',
    noStateTax: false,
    keyMarkets: ['Milwaukee', 'Madison', 'Green Bay', 'Racine'],
  },
}

/**
 * Get lenders that serve a specific state.
 * Nationwide lenders always match. Regional lenders match if the state is in their statesServed list.
 */
export function getLendersForState(
  allLenders: Array<{ nationwide: boolean; statesServed?: string[] }>,
  stateAbbr: string
): number[] {
  return allLenders.reduce<number[]>((indices, lender, i) => {
    if (lender.nationwide || (lender.statesServed && lender.statesServed.includes(stateAbbr))) {
      indices.push(i)
    }
    return indices
  }, [])
}
