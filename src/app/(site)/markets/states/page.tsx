import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { getStatesList, getStateAverages } from '@/data/city-strategy-helpers'

export const metadata: Metadata = {
  title: 'Best States for Real Estate Investing 2026 | ProInvestorHub',
  description:
    'Compare real estate investment markets by state. Average cap rates, home prices, and top cities across 29 US states we track.',
  alternates: { canonical: '/markets/states' },
  openGraph: {
    title: 'Best States for Real Estate Investing 2026 | ProInvestorHub',
    description:
      'Compare real estate investment markets by state. Average cap rates, home prices, and top cities across 29 US states we track.',
  },
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
})

export default function StatesHubPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const states = getStatesList()

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Markets', url: `${baseUrl}/markets` },
          { name: 'States', url: `${baseUrl}/markets/states` },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/markets"
          className="hover:text-primary transition-colors"
        >
          Markets
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">States</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Best States for Real Estate Investing 2026
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Browse real estate investment markets by state. We track{' '}
          {states.reduce((sum, s) => sum + s.cities.length, 0)} cities across{' '}
          {states.length} states with detailed market data, cap rates, and
          strategy rankings.
        </p>
      </div>

      {/* State Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => {
          const avgs = getStateAverages(state.cities)
          const topCity = state.cities.reduce(
            (best, c) => (c.avgCapRate > best.avgCapRate ? c : best),
            state.cities[0]
          )
          return (
            <Link
              key={state.slug}
              href={`/markets/states/${state.slug}`}
              className="rounded-xl border border-border bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                  {state.name}
                </h2>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {state.cities.length}{' '}
                  {state.cities.length === 1 ? 'city' : 'cities'}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-light text-xs">Avg Cap Rate</p>
                  <p className="font-semibold text-text">
                    {avgs.avgCapRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-text-light text-xs">Avg Home Price</p>
                  <p className="font-semibold text-text">
                    {usd.format(avgs.avgMedianHomePrice)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                Top market: {topCity.city} ({topCity.avgCapRate.toFixed(1)}%
                cap rate)
              </p>
            </Link>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Prefer to Browse by Strategy?
        </h2>
        <p className="mt-2 text-text-muted">
          See which markets rank best for cash flow, BRRRR, house hacking, or
          appreciation.
        </p>
        <Link
          href="/markets"
          className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
        >
          View Strategy Rankings
        </Link>
      </div>
    </div>
  )
}
