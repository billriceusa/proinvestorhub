import type { Metadata } from 'next'
import Link from 'next/link'
import { SellVsRentCalculator } from '@/components/calculators/sell-vs-rent-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Sell vs. Rent Calculator: Should You Sell or Keep Your Rental?',
  description:
    'Free sell-vs-rent calculator. Compare the long-run wealth of selling and reinvesting against holding and renting — factoring in appreciation, cash flow, and principal paydown. No sign-up.',
  alternates: { canonical: '/calculators/sell-vs-rent' },
  openGraph: {
    title: 'Sell vs. Rent Calculator | ProInvestorHub',
    description:
      'Should you sell the property or keep renting it? Compare both paths over time.',
  },
}

export default function SellVsRentPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Sell vs. Rent Calculator',
          description:
            'Free calculator comparing the long-run wealth of selling and reinvesting versus holding and renting an investment property.',
          url: `${baseUrl}/calculators/sell-vs-rent`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Sell vs. Rent', url: `${baseUrl}/calculators/sell-vs-rent` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'Should I sell my rental property or keep renting it?',
            answer:
              'It depends on which path builds more wealth over your time horizon. Holding earns appreciation, cash flow, and principal paydown; selling frees up equity you can invest elsewhere, but costs you sale fees and taxes. Compare the two ending balances — and weigh the equity you’d unlock against the hassle of being a landlord.',
          },
          {
            question: 'What costs should I include when deciding to sell a rental?',
            answer:
              'Selling costs typically run 6–8% of the sale price (agent commissions, closing, concessions), plus capital-gains tax and depreciation recapture unless you do a 1031 exchange. On the hold side, factor operating expenses, vacancy, and the opportunity cost of the trapped equity.',
          },
          {
            question: 'Is it better to sell or do a cash-out refinance?',
            answer:
              'If the property still cash-flows and you mainly want the equity, a cash-out refinance or HELOC lets you pull capital without selling, keeping the appreciation and avoiding the tax hit. Selling makes more sense when the property underperforms or you want out of landlording entirely.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Decide Whether to Sell or Rent a Property',
          description:
            'Compare selling and reinvesting against holding and renting an investment property over a chosen time horizon.',
          steps: [
            {
              name: 'Project the hold path',
              text: 'Add the future equity (appreciated value minus the paid-down loan balance) to the cumulative cash flow you’d collect over the hold period.',
            },
            {
              name: 'Project the sell path',
              text: 'Subtract the mortgage balance and selling costs from today’s value to get your net proceeds, then grow that amount at your expected investment return for the same number of years.',
            },
            {
              name: 'Compare the ending balances',
              text: 'Whichever path produces more wealth at the end of your time horizon is the financially stronger move — before factoring taxes and your tolerance for being a landlord.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Sell vs. Rent</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Sell vs. Rent Calculator</h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Sitting on a property and not sure whether to cash out or keep renting? This compares the
          long-run wealth of <strong className="text-text">selling and reinvesting</strong> against{' '}
          <strong className="text-text">holding and renting</strong> — including appreciation, cash
          flow, and principal paydown.
        </p>
      </div>

      <SellVsRentCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Sell vs. Rent Calculator" calculatorPath="/calculators/sell-vs-rent" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">Sell or Keep Renting? How to Decide</h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            The financial question is simple even if the math isn&apos;t: which choice leaves you
            wealthier at the end of your time horizon? The calculator pits two paths against each
            other.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Hold &amp; rent</strong> earns three things at once —
              appreciation on the whole property value, monthly cash flow, and equity from your
              tenant paying down the loan.
            </li>
            <li>
              <strong className="text-text">Sell &amp; invest</strong> frees your trapped equity
              today (after sale costs) to compound elsewhere — but you give up the leverage and the
              cash flow.
            </li>
          </ul>
          <p>
            One nuance the calculator flags: if you mostly want the <em>equity</em>, you may not need
            to sell at all. A{' '}
            <Link href="/calculators/refinance" className="text-primary hover:text-primary-light underline transition-colors">
              cash-out refinance
            </Link>{' '}
            or{' '}
            <Link href="/calculators/heloc" className="text-primary hover:text-primary-light underline transition-colors">
              HELOC
            </Link>{' '}
            pulls capital while you keep the asset and its appreciation — and avoids the tax hit a
            sale triggers (which a{' '}
            <Link href="/calculators/1031-exchange" className="text-primary hover:text-primary-light underline transition-colors">
              1031 exchange
            </Link>{' '}
            can otherwise defer).
          </p>
        </div>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: 'Refinance Calculator', href: '/calculators/refinance' },
          { label: 'Investment Property HELOC', href: '/calculators/heloc' },
          { label: '1031 Exchange Tax Savings', href: '/calculators/1031-exchange' },
          { label: 'Depreciation Calculator', href: '/calculators/depreciation' },
        ]}
      />
    </div>
  )
}
