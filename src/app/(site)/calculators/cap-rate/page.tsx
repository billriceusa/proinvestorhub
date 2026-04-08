import type { Metadata } from 'next'
import Link from 'next/link'
import { CapRateCalculator } from '@/components/calculators/cap-rate-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { cities } from '@/data/cap-rate-cities'

export const metadata: Metadata = {
  title: 'Cap Rate Calculator | Free Capitalization Rate Tool',
  description:
    'Calculate the capitalization rate of any investment property instantly. Enter purchase price and operating income to compare deals and evaluate returns. Free, no sign-up required.',
  alternates: { canonical: '/calculators/cap-rate' },
  openGraph: {
    title: 'Cap Rate Calculator | ProInvestorHub',
    description:
      'Free cap rate calculator for real estate investors. Analyze deals in seconds.',
  },
}

export default function CapRateCalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Cap Rate Calculator',
          description:
            'Free capitalization rate calculator for real estate investors. Enter purchase price and operating income to compare deals.',
          url: `${baseUrl}/calculators/cap-rate`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Cap Rate Calculator', url: `${baseUrl}/calculators/cap-rate` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is a good cap rate for rental property?',
            answer:
              'A "good" cap rate depends on your market and strategy. In gateway cities like San Francisco or New York, 3-5% is typical. In secondary markets, 5-7% is common. Cash-flow-focused investors in the Midwest or South often target 7-10%.',
          },
          {
            question: 'What is the cap rate formula?',
            answer:
              'Cap Rate = Net Operating Income (NOI) / Purchase Price × 100. NOI is your annual rental income minus all operating expenses (property taxes, insurance, maintenance, management) but excluding mortgage payments.',
          },
          {
            question: 'Does cap rate include mortgage payments?',
            answer:
              'No. Cap rate measures the unlevered return on a property — it ignores how you finance the purchase. This makes it useful for comparing properties regardless of financing. Use cash-on-cash return to factor in your mortgage.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Cap Rate</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Cap Rate Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Capitalization rate measures the unlevered return on a property
          relative to its purchase price. It&apos;s the fastest way to compare
          deals across markets, property types, and price points.
        </p>
      </div>

      {/* Calculator */}
      <CapRateCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Cap Rate Calculator" calculatorPath="/calculators/cap-rate" />
      </div>

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Use the Cap Rate Calculator
        </h2>
        <div className="mt-6 prose prose-neutral max-w-none text-text-muted leading-7 space-y-4">
          <p>
            <strong className="text-text">1. Enter the purchase price</strong> — the total
            acquisition cost of the property (or current market value if you
            already own it).
          </p>
          <p>
            <strong className="text-text">2. Enter annual gross rent</strong> — the total
            rent you expect to collect each year before any deductions.
          </p>
          <p>
            <strong className="text-text">3. Adjust the vacancy rate</strong> — 5% is a
            reasonable default for stable markets, but adjust up for
            higher-risk areas or turnover-heavy properties.
          </p>
          <p>
            <strong className="text-text">4. Enter operating expenses</strong> — property
            taxes, insurance, maintenance, and management fees. Do{' '}
            <em>not</em> include mortgage payments — cap rate measures the
            property&apos;s return before financing.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          What Is a Good Cap Rate?
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            There&apos;s no single &ldquo;good&rdquo; cap rate — it depends on your strategy,
            market, and risk tolerance:
          </p>
          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-6 text-left font-semibold text-text">
                    Cap Rate
                  </th>
                  <th className="py-3 pr-6 text-left font-semibold text-text">
                    Typical Market
                  </th>
                  <th className="py-3 text-left font-semibold text-text">
                    Investor Profile
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">3-5%</td>
                  <td className="py-3 pr-6">
                    Gateway cities (SF, NYC, LA)
                  </td>
                  <td className="py-3">
                    Appreciation-focused, lower risk
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">5-7%</td>
                  <td className="py-3 pr-6">
                    Secondary markets, suburbs
                  </td>
                  <td className="py-3">Balanced cash flow + growth</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">7-10%</td>
                  <td className="py-3 pr-6">
                    Midwest, South, tertiary markets
                  </td>
                  <td className="py-3">Cash-flow focused</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">10%+</td>
                  <td className="py-3 pr-6">
                    High-risk or distressed areas
                  </td>
                  <td className="py-3">
                    Experienced investors, value-add
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Cap Rate vs. Cash-on-Cash Return
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Cap rate and{' '}
            <Link
              href="/glossary/cash-on-cash-return"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              cash-on-cash return
            </Link>{' '}
            are both essential metrics, but they measure different things:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Cap rate</strong> ignores financing.
              It tells you how the <em>property</em> performs regardless of how
              you pay for it.
            </li>
            <li>
              <strong className="text-text">Cash-on-cash return</strong> factors
              in your mortgage. It tells you how your <em>invested cash</em> is
              performing.
            </li>
          </ul>
          <p>
            Use cap rate to compare properties. Use cash-on-cash to evaluate how
            a specific deal works with your financing.
          </p>
        </div>
      </section>

      {/* Cap Rates by City */}
      <section className="mt-16 max-w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text">
              Cap Rates by City
            </h2>
            <p className="mt-2 text-text-muted">
              Compare cap rates across the top US real estate investing markets.
            </p>
          </div>
          <Link
            href="/calculators/cap-rate/cities"
            className="hidden sm:inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            View All 50 Markets &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cities.slice(0, 10).map((city) => {
            const badgeClass =
              city.avgCapRate >= 10
                ? 'bg-blue-100 text-blue-700'
                : city.avgCapRate >= 8
                  ? 'bg-emerald-100 text-emerald-700'
                  : city.avgCapRate >= 6
                    ? 'bg-emerald-50 text-emerald-600'
                    : city.avgCapRate >= 4
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-600'

            return (
              <Link
                key={city.slug}
                href={`/calculators/cap-rate/${city.slug}`}
                className="rounded-xl border border-border bg-white p-5 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                  {city.city}, {city.state}
                </p>
                <p className="mt-2 text-2xl font-bold text-primary tabular-nums">
                  {city.avgCapRate.toFixed(1)}%
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass}`}
                >
                  {city.avgCapRate >= 10
                    ? 'Excellent'
                    : city.avgCapRate >= 8
                      ? 'Very Good'
                      : city.avgCapRate >= 6
                        ? 'Good'
                        : city.avgCapRate >= 4
                          ? 'Moderate'
                          : 'Low'}
                </span>
                <p className="mt-2 text-xs text-text-light">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(city.medianHomePrice)}{' '}
                  median
                </p>
              </Link>
            )
          })}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/calculators/cap-rate/cities"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            View All 50 Markets &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
