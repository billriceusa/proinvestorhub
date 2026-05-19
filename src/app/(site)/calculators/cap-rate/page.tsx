import type { Metadata } from 'next'
import Link from 'next/link'
import { CapRateCalculator } from '@/components/calculators/cap-rate-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'
import { cities } from '@/data/cap-rate-cities'

export const metadata: Metadata = {
  title: 'Cap Rate Calculator: Calculate Cap Rate Instantly (Free)',
  description:
    'Calculate the cap rate of any rental property in seconds. Free cap rate calculator with the NOI ÷ purchase price formula, a worked example, and cap rates for 50 US markets. No sign-up.',
  alternates: { canonical: '/calculators/cap-rate' },
  openGraph: {
    title: 'Cap Rate Calculator – Calculate Cap Rate Free | ProInvestorHub',
    description:
      'How to calculate cap rate with a free interactive tool: enter purchase price and operating income, get your cap rate plus the formula and a worked example.',
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
          {
            question: 'How do you calculate the cap rate?',
            answer:
              'Calculate cap rate in three steps: (1) add up annual gross rent and subtract a vacancy allowance to get effective income, (2) subtract operating expenses (taxes, insurance, maintenance, management — not the mortgage) to get net operating income, and (3) divide NOI by the purchase price and multiply by 100. Example: a $300,000 property with $24,000 NOI has a cap rate of 8.0%.',
          },
          {
            question: 'What is a cap rate calculation example?',
            answer:
              'A $300,000 rental collects $30,000 gross rent. Apply a 5% vacancy ($1,500) for $28,500 effective income, then subtract $4,500 in operating expenses for $24,000 NOI. $24,000 ÷ $300,000 × 100 = an 8.0% cap rate.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate Cap Rate',
          description:
            'Calculate the capitalization rate of a rental property from net operating income and purchase price.',
          steps: [
            {
              name: 'Find effective gross income',
              text: 'Start with annual gross rent and subtract a vacancy allowance (5% is a common default) to get effective income.',
            },
            {
              name: 'Subtract operating expenses to get NOI',
              text: 'Deduct property taxes, insurance, maintenance, and management fees — but not mortgage payments — to get net operating income (NOI).',
            },
            {
              name: 'Divide NOI by purchase price',
              text: 'Divide NOI by the property purchase price (or current market value) and multiply by 100 to express the cap rate as a percentage.',
            },
          ],
        })}
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

      {/* Formula-first answer block — targets "calculate cap rate" / "cap rate formula" / "cap rate calculation" intent */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Calculate Cap Rate (Formula + Example)
        </h2>
        <p className="mt-4 text-text-muted leading-7">
          To calculate the cap rate, divide a property&apos;s annual net
          operating income by its purchase price. It takes three steps:
          find effective income, subtract operating expenses to get NOI, then
          divide by price.
        </p>

        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Cap Rate Formula
          </p>
          <p className="mt-3 text-xl font-bold text-text sm:text-2xl">
            Cap Rate = (Net Operating Income ÷ Purchase Price) × 100
          </p>
          <p className="mt-3 text-sm text-text-muted">
            NOI excludes mortgage payments — cap rate measures the property&apos;s
            return before financing.
          </p>
        </div>

        <h3 className="mt-8 text-lg font-semibold text-text">
          Worked example
        </h3>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-text-muted leading-7">
          <li>
            A $300,000 rental collects <strong className="text-text">$30,000</strong> in
            annual gross rent.
          </li>
          <li>
            Apply a 5% vacancy allowance (&minus;$1,500) →{' '}
            <strong className="text-text">$28,500</strong> effective income.
          </li>
          <li>
            Subtract $4,500 in operating expenses (taxes, insurance,
            maintenance, management) → <strong className="text-text">$24,000</strong> NOI.
          </li>
          <li>
            $24,000 ÷ $300,000 × 100 ={' '}
            <strong className="text-primary">8.0% cap rate</strong>.
          </li>
        </ol>
        <p className="mt-4 text-text-muted leading-7">
          Use the calculator above to run these numbers for your own deal, or
          compare typical{' '}
          <Link
            href="/calculators/cap-rate/cities"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            cap rates across 50 US markets
          </Link>
          .
        </p>
      </section>

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
