import type { Metadata } from 'next'
import Link from 'next/link'
import { HelocCalculator } from '@/components/calculators/heloc-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Investment Property HELOC Calculator: Tappable Equity & Buying Power',
  description:
    'Free HELOC calculator for rental and investment properties. See how much equity you can tap, the monthly cost, and how many more deals it funds. Works for HELOCs, home equity loans, and cash-out refinances. No sign-up.',
  alternates: { canonical: '/calculators/heloc' },
  openGraph: {
    title: 'Investment Property HELOC Calculator | ProInvestorHub',
    description:
      'See how much equity you can pull from a rental or investment property and turn it into your next down payment.',
  },
}

export default function HelocPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Investment Property HELOC Calculator',
          description:
            'Free HELOC and equity-unlock calculator for rental and investment properties. Estimate tappable equity, monthly cost, and reinvestment buying power.',
          url: `${baseUrl}/calculators/heloc`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Investment Property HELOC', url: `${baseUrl}/calculators/heloc` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'Can you get a HELOC on an investment property?',
            answer:
              'Yes, but fewer lenders offer them and the terms are stricter than on a primary residence. Expect a lower combined loan-to-value cap (typically 70-80% versus 85-90% for a primary home), higher interest rates, stronger credit and reserve requirements, and more documentation. Portfolio lenders, credit unions, and local banks are the most common sources.',
          },
          {
            question: 'How much equity can I borrow against a rental property?',
            answer:
              'Take the property value, multiply it by the lender\'s maximum combined loan-to-value (CLTV), and subtract your current mortgage balance. For example, a $300,000 rental at a 75% CLTV cap supports $225,000 of total debt; if you owe $150,000, you can tap about $75,000.',
          },
          {
            question: 'HELOC, home equity loan, or cash-out refinance — which is better for investors?',
            answer:
              'A HELOC is a revolving line you draw on as needed, good for staged rehabs or rotating down payments. A home equity loan is a lump sum at a fixed rate, good for a single known expense. A cash-out refinance replaces your existing mortgage with a larger one, best when you can also improve your first-mortgage rate or want one consolidated payment. All three are limited by the same CLTV math this calculator shows.',
          },
          {
            question: 'Is the interest on an investment property HELOC tax deductible?',
            answer:
              'When the borrowed funds are used for the rental business — buying or improving investment property — the interest is generally deductible as a business expense on Schedule E. Rules differ from the primary-residence mortgage-interest deduction, so confirm your specific situation with a tax professional.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate Tappable Equity on an Investment Property',
          description:
            'Estimate how much equity you can borrow against a rental or investment property in three steps using value, CLTV, and your current loan balance.',
          steps: [
            {
              name: 'Find your maximum allowed debt',
              text: 'Multiply the property\'s current value by the lender\'s maximum combined loan-to-value (CLTV). For investment properties this cap is usually 70-80%.',
            },
            {
              name: 'Subtract your current balance',
              text: 'Subtract everything you still owe on the property from that maximum. The difference is your tappable equity — the most you can borrow with a HELOC, home equity loan, or cash-out refinance.',
            },
            {
              name: 'Translate it into buying power',
              text: 'Divide your tappable equity by the down payment your next deal requires to see how many additional properties that equity can help you acquire.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Investment Property HELOC</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Investment Property HELOC Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          The equity sitting in your rentals is buying power for the next deal.
          Enter a property&apos;s value, what you owe, and a lender&apos;s loan-to-value
          cap to see how much you can pull with a HELOC, home equity loan, or{' '}
          <Link
            href="/lenders/dscr-loans"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            cash-out refinance
          </Link>{' '}
          — and how many more doors it funds.
        </p>
      </div>

      <HelocCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed
          calculatorName="Investment Property HELOC Calculator"
          calculatorPath="/calculators/heloc"
        />
      </div>

      {/* How to Calculate — formula + worked example */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Calculate Tappable Equity (Formula &amp; Example)
        </h2>
        <p className="mt-4 text-text-muted leading-7">
          Lenders don&apos;t let you borrow against every dollar of equity. They cap
          your <em>combined</em> loan-to-value — first mortgage plus the new line
          — at a set percentage. Tappable equity is whatever room is left under
          that cap:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Tappable Equity = (Property Value &times; Max CLTV) &minus; Current Loan Balance
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            Your rental is worth <strong className="text-text">$300,000</strong>{' '}
            and you owe <strong className="text-text">$150,000</strong> — that&apos;s
            $150,000 of equity, or 50% of the value. But a lender capping
            investment-property borrowing at{' '}
            <strong className="text-text">75% CLTV</strong> will only allow{' '}
            $225,000 of total debt. Subtract your $150,000 balance and you can
            tap about <strong className="text-primary">$75,000</strong> — not the
            full $150,000 of equity. At 25% down on a $200,000 next purchase,
            that funds the down payment on <strong className="text-text">one more deal</strong>.
          </p>
        </div>
      </section>

      {/* Can you get a HELOC on an investment property */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          Can You Get a HELOC on a Rental or Investment Property?
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Yes — but it&apos;s a different animal than the HELOC on your house. Banks
            treat a loan against a property you don&apos;t live in as higher risk, so
            the terms tighten across the board:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Lower CLTV caps.</strong> Where a
              primary residence might allow 85–90% combined loan-to-value,
              investment properties are commonly limited to 70–80%.
            </li>
            <li>
              <strong className="text-text">Higher rates.</strong> Expect a
              premium over primary-residence home equity products to compensate
              for the added risk.
            </li>
            <li>
              <strong className="text-text">Stricter qualifying.</strong> Higher
              credit-score floors, cash reserves covering several months of
              payments, and more scrutiny of your rental income.
            </li>
            <li>
              <strong className="text-text">Fewer lenders.</strong> Many big
              banks don&apos;t offer them at all. Portfolio lenders, credit unions,
              and local/community banks are the usual sources.
            </li>
          </ul>
          <p>
            Because availability varies so much, treat the tappable-equity number
            above as your ceiling, then confirm the actual program, CLTV, and rate
            with a lender before you build it into a deal.
          </p>
        </div>
      </section>

      {/* Which product */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          HELOC vs. Home Equity Loan vs. Cash-Out Refinance
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            All three pull equity out of a property you already own, and all three
            are bounded by the same CLTV math. They differ in structure:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">HELOC.</strong> A revolving line you
              draw and repay as needed, usually with an interest-only draw period.
              Best for staged rehabs or rotating down payments across several
              deals.
            </li>
            <li>
              <strong className="text-text">Home equity loan.</strong> A lump sum
              at a fixed rate and fixed term. Best when you have a single, known
              use for the money.
            </li>
            <li>
              <strong className="text-text">Cash-out refinance.</strong> Replaces
              your existing first mortgage with a larger one and hands you the
              difference. Best when you can also improve your first-mortgage rate
              or want one consolidated payment — a frequent move in the{' '}
              <Link
                href="/calculators/brrrr"
                className="text-primary hover:text-primary-light underline transition-colors"
              >
                BRRRR strategy
              </Link>
              .
            </li>
          </ul>
          <p>
            Not sure which financing fits your situation? Compare investor loan
            options in the{' '}
            <Link
              href="/lenders"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              lender directory
            </Link>{' '}
            or run the numbers on your next deal with the{' '}
            <Link
              href="/calculators/cash-on-cash"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              cash-on-cash calculator
            </Link>
            .
          </p>
        </div>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Refinance Calculator', href: '/calculators/refinance' },
          { label: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
          { label: 'Financing Matcher', href: '/financing/matcher' },
          { label: 'Compare DSCR Lenders', href: '/lenders/dscr-loans', muted: true },
        ]}
      />
    </div>
  )
}
