'use client'

import { useState, useMemo } from 'react'
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

function monthlyPI(loan: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12
  const n = years * 12
  if (loan <= 0 || n <= 0) return 0
  if (r === 0) return loan / n
  return (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
}

type Mode = 'rate-term' | 'cash-out'

type RefiResult = {
  currentPI?: number
  newPI?: number
  monthlySavings?: number
  breakEven?: number
  interestDelta?: number
  balance?: number
  value?: number
  maxNewLoan?: number
  grossCashOut?: number
  netCash?: number
  paymentDelta?: number
  newLtv?: number
}

export function RefinanceCalculator() {
  const [mode, setMode] = useState<Mode>('rate-term')

  // Shared
  const [currentBalance, setCurrentBalance] = useState('')
  const [currentRate, setCurrentRate] = useState('7.5')
  const [newRate, setNewRate] = useState('6.5')
  const [newTerm, setNewTerm] = useState('30')
  const [closingCosts, setClosingCosts] = useState('')

  // Rate-and-term
  const [remainingTerm, setRemainingTerm] = useState('27')

  // Cash-out
  const [propertyValue, setPropertyValue] = useState('')
  const [maxLtv, setMaxLtv] = useState('75')

  useCalculatorState({
    mode: (v: string) => setMode(v === 'cash-out' ? 'cash-out' : 'rate-term'),
    currentBalance: setCurrentBalance,
    currentRate: setCurrentRate,
    newRate: setNewRate,
    newTerm: setNewTerm,
    closingCosts: setClosingCosts,
    remainingTerm: setRemainingTerm,
    propertyValue: setPropertyValue,
    maxLtv: setMaxLtv,
  })

  const r = useMemo<RefiResult>(() => {
    const balance = parseCurrencyInput(currentBalance)
    const closing = parseCurrencyInput(closingCosts)
    const nRate = Number(newRate)
    const nTerm = Number(newTerm)

    if (mode === 'rate-term') {
      const remYears = Number(remainingTerm)
      const currentPI = monthlyPI(balance, Number(currentRate), remYears)
      const newPI = monthlyPI(balance, nRate, nTerm)
      const monthlySavings = currentPI - newPI
      const breakEven = monthlySavings > 0 ? closing / monthlySavings : 0
      const interestCurrent = currentPI * remYears * 12 - balance
      const interestNew = newPI * nTerm * 12 - balance
      const interestDelta = interestCurrent - interestNew
      return { currentPI, newPI, monthlySavings, breakEven, interestDelta, balance }
    }

    // cash-out
    const value = parseCurrencyInput(propertyValue)
    const ltv = Number(maxLtv) / 100
    const maxNewLoan = value * ltv
    const grossCashOut = Math.max(0, maxNewLoan - balance)
    const netCash = Math.max(0, grossCashOut - closing)
    const newPI = monthlyPI(maxNewLoan, nRate, nTerm)
    const currentPI = monthlyPI(balance, Number(currentRate), Number(remainingTerm))
    const paymentDelta = newPI - currentPI
    const newLtv = value > 0 ? (maxNewLoan / value) * 100 : 0
    return { value, maxNewLoan, grossCashOut, netCash, newPI, currentPI, paymentDelta, newLtv, balance }
  }, [mode, currentBalance, currentRate, newRate, newTerm, closingCosts, remainingTerm, propertyValue, maxLtv])

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        {/* Mode toggle */}
        <div className="inline-flex rounded-lg border border-border bg-surface p-1">
          {([
            { key: 'rate-term' as const, label: 'Rate & Term' },
            { key: 'cash-out' as const, label: 'Cash-Out' },
          ]).map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                mode === m.key ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="-mt-4 text-sm text-text-muted">
          {mode === 'rate-term'
            ? 'Lower your rate or change your term. See the monthly savings and how long it takes to recoup closing costs.'
            : 'Pull equity out of a property you own. See your net cash and the new payment.'}
        </p>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Current Loan
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Current Loan Balance"
              value={currentBalance}
              onChange={setCurrentBalance}
              placeholder="240,000"
              prefix="$"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Current Rate (%)"
                value={currentRate}
                onChange={setCurrentRate}
                placeholder="7.5"
                suffix="%"
                raw
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Years Remaining
                </label>
                <select
                  value={remainingTerm}
                  onChange={(e) => setRemainingTerm(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="29">29</option>
                  <option value="27">27</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="15">15</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        {mode === 'cash-out' && (
          <fieldset>
            <legend className="text-sm font-semibold text-text uppercase tracking-wide">
              Property
            </legend>
            <div className="mt-3 space-y-4">
              <InputField
                label="Current Property Value"
                value={propertyValue}
                onChange={setPropertyValue}
                placeholder="360,000"
                prefix="$"
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Max Cash-Out LTV
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range"
                    min="50"
                    max="80"
                    step="1"
                    value={maxLtv}
                    onChange={(e) => setMaxLtv(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-12 text-right text-sm font-medium text-text">{maxLtv}%</span>
                </div>
                <p className="mt-1 text-xs text-text-light">
                  Investment-property cash-out is usually capped at 70–75%.
                </p>
              </div>
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            New Loan
          </legend>
          <div className="mt-3 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="New Rate (%)"
                value={newRate}
                onChange={setNewRate}
                placeholder="6.5"
                suffix="%"
                raw
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">New Term</label>
                <select
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="30">30 years</option>
                  <option value="25">25 years</option>
                  <option value="20">20 years</option>
                  <option value="15">15 years</option>
                </select>
              </div>
            </div>
            <InputField
              label="Closing Costs"
              value={closingCosts}
              onChange={setClosingCosts}
              placeholder="6,000"
              prefix="$"
              hint="Refinance costs — appraisal, title, origination, etc."
            />
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">Results</h2>

          <CalculatorActions
            calculatorPath="/calculators/refinance"
            calculatorName="Refinance Calculator"
            params={{
              mode,
              currentBalance,
              currentRate,
              newRate,
              newTerm,
              closingCosts,
              remainingTerm,
              propertyValue,
              maxLtv,
            }}
          />

          {mode === 'rate-term' ? (
            <RateTermResults r={r} />
          ) : (
            <CashOutResults r={r} ltv={maxLtv} />
          )}

          <SaveResultsCTA
            calculatorName="Refinance Calculator"
            context="refinance-calculator"
            results={
              mode === 'rate-term'
                ? {
                    'Monthly Savings': formatCurrency(r.monthlySavings ?? 0),
                    'Break-Even': r.breakEven ? `${Math.ceil(r.breakEven)} months` : '—',
                    'Lifetime Interest Saved': formatCurrency(r.interestDelta ?? 0),
                  }
                : {
                    'Net Cash Out': formatCurrency(r.netCash ?? 0),
                    'New Monthly Payment': formatCurrency(r.newPI ?? 0),
                    'New LTV': `${(r.newLtv ?? 0).toFixed(0)}%`,
                  }
            }
          />
        </div>
      </div>
    </div>
  )
}

function RateTermResults({ r }: { r: RefiResult }) {
  const savings = r.monthlySavings ?? 0
  const hasInput = (r.balance ?? 0) > 0 && (r.currentPI ?? 0) > 0
  const positive = savings > 0
  return (
    <>
      <div className="mt-6 text-center">
        <p className="text-sm text-text-muted">Monthly Savings</p>
        <p className={`mt-1 text-5xl font-bold tabular-nums ${positive ? 'text-primary' : 'text-red-600'}`}>
          {formatCurrency(savings)}
        </p>
        {hasInput && (
          <p className={`mt-2 text-sm font-medium ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
            {positive
              ? r.breakEven
                ? `Break even in ${Math.ceil(r.breakEven)} months`
                : 'Lower payment from day one'
              : 'No monthly savings at these terms'}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <ResultRow label="Current Payment (P&I)" value={formatCurrency(r.currentPI ?? 0)} />
        <ResultRow label="New Payment (P&I)" value={formatCurrency(r.newPI ?? 0)} />
        <div className="border-t border-border pt-3">
          <ResultRow label="Monthly Savings" value={formatCurrency(savings)} bold />
        </div>
        <ResultRow
          label="Lifetime Interest Saved"
          value={formatCurrency(r.interestDelta ?? 0)}
        />
      </div>

      {hasInput && !positive && (
        <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
          The new payment isn&apos;t lower at these terms — often because the new term resets the clock.
          A rate-and-term refinance usually only pencils when the new rate is meaningfully below your
          current one.
        </div>
      )}

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-xs text-text-light text-center">
          Break-even = Closing Costs &divide; Monthly Savings
        </p>
      </div>
    </>
  )
}

function CashOutResults({ r, ltv }: { r: RefiResult; ltv: string }) {
  const hasInput = (r.value ?? 0) > 0 && (r.balance ?? 0) >= 0
  const canPull = (r.grossCashOut ?? 0) > 0
  return (
    <>
      <div className="mt-6 text-center">
        <p className="text-sm text-text-muted">Net Cash Out</p>
        <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
          {formatCurrency(r.netCash ?? 0)}
        </p>
        {hasInput && (
          <p className={`mt-2 text-sm font-medium ${canPull ? 'text-emerald-600' : 'text-amber-600'}`}>
            {canPull ? `New LTV ${(r.newLtv ?? 0).toFixed(0)}%` : 'No equity to pull at this LTV'}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <ResultRow label={`Max New Loan @ ${ltv}%`} value={formatCurrency(r.maxNewLoan ?? 0)} />
        <ResultRow label="Less: Current Balance" value={`(${formatCurrency(r.balance ?? 0)})`} />
        <ResultRow label="Gross Cash Out" value={formatCurrency(r.grossCashOut ?? 0)} />
        <div className="border-t border-border pt-3">
          <ResultRow label="Net Cash (after costs)" value={formatCurrency(r.netCash ?? 0)} bold />
        </div>
        <ResultRow label="New Payment (P&I)" value={formatCurrency(r.newPI ?? 0)} />
        <ResultRow
          label="Payment Change"
          value={`${(r.paymentDelta ?? 0) >= 0 ? '+' : ''}${formatCurrency(r.paymentDelta ?? 0)}`}
        />
      </div>

      {hasInput && !canPull && (
        <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
          At {ltv}% LTV your current balance already meets the cap, so there&apos;s no cash to pull. Pay
          down the loan or wait for appreciation — or look at a HELOC for a smaller draw.
        </div>
      )}

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-xs text-text-light text-center">
          Net Cash = (Value &times; LTV) &minus; Balance &minus; Closing Costs
        </p>
      </div>
    </>
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

  return (
    <div>
      <label className="block text-sm font-medium text-text-muted">{label}</label>
      <div className="mt-1 relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-sm">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light text-sm">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-text-light">{hint}</p>}
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
