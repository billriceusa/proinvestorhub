import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { loanTypes, loanTypeCategories } from '@/data/loan-types'
import { lenders, getFeaturedLenders, formatCurrency } from '@/data/lenders'
import { usStates } from '@/data/us-states'
import { LenderCard } from '@/components/lender-card'

export const metadata: Metadata = {
  title: 'Real Estate Investor Lender Directory: Compare Financing Options | ProInvestorHub',
  description:
    'Compare the best lenders for real estate investors. DSCR, hard money, bridge, fix-and-flip, construction, and portfolio loans — side-by-side rates, LTV, and expert reviews.',
  alternates: { canonical: '/lenders' },
  openGraph: {
    title: 'Real Estate Investor Lender Directory | ProInvestorHub',
    description:
      'Find and compare the best financing for your real estate investments. Expert-curated directory with honest reviews.',
  },
}

const directoryFaqs = [
  {
    question: 'What type of loan do I need for a rental property?',
    answer:
      'For a long-term rental property, the most common options are DSCR loans (qualify based on rental income, no W-2 needed) and conventional investment property loans (lowest rates, but require income documentation and are limited to 10 properties). DSCR loans are the most popular choice for investors scaling a portfolio.',
  },
  {
    question: 'What type of loan do I need for a fix-and-flip?',
    answer:
      'Fix-and-flip projects typically use hard money loans or specialized fix-and-flip loans. These are short-term (6-18 months), fund both purchase and renovation costs, and close quickly (7-14 days). Rates are higher (9-14%) because the loan is short-term and asset-based.',
  },
  {
    question: 'Can I get an investment property loan with bad credit?',
    answer:
      'Yes. Hard money lenders focus on the property value rather than your credit score — some accept scores as low as 550. DSCR lenders like RCN Capital and Griffin Funding accept credit scores as low as 620. The lower your score, the higher the rate and down payment requirement.',
  },
  {
    question: 'How much down payment do I need for an investment property?',
    answer:
      'Typically 15-25% for long-term loans (conventional or DSCR) and 10-25% for fix-and-flip loans (depending on experience). House hackers can use owner-occupied financing with as little as 3.5% down (FHA) by living in one unit of a multi-unit property.',
  },
  {
    question: 'What is the difference between a DSCR loan and a hard money loan?',
    answer:
      'DSCR loans are long-term (30-year), lower-rate (6.5-8.5%) financing for rental properties you plan to hold. Hard money loans are short-term (6-24 months), higher-rate (10-14%) financing for flips and rehabs. Many investors use hard money to acquire and renovate, then refinance into a DSCR loan to hold long-term (the BRRRR strategy).',
  },
]

