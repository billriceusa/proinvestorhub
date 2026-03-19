'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { CityWithScore } from '@/data/market-strategies'

type SortKey = 'score' | 'city' | 'avgCapRate' | 'medianHomePrice' | 'medianRent' | 'rentToPrice' | 'populationGrowth'
type SortDir = 'asc' | 'desc'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

function getScoreBadge(score: number): { label: string; className: string } {
  if (score >= 8) return { label: 'Excellent', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
  if (score >= 6.5) return { label: 'Strong', className: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
  if (score >= 5) return { label: 'Moderate', className: 'bg-amber-50 text-amber-600 border-amber-100' }
  if (score >= 3.5) return { label: 'Below Avg', className: 'bg-orange-50 text-orange-600 border-orange-100' }
  return { label: 'Low', className: 'bg-red-50 text-red-600 border-red-100' }
}

export function StrategyCitiesTable({
  cities,
  scoreLabel,
}: {
  cities: CityWithScore[]
  scoreLabel: string
}) {
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    const arr = [...cities]
    arr.sort((a, b) => {
      let cmp: number
      if (sortKey === 'city') {
        cmp = a.city.localeCompare(b.city)
        return sortDir === 'asc' ? cmp : -cmp
      }
      cmp = (a[sortKey] as number) - (b[sortKey] as number)
      return sortDir === 'desc' ? -cmp : cmp
    })
    return arr
  }, [cities, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'city' ? 'asc' : 'desc')
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (col !== sortKey) return <span className="ml-1 text-text-light">↕</span>
    return <span className="ml-1">{sortDir === 'desc' ? '↓' : '↑'}</span>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-surface text-left text-text-muted text-xs uppercase tracking-wide">
            <th className="px-4 py-3 w-8">#</th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-text transition-colors"
              onClick={() => handleSort('city')}
            >
              City <SortIcon col="city" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-text transition-colors text-right"
              onClick={() => handleSort('score')}
            >
              {scoreLabel} <SortIcon col="score" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-text transition-colors text-right"
              onClick={() => handleSort('avgCapRate')}
            >
              Cap Rate <SortIcon col="avgCapRate" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-text transition-colors text-right"
              onClick={() => handleSort('medianHomePrice')}
            >
              Median Price <SortIcon col="medianHomePrice" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-text transition-colors text-right"
              onClick={() => handleSort('medianRent')}
            >
              Median Rent <SortIcon col="medianRent" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-text transition-colors text-right"
              onClick={() => handleSort('populationGrowth')}
            >
              Pop Growth <SortIcon col="populationGrowth" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((city, i) => {
            const badge = getScoreBadge(city.score)
            return (
              <tr
                key={city.slug}
                className={`border-t border-border/50 hover:bg-primary/5 transition-colors ${
                  i % 2 === 1 ? 'bg-surface/30' : ''
                }`}
              >
                <td className="px-4 py-3 text-text-light tabular-nums text-xs">
                  {i + 1}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/calculators/cap-rate/${city.slug}`}
                    className="font-medium text-text hover:text-primary transition-colors"
                  >
                    {city.city}, {city.state}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums ${badge.className}`}
                  >
                    {city.score.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-text-muted">
                  {formatPercent(city.avgCapRate)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-text-muted">
                  {formatCurrency(city.medianHomePrice)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-text-muted">
                  {formatCurrency(city.medianRent)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  <span
                    className={
                      city.populationGrowth > 0
                        ? 'text-emerald-600'
                        : city.populationGrowth < 0
                          ? 'text-red-600'
                          : 'text-text-muted'
                    }
                  >
                    {city.populationGrowth > 0 ? '+' : ''}
                    {formatPercent(city.populationGrowth)}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
