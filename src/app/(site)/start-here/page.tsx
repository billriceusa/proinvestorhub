import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { LeadMagnetCTA } from '@/components/lead-magnet-cta'
import { JsonLd } from '@/components/json-ld'
import { EDUCATION_CURRICULUM, EDUCATION_PHASES } from '@/data/newsletter-education'
import { StartHereNav } from '@/components/start-here-nav'

export const metadata: Metadata = {
  title: 'Start Here — Your Real Estate Investing Roadmap | ProInvestorHub',
  description:
    'New to real estate investing? Start here. A step-by-step learning path with free calculators, expert guides, and a 24-week education program to go from beginner to confident investor.',
  alternates: { canonical: '/start-here' },
}

const glossaryTerms = [
  { term: 'Cap Rate', slug: 'cap-rate', description: 'Measure a property\'s return without financing' },
  { term: 'NOI', slug: 'net-operating-income', description: 'The income that drives every deal metric' },
  { term: 'Cash-on-Cash Return', slug: 'cash-on-cash-return', description: 'What your actual cash earns annually' },
  { term: 'DSCR', slug: 'dscr-loan', description: 'The ratio lenders use to qualify investment loans' },
  { term: '1031 Exchange', slug: '1031-exchange', description: 'Sell and defer capital gains taxes legally' },
  { term: 'ARV', slug: 'after-repair-value', description: 'What a property is worth after renovation' },
]

