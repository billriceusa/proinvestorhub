import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { financingScenarios } from '@/data/financing-scenarios'

export const metadata: Metadata = {
  title: 'How to Finance Real Estate: Funding Guides by Scenario',
  description:
    'Plain-English guides to financing every kind of real estate deal — rentals, flips, BRRRR, Airbnb, multifamily, no money down, in an LLC, and self-employed — each with an interactive matcher.',
  alternates: { canonical: '/how-to-finance' },
}

export default function HowToFinanceIndex() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'How to Finance', url: `${baseUrl}/how-to-finance` },
        ])}
      />

      <div className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">How to Finance Real Estate</h1>
        <p className="mt-3 text-lg leading-7 text-text-muted">
          The right financing depends on the deal. Pick your scenario for a plain-English breakdown
          of the options — and an interactive match to your exact situation. Or{' '}
          <Link href="/financing/matcher" className="text-primary underline transition-colors hover:text-primary-light">
            start from the full matcher
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {financingScenarios.map((s) => (
          <Link
            key={s.slug}
            href={`/how-to-finance/${s.slug}`}
            className="rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-text">{s.h1}</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">{s.intro}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              See the options →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
