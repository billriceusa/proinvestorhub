import type { Metadata } from 'next'
import Link from 'next/link'
import { MortgagePointsCalculator } from '@/components/calculators/mortgage-points-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Mortgage Points Calculator: Break-Even & Monthly Savings',
  description:
    'Free mortgage points calculator. See the cost of buying discount points, your monthly payment savings, and the break-even month — so you know whether paying points pays off. No sign-up.',
  alternates: { canonical: '/calculators/mortgage-points' },
  openGraph: {
    title: 'Mortgage Points Calculator | ProInvestorHub',
    description: 'See whether buying mortgage points pays off — break-even and savings in seconds.',
  },
}

export default function MortgagePointsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Mortgage Points Calculator',
          description:
            'Free mortgage discount points calculator — cost of points, monthly savings, and break-even month.',
          url: `${baseUrl}/calculators/mortgage-points`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Mortgage Points Calculator', url: `${baseUrl}/calculators/mortgage-points` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is a mortgage point?',
            answer:
              'A discount point is a fee equal to 1% of the loan amount, paid at closing to buy down your interest rate. Each point typically lowers the rate by about 0.25%, though the exact reduction varies by lender and market.',
          },
          {
            question: 'How do I calculate the break-even on points?',
            answer:
              'Divide the cost of the points by the monthly payment savings they produce. The result is the number of months you must keep the loan to recoup the cost. Keep the loan past that point and the points save you money; sell or refinance sooner and they cost you.',
          },
          {
            question: 'Are mortgage points worth it?',
            answer:
              'Points pay off when you hold the loan well past the break-even month. If you expect to keep the property and the financing for many years, buying points can save real money over the life of the loan. If you may sell or refinance soon, they usually are not worth it.',
          },
          {
            question: 'Are points tax-deductible on an investment property?',
            answer:
              'Points on an investment property are generally amortized and deducted over the life of the loan rather than all at once. Rules differ for a primary residence. Confirm the treatment with a tax professional.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate Mortgage Points Break-Even',
          description: 'Decide whether buying discount points pays off in three steps.',
          steps: [
            {
              name: 'Find the cost of the points',
              text: 'Multiply the loan amount by the number of points as a percentage. Two points on a $320,000 loan costs $6,400.',
            },
            {
              name: 'Find the monthly savings',
              text: 'Compare the monthly payment at your base rate to the payment at the reduced rate (base rate minus the rate cut per point). The difference is your monthly savings.',
            },
            {
              name: 'Divide to get the break-even',
              text: 'Divide the cost of the points by the monthly savings. That is how many months you must keep the loan for the points to pay for themselves.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Mortgage Points Calculator</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Mortgage Points Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Buying discount points lowers your rate — but only pays off if you keep the loan long
          enough. Enter your loan and the points to see the cost, your monthly savings, and exactly
          when you break even.
        </p>
      </div>

      <MortgagePointsCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Mortgage Points Calculator" calculatorPath="/calculators/mortgage-points" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How Buying Points Works</h2>
        <p className="mt-4 text-text-muted leading-7">
          A point costs 1% of your loan and buys down your rate — usually about 0.25% per point. The
          decision is a simple break-even:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Break-Even Months = Cost of Points &divide; Monthly Savings
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            On a <strong className="text-text">$320,000</strong> loan at{' '}
            <strong className="text-text">7%</strong> over 30 years, buying{' '}
            <strong className="text-text">1 point</strong> ($3,200) cuts the rate to{' '}
            <strong className="text-text">6.75%</strong>. The payment drops from about{' '}
            <strong className="text-text">$2,129</strong> to <strong className="text-text">$2,076</strong>
            , saving roughly <strong className="text-emerald-600">$53</strong> a month — so you break
            even in about <strong className="text-primary">60 months</strong>. Keep the loan past five
            years and the point pays off; refinance sooner and it doesn&apos;t.
          </p>
        </div>
        <p className="mt-6 text-text-muted leading-7">
          Comparing points across loans is really a question of how long you&apos;ll hold the financing.
          If a refinance may be on the horizon, run the{' '}
          <Link href="/calculators/refinance" className="text-primary hover:text-primary-light underline transition-colors">
            refinance break-even
          </Link>{' '}
          too, and check the underlying payment with the{' '}
          <Link href="/calculators/mortgage" className="text-primary hover:text-primary-light underline transition-colors">
            mortgage calculator
          </Link>
          .
        </p>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
          { label: 'Refinance Calculator', href: '/calculators/refinance' },
          { label: 'Closing Cost Calculator', href: '/calculators/closing-costs' },
          { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
        ]}
      />
    </div>
  )
}
