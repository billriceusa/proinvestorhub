#!/usr/bin/env node

/**
 * Generate shareable Investor Financing Report infographics (1200x1200 PNG +
 * source HTML) — one national card plus one per state + DC. Built as a fleet of
 * social/embeddable assets to promote the report and earn links back.
 *
 * Every number is read live from the published dataset (national.json,
 * states.json, trends.json) and the report's brand tokens, so the fleet
 * auto-refreshes whenever the data does — nothing is hardcoded.
 *
 * OUTPUT (per target):
 *   public/reports/infographics/<slug>.html
 *   public/reports/infographics/<slug>.png      (if a Chrome binary is found)
 *   slug = "national" | a state slug (e.g. "mississippi")
 *
 * USAGE:
 *   node scripts/build-report-infographic.mjs                 # full fleet (US + 51)
 *   ONLY=national,mississippi node scripts/build-report-infographic.mjs
 *   RENDER=0 node scripts/build-report-infographic.mjs        # HTML only, skip PNG
 *   CHROME="/path/to/Chrome" node scripts/build-report-infographic.mjs
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const DATA = path.join(ROOT, 'src', 'data', 'hmda-investor')
const OUT = path.join(ROOT, 'public', 'reports', 'infographics')
const RENDER = process.env.RENDER !== '0'
const ONLY = process.env.ONLY ? process.env.ONLY.split(',').map((s) => s.trim().toLowerCase()) : null

const readJson = async (f) => JSON.parse(await readFile(path.join(DATA, f), 'utf8'))

// ---- formatters ----
const usdB = (v) => `$${Math.round(v / 1e9)}B`
// Accurate for small states: one-decimal billions, or millions below $1B.
const usdSmart = (v) =>
  v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : v >= 1e6 ? `$${Math.round(v / 1e6)}M` : `$${Math.round(v / 1e3)}K`
const pct = (v, d = 1) => (v == null ? '—' : `${(v * 100).toFixed(d)}%`)
const pct0 = (v) => pct(v, 0)
const count = (v) => v.toLocaleString('en-US')
const signedBps = (v) => (v == null ? '—' : v === 0 ? '0' : `${v > 0 ? '+' : ''}${v}`)
const signedPct = (v) => (v == null ? '—' : `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`)
const signedPts = (v, d = 1) =>
  v == null ? '—' : `${v > 0 ? '+' : ''}${(v * 100).toFixed(d).replace(/\.0$/, '')} pts`
const dirArrow = (v) => (v == null || v === 0 ? '' : v > 0 ? '&uarr; ' : '&darr; ')

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
  .bar .name{width:148px;font-size:16px;color:var(--text);font-weight:600}
  .bar .track{flex:1}
  .bar .fill{height:22px;background:var(--primary);border-radius:6px;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:#fff;font-size:14px;font-weight:700;min-width:38px}
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
  `<div class="foot"><div class="src">Source: CFPB / FFIEC HMDA ${year} (public domain). Single-family 1&ndash;4 unit, financed loans.</div><div class="brand">proinvestorhub<span class="dot">.</span>com</div></div>`

// ---- national template ----
function nationalHtml(nat, trends) {
  const year = nat.meta.year
  const t = trends.national
  let up = 0, flat = 0, down = 0
  for (const s of trends.states) {
    const d = s.ratePremiumBps?.abs
    if (d == null || d === 0) flat++
    else if (d > 0) up++
    else down++
  }
  const movers = trends.movers.premiumDown.slice(0, 5)
  const maxAbs = Math.max(...movers.map((m) => Math.abs(m.abs)))
  const moverBars = movers
    .map((m) => {
      const w = Math.round((Math.abs(m.abs) / maxAbs) * 100)
      return `<div class="bar"><div class="name">${m.name}</div><div class="track"><div class="fill" style="width:${w}%">&minus;${Math.abs(m.abs)}</div></div></div>`
    })
    .join('')

  return page(`
    <div class="eyebrow">ProInvestorHub · ${year} Data Report</div>
    <h1 class="serif">How investors financed<br/>real estate in ${year}</h1>
    <div class="sub">A 50-state analysis of CFPB HMDA mortgage data</div>
    <div class="rule"></div>
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-num serif">${nat.ratePremiumBps}<span class="unit"> bps</span></div>
          <div class="hero-label">Investor rate premium over owner-occupants</div>
        </div>
        <div class="hero-from">
          <div class="big">${dirArrow(t.ratePremiumBps.abs)}from ${t.ratePremiumBps.prior}</div>
          <div class="cap">in ${trends.meta.priorYear}</div>
        </div>
      </div>
      <div class="pillrow">
        <div class="pill"><div class="n">${down}</div><div class="t">states narrowed</div></div>
        <div class="pill"><div class="n">${flat}</div><div class="t">held flat</div></div>
        <div class="pill win"><div class="n">${up}</div><div class="t">widened</div></div>
      </div>
    </div>
    <div class="tiles">
      <div class="tile"><div class="n">${count(nat.investorOriginations)}</div><div class="l">Investor loans</div><div class="d">${signedPct(t.investorOriginations.pct)} vs ${trends.meta.priorYear}</div></div>
      <div class="tile"><div class="n">${usdB(nat.investorVolume)}</div><div class="l">Financed</div><div class="d">${signedPct(t.investorVolume.pct)} vs ${trends.meta.priorYear}</div></div>
      <div class="tile"><div class="n">${pct(nat.denialRate)}</div><div class="l">Denial rate</div><div class="d">${signedPts(t.denialRate.abs)}</div></div>
      <div class="tile"><div class="n">${pct0(nat.businessPurposeShare)}</div><div class="l">DSCR / biz-purpose</div><div class="d">${signedPts(t.businessPurposeShare.abs, 0)}</div></div>
    </div>
    <div class="lower">
      <h2>Biggest premium drops (${trends.meta.priorYear} &rarr; ${year})</h2>
      <div class="cap">Decline in the investor rate penalty, in basis points</div>
      <div class="bars">${moverBars}</div>
    </div>
    ${footer(year)}
  `)
}

// ---- per-state template ----
function stateHtml(s, nat, trends, premiumRank, nStates, highState) {
  const year = nat.meta.year
  const tr = trends.states.find((r) => r.slug === s.slug)
  const prem = tr.ratePremiumBps
  // comparison bars scaled to the national-high premium
  const scaleMax = Math.max(highState.ratePremiumBps, s.ratePremiumBps ?? 0, nat.ratePremiumBps) || 1
  const bar = (label, val, cls) => {
    const w = Math.max(6, Math.round(((val ?? 0) / scaleMax) * 100))
    return `<div class="bar"><div class="name">${label}</div><div class="track"><div class="fill ${cls}" style="width:${w}%">${val ?? 0}</div></div></div>`
  }

  return page(`
    <div class="eyebrow">ProInvestorHub · ${year} Data Report</div>
    <h1 class="serif">How investors finance<br/>real estate in ${s.name}</h1>
    <div class="sub">${s.name} vs the nation — CFPB HMDA ${year} mortgage data</div>
    <div class="rule"></div>
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-num serif">${s.ratePremiumBps}<span class="unit"> bps</span></div>
          <div class="hero-label">Investor rate premium in ${s.name} &middot; ${premiumRank} of ${nStates} by premium</div>
        </div>
        <div class="hero-from">
          <div class="big">${dirArrow(prem.abs)}from ${prem.prior}</div>
          <div class="cap">in ${trends.meta.priorYear}</div>
        </div>
      </div>
      <div class="pillrow">
        <div class="pill"><div class="n">${signedBps(prem.abs)}</div><div class="t">bps vs ${trends.meta.priorYear}</div></div>
        <div class="pill"><div class="n">${signedPct(tr.investorOriginations.pct)}</div><div class="t">investor loans</div></div>
        <div class="pill"><div class="n">${signedPts(tr.businessPurposeShare.abs, 0)}</div><div class="t">DSCR share</div></div>
      </div>
    </div>
    <div class="tiles">
      <div class="tile"><div class="n">${pct(s.denialRate)}</div><div class="l">Denial rate</div><div class="d">U.S. ${pct(nat.denialRate)}</div></div>
      <div class="tile"><div class="n">${pct0(s.businessPurposeShare)}</div><div class="l">DSCR / biz-purpose</div><div class="d">U.S. ${pct0(nat.businessPurposeShare)}</div></div>
      <div class="tile"><div class="n">${s.investorMedianLtv?.toFixed(0)}%</div><div class="l">Median LTV</div><div class="d">U.S. ${nat.investorMedianLtv?.toFixed(0)}%</div></div>
      <div class="tile"><div class="n">${count(s.investorOriginations)}</div><div class="l">Investor loans</div><div class="d">${usdSmart(s.investorVolume)} financed</div></div>
    </div>
    <div class="lower">
      <h2>Investor rate premium: ${s.name} vs the nation</h2>
      <div class="cap">Extra basis points investors pay over owner-occupants</div>
      <div class="bars">
        ${bar(s.name, s.ratePremiumBps, '')}
        ${bar('U.S. median', nat.ratePremiumBps, 'alt')}
        ${bar(`Highest (${highState.name})`, highState.ratePremiumBps, 'muted')}
      </div>
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
  const statesData = (await readJson('states.json')).states
  const trends = await readJson('trends.json')
  const year = nat.meta.year

  const byPremium = [...statesData]
    .filter((s) => s.ratePremiumBps != null)
    .sort((a, b) => b.ratePremiumBps - a.ratePremiumBps)
  const highState = byPremium[0]
  const ordinal = (n) => {
    const v = n % 100, s = ['th', 'st', 'nd', 'rd']
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  const targets = [{ slug: 'national', html: nationalHtml(nat, trends) }]
  for (const s of statesData) {
    const rank = byPremium.findIndex((x) => x.slug === s.slug) + 1
    targets.push({ slug: s.slug, html: stateHtml(s, nat, trends, ordinal(rank), byPremium.length, highState) })
  }

  const chrome = RENDER ? findChrome() : null
  if (RENDER && !chrome) console.warn('No Chrome found — writing HTML only (set CHROME=... to render PNGs).')

  let n = 0
  for (const tgt of targets) {
    if (ONLY && !ONLY.includes(tgt.slug)) continue
    const htmlPath = path.join(OUT, `${tgt.slug}.html`)
    await writeFile(htmlPath, tgt.html)
    if (chrome) renderPng(chrome, htmlPath, path.join(OUT, `${tgt.slug}.png`))
    n++
  }
  console.log(`Wrote ${n} infographic${n === 1 ? '' : 's'} to ${path.relative(ROOT, OUT)}${chrome ? ' (HTML + PNG)' : ' (HTML only)'} — HMDA ${year}.`)
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
