import type { Metadata } from 'next'
import Link from 'next/link'
import { DscrCalculator } from '@/components/calculators/dscr-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'DSCR Loan Calculator: Will Your Rental Qualify? (+ Max Loan)',
  description:
    'Free DSCR loan calculator. Enter rent, loan, and carrying costs to see your debt service coverage ratio, whether the property qualifies, and the maximum loan at your target DSCR. No sign-up.',
  alternates: { canonical: '/calculators/dscr' },
  openGraph: {
    title: 'DSCR Loan Calculator | ProInvestorHub',
    description:
      'Check whether a rental qualifies for a DSCR loan and find the max loan at your target ratio.',
  },
}

export default function DscrPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'DSCR Loan Calculator',
          description:
            'Free DSCR (debt service coverage ratio) calculator for real estate investors. Check qualification and the maximum loan at a target DSCR.',
          url: `${baseUrl}/calculators/dscr`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'DSCR Loan Calculator', url: `${baseUrl}/calculators/dscr` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What DSCR do I need to qualify for a DSCR loan?',
            answer:
              'Most DSCR lenders require a minimum debt service coverage ratio of 1.0 — meaning the gross rent at least equals the full mortgage payment (principal, interest, taxes, insurance, and HOA). Some programs go down to 0.75 at a higher rate, while a DSCR of 1.25 or higher unlocks the best rates and leverage.',
          },
          {
            question: 'How is DSCR calculated for a rental property?',
            answer:
              'DSCR lenders divide the property’s gross monthly rent by its total monthly PITIA (principal, interest, taxes, insurance, and association dues). A result of 1.20 means the rent covers the payment 1.2 times over. This is simpler than the net-operating-income version used in commercial lending.',
          },
          {
            question: 'How can I improve a property’s DSCR?',
            answer:
              'Lower the payment or raise the rent. A larger down payment shrinks the loan and the P&I; buying down the rate helps; and a property that rents above market pro forma lifts the ratio. The calculator’s max-loan figure shows exactly how large a loan the rent will support at your target DSCR.',
          },
          {
            question: 'What is the difference between this and a mortgage calculator?',
            answer:
              'A mortgage calculator tells you the monthly payment. This DSCR calculator answers the qualification question — whether the rent covers that payment by enough to satisfy a DSCR lender, and the largest loan that still clears your target ratio.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate DSCR for a Rental Property',
          description:
            'Calculate a rental property’s debt service coverage ratio in three steps using gross rent and the full monthly payment.',
          steps: [
            {
              name: 'Find the total monthly payment (PITIA)',
              text: 'Add principal and interest to the monthly property taxes, insurance, and any HOA dues. This full payment is the “debt service.”',
            },
            {
              name: 'Take the gross monthly rent',
              text: 'Use the market rent the property commands — from a signed lease or an appraiser’s rent schedule.',
            },
            {
              name: 'Divide rent by PITIA',
              text: 'Gross rent divided by total PITIA is the DSCR. For example, $2,400 rent on a $2,000 payment is a 1.20 DSCR — the rent covers the payment 1.2 times.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">DSCR Loan Calculator</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">DSCR Loan Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          A{' '}
          <Link
            href="/lenders/dscr-loans"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            DSCR loan
          </Link>{' '}
          qualifies on the property&apos;s rent, not your personal income. Enter the rent, loan, and
          carrying costs to see your debt service coverage ratio, whether it clears your lender&apos;s
          minimum, and the largest loan the rent will support.
        </p>
      </div>

      <DscrCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="DSCR Loan Calculator" calculatorPath="/calculators/dscr" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How to Calculate DSCR (Formula &amp; Example)</h2>
        <p className="mt-4 text-text-muted leading-7">
          DSCR lenders use a simple, rent-based formula — not the net-operating-income version from
          commercial underwriting. It is just the gross rent divided by the full monthly payment:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            DSCR = Gross Monthly Rent &divide; Total PITIA
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            A property rents for <strong className="text-text">$2,400</strong> a month. The
            $240,000 loan at 7.5% over 30 years runs about $1,678 in principal and interest; add
            $300 in monthly taxes and $125 in insurance and the full payment (PITIA) is roughly{' '}
            <strong className="text-text">$2,103</strong>. Dividing $2,400 by $2,103 gives a DSCR of{' '}
            <strong className="text-primary">1.14</strong> — above the common 1.0 minimum, so the
            property qualifies, though not yet at the 1.25 tier that earns the best pricing.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">What DSCR Do You Need to Qualify?</h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Under 1.0:</strong> the rent does not cover the payment.
              Most lenders decline, or require a larger down payment to shrink the loan. A few run
              sub-1.0 programs at a higher rate.
            </li>
            <li>
              <strong className="text-text">1.0–1.24:</strong> qualifies with most DSCR lenders. The
              standard target, and where a lot of buy-and-hold deals land.
            </li>
            <li>
              <strong className="text-text">1.25+:</strong> the sweet spot — typically the best rates
              and the highest leverage.
            </li>
          </ul>
          <p>
            Want the monthly payment broken down with a full amortization schedule? Use the{' '}
            <Link
              href="/calculators/mortgage"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              mortgage &amp; DSCR payment calculator
            </Link>
            . Not sure DSCR is even the right product for your deal? Run the{' '}
            <Link
              href="/financing/matcher"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              Financing Matcher
            </Link>
            , or compare{' '}
            <Link
              href="/lenders/dscr-loans"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              DSCR lenders
            </Link>{' '}
            side by side.
          </p>
        </div>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
          { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
          { label: 'Financing Matcher', href: '/financing/matcher' },
          { label: 'Compare DSCR Lenders', href: '/lenders/dscr-loans', muted: true },
        ]}
      />
    </div>
  )
}
