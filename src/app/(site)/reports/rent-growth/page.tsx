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
  statesByGrowth,
  metrosByGrowth,
  metrosFalling,
  fmrMeta,
  isPlaceholder,
  fmtRent,
  fmtYoy,
  fmtYoyMag,
} from '@/data/fmr-rent'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-06-23'
const csvHref = `/data/rent-growth-${fmrMeta.curYear}.csv`
const url = `${baseUrl}/reports/rent-growth`

export const metadata: Metadata = {
  title: `Where Rents Are Rising Fastest: 2-Bedroom Rent Growth by Metro (FY${fmrMeta.curYear})`,
  description: `Which U.S. metros and states had the fastest rent growth — Two-Bedroom Fair Market Rent change, HUD FY${fmrMeta.curYear} vs FY${fmrMeta.prevYear}, ranked across ${fmrMeta.metroCount} metro areas. Free and downloadable.`,
  alternates: { canonical: '/reports/rent-growth' },
  openGraph: {
    title: `Where Rents Are Rising Fastest (FY${fmrMeta.curYear})`,
    description: `Two-bedroom rent growth by metro and state, from HUD Fair Market Rents — a public-data map of where rent is climbing and where it's falling.`,
  },
}

const topMetros = metrosByGrowth.slice(0, 15)
const fallingMetros = metrosFalling.slice(0, 10)
const topStates = statesByGrowth.slice(0, 15)

