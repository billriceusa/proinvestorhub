import type { Metadata } from 'next'
import Link from 'next/link'
import { FixFlipCalculator } from '@/components/calculators/fix-flip-calculator'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Fix & Flip Calculator | Estimate Rehab Profit & ROI',
  description:
    'Free fix and flip calculator for real estate investors. Estimate purchase price, rehab costs, holding costs, selling costs, and net profit. Includes the 70% rule check.',
  alternates: { canonical: '/calculators/fix-flip' },
  openGraph: {
    title: 'Fix & Flip Calculator | ProInvestorHub',
    description:
      'Free fix & flip profit calculator. Estimate rehab costs, holding costs, and net profit on any flip deal.',
  },
}

export default function FixFlipCalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Fix & Flip Profit Calculator',
          description:
            'Free fix and flip calculator for real estate investors. Estimate acquisition, rehab, holding, and selling costs to calculate net profit and ROI.',
          url: `${baseUrl}/calculators/fix-flip`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Fix & Flip Calculator', url: `${baseUrl}/calculators/fix-flip` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is the 70% rule in house flipping?',
            answer:
              'The 70% rule states that an investor should pay no more than 70% of the After Repair Value (ARV) minus rehab costs. For example, if a home\'s ARV is $250,000 and needs $40,000 in repairs, the max purchase price is $250,000 × 70% − $40,000 = $135,000.',
          },
          {
            question: 'What is a good ROI on a flip?',
            answer:
              'Most experienced flippers target a minimum 15-20% ROI on total costs to account for unexpected expenses and market fluctuations. A profit of $25,000-$50,000+ per flip is typical for mid-range properties.',
          },
          {
            question: 'How long does a typical flip take?',
            answer:
              'Most flips take 4-8 months from purchase to sale, including 2-4 months for rehab and 1-3 months for listing and closing. Longer timelines increase holding costs and reduce profit.',
          },
          {
            question: 'What costs do most flippers forget?',
            answer:
              'Commonly overlooked costs include holding costs (loan interest, taxes, insurance, utilities during rehab), buyer closing costs, seller closing costs, agent commissions, and a contingency buffer for unexpected repairs. Our calculator accounts for all of these.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Fix &amp; Flip</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Fix &amp; Flip Profit Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Estimate your total profit on a fix-and-flip deal. Enter acquisition
          costs, rehab budget, holding costs, and selling expenses to see your
          net profit, ROI, and whether the deal passes the 70% rule.
        </p>
      </div>

      {/* Calculator */}
      <FixFlipCalculator />

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Analyze a Fix &amp; Flip Deal
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The most common mistake new flippers make is focusing only on
            purchase price and ARV while ignoring the costs in between.
            A profitable flip requires accurate estimates across four cost
            categories:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-text">Acquisition Costs</strong> —
              Purchase price plus buyer closing costs (title insurance,
              inspection, appraisal, loan origination fees). Typically 1-3%
              of the purchase price.
            </li>
            <li>
              <strong className="text-text">Rehab Costs</strong> — The full
              renovation budget including materials, labor, permits, and a
              10-20% contingency buffer for surprises. Walk the property with
              a contractor before making an offer.
            </li>
            <li>
              <strong className="text-text">Holding Costs</strong> — Every
              month you own the property costs money: loan interest (or
              opportunity cost if paying cash), property taxes, insurance,
              utilities, and lawn care. These add up fast.
            </li>
            <li>
              <strong className="text-text">Selling Costs</strong> — Agent
              commissions (typically 5-6% of sale price), seller closing costs,
              transfer taxes, staging, and marketing. These are the costs most
              beginners underestimate.
            </li>
          </ol>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          The 70% Rule Explained
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The 70% rule is a quick screening formula used by fix-and-flip
            investors to determine the maximum purchase price:
          </p>
          <div className="rounded-lg bg-surface p-4 text-center">
            <p className="text-sm font-medium text-text">
              Max Purchase Price = ARV &times; 70% &minus; Rehab Costs
            </p>
          </div>
          <p>
            The 30% cushion is designed to cover closing costs, holding costs,
            selling costs, and profit. It&apos;s a guideline, not a hard rule —
            in hot markets, many successful flippers operate at 75-80% of ARV.
            In slower markets with more risk, you may need 65% or less.
          </p>
          <p>
            Our calculator goes beyond the 70% rule by computing your actual
            costs and profit, so you can make data-driven decisions rather than
            relying on a rule of thumb.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Tips for Maximizing Flip Profit
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-text">Buy right</strong> — Profit is
              made at purchase, not at sale. The biggest variable in your
              control is the acquisition price.
            </li>
            <li>
              <strong className="text-text">Speed matters</strong> — Every
              month of holding costs eats into profit. Have contractors lined up
              before you close.
            </li>
            <li>
              <strong className="text-text">Know your ARV</strong> — Pull
              comps from the last 3-6 months within a 0.5-mile radius. Be
              conservative — it&apos;s better to be surprised on the upside.
            </li>
            <li>
              <strong className="text-text">Budget for the unexpected</strong>{' '}
              — A 10-15% contingency on rehab costs is essential. Foundation
              issues, mold, and electrical problems are common in distressed
              properties.
            </li>
          </ul>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Related Tools
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/calculators/brrrr"
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            BRRRR Calculator
          </Link>
          <Link
            href="/calculators/cap-rate"
            className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            Cap Rate Calculator
          </Link>
          <Link
            href="/glossary/fix-and-flip"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface transition-colors"
          >
            Fix & Flip Glossary Entry
          </Link>
          <Link
            href="/glossary/arv"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface transition-colors"
          >
            ARV (After Repair Value)
          </Link>
        </div>
      </section>
    </div>
  )
}
