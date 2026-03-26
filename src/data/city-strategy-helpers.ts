import { cities, type CityCapRate } from './cap-rate-cities'
import {
  strategies,
  type Strategy,
  type CityWithScore,
} from './market-strategies'
import { getMarketCities } from './market-queries'

// ---------------------------------------------------------------------------
// State metadata
// ---------------------------------------------------------------------------

export type StateInfo = {
  name: string
  slug: string
  abbreviation: string
}

/** Maps every 2-letter state code present in the city data to full name + slug. */
export const stateMetadata: Record<string, StateInfo> = {
  AL: { name: 'Alabama', slug: 'alabama', abbreviation: 'AL' },
  AR: { name: 'Arkansas', slug: 'arkansas', abbreviation: 'AR' },
  AZ: { name: 'Arizona', slug: 'arizona', abbreviation: 'AZ' },
  CA: { name: 'California', slug: 'california', abbreviation: 'CA' },
  CO: { name: 'Colorado', slug: 'colorado', abbreviation: 'CO' },
  FL: { name: 'Florida', slug: 'florida', abbreviation: 'FL' },
  GA: { name: 'Georgia', slug: 'georgia', abbreviation: 'GA' },
  IA: { name: 'Iowa', slug: 'iowa', abbreviation: 'IA' },
  ID: { name: 'Idaho', slug: 'idaho', abbreviation: 'ID' },
  IL: { name: 'Illinois', slug: 'illinois', abbreviation: 'IL' },
  IN: { name: 'Indiana', slug: 'indiana', abbreviation: 'IN' },
  KY: { name: 'Kentucky', slug: 'kentucky', abbreviation: 'KY' },
  MD: { name: 'Maryland', slug: 'maryland', abbreviation: 'MD' },
  MI: { name: 'Michigan', slug: 'michigan', abbreviation: 'MI' },
  MN: { name: 'Minnesota', slug: 'minnesota', abbreviation: 'MN' },
  MO: { name: 'Missouri', slug: 'missouri', abbreviation: 'MO' },
  NC: { name: 'North Carolina', slug: 'north-carolina', abbreviation: 'NC' },
  NV: { name: 'Nevada', slug: 'nevada', abbreviation: 'NV' },
  NY: { name: 'New York', slug: 'new-york', abbreviation: 'NY' },
  OH: { name: 'Ohio', slug: 'ohio', abbreviation: 'OH' },
  OK: { name: 'Oklahoma', slug: 'oklahoma', abbreviation: 'OK' },
  OR: { name: 'Oregon', slug: 'oregon', abbreviation: 'OR' },
  PA: { name: 'Pennsylvania', slug: 'pennsylvania', abbreviation: 'PA' },
  SC: { name: 'South Carolina', slug: 'south-carolina', abbreviation: 'SC' },
  TN: { name: 'Tennessee', slug: 'tennessee', abbreviation: 'TN' },
  TX: { name: 'Texas', slug: 'texas', abbreviation: 'TX' },
  UT: { name: 'Utah', slug: 'utah', abbreviation: 'UT' },
  VA: { name: 'Virginia', slug: 'virginia', abbreviation: 'VA' },
  WA: { name: 'Washington', slug: 'washington', abbreviation: 'WA' },
  WI: { name: 'Wisconsin', slug: 'wisconsin', abbreviation: 'WI' },
}

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

/** Groups cities by their state abbreviation. */
export function getStatesFromCities(): Map<string, CityCapRate[]> {
  const map = new Map<string, CityCapRate[]>()
  for (const city of cities) {
    const list = map.get(city.state) ?? []
    list.push(city)
    map.set(city.state, list)
  }
  return map
}

/** Returns an array of unique states with their cities, sorted by city count descending. */
export function getStatesList(): Array<StateInfo & { cities: CityCapRate[] }> {
  const stateMap = getStatesFromCities()
  return Array.from(stateMap.entries())
    .map(([abbr, stateCities]) => ({
      ...(stateMetadata[abbr] ?? {
        name: abbr,
        slug: abbr.toLowerCase(),
        abbreviation: abbr,
      }),
      cities: stateCities,
    }))
    .sort((a, b) => b.cities.length - a.cities.length)
}

