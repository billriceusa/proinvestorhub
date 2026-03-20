import Link from 'next/link'
import { cities } from '@/data/cap-rate-cities'

/**
 * Scans post body text for city name mentions and shows relevant market links.
 * Only renders if 2+ tracked cities are mentioned.
 */
export function RelatedMarkets({ bodyText }: { bodyText: string }) {
  if (!bodyText) return null

  const lower = bodyText.toLowerCase()
  const mentioned = cities.filter(
    (c) =>
      lower.includes(c.city.toLowerCase()) ||
      lower.includes(`${c.city.toLowerCase()}, ${c.state.toLowerCase()}`)
  )

  if (mentioned.length < 2) return null

  // Show max 6 cities
  const display = mentioned.slice(0, 6)

  return (
    <section className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <h2 className="text-lg font-bold text-text">
        Markets Mentioned in This Article
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        See how these cities rank across different investment strategies.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {display.map((city) => (
          <Link
            key={city.slug}
            href={`/calculators/cap-rate/${city.slug}`}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-white px-4 py-2.5 text-sm hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <span className="font-medium text-text">
              {city.city}, {city.state}
            </span>
            <span className="text-xs text-text-muted tabular-nums">
              {city.avgCapRate.toFixed(1)}% cap
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/markets/cash-flow"
          className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          Cash Flow Rankings
        </Link>
        <Link
          href="/markets/brrrr"
          className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          BRRRR Rankings
        </Link>
        <Link
          href="/markets/house-hacking"
          className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          House Hacking Rankings
        </Link>
        <Link
          href="/markets/appreciation"
          className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          Appreciation Rankings
        </Link>
      </div>
    </section>
  )
}
