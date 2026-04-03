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

function getReturnRating(rate: number): {
  label: string
  color: string
  description: string
} {
  if (rate === 0) return { label: '', color: '', description: '' }
  if (rate < 0)
    return {
      label: 'Negative',
      color: 'text-red-600',
      description:
        'You\'re losing money on cash invested. Review expenses, rent, or consider a higher down payment to reduce debt service.',
    }
  if (rate < 6)
    return {
      label: 'Below Average',
      color: 'text-amber-600',
      description:
        'Below the typical 8-12% target. Could still work if you expect strong appreciation or rent growth.',
    }
  if (rate < 10)
    return {
      label: 'Solid',
      color: 'text-emerald-600',
      description:
        'A healthy return on your invested cash. You\'re generating meaningful cash flow relative to your out-of-pocket investment.',
    }
  if (rate < 15)
    return {
      label: 'Strong',
      color: 'text-emerald-700',
      description:
        'Above average. Your leverage is working well — the property is generating strong cash flow relative to your down payment.',
    }
  return {
    label: 'Exceptional',
    color: 'text-blue-600',
    description:
      'Very high return. Verify the numbers — this may indicate a great deal, or optimistic assumptions on rent/expenses.',
  }
}

export function CashOnCashCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [downPaymentPercent, setDownPaymentPercent] = useState('25')
  const [closingCosts, setClosingCosts] = useState('')
  const [rehabCosts, setRehabCosts] = useState('')
  const [interestRate, setInterestRate] = useState('7.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [vacancy, setVacancy] = useState('5')
  const [propertyTax, setPropertyTax] = useState('')
  const [insurance, setInsurance] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [management, setManagement] = useState('')
  const [otherExpenses, setOtherExpenses] = useState('')

  useCalculatorState({
    purchasePrice: setPurchasePrice,
    downPaymentPercent: setDownPaymentPercent,
    closingCosts: setClosingCosts,
    rehabCosts: setRehabCosts,
    interestRate: setInterestRate,
    loanTerm: setLoanTerm,
    monthlyRent: setMonthlyRent,
    vacancy: setVacancy,
    propertyTax: setPropertyTax,
    insurance: setInsurance,
    maintenance: setMaintenance,
    management: setManagement,
    otherExpenses: setOtherExpenses,
  })

  const results = useMemo(() => {
    const price = parseCurrencyInput(purchasePrice)
    const dpPercent = Number(downPaymentPercent) / 100
    const downPayment = price * dpPercent
    const loanAmount = price - downPayment
    const closing = parseCurrencyInput(closingCosts)
    const rehab = parseCurrencyInput(rehabCosts)
    const totalCashInvested = downPayment + closing + rehab

    const monthlyRate = Number(interestRate) / 100 / 12
    const totalPayments = Number(loanTerm) * 12
    let monthlyMortgage = 0
    if (loanAmount > 0 && monthlyRate > 0 && totalPayments > 0) {
      monthlyMortgage =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
    }
    const annualDebtService = monthlyMortgage * 12

    const rent = parseCurrencyInput(monthlyRent)
    const annualGrossRent = rent * 12
    const vacancyRate = Number(vacancy) / 100
    const effectiveGrossIncome = annualGrossRent * (1 - vacancyRate)

    const totalOperatingExpenses =
      parseCurrencyInput(propertyTax) +
      parseCurrencyInput(insurance) +
      parseCurrencyInput(maintenance) +
      parseCurrencyInput(management) +
      parseCurrencyInput(otherExpenses)

    const noi = effectiveGrossIncome - totalOperatingExpenses
    const annualCashFlow = noi - annualDebtService
    const monthlyCashFlow = annualCashFlow / 12
    const cashOnCash =
      totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0

    return {
      downPayment,
      loanAmount,
      totalCashInvested,
      monthlyMortgage,
      annualDebtService,
      effectiveGrossIncome,
      totalOperatingExpenses,
      noi,
      annualCashFlow,
      monthlyCashFlow,
      cashOnCash,
      price,
    }
  }, [
    purchasePrice,
    downPaymentPercent,
    closingCosts,
    rehabCosts,
    interestRate,
    loanTerm,
    monthlyRent,
    vacancy,
    propertyTax,
    insurance,
    maintenance,
    management,
    otherExpenses,
  ])

  const rating = getReturnRating(results.cashOnCash)
  const hasInput = results.price > 0 && results.totalCashInvested > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        {/* Purchase & Financing */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Purchase & Financing
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              placeholder="250,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Down Payment
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {downPaymentPercent}%
                </span>
              </div>
              {parseCurrencyInput(purchasePrice) > 0 && (
                <p className="mt-1 text-xs text-text-light">
                  {formatCurrency(results.downPayment)} down &middot;{' '}
                  {formatCurrency(results.loanAmount)} loan
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Interest Rate (%)"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="7.5"
                suffix="%"
                raw
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Loan Term
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Closing Costs"
                value={closingCosts}
                onChange={setClosingCosts}
                placeholder="5,000"
                prefix="$"
              />
              <InputField
                label="Rehab / Renovation"
                value={rehabCosts}
                onChange={setRehabCosts}
                placeholder="0"
                prefix="$"
              />
            </div>
          </div>
        </fieldset>

        {/* Income */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Rental Income
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Monthly Rent"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="2,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Vacancy Rate
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={vacancy}
                  onChange={(e) => setVacancy(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {vacancy}%
                </span>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Operating Expenses */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Annual Operating Expenses
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField
              label="Property Taxes"
              value={propertyTax}
              onChange={setPropertyTax}
              placeholder="3,000"
              prefix="$"
            />
            <InputField
              label="Insurance"
              value={insurance}
              onChange={setInsurance}
              placeholder="1,500"
              prefix="$"
            />
            <InputField
              label="Maintenance & Repairs"
              value={maintenance}
              onChange={setMaintenance}
              placeholder="2,000"
              prefix="$"
            />
            <InputField
              label="Property Management"
              value={management}
              onChange={setManagement}
              placeholder="2,400"
              prefix="$"
            />
            <InputField
              label="Other (HOA, Utilities, etc.)"
              value={otherExpenses}
              onChange={setOtherExpenses}
              placeholder="0"
              prefix="$"
            />
          </div>
        </fieldset>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            Results
          </h2>

          <CalculatorActions
            calculatorPath="/calculators/cash-on-cash"
            calculatorName="Cash-on-Cash Calculator"
            params={{
              purchasePrice,
              downPaymentPercent,
              closingCosts,
              rehabCosts,
              interestRate,
              loanTerm,
              monthlyRent,
              vacancy,
              propertyTax,
              insurance,
              maintenance,
              management,
              otherExpenses,
            }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Cash-on-Cash Return</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {results.cashOnCash.toFixed(2)}%
            </p>
            {hasInput && rating.label && (
              <p className={`mt-2 text-sm font-medium ${rating.color}`}>
                {rating.label}
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Monthly Cash Flow</p>
              <p
                className={`mt-1 text-lg font-bold tabular-nums ${results.monthlyCashFlow < 0 ? 'text-red-600' : 'text-text'}`}
              >
                {formatCurrency(results.monthlyCashFlow)}
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Annual Cash Flow</p>
              <p
                className={`mt-1 text-lg font-bold tabular-nums ${results.annualCashFlow < 0 ? 'text-red-600' : 'text-text'}`}
              >
                {formatCurrency(results.annualCashFlow)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow
              label="Total Cash Invested"
              value={formatCurrency(results.totalCashInvested)}
            />
            <ResultRow
              label="Effective Gross Income"
              value={formatCurrency(results.effectiveGrossIncome)}
            />
            <ResultRow
              label="Operating Expenses"
              value={`(${formatCurrency(results.totalOperatingExpenses)})`}
              negative
            />
            <ResultRow
              label="NOI"
              value={formatCurrency(results.noi)}
              bold
            />
            <ResultRow
              label="Annual Debt Service"
              value={`(${formatCurrency(results.annualDebtService)})`}
              negative
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Annual Cash Flow"
                value={formatCurrency(results.annualCashFlow)}
                bold
              />
            </div>
          </div>

          {hasInput && rating.description && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {rating.description}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              CoC Return = Annual Cash Flow / Total Cash Invested &times; 100
            </p>
          </div>

          <SaveResultsCTA
            calculatorName="Cash-on-Cash Calculator"
            context="cash-on-cash-calculator"
            results={{
              'Cash-on-Cash Return': `${results.cashOnCash.toFixed(2)}%`,
              'Monthly Cash Flow': formatCurrency(results.monthlyCashFlow),
              'Annual Cash Flow': formatCurrency(results.annualCashFlow),
              'NOI': formatCurrency(results.noi),
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

  return (
    <div>
      <label className="block text-sm font-medium text-text-muted">
        {label}
      </label>
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
  negative,
}: {
  label: string
  value: string
  bold?: boolean
  negative?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className={bold ? 'font-semibold text-text' : 'text-text-muted'}>
        {label}
      </span>
      <span
        className={`tabular-nums ${bold ? 'font-semibold text-text' : ''} ${negative ? 'text-red-500' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}
