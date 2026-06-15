#!/usr/bin/env node

/**
 * Build the Investor Financing Report dataset from the HMDA combined Modified
 * LAR (loan-level public dataset) — the early-release product the CFPB
 * publishes months before the finalized Snapshot National Loan-Level Dataset.
 *
 * This is the Modified-LAR counterpart to build-hmda-investor.mjs (which pulls
 * the Data Browser Snapshot via the API). It computes the SAME metrics with the
 * SAME logic so a year built here is directly comparable to a year built there.
 * The two products differ only in: (a) format — the MLAR is one pipe-delimited
 * combined file, not per-state CSV; (b) columns — the MLAR carries raw reported
 * codes, with no derived_* convenience columns, so the "Single Family (1-4
 * Units):Site-Built" universe is reconstructed from construction_method +
 * total_units. The underlying loan records are the same HMDA filings.
 *
 * It also emits a year-over-year trend layer (trends.json) by diffing the new
 * year against a preserved prior-year dataset.
 *
 * INPUT (stream, never held in memory):
 *   unzip -p 2025_combined_mlar_header.zip | node scripts/build-hmda-investor-mlar.mjs
 *   # or: MLAR_FILE=/path/to/2025_combined_mlar_header.txt node scripts/build-hmda-investor-mlar.mjs
 *
 * OUTPUT:
 *   src/data/hmda-investor/national.json              (current year)
 *   src/data/hmda-investor/states.json                (current year)
 *   public/data/investor-financing-<year>.csv         (downloadable derived dataset)
 *   src/data/hmda-investor/trends.json                (YoY vs PRIOR_YEAR, if baseline present)
 *
 * ENV:
 *   YEAR=2025            data year stamped into outputs (default 2025)
 *   PRIOR_YEAR=2024      baseline year to diff against for trends (default 2024)
 *   BUILD_DATE=...       stamped into meta.generatedAt (Date.* avoided for determinism)
 *   MLAR_FILE=...        read this file instead of stdin
 *
 * Data: https://ffiec.cfpb.gov/data-publication/modified-lar
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync, createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import path from 'node:path'

const YEAR = process.env.YEAR ? Number(process.env.YEAR) : 2025
const PRIOR_YEAR = process.env.PRIOR_YEAR ? Number(process.env.PRIOR_YEAR) : 2024
const BUILD_DATE = process.env.BUILD_DATE || null
const MLAR_FILE = process.env.MLAR_FILE || null

const ROOT = path.resolve(process.cwd())
const OUT_DATA = path.join(ROOT, 'src', 'data', 'hmda-investor')
const OUT_PUBLIC = path.join(ROOT, 'public', 'data')

const SOURCE = 'CFPB / FFIEC HMDA combined Modified LAR (loan-level public dataset, early release)'
const UNIVERSE =
  'Single-family 1-4 unit, site-built; home purchase + refinance + cash-out; originated & denied'

// 50 states + DC (matches the Snapshot build; PR/territories excluded).
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

// HMDA denial reason codes (denial_reason_1..4).
const DENIAL_REASONS = {
  1: 'Debt-to-income ratio', 2: 'Employment history', 3: 'Credit history',
  4: 'Collateral', 5: 'Insufficient cash (downpayment/closing)', 6: 'Unverifiable information',
  7: 'Credit application incomplete', 8: 'Mortgage insurance denied', 9: 'Other',
}

// Loan purposes kept: home purchase (1), refinance (31), cash-out refi (32).
const KEEP_PURPOSE = new Set(['1', '31', '32'])
// Actions kept: originated (1), denied (3).
const KEEP_ACTION = new Set(['1', '3'])
// 1-4 unit (single-family) total_units codes.
const SF_UNITS = new Set(['1', '2', '3', '4'])

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

// Convert raw accumulator into a compact, serializable result row.
function summarize(abbr, name, slug, acc) {
  const invMedianRate = medianFromHist(acc.invRateHist, 1000)
  const ownerMedianRate = medianFromHist(acc.ownerRateHist, 1000)
  const ratePremiumBps =
    invMedianRate != null && ownerMedianRate != null
      ? Math.round((invMedianRate - ownerMedianRate) * 100) // percentage points -> basis points
      : null
  const denialRate =
    acc.invOrig + acc.invDenied > 0 ? acc.invDenied / (acc.invOrig + acc.invDenied) : null
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
    rateCoverage: acc.invOrig > 0 ? (acc.invOrig - acc.invRateExcluded) / acc.invOrig : null,
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

// ---- trend layer ----

const TREND_METRICS = [
  'ratePremiumBps', 'denialRate', 'investorShare', 'businessPurposeShare',
  'investorMedianRate', 'ownerMedianRate', 'investorMedianLtv', 'cashOutShare',
  'investorOriginations', 'investorVolume',
]

function delta(current, prior) {
  if (current == null || prior == null) return { current, prior, abs: null, pct: null }
  const abs = current - prior
  const pct = prior !== 0 ? abs / Math.abs(prior) : null
  return { current, prior, abs, pct }
}

async function buildTrends(currentNational, currentStates) {
  const priorNatPath = path.join(OUT_DATA, `national-${PRIOR_YEAR}.json`)
  const priorStPath = path.join(OUT_DATA, `states-${PRIOR_YEAR}.json`)
  if (!existsSync(priorNatPath) || !existsSync(priorStPath)) {
    console.log(`\n(no ${PRIOR_YEAR} baseline found — skipping trends.json)`)
    return null
  }
  const priorNational = JSON.parse(await readFile(priorNatPath, 'utf8'))
  const priorStates = JSON.parse(await readFile(priorStPath, 'utf8')).states
  const priorByAbbr = new Map(priorStates.map((s) => [s.abbr, s]))

  const national = {}
  for (const m of TREND_METRICS) national[m] = delta(currentNational[m], priorNational[m])

  const stateRows = []
  for (const cur of currentStates) {
    const prev = priorByAbbr.get(cur.abbr)
    if (!prev) continue
    const row = { abbr: cur.abbr, name: cur.name, slug: cur.slug }
    for (const m of TREND_METRICS) row[m] = delta(cur[m], prev[m])
    stateRows.push(row)
  }

  // Biggest movers (states with a defined delta on each metric).
  const byAbs = (metric, dir) =>
    stateRows
      .filter((r) => r[metric].abs != null)
      .sort((a, b) => (dir === 'up' ? b[metric].abs - a[metric].abs : a[metric].abs - b[metric].abs))
      .slice(0, 5)
      .map((r) => ({
        abbr: r.abbr, name: r.name, slug: r.slug,
        prior: r[metric].prior, current: r[metric].current, abs: r[metric].abs,
      }))

  const movers = {
    premiumUp: byAbs('ratePremiumBps', 'up'),
    premiumDown: byAbs('ratePremiumBps', 'down'),
    denialUp: byAbs('denialRate', 'up'),
    denialDown: byAbs('denialRate', 'down'),
    shareUp: byAbs('investorShare', 'up'),
    bizUp: byAbs('businessPurposeShare', 'up'),
  }

  return {
    meta: {
      currentYear: YEAR,
      priorYear: PRIOR_YEAR,
      currentSource: SOURCE,
      priorSource: priorNational.meta?.source ?? null,
      note:
        `Year-over-year compares the ${PRIOR_YEAR} finalized Snapshot dataset with the ` +
        `${YEAR} early-release combined Modified LAR. Both are CFPB HMDA loan-level public ` +
        `data covering the same universe and computed identically; ${YEAR} figures will be ` +
        `reconciled when the ${YEAR} Snapshot publishes.`,
      generatedAt: BUILD_DATE,
    },
    national,
    states: stateRows,
    movers,
  }
}

async function main() {
  await mkdir(OUT_DATA, { recursive: true })
  await mkdir(OUT_PUBLIC, { recursive: true })

  const accByState = new Map() // abbr -> accumulator
  let header = null
  const idx = {}
  let rows = 0
  let kept = 0

  const need = [
    'activity_year', 'loan_purpose', 'construction_method', 'occupancy_type', 'loan_amount',
    'action_taken', 'state_code', 'interest_rate', 'combined_loan_to_value_ratio',
    'total_units', 'business_or_commercial_purpose',
  ]

  const input = MLAR_FILE ? createReadStream(MLAR_FILE) : process.stdin
  const rl = createInterface({ input, crlfDelay: Infinity })

  console.log(`HMDA Investor Financing build (Modified LAR) — year ${YEAR}\n`)

  for await (const line of rl) {
    if (!line) continue
    const cells = line.split('|')
    if (!header) {
      header = cells.map((c) => c.trim())
      header.forEach((name, i) => (idx[name] = i))
      for (const col of need) {
        if (!(col in idx)) throw new Error(`missing column "${col}" in MLAR header`)
      }
      continue
    }
    rows++

    // Universe filters (reconstruct the Snapshot's derived SF 1-4 site-built set).
    const purpose = cells[idx['loan_purpose']]
    if (!KEEP_PURPOSE.has(purpose)) continue
    const action = cells[idx['action_taken']]
    if (!KEEP_ACTION.has(action)) continue
    if (cells[idx['construction_method']] !== '1') continue // site-built
    if (!SF_UNITS.has(cells[idx['total_units']])) continue // 1-4 units

    const abbr = (cells[idx['state_code']] || '').trim().toUpperCase()
    const info = STATE_INFO.get(abbr)
    if (!info) continue // outside 50 states + DC (territories / withheld)

    let acc = accByState.get(abbr)
    if (!acc) {
      acc = newAccumulator()
      accByState.set(abbr, acc)
    }
    kept++

    if (action === '1') acc.allOrigSF++ // any-occupancy SF originations (denominator)

    const occ = cells[idx['occupancy_type']]
    if (occ === '1') {
      if (action === '1') {
        const r = num(cells[idx['interest_rate']])
        if (Number.isFinite(r)) addHist(acc.ownerRateHist, Math.round(r * 1000))
      }
      continue
    }
    if (occ !== '3') continue // skip second homes (2)

    // ---- investor (occupancy_type = 3) ----
    if (action === '1') {
      acc.invOrig++
      const amt = num(cells[idx['loan_amount']])
      if (Number.isFinite(amt)) acc.invVolume += amt
      const r = num(cells[idx['interest_rate']])
      if (Number.isFinite(r)) addHist(acc.invRateHist, Math.round(r * 1000))
      else acc.invRateExcluded++
      const ltv = num(cells[idx['combined_loan_to_value_ratio']])
      if (Number.isFinite(ltv) && ltv > 0 && ltv <= 300) addHist(acc.invLtvHist, Math.round(ltv * 10))
      if (cells[idx['business_or_commercial_purpose']] === '1') acc.invBizPurpose++
      if (purpose === '32') acc.invCashout++
    } else if (action === '3') {
      acc.invDenied++
      for (const c of ['denial_reason_1', 'denial_reason_2', 'denial_reason_3', 'denial_reason_4']) {
        if (!(c in idx)) continue
        const code = num(cells[idx[c]])
        if (Number.isFinite(code) && DENIAL_REASONS[code]) {
          acc.denialReasons.set(code, (acc.denialReasons.get(code) || 0) + 1)
        }
      }
    }
  }

  console.log(`scanned ${rows.toLocaleString()} rows; kept ${kept.toLocaleString()} in-universe\n`)

  // Per-state summaries + national merge.
  const national = newAccumulator()
  const stateRows = []
  for (const [abbr, info] of STATE_INFO) {
    const acc = accByState.get(abbr)
    if (!acc) {
      console.warn(`  WARNING: no rows for ${abbr}`)
      continue
    }
    mergeInto(national, acc)
    stateRows.push(summarize(abbr, info.name, info.slug, acc))
    console.log(`  ${abbr}  inv orig=${acc.invOrig}  inv denied=${acc.invDenied}`)
  }

  stateRows.sort((a, b) => (b.ratePremiumBps ?? -Infinity) - (a.ratePremiumBps ?? -Infinity))

  const nationalSummary = summarize('US', 'United States', 'united-states', national)
  const meta = {
    year: YEAR,
    source: SOURCE,
    universe: UNIVERSE,
    generatedAt: BUILD_DATE,
    stateCount: stateRows.length,
  }

  await writeFile(path.join(OUT_DATA, 'national.json'), JSON.stringify({ meta, ...nationalSummary }, null, 2))
  await writeFile(path.join(OUT_DATA, 'states.json'), JSON.stringify({ meta, states: stateRows }, null, 2))

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

  // Year-over-year trend layer.
  const trends = await buildTrends({ ...nationalSummary, meta }, stateRows)
  if (trends) {
    await writeFile(path.join(OUT_DATA, 'trends.json'), JSON.stringify(trends, null, 2))
  }

  const p = nationalSummary
  console.log(
    `\nNATIONAL ${YEAR}: inv orig=${p.investorOriginations.toLocaleString()}  ` +
      `share=${(p.investorShare * 100).toFixed(1)}%  denial=${(p.denialRate * 100).toFixed(1)}%  ` +
      `premium=${p.ratePremiumBps}bps  inv rate=${p.investorMedianRate}  owner=${p.ownerMedianRate}  ` +
      `ltv=${p.investorMedianLtv}  biz=${(p.businessPurposeShare * 100).toFixed(1)}%`
  )
  if (trends) {
    const d = trends.national
    console.log(
      `YoY vs ${PRIOR_YEAR}: premium ${d.ratePremiumBps.abs >= 0 ? '+' : ''}${d.ratePremiumBps.abs}bps  ` +
        `denial ${(d.denialRate.abs * 100).toFixed(1)}pp  share ${(d.investorShare.abs * 100).toFixed(1)}pp  ` +
        `orig ${d.investorOriginations.abs >= 0 ? '+' : ''}${d.investorOriginations.abs.toLocaleString()}`
    )
  }
  console.log('\nWrote national.json, states.json, trends.json, and the CSV.')
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
