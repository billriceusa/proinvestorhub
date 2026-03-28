import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { lenders } from '@/data/lenders'
import { LenderComparison } from '@/components/lender-comparison'

export const metadata: Metadata = {
  title: 'Compare Lenders Side by Side | ProInvestorHub',
  description:
    'Compare real estate investor lenders side by side. Select 2–3 lenders to see rates, LTV, credit requirements, fees, and more in a structured comparison table.',
  alternates: { canonical: '/lenders/compare' },
  openGraph: {
    title: 'Compare Real Estate Investor Lenders | ProInvestorHub',
    description:
      'Side-by-side lender comparison tool. Select lenders and compare every detail — rates, LTV, speed, fees, and more.',
  },
}

export default function LenderComparePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Lender Directory', url: `${baseUrl}/lenders` },
          { name: 'Compare Lenders', url: `${baseUrl}/lenders/compare` },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/lenders" className="hover:text-primary transition-colors">
          Lender Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Compare Lenders</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Compare Lenders Side by Side
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          Select 2–3 lenders to see a detailed comparison across every key metric:
          rates, LTV, credit requirements, closing speed, fees, property types,
          and more. The best value in each category is highlighted.
        </p>
      </div>

      {/* Comparison Tool */}
      <LenderComparison allLenders={lenders} />

      {/* Bottom CTA */}
      <section className="mt-12 rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Not Sure Which Loan Type You Need?
        </h2>
        <p className="mt-2 text-text-muted">
          Use our scenario matcher to find lenders that fit your specific
          situation — credit score, experience level, property type, and strategy.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/lenders/finder"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Find My Lender Match
          </Link>
          <Link
            href="/lenders"
            className="rounded-lg border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Browse All Lenders
          </Link>
        </div>
      </section>
    </div>
  )
}
