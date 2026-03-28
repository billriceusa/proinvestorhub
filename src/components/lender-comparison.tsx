'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { LenderData } from '@/data/lenders'
import { formatCurrency } from '@/data/lenders'
import { LenderOutboundLink } from '@/components/lender-outbound-link'

const experienceLabels: Record<string, string> = {
  none: 'No experience required',
  beginner: '1–2 deals',
  intermediate: '3–5 deals',
  experienced: '5+ deals',
  varies: 'Varies',
}

const propertyTypeLabels: Record<string, string> = {
  sfr: 'SFR (1-4)',
  multifamily: 'Multifamily (5+)',
  'mixed-use': 'Mixed Use',
  commercial: 'Commercial',
  str: 'STR / Airbnb',
  condo: 'Condo',
  townhouse: 'Townhouse',
  mobile: 'Mobile/Manufactured',
  land: 'Land',
  'new-construction': 'New Construction',
}

type ComparisonRow = {
  label: string
  getValue: (l: LenderData) => string
  highlight?: 'lower-better' | 'higher-better'
}

const comparisonRows: ComparisonRow[] = [
  { label: 'Interest Rates', getValue: (l) => `${l.minRate}%–${l.maxRate}%`, highlight: 'lower-better' },
  { label: 'Max LTV', getValue: (l) => `${l.maxLtv}%`, highlight: 'higher-better' },
  { label: 'Min Credit Score', getValue: (l) => `${l.minCreditScore}`, highlight: 'lower-better' },
  { label: 'Loan Range', getValue: (l) => `${formatCurrency(l.minLoanAmount)}–${formatCurrency(l.maxLoanAmount)}` },
  { label: 'Origination Fee', getValue: (l) => l.originationFee },
  { label: 'Speed to Close', getValue: (l) => l.speedToClose },
  { label: 'Experience Required', getValue: (l) => experienceLabels[l.experienceRequired] || l.experienceRequired },
  { label: 'LLC Borrowing', getValue: (l) => l.allowsLlc ? 'Yes' : 'No' },
  { label: 'Interest-Only', getValue: (l) => l.interestOnlyAvailable ? 'Available' : 'Not available' },
  { label: 'Prepayment Penalty', getValue: (l) => l.prepaymentPenalty },
  { label: 'Foreign National', getValue: (l) => l.foreignNational ? 'Yes' : 'No' },
  { label: 'Coverage', getValue: (l) => l.nationwide ? 'Nationwide' : 'Regional' },
  { label: 'Property Types', getValue: (l) => l.propertyTypes.map((pt) => propertyTypeLabels[pt] || pt).join(', ') },
  { label: 'Founded', getValue: (l) => `${l.founded}` },
  { label: 'Headquarters', getValue: (l) => l.headquarters },
  { label: 'Editor Rating', getValue: (l) => `${l.editorRating.toFixed(1)} / 5.0`, highlight: 'higher-better' },
]

function getBestValue(row: ComparisonRow, selected: LenderData[]): string | null {
  if (!row.highlight || selected.length < 2) return null

  if (row.highlight === 'lower-better') {
    if (row.label === 'Interest Rates') {
      const minRates = selected.map((l) => l.minRate)
      const best = Math.min(...minRates)
      return selected.find((l) => l.minRate === best)?.slug || null
    }
    if (row.label === 'Min Credit Score') {
      const scores = selected.map((l) => l.minCreditScore)
      const best = Math.min(...scores)
      return selected.find((l) => l.minCreditScore === best)?.slug || null
    }
  }

  if (row.highlight === 'higher-better') {
    if (row.label === 'Max LTV') {
      const ltvs = selected.map((l) => l.maxLtv)
      const best = Math.max(...ltvs)
      return selected.find((l) => l.maxLtv === best)?.slug || null
    }
    if (row.label === 'Editor Rating') {
      const ratings = selected.map((l) => l.editorRating)
      const best = Math.max(...ratings)
      return selected.find((l) => l.editorRating === best)?.slug || null
    }
  }

  return null
}