/** Computes average metrics for an array of cities. */
export function getStateAverages(stateCities: CityCapRate[]) {
  const n = stateCities.length
  if (n === 0) {
    return {
      avgCapRate: 0,
      avgMedianHomePrice: 0,
      avgMedianRent: 0,
      avgRentToPrice: 0,
      avgPopulationGrowth: 0,
      avgVacancyRate: 0,
      avgPropertyTaxRate: 0,
    }
  }
  const sum = (fn: (c: CityCapRate) => number) =>
    stateCities.reduce((acc, c) => acc + fn(c), 0)
  return {
    avgCapRate: Math.round((sum((c) => c.avgCapRate) / n) * 10) / 10,
    avgMedianHomePrice: Math.round(sum((c) => c.medianHomePrice) / n),
    avgMedianRent: Math.round(sum((c) => c.medianRent) / n),
    avgRentToPrice:
      Math.round((sum((c) => c.rentToPrice) / n) * 10000) / 10000,
    avgPopulationGrowth:
      Math.round((sum((c) => c.populationGrowth) / n) * 10) / 10,
    avgVacancyRate: Math.round((sum((c) => c.vacancyRate) / n) * 10) / 10,
    avgPropertyTaxRate:
      Math.round((sum((c) => c.propertyTaxRate) / n) * 100) / 100,
  }
}

// ---------------------------------------------------------------------------
// Score breakdown
// ---------------------------------------------------------------------------

/** Helper mirroring the normalize() in market-strategies.ts */
function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(10, ((value - min) / (max - min)) * 10))
}

export type ScoreComponent = {
  label: string
  weight: string
  weightPct: number
  rawValue: number
  rawFormatted: string
  normalizedScore: number
}

/**
 * Decompose a strategy score into its weighted components.
 * Must stay in sync with scoreFn definitions in market-strategies.ts.
 */
