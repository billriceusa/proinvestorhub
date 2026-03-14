import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { CapRateCitiesTable } from '@/components/cap-rate-cities-table'

export const metadata: Metadata = {
  title: 'Cap Rates by City — 2026 Market Data for 50 US Markets | ProInvestorHub',
  description:
    'Compare average cap rates, median home prices, rents, and rent-to-price ratios across the top 50 US real estate investing markets. Sortable data for 2026.',
  openGraph: {
    title: 'Cap Rates by City — 2026 Market Data | ProInvestorHub',
    description:
      'Compare cap rates across the top 50 US real estate investing markets.',
  },
}

export default function CapRateCitiesPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Calculators', url: `${baseUrl}/calculators` },
          { name: 'Cap Rate', url: `${baseUrl}/calculators/cap-rate` },
          {
            name: 'Cities',
            url: `${baseUrl}/calculators/cap-rate/cities`,
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
        <span className="text-text">Cities</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Cap Rates by City &mdash; 2026 Market Data
        </h1>
        <p className="mt-3 text-lg text-text-muted leading-7">
          Compare average cap rates, home prices, rents, and rent-to-price
          ratios across the top 50 US real estate investing markets. Click any
          city for a full market breakdown.
        </p>
      </div>

      {/* Sortable Table */}
      <CapRateCitiesTable />

      {/* Bottom note */}
      <p className="mt-4 text-xs text-text-light max-w-3xl">
        Data represents estimated 2025-2026 market averages based on public
        sources including Census data, Zillow, and Redfin. Cap rates are
        approximate and will vary by neighborhood, property type, and condition.
        Always run your own numbers before making investment decisions.
      </p>

      {/* CTA */}
      <div className="mt-12 rounded-xl bg-primary/5 border border-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-text">
          Ready to Analyze a Deal?
        </h2>
        <p className="mt-2 text-text-muted">
          Use our free cap rate calculator to run the numbers on any property
          with your actual income and expense figures.
        </p>
        <Link
          href="/calculators/cap-rate"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
        >
          Open Cap Rate Calculator &rarr;
        </Link>
      </div>
    </div>
  )
}
