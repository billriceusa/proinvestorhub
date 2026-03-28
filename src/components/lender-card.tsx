import Link from 'next/link'
import type { LenderData } from '@/data/lenders'
import { formatCurrency } from '@/data/lenders'

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-primary">
      {rating.toFixed(1)}
      <svg className="h-4 w-4 fill-primary" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  )
}

const experienceLabels: Record<string, string> = {
  none: 'No experience required',
  beginner: '1–2 deals',
  intermediate: '3–5 deals',
  experienced: '5+ deals',
  varies: 'Varies',
}

export function LenderCard({ lender }: { lender: LenderData }) {
  return (
    <Link
      href={`/lenders/reviews/${lender.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
          {lender.name}
        </h3>
        <StarRating rating={lender.editorRating} />
      </div>

      <p className="text-sm text-text-muted leading-6 line-clamp-3 mb-4">
        {lender.description}
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4">
        <div>
          <span className="text-text-light">Rates</span>
          <p className="font-semibold text-text tabular-nums">
            {lender.minRate}%–{lender.maxRate}%
          </p>
        </div>
        <div>
          <span className="text-text-light">Max LTV</span>
          <p className="font-semibold text-text tabular-nums">{lender.maxLtv}%</p>
        </div>
        <div>
          <span className="text-text-light">Min Credit</span>
          <p className="font-semibold text-text tabular-nums">{lender.minCreditScore}</p>
        </div>
        <div>
          <span className="text-text-light">Close In</span>
          <p className="font-semibold text-text">{lender.speedToClose}</p>
        </div>
        <div>
          <span className="text-text-light">Loan Range</span>
          <p className="font-semibold text-text tabular-nums">
            {formatCurrency(lender.minLoanAmount)}–{formatCurrency(lender.maxLoanAmount)}
          </p>
        </div>
        <div>
          <span className="text-text-light">Experience</span>
          <p className="font-semibold text-text">
            {experienceLabels[lender.experienceRequired] || lender.experienceRequired}
          </p>
        </div>
      </div>

      {/* Best-For Tags */}
      {lender.bestForTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border">
          {lender.bestForTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
