import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import {
  NEWSLETTER_ISSUE_BY_SLUG_QUERY,
  NEWSLETTER_ISSUE_SLUGS_QUERY,
  NEWSLETTER_ISSUE_NEIGHBORS_QUERY,
} from '@/sanity/lib/queries'
import type { NewsletterContent } from '@/lib/cron/newsletter-ai'
import { markdownToHtml } from '@/lib/markdown'
import { NewsletterSignup } from '@/components/newsletter-signup'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

type IssueDetail = {
  _id: string
  issueNumber: number | null
  subject: string | null
  slug: string | null
  publishedAt: string | null
  previewText: string | null
  excerpt: string | null
  contentJson: string | null
  seo: { metaTitle: string | null; metaDescription: string | null } | null
}

type Neighbor = { slug: string; subject: string } | null

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: NEWSLETTER_ISSUE_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })
  return ((data as { slug: string }[]) || []).map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: issue } = await sanityFetch({
    query: NEWSLETTER_ISSUE_BY_SLUG_QUERY,
    params: { slug },
  })
  const i = issue as IssueDetail | null
  if (!i) return {}

  const title = i.seo?.metaTitle || i.subject || 'Newsletter'
  const description = i.seo?.metaDescription || i.previewText || i.excerpt || ''

  return {
    title,
    description,
    alternates: { canonical: `/newsletter/${slug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/newsletter/${slug}`,
      type: 'article',
    },
  }
}

