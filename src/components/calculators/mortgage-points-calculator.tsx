'use client'

import { useState, useMemo, useId } from 'react'
import { SaveResultsCTA } from '@/components/save-results-cta'
import { CalculatorActions } from '@/components/calculators/calculator-actions'
import { useCalculatorState } from '@/lib/use-calculator-state'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function parseCurrencyInput(value: string): number {
  return Number(value.replace(/[^0-9.]/g, '')) || 0
}

// Standard amortized monthly principal + interest.
function monthlyPI(principal: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (principal <= 0 || n <= 0) return 0
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function MortgagePointsCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [baseRate, setBaseRate] = useState('7')
  const [points, setPoints] = useState('1')
  const [reductionPerPoint, setReductionPerPoint] = useState('0.25')
  const [term, setTerm] = useState('30')

  useCalculatorState({
    loanAmount: setLoanAmount,
    baseRate: setBaseRate,
    points: setPoints,
    reductionPerPoint: setReductionPerPoint,
    term: setTerm,
  })

  const results = useMemo(() => {
    const principal = parseCurrencyInput(loanAmount)
    const years = Number(term) || 0
    const nPoints = Number(points) || 0
    const reduced = Math.max(0, Number(baseRate) - nPoints * Number(reductionPerPoint))

    const pointsCost = principal * (nPoints / 100)
    const paymentWithout = monthlyPI(principal, Number(baseRate), years)
    const paymentWith = monthlyPI(principal, reduced, years)
    const monthlySavings = paymentWithout - paymentWith
    const breakEvenMonths = monthlySavings > 0 ? pointsCost / monthlySavings : 0
    const lifetimeInterestWithout = paymentWithout * years * 12 - principal
    const lifetimeInterestWith = paymentWith * years * 12 - principal
    const lifetimeSavings = lifetimeInterestWithout - lifetimeInterestWith - pointsCost

    return {
      principal,
      reduced,
      pointsCost,
      paymentWithout,
      paymentWith,
      monthlySavings,
      breakEvenMonths,
      lifetimeSavings,
      years,
    }
  }, [loanAmount, baseRate, points, reductionPerPoint, term])

  const hasInput = results.principal > 0 && results.monthlySavings > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Your Loan
          </legend>
          <div className="mt-3 space-y-4">
            <InputField label="Loan Amount" value={loanAmount} onChange={setLoanAmount} placeholder="320,000" prefix="$" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Base Rate (no points)" value={baseRate} onChange={setBaseRate} placeholder="7" suffix="%" raw />
              <InputField label="Loan Term (years)" value={term} onChange={setTerm} placeholder="30" raw />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            The Points
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField
              label="Points to Buy"
              value={points}
              onChange={setPoints}
              placeholder="1"
              suffix="pts"
              raw
              hint="1 point = 1% of the loan amount."
            />
            <InputField
              label="Rate Cut per Point"
              value={reductionPerPoint}
              onChange={setReductionPerPoint}
              placeholder="0.25"
              suffix="%"
              raw
              hint="Typically ~0.25% per point; confirm with your lender."
            />
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">Results</h2>

          <CalculatorActions
            calculatorPath="/calculators/mortgage-points"
            calculatorName="Mortgage Points Calculator"
            params={{ loanAmount, baseRate, points, reductionPerPoint, term }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Break-Even</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {hasInput ? Math.ceil(results.breakEvenMonths) : '—'}
              {hasInput && <span className="text-2xl font-semibold text-text-muted"> mo</span>}
            </p>
            {hasInput && (
              <p className="mt-2 text-sm font-medium text-text-muted">
                to recoup {formatCurrency(results.pointsCost)} in points
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Saved / mo</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-emerald-600">
                {formatCurrency(results.monthlySavings)}
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Rate w/ Points</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">{results.reduced.toFixed(3)}%</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow label="Payment (no points)" value={formatCurrency(results.paymentWithout)} />
            <ResultRow label="Payment (with points)" value={formatCurrency(results.paymentWith)} />
            <ResultRow label="Cost of Points" value={formatCurrency(results.pointsCost)} />
            <div className="border-t border-border pt-3">
              <ResultRow
                label={`Net Savings (full ${results.years} yr)`}
                value={formatCurrency(results.lifetimeSavings)}
                bold
              />
            </div>
          </div>

          {hasInput && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              Buying points pays off only if you keep the loan past the break-even point. Sell or
              refinance before {Math.ceil(results.breakEvenMonths)} months and the points cost more
              than they save.
            </div>
          )}

          <SaveResultsCTA
            calculatorName="Mortgage Points Calculator"
            context="mortgage-points-calculator"
            results={{
              'Break-Even (months)': hasInput ? String(Math.ceil(results.breakEvenMonths)) : '—',
              'Monthly Savings': formatCurrency(results.monthlySavings),
              'Cost of Points': formatCurrency(results.pointsCost),
            }}
          />
        </div>
      </div>
    </div>
  )
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  hint,
  raw,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
  hint?: string
  raw?: boolean
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (raw) {
      onChange(e.target.value)
      return
    }
    const cleaned = e.target.value.replace(/[^0-9.]/g, '')
    if (cleaned === '') {
      onChange('')
      return
    }
    const num = Number(cleaned)
    if (!isNaN(num)) {
      onChange(num.toLocaleString('en-US'))
    }
  }

  const fieldId = useId()

  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-text-muted">{label}</label>
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
          id={fieldId}
          aria-describedby={hint ? `${fieldId}-hint` : undefined}
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light text-sm">{suffix}</span>
        )}
      </div>
      {hint && (
        <p id={`${fieldId}-hint`} className="mt-1 text-xs text-text-light">
          {hint}
        </p>
      )}
    </div>
  )
}

function ResultRow({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className={bold ? 'font-semibold text-text' : 'text-text-muted'}>{label}</span>
      <span className={`tabular-nums ${bold ? 'font-semibold text-text' : ''}`}>{value}</span>
    </div>
  )
}
