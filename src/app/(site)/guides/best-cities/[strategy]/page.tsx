import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { CalculatorCTA } from '@/components/calculator-cta'
import { strategies, getStrategyBySlug } from '@/data/best-cities-strategies'
import { cities as capRateCities } from '@/data/cap-rate-cities'

const calculatorMap: Record<string, { href: string; label: string }> = {
  brrrr: { href: '/calculators/brrrr', label: 'Open BRRRR Calculator' },
  'cash-flow': {
    href: '/calculators/rental-property',
    label: 'Open Rental Property Calculator',
  },
  'house-hacking': {
    href: '/calculators/rental-property',
    label: 'Open Rental Property Calculator',
  },
  appreciation: {
    href: '/calculators/cap-rate',
    label: 'Open Cap Rate Calculator',
  },
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'bg-emerald-500'
  if (score >= 80) return 'bg-emerald-400'
  if (score >= 70) return 'bg-amber-400'
  return 'bg-amber-300'
}

function getScoreTextColor(score: number): string {
  if (score >= 80) return 'text-emerald-700'
  return 'text-amber-700'
}

export function generateStaticParams() {
  return strategies.map((s) => ({ strategy: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ strategy: string }>
}): Promise<Metadata> {
  const { strategy: slug } = await params
  const strategy = getStrategyBySlug(slug)
  if (!strategy) return {}

  const title = `Best Cities for ${strategy.name} Investing in 2026 | ProInvestorHub`
  return {
    title,
    description: strategy.metaDescription,
    openGraph: {
      title,
      description: strategy.metaDescription,
    },
  }
}

export default async function StrategyPage({
  params,
}: {
  params: Promise<{ strategy: string }>
}) {
  const { strategy: slug } = await params
  const strategy = getStrategyBySlug(slug)
  if (!strategy) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  const cta = calculatorMap[strategy.slug] || calculatorMap['cash-flow']

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Guides', url: `${baseUrl}/guides` },
          { name: 'Best Cities', url: `${baseUrl}/guides/best-cities` },
          {
            name: strategy.name,
            url: `${baseUrl}/guides/best-cities/${strategy.slug}`,
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link
          href="/guides"
          className="hover:text-primary transition-colors"
        >
          Guides
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/guides/best-cities"
          className="hover:text-primary transition-colors"
        >
          Best Cities
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{strategy.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Best Cities for {strategy.name} Investing in 2026
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          {strategy.description}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {/* Factors Section */}
          <section>
            <h2 className="text-2xl font-bold text-text">
              What Makes a Good {strategy.name} Market
            </h2>
            <ul className="mt-4 space-y-3">
              {strategy.factors.map((factor) => (
                <li key={factor} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-text-muted leading-6">{factor}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* City Rankings */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              Top 15 {strategy.name} Markets
            </h2>
            <div className="space-y-4">
              {strategy.cities.map((city) => {
                const capRateCity = capRateCities.find(
                  (c) => c.slug === city.slug
                )
                return (
                  <div
                    key={city.slug}
                    className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Rank number */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                        {city.rank}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-text">
                            {city.city}, {city.state}
                          </h3>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${getScoreColor(city.score)}`}
                          >
                            {city.score}/100
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-primary">
                          {city.keyMetric}
                        </p>

                        <p className="mt-2 text-sm text-text-muted leading-6">
                          {city.why}
                        </p>

                        {capRateCity && (
                          <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-light">
                            <span>
                              Cap Rate:{' '}
                              <span className="font-medium text-text">
                                {capRateCity.avgCapRate}%
                              </span>
                            </span>
                            <span>
                              Median Price:{' '}
                              <span className="font-medium text-text">
                                ${capRateCity.medianHomePrice.toLocaleString()}
                              </span>
                            </span>
                            <span>
                              Median Rent:{' '}
                              <span className="font-medium text-text">
                                ${capRateCity.medianRent.toLocaleString()}/mo
                              </span>
                            </span>
                            <span>
                              Vacancy:{' '}
                              <span className="font-medium text-text">
                                {capRateCity.vacancyRate}%
                              </span>
                            </span>
                          </div>
                        )}

                        <Link
                          href={`/calculators/cap-rate/${city.slug}`}
                          className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
                        >
                          View full {city.city} market data &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-xl font-bold text-text">
              Analyze Your Next Deal
            </h2>
            <p className="mt-2 text-text-muted">
              Found a market that fits your {strategy.name.toLowerCase()}{' '}
              strategy? Run the numbers on a specific property with our free
              calculator.
            </p>
            <Link
              href={cta.href}
              className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              {cta.label}
            </Link>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Other Strategies */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Other Strategies
            </h3>
            <div className="mt-4 space-y-3">
              {strategies
                .filter((s) => s.slug !== strategy.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/guides/best-cities/${s.slug}`}
                    className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all group"
                  >
                    <div>
                      <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                        Best {s.name} Markets
                      </p>
                      <p className="text-xs text-text-light">
                        {s.cities.length} cities ranked
                      </p>
                    </div>
                    <span className="text-sm text-text-light group-hover:text-primary transition-colors">
                      &rarr;
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sticky top-24">
            <CalculatorCTA context={`best-cities-${strategy.slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
