import Link from 'next/link'
import type { CityWithScore } from '@/data/market-strategies'

export function CityStrategyComparison({
  currentCity,
  nearbyRanked,
  strategySlug,
  scoreLabel,
  currentRank,
}: {
  currentCity: CityWithScore
  nearbyRanked: CityWithScore[]
  strategySlug: string
  scoreLabel: string
  currentRank: number
}) {
  // Build the full list with current city included for display
  const allCities = [...nearbyRanked, currentCity].sort(
    (a, b) => b.score - a.score
  )

  // Derive ranks: find the rank of the first city in this list
  const topScore = allCities[0].score
  const currentIdx = allCities.findIndex(
    (c) => c.slug === currentCity.slug
  )
  const firstRank = currentRank - currentIdx

  const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-text mb-4">
        How {currentCity.city} Compares
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-muted">
              <th className="pb-2 pr-4 font-medium">Rank</th>
              <th className="pb-2 pr-4 font-medium">City</th>
              <th className="pb-2 pr-4 font-medium text-right">
                {scoreLabel}
              </th>
              <th className="pb-2 pr-4 font-medium text-right">Cap Rate</th>
              <th className="pb-2 font-medium text-right">Median Price</th>
            </tr>
          </thead>
          <tbody>
            {allCities.map((city, i) => {
              const rank = firstRank + i
              const isCurrent = city.slug === currentCity.slug
              return (
                <tr
                  key={city.slug}
                  className={`border-b border-border/50 ${isCurrent ? 'bg-primary/5 font-semibold' : ''}`}
                >
                  <td className="py-2.5 pr-4 text-text-muted">#{rank}</td>
                  <td className="py-2.5 pr-4">
                    {isCurrent ? (
                      <span className="text-primary">
                        {city.city}, {city.state}
                      </span>
                    ) : (
                      <Link
                        href={`/markets/${strategySlug}/${city.slug}`}
                        className="text-text hover:text-primary transition-colors"
                      >
                        {city.city}, {city.state}
                      </Link>
                    )}
                  </td>
                  <td className="py-2.5 pr-4 text-right text-primary font-semibold">
                    {city.score.toFixed(1)}
                  </td>
                  <td className="py-2.5 pr-4 text-right text-text-muted">
                    {city.avgCapRate.toFixed(1)}%
                  </td>
                  <td className="py-2.5 text-right text-text-muted">
                    {usd.format(city.medianHomePrice)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-text-light">
        Showing markets ranked near {currentCity.city} for this strategy.
      </p>
    </div>
  )
}
