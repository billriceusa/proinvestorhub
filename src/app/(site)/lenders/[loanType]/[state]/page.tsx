import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { loanTypes, getLoanTypeBySlug } from '@/data/loan-types'
import { lenders, getLendersByLoanType, formatCurrency } from '@/data/lenders'
import { usStates, getStateBySlug, stateInvestingContext } from '@/data/us-states'
import { LenderCard } from '@/components/lender-card'

type Props = { params: Promise<{ loanType: string; state: string }> }

export async function generateStaticParams() {
  const params: Array<{ loanType: string; state: string }> = []
  for (const lt of loanTypes) {
    for (const state of usStates) {
      params.push({ loanType: lt.slug, state: state.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { loanType: ltSlug, state: stateSlug } = await params
  const lt = getLoanTypeBySlug(ltSlug)
  const state = getStateBySlug(stateSlug)
  if (!lt || !state) return {}

  const title = `Best ${lt.shortName} Lenders in ${state.name} 2026 | ProInvestorHub`
  const description = `Compare ${lt.shortName} lenders serving ${state.name}. Side-by-side rates, LTV, credit requirements, and expert reviews for ${state.name} real estate investors.`

  return {
    title,
    description,
    alternates: { canonical: `/lenders/${ltSlug}/${stateSlug}` },
    openGraph: { title, description },
  }
}

const landlordLabels: Record<string, { label: string; color: string }> = {
  friendly: { label: 'Landlord-Friendly', color: 'text-green-700 bg-green-50 border-green-200' },
  moderate: { label: 'Moderate', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  strict: { label: 'Strict Regulations', color: 'text-red-700 bg-red-50 border-red-200' },
}

export default async function StateLoanTypePage({ params }: Props) {
  const { loanType: ltSlug, state: stateSlug } = await params
  const lt = getLoanTypeBySlug(ltSlug)
  const state = getStateBySlug(stateSlug)
  if (!lt || !state) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const context = stateInvestingContext[stateSlug]

  // Filter lenders: must offer this loan type AND serve this state
  const loanTypeLenders = getLendersByLoanType(ltSlug)
  const stateLenders = loanTypeLenders.filter(
    (l) => l.nationwide || !l.loanTypeSlugs // nationwide lenders always qualify
  )

  // Get other loan types for cross-linking
  const otherLoanTypes = loanTypes
    .filter((l) => l.slug !== ltSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 6)

  // Get neighboring states for cross-linking
  const regionStates = usStates
    .filter((s) => s.region === state.region && s.slug !== stateSlug)
    .slice(0, 8)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
          { name: lt.name, url: `${baseUrl}/lenders/${ltSlug}` },
          { name: state.name, url: `${baseUrl}/lenders/${ltSlug}/${stateSlug}` },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/lenders" className="hover:text-primary transition-colors">
          Lender Directory
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/lenders/${ltSlug}`} className="hover:text-primary transition-colors">
          {lt.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{state.name}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Best {lt.shortName} Lenders in {state.name} (2026)
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          Compare {lt.shortName.toLowerCase()} lenders serving {state.name} real estate investors.
          {stateLenders.length > 0
            ? ` We found ${stateLenders.length} lenders offering ${lt.name.toLowerCase()} in ${state.name} — see rates, LTV, credit requirements, and expert reviews below.`
            : ` Browse nationwide ${lt.shortName.toLowerCase()} lenders available to ${state.name} investors.`}
        </p>
      </div>

      {/* State Context Card */}
      {context && (
        <section className="mb-10 rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <h2 className="text-xl font-bold text-text">
              Investing in {state.name}
            </h2>
            <div className="flex gap-2">
              {context.noStateTax && (
                <span className="rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-700">
                  No State Income Tax
                </span>
              )}
              {landlordLabels[context.landlordFriendly] && (
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${landlordLabels[context.landlordFriendly].color}`}
                >
                  {landlordLabels[context.landlordFriendly].label}
                </span>
              )}
            </div>
          </div>
          <p className="text-text-muted leading-7 mb-4">{context.highlights}</p>
          {context.keyMarkets.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-light uppercase tracking-wide mb-2">
                Key Markets
              </p>
              <div className="flex flex-wrap gap-2">
                {context.keyMarkets.map((market) => (
                  <span
                    key={market}
                    className="rounded-full bg-surface-raised px-3 py-1 text-xs font-medium text-text-muted"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Quick Stats for this loan type */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10">
        {[
          { label: 'Typical Rates', value: lt.typicalRateRange },
          { label: 'Max LTV', value: lt.typicalLtvRange },
          { label: 'Typical Terms', value: lt.typicalTermRange },
          { label: 'Min Credit', value: lt.typicalMinCredit },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-white p-4 text-center"
          >
            <p className="text-xs text-text-light mb-1">{stat.label}</p>
            <p className="text-sm font-bold text-text">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Lender Comparison Table */}
      {stateLenders.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">
            {lt.shortName} Lenders Serving {state.name}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-8">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-raised">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-text">Lender</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Rates</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Max LTV</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Min Credit</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Loan Range</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Speed</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {stateLenders.map((lender) => (
                  <tr key={lender.slug} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/lenders/reviews/${lender.slug}`}
                        className="text-primary hover:text-primary-light transition-colors"
                      >
                        {lender.name}
                      </Link>
                      {lender.featured && (
                        <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {lender.minRate}%–{lender.maxRate}%
                    </td>
                    <td className="px-4 py-3 tabular-nums">{lender.maxLtv}%</td>
                    <td className="px-4 py-3 tabular-nums">{lender.minCreditScore}</td>
                    <td className="px-4 py-3 tabular-nums text-text-muted">
                      {formatCurrency(lender.minLoanAmount)}–{formatCurrency(lender.maxLoanAmount)}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{lender.speedToClose}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-primary">
                        {lender.editorRating.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lender Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stateLenders.map((lender) => (
              <LenderCard key={lender.slug} lender={lender} />
            ))}
          </div>
        </section>
      )}

      {/* About This Loan Type (abridged) */}
      <section className="max-w-3xl mb-10">
        <h2 className="text-xl font-bold text-text mb-4">
          About {lt.name} in {state.name}
        </h2>
        <p className="text-text-muted leading-7 mb-4">
          {lt.description}
        </p>
        <p className="text-text-muted leading-7">
          {state.name} real estate investors use {lt.name.toLowerCase()} for{' '}
          {lt.bestFor.slice(0, 2).join(' and ').toLowerCase()}.{' '}
          {context?.noStateTax
            ? `${state.name}'s lack of state income tax makes rental property returns even more attractive when combined with ${lt.shortName.toLowerCase()} financing.`
            : `Compare ${lt.shortName.toLowerCase()} terms from multiple lenders to find the best fit for your ${state.name} investment strategy.`}
        </p>
        <div className="mt-4">
          <Link
            href={`/lenders/${ltSlug}`}
            className="text-sm font-semibold text-primary hover:text-primary-light transition-colors"
          >
            Read our full guide to {lt.name} &rarr;
          </Link>
        </div>
      </section>

      {/* Browse Other Loan Types in This State */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-4">
          Other Loan Types in {state.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {otherLoanTypes.map((other) => (
            <Link
              key={other.slug}
              href={`/lenders/${other.slug}/${stateSlug}`}
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-all"
            >
              {other.shortName}
            </Link>
          ))}
        </div>
      </section>

      {/* Browse Nearby States */}
      {regionStates.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">
            {lt.shortName} Lenders in Nearby States
          </h2>
          <div className="flex flex-wrap gap-2">
            {regionStates.map((s) => (
              <Link
                key={s.slug}
                href={`/lenders/${ltSlug}/${s.slug}`}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-all"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Calculator CTA */}
      {lt.relatedCalculator && (
        <section className="rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
          <h2 className="text-xl font-bold text-text">
            Analyze Your {state.name} Deal
          </h2>
          <p className="mt-2 text-text-muted">
            Use our free calculator to see if your {state.name} investment works
            with {lt.shortName} financing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={lt.relatedCalculator}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Open Calculator
            </Link>
            <Link
              href="/lenders/compare"
              className="rounded-lg border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              Compare Lenders Side by Side
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
