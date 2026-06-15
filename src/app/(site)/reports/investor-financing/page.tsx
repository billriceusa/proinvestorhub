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
import { InvestorUsMap } from '@/components/reports/investor-us-map'
import { InvestorRankingsTable } from '@/components/reports/investor-rankings-table'
import { BrandBarChart } from '@/components/reports/brand-bar-chart'
import { YearOverYear } from '@/components/reports/year-over-year'
import {
  national,
  states,
  reportMeta,
  rankedBy,
  fmtBps,
  fmtPct,
  fmtRate,
  fmtCount,
  fmtUSD,
} from '@/data/hmda-investor'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-06-14'
const csvHref = `/data/investor-financing-${reportMeta.year}.csv`
const url = `${baseUrl}/reports/investor-financing`

export const metadata: Metadata = {
  title: `How Real Estate Investors Finance Deals: The ${reportMeta.year} Investor Financing Report`,
  description: `A 50-state analysis of ${reportMeta.year} HMDA mortgage data: the rate premium investors pay over owner-occupants, denial rates, DSCR/business-purpose lending, and leverage — ranked by state.`,
  alternates: { canonical: '/reports/investor-financing' },
  openGraph: {
    title: `The ${reportMeta.year} Investor Financing Report`,
    description: `How, where, and at what cost real estate investors finance deals — a 50-state analysis of HMDA mortgage data.`,
  },
}

const premiumHigh = rankedBy('ratePremiumBps')
const denialHigh = rankedBy('denialRate')
const dscrHigh = rankedBy('businessPurposeShare')

