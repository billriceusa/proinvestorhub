import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { JsonLd } from '@/components/json-ld'
import { personJsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'About ProInvestorHub — Bill Rice | 30+ Years in Lending & Investing',
  description:
    'ProInvestorHub was built by Bill Rice, a mortgage lending veteran with 30+ years of experience. Learn why he created this free resource for real estate investors.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent tracking-wide uppercase">
              About ProInvestorHub
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built by a Lending Veteran Who Loves Real Estate Investing
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              I&apos;m{' '}
              <a href="https://billrice.com/about" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-accent transition-colors">Bill Rice</a>.
              I&apos;ve spent 30+ years in the mortgage lending industry, and I built ProInvestorHub as a way to document what I&apos;m learning about real estate investing — and share it with everyone.
            </p>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">My Story</h2>
          <div className="mt-6 space-y-5 text-text-muted leading-7">
            <p>
              After three decades in mortgage lending, I&apos;ve seen every side of real estate finance. I&apos;ve helped thousands of borrowers get loans, watched markets boom and crash, and learned firsthand how money moves through the real estate ecosystem. That experience gave me a deep understanding of how deals actually get financed — the numbers behind the numbers.
            </p>
            <p>
              A few years ago, I started investing in real estate myself. And I quickly realized something: there&apos;s a massive gap between the information available online and what you actually need to make smart investment decisions. Most content is either too superficial to be useful or too salesy to be trusted.
            </p>
            <p>
              ProInvestorHub is my answer to that problem. It&apos;s a passion project where I combine my lending expertise with what I&apos;m learning as an investor — and document everything along the way. Every calculator, every guide, every glossary term comes from wanting to build the resource I wish existed when I started investing.
            </p>
          </div>
        </div>
      </section>

      {/* Why I Built This */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">Why I Built ProInvestorHub</h2>
          <div className="mt-6 space-y-5 text-text-muted leading-7">
            <p>
              In lending, I learned that the best borrowers are the ones who understand the numbers. They know their cap rates, they know their debt service coverage ratios, and they know how to stress-test a deal before they put money down. I wanted to give every investor access to that same level of financial literacy.
            </p>
            <p>
              So I built free tools — calculators for cap rate, cash-on-cash return, BRRRR analysis, mortgage payments, and more. I wrote plain-English explanations of every investing term I could think of. And I started publishing guides that go deeper than the surface-level advice you find everywhere else.
            </p>
            <p>
              This isn&apos;t a company trying to sell you a course or a subscription. It&apos;s one person with decades of lending experience who wants to help investors make smarter decisions. If I can help you avoid one bad deal or find one good one, this whole project is worth it.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">Background &amp; Credentials</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">30+ Years in Mortgage Lending</h3>
              <p className="mt-2 text-sm text-text-muted">
                Three decades of experience in mortgage origination, underwriting, and financial services — seeing deals from the lender&apos;s perspective.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">AFOSI Special Agent</h3>
              <p className="mt-2 text-sm text-text-muted">
                Former Special Agent with the U.S. Air Force Office of Special Investigations (AFOSI). Air Force Academy graduate (B.S., 1992).
              </p>
            </div>
            <div className="rounded-xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">BRSG Founder</h3>
              <p className="mt-2 text-sm text-text-muted">
                Founder of Bill Rice Strategy Group (BRSG), bringing strategic thinking to real estate investing education and content.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">Active Investor &amp; Learner</h3>
              <p className="mt-2 text-sm text-text-muted">
                Currently investing in real estate and documenting the journey — every lesson, every deal framework, every tool review is informed by real experience.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6">
              <a
                href="https://linkedin.com/in/billrice"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-text group-hover:text-primary transition-colors">Connect on LinkedIn</h3>
                <p className="mt-2 text-sm text-text-muted">
                  Follow my real estate investing journey and connect professionally.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Find */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">What You&apos;ll Find Here</h2>
          <div className="mt-8 space-y-4">
            {[
              { title: 'Free Investment Calculators', description: 'Cap rate, cash-on-cash, BRRRR, mortgage/DSCR, and more — run the numbers on any deal.', href: '/calculators' },
              { title: 'Expert Guides & Blog', description: 'Deep-dive articles on strategies, financing, deal analysis, and market trends.', href: '/blog' },
              { title: 'Investor Glossary', description: '150+ terms explained in plain English with practical examples.', href: '/glossary' },
              { title: 'Market Analysis', description: 'Cap rates, rent-to-price ratios, and growth metrics across 50+ cities.', href: '/markets' },
              { title: 'Weekly Newsletter', description: 'Market news, a progressive RE education curriculum, and actionable tips every Tuesday.', href: '/start-here' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  &rarr;
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <NewsletterSignup
            variant="banner"
            heading="Join the Weekly Newsletter"
            description="Market news, education, and deal analysis tips from the publisher of The Lead Brief who's been in lending for 30+ years. Free, no spam."
          />
        </div>
      </section>
    </>
  )
}
