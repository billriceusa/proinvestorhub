import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from '@/components/json-ld'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { BrandBarChart } from '@/components/reports/brand-bar-chart'
import {
  states,
  national,
  statesByYield,
  getStateBySlug,
  metrosInState,
  stateRank,
  yieldMeta,
  fmtYield,
  fmtRent,
  fmtValue,
  ordinal,
} from '@/data/rental-yield'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-06-17'

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) return {}
  const rank = stateRank(s.slug)
  const title = `${s.name} Rental Yield (${yieldMeta.year}): Best Cash-Flow Markets`
  const description = `Gross rental yield in ${s.name} was ${fmtYield(s.grossYield)} in ${yieldMeta.year}${rank ? ` — ${ordinal(rank)} of ${statesByYield.length} states` : ''}: ${fmtRent(s.medianGrossRent)} median rent against a ${fmtValue(s.medianHomeValue)} median home value, plus its top metros ranked.`
  return {
    title,
    description,
    alternates: { canonical: `/reports/rental-yield/${s.slug}` },
    openGraph: { title, description },
  }
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium text-text">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-text-muted">{sub}</p>}
    </div>
  )
}

export default async function StateRentalYieldPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) notFound()

  const url = `${baseUrl}/reports/rental-yield/${s.slug}`
  const rank = stateRank(s.slug)
  const n = statesByYield.length
  const metros = s.abbr ? metrosInState(s.abbr) : []
  const topMetros = metros.slice(0, 12)
  const vsNational =
    s.grossYield != null && national.grossYield != null
      ? s.grossYield >= national.grossYield
      : null

  const faqs = [
    {
      question: `What is the gross rental yield in ${s.name}?`,
      answer: `In ${yieldMeta.year}, ${s.name} had a gross rental yield of ${fmtYield(s.grossYield)} — ${fmtRent(s.medianGrossRent)} median gross rent against a ${fmtValue(s.medianHomeValue)} median home value${rank ? `. That ranks ${ordinal(rank)} of ${n} states (1 = highest yield).` : '.'} Nationally the figure was ${fmtYield(national.grossYield)}.`,
    },
    {
      question: topMetros.length
        ? `Which ${s.name} metros have the best rental yield?`
        : `Are there metro-level figures for ${s.name}?`,
      answer: topMetros.length
        ? `Among ${s.name} metros covered by the data, gross yield was highest in ${topMetros[0].name} (${fmtYield(topMetros[0].grossYield)})${topMetros[1] ? `, ${topMetros[1].name} (${fmtYield(topMetros[1].grossYield)})` : ''}${topMetros[2] ? `, and ${topMetros[2].name} (${fmtYield(topMetros[2].grossYield)})` : ''}.`
        : `ACS 1-year estimates cover geographies with at least 65,000 people, so ${s.name} has no qualifying metros in this dataset. The statewide figure above still applies.`,
    },
    {
      question: 'Does this account for expenses or financing?',
      answer: `No. Gross yield is a top-line market screen — it excludes property taxes, insurance, vacancy, management, and financing. Use it to compare markets, then run a specific deal through a cap-rate or cash-flow calculator.`,
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Best Cash-Flow Markets', url: `${baseUrl}/reports/rental-yield` },
          { name: s.name, url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `${s.name} Rental Yield (${yieldMeta.year})`,
          description: `Gross rental yield and top metros in ${s.name}, from Census ACS ${yieldMeta.year} data.`,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports/rental-yield" className="transition-colors hover:text-primary">
          Best Cash-Flow Markets
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{s.name}</span>
      </nav>

      {/* Hero */}
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {yieldMeta.year} · {s.name}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Rental yield in {s.name}
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          In {yieldMeta.year}, the typical rental in {s.name} produced a gross yield of{' '}
          <strong className="text-text">{fmtYield(s.grossYield)}</strong> —{' '}
          {fmtRent(s.medianGrossRent)} median rent against a {fmtValue(s.medianHomeValue)}{' '}
          median home value
          {rank ? (
            <>
              , ranking <strong className="text-text">{ordinal(rank)}</strong> of {n} states
            </>
          ) : null}
          .
        </p>
      </header>

      {/* Stat grid */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat
          label="Gross rental yield"
          value={fmtYield(s.grossYield)}
          sub={
            vsNational == null
              ? undefined
              : `${vsNational ? 'above' : 'below'} the ${fmtYield(national.grossYield)} U.S. median`
          }
        />
        <Stat label="Median gross rent" value={fmtRent(s.medianGrossRent)} sub="incl. utilities (ACS)" />
        <Stat label="Median home value" value={fmtValue(s.medianHomeValue)} sub="owner-occupied (ACS)" />
      </section>

      {/* Metro chart */}
      {topMetros.length > 1 && (
        <section className="mt-12 max-w-2xl">
          <BrandBarChart
            title={`Highest-yield metros in ${s.name}`}
            subtitle={`Annual rent ÷ home value, top ${topMetros.length}`}
            unit="%"
            highlightTop={1}
            reference={{ value: (s.grossYield ?? 0) * 100, label: `${s.abbr} statewide` }}
            data={topMetros.map((m) => ({
              label: m.name,
              value: (m.grossYield ?? 0) * 100,
              display: fmtYield(m.grossYield),
            }))}
          />
        </section>
      )}

      {/* Metro table */}
      {topMetros.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-text">{s.name} metros by yield</h2>
          <p className="mt-1 text-text-muted">
            Metropolitan areas in {s.name} with at least 65,000 residents, ranked by gross
            rental yield.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Metro</th>
                  <th className="px-4 py-3 text-right font-medium">Gross yield</th>
                  <th className="px-4 py-3 text-right font-medium">Median rent</th>
                  <th className="px-4 py-3 text-right font-medium">Median value</th>
                </tr>
              </thead>
              <tbody>
                {metros.map((m) => (
                  <tr key={m.slug} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-text">{m.name}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-primary">{fmtYield(m.grossYield)}</td>
                    <td className="px-4 py-2.5 text-right text-text-muted">{fmtRent(m.medianGrossRent)}</td>
                    <td className="px-4 py-2.5 text-right text-text-muted">{fmtValue(m.medianHomeValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ */}
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

      {/* Pair with financing */}
      <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-bold text-text">How investors finance deals in {s.name}</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          Yield shows where the numbers work; our{' '}
          <Link
            href={`/reports/investor-financing/${s.slug}`}
            className="font-semibold text-primary hover:underline"
          >
            Investor Financing Report for {s.name}
          </Link>{' '}
          shows the rate premium, denial rate, and DSCR lending investors face there.
        </p>
      </section>

      {/* Cross-links */}
      <div className="mt-14">
        <CalculatorRelatedTools
          heading={`Run a ${s.name} deal`}
          tools={[
            { label: 'Cap Rate Calculator', href: '/calculators/cap-rate' },
            { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
            { label: 'All states ranked', href: '/reports/rental-yield' },
            { label: 'How we built this', href: '/reports/rental-yield/methodology', muted: true },
          ]}
        />
      </div>

      <p className="mt-10 text-xs text-text-muted">
        Source: {yieldMeta.source}. Gross rental yield = (median gross rent × 12) ÷
        median home value. A market screen, not a net return.
      </p>
    </div>
  )
}
