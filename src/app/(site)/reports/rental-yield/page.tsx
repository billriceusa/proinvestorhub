import type { Metadata } from 'next'
import Link from 'next/link'
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
  datasetJsonLd,
} from '@/components/json-ld'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { BrandBarChart } from '@/components/reports/brand-bar-chart'
import { KeyTakeaways } from '@/components/key-takeaways'
import {
  national,
  statesByYield,
  metrosByYield,
  yieldMeta,
  isPlaceholder,
  fmtYield,
  fmtRent,
  fmtValue,
} from '@/data/rental-yield'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-06-16'
const csvHref = `/data/rental-yield-${yieldMeta.year}.csv`
const url = `${baseUrl}/reports/rental-yield`

export const metadata: Metadata = {
  title: `Best Cash-Flow Markets: Gross Rental Yield by State & Metro (${yieldMeta.year})`,
  description: `Where rentals cash-flow best — gross rental yield (annual rent ÷ home value) for every state and major metro, from Census ACS ${yieldMeta.year} data. Ranked, free, and downloadable.`,
  alternates: { canonical: '/reports/rental-yield' },
  openGraph: {
    title: `Best Cash-Flow Markets (${yieldMeta.year})`,
    description: `Gross rental yield by state and metro — a public-data map of where rent goes furthest against home prices.`,
  },
}

const topStates = statesByYield.slice(0, 15)
const bottomStates = [...statesByYield].slice(-5).reverse()
const topMetros = metrosByYield.slice(0, 15)

const faqs = [
  {
    question: 'What is gross rental yield?',
    answer: `Gross rental yield is annual rent divided by the property's value — here, (median gross rent × 12) ÷ median home value. Nationally it was ${fmtYield(national.grossYield)} in ${yieldMeta.year} (${fmtRent(national.medianGrossRent)} rent against a ${fmtValue(national.medianHomeValue)} median home value). It's a quick screen for where rent goes furthest against price, before financing and expenses.`,
  },
  {
    question: 'Which states have the best rental yield?',
    answer: topStates.length
      ? `In ${yieldMeta.year}, gross rental yield was highest in ${topStates[0].name} (${fmtYield(topStates[0].grossYield)}), ${topStates[1]?.name} (${fmtYield(topStates[1]?.grossYield ?? null)}), and ${topStates[2]?.name} (${fmtYield(topStates[2]?.grossYield ?? null)}). High-cost coastal states sit at the bottom.`
      : '',
  },
  {
    question: 'Does gross yield account for expenses or financing?',
    answer: `No. Gross yield is a top-line screen — it excludes taxes, insurance, vacancy, management, and financing costs. Use it to compare markets, then run a specific deal through a cap-rate or cash-flow calculator for a net picture.`,
  },
  {
    question: 'What data is this based on?',
    answer: `${yieldMeta.source}. Rent is median gross rent (B25064) and value is median owner-occupied home value (B25077), from the same survey and vintage so they're directly comparable. Coverage is geographies with population of at least 65,000.`,
  },
]

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium text-text">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-text-muted">{sub}</p>}
    </div>
  )
}

