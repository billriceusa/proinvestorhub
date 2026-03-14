import type { Metadata } from 'next'
import Link from 'next/link'
import { WholesaleCalculator } from '@/components/calculators/wholesale-calculator'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Wholesale Deal Analyzer | Free Real Estate Wholesale Calculator',
  description:
    'Analyze wholesale real estate deals instantly. Calculate your maximum offer, assignment fee, and end buyer profit using the 70% rule. Free, no sign-up required.',
  openGraph: {
    title: 'Wholesale Deal Analyzer | ProInvestorHub',
    description:
      'Free wholesale deal calculator for real estate investors. Find your maximum offer and assignment fee in seconds.',
  },
}

export default function WholesalCalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Wholesale Deal Analyzer',
          description:
            'Free wholesale real estate calculator. Calculate your maximum allowable offer, assignment fee, and end buyer profit using the 70% rule.',
          url: `${baseUrl}/calculators/wholesale`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Wholesale Deal Analyzer', url: `${baseUrl}/calculators/wholesale` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'How does wholesale real estate work?',
            answer:
              'In wholesale real estate, you find a distressed or undervalued property, get it under contract at a low price, then assign that contract to an end buyer (typically a house flipper or landlord) for a fee. You never actually purchase or renovate the property — your profit comes from the assignment fee, typically $5,000 to $20,000 per deal.',
          },
          {
            question: 'What is a typical wholesale assignment fee?',
            answer:
              'Assignment fees typically range from $5,000 to $20,000, with $10,000 being a common target for beginners. The fee depends on the deal size, local market, and how much margin exists in the deal. On higher-value properties, experienced wholesalers may earn $25,000 or more per assignment.',
          },
          {
            question: 'What is the 70% rule in real estate?',
            answer:
              'The 70% rule states that an investor should pay no more than 70% of a property\'s after repair value (ARV) minus repair costs. For example, if a property has an ARV of $200,000 and needs $30,000 in repairs, the maximum offer would be ($200,000 × 0.70) - $30,000 = $110,000. This rule builds in enough margin for profit, closing costs, and holding costs.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Wholesale Deal Analyzer</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Wholesale Deal Analyzer
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Calculate your maximum offer price, assignment fee, and end buyer
          profit on any{' '}
          <Link
            href="/glossary/wholesale"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            wholesale
          </Link>{' '}
          deal. Built on the{' '}
          <Link
            href="/blog/70-percent-rule-house-flipping"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            70% rule
          </Link>{' '}
          that most flippers and investors use to evaluate acquisitions.
        </p>
      </div>

      {/* Calculator */}
      <WholesaleCalculator />

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Use This Calculator
        </h2>
        <div className="mt-6 prose prose-neutral max-w-none text-text-muted leading-7 space-y-4">
          <p>
            <strong className="text-text">1. Enter the After Repair Value (ARV)</strong> — this
            is what the property will be worth after all renovations are
            complete. Pull comps from Zillow, Redfin, or your local MLS to
            estimate{' '}
            <Link
              href="/glossary/arv"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              ARV
            </Link>
            .
          </p>
          <p>
            <strong className="text-text">2. Estimate rehab costs</strong> — get a
            contractor bid or use per-square-foot estimates for the scope of
            work. Be conservative — underestimating{' '}
            <Link
              href="/glossary/rehab-costs"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              rehab costs
            </Link>{' '}
            is the most common mistake in wholesaling.
          </p>
          <p>
            <strong className="text-text">3. Set your assignment fee</strong> — $10,000
            is a solid starting point. Experienced wholesalers adjust this based
            on deal size and market competition.
          </p>
          <p>
            <strong className="text-text">4. Adjust end buyer parameters</strong> — the
            70% discount is industry standard, but some investors in hot markets
            will go to 75-80%. Closing costs and holding costs vary by market
            and project timeline.
          </p>
          <p>
            <strong className="text-text">5. Check the deal rating</strong> — if the end
            buyer&apos;s ROI is above 20%, you have a strong deal that will attract
            buyers. Below 10%, you&apos;ll struggle to assign the contract.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          How Wholesale Real Estate Works
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            Wholesaling is the fastest way to get started in real estate
            investing with minimal capital. Unlike flipping, you never buy or
            renovate the property. Here&apos;s the process:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-text">Find a deal</strong> — locate a
              distressed or motivated seller willing to sell below market value.
              Common sources include driving for dollars, direct mail,{' '}
              <Link
                href="/blog/how-to-find-off-market-deals"
                className="text-primary hover:text-primary-light underline transition-colors"
              >
                off-market deal sourcing
              </Link>
              , and probate leads.
            </li>
            <li>
              <strong className="text-text">Get it under contract</strong> — negotiate a
              purchase price low enough to leave room for your fee and the end
              buyer&apos;s profit. Use an assignable contract.
            </li>
            <li>
              <strong className="text-text">Find your end buyer</strong> — build a
              buyers list of local flippers, landlords, and investors. The deal
              needs to work for them or it won&apos;t close.
            </li>
            <li>
              <strong className="text-text">Assign the contract</strong> — transfer your
              purchase agreement to the end buyer for an assignment fee.
              You collect your fee at closing without ever owning the property.
            </li>
          </ol>
          <p>
            The key to consistent wholesale deals is accurate deal analysis.
            This calculator helps you verify that a deal works for all three
            parties: the seller, you, and the end buyer.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          The 70% Rule in Wholesaling
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The 70% rule is the most widely used formula for evaluating
            wholesale and{' '}
            <Link
              href="/calculators/fix-flip"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              fix-and-flip
            </Link>{' '}
            deals. It states:
          </p>
          <div className="rounded-lg bg-surface p-4 text-sm font-medium text-text">
            Maximum Allowable Offer = (ARV &times; 70%) &minus; Rehab Costs
          </div>
          <p>
            The 30% discount covers the end buyer&apos;s profit margin, closing
            costs, holding costs, and unexpected overruns. Here&apos;s why it works:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">~10% for profit</strong> — the end
              buyer&apos;s minimum acceptable return on a flip.
            </li>
            <li>
              <strong className="text-text">~10% for closing and holding costs</strong> — buying
              costs, selling commissions, insurance, taxes, and loan payments during rehab.
            </li>
            <li>
              <strong className="text-text">~10% for contingencies</strong> — unexpected
              repairs, market shifts, and timeline overruns.
            </li>
          </ul>
          <p>
            As a wholesaler, you need to go <em>below</em> the 70% rule number
            by your assignment fee. That&apos;s exactly what this calculator
            computes. If the numbers don&apos;t leave room for your fee and the
            buyer&apos;s profit, the deal isn&apos;t viable — and it&apos;s better to know that
            before you tie up the contract.
          </p>
        </div>
      </section>
    </div>
  )
}
