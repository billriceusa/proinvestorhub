import type { Metadata } from 'next'
import Link from 'next/link'
import { Exchange1031Calculator } from '@/components/calculators/exchange-1031-calculator'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: '1031 Exchange Calculator | Free Tax Savings Estimator',
  description:
    'Calculate how much you can save with a 1031 exchange. See capital gains tax, depreciation recapture, and state taxes deferred when you reinvest in a like-kind property. Free, no sign-up required.',
  alternates: { canonical: '/calculators/1031-exchange' },
  openGraph: {
    title: '1031 Exchange Tax Savings Calculator | ProInvestorHub',
    description:
      'Free 1031 exchange calculator for real estate investors. Estimate your tax deferral instantly.',
  },
}

export default function Exchange1031CalculatorPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: '1031 Exchange Tax Savings Calculator',
          description:
            'Free 1031 exchange calculator for real estate investors. Estimate capital gains tax deferred, depreciation recapture savings, and additional equity available for reinvestment.',
          url: `${baseUrl}/calculators/1031-exchange`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: '1031 Exchange Calculator', url: `${baseUrl}/calculators/1031-exchange` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What is a 1031 exchange?',
            answer:
              'A 1031 exchange (named after IRC Section 1031) allows real estate investors to defer capital gains taxes when they sell an investment property and reinvest the proceeds into a like-kind property. Instead of paying federal and state taxes on the gain, the entire amount rolls into the new property, preserving your equity and compounding your returns.',
          },
          {
            question: 'What is the timeline for a 1031 exchange?',
            answer:
              'You have 45 calendar days from the sale closing to identify up to three potential replacement properties (the Identification Period). You then have 180 calendar days total from the closing date to complete the purchase of one or more of those identified properties (the Exchange Period). Both deadlines are strict — missing either one disqualifies the exchange.',
          },
          {
            question: 'Can you do a 1031 exchange on a primary residence?',
            answer:
              'No. Section 1031 applies only to property held for investment or productive use in a trade or business. Your primary residence does not qualify. However, if you convert a rental property to your primary residence (or vice versa), partial eligibility may apply under specific IRS rules. Consult a tax professional for your situation.',
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/calculators" className="hover:text-primary transition-colors">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">1031 Exchange</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          1031 Exchange Tax Savings Calculator
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          A{' '}
          <Link
            href="/glossary/1031-exchange"
            className="text-primary hover:text-primary-light underline transition-colors"
          >
            1031 exchange
          </Link>{' '}
          lets you defer capital gains taxes when you sell an investment property
          and reinvest in a like-kind replacement. Use this calculator to see
          exactly how much tax you can defer — and how much additional equity
          you&apos;ll have to invest in your next property.
        </p>
      </div>

      {/* Calculator */}
      <Exchange1031Calculator />

      {/* Educational Content */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">
          How to Use This Calculator
        </h2>
        <div className="mt-6 prose prose-neutral max-w-none text-text-muted leading-7 space-y-4">
          <p>
            <strong className="text-text">1. Enter your sale details</strong> — the
            expected sale price, your original purchase price (
            <Link
              href="/glossary/cost-basis"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              cost basis
            </Link>
            ), and the total{' '}
            <Link
              href="/glossary/depreciation"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              depreciation
            </Link>{' '}
            you&apos;ve claimed. Include selling costs like agent commissions and
            closing fees.
          </p>
          <p>
            <strong className="text-text">2. Set your tax rates</strong> — choose your
            federal{' '}
            <Link
              href="/glossary/capital-gains"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              capital gains
            </Link>{' '}
            rate (15% or 20%), and adjust the state tax rate for your state.
            Depreciation recapture is fixed at 25% by the IRS.
          </p>
          <p>
            <strong className="text-text">3. Enter the replacement property price</strong>{' '}
            — the property you plan to buy with the exchange proceeds. To defer
            all taxes, the replacement must be equal to or greater than your sale
            price.
          </p>
          <p>
            <strong className="text-text">4. Review your savings</strong> — the results
            panel shows your total tax deferred, a breakdown of each tax
            component, and a side-by-side comparison of selling with and without
            a 1031 exchange.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          What Is a 1031 Exchange?
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <p>
            A{' '}
            <Link
              href="/glossary/1031-exchange"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              1031 exchange
            </Link>{' '}
            (also called a like-kind exchange or Starker exchange) is a tax
            strategy under Internal Revenue Code Section 1031. It allows you to
            sell an investment property and defer all capital gains taxes by
            reinvesting the proceeds into another &ldquo;like-kind&rdquo;
            property.
          </p>
          <p>
            &ldquo;Like-kind&rdquo; is broadly defined for real estate — any
            investment or business property qualifies, regardless of property
            type. You can exchange an apartment building for raw land, or a
            retail center for a single-family rental. The key requirement is that
            both properties must be held for investment or business use.
          </p>
          <p>
            The exchange must follow strict IRS timelines:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">45-day Identification Period</strong> — you
              must identify up to three potential replacement properties within
              45 calendar days of selling.
            </li>
            <li>
              <strong className="text-text">180-day Exchange Period</strong> — you must
              close on the replacement property within 180 calendar days of
              selling (or your tax return due date, whichever comes first).
            </li>
          </ul>
          <p>
            For a deeper dive, read our{' '}
            <Link
              href="/blog/1031-exchange-rules-complete-guide"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              complete guide to 1031 exchange rules
            </Link>
            .
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-text">
          Key Rules and Requirements
        </h2>
        <div className="mt-6 text-text-muted leading-7 space-y-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-text">Investment property only</strong> — 1031
              exchanges apply to property held for investment or business use.
              Your primary residence and vacation homes (unless rented) do not
              qualify.
            </li>
            <li>
              <strong className="text-text">Qualified Intermediary required</strong> — you
              cannot touch the sale proceeds. A Qualified Intermediary (QI) must
              hold the funds between the sale and purchase. Using a QI is not
              optional — it&apos;s required by the IRS.
            </li>
            <li>
              <strong className="text-text">Boot triggers tax</strong> — if the
              replacement property costs less than the one you sold, the
              difference is called &ldquo;boot&rdquo; and is taxable. To defer
              100% of the taxes, the replacement property must be equal to or
              greater in value than the sold property.
            </li>
            <li>
              <strong className="text-text">Same taxpayer</strong> — the person or
              entity on the sale must be the same on the purchase. You can&apos;t
              sell from your personal name and buy in an LLC (or vice versa)
              without careful planning.
            </li>
            <li>
              <strong className="text-text">Deferral, not elimination</strong> — a 1031
              exchange defers taxes; it doesn&apos;t eliminate them. The tax
              basis carries over to the new property. However, many investors
              chain multiple 1031 exchanges over a lifetime and ultimately pass
              properties to heirs at a stepped-up basis, effectively eliminating
              the deferred gain.
            </li>
          </ul>
          <p>
            For more on reducing your real estate tax burden, see our{' '}
            <Link
              href="/blog/real-estate-tax-strategies-guide"
              className="text-primary hover:text-primary-light underline transition-colors"
            >
              real estate tax strategies guide
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
