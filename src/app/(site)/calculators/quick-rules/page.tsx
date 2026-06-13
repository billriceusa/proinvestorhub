import type { Metadata } from 'next'
import Link from 'next/link'
import { QuickRulesCalculator } from '@/components/calculators/quick-rules-calculator'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Quick Rules Calculator: 1% Rule, 2% Rule, 50% Rule, GRM & NOI',
  description:
    'Free quick-screening calculators for real estate investors — the 1% rule, 2% rule, 50% rule, gross rent multiplier (GRM), and NOI. Screen a deal in seconds before you run the full numbers.',
  alternates: { canonical: '/calculators/quick-rules' },
  openGraph: {
    title: 'Quick Rules Calculator | ProInvestorHub',
    description: 'The 1% rule, 2% rule, 50% rule, GRM, and NOI — screen any deal in seconds.',
  },
}

export default function QuickRulesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Quick Rules Calculator', url: `${baseUrl}/calculators/quick-rules` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is the 1% rule in real estate?',
            answer:
              'The 1% rule says a rental’s monthly rent should be at least 1% of its purchase price. A $200,000 property should rent for about $2,000 a month to pass. It is a fast screen for cash-flow potential, not a substitute for a full analysis.',
          },
          {
            question: 'What is the 2% rule?',
            answer:
              'The 2% rule is the more aggressive version — monthly rent of at least 2% of the purchase price. It is rare in most markets today and usually points to lower-priced, higher-risk areas, so treat a property that clears it with healthy skepticism.',
          },
          {
            question: 'What is the 50% rule?',
            answer:
              'The 50% rule estimates that a rental’s operating expenses (taxes, insurance, repairs, vacancy, management — everything except the mortgage) will average about half of gross rent. Subtract your mortgage payment from the remaining half to estimate cash flow.',
          },
          {
            question: 'What is gross rent multiplier (GRM)?',
            answer:
              'GRM is the purchase price divided by annual gross rent. It is a quick way to compare the relative price of income properties — a lower GRM is cheaper per dollar of rent. It ignores expenses, so use it only as a first-pass screen.',
          },
          {
            question: 'How is NOI calculated?',
            answer:
              'Net operating income is annual gross income minus annual operating expenses, before any mortgage payment. NOI is the foundation of the cap rate and of commercial property valuation.',
          },
        ])}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Quick Rules</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Quick Rules Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          The fast screens experienced investors run in their head before they bother with a full
          analysis. Use these to triage a listing in seconds — then run the keepers through the
          detailed calculators.
        </p>
      </div>

      <QuickRulesCalculator />

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How to use these screens</h2>
        <p className="mt-4 text-text-muted leading-7">
          These rules of thumb are filters, not verdicts. They exist to kill obvious non-starters and
          flag the deals worth a real underwrite — they deliberately ignore financing, condition, and
          local nuance. A property that passes the 1% rule and has a reasonable GRM has earned a full
          analysis; one that fails badly usually is not worth the time.
        </p>
        <p className="mt-4 text-text-muted leading-7">
          When a deal clears the quick screens, run it properly: the{' '}
          <Link href="/calculators/rental-cashflow" className="text-primary hover:text-primary-light underline transition-colors">
            rental cash flow
          </Link>
          ,{' '}
          <Link href="/calculators/cap-rate" className="text-primary hover:text-primary-light underline transition-colors">
            cap rate
          </Link>
          , and{' '}
          <Link href="/calculators/cash-on-cash" className="text-primary hover:text-primary-light underline transition-colors">
            cash-on-cash
          </Link>{' '}
          calculators account for the financing and expenses these shortcuts skip. Flipping instead?
          The{' '}
          <Link href="/calculators/wholesale" className="text-primary hover:text-primary-light underline transition-colors">
            70% rule
          </Link>{' '}
          screen lives in the wholesale analyzer.
        </p>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Cap Rate Calculator', href: '/calculators/cap-rate' },
          { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
          { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
          { label: 'Wholesale (70% Rule)', href: '/calculators/wholesale' },
        ]}
      />
    </div>
  )
}
