// build-rhfs.mjs — American Rental Ownership Report data pipeline
//
// Source: U.S. Census Bureau, Rental Housing Finance Survey (RHFS) Public Use Files.
//   2024 wave released 2026-02-19 (reference year 2023); 2018 + 2021 waves for the trend.
//   National-only (no geographic detail in the PUF). Public domain (U.S. government work).
//
// Every estimate is WEIGHTED by the property weight `WEIGHT`. Raw record counts are NOT
// meaningful — the sample deliberately over-samples large multifamily properties. Unit-level
// estimates weight by WEIGHT * NUMUNITS_R. The script self-validates against Census's own
// published property/unit totals (see VALIDATION below) and refuses to write if they drift.
//
// Usage (manual — like the other build-*.mjs; outputs are committed, not built in CI):
//   RHFS_DATA_DIR=/path/with/rhfspuf2018.csv,rhfspuf2021.csv,rhfspuf2024.csv node scripts/build-rhfs.mjs
//   node scripts/build-rhfs.mjs        # no local dir -> downloads the PUFs from Census www2
//
// Env: RHFS_DATA_DIR (optional local dir of rhfspuf<year>.csv), BUILD_DATE (stamps generatedAt).

import { writeFile, readFile, mkdir, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DATA = path.join(ROOT, 'src/data/rhfs')
const OUT_PUBLIC = path.join(ROOT, 'public/data')

const WAVES = [2018, 2021, 2024]
const CUR = 2024
const PREV_TREND = 2018 // the comparable prior wave for the headline delta
const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10)

// Canonical Census download URLs (used only when no local RHFS_DATA_DIR is provided).
const PUF_URL = {
  2018: 'https://www2.census.gov/programs-surveys/rhfs/data/public-use-files/2018/rhfspuf2018_v2.csv',
  2021: 'https://www2.census.gov/programs-surveys/rhfs/data/public-use-files/2021/rhfspuf2021_v1_1.csv',
  2024: 'https://www2.census.gov/programs-surveys/rhfs/data/public-use-files/2024/rhfspuf2024.csv',
}

// Census-published control totals to validate our weighting against (property + unit universe).
// If our computed totals drift > 3% from these, something is wrong with the weighting — abort.
const VALIDATION = {
  2018: { properties: 19_960_000 },
  2024: { properties: 18_960_000, units: 49_900_000 },
}
const VAL_TOLERANCE = 0.03

// OWNENT — Current ownership entity (from the RHFS codebook).
const OWNENT_LABEL = {
  1: 'Individual investor',
  2: 'Trustee for estate',
  3: 'LLP, LP, or LLC',
  4: 'Tenant in common',
  5: 'General partnership',
  6: 'Real Estate Investment Trust (REIT)',
  7: 'Real estate corporation',
  8: 'Housing cooperative',
  9: 'Nonprofit organization',
  10: 'Other institution',
}
const OWNENT_INDIVIDUAL = 1
const OWNENT_LLC = 3

// NUMCAT_R — property size band (units).
const NUMCAT_LABEL = {
  0: '1 unit',
  1: '2–4 units',
  2: '5–24 units',
  3: '25–49 units',
  4: '50+ units',
}

// ---- small helpers -------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function exists(p) {
  try { await access(p); return true } catch { return false }
}

// Parse a PUF CSV into rows keyed by header name. RHFS PUFs are plain numeric CSVs
// (no embedded commas / quotes), so a split parser is safe here.
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0)
  const header = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
  const idx = Object.fromEntries(header.map((h, i) => [h, i]))
  const rows = []
  for (let i = 1; i < lines.length; i++) rows.push(lines[i].split(','))
  return { idx, rows }
}

function num(v) {
  if (v == null || v === '') return NaN
  const n = Number(v)
  return Number.isFinite(n) ? n : NaN
}

// Weighted median over [{ value, weight }], values already filtered to the valid universe.
function weightedMedian(pairs) {
  const clean = pairs.filter((p) => Number.isFinite(p.value) && p.weight > 0).sort((a, b) => a.value - b.value)
  const total = clean.reduce((s, p) => s + p.weight, 0)
  if (total === 0) return null
  let cum = 0
  for (const p of clean) {
    cum += p.weight
    if (cum >= total / 2) return p.value
  }
  return clean[clean.length - 1].value
}

const pct = (part, whole) => (whole > 0 ? (part / whole) * 100 : null)
const round1 = (n) => (n == null ? null : Math.round(n * 10) / 10)
const round0 = (n) => (n == null ? null : Math.round(n))

// ---- load a wave ---------------------------------------------------------

