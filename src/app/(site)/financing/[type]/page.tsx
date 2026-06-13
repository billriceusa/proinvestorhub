import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FinancingMatcher } from '@/components/financing-matcher'
import { CalculatorRelatedTools } from '@/components/calculator-related-tools'
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from '@/components/json-ld'
import {
  financingTypes,
  getFinancingTypeBySlug,
} from '@/data/financing-types'

export function generateStaticParams() {
  return financingTypes.map((t) => ({ type: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  const t = getFinancingTypeBySlug(type)
  if (!t) return {}
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/financing/${t.slug}` },
    openGraph: { title: t.metaTitle, description: t.metaDescription },
  }
}

export default async function FinancingTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const t = getFinancingTypeBySlug(type)
  if (!t) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const related = t.relatedTypes
    .map((slug) => getFinancingTypeBySlug(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Financing', url: `${baseUrl}/financing` },
          { name: t.name, url: `${baseUrl}/financing/${t.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(t.faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: t.metaTitle,
          description: t.metaDescription,
          url: `${baseUrl}/financing/${t.slug}`,
          publishedAt: '2026-06-13',
          authorName: 'Bill Rice',
        })}
      />

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/financing" className="transition-colors hover:text-primary">
          Financing
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{t.shortLabel}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">{t.h1}</h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">{t.intro}</p>
      </div>

      {/* Definition + best-for, the answer-box block */}
      <div className="mt-8 grid gap-4 sm:grid-cols-5">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            In one sentence
          </p>
          <p className="mt-2 leading-7 text-text">{t.definition}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 sm:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Best for
          </p>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-text-muted">
            {t.bestFor.map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main article */}
      <article className="mt-12 max-w-3xl">
        {t.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl font-bold text-text">{section.heading}</h2>
            <div className="mt-4 space-y-4 leading-7 text-text-muted">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {/* Pros / cons */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text">Pros and cons</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-emerald-700">Pros</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                {t.pros.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-rose-700">Cons</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                {t.cons.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text">Frequently asked questions</h2>
          <div className="mt-4 space-y-6">
            {t.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-text">{f.question}</h3>
                <p className="mt-1.5 leading-7 text-text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Matcher, pre-set to a representative profile for this method */}
      {t.matcherProfile && (
        <section className="mt-4">
          <h2 className="text-2xl font-bold text-text">See how it ranks for your deal</h2>
          <p className="mt-1 max-w-2xl text-text-muted">
            {t.name} is one option among many. Adjust the details below and the matcher will
            rank every financing type — institutional and creative — for your specific situation.
          </p>
          <div className="mt-6">
            <FinancingMatcher initialProfile={t.matcherProfile} />
          </div>
        </section>
      )}

      {/* Related tools */}
      <div className="mt-14">
        <CalculatorRelatedTools
          heading="Run the numbers"
          tools={[
            ...t.relatedCalculators,
            { label: 'Financing Matcher', href: '/financing/matcher' },
            { label: 'Complete Financing Guide', href: '/financing', muted: true },
          ]}
        />
      </div>

      {/* Related financing methods */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Related financing methods
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/financing/${r.slug}`}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-surface"
              >
                {r.shortLabel}
              </Link>
            ))}
            <Link
              href="/financing"
              className="rounded-full border border-primary bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              All financing options →
            </Link>
          </div>
        </section>
      )}

      {/* Cross-links to lender directories / guides */}
      {t.relatedGuides && t.relatedGuides.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Where to get it
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.relatedGuides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-surface"
              >
                {g.label} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
