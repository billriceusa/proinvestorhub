import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { lenderComparisons, getComparisonBySlug, getComparisonData, getComparisonsForLender } from '@/data/lender-comparisons'
import { loanTypes } from '@/data/loan-types'
import { formatCurrency } from '@/data/lenders'
import { LenderOutboundLink } from '@/components/lender-outbound-link'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return lenderComparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) return {}
  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: { canonical: `/lenders/compare/${slug}` },
    openGraph: { title: comparison.metaTitle, description: comparison.metaDescription },
  }
}

const experienceLabels: Record<string, string> = {
  none: 'No experience required',
  beginner: '1–2 deals',
  intermediate: '3–5 deals',
  experienced: '5+ deals',
  varies: 'Varies',
}

const propertyTypeLabels: Record<string, string> = {
  sfr: 'SFR (1-4)', multifamily: 'Multifamily (5+)', 'mixed-use': 'Mixed Use',
  commercial: 'Commercial', str: 'STR / Airbnb', condo: 'Condo', townhouse: 'Townhouse',
  mobile: 'Mobile', land: 'Land', 'new-construction': 'New Construction',
}

type ComparisonRow = {
  label: string
  getA: string
  getB: string
  winner: 'a' | 'b' | 'tie' | null
}

export default async function LenderVsLenderPage({ params }: Props) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) notFound()

  const data = getComparisonData(comparison)
  if (!data) notFound()

  const { lenderA: a, lenderB: b } = data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  const sharedLoanTypeNames = comparison.sharedLoanTypes
    .map((s) => loanTypes.find((lt) => lt.slug === s)?.shortName)
    .filter(Boolean)

  // Build comparison rows with winner determination
  const rows: ComparisonRow[] = [
    {
      label: 'Interest Rates',
      getA: `${a.minRate}%–${a.maxRate}%`,
      getB: `${b.minRate}%–${b.maxRate}%`,
      winner: a.minRate < b.minRate ? 'a' : b.minRate < a.minRate ? 'b' : 'tie',
    },
    {
      label: 'Max LTV',
      getA: `${a.maxLtv}%`,
      getB: `${b.maxLtv}%`,
      winner: a.maxLtv > b.maxLtv ? 'a' : b.maxLtv > a.maxLtv ? 'b' : 'tie',
    },
    {
      label: 'Min Credit Score',
      getA: `${a.minCreditScore}`,
      getB: `${b.minCreditScore}`,
      winner: a.minCreditScore < b.minCreditScore ? 'a' : b.minCreditScore < a.minCreditScore ? 'b' : 'tie',
    },
    {
      label: 'Loan Range',
      getA: `${formatCurrency(a.minLoanAmount)}–${formatCurrency(a.maxLoanAmount)}`,
      getB: `${formatCurrency(b.minLoanAmount)}–${formatCurrency(b.maxLoanAmount)}`,
      winner: null,
    },
    {
      label: 'Origination Fee',
      getA: a.originationFee,
      getB: b.originationFee,
      winner: null,
    },
    {
      label: 'Speed to Close',
      getA: a.speedToClose,
      getB: b.speedToClose,
      winner: null,
    },
    {
      label: 'Experience Required',
      getA: experienceLabels[a.experienceRequired] || a.experienceRequired,
      getB: experienceLabels[b.experienceRequired] || b.experienceRequired,
      winner: null,
    },
    {
      label: 'LLC Borrowing',
      getA: a.allowsLlc ? 'Yes' : 'No',
      getB: b.allowsLlc ? 'Yes' : 'No',
      winner: null,
    },
    {
      label: 'Interest-Only',
      getA: a.interestOnlyAvailable ? 'Available' : 'No',
      getB: b.interestOnlyAvailable ? 'Available' : 'No',
      winner: null,
    },
    {
      label: 'Prepayment Penalty',
      getA: a.prepaymentPenalty,
      getB: b.prepaymentPenalty,
      winner: null,
    },
    {
      label: 'Foreign National',
      getA: a.foreignNational ? 'Yes' : 'No',
      getB: b.foreignNational ? 'Yes' : 'No',
      winner: a.foreignNational && !b.foreignNational ? 'a' : !a.foreignNational && b.foreignNational ? 'b' : 'tie',
    },
    {
      label: 'Coverage',
      getA: a.nationwide ? 'Nationwide' : 'Regional',
      getB: b.nationwide ? 'Nationwide' : 'Regional',
      winner: null,
    },
    {
      label: 'Property Types',
      getA: a.propertyTypes.map((pt) => propertyTypeLabels[pt] || pt).join(', '),
      getB: b.propertyTypes.map((pt) => propertyTypeLabels[pt] || pt).join(', '),
      winner: a.propertyTypes.length > b.propertyTypes.length ? 'a' : b.propertyTypes.length > a.propertyTypes.length ? 'b' : 'tie',
    },
    {
      label: 'Loan Products',
      getA: `${a.loanTypeSlugs.length} products`,
      getB: `${b.loanTypeSlugs.length} products`,
      winner: a.loanTypeSlugs.length > b.loanTypeSlugs.length ? 'a' : b.loanTypeSlugs.length > a.loanTypeSlugs.length ? 'b' : 'tie',
    },
    {
      label: 'Founded',
      getA: `${a.founded}`,
      getB: `${b.founded}`,
      winner: null,
    },
    {
      label: 'Editor Rating',
      getA: `${a.editorRating.toFixed(1)} / 5.0`,
      getB: `${b.editorRating.toFixed(1)} / 5.0`,
      winner: a.editorRating > b.editorRating ? 'a' : b.editorRating > a.editorRating ? 'b' : 'tie',
    },
  ]

  const winsA = rows.filter((r) => r.winner === 'a').length
  const winsB = rows.filter((r) => r.winner === 'b').length

  // Related comparisons
  const relatedA = getComparisonsForLender(a.slug).filter((c) => c.slug !== slug).slice(0, 3)
  const relatedB = getComparisonsForLender(b.slug).filter((c) => c.slug !== slug).slice(0, 3)
  const related = [...new Map([...relatedA, ...relatedB].map((c) => [c.slug, c])).values()].slice(0, 4)

  // FAQs
  const faqs = [
    {
      question: `Is ${a.name} or ${b.name} better for real estate investors?`,
      answer: comparison.angle,
    },
    {
      question: `What loan types do ${a.name} and ${b.name} both offer?`,
      answer: `Both lenders offer ${sharedLoanTypeNames.join(', ')}. ${a.loanTypeSlugs.length > b.loanTypeSlugs.length ? `${a.name} offers ${a.loanTypeSlugs.length} total products vs ${b.name}'s ${b.loanTypeSlugs.length}` : b.loanTypeSlugs.length > a.loanTypeSlugs.length ? `${b.name} offers ${b.loanTypeSlugs.length} total products vs ${a.name}'s ${a.loanTypeSlugs.length}` : `Both offer ${a.loanTypeSlugs.length} products`}.`,
    },
    {
      question: `Which has lower rates, ${a.name} or ${b.name}?`,
      answer: `${a.name} advertises rates starting at ${a.minRate}% while ${b.name} starts at ${b.minRate}%. ${a.minRate < b.minRate ? `${a.name} has the lower starting rate` : b.minRate < a.minRate ? `${b.name} has the lower starting rate` : 'Both have the same starting rate'}, but actual rates depend on your credit score, LTV, property type, and loan product. Always get quotes from both lenders.`,
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
          { name: 'Compare Lenders', url: `${baseUrl}/lenders/compare` },
          { name: `${a.name} vs ${b.name}`, url: `${baseUrl}/lenders/compare/${slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/lenders" className="hover:text-primary transition-colors">Lender Directory</Link>
        <span className="mx-2">/</span>
        <Link href="/lenders/compare" className="hover:text-primary transition-colors">Compare</Link>
        <span className="mx-2">/</span>
        <span className="text-text">{a.name} vs {b.name}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          {a.name} vs {b.name}
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          {comparison.angle}
        </p>
        <p className="mt-2 text-sm text-text-light">
          Shared products: {sharedLoanTypeNames.join(', ')} &middot; Updated March 2026
        </p>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className={`rounded-xl border p-6 text-center ${winsA > winsB ? 'border-primary/30 bg-primary/5' : 'border-border bg-white'}`}>
          <p className="text-2xl font-bold text-primary">{a.editorRating.toFixed(1)}</p>
          <p className="text-sm font-semibold text-text mt-1">{a.name}</p>
          <p className="text-xs text-text-light mt-1">Wins {winsA} categories</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6 text-center flex items-center justify-center">
          <span className="text-2xl font-bold text-text-light">VS</span>
        </div>
        <div className={`rounded-xl border p-6 text-center ${winsB > winsA ? 'border-primary/30 bg-primary/5' : 'border-border bg-white'}`}>
          <p className="text-2xl font-bold text-primary">{b.editorRating.toFixed(1)}</p>
          <p className="text-sm font-semibold text-text mt-1">{b.name}</p>
          <p className="text-xs text-text-light mt-1">Wins {winsB} categories</p>
        </div>
      </div>

      {/* Full Comparison Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text mb-4">Full Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-raised">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text w-48">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  <Link href={`/lenders/reviews/${a.slug}`} className="text-primary hover:text-primary-light transition-colors">
                    {a.name}
                  </Link>
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  <Link href={`/lenders/reviews/${b.slug}`} className="text-primary hover:text-primary-light transition-colors">
                    {b.name}
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {rows.map((row) => (
                <tr key={row.label} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3 font-medium text-text-muted">{row.label}</td>
                  <td className={`px-4 py-3 ${row.winner === 'a' ? 'font-semibold text-primary bg-primary/5' : 'text-text'}`}>
                    {row.getA}
                    {row.winner === 'a' && <span className="ml-2 text-xs text-primary">Better</span>}
                  </td>
                  <td className={`px-4 py-3 ${row.winner === 'b' ? 'font-semibold text-primary bg-primary/5' : 'text-text'}`}>
                    {row.getB}
                    {row.winner === 'b' && <span className="ml-2 text-xs text-primary">Better</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros & Cons Side by Side */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-4">Pros &amp; Cons</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[a, b].map((lender) => (
            <div key={lender.slug} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-lg font-bold text-text mb-4">{lender.name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                  <ul className="space-y-1.5">
                    {lender.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-green-900">
                        <span className="text-green-600 mt-0.5">+</span>{pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Cons</p>
                  <ul className="space-y-1.5">
                    {lender.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-red-900">
                        <span className="text-red-600 mt-0.5">&ndash;</span>{con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        {[a, b].map((lender) => (
          <div key={lender.slug} className="rounded-xl border border-border bg-white p-6 text-center">
            <p className="text-lg font-bold text-text mb-2">{lender.name}</p>
            <p className="text-xs text-text-muted mb-4">
              {lender.editorRating.toFixed(1)} editor rating &middot; {lender.speedToClose} closing
            </p>
            <div className="flex flex-col gap-2">
              <LenderOutboundLink
                websiteUrl={lender.website}
                lenderName={lender.name}
                lenderSlug={lender.slug}
                placement="comparison-table"
                editorRating={lender.editorRating}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Visit {lender.name}
              </LenderOutboundLink>
              <Link
                href={`/lenders/reviews/${lender.slug}`}
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-colors"
              >
                Read Full Review
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mb-10">
        <h2 className="text-2xl font-bold text-text mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-base font-semibold text-text">{faq.question}</h3>
              <p className="mt-2 text-sm text-text-muted leading-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Comparisons */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">Related Comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/lenders/compare/${c.slug}`}
                className="rounded-lg border border-border bg-white px-5 py-4 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
              >
                {c.title.replace(': ', '\n').split('\n')[0]}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">Not Sure? Try Our Lender Finder</h2>
        <p className="mt-2 text-text-muted">
          Enter your credit score, experience, and strategy to see which lenders match your scenario.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/lenders/finder" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors">
            Find My Lender Match
          </Link>
          <Link href="/lenders/compare" className="rounded-lg border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors">
            Compare Other Lenders
          </Link>
        </div>
      </section>
    </div>
  )
}
