import type { Metadata } from 'next'
import Link from 'next/link'
import { PrintButton } from './print-button'

export const metadata: Metadata = {
  title: 'Rental Property Deal Analysis Checklist',
  description:
    'A printable 7-section checklist covering every number you need to evaluate a rental property deal — from income analysis to go/no-go decision.',
  openGraph: {
    title: 'Rental Property Deal Analysis Checklist | ProInvestorHub',
    description:
      'The step-by-step checklist pro investors use to evaluate every rental property deal.',
    url: '/resources/deal-analysis-checklist',
    images: [
      {
        url: '/api/og?title=Rental+Property+Deal+Analysis+Checklist&subtitle=Free+Printable+Resource',
        width: 1200,
        height: 630,
      },
    ],
  },
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-1.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border print:border-gray-400">
        &nbsp;
      </span>
      <span className="text-sm leading-relaxed text-text">{children}</span>
    </li>
  )
}

function SectionHeading({
  number,
  title,
  icon,
}: {
  number: number
  title: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary print:bg-gray-100 print:text-gray-700 shrink-0">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-text">
        <span className="text-primary print:text-gray-600">{number}.</span> {title}
      </h2>
    </div>
  )
}

function CalculatorLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-primary hover:text-primary-light font-medium text-xs print:text-gray-600 print:no-underline"
    >
      <svg className="h-3 w-3 print:hidden" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.25-4.5h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm2.25-4.5h.008v.008H12.75v-.008Zm0 2.25h.008v.008H12.75v-.008Zm2.25-4.5h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008ZM5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21Z" />
      </svg>
      {label}
    </Link>
  )
}

