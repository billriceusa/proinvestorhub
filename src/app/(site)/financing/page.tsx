import type { Metadata } from 'next'
import Link from 'next/link'
import { loanTypeCategories, getLoanTypesByCategory } from '@/data/loan-types'
import { financingScenarios } from '@/data/financing-scenarios'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Real Estate Investment Financing: The Complete Guide',
  description:
    'Every way to fund a real estate investment — DSCR, hard money, conventional, portfolio, BRRRR, commercial, SBA, plus creative finance like seller financing and subject-to. Compared, with an interactive matcher and calculators. Free.',
  alternates: { canonical: '/financing' },
  openGraph: {
    title: 'Real Estate Investment Financing: The Complete Guide | ProInvestorHub',
    description:
      'If you need financing and aren’t sure what to use or where to get it — start here.',
  },
}

// Creative-finance options that don't have their own lender directory page.
// The `id` anchors are linked from the Financing Matcher's "also consider" cards.
const creativeFinance: Array<{ id: string; name: string; blurb: string; whoFor: string; href?: string }> = [
  {
    id: 'heloc-cashout',
    name: 'HELOC / Cash-Out Refinance',
    blurb:
      'Tap equity in a property you already own to fund the next down payment — either a revolving HELOC on top of your mortgage, or a cash-out refinance that replaces it.',
    whoFor: 'Investors with equity and not enough fresh cash for the next deal.',
    href: '/calculators/heloc',
  },
  {
    id: 'fha-va-househack',
    name: 'FHA / VA House-Hacking',
    blurb:
      'Owner-occupied financing on a 2–4 unit: live in one unit and rent the rest. FHA allows as little as 3.5% down; VA can go to 0% for eligible veterans.',
    whoFor: 'First-timers willing to live in the property for a year.',
    href: '/financing/house-hacking',
  },
  {
    id: 'seller-financing',
    name: 'Seller Financing',
    blurb:
      'The seller acts as the bank and carries a note for you. No institutional qualifying, and the rate, term, and down payment are all negotiable.',
    whoFor: 'Buyers whose credit or income docs are a hurdle, or who want creative terms.',
    href: '/financing/seller-financing',
  },
  {
    id: 'subject-to',
    name: 'Subject-To',
    blurb:
      'You take over the seller’s existing mortgage and keep it in place. Powerful when the loan carries a low rate — but mind the lender’s due-on-sale clause.',
    whoFor: 'Low-cash buyers with a motivated seller and a favorable existing loan.',
    href: '/financing/subject-to',
  },
  {
    id: 'lease-option',
    name: 'Lease Option / Rent-to-Own',
    blurb:
      'Control a property with a lease plus the option to buy later at a set price. Lets you lock a deal without financing it today.',
    whoFor: 'Investors who want control now and financing (or resale) later.',
    href: '/financing/lease-option',
  },
  {
    id: 'wraparound',
    name: 'Wraparound Mortgage',
    blurb:
      'Seller financing when the seller still has a mortgage: a new, larger note wraps around their existing loan, and they earn the rate spread.',
    whoFor: 'Buyers with a willing seller whose existing loan stays in place.',
    href: '/financing/wraparound-mortgage',
  },
  {
    id: 'partnerships-jv',
    name: 'Partnerships & JV',
    blurb:
      'Split the deal: you bring the deal and the work, a partner brings the capital, and you share the returns under a written agreement.',
    whoFor: 'Operators with strong deals but limited capital of their own.',
    href: '/financing/partnerships-jv',
  },
  {
    id: 'syndication',
    name: 'Real Estate Syndication',
    blurb:
      'Pool capital from passive investors to acquire a larger asset than you could alone. The sponsor runs the deal; limited partners fund it.',
    whoFor: 'Experienced operators scaling into larger multifamily or commercial.',
    href: '/financing/real-estate-syndication',
  },
  {
    id: 'transactional-funding',
    name: 'Transactional Funding',
    blurb:
      'Very short-term funding (often a single day) that lets a wholesaler close an A-to-B purchase and immediately resell B-to-C, without using their own cash.',
    whoFor: 'Wholesalers executing a same-day double close.',
    href: '/financing/transactional-funding',
  },
]

const sectionNav = [
  { label: 'Match my deal', href: '#matcher' },
  { label: 'Buy & hold', href: '#long-term' },
  { label: 'Acquisition / rehab', href: '#short-term' },
  { label: 'BRRRR', href: '#transitional' },
  { label: 'Commercial & specialty', href: '#specialty' },
  { label: 'Creative finance', href: '#creative' },
  { label: 'Calculators', href: '#calculators' },
]