async function loadWave(year) {
  const localDir = process.env.RHFS_DATA_DIR
  if (localDir) {
    const p = path.join(localDir, `rhfspuf${year}.csv`)
    if (await exists(p)) {
      console.log(`  ${year}: reading local ${p}`)
      return parseCsv(await readFile(p, 'utf8'))
    }
    console.warn(`  ${year}: not found in RHFS_DATA_DIR, falling back to download`)
  }
  const url = PUF_URL[year]
  console.log(`  ${year}: downloading ${url}`)
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return parseCsv(await res.text())
    } catch (err) {
      if (attempt === 5) throw err
      console.warn(`    retry ${attempt} after error: ${err.message}`)
      await sleep(2000 * attempt)
    }
  }
}

// ---- compute one wave's weighted estimates -------------------------------

function computeWave(year, { idx, rows }) {
  const need = ['OWNENT', 'WEIGHT', 'NUMUNITS_R', 'NUMCAT_R', 'DEBT', 'MRKTVAL_R', 'PURPRICE_R']
  for (const c of need) {
    if (!(c in idx)) throw new Error(`${year}: missing expected column ${c}`)
  }
  const iOwn = idx.OWNENT, iW = idx.WEIGHT, iU = idx.NUMUNITS_R, iCat = idx.NUMCAT_R
  const iDebt = idx.DEBT, iMkt = idx.MRKTVAL_R, iPur = idx.PURPRICE_R

  let propTotal = 0, unitTotal = 0
  const ownProp = {}, ownUnit = {}
  const catProp = {}, catUnit = {}
  let debtPropYes = 0, debtPropDenom = 0, debtUnitYes = 0, debtUnitDenom = 0
  const mktPairs = [], purPairs = []

  for (const r of rows) {
    const w = num(r[iW])
    if (!Number.isFinite(w) || w <= 0) continue
    const units = num(r[iU])
    const uw = Number.isFinite(units) && units > 0 ? w * units : 0
    propTotal += w
    unitTotal += uw

    const own = num(r[iOwn])
    ownProp[own] = (ownProp[own] || 0) + w
    ownUnit[own] = (ownUnit[own] || 0) + uw

    const cat = num(r[iCat])
    catProp[cat] = (catProp[cat] || 0) + w
    catUnit[cat] = (catUnit[cat] || 0) + uw

    // DEBT: 1=has debt, 2=no debt, -9=not reported (exclude from denom)
    const debt = num(r[iDebt])
    if (debt === 1 || debt === 2) {
      debtPropDenom += w; debtUnitDenom += uw
      if (debt === 1) { debtPropYes += w; debtUnitYes += uw }
    }

    // Dollar recodes: exclude -9 (not reported) and -8 (not applicable); keep 0+.
    const mkt = num(r[iMkt])
    if (mkt >= 0) mktPairs.push({ value: mkt, weight: w })
    const pur = num(r[iPur])
    if (pur >= 0) purPairs.push({ value: pur, weight: w })
  }

  // OWNENT shares (property-weighted), including the -9 "Not reported" in the denominator
  // (this is how RHFS property totals reconcile). Also compute a reported-only base.
  const ownReportedDenom = propTotal - (ownProp[-9] || 0)
  const ownUnitReportedDenom = unitTotal - (ownUnit[-9] || 0)

  const entities = Object.keys(OWNENT_LABEL).map(Number).map((code) => ({
    code,
    label: OWNENT_LABEL[code],
    propShare: round1(pct(ownProp[code] || 0, propTotal)),
    unitShare: round1(pct(ownUnit[code] || 0, unitTotal)),
    propShareReported: round1(pct(ownProp[code] || 0, ownReportedDenom)),
    unitShareReported: round1(pct(ownUnit[code] || 0, ownUnitReportedDenom)),
  }))

  const sizes = Object.keys(NUMCAT_LABEL).map(Number).map((code) => ({
    code,
    label: NUMCAT_LABEL[code],
    propShare: round1(pct(catProp[code] || 0, propTotal)),
    unitShare: round1(pct(catUnit[code] || 0, unitTotal)),
  }))

  return {
    year,
    propertyTotal: round0(propTotal),
    unitTotal: round0(unitTotal),
    nonreportedOwnershipShare: round1(pct(ownProp[-9] || 0, propTotal)),
    entities,
    individual: {
      propShare: round1(pct(ownProp[OWNENT_INDIVIDUAL] || 0, propTotal)),
      unitShare: round1(pct(ownUnit[OWNENT_INDIVIDUAL] || 0, unitTotal)),
      propShareReported: round1(pct(ownProp[OWNENT_INDIVIDUAL] || 0, ownReportedDenom)),
    },
    llc: {
      propShare: round1(pct(ownProp[OWNENT_LLC] || 0, propTotal)),
      unitShare: round1(pct(ownUnit[OWNENT_LLC] || 0, unitTotal)),
      propShareReported: round1(pct(ownProp[OWNENT_LLC] || 0, ownReportedDenom)),
    },
    sizes,
    financing: {
      debtPropShare: round1(pct(debtPropYes, debtPropDenom)),
      debtUnitShare: round1(pct(debtUnitYes, debtUnitDenom)),
    },
    value: {
      medianMarketValue: round0(weightedMedian(mktPairs)),
      medianPurchasePrice: round0(weightedMedian(purPairs)),
    },
  }
}

