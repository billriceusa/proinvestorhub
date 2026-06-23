#!/usr/bin/env node

/**
 * Build the "Where Rents Are Rising Fastest" dataset from HUD Fair Market Rents
 * (public-domain) — a companion to the Best Cash-Flow Markets and Investor
 * Financing reports.
 *
 * HUD publishes the 40th-percentile gross rent (the Fair Market Rent, FMR) for
 * every metropolitan FMR area, once per federal fiscal year. Comparing the
 * current fiscal year to the prior one gives a clean, official year-over-year
 * rent-growth signal by metro — and, aggregated, by state and nationally.
 *
 *   metric  = Two-Bedroom FMR (the standard headline unit)
 *   yoyPct  = (FMR_cur - FMR_prev) / FMR_prev
 *
 * HUD has no single national FMR, so the national + state figures are the MEDIAN
 * across the underlying metro FMR areas (disclosed in the report methodology).
 *
 * OUTPUT:
 *   src/data/fmr-rent/national.json
 *   src/data/fmr-rent/states.json    (sorted by 2BR YoY, desc)
 *   src/data/fmr-rent/metros.json    (sorted by 2BR YoY, desc)
 *   public/data/rent-growth-<curYear>.csv
 *
 * REQUIRES a free HUD API token (https://www.huduser.gov/portal/dataset/fmr-api.html):
 *   HUD_API_TOKEN=xxxx node scripts/build-fmr.mjs
 *   CUR_YEAR=2026 PREV_YEAR=2025 HUD_API_TOKEN=xxxx node scripts/build-fmr.mjs
 *   BUILD_DATE=2026-06-23 ...    # stamp meta.generatedAt
 *
 * Run from a machine with network access. Reads HUD_API_TOKEN from the env or
 * .env.local (gitignored).
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const CUR_YEAR = process.env.CUR_YEAR ? Number(process.env.CUR_YEAR) : 2026
const PREV_YEAR = process.env.PREV_YEAR ? Number(process.env.PREV_YEAR) : CUR_YEAR - 1
const BUILD_DATE = process.env.BUILD_DATE || null

const ROOT = path.resolve(process.cwd())
const OUT_DATA = path.join(ROOT, 'src', 'data', 'fmr-rent')
const OUT_PUBLIC = path.join(ROOT, 'public', 'data')
const API = 'https://www.huduser.gov/hudapi/public/fmr'

// Load token from env or .env.local (gitignored) without a dep.
async function loadToken() {
  if (process.env.HUD_API_TOKEN) return process.env.HUD_API_TOKEN
  try {
    const env = await readFile(path.join(ROOT, '.env.local'), 'utf8')
    const m = env.match(/^HUD_API_TOKEN=(.+)$/m)
    if (m) return m[1].trim()
  } catch {}
  return null
}

// FMR areas exist only for the 50 states + DC; drop territories.
const TERRITORIES = new Set(['PR', 'GU', 'VI', 'AS', 'MP'])

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const num = (v) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : null
}

const yoy = (cur, prev) => {
  if (cur == null || prev == null || prev === 0) return null
  return (cur - prev) / prev
}

const median = (arr) => {
  const xs = arr.filter((n) => n != null).sort((a, b) => a - b)
  if (xs.length === 0) return null
  const mid = Math.floor(xs.length / 2)
  return xs.length % 2 ? xs[mid] : (xs[mid - 1] + xs[mid]) / 2
}

// Clean "Akron, OH MSA" / "Cincinnati, OH-KY-IN  HUD Metro FMR Area" -> name + state seg.
function parseMetro(metroName) {
  const name = metroName
    .replace(/\s+HUD Metro FMR Area$/i, '')
    .replace(/\s+MSA$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
  const stateSeg = (name.match(/,\s*([A-Z]{2}(?:-[A-Z]{2})*)$/) || [])[1] || null
  return { name, state: stateSeg }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function hud(endpoint, token, attempts = 7) {
  const url = `${API}${endpoint}`
  let lastErr
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      const text = await res.text()
      const t = text.trimStart()
      if (res.ok && (t.startsWith('[') || t.startsWith('{'))) {
        return JSON.parse(text)
      }
      lastErr = `HUD ${res.status} for "${endpoint}": ${text.slice(0, 80).replace(/\s+/g, ' ')}`
      // 429 = rate limited: back off hard (3s, 6s, 9s, ...).
      if (res.status === 429 && i < attempts) {
        await sleep(3000 * i)
        continue
      }
    } catch (e) {
      lastErr = `HUD fetch error for "${endpoint}": ${e.message}`
    }
    if (i < attempts) await sleep(800 * i)
  }
  throw new Error(`${lastErr} (after ${attempts} attempts)`)
}

async function statedata(stateCode, year, token) {
  const json = await hud(`/statedata/${stateCode}?year=${year}`, token)
  return (json?.data?.metroareas ?? [])
}

async function main() {
  const token = await loadToken()
  if (!token) {
    console.error(
      'FAILED: set HUD_API_TOKEN (free: https://www.huduser.gov/portal/dataset/fmr-api.html)'
    )
    process.exit(1)
  }
  await mkdir(OUT_DATA, { recursive: true })
  await mkdir(OUT_PUBLIC, { recursive: true })
  console.log(`Where Rents Are Rising Fastest — HUD FMR FY${CUR_YEAR} vs FY${PREV_YEAR}\n`)

  const stateList = (await hud('/listStates', token)).filter(
    (s) => s.category === 'State' && !TERRITORIES.has(s.state_code)
  )
  console.log(`states: ${stateList.length}`)

  // metro code -> { name, state, abbrs[], cur2br, prev2br, percentile }
  const metroMap = new Map()

  for (const st of stateList) {
    const code = st.state_code
    let cur = []
    let prev = []
    try {
      cur = await statedata(code, CUR_YEAR, token)
      await sleep(400)
      prev = await statedata(code, PREV_YEAR, token)
      await sleep(400)
    } catch (e) {
      console.warn(`  ! ${code}: ${e.message}`)
      continue
    }
    const prevByCode = new Map(prev.map((m) => [m.code, m]))
    for (const m of cur) {
      if (metroMap.has(m.code)) continue // multi-state metro already captured
      const { name, state } = parseMetro(m.metro_name)
      const p = prevByCode.get(m.code)
      metroMap.set(m.code, {
        name,
        slug: slugify(name),
        code: m.code,
        state,
        // Keep true metro areas: MSAs (suffix "MSA") plus New England / DC
        // metro areas that HUD labels "HUD Metro FMR Area". Exclude only the
        // single-county nonmetro Section-8 areas ("Gates County, NC ...").
        isMetro: /\bMSA\s*$/.test(m.metro_name) || !/\bCounty\b/i.test(m.metro_name),
        cur2br: num(m['Two-Bedroom']),
        prev2br: num(p?.['Two-Bedroom']),
        cur1br: num(m['One-Bedroom']),
        cur3br: num(m['Three-Bedroom']),
        percentile: num(m['FMR Percentile']),
      })
    }
    process.stdout.write('.')
  }
  console.log('')

  const metros = [...metroMap.values()]
    .filter((m) => m.isMetro)
    .map((m) => ({
      name: m.name,
      slug: m.slug,
      code: m.code,
      state: m.state,
      fmr2br: m.cur2br,
      fmrPrev2br: m.prev2br,
      fmr1br: m.cur1br,
      fmr3br: m.cur3br,
      yoyPct: yoy(m.cur2br, m.prev2br),
    }))
    .filter((m) => m.fmr2br != null && m.yoyPct != null)
    .sort((a, b) => (b.yoyPct ?? -Infinity) - (a.yoyPct ?? -Infinity))
  console.log(`MSAs: ${metros.length}`)

  // State aggregate: median across the state's metro FMR areas.
  const byState = new Map()
  for (const m of metros) {
    // a metro's `state` segment may be multi-state ("OH-KY-IN"); credit each.
    const segs = (m.state || '').split('-').filter(Boolean)
    for (const s of segs) {
      if (!byState.has(s)) byState.set(s, [])
      byState.get(s).push(m)
    }
  }
  const STATE_NAME = Object.fromEntries(stateList.map((s) => [s.state_code, s.state_name]))
  const states = [...byState.entries()]
    .map(([abbr, ms]) => {
      const medCur = median(ms.map((m) => m.fmr2br))
      const medPrev = median(ms.map((m) => m.fmrPrev2br))
      return {
        name: STATE_NAME[abbr] || abbr,
        slug: slugify(STATE_NAME[abbr] || abbr),
        abbr,
        fmr2br: medCur,
        fmrPrev2br: medPrev,
        yoyPct: median(ms.map((m) => m.yoyPct)),
        metroCount: ms.length,
      }
    })
    .filter((s) => s.yoyPct != null)
    .sort((a, b) => (b.yoyPct ?? -Infinity) - (a.yoyPct ?? -Infinity))
  console.log(`states with data: ${states.length}`)

  // National: median across all metro FMR areas (HUD has no single national FMR).
  const national = {
    name: 'United States',
    slug: 'united-states',
    fmr2br: median(metros.map((m) => m.fmr2br)),
    fmrPrev2br: median(metros.map((m) => m.fmrPrev2br)),
    yoyPct: median(metros.map((m) => m.yoyPct)),
  }
  console.log(
    `US median 2BR FMR: $${national.fmr2br} (prev $${national.fmrPrev2br}), median YoY ${(national.yoyPct * 100).toFixed(1)}%`
  )

  const meta = {
    curYear: CUR_YEAR,
    prevYear: PREV_YEAR,
    dataset: `HUD Fair Market Rents FY${CUR_YEAR} vs FY${PREV_YEAR}`,
    source: `U.S. Department of Housing and Urban Development, Fair Market Rents (FY${CUR_YEAR} and FY${PREV_YEAR})`,
    universe:
      'Two-Bedroom Fair Market Rent (40th-percentile gross rent) for U.S. metropolitan FMR areas (MSAs and New England metro areas; single-county nonmetro areas excluded); state and national figures are the median across those areas',
    metric: `Two-Bedroom FMR year-over-year change, FY${CUR_YEAR} vs FY${PREV_YEAR}`,
    generatedAt: BUILD_DATE,
    stateCount: states.length,
    metroCount: metros.length,
  }

  await writeFile(path.join(OUT_DATA, 'national.json'), JSON.stringify({ meta, ...national }, null, 2))
  await writeFile(path.join(OUT_DATA, 'states.json'), JSON.stringify({ meta, states }, null, 2))
  await writeFile(path.join(OUT_DATA, 'metros.json'), JSON.stringify({ meta, metros }, null, 2))

  // CSV (states + metros)
  const cols = ['type', 'name', 'state', `fmr_2br_${CUR_YEAR}`, `fmr_2br_${PREV_YEAR}`, 'yoy_pct']
  const lines = [cols.join(',')]
  for (const s of [...states].sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(['state', `"${s.name}"`, s.abbr, s.fmr2br ?? '', s.fmrPrev2br ?? '', s.yoyPct != null ? (s.yoyPct * 100).toFixed(2) : ''].join(','))
  }
  for (const m of [...metros].sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(['metro', `"${m.name}"`, m.state ?? '', m.fmr2br ?? '', m.fmrPrev2br ?? '', m.yoyPct != null ? (m.yoyPct * 100).toFixed(2) : ''].join(','))
  }
  await writeFile(path.join(OUT_PUBLIC, `rent-growth-${CUR_YEAR}.csv`), lines.join('\n') + '\n')

  const top = metros.slice(0, 5)
  console.log(`\nFastest-rising metros: ${top.map((m) => `${m.name} +${(m.yoyPct * 100).toFixed(1)}%`).join(' | ')}`)
  console.log(`\nWrote national.json, states.json, metros.json, and rent-growth-${CUR_YEAR}.csv`)
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
