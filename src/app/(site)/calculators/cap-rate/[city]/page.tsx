import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { CalculatorCTA } from '@/components/calculator-cta'
import { cities, getRelatedCities } from '@/data/cap-rate-cities'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

function formatPopulation(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  return `${(value / 1_000).toFixed(0)}K`
}

function getCapRateRating(rate: number): {
  label: string
  color: string
  bgColor: string
  description: string
} {
  if (rate < 4)
    return {
      label: 'Low',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      description:
        'Below average return. Common in high-appreciation markets. You are betting on property value growth, not cash flow.',
    }
  if (rate < 6)
    return {
      label: 'Moderate',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      description:
        'Typical for stable markets with moderate growth potential. Balanced risk-return profile.',
    }
  if (rate < 8)
    return {
      label: 'Good',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      description:
        'Strong return relative to market norms. Common in cash-flow-focused markets in the Midwest and South.',
    }
  if (rate < 10)
    return {
      label: 'Very Good',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50 border-emerald-200',
      description:
        'Above average. Make sure the higher return is not masking higher risk or deferred maintenance.',
    }
  return {
    label: 'Excellent (verify risk)',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    description:
      'Unusually high. Double-check the numbers — high cap rates can signal higher vacancy, crime, or obsolescence risk.',
  }
}

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) return {}

  const title = `Cap Rate in ${city.city}, ${city.state} — 2026 Market Data | ProInvestorHub`
  const description = `Average cap rate in ${city.city}, ${city.state} is ${city.avgCapRate}%. See median home prices, rents, vacancy rates, and investor analysis for ${city.city} real estate.`

  return {
    title,
    description,
    alternates: { canonical: `/calculators/cap-rate/${slug}` },
    openGraph: {
      title,
      description,
    },
  }
}

