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
  nationalLenders,
  nationalTotal,
  statesByVolume,
  lenderMeta,
  fmtCount,
  fmtUSD,
  fmtPct,
  lenderType,
  shortName,
} from '@/data/hmda-lenders'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-06-18'
const csvHref = `/data/investor-lenders-${lenderMeta.year}.csv`
const url = `${baseUrl}/reports/investor-lenders`

export const metadata: Metadata = {
  title: `Most Active Investment-Property Lenders by State (${lenderMeta.year})`,
  description: `Which lenders originate the most investment-property (single-family 1-4 unit) mortgages in each state, ranked by ${lenderMeta.year} HMDA-reported volume — including which are DSCR/business-purpose focused. Free and downloadable.`,
  alternates: { canonical: '/reports/investor-lenders' },
  openGraph: {
    title: `Most Active Investment-Property Lenders by State (${lenderMeta.year})`,
    description: `A public-data ranking of the most active investment-property mortgage lenders, nationally and in all 50 states + DC.`,
  },
}

const top12 = nationalLenders.slice(0, 12)
const dscrLeaders = nationalLenders.filter((l) => lenderType(l) === 'DSCR / business-purpose').slice(0, 5)

const faqs = [
  {
    question: 'Who originates the most investment-property loans in the U.S.?',
    answer: `By ${lenderMeta.year} HMDA-reported volume, the most active investment-property (single-family 1-4 unit) lenders were ${nationalLenders[0]?.name} (${fmtCount(nationalLenders[0]?.originations ?? 0)} originations), ${nationalLenders[1]?.name} (${fmtCount(nationalLenders[1]?.originations ?? 0)}), and ${nationalLenders[2]?.name} (${fmtCount(nationalLenders[2]?.originations ?? 0)}). Across ${fmtCount(lenderMeta.distinctLenders)} reporting lenders, ${fmtCount(nationalTotal)} investor loans were originated.`,
  },
  {
    question: 'Does "most active" mean these are the best lenders?',
    answer: `No. This ranks lenders by HMDA-reported origination volume, not by rate, service, or terms. HMDA also omits many private and hard-money lenders that do not report, and under-captures business-purpose loans — so it is a map of the reported mortgage market, not the full lender universe or a quality ranking.`,
  },
  {
    question: 'Which lenders focus on DSCR / business-purpose investor loans?',
    answer: dscrLeaders.length
      ? `Lenders where most investor originations are flagged business- or commercial-purpose (the bucket that includes DSCR and LLC-held loans) include ${dscrLeaders.map((l) => l.name).join(', ')}. We label each lender's mix on the tables below.`
      : '',
  },
  {
    question: 'What data is this based on?',
    answer: `${lenderMeta.source}. We count originated home-purchase, refinance, and cash-out loans on investor-occupied single-family 1-4 unit, site-built properties, grouped by the reporting institution's LEI and resolved to names via the HMDA filers registry.`,
  },
]

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

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium text-text">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-text-muted">{sub}</p>}
    </div>
  )
}

