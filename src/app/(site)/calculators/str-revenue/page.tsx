import type { Metadata } from 'next'
import Link from 'next/link'
import { STRCalculator } from '@/components/calculators/str-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Short-Term Rental Revenue Calculator | STR Income Estimator',
  description:
    'Estimate your Airbnb or VRBO rental income with this free STR revenue calculator. Factor in occupancy, nightly rate, cleaning fees, and all operating expenses to see your true net income.',
  alternates: { canonical: '/calculators/str-revenue' },
  openGraph: {
    title: 'Short-Term Rental Revenue Calculator | ProInvestorHub',
    description:
      'Free STR revenue calculator for real estate investors. Estimate Airbnb income, expenses, and net cash flow.',
  },
}

export default function STRRevenueCalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Short-Term Rental Revenue Calculator',
          description:
            'Free STR revenue calculator for real estate investors. Estimate nightly rental income, operating expenses, and net cash flow for Airbnb and VRBO properties.',
          url: `${baseUrl}/calculators/str-revenue`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          {
            name: 'STR Revenue Calculator',
            url: `${baseUrl}/calculators/str-revenue`,
          },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question:
              'What is a good occupancy rate for a short-term rental?',
            answer:
              'A good occupancy rate depends on your market and pricing strategy. Nationally, STR occupancy averages 55-65%. Top-performing properties in high-demand markets can hit 75-85%. However, a lower occupancy rate at a higher nightly rate can sometimes generate more revenue than high occupancy at a discount.',
          },
          {
            question: 'How much can you make on Airbnb?',
            answer:
              'Airbnb income varies widely by location, property size, and management quality. A well-located 2-bedroom in a popular market might gross $30,000-$60,000 per year. After expenses (cleaning, platform fees, management, insurance, maintenance, and furnishing costs), net income typically ranges from $1,000-$3,000 per month for a solid performer.',
          },
          {
            question: 'What expenses should STR hosts expect?',
            answer:
              'STR expenses include cleaning costs per turnover, platform fees (3% for Airbnb host-only), property management (15-25% if not self-managed), higher utilities (guests use more), supplies and consumables, STR-specific insurance, property taxes, increased maintenance from higher wear and tear, and furnishing costs amortized over 3 years. Total expenses typically run 40-60% of gross revenue.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link
          href="/calculators"
          className="hover:text-primary transition-colors"
        >
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">STR Revenue</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Short-Term Rental Revenue Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Estimate your Airbnb, VRBO, or vacation rental income by factoring
          in nightly rate, occupancy, cleaning fees, and every operating
          expense. See your true monthly net income before you buy or list.
        </p>
      </div>

      {/* Calculator */}
      <STRCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Short-Term Rental Calculator" calculatorPath="/calculators/str-revenue" />
      </div>

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Use This Calculator
        </h2>
        <div className="mt-6 prose prose-neutral max-w-none text-text-muted leading-7 space-y-4">
          <p>
            <strong className="text-text">1. Set your nightly rate</strong> —
            use the average across all seasons. Check comparable listings on
            Airbnb or use tools like AirDNA and PriceLabs to find your
            market&apos;s going rate.
          </p>
          <p>
            <strong className="text-text">2. Adjust occupancy</strong> — 65%
            is a reasonable starting assumption. New listings often start
            lower (50-55%) and climb as reviews accumulate. Seasonal markets
            may swing between 30% and 90%.
          </p>
          <p>
            <strong className="text-text">3. Enter your cleaning fee</strong>{' '}
            — this is the fee guests pay per booking. Your actual cleaning
            cost (what you pay the cleaner) goes in the expenses section. The
            difference is additional revenue.
          </p>
          <p>
            <strong className="text-text">4. Fill in all expenses</strong> —
            STR costs are higher and more variable than long-term rentals.
            Don&apos;t forget furnishing amortization, which accounts for the
            upfront cost of outfitting the property.
          </p>
          <p>
            <strong className="text-text">
              5. Review your breakeven occupancy
            </strong>{' '}
            — this tells you the minimum occupancy you need to cover all
            expenses. If it&apos;s above 70%, you have little margin for
            error.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          STR Revenue Factors
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Short-term rental income isn&apos;t static — it fluctuates based
            on several factors that long-term rental investors rarely
            consider:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Seasonality</strong> — Most
              markets have peak and off-peak seasons. Beach properties may
              earn 70% of annual revenue in 4 summer months. Mountain
              properties spike during ski season. Urban properties tend to be
              more stable year-round.
            </li>
            <li>
              <strong className="text-text">Location and walkability</strong>{' '}
              — Proximity to attractions, restaurants, and transit drives
              higher rates and occupancy. A property 5 minutes from downtown
              will outperform one 30 minutes away.
            </li>
            <li>
              <strong className="text-text">Amenities</strong> — Hot tubs,
              pools, game rooms, and EV chargers can justify a 15-30%
              nightly rate premium. Even small touches like a coffee station,
              fast WiFi, and smart locks improve guest satisfaction and
              reviews.
            </li>
            <li>
              <strong className="text-text">Reviews and Superhost status</strong>{' '}
              — Properties with 50+ five-star reviews get significantly more
              bookings and can charge higher rates. Superhost status on
              Airbnb adds another 5-10% booking boost.
            </li>
            <li>
              <strong className="text-text">Dynamic pricing</strong> —
              Tools like PriceLabs, Beyond Pricing, and Wheelhouse
              automatically adjust your nightly rate based on demand, local
              events, and competitor pricing. Most successful hosts use
              dynamic pricing.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          STR vs. Long-Term Rental
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Short-term rentals can generate 2-3x the gross revenue of a
            comparable long-term rental — but they come with higher expenses,
            more management overhead, and greater income volatility.
            Here&apos;s a quick comparison:
          </p>
          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-6 text-left font-semibold text-text">
                    Factor
                  </th>
                  <th className="py-3 pr-6 text-left font-semibold text-text">
                    Short-Term Rental
                  </th>
                  <th className="py-3 text-left font-semibold text-text">
                    Long-Term Rental
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Revenue potential</td>
                  <td className="py-3 pr-6">Higher (2-3x gross)</td>
                  <td className="py-3">Stable, predictable</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Expense ratio</td>
                  <td className="py-3 pr-6">40-60% of gross</td>
                  <td className="py-3">30-45% of gross</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Management effort</td>
                  <td className="py-3 pr-6">High (or 20%+ to outsource)</td>
                  <td className="py-3">Low (8-10% to outsource)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Vacancy risk</td>
                  <td className="py-3 pr-6">Seasonal fluctuations</td>
                  <td className="py-3">Turnover between leases</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Furnishing cost</td>
                  <td className="py-3 pr-6">$10K-$30K upfront</td>
                  <td className="py-3">Minimal or none</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Use our{' '}
            <Link
              href="/calculators/rental-cashflow"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              Rental Cash Flow Calculator
            </Link>{' '}
            to model the same property as a long-term rental and compare. For a
            deeper dive, read{' '}
            <Link
              href="/blog/str-vs-ltr-rental-strategy"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              STR vs. Long-Term Rental: Which Strategy Fits Your Goals?
            </Link>
          </p>
          <p>
            Already know which route you want to go? Check the{' '}
            <Link
              href="/calculators/cap-rate"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              Cap Rate Calculator
            </Link>{' '}
            to evaluate the property&apos;s unlevered return, or explore key
            terms like{' '}
            <Link
              href="/glossary/cash-flow"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              cash flow
            </Link>
            ,{' '}
            <Link
              href="/glossary/occupancy-rate"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              occupancy rate
            </Link>
            , and{' '}
            <Link
              href="/glossary/noi"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              net operating income (NOI)
            </Link>{' '}
            in our glossary.
          </p>
        </div>
      </section>
    </div>
  )
}
