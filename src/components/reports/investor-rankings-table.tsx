'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { InvestorFinancingRow } from '@/data/hmda-investor'
import { fmtBps, fmtPct, fmtRate, fmtCount, fmtUSD } from '@/data/hmda-investor'

type Col = {
  key: keyof InvestorFinancingRow
  label: string
  fmt: (row: InvestorFinancingRow) => string
  numeric: boolean
}

const COLS: Col[] = [
  { key: 'ratePremiumBps', label: 'Rate premium', fmt: (r) => fmtBps(r.ratePremiumBps), numeric: true },
  { key: 'denialRate', label: 'Denial rate', fmt: (r) => fmtPct(r.denialRate), numeric: true },
  { key: 'investorShare', label: 'Investor share', fmt: (r) => fmtPct(r.investorShare), numeric: true },
  { key: 'investorMedianRate', label: 'Median rate', fmt: (r) => fmtRate(r.investorMedianRate), numeric: true },
  { key: 'investorMedianLtv', label: 'Median LTV', fmt: (r) => (r.investorMedianLtv == null ? '—' : `${r.investorMedianLtv.toFixed(0)}%`), numeric: true },
  { key: 'businessPurposeShare', label: 'DSCR share', fmt: (r) => fmtPct(r.businessPurposeShare, 0), numeric: true },
  { key: 'investorOriginations', label: 'Loans', fmt: (r) => fmtCount(r.investorOriginations), numeric: true },
  { key: 'investorVolume', label: 'Volume', fmt: (r) => fmtUSD(r.investorVolume), numeric: true },
]

export function InvestorRankingsTable({ states }: { states: InvestorFinancingRow[] }) {
  const [sortKey, setSortKey] = useState<keyof InvestorFinancingRow>('ratePremiumBps')
  const [asc, setAsc] = useState(false)

  const sorted = [...states].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    if (av == null) return 1
    if (bv == null) return -1
    if (typeof av === 'number' && typeof bv === 'number') return asc ? av - bv : bv - av
    return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
  })

  const toggle = (key: keyof InvestorFinancingRow) => {
    if (key === sortKey) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(key === 'name')
    }
  }

  const arrow = (key: keyof InvestorFinancingRow) =>
    key === sortKey ? (asc ? ' ↑' : ' ↓') : ''

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-surface text-left">
            <th className="sticky left-0 z-10 bg-surface px-4 py-3">
              <button
                type="button"
                onClick={() => toggle('name')}
                className="font-semibold text-text hover:text-primary"
              >
                State{arrow('name')}
              </button>
            </th>
            {COLS.map((c) => (
              <th key={c.key} className="whitespace-nowrap px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => toggle(c.key)}
                  className="font-semibold text-text hover:text-primary"
                >
                  {c.label}
                  {arrow(c.key)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => (
            <tr
              key={s.abbr}
              className={i % 2 === 0 ? 'bg-white' : 'bg-surface/40'}
            >
              <td className="sticky left-0 z-10 whitespace-nowrap px-4 py-2.5 font-medium text-text [background:inherit]">
                <Link
                  href={`/reports/investor-financing/${s.slug}`}
                  className="hover:text-primary hover:underline"
                >
                  {s.name}
                </Link>
              </td>
              {COLS.map((c) => (
                <td key={c.key} className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-text-muted">
                  {c.fmt(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
