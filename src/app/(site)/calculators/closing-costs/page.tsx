import type { Metadata } from 'next'
import Link from 'next/link'
import { ClosingCostsCalculator } from '@/components/calculators/closing-costs-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Closing Cost Calculator: Estimate Your Cash to Close',
  description:
    'Free closing cost calculator with an itemized breakdown — origination, title, transfer taxes, appraisal, and prepaids — plus your total cash to close. Adjust every line. No sign-up.',
  alternates: { canonical: '/calculators/closing-costs' },
  openGraph: {
    title: 'Closing Cost Calculator | ProInvestorHub',
    description: 'Estimate your closing costs and total cash to close, line by line.',
  },
}

export default function ClosingCostsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Closing Cost Calculator',
          description:
            'Free itemized closing cost calculator — origination, title, transfer taxes, prepaids, and total cash to close.',
          url: `${baseUrl}/calculators/closing-costs`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Closing Cost Calculator', url: `${baseUrl}/calculators/closing-costs` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'How much are closing costs?',
            answer:
              'Buyer closing costs typically run 2–5% of the purchase price, separate from your down payment. The range is wide because some line items — especially transfer and recording taxes — vary dramatically from one state to another.',
          },
          {
            question: 'What is included in closing costs?',
            answer:
              'The main items are loan origination, title insurance and settlement fees, transfer and recording taxes, the appraisal, the inspection, and prepaids (escrow for property taxes, homeowner’s insurance, and prepaid interest). Smaller fees like credit, flood certification, and courier round it out.',
          },
          {
            question: 'Are closing costs separate from the down payment?',
            answer:
              'Yes. Your total cash to close is the down payment plus the closing costs. This calculator adds both so you see the full amount of cash you need at the table, not just the down payment.',
          },
          {
            question: 'Can closing costs be financed or negotiated?',
            answer:
              'Sometimes. You can ask the seller for a credit toward closing costs, and some loan programs let you roll certain costs into the loan (raising your balance and payment). On investment loans, lenders sometimes offer a rate-for-cost trade-off.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Estimate Closing Costs',
          description: 'Build an itemized closing cost estimate and your cash to close in three steps.',
          steps: [
            {
              name: 'Set the price and down payment',
              text: 'Enter the purchase price and down payment percentage to establish the loan amount the percentage-based fees are calculated from.',
            },
            {
              name: 'Itemize the line items',
              text: 'Adjust each cost — origination, title, transfer/recording, appraisal, inspection, prepaids, and other fees — to match your lender and state.',
            },
            {
              name: 'Total the cash to close',
              text: 'Add the closing costs to the down payment to see the full cash you need at the closing table.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Closing Cost Calculator</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Closing Cost Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Closing costs are the fees on top of your down payment — and they swing widely by state and
          lender. Adjust each line item below to build a realistic estimate and see the full cash
          you&apos;ll need at the table.
        </p>
      </div>

      <ClosingCostsCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Closing Cost Calculator" calculatorPath="/calculators/closing-costs" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">What Goes Into Closing Costs</h2>
        <p className="mt-4 text-text-muted leading-7">
          Closing costs generally total 2–5% of the purchase price. They break into percentage-based
          fees and flat fees:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Cash to Close = Down Payment + Total Closing Costs
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            On a <strong className="text-text">$300,000</strong> purchase with{' '}
            <strong className="text-text">20% down</strong> ($60,000, $240,000 financed): roughly{' '}
            <strong className="text-text">$2,400</strong> origination, <strong className="text-text">$1,500</strong>{' '}
            title, <strong className="text-text">$1,500</strong> transfer/recording, plus the
            appraisal, inspection, prepaids, and other fees — about{' '}
            <strong className="text-primary">$9,750</strong> in closing costs, or ~3.3% of price. Add
            the down payment and your total cash to close is around{' '}
            <strong className="text-text">$69,750</strong>.
          </p>
        </div>
        <p className="mt-6 text-text-muted leading-7">
          Transfer taxes are the biggest state-to-state variable — some states have none, others
          charge over 1%. Your lender&apos;s Loan Estimate gives the binding figures. Pair this with the{' '}
          <Link href="/calculators/mortgage" className="text-primary hover:text-primary-light underline transition-colors">
            mortgage calculator
          </Link>{' '}
          for the payment and the{' '}
          <Link href="/calculators/cash-on-cash" className="text-primary hover:text-primary-light underline transition-colors">
            cash-on-cash calculator
          </Link>{' '}
          to fold closing costs into your real return.
        </p>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
          { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
          { label: 'Mortgage Points', href: '/calculators/mortgage-points' },
          { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
        ]}
      />
    </div>
  )
}
