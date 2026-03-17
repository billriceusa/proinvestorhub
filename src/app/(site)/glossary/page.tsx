import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { GLOSSARY_TERMS_QUERY } from '@/sanity/lib/queries'
import type { GlossaryTermSummary } from '@/sanity/lib/types'
import { GlossarySearch } from '@/components/glossary-search'

export const metadata: Metadata = {
  title: 'Real Estate Investing Glossary',
  description:
    'Every real estate investing term explained clearly — from cap rate to 1031 exchange, NOI to DSCR. The definitive glossary for investors.',
  alternates: { canonical: '/glossary' },
}

export default async function GlossaryPage() {
  let terms: GlossaryTermSummary[] = []
  try {
    const { data: rawTerms } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY })
    terms = (rawTerms || []) as GlossaryTermSummary[]
  } catch {
    // Sanity not configured yet
  }

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

      <GlossarySearch terms={terms} />
    </div>
  )
}