const calculators = [
  { name: 'Cap Rate Calculator', href: '/calculators/cap-rate', description: 'Compare properties instantly with the most common investor metric' },
  { name: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash', description: 'See how leverage affects your real returns on invested cash' },
  { name: 'Rental Cash Flow', href: '/calculators/rental-cashflow', description: 'Project monthly cash flow with income, expenses, and debt service' },
  { name: 'BRRRR Calculator', href: '/calculators/brrrr', description: 'Model the full Buy-Rehab-Rent-Refinance-Repeat cycle' },
  { name: 'Mortgage / DSCR', href: '/calculators/mortgage', description: 'Calculate payments and see if your deal qualifies for a DSCR loan' },
  { name: 'Fix & Flip', href: '/calculators/fix-flip', description: 'Estimate profit on a flip including rehab and holding costs' },
]

const strategies = [
  { name: 'Buy & Hold Rentals', description: 'The classic wealth-building strategy. Buy properties, rent them out, build equity over time.', href: '/blog' },
  { name: 'BRRRR Method', description: 'Buy, Rehab, Rent, Refinance, Repeat. Recycle capital to scale faster.', href: '/glossary/brrrr-method' },
  { name: 'House Hacking', description: 'Live in one unit, rent the others. Your tenants pay your mortgage.', href: '/glossary/house-hacking' },
  { name: 'Fix & Flip', description: 'Buy undervalued properties, renovate, sell for profit.', href: '/glossary/fix-and-flip' },
]

const faqs = [
  {
    question: 'How much money do I need to start investing in real estate?',
    answer: 'You can start with as little as 3.5% down using an FHA loan for house hacking. For a $200K property, that\'s about $7,000 plus closing costs. Traditional investment properties typically require 20-25% down.',
    link: { text: 'Learn about House Hacking', href: '/glossary/house-hacking' },
  },
  {
    question: 'What\'s the best strategy for a complete beginner?',
    answer: 'Most experts recommend starting with house hacking (living in one unit of a multi-family property) or buying a single-family rental in a market you know well. Start simple, learn the fundamentals, then scale.',
    link: { text: 'Explore Strategies', href: '/guides' },
  },
  {
    question: 'Should I invest locally or out of state?',
    answer: 'Start local if possible — you\'ll learn faster when you can see properties in person. Once you have systems in place (property manager, contractor, agent), expanding to better-performing markets can make sense.',
    link: { text: 'Compare Markets', href: '/markets' },
  },
  {
    question: 'How do I know if a deal is good?',
    answer: 'Use the 1% rule as a quick screen (monthly rent should be ~1% of purchase price), then dig deeper with cap rate, cash-on-cash return, and a full cash flow analysis. Our free calculators make this easy.',
    link: { text: 'Try Our Calculators', href: '/calculators' },
  },
  {
    question: 'Do I need a real estate license to invest?',
    answer: 'No. You don\'t need a license to buy, own, or sell investment properties. Some investors do get licensed for access to the MLS and to save on commissions, but it\'s not required.',
    link: null,
  },
]

// Group education curriculum by phase for display
const curriculumByPhase = EDUCATION_PHASES.map((phase, i) => ({
  phase: i + 1,
  title: phase,
  topics: EDUCATION_CURRICULUM.filter((t) => t.phase === i + 1),
}))

export default function StartHerePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://proinvestorhub.com' },
            { '@type': 'ListItem', position: 2, name: 'Start Here', item: 'https://proinvestorhub.com/start-here' },
          ],
        }}
      />

      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent tracking-wide uppercase">
              Your Starting Point
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              New to Real Estate Investing? Start Here.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              I&apos;ve spent 20+ years investing in real estate and I&apos;ve built everything I wish I had when I started — free calculators, plain-English guides, and a weekly education program that turns beginners into confident investors. No fluff, no upsells. Let&apos;s get you started.
            </p>
            <p className="mt-2 text-sm text-white/60">— Bill Rice, Founder of ProInvestorHub</p>
          </div>
        </div>
      </section>

      <StartHereNav />

      {/* Step 1: Learn the Language */}
      <section id="learn-the-language" className="py-20 bg-white scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">Learn the Language</h2>
              <p className="mt-2 text-text-muted max-w-2xl">
                Before you analyze your first deal, get comfortable with these essential terms. Each one is explained clearly with examples — no finance degree required.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {glossaryTerms.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="group rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-primary group-hover:text-primary-light transition-colors">
                  {term.term}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{term.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/glossary" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
              Browse all 98+ glossary terms &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Step 2: Understand the Numbers */}
      <section id="understand-the-numbers" className="py-20 bg-surface scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">Understand the Numbers</h2>
              <p className="mt-2 text-text-muted max-w-2xl">
                Real estate investing is a numbers game. Use these free calculators to practice analyzing deals — start with cap rate, it&apos;s the foundation of everything.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group rounded-xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.25-4.5h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm2.25-4.5h.008v.008H12.75v-.008Zm0 2.25h.008v.008H12.75v-.008Zm2.25-4.5h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008ZM5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21Z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-text group-hover:text-primary transition-colors">
                  {calc.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: Learn the Strategies */}
      <section id="learn-the-strategies" className="py-20 bg-white scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">Learn the Strategies</h2>
              <p className="mt-2 text-text-muted max-w-2xl">
                Pick one strategy to focus on first. Most beginners start with buy-and-hold rentals or house hacking. Master one before branching out.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {strategies.map((strategy) => (
              <Link
                key={strategy.name}
                href={strategy.href}
                className="group rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  {strategy.name}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-6">{strategy.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-primary">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <LeadMagnetCTA variant="card" />
        </div>
      </section>

      {/* Step 4: Study Real Markets */}
      <section id="study-real-markets" className="py-20 bg-surface scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-text sm:text-3xl">Study Real Markets</h2>
              <p className="mt-2 text-text-muted max-w-2xl">
                See which cities score highest for your chosen strategy. We track cap rates, rent-to-price ratios, population growth, and more across 50+ markets.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/markets"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Explore All Markets
            </Link>
            <Link
              href="/guides/best-cities"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text hover:border-primary/30 hover:text-primary transition-colors"
            >
              Best Cities by Strategy
            </Link>
            <Link
              href="/resources/cap-rate-report"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text hover:border-primary/30 hover:text-primary transition-colors"
            >
              50-City Cap Rate Report
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Education — 24-Week Curriculum */}
      <section id="24-week-curriculum" className="py-20 bg-primary-dark scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-medium text-accent tracking-wide uppercase">Free 24-Week Program</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              RE Investing 101 — Delivered to Your Inbox
            </h2>
            <p className="mt-4 text-white/70">
              Subscribe to our weekly newsletter and get a structured education in real estate investing. Each week covers one concept with clear explanations, worked examples, and a practice prompt. By week 24, you&apos;ll have the knowledge to analyze deals with confidence.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumByPhase.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary-dark text-sm font-bold">
                    {phase.phase}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                </div>
                <p className="text-xs text-white/50 mb-3">Weeks {phase.topics[0].week}-{phase.topics[phase.topics.length - 1].week}</p>
                <ul className="space-y-2">
                  {phase.topics.map((topic) => (
                    <li key={topic.week} className="flex items-start gap-2">
                      <span className="text-accent text-xs mt-1 shrink-0">Wk {topic.week}</span>
                      <span className="text-sm text-white/80">{topic.topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-xl mx-auto">
            <NewsletterSignup
              variant="card"
              heading="Start Your Free Education"
              description="Join thousands of investors getting smarter every Tuesday. News, education, and actionable tips — no spam, unsubscribe anytime."
            />
          </div>
        </div>
      </section>

      {/* Quick Win Resources */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text text-center sm:text-3xl">
            Quick Wins to Get Started Today
          </h2>
          <p className="mt-4 text-center text-text-muted max-w-xl mx-auto">
            Download these free resources and start analyzing deals this weekend.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/resources/deal-analysis-checklist"
              className="group rounded-xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">Deal Analysis Checklist</h3>
              <p className="mt-2 text-sm text-text-muted">Step-by-step checklist for evaluating any rental property deal</p>
            </Link>

            <Link
              href="/resources/cap-rate-report"
              className="group rounded-xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">50-City Cap Rate Report</h3>
              <p className="mt-2 text-sm text-text-muted">Compare cap rates, rent-to-price ratios, and growth metrics across 50 markets</p>
            </Link>

            <Link
              href="/blog"
              className="group rounded-xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">Expert Blog</h3>
              <p className="mt-2 text-sm text-text-muted">Deep-dive guides on strategies, deal analysis, financing, and market trends</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-surface scroll-mt-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text text-center sm:text-3xl">
            Common Beginner Questions
          </h2>
          <p className="mt-4 text-center text-text-muted">
            Answers to what every new investor wants to know.
          </p>

          <div className="mt-12 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-base font-semibold text-text">{faq.question}</h3>
                <p className="mt-3 text-sm text-text-muted leading-6">{faq.answer}</p>
                {faq.link && (
                  <Link
                    href={faq.link.href}
                    className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary-light transition-colors"
                  >
                    {faq.link.text} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Start Your Investing Journey?
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Join our free weekly newsletter for market news, education, and deal analysis tips. Or dive straight into the tools.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/calculators"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-light transition-colors"
            >
              Try the Calculators
            </Link>
            <Link
              href="/glossary"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse the Glossary
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
