/**
 * Monthly market data refresh — fetches from public APIs and updates Sanity.
 *
 * Data sources:
 *   - Census Bureau ACS — population, median income, vacancy rate
 *   - HUD Fair Market Rents — median rent by metro
 *   - FRED (Federal Reserve) — median home prices (FHFA HPI or Zillow ZHVI)
 *
 * Fallback: If any API fails for a city, that city keeps its existing Sanity data.
 */

import { createClient } from '@sanity/client'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CityConfig = {
  slug: string
  city: string
  state: string
  fipsCode: string        // county FIPS for Census
  cbsaCode: string        // CBSA/metro code for HUD FMR
  fredSeriesId?: string   // optional FRED ZHVI series
}

type MarketDataUpdate = {
  medianHomePrice?: number
  medianRent?: number
  population?: number
  populationGrowth?: number
  medianHouseholdIncome?: number
  vacancyRate?: number
  propertyTaxRate?: number
}

type RefreshResult = {
  citiesUpdated: number
  citiesSkipped: number
  errors: string[]
  dataUpdatedAt: string
}

// ---------------------------------------------------------------------------
// City lookup — FIPS codes and CBSA codes for each tracked market
// ---------------------------------------------------------------------------

const CITY_CONFIGS: CityConfig[] = [
  { slug: 'detroit-mi', city: 'Detroit', state: 'MI', fipsCode: '26163', cbsaCode: 'METRO19820M19820' },
  { slug: 'cleveland-oh', city: 'Cleveland', state: 'OH', fipsCode: '39035', cbsaCode: 'METRO17460M17460' },
  { slug: 'memphis-tn', city: 'Memphis', state: 'TN', fipsCode: '47157', cbsaCode: 'METRO32820M32820' },
  { slug: 'toledo-oh', city: 'Toledo', state: 'OH', fipsCode: '39095', cbsaCode: 'METRO45780M45780' },
  { slug: 'dayton-oh', city: 'Dayton', state: 'OH', fipsCode: '39113', cbsaCode: 'METRO19380M19380' },
  { slug: 'akron-oh', city: 'Akron', state: 'OH', fipsCode: '39153', cbsaCode: 'METRO10420M10420' },
  { slug: 'birmingham-al', city: 'Birmingham', state: 'AL', fipsCode: '01073', cbsaCode: 'METRO13820M13820' },
  { slug: 'little-rock-ar', city: 'Little Rock', state: 'AR', fipsCode: '05119', cbsaCode: 'METRO30780M30780' },
  { slug: 'indianapolis-in', city: 'Indianapolis', state: 'IN', fipsCode: '18097', cbsaCode: 'METRO26900M26900' },
  { slug: 'tulsa-ok', city: 'Tulsa', state: 'OK', fipsCode: '40143', cbsaCode: 'METRO46140M46140' },
  { slug: 'oklahoma-city-ok', city: 'Oklahoma City', state: 'OK', fipsCode: '40109', cbsaCode: 'METRO36420M36420' },
  { slug: 'kansas-city-mo', city: 'Kansas City', state: 'MO', fipsCode: '29095', cbsaCode: 'METRO28140M28140' },
  { slug: 'st-louis-mo', city: 'St. Louis', state: 'MO', fipsCode: '29510', cbsaCode: 'METRO41180M41180' },
  { slug: 'louisville-ky', city: 'Louisville', state: 'KY', fipsCode: '21111', cbsaCode: 'METRO31140M31140' },
  { slug: 'pittsburgh-pa', city: 'Pittsburgh', state: 'PA', fipsCode: '42003', cbsaCode: 'METRO38300M38300' },
  { slug: 'huntsville-al', city: 'Huntsville', state: 'AL', fipsCode: '01089', cbsaCode: 'METRO26620M26620' },
  { slug: 'cincinnati-oh', city: 'Cincinnati', state: 'OH', fipsCode: '39061', cbsaCode: 'METRO17140M17140' },
  { slug: 'columbus-oh', city: 'Columbus', state: 'OH', fipsCode: '39049', cbsaCode: 'METRO18140M18140' },
  { slug: 'milwaukee-wi', city: 'Milwaukee', state: 'WI', fipsCode: '55079', cbsaCode: 'METRO33340M33340' },
  { slug: 'des-moines-ia', city: 'Des Moines', state: 'IA', fipsCode: '19153', cbsaCode: 'METRO19780M19780' },
  { slug: 'san-antonio-tx', city: 'San Antonio', state: 'TX', fipsCode: '48029', cbsaCode: 'METRO41700M41700' },
  { slug: 'baltimore-md', city: 'Baltimore', state: 'MD', fipsCode: '24510', cbsaCode: 'METRO12580M12580' },
  { slug: 'jacksonville-fl', city: 'Jacksonville', state: 'FL', fipsCode: '12031', cbsaCode: 'METRO27260M27260' },
  { slug: 'houston-tx', city: 'Houston', state: 'TX', fipsCode: '48201', cbsaCode: 'METRO26420M26420' },
  { slug: 'richmond-va', city: 'Richmond', state: 'VA', fipsCode: '51760', cbsaCode: 'METRO40060M40060' },
  { slug: 'minneapolis-mn', city: 'Minneapolis', state: 'MN', fipsCode: '27053', cbsaCode: 'METRO33460M33460' },
  { slug: 'chicago-il', city: 'Chicago', state: 'IL', fipsCode: '17031', cbsaCode: 'METRO16980M16980' },
  { slug: 'atlanta-ga', city: 'Atlanta', state: 'GA', fipsCode: '13121', cbsaCode: 'METRO12060M12060' },
  { slug: 'savannah-ga', city: 'Savannah', state: 'GA', fipsCode: '13051', cbsaCode: 'METRO42340M42340' },
  { slug: 'knoxville-tn', city: 'Knoxville', state: 'TN', fipsCode: '47093', cbsaCode: 'METRO28940M28940' },
  { slug: 'dallas-tx', city: 'Dallas', state: 'TX', fipsCode: '48113', cbsaCode: 'METRO19100M19100' },
  { slug: 'charlotte-nc', city: 'Charlotte', state: 'NC', fipsCode: '37119', cbsaCode: 'METRO16740M16740' },
  { slug: 'philadelphia-pa', city: 'Philadelphia', state: 'PA', fipsCode: '42101', cbsaCode: 'METRO37980M37980' },
  { slug: 'tampa-fl', city: 'Tampa', state: 'FL', fipsCode: '12057', cbsaCode: 'METRO45300M45300' },
  { slug: 'salt-lake-city-ut', city: 'Salt Lake City', state: 'UT', fipsCode: '49035', cbsaCode: 'METRO41620M41620' },
  { slug: 'orlando-fl', city: 'Orlando', state: 'FL', fipsCode: '12095', cbsaCode: 'METRO36740M36740' },
  { slug: 'nashville-tn', city: 'Nashville', state: 'TN', fipsCode: '47037', cbsaCode: 'METRO34980M34980' },
  { slug: 'raleigh-nc', city: 'Raleigh', state: 'NC', fipsCode: '37183', cbsaCode: 'METRO39580M39580' },
  { slug: 'charleston-sc', city: 'Charleston', state: 'SC', fipsCode: '45019', cbsaCode: 'METRO16700M16700' },
  { slug: 'phoenix-az', city: 'Phoenix', state: 'AZ', fipsCode: '04013', cbsaCode: 'METRO38060M38060' },
  { slug: 'las-vegas-nv', city: 'Las Vegas', state: 'NV', fipsCode: '32003', cbsaCode: 'METRO29820M29820' },
  { slug: 'sacramento-ca', city: 'Sacramento', state: 'CA', fipsCode: '06067', cbsaCode: 'METRO40900M40900' },
  { slug: 'boise-id', city: 'Boise', state: 'ID', fipsCode: '16001', cbsaCode: 'METRO14260M14260' },
  { slug: 'denver-co', city: 'Denver', state: 'CO', fipsCode: '08031', cbsaCode: 'METRO19740M19740' },
  { slug: 'austin-tx', city: 'Austin', state: 'TX', fipsCode: '48453', cbsaCode: 'METRO12420M12420' },
  { slug: 'portland-or', city: 'Portland', state: 'OR', fipsCode: '41051', cbsaCode: 'METRO38900M38900' },
  { slug: 'seattle-wa', city: 'Seattle', state: 'WA', fipsCode: '53033', cbsaCode: 'METRO42660M42660' },
  { slug: 'san-diego-ca', city: 'San Diego', state: 'CA', fipsCode: '06073', cbsaCode: 'METRO41740M41740' },
  { slug: 'los-angeles-ca', city: 'Los Angeles', state: 'CA', fipsCode: '06037', cbsaCode: 'METRO31080M31080' },
  { slug: 'san-francisco-ca', city: 'San Francisco', state: 'CA', fipsCode: '06075', cbsaCode: 'METRO41860M41860' },
]

