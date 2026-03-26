import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/json-ld'
import { CalculatorCTA } from '@/components/calculator-cta'
import { strategies } from '@/data/market-strategies'
import {
  getStatesList,
  fetchStatesList,
  getStateAverages,
  getBestStrategyForCity,
  generateStateFAQs,
  stateMetadata,
} from '@/data/city-strategy-helpers'
import { getDataFreshness } from '@/data/market-queries'

// Hardcoded list for generateStaticParams (just needs slugs, not live data)
const statesList = getStatesList()

export function generateStaticParams() {
  return statesList.map((s) => ({ state: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = statesList.find((s) => s.slug === stateSlug)
  if (!state) return {}

  const title = `Real Estate Investing in ${state.name} 2026 | ProInvestorHub`
  const description = `${state.name} real estate investing data: ${state.cities.length} markets analyzed with cap rates, rent-to-price ratios, and strategy rankings. Find the best investment cities in ${state.name}.`

  return {
    title,
    description,
    alternates: { canonical: `/markets/states/${stateSlug}` },
    openGraph: { title, description },
  }
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
})

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state: stateSlug } = await params

  // Fetch live data from Sanity (falls back to hardcoded)
  const [liveStates, freshness] = await Promise.all([
    fetchStatesList(),
    getDataFreshness(),
  ])
  const state = liveStates.find((s) => s.slug === stateSlug)
  if (!state) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const avgs = getStateAverages(state.cities)
  const faqs = generateStateFAQs(state.name, state.cities)
  const lastUpdated = freshness.dataUpdatedAt
    ? new Date(freshness.dataUpdatedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'March 2026'

  // Compute best strategy for each city
  const citiesWithStrategy = state.cities
    .map((city) => {
      const best = getBestStrategyForCity(city)
      return { ...city, bestStrategy: best.strategy, bestScore: best.score }
    })
    .sort((a, b) => b.avgCapRate - a.avgCapRate)

  // Find dominant strategy for the state
  const strategyCounts = new Map<string, number>()
  for (const c of citiesWithStrategy) {
    const count = strategyCounts.get(c.bestStrategy.slug) ?? 0
    strategyCounts.set(c.bestStrategy.slug, count + 1)
  }
  const dominantSlug = Array.from(strategyCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0]
  const dominantStrategy = strategies.find((s) => s.slug === dominantSlug)

  // Neighboring states for thin-content mitigation
  const neighboringStates = statesList
    .filter((s) => s.slug !== stateSlug)
    .slice(0, 6)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Markets', url: `${baseUrl}/markets` },
          { name: 'States', url: `${baseUrl}/markets/states` },
          {
            name: state.name,
            url: `${baseUrl}/markets/states/${stateSlug}`,
          },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

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
        <Link
          href="/markets/states"
          className="hover:text-primary transition-colors"
        >
          States
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{state.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Real Estate Investing in {state.name} &mdash; 2026
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          We track {state.cities.length}{' '}
          {state.cities.length === 1 ? 'market' : 'markets'} in {state.name}
          {' '}with detailed investment metrics.
          {dominantStrategy &&
            ` Most cities here score highest for ${dominantStrategy.shortTitle.toLowerCase()} investing.`}
        </p>
        <p className="mt-2 text-xs text-text-light">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* State Averages */}
      <section className="mb-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Avg Cap Rate
            </p>
            <p className="mt-1 text-xl font-bold text-text">
              {avgs.avgCapRate.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Avg Home Price
            </p>
            <p className="mt-1 text-xl font-bold text-text">
              {usd.format(avgs.avgMedianHomePrice)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Avg Rent
            </p>
            <p className="mt-1 text-xl font-bold text-text">
              {usd.format(avgs.avgMedianRent)}/mo
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Avg Vacancy
            </p>
            <p className="mt-1 text-xl font-bold text-text">
              {avgs.avgVacancyRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {/* City Table */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              {state.name} Investment Markets
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-text-muted">
                    <th className="pb-2 pr-4 font-medium">City</th>
                    <th className="pb-2 pr-4 font-medium text-right">
                      Cap Rate
                    </th>
                    <th className="pb-2 pr-4 font-medium text-right">
                      Median Price
                    </th>
                    <th className="pb-2 pr-4 font-medium text-right">
                      Rent
                    </th>
                    <th className="pb-2 pr-4 font-medium text-right">
                      Growth
                    </th>
                    <th className="pb-2 font-medium">Best Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {citiesWithStrategy.map((city) => (
                    <tr
                      key={city.slug}
                      className="border-b border-border/50"
                    >
                      <td className="py-3 pr-4">
                        <Link
                          href={`/calculators/cap-rate/${city.slug}`}
                          className="font-medium text-text hover:text-primary transition-colors"
                        >
                          {city.city}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-primary">
                        {city.avgCapRate.toFixed(1)}%
                      </td>
                      <td className="py-3 pr-4 text-right text-text-muted">
                        {usd.format(city.medianHomePrice)}
                      </td>
                      <td className="py-3 pr-4 text-right text-text-muted">
                        {usd.format(city.medianRent)}
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <span
                          className={
                            city.populationGrowth > 0
                              ? 'text-emerald-600'
                              : 'text-red-600'
                          }
                        >
                          {city.populationGrowth > 0 ? '+' : ''}
                          {city.populationGrowth.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/markets/${city.bestStrategy.slug}/${city.slug}`}
                          className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                        >
                          {city.bestStrategy.shortTitle}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Strategy Recommendation */}
          {dominantStrategy && (
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">
                Best Strategy for {state.name}
              </h2>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-text-muted leading-7">
                  Based on our analysis, the dominant strategy across{' '}
                  {state.name} markets is{' '}
                  <strong className="text-text">
                    {dominantStrategy.shortTitle}
                  </strong>{' '}
                  investing.{' '}
                  {strategyCounts.get(dominantSlug!)}/{state.cities.length}{' '}
                  cities in the state score highest for this approach.{' '}
                  {dominantStrategy.description}
                </p>
                <Link
                  href={`/markets/${dominantStrategy.slug}`}
                  className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
                >
                  View {dominantStrategy.shortTitle} Rankings
                </Link>
              </div>
            </section>
          )}

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-text">{faq.question}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-xl font-bold text-text">
              Analyze Deals in {state.name}
            </h2>
            <p className="mt-2 text-text-muted">
              Use our free calculators to run the numbers on specific properties.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/calculators/cap-rate"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Cap Rate Calculator
              </Link>
              <Link
                href="/calculators/rental-cashflow"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Cash Flow Calculator
              </Link>
              <Link
                href="/calculators/brrrr"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                BRRRR Calculator
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* City Quick Links */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              {state.name} Cities
            </h3>
            <div className="mt-4 space-y-3">
              {state.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/calculators/cap-rate/${city.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 text-sm hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <span className="font-medium text-text">{city.city}</span>
                  <span className="text-primary font-semibold">
                    {city.avgCapRate.toFixed(1)}%
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Strategy Rankings Links */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Browse by Strategy
            </h3>
            <div className="mt-4 space-y-3">
              {strategies.map((s) => (
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

          {/* Other States */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Other States
            </h3>
            <div className="mt-4 space-y-3">
              {neighboringStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/markets/states/${s.slug}`}
                  className="block rounded-lg border border-border/50 px-4 py-3 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
                >
                  {s.name}{' '}
                  <span className="text-text-light">
                    ({s.cities.length}{' '}
                    {s.cities.length === 1 ? 'city' : 'cities'})
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/markets/states"
              className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              View All States &rarr;
            </Link>
          </div>

          {/* Newsletter CTA */}
          <div className="sticky top-24">
            <CalculatorCTA context={`state-${stateSlug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
