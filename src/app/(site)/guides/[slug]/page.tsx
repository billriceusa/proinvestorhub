import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { GUIDE_BY_SLUG_QUERY, GUIDE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { LeadMagnetCTA } from '@/components/lead-magnet-cta'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { extractTocItems } from '@/lib/toc-utils'
import { TableOfContents } from '@/components/table-of-contents'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

const difficultyLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: 'bg-emerald-100 text-emerald-700' },
  intermediate: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700' },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-700' },
}

const typeLabels: Record<string, string> = {
  strategy: 'Strategy Guide',
  comparison: 'Comparison',
  'how-to': 'How-To Guide',
  market: 'Market Analysis',
}

type GuideDetail = {
  _id: string
  title: string | null
  slug: string | null
  author: { name: string; slug: string; image?: unknown } | null
  publishedAt: string | null
  excerpt: string | null
  difficulty: string | null
  guideType: string | null
  keyTakeaways: string[] | null
  body: unknown[]
  sources: { title: string; url: string; publisher: string; dateAccessed: string }[] | null
  categories: { _id: string; title: string; slug: string }[] | null
  seo: { metaTitle: string | null; metaDescription: string | null } | null
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: GUIDE_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })
  return ((data as { slug: string }[]) || []).map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: GUIDE_BY_SLUG_QUERY,
    params: { slug },
  })
  const guide = data as GuideDetail | null
  if (!guide) return {}

  const title = guide.seo?.metaTitle || guide.title || 'Guide'
  const description = guide.seo?.metaDescription || guide.excerpt || ''

  return {
    title,
    description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { title, description, url: `${baseUrl}/guides/${slug}`, type: 'article' },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: GUIDE_BY_SLUG_QUERY,
    params: { slug },
  })

  const guide = data as GuideDetail | null
  if (!guide || !guide.body) notFound()

  const tocItems = extractTocItems(guide.body as Array<{ _type: string; style?: string; children?: Array<{ text?: string }> }>)
  const difficulty = guide.difficulty ? difficultyLabels[guide.difficulty] : null
  const guideType = guide.guideType ? typeLabels[guide.guideType] : null

  const publishDate = guide.publishedAt
    ? new Date(guide.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <JsonLd
        data={articleJsonLd({
          title: guide.title || '',
          description: guide.excerpt || '',
          url: `${baseUrl}/guides/${guide.slug}`,
          publishedAt: guide.publishedAt || '',
          authorName: guide.author?.name || 'Bill Rice',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Guides', url: `${baseUrl}/guides` },
          { name: guide.title || '', url: `${baseUrl}/guides/${guide.slug}` },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-primary transition-colors">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-text">{guide.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {guideType && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {guideType}
            </span>
          )}
          {difficulty && (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${difficulty.color}`}>
              {difficulty.label}
            </span>
          )}
          {publishDate && (
            <time dateTime={guide.publishedAt!} className="text-xs text-text-muted">
              {publishDate}
            </time>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {guide.title}
        </h1>
        {guide.excerpt && (
          <p className="mt-3 text-lg text-text-muted leading-relaxed">{guide.excerpt}</p>
        )}
      </header>

      {/* Key Takeaways */}
      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
            What You&apos;ll Learn
          </h2>
          <ul className="space-y-2">
            {guide.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Table of Contents */}
      {tocItems.length >= 3 && (
        <div className="mb-8">
          <TableOfContents items={tocItems} />
        </div>
      )}

      {/* Body */}
      <div className="prose-custom max-w-none">
        <PortableText value={guide.body} enableGlossaryLinks />
      </div>

      {/* Sources */}
      {guide.sources && guide.sources.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-bold text-text mb-4">Sources & References</h2>
          <ol className="space-y-2 text-sm text-text-muted">
            {guide.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-text-light shrink-0">{i + 1}.</span>
                <div>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {source.title}
                    </a>
                  ) : (
                    <span>{source.title}</span>
                  )}
                  {source.publisher && <span className="text-text-light"> — {source.publisher}</span>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Lead Magnet */}
      <div className="mt-12">
        <LeadMagnetCTA variant="card" />
      </div>

      {/* Newsletter */}
      <div className="mt-8">
        <NewsletterSignup variant="card" source="guide" />
      </div>
    </article>
  )
}
