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
import { NewsletterSignup } from '@/components/newsletter-signup'
import {
  rhfsMeta,
  current,
  previous,
  trend,
  entitiesByProp,
  entitiesByUnit,
  institutionalPropShare2024,
  fmtPct,
  fmtPp,
  fmtMillions,
  fmtMoney,
} from '@/data/rhfs'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
const PUBLISHED = '2026-07-17'
const csvHref = `/data/rental-ownership-${rhfsMeta.curYear}.csv`
const url = `${baseUrl}/reports/rental-ownership`

const CENSUS_SOURCE = {
  name: 'U.S. Census Bureau (Rental Housing Finance Survey)',
  url: 'https://www.census.gov/programs-surveys/rhfs.html',
}

const ind = current.individual
const llc = current.llc
const debtFreeShare = current.financing.debtPropShare != null ? 100 - current.financing.debtPropShare : null
const institutionalPrev = previous.individual.propShare != null && previous.nonreportedOwnershipShare != null
  ? Math.round((100 - previous.individual.propShare - previous.nonreportedOwnershipShare) * 10) / 10
  : null

export const metadata: Metadata = {
  title: `The American Rental Ownership Report: Who Owns U.S. Rental Housing (${rhfsMeta.curYear})`,
  description: `Who owns America's rental housing — individual investors' share of rental properties fell to ${fmtPct(ind.propShare)} in ${rhfsMeta.curYear} from ${fmtPct(previous.individual.propShare)} in ${rhfsMeta.prevYear}, while LLCs now own more rental units than individuals. Built on Census RHFS microdata. Free and downloadable.`,
  alternates: { canonical: '/reports/rental-ownership' },
  openGraph: {
    title: `The American Rental Ownership Report (${rhfsMeta.curYear})`,
    description: `Individual investors are handing rental America to LLCs. A property-vs-unit view of who owns U.S. rentals and how they finance them, from Census Rental Housing Finance Survey microdata.`,
  },
}

const sizeSingle = current.sizes.find((s) => s.code === 0)
const sizeLarge = current.sizes.find((s) => s.code === 4)