export function LenderComparison({ allLenders }: { allLenders: LenderData[] }) {
  const [selected, setSelected] = useState<string[]>([])

  const selectedLenders = selected
    .map((slug) => allLenders.find((l) => l.slug === slug))
    .filter((l): l is LenderData => l !== undefined)

  function toggleLender(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug)
      if (prev.length >= 3) return prev // max 3
      return [...prev, slug]
    })
  }

  return (
    <div>
      {/* Lender Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-text mb-2">
          Select 2–3 Lenders to Compare
        </h2>
        <p className="text-sm text-text-muted mb-4">
          {selected.length === 0 && 'Choose lenders below to see a side-by-side comparison.'}
          {selected.length === 1 && 'Select at least one more lender.'}
          {selected.length >= 2 && `Comparing ${selected.length} lenders. ${selected.length < 3 ? 'You can add one more.' : 'Maximum 3 selected.'}`}
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allLenders
            .sort((a, b) => b.editorRating - a.editorRating)
            .map((lender) => {
              const isSelected = selected.includes(lender.slug)
              const isDisabled = !isSelected && selected.length >= 3
              return (
                <button
                  key={lender.slug}
                  type="button"
                  onClick={() => toggleLender(lender.slug)}
                  disabled={isDisabled}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : isDisabled
                        ? 'border-border bg-surface text-text-light cursor-not-allowed opacity-50'
                        : 'border-border bg-white text-text hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{lender.name}</span>
                    <span className="text-xs tabular-nums">
                      {lender.editorRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-light">
                    {lender.loanTypeSlugs.length} products &middot; {lender.minRate}%–{lender.maxRate}%
                  </p>
                </button>
              )
            })}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedLenders.length >= 2 && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-surface-raised">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text w-48">
                  Feature
                </th>
                {selectedLenders.map((lender) => (
                  <th key={lender.slug} className="px-4 py-3 text-left font-semibold text-text min-w-[200px]">
                    <Link
                      href={`/lenders/reviews/${lender.slug}`}
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      {lender.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {comparisonRows.map((row) => {
                const bestSlug = getBestValue(row, selectedLenders)
                return (
                  <tr key={row.label} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3 font-medium text-text-muted">
                      {row.label}
                    </td>
                    {selectedLenders.map((lender) => (
                      <td
                        key={lender.slug}
                        className={`px-4 py-3 ${
                          bestSlug === lender.slug
                            ? 'font-semibold text-primary bg-primary/5'
                            : 'text-text'
                        }`}
                      >
                        {row.getValue(lender)}
                        {bestSlug === lender.slug && (
                          <span className="ml-2 text-xs text-primary">Best</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
              {/* Pros */}
              <tr>
                <td className="px-4 py-3 font-medium text-text-muted align-top">Pros</td>
                {selectedLenders.map((lender) => (
                  <td key={lender.slug} className="px-4 py-3 align-top">
                    <ul className="space-y-1">
                      {lender.pros.slice(0, 4).map((pro) => (
                        <li key={pro} className="flex items-start gap-1.5 text-xs text-green-800">
                          <span className="text-green-600 mt-0.5">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              {/* Cons */}
              <tr>
                <td className="px-4 py-3 font-medium text-text-muted align-top">Cons</td>
                {selectedLenders.map((lender) => (
                  <td key={lender.slug} className="px-4 py-3 align-top">
                    <ul className="space-y-1">
                      {lender.cons.slice(0, 3).map((con) => (
                        <li key={con} className="flex items-start gap-1.5 text-xs text-red-800">
                          <span className="text-red-600 mt-0.5">&ndash;</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* View Full Reviews & Visit Links */}
      {selectedLenders.length >= 2 && (
        <div className="mt-6 space-y-3">
          {selectedLenders.map((lender) => (
            <div key={lender.slug} className="flex flex-wrap items-center gap-3">
              <Link
                href={`/lenders/reviews/${lender.slug}`}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Full {lender.name} Review &rarr;
              </Link>
              <LenderOutboundLink
                websiteUrl={lender.website}
                lenderName={lender.name}
                lenderSlug={lender.slug}
                placement="comparison-table"
                editorRating={lender.editorRating}
                className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
              >
                Visit {lender.name}
              </LenderOutboundLink>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