function Prose({ html, className = '' }: { html: string; className?: string }) {
  return (
    <div
      className={`prose-newsletter ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: issueData } = await sanityFetch({
    query: NEWSLETTER_ISSUE_BY_SLUG_QUERY,
    params: { slug },
  })

  const issue = issueData as IssueDetail | null
  if (!issue || !issue.contentJson) notFound()

  const { data: neighbors } = await sanityFetch({
    query: NEWSLETTER_ISSUE_NEIGHBORS_QUERY,
    params: { publishedAt: issue.publishedAt || '' },
  })
  const { prev, next } = (neighbors as { prev: Neighbor; next: Neighbor }) || {
    prev: null,
    next: null,
  }

  let content: NewsletterContent
  try {
    content = JSON.parse(issue.contentJson) as NewsletterContent
  } catch {
    notFound()
  }

  const publishDate = issue.publishedAt
    ? new Date(issue.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const mainLabel =
    content.mainSection.type === 'trends' ? 'Market Update' : 'Investor Education'
  const secondaryLabel =
    content.secondarySection.type === 'trends' ? 'Market Note' : 'Quick Lesson'

  return (
    <>
      {/* Scoped prose styles for rendered markdown */}
      <style>{`
        .prose-newsletter p { margin-bottom: 1rem; line-height: 1.75; color: var(--color-text, #374151); }
        .prose-newsletter strong { color: var(--color-text, #111827); font-weight: 600; }
        .prose-newsletter em { font-style: italic; }
        .prose-newsletter a { color: var(--color-primary, #1B4D3E); text-decoration: underline; }
        .prose-newsletter a:hover { opacity: 0.8; }
        .prose-newsletter ul, .prose-newsletter ol { margin-bottom: 1rem; padding-left: 1.5rem; }
        .prose-newsletter ul { list-style-type: disc; }
        .prose-newsletter ol { list-style-type: decimal; }
        .prose-newsletter li { margin-bottom: 0.375rem; line-height: 1.65; }
        .prose-newsletter h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem; margin-top: 1.5rem; color: var(--color-text, #111827); }
        .prose-newsletter h4 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; margin-top: 1rem; color: var(--color-text, #111827); }
        .prose-newsletter p:last-child, .prose-newsletter ul:last-child, .prose-newsletter ol:last-child { margin-bottom: 0; }
      `}</style>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/newsletter" className="hover:text-primary">Newsletter</Link>
          <span className="mx-2">/</span>
          <span className="text-text">
            {issue.issueNumber ? `#${issue.issueNumber}` : slug}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3 text-sm text-text-muted">
            {issue.issueNumber && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Issue #{issue.issueNumber}
              </span>
            )}
            {publishDate && <time dateTime={issue.publishedAt!}>{publishDate}</time>}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {issue.subject}
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            By Bill Rice &middot; Weekly investing insights
          </p>
        </header>

        {/* Personal Intro */}
        <div className="mb-10">
          <Prose html={markdownToHtml(content.personalIntro)} />
        </div>

        {/* Main Section */}
        <section className="mb-10">
          <p className={`mb-2 text-xs font-bold uppercase tracking-widest ${
            content.mainSection.type === 'trends' ? 'text-amber-700' : 'text-primary'
          }`}>
            {mainLabel}
          </p>
          <h2 className="mb-5 text-2xl font-bold text-text">
            {content.mainSection.title}
          </h2>
          <Prose html={markdownToHtml(content.mainSection.body)} />
        </section>

        <hr className="mb-10 border-border" />

        {/* Secondary Section */}
        <section className="mb-10">
          <div className={`rounded-lg border-l-4 py-1 pl-5 ${
            content.secondarySection.type === 'trends'
              ? 'border-l-amber-400'
              : 'border-l-primary'
          }`}>
            <p className={`mb-1 text-xs font-bold uppercase tracking-widest ${
              content.secondarySection.type === 'trends' ? 'text-amber-700' : 'text-primary'
            }`}>
              {secondaryLabel}
            </p>
            <h3 className="mb-3 text-lg font-bold text-text">
              {content.secondarySection.title}
            </h3>
            <Prose html={markdownToHtml(content.secondarySection.body)} className="text-[15px]" />
          </div>
        </section>

        {/* Featured Partner */}
        <section className="mb-10">
          <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-text-muted">
              Lending Partner Spotlight
            </p>
            <h3 className="mb-3 text-lg font-bold">
              <Link
                href={`/lenders/reviews/${content.featuredPartner.lenderSlug}`}
                className="text-primary hover:underline"
              >
                {content.featuredPartner.lenderName}
              </Link>
            </h3>
            <Prose html={markdownToHtml(content.featuredPartner.body)} className="text-sm" />
            <div className="mt-4">
              <Link
                href={`/lenders/reviews/${content.featuredPartner.lenderSlug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                Read Full Review
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Highlights */}
        {content.blogHighlights.length > 0 && (
          <section className="mb-10">
            <h3 className="mb-3 text-lg font-bold text-text">Worth Reading This Week</h3>
            <div className="space-y-3">
              {content.blogHighlights.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-lg border border-border bg-white p-4 transition-colors hover:border-primary/30"
                >
                  <p className="font-semibold text-primary">{post.title}</p>
                  <p className="mt-1 text-sm text-text-muted">{post.oneLiner}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Closing */}
        <div className="mb-8 border-t border-border pt-6">
          <Prose html={markdownToHtml(content.closingNote)} />
          <p className="mt-2 font-semibold text-text">&mdash; Bill Rice</p>
        </div>

        {/* CTA */}
        <div className="mb-10 rounded-xl bg-primary p-6 text-center sm:p-8">
          <p className="mb-3 text-white/90">Run the numbers on your next deal</p>
          <Link
            href={content.ctaUrl}
            className="inline-block rounded-lg bg-accent px-8 py-3 font-bold text-primary-dark transition-colors hover:bg-accent-light"
          >
            {content.ctaText}
          </Link>
        </div>

        {/* Prev/Next Navigation */}
        <nav className="mb-10 flex items-stretch gap-4">
          {prev ? (
            <Link
              href={`/newsletter/${prev.slug}`}
              className="flex-1 rounded-lg border border-border p-4 transition-colors hover:border-primary/30"
            >
              <p className="text-xs text-text-muted">&larr; Previous</p>
              <p className="mt-1 text-sm font-medium text-text line-clamp-1">{prev.subject}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/newsletter/${next.slug}`}
              className="flex-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-primary/30"
            >
              <p className="text-xs text-text-muted">Next &rarr;</p>
              <p className="mt-1 text-sm font-medium text-text line-clamp-1">{next.subject}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        {/* Subscribe */}
        <NewsletterSignup
          variant="card"
          heading="Like what you read?"
          description="Get these insights every Tuesday — free, no spam."
          source="newsletter-issue"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: issue.subject,
              datePublished: issue.publishedAt,
              author: {
                '@type': 'Person',
                name: 'Bill Rice',
                url: `${baseUrl}/about`,
              },
              publisher: {
                '@type': 'Organization',
                name: 'ProInvestorHub',
                url: baseUrl,
              },
              url: `${baseUrl}/newsletter/${slug}`,
            }),
          }}
        />
      </article>
    </>
  )
}
