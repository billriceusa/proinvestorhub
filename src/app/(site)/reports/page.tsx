import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import {
  national,
  reportMeta,
  fmtBps,
  fmtPct,
  fmtCount,
} from '@/data/hmda-investor'
import {
  national as yieldNational,
  statesByYield,
  yieldMeta,
  fmtYield,
  fmtRent,
} from '@/data/rental-yield'
import {
  nationalLenders,
  nationalTotal,
  lenderMeta,
  fmtCount as fmtLenderCount,
} from '@/data/hmda-lenders'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

export const metadata: Metadata = {
  title: 'Data Reports for Real Estate Investors',
  description:
    'Original, data-driven reports on real estate investing — built on public datasets and free to cite, including the Investor Financing Report on how investors borrow.',
  alternates: { canonical: '/reports' },
}

const reports = [
  {
    title: `The ${reportMeta.year} Investor Financing Report`,
    href: '/reports/investor-financing',
    source: 'CFPB HMDA',
    year: reportMeta.year,
    blurb:
      'A 50-state analysis of how real estate investors finance deals — the rate premium they pay over owner-occupants, denial rates, DSCR/business-purpose lending, and leverage.',
    stats: [
      { label: 'Investor rate premium', value: fmtBps(national.ratePremiumBps) },
      { label: 'Investor denial rate', value: fmtPct(national.denialRate) },
      { label: 'Investor loans analyzed', value: fmtCount(national.investorOriginations) },
    ],
  },
  {
    title: `Best Cash-Flow Markets (${yieldMeta.year})`,
    href: '/reports/rental-yield',
    source: 'Census ACS',
    year: yieldMeta.year,
    blurb:
      'Where rent goes furthest against home prices — gross rental yield for every state and major metro, ranked, from Census ACS data. The first screen before you finance a deal.',
    stats: [
      { label: 'U.S. gross rental yield', value: fmtYield(yieldNational.grossYield) },
      { label: 'Top state', value: statesByYield[0] ? `${statesByYield[0].abbr} ${fmtYield(statesByYield[0].grossYield)}` : '—' },
      { label: 'U.S. median rent', value: fmtRent(yieldNational.medianGrossRent) },
    ],
  },
  {
    title: `Most Active Investment-Property Lenders by State (${lenderMeta.year})`,
    href: '/reports/investor-lenders',
    source: 'CFPB HMDA',
    year: lenderMeta.year,
    blurb:
      'Which lenders originate the most investment-property loans in each state, ranked by HMDA-reported volume — with DSCR/business-purpose focus flagged. A research starting point, not a "best lender" list.',
    stats: [
      { label: 'Most active', value: nationalLenders[0]?.name ?? '—' },
      { label: 'Investor loans analyzed', value: fmtLenderCount(nationalTotal) },
      { label: 'Reporting lenders', value: fmtLenderCount(lenderMeta.distinctLenders) },
    ],
  },
]

export default function ReportsHub() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
        ])}
      />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Data Reports</h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          Original analysis built on public datasets, focused on the questions
          investors actually ask. Every report is free to cite and link, with the
          underlying data available to download.
        </p>
      </header>

      <div className="mt-10 grid gap-6">
        {reports.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group rounded-2xl border border-border bg-white p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {r.source} · {r.year}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-text group-hover:text-primary">
              {r.title}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-text-muted">{r.blurb}</p>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {r.stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-2xl font-bold text-primary">{s.value}</dd>
                  <dt className="text-xs text-text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <span className="mt-6 inline-block text-sm font-semibold text-primary">
              Read the report →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
