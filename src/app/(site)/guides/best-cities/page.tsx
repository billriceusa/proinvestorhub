import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { strategies } from '@/data/best-cities-strategies'

export const metadata: Metadata = {
  title: 'Best Cities for Real Estate Investing in 2026 | ProInvestorHub',
  description:
    'Discover the best cities for BRRRR, cash flow, house hacking, and appreciation investing. Data-driven rankings for real estate investors.',
  alternates: { canonical: '/guides/best-cities' },
  openGraph: {
    title: 'Best Cities for Real Estate Investing in 2026 | ProInvestorHub',
    description:
      'Discover the best cities for BRRRR, cash flow, house hacking, and appreciation investing. Data-driven rankings for real estate investors.',
  },
}

const strategyIcons: Record<string, string> = {
  brrrr: 'Buy, Rehab, Rent, Refinance, Repeat',
  'cash-flow': 'Monthly income from rental properties',
  'house-hacking': 'Live in one unit, rent the others',
  appreciation: 'Long-term property value growth',
}

const strategyEmoji: Record<string, string> = {
  brrrr: '1',
  'cash-flow': '2',
  'house-hacking': '3',
  appreciation: '4',
}

export default function BestCitiesIndexPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Guides', url: `${baseUrl}/guides` },
          { name: 'Best Cities', url: `${baseUrl}/guides/best-cities` },
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
        <span className="text-text">Best Cities</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Best Cities for Real Estate Investing in 2026
        </h1>
        <p className="mt-4 text-lg text-text-muted leading-7">
          Not every market works for every strategy. A city that delivers
          outstanding cash flow might be a poor choice for appreciation, and the
          best BRRRR markets look nothing like the best house hacking markets.
          We ranked the top 15 cities for each strategy so you can find markets
          that match your investment goals.
        </p>
      </div>

      {/* Strategy Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {strategies.map((strategy) => (
          <Link
            key={strategy.slug}
            href={`/guides/best-cities/${strategy.slug}`}
            className="group rounded-xl border border-border bg-white p-8 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                {strategyEmoji[strategy.slug]}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-text group-hover:text-primary transition-colors">
                  Best {strategy.name} Markets
                </h2>
                <p className="mt-1 text-sm font-medium text-primary/70">
                  {strategyIcons[strategy.slug]}
                </p>
                <p className="mt-3 text-sm text-text-muted leading-6">
                  {strategy.metaDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {strategy.cities.slice(0, 5).map((city) => (
                    <span
                      key={city.slug}
                      className="inline-block rounded-full bg-bg-muted px-2.5 py-0.5 text-xs text-text-muted"
                    >
                      {city.city}
                    </span>
                  ))}
                  <span className="inline-block rounded-full bg-bg-muted px-2.5 py-0.5 text-xs text-text-light">
                    +{strategy.cities.length - 5} more
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  View rankings &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Methodology */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">How We Rank Markets</h2>
        <p className="mt-4 text-text-muted leading-7">
          Each city receives a composite score (1-100) based on the factors that
          matter most for that specific strategy. We analyze median home prices,
          rents, vacancy rates, population growth, employment data, property tax
          rates, and regulatory environments. Rankings are updated annually to
          reflect current market conditions.
        </p>
        <p className="mt-4 text-text-muted leading-7">
          These rankings are starting points for your research, not investment
          advice. Every city has neighborhoods that outperform and underperform
          the metro-level data. Always conduct thorough due diligence on
          specific properties and submarkets before investing.
        </p>
      </section>
    </div>
  )
}
