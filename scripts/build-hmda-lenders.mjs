#!/usr/bin/env node

/**
 * Build the "Most Active Investment-Property Lenders by State" dataset from the
 * HMDA combined Modified LAR — the companion to build-hmda-investor-mlar.mjs.
 *
 * Where the Investor Financing Report measures TERMS (rates, denials, DSCR
 * share), this measures WHO: which institutions originated the most
 * investment-property (single-family 1-4 unit, site-built) loans in each state,
 * by HMDA-reported origination count and dollar volume.
 *
 * IMPORTANT FRAMING: this is "most active by HMDA-reported volume," NOT
 * "best/strongest." HMDA omits non-reporting private/hard-money lenders and
 * under-captures business-purpose loans — so this is a map of the reported
 * mortgage market, not the full lender universe. The report copy must say so.
 *
 * NAME RESOLUTION: the MLAR carries only LEIs. We resolve the top-N LEIs (the
 * only ones that appear on a page) to institution names via:
 *   1. the 2024 HMDA filers map (scripts/data/hmda-filers-2024.json) — LEIs are
 *      stable across years, so the 2024 registry covers nearly all 2025 filers;
 *   2. the public GLEIF API (https://api.gleif.org) for any LEI still unmatched.
 *
 * INPUT (stream, never held in memory):
 *   unzip -p 2025_combined_mlar_header.zip | node scripts/build-hmda-lenders.mjs
 *   # or: MLAR_FILE=/path/to/file.txt node scripts/build-hmda-lenders.mjs
 *
 * OUTPUT:
 *   src/data/hmda-lenders/national.json
 *   src/data/hmda-lenders/states.json
 *   public/data/investor-lenders-<year>.csv
 *
 * ENV:
 *   YEAR=2025            data year stamped into outputs (default 2025)
 *   TOP_STATE=10         lenders listed per state (default 10)
 *   TOP_NATIONAL=30      lenders listed nationally (default 30)
 *   MIN_ORIG=10          floor: ignore (state,lei) pairs below this count (default 10)
 *   BUILD_DATE=...       stamped into meta.generatedAt
 *   MLAR_FILE=...        read this file instead of stdin
 *   NO_GLEIF=1           skip the GLEIF fallback (offline / test)
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import path from 'node:path'

const YEAR = process.env.YEAR ? Number(process.env.YEAR) : 2025
const TOP_STATE = process.env.TOP_STATE ? Number(process.env.TOP_STATE) : 10
const TOP_NATIONAL = process.env.TOP_NATIONAL ? Number(process.env.TOP_NATIONAL) : 30
const MIN_ORIG = process.env.MIN_ORIG ? Number(process.env.MIN_ORIG) : 10
const BUILD_DATE = process.env.BUILD_DATE || null
const MLAR_FILE = process.env.MLAR_FILE || null
const NO_GLEIF = process.env.NO_GLEIF === '1'

const ROOT = path.resolve(process.cwd())
const OUT_DATA = path.join(ROOT, 'src', 'data', 'hmda-lenders')
const OUT_PUBLIC = path.join(ROOT, 'public', 'data')
const FILERS_MAP = path.join(ROOT, 'scripts', 'data', 'hmda-filers-2024.json')

const SOURCE = 'CFPB / FFIEC HMDA combined Modified LAR (loan-level public dataset, early release)'
const UNIVERSE =
  'Investment-property (owner-occupancy = investor), single-family 1-4 unit, site-built originations'

const STATES = [
  ['AL', 'Alabama', 'alabama'], ['AK', 'Alaska', 'alaska'], ['AZ', 'Arizona', 'arizona'],
  ['AR', 'Arkansas', 'arkansas'], ['CA', 'California', 'california'], ['CO', 'Colorado', 'colorado'],
  ['CT', 'Connecticut', 'connecticut'], ['DE', 'Delaware', 'delaware'], ['DC', 'District of Columbia', 'district-of-columbia'],
  ['FL', 'Florida', 'florida'], ['GA', 'Georgia', 'georgia'], ['HI', 'Hawaii', 'hawaii'],
  ['ID', 'Idaho', 'idaho'], ['IL', 'Illinois', 'illinois'], ['IN', 'Indiana', 'indiana'],
  ['IA', 'Iowa', 'iowa'], ['KS', 'Kansas', 'kansas'], ['KY', 'Kentucky', 'kentucky'],
  ['LA', 'Louisiana', 'louisiana'], ['ME', 'Maine', 'maine'], ['MD', 'Maryland', 'maryland'],
  ['MA', 'Massachusetts', 'massachusetts'], ['MI', 'Michigan', 'michigan'], ['MN', 'Minnesota', 'minnesota'],
  ['MS', 'Mississippi', 'mississippi'], ['MO', 'Missouri', 'missouri'], ['MT', 'Montana', 'montana'],
  ['NE', 'Nebraska', 'nebraska'], ['NV', 'Nevada', 'nevada'], ['NH', 'New Hampshire', 'new-hampshire'],
  ['NJ', 'New Jersey', 'new-jersey'], ['NM', 'New Mexico', 'new-mexico'], ['NY', 'New York', 'new-york'],
  ['NC', 'North Carolina', 'north-carolina'], ['ND', 'North Dakota', 'north-dakota'], ['OH', 'Ohio', 'ohio'],
  ['OK', 'Oklahoma', 'oklahoma'], ['OR', 'Oregon', 'oregon'], ['PA', 'Pennsylvania', 'pennsylvania'],
  ['RI', 'Rhode Island', 'rhode-island'], ['SC', 'South Carolina', 'south-carolina'], ['SD', 'South Dakota', 'south-dakota'],
  ['TN', 'Tennessee', 'tennessee'], ['TX', 'Texas', 'texas'], ['UT', 'Utah', 'utah'],
  ['VT', 'Vermont', 'vermont'], ['VA', 'Virginia', 'virginia'], ['WA', 'Washington', 'washington'],
  ['WV', 'West Virginia', 'west-virginia'], ['WI', 'Wisconsin', 'wisconsin'], ['WY', 'Wyoming', 'wyoming'],
]
const STATE_INFO = new Map(STATES.map(([abbr, name, slug]) => [abbr, { name, slug }]))

const KEEP_PURPOSE = new Set(['1', '31', '32']) // purchase, refi, cash-out
const SF_UNITS = new Set(['1', '2', '3', '4'])

const num = (v) => {
  if (v === undefined || v === null) return NaN
  const t = v.trim()
  if (t === '' || t === 'NA' || t === 'Exempt' || t === '1111') return NaN
  const n = Number(t)
  return Number.isFinite(n) ? n : NaN
}

// Tidy ALL-CAPS legal names to title case while preserving acronyms. HMDA
// registry names are ALL CAPS, so we down-case to Title Case but keep tokens
// that read as acronyms (ampersand pairs, consonant clusters, curated terms).
const ACRONYMS = new Set([
  'LLC', 'L.L.C.', 'NA', 'N.A.', 'FSB', 'USA', 'US', 'USAA', 'DBA', 'FCU', 'CU',
  'MTG', 'PNC', 'BMO', 'TD', 'UMB', 'CMG', 'AMC', 'OCMBC', 'NBKC', 'UBS', 'BOKF',
  'AAA', 'ENT', 'ARC', 'EMM', 'OZK', 'DHI', 'SPE', 'NFM', 'JPMORGAN',
  'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX',
])
const PARTICLES = new Set(['of', 'and', 'the'])
const VOWELS = /[AEIOUY]/
function titleCase(s) {
  if (!s) return s
  return s
    .split(/\s+/)
    .map((w, i) => {
      if (w.includes('&')) return w.toUpperCase() // A&D, M&T
      const bare = w.replace(/[.,]/g, '')
      const up = bare.toUpperCase()
      if (ACRONYMS.has(up)) return w
      // all-caps consonant clusters read as acronyms: BPL, RF, OZK, TPO, LP, LTD, FSB
      if (bare === up && bare.length >= 2 && !VOWELS.test(bare)) return w
      if (/^\d/.test(w)) return w
      if (i > 0 && PARTICLES.has(bare.toLowerCase())) return w.toLowerCase()
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })
    .join(' ')
}

// ---- name resolution ----
async function loadFilersMap() {
  try {
    const j = JSON.parse(await readFile(FILERS_MAP, 'utf8'))
    return new Map(j.institutions.map((i) => [i.lei, i.name]))
  } catch {
    console.warn(`  (no filers map at ${path.relative(ROOT, FILERS_MAP)} — names from GLEIF only)`)
    return new Map()
  }
}

async function gleifBatch(leis) {
  // GLEIF accepts a comma list on filter[lei]; keep batches modest.
  const out = new Map()
  const SIZE = 50
  for (let i = 0; i < leis.length; i += SIZE) {
    const batch = leis.slice(i, i + SIZE)
    const url = `https://api.gleif.org/api/v1/lei-records?filter[lei]=${batch.join(',')}&page[size]=${SIZE}`
    try {
      const res = await fetch(url, { headers: { Accept: 'application/vnd.api+json' } })
      if (!res.ok) continue
      const j = await res.json()
      for (const rec of j.data ?? []) {
        const name = rec?.attributes?.entity?.legalName?.name
        if (rec.id && name) out.set(rec.id, name)
      }
    } catch {
      /* leave unmatched */
    }
  }
  return out
}

