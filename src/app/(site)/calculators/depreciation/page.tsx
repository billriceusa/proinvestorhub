import type { Metadata } from 'next'
import Link from 'next/link'
import { DepreciationCalculator } from '@/components/calculators/depreciation-calculator'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Rental Property Depreciation Calculator + Tax Savings',
  description:
    'Free rental property depreciation calculator. Enter your purchase price and land value to see annual straight-line depreciation, your depreciable basis, and the estimated tax savings. No sign-up.',
  alternates: { canonical: '/calculators/depreciation' },
  openGraph: {
    title: 'Rental Property Depreciation Calculator | ProInvestorHub',
    description:
      'See your annual rental property depreciation and the tax it shelters in seconds.',
  },
}

export default function DepreciationPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Rental Property Depreciation Calculator',
          description:
            'Free straight-line depreciation calculator for rental and investment property, with an estimated tax shield.',
          url: `${baseUrl}/calculators/depreciation`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Depreciation Calculator', url: `${baseUrl}/calculators/depreciation` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'How is rental property depreciation calculated?',
            answer:
              'Residential rental property is depreciated straight-line over 27.5 years (commercial over 39). You depreciate only the building, not the land, so you subtract the land value from your cost basis and divide what remains by 27.5. A $300,000 property with $60,000 in land has a $240,000 basis and about $8,727 of annual depreciation.',
          },
          {
            question: 'How much can I save in taxes from depreciation?',
            answer:
              'Depreciation is a deduction against rental income, so the savings equal your annual depreciation multiplied by your marginal tax rate. At a 24% rate, $8,727 of depreciation shelters about $2,094 of tax each year — even though it costs you nothing out of pocket.',
          },
          {
            question: 'What is depreciation recapture?',
            answer:
              'When you sell, the IRS "recaptures" the depreciation you claimed and taxes it at up to 25%. A 1031 exchange lets you defer both the capital gains and the recapture by rolling the proceeds into a replacement property.',
          },
          {
            question: 'How do I determine the land value?',
            answer:
              'The most defensible source is your county tax assessor’s split between land and improvements — apply that same ratio to your purchase price. An appraisal can also allocate it. A rough default is around 20% land, but using your assessor’s figure is safer.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Calculate Rental Property Depreciation',
          description:
            'Calculate annual straight-line depreciation on a rental property in three steps.',
          steps: [
            {
              name: 'Find your depreciable basis',
              text: 'Subtract the land value from your purchase price (land can’t be depreciated) and add any capital improvements. The result is the depreciable basis of the building.',
            },
            {
              name: 'Divide by the recovery period',
              text: 'Divide the depreciable basis by 27.5 years for residential rental property, or 39 years for commercial. That is your annual depreciation deduction.',
            },
            {
              name: 'Estimate the tax savings',
              text: 'Multiply the annual depreciation by your marginal tax rate to see how much tax it shelters each year.',
            },
          ],
        })}
      />

      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Depreciation Calculator</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Rental Property Depreciation Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Depreciation is one of the best tax breaks in real estate — a paper deduction that shelters
          your rental income without costing you a dime. Enter your purchase price and land split to
          see your annual deduction and the tax it saves.
        </p>
      </div>

      <DepreciationCalculator />

      <div className="mt-6 max-w-3xl">
        <CalculatorEmbed calculatorName="Depreciation Calculator" calculatorPath="/calculators/depreciation" />
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How Rental Property Depreciation Works</h2>
        <p className="mt-4 text-text-muted leading-7">
          The IRS lets you deduct the cost of a rental building over its &ldquo;useful life&rdquo; —
          27.5 years for residential, 39 for commercial — even as the property appreciates. You
          depreciate only the building, never the land:
        </p>
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-text sm:text-xl">
            Annual Depreciation = (Purchase Price &minus; Land Value) &divide; 27.5
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-surface-alt p-6">
          <p className="font-semibold text-text">Worked example</p>
          <p className="mt-2 text-text-muted leading-7">
            You buy a <strong className="text-text">$300,000</strong> rental and your assessor
            allocates <strong className="text-text">20%</strong> ($60,000) to land. The depreciable
            basis is <strong className="text-text">$240,000</strong>, which over 27.5 years is about{' '}
            <strong className="text-primary">$8,727</strong> of depreciation a year. At a 24%
            marginal rate, that shelters roughly <strong className="text-text">$2,094</strong> in tax
            annually — money that stays in your pocket while the property keeps appreciating.
          </p>
        </div>
        <p className="mt-6 text-text-muted leading-7">
          Planning to sell? Depreciation is recaptured (taxed up to 25%) unless you defer with a{' '}
          <Link href="/calculators/1031-exchange" className="text-primary hover:text-primary-light underline transition-colors">
            1031 exchange
          </Link>
          . Pair this with the{' '}
          <Link href="/calculators/rental-cashflow" className="text-primary hover:text-primary-light underline transition-colors">
            cash flow calculator
          </Link>{' '}
          to see the property&apos;s full after-tax picture.
        </p>
      </section>

      <CalculatorRelatedTools
        tools={[
          { label: '1031 Exchange Tax Savings', href: '/calculators/1031-exchange' },
          { label: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
          { label: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
          { label: 'Sell vs. Rent', href: '/calculators/sell-vs-rent' },
        ]}
      />
    </div>
  )
}
