import type { Metadata } from 'next'
import Link from 'next/link'
import { CashOnCashCalculator } from '@/components/calculators/cash-on-cash-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Cash-on-Cash Return Calculator + Formula & Example',
  description:
    'Free cash-on-cash return calculator plus the formula and a step-by-step example. Factor in financing, down payment, and expenses to see how your invested cash performs, and learn how to calculate it by hand. No sign-up.',
  alternates: { canonical: '/calculators/cash-on-cash' },
  openGraph: {
    title: 'Cash-on-Cash Return Calculator | ProInvestorHub',
    description:
      'Free cash-on-cash return calculator for real estate investors. See how your invested cash performs after debt service.',
  },
}

export default function CashOnCashPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Cash-on-Cash Return Calculator',
          description:
            'Free cash-on-cash return calculator for real estate investors. Factor in financing to see how your invested cash performs.',
          url: `${baseUrl}/calculators/cash-on-cash`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Cash-on-Cash Return', url: `${baseUrl}/calculators/cash-on-cash` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is a good cash-on-cash return?',
            answer:
              'Most investors target 8-12% cash-on-cash return as a baseline. Below 6% is considered below average unless you are in a high-appreciation market. Above 12% is excellent but should be verified carefully.',
          },
          {
            question: 'What is the difference between cap rate and cash-on-cash return?',
            answer:
              'Cap rate measures the property\'s unlevered return (ignoring financing). Cash-on-cash return factors in your mortgage, showing the return on the actual cash you invested. Use cap rate to compare properties; use cash-on-cash to evaluate deals with specific financing.',
          },
          {
            question: 'How does leverage affect cash-on-cash return?',
            answer:
              'Positive leverage occurs when the property cap rate exceeds your cost of debt, amplifying cash-on-cash return above the cap rate. Negative leverage occurs when interest rates are high relative to cap rate, reducing your return below an all-cash purchase.',
          },
          {
            question: 'How do you calculate cash-on-cash return?',
            answer:
              'Divide your annual pre-tax cash flow (net operating income minus annual mortgage payments) by the total cash you invested (down payment, closing costs, and rehab), then multiply by 100. For example, $6,600 of annual cash flow on $60,000 invested is an 11% cash-on-cash return.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate Cash-on-Cash Return',
          description:
            'Calculate the cash-on-cash return on a financed rental property in three steps using annual cash flow and total cash invested.',
          steps: [
            {
              name: 'Add up your total cash invested',
              text: 'Sum the down payment, closing costs, and any upfront rehab. This is the actual cash out of your pocket — not the full purchase price.',
            },
            {
              name: 'Calculate annual pre-tax cash flow',
              text: 'Start with net operating income (rent minus vacancy and operating expenses), then subtract your annual mortgage payments (principal and interest). The result is annual pre-tax cash flow.',
            },
            {
              name: 'Divide cash flow by cash invested',
              text: 'Divide annual pre-tax cash flow by total cash invested and multiply by 100. For example, $6,600 of cash flow on $60,000 invested is an 11% cash-on-cash return.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Cash-on-Cash Return</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Cash-on-Cash Return Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Cash-on-cash return measures the annual return on the actual cash you
          invest in a property. Unlike{' '}
          <Link
            href="/calculators/cap-rate"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            cap rate
          </Link>
          , it factors in your financing — showing how leverage amplifies (or
          diminishes) your returns.
        </p>
      </div>

      <CashOnCashCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Cash-on-Cash Return Calculator" calculatorPath="/calculators/cash-on-cash" />
      </div>

      {/* How to Calculate — formula + worked example */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Calculate Cash-on-Cash Return (Formula &amp; Example)
        </h2>
        <p className="mt-4 text-text-muted leading-7">
          The calculator handles it instantly, but the formula is
          straightforward: divide your annual pre-tax cash flow by the total
          cash you actually invested, then convert to a percentage.
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Cash-on-Cash Return = (Annual Pre-Tax Cash Flow &divide; Total Cash Invested) &times; 100
          </p>
        </div>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            <strong className="text-text">Step 1 — Add up total cash invested.</strong>{' '}
            Sum your down payment, closing costs, and any upfront rehab. This is
            the cash out of your pocket, not the full purchase price.
          </p>
          <p>
            <strong className="text-text">Step 2 — Find annual pre-tax cash flow.</strong>{' '}
            Start with{' '}
            <Link
              href="/glossary/noi"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              net operating income
            </Link>{' '}
            (rent minus vacancy and operating expenses), then subtract your
            annual mortgage payments. What&apos;s left is your cash flow.
          </p>
          <p>
            <strong className="text-text">Step 3 — Divide cash flow by cash invested.</strong>{' '}
            Multiply by 100 to get a percentage.
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            You buy a <strong className="text-text">$200,000</strong> rental with{' '}
            <strong className="text-text">25% down</strong> ($50,000) plus $4,000
            in closing costs and $6,000 in rehab — <strong className="text-text">$60,000</strong>{' '}
            total cash invested. The property nets $18,600 in NOI, and your
            $150,000 loan at 7% costs about $11,976 a year. That leaves{' '}
            <strong className="text-text">$6,624</strong> in annual cash flow.
            Dividing $6,624 by $60,000 gives a cash-on-cash return of{' '}
            <strong className="text-primary">11%</strong> — positive leverage at
            work, since the return beats the property&apos;s 9.3% cap rate.
          </p>
        </div>
        <p className="mt-6 text-text-muted leading-7">
          Not sure which metric to lead with? See{' '}
          <Link
            href="/blog/cash-on-cash-vs-cap-rate"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            Cash-on-Cash Return vs. Cap Rate
          </Link>
          , or run the unlevered number with the{' '}
          <Link
            href="/calculators/cap-rate"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            cap rate calculator
          </Link>
          .
        </p>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How Cash-on-Cash Return Works
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Cash-on-cash return answers one question:{' '}
            <strong className="text-text">
              &ldquo;What percentage return am I earning on the cash I actually put
              into this deal?&rdquo;
            </strong>
          </p>
          <p>
            It&apos;s calculated by dividing your annual pre-tax cash flow by the
            total cash you invested (down payment + closing costs + rehab).
          </p>
          <p>
            This metric is especially useful when comparing deals with different
            financing structures. A property bought with 20% down will have a
            very different cash-on-cash return than the same property bought with
            25% down, even though the cap rate stays the same.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          What Is a Good Cash-on-Cash Return?
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Most investors target <strong className="text-text">8-12%</strong>{' '}
            cash-on-cash return as a baseline, but the right target depends on
            your market and strategy:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">6-8%:</strong> Acceptable in
              appreciation markets where you expect equity growth over time.
            </li>
            <li>
              <strong className="text-text">8-12%:</strong> The sweet spot for
              most cash-flow investors. Strong returns without excessive risk.
            </li>
            <li>
              <strong className="text-text">12%+:</strong> Excellent, but verify
              your assumptions. High returns often indicate higher risk or
              optimistic projections.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          The Impact of Leverage
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Leverage is the reason cash-on-cash return exists as a separate
            metric from cap rate. By using a mortgage, you can amplify your
            returns — but leverage works both ways:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Positive leverage:</strong> When the
              property&apos;s cap rate exceeds the cost of debt, borrowing
              increases your cash-on-cash return above the cap rate.
            </li>
            <li>
              <strong className="text-text">Negative leverage:</strong> When
              interest rates are high relative to the cap rate, borrowing
              actually <em>reduces</em> your return below what an all-cash
              purchase would yield.
            </li>
          </ul>
          <p>
            Try adjusting the down payment and interest rate sliders to see how
            leverage affects your return in real time.
          </p>
        </div>
      </section>
    </div>
  )
}
