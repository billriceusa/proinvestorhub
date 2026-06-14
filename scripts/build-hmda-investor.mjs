#!/usr/bin/env node

/**
 * Build the Investor Financing Report dataset from HMDA (public-domain) data.
 *
 * For each U.S. state + DC, this pulls the CFPB HMDA Data Browser loan-level
 * file (originations + denials; purchase, refi, cash-out), filters to
 * single-family 1-4 unit site-built loans, and computes — separately for
 * investor (occupancy_type=3) and owner-occupant (occupancy_type=1) loans:
 *
 *   - investor origination count + dollar volume
 *   - investor share of all SF 1-4 originations
 *   - investor denial rate
 *   - median investor interest rate vs median owner-occupant rate  -> RATE PREMIUM (hero)
 *   - median investor loan-to-value (leverage)
 *   - business-/commercial-purpose share (DSCR / LLC proxy)
 *   - cash-out refinance share
 *   - top denial reasons
 *
 * Rows are streamed and aggregated on the fly (histograms for medians); raw
 * records are never held in memory. Per-state results are cached so a re-run
 * resumes where it stopped (no re-download of completed states).
 *
 * OUTPUT:
 *   src/data/hmda-investor/national.json
 *   src/data/hmda-investor/states.json
 *   public/data/investor-financing-<year>.csv   (downloadable derived dataset)
 *
 * USAGE:
 *   node scripts/build-hmda-investor.mjs                 # full run, year 2024
 *   YEAR=2024 node scripts/build-hmda-investor.mjs
 *   ONLY=DC,MI node scripts/build-hmda-investor.mjs      # subset of states (testing)
 *   FRESH=1 node scripts/build-hmda-investor.mjs         # ignore cache, re-pull
 *
 * No API key/token required. Data: https://ffiec.cfpb.gov/documentation/api/data-browser/
 */

import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const YEAR = process.env.YEAR ? Number(process.env.YEAR) : 2024
const FRESH = process.env.FRESH === '1'
const ONLY = process.env.ONLY ? process.env.ONLY.split(',').map((s) => s.trim().toUpperCase()) : null

const ROOT = path.resolve(process.cwd())
const OUT_DATA = path.join(ROOT, 'src', 'data', 'hmda-investor')
const OUT_PUBLIC = path.join(ROOT, 'public', 'data')
const CACHE_DIR = path.join(process.env.CLAUDE_JOB_DIR || ROOT, 'tmp', 'hmda-cache', String(YEAR))

const API = 'https://ffiec.cfpb.gov/v2/data-browser-api/view'
// Originated (1) + denied (3); home purchase (1), refinance (31), cash-out refi (32).
const QUERY = `actions_taken=1,3&loan_purposes=1,31,32`
const SF_1_4 = 'Single Family (1-4 Units):Site-Built'

// 50 states + DC. (PR territories excluded from v1.)
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

// HMDA denial reason codes (denial_reason-1..4).
const DENIAL_REASONS = {
  1: 'Debt-to-income ratio', 2: 'Employment history', 3: 'Credit history',
  4: 'Collateral', 5: 'Insufficient cash (downpayment/closing)', 6: 'Unverifiable information',
  7: 'Credit application incomplete', 8: 'Mortgage insurance denied', 9: 'Other',
}

const num = (v) => {
  if (v === undefined || v === null) return NaN
  const t = v.trim()
  if (t === '' || t === 'NA' || t === 'Exempt' || t === '1111') return NaN
  const n = Number(t)
  return Number.isFinite(n) ? n : NaN
}

// Weighted median from a histogram Map<intKey, count>, returning key/scale.
function medianFromHist(hist, scale) {
  let total = 0
  for (const c of hist.values()) total += c
  if (total === 0) return null
  const keys = [...hist.keys()].sort((a, b) => a - b)
  const mid = total / 2
  let cum = 0
  for (const k of keys) {
    cum += hist.get(k)
    if (cum >= mid) return k / scale
  }
  return keys[keys.length - 1] / scale
}

