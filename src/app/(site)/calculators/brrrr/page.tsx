import type { Metadata } from 'next'
import Link from 'next/link'
import { BRRRRCalculator } from '@/components/calculators/brrrr-calculator'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'BRRRR Calculator | Analyze Buy, Rehab, Rent, Refinance, Repeat Deals',
  description:
    'Free BRRRR method calculator for real estate investors. Analyze purchase price, rehab costs, rental income, refinance terms, and cash-on-cash return. See if you can recycle all your capital.',
  openGraph: {
    title: 'BRRRR Calculator | ProInvestorHub',
    description:
      'Free BRRRR calculator — analyze deals, maximize cash-out refinance, and see your true return.',
  },
}

export default function BRRRRCalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'BRRRR Calculator',
          description:
            'Free BRRRR method calculator for real estate investors. Analyze purchase, rehab, rent, refinance, and see your true cash-on-cash return.',
          url: `${baseUrl}/calculators/brrrr`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'BRRRR Calculator', url: `${baseUrl}/calculators/brrrr` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is the BRRRR method in real estate?',
            answer:
              'BRRRR stands for Buy, Rehab, Rent, Refinance, Repeat. Investors purchase undervalued properties, renovate them, rent them out, then do a cash-out refinance to recover their investment capital and repeat the process with the next property.',
          },
          {
            question: 'How do I know if a BRRRR deal is good?',
            answer:
              'A successful BRRRR deal recovers most or all of your invested cash through the refinance, while still producing positive monthly cash flow. The best deals achieve an "infinite return" where you get all your cash back and the property still cash flows.',
          },
          {
            question: 'What LTV can I get on a BRRRR refinance?',
            answer:
              'Most conventional lenders offer 70-80% LTV on investment property refinances. Some portfolio lenders may go up to 85%. The higher the LTV, the more cash you can pull out, but your monthly payment will be higher.',
          },
          {
            question: 'How long should I hold before refinancing?',
            answer:
              'Most lenders require a 6-12 month seasoning period before allowing a cash-out refinance based on the new appraised value. Some portfolio and DSCR lenders have shorter or no seasoning requirements.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">BRRRR</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          BRRRR Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Walk through each phase of a BRRRR deal — Buy, Rehab, Rent, Refinance
          — and see exactly how much cash you&apos;ll recover, your monthly cash
          flow, and your true cash-on-cash return.
        </p>
      </div>

      {/* Calculator */}
      <BRRRRCalculator />

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          What Is the BRRRR Method?
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The BRRRR method is a real estate investment strategy that allows
            investors to build a rental portfolio using the same pool of capital
            over and over. Each letter represents a phase:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-text">Buy</strong> — Purchase a
              distressed or undervalued property below market value. Most
              investors use cash or a short-term loan (hard money) for the
              acquisition.
            </li>
            <li>
              <strong className="text-text">Rehab</strong> — Renovate the
              property to increase its value and make it rent-ready. The goal is
              to create a significant gap between your total cost and the
              after-repair value (ARV).
            </li>
            <li>
              <strong className="text-text">Rent</strong> — Place a tenant and
              stabilize the property with market-rate rent. Lenders want to see
              a performing asset before they refinance.
            </li>
            <li>
              <strong className="text-text">Refinance</strong> — Do a cash-out
              refinance based on the new, higher appraised value. The new loan
              pays off any existing debt and returns your original capital.
            </li>
            <li>
              <strong className="text-text">Repeat</strong> — Take the
              recovered capital and start the process again with the next
              property.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          The Math Behind a Successful BRRRR
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The key to a profitable BRRRR is the spread between your all-in cost
            and the after-repair value. Here&apos;s a simplified example:
          </p>
          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm border-collapse">
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Purchase Price</td>
                  <td className="py-3 text-right font-medium text-text">$120,000</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Rehab Cost</td>
                  <td className="py-3 text-right font-medium text-text">$40,000</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Closing & Holding Costs</td>
                  <td className="py-3 text-right font-medium text-text">$8,000</td>
                </tr>
                <tr className="border-b border-border font-semibold">
                  <td className="py-3 pr-6 text-text">Total Cash Invested</td>
                  <td className="py-3 text-right text-text">$168,000</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">After Repair Value (ARV)</td>
                  <td className="py-3 text-right font-medium text-text">$230,000</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">New Loan (75% LTV)</td>
                  <td className="py-3 text-right font-medium text-text">$172,500</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6">Refi Closing Costs (2%)</td>
                  <td className="py-3 text-right font-medium text-red-500">($3,450)</td>
                </tr>
                <tr className="border-b border-border font-semibold">
                  <td className="py-3 pr-6 text-text">Cash Recovered</td>
                  <td className="py-3 text-right text-emerald-600">$169,050</td>
                </tr>
                <tr className="font-semibold">
                  <td className="py-3 pr-6 text-text">Cash Left in Deal</td>
                  <td className="py-3 text-right text-emerald-600">$0 (all out!)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            In this example, the investor recovers all their capital and now owns
            a cash-flowing rental with $57,500 in equity — and can immediately
            redeploy that $168,000 into the next deal.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Common BRRRR Mistakes to Avoid
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-text">Overestimating ARV</strong> — Be
              conservative with your after-repair value estimate. Use recent
              comparable sales, not aspirational pricing.
            </li>
            <li>
              <strong className="text-text">Underestimating rehab costs</strong>{' '}
              — Always pad your renovation budget by 10-20%. Unexpected issues
              (foundation, plumbing, electrical) are common in distressed
              properties.
            </li>
            <li>
              <strong className="text-text">Ignoring holding costs</strong> —
              Every month a property sits vacant during rehab costs you money in
              taxes, insurance, utilities, and loan interest.
            </li>
            <li>
              <strong className="text-text">Negative cash flow after refi</strong>{' '}
              — Pulling out maximum cash means a larger mortgage payment. Make
              sure the property still cash flows after the refinance.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Related Tools
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/calculators/cap-rate"
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            Cap Rate Calculator
          </Link>
          <Link
            href="/calculators/cash-on-cash"
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            Cash-on-Cash Return
          </Link>
          <Link
            href="/calculators/rental-cashflow"
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            Rental Cash Flow
          </Link>
          <Link
            href="/glossary/brrrr-method"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface transition-colors"
          >
            BRRRR Glossary Entry
          </Link>
        </div>
      </section>
    </div>
  )
}