const faqs = [
  {
    question: 'How much more do real estate investors pay for a mortgage?',
    answer: `In ${reportMeta.year}, the median interest rate on an investment-property loan was ${fmtRate(national.investorMedianRate)} versus ${fmtRate(national.ownerMedianRate)} for an owner-occupant — a premium of ${fmtBps(national.ratePremiumBps)}. The gap is widest in ${premiumHigh[0].name} (${fmtBps(premiumHigh[0].ratePremiumBps)}) and narrowest in ${premiumHigh[premiumHigh.length - 1].name} (${fmtBps(premiumHigh[premiumHigh.length - 1].ratePremiumBps)}).`,
  },
  {
    question: 'How often are investor mortgage applications denied?',
    answer: `Nationally, ${fmtPct(national.denialRate)} of investment-property loan applications were denied in ${reportMeta.year}, compared with a much lower rate for primary residences. Denials are highest in ${denialHigh[0].name} (${fmtPct(denialHigh[0].denialRate)}).`,
  },
  {
    question: 'What share of investor loans are DSCR or business-purpose loans?',
    answer: `About ${fmtPct(national.businessPurposeShare, 0)} of investment-property loans were flagged as primarily business or commercial purpose — the category that includes DSCR and LLC-held investor loans. That share exceeds ${fmtPct(dscrHigh[0].businessPurposeShare, 0)} in ${dscrHigh[0].name}.`,
  },
  {
    question: 'What data is this report based on?',
    answer: `Home Mortgage Disclosure Act (HMDA) loan-level data published by the CFPB, covering ${reportMeta.year}. The universe is single-family 1-4 unit, site-built home-purchase, refinance, and cash-out loans. It reflects financed purchases only — all-cash investor purchases are not captured.`,
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

export default function InvestorFinancingReport() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'Investor Financing Report', url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `The ${reportMeta.year} Investor Financing Report`,
          description: metadata.description as string,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `${reportMeta.year} U.S. Investor Financing Report — state-level data`,
          description: `State-level metrics on how real estate investors finance single-family 1-4 unit properties: investor rate premium over owner-occupants, denial rates, investor share of originations, median LTV, and DSCR/business-purpose share. Derived from CFPB HMDA ${reportMeta.year} loan-level data.`,
          url,
          downloadUrl: `${baseUrl}${csvHref}`,
          temporalCoverage: String(reportMeta.year),
          datePublished: PUBLISHED,
        })}
      />

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Investor Financing Report</span>
      </nav>

      {/* Hero */}
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          ProInvestorHub Data Report · {reportMeta.year}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          How Real Estate Investors Finance Deals
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          Real estate investors borrow on different terms than the families they
          compete with. Using {reportMeta.year} federal mortgage data covering
          every state, this report measures the premium investors pay, how often
          they&apos;re denied, how much they borrow through DSCR and business-purpose
          loans, and where each of those is hardest.
        </p>
      </header>

      {/* National headline stats */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Investor rate premium"
          value={fmtBps(national.ratePremiumBps)}
          sub={`${fmtRate(national.investorMedianRate)} vs ${fmtRate(national.ownerMedianRate)} owner-occupant`}
        />
        <Stat label="Investor denial rate" value={fmtPct(national.denialRate)} sub="of applications denied" />
        <Stat
          label="DSCR / business-purpose"
          value={fmtPct(national.businessPurposeShare, 0)}
          sub="of investor loans"
        />
        <Stat
          label="Investor loans"
          value={fmtCount(national.investorOriginations)}
          sub={`${fmtUSD(national.investorVolume)} financed`}
        />
      </section>

      {/* Key findings */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">Key findings</h2>
        <ul className="mt-4 space-y-3 leading-7 text-text-muted">
          <li className="flex gap-2">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              Investors paid a median{' '}
              <strong className="text-text">{fmtBps(national.ratePremiumBps)}</strong>{' '}
              more than owner-occupants nationally — widest in{' '}
              <strong className="text-text">{premiumHigh[0].name}</strong> ({fmtBps(premiumHigh[0].ratePremiumBps)})
              and tightest in{' '}
              <strong className="text-text">{premiumHigh[premiumHigh.length - 1].name}</strong> ({fmtBps(premiumHigh[premiumHigh.length - 1].ratePremiumBps)}).
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="text-text">{denialHigh[0].name}</strong> denied the
              largest share of investor applications ({fmtPct(denialHigh[0].denialRate)}),
              followed by {denialHigh[1].name} and {denialHigh[2].name}.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              Business-purpose lending — the bucket that captures DSCR and LLC-held
              investor loans — is most concentrated in{' '}
              <strong className="text-text">{dscrHigh[0].name}</strong> ({fmtPct(dscrHigh[0].businessPurposeShare, 0)}),
              {' '}{dscrHigh[1].name}, and {dscrHigh[2].name}.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              The typical investor borrowed at a{' '}
              <strong className="text-text">{national.investorMedianLtv?.toFixed(0)}% LTV</strong>{' '}
              — meaning roughly {(100 - (national.investorMedianLtv ?? 0)).toFixed(0)}% down.
            </span>
          </li>
        </ul>
      </section>

      {/* Year-over-year trend */}
      <YearOverYear />

      {/* Charts */}
      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <BrandBarChart
          title="Where investors pay the biggest rate premium"
          subtitle="Investor median rate minus owner-occupant median rate, top 15 states"
          unit=" bps"
          highlightTop={3}
          reference={{ value: national.ratePremiumBps ?? 0, label: 'U.S. median' }}
          data={premiumHigh.slice(0, 15).map((s) => ({
            label: s.name,
            value: s.ratePremiumBps ?? 0,
            display: String(s.ratePremiumBps ?? 0),
          }))}
        />
        <BrandBarChart
          title="Where investor loans are denied most"
          subtitle="Share of investment-property applications denied, top 15 states"
          highlightTop={3}
          reference={{
            value: (national.denialRate ?? 0) * 100,
            label: 'U.S. median',
          }}
          data={denialHigh.slice(0, 15).map((s) => ({
            label: s.name,
            value: (s.denialRate ?? 0) * 100,
            display: fmtPct(s.denialRate),
          }))}
        />
      </section>

      {/* Map */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text">The map</h2>
        <p className="mt-1 max-w-2xl text-text-muted">
          Switch metrics to see where investor financing is most expensive, most
          often denied, and most DSCR-driven. Click a state for its full breakdown.
        </p>
        <div className="mt-6 rounded-2xl border border-border bg-white p-5 sm:p-7">
          <InvestorUsMap states={states} />
        </div>
      </section>

      {/* Rankings table */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-text">Full state rankings</h2>
            <p className="mt-1 text-text-muted">Sort by any column. Click a state to open its report.</p>
          </div>
          <a
            href={csvHref}
            download
            className="rounded-full border border-primary bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Download the data (CSV) →
          </a>
        </div>
        <div className="mt-6">
          <InvestorRankingsTable states={states} />
        </div>
      </section>

      {/* Methodology + citation */}
      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">How we built this</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Derived from {reportMeta.source}. Universe: {reportMeta.universe.toLowerCase()}.
            HMDA captures financed loans only, so all-cash investor purchases are
            not included.
          </p>
          <Link
            href="/reports/investor-financing/methodology"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Full methodology &amp; sources →
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Cite this report</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Free to cite and link with attribution. The underlying state data is
            downloadable above.
          </p>
          <p className="mt-3 rounded-lg border border-border bg-white p-3 text-xs leading-5 text-text-muted">
            ProInvestorHub, &ldquo;The {reportMeta.year} Investor Financing Report,&rdquo;{' '}
            {url}
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

      {/* Related tools */}
      <div className="mt-14">
        <CalculatorRelatedTools
          heading="Run your own numbers"
          tools={[
            { label: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
            { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
            { label: 'Hard Money Calculator', href: '/calculators/hard-money' },
            { label: 'Complete Financing Guide', href: '/financing', muted: true },
          ]}
        />
      </div>
    </div>
  )
}
