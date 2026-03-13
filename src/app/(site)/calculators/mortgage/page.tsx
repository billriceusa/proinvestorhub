import type { Metadata } from 'next'
import Link from 'next/link'
import { MortgageCalculator } from '@/components/calculators/mortgage-calculator'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Mortgage & DSCR Payment Calculator | Investment Property Loans',
  description:
    'Free mortgage calculator for real estate investors. Calculate monthly payments for conventional mortgages and DSCR investor loans. Includes DSCR ratio, cash flow analysis, and escrow breakdown.',
  openGraph: {
    title: 'Mortgage & DSCR Calculator | ProInvestorHub',
    description:
      'Free investment property mortgage calculator with DSCR analysis. Calculate payments, cash flow, and loan qualification.',
  },
}

export default function MortgageCalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Mortgage & DSCR Payment Calculator',
          description:
            'Free mortgage calculator for investment properties. Calculate payments for conventional and DSCR loans with full escrow breakdown.',
          url: `${baseUrl}/calculators/mortgage`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Mortgage & DSCR Calculator', url: `${baseUrl}/calculators/mortgage` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is a DSCR loan?',
            answer:
              'A DSCR (Debt Service Coverage Ratio) loan is an investment property mortgage where qualification is based on the property\'s rental income rather than the borrower\'s personal income. The DSCR is calculated as NOI divided by debt service. Most lenders require a DSCR of 1.0-1.25 or higher.',
          },
          {
            question: 'How much down payment do I need for an investment property?',
            answer:
              'Conventional investment property loans typically require 15-25% down. DSCR loans usually require 20-25% down. FHA loans (for owner-occupied multi-family) allow as little as 3.5% down.',
          },
          {
            question: 'What interest rate should I expect on an investment property?',
            answer:
              'Investment property rates are typically 0.5-1.0% higher than primary residence rates. DSCR loans may be 0.5-1.5% higher than conventional investment property rates due to the income-based qualification.',
          },
          {
            question: 'What is included in the total monthly payment?',
            answer:
              'Your total monthly payment includes principal and interest (P&I), property taxes, homeowner\'s insurance, PMI (if applicable), and HOA fees. For DSCR analysis, operating expenses like maintenance and property management are also factored in.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Mortgage &amp; DSCR</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Mortgage &amp; DSCR Payment Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Calculate monthly mortgage payments for investment properties. Toggle
          between conventional mortgage and DSCR loan mode to see your full
          payment breakdown, cash flow, and debt service coverage ratio.
        </p>
      </div>

      {/* Calculator */}
      <MortgageCalculator />

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          Conventional vs. DSCR Loans for Investors
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Real estate investors have two primary financing paths, each with
            distinct qualification requirements and trade-offs:
          </p>
          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-6 text-left font-semibold text-text">Feature</th>
                  <th className="py-3 pr-6 text-left font-semibold text-text">Conventional</th>
                  <th className="py-3 text-left font-semibold text-text">DSCR</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6 font-medium text-text">Qualification</td>
                  <td className="py-3 pr-6">Personal income, DTI, credit</td>
                  <td className="py-3">Property income (DSCR ratio)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6 font-medium text-text">Down Payment</td>
                  <td className="py-3 pr-6">15-25%</td>
                  <td className="py-3">20-25%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6 font-medium text-text">Interest Rate</td>
                  <td className="py-3 pr-6">Lower</td>
                  <td className="py-3">0.5-1.5% higher</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6 font-medium text-text">Loan Limit</td>
                  <td className="py-3 pr-6">10 financed properties</td>
                  <td className="py-3">No limit</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-6 font-medium text-text">Tax Returns</td>
                  <td className="py-3 pr-6">Required</td>
                  <td className="py-3">Not required</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium text-text">Best For</td>
                  <td className="py-3 pr-6">W-2 earners, first 10 properties</td>
                  <td className="py-3">Self-employed, scaling investors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Understanding DSCR
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The Debt Service Coverage Ratio is the property&apos;s net operating
            income divided by its debt service (mortgage payment):
          </p>
          <div className="rounded-lg bg-surface p-4 text-center">
            <p className="text-sm font-medium text-text">
              DSCR = NOI / Annual Debt Service
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">DSCR 1.25+</strong> — Strong. The
              property generates 25% more income than needed to cover the
              mortgage. Most lenders are comfortable here.
            </li>
            <li>
              <strong className="text-text">DSCR 1.0-1.24</strong> — Meets
              minimum. The property covers its debt but has thin margin. May
              qualify with higher rates or more down payment.
            </li>
            <li>
              <strong className="text-text">DSCR below 1.0</strong> — The
              property doesn&apos;t generate enough income to cover the
              mortgage. Some lenders offer &ldquo;no-ratio&rdquo; or 0.75 DSCR
              programs with significant rate premiums.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Related Tools
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
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
            href="/glossary/dscr-loan"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface transition-colors"
          >
            DSCR Loan (Glossary)
          </Link>
          <Link
            href="/glossary/dscr"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface transition-colors"
          >
            DSCR Ratio (Glossary)
          </Link>
        </div>
      </section>
    </div>
  )
}
