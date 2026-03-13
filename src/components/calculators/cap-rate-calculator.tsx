'use client'

import { useState, useMemo } from 'react'
import { CalculatorCTA } from '@/components/calculator-cta'

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

function getCapRateRating(rate: number): {
  label: string
  color: string
  description: string
} {
  if (rate === 0) return { label: '', color: '', description: '' }
  if (rate < 4)
    return {
      label: 'Low',
      color: 'text-red-600',
      description:
        'Below average return. Common in high-appreciation markets like SF or NYC. You\'re betting on appreciation, not cash flow.',
    }
  if (rate < 6)
    return {
      label: 'Moderate',
      color: 'text-amber-600',
      description:
        'Typical for stable markets with moderate growth potential. Balanced risk-return profile.',
    }
  if (rate < 8)
    return {
      label: 'Good',
      color: 'text-emerald-600',
      description:
        'Strong return relative to market norms. Common in cash-flow-focused markets in the Midwest and South.',
    }
  if (rate < 10)
    return {
      label: 'Very Good',
      color: 'text-emerald-700',
      description:
        'Above average. Make sure the higher return isn\'t masking higher risk or deferred maintenance.',
    }
  return {
    label: 'Excellent (verify risk)',
    color: 'text-blue-600',
    description:
      'Unusually high. Double-check the numbers — high cap rates can signal higher vacancy, crime, or obsolescence risk.',
  }
}

export function CapRateCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [grossRent, setGrossRent] = useState('')
  const [vacancy, setVacancy] = useState('5')
  const [propertyTax, setPropertyTax] = useState('')
  const [insurance, setInsurance] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [management, setManagement] = useState('')
  const [otherExpenses, setOtherExpenses] = useState('')

  const results = useMemo(() => {
    const price = parseCurrencyInput(purchasePrice)
    const annualGrossRent = parseCurrencyInput(grossRent)
    const vacancyRate = Number(vacancy) / 100
    const effectiveGrossIncome = annualGrossRent * (1 - vacancyRate)

    const totalExpenses =
      parseCurrencyInput(propertyTax) +
      parseCurrencyInput(insurance) +
      parseCurrencyInput(maintenance) +
      parseCurrencyInput(management) +
      parseCurrencyInput(otherExpenses)

    const noi = effectiveGrossIncome - totalExpenses
    const capRate = price > 0 ? (noi / price) * 100 : 0
    const expenseRatio =
      annualGrossRent > 0 ? (totalExpenses / annualGrossRent) * 100 : 0

    return {
      effectiveGrossIncome,
      totalExpenses,
      noi,
      capRate,
      expenseRatio,
      price,
    }
  }, [
    purchasePrice,
    grossRent,
    vacancy,
    propertyTax,
    insurance,
    maintenance,
    management,
    otherExpenses,
  ])

  const rating = getCapRateRating(results.capRate)
  const hasInput = results.price > 0 && results.noi !== 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Input Panel */}
      <div className="lg:col-span-3 space-y-8">
        {/* Property */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Property
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              placeholder="250,000"
              prefix="$"
            />
            <InputField
              label="Annual Gross Rental Income"
              value={grossRent}
              onChange={setGrossRent}
              placeholder="30,000"
              prefix="$"
              hint="Total rent collected per year before any deductions"
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
          <p className="mt-1 text-xs text-text-light">
            Do not include mortgage payments — cap rate measures unlevered
            return.
          </p>
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
              hint="Typically 8-10% of gross rent"
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

      {/* Results Panel */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            Results
          </h2>

          {/* Cap Rate */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Cap Rate</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {results.capRate.toFixed(2)}%
            </p>
            {hasInput && rating.label && (
              <p className={`mt-2 text-sm font-medium ${rating.color}`}>
                {rating.label}
              </p>
            )}
          </div>

          {/* Breakdown */}
          <div className="mt-8 space-y-3 text-sm">
            <ResultRow
              label="Effective Gross Income"
              value={formatCurrency(results.effectiveGrossIncome)}
            />
            <ResultRow
              label="Total Operating Expenses"
              value={`(${formatCurrency(results.totalExpenses)})`}
              negative
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Net Operating Income (NOI)"
                value={formatCurrency(results.noi)}
                bold
              />
            </div>
            <ResultRow
              label="Expense Ratio"
              value={`${results.expenseRatio.toFixed(1)}%`}
            />
          </div>

          {/* Context */}
          {hasInput && rating.description && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {rating.description}
            </div>
          )}

          {/* Formula */}
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              Cap Rate = NOI / Purchase Price &times; 100
            </p>
          </div>

          <CalculatorCTA context="cap-rate-calculator" />
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
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  hint?: string
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9.]/g, '')
    if (raw === '') {
      onChange('')
      return
    }
    const num = Number(raw)
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
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''}`}
        />
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