async function resolveNames(leis, filers) {
  const names = new Map()
  const misses = []
  for (const lei of leis) {
    const n = filers.get(lei)
    if (n) names.set(lei, n)
    else misses.push(lei)
  }
  let viaGleif = 0
  if (misses.length && !NO_GLEIF) {
    const g = await gleifBatch(misses)
    for (const [lei, n] of g) {
      names.set(lei, n)
      viaGleif++
    }
  }
  return { names, viaFilers: leis.length - misses.length, viaGleif, unresolved: misses.length - viaGleif }
}

async function main() {
  await mkdir(OUT_DATA, { recursive: true })
  await mkdir(OUT_PUBLIC, { recursive: true })

  // accumulators: per-state Map<lei, {count, volume, biz}> and national Map<lei,...>
  const byState = new Map() // abbr -> Map<lei, agg>
  const national = new Map() // lei -> agg
  const stateTotals = new Map() // abbr -> total investor originations
  let header = null
  const idx = {}
  let rows = 0
  let kept = 0

  const need = [
    'lei', 'loan_purpose', 'construction_method', 'occupancy_type', 'loan_amount',
    'action_taken', 'state_code', 'total_units', 'business_or_commercial_purpose',
  ]

  const bump = (m, lei, amt, biz) => {
    let a = m.get(lei)
    if (!a) { a = { count: 0, volume: 0, biz: 0 }; m.set(lei, a) }
    a.count++
    if (Number.isFinite(amt)) a.volume += amt
    if (biz) a.biz++
  }

  const input = MLAR_FILE ? createReadStream(MLAR_FILE) : process.stdin
  const rl = createInterface({ input, crlfDelay: Infinity })
  console.log(`HMDA investment-property lenders build (Modified LAR) — year ${YEAR}\n`)

  for await (const line of rl) {
    if (!line) continue
    const cells = line.split('|')
    if (!header) {
      header = cells.map((c) => c.trim())
      header.forEach((name, i) => (idx[name] = i))
      for (const col of need) if (!(col in idx)) throw new Error(`missing column "${col}"`)
      continue
    }
    rows++

    if (cells[idx['action_taken']] !== '1') continue // originations only
    const purpose = cells[idx['loan_purpose']]
    if (!KEEP_PURPOSE.has(purpose)) continue
    if (cells[idx['construction_method']] !== '1') continue // site-built
    if (!SF_UNITS.has(cells[idx['total_units']])) continue // 1-4 units
    if (cells[idx['occupancy_type']] !== '3') continue // investor only

    const abbr = (cells[idx['state_code']] || '').trim().toUpperCase()
    const info = STATE_INFO.get(abbr)
    if (!info) continue
    const lei = (cells[idx['lei']] || '').trim()
    if (!lei) continue
    kept++

    const amt = num(cells[idx['loan_amount']])
    const biz = cells[idx['business_or_commercial_purpose']] === '1'

    let sm = byState.get(abbr)
    if (!sm) { sm = new Map(); byState.set(abbr, sm) }
    bump(sm, lei, amt, biz)
    bump(national, lei, amt, biz)
    stateTotals.set(abbr, (stateTotals.get(abbr) || 0) + 1)
  }

  console.log(`scanned ${rows.toLocaleString()} rows; kept ${kept.toLocaleString()} investor originations`)
  console.log(`distinct lenders: ${national.size.toLocaleString()}\n`)

  // Determine the LEIs we actually need names for (union of all top-N lists).
  const topNational = [...national.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, TOP_NATIONAL)
  const neededLeis = new Set(topNational.map(([lei]) => lei))

  const stateTop = new Map() // abbr -> [[lei, agg], ...]
  for (const [abbr, sm] of byState) {
    const top = [...sm.entries()]
      .filter(([, a]) => a.count >= MIN_ORIG)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, TOP_STATE)
    stateTop.set(abbr, top)
    for (const [lei] of top) neededLeis.add(lei)
  }

  const filers = await loadFilersMap()
  const { names, viaFilers, viaGleif, unresolved } = await resolveNames([...neededLeis], filers)
  console.log(`name resolution: ${viaFilers} via HMDA filers map, ${viaGleif} via GLEIF, ${unresolved} unresolved (of ${neededLeis.size})\n`)

  const nameOf = (lei) => {
    const raw = names.get(lei)
    return raw ? titleCase(raw) : `Lender ${lei.slice(0, 8)}…`
  }
  const lenderRow = (lei, agg, rank) => ({
    rank,
    lei,
    name: nameOf(lei),
    originations: agg.count,
    volume: Math.round(agg.volume),
    businessPurposeShare: agg.count > 0 ? agg.biz / agg.count : null,
    resolved: names.has(lei),
  })

  const meta = {
    year: YEAR,
    source: SOURCE,
    universe: UNIVERSE,
    generatedAt: BUILD_DATE,
    topPerState: TOP_STATE,
    minOriginations: MIN_ORIG,
    distinctLenders: national.size,
    nameResolution: { viaFilers, viaGleif, unresolved, of: neededLeis.size },
    nameNote:
      'Lender names resolved from the 2024 HMDA filers registry (LEIs are stable across years) ' +
      'with a GLEIF fallback. The 2025 HMDA institution registry was not yet published at build time.',
  }

  const nationalOut = {
    meta,
    totalInvestorOriginations: kept,
    lenders: topNational.map(([lei, agg], i) => lenderRow(lei, agg, i + 1)),
  }

  const statesOut = {
    meta,
    states: STATES.map(([abbr, name, slug]) => {
      const top = stateTop.get(abbr) || []
      return {
        abbr,
        name,
        slug,
        totalInvestorOriginations: stateTotals.get(abbr) || 0,
        lenders: top.map(([lei, agg], i) => lenderRow(lei, agg, i + 1)),
      }
    }),
  }

  await writeFile(path.join(OUT_DATA, 'national.json'), JSON.stringify(nationalOut, null, 2))
  await writeFile(path.join(OUT_DATA, 'states.json'), JSON.stringify(statesOut, null, 2))

  // CSV: one row per (state, lender) for the top lists.
  const cols = ['state', 'abbr', 'rank', 'lender', 'lei', 'investor_originations', 'investor_volume_usd', 'business_purpose_share']
  const lines = [cols.join(',')]
  for (const s of statesOut.states) {
    for (const l of s.lenders) {
      lines.push([`"${s.name}"`, s.abbr, l.rank, `"${l.name}"`, l.lei, l.originations, l.volume, l.businessPurposeShare?.toFixed(4) ?? ''].join(','))
    }
  }
  await writeFile(path.join(OUT_PUBLIC, `investor-lenders-${YEAR}.csv`), lines.join('\n') + '\n')

  console.log('TOP 12 NATIONAL investment-property lenders:')
  for (const l of nationalOut.lenders.slice(0, 12)) {
    console.log(`  ${String(l.rank).padStart(2)}. ${l.name.padEnd(42)} ${l.originations.toLocaleString().padStart(8)}  $${(l.volume / 1e9).toFixed(2)}B`)
  }
  console.log('\nWrote national.json, states.json, and the CSV.')
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
