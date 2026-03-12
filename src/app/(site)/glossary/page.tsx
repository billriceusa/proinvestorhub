import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { GLOSSARY_TERMS_QUERY } from '@/sanity/lib/queries'
import type { GlossaryTermSummary } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: 'Real Estate Investing Glossary',
  description:
    'Every real estate investing term explained clearly — from cap rate to 1031 exchange, NOI to DSCR. The definitive glossary for investors.',
}

const categoryLabels: Record<string, string> = {
  financing: 'Financing',
  analysis: 'Analysis',
  legal: 'Legal',
  'property-types': 'Property Types',
  strategies: 'Strategies',
  tax: 'Tax',
  general: 'General',
}

export default async function GlossaryPage() {
  let terms: GlossaryTermSummary[] = []
  try {
    const { data: rawTerms } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY })
    terms = (rawTerms || []) as GlossaryTermSummary[]
  } catch {
    // Sanity not configured yet
  }

  const grouped = terms.reduce(
    (acc, term) => {
      const letter = (term.term || '')[0]?.toUpperCase() || '#'
      if (!acc[letter]) acc[letter] = []
      acc[letter].push(term)
      return acc
    },
    {} as Record<string, GlossaryTermSummary[]>
  )

  const sortedLetters = Object.keys(grouped).sort()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-text">
          Real Estate Investing Glossary
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Every term you need to know, explained clearly. From beginner basics to
          advanced concepts.
        </p>
      </div>

      {sortedLetters.length > 0 && (
        <nav className="mt-8 flex flex-wrap gap-2">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-sm font-medium text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {sortedLetters.length > 0 ? (
        <div className="mt-12 space-y-12">
          {sortedLetters.map((letter) => (
            <section key={letter} id={letter}>
              <h2 className="text-2xl font-bold text-primary border-b border-border pb-2">
                {letter}
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {grouped[letter].map((term) => (
                  <Link
                    key={term._id}
                    href={`/glossary/${term.slug}`}
                    className="group rounded-lg border border-border bg-white p-5 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                        {term.term}
                      </h3>
                      {term.category && (
                        <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-0.5 text-xs text-text-light">
                          {categoryLabels[term.category] || term.category}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-text-muted line-clamp-2">
                      {term.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center rounded-xl border border-dashed border-border bg-white py-16">
          <p className="text-text-muted">No glossary terms yet.</p>
          <p className="mt-2 text-sm text-text-light">
            Terms are managed through the{' '}
            <Link href="/studio" className="text-primary underline">
              Sanity Studio
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
