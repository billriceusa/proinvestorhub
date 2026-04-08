import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { GUIDES_QUERY } from '@/sanity/lib/queries'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'

export const metadata: Metadata = {
  title: 'Investing Guides — Strategy Deep Dives',
  description:
    'Comprehensive guides on real estate investing strategies, comparisons, and market analysis. BRRRR, cash flow, house hacking, and more.',
  alternates: { canonical: '/guides' },
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

type GuideSummary = {
  _id: string
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
  difficulty: string | null
  guideType: string | null
  keyTakeaways: string[] | null
}

const difficultyLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: 'bg-emerald-100 text-emerald-700' },
  intermediate: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700' },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-700' },
}

const typeLabels: Record<string, string> = {
  strategy: 'Strategy Guide',
  comparison: 'Comparison',
  'how-to': 'How-To',
  market: 'Market Analysis',
}

export default async function GuidesPage() {
  let guides: GuideSummary[] = []

  try {
    const { data } = await sanityFetch({ query: GUIDES_QUERY })
    guides = (data as GuideSummary[]) || []
  } catch (err) {
    console.error('Failed to fetch guides:', err)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Guides', url: `${baseUrl}/guides` },
        ])}
      />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-text">Guides</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Investing Guides
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          Deep-dive guides on strategies, comparisons, and market analysis. Each one is designed to help you make smarter investing decisions.
        </p>
      </div>

      {/* Strategy Market Links */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-text mb-4">Best Markets by Strategy</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Cash Flow', href: '/markets/cash-flow' },
            { name: 'BRRRR', href: '/markets/brrrr' },
            { name: 'House Hacking', href: '/markets/house-hacking' },
            { name: 'Appreciation', href: '/markets/appreciation' },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-text hover:border-primary/30 hover:text-primary transition-all"
            >
              {s.name} Markets &rarr;
            </Link>
          ))}
        </div>
      </section>

      {/* Guides Grid */}
      {guides.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const diff = guide.difficulty ? difficultyLabels[guide.difficulty] : null
            const type = guide.guideType ? typeLabels[guide.guideType] : null

            return (
              <Link
                key={guide._id}
                href={`/guides/${guide.slug}`}
                className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {type && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {type}
                    </span>
                  )}
                  {diff && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${diff.color}`}>
                      {diff.label}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                {guide.excerpt && (
                  <p className="mt-2 text-sm text-text-muted line-clamp-3">{guide.excerpt}</p>
                )}
                {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
                  <p className="mt-3 text-xs text-text-light">
                    {guide.keyTakeaways.length} key takeaways
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white p-8 text-center">
          <p className="text-text-muted">
            Guides are being written. Subscribe to get notified when they launch.
          </p>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-12 max-w-xl mx-auto">
        <NewsletterSignup variant="card" source="guides" />
      </div>
    </div>
  )
}