export default function FinancingPillarPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Financing', url: `${baseUrl}/financing` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: 'What are the main ways to finance a real estate investment?',
            answer:
              'The core options are conventional and DSCR loans for buy-and-hold rentals; hard money, fix-and-flip, and bridge loans for acquisition and rehab; portfolio and commercial loans for scaling; and creative methods like seller financing, subject-to, partnerships, and tapping existing equity with a HELOC or cash-out refinance.',
          },
          {
            question: 'Which real estate loan has the lowest rate?',
            answer:
              'Conventional (Fannie/Freddie) investment loans carry the lowest rates, but they require full income documentation and cap you at ten financed properties. DSCR loans cost roughly one to two points more in exchange for qualifying on the property’s rent and having no property limit.',
          },
          {
            question: 'How do I finance a deal with no money down?',
            answer:
              'No-money-down almost always means using someone else’s capital: equity from another property via a HELOC or cash-out refinance, owner-occupied house-hacking, seller financing, subject-to, or a capital partner. Each shifts the cost or risk rather than eliminating it.',
          },
          {
            question: 'How do I know which financing type fits my deal?',
            answer:
              'It depends on the deal type, your exit strategy, the property condition, your credit and income documentation, your available cash, and how many properties you already finance. The Financing Matcher weighs all of these and recommends the financing types that fit.',
          },
        ])}
      />

      {/* Hero */}
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">The Complete Guide</p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          How to Finance a Real Estate Investment
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          There are more ways to fund a deal than most investors realize — and the right one depends
          entirely on the deal and your situation. This is the complete, lender-neutral map of every
          option, from conventional and DSCR loans to hard money, commercial debt, and creative
          finance. If you&apos;re not sure what you need or where to get it,{' '}
          <Link href="#matcher" className="text-primary underline transition-colors hover:text-primary-light">
            start with the matcher
          </Link>
          .
        </p>
      </div>

      {/* Section nav */}
      <nav className="mt-8 flex flex-wrap gap-2">
        {sectionNav.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* Matcher */}
      <section id="matcher" className="mt-12 scroll-mt-24 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-text">Not sure what you need? Match your deal.</h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Answer a few questions about your deal and we&apos;ll recommend the financing types that fit,
          with the reasoning and lenders to start with — something no single lender can do, because
          each one only sells what it offers.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/financing/matcher"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            Open the Financing Matcher →
          </Link>
          <Link
            href="/how-to-finance"
            className="inline-flex items-center rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Browse by scenario
          </Link>
        </div>
      </section>

      {/* Institutional financing types by category */}
      {loanTypeCategories.map((cat) => {
        const types = getLoanTypesByCategory(cat.value)
        if (!types.length) return null
        const anchor =
          cat.value === 'long-term'
            ? 'long-term'
            : cat.value === 'short-term'
              ? 'short-term'
              : cat.value === 'transitional'
                ? 'transitional'
                : 'specialty'
        return (
          <section key={cat.value} id={anchor} className="mt-14 scroll-mt-24">
            <h2 className="text-2xl font-bold text-text">{cat.label}</h2>
            <p className="mt-1 text-text-muted">{cat.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {types.map((lt) => (
                <Link
                  key={lt.slug}
                  href={`/lenders/${lt.slug}`}
                  className="rounded-xl border border-border bg-white p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-text">{lt.name}</h3>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-text-light">
                      {lt.typicalRateRange}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-text-muted">{lt.description}</p>
                  {lt.bestFor[0] && (
                    <p className="mt-2 text-xs text-text-light">
                      <span className="font-medium text-text-muted">Best for:</span> {lt.bestFor[0]}
                    </p>
                  )}
                  <span className="mt-3 inline-flex text-sm font-medium text-primary">
                    {lt.shortName} lenders &amp; details →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Creative finance */}
      <section id="creative" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-text">Creative Financing</h2>
        <p className="mt-1 text-text-muted">
          When institutional debt doesn&apos;t fit — low cash, tricky credit, or an unusual deal — these
          are the levers experienced investors pull. Each trades simplicity for flexibility, so know
          the risks going in. Start with the{' '}
          <Link href="/financing/creative-financing" className="text-primary underline transition-colors hover:text-primary-light">
            complete creative financing guide
          </Link>
          .
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {creativeFinance.map((c) => (
            <div
              key={c.id}
              id={c.id}
              className="scroll-mt-24 rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="text-lg font-semibold text-text">{c.name}</h3>
              <p className="mt-1.5 text-sm leading-6 text-text-muted">{c.blurb}</p>
              <p className="mt-2 text-xs text-text-light">
                <span className="font-medium text-text-muted">Best for:</span> {c.whoFor}
              </p>
              {c.href && (
                <Link href={c.href} className="mt-3 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary-light">
                  {c.href.startsWith('/calculators') ? 'Open the calculator →' : 'Read the full guide →'}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advanced & specialty methods */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text">Advanced &amp; Specialty Methods</h2>
        <p className="mt-1 text-text-muted">
          Capital-stack and portfolio tools that come into play on larger or more complex deals.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: 'Mezzanine Financing',
              blurb: 'The layer between the senior mortgage and equity — fills the funding gap on commercial deals without diluting ownership.',
              href: '/financing/mezzanine-financing',
            },
            {
              name: 'Blanket Loan',
              blurb: 'One mortgage across multiple properties, with a release clause to sell individual ones. For consolidating a portfolio.',
              href: '/financing/blanket-loan',
            },
            {
              name: 'Gap Funding',
              blurb: 'Secondary capital that covers the cash a hard-money loan leaves behind — the down payment and costs on a flip or BRRRR.',
              href: '/financing/gap-funding',
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-text">{c.name}</h3>
              <p className="mt-1.5 text-sm leading-6 text-text-muted">{c.blurb}</p>
              <span className="mt-3 inline-flex text-sm font-semibold text-primary">Read the full guide →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculators */}
      <section id="calculators" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-text">Financing Calculators</h2>
        <p className="mt-1 text-text-muted">Run the numbers before you commit.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { label: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
            { label: 'Investment Property HELOC', href: '/calculators/heloc' },
            { label: 'Refinance Calculator', href: '/calculators/refinance' },
            { label: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
            { label: 'BRRRR Calculator', href: '/calculators/brrrr' },
            { label: 'Fix & Flip Profit', href: '/calculators/fix-flip' },
          ].map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Scenario guides */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text">Financing by Scenario</h2>
        <p className="mt-1 text-text-muted">Plain-English playbooks for specific situations.</p>
        <div className="mt-6 flex flex-wrap gap-2">
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
