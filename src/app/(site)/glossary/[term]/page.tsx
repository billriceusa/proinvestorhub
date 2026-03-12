import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import {
  GLOSSARY_TERM_BY_SLUG_QUERY,
  GLOSSARY_SLUGS_QUERY,
} from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'
import type { GlossaryTermDetail } from '@/sanity/lib/types'
import { JsonLd, glossaryJsonLd, breadcrumbJsonLd } from '@/components/json-ld'

type Props = {
  params: Promise<{ term: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: GLOSSARY_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Array<{ slug: string }>) || []).map((t) => ({
      term: t.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: slug } = await params
  const { data } = await sanityFetch({
    query: GLOSSARY_TERM_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  const term = data as GlossaryTermDetail | null
  if (!term) return {}

  return {
    title: `${term.term} - Real Estate Investing Glossary`,
    description: term.definition,
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params
  const { data } = await sanityFetch({
    query: GLOSSARY_TERM_BY_SLUG_QUERY,
    params: { slug },
  })
  const term = data as GlossaryTermDetail | null

  if (!term) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.vercel.app'

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={glossaryJsonLd({
          term: term.term || '',
          definition: term.definition || '',
          url: `${baseUrl}/glossary/${term.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Glossary', url: `${baseUrl}/glossary` },
          { name: term.term || '', url: `${baseUrl}/glossary/${term.slug}` },
        ])}
      />
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/glossary" className="hover:text-primary transition-colors">
          Glossary
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{term.term}</span>
      </nav>

      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        {term.term}
      </h1>

      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <p className="text-lg text-text leading-7">{term.definition}</p>
      </div>

      {term.body && (
        <div className="mt-10">
          <PortableText value={term.body} />
        </div>
      )}

      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Terms</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {term.relatedTerms.map((related) => (
              <Link
                key={related._id}
                href={`/glossary/${related.slug}`}
                className="rounded-lg border border-border bg-white p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-text">{related.term}</h3>
                <p className="mt-1 text-sm text-text-muted line-clamp-2">
                  {related.definition}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/glossary"
          className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
        >
          &larr; Back to Glossary
        </Link>
      </div>
    </div>
  )
}
