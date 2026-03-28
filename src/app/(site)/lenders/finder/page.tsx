import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { lenders } from '@/data/lenders'
import { LenderFinder } from '@/components/lender-finder'

export const metadata: Metadata = {
  title: 'Find Your Lender Match: Investor Loan Finder | ProInvestorHub',
  description:
    'Tell us your credit score, experience level, property type, and strategy — we\'ll match you with the best lenders for your real estate investment scenario. Free, no registration required.',
  alternates: { canonical: '/lenders/finder' },
  openGraph: {
    title: 'Find Your Lender Match | ProInvestorHub',
    description:
      'Interactive lender matching tool for real estate investors. Input your scenario, get matched lenders instantly.',
  },
}

export default function LenderFinderPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
          { name: 'Find a Lender', url: `${baseUrl}/lenders/finder` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Real Estate Investor Lender Finder',
          description: 'Match your investment scenario with the best lenders for your deal.',
          url: `${baseUrl}/lenders/finder`,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/lenders" className="hover:text-primary transition-colors">
          Lender Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Find a Lender</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Find Your Lender Match
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          Tell us about your deal and we&apos;ll show you which lenders fit. Enter
          your credit score, experience level, loan type, property type, and
          what matters most to you. No registration required — your information
          stays on your screen.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-text-light">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            No data shared with lenders
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Free, no registration
          </span>
        </div>
      </div>

      {/* Finder Tool */}
      <LenderFinder allLenders={lenders} />

      {/* How It Works */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-4">
          How This Tool Works
        </h2>
        <p className="text-text-muted leading-7 mb-4">
          This tool matches your scenario against the structured data in our
          lender directory. We filter lenders by your hard requirements (credit
          score, experience, loan type, property type, loan amount) and then
          rank the remaining matches by your stated priority and our editor
          ratings.
        </p>
        <p className="text-text-muted leading-7">
          This is <strong>not</strong> a lead generation tool. We don&apos;t
          collect your personal information or share it with lenders. The
          matching happens entirely in your browser. When you find a lender
          that fits, read our full review and then contact the lender directly
          through their website.
        </p>
      </section>

      {/* Other Tools */}
      <section className="mt-12 rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          More Lender Research Tools
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/lenders/compare"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Compare Lenders Side by Side
          </Link>
          <Link
            href="/lenders"
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Browse All Lenders
          </Link>
          <Link
            href="/calculators/mortgage"
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Mortgage / DSCR Calculator
          </Link>
        </div>
      </section>
    </div>
  )
}
