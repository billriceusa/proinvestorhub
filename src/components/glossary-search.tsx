'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { GlossaryTermSummary } from '@/sanity/lib/types'

const categoryLabels: Record<string, string> = {
  financing: 'Financing',
  analysis: 'Analysis',
  legal: 'Legal',
  'property-types': 'Property Types',
  strategies: 'Strategies',
  tax: 'Tax',
  general: 'General',
}

export function GlossarySearch({ terms }: { terms: GlossaryTermSummary[] }) {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set()
  )

  // Derive available categories from actual data
  const availableCategories = useMemo(() => {
    const cats = new Set<string>()
    for (const term of terms) {
      if (term.category) cats.add(term.category)
    }
    return Array.from(cats).sort((a, b) =>
      (categoryLabels[a] || a).localeCompare(categoryLabels[b] || b)
    )
  }, [terms])

  // Filter terms
  const filteredTerms = useMemo(() => {
    const q = query.toLowerCase().trim()
    return terms.filter((term) => {
      // Category filter
      if (
        activeCategories.size > 0 &&
        (!term.category || !activeCategories.has(term.category))
      ) {
        return false
      }
      // Text search
      if (q) {
        const matchesTerm = (term.term || '').toLowerCase().includes(q)
        const matchesDef = (term.definition || '').toLowerCase().includes(q)
        if (!matchesTerm && !matchesDef) return false
      }
      return true
    })
  }, [terms, query, activeCategories])

  // Group filtered terms by letter
  const grouped = useMemo(() => {
    const acc: Record<string, GlossaryTermSummary[]> = {}
    for (const term of filteredTerms) {
      const letter = (term.term || '')[0]?.toUpperCase() || '#'
      if (!acc[letter]) acc[letter] = []
      acc[letter].push(term)
    }
    return acc
  }, [filteredTerms])

  const sortedLetters = Object.keys(grouped).sort()

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const clearAll = () => {
    setQuery('')
    setActiveCategories(new Set())
  }

  const isFiltered = query.length > 0 || activeCategories.size > 0

  return (
    <>
      {/* Search and filters */}
      <div className="mt-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-text-light"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms or definitions..."
            className="w-full rounded-lg border border-border bg-white py-3 pl-11 pr-10 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-light hover:text-text-muted transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text-muted mr-1">
            Filter:
          </span>
          {availableCategories.map((cat) => {
            const isActive = activeCategories.has(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'border border-border bg-white text-text-muted hover:border-primary/40 hover:text-primary'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            )
          })}
          {isFiltered && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-1 rounded-full px-3.5 py-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results count */}
        {isFiltered && (
          <p className="text-sm text-text-muted">
            Showing{' '}
            <span className="font-semibold text-text">
              {filteredTerms.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-text">{terms.length}</span>{' '}
            terms
          </p>
        )}
      </div>

      {/* Alphabet nav */}
      {sortedLetters.length > 0 && (
        <nav className="mt-6 flex flex-wrap gap-2">
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

      {/* Term list */}
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
          {isFiltered ? (
            <>
              <p className="text-text-muted">
                No terms match your search.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-3 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                Clear filters
              </button>
            </>
          ) : (
            <>
              <p className="text-text-muted">No glossary terms yet.</p>
              <p className="mt-2 text-sm text-text-light">
                Terms are managed through the{' '}
                <Link href="/studio" className="text-primary underline">
                  Sanity Studio
                </Link>
                .
              </p>
            </>
          )}
        </div>
      )}
    </>
  )
}
