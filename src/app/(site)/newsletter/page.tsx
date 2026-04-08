import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { NEWSLETTER_ISSUES_QUERY, NEWSLETTER_ISSUES_COUNT_QUERY } from '@/sanity/lib/queries'
import { Pagination } from '@/components/pagination'
import { NewsletterSignup } from '@/components/newsletter-signup'

const ISSUES_PER_PAGE = 12

export const metadata: Metadata = {
  title: 'Newsletter Archive',
  description:
    'Weekly real estate investing insights from Bill Rice. Market trends, deal analysis, education, and lending partner spotlights — delivered every Tuesday.',
  alternates: { canonical: '/newsletter' },
}

type IssueSummary = {
  _id: string
  issueNumber: number | null
  subject: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
}

export default async function NewsletterArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1)

  let issues: IssueSummary[] = []
  let totalCount = 0

  try {
    const offset = (currentPage - 1) * ISSUES_PER_PAGE
    const [issuesResult, countResult] = await Promise.all([
      sanityFetch({
        query: NEWSLETTER_ISSUES_QUERY,
        params: { offset, limit: ISSUES_PER_PAGE },
      }),
      sanityFetch({ query: NEWSLETTER_ISSUES_COUNT_QUERY }),
    ])
    issues = (issuesResult.data as IssueSummary[]) || []
    totalCount = (countResult.data as number) || 0
  } catch (err) {
    console.error('Failed to fetch newsletter issues:', err)
  }

  const totalPages = Math.ceil(totalCount / ISSUES_PER_PAGE)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <nav className="mb-4 text-sm text-text-muted">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text">Newsletter</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Newsletter Archive
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          Weekly investing insights — market trends, deal analysis, and what I&apos;m learning about real estate investing.
        </p>
      </div>

      {/* Subscribe CTA */}
      <div className="mb-10">
        <NewsletterSignup
          variant="banner"
          heading="Get these insights in your inbox"
          description="Every Tuesday — trends, education, and a featured lending partner. Free, no spam."
          source="newsletter-archive"
        />
      </div>

      {/* Issue List */}
      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <Link
              key={issue._id}
              href={`/newsletter/${issue.slug}`}
              className="block rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-3 text-sm text-text-muted">
                    {issue.issueNumber && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        #{issue.issueNumber}
                      </span>
                    )}
                    {issue.publishedAt && (
                      <time dateTime={issue.publishedAt}>
                        {new Date(issue.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-text">{issue.subject}</h2>
                  {issue.excerpt && (
                    <p className="mt-1 text-sm text-text-muted line-clamp-2">
                      {issue.excerpt}
                    </p>
                  )}
                </div>
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-text-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white p-8 text-center">
          <p className="text-text-muted">
            No newsletters yet — the first issue is on its way. Subscribe above to get it when it drops.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/newsletter"
          />
        </div>
      )}
    </div>
  )
}