const faqs = [
  {
    question: `How much did rents rise in ${fmrMeta.curYear}?`,
    answer: `Across ${fmrMeta.metroCount} U.S. metro areas, the median Two-Bedroom Fair Market Rent rose ${fmtYoyMag(national.yoyPct)} to ${fmtRent(national.fmr2br)} in fiscal year ${fmrMeta.curYear}, up from ${fmtRent(national.fmrPrev2br)} the prior year (HUD Fair Market Rents, FY${fmrMeta.curYear} vs FY${fmrMeta.prevYear}).`,
  },
  {
    question: 'Which metros had the fastest rent growth?',
    answer: topMetros.length
      ? `In FY${fmrMeta.curYear}, two-bedroom rents rose fastest in ${topMetros[0].name} (${fmtYoy(topMetros[0].yoyPct)}), ${topMetros[1]?.name} (${fmtYoy(topMetros[1]?.yoyPct)}), and ${topMetros[2]?.name} (${fmtYoy(topMetros[2]?.yoyPct)}).`
      : '',
  },
  {
    question: 'Did rents fall anywhere?',
    answer: metrosFalling.length
      ? `Yes. Two-bedroom Fair Market Rents fell year-over-year in ${metrosFalling.length} metro areas — most steeply in ${fallingMetros[0].name} (${fmtYoy(fallingMetros[0].yoyPct)}), ${fallingMetros[1]?.name} (${fmtYoy(fallingMetros[1]?.yoyPct)}), and ${fallingMetros[2]?.name} (${fmtYoy(fallingMetros[2]?.yoyPct)}) — a geographic mix of West Coast, Mountain West, and Sunbelt metros where new supply has outpaced demand.`
      : 'In this period, two-bedroom Fair Market Rents rose or held flat across nearly every metro area.',
  },
  {
    question: 'What are Fair Market Rents (FMRs)?',
    answer: `Fair Market Rents are HUD's estimate of the 40th-percentile gross rent (rent plus tenant-paid utilities) for a metro area, published once per federal fiscal year and used to set housing-assistance payment standards. They're a widely cited, consistent proxy for local market rent. This report compares the Two-Bedroom FMR for FY${fmrMeta.curYear} and FY${fmrMeta.prevYear}. ${fmrMeta.source}.`,
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

export default function RentGrowthReport() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Where Rents Are Rising Fastest', url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `Where Rents Are Rising Fastest (FY${fmrMeta.curYear})`,
          description: metadata.description as string,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `Where Rents Are Rising Fastest — 2-bedroom rent growth by metro & state (FY${fmrMeta.curYear})`,
          description: `Two-Bedroom Fair Market Rent and year-over-year change by U.S. metro area and state, derived from HUD Fair Market Rents FY${fmrMeta.curYear} vs FY${fmrMeta.prevYear}.`,
          url,
          downloadUrl: `${baseUrl}${csvHref}`,
          temporalCoverage: `${fmrMeta.prevYear}/${fmrMeta.curYear}`,
          datePublished: PUBLISHED,
        })}
      />

      {isPlaceholder && (
        <div className="mb-8 rounded-2xl border border-accent bg-accent/15 p-4 text-sm font-medium text-text">
          PREVIEW — layout only. The figures below are placeholder sample data, not
          real HUD values; the live FMR pull has not run yet.
        </div>
      )}

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Where Rents Are Rising Fastest</span>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          ProInvestorHub Data Report · FY{fmrMeta.curYear}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Where Rents Are Rising Fastest
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          Fair Market Rent is HUD&apos;s annual estimate of the going rent in a market.
          Comparing this year&apos;s figure to last year&apos;s shows where rent is climbing —
          and where it&apos;s falling. Using HUD&apos;s FY{fmrMeta.curYear} and FY{fmrMeta.prevYear}{' '}
          Two-Bedroom Fair Market Rents for {fmrMeta.metroCount} metro areas, this report
          ranks rent growth nationwide — the demand signal behind every rental deal.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Median 2BR rent" value={fmtRent(national.fmr2br)} sub={`FY${fmrMeta.curYear}, median of ${fmrMeta.metroCount} metros`} />
        <Stat label="Year-over-year" value={fmtYoy(national.yoyPct)} sub={`from ${fmtRent(national.fmrPrev2br)} in FY${fmrMeta.prevYear}`} />
        <Stat label="Metro areas analyzed" value={String(fmrMeta.metroCount)} sub={`across ${fmrMeta.stateCount} states + DC`} />
        <Stat label="Fastest-rising metro" value={topMetros[0] ? fmtYoy(topMetros[0].yoyPct) : '—'} sub={topMetros[0]?.name} />
      </section>

      {topMetros.length > 0 && (
        <KeyTakeaways
          title="Key findings"
          className="mt-12 max-w-3xl"
          points={[
            <>
              The median two-bedroom Fair Market Rent across {fmrMeta.metroCount} U.S.
              metro areas rose <strong>{fmtYoyMag(national.yoyPct)}</strong> to{' '}
              {fmtRent(national.fmr2br)} in FY{fmrMeta.curYear}, up from{' '}
              {fmtRent(national.fmrPrev2br)} a year earlier (HUD Fair Market Rents).
            </>,
            <>
              Rents rose fastest in{' '}
              <strong>{topMetros[0].name}</strong> ({fmtYoy(topMetros[0].yoyPct)}),{' '}
              {topMetros[1]?.name} ({fmtYoy(topMetros[1]?.yoyPct)}), and{' '}
              {topMetros[2]?.name} ({fmtYoy(topMetros[2]?.yoyPct)}) among metro areas.
            </>,
            metrosFalling.length > 0 ? (
              <>
                Two-bedroom rents <strong>fell</strong> year-over-year in{' '}
                {metrosFalling.length} metro areas — led by {fallingMetros[0].name} (
                {fmtYoy(fallingMetros[0].yoyPct)}) and {fallingMetros[1]?.name} (
                {fmtYoy(fallingMetros[1]?.yoyPct)}) — as new supply outpaced demand
                across a mix of West Coast and Sunbelt markets.
              </>
            ) : null,
            <>
              By state, rent growth was strongest in{' '}
              <strong>{topStates[0]?.name}</strong> ({fmtYoy(topStates[0]?.yoyPct)})
              and weakest in {statesByGrowth[statesByGrowth.length - 1]?.name} (
              {fmtYoy(statesByGrowth[statesByGrowth.length - 1]?.yoyPct)}).
            </>,
          ]}
        />
      )}

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <BrandBarChart
          title="Fastest-rising metro rents"
          subtitle={`2BR FMR change, FY${fmrMeta.curYear} vs FY${fmrMeta.prevYear}, top ${topMetros.length}`}
          unit="%"
          highlightTop={3}
          source={`Source: HUD Fair Market Rents FY${fmrMeta.curYear} · proinvestorhub.com`}
          reference={{ value: (national.yoyPct ?? 0) * 100, label: 'U.S. median' }}
          data={topMetros.map((m) => ({
            label: m.name,
            value: (m.yoyPct ?? 0) * 100,
            display: fmtYoy(m.yoyPct),
          }))}
        />
        <BrandBarChart
          title="Strongest rent growth by state"
          subtitle={`Median 2BR FMR change, top ${topStates.length} states`}
          unit="%"
          highlightTop={3}
          source={`Source: HUD Fair Market Rents FY${fmrMeta.curYear} · proinvestorhub.com`}
          reference={{ value: (national.yoyPct ?? 0) * 100, label: 'U.S. median' }}
          data={topStates.map((s) => ({
            label: s.name,
            value: (s.yoyPct ?? 0) * 100,
            display: fmtYoy(s.yoyPct),
          }))}
        />
      </section>

      {/* Where rents fell */}
      {fallingMetros.length > 0 && (
        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold text-text">Where rents are falling</h2>
          <p className="mt-2 leading-7 text-text-muted">
            Rent growth isn&apos;t universal. Two-bedroom Fair Market Rents declined
            year-over-year in {metrosFalling.length} metro areas — most steeply in these,
            where new supply has outpaced demand:
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {fallingMetros.map((m) => (
              <span
                key={m.code ?? m.slug}
                className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm text-text"
              >
                {m.name} <span className="font-semibold text-primary">{fmtYoy(m.yoyPct)}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* State rankings */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-text">Rent growth by state</h2>
            <p className="mt-1 text-text-muted">
              All states, ranked by median two-bedroom rent growth.
            </p>
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
                <th className="px-4 py-3 text-right font-medium">YoY change</th>
                <th className="px-4 py-3 text-right font-medium">Median 2BR rent</th>
                <th className="px-4 py-3 text-right font-medium">Metros</th>
              </tr>
            </thead>
            <tbody>
              {statesByGrowth.map((s, i) => (
                <tr key={s.slug} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2.5 text-text-muted">{i + 1}</td>
                  <td className="px-4 py-2.5 font-medium text-text">{s.name}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-primary">{fmtYoy(s.yoyPct)}</td>
                  <td className="px-4 py-2.5 text-right text-text-muted">{fmtRent(s.fmr2br)}</td>
                  <td className="px-4 py-2.5 text-right text-text-muted">{s.metroCount ?? '—'}</td>
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
            {fmrMeta.metric}. Source: {fmrMeta.source}. We compare the Two-Bedroom
            Fair Market Rent — HUD&apos;s 40th-percentile gross-rent estimate — for each
            metro area across the two most recent fiscal years. State and national
            figures are the median across the underlying metro areas; single-county
            nonmetro areas are excluded. FMR is a consistent market-rent proxy, not a
            net return — pair it with a deal-level cash-flow analysis.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Pair it with the numbers</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Rising rent is the demand signal; whether a deal works depends on price and
            financing. See where rent goes furthest against price in our{' '}
            <Link href="/reports/rental-yield" className="font-semibold text-primary hover:underline">
              Best Cash-Flow Markets
            </Link>{' '}
            report, and how investors borrow in each market in the{' '}
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
            { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
            { label: 'Cap Rate Calculator', href: '/calculators/cap-rate' },
            { label: 'Best Cash-Flow Markets', href: '/reports/rental-yield', muted: true },
            { label: 'Investor Financing Report', href: '/reports/investor-financing', muted: true },
          ]}
        />
      </div>
    </div>
  )
}
