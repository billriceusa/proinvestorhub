import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { lenderMeta, fmtCount } from '@/data/hmda-lenders'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const url = `${baseUrl}/reports/investor-lenders/methodology`

export const metadata: Metadata = {
  title: `Methodology — Most Active Investment-Property Lenders (${lenderMeta.year})`,
  description: `How ProInvestorHub builds its investment-property lender rankings from CFPB HMDA ${lenderMeta.year} Modified LAR data: the universe, how lenders are identified and named, and what HMDA does and doesn't capture.`,
  alternates: { canonical: '/reports/investor-lenders/methodology' },
}

const steps = [
  ['Universe', `We count originated loans (action taken = originated) for home purchase, refinance, and cash-out refinance on investor-occupied (occupancy = investment property), single-family 1-4 unit, site-built properties. Second homes and owner-occupied loans are excluded.`],
  ['Grouping by lender', `Each HMDA record carries the reporting institution's LEI (Legal Entity Identifier). We group originations by LEI within each state, and nationally, counting loans and summing reported loan amounts.`],
  ['Naming', `The Modified LAR carries only LEIs, not names. We resolve the top lenders' LEIs to institution names via the HMDA filers registry; because LEIs are stable across years, the prior-year registry covers nearly all current filers. Any remaining LEIs are resolved through the public GLEIF registry. For this edition, ${fmtCount(lenderMeta.nameResolution.viaFilers)} of ${fmtCount(lenderMeta.nameResolution.of)} listed lenders resolved via HMDA and ${fmtCount(lenderMeta.nameResolution.viaGleif)} via GLEIF, with ${fmtCount(lenderMeta.nameResolution.unresolved)} unresolved.`],
  ['Focus label', `We flag each lender's mix using HMDA's business-or-commercial-purpose field. Where most of a lender's investor originations are business-purpose (the bucket that includes DSCR and LLC-held loans) we label it "DSCR / business-purpose"; where most are not, "Conventional"; otherwise "Mixed."`],
  ['Listing thresholds', `We list the top ${lenderMeta.topPerState} lenders per state (and the top 30 nationally), and ignore any lender below ${lenderMeta.minOriginations} investor originations in a state to avoid tiny-sample noise.`],
]

const caveats = [
  ['Not a "best" ranking', 'This ranks reported origination volume only. It says nothing about a lender\'s rates, fees, service, speed, or whether it will lend on your specific deal. It is a starting list to research, not a recommendation.'],
  ['HMDA omits many private/hard-money lenders', 'HMDA reporting is required of institutions above loan-count and asset thresholds. Many small private and hard-money lenders fall below those thresholds and never appear — so the truly local hard-money market is undercounted. (Large business-purpose lenders like Kiavi and Lima One do report and do appear.)'],
  ['Business-purpose loans are partly optional', 'Reporting some business-purpose loans is optional under HMDA, so the DSCR/business-purpose counts are a floor, not a complete census.'],
  ['Legal entity names, not brands', 'Names come from the LEI registry as registered legal entities (e.g. "United Shore Financial Services, LLC" rather than its "UWM" brand), and parent/DBA relationships are not resolved.'],
  ['Early-release vintage', 'The Modified LAR is the early-release dataset the CFPB publishes months before the finalized Snapshot; figures may shift slightly when the Snapshot publishes.'],
]

export default function InvestorLendersMethodology() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Most Active Investment-Property Lenders', url: `${baseUrl}/reports/investor-lenders` },
          { name: 'Methodology', url },
        ])}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports/investor-lenders" className="transition-colors hover:text-primary">
          Most Active Investment-Property Lenders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Methodology</span>
      </nav>

      <h1 className="text-3xl font-bold text-text sm:text-4xl">Methodology &amp; sources</h1>
      <p className="mt-4 text-lg leading-7 text-text-muted">
        This report is built entirely on public CFPB HMDA data. Here is exactly how we
        identify and rank lenders, and — just as important — what the data does and does
        not capture.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-text">How we build it</h2>
        <dl className="mt-4 space-y-4">
          {steps.map(([term, def]) => (
            <div key={term} className="rounded-xl border border-border bg-surface p-5">
              <dt className="font-semibold text-text">{term}</dt>
              <dd className="mt-1 text-sm leading-6 text-text-muted">{def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-text">What this data does not capture</h2>
        <p className="mt-3 leading-7 text-text-muted">
          No single dataset captures the whole lending market. These limits matter when
          reading the rankings — we state them plainly so the report can be cited with
          confidence.
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
          The rankings and underlying dataset are free to cite and link with attribution to
          ProInvestorHub. The data is downloadable as a CSV from the{' '}
          <Link href="/reports/investor-lenders" className="font-semibold text-primary hover:underline">
            main report
          </Link>
          . Source: {lenderMeta.source}, {lenderMeta.year}.
        </p>
      </section>
    </div>
  )
}