export function getScoreBreakdown(
  strategy: Strategy,
  city: CityCapRate
): ScoreComponent[] {
  switch (strategy.slug) {
    case 'cash-flow':
      return [
        {
          label: 'Rent-to-Price Ratio',
          weight: '30%',
          weightPct: 30,
          rawValue: city.rentToPrice,
          rawFormatted: `${(city.rentToPrice * 100).toFixed(2)}%`,
          normalizedScore:
            Math.round(normalize(city.rentToPrice * 100, 0.25, 1.3) * 10) / 10,
        },
        {
          label: 'Cap Rate',
          weight: '30%',
          weightPct: 30,
          rawValue: city.avgCapRate,
          rawFormatted: `${city.avgCapRate.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(city.avgCapRate, 2.5, 12) * 10) / 10,
        },
        {
          label: 'Low Vacancy',
          weight: '20%',
          weightPct: 20,
          rawValue: city.vacancyRate,
          rawFormatted: `${city.vacancyRate.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(12 - city.vacancyRate, 0, 8) * 10) / 10,
        },
        {
          label: 'Low Property Taxes',
          weight: '20%',
          weightPct: 20,
          rawValue: city.propertyTaxRate,
          rawFormatted: `${city.propertyTaxRate.toFixed(2)}%`,
          normalizedScore:
            Math.round(normalize(3 - city.propertyTaxRate, 0, 3) * 10) / 10,
        },
      ]
    case 'brrrr':
      return [
        {
          label: 'Cap Rate',
          weight: '30%',
          weightPct: 30,
          rawValue: city.avgCapRate,
          rawFormatted: `${city.avgCapRate.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(city.avgCapRate, 2.5, 12) * 10) / 10,
        },
        {
          label: 'Affordable Entry Price',
          weight: '25%',
          weightPct: 25,
          rawValue: city.medianHomePrice,
          rawFormatted: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(city.medianHomePrice),
          normalizedScore:
            Math.round(
              normalize(800000 - city.medianHomePrice, 0, 750000) * 10
            ) / 10,
        },
        {
          label: 'Rent-to-Price Ratio',
          weight: '25%',
          weightPct: 25,
          rawValue: city.rentToPrice,
          rawFormatted: `${(city.rentToPrice * 100).toFixed(2)}%`,
          normalizedScore:
            Math.round(normalize(city.rentToPrice * 100, 0.25, 1.3) * 10) / 10,
        },
        {
          label: 'Population Growth',
          weight: '20%',
          weightPct: 20,
          rawValue: city.populationGrowth,
          rawFormatted: `${city.populationGrowth > 0 ? '+' : ''}${city.populationGrowth.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(city.populationGrowth, -4, 16) * 10) / 10,
        },
      ]
    case 'house-hacking':
      return [
        {
          label: 'Affordable Entry Price',
          weight: '30%',
          weightPct: 30,
          rawValue: city.medianHomePrice,
          rawFormatted: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(city.medianHomePrice),
          normalizedScore:
            Math.round(
              normalize(600000 - city.medianHomePrice, 0, 550000) * 10
            ) / 10,
        },
        {
          label: 'Rent-to-Price Ratio',
          weight: '25%',
          weightPct: 25,
          rawValue: city.rentToPrice,
          rawFormatted: `${(city.rentToPrice * 100).toFixed(2)}%`,
          normalizedScore:
            Math.round(normalize(city.rentToPrice * 100, 0.25, 1.3) * 10) / 10,
        },
        {
          label: 'Low Vacancy',
          weight: '20%',
          weightPct: 20,
          rawValue: city.vacancyRate,
          rawFormatted: `${city.vacancyRate.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(12 - city.vacancyRate, 0, 8) * 10) / 10,
        },
        {
          label: 'Population Growth',
          weight: '15%',
          weightPct: 15,
          rawValue: city.populationGrowth,
          rawFormatted: `${city.populationGrowth > 0 ? '+' : ''}${city.populationGrowth.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(city.populationGrowth, -4, 16) * 10) / 10,
        },
        {
          label: 'Livability (Income)',
          weight: '10%',
          weightPct: 10,
          rawValue: city.medianHouseholdIncome,
          rawFormatted: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(city.medianHouseholdIncome),
          normalizedScore:
            Math.round(
              normalize(city.medianHouseholdIncome, 30000, 110000) * 10
            ) / 10,
        },
      ]
    case 'appreciation':
      return [
        {
          label: 'Population Growth',
          weight: '40%',
          weightPct: 40,
          rawValue: city.populationGrowth,
          rawFormatted: `${city.populationGrowth > 0 ? '+' : ''}${city.populationGrowth.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(city.populationGrowth, -4, 16) * 10) / 10,
        },
        {
          label: 'Median Household Income',
          weight: '25%',
          weightPct: 25,
          rawValue: city.medianHouseholdIncome,
          rawFormatted: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(city.medianHouseholdIncome),
          normalizedScore:
            Math.round(
              normalize(city.medianHouseholdIncome, 30000, 120000) * 10
            ) / 10,
        },
        {
          label: 'Low Vacancy',
          weight: '20%',
          weightPct: 20,
          rawValue: city.vacancyRate,
          rawFormatted: `${city.vacancyRate.toFixed(1)}%`,
          normalizedScore:
            Math.round(normalize(12 - city.vacancyRate, 0, 8) * 10) / 10,
        },
        {
          label: 'Metro Size (Demand)',
          weight: '15%',
          weightPct: 15,
          rawValue: city.population,
          rawFormatted: new Intl.NumberFormat('en-US').format(city.population),
          normalizedScore:
            Math.round(normalize(city.population, 100000, 3000000) * 10) / 10,
        },
      ]
    default:
      return []
  }
}

// ---------------------------------------------------------------------------
// City-for-strategy helpers
// ---------------------------------------------------------------------------

export type CityStrategyData = CityWithScore & {
  rank: number
  breakdown: ScoreComponent[]
  nearbyRanked: CityWithScore[]
}

/**
 * Returns a single city with its strategy score, rank, breakdown, and
 * comparison cities (3 above + 3 below in the ranking).
 */
export function getCityForStrategyPage(
  strategySlug: string,
  citySlug: string
): CityStrategyData | null {
  const strategy = strategies.find((s) => s.slug === strategySlug)
  if (!strategy) return null

  const allScored = cities
    .map((c) => ({ ...c, score: strategy.scoreFn(c) }))
    .sort((a, b) => b.score - a.score)

  const idx = allScored.findIndex((c) => c.slug === citySlug)
  if (idx === -1) return null

  const city = allScored[idx]
  const start = Math.max(0, idx - 3)
  const end = Math.min(allScored.length, idx + 4)
  const nearbyRanked = allScored.slice(start, end).filter((c) => c.slug !== citySlug)

  return {
    ...city,
    rank: idx + 1,
    breakdown: getScoreBreakdown(strategy, city),
    nearbyRanked,
  }
}

/** Returns the best strategy for a city (highest score). */
export function getBestStrategyForCity(
  city: CityCapRate
): { strategy: Strategy; score: number } {
  let best = { strategy: strategies[0], score: strategies[0].scoreFn(city) }
  for (let i = 1; i < strategies.length; i++) {
    const score = strategies[i].scoreFn(city)
    if (score > best.score) {
      best = { strategy: strategies[i], score }
    }
  }
  return best
}

/** Returns all 4 strategy scores for a city. */
export function getAllStrategyScores(
  city: CityCapRate
): Array<{ strategy: Strategy; score: number }> {
  return strategies.map((s) => ({ strategy: s, score: s.scoreFn(city) }))
}

// ---------------------------------------------------------------------------
// FAQ generation
// ---------------------------------------------------------------------------

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
})

export function generateCityStrategyFAQs(
  strategy: Strategy,
  city: CityCapRate,
  score: number,
  rank: number
): Array<{ question: string; answer: string }> {
  const cityName = `${city.city}, ${city.state}`
  const faqs: Array<{ question: string; answer: string }> = [
    {
      question: `What is the ${strategy.scoreLabel.toLowerCase()} for ${cityName}?`,
      answer: `${cityName} scores ${score.toFixed(1)} out of 10 on our ${strategy.scoreLabel.toLowerCase()}, ranking #${rank} out of 52 markets we track. ${strategy.scoreExplainer}`,
    },
    {
      question: `Is ${city.city} a good city for ${strategy.shortTitle.toLowerCase()} investing?`,
      answer:
        rank <= 10
          ? `Yes — ${cityName} ranks in the top 10 for ${strategy.shortTitle.toLowerCase()} investing with a score of ${score.toFixed(1)}/10. Key factors include a median home price of ${usd.format(city.medianHomePrice)}, cap rate of ${city.avgCapRate.toFixed(1)}%, and ${city.populationGrowth > 0 ? 'positive' : ''} population growth of ${city.populationGrowth > 0 ? '+' : ''}${city.populationGrowth.toFixed(1)}%.`
          : rank <= 25
            ? `${cityName} ranks #${rank} for ${strategy.shortTitle.toLowerCase()} investing — a solid mid-tier market with a score of ${score.toFixed(1)}/10. The median home price is ${usd.format(city.medianHomePrice)} with a ${city.avgCapRate.toFixed(1)}% average cap rate.`
            : `${cityName} ranks #${rank} for ${strategy.shortTitle.toLowerCase()} investing with a score of ${score.toFixed(1)}/10. While not a top-ranked market for this strategy, it may have strengths in other investing approaches.`,
    },
    {
      question: `What is the average cap rate in ${city.city}?`,
      answer: `The average cap rate in ${cityName} is ${city.avgCapRate.toFixed(1)}%. The median home price is ${usd.format(city.medianHomePrice)} with a median monthly rent of ${usd.format(city.medianRent)}, resulting in a rent-to-price ratio of ${(city.rentToPrice * 100).toFixed(2)}%.`,
    },
    {
      question: `What are the property taxes in ${city.city}?`,
      answer: `The effective property tax rate in ${cityName} is ${city.propertyTaxRate.toFixed(2)}%. On a ${usd.format(city.medianHomePrice)} property, that translates to approximately ${usd.format(Math.round(city.medianHomePrice * city.propertyTaxRate / 100))} per year in property taxes.`,
    },
    {
      question: `How does ${city.city} compare to other ${strategy.shortTitle.toLowerCase()} markets?`,
      answer: `Among our 52 tracked markets, ${cityName} ranks #${rank} for ${strategy.shortTitle.toLowerCase()} investing. ${rank <= 5 ? 'It is one of the top-performing markets for this strategy.' : rank <= 15 ? 'It performs above average for this strategy.' : rank <= 30 ? 'It falls in the middle of the pack for this strategy.' : 'Other markets may be stronger for this particular strategy, though it may excel in different approaches.'}`,
    },
  ]

  // Add a strategy-specific FAQ
  switch (strategy.slug) {
    case 'cash-flow':
      faqs.push({
        question: `Does ${city.city} meet the 1% rule?`,
        answer:
          city.rentToPrice >= 0.01
            ? `Yes — ${cityName} has a rent-to-price ratio of ${(city.rentToPrice * 100).toFixed(2)}%, which exceeds the 1% rule threshold. This means monthly rent (${usd.format(city.medianRent)}) is at least 1% of the median home price (${usd.format(city.medianHomePrice)}).`
            : `${cityName} has a rent-to-price ratio of ${(city.rentToPrice * 100).toFixed(2)}%, which falls ${city.rentToPrice >= 0.008 ? 'just' : 'significantly'} below the 1% rule. However, the 1% rule is a rough guideline — individual deals can still cash flow well in this market.`,
      })
      break
    case 'brrrr':
      faqs.push({
        question: `What is the typical entry price for BRRRR deals in ${city.city}?`,
        answer: `The median home price in ${cityName} is ${usd.format(city.medianHomePrice)}. Distressed BRRRR-eligible properties typically sell for 60-70% of median value, putting estimated acquisition costs around ${usd.format(Math.round(city.medianHomePrice * 0.65))}. After rehab, the goal is to refinance at or near the full ${usd.format(city.medianHomePrice)} after-repair value.`,
      })
      break
    case 'house-hacking':
      faqs.push({
        question: `Can I FHA-finance a house hack in ${city.city}?`,
        answer: `With a median home price of ${usd.format(city.medianHomePrice)}, most 2-4 unit properties in ${cityName} should fall within FHA loan limits. An FHA loan with 3.5% down would require approximately ${usd.format(Math.round(city.medianHomePrice * 0.035))} as a down payment. Rental income from additional units (median ${usd.format(city.medianRent)}/month each) can significantly offset your mortgage payment.`,
      })
      break
    case 'appreciation':
      faqs.push({
        question: `What is driving population growth in ${city.city}?`,
        answer: `${cityName} has a 5-year population growth rate of ${city.populationGrowth > 0 ? '+' : ''}${city.populationGrowth.toFixed(1)}% and a median household income of ${usd.format(city.medianHouseholdIncome)}. ${city.populationGrowth > 5 ? 'Strong job growth and migration trends are fueling above-average population increases, which typically correlates with sustained home price appreciation.' : city.populationGrowth > 0 ? 'Moderate population growth combined with economic diversification supports steady long-term appreciation potential.' : 'While population has declined, price appreciation can still occur through revitalization, institutional investment, and limited new housing supply.'}`,
      })
      break
  }

  return faqs
}

// ---------------------------------------------------------------------------
// Async (Sanity-backed) variants — use these in page rendering
// ---------------------------------------------------------------------------

/**
 * Async version of getCityForStrategyPage that fetches live data from Sanity.
 * Falls back to hardcoded data if Sanity is unavailable.
 */
export async function fetchCityForStrategyPage(
  strategySlug: string,
  citySlug: string
): Promise<CityStrategyData | null> {
  const strategy = strategies.find((s) => s.slug === strategySlug)
  if (!strategy) return null

  const liveCities = await getMarketCities()

  const allScored = liveCities
    .map((c) => ({ ...c, score: strategy.scoreFn(c) }))
    .sort((a, b) => b.score - a.score)

  const idx = allScored.findIndex((c) => c.slug === citySlug)
  if (idx === -1) return null

  const city = allScored[idx]
  const start = Math.max(0, idx - 3)
  const end = Math.min(allScored.length, idx + 4)
  const nearbyRanked = allScored
    .slice(start, end)
    .filter((c) => c.slug !== citySlug)

  return {
    ...city,
    rank: idx + 1,
    breakdown: getScoreBreakdown(strategy, city),
    nearbyRanked,
  }
}

/**
 * Async version of getStatesList that fetches live data from Sanity.
 */
export async function fetchStatesList(): Promise<
  Array<StateInfo & { cities: CityCapRate[] }>
> {
  const liveCities = await getMarketCities()
  const map = new Map<string, CityCapRate[]>()
  for (const city of liveCities) {
    const list = map.get(city.state) ?? []
    list.push(city)
    map.set(city.state, list)
  }
  return Array.from(map.entries())
    .map(([abbr, stateCities]) => ({
      ...(stateMetadata[abbr] ?? {
        name: abbr,
        slug: abbr.toLowerCase(),
        abbreviation: abbr,
      }),
      cities: stateCities,
    }))
    .sort((a, b) => b.cities.length - a.cities.length)
}

/**
 * Async version of getAllStrategyScores that fetches live data from Sanity.
 */
export async function fetchAllStrategyScores(
  citySlug: string
): Promise<Array<{ strategy: Strategy; score: number }>> {
  const liveCities = await getMarketCities()
  const city = liveCities.find((c) => c.slug === citySlug)
  if (!city) return []
  return strategies.map((s) => ({ strategy: s, score: s.scoreFn(city) }))
}

export function generateStateFAQs(
  stateName: string,
  stateCities: CityCapRate[]
): Array<{ question: string; answer: string }> {
  const avgs = getStateAverages(stateCities)
  const best = stateCities.reduce(
    (top, c) => (c.avgCapRate > top.avgCapRate ? c : top),
    stateCities[0]
  )

  return [
    {
      question: `How many real estate investment markets do you track in ${stateName}?`,
      answer: `We track ${stateCities.length} ${stateCities.length === 1 ? 'market' : 'markets'} in ${stateName}: ${stateCities.map((c) => c.city).join(', ')}. Each market is analyzed across 10+ metrics including cap rates, rent-to-price ratios, vacancy rates, and population growth.`,
    },
    {
      question: `What is the average cap rate in ${stateName}?`,
      answer: `The average cap rate across our tracked ${stateName} markets is ${avgs.avgCapRate.toFixed(1)}%. ${best.city} has the highest cap rate at ${best.avgCapRate.toFixed(1)}%. Average median home price is ${usd.format(avgs.avgMedianHomePrice)}.`,
    },
    {
      question: `Is ${stateName} good for real estate investing?`,
      answer: `${stateName} offers ${stateCities.length >= 3 ? 'diverse investment opportunities across multiple markets' : 'investment potential'}. The average vacancy rate is ${avgs.avgVacancyRate.toFixed(1)}% and average property tax rate is ${avgs.avgPropertyTaxRate.toFixed(2)}%. ${avgs.avgPopulationGrowth > 0 ? 'Positive population growth signals healthy demand.' : 'Population trends vary by market — focus on cities with strong local economies.'}`,
    },
    {
      question: `Which city in ${stateName} has the best cap rate?`,
      answer: `${best.city}, ${best.state} has the highest average cap rate in ${stateName} at ${best.avgCapRate.toFixed(1)}%, with a median home price of ${usd.format(best.medianHomePrice)} and median rent of ${usd.format(best.medianRent)}.`,
    },
  ]
}