export default function DealAnalysisChecklistPage() {
  return (
    <>
      {/* Screen header */}
      <div className="bg-primary print:hidden">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
          <Link
            href="/resources"
            className="text-sm text-white/60 hover:text-white/80 transition-colors"
          >
            &larr; All Resources
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Rental Property Deal Analysis Checklist
          </h1>
          <p className="mt-3 text-lg text-white/70">
            7 sections, 30+ line items — everything you need to evaluate any rental property deal.
          </p>
          <div className="mt-6">
            <PrintButton />
          </div>
        </div>
      </div>

      {/* Printable checklist content */}
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 print:px-0 print:py-0 print:max-w-none">
        {/* Print-only header */}
        <div className="hidden print:block print:mb-8 print:border-b print:border-gray-300 print:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Rental Property Deal Analysis Checklist
              </h1>
              <p className="text-sm text-gray-500 mt-1">ProInvestorHub.com</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Property: ________________________________</p>
              <p className="mt-1">Date: ____________</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 print:space-y-6">
          {/* Section 1: Property Overview */}
          <section>
            <SectionHeading
              number={1}
              title="Property Overview"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              }
            />
            <ul className="space-y-0.5">
              <CheckItem>Property address, type, number of units, year built, square footage</CheckItem>
              <CheckItem>Asking price vs. comparable sales (run comps on 3+ recent sales)</CheckItem>
              <CheckItem>Current condition assessment (cosmetic / moderate rehab / full rehab)</CheckItem>
            </ul>
          </section>

          {/* Section 2: Income Analysis */}
          <section>
            <SectionHeading
              number={2}
              title="Income Analysis"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              }
            />
            <ul className="space-y-0.5">
              <CheckItem>Market rent research (3+ comparable rentals in the area)</CheckItem>
              <CheckItem>Current rent roll (if tenants are in place)</CheckItem>
              <CheckItem>Vacancy rate for the area (check local data sources)</CheckItem>
              <CheckItem>Other income sources (laundry, parking, storage)</CheckItem>
              <CheckItem>Gross Potential Income calculation</CheckItem>
            </ul>
          </section>

          {/* Section 3: Expense Analysis */}
          <section>
            <SectionHeading
              number={3}
              title="Expense Analysis"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              }
            />
            <ul className="space-y-0.5">
              <CheckItem>Property taxes (verify with county assessor)</CheckItem>
              <CheckItem>Insurance quote (landlord / rental property policy)</CheckItem>
              <CheckItem>Property management fees (typically 8-10% of gross rent)</CheckItem>
              <CheckItem>Maintenance reserves (5-10% of gross rent)</CheckItem>
              <CheckItem>CapEx reserves ($200-300 per unit per month)</CheckItem>
              <CheckItem>Utilities (if landlord-paid: water, electric, gas, trash)</CheckItem>
              <CheckItem>HOA / Condo fees</CheckItem>
              <CheckItem>Landscaping / Snow removal</CheckItem>
              <CheckItem>Vacancy allowance (5-8% of gross rent)</CheckItem>
            </ul>
          </section>

          {/* Section 4: Key Metrics */}
          <section className="print:break-before-page">
            <SectionHeading
              number={4}
              title="Key Metrics"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              }
            />
            <ul className="space-y-0.5">
              <CheckItem>
                NOI = Effective Gross Income - Operating Expenses{' '}
                <CalculatorLink href="/calculators/cap-rate" label="Cap Rate Calculator" />
              </CheckItem>
              <CheckItem>
                Cap Rate = NOI / Purchase Price{' '}
                <CalculatorLink href="/calculators/cap-rate" label="Cap Rate Calculator" />
              </CheckItem>
              <CheckItem>
                Cash-on-Cash Return = Annual Cash Flow / Total Cash Invested{' '}
                <CalculatorLink href="/calculators/cash-on-cash" label="CoC Calculator" />
              </CheckItem>
              <CheckItem>
                DSCR = NOI / Annual Debt Service (if using financing){' '}
                <CalculatorLink href="/calculators/mortgage" label="Mortgage Calculator" />
              </CheckItem>
              <CheckItem>
                Monthly Cash Flow = Gross Rent - All Expenses - Mortgage{' '}
                <CalculatorLink href="/calculators/rental-cashflow" label="Cash Flow Calculator" />
              </CheckItem>
            </ul>
          </section>

          {/* Section 5: Financing */}
          <section>
            <SectionHeading
              number={5}
              title="Financing"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
              }
            />
            <ul className="space-y-0.5">
              <CheckItem>Down payment amount and source of funds</CheckItem>
              <CheckItem>Loan type (conventional, DSCR, portfolio, hard money)</CheckItem>
              <CheckItem>Interest rate and loan terms (fixed vs. ARM, amortization period)</CheckItem>
              <CheckItem>Monthly mortgage payment (principal &amp; interest)</CheckItem>
              <CheckItem>Closing costs estimate (2-5% of purchase price)</CheckItem>
            </ul>
          </section>

          {/* Section 6: Due Diligence */}
          <section>
            <SectionHeading
              number={6}
              title="Due Diligence"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              }
            />
            <ul className="space-y-0.5">
              <CheckItem>Property inspection scheduled and completed</CheckItem>
              <CheckItem>Title search is clean (no liens or encumbrances)</CheckItem>
              <CheckItem>Environmental assessment (if commercial or suspect property)</CheckItem>
              <CheckItem>Rent comparables independently verified</CheckItem>
              <CheckItem>Insurance quote obtained from qualified provider</CheckItem>
              <CheckItem>Property management company interviewed (if not self-managing)</CheckItem>
              <CheckItem>Exit strategy defined (buy &amp; hold, flip, BRRRR, 1031 exchange)</CheckItem>
            </ul>
          </section>

          {/* Section 7: Go/No-Go Decision */}
          <section>
            <SectionHeading
              number={7}
              title="Go / No-Go Decision"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              }
            />
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 print:border-gray-300 print:bg-gray-50">
              <ul className="space-y-0.5">
                <CheckItem>Cash flow positive after ALL expenses (including reserves)?</CheckItem>
                <CheckItem>Cap rate meets your minimum target?</CheckItem>
                <CheckItem>Cash-on-cash return above your threshold?</CheckItem>
                <CheckItem>Adequate cash reserves available post-purchase?</CheckItem>
                <CheckItem>Exit strategy viable in current market conditions?</CheckItem>
              </ul>
            </div>
            <div className="mt-4 rounded-lg bg-surface p-4 print:bg-gray-50">
              <p className="text-sm font-semibold text-text">Final Decision</p>
              <div className="mt-2 flex gap-6">
                <label className="flex items-center gap-2 text-sm text-text">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-500 print:border-gray-500">&nbsp;</span>
                  GO — Make the offer
                </label>
                <label className="flex items-center gap-2 text-sm text-text">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-red-400 print:border-gray-500">&nbsp;</span>
                  NO-GO — Pass on this deal
                </label>
              </div>
              <div className="mt-3">
                <p className="text-xs text-text-muted">Notes: ____________________________________________________________</p>
              </div>
            </div>
          </section>
        </div>

        {/* Print-only footer */}
        <div className="hidden print:block print:mt-8 print:border-t print:border-gray-300 print:pt-4">
          <p className="text-xs text-gray-400 text-center">
            ProInvestorHub.com — Free tools and education for real estate investors
          </p>
        </div>

        {/* Screen-only footer CTA */}
        <div className="mt-16 rounded-xl border border-border bg-white p-8 text-center print:hidden">
          <h3 className="text-xl font-bold text-text">Put This Checklist to Work</h3>
          <p className="mt-2 text-sm text-text-muted max-w-md mx-auto">
            Use our free calculators to crunch the numbers for each line item above.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/cap-rate"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Cap Rate Calculator
            </Link>
            <Link
              href="/calculators/cash-on-cash"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text hover:bg-surface transition-colors"
            >
              Cash-on-Cash Return
            </Link>
            <Link
              href="/calculators/rental-cashflow"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text hover:bg-surface transition-colors"
            >
              Rental Cash Flow
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
