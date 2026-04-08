import type { Metadata } from 'next'
import Link from 'next/link'
import { RentalCashFlowCalculator } from '@/components/calculators/rental-cashflow-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Rental Cash Flow Calculator | Monthly & Annual Projections',
  description:
    'Project monthly and annual cash flow for rental properties. Enter rent, expenses, and mortgage to see your net cash flow instantly. Supports multi-unit properties.',
  alternates: { canonical: '/calculators/rental-cashflow' },
  openGraph: {
    title: 'Rental Cash Flow Calculator | ProInvestorHub',
    description:
      'Free rental cash flow calculator with detailed expense breakdowns and multi-unit support.',
  },
}

export default function RentalCashFlowPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Rental Cash Flow Calculator',
          description:
            'Free rental cash flow calculator for real estate investors. Project monthly and annual net cash flow with detailed expense breakdowns.',
          url: `${baseUrl}/calculators/rental-cashflow`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Rental Cash Flow', url: `${baseUrl}/calculators/rental-cashflow` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is positive cash flow in real estate?',
            answer:
              'Positive cash flow means the property generates more rental income than it costs to own and operate (including mortgage, taxes, insurance, maintenance, and management). The property pays for itself and puts money in your pocket each month.',
          },
          {
            question: 'How much cash flow should a rental property generate?',
            answer:
              'Many investors use the "$100 per unit per month" rule of thumb as a minimum. For a single-family rental, that means at least $100/month after all expenses. More experienced investors target $200-300+ per unit.',
          },
          {
            question: 'What expenses should I include in a cash flow analysis?',
            answer:
              'Include property taxes, insurance, maintenance (5-10% of gross rent), property management (8-10%), vacancy (5-8%), utilities you pay, HOA fees, and mortgage payment (P&I). Budget for all expenses even if you self-manage.',
          },
        ])}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Rental Cash Flow</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Rental Cash Flow Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Cash flow is the lifeblood of rental investing. This calculator gives
          you a complete monthly and annual projection — from gross rent to
          net cash flow after all expenses and mortgage payments.
        </p>
      </div>

      <RentalCashFlowCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Rental Cash Flow Calculator" calculatorPath="/calculators/rental-cashflow" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          Understanding Rental Cash Flow
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Rental cash flow is the money left over after collecting rent and
            paying all expenses — operating costs and debt service. Positive
            cash flow means the property pays for itself and puts money in your
            pocket. Negative cash flow means you&apos;re subsidizing the property
            out of your own funds.
          </p>
          <p>
            The formula is straightforward:
          </p>
          <div className="rounded-lg bg-surface p-4 text-center text-sm font-medium text-text">
            Cash Flow = Effective Rental Income &minus; Operating Expenses &minus; Mortgage Payment
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Key Expenses to Include
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Property taxes</strong> — Check your
              county assessor&apos;s website for exact amounts. Don&apos;t use the
              seller&apos;s tax bill; reassessment after purchase may change it.
            </li>
            <li>
              <strong className="text-text">Insurance</strong> — Landlord
              policies (DP-3) cost more than homeowner policies. Get quotes
              before closing.
            </li>
            <li>
              <strong className="text-text">Maintenance</strong> — Budget 5-10%
              of gross rent. Older properties and those with deferred
              maintenance need more.
            </li>
            <li>
              <strong className="text-text">Property management</strong> —
              Typically 8-10% of collected rent. Include this even if you
              self-manage — your time has value.
            </li>
            <li>
              <strong className="text-text">Vacancy</strong> — 5% is standard
              for stable markets. Use 8-10% for areas with higher turnover.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Multi-Unit Properties
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Use the &ldquo;Add Unit&rdquo; button to model duplexes, triplexes, and
            quads. Multi-unit properties often generate better cash flow per
            dollar invested because expenses are shared across units while each
            unit contributes rent independently.
          </p>
        </div>
      </section>
    </div>
  )
}
