import type { Metadata } from 'next'
import { CalculatorComparison } from '@/components/calculators/calculator-comparison'

export const metadata: Metadata = {
  title: 'Compare Deals Side by Side | ProInvestorHub',
  description:
    'Compare two real estate investment deals side by side. Run cap rate, cash-on-cash, or rental cash flow analysis on Deal A vs Deal B to make smarter investment decisions.',
  alternates: { canonical: '/calculators/compare' },
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <nav className="text-sm text-text-muted mb-6">
        <a href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </a>
        <span className="mx-2">/</span>
        <span className="text-text">Compare Deals</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Compare Deals Side by Side
        </h1>
        <p className="mt-3 text-text-muted max-w-2xl">
          Run the same analysis on two properties and see how they stack up. Pick a calculator, enter the numbers for each deal, and compare the results instantly.
        </p>
      </div>

      <CalculatorComparison />
    </div>
  )
}
