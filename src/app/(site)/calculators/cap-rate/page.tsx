import type { Metadata } from 'next'
import Link from 'next/link'
import { CapRateCalculator } from '@/components/calculators/cap-rate-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { cities } from '@/data/cap-rate-cities'

export const metadata: Metadata = {
  title: 'Cap Rate Calculator + Formula: How to Calculate Cap Rate',
  description:
    'Free cap rate calculator plus the cap rate formula and a step-by-step example. Calculate the capitalization rate of any rental property instantly and learn how to do it by hand. No sign-up required.',
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
          {
            question: 'How do you calculate cap rate?',
            answer:
              'Calculate net operating income (NOI) by subtracting annual operating expenses and a vacancy allowance from gross rental income, then divide NOI by the purchase price and multiply by 100. For example, $21,000 NOI on a $300,000 property is a 7.0% cap rate.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate Cap Rate',
          description:
            'Calculate the capitalization rate of a rental property in three steps using net operating income and purchase price.',
          steps: [
            {
              name: 'Calculate effective gross income',
              text: 'Add up the total rent the property collects in a year, then subtract a vacancy allowance (typically 5%) to get effective gross income.',
            },
            {
              name: 'Subtract operating expenses to find NOI',
              text: 'Deduct all annual operating expenses — property taxes, insurance, maintenance, and property management — from effective gross income. Do not include mortgage payments. The result is net operating income (NOI).',
            },
            {
              name: 'Divide NOI by the purchase price',
              text: 'Divide NOI by the property purchase price or current market value and multiply by 100. For example, $21,000 NOI on a $300,000 property is a 7.0% cap rate.',
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

      {/* How to Calculate — formula + worked example */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Calculate Cap Rate (Formula &amp; Example)
        </h2>
        <p className="mt-4 text-text-muted leading-7">
          The calculator above runs the numbers instantly, but the cap rate
          formula is simple enough to do by hand. Cap rate is a property&apos;s{' '}
          <Link
            href="/glossary/noi"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            net operating income (NOI)
          </Link>{' '}
          divided by its purchase price, expressed as a percentage:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Cap Rate = (Net Operating Income &divide; Purchase Price) &times; 100
          </p>
        </div>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            <strong className="text-text">Step 1 — Find effective gross income.</strong>{' '}
            Add up the annual rent the property collects, then subtract a
            vacancy allowance (5% is a reasonable default) to reflect months
            the unit sits empty.
          </p>
          <p>
            <strong className="text-text">Step 2 — Subtract operating expenses to get NOI.</strong>{' '}
            Deduct property taxes, insurance, maintenance, and management from
            effective gross income. Do <em>not</em> include mortgage payments —
            cap rate measures the property&apos;s return before financing.
          </p>
          <p>
            <strong className="text-text">Step 3 — Divide NOI by the purchase price.</strong>{' '}
            Multiply by 100 to get a percentage.
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            You&apos;re evaluating a <strong className="text-text">$300,000</strong> rental
            that brings in <strong className="text-text">$30,000</strong> a year in gross
            rent. After a 5% vacancy allowance ($1,500), effective gross income
            is $28,500. Operating expenses run <strong className="text-text">$7,500</strong>,
            leaving an NOI of <strong className="text-text">$21,000</strong>. Dividing
            $21,000 by $300,000 gives a cap rate of{' '}
            <strong className="text-primary">7.0%</strong> — a solid cash-flow number
            for most secondary markets.
          </p>
        </div>
        <p className="mt-6 text-text-muted leading-7">
          Want the deeper context behind the number? Read{' '}
          <Link
            href="/blog/cap-rate-explained"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            Cap Rate Explained
          </Link>
          , compare it with another key metric in{' '}
          <Link
            href="/blog/cash-on-cash-vs-cap-rate"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            Cash-on-Cash Return vs. Cap Rate
          </Link>
          , or see how falling cap rates affect value in{' '}
          <Link
            href="/blog/cap-rate-compression-explained"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            Cap Rate Compression Explained
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

        <h2 className="mt-12 text-2xl font-bold text-text">
          Cap Rate With a Mortgage
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            A question we get constantly: <em>does cap rate include the mortgage?</em>{' '}
            No — cap rate deliberately ignores financing so you can compare
            properties on equal footing, whether you pay cash or borrow. Two
            investors buying the same building get the same cap rate even with
            very different loans.
          </p>
          <p>
            To see how a mortgage changes your <em>actual</em> return, run the
            numbers in two passes. Use this cap rate calculator to judge the{' '}
            <strong className="text-text">property</strong>, then layer in your
            financing with the{' '}
            <Link
              href="/calculators/cash-on-cash"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              cash-on-cash return calculator
            </Link>{' '}
            and the{' '}
            <Link
              href="/calculators/mortgage"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              mortgage &amp; DSCR calculator
            </Link>
            . Leverage can lift a 6% cap-rate property to a double-digit
            cash-on-cash return — or erase it entirely if the monthly payment
            outruns your net operating income.
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

      <CalculatorRelatedTools
        tools={[
          { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
          { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
          { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
          { label: 'Financing Matcher', href: '/financing/matcher' },
        ]}
      />
    </div>
  )
}
