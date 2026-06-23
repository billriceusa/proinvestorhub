#!/usr/bin/env node

/**
 * Generate shareable "Where Rents Are Rising Fastest" infographics
 * (1200x1200 PNG + source HTML) for LinkedIn / social / embed. Companion to
 * build-yield-infographic.mjs and build-report-infographic.mjs.
 *
 * Produces two national cards by default — a "rising" hero and the contrarian
 * "falling" angle — plus an optional per-state fleet (ALL=1). Every number is
 * read live from the published FMR rent-growth dataset, so cards auto-refresh
 * with the data.
 *
 * OUTPUT:
 *   public/reports/infographics/rent-growth-<slug>.html
 *   public/reports/infographics/rent-growth-<slug>.png   (if a Chrome binary is found)
 *
 * USAGE:
 *   node scripts/build-rent-growth-infographic.mjs                 # 2 national cards
 *   ALL=1 node scripts/build-rent-growth-infographic.mjs           # + per-state fleet
 *   ONLY=rising,falling node scripts/build-rent-growth-infographic.mjs
 *   RENDER=0 node scripts/build-rent-growth-infographic.mjs        # HTML only, skip PNG
 *   CHROME="/path/to/Chrome" node scripts/build-rent-growth-infographic.mjs
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const DATA = path.join(ROOT, 'src', 'data', 'fmr-rent')
const OUT = path.join(ROOT, 'public', 'reports', 'infographics')
const RENDER = process.env.RENDER !== '0'
const ALL = process.env.ALL === '1'
const ONLY = process.env.ONLY ? process.env.ONLY.split(',').map((s) => s.trim().toLowerCase()) : null

const readJson = async (f) => JSON.parse(await readFile(path.join(DATA, f), 'utf8'))

// ---- formatters ----
const rent = (v) => (v == null ? '—' : `$${Math.round(v).toLocaleString('en-US')}`)
const yoy = (v, d = 1) => {
  if (v == null) return '—'
  const p = v * 100
  const sign = p > 0 ? '+' : p < 0 ? '−' : ''
  return `${sign}${Math.abs(p).toFixed(d)}%`
}
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
  .bar .name{width:300px;font-size:16px;color:var(--text);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bar .track{flex:1}
  .bar .fill{height:22px;background:var(--primary);border-radius:6px;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:#fff;font-size:14px;font-weight:700;min-width:54px}
  .bar .fill.alt{background:var(--accent)}
  .bar .fill.down{background:#9B3D2E}
  .foot{margin-top:auto;padding-top:22px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
  .foot .src{font-size:15px;color:var(--light);max-width:780px}
  .foot .brand{font-size:18px;font-weight:700;color:var(--primary);letter-spacing:.3px}
  .foot .brand .dot{color:var(--accent)}
`

const page = (body) =>
  `<!doctype html><html><head><meta charset="utf-8"/><style>${CSS}</style></head><body>${body}</body></html>`

const footer = (meta) =>
  `<div class="foot"><div class="src">Source: U.S. Dept. of Housing &amp; Urban Development, Fair Market Rents FY${meta.curYear} vs FY${meta.prevYear} (public domain). Two-bedroom, 40th percentile.</div><div class="brand">proinvestorhub<span class="dot">.</span>com</div></div>`

// Horizontal bars scaled to the max |YoY| in the set.
function growthBars(rows, scaleMax, down = false) {
  return rows
    .map((r, i) => {
      const mag = Math.abs((r.yoyPct ?? 0) * 100)
      const w = Math.max(8, Math.round((mag / scaleMax) * 100))
      const cls = down ? 'down' : i === 0 ? '' : 'alt'
      return `<div class="bar"><div class="name">${r.name}</div><div class="track"><div class="fill ${cls}" style="width:${w}%">${yoy(r.yoyPct)}</div></div></div>`
    })
    .join('')
}

// ---- national "rising" template ----
function risingHtml(nat, states, metros) {
  const m = nat.meta
  const topMetros = metros.slice(0, 6)
  const topStates = states.slice(0, 4)
  const scaleMax = Math.max(...topMetros.map((x) => Math.abs((x.yoyPct ?? 0) * 100)), 1)
  const tiles = topStates
    .map(
      (s, i) =>
        `<div class="tile"><div class="n">${yoy(s.yoyPct)}</div><div class="l">${ordinal(i + 1)} · ${s.name}</div><div class="d">${rent(s.fmr2br)} median 2BR</div></div>`
    )
    .join('')

  return page(`
    <div class="eyebrow">ProInvestorHub · FY${m.curYear} Data Report</div>
    <h1 class="serif">Where rents are<br/>rising fastest</h1>
    <div class="sub">2-bedroom rent growth by metro — HUD Fair Market Rents</div>
    <div class="rule"></div>
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-num serif">${yoy(nat.yoyPct)}</div>
          <div class="hero-label">U.S. median 2-bedroom rent growth, FY${m.prevYear} &rarr; FY${m.curYear}</div>
        </div>
        <div class="hero-from">
          <div class="big">${metros[0] ? `${metros[0].name.split(',')[0]} ${yoy(metros[0].yoyPct)}` : '—'}</div>
          <div class="cap">fastest-rising metro</div>
        </div>
      </div>
      <div class="pillrow">
        <div class="pill"><div class="n">${rent(nat.fmr2br)}</div><div class="t">median 2BR rent</div></div>
        <div class="pill"><div class="n">${m.metroCount}</div><div class="t">metros ranked</div></div>
        <div class="pill win"><div class="n">${m.stateCount}</div><div class="t">states + DC</div></div>
      </div>
    </div>
    <div class="tiles">${tiles}</div>
    <div class="lower">
      <h2>Fastest-rising metro rents</h2>
      <div class="cap">Two-bedroom FMR change, FY${m.prevYear} &rarr; FY${m.curYear}, top ${topMetros.length}</div>
      <div class="bars">${growthBars(topMetros, scaleMax)}</div>
    </div>
    ${footer(m)}
  `)
}

// ---- national "falling" template ----
function fallingHtml(nat, metros) {
  const m = nat.meta
  const falling = [...metros].filter((x) => (x.yoyPct ?? 0) < 0).sort((a, b) => a.yoyPct - b.yoyPct)
  const topFall = falling.slice(0, 6)
  const scaleMax = Math.max(...topFall.map((x) => Math.abs((x.yoyPct ?? 0) * 100)), 1)
  const tiles = topFall
    .slice(0, 4)
    .map(
      (s) =>
        `<div class="tile"><div class="n">${yoy(s.yoyPct)}</div><div class="l">${s.name.split(',')[0]}</div><div class="d">${rent(s.fmr2br)} median 2BR</div></div>`
    )
    .join('')

  return page(`
    <div class="eyebrow">ProInvestorHub · FY${m.curYear} Data Report</div>
    <h1 class="serif">And where rents<br/>are falling</h1>
    <div class="sub">2-bedroom rents declined in ${falling.length} of ${m.metroCount} metros</div>
    <div class="rule"></div>
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-num serif">${falling.length}</div>
          <div class="hero-label">metro areas where 2-bedroom rents fell year-over-year (of ${m.metroCount})</div>
        </div>
        <div class="hero-from">
          <div class="big">${topFall[0] ? `${topFall[0].name.split(',')[0]} ${yoy(topFall[0].yoyPct)}` : '—'}</div>
          <div class="cap">steepest drop</div>
        </div>
      </div>
      <div class="pillrow">
        <div class="pill"><div class="n">${rent(nat.fmr2br)}</div><div class="t">U.S. median 2BR</div></div>
        <div class="pill"><div class="n">${yoy(nat.yoyPct)}</div><div class="t">national YoY</div></div>
        <div class="pill win"><div class="n">${m.metroCount}</div><div class="t">metros ranked</div></div>
      </div>
    </div>
    <div class="tiles">${tiles}</div>
    <div class="lower">
      <h2>Largest 2-bedroom rent declines</h2>
      <div class="cap">Two-bedroom FMR change, FY${m.prevYear} &rarr; FY${m.curYear}, steepest ${topFall.length}</div>
      <div class="bars">${growthBars(topFall, scaleMax, true)}</div>
    </div>
    ${footer(m)}
  `)
}

// ---- chrome rendering ----
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
  const states = (await readJson('states.json')).states.filter((s) => s.yoyPct != null)
  const metros = (await readJson('metros.json')).metros.filter((m) => m.yoyPct != null)

  const byGrowth = [...metros].sort((a, b) => b.yoyPct - a.yoyPct)
  const statesByGrowth = [...states].sort((a, b) => b.yoyPct - a.yoyPct)

  const targets = [
    { slug: 'rising', html: risingHtml(nat, statesByGrowth, byGrowth) },
    { slug: 'falling', html: fallingHtml(nat, byGrowth) },
  ]

  if (ALL) {
    const metrosInState = (abbr) =>
      byGrowth.filter((mm) => (mm.state ?? '').split('-').includes(abbr))
    for (const s of statesByGrowth) {
      // reuse the rising template scoped to a state's metros when available
      const stateMetros = metrosInState(s.abbr)
      if (stateMetros.length < 3) continue
      targets.push({
        slug: s.slug,
        html: risingHtml({ ...nat, yoyPct: s.yoyPct, fmr2br: s.fmr2br }, statesByGrowth, stateMetros),
      })
    }
  }

  const chrome = RENDER ? findChrome() : null
  if (RENDER && !chrome) console.warn('No Chrome found — writing HTML only (set CHROME=... to render PNGs).')

  let n = 0
  for (const tgt of targets) {
    if (ONLY && !ONLY.includes(tgt.slug)) continue
    const htmlPath = path.join(OUT, `rent-growth-${tgt.slug}.html`)
    await writeFile(htmlPath, tgt.html)
    if (chrome) renderPng(chrome, htmlPath, path.join(OUT, `rent-growth-${tgt.slug}.png`))
    n++
  }
  console.log(`Wrote ${n} rent-growth infographic${n === 1 ? '' : 's'} to ${path.relative(ROOT, OUT)}${chrome ? ' (HTML + PNG)' : ' (HTML only)'} — HUD FMR FY${nat.meta.curYear}.`)
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
