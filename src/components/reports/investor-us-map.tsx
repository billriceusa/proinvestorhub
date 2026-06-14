'use client'

import { useMemo, useState } from 'react'
import type { InvestorFinancingRow, MetricKey } from '@/data/hmda-investor'
import { fmtBps, fmtPct } from '@/data/hmda-investor'

/**
 * Dependency-free US "tile-grid cartogram": every state is a square placed in a
 * roughly geographic grid, shaded by the selected metric. Light → brand green.
 * Each tile links to its state report page. Built for embeddability (pure SVG).
 */

// [abbr, row, col] on an 8-row x 11-col grid (50 states + DC).
const GRID: Array<[string, number, number]> = [
  ['AK', 0, 0], ['ME', 0, 10],
  ['VT', 1, 9], ['NH', 1, 10],
  ['WA', 2, 0], ['ID', 2, 1], ['MT', 2, 2], ['ND', 2, 3], ['MN', 2, 4], ['IL', 2, 5], ['WI', 2, 6], ['MI', 2, 7], ['NY', 2, 9], ['MA', 2, 10],
  ['OR', 3, 0], ['NV', 3, 1], ['WY', 3, 2], ['SD', 3, 3], ['IA', 3, 4], ['IN', 3, 5], ['OH', 3, 6], ['PA', 3, 7], ['NJ', 3, 8], ['CT', 3, 9], ['RI', 3, 10],
  ['CA', 4, 0], ['UT', 4, 1], ['CO', 4, 2], ['NE', 4, 3], ['MO', 4, 4], ['KY', 4, 5], ['WV', 4, 6], ['VA', 4, 7], ['MD', 4, 8], ['DE', 4, 9],
  ['AZ', 5, 1], ['NM', 5, 2], ['KS', 5, 3], ['AR', 5, 4], ['TN', 5, 5], ['NC', 5, 6], ['SC', 5, 7], ['DC', 5, 8],
  ['OK', 6, 3], ['LA', 6, 4], ['MS', 6, 5], ['AL', 6, 6], ['GA', 6, 7],
  ['HI', 7, 0], ['TX', 7, 3], ['FL', 7, 7],
]

type MapMetric = { key: MetricKey; label: string; fmt: (v: number | null) => string }

const METRICS: MapMetric[] = [
  { key: 'ratePremiumBps', label: 'Rate premium', fmt: fmtBps },
  { key: 'denialRate', label: 'Denial rate', fmt: (v) => fmtPct(v) },
  { key: 'businessPurposeShare', label: 'DSCR / business-purpose share', fmt: (v) => fmtPct(v, 0) },
]

// Interpolate light surface (#EDE9E0) → brand green (#1B4D3E).
function shade(t: number): string {
  const a = [237, 233, 224]
  const b = [27, 77, 62]
  const c = a.map((x, i) => Math.round(x + (b[i] - x) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

const CELL = 46
const PAD = 5
const COLS = 11
const ROWS = 8

export function InvestorUsMap({ states }: { states: InvestorFinancingRow[] }) {
  const [metricKey, setMetricKey] = useState<MetricKey>('ratePremiumBps')
  const [hover, setHover] = useState<string | null>(null)

  const metric = METRICS.find((m) => m.key === metricKey)!
  const byAbbr = useMemo(() => {
    const m = new Map<string, InvestorFinancingRow>()
    for (const s of states) m.set(s.abbr, s)
    return m
  }, [states])

  const { min, max } = useMemo(() => {
    const vals = states.map((s) => s[metricKey]).filter((v): v is number => v != null)
    return { min: Math.min(...vals), max: Math.max(...vals) }
  }, [states, metricKey])

  const width = COLS * CELL
  const height = ROWS * CELL
  const hovered = hover ? byAbbr.get(hover) : null

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Map metric">
        {METRICS.map((m) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={m.key === metricKey}
            onClick={() => setMetricKey(m.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              m.key === metricKey
                ? 'border-primary bg-primary text-white'
                : 'border-border bg-white text-text hover:border-primary/40'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full max-w-2xl"
          role="img"
          aria-label={`US map shaded by investor ${metric.label.toLowerCase()} by state`}
        >
          {GRID.map(([abbr, r, c]) => {
            const s = byAbbr.get(abbr)
            const v = s ? (s[metricKey] as number | null) : null
            const t = v == null || max === min ? 0 : (v - min) / (max - min)
            const fill = v == null ? '#F8F7F4' : shade(t)
            const dark = t > 0.55
            return (
              <a key={abbr} href={s ? `/reports/investor-financing/${s.slug}` : undefined}>
                <g
                  onMouseEnter={() => setHover(abbr)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: s ? 'pointer' : 'default' }}
                >
                  <rect
                    x={c * CELL + PAD}
                    y={r * CELL + PAD}
                    width={CELL - PAD * 2}
                    height={CELL - PAD * 2}
                    rx={5}
                    fill={fill}
                    stroke={hover === abbr ? '#D4A843' : '#E2DED5'}
                    strokeWidth={hover === abbr ? 2.5 : 1}
                  />
                  <text
                    x={c * CELL + CELL / 2}
                    y={r * CELL + CELL / 2 + 3.5}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill={dark ? '#ffffff' : '#1A1A1A'}
                  >
                    {abbr}
                  </text>
                </g>
              </a>
            )
          })}
        </svg>
      </div>

      {/* Legend + hover readout */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>{metric.fmt(min)}</span>
          <span
            className="h-3 w-32 rounded-full"
            style={{ background: `linear-gradient(to right, ${shade(0)}, ${shade(1)})` }}
          />
          <span>{metric.fmt(max)}</span>
        </div>
        <p className="text-sm text-text-muted" aria-live="polite">
          {hovered ? (
            <>
              <span className="font-semibold text-text">{hovered.name}</span>:{' '}
              {metric.fmt(hovered[metricKey] as number | null)}
            </>
          ) : (
            'Hover a state for its value; click to open its report.'
          )}
        </p>
      </div>
    </div>
  )
}
