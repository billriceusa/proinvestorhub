#!/usr/bin/env node

/**
 * Generate shareable Best Cash-Flow Markets infographics (1200x1200 PNG +
 * source HTML) — one national card plus one per state + DC. A fleet of
 * social/embeddable assets to promote the gross-rental-yield report and earn
 * links back, the companion to build-report-infographic.mjs (HMDA).
 *
 * Every number is read live from the published dataset (rental-yield
 * national/states/metros JSON), so the fleet auto-refreshes with the data.
 *
 * OUTPUT (per target):
 *   public/reports/infographics/yield-<slug>.html
 *   public/reports/infographics/yield-<slug>.png   (if a Chrome binary is found)
 *
 * USAGE:
 *   node scripts/build-yield-infographic.mjs                       # full fleet (US + 51)
 *   ONLY=national,mississippi node scripts/build-yield-infographic.mjs
 *   RENDER=0 node scripts/build-yield-infographic.mjs              # HTML only, skip PNG
 *   CHROME="/path/to/Chrome" node scripts/build-yield-infographic.mjs
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const DATA = path.join(ROOT, 'src', 'data', 'rental-yield')
const OUT = path.join(ROOT, 'public', 'reports', 'infographics')
const RENDER = process.env.RENDER !== '0'
const ONLY = process.env.ONLY ? process.env.ONLY.split(',').map((s) => s.trim().toLowerCase()) : null

const readJson = async (f) => JSON.parse(await readFile(path.join(DATA, f), 'utf8'))

// ---- formatters ----
const pct = (v, d = 1) => (v == null ? '—' : `${(v * 100).toFixed(d)}%`)
const rent = (v) => (v == null ? '—' : `$${Math.round(v).toLocaleString('en-US')}`)
const val = (v) =>
  v == null ? '—' : v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : `$${Math.round(v / 1e3)}K`
const ordinal = (n) => {
  const v = n % 100, s = ['th', 'st', 'nd', 'rd']
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// ---- shared CSS (brand tokens mirror src/app/globals.css) ----
const CSS = `
  :root{
    --primary:#1B4D3E;--primary-light:#2A7A5F;--primary-dark:#0F3329;
    --accent:#D4A843;--accent-light:#E5C06E;--surface:#F8F7F4;--surface-alt:#EDE9E0;
    --text:#1A1A1A;--muted:#6B6B6B;--light:#9A9A9A;--border:#E2DED5;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:1200px}
  body{background:var(--surface);font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;color:var(--text);padding:64px 64px 48px;display:flex;flex-direction:column}
  .serif{font-family:Georgia,"Times New Roman",serif}
  .eyebrow{font-size:18px;letter-spacing:3px;font-weight:700;color:var(--accent);text-transform:uppercase}
  h1{font-size:52px;line-height:1.08;color:var(--primary-dark);margin-top:14px;font-weight:700}
  .sub{font-size:21px;color:var(--muted);margin-top:12px}
  .rule{height:3px;width:84px;background:var(--accent);margin-top:20px;border-radius:2px}
  .hero{background:var(--primary);color:#fff;border-radius:22px;margin-top:28px;padding:34px 38px;display:flex;flex-direction:column;gap:20px}
  .hero-top{display:flex;align-items:flex-end;justify-content:space-between}
  .hero-num{font-size:96px;line-height:.9;font-weight:700}
  .hero-num .unit{font-size:40px;opacity:.85}
  .hero-label{font-size:21px;color:var(--accent-light);margin-top:12px;max-width:560px}
  .hero-from{text-align:right}
  .hero-from .big{font-size:30px;font-weight:700;color:var(--accent-light)}
  .hero-from .cap{font-size:17px;color:rgba(255,255,255,.72)}
  .pillrow{display:flex;gap:12px}
  .pill{flex:1;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:14px 8px;text-align:center}
  .pill .n{font-size:30px;font-weight:700}
  .pill.win .n{color:var(--accent-light)}
  .pill .t{font-size:15px;color:rgba(255,255,255,.78);margin-top:3px;text-transform:uppercase;letter-spacing:1px}
  .tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px}
  .tile{background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px 18px}
  .tile .n{font-size:36px;font-weight:700;color:var(--primary);line-height:1}
  .tile .l{font-size:16px;color:var(--text);margin-top:9px;font-weight:600}
  .tile .d{font-size:14px;color:var(--muted);margin-top:6px}
  .lower{margin-top:24px}
  .lower h2{font-size:19px;color:var(--primary-dark);font-weight:700}
  .lower .cap{font-size:15px;color:var(--muted);margin-top:2px}
  .bars{margin-top:14px;display:flex;flex-direction:column;gap:9px}
  .bar{display:flex;align-items:center;gap:12px}
  .bar .name{width:240px;font-size:16px;color:var(--text);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bar .track{flex:1}
  .bar .fill{height:22px;background:var(--primary);border-radius:6px;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:#fff;font-size:14px;font-weight:700;min-width:48px}
  .bar .fill.alt{background:var(--accent)}
  .bar .fill.muted{background:var(--surface-alt);color:var(--muted)}
  .foot{margin-top:auto;padding-top:22px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
  .foot .src{font-size:15px;color:var(--light)}
  .foot .brand{font-size:18px;font-weight:700;color:var(--primary);letter-spacing:.3px}
  .foot .brand .dot{color:var(--accent)}
`

const page = (body) =>
  `<!doctype html><html><head><meta charset="utf-8"/><style>${CSS}</style></head><body>${body}</body></html>`

const footer = (year) =>
  `<div class="foot"><div class="src">Source: U.S. Census Bureau, ACS ${year} 1-year (public domain). Gross yield = annual rent &divide; home value.</div><div class="brand">proinvestorhub<span class="dot">.</span>com</div></div>`

// Horizontal bar scaled to the max yield in the set.
function yieldBars(rows, scaleMax) {
  return rows
    .map((r, i) => {
      const y = (r.grossYield ?? 0) * 100
      const w = Math.max(8, Math.round((y / scaleMax) * 100))
      const cls = i === 0 ? '' : 'alt'
      return `<div class="bar"><div class="name">${r.name}</div><div class="track"><div class="fill ${cls}" style="width:${w}%">${pct(r.grossYield)}</div></div></div>`
    })
    .join('')
}

// ---- national template ----
function nationalHtml(nat, states, metros) {
  const year = nat.meta.year
  const topStates = states.slice(0, 4)
  const topMetros = metros.slice(0, 5)
  const scaleMax = Math.max(...topMetros.map((m) => (m.grossYield ?? 0) * 100), 1)
  const tiles = topStates
    .map(
      (s, i) =>
        `<div class="tile"><div class="n">${pct(s.grossYield)}</div><div class="l">${ordinal(i + 1)} · ${s.name}</div><div class="d">${rent(s.medianGrossRent)} rent · ${val(s.medianHomeValue)}</div></div>`
    )
    .join('')

  return page(`
    <div class="eyebrow">ProInvestorHub · ${year} Data Report</div>
    <h1 class="serif">Where rentals<br/>cash-flow best in ${year}</h1>
    <div class="sub">Gross rental yield by state &amp; metro — Census ACS data</div>
    <div class="rule"></div>
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-num serif">${pct(nat.grossYield)}</div>
          <div class="hero-label">U.S. gross rental yield — annual rent against home value</div>
        </div>
        <div class="hero-from">
          <div class="big">${states[0] ? `${states[0].abbr} ${pct(states[0].grossYield)}` : '—'}</div>
          <div class="cap">top state</div>
        </div>
      </div>
      <div class="pillrow">
        <div class="pill"><div class="n">${rent(nat.medianGrossRent)}</div><div class="t">median rent</div></div>
        <div class="pill"><div class="n">${val(nat.medianHomeValue)}</div><div class="t">median value</div></div>
        <div class="pill win"><div class="n">${states.length}</div><div class="t">states ranked</div></div>
      </div>
    </div>
    <div class="tiles">${tiles}</div>
    <div class="lower">
      <h2>Highest-yield metros</h2>
      <div class="cap">Annual rent &divide; home value, top ${topMetros.length} metros</div>
      <div class="bars">${yieldBars(topMetros, scaleMax)}</div>
    </div>
    ${footer(year)}
  `)
}

// ---- per-state template ----
function stateHtml(s, nat, metros, rank, nStates, highState) {
  const year = nat.meta.year
  const topMetros = metros.slice(0, 5)
  const aboveBelow =
    s.grossYield != null && nat.grossYield != null
      ? s.grossYield >= nat.grossYield
        ? 'above'
        : 'below'
      : '—'

  // lower section: top metros if available, else state vs US vs top-yield state
  let lowerHead, lowerCap, bars
  if (topMetros.length >= 2) {
    const scaleMax = Math.max(...topMetros.map((m) => (m.grossYield ?? 0) * 100), 1)
    lowerHead = `Highest-yield metros in ${s.name}`
    lowerCap = `Annual rent &divide; home value, top ${topMetros.length}`
    bars = yieldBars(topMetros, scaleMax)
  } else {
    const rows = [
      { name: s.name, grossYield: s.grossYield },
      { name: 'U.S. median', grossYield: nat.grossYield },
      { name: `Top state (${highState.name})`, grossYield: highState.grossYield },
    ]
    const scaleMax = Math.max(...rows.map((r) => (r.grossYield ?? 0) * 100), 1)
    lowerHead = `${s.name} vs the nation`
    lowerCap = 'Gross rental yield comparison'
    bars = rows
      .map((r, i) => {
        const y = (r.grossYield ?? 0) * 100
        const w = Math.max(8, Math.round((y / scaleMax) * 100))
        const cls = i === 0 ? '' : i === 1 ? 'alt' : 'muted'
        return `<div class="bar"><div class="name">${r.name}</div><div class="track"><div class="fill ${cls}" style="width:${w}%">${pct(r.grossYield)}</div></div></div>`
      })
      .join('')
  }

  return page(`
    <div class="eyebrow">ProInvestorHub · ${year} Data Report</div>
    <h1 class="serif">Rental yield<br/>in ${s.name}</h1>
    <div class="sub">${s.name} vs the nation — Census ACS ${year}</div>
    <div class="rule"></div>
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-num serif">${pct(s.grossYield)}</div>
          <div class="hero-label">Gross rental yield in ${s.name} &middot; ${rank} of ${nStates} states</div>
        </div>
        <div class="hero-from">
          <div class="big">${pct(nat.grossYield)}</div>
          <div class="cap">U.S. median</div>
        </div>
      </div>
      <div class="pillrow">
        <div class="pill"><div class="n">${rent(s.medianGrossRent)}</div><div class="t">median rent</div></div>
        <div class="pill"><div class="n">${val(s.medianHomeValue)}</div><div class="t">median value</div></div>
        <div class="pill win"><div class="n">${aboveBelow}</div><div class="t">vs U.S.</div></div>
      </div>
    </div>
    <div class="tiles">
      <div class="tile"><div class="n">${pct(s.grossYield)}</div><div class="l">Gross yield</div><div class="d">U.S. ${pct(nat.grossYield)}</div></div>
      <div class="tile"><div class="n">${rent(s.medianGrossRent)}</div><div class="l">Median rent</div><div class="d">monthly, incl. utilities</div></div>
      <div class="tile"><div class="n">${val(s.medianHomeValue)}</div><div class="l">Median value</div><div class="d">owner-occupied</div></div>
      <div class="tile"><div class="n">${metros.length}</div><div class="l">Metros covered</div><div class="d">pop. 65k+</div></div>
    </div>
    <div class="lower">
      <h2>${lowerHead}</h2>
      <div class="cap">${lowerCap}</div>
      <div class="bars">${bars}</div>
    </div>
    ${footer(year)}
  `)
}

// ---- chrome rendering (one-shot headless screenshot) ----
function findChrome() {
  if (process.env.CHROME && existsSync(process.env.CHROME)) return process.env.CHROME
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  return candidates.find((c) => existsSync(c)) || null
}

function renderPng(chrome, htmlPath, pngPath) {
  execFileSync(
    chrome,
    [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=2',
      '--window-size=1200,1200',
      '--default-background-color=FFFFFFFF',
      `--screenshot=${pngPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: 'ignore' }
  )
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const nat = await readJson('national.json')
  const states = (await readJson('states.json')).states.filter((s) => s.grossYield != null)
  const metros = (await readJson('metros.json')).metros.filter((m) => m.grossYield != null)
  const year = nat.meta.year

  const byYield = [...states].sort((a, b) => b.grossYield - a.grossYield)
  const highState = byYield[0]
  const metrosInState = (abbr) =>
    metros
      .filter((m) => (m.state ?? '').split('-').includes(abbr))
      .sort((a, b) => b.grossYield - a.grossYield)

  const targets = [
    {
      slug: 'national',
      html: nationalHtml(
        nat,
        byYield,
        [...metros].sort((a, b) => b.grossYield - a.grossYield)
      ),
    },
  ]
  for (const s of byYield) {
    const rank = byYield.findIndex((x) => x.slug === s.slug) + 1
    targets.push({
      slug: s.slug,
      html: stateHtml(s, nat, metrosInState(s.abbr), ordinal(rank), byYield.length, highState),
    })
  }

  const chrome = RENDER ? findChrome() : null
  if (RENDER && !chrome) console.warn('No Chrome found — writing HTML only (set CHROME=... to render PNGs).')

  let n = 0
  for (const tgt of targets) {
    if (ONLY && !ONLY.includes(tgt.slug)) continue
    const htmlPath = path.join(OUT, `yield-${tgt.slug}.html`)
    await writeFile(htmlPath, tgt.html)
    if (chrome) renderPng(chrome, htmlPath, path.join(OUT, `yield-${tgt.slug}.png`))
    n++
  }
  console.log(`Wrote ${n} yield infographic${n === 1 ? '' : 's'} to ${path.relative(ROOT, OUT)}${chrome ? ' (HTML + PNG)' : ' (HTML only)'} — ACS ${year}.`)
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