export default async function CityCapRatePage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  const rating = getCapRateRating(city.avgCapRate)
  const relatedSlugs = getRelatedCities(city.slug)
  const relatedCities = relatedSlugs
    .map((s) => cities.find((c) => c.slug === s))
    .filter(Boolean) as typeof cities

  const rank = cities.findIndex((c) => c.slug === slug) + 1

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Cap Rate', url: `${baseUrl}/calculators/cap-rate` },
          {
            name: `${city.city}, ${city.state}`,
            url: `${baseUrl}/calculators/cap-rate/${city.slug}`,
          },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link
          href="/calculators"
          className="hover:text-primary transition-colors"
        >
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/calculators/cap-rate"
          className="hover:text-primary transition-colors"
        >
          Cap Rate
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {city.city}, {city.state}
        </span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Cap Rate in {city.city}, {city.state}
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          2026 Market Overview for Real Estate Investors
        </p>
        <p className="mt-1 text-xs text-text-light">
          Last updated: March 2026 &bull; Sources: Census ACS, Zillow, Redfin,
          county assessor
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <p className="text-sm text-text-muted">Avg Cap Rate</p>
          <p className="mt-1 text-3xl font-bold text-primary tabular-nums">
            {formatPercent(city.avgCapRate)}
          </p>
          <p className="mt-1 text-xs text-text-light">
            #{rank} of {cities.length} markets
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <p className="text-sm text-text-muted">Median Home Price</p>
          <p className="mt-1 text-3xl font-bold text-text tabular-nums">
            {formatCurrency(city.medianHomePrice)}
          </p>
          <p className="mt-1 text-xs text-text-light">Purchase price</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <p className="text-sm text-text-muted">Median Monthly Rent</p>
          <p className="mt-1 text-3xl font-bold text-text tabular-nums">
            {formatCurrency(city.medianRent)}
          </p>
          <p className="mt-1 text-xs text-text-light">
            {formatCurrency(city.medianRent * 12)}/yr gross
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <p className="text-sm text-text-muted">Rent-to-Price Ratio</p>
          <p className="mt-1 text-3xl font-bold text-text tabular-nums">
            {(city.rentToPrice * 100).toFixed(2)}%
          </p>
          <p className="mt-1 text-xs text-text-light">
            {city.rentToPrice >= 0.008
              ? 'Strong (1% rule range)'
              : city.rentToPrice >= 0.005
                ? 'Moderate'
                : 'Below 1% rule'}
          </p>
        </div>
      </div>

      {/* Cap Rate Rating */}
      <div
        className={`rounded-xl border p-6 mb-10 ${rating.bgColor}`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p className="text-sm font-semibold text-text">Cap Rate Rating</p>
            <p className={`mt-1 text-2xl font-bold ${rating.color}`}>
              {rating.label}
            </p>
            <p className="mt-2 text-sm text-text-muted leading-6">
              {rating.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {/* Market Snapshot */}
          <section>
            <h2 className="text-2xl font-bold text-text">Market Snapshot</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody className="text-text-muted">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-6 font-medium text-text">
                      Population
                    </td>
                    <td className="py-3 tabular-nums">
                      {city.population.toLocaleString('en-US')}
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-6 font-medium text-text">
                      5-Year Population Growth
                    </td>
                    <td className="py-3 tabular-nums">
                      <span
                        className={
                          city.populationGrowth > 0
                            ? 'text-emerald-600'
                            : city.populationGrowth < 0
                              ? 'text-red-600'
                              : ''
                        }
                      >
                        {city.populationGrowth > 0 ? '+' : ''}
                        {formatPercent(city.populationGrowth)}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-6 font-medium text-text">
                      Median Household Income
                    </td>
                    <td className="py-3 tabular-nums">
                      {formatCurrency(city.medianHouseholdIncome)}
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-6 font-medium text-text">
                      Vacancy Rate
                    </td>
                    <td className="py-3 tabular-nums">
                      <span
                        className={
                          city.vacancyRate > 9
                            ? 'text-red-600'
                            : city.vacancyRate > 7
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                        }
                      >
                        {formatPercent(city.vacancyRate)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-medium text-text">
                      Property Tax Rate
                    </td>
                    <td className="py-3 tabular-nums">
                      {formatPercent(city.propertyTaxRate, 2)}
                      <span className="ml-2 text-text-light">
                        ({formatCurrency(city.medianHomePrice * city.propertyTaxRate / 100)}/yr)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Investor Takeaway */}
          <section>
            <h2 className="text-2xl font-bold text-text">
              Investor Takeaway
            </h2>
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-text-muted leading-7">
                {city.investorTakeaway}
              </p>
            </div>
          </section>

          {/* Quick Math */}
          <section>
            <h2 className="text-2xl font-bold text-text">Quick Math</h2>
            <p className="mt-2 text-sm text-text-muted leading-6">
              Estimated annual numbers for a median-priced property in{' '}
              {city.city}, {city.state} before financing:
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-text-muted">Annual Gross Rent</span>
                <span className="tabular-nums font-medium text-text">
                  {formatCurrency(city.medianRent * 12)}
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-text-muted">
                  Less Vacancy ({formatPercent(city.vacancyRate)})
                </span>
                <span className="tabular-nums text-red-500">
                  ({formatCurrency(city.medianRent * 12 * city.vacancyRate / 100)})
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-text-muted">
                  Less Property Tax ({formatPercent(city.propertyTaxRate, 2)})
                </span>
                <span className="tabular-nums text-red-500">
                  ({formatCurrency(city.medianHomePrice * city.propertyTaxRate / 100)})
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-text-muted">
                  Less Est. Insurance + Maintenance
                </span>
                <span className="tabular-nums text-red-500">
                  ({formatCurrency(city.medianHomePrice * 0.02)})
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-semibold text-text">
                  Estimated NOI
                </span>
                <span className="tabular-nums font-semibold text-primary">
                  {formatCurrency(
                    city.medianRent * 12 * (1 - city.vacancyRate / 100) -
                      city.medianHomePrice * city.propertyTaxRate / 100 -
                      city.medianHomePrice * 0.02
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-border">
                <span className="font-semibold text-text">Implied Cap Rate</span>
                <span className="tabular-nums font-semibold text-primary">
                  {(
                    ((city.medianRent * 12 * (1 - city.vacancyRate / 100) -
                      city.medianHomePrice * city.propertyTaxRate / 100 -
                      city.medianHomePrice * 0.02) /
                      city.medianHomePrice) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-text-light">
              Estimates based on median values. Insurance + maintenance estimated
              at 2% of home value. Actual results vary by property condition,
              neighborhood, and management.
            </p>
          </section>

          {/* CTA to calculator */}
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-xl font-bold text-text">
              Analyze a Specific Deal in {city.city}
            </h2>
            <p className="mt-2 text-text-muted">
              Use our free cap rate calculator to run the numbers on any
              property with your actual income and expense figures.
            </p>
            <Link
              href="/calculators/cap-rate"
              className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Open Cap Rate Calculator
            </Link>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Compare Other Markets */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Compare Other Markets
            </h3>
            <div className="mt-4 space-y-3">
              {relatedCities.map((related) => (
                <Link
                  key={related.slug}
                  href={`/calculators/cap-rate/${related.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                      {related.city}, {related.state}
                    </p>
                    <p className="text-xs text-text-light">
                      {formatCurrency(related.medianHomePrice)} median
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      related.avgCapRate >= 8
                        ? 'text-emerald-600'
                        : related.avgCapRate >= 6
                          ? 'text-emerald-600'
                          : related.avgCapRate >= 4
                            ? 'text-amber-600'
                            : 'text-red-600'
                    }`}
                  >
                    {formatPercent(related.avgCapRate)}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/calculators/cap-rate/cities"
              className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              View All 50 Markets &rarr;
            </Link>
          </div>

          {/* Newsletter */}
          <div className="sticky top-24">
            <CalculatorCTA context={`cap-rate-city-${city.slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
