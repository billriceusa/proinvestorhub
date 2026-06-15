/** Shared year-over-year trend primitives for the Investor Financing Report. */

export function TrendArrow({ dir }: { dir: 'up' | 'down' | 'flat' }) {
  if (dir === 'flat') {
    return (
      <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
        <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  const d = dir === 'up' ? 'M3 9L9 3M9 3H4M9 3V8' : 'M3 3L9 9M9 9H4M9 9V4'
  return (
    <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Arrow + delta text, in a muted inline pill. */
export function DeltaTag({
  dir,
  children,
}: {
  dir: 'up' | 'down' | 'flat'
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted">
      <TrendArrow dir={dir} />
      {children}
    </span>
  )
}
