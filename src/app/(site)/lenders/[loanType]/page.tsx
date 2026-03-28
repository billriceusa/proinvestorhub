import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { loanTypes, getLoanTypeBySlug } from '@/data/loan-types'
import { getLendersByLoanType } from '@/data/lenders'
import { usStates } from '@/data/us-states'
import { LenderCard } from '@/components/lender-card'

type Props = { params: Promise<{ loanType: string }> }

export async function generateStaticParams() {
  return loanTypes.map((lt) => ({ loanType: lt.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { loanType: slug } = await params
  const lt = getLoanTypeBySlug(slug)
  if (!lt) return {}

  return {
    title: lt.metaTitle,
    description: lt.metaDescription,
    alternates: { canonical: `/lenders/${slug}` },
    openGraph: {
      title: lt.metaTitle,
      description: lt.metaDescription,
    },
  }
}

const categoryLabels: Record<string, string> = {
  'short-term': 'Short-Term / Acquisition',
  'long-term': 'Long-Term / Hold',
  transitional: 'Transitional / Hybrid',
  specialty: 'Specialty',
}

export default async function LoanTypePage({ params }: Props) {
  const { loanType: slug } = await params
  const lt = getLoanTypeBySlug(slug)
  if (!lt) notFound()

  const matchingLenders = getLendersByLoanType(slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
          { name: lt.name, url: `${baseUrl}/lenders/${slug}` },
        ])}
      />
      {lt.faqs.length > 0 && <JsonLd data={faqJsonLd(lt.faqs)} />}

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/lenders" className="hover:text-primary transition-colors">
          Lender Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{lt.name}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-12">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          {categoryLabels[lt.category] || lt.category}
        </span>
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Best {lt.name.replace(' Loans', '')} Lenders for Real Estate Investors (2026)
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          {lt.description}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
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

      {/* Guide Content */}
      <section className="max-w-3xl mb-12">
        <h2 className="text-2xl font-bold text-text mb-4">
          What Are {lt.name}?
        </h2>
        <p className="text-text-muted leading-7">{lt.heroContent}</p>
      </section>

      {/* Best For */}
      {lt.bestFor.length > 0 && (
        <section className="max-w-3xl mb-12">
          <h2 className="text-xl font-bold text-text mb-4">
            Who Are {lt.name} Best For?
          </h2>
          <ul className="space-y-2">
            {lt.bestFor.map((item) => (
              <li key={item} className="flex items-start gap-2 text-text-muted">
                <svg className="mt-1 h-4 w-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pros & Cons */}
      <section className="max-w-3xl mb-12">
        <h2 className="text-xl font-bold text-text mb-4">
          Pros &amp; Cons
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
            <h3 className="text-sm font-semibold text-green-800 mb-3">Pros</h3>
            <ul className="space-y-2">
              {lt.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-green-900">
                  <span className="mt-0.5 text-green-600">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
            <h3 className="text-sm font-semibold text-red-800 mb-3">Cons</h3>
            <ul className="space-y-2">
              {lt.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-red-900">
                  <span className="mt-0.5 text-red-600">&ndash;</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lender Listings */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-2">
          Best {lt.shortName} Lenders ({matchingLenders.length})
        </h2>
        <p className="text-text-muted mb-6">
          These lenders offer {lt.name.toLowerCase()}, ranked by our editor rating.
          Click any lender for a full review with detailed terms and expert analysis.
        </p>

        {matchingLenders.length > 0 ? (
          <>
            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-border mb-8">
              <table className="min-w-full text-sm">
                <thead className="bg-surface-raised">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-text">Lender</th>
                    <th className="px-4 py-3 text-left font-semibold text-text">Rates</th>
                    <th className="px-4 py-3 text-left font-semibold text-text">Max LTV</th>
                    <th className="px-4 py-3 text-left font-semibold text-text">Min Credit</th>
                    <th className="px-4 py-3 text-left font-semibold text-text">Speed</th>
                    <th className="px-4 py-3 text-left font-semibold text-text">Best For</th>
                    <th className="px-4 py-3 text-left font-semibold text-text">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {matchingLenders.map((lender) => (
                    <tr key={lender.slug} className="hover:bg-surface transition-colors">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/lenders/reviews/${lender.slug}`}
                          className="text-primary hover:text-primary-light transition-colors"
                        >
                          {lender.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {lender.minRate}%–{lender.maxRate}%
                      </td>
                      <td className="px-4 py-3 tabular-nums">{lender.maxLtv}%</td>
                      <td className="px-4 py-3 tabular-nums">{lender.minCreditScore}</td>
                      <td className="px-4 py-3 text-text-muted">{lender.speedToClose}</td>
                      <td className="px-4 py-3 text-text-muted">
                        {lender.bestForTags.slice(0, 2).join(', ')}
                      </td>
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
              {matchingLenders.map((lender) => (
                <LenderCard key={lender.slug} lender={lender} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-text-muted italic">
            No lenders in our directory currently offer this product. Check back
            soon — we&apos;re constantly adding new lenders.
          </p>
        )}
      </section>

      {/* FAQs */}
      {lt.faqs.length > 0 && (
        <section className="max-w-3xl mb-12">
          <h2 className="text-2xl font-bold text-text mb-6">
            Frequently Asked Questions About {lt.name}
          </h2>
          <div className="space-y-6">
            {lt.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-semibold text-text">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Strategies */}
      {lt.relatedStrategies.length > 0 && (
        <section className="max-w-3xl mb-12">
          <h2 className="text-xl font-bold text-text mb-4">
            Related Investment Strategies
          </h2>
          <div className="flex flex-wrap gap-2">
            {lt.relatedStrategies.map((strategy) => {
              const strategyLabels: Record<string, string> = {
                'cash-flow': 'Cash Flow',
                brrrr: 'BRRRR',
                'house-hacking': 'House Hacking',
                'fix-flip': 'Fix & Flip',
                appreciation: 'Appreciation',
                'new-construction': 'New Construction',
                str: 'Short-Term Rental',
                wholesale: 'Wholesale',
              }
              const marketSlug = ['cash-flow', 'brrrr', 'house-hacking', 'appreciation'].includes(strategy)
                ? `/markets/${strategy}`
                : null
              const label = strategyLabels[strategy] || strategy

              return marketSlug ? (
                <Link
                  key={strategy}
                  href={marketSlug}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-all"
                >
                  {label}
                </Link>
              ) : (
                <span
                  key={strategy}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-muted"
                >
                  {label}
                </span>
              )
            })}
          </div>
        </section>
      )}

      {/* Browse by State */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-text mb-2">
          Find {lt.shortName} Lenders by State
        </h2>
        <p className="text-text-muted mb-4">
          Browse {lt.shortName.toLowerCase()} lenders available in your state with local market context and comparison tables.
        </p>
        <div className="flex flex-wrap gap-2">
          {usStates.map((state) => (
            <Link
              key={state.slug}
              href={`/lenders/${slug}/${state.slug}`}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
            >
              {state.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator CTA */}
      {lt.relatedCalculator && (
        <section className="rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
          <h2 className="text-xl font-bold text-text">
            Run the Numbers on Your Deal
          </h2>
          <p className="mt-2 text-text-muted">
            Use our free calculator to see if your deal works with {lt.shortName} financing.
          </p>
          <div className="mt-6">
            <Link
              href={lt.relatedCalculator}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Open Calculator
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
