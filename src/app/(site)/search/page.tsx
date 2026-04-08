import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search ProInvestorHub for articles, glossary terms, lenders, and more.',
  alternates: { canonical: '/search' },
  robots: { index: false },
}

type SearchResult = {
  _id: string
  _type: string
  title: string
  slug: string
  excerpt?: string
}

async function search(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return []

  const pattern = `*${query}*`

  const results = await client.fetch<SearchResult[]>(
    `*[
      (
        (_type == "post" && defined(slug.current) && publishedAt <= now()) ||
        _type == "glossaryTerm" ||
        _type == "newsletterIssue"
      ) && (
        title match $pattern ||
        subject match $pattern ||
        term match $pattern ||
        excerpt match $pattern ||
        definition match $pattern
      )
    ] | order(_type asc, publishedAt desc) [0...50] {
      _id,
      _type,
      "title": coalesce(title, subject, term),
      "slug": slug.current,
      "excerpt": coalesce(excerpt, definition, previewText)
    }`,
    { pattern }
  )

  return results
}

const typeLabels: Record<string, string> = {
  post: 'Article',
  glossaryTerm: 'Glossary',
  newsletterIssue: 'Newsletter',
}

const typeColors: Record<string, string> = {
  post: 'bg-primary/10 text-primary',
  glossaryTerm: 'bg-accent/10 text-amber-700',
  newsletterIssue: 'bg-blue-50 text-blue-700',
}

function resultHref(result: SearchResult): string {
  switch (result._type) {
    case 'post':
      return `/blog/${result.slug}`
    case 'glossaryTerm':
      return `/glossary/${result.slug}`
    case 'newsletterIssue':
      return `/newsletter/${result.slug}`
    default:
      return '#'
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || ''
  const results = await search(query)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-text">Search</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
        Search
      </h1>

      <form action="/search" method="get" className="mt-6">
        <div className="flex gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search articles, glossary, newsletters..."
            className="flex-1 rounded-lg border border-border bg-white px-4 py-3 text-text placeholder:text-text-light focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <p className="mt-4 text-sm text-text-muted">
          {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((result) => (
            <Link
              key={result._id}
              href={resultHref(result)}
              className="block rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeColors[result._type] || 'bg-surface text-text-muted'}`}>
                  {typeLabels[result._type] || result._type}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-text">{result.title}</p>
                  {result.excerpt && (
                    <p className="mt-1 text-sm text-text-muted line-clamp-2">
                      {result.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="mt-8 rounded-xl border border-border bg-white p-8 text-center">
          <p className="text-text-muted">
            No results found. Try a different search term or browse:
          </p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">Blog</Link>
            <Link href="/glossary" className="text-sm font-medium text-primary hover:underline">Glossary</Link>
            <Link href="/lenders" className="text-sm font-medium text-primary hover:underline">Lenders</Link>
            <Link href="/newsletter" className="text-sm font-medium text-primary hover:underline">Newsletter</Link>
          </div>
        </div>
      )}
    </div>
  )
}
