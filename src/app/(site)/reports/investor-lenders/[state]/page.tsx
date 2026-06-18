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
  getStateBySlug,
  lenderMeta,
  fmtCount,
  fmtUSD,
  fmtPct,
  lenderType,
  shortName,
} from '@/data/hmda-lenders'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-06-18'

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
  const lead = s.lenders[0]
  const title = `Most Active Investment-Property Lenders in ${s.name} (${lenderMeta.year})`
  const description = `The lenders that originated the most investment-property (single-family 1-4 unit) loans in ${s.name} in ${lenderMeta.year}${lead ? `, led by ${lead.name} (${fmtCount(lead.originations)})` : ''} — from HMDA data, with DSCR/business-purpose focus flagged.`
  return {
    title,
    description,
    alternates: { canonical: `/reports/investor-lenders/${s.slug}` },
    openGraph: { title, description },
  }
}

function TypeBadge({ l }: { l: { businessPurposeShare: number | null } }) {
  const t = lenderType(l as never)
  const cls =
    t === 'DSCR / business-purpose'
      ? 'bg-accent/15 text-primary-dark'
      : t === 'Conventional'
        ? 'bg-surface-alt text-text-muted'
        : 'bg-primary/10 text-primary'
  const label = t === 'DSCR / business-purpose' ? 'DSCR / biz' : t === 'Conventional' ? 'Conventional' : 'Mixed'
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{label}</span>
}

