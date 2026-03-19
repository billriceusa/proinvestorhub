import type { Metadata } from 'next'
import Link from 'next/link'
import { cities } from '@/data/cap-rate-cities'
import { strategies, getCitiesForStrategy } from '@/data/market-strategies'
import { PrintButton } from '../deal-analysis-checklist/print-button'

export const metadata: Metadata = {
  title: '50-City Cap Rate Report 2026 — Free Market Data',
  description:
    'Free downloadable report comparing cap rates, median prices, rents, vacancy rates, and investment scores across 50 US real estate markets in 2026.',
  alternates: { canonical: '/resources/cap-rate-report' },
  openGraph: {
    title: '50-City Cap Rate Report 2026 | ProInvestorHub',
    description:
      'Free market data: cap rates, prices, rents, and strategy scores for 50 US investment markets.',
    url: '/resources/cap-rate-report',
    images: [
      {
        url: '/api/og?title=50-City+Cap+Rate+Report+2026&subtitle=Free+Market+Data+for+Investors',
        width: 1200,
        height: 630,
      },
    ],
  },
}

function fmt(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CapRateReportPage() {
  const cashFlowCities = getCitiesForStrategy('cash-flow')
  const brrrrCities = getCitiesForStrategy('brrrr')
  const houseHackCities = getCitiesForStrategy('house-hacking')
  const appreciationCities = getCitiesForStrategy('appreciation')

  const avgCapRate =
    cities.reduce((sum, c) => sum + c.avgCapRate, 0) / cities.length
  const avgPrice =
    cities.reduce((sum, c) => sum + c.medianHomePrice, 0) / cities.length
  const avgRent =
    cities.reduce((sum, c) => sum + c.medianRent, 0) / cities.length

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 print:px-0 print:py-0">
      {/* Print/Save Controls */}
      <div className="mb-8 flex items-center justify-between print:hidden">
        <nav className="text-sm text-text-muted">
          <Link href="/resources" className="hover:text-primary transition-colors">
            Resources
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">Cap Rate Report</span>
        </nav>
        <PrintButton />
      </div>

      {/* Report Header */}
      <div className="text-center mb-12 print:mb-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">
          ProInvestorHub Market Research
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl print:text-2xl">
          50-City Cap Rate Report &mdash; 2026
        </h1>
        <p className="mt-3 text-lg text-text-muted print:text-sm">
          Cap rates, median prices, rents, and investment strategy scores
          for the top 50 US real estate markets.
        </p>
        <p className="mt-2 text-xs text-text-light">
          Data: Census ACS, Zillow, Redfin, county assessors &bull; Updated
          March 2026 &bull; proinvestorhub.com
        </p>
      </div>

      {/* National Averages */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-text mb-4 print:text-lg">
          National Averages (50 Markets)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-white p-5 text-center print:border-gray-300">
            <p className="text-sm text-text-muted">Avg Cap Rate</p>
            <p className="mt-1 text-2xl font-bold text-primary tabular-nums print:text-xl">
              {avgCapRate.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 text-center print:border-gray-300">
            <p className="text-sm text-text-muted">Avg Median Price</p>
            <p className="mt-1 text-2xl font-bold text-text tabular-nums print:text-xl">
              {fmt(avgPrice)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 text-center print:border-gray-300">
            <p className="text-sm text-text-muted">Avg Median Rent</p>
            <p className="mt-1 text-2xl font-bold text-text tabular-nums print:text-xl">
              {fmt(avgRent)}/mo
            </p>
          </div>
        </div>
      </section>

      {/* Full 50-City Table */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-text mb-4 print:text-lg">
          All 50 Markets — Ranked by Cap Rate
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse print:text-[10px]">
            <thead>
              <tr className="bg-surface text-left text-text-muted uppercase tracking-wide">
                <th className="px-2 py-2">#</th>
                <th className="px-2 py-2">City</th>
                <th className="px-2 py-2 text-right">Cap Rate</th>
                <th className="px-2 py-2 text-right">Median Price</th>
                <th className="px-2 py-2 text-right">Median Rent</th>
                <th className="px-2 py-2 text-right">R/P Ratio</th>
                <th className="px-2 py-2 text-right">Vacancy</th>
                <th className="px-2 py-2 text-right">Pop Growth</th>
                <th className="px-2 py-2 text-right">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, i) => (
                <tr
                  key={city.slug}
                  className={`border-t border-border/50 ${
                    i % 2 === 1 ? 'bg-surface/30' : ''
                  }`}
                >
                  <td className="px-2 py-1.5 text-text-light tabular-nums">
                    {i + 1}
                  </td>
                  <td className="px-2 py-1.5 font-medium text-text whitespace-nowrap">
                    {city.city}, {city.state}
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums font-semibold text-primary">
                    {city.avgCapRate.toFixed(1)}%
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-text-muted">
                    {fmt(city.medianHomePrice)}
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-text-muted">
                    {fmt(city.medianRent)}
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-text-muted">
                    {(city.rentToPrice * 100).toFixed(2)}%
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-text-muted">
                    {city.vacancyRate.toFixed(1)}%
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums">
                    <span
                      className={
                        city.populationGrowth > 0
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }
                    >
                      {city.populationGrowth > 0 ? '+' : ''}
                      {city.populationGrowth.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-text-muted">
                    {city.propertyTaxRate.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategy Rankings Summary */}
      <section className="mb-12 print:mb-8 print:break-before-page">
        <h2 className="text-xl font-bold text-text mb-4 print:text-lg">
          Top 10 Markets by Strategy
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2 print:gap-4">
          {[
            { title: 'Cash Flow', cities: cashFlowCities },
            { title: 'BRRRR', cities: brrrrCities },
            { title: 'House Hacking', cities: houseHackCities },
            { title: 'Appreciation', cities: appreciationCities },
          ].map((strat) => (
            <div
              key={strat.title}
              className="rounded-xl border border-border bg-white p-5 print:border-gray-300 print:p-3"
            >
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3">
                Best for {strat.title}
              </h3>
              <div className="space-y-1.5">
                {strat.cities.slice(0, 10).map((city, i) => (
                  <div
                    key={city.slug}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-text-muted">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary mr-1.5">
                        {i + 1}
                      </span>
                      {city.city}, {city.state}
                    </span>
                    <span className="tabular-nums font-semibold text-text">
                      {city.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="mb-12 print:mb-8">
        <h2 className="text-xl font-bold text-text mb-4 print:text-lg">
          Key Takeaways
        </h2>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 print:border-gray-300 print:bg-gray-50">
          <ul className="space-y-3 text-sm text-text-muted leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-text">Midwest dominates cash flow.</strong>{' '}
                Detroit, Cleveland, Memphis, and Indianapolis offer the highest
                cap rates and rent-to-price ratios, but population decline in
                some Ohio markets requires careful neighborhood selection.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-text">Sun Belt leads appreciation.</strong>{' '}
                Raleigh, Austin, Charlotte, Phoenix, and Nashville have the
                strongest population growth and income dynamics, but cap rates
                are compressed — these are growth plays, not cash flow plays.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-text">Property taxes matter more than you think.</strong>{' '}
                Birmingham (0.43%) and Knoxville (0.68%) save investors
                $3,000–$5,000/year compared to Milwaukee (2.53%) or Detroit
                (2.76%) at similar price points. Factor taxes into every
                analysis.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-text">Indianapolis is the best all-around market.</strong>{' '}
                It ranks in the top 5 for cash flow, BRRRR, and house hacking
                while maintaining positive population growth — the rare market
                that works for nearly every strategy.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-xs text-text-light border-t border-border pt-6 print:pt-4">
        <p>
          &copy; 2026 ProInvestorHub.com &bull; Free for personal use &bull;
          Data is approximate and varies by neighborhood
        </p>
        <p className="mt-1 print:hidden">
          <Link
            href="/calculators"
            className="text-primary hover:text-primary-light"
          >
            Run the numbers on a specific deal &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}