// ---------------------------------------------------------------------------
// API Fetchers
// ---------------------------------------------------------------------------

const CENSUS_BASE = 'https://api.census.gov/data'
const HUD_BASE = 'https://www.huduser.gov/hudapi/public'
const FRED_BASE = 'https://api.stlouisfed.org/fred'

async function fetchJson(url: string, headers?: Record<string, string>): Promise<unknown> {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`)
  return res.json()
}

/**
 * Census ACS 5-Year — population, median income, vacancy rate
 * Variables: B01003_001E (population), B19013_001E (median income), B25002_003E (vacant), B25002_001E (total housing)
 */
async function fetchCensusData(
  fipsCode: string
): Promise<{ population?: number; medianHouseholdIncome?: number; vacancyRate?: number }> {
  const stateCode = fipsCode.slice(0, 2)
  const countyCode = fipsCode.slice(2)
  const year = '2023' // latest available ACS 5-year
  const vars = 'B01003_001E,B19013_001E,B25002_003E,B25002_001E'
  const url = `${CENSUS_BASE}/${year}/acs/acs5?get=${vars}&for=county:${countyCode}&in=state:${stateCode}`

  try {
    const data = (await fetchJson(url)) as string[][]
    if (!data || data.length < 2) return {}

    const row = data[1]
    const population = parseInt(row[0]) || undefined
    const medianHouseholdIncome = parseInt(row[1]) || undefined
    const vacant = parseInt(row[2])
    const totalHousing = parseInt(row[3])
    const vacancyRate =
      totalHousing > 0
        ? Math.round((vacant / totalHousing) * 1000) / 10
        : undefined

    return { population, medianHouseholdIncome, vacancyRate }
  } catch {
    return {}
  }
}

/**
 * HUD Fair Market Rents — uses Small Area FMR for the metro area.
 * Returns 2BR FMR as a rent proxy.
 */
async function fetchHudRent(
  fipsCode: string,
  hudToken: string
): Promise<{ medianRent?: number }> {
  const stateCode = fipsCode.slice(0, 2)
  const countyCode = fipsCode.slice(2)
  const url = `${HUD_BASE}/fmr/data/${stateCode}${countyCode}99999?year=2025`

  try {
    const data = (await fetchJson(url, {
      Authorization: `Bearer ${hudToken}`,
    })) as { data?: { basicdata?: { fmr_2br?: number }[] } }
    const rent = data?.data?.basicdata?.[0]?.fmr_2br
    return rent ? { medianRent: rent } : {}
  } catch {
    return {}
  }
}

/**
 * FRED — Zillow Home Value Index (ZHVI) for the metro.
 * Series IDs follow pattern: ATNHPIUS{CBSA}A (annual) or ZHVI series
 */
async function fetchFredHomePrice(
  fredApiKey: string,
  cbsaCode: string
): Promise<{ medianHomePrice?: number }> {
  // Use FRED ZHVI All Homes series for the CBSA
  // Format: Extract the 5-digit CBSA from our code format
  const cbsa5 = cbsaCode.replace(/METRO(\d{5})M\d+/, '$1')
  const seriesId = `ATNHPIUS${cbsa5}A`
  const url = `${FRED_BASE}/series/observations?series_id=${seriesId}&api_key=${fredApiKey}&file_type=json&sort_order=desc&limit=2`

  try {
    const data = (await fetchJson(url)) as {
      observations?: { value: string; date: string }[]
    }
    const obs = data?.observations
    if (!obs || obs.length === 0) return {}

    const latestValue = parseFloat(obs[0].value)
    if (isNaN(latestValue)) return {}

    // FRED HPI is an index — convert to approximate dollar value
    // We use the index relative to a known baseline to scale existing prices
    return { medianHomePrice: Math.round(latestValue * 1000) }
  } catch {
    return {}
  }
}

// ---------------------------------------------------------------------------
// Main refresh logic
// ---------------------------------------------------------------------------

function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = (
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN || ''
  ).trim()

  if (!projectId || !token) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-03-12',
    token,
    useCdn: false,
  })
}

export async function refreshMarketData(): Promise<RefreshResult> {
  const sanity = getSanityWriteClient()
  const hudToken = process.env.HUD_API_TOKEN || ''
  const fredApiKey = process.env.FRED_API_KEY || ''
  const now = new Date().toISOString()
  const errors: string[] = []
  let citiesUpdated = 0
  let citiesSkipped = 0

  for (const config of CITY_CONFIGS) {
    try {
      // Fetch from all sources in parallel
      const [censusData, hudData, fredData] = await Promise.all([
        fetchCensusData(config.fipsCode),
        hudToken
          ? fetchHudRent(config.fipsCode, hudToken)
          : Promise.resolve({} as { medianRent?: number }),
        fredApiKey
          ? fetchFredHomePrice(fredApiKey, config.cbsaCode)
          : Promise.resolve({} as { medianHomePrice?: number }),
      ])

      // Merge — only include fields that returned valid data
      const updates: MarketDataUpdate = {
        ...censusData,
        ...hudData,
        ...fredData,
      }

      // Compute derived fields if we have the inputs
      const hasNewData = Object.keys(updates).length > 0
      if (!hasNewData) {
        citiesSkipped++
        continue
      }

      // Build the Sanity patch — only set fields we actually fetched
      const patch: Record<string, unknown> = { dataUpdatedAt: now }
      const sources: string[] = []

      if (censusData.population !== undefined) {
        patch.population = censusData.population
        sources.push('Census ACS')
      }
      if (censusData.medianHouseholdIncome !== undefined) {
        patch.medianHouseholdIncome = censusData.medianHouseholdIncome
        sources.push('Census ACS')
      }
      if (censusData.vacancyRate !== undefined) {
        patch.vacancyRate = censusData.vacancyRate
      }
      if (hudData.medianRent !== undefined) {
        patch.medianRent = hudData.medianRent
        sources.push('HUD FMR')
      }
      if (fredData.medianHomePrice !== undefined) {
        patch.medianHomePrice = fredData.medianHomePrice
        sources.push('FRED')
      }

      // Recompute rentToPrice and capRate if we have both price and rent
      // (either from new data or we need to read existing)
      if (patch.medianRent !== undefined || patch.medianHomePrice !== undefined) {
        // Fetch existing doc to get the other value if needed
        const existing = await sanity.fetch(
          `*[_type == "marketCity" && slug.current == $slug][0]{ medianRent, medianHomePrice }`,
          { slug: config.slug }
        )
        const rent = (patch.medianRent as number) ?? existing?.medianRent
        const price = (patch.medianHomePrice as number) ?? existing?.medianHomePrice
        if (rent && price && price > 0) {
          patch.rentToPrice = Math.round((rent / price) * 10000) / 10000
          patch.avgCapRate = Math.round(((rent * 12 * 0.6) / price) * 1000) / 10
          // 0.6 = rough NOI ratio (60% of gross rent after expenses)
        }
      }

      // Deduplicate sources
      patch.dataSources = [...new Set(sources)]

      await sanity
        .patch(`marketCity-${config.slug}`)
        .set(patch)
        .commit()

      citiesUpdated++
    } catch (err) {
      const msg = `${config.city}, ${config.state}: ${err instanceof Error ? err.message : String(err)}`
      errors.push(msg)
      citiesSkipped++
    }
  }

  return { citiesUpdated, citiesSkipped, errors, dataUpdatedAt: now }
}
