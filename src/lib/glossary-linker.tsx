'use client'

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import Link from 'next/link'

export type GlossaryEntry = {
  term: string
  slug: string
}

type GlossaryContextValue = {
  entries: GlossaryEntry[]
  regex: RegExp | null
  termToSlug: Map<string, string>
  linked: React.RefObject<Set<string>>
}

const GlossaryContext = createContext<GlossaryContextValue>({
  entries: [],
  regex: null,
  termToSlug: new Map(),
  linked: { current: new Set() },
})

export function GlossaryProvider({
  terms,
  children,
}: {
  terms: GlossaryEntry[]
  children: ReactNode
}) {
  const linked = useRef(new Set<string>())

  const value = useMemo(() => {
    if (terms.length === 0) {
      return {
        entries: [],
        regex: null,
        termToSlug: new Map<string, string>(),
        linked,
      }
    }

    // Sort by term length descending so longer terms match first
    const sorted = [...terms].sort((a, b) => b.term.length - a.term.length)

    const termToSlug = new Map<string, string>()
    for (const entry of sorted) {
      termToSlug.set(entry.term.toLowerCase(), entry.slug)
    }

    // Build a single regex with word boundaries
    const escaped = sorted.map((e) =>
      e.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )
    const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'i')

    return { entries: sorted, regex, termToSlug, linked }
  }, [terms])

  return (
    <GlossaryContext.Provider value={value}>
      {children}
    </GlossaryContext.Provider>
  )
}

/**
 * Takes a plain text string and returns it with the first occurrence of any
 * unlinked glossary term wrapped in a <Link>. Tracks already-linked terms
 * per article to avoid duplicate links.
 */
export function useGlossaryLinker() {
  const { regex, termToSlug, linked } = useContext(GlossaryContext)

  return function autoLink(text: string): ReactNode {
    if (!regex || !text) return text

    const match = regex.exec(text)
    if (!match) return text

    const matchedTerm = match[1]
    const key = matchedTerm.toLowerCase()
    const slug = termToSlug.get(key)

    // Already linked this term in this article, or no slug found
    if (!slug || linked.current.has(key)) return text

    // Mark as linked
    linked.current.add(key)

    const idx = match.index
    return (
      <>
        {text.slice(0, idx)}
        <Link
          href={`/glossary/${slug}`}
          className="text-primary underline decoration-primary/30 hover:decoration-primary transition-colors"
          title={`Learn more: ${matchedTerm}`}
        >
          {text.slice(idx, idx + matchedTerm.length)}
        </Link>
        {text.slice(idx + matchedTerm.length)}
      </>
    )
  }
}
