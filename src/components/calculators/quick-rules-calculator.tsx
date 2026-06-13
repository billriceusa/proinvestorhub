'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function num(value: string): number {
  return Number(value.replace(/[^0-9.]/g, '')) || 0
}

export function QuickRulesCalculator() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RentToPriceRule />
      <FiftyPercentRule />
      <GrossRentMultiplier />
      <NoiRule />
    </div>
  )
}

// ── 1% / 2% rule ──────────────────────────────────────────────────────────────
function RentToPriceRule() {
  const [price, setPrice] = useState('')
  const [rent, setRent] = useState('')

  const { ratio, passOne, passTwo, hasInput } = useMemo(() => {
    const p = num(price)
    const r = num(rent)
    const ratio = p > 0 ? (r / p) * 100 : 0
    return { ratio, passOne: ratio >= 1, passTwo: ratio >= 2, hasInput: p > 0 && r > 0 }
  }, [price, rent])

  return (
    <RuleCard
      title="1% & 2% Rule"
      blurb="A quick screen: monthly rent as a percentage of purchase price. ≥1% is a classic cash-flow filter; ≥2% is rare and aggressive."
    >
      <Field label="Purchase Price" value={price} onChange={setPrice} placeholder="200,000" prefix="$" />
      <Field label="Monthly Rent" value={rent} onChange={setRent} placeholder="2,000" prefix="$" />
      <div className="mt-4 rounded-lg bg-surface p-4 text-center">
        <p className="text-xs text-text-muted">Rent ÷ Price</p>
        <p className="mt-1 text-3xl font-bold tabular-nums text-primary">
          {hasInput ? `${ratio.toFixed(2)}%` : '—'}
        </p>
        {hasInput && (
          <div className="mt-3 flex justify-center gap-2">
            <Badge ok={passOne}>{passOne ? 'Passes 1%' : 'Below 1%'}</Badge>
            <Badge ok={passTwo}>{passTwo ? 'Passes 2%' : 'Below 2%'}</Badge>
          </div>
        )}
      </div>
    </RuleCard>
  )
}

// ── 50% rule ──────────────────────────────────────────────────────────────────
function FiftyPercentRule() {
  const [rent, setRent] = useState('')

  const { expenses, noi, hasInput } = useMemo(() => {
    const r = num(rent)
    return { expenses: r * 0.5, noi: r * 0.5, hasInput: r > 0 }
  }, [rent])

  return (
    <RuleCard
      title="50% Rule"
      blurb="A back-of-envelope estimate that operating expenses (taxes, insurance, repairs, vacancy, management — not the mortgage) run about half of gross rent."
    >
      <Field label="Monthly Gross Rent" value={rent} onChange={setRent} placeholder="2,000" prefix="$" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-surface p-4 text-center">
          <p className="text-xs text-text-muted">Est. Expenses</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-text">
            {hasInput ? formatCurrency(expenses) : '—'}
          </p>
        </div>
        <div className="rounded-lg bg-surface p-4 text-center">
          <p className="text-xs text-text-muted">Est. NOI (pre-debt)</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-primary">
            {hasInput ? formatCurrency(noi) : '—'}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-text-light">
        Subtract your mortgage payment from the estimated NOI to gauge cash flow.
      </p>
    </RuleCard>
  )
}

// ── Gross Rent Multiplier ───────────────────────────────────────────────────
function GrossRentMultiplier() {
  const [price, setPrice] = useState('')
  const [annualRent, setAnnualRent] = useState('')

  const { grm, hasInput } = useMemo(() => {
    const p = num(price)
    const r = num(annualRent)
    return { grm: r > 0 ? p / r : 0, hasInput: p > 0 && r > 0 }
  }, [price, annualRent])

  return (
    <RuleCard
      title="Gross Rent Multiplier (GRM)"
      blurb="Price relative to annual gross rent — a fast way to compare deals. Lower is cheaper; typical ranges run roughly 4–8 depending on the market."
    >
      <Field label="Purchase Price" value={price} onChange={setPrice} placeholder="200,000" prefix="$" />
      <Field label="Annual Gross Rent" value={annualRent} onChange={setAnnualRent} placeholder="24,000" prefix="$" />
      <div className="mt-4 rounded-lg bg-surface p-4 text-center">
        <p className="text-xs text-text-muted">Price ÷ Annual Rent</p>
        <p className="mt-1 text-3xl font-bold tabular-nums text-primary">
          {hasInput ? grm.toFixed(1) : '—'}
        </p>
      </div>
    </RuleCard>
  )
}

// ── NOI ───────────────────────────────────────────────────────────────────────
function NoiRule() {
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState('')

  const { noi, hasInput } = useMemo(() => {
    const i = num(income)
    const e = num(expenses)
    return { noi: i - e, hasInput: i > 0 }
  }, [income, expenses])

  return (
    <RuleCard
      title="Net Operating Income (NOI)"
      blurb="Annual gross income minus operating expenses — before debt service. The number cap rate and commercial valuation are built on."
    >
      <Field label="Annual Gross Income" value={income} onChange={setIncome} placeholder="24,000" prefix="$" />
      <Field label="Annual Operating Expenses" value={expenses} onChange={setExpenses} placeholder="9,000" prefix="$" />
      <div className="mt-4 rounded-lg bg-surface p-4 text-center">
        <p className="text-xs text-text-muted">Income − Expenses</p>
        <p className={`mt-1 text-3xl font-bold tabular-nums ${hasInput && noi < 0 ? 'text-red-500' : 'text-primary'}`}>
          {hasInput ? formatCurrency(noi) : '—'}
        </p>
      </div>
      <p className="mt-3 text-xs text-text-light">
        Operating expenses exclude the mortgage. Use NOI with the{' '}
        <Link href="/calculators/cap-rate" className="text-primary underline hover:text-primary-light">
          cap rate calculator
        </Link>
        .
      </p>
    </RuleCard>
  )
}

// ── Shared bits ────────────────────────────────────────────────────────────────
function RuleCard({
  title,
  blurb,
  children,
}: {
  title: string
  blurb: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-text">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-text-muted">{blurb}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  prefix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[^0-9.]/g, '')
    if (cleaned === '') {
      onChange('')
      return
    }
    const n = Number(cleaned)
    if (!isNaN(n)) onChange(n.toLocaleString('en-US'))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-text-muted">{label}</label>
      <div className="mt-1 relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-sm">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''}`}
        />
      </div>
    </div>
  )
}

function Badge({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        ok ? 'bg-emerald-50 text-emerald-700' : 'bg-surface text-text-light'
      }`}
    >
      {children}
    </span>
  )
}
