import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FinancingMatcher } from '@/components/financing-matcher'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { financingScenarios, getScenarioBySlug } from '@/data/financing-scenarios'

export function generateStaticParams() {
  return financingScenarios.map((s) => ({ scenario: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenario: string }>
}): Promise<Metadata> {
  const { scenario } = await params
  const s = getScenarioBySlug(scenario)
  if (!s) return {}
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/how-to-finance/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription },
  }
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ scenario: string }>
}) {
  const { scenario } = await params
  const s = getScenarioBySlug(scenario)
  if (!s) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const others = financingScenarios.filter((x) => x.slug !== s.slug)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Financing Matcher', url: `${baseUrl}/financing/matcher` },
          { name: s.h1, url: `${baseUrl}/how-to-finance/${s.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(s.faqs)} />

      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/financing/matcher" className="transition-colors hover:text-primary">
          Financing Matcher
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{s.shortLabel}</span>
      </nav>

      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">{s.h1}</h1>
        <p className="mt-3 text-lg leading-7 text-text-muted">{s.intro}</p>
      </div>

      {/* The matcher, pre-set to this scenario, showing recommendations immediately */}
      <FinancingMatcher initialProfile={s.profile} />

      {/* Unique educational copy */}
      <article className="mt-16 max-w-3xl">
        {s.body.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl font-bold text-text">{section.heading}</h2>
            <div className="mt-4 space-y-4 leading-7 text-text-muted">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-text">Frequently asked questions</h2>
          <div className="mt-4 space-y-6">
            {s.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-text">{f.question}</h3>
                <p className="mt-1.5 leading-7 text-text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Related scenarios */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
          More financing scenarios
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/how-to-finance/${o.slug}`}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-surface"
            >
              {o.shortLabel}
            </Link>
          ))}
          <Link
            href="/financing/matcher"
            className="rounded-full border border-primary bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Start from scratch →
          </Link>
        </div>
      </section>
    </div>
  )
}
