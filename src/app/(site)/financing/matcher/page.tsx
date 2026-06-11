import type { Metadata } from 'next'
import Link from 'next/link'
import { FinancingMatcher } from '@/components/financing-matcher'
import { JsonLd, calculatorJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd } from '@/components/json-ld'
import { financingScenarios } from '@/data/financing-scenarios'

export const metadata: Metadata = {
  title: 'Financing Matcher: What Loan Should I Use for My Real Estate Deal?',
  description:
    'Answer a few questions about your deal and get matched to the right real estate financing — DSCR, hard money, conventional, BRRRR, commercial, and more — with why each fits and lenders to start with. Free, no sign-up.',
  alternates: { canonical: '/financing/matcher' },
  openGraph: {
    title: 'Financing Matcher | ProInvestorHub',
    description:
      'Tell us your deal, we’ll tell you how to fund it. Get matched to the right financing type and lenders in under a minute.',
  },
}

export default function FinancingMatcherPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={calculatorJsonLd({
          name: 'Real Estate Financing Matcher',
          description:
            'Interactive tool that recommends which real estate investment financing type fits a deal, with reasoning and matched lenders.',
          url: `${baseUrl}/financing/matcher`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Financing', url: `${baseUrl}/financing/matcher` },
          { name: 'Financing Matcher', url: `${baseUrl}/financing/matcher` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'How do I know which loan to use for an investment property?',
            answer:
              'It comes down to your deal and your profile: what you’re buying, the condition, your exit strategy, how fast you need to close, your credit, how you document income, and how many properties you already finance. Turnkey buy-and-hold with strong W-2 income points to a conventional loan; self-employed or scaling past 10 properties points to DSCR; a flip or heavy rehab points to hard money or a fix-and-flip loan; 5+ units points to commercial. The matcher weighs all of these at once.',
          },
          {
            question: 'What is the best loan for a BRRRR deal?',
            answer:
              'BRRRR is a two-step financing chain. You acquire and rehab with short-term money — hard money or a fix-and-flip loan — then refinance into a long-term DSCR loan once the property is rented and stabilized. A fix-and-rent (bridge-to-permanent) loan combines both steps into one closing, which is why it’s often the single best fit for a BRRRR.',
          },
          {
            question: 'Can I get an investment property loan if I’m self-employed?',
            answer:
              'Yes. DSCR loans qualify on the property’s rental income rather than your personal income, and bank statement loans use 12–24 months of deposits instead of tax returns. Both are built for self-employed investors whose write-offs understate their income on paper.',
          },
          {
            question: 'What financing can I use with little or no money down?',
            answer:
              'Low-cash options include tapping equity in another property with a HELOC or cash-out refinance, owner-occupied house-hacking with FHA or VA financing, seller financing, subject-to, and bringing on a capital partner. Each has trade-offs, so the matcher surfaces them as options to weigh against conventional debt.',
          },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: 'How to Choose Financing for a Real Estate Deal',
          description:
            'Match a real estate investment deal to the right financing type in a few steps.',
          steps: [
            { name: 'Describe the deal', text: 'Pick the deal type — turnkey rental, BRRRR, flip, ground-up build, short-term rental, multifamily, or wholesale — and your exit strategy.' },
            { name: 'Add your constraints', text: 'Note the property condition, how fast you need to close, your credit band, and how you document income.' },
            { name: 'Add your position', text: 'Share how much cash you have, how many properties you already finance, your entity, and whether you’ll occupy the property.' },
            { name: 'Review your matches', text: 'See the financing types ranked by fit, with why each works for your deal and lenders to start with.' },
          ],
        })}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/lenders" className="transition-colors hover:text-primary">
          Lenders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Financing Matcher</span>
      </nav>

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Financing Matcher</h1>
        <p className="mt-3 text-lg leading-7 text-text-muted">
          Not sure how to fund your next deal? Answer a few questions and we’ll match you to the
          financing types that fit — with the reasoning, the trade-offs, and lenders to start with.
          No single lender can tell you this, because each one only sells what they offer.
        </p>
      </div>

      <FinancingMatcher />

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How to Choose Financing for Your Deal</h2>
        <div className="mt-6 space-y-4 leading-7 text-text-muted">
          <p>
            There’s no single &ldquo;best&rdquo; investment property loan — only the best loan for{' '}
            <em>this</em> deal and <em>your</em> situation. The matcher weighs the same factors an
            experienced investor runs through instinctively:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-text">The deal &amp; exit.</strong> A turnkey hold, a BRRRR, a
              flip, a ground-up build, and a 5+ unit acquisition each call for a different product —
              and your exit (hold, refinance, or sell) decides whether you need short-term or
              long-term money.
            </li>
            <li>
              <strong className="text-text">Property condition.</strong> Agency and DSCR lenders want
              a rent-ready property; heavy rehab and tear-downs need hard money, fix-and-flip, or
              construction financing for the work, then a refinance afterward.
            </li>
            <li>
              <strong className="text-text">Speed.</strong> Competing with cash or buying at auction
              means hard or private money that closes in days — conventional and agency loans take
              30–45+.
            </li>
            <li>
              <strong className="text-text">Credit &amp; income docs.</strong> Strong W-2 income gets
              the lowest conventional rates; self-employed borrowers lean on DSCR (qualifies on rent)
              or bank-statement loans.
            </li>
            <li>
              <strong className="text-text">Portfolio size &amp; entity.</strong> Conventional caps
              out at 10 financed properties and usually wants title in your name; DSCR and portfolio
              loans scale past that and close in an LLC.
            </li>
          </ul>
          <p>
            Once you know the type, compare specific lenders in the{' '}
            <Link href="/lenders" className="text-primary underline transition-colors hover:text-primary-light">
              lender directory
            </Link>
            , or let the{' '}
            <Link href="/lenders/finder" className="text-primary underline transition-colors hover:text-primary-light">
              Lender Finder
            </Link>{' '}
            rank them against your full profile.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl border-t border-border pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
          Financing by scenario
        </h2>
        <p className="mt-2 text-text-muted">
          Prefer to start from your situation? Each guide breaks down the options and drops you into
          the matcher pre-set for that deal.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {financingScenarios.map((s) => (
            <Link
              key={s.slug}
              href={`/how-to-finance/${s.slug}`}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-surface"
            >
              {s.h1.replace(/^How to Finance /, '')}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