function newAccumulator() {
  return {
    allOrigSF: 0, // all SF1-4 originations (any occupancy) -> investor-share denominator
    invOrig: 0,
    invVolume: 0,
    invDenied: 0,
    invBizPurpose: 0,
    invCashout: 0,
    invRateHist: new Map(), // key = round(rate*1000)
    invLtvHist: new Map(), // key = round(ltv*10)
    invRateExcluded: 0, // originations missing a usable rate (coverage note)
    ownerRateHist: new Map(),
    denialReasons: new Map(), // code -> count
  }
}

function addHist(hist, key) {
  hist.set(key, (hist.get(key) || 0) + 1)
}

async function streamState(abbr) {
  const url = `${API}/csv?states=${abbr}&years=${YEAR}&${QUERY}`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`${abbr}: HTTP ${res.status}`)
  if (!res.body) throw new Error(`${abbr}: no response body`)

  const acc = newAccumulator()
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  let header = null
  let idx = {} // column name -> position
  let rows = 0

  const handleLine = (line) => {
    if (!line) return
    const cells = line.split(',')
    if (!header) {
      header = cells.map((c) => c.trim())
      header.forEach((name, i) => (idx[name] = i))
      // sanity: required columns present
      for (const col of ['occupancy_type', 'action_taken', 'loan_purpose', 'interest_rate', 'loan_amount', 'derived_dwelling_category', 'business_or_commercial_purpose', 'loan_to_value_ratio']) {
        if (!(col in idx)) throw new Error(`${abbr}: missing column "${col}" in HMDA header`)
      }
      return
    }
    rows++
    const dwelling = cells[idx['derived_dwelling_category']]
    if (dwelling !== SF_1_4) return
    const action = cells[idx['action_taken']]
    const occ = cells[idx['occupancy_type']]

    if (action === '1') acc.allOrigSF++ // any-occupancy SF originations (denominator)

    if (occ === '1') {
      // owner-occupant baseline: originated rates only
      if (action === '1') {
        const r = num(cells[idx['interest_rate']])
        if (Number.isFinite(r)) addHist(acc.ownerRateHist, Math.round(r * 1000))
      }
      return
    }
    if (occ !== '3') return // skip second homes (2) and anything else

    // ---- investor (occupancy_type = 3) ----
    if (action === '1') {
      acc.invOrig++
      const amt = num(cells[idx['loan_amount']])
      if (Number.isFinite(amt)) acc.invVolume += amt
      const r = num(cells[idx['interest_rate']])
      if (Number.isFinite(r)) addHist(acc.invRateHist, Math.round(r * 1000))
      else acc.invRateExcluded++
      const ltv = num(cells[idx['loan_to_value_ratio']])
      if (Number.isFinite(ltv) && ltv > 0 && ltv <= 300) addHist(acc.invLtvHist, Math.round(ltv * 10))
      if (cells[idx['business_or_commercial_purpose']] === '1') acc.invBizPurpose++
      if (cells[idx['loan_purpose']] === '32') acc.invCashout++
    } else if (action === '3') {
      acc.invDenied++
      for (const c of ['denial_reason-1', 'denial_reason-2', 'denial_reason-3', 'denial_reason-4']) {
        if (!(c in idx)) continue
        const code = num(cells[idx[c]])
        if (Number.isFinite(code) && DENIAL_REASONS[code]) {
          acc.denialReasons.set(code, (acc.denialReasons.get(code) || 0) + 1)
        }
      }
    }
  }

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    let nl
    while ((nl = buf.indexOf('\n')) >= 0) {
      handleLine(buf.slice(0, nl).replace(/\r$/, ''))
      buf = buf.slice(nl + 1)
    }
  }
  if (buf) handleLine(buf.replace(/\r$/, ''))

  return { acc, rows }
}

