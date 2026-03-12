import type { Metadata } from 'next'
import Link from 'next/link'
import { CashOnCashCalculator } from '@/components/calculators/cash-on-cash-calculator'
import { JsonLd, calculatorJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Cash-on-Cash Return Calculator | Free Investment Analysis Tool',
  description:
    'Calculate your cash-on-cash return on rental properties. Factor in financing, down payment, and expenses to see how your invested cash performs. Free, no sign-up.',
  openGraph: {
    title: 'Cash-on-Cash Return Calculator | ProInvestorHub',
    description:
      'Free cash-on-cash return calculator for real estate investors. See how your invested cash performs after debt service.',
  },
}

export default function CashOnCashPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.vercel.app'

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
