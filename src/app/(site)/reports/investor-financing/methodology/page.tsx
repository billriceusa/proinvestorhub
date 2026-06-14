import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { reportMeta } from '@/data/hmda-investor'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const url = `${baseUrl}/reports/investor-financing/methodology`

export const metadata: Metadata = {
  title: `Methodology — The ${reportMeta.year} Investor Financing Report`,
  description: `Data sources, definitions, and coverage caveats for ProInvestorHub's analysis of how real estate investors finance deals, built on CFPB HMDA ${reportMeta.year} loan-level data.`,
  alternates: { canonical: '/reports/investor-financing/methodology' },
}

const caveats = [
  ['Financed loans only', 'HMDA records mortgage applications and loans, so all-cash investor purchases — a large share of investor activity — are not captured. Read every figure as describing the financed market.'],
  ['Business-purpose loans are partially covered', 'Under Regulation C (12 CFR 1003.3(c)(10)), a business-purpose loan secured by a dwelling is reported only when it is a home purchase, home improvement, or refinance. Most DSCR purchase and refinance loans qualify, but the full private-lending universe is undercounted. Treat the business-purpose share as a floor.'],
  ['Agricultural loans excluded', 'Loans used primarily for agricultural purposes are excluded under 12 CFR 1003.3(c)(9), so farm and rural-ag investor loans drop out.'],
  ['Privacy modifications', 'The public file rounds property value to the nearest $10,000 and bins debt-to-income and age. Interest rate and loan amount are disclosed, so the rate-premium analysis uses exact reported rates.'],
  ['Small-filer exemptions', 'Some smaller institutions report partial data ("Exempt" fields). Rows missing a usable interest rate or loan-to-value are excluded from those medians; rate coverage exceeds 90% nationally.'],
]

const fields = [
  ['Investor rate premium', 'Median interest rate on investor (occupancy_type = 3) originations minus the median rate on owner-occupant (occupancy_type = 1) originations, in basis points.'],
  ['Denial rate', 'Denied investor applications ÷ (originated + denied investor applications).'],
  ['Investor share', 'Investor originations ÷ all single-family 1-4 originations (any occupancy) in the state.'],
  ['DSCR / business-purpose share', 'Investor originations flagged business_or_commercial_purpose = 1 ÷ all investor originations.'],
  ['Cash-out share', 'Investor originations with loan_purpose = 32 (cash-out refinance) ÷ all investor originations.'],
  ['Median LTV', 'Median loan_to_value_ratio on investor originations.'],
]

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Investor Financing Report', url: `${baseUrl}/reports/investor-financing` },
          { name: 'Methodology', url },
        ])}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports/investor-financing" className="transition-colors hover:text-primary">
          Investor Financing Report
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Methodology</span>
      </nav>

      <h1 className="text-3xl font-bold text-text sm:text-4xl">Methodology &amp; sources</h1>
      <p className="mt-4 text-lg leading-7 text-text-muted">
        The {reportMeta.year} Investor Financing Report is built entirely on
        public-domain federal mortgage data. Here is exactly what we used, how each
        metric is defined, and what the data does and does not capture.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-text">Data source</h2>
        <p className="mt-3 leading-7 text-text-muted">
          {reportMeta.source}. We use the loan-level public file for{' '}
          {reportMeta.year}, the most recent year available, accessed through the
          CFPB HMDA Data Browser. The universe is {reportMeta.universe.toLowerCase()}.
          HMDA is a U.S. government work in the public domain.
        </p>
        <p className="mt-3 leading-7 text-text-muted">
          For each state we separate investor loans (the property is an investment
          property) from owner-occupant loans, then compute medians from the full
          distribution of reported values. National figures are computed from the
          pooled 50-state-plus-DC distribution, not as an average of state medians.
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
          No dataset is perfect. These limits matter when interpreting the numbers —
          we state them plainly so the report can be cited with confidence.
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
          The report and its underlying state-level dataset are free to cite and
          link with attribution to ProInvestorHub. The data is downloadable as a CSV
          from the{' '}
          <Link href="/reports/investor-financing" className="font-semibold text-primary hover:underline">
            main report
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