export default async function StateLendersPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) notFound()

  const url = `${baseUrl}/reports/investor-lenders/${s.slug}`
  const lenders = s.lenders
  const lead = lenders[0]
  const dscrLeaders = lenders.filter((l) => lenderType(l) === 'DSCR / business-purpose')
  const hasData = lenders.length > 0

  const faqs = [
    {
      question: `Who are the most active investment-property lenders in ${s.name}?`,
      answer: hasData
        ? `By ${lenderMeta.year} HMDA-reported volume, the most active investment-property (single-family 1-4 unit) lenders in ${s.name} were ${lead.name} (${fmtCount(lead.originations)} originations)${lenders[1] ? `, ${lenders[1].name} (${fmtCount(lenders[1].originations)})` : ''}${lenders[2] ? `, and ${lenders[2].name} (${fmtCount(lenders[2].originations)})` : ''}. ${fmtCount(s.totalInvestorOriginations)} investor loans were originated statewide.`
        : `${s.name} had too few reported investment-property originations above our listing threshold to rank lenders reliably.`,
    },
    {
      question: `Which ${s.name} lenders focus on DSCR / business-purpose loans?`,
      answer: dscrLeaders.length
        ? `Lenders whose ${s.name} investor loans are mostly business- or commercial-purpose (the DSCR/LLC bucket) include ${dscrLeaders.slice(0, 4).map((l) => l.name).join(', ')}. Each lender's mix is flagged in the table.`
        : `Among the listed ${s.name} lenders, none had a majority of business-purpose investor loans — the market here skews conventional.`,
    },
    {
      question: 'Is this a ranking of the best lenders?',
      answer: `No — it ranks HMDA-reported origination volume, not rate, service, or terms. HMDA omits non-reporting private/hard-money lenders and under-captures business-purpose loans. Use it as a research starting point, not a recommendation.`,
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Most Active Investment-Property Lenders', url: `${baseUrl}/reports/investor-lenders` },
          { name: s.name, url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `Most Active Investment-Property Lenders in ${s.name} (${lenderMeta.year})`,
          description: `Top investment-property mortgage lenders in ${s.name}, from ${lenderMeta.year} HMDA data.`,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports/investor-lenders" className="transition-colors hover:text-primary">
          Most Active Investment-Property Lenders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{s.name}</span>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {lenderMeta.year} · {s.name}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Most active investment-property lenders in {s.name}
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          {hasData ? (
            <>
              In {lenderMeta.year}, {fmtCount(s.totalInvestorOriginations)} investment-property
              loans were originated on single-family 1-4 unit homes in {s.name}. These are the
              lenders that wrote the most of them, by HMDA-reported volume.
            </>
          ) : (
            <>
              {s.name} had too few reported investment-property originations above our listing
              threshold to rank lenders reliably in {lenderMeta.year}.
            </>
          )}
        </p>
      </header>

      {hasData && (
        <>
          {/* Chart */}
          {lenders.length > 1 && (
            <section className="mt-12">
              <BrandBarChart
                title={`Most active investor lenders in ${s.name}`}
                subtitle={`Investor originations, ${lenderMeta.year}, top ${lenders.length}`}
                unit=""
                highlightTop={3}
                data={lenders.map((l) => ({
                  label: shortName(l.name),
                  value: l.originations,
                  display: fmtCount(l.originations),
                }))}
              />
            </section>
          )}

          {/* Table */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-text">{s.name} lender rankings</h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Lender</th>
                    <th className="px-4 py-3 font-medium">Focus</th>
                    <th className="px-4 py-3 text-right font-medium">Originations</th>
                    <th className="px-4 py-3 text-right font-medium">Volume</th>
                    <th className="px-4 py-3 text-right font-medium">Biz-purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {lenders.map((l) => (
                    <tr key={l.lei} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-2.5 text-text-muted">{l.rank}</td>
                      <td className="px-4 py-2.5 font-medium text-text">{l.name}</td>
                      <td className="px-4 py-2.5"><TypeBadge l={l} /></td>
                      <td className="px-4 py-2.5 text-right font-semibold text-primary">{fmtCount(l.originations)}</td>
                      <td className="px-4 py-2.5 text-right text-text-muted">{fmtUSD(l.volume)}</td>
                      <td className="px-4 py-2.5 text-right text-text-muted">{fmtPct(l.businessPurposeShare)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-text-muted">
              Lenders with at least {lenderMeta.minOriginations} reported investor originations in {s.name}, top {lenderMeta.topPerState}.
            </p>
          </section>
        </>
      )}

      {/* Trilogy cross-links */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">How investors borrow in {s.name}</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            The rate premium, denial rate, and DSCR share in {s.name} —{' '}
            <Link href={`/reports/investor-financing/${s.slug}`} className="font-semibold text-primary hover:underline">
              Investor Financing Report
            </Link>
            .
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Where {s.name} cash-flows</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Gross rental yield and top metros in {s.name} —{' '}
            <Link href={`/reports/rental-yield/${s.slug}`} className="font-semibold text-primary hover:underline">
              Best Cash-Flow Markets
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
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

      {/* Reverse link into the lender directory */}
      <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-bold text-text">Compare lenders serving {s.name}</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          This ranks reported volume. To compare rates, LTV, and terms from lenders that
          actively lend in {s.name}, browse our directory:{' '}
          <Link href={`/lenders/dscr-loans/${s.slug}`} className="font-semibold text-primary hover:underline">
            DSCR lenders
          </Link>
          ,{' '}
          <Link href={`/lenders/hard-money-loans/${s.slug}`} className="font-semibold text-primary hover:underline">
            hard money
          </Link>
          , and{' '}
          <Link href={`/lenders/fix-and-flip-loans/${s.slug}`} className="font-semibold text-primary hover:underline">
            fix-and-flip
          </Link>{' '}
          lenders in {s.name}.
        </p>
      </section>

      <div className="mt-14">
        <CalculatorRelatedTools
          heading={`Run a ${s.name} deal`}
          tools={[
            { label: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
            { label: 'Hard Money / Fix-Flip', href: '/calculators/hard-money' },
            { label: 'All states ranked', href: '/reports/investor-lenders' },
            { label: 'How we built this', href: '/reports/investor-lenders/methodology', muted: true },
          ]}
        />
      </div>

      <p className="mt-10 text-xs text-text-muted">
        Source: {lenderMeta.source}, {lenderMeta.year}. Most active by reported volume, not a
        quality ranking. {lenderMeta.nameNote}
      </p>
    </div>
  )
}
