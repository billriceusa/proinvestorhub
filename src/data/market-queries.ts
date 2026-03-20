/**
 * Sanity GROQ queries for market city data.
 * Replaces the hardcoded cap-rate-cities.ts imports.
 * Falls back to hardcoded data if Sanity query returns empty (safety net).
 */

import { client } from '@/sanity/lib/client'
import { cities as hardcodedCities, type CityCapRate } from './cap-rate-cities'

const MARKET_CITIES_QUERY = `*[_type == "marketCity"] | order(avgCapRate desc) {
  city,
  state,
  "slug": slug.current,
  medianHomePrice,
  medianRent,
  avgCapRate,
  rentToPrice,
  population,
  populationGrowth,
  medianHouseholdIncome,
  vacancyRate,
  propertyTaxRate,
  investorTakeaway,
  dataUpdatedAt,
  dataSources
}`

const DATA_FRESHNESS_QUERY = `*[_type == "marketCity"] | order(dataUpdatedAt desc) [0] {
  dataUpdatedAt,
  dataSources
}`

export type MarketCity = CityCapRate & {
  dataUpdatedAt?: string
  dataSources?: string[]
}

export type DataFreshness = {
  dataUpdatedAt: string | null
  dataSources: string[]
}

/**
 * Fetch all market cities from Sanity, falling back to hardcoded data.
 * Use this everywhere instead of importing `cities` directly.
 */
export async function getMarketCities(): Promise<MarketCity[]> {
  try {
    const results = await client.fetch<MarketCity[]>(MARKET_CITIES_QUERY)
    if (results && results.length > 0) return results
  } catch (err) {
    console.warn('Sanity market query failed, using hardcoded data:', err)
  }
  // Fallback — hardcoded data (no dataUpdatedAt)
  return hardcodedCities
}

/**
 * Get the most recent data update timestamp from Sanity.
 */
export async function getDataFreshness(): Promise<DataFreshness> {
  try {
    const result = await client.fetch<DataFreshness | null>(DATA_FRESHNESS_QUERY)
    if (result?.dataUpdatedAt) {
      return {
        dataUpdatedAt: result.dataUpdatedAt,
        dataSources: result.dataSources || [],
      }
    }
  } catch {
    // fallback
  }
  return { dataUpdatedAt: null, dataSources: ['Census ACS', 'Zillow', 'Redfin', 'County Assessors'] }
}