function validate(wave) {
  const v = VALIDATION[wave.year]
  if (!v) return
  const check = (label, computed, expected) => {
    const drift = Math.abs(computed - expected) / expected
    const ok = drift <= VAL_TOLERANCE
    console.log(`  validate ${wave.year} ${label}: computed ${computed.toLocaleString()} vs published ~${expected.toLocaleString()} (${(drift * 100).toFixed(1)}% drift) ${ok ? 'OK' : 'FAIL'}`)
    if (!ok) throw new Error(`${wave.year} ${label} drifted ${(drift * 100).toFixed(1)}% from published control total — aborting (weighting likely wrong)`)
  }
  if (v.properties) check('properties', wave.propertyTotal, v.properties)
  if (v.units) check('units', wave.unitTotal, v.units)
}

// ---- main ----------------------------------------------------------------

async function main() {
  console.log('Building American Rental Ownership Report (RHFS)…')
  const byYear = {}
  for (const year of WAVES) {
    const parsed = await loadWave(year)
    const wave = computeWave(year, parsed)
    validate(wave)
    byYear[year] = wave
  }

  const cur = byYear[CUR]
  const prev = byYear[PREV_TREND]

  const trend = WAVES.map((y) => ({
    year: y,
    individualPropShare: byYear[y].individual.propShare,
    llcPropShare: byYear[y].llc.propShare,
    individualUnitShare: byYear[y].individual.unitShare,
    llcUnitShare: byYear[y].llc.unitShare,
  }))

  const meta = {
    curYear: CUR,
    prevYear: PREV_TREND,
    waves: WAVES,
    dataset: `U.S. Census Bureau Rental Housing Finance Survey (RHFS), ${WAVES.join(', ')}`,
    source: 'U.S. Census Bureau, Rental Housing Finance Survey (RHFS) Public Use Files',
    universe: 'All rental properties in scope (national). Property-weighted by WEIGHT unless labeled "units"; unit estimates weight by WEIGHT × NUMUNITS_R.',
    metric: 'Ownership entity, financing, size, and value of U.S. rental properties',
    note: `Ownership shares include the "Not reported" ownership category in the denominator (${cur.nonreportedOwnershipShare}% of properties in ${CUR}), matching Census property totals; a reported-only base is provided in each entity record.`,
    generatedAt: BUILD_DATE,
  }

  await mkdir(OUT_DATA, { recursive: true })
  await mkdir(OUT_PUBLIC, { recursive: true })

  await writeFile(
    path.join(OUT_DATA, 'national.json'),
    JSON.stringify({ meta, current: cur, previous: prev, byYear, trend }, null, 2)
  )

  // CSV 1: ownership entity share by year (property + unit weighted)
  {
    const cols = ['year', 'entity', 'property_share_pct', 'unit_share_pct', 'property_share_reported_pct']
    const lines = [cols.join(',')]
    for (const y of WAVES) {
      for (const e of byYear[y].entities) {
        lines.push([y, `"${e.label}"`, e.propShare ?? '', e.unitShare ?? '', e.propShareReported ?? ''].join(','))
      }
    }
    await writeFile(path.join(OUT_PUBLIC, `rental-ownership-${CUR}.csv`), lines.join('\n') + '\n')
  }

  // CSV 2: 2024 property-size distribution (property vs unit share)
  {
    const cols = ['size_band', 'property_share_pct', 'unit_share_pct']
    const lines = [cols.join(',')]
    for (const s of cur.sizes) lines.push([`"${s.label}"`, s.propShare ?? '', s.unitShare ?? ''].join(','))
    await writeFile(path.join(OUT_PUBLIC, `rental-ownership-size-${CUR}.csv`), lines.join('\n') + '\n')
  }

  console.log('\nHeadline check (property-weighted, with Not-reported in denominator):')
  console.log(`  Individual investor share of properties: ${prev.individual.propShare}% (${PREV_TREND}) → ${cur.individual.propShare}% (${CUR})`)
  console.log(`  LLP/LP/LLC share of properties:          ${prev.llc.propShare}% (${PREV_TREND}) → ${cur.llc.propShare}% (${CUR})`)
  console.log(`  ${CUR} UNIT-weighted: Individual ${cur.individual.unitShare}% vs LLC/LP ${cur.llc.unitShare}%`)
  console.log(`  ${CUR} debt: ${cur.financing.debtPropShare}% of properties carry debt`)
  console.log(`  ${CUR} median market value $${cur.value.medianMarketValue?.toLocaleString()}, median purchase $${cur.value.medianPurchasePrice?.toLocaleString()}`)
  console.log(`\nWrote ${OUT_DATA}/national.json + 2 CSVs to ${OUT_PUBLIC}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
