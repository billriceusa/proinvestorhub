'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { cities } from '@/data/cap-rate-cities'

type SortKey = 'avgCapRate' | 'medianHomePrice' | 'medianRent' | 'rentToPrice' | 'city'
type SortDir = 'asc' | 'desc'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function getCapRateBadge(rate: number): { label: string; className: string } {
  if (rate >= 10) return { label: 'Excellent', className: 'bg-blue-100 text-blue-700' }
  if (rate >= 8) return { label: 'Very Good', className: 'bg-emerald-100 text-emerald-700' }
  if (rate >= 6) return { label: 'Good', className: 'bg-emerald-50 text-emerald-600' }
  if (rate >= 4) return { label: 'Moderate', className: 'bg-amber-50 text-amber-700' }
  return { label: 'Low', className: 'bg-red-50 text-red-600' }
}

export function CapRateCitiesTable() {
  const [sortKey, setSortKey] = useState<SortKey>('avgCapRate')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir(key === 'city' ? 'asc' : 'desc')
    }
  }

  const sorted = useMemo(() => {
    return [...cities].sort((a, b) => {
      let cmp: number
      if (sortKey === 'city') {
        cmp = a.city.localeCompare(b.city)
      } else {
        cmp = a[sortKey] - b[sortKey]
      }
      return sortDir === 'desc' ? -cmp : cmp
    })
  }, [sortKey, sortDir])

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    const active = sortKey === field
    return (
      <button
        onClick={() => toggleSort(field)}
        className={`inline-flex items-center gap-1 text-left font-semibold transition-colors ${
          active ? 'text-primary' : 'text-text hover:text-primary'
        }`}
      >
        {label}
        <span className="text-xs">
          {active ? (sortDir === 'desc' ? '\u2193' : '\u2191') : '\u2195'}
        </span>
      </button>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="py-3 pl-6 pr-4 text-left">
              <SortHeader label="City" field="city" />
            </th>
            <th className="py-3 px-4 text-left">
              <SortHeader label="Avg Cap Rate" field="avgCapRate" />
            </th>
            <th className="py-3 px-4 text-left">
              <SortHeader label="Median Price" field="medianHomePrice" />
            </th>
            <th className="py-3 px-4 text-left">
              <SortHeader label="Median Rent" field="medianRent" />
            </th>
            <th className="py-3 px-4 pr-6 text-left">
              <SortHeader label="R/P Ratio" field="rentToPrice" />
            </th>
          </tr>
        </thead>
        <tbody className="text-text-muted">
          {sorted.map((city, i) => {
            const badge = getCapRateBadge(city.avgCapRate)
            return (
              <tr
                key={city.slug}
                className={`border-b border-border/50 hover:bg-surface/50 transition-colors ${
                  i % 2 === 0 ? '' : 'bg-surface/30'
                }`}
              >
                <td className="py-3 pl-6 pr-4">
                  <Link
                    href={`/calculators/cap-rate/${city.slug}`}
                    className="font-medium text-text hover:text-primary transition-colors"
                  >
                    {city.city}, {city.state}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums font-semibold text-text">
                      {city.avgCapRate.toFixed(1)}%
                    </span>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </span>
                </td>
                <td className="py-3 px-4 tabular-nums">
                  {formatCurrency(city.medianHomePrice)}
                </td>
                <td className="py-3 px-4 tabular-nums">
                  {formatCurrency(city.medianRent)}/mo
                </td>
                <td className="py-3 px-4 pr-6 tabular-nums">
                  {(city.rentToPrice * 100).toFixed(2)}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
