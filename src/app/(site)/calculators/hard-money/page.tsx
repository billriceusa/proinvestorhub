import type { Metadata } from 'next'
import Link from 'next/link'
import { HardMoneyCalculator } from '@/components/calculators/hard-money-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Hard Money Loan Calculator: Loan Amount, Points & Cash to Close',
  description:
    'Free hard money loan calculator for fix-and-flip and BRRRR deals. Enter purchase, rehab, and ARV to see your loan amount, points, interest cost, and total cash to close. No sign-up.',
  alternates: { canonical: '/calculators/hard-money' },
  openGraph: {
    title: 'Hard Money Loan Calculator | ProInvestorHub',
    description:
      'See your hard money loan amount, financing cost, and cash to close in seconds.',
  },
}

export default function HardMoneyPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Hard Money Loan Calculator',
          description:
            'Free hard money loan calculator for fix-and-flip and BRRRR deals — loan amount, points, interest, and cash to close.',
          url: `${baseUrl}/calculators/hard-money`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Hard Money Loan Calculator', url: `${baseUrl}/calculators/hard-money` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'How is a hard money loan amount calculated?',
            answer:
              'Hard money lenders size the loan as the lesser of two limits: a percentage of the after-repair value (ARV) — usually 65–75% — and your total project cost (purchase plus rehab). Whichever is smaller is your loan amount, and you bring the rest as cash.',
          },
          {
            question: 'What does a hard money loan cost?',
            answer:
              'Two things: points charged up front (typically 2–4% of the loan) and interest, usually paid interest-only at roughly 10–14% per year while you hold the loan. On a six-month flip those carrying costs are manageable against the profit margin; on a long hold they are not.',
          },
          {
            question: 'How much cash do I need to close a hard money deal?',
            answer:
              'Your cash to close is the portion of the purchase and rehab the loan does not cover, plus the points. When the ARV cap limits the loan below your full project cost, that gap is the cash you bring — on top of the points charged at closing.',
          },
          {
            question: 'What is ARV?',
            answer:
              'ARV is the after-repair value — what the property will be worth once the planned renovations are complete. Hard money lenders lend against ARV rather than the current as-is value, because their security is the finished, higher-value property.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate a Hard Money Loan',
          description: 'Estimate your hard money loan amount, cost, and cash to close in three steps.',
          steps: [
            {
              name: 'Find the two loan limits',
              text: 'Calculate the ARV cap (ARV times the lender’s max LTV, often 70%) and the total project cost (purchase price plus rehab budget).',
            },
            {
              name: 'Take the lesser as your loan',
              text: 'Your loan amount is the smaller of the ARV cap and the total project cost. If the ARV cap is lower, you bring the difference in cash.',
            },
            {
              name: 'Add the cost of money',
              text: 'Add the points (a percentage of the loan charged up front) and the interest-only payments over your holding period to see the total financing cost.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Hard Money Loan Calculator</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Hard Money Loan Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Hard money funds fast, asset-based deals — flips and BRRRR acquisitions — against the
          property&apos;s after-repair value. Enter your numbers to see the loan amount, the points and
          interest it costs, and the cash you&apos;ll bring to closing.
        </p>
      </div>

      <HardMoneyCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Hard Money Loan Calculator" calculatorPath="/calculators/hard-money" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How Hard Money Loans Are Sized</h2>
        <p className="mt-4 text-text-muted leading-7">
          Hard money lenders underwrite the deal, not your income. They cap the loan at a percentage
          of the after-repair value and won&apos;t exceed your actual project cost:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Loan = lesser of (ARV &times; 70%) and (Purchase + Rehab)
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            You buy at <strong className="text-text">$200,000</strong>, budget{' '}
            <strong className="text-text">$40,000</strong> of rehab, and the{' '}
            <strong className="text-text">ARV is $320,000</strong>. At 70% of ARV the cap is{' '}
            <strong className="text-text">$224,000</strong> — just below your{' '}
            <strong className="text-text">$240,000</strong> project cost, so the loan is{' '}
            <strong className="text-primary">$224,000</strong>. At 2 points that&apos;s{' '}
            <strong className="text-text">$4,480</strong> up front, and at 11% interest-only the
            payment is about <strong className="text-text">$2,053</strong>/month. You&apos;d bring
            roughly <strong className="text-text">$20,480</strong> to close (the $16,000 cost gap
            plus points).
          </p>
        </div>
        <p className="mt-6 text-text-muted leading-7">
          Have an exit nailed down before you borrow. Most flippers either sell or refinance into a{' '}
          <Link href="/financing/seller-financing" className="text-primary hover:text-primary-light underline transition-colors">
            longer-term loan
          </Link>
          ; BRRRR investors plan a{' '}
          <Link href="/calculators/refinance" className="text-primary hover:text-primary-light underline transition-colors">
            DSCR refinance
          </Link>
          . Run the full deal through the{' '}
          <Link href="/calculators/fix-flip" className="text-primary hover:text-primary-light underline transition-colors">
            fix-and-flip
          </Link>{' '}
          or{' '}
          <Link href="/calculators/brrrr" className="text-primary hover:text-primary-light underline transition-colors">
            BRRRR
          </Link>{' '}
          calculator, and see{' '}
          <Link href="/lenders/hard-money-loans" className="text-primary hover:text-primary-light underline transition-colors">
            hard money lenders
          </Link>
          .
        </p>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Fix & Flip Profit', href: '/calculators/fix-flip' },
          { label: 'BRRRR Calculator', href: '/calculators/brrrr' },
          { label: 'Refinance Calculator', href: '/calculators/refinance' },
          { label: 'Hard Money Lenders', href: '/lenders/hard-money-loans', muted: true },
        ]}
      />
    </div>
  )
}
