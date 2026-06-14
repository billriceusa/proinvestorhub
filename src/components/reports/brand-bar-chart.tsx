import { reportMeta } from '@/data/hmda-investor'

/**
 * Server-rendered, dependency-free horizontal bar chart with the ProInvestorHub
 * wordmark + data source baked into the SVG. Because the branding is part of the
 * image, any screenshot or embed of the chart carries attribution back to us —
 * the mechanic that turns a data report into backlinks.
 */

export type BarDatum = { label: string; value: number; display: string }

const PRIMARY = '#1B4D3E'
const PRIMARY_LIGHT = '#2A7A5F'
const ACCENT = '#D4A843'
const TEXT = '#1A1A1A'
const MUTED = '#6B6B6B'
const BORDER = '#E2DED5'

export function BrandBarChart({
  title,
  subtitle,
  data,
  unit = '',
  reference,
  highlightTop = 0,
  source = `Source: CFPB HMDA ${reportMeta.year} · proinvestorhub.com`,
}: {
  title: string
  subtitle?: string
  data: BarDatum[]
  unit?: string
  /** Optional reference line, e.g. the national median. */
  reference?: { value: number; label: string }
  /** Highlight the top N bars in accent gold (e.g. the leaders). */
  highlightTop?: number
  source?: string
}) {
  const W = 760
  const labelW = 150
  const valueW = 64
  const rowH = 28
  const top = subtitle ? 86 : 66
  const bottom = 44
  const chartLeft = labelW
  const chartW = W - labelW - valueW
  const H = top + data.length * rowH + bottom

  const maxVal = Math.max(
    ...data.map((d) => d.value),
    reference ? reference.value : 0
  )
  const scale = (v: number) => (maxVal <= 0 ? 0 : (v / maxVal) * chartW)
  const refX = reference ? chartLeft + scale(reference.value) : 0

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-white">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={title}
      >
        {/* faint diagonal watermark wordmark */}
        <text
          x={W / 2}
          y={H / 2 + 40}
          textAnchor="middle"
          fontSize="64"
          fontWeight="800"
          fill={PRIMARY}
          opacity="0.04"
          transform={`rotate(-18 ${W / 2} ${H / 2})`}
        >
          ProInvestorHub
        </text>

        {/* title */}
        <text x={24} y={34} fontSize="20" fontWeight="700" fill={TEXT}>
          {title}
        </text>
        {subtitle && (
          <text x={24} y={56} fontSize="13" fill={MUTED}>
            {subtitle}
          </text>
        )}

        {/* reference line */}
        {reference && (
          <g>
            <line
              x1={refX}
              y1={top - 8}
              x2={refX}
              y2={top + data.length * rowH + 2}
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x={refX}
              y={top - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={ACCENT}
            >
              {reference.label}
            </text>
          </g>
        )}

        {/* bars */}
        {data.map((d, i) => {
          const y = top + i * rowH
          const barH = rowH - 10
          const w = Math.max(scale(d.value), 1)
          const fill = i < highlightTop ? ACCENT : i < highlightTop + 1 ? PRIMARY_LIGHT : PRIMARY
          return (
            <g key={d.label}>
              <text
                x={labelW - 10}
                y={y + barH / 2 + 4}
                textAnchor="end"
                fontSize="12"
                fill={TEXT}
              >
                {d.label}
              </text>
              <rect x={chartLeft} y={y} width={w} height={barH} rx={3} fill={fill} />
              <text
                x={chartLeft + w + 6}
                y={y + barH / 2 + 4}
                fontSize="12"
                fontWeight="600"
                fill={MUTED}
              >
                {d.display}
                {unit}
              </text>
            </g>
          )
        })}

        {/* footer / source watermark */}
        <line x1={24} y1={H - 30} x2={W - 24} y2={H - 30} stroke={BORDER} strokeWidth="1" />
        <text x={24} y={H - 12} fontSize="11" fill={MUTED}>
          {source}
        </text>
        <text x={W - 24} y={H - 12} textAnchor="end" fontSize="11" fontWeight="700" fill={PRIMARY}>
          ProInvestorHub
        </text>
      </svg>
    </figure>
  )
}