export default function InvestorLendersReport() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Most Active Investment-Property Lenders', url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `Most Active Investment-Property Lenders by State (${lenderMeta.year})`,
          description: metadata.description as string,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `${lenderMeta.year} Most Active Investment-Property Lenders — national & state`,
          description: `Investment-property (SF 1-4 unit) mortgage originations by lender, nationally and per state, derived from CFPB HMDA ${lenderMeta.year} Modified LAR data.`,
          url,
          downloadUrl: `${baseUrl}${csvHref}`,
          temporalCoverage: String(lenderMeta.year),
          datePublished: PUBLISHED,
        })}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Most Active Investment-Property Lenders</span>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          ProInvestorHub Data Report · {lenderMeta.year}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Most active investment-property lenders by state
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          Which institutions actually finance investor deals? Using {lenderMeta.year} HMDA
          mortgage data, this report ranks the lenders that originated the most
          investment-property loans — single-family 1-4 unit homes — nationally and in
          every state, and flags which ones lean DSCR / business-purpose.
        </p>
      </header>

      {/* Integrity caveat — headlined, not buried */}
      <section className="mt-8 rounded-2xl border border-accent bg-accent/10 p-5">
        <h2 className="text-base font-bold text-text">What this ranking is — and isn&apos;t</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          This is &ldquo;most active by HMDA-reported volume,&rdquo; <strong className="text-text">not
          &ldquo;best.&rdquo;</strong> It does not rank rate, service, or terms. HMDA omits many
          private and hard-money lenders that don&apos;t report, and under-captures business-purpose
          loans — so treat this as a map of the reported mortgage market, a starting list to
          research, not a recommendation.{' '}
          <Link href="/reports/investor-lenders/methodology" className="font-semibold text-primary hover:underline">
            Full methodology →
          </Link>
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Investor loans analyzed" value={fmtCount(nationalTotal)} sub={`${lenderMeta.year}, SF 1-4 unit`} />
        <Stat label="Reporting lenders" value={fmtCount(lenderMeta.distinctLenders)} sub="distinct institutions" />
        <Stat label="Most active" value={nationalLenders[0]?.name ?? '—'} sub={`${fmtCount(nationalLenders[0]?.originations ?? 0)} investor originations`} />
      </section>

      {nationalLenders.length > 0 && (
        <KeyTakeaways
          title="Key findings"
          className="mt-12 max-w-3xl"
          points={[
            <>
              The most active investment-property lender in {lenderMeta.year} was{' '}
              <strong>{nationalLenders[0]?.name}</strong> with{' '}
              {fmtCount(nationalLenders[0]?.originations ?? 0)} single-family 1–4 unit
              investor originations, followed by {nationalLenders[1]?.name} (
              {fmtCount(nationalLenders[1]?.originations ?? 0)}) and{' '}
              {nationalLenders[2]?.name} ({fmtCount(nationalLenders[2]?.originations ?? 0)}).
            </>,
            <>
              Across <strong>{fmtCount(lenderMeta.distinctLenders)}</strong> reporting
              institutions, {fmtCount(nationalTotal)} investment-property loans were
              originated in {lenderMeta.year} (CFPB HMDA data).
            </>,
            dscrLeaders.length > 0 ? (
              <>
                The most active DSCR / business-purpose investor lenders were{' '}
                <strong>{dscrLeaders[0]?.name}</strong>
                {dscrLeaders[1] ? <>, {dscrLeaders[1]?.name}</> : null}
                {dscrLeaders[2] ? <>, and {dscrLeaders[2]?.name}</> : null} — the
                lenders behind most LLC-held and no-income-verification investor loans.
              </>
            ) : null,
          ]}
        />
      )}

      {/* Top lenders chart */}
      <section className="mt-14">
        <BrandBarChart
          title="Most active investment-property lenders, nationwide"
          subtitle={`Investor originations, ${lenderMeta.year}, top 12`}
          unit=""
          highlightTop={3}
          data={top12.map((l) => ({
            label: shortName(l.name),
            value: l.originations,
            display: fmtCount(l.originations),
          }))}
        />
      </section>

      {/* National table */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-text">Top {nationalLenders.length} lenders nationwide</h2>
            <p className="mt-1 text-text-muted">By {lenderMeta.year} investor-loan originations.</p>
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
                <th className="px-4 py-3 font-medium">Lender</th>
                <th className="px-4 py-3 font-medium">Focus</th>
                <th className="px-4 py-3 text-right font-medium">Originations</th>
                <th className="px-4 py-3 text-right font-medium">Volume</th>
                <th className="px-4 py-3 text-right font-medium">Business-purpose</th>
              </tr>
            </thead>
            <tbody>
              {nationalLenders.map((l) => (
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
      </section>

      {/* State directory */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text">Browse by state</h2>
        <p className="mt-1 text-text-muted">The most active investor lenders in each state, largest markets first.</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
          {statesByVolume.map((s) => (
            <Link
              key={s.slug}
              href={`/reports/investor-lenders/${s.slug}`}
              className="flex items-baseline justify-between gap-2 border-b border-border/50 py-1.5 text-sm transition-colors hover:text-primary"
            >
              <span className="font-medium text-text">{s.name}</span>
              <span className="text-xs text-text-light">{fmtCount(s.totalInvestorOriginations)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cross-link trilogy */}
      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">How investors borrow</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            See the rate premium, denial rates, and DSCR share investors face in each state in
            the{' '}
            <Link href="/reports/investor-financing" className="font-semibold text-primary hover:underline">
              Investor Financing Report
            </Link>
            .
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Where it cash-flows</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Pair lender activity with{' '}
            <Link href="/reports/rental-yield" className="font-semibold text-primary hover:underline">
              gross rental yield by state
            </Link>{' '}
            to see where the deals actually pencil.
          </p>
        </div>
      </section>

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

      <div className="mt-14">
        <CalculatorRelatedTools
          heading="Run your numbers"
          tools={[
            { label: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
            { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
            { label: 'Hard Money / Fix-Flip', href: '/calculators/hard-money' },
            { label: 'How we built this', href: '/reports/investor-lenders/methodology', muted: true },
          ]}
        />
      </div>

      <p className="mt-10 text-xs text-text-muted">
        Source: {lenderMeta.source}, {lenderMeta.year}. {lenderMeta.nameNote}
      </p>
    </div>
  )
}