export default function RentalYieldReport() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Best Cash-Flow Markets', url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `Best Cash-Flow Markets: Gross Rental Yield (${yieldMeta.year})`,
          description: metadata.description as string,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `${yieldMeta.year} U.S. Gross Rental Yield — state & metro data`,
          description: `Gross rental yield (median gross rent × 12 ÷ median home value) by state and metropolitan area, derived from Census ACS ${yieldMeta.year} 1-year estimates.`,
          url,
          downloadUrl: `${baseUrl}${csvHref}`,
          temporalCoverage: String(yieldMeta.year),
          datePublished: PUBLISHED,
        })}
      />

      {isPlaceholder && (
        <div className="mb-8 rounded-2xl border border-accent bg-accent/15 p-4 text-sm font-medium text-text">
          PREVIEW — layout only. The figures below are placeholder sample data, not
          real Census values; the live ACS pull has not run yet.
        </div>
      )}

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Best Cash-Flow Markets</span>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          ProInvestorHub Data Report · {yieldMeta.year}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Best Cash-Flow Markets: where rent goes furthest
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          Gross rental yield measures how much annual rent a market produces against
          the price of a home. Using {yieldMeta.year} Census data for every state and
          major metro, this report ranks where rent goes furthest against home
          prices — the first screen before you finance a deal.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="U.S. gross rental yield" value={fmtYield(national.grossYield)} sub={`${yieldMeta.year} national median`} />
        <Stat label="Median gross rent" value={fmtRent(national.medianGrossRent)} sub="incl. utilities (ACS)" />
        <Stat label="Median home value" value={fmtValue(national.medianHomeValue)} sub="owner-occupied (ACS)" />
      </section>

      {topStates.length > 0 && (
        <KeyTakeaways
          title="Key findings"
          className="mt-12 max-w-3xl"
          points={[
            <>
              U.S. gross rental yield was{' '}
              <strong>{fmtYield(national.grossYield)}</strong> in {yieldMeta.year} —
              a {fmtRent(national.medianGrossRent)} median monthly rent against a{' '}
              {fmtValue(national.medianHomeValue)} median home value (Census ACS).
            </>,
            <>
              <strong>{topStates[0].name}</strong> has the highest gross rental yield
              of any state at {fmtYield(topStates[0].grossYield)}, followed by{' '}
              {topStates[1]?.name} ({fmtYield(topStates[1]?.grossYield ?? null)}) and{' '}
              {topStates[2]?.name} ({fmtYield(topStates[2]?.grossYield ?? null)}).
            </>,
            <>
              Gross yields are lowest in high-cost states like{' '}
              <strong>{bottomStates[0]?.name}</strong> (
              {fmtYield(bottomStates[0]?.grossYield ?? null)}), where home prices far
              outrun rents.
            </>,
            topMetros.length > 0 ? (
              <>
                Among major U.S. metros,{' '}
                <strong>{topMetros[0].name}</strong> leads with a{' '}
                {fmtYield(topMetros[0].grossYield)} gross rental yield in{' '}
                {yieldMeta.year}.
              </>
            ) : null,
          ]}
        />
      )}

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <BrandBarChart
          title="Highest gross rental yield by state"
          subtitle={`Annual rent ÷ home value, top ${topStates.length} states`}
          unit="%"
          highlightTop={3}
          reference={{ value: (national.grossYield ?? 0) * 100, label: 'U.S. median' }}
          data={topStates.map((s) => ({
            label: s.name,
            value: (s.grossYield ?? 0) * 100,
            display: fmtYield(s.grossYield),
          }))}
        />
        <BrandBarChart
          title="Highest-yield metros"
          subtitle={`Annual rent ÷ home value, top ${topMetros.length} metros`}
          unit="%"
          highlightTop={3}
          reference={{ value: (national.grossYield ?? 0) * 100, label: 'U.S. median' }}
          data={topMetros.map((m) => ({
            label: m.name,
            value: (m.grossYield ?? 0) * 100,
            display: fmtYield(m.grossYield),
          }))}
        />
      </section>

      {/* State rankings */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-text">Gross yield by state</h2>
            <p className="mt-1 text-text-muted">All states, ranked by gross rental yield.</p>
          </div>
          <a
            href={csvHref}
            download
            className="rounded-full border border-primary bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Download the data (CSV) →
          </a>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 text-right font-medium">Gross yield</th>
                <th className="px-4 py-3 text-right font-medium">Median rent</th>
                <th className="px-4 py-3 text-right font-medium">Median value</th>
              </tr>
            </thead>
            <tbody>
              {statesByYield.map((s, i) => (
                <tr key={s.slug} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2.5 text-text-muted">{i + 1}</td>
                  <td className="px-4 py-2.5 font-medium text-text">
                    <Link href={`/reports/rental-yield/${s.slug}`} className="hover:text-primary hover:underline">
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-primary">{fmtYield(s.grossYield)}</td>
                  <td className="px-4 py-2.5 text-right text-text-muted">{fmtRent(s.medianGrossRent)}</td>
                  <td className="px-4 py-2.5 text-right text-text-muted">{fmtValue(s.medianHomeValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology + citation */}
      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">How we built this</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            {yieldMeta.metric}. Source: {yieldMeta.source}. Rent and value come from
            the same survey and vintage, so they&apos;re directly comparable. Gross
            yield excludes taxes, insurance, and financing — it&apos;s a market screen,
            not a net return.
          </p>
          <Link
            href="/reports/rental-yield/methodology"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Full methodology &amp; sources →
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Pair it with the trend</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Yield shows where rent goes furthest today; see where rent is climbing in{' '}
            <Link href="/reports/rent-growth" className="font-semibold text-primary hover:underline">
              Where Rents Are Rising Fastest
            </Link>
            , and how investors borrow in each market in the{' '}
            <Link href="/reports/investor-financing" className="font-semibold text-primary hover:underline">
              Investor Financing Report
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">Frequently asked questions</h2>
        <div className="mt-4 space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-semibold text-text">{f.question}</h3>
              <p className="mt-1.5 leading-7 text-text-muted">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14">
        <CalculatorRelatedTools
          heading="Run a specific deal"
          tools={[
            { label: 'Cap Rate Calculator', href: '/calculators/cap-rate' },
            { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
            { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
            { label: 'Investor Financing Report', href: '/reports/investor-financing', muted: true },
          ]}
        />
      </div>
    </div>
  )
}
