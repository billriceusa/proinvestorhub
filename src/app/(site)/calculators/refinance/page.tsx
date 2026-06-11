import type { Metadata } from 'next'
import Link from 'next/link'
import { RefinanceCalculator } from '@/components/calculators/refinance-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Refinance Calculator: When to Refinance + Cash-Out (Investor)',
  description:
    'Free refinance calculator for investors. See your monthly savings and break-even on a rate-and-term refi, or your net cash and new payment on a cash-out refinance. No sign-up.',
  alternates: { canonical: '/calculators/refinance' },
  openGraph: {
    title: 'Refinance Calculator | ProInvestorHub',
    description:
      'Should you refinance? See the break-even on a rate-and-term refi or the net cash on a cash-out, in seconds.',
  },
}

export default function RefinancePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Refinance Calculator',
          description:
            'Free refinance calculator for real estate investors. Break-even on a rate-and-term refi and net cash on a cash-out refinance.',
          url: `${baseUrl}/calculators/refinance`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Refinance Calculator', url: `${baseUrl}/calculators/refinance` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'When does it make sense to refinance?',
            answer:
              'For a rate-and-term refinance, it makes sense when the new payment is low enough that the monthly savings recoup your closing costs before you plan to sell or refinance again — your break-even point. A common rule of thumb is a rate drop of about 0.75–1% or more, but the break-even math is what actually matters because a longer new term can erase the savings.',
          },
          {
            question: 'How do I calculate the break-even on a refinance?',
            answer:
              'Divide your total closing costs by your monthly savings. If a refinance costs $6,000 and lowers your payment by $200 a month, you break even in 30 months. If you will hold the property longer than that, the refinance pays off.',
          },
          {
            question: 'How much can I cash out on an investment property refinance?',
            answer:
              'Lenders cap a cash-out refinance at a maximum loan-to-value — typically 70–75% for investment properties. Multiply the property value by that LTV, subtract your current balance and closing costs, and what remains is your net cash. The calculator’s cash-out mode does this for you.',
          },
          {
            question: 'Is a cash-out refinance or a HELOC better?',
            answer:
              'A cash-out refinance replaces your first mortgage with a larger one — best when you can also keep a reasonable rate and want one payment. A HELOC adds a revolving line on top of your existing mortgage — better when you have a low first-mortgage rate worth keeping and only need to draw as you go.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Decide When to Refinance',
          description:
            'Decide whether a rate-and-term refinance is worth it using monthly savings and closing costs.',
          steps: [
            {
              name: 'Compare the payments',
              text: 'Calculate your current principal-and-interest payment and the new payment at the new rate and term. The difference is your monthly savings.',
            },
            {
              name: 'Find the break-even',
              text: 'Divide your total closing costs by the monthly savings to get the number of months it takes to recoup the cost of refinancing.',
            },
            {
              name: 'Compare to your hold period',
              text: 'If you will keep the property longer than the break-even, the refinance saves you money. If you might sell or refinance again sooner, it usually does not pencil.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Refinance Calculator</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Refinance Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Two questions in one tool. <strong className="text-text">Rate &amp; Term:</strong> will a
          lower rate actually save you money once you account for closing costs?{' '}
          <strong className="text-text">Cash-Out:</strong> how much equity can you pull, and what
          does the new payment look like? Switch modes below.
        </p>
      </div>

      <RefinanceCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Refinance Calculator" calculatorPath="/calculators/refinance" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">When Is Refinancing Worth It?</h2>
        <p className="mt-4 text-text-muted leading-7">
          The honest answer is &ldquo;when you&apos;ll own the property past the break-even point.&rdquo;
          Forget the rule-of-thumb rate drops — the only number that matters is how long it takes the
          monthly savings to repay the closing costs:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Break-Even (months) = Closing Costs &divide; Monthly Savings
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            You owe <strong className="text-text">$240,000</strong> with 27 years left at 7.5% — about
            $1,726 a month in principal and interest. Refinancing into a new 30-year loan at 6.5%
            drops the payment to roughly <strong className="text-text">$1,517</strong>, a{' '}
            <strong className="text-text">$209</strong> monthly saving. On{' '}
            <strong className="text-text">$6,000</strong> of closing costs, you break even in about{' '}
            <strong className="text-primary">29 months</strong> — clearly worth it if you&apos;ll hold
            the property for years, but watch that the new 30-year term doesn&apos;t quietly add
            interest over the long run.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">Cash-Out Refinance vs. HELOC</h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            A <strong className="text-text">cash-out refinance</strong> replaces your first mortgage
            with a larger one and hands you the difference — best when you can keep a reasonable rate
            and want a single payment. It&apos;s the &ldquo;R&rdquo; in{' '}
            <Link
              href="/calculators/brrrr"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              BRRRR
            </Link>
            .
          </p>
          <p>
            A <strong className="text-text">HELOC</strong> leaves your first mortgage in place and
            adds a revolving line on top — better when you have a low first-mortgage rate worth
            keeping. Compare the two on the{' '}
            <Link
              href="/calculators/heloc"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              investment property HELOC calculator
            </Link>
            .
          </p>
          <p>
            Either way, an investment-property cash-out is capped around 70–75% LTV. Not sure which
            financing path fits your deal? Run the{' '}
            <Link
              href="/financing/matcher"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              Financing Matcher
            </Link>
            .
          </p>
        </div>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Investment Property HELOC', href: '/calculators/heloc' },
          { label: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
          { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
          { label: 'Financing Matcher', href: '/financing/matcher' },
        ]}
      />
    </div>
  )
}
