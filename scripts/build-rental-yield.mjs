#!/usr/bin/env node

/**
 * Build the "Best Cash-Flow Markets" gross rental-yield dataset from Census ACS
 * (public-domain) data — the companion to the HMDA Investor Financing Report.
 *
 * Gross rental yield = (annual median gross rent) / (median home value), computed
 * from a SINGLE consistent source and vintage so rent and value are apples-to-
 * apples: the ACS 1-year estimates (most current; covers areas >= 65k population).
 *
 *   B25064_001E = median gross rent (monthly, incl. utilities)
 *   B25077_001E = median value (owner-occupied homes)
 *   grossYield  = (B25064_001E * 12) / B25077_001E
 *
 * Pulls the US, all 50 states + DC, and all metropolitan statistical areas.
 *
 * OUTPUT:
 *   src/data/rental-yield/national.json
 *   src/data/rental-yield/states.json     (sorted by yield, desc)
 *   src/data/rental-yield/metros.json      (Metro Areas only, sorted by yield, desc)
 *   public/data/rental-yield-<year>.csv
 *
 * REQUIRES a free Census API key (https://api.census.gov/data/key_signup.html):
 *   CENSUS_API_KEY=xxxx node scripts/build-rental-yield.mjs
 *   YEAR=2024 CENSUS_API_KEY=xxxx node scripts/build-rental-yield.mjs   # default 2024
 *   BUILD_DATE=2026-06-15 ...                                           # stamp meta.generatedAt
 *
 * Run from a machine with network access (the Census API needs DNS + HTTPS).
 * Docs: https://www.census.gov/data/developers/data-sets/acs-1year.html
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const YEAR = process.env.YEAR ? Number(process.env.YEAR) : 2024
const KEY = process.env.CENSUS_API_KEY
const BUILD_DATE = process.env.BUILD_DATE || null

if (!KEY) {
  console.error(
    'FAILED: set CENSUS_API_KEY (free: https://api.census.gov/data/key_signup.html)'
  )
  process.exit(1)
}

const ROOT = path.resolve(process.cwd())
const OUT_DATA = path.join(ROOT, 'src', 'data', 'rental-yield')
const OUT_PUBLIC = path.join(ROOT, 'public', 'data')
const BASE = `https://api.census.gov/data/${YEAR}/acs/acs1`
const VARS = 'NAME,B25064_001E,B25077_001E'
const SOURCE = `U.S. Census Bureau, American Community Survey ${YEAR} 1-year estimates`
const UNIVERSE =
  'Median gross rent and median owner-occupied home value; geographies with population >= 65,000'

// State FIPS -> abbr/name/slug (50 states + DC).
const STATE_FIPS = {
  '01': ['AL', 'Alabama', 'alabama'], '02': ['AK', 'Alaska', 'alaska'], '04': ['AZ', 'Arizona', 'arizona'],
  '05': ['AR', 'Arkansas', 'arkansas'], '06': ['CA', 'California', 'california'], '08': ['CO', 'Colorado', 'colorado'],
  '09': ['CT', 'Connecticut', 'connecticut'], '10': ['DE', 'Delaware', 'delaware'], '11': ['DC', 'District of Columbia', 'district-of-columbia'],
  '12': ['FL', 'Florida', 'florida'], '13': ['GA', 'Georgia', 'georgia'], '15': ['HI', 'Hawaii', 'hawaii'],
  '16': ['ID', 'Idaho', 'idaho'], '17': ['IL', 'Illinois', 'illinois'], '18': ['IN', 'Indiana', 'indiana'],
  '19': ['IA', 'Iowa', 'iowa'], '20': ['KS', 'Kansas', 'kansas'], '21': ['KY', 'Kentucky', 'kentucky'],
  '22': ['LA', 'Louisiana', 'louisiana'], '23': ['ME', 'Maine', 'maine'], '24': ['MD', 'Maryland', 'maryland'],
  '25': ['MA', 'Massachusetts', 'massachusetts'], '26': ['MI', 'Michigan', 'michigan'], '27': ['MN', 'Minnesota', 'minnesota'],
  '28': ['MS', 'Mississippi', 'mississippi'], '29': ['MO', 'Missouri', 'missouri'], '30': ['MT', 'Montana', 'montana'],
  '31': ['NE', 'Nebraska', 'nebraska'], '32': ['NV', 'Nevada', 'nevada'], '33': ['NH', 'New Hampshire', 'new-hampshire'],
  '34': ['NJ', 'New Jersey', 'new-jersey'], '35': ['NM', 'New Mexico', 'new-mexico'], '36': ['NY', 'New York', 'new-york'],
  '37': ['NC', 'North Carolina', 'north-carolina'], '38': ['ND', 'North Dakota', 'north-dakota'], '39': ['OH', 'Ohio', 'ohio'],
  '40': ['OK', 'Oklahoma', 'oklahoma'], '41': ['OR', 'Oregon', 'oregon'], '42': ['PA', 'Pennsylvania', 'pennsylvania'],
  '44': ['RI', 'Rhode Island', 'rhode-island'], '45': ['SC', 'South Carolina', 'south-carolina'], '46': ['SD', 'South Dakota', 'south-dakota'],
  '47': ['TN', 'Tennessee', 'tennessee'], '48': ['TX', 'Texas', 'texas'], '49': ['UT', 'Utah', 'utah'],
  '50': ['VT', 'Vermont', 'vermont'], '51': ['VA', 'Virginia', 'virginia'], '53': ['WA', 'Washington', 'washington'],
  '54': ['WV', 'West Virginia', 'west-virginia'], '55': ['WI', 'Wisconsin', 'wisconsin'], '56': ['WY', 'Wyoming', 'wyoming'],
}

// ACS uses large negative sentinels for unavailable/annotation values.
const num = (v) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : null
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

function grossYield(rent, value) {
  if (rent == null || value == null) return null
  return (rent * 12) / value
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchRows(geoQuery, attempts = 5) {
  const url = `${BASE}?get=${VARS}&for=${encodeURIComponent(geoQuery)}&key=${KEY}`
  let lastErr
  for (let i = 1; i <= attempts; i++) {
    const res = await fetch(url)
    const text = await res.text()
    // The Census API intermittently returns a 200 with an "Invalid Key" HTML
    // page under rapid sequential requests; the same key succeeds on retry.
    if (res.ok && text.trimStart().startsWith('[')) {
      const data = JSON.parse(text) // [ [header...], [row...], ... ]
      const header = data[0]
      const idx = Object.fromEntries(header.map((h, j) => [h, j]))
      return { rows: data.slice(1), idx }
    }
    lastErr = `Census API ${res.status} for "${geoQuery}": ${text.slice(0, 80).replace(/\s+/g, ' ')}`
    if (i < attempts) await sleep(1000 * i)
  }
  throw new Error(`${lastErr} (after ${attempts} attempts)`)
}

function row(name, slug, rent, value, extra = {}) {
  return {
    name,
    slug,
    medianGrossRent: rent,
    medianHomeValue: value,
    grossYield: grossYield(rent, value),
    ...extra,
  }
}

async function main() {
  await mkdir(OUT_DATA, { recursive: true })
  await mkdir(OUT_PUBLIC, { recursive: true })
  console.log(`Best Cash-Flow Markets build — ACS ${YEAR} 1-year\n`)

  // --- national ---
  const us = await fetchRows('us:*')
  const u = us.rows[0]
  const national = row(
    'United States',
    'united-states',
    num(u[us.idx.B25064_001E]),
    num(u[us.idx.B25077_001E])
  )
  console.log(`US: rent=${national.medianGrossRent} value=${national.medianHomeValue} yield=${(national.grossYield * 100).toFixed(2)}%`)

  // --- states ---
  const st = await fetchRows('state:*')
  const states = []
  for (const r of st.rows) {
    const fips = r[st.idx.state]
    const info = STATE_FIPS[fips]
    if (!info) continue // territories (PR etc.)
    const [abbr, name, slug] = info
    states.push(row(name, slug, num(r[st.idx.B25064_001E]), num(r[st.idx.B25077_001E]), { abbr }))
  }
  states.sort((a, b) => (b.grossYield ?? -Infinity) - (a.grossYield ?? -Infinity))
  console.log(`states: ${states.length}`)

  // --- metros (Metro Areas only) ---
  const mt = await fetchRows('metropolitan statistical area/micropolitan statistical area:*')
  const cbsaKey = 'metropolitan statistical area/micropolitan statistical area'
  const metros = []
  for (const r of mt.rows) {
    const name = r[mt.idx.NAME]
    if (!name.endsWith('Metro Area')) continue // drop Micro Areas
    const cbsa = r[mt.idx[cbsaKey]]
    const short = name.replace(/ Metro Area$/, '')
    const stateSeg = (short.match(/,\s*([A-Z]{2}(?:-[A-Z]{2})*)$/) || [])[1] || null
    metros.push(
      row(short, slugify(short), num(r[mt.idx.B25064_001E]), num(r[mt.idx.B25077_001E]), {
        cbsa,
        state: stateSeg,
      })
    )
  }
  metros.sort((a, b) => (b.grossYield ?? -Infinity) - (a.grossYield ?? -Infinity))
  console.log(`metros (Metro Areas): ${metros.length}`)

  const meta = {
    year: YEAR,
    dataset: `ACS ${YEAR} 1-year`,
    source: SOURCE,
    universe: UNIVERSE,
    metric: 'Gross rental yield = (median gross rent x 12) / median home value',
    generatedAt: BUILD_DATE,
    stateCount: states.length,
    metroCount: metros.length,
  }

  await writeFile(path.join(OUT_DATA, 'national.json'), JSON.stringify({ meta, ...national }, null, 2))
  await writeFile(path.join(OUT_DATA, 'states.json'), JSON.stringify({ meta, states }, null, 2))
  await writeFile(path.join(OUT_DATA, 'metros.json'), JSON.stringify({ meta, metros }, null, 2))

  // CSV (states + metros)
  const csvCols = ['type', 'name', 'state', 'median_gross_rent', 'median_home_value', 'gross_yield']
  const lines = [csvCols.join(',')]
  for (const s of [...states].sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(['state', `"${s.name}"`, s.abbr, s.medianGrossRent ?? '', s.medianHomeValue ?? '', s.grossYield?.toFixed(4) ?? ''].join(','))
  }
  for (const m of [...metros].sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(['metro', `"${m.name}"`, m.state ?? '', m.medianGrossRent ?? '', m.medianHomeValue ?? '', m.grossYield?.toFixed(4) ?? ''].join(','))
  }
  await writeFile(path.join(OUT_PUBLIC, `rental-yield-${YEAR}.csv`), lines.join('\n') + '\n')

  const top = metros.filter((m) => m.grossYield != null).slice(0, 5)
  console.log(`\nTop metro yields: ${top.map((m) => `${m.name} ${(m.grossYield * 100).toFixed(1)}%`).join(' | ')}`)
  console.log(`\nWrote national.json, states.json, metros.json, and rental-yield-${YEAR}.csv`)
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