export default function LenderDirectoryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const featured = getFeaturedLenders()

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
        ])}
      />
      <JsonLd data={faqJsonLd(directoryFaqs)} />

      {/* Hero */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Real Estate Investor Lender Directory
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          Find the right financing for your next deal. We&apos;ve researched and
          curated the best lenders for every stage of your real estate investing
          journey — from your first rental property to a portfolio of 50+. Compare
          rates, terms, and requirements side by side with honest reviews from a
          30-year lending industry veteran.
        </p>
        <p className="mt-2 text-sm text-text-light">
          {lenders.length} lenders &middot; {loanTypes.length} loan types &middot; Updated March 2026
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/lenders/finder"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Find My Lender Match
          </Link>
          <Link
            href="/lenders/compare"
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Compare Lenders Side by Side
          </Link>
        </div>
      </div>

      {/* Loan Type Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-2">
          Browse by Loan Type
        </h2>
        <p className="text-text-muted mb-8">
          Each loan type serves a different strategy. Choose the financing that
          matches your deal.
        </p>

        {loanTypeCategories.map((category) => {
          const categoryLoanTypes = loanTypes
            .filter((lt) => lt.category === category.value)
            .sort((a, b) => a.sortOrder - b.sortOrder)
          if (categoryLoanTypes.length === 0) return null

          return (
            <div key={category.value} className="mb-10">
              <h3 className="text-lg font-semibold text-text mb-1">
                {category.label}
              </h3>
              <p className="text-sm text-text-muted mb-4">
                {category.description}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryLoanTypes.map((lt) => (
                  <Link
                    key={lt.slug}
                    href={`/lenders/${lt.slug}`}
                    className="group rounded-xl border border-border bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <h4 className="text-base font-bold text-text group-hover:text-primary transition-colors">
                      {lt.name}
                    </h4>
                    <p className="mt-2 text-sm text-text-muted leading-6 line-clamp-3">
                      {lt.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-light">
                      <span>Rate: {lt.typicalRateRange}</span>
                      <span>LTV: {lt.typicalLtvRange}</span>
                      <span>Term: {lt.typicalTermRange}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-primary group-hover:text-primary-light transition-colors">
                      View Lenders &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Featured Lenders */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-2">
          Featured Lenders
        </h2>
        <p className="text-text-muted mb-8">
          Our top-rated lenders for real estate investors, selected for product
          breadth, competitive rates, and borrower experience.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((lender) => (
            <LenderCard key={lender.slug} lender={lender} />
          ))}
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-2">
          Quick Lender Comparison
        </h2>
        <p className="text-text-muted mb-6">
          At-a-glance comparison of rates, LTV, credit score requirements, and
          closing speed across all lenders in our directory.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-raised">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">Lender</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Loan Types</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Rate Range</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Max LTV</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Min Credit</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Speed</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {lenders
                .sort((a, b) => b.editorRating - a.editorRating)
                .map((lender) => (
                  <tr key={lender.slug} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/lenders/reviews/${lender.slug}`}
                        className="text-primary hover:text-primary-light transition-colors"
                      >
                        {lender.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {lender.loanTypeSlugs
                        .map((s) => {
                          const lt = loanTypes.find((l) => l.slug === s)
                          return lt?.shortName || s
                        })
                        .slice(0, 3)
                        .join(', ')}
                      {lender.loanTypeSlugs.length > 3 && ` +${lender.loanTypeSlugs.length - 3}`}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {lender.minRate}%–{lender.maxRate}%
                    </td>
                    <td className="px-4 py-3 tabular-nums">{lender.maxLtv}%</td>
                    <td className="px-4 py-3 tabular-nums">{lender.minCreditScore}</td>
                    <td className="px-4 py-3 text-text-muted">{lender.speedToClose}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        {lender.editorRating.toFixed(1)}
                        <svg className="h-3.5 w-3.5 fill-primary" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Browse by State */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-2">
          Browse Lenders by State
        </h2>
        <p className="text-text-muted mb-6">
          Find lenders serving your state with local market context, landlord
          law overviews, and state-specific comparison tables.
        </p>
        <div className="flex flex-wrap gap-2">
          {usStates.map((state) => (
            <Link
              key={state.slug}
              href={`/lenders/dscr-loans/${state.slug}`}
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
            >
              {state.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {directoryFaqs.map((faq) => (
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

      {/* How We Review / E-E-A-T */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text mb-4">
          How We Review Lenders
        </h2>
        <p className="text-text-muted leading-7 mb-4">
          Every lender in this directory has been researched and evaluated by our
          editorial team, led by{' '}
          <Link href="/about" className="text-primary hover:text-primary-light font-medium transition-colors">
            Bill Rice
          </Link>
          , a 30+ year veteran of the mortgage lending industry. We evaluate
          lenders on rate competitiveness, product range, closing speed, credit
          requirements, customer experience, and transparency.
        </p>
        <p className="text-text-muted leading-7">
          We are not a lead generation company. We do not sell your information
          to lenders. Our directory is designed to help you make informed
          financing decisions with transparent, side-by-side comparisons and
          honest editorial reviews. Some lenders in this directory may have
          affiliate partnerships with ProInvestorHub — this is always disclosed
          and never influences our ratings or editorial content.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Know Your Numbers Before You Borrow
        </h2>
        <p className="mt-2 text-text-muted">
          Use our free calculators to analyze your deal, then find the right
          lender to finance it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/calculators/mortgage"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Mortgage / DSCR Calculator
          </Link>
          <Link
            href="/calculators/fix-flip"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Fix &amp; Flip Calculator
          </Link>
          <Link
            href="/calculators/brrrr"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            BRRRR Calculator
          </Link>
          <Link
            href="/calculators/rental-cashflow"
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Rental Cash Flow
          </Link>
        </div>
      </section>
    </div>
  )
}