const faqs = [
  {
    question: 'Who owns most rental property in America?',
    answer: `Individual investors still own the most rental properties — ${fmtPct(ind.propShare)} of all U.S. rental properties in ${rhfsMeta.curYear} — but their share has fallen sharply from ${fmtPct(previous.individual.propShare)} in ${rhfsMeta.prevYear}. Counted by rental units instead of properties, LLCs, LPs, and LLPs (${fmtPct(llc.unitShare)}) now own more than individuals (${fmtPct(ind.unitShare)}), because business entities own the larger buildings. Source: ${rhfsMeta.source}.`,
  },
  {
    question: 'Are individual "mom-and-pop" investors leaving the rental market?',
    answer: `Their share is shrinking, not necessarily their count. The individual-investor share of rental properties dropped ${fmtPp(previous.individual.propShare, ind.propShare)} between ${rhfsMeta.prevYear} and ${rhfsMeta.curYear}, while LLP/LP/LLC ownership rose from ${fmtPct(previous.llc.propShare)} to ${fmtPct(llc.propShare)}. Some of that shift is mom-and-pop owners re-titling their own properties into LLCs for liability protection, and some is genuine consolidation by larger operators. Part of the measured drop also reflects rising nonresponse (owners who didn't report an entity rose to ${fmtPct(current.nonreportedOwnershipShare)} of properties).`,
  },
  {
    question: 'Do individuals or LLCs own more rental housing?',
    answer: `It depends on what you count. By number of rental properties, individual investors still lead (${fmtPct(ind.propShare)} vs ${fmtPct(llc.propShare)} for LLP/LP/LLCs in ${rhfsMeta.curYear}). But by number of rental units, LLP/LP/LLCs are now ahead — ${fmtPct(llc.unitShare)} of units versus ${fmtPct(ind.unitShare)} for individuals — because business entities own the larger buildings. These figures cover all rental properties, not only single-family homes; a single-family-only view still shows individuals leading, which is why some analyses read as "individuals dominate." Source: ${rhfsMeta.source}, property- and unit-weighted.`,
  },
  {
    question: 'Do most landlords have a mortgage?',
    answer: `No. Only ${fmtPct(current.financing.debtPropShare)} of U.S. rental properties carried mortgage or other debt in ${rhfsMeta.curYear} — about ${fmtPct(debtFreeShare, 0)} are owned free and clear (among properties reporting debt status). Larger properties are far more likely to be financed, so on a per-unit basis ${fmtPct(current.financing.debtUnitShare)} of rental units carry debt.`,
  },
  {
    question: 'What is the Rental Housing Finance Survey?',
    answer: `The Rental Housing Finance Survey (RHFS) is a national survey by the U.S. Census Bureau (sponsored by HUD) of the ownership, financing, and characteristics of U.S. rental properties. It is the most comprehensive public view of who owns rental housing and how it is financed. This report uses the ${rhfsMeta.waves.join(', ')} public-use microdata, property-weighted. Figures are national; the survey does not publish state or metro detail.`,
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

export default function RentalOwnershipReport() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Reports', url: `${baseUrl}/reports` },
          { name: 'The American Rental Ownership Report', url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: `The American Rental Ownership Report (${rhfsMeta.curYear})`,
          description: metadata.description as string,
          url,
          publishedAt: PUBLISHED,
          authorName: 'Bill Rice',
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          name: `The American Rental Ownership Report — who owns U.S. rental housing and how it's financed (${rhfsMeta.waves.join(', ')})`,
          description: `Ownership entity, financing, size, and value of U.S. rental properties — property- and unit-weighted — derived from the U.S. Census Bureau Rental Housing Finance Survey (RHFS) public-use microdata for ${rhfsMeta.waves.join(', ')}.`,
          url,
          downloadUrl: `${baseUrl}${csvHref}`,
          temporalCoverage: `${rhfsMeta.prevYear}/${rhfsMeta.curYear}`,
          datePublished: PUBLISHED,
          sourceOrganization: CENSUS_SOURCE,
        })}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">The American Rental Ownership Report</span>
      </nav>

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          ProInvestorHub Data Report · {rhfsMeta.curYear}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          The American Rental Ownership Report
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          Who actually owns America&apos;s rental housing — and how they finance it?
          Using the Census Bureau&apos;s {rhfsMeta.curYear} Rental Housing Finance Survey
          (the most complete public picture of rental ownership, with {rhfsMeta.prevYear} and{' '}
          {rhfsMeta.waves[1]} for the trend), this report tracks the shift from
          individual &ldquo;mom-and-pop&rdquo; owners toward LLCs and larger operators — and the
          gap between who owns the <em>properties</em> and who owns the <em>units</em>.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Individual share of rental properties"
          value={fmtPct(ind.propShare)}
          sub={`${rhfsMeta.curYear} · down from ${fmtPct(previous.individual.propShare)} in ${rhfsMeta.prevYear} (${fmtPp(previous.individual.propShare, ind.propShare)})`}
        />
        <Stat
          label="LLP/LP/LLC share of properties"
          value={fmtPct(llc.propShare)}
          sub={`up from ${fmtPct(previous.llc.propShare)} in ${rhfsMeta.prevYear} (${fmtPp(previous.llc.propShare, llc.propShare)})`}
        />
        <Stat
          label="LLC share of rental units"
          value={fmtPct(llc.unitShare)}
          sub={`vs ${fmtPct(ind.unitShare)} for individuals — LLCs own more units`}
        />
        <Stat
          label="Rental properties owned free & clear"
          value={fmtPct(debtFreeShare, 0)}
          sub={`only ${fmtPct(current.financing.debtPropShare)} carry a mortgage`}
        />
      </section>

      <KeyTakeaways
        title="Key findings"
        className="mt-12 max-w-3xl"
        points={[
          <>
            Individual investors owned <strong>{fmtPct(ind.propShare)}</strong> of U.S.
            rental properties in {rhfsMeta.curYear}, down from{' '}
            {fmtPct(previous.individual.propShare)} in {rhfsMeta.prevYear} — a{' '}
            {fmtPp(previous.individual.propShare, ind.propShare)} slide in six years
            (Census Rental Housing Finance Survey, property-weighted).
          </>,
          <>
            Ownership through <strong>LLPs, LPs, and LLCs</strong> rose from{' '}
            {fmtPct(previous.llc.propShare)} to {fmtPct(llc.propShare)} of rental
            properties over the same period, and business/institutional entities together
            now hold roughly {fmtPct(institutionalPropShare2024, 0)} of properties, up from
            about {fmtPct(institutionalPrev, 0)} in {rhfsMeta.prevYear}.
          </>,
          <>
            Counted by rental <strong>units</strong> rather than properties, LLC/LP/LLPs
            ({fmtPct(llc.unitShare)}) now own <strong>more than individuals</strong> (
            {fmtPct(ind.unitShare)}) — individuals own the most <em>properties</em>, but
            entities own the most <em>doors</em>.
          </>,
          <>
            Most rental property carries no debt: only{' '}
            <strong>{fmtPct(current.financing.debtPropShare)}</strong> of rental
            properties had a mortgage or other debt in {rhfsMeta.curYear}, so roughly{' '}
            {fmtPct(debtFreeShare, 0)} are owned free and clear.
          </>,
          sizeSingle && sizeLarge ? (
            <>
              <strong>{fmtPct(sizeSingle.propShare)}</strong> of rental properties are
              single-unit homes, but <strong>{fmtPct(sizeLarge.unitShare)}</strong> of all
              rental <em>units</em> sit in buildings of 50+ units — the small-property,
              big-building split of U.S. rental housing.
            </>
          ) : null,
        ]}
      />

      {/* The decline over time */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text">The mom-and-pop share is shrinking</h2>
        <p className="mt-2 max-w-3xl leading-7 text-text-muted">
          Across three survey waves, the individual-investor share of rental properties
          has fallen while entity ownership climbed. The steepest drop came between{' '}
          {rhfsMeta.waves[1]} and {rhfsMeta.curYear}.
        </p>
        <div className="mt-6">
          <BrandBarChart
            title="Individual-investor share of rental properties"
            subtitle={`Percent of all U.S. rental properties, by survey wave`}
            source={`Source: Census Rental Housing Finance Survey · proinvestorhub.com`}
            data={trend.map((t) => ({
              label: String(t.year),
              value: t.individualPropShare ?? 0,
              display: fmtPct(t.individualPropShare),
            }))}
          />
        </div>
      </section>

      {/* Properties vs units — the flip */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text">Who owns the properties vs. who owns the units</h2>
        <p className="mt-2 max-w-3xl leading-7 text-text-muted">
          The headline flips depending on what you count. Individuals dominate the
          property count; business entities dominate the unit count, because they own the
          larger buildings. Both charts are {rhfsMeta.curYear}. Note this covers{' '}
          <em>all</em> rental properties — a single-family-only view still shows individuals
          ahead even by units, which is why some analyses read as &ldquo;individuals still
          dominate.&rdquo;
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <BrandBarChart
            title="Share of rental properties"
            subtitle={`${rhfsMeta.curYear} · by ownership entity`}
            highlightTop={1}
            source={`Source: Census RHFS ${rhfsMeta.curYear} · proinvestorhub.com`}
            data={entitiesByProp.slice(0, 6).map((e) => ({
              label: e.label,
              value: e.propShare ?? 0,
              display: fmtPct(e.propShare),
            }))}
          />
          <BrandBarChart
            title="Share of rental units"
            subtitle={`${rhfsMeta.curYear} · by ownership entity`}
            highlightTop={1}
            source={`Source: Census RHFS ${rhfsMeta.curYear} · proinvestorhub.com`}
            data={entitiesByUnit.slice(0, 6).map((e) => ({
              label: e.label,
              value: e.unitShare ?? 0,
              display: fmtPct(e.unitShare),
            }))}
          />
        </div>
      </section>

      {/* Contextual lead capture — non-blocking; the dataset stays a free download. */}
      <section className="mt-14">
        <NewsletterSignup
          variant="banner"
          source="report-rental-ownership"
          heading="Get the next data report"
          description="New investor-market data reports built on primary sources — like this one — the week they publish. Free, no spam."
        />
      </section>

      {/* Full ownership table */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-text">Ownership by entity, {rhfsMeta.curYear}</h2>
            <p className="mt-1 text-text-muted">
              Every ownership category, by share of properties and share of units.
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
                <th className="px-4 py-3 font-medium">Ownership entity</th>
                <th className="px-4 py-3 text-right font-medium">Share of properties</th>
                <th className="px-4 py-3 text-right font-medium">Share of units</th>
              </tr>
            </thead>
            <tbody>
              {entitiesByProp.map((e) => (
                <tr key={e.code} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-text">{e.label}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-primary">{fmtPct(e.propShare)}</td>
                  <td className="px-4 py-2.5 text-right text-text-muted">{fmtPct(e.unitShare)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Shares are property-weighted and include the &ldquo;not reported&rdquo; ownership
          category ({fmtPct(current.nonreportedOwnershipShare)} of properties in{' '}
          {rhfsMeta.curYear}) in the denominator, so columns do not sum to 100%.
        </p>
      </section>

      {/* Small properties, big buildings */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">Small properties, big buildings</h2>
        <p className="mt-2 leading-7 text-text-muted">
          U.S. rental housing is overwhelmingly single-unit <em>properties</em>, but the
          <em> units</em> are concentrated in large buildings — which is why the ownership
          picture changes so much depending on what you count.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Property size</th>
                <th className="px-4 py-3 text-right font-medium">Share of properties</th>
                <th className="px-4 py-3 text-right font-medium">Share of units</th>
              </tr>
            </thead>
            <tbody>
              {current.sizes.map((s) => (
                <tr key={s.code} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-text">{s.label}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-primary">{fmtPct(s.propShare)}</td>
                  <td className="px-4 py-2.5 text-right text-text-muted">{fmtPct(s.unitShare)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Value + financing */}
      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Value &amp; equity</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            The median rental property was worth{' '}
            <strong className="text-text">{fmtMoney(current.value.medianMarketValue)}</strong> in{' '}
            {rhfsMeta.curYear} against a median purchase price of{' '}
            {fmtMoney(current.value.medianPurchasePrice)} — a large embedded-equity gap that
            helps explain why so many owners hold free and clear. In {rhfsMeta.prevYear} the
            median value was {fmtMoney(previous.value.medianMarketValue)}.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Financing</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Only {fmtPct(current.financing.debtPropShare)} of rental properties carry
            mortgage or other debt, but because larger buildings are more likely to be
            financed, {fmtPct(current.financing.debtUnitShare)} of rental <em>units</em>
            {' '}sit in a property with debt. See how investors borrow in the{' '}
            <Link href="/reports/investor-financing" className="font-semibold text-primary hover:underline">
              Investor Financing Report
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Methodology + citation */}
      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">How we built this</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Source: {rhfsMeta.source} ({rhfsMeta.waves.join(', ')}). We compute every
            estimate directly from the public-use microdata, weighted by the property
            weight so results represent all U.S. rental properties (unit figures weight by
            property weight × units). Our weighted totals reconcile to the Census-published
            universe of about {fmtMillions(current.propertyTotal)} rental properties and{' '}
            {fmtMillions(current.unitTotal)} units in {rhfsMeta.curYear}. {rhfsMeta.note}{' '}
            Figures are national — the survey publishes no state or metro detail.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-text">Pair it with the numbers</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Ownership is the macro backdrop; whether a specific deal works comes down to
            price, rent, and financing. See where rent goes furthest against price in our{' '}
            <Link href="/reports/rental-yield" className="font-semibold text-primary hover:underline">
              Best Cash-Flow Markets
            </Link>{' '}
            report, and where rents are climbing in{' '}
            <Link href="/reports/rent-growth" className="font-semibold text-primary hover:underline">
              Where Rents Are Rising Fastest
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