// Convert raw accumulator into a compact, serializable result row.
function summarize(abbr, name, slug, acc) {
  const invMedianRate = medianFromHist(acc.invRateHist, 1000)
  const ownerMedianRate = medianFromHist(acc.ownerRateHist, 1000)
  const ratePremiumBps =
    invMedianRate != null && ownerMedianRate != null
      ? Math.round((invMedianRate - ownerMedianRate) * 100) // percentage points -> basis points
      : null
  const denialRate =
    acc.invOrig + acc.invDenied > 0
      ? acc.invDenied / (acc.invOrig + acc.invDenied)
      : null
  const topDenialReasons = [...acc.denialReasons.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([code, count]) => ({ reason: DENIAL_REASONS[code], count }))

  return {
    abbr,
    name,
    slug,
    investorOriginations: acc.invOrig,
    investorVolume: Math.round(acc.invVolume),
    investorShare: acc.allOrigSF > 0 ? acc.invOrig / acc.allOrigSF : null,
    denialRate,
    investorMedianRate: invMedianRate,
    ownerMedianRate,
    ratePremiumBps,
    investorMedianLtv: medianFromHist(acc.invLtvHist, 10),
    businessPurposeShare: acc.invOrig > 0 ? acc.invBizPurpose / acc.invOrig : null,
    cashOutShare: acc.invOrig > 0 ? acc.invCashout / acc.invOrig : null,
    topDenialReasons,
    rateCoverage:
      acc.invOrig > 0 ? (acc.invOrig - acc.invRateExcluded) / acc.invOrig : null,
  }
}

// Merge per-state accumulators into one national accumulator (for exact national medians).
function mergeInto(target, acc) {
  target.allOrigSF += acc.allOrigSF
  target.invOrig += acc.invOrig
  target.invVolume += acc.invVolume
  target.invDenied += acc.invDenied
  target.invBizPurpose += acc.invBizPurpose
  target.invCashout += acc.invCashout
  target.invRateExcluded += acc.invRateExcluded
  for (const [k, v] of acc.invRateHist) target.invRateHist.set(k, (target.invRateHist.get(k) || 0) + v)
  for (const [k, v] of acc.invLtvHist) target.invLtvHist.set(k, (target.invLtvHist.get(k) || 0) + v)
  for (const [k, v] of acc.ownerRateHist) target.ownerRateHist.set(k, (target.ownerRateHist.get(k) || 0) + v)
  for (const [k, v] of acc.denialReasons) target.denialReasons.set(k, (target.denialReasons.get(k) || 0) + v)
}

// Cache stores a serialized accumulator (histograms as arrays) per state.
function serializeAcc(acc) {
  return {
    allOrigSF: acc.allOrigSF, invOrig: acc.invOrig, invVolume: acc.invVolume,
    invDenied: acc.invDenied, invBizPurpose: acc.invBizPurpose, invCashout: acc.invCashout,
    invRateExcluded: acc.invRateExcluded,
    invRateHist: [...acc.invRateHist], invLtvHist: [...acc.invLtvHist],
    ownerRateHist: [...acc.ownerRateHist], denialReasons: [...acc.denialReasons],
  }
}
function deserializeAcc(o) {
  return {
    allOrigSF: o.allOrigSF, invOrig: o.invOrig, invVolume: o.invVolume,
    invDenied: o.invDenied, invBizPurpose: o.invBizPurpose, invCashout: o.invCashout,
    invRateExcluded: o.invRateExcluded,
    invRateHist: new Map(o.invRateHist), invLtvHist: new Map(o.invLtvHist),
    ownerRateHist: new Map(o.ownerRateHist), denialReasons: new Map(o.denialReasons),
  }
}

