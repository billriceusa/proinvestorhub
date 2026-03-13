import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import {
  GLOSSARY_TERM_BY_SLUG_QUERY,
  GLOSSARY_SLUGS_QUERY,
} from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'
import type { GlossaryTermDetail } from '@/sanity/lib/types'
import { JsonLd, glossaryJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'

type Props = {
  params: Promise<{ term: string }>
}

const categoryLabels: Record<string, string> = {
  financing: 'Financing & Loans',
  analysis: 'Deal Analysis & Metrics',
  legal: 'Legal',
  'property-types': 'Property Types',
  strategies: 'Investment Strategies',
  tax: 'Tax & Legal',
  general: 'Real Estate Fundamentals',
}

const categoryDescriptions: Record<string, string> = {
  financing:
    'Understanding financing options is critical for real estate investors. The right loan product can dramatically affect your returns, cash flow, and ability to scale.',
  analysis:
    'Deal analysis metrics help investors evaluate and compare investment properties objectively. Mastering these numbers is what separates successful investors from those who overpay.',
  strategies:
    'Different investment strategies suit different goals, timelines, and risk tolerances. Understanding each approach helps you choose the path that aligns with your financial objectives.',
  tax:
    'Tax strategies are one of the most powerful advantages of real estate investing. Proper structuring can save tens of thousands of dollars annually.',
  general:
    'These foundational concepts form the building blocks of real estate investing knowledge. Understanding them thoroughly is essential before analyzing your first deal.',
}

const relatedCalculators: Record<string, Array<{ title: string; href: string; description: string }>> = {
  analysis: [
    { title: 'Cap Rate Calculator', href: '/calculators/cap-rate', description: 'Compare unlevered returns across properties' },
    { title: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash', description: 'Measure return on your actual invested cash' },
    { title: 'Rental Cash Flow', href: '/calculators/rental-cashflow', description: 'Project monthly and annual cash flow' },
  ],
  financing: [
    { title: 'Mortgage & DSCR Calculator', href: '/calculators/mortgage', description: 'Calculate payments and DSCR qualification' },
    { title: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash', description: 'See how financing affects your returns' },
  ],
  strategies: [
    { title: 'BRRRR Calculator', href: '/calculators/brrrr', description: 'Analyze Buy, Rehab, Rent, Refinance deals' },
    { title: 'Fix & Flip Calculator', href: '/calculators/fix-flip', description: 'Estimate rehab profit and ROI' },
    { title: 'Rental Cash Flow', href: '/calculators/rental-cashflow', description: 'Project cash flow for buy-and-hold' },
  ],
  tax: [
    { title: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash', description: 'Factor tax benefits into return analysis' },
    { title: 'BRRRR Calculator', href: '/calculators/brrrr', description: 'Model deals that defer gains through refinancing' },
  ],
  general: [
    { title: 'Cap Rate Calculator', href: '/calculators/cap-rate', description: 'Apply fundamental metrics to real deals' },
    { title: 'Rental Cash Flow', href: '/calculators/rental-cashflow', description: 'Build a complete property cash flow model' },
  ],
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: GLOSSARY_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Array<{ slug: string }>) || []).map((t) => ({
      term: t.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: slug } = await params
  const { data } = await sanityFetch({
    query: GLOSSARY_TERM_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  const term = data as GlossaryTermDetail | null
  if (!term) return {}

  const category = term.category ? categoryLabels[term.category] || '' : ''
  const titleSuffix = category ? ` | ${category}` : ''

  return {
    title: `${term.term} — Definition & Guide for Real Estate Investors${titleSuffix}`,
    description: `${term.definition} Learn how ${term.term?.toLowerCase()} works in real estate investing with examples, related metrics, and free calculators.`,
    openGraph: {
      title: `${term.term} — Real Estate Investing Glossary | ProInvestorHub`,
      description: term.definition || '',
    },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params
  const { data } = await sanityFetch({
    query: GLOSSARY_TERM_BY_SLUG_QUERY,
    params: { slug },
  })
  const term = data as GlossaryTermDetail | null

  if (!term) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const category = term.category || 'general'
  const categoryLabel = categoryLabels[category] || 'Real Estate'
  const categoryDescription = categoryDescriptions[category] || ''
  const calculators = relatedCalculators[category] || relatedCalculators.general

  const hasBody = term.body && Array.isArray(term.body) && term.body.length > 0

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={glossaryJsonLd({
          term: term.term || '',
          definition: term.definition || '',
          url: `${baseUrl}/glossary/${term.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Glossary', url: `${baseUrl}/glossary` },
          { name: term.term || '', url: `${baseUrl}/glossary/${term.slug}` },
        ])}
      />
      <JsonLd
        data={faqJsonLd([
          {
            question: `What is ${term.term} in real estate investing?`,
            answer: term.definition || '',
          },
        ])}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/glossary" className="hover:text-primary transition-colors">
          Glossary
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{term.term}</span>
      </nav>

      {/* Category badge */}
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        {categoryLabel}
      </span>

      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        {term.term}
      </h1>

      {/* Definition card */}
      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-lg text-text leading-7">{term.definition}</p>
      </div>

      {/* CMS body content if available */}
      {hasBody && (
        <div className="mt-10">
          <PortableText value={term.body} />
        </div>
      )}

      {/* Programmatic content when no CMS body exists */}
      {!hasBody && (
        <div className="mt-10 space-y-10">
          {/* Why it matters */}
          <section>
            <h2 className="text-2xl font-bold text-text">
              Why {term.term} Matters for Investors
            </h2>
            <div className="mt-4 text-text-muted leading-7 space-y-4">
              <p>
                {categoryDescription}
              </p>
              <p>
                Understanding <strong className="text-text">{term.term?.toLowerCase()}</strong> is
                an essential part of building real estate investment expertise. Whether
                you&apos;re analyzing your first deal or managing a multi-property
                portfolio, this concept directly impacts your ability to make informed
                decisions and maximize returns.
              </p>
            </div>
          </section>

          {/* Key takeaways */}
          <section>
            <h2 className="text-2xl font-bold text-text">Key Takeaways</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3 text-text-muted leading-7">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
                <span>
                  <strong className="text-text">{term.term}</strong> is a{' '}
                  {category === 'financing' ? 'financing concept' :
                   category === 'analysis' ? 'deal analysis metric' :
                   category === 'strategies' ? 'real estate investment strategy' :
                   category === 'tax' ? 'tax and legal concept' :
                   'foundational real estate concept'} that every investor should understand before making investment decisions.
                </span>
              </li>
              <li className="flex gap-3 text-text-muted leading-7">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
                <span>
                  {term.definition}
                </span>
              </li>
              <li className="flex gap-3 text-text-muted leading-7">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
                <span>
                  Use our free calculators below to apply this concept to real deal analysis
                  and make data-driven investment decisions.
                </span>
              </li>
            </ul>
          </section>
        </div>
      )}

      {/* Related calculators */}
      {calculators.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-text mb-4">
            Apply This Concept
          </h2>
          <div className="grid gap-3">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group flex items-center justify-between rounded-lg border border-border bg-white p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {calc.description}
                  </p>
                </div>
                <span className="shrink-0 ml-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related terms */}
      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Terms</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {term.relatedTerms.map((related) => (
              <Link
                key={related._id}
                href={`/glossary/${related.slug}`}
                className="rounded-lg border border-border bg-white p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-text">{related.term}</h3>
                <p className="mt-1 text-sm text-text-muted line-clamp-2">
                  {related.definition}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <div className="mt-12">
        <NewsletterSignup
          variant="card"
          heading="Master Real Estate Investing"
          description={`Get weekly deep-dives on concepts like ${term.term?.toLowerCase()}, deal analysis frameworks, and investment strategies. Free, no spam.`}
        />
      </div>

      <div className="mt-8">
        <Link
          href="/glossary"
          className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
        >
          &larr; Back to Glossary
        </Link>
      </div>
    </div>
  )
}
