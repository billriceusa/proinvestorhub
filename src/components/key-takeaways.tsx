import type { ReactNode } from 'react'

/**
 * KeyTakeaways — a top-of-page, answer-bearing summary block.
 *
 * Built for answer-engine optimization (AEO): each point is a self-contained,
 * declarative sentence carrying the headline number + source, so assistants
 * (ChatGPT, Perplexity, AI Overviews) can quote a single line without needing
 * the surrounding page. Distinct from the guides' "What You'll Learn" objectives
 * box — this states facts, it does not preview topics.
 *
 * Place it directly under the page intro, before the detailed sections.
 */
export function KeyTakeaways({
  title = 'Key takeaways',
  points,
  className = '',
}: {
  title?: string
  points: ReactNode[]
  className?: string
}) {
  const items = points.filter(Boolean)
  if (items.length === 0) return null

  return (
    <section
      aria-label={title}
      className={`rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7 ${className}`}
    >
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
        <svg
          aria-hidden
          className="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        {title}
      </h2>
      <ul className="mt-4 space-y-3 leading-7 text-text">
        {items.map((point, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
