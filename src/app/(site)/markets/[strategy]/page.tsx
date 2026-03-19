import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { CalculatorCTA } from '@/components/calculator-cta'
import { StrategyCitiesTable } from '@/components/strategy-cities-table'
import { strategies, getCitiesForStrategy } from '@/data/market-strategies'

export function generateStaticParams() {
  return strategies.map((s) => ({ strategy: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ strategy: string }>
}): Promise<Metadata> {
  const { strategy: slug } = await params
  const strategy = strategies.find((s) => s.slug === slug)
  if (!strategy) return {}

  return {
    title: strategy.metaTitle,
    description: strategy.metaDescription,
    alternates: { canonical: `/markets/${slug}` },
    openGraph: {
      title: strategy.metaTitle,
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
  const strategy = strategies.find((s) => s.slug === slug)
  if (!strategy) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const scoredCities = getCitiesForStrategy(slug)
  const topCities = scoredCities.slice(0, 10)
  const otherStrategies = strategies.filter((s) => s.slug !== slug)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Markets', url: `${baseUrl}/markets` },
          {
            name: strategy.shortTitle,
            url: `${baseUrl}/markets/${slug}`,
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/markets"
          className="hover:text-primary transition-colors"
        >
          Markets
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{strategy.shortTitle}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          {strategy.title}
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          {strategy.description}
        </p>
        <p className="mt-2 text-xs text-text-light">
          Last updated: March 2026 &bull; Data sources: Census ACS, Zillow,
          Redfin, county assessors
        </p>
      </div>

      {/* Hero Intro */}
      <div className="max-w-3xl mb-10">
        <p className="text-text-muted leading-7">{strategy.heroIntro}</p>
      </div>

      {/* Full Rankings Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6">
          All 50 Markets Ranked
        </h2>
        <StrategyCitiesTable
          cities={scoredCities}
          scoreLabel={strategy.scoreLabel}
        />
        <p className="mt-3 text-xs text-text-light max-w-3xl">
          {strategy.scoreExplainer} Data represents estimated 2025–2026 market
          averages based on public sources including Census ACS, Zillow, Redfin,
          and county assessor records. Always run your own numbers before making
          investment decisions.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {/* Top 10 City-Specific Editorial */}
          <section>
            <h2 className="text-2xl font-bold text-text">
              Top 10 Markets: City-by-City Analysis
            </h2>
            <div className="mt-6 space-y-6">
              {topCities.map((city, i) => {
                const insight = strategy.cityInsights[city.slug]
                return (
                  <div
                    key={city.slug}
                    className="rounded-xl border border-border bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {i + 1}
                          </span>
                          <Link
                            href={`/calculators/cap-rate/${city.slug}`}
                            className="text-lg font-bold text-text hover:text-primary transition-colors"
                          >
                            {city.city}, {city.state}
                          </Link>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-muted">
                          <span>
                            Score:{' '}
                            <strong className="text-primary">
                              {city.score.toFixed(1)}
                            </strong>
                          </span>
                          <span>
                            Cap Rate:{' '}
                            <strong>{city.avgCapRate.toFixed(1)}%</strong>
                          </span>
                          <span>
                            Median:{' '}
                            <strong>
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                              }).format(city.medianHomePrice)}
                            </strong>
                          </span>
                          <span>
                            Growth:{' '}
                            <strong
                              className={
                                city.populationGrowth > 0
                                  ? 'text-emerald-600'
                                  : 'text-red-600'
                              }
                            >
                              {city.populationGrowth > 0 ? '+' : ''}
                              {city.populationGrowth.toFixed(1)}%
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    {insight && (
                      <p className="mt-4 text-sm text-text-muted leading-6">
                        {insight}
                      </p>
                    )}
                    {!insight && (
                      <p className="mt-4 text-sm text-text-muted leading-6">
                        {city.investorTakeaway}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="text-2xl font-bold text-text">Methodology</h2>
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm text-text-muted leading-7">
                {strategy.methodology}
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-xl font-bold text-text">
              Run the Numbers on Any Market
            </h2>
            <p className="mt-2 text-text-muted">
              Use our free calculators to analyze specific deals in any of these
              markets with your actual numbers.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {strategy.relatedCalculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
                >
                  {calc.label}
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Articles */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Related Guides
            </h3>
            <div className="mt-4 space-y-3">
              {strategy.relatedArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="block rounded-lg border border-border/50 px-4 py-3 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
                >
                  {article.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Other Strategies */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Other Strategy Rankings
            </h3>
            <div className="mt-4 space-y-3">
              {otherStrategies.map((s) => (
                <Link
                  key={s.slug}
                  href={`/markets/${s.slug}`}
                  className="block rounded-lg border border-border/50 px-4 py-3 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
                >
                  Best Cities for {s.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          {/* Cap Rate Cities Link */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Market Data
            </h3>
            <Link
              href="/calculators/cap-rate/cities"
              className="mt-4 block rounded-lg border border-border/50 px-4 py-3 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
            >
              Cap Rates by City — Full Data
            </Link>
          </div>

          {/* Newsletter CTA */}
          <div className="sticky top-24">
            <CalculatorCTA context={`markets-${slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
