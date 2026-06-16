import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { yieldMeta } from '@/data/rental-yield'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const url = `${baseUrl}/reports/rental-yield/methodology`

export const metadata: Metadata = {
  title: `Methodology — Best Cash-Flow Markets (${yieldMeta.year})`,
  description: `Data sources, definitions, and caveats for ProInvestorHub's gross rental-yield analysis, built on Census ACS ${yieldMeta.year} 1-year estimates.`,
  alternates: { canonical: '/reports/rental-yield/methodology' },
}

const caveats = [
  ['Gross, not net', 'Gross yield excludes property taxes, insurance, maintenance, vacancy, management, and financing. It is a market-comparison screen, not a return projection. Run a specific deal through a cap-rate or cash-flow calculator for a net figure.'],
  ['Medians, not matched pairs', 'Median rent and median home value describe different parts of a market — the typical rental versus the typical owner-occupied home. They are not the rent and price of the same property, so yield is a market indicator, not a single-asset cap rate.'],
  ['Gross rent includes utilities', 'ACS median gross rent includes the cost of utilities and fuels paid by the renter. That slightly overstates the rent a landlord collects where utilities are tenant-paid.'],
  ['Population coverage', 'ACS 1-year estimates cover geographies with at least 65,000 people. Smaller rural counties and metros fall below that threshold and are not included; the trade-off is the most current vintage.'],
  ['Top-coded values', 'ACS top-codes the highest home values, which compresses yields slightly in the most expensive markets.'],
]

const fields = [
  ['Gross rental yield', '(Median gross rent × 12) ÷ median home value, expressed as a percentage.'],
  ['Median gross rent', 'ACS table B25064 — median monthly gross rent (contract rent plus tenant-paid utilities) for renter-occupied units.'],
  ['Median home value', 'ACS table B25077 — median value of owner-occupied housing units.'],
]

export default function RentalYieldMethodology() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Best Cash-Flow Markets', url: `${baseUrl}/reports/rental-yield` },
          { name: 'Methodology', url },
        ])}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports/rental-yield" className="transition-colors hover:text-primary">
          Best Cash-Flow Markets
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Methodology</span>
      </nav>

      <h1 className="text-3xl font-bold text-text sm:text-4xl">Methodology &amp; sources</h1>
      <p className="mt-4 text-lg leading-7 text-text-muted">
        The Best Cash-Flow Markets report is built entirely on public-domain Census
        data. Here is exactly what we used, how yield is defined, and what the data
        does and does not capture.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-text">Data source</h2>
        <p className="mt-3 leading-7 text-text-muted">
          {yieldMeta.source}. We use the 1-year estimates — the most current vintage —
          so rent and home value are drawn from the same survey and period and are
          directly comparable. {yieldMeta.universe}. ACS is a U.S. government work in
          the public domain.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-text">How each metric is defined</h2>
        <dl className="mt-4 space-y-4">
          {fields.map(([term, def]) => (
            <div key={term} className="rounded-xl border border-border bg-surface p-5">
              <dt className="font-semibold text-text">{term}</dt>
              <dd className="mt-1 text-sm leading-6 text-text-muted">{def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-text">Coverage caveats</h2>
        <p className="mt-3 leading-7 text-text-muted">
          No single indicator captures a deal. These limits matter when interpreting
          yield — we state them plainly so the report can be cited with confidence.
        </p>
        <dl className="mt-4 space-y-4">
          {caveats.map(([term, def]) => (
            <div key={term} className="rounded-xl border border-border bg-white p-5">
              <dt className="font-semibold text-text">{term}</dt>
              <dd className="mt-1 text-sm leading-6 text-text-muted">{def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-bold text-text">Using this report</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          The report and its underlying dataset are free to cite and link with
          attribution to ProInvestorHub. The data is downloadable as a CSV from the{' '}
          <Link href="/reports/rental-yield" className="font-semibold text-primary hover:underline">
            main report
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