async function main() {
  await mkdir(OUT_DATA, { recursive: true })
  await mkdir(OUT_PUBLIC, { recursive: true })
  await mkdir(CACHE_DIR, { recursive: true })

  const targets = STATES.filter(([abbr]) => !ONLY || ONLY.includes(abbr))
  console.log(`HMDA Investor Financing build — year ${YEAR}, ${targets.length} states\n`)

  const national = newAccumulator()
  const stateRows = []

  for (const [abbr, name, slug] of targets) {
    const cacheFile = path.join(CACHE_DIR, `${abbr}.json`)
    let acc
    if (!FRESH && existsSync(cacheFile)) {
      acc = deserializeAcc(JSON.parse(await readFile(cacheFile, 'utf8')))
      console.log(`  ${abbr}  (cached)  inv orig=${acc.invOrig}`)
    } else {
      const started = process.hrtime.bigint()
      const { acc: a, rows } = await streamState(abbr)
      acc = a
      const secs = Number(process.hrtime.bigint() - started) / 1e9
      await writeFile(cacheFile, JSON.stringify(serializeAcc(acc)))
      console.log(
        `  ${abbr}  rows=${rows.toLocaleString()}  inv orig=${acc.invOrig}  inv denied=${acc.invDenied}  (${secs.toFixed(1)}s)`
      )
    }
    mergeInto(national, acc)
    stateRows.push(summarize(abbr, name, slug, acc))
  }

  // Sort states by the hero metric (rate premium, desc; nulls last) for default display.
  stateRows.sort((a, b) => (b.ratePremiumBps ?? -Infinity) - (a.ratePremiumBps ?? -Infinity))

  const nationalSummary = summarize('US', 'United States', 'united-states', national)
  const meta = {
    year: YEAR,
    source: 'CFPB / FFIEC HMDA Data Browser (loan-level public dataset)',
    universe: 'Single-family 1-4 unit, site-built; home purchase + refinance + cash-out; originated & denied',
    generatedAt: process.env.BUILD_DATE || null, // stamp at commit time; Date.* avoided for determinism
    stateCount: stateRows.length,
  }

  await writeFile(
    path.join(OUT_DATA, 'national.json'),
    JSON.stringify({ meta, ...nationalSummary }, null, 2)
  )
  await writeFile(
    path.join(OUT_DATA, 'states.json'),
    JSON.stringify({ meta, states: stateRows }, null, 2)
  )

  // Downloadable derived dataset (one row per state).
  const csvCols = [
    'state', 'abbr', 'investor_originations', 'investor_volume_usd', 'investor_share',
    'denial_rate', 'investor_median_rate', 'owner_median_rate', 'rate_premium_bps',
    'investor_median_ltv', 'business_purpose_share', 'cash_out_share',
  ]
  const csvLines = [csvCols.join(',')]
  for (const s of [...stateRows].sort((a, b) => a.name.localeCompare(b.name))) {
    csvLines.push(
      [
        `"${s.name}"`, s.abbr, s.investorOriginations, s.investorVolume,
        s.investorShare?.toFixed(4) ?? '', s.denialRate?.toFixed(4) ?? '',
        s.investorMedianRate ?? '', s.ownerMedianRate ?? '', s.ratePremiumBps ?? '',
        s.investorMedianLtv?.toFixed(1) ?? '', s.businessPurposeShare?.toFixed(4) ?? '',
        s.cashOutShare?.toFixed(4) ?? '',
      ].join(',')
    )
  }
  await writeFile(path.join(OUT_PUBLIC, `investor-financing-${YEAR}.csv`), csvLines.join('\n') + '\n')

  console.log(`\nNATIONAL: inv orig=${nationalSummary.investorOriginations.toLocaleString()}  ` +
    `share=${(nationalSummary.investorShare * 100).toFixed(1)}%  ` +
    `denial=${(nationalSummary.denialRate * 100).toFixed(1)}%  ` +
    `premium=${nationalSummary.ratePremiumBps}bps  ` +
    `inv median rate=${nationalSummary.investorMedianRate}  owner=${nationalSummary.ownerMedianRate}`)
  console.log(`\nWrote:\n  ${path.relative(ROOT, path.join(OUT_DATA, 'national.json'))}` +
    `\n  ${path.relative(ROOT, path.join(OUT_DATA, 'states.json'))}` +
    `\n  ${path.relative(ROOT, path.join(OUT_PUBLIC, `investor-financing-${YEAR}.csv`))}`)
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
