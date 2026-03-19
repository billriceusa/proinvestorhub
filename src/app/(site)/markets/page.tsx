import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { strategies, getCitiesForStrategy } from '@/data/market-strategies'

export const metadata: Metadata = {
  title: 'Best Cities for Real Estate Investing 2026 — By Strategy | ProInvestorHub',
  description:
    'Compare the best US cities for real estate investing by strategy: cash flow, BRRRR, house hacking, and appreciation. Data-driven rankings for 50 markets.',
  alternates: { canonical: '/markets' },
  openGraph: {
    title: 'Best Cities for Real Estate Investing 2026 | ProInvestorHub',
    description:
      'Compare 50 US markets ranked by cash flow, BRRRR, house hacking, and appreciation potential.',
  },
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function MarketsHubPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Markets', url: `${baseUrl}/markets` },
        ])}
      />

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Best Cities for Real Estate Investing &mdash; 2026
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          The right market depends on your strategy. A city that is perfect for
          cash flow investing may be a poor choice for appreciation, and the best
          BRRRR markets are not necessarily the best for house hacking. We rank
          all 50 major US investment markets for each strategy using a
          data-driven scoring system.
        </p>
        <p className="mt-2 text-xs text-text-light">
          Last updated: March 2026
        </p>
      </div>

      {/* Strategy Cards */}
      <div className="grid gap-8 sm:grid-cols-2 mb-16">
        {strategies.map((strategy) => {
          const topCities = getCitiesForStrategy(strategy.slug).slice(0, 5)
          return (
            <Link
              key={strategy.slug}
              href={`/markets/${strategy.slug}`}
              className="group rounded-xl border border-border bg-white p-8 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                Best Cities for {strategy.shortTitle}
              </h2>
              <p className="mt-2 text-sm text-text-muted leading-6">
                {strategy.description}
              </p>
              <div className="mt-6">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                  Top 5 Markets
                </p>
                <div className="space-y-2">
                  {topCities.map((city, i) => (
                    <div
                      key={city.slug}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-text-muted">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mr-2">
                          {i + 1}
                        </span>
                        {city.city}, {city.state}
                      </span>
                      <span className="tabular-nums font-semibold text-primary">
                        {city.score.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-6 text-sm font-semibold text-primary group-hover:text-primary-light transition-colors">
                View Full Rankings &rarr;
              </p>
            </Link>
          )
        })}
      </div>

      {/* How It Works */}
      <section className="max-w-3xl mb-16">
        <h2 className="text-2xl font-bold text-text">
          How We Rank Markets
        </h2>
        <p className="mt-4 text-text-muted leading-7">
          Each strategy uses a weighted composite score based on the market data
          points that matter most for that approach. Cash flow rankings weight
          rent-to-price ratio and cap rates heavily. BRRRR rankings prioritize
          affordable entry prices and strong cap rates. House hacking rankings
          balance affordability with livability. Appreciation rankings emphasize
          population growth and income levels. Every score is transparent — click
          into any strategy to see the full methodology and all 50 markets.
        </p>
        <p className="mt-4 text-text-muted leading-7">
          Market data is sourced from Census ACS, Zillow, Redfin, county
          assessor records, and BLS employment data. All figures represent
          metro-level estimates and will vary by neighborhood, property type, and
          condition. Always run your own analysis on specific properties using
          our{' '}
          <Link
            href="/calculators"
            className="text-primary hover:text-primary-light transition-colors font-medium"
          >
            free calculators
          </Link>
          .
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Found a Market? Run the Numbers.
        </h2>
        <p className="mt-2 text-text-muted">
          Use our free calculators to analyze specific deals in your target
          market with your actual income and expense figures.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/calculators/rental-cashflow"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Rental Cash Flow
          </Link>
          <Link
            href="/calculators/brrrr"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            BRRRR Calculator
          </Link>
          <Link
            href="/calculators/cap-rate"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Cap Rate Calculator
          </Link>
          <Link
            href="/calculators/cap-rate/cities"
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            View All Market Data
          </Link>
        </div>
      </section>
    </div>
  )
}
