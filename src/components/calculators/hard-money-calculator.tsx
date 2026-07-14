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

export function HardMoneyCalculator() {
  const [purchase, setPurchase] = useState('')
  const [rehab, setRehab] = useState('')
  const [arv, setArv] = useState('')
  const [arvLtv, setArvLtv] = useState('70')
  const [rate, setRate] = useState('11')
  const [points, setPoints] = useState('2')
  const [term, setTerm] = useState('6')

  useCalculatorState({
    purchase: setPurchase,
    rehab: setRehab,
    arv: setArv,
    arvLtv: setArvLtv,
    rate: setRate,
    points: setPoints,
    term: setTerm,
  })

  const results = useMemo(() => {
    const p = parseCurrencyInput(purchase)
    const r = parseCurrencyInput(rehab)
    const v = parseCurrencyInput(arv)
    const ltv = Number(arvLtv) / 100
    const projectCost = p + r
    const maxByArv = v * ltv
    // Hard money is the lesser of the ARV cap and total project cost.
    const loanAmount = Math.min(maxByArv, projectCost)
    const arvCapBinding = maxByArv < projectCost && v > 0
    const pointsCost = loanAmount * (Number(points) / 100)
    const monthlyInterest = loanAmount * (Number(rate) / 100) / 12
    const months = Number(term) || 0
    const totalInterest = monthlyInterest * months
    const totalFinancingCost = pointsCost + totalInterest
    // Cash needed = the part of the project the loan doesn't cover, plus points.
    const cashToClose = Math.max(0, projectCost - loanAmount) + pointsCost

    return {
      projectCost,
      loanAmount,
      maxByArv,
      arvCapBinding,
      pointsCost,
      monthlyInterest,
      totalInterest,
      totalFinancingCost,
      cashToClose,
      months,
    }
  }, [purchase, rehab, arv, arvLtv, rate, points, term])

  const hasInput = results.loanAmount > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            The Deal
          </legend>
          <div className="mt-3 space-y-4">
            <InputField label="Purchase Price" value={purchase} onChange={setPurchase} placeholder="200,000" prefix="$" />
            <InputField label="Rehab Budget" value={rehab} onChange={setRehab} placeholder="40,000" prefix="$" />
            <InputField
              label="After-Repair Value (ARV)"
              value={arv}
              onChange={setArv}
              placeholder="320,000"
              prefix="$"
              hint="What the property will be worth once renovated — the lender lends against this."
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Loan Terms
          </legend>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted">Max Loan (% of ARV)</label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  aria-label="Max Loan (% of ARV)"
                  min="50"
                  max="80"
                  step="1"
                  value={arvLtv}
                  onChange={(e) => setArvLtv(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">{arvLtv}%</span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                Most hard money lenders cap the total loan at 65–75% of ARV.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <InputField label="Interest Rate" value={rate} onChange={setRate} placeholder="11" suffix="%" raw />
              <InputField label="Points" value={points} onChange={setPoints} placeholder="2" suffix="pts" raw />
              <InputField label="Hold (months)" value={term} onChange={setTerm} placeholder="6" raw />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">Results</h2>

          <CalculatorActions
            calculatorPath="/calculators/hard-money"
            calculatorName="Hard Money Loan Calculator"
            params={{ purchase, rehab, arv, arvLtv, rate, points, term }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Loan Amount</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {formatCurrency(results.loanAmount)}
            </p>
            {hasInput && (
              <p className="mt-2 text-sm font-medium text-text-muted">
                {formatCurrency(results.cashToClose)} cash to close
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Interest / mo</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.monthlyInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Total Financing Cost</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.totalFinancingCost)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow label="Total Project Cost" value={formatCurrency(results.projectCost)} />
            <ResultRow label="Max Loan (by ARV)" value={formatCurrency(results.maxByArv)} />
            <ResultRow label="Points Cost" value={formatCurrency(results.pointsCost)} />
            <ResultRow label={`Interest (${results.months} mo)`} value={formatCurrency(results.totalInterest)} />
            <div className="border-t border-border pt-3">
              <ResultRow label="Cash to Close" value={formatCurrency(results.cashToClose)} bold />
            </div>
          </div>

          {hasInput && results.arvCapBinding && (
            <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-5">
              The ARV cap is limiting your loan — it covers less than your full purchase plus rehab,
              so you&apos;ll bring the difference in cash. A higher ARV or a leaner rehab closes the gap.
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center leading-5">
              Loan = lesser of (ARV &times; {arvLtv}%) and (purchase + rehab). Interest is interest-only.
            </p>
          </div>

          <SaveResultsCTA
            calculatorName="Hard Money Loan Calculator"
            context="hard-money-calculator"
            results={{
              'Loan Amount': formatCurrency(results.loanAmount),
              'Cash to Close': formatCurrency(results.cashToClose),
              'Total Financing Cost': formatCurrency(results.totalFinancingCost),
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
