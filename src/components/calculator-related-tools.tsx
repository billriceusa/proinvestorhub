import Link from 'next/link'

export type RelatedTool = {
  label: string
  href: string
  /** muted = secondary styling (glossary, supporting links) */
  muted?: boolean
}

/**
 * Standardized "Related Tools" strip for calculator pages. Replaces the
 * one-off blocks that lived on a few calculators and gives every tool a
 * consistent internal-linking footer — the spine that passes link equity
 * across the calculator + financing-tool cluster.
 */
export function CalculatorRelatedTools({
  tools,
  heading = 'Related Tools',
}: {
  tools: RelatedTool[]
  heading?: string
}) {
  if (!tools.length) return null
  return (
    <section className="mt-16 max-w-3xl">
      <h2 className="text-2xl font-bold text-text">{heading}</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={
              t.muted
                ? 'rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface'
                : 'rounded-lg border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5'
            }
          >
            {t.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
