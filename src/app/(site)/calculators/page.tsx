import type { Metadata } from 'next'
import Link from 'next/link'
import { ToolRecommendations } from '@/components/tool-recommendations'

export const metadata: Metadata = {
  title: 'Real Estate Investment Calculators',
  description:
    'Free calculators for real estate investors: cap rate, cash-on-cash return, BRRRR analysis, rental cash flow, fix-and-flip profit, and more.',
  alternates: { canonical: '/calculators' },
}

const calculators = [
  {
    title: 'Cap Rate Calculator',
    description:
      'Calculate the capitalization rate of any investment property to compare deals and evaluate returns.',
    href: '/calculators/cap-rate',
    status: 'live' as const,
  },
  {
    title: 'Cash-on-Cash Return',
    description:
      'Measure the annual return on the actual cash you invest, factoring in financing.',
    href: '/calculators/cash-on-cash',
    status: 'live' as const,
  },
  {
    title: 'Rental Cash Flow',
    description:
      'Project monthly and annual cash flow for rental properties with detailed expense breakdowns.',
    href: '/calculators/rental-cashflow',
    status: 'live' as const,
  },
  {
    title: 'BRRRR Calculator',
    description:
      'Analyze Buy, Rehab, Rent, Refinance, Repeat deals to maximize your capital recycling.',
    href: '/calculators/brrrr',
    status: 'live' as const,
  },
  {
    title: 'Fix & Flip Profit',
    description:
      'Estimate rehab costs, holding costs, selling costs, and profit on fix-and-flip deals.',
    href: '/calculators/fix-flip',
    status: 'live' as const,
  },
  {
    title: 'Mortgage / DSCR Payment',
    description:
      'Calculate monthly payments for conventional mortgages and DSCR investor loans.',
    href: '/calculators/mortgage',
    status: 'live' as const,
  },
  {
    title: '1031 Exchange Tax Savings',
    description:
      'Calculate how much you save in taxes by doing a 1031 exchange instead of selling outright.',
    href: '/calculators/1031-exchange',
    status: 'live' as const,
  },
  {
    title: 'Wholesale Deal Analyzer',
    description:
      'Calculate your maximum offer and assignment fee on wholesale deals using the 70% rule.',
    href: '/calculators/wholesale',
    status: 'live' as const,
  },
  {
    title: 'STR Revenue Calculator',
    description:
      'Project revenue and cash flow for short-term rental properties with seasonality and expense modeling.',
    href: '/calculators/str-revenue',
    status: 'live' as const,
  },
]

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-text">
          Investment Calculators
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Free tools to analyze any deal in seconds. No sign-up required.
        </p>
        <Link
          href="/calculators/compare"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Compare Two Deals
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => {
          const isLive = calc.status === 'live'
          const inner = (
            <>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-4 ${
                  isLive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-accent/20 text-accent'
                }`}
              >
                {isLive ? 'Live' : 'Coming Soon'}
              </span>
              <h2 className="text-lg font-semibold text-text">{calc.title}</h2>
              <p className="mt-2 text-sm text-text-muted leading-6">
                {calc.description}
              </p>
              {isLive && (
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Open Calculator &rarr;
                </span>
              )}
            </>
          )

          return isLive && calc.href ? (
            <Link
              key={calc.title}
              href={calc.href}
              className="relative rounded-xl border border-primary/20 bg-white p-6 hover:border-primary/40 hover:shadow-md transition-all"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={calc.title}
              className="relative rounded-xl border border-border bg-white p-6"
            >
              {inner}
            </div>
          )
        })}
      </div>

      <ToolRecommendations
        tools={['dealcheck', 'baselane', 'rentredi', 'landlord-studio']}
        heading="Tools That Pair with Our Calculators"
        placement="calculators-hub"
      />

      <div className="mt-16 rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Have a calculator idea?
        </h2>
        <p className="mt-2 text-text-muted">
          We&apos;re always building new tools for real estate investors. Sign up
          for our newsletter to stay in the loop.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
        >
          Explore Our Blog &rarr;
        </Link>
      </div>
    </div>
  )
}
