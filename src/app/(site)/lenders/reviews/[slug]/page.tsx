import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { lenders, getLenderBySlug, formatCurrency } from '@/data/lenders'
import { loanTypes } from '@/data/loan-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return lenders.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lender = getLenderBySlug(slug)
  if (!lender) return {}

  return {
    title: lender.metaTitle,
    description: lender.metaDescription,
    alternates: { canonical: `/lenders/reviews/${slug}` },
    openGraph: {
      title: lender.metaTitle,
      description: lender.metaDescription,
    },
  }
}

const experienceLabels: Record<string, string> = {
  none: 'No experience required',
  beginner: '1–2 completed deals',
  intermediate: '3–5 completed deals',
  experienced: '5+ completed deals',
  varies: 'Varies by product',
}

const propertyTypeLabels: Record<string, string> = {
  sfr: 'Single Family (1-4 units)',
  multifamily: 'Multifamily (5+ units)',
  'mixed-use': 'Mixed Use',
  commercial: 'Commercial',
  str: 'Short-Term Rental / Airbnb',
  condo: 'Condo',
  townhouse: 'Townhouse',
  mobile: 'Mobile / Manufactured',
  land: 'Land',
  'new-construction': 'New Construction',
}

export default async function LenderProfilePage({ params }: Props) {
  const { slug } = await params
  const lender = getLenderBySlug(slug)
  if (!lender) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  const lenderLoanTypes = lender.loanTypeSlugs
    .map((s) => loanTypes.find((lt) => lt.slug === s))
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
          { name: lender.name, url: `${baseUrl}/lenders/reviews/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FinancialService',
          name: lender.name,
          url: lender.website,
          description: lender.description,
          foundingDate: lender.founded.toString(),
          areaServed: lender.nationwide ? 'US' : undefined,
          address: lender.headquarters
            ? { '@type': 'PostalAddress', addressLocality: lender.headquarters }
            : undefined,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: lender.editorRating,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 1,
            author: {
              '@type': 'Person',
              name: 'Bill Rice',
              url: `${baseUrl}/about`,
            },
          },
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/lenders" className="hover:text-primary transition-colors">
          Lender Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{lender.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-text sm:text-4xl">
              {lender.name} Review
            </h1>
            <p className="mt-1 text-sm text-text-light">
              Founded {lender.founded} &middot; {lender.headquarters}
              {lender.nationwide && ' · Nationwide'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{lender.editorRating.toFixed(1)}</p>
              <p className="text-xs text-text-light">Editor Rating</p>
            </div>
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3 w-3 ${i < Math.round(lender.editorRating) ? 'fill-primary' : 'fill-border'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )).slice(0, 1)}
            </div>
          </div>
        </div>
        <p className="mt-4 text-lg text-text-muted leading-7">
          {lender.description}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Editor's Take */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">
              Editor&apos;s Take
            </h2>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-text leading-7">{lender.editorSummary}</p>
              <p className="mt-4 text-xs text-text-light">
                — Bill Rice, 30+ year mortgage lending veteran
              </p>
            </div>
          </section>

          {/* Pros & Cons */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-text mb-4">Pros &amp; Cons</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                <h3 className="text-sm font-semibold text-green-800 mb-3">Pros</h3>
                <ul className="space-y-2">
                  {lender.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-green-900">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                <h3 className="text-sm font-semibold text-red-800 mb-3">Cons</h3>
                <ul className="space-y-2">
                  {lender.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-red-900">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Loan Products */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-text mb-4">
              Loan Products Offered
            </h2>
            <div className="flex flex-wrap gap-2">
              {lenderLoanTypes.map((lt) =>
                lt ? (
                  <Link
                    key={lt.slug}
                    href={`/lenders/${lt.slug}`}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-all"
                  >
                    {lt.name}
                  </Link>
                ) : null
              )}
            </div>
          </section>

          {/* Property Types */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-text mb-4">
              Eligible Property Types
            </h2>
            <div className="flex flex-wrap gap-2">
              {lender.propertyTypes.map((pt) => (
                <span
                  key={pt}
                  className="rounded-full bg-surface-raised px-3 py-1 text-xs font-medium text-text-muted"
                >
                  {propertyTypeLabels[pt] || pt}
                </span>
              ))}
            </div>
          </section>

          {/* Best For */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-text mb-4">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {lender.bestForTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/8 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Key Terms Card */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-text mb-4">Key Terms</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-text-muted">Interest Rates</dt>
                  <dd className="font-semibold text-text tabular-nums">
                    {lender.minRate}%–{lender.maxRate}%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Max LTV</dt>
                  <dd className="font-semibold text-text tabular-nums">{lender.maxLtv}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Min Credit Score</dt>
                  <dd className="font-semibold text-text tabular-nums">{lender.minCreditScore}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Loan Range</dt>
                  <dd className="font-semibold text-text tabular-nums">
                    {formatCurrency(lender.minLoanAmount)}–{formatCurrency(lender.maxLoanAmount)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Origination Fee</dt>
                  <dd className="font-semibold text-text">{lender.originationFee}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Speed to Close</dt>
                  <dd className="font-semibold text-text">{lender.speedToClose}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Experience Required</dt>
                  <dd className="font-semibold text-text">
                    {experienceLabels[lender.experienceRequired] || lender.experienceRequired}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">LLC Borrowing</dt>
                  <dd className="font-semibold text-text">{lender.allowsLlc ? 'Yes' : 'No'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Interest-Only</dt>
                  <dd className="font-semibold text-text">
                    {lender.interestOnlyAvailable ? 'Available' : 'Not available'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Prepayment Penalty</dt>
                  <dd className="font-semibold text-text text-right max-w-[140px]">
                    {lender.prepaymentPenalty}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Foreign National</dt>
                  <dd className="font-semibold text-text">
                    {lender.foreignNational ? 'Yes' : 'No'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Coverage</dt>
                  <dd className="font-semibold text-text">
                    {lender.nationwide ? 'Nationwide' : 'Regional'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* CTA */}
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
              <p className="text-sm font-semibold text-text mb-2">
                Ready to get a quote?
              </p>
              <p className="text-xs text-text-muted mb-4">
                Visit {lender.name} to apply or get pre-qualified.
              </p>
              <a
                href={lender.website}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Visit {lender.name}
              </a>
              <p className="mt-3 text-xs text-text-light">
                External link &middot; ProInvestorHub does not receive your information
              </p>
            </div>

            {/* Calculator Link */}
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-sm font-semibold text-text mb-2">
                Run the Numbers
              </h3>
              <p className="text-xs text-text-muted mb-3">
                See if your deal works with these terms.
              </p>
              <div className="space-y-2">
                <Link
                  href="/calculators/mortgage"
                  className="block text-sm text-primary hover:text-primary-light font-medium transition-colors"
                >
                  Mortgage / DSCR Calculator &rarr;
                </Link>
                <Link
                  href="/calculators/fix-flip"
                  className="block text-sm text-primary hover:text-primary-light font-medium transition-colors"
                >
                  Fix &amp; Flip Calculator &rarr;
                </Link>
                <Link
                  href="/calculators/brrrr"
                  className="block text-sm text-primary hover:text-primary-light font-medium transition-colors"
                >
                  BRRRR Calculator &rarr;
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Disclaimer */}
      <section className="mt-12 rounded-xl border border-border bg-surface-raised p-6">
        <p className="text-xs text-text-light leading-5">
          <strong className="text-text-muted">Disclaimer:</strong> Rates, terms, and
          requirements shown are approximate and based on publicly available
          information as of March 2026. Actual terms may vary based on your
          credit profile, property details, and market conditions. Always verify
          current terms directly with the lender before making financing
          decisions. ProInvestorHub provides editorial reviews for educational
          purposes and does not guarantee loan approval or specific terms.
        </p>
      </section>
    </div>
  )
}
