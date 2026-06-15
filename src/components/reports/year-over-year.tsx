import {
  national,
  trends,
  reportMeta,
  priorYear,
  premiumDirectionCounts,
  fmtBps,
  fmtPct,
  fmtUSD,
  fmtCount,
  fmtSignedBps,
  fmtSignedPts,
  fmtPctChange,
  trendDir,
  type Delta,
} from '@/data/hmda-investor'

function Arrow({ dir }: { dir: 'up' | 'down' | 'flat' }) {
  if (dir === 'flat') {
    return (
      <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
        <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  const d = dir === 'up' ? 'M3 9L9 3M9 3H4M9 3V8' : 'M3 3L9 9M9 9H4M9 9V4'
  return (
    <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DeltaStat({
  label,
  value,
  delta,
  dir,
}: {
  label: string
  value: string
  delta: string
  dir: 'up' | 'down' | 'flat'
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium text-text">{label}</p>
      <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-text-muted">
        <Arrow dir={dir} />
        {delta} vs {priorYear}
      </p>
    </div>
  )
}

export function YearOverYear() {
  const n = trends.national
  const dir = (m: Delta) => trendDir(m.abs)
  const { up, flat, down } = premiumDirectionCounts()
  const premiumDown = trends.movers.premiumDown ?? []
  const shareUp = trends.movers.shareUp ?? []

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold text-text">
        Year over year: {priorYear} &rarr; {reportMeta.year}
      </h2>
      <p className="mt-1 max-w-2xl text-text-muted">
        How investor financing shifted in one year. Rates eased, investors borrowed
        more, and the premium they pay over owner-occupants narrowed across most of
        the country.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DeltaStat
          label="Investor rate premium"
          value={fmtBps(national.ratePremiumBps)}
          delta={fmtSignedBps(n.ratePremiumBps.abs)}
          dir={dir(n.ratePremiumBps)}
        />
        <DeltaStat
          label="Investor loans originated"
          value={fmtCount(national.investorOriginations)}
          delta={fmtPctChange(n.investorOriginations.pct)}
          dir={dir(n.investorOriginations)}
        />
        <DeltaStat
          label="Financed volume"
          value={fmtUSD(national.investorVolume)}
          delta={fmtPctChange(n.investorVolume.pct)}
          dir={dir(n.investorVolume)}
        />
        <DeltaStat
          label="Cash-out share"
          value={fmtPct(national.cashOutShare)}
          delta={fmtSignedPts(n.cashOutShare.abs)}
          dir={dir(n.cashOutShare)}
        />
        <DeltaStat
          label="DSCR / business-purpose"
          value={fmtPct(national.businessPurposeShare, 0)}
          delta={fmtSignedPts(n.businessPurposeShare.abs)}
          dir={dir(n.businessPurposeShare)}
        />
        <DeltaStat
          label="Investor denial rate"
          value={fmtPct(national.denialRate)}
          delta={fmtSignedPts(n.denialRate.abs)}
          dir={dir(n.denialRate)}
        />
      </div>

      {/* Headline takeaway */}
      <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-6">
        <p className="leading-7 text-text">
          The investor rate premium <strong>compressed in {down} states</strong>, held
          flat in {flat}, and <strong>widened in {up}</strong> &mdash; the national
          median fell from {fmtBps(n.ratePremiumBps.prior)} to{' '}
          {fmtBps(n.ratePremiumBps.current)} as the investor median rate eased from{' '}
          {n.investorMedianRate.prior}% to {n.investorMedianRate.current}%. Even so,
          investors still borrowed {fmtPctChange(n.investorOriginations.pct)} more by
          count and {fmtPctChange(n.investorVolume.pct)} more by dollar volume.
        </p>
      </div>

      {/* Movers */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-base font-bold text-text">
            Where the premium compressed most
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Largest drop in the investor rate premium, {priorYear} &rarr; {reportMeta.year}.
          </p>
          <ol className="mt-4 space-y-2.5">
            {premiumDown.map((m) => (
              <li key={m.abbr} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-text">{m.name}</span>
                <span className="text-text-muted">
                  {fmtBps(m.prior)} &rarr; <span className="font-semibold text-text">{fmtBps(m.current)}</span>{' '}
                  <span className="text-text-light">({fmtSignedBps(m.abs)})</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-base font-bold text-text">
            Where investors gained the most share
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Largest rise in investor share of originations, {priorYear} &rarr; {reportMeta.year}.
          </p>
          <ol className="mt-4 space-y-2.5">
            {shareUp.map((m) => (
              <li key={m.abbr} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-text">{m.name}</span>
                <span className="text-text-muted">
                  {fmtPct(m.prior)} &rarr; <span className="font-semibold text-text">{fmtPct(m.current)}</span>{' '}
                  <span className="text-text-light">({fmtSignedPts(m.abs)})</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-text-muted">
        {trends.meta.note}
      </p>
    </section>
  )
}
