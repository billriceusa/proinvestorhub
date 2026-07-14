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

function monthlyPI(loan: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12
  const n = years * 12
  if (loan <= 0 || n <= 0) return 0
  if (r === 0) return loan / n
  return (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
}

// Remaining balance after `months` of payments.
function remainingBalance(balance: number, annualRate: number, payment: number, months: number): number {
  const r = annualRate / 100 / 12
  if (balance <= 0) return 0
  if (r === 0) return Math.max(0, balance - payment * months)
  const bal = balance * Math.pow(1 + r, months) - payment * ((Math.pow(1 + r, months) - 1) / r)
  return Math.max(0, bal)
}

export function SellVsRentCalculator() {
  const [value, setValue] = useState('')
  const [balance, setBalance] = useState('')
  const [rate, setRate] = useState('6.5')
  const [yearsRemaining, setYearsRemaining] = useState('27')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [monthlyExpenses, setMonthlyExpenses] = useState('')
  const [appreciation, setAppreciation] = useState('3')
  const [sellingCostPct, setSellingCostPct] = useState('7')
  const [investReturn, setInvestReturn] = useState('7')
  const [holdYears, setHoldYears] = useState('10')

  useCalculatorState({
    value: setValue,
    balance: setBalance,
    rate: setRate,
    yearsRemaining: setYearsRemaining,
    monthlyRent: setMonthlyRent,
    monthlyExpenses: setMonthlyExpenses,
    appreciation: setAppreciation,
    sellingCostPct: setSellingCostPct,
    investReturn: setInvestReturn,
    holdYears: setHoldYears,
  })

  const r = useMemo(() => {
    const val = parseCurrencyInput(value)
    const bal = parseCurrencyInput(balance)
    const years = Number(holdYears)
    const months = years * 12

    // Hold & rent path
    const pi = monthlyPI(bal, Number(rate), Number(yearsRemaining))
    const rent = parseCurrencyInput(monthlyRent)
    const opEx = parseCurrencyInput(monthlyExpenses)
    const monthlyCashFlow = rent - opEx - pi
    const cumulativeCashFlow = monthlyCashFlow * 12 * years
    const futureValue = val * Math.pow(1 + Number(appreciation) / 100, years)
    const futureBalance = remainingBalance(bal, Number(rate), pi, months)
    const futureEquity = futureValue - futureBalance
    const holdWealth = futureEquity + cumulativeCashFlow

    // Sell & invest path
    const sellingCosts = val * (Number(sellingCostPct) / 100)
    const netProceeds = Math.max(0, val - bal - sellingCosts)
    const sellWealth = netProceeds * Math.pow(1 + Number(investReturn) / 100, years)

    const diff = holdWealth - sellWealth

    return {
      val,
      pi,
      monthlyCashFlow,
      cumulativeCashFlow,
      futureValue,
      futureEquity,
      holdWealth,
      netProceeds,
      sellWealth,
      diff,
      years,
    }
  }, [value, balance, rate, yearsRemaining, monthlyRent, monthlyExpenses, appreciation, sellingCostPct, investReturn, holdYears])

  const hasInput = r.val > 0
  const holdWins = r.diff >= 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            The Property
          </legend>
          <div className="mt-3 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Current Value" value={value} onChange={setValue} placeholder="360,000" prefix="$" />
              <InputField label="Mortgage Balance" value={balance} onChange={setBalance} placeholder="200,000" prefix="$" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Interest Rate (%)" value={rate} onChange={setRate} placeholder="6.5" suffix="%" raw />
              <div>
                <label className="block text-sm font-medium text-text-muted">Years Left on Loan</label>
                <select
                  aria-label="Years Left on Loan"
                  value={yearsRemaining}
                  onChange={(e) => setYearsRemaining(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="29">29</option>
                  <option value="27">27</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            If You Hold &amp; Rent
          </legend>
          <div className="mt-3 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} placeholder="2,400" prefix="$" />
              <InputField
                label="Monthly Expenses (excl. mortgage)"
                value={monthlyExpenses}
                onChange={setMonthlyExpenses}
                placeholder="700"
                prefix="$"
                hint="Taxes, insurance, maintenance, management, vacancy."
              />
            </div>
            <InputField label="Annual Appreciation (%)" value={appreciation} onChange={setAppreciation} placeholder="3" suffix="%" raw />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            If You Sell &amp; Invest
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField label="Selling Costs (%)" value={sellingCostPct} onChange={setSellingCostPct} placeholder="7" suffix="%" raw />
            <InputField
              label="Investment Return (%)"
              value={investReturn}
              onChange={setInvestReturn}
              placeholder="7"
              suffix="%"
              raw
              hint="Return if you invest the proceeds elsewhere."
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">Hold Period</label>
              <select
                aria-label="Hold Period"
                value={holdYears}
                onChange={(e) => setHoldYears(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="5">5 years</option>
                <option value="10">10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            After {r.years} Years
          </h2>

          <CalculatorActions
            calculatorPath="/calculators/sell-vs-rent"
            calculatorName="Sell vs. Rent Calculator"
            params={{
              value,
              balance,
              rate,
              yearsRemaining,
              monthlyRent,
              monthlyExpenses,
              appreciation,
              sellingCostPct,
              investReturn,
              holdYears,
            }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              {hasInput ? (holdWins ? 'Holding wins by' : 'Selling wins by') : 'Net difference'}
            </p>
            <p className={`mt-1 text-4xl font-bold tabular-nums ${holdWins ? 'text-primary' : 'text-accent'}`}>
              {formatCurrency(Math.abs(r.diff))}
            </p>
            {hasInput && (
              <p className={`mt-2 text-sm font-medium ${holdWins ? 'text-emerald-600' : 'text-amber-600'}`}>
                {holdWins ? 'Keep renting it' : 'Sell and reinvest'}
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-center">
            <div className={`rounded-lg p-3 ${holdWins ? 'bg-primary/5 ring-1 ring-primary/20' : 'bg-surface'}`}>
              <p className="text-xs text-text-muted">Hold &amp; Rent</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">{formatCurrency(r.holdWealth)}</p>
            </div>
            <div className={`rounded-lg p-3 ${!holdWins ? 'bg-accent/10 ring-1 ring-accent/30' : 'bg-surface'}`}>
              <p className="text-xs text-text-muted">Sell &amp; Invest</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">{formatCurrency(r.sellWealth)}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow label="Monthly Cash Flow" value={formatCurrency(r.monthlyCashFlow)} />
            <ResultRow label="Cumulative Cash Flow" value={formatCurrency(r.cumulativeCashFlow)} />
            <ResultRow label="Future Equity (hold)" value={formatCurrency(r.futureEquity)} />
            <div className="border-t border-border pt-3">
              <ResultRow label="Net Sale Proceeds Today" value={formatCurrency(r.netProceeds)} />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
            Simplified comparison: includes appreciation, principal paydown, and cash flow, but not
            taxes, rent growth, or depreciation. A 1031 exchange or the tax hit on a sale can swing
            the answer — treat this as a starting point.
          </div>

          <SaveResultsCTA
            calculatorName="Sell vs. Rent Calculator"
            context="sell-vs-rent-calculator"
            results={{
              'Hold & Rent': formatCurrency(r.holdWealth),
              'Sell & Invest': formatCurrency(r.sellWealth),
              Winner: holdWins ? 'Hold & Rent' : 'Sell & Invest',
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
          id={fieldId}
          aria-describedby={hint ? `${fieldId}-hint` : undefined}
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light text-sm">
            {suffix}
          </span>
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}
