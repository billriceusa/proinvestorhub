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

function getTaxSavingsRating(savingsPercent: number): {
  label: string
  color: string
  description: string
} {
  if (savingsPercent === 0) return { label: '', color: '', description: '' }
  if (savingsPercent < 5)
    return {
      label: 'Modest Savings',
      color: 'text-amber-600',
      description:
        'The tax deferral is relatively small. A 1031 exchange may still make sense if you plan to continue deferring through future exchanges.',
    }
  if (savingsPercent < 10)
    return {
      label: 'Significant Savings',
      color: 'text-emerald-600',
      description:
        'A meaningful amount of capital stays invested and working for you. The exchange costs are likely well worth it.',
    }
  if (savingsPercent < 20)
    return {
      label: 'Substantial Savings',
      color: 'text-emerald-700',
      description:
        'You\'re deferring a large tax bill. This additional equity could significantly boost your next property\'s cash flow and returns.',
    }
  return {
    label: 'Major Tax Deferral',
    color: 'text-blue-600',
    description:
      'Exceptional tax savings — likely due to significant appreciation or depreciation recapture. A 1031 exchange is a powerful move here.',
  }
}

type CapGainsOption = '15' | '20' | 'custom'

export function Exchange1031Calculator() {
  const [salePrice, setSalePrice] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState('')
  const [sellingCostsPercent, setSellingCostsPercent] = useState('6')
  const [sellingCostsMode, setSellingCostsMode] = useState<'percent' | 'dollar'>('percent')
  const [sellingCostsDollar, setSellingCostsDollar] = useState('')
  const [capGainsOption, setCapGainsOption] = useState<CapGainsOption>('15')
  const [customCapGainsRate, setCustomCapGainsRate] = useState('')
  const [stateTaxRate, setStateTaxRate] = useState('5')
  const [replacementPrice, setReplacementPrice] = useState('')

  const results = useMemo(() => {
    const sale = parseCurrencyInput(salePrice)
    const purchase = parseCurrencyInput(purchasePrice)
    const depreciation = parseCurrencyInput(accumulatedDepreciation)
    const replacement = parseCurrencyInput(replacementPrice)

    const sellingCosts =
      sellingCostsMode === 'percent'
        ? sale * (Number(sellingCostsPercent) / 100)
        : parseCurrencyInput(sellingCostsDollar)

    const capGainsRate =
      capGainsOption === 'custom'
        ? Number(customCapGainsRate) / 100
        : Number(capGainsOption) / 100
    const depreciationRecaptureRate = 0.25
    const stateRate = Number(stateTaxRate) / 100

    const adjustedCostBasis = purchase - depreciation
    const capitalGain = sale - sellingCosts - adjustedCostBasis
    const netAppreciation = Math.max(capitalGain - depreciation, 0)

    const depreciationRecaptureTax = depreciation * depreciationRecaptureRate
    const capitalGainsTax = netAppreciation * capGainsRate
    const stateTax = Math.max(capitalGain, 0) * stateRate

    const totalTaxWithout = Math.max(
      depreciationRecaptureTax + capitalGainsTax + stateTax,
      0
    )

    // Boot calculation: if replacement < net sale proceeds, partial tax
    const netSaleProceeds = sale - sellingCosts
    const boot = Math.max(netSaleProceeds - replacement, 0)
    const bootRatio = netSaleProceeds > 0 ? boot / netSaleProceeds : 0
    const totalTaxWith = boot > 0 ? totalTaxWithout * bootRatio : 0

    const taxSavings = totalTaxWithout - totalTaxWith
    const savingsPercent = sale > 0 ? (taxSavings / sale) * 100 : 0

    return {
      sale,
      purchase,
      depreciation,
      replacement,
      sellingCosts,
      adjustedCostBasis,
      capitalGain,
      netAppreciation,
      depreciationRecaptureTax,
      capitalGainsTax,
      stateTax,
      totalTaxWithout,
      totalTaxWith,
      taxSavings,
      savingsPercent,
      boot,
      netSaleProceeds,
    }
  }, [
    salePrice,
    purchasePrice,
    accumulatedDepreciation,
    sellingCostsPercent,
    sellingCostsMode,
    sellingCostsDollar,
    capGainsOption,
    customCapGainsRate,
    stateTaxRate,
    replacementPrice,
  ])

  const rating = getTaxSavingsRating(results.savingsPercent)
  const hasInput = results.sale > 0 && results.purchase > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Input Panel */}
      <div className="lg:col-span-3 space-y-8">
        {/* Property Sale */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Property Being Sold
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Sale Price"
              value={salePrice}
              onChange={setSalePrice}
              placeholder="500,000"
              prefix="$"
              hint="The price you expect to sell for"
            />
            <InputField
              label="Original Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              placeholder="300,000"
              prefix="$"
              hint="What you originally paid for the property (cost basis)"
            />
            <InputField
              label="Accumulated Depreciation"
              value={accumulatedDepreciation}
              onChange={setAccumulatedDepreciation}
              placeholder="50,000"
              prefix="$"
              hint="Total depreciation claimed since purchase"
            />
            {/* Selling Costs */}
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Selling Costs
              </label>
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSellingCostsMode('percent')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    sellingCostsMode === 'percent'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-muted hover:bg-surface/80'
                  }`}
                >
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() => setSellingCostsMode('dollar')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    sellingCostsMode === 'dollar'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-muted hover:bg-surface/80'
                  }`}
                >
                  Dollar Amount
                </button>
              </div>
              {sellingCostsMode === 'percent' ? (
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={sellingCostsPercent}
                    onChange={(e) => setSellingCostsPercent(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-12 text-right text-sm font-medium text-text">
                    {sellingCostsPercent}%
                  </span>
                </div>
              ) : (
                <div className="mt-2">
                  <InputField
                    label=""
                    value={sellingCostsDollar}
                    onChange={setSellingCostsDollar}
                    placeholder="30,000"
                    prefix="$"
                  />
                </div>
              )}
              <p className="mt-1 text-xs text-text-light">
                Agent commissions, closing costs, title fees (typically 5-8%)
              </p>
            </div>
          </div>
        </fieldset>

        {/* Tax Rates */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Tax Rates
          </legend>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Federal Capital Gains Rate
              </label>
              <div className="mt-1 flex gap-2">
                {(['15', '20'] as const).map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setCapGainsOption(rate)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      capGainsOption === rate
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-muted hover:bg-surface/80'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCapGainsOption('custom')}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    capGainsOption === 'custom'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-muted hover:bg-surface/80'
                  }`}
                >
                  Custom
                </button>
              </div>
              {capGainsOption === 'custom' && (
                <div className="mt-2 w-32">
                  <InputField
                    label=""
                    value={customCapGainsRate}
                    onChange={setCustomCapGainsRate}
                    placeholder="23.8"
                    suffix="%"
                  />
                </div>
              )}
              <p className="mt-1 text-xs text-text-light">
                15% for most investors. 20% for high earners ($492K+ single / $553K+ married).
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Depreciation Recapture Rate
              </label>
              <div className="mt-1 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-muted">
                25% (fixed by IRS)
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">
                State Tax Rate
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="13"
                  step="0.5"
                  value={stateTaxRate}
                  onChange={(e) => setStateTaxRate(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {stateTaxRate}%
                </span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                0% in FL, TX, NV, WA. Up to 13.3% in CA.
              </p>
            </div>
          </div>
        </fieldset>

        {/* Replacement Property */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Replacement Property
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Replacement Property Price"
              value={replacementPrice}
              onChange={setReplacementPrice}
              placeholder="600,000"
              prefix="$"
              hint="Must be equal or greater than sale price to defer all taxes"
            />
          </div>
        </fieldset>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            Tax Savings
          </h2>

          {/* Big Number */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Total Tax Deferred</p>
            <p className="mt-1 text-5xl font-bold text-emerald-600 tabular-nums">
              {formatCurrency(results.taxSavings)}
            </p>
            {hasInput && rating.label && (
              <p className={`mt-2 text-sm font-medium ${rating.color}`}>
                {rating.label}
              </p>
            )}
          </div>

          {/* Comparison */}
          {hasInput && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <p className="text-xs text-red-600 font-medium">Without 1031</p>
                <p className="mt-1 text-lg font-bold text-red-700 tabular-nums">
                  {formatCurrency(results.totalTaxWithout)}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3 text-center">
                <p className="text-xs text-emerald-600 font-medium">With 1031</p>
                <p className="mt-1 text-lg font-bold text-emerald-700 tabular-nums">
                  {formatCurrency(results.totalTaxWith)}
                </p>
              </div>
            </div>
          )}

          {/* Breakdown */}
          <div className="mt-6 space-y-3 text-sm">
            <ResultRow
              label="Adjusted Cost Basis"
              value={formatCurrency(results.adjustedCostBasis)}
            />
            <ResultRow
              label="Capital Gain"
              value={formatCurrency(results.capitalGain)}
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Depreciation Recapture (25%)"
                value={formatCurrency(results.depreciationRecaptureTax)}
                negative
              />
              <div className="mt-2">
                <ResultRow
                  label="Capital Gains Tax"
                  value={formatCurrency(results.capitalGainsTax)}
                  negative
                />
              </div>
              <div className="mt-2">
                <ResultRow
                  label="State Tax"
                  value={formatCurrency(results.stateTax)}
                  negative
                />
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Total Tax Liability"
                value={formatCurrency(results.totalTaxWithout)}
                bold
              />
            </div>
            {hasInput && (
              <ResultRow
                label="Additional Equity to Reinvest"
                value={formatCurrency(results.taxSavings)}
                bold
              />
            )}
          </div>

          {/* Boot Warning */}
          {hasInput && results.boot > 0 && (
            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs font-semibold text-amber-800">Boot Detected</p>
              <p className="mt-1 text-xs text-amber-700 leading-relaxed">
                Your replacement property ({formatCurrency(results.replacement)}) is
                less than your net sale proceeds ({formatCurrency(results.netSaleProceeds)}).
                The {formatCurrency(results.boot)} difference is taxable
                &ldquo;boot.&rdquo; To defer all taxes, buy a property equal to or
                greater than the sale price.
              </p>
            </div>
          )}

          {/* Context */}
          {hasInput && rating.description && (
            <div className="mt-4 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {rating.description}
            </div>
          )}

          {/* Formula */}
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              Tax Deferred = Depreciation Recapture + Capital Gains + State Tax
            </p>
          </div>

          <CalculatorCTA context="1031-exchange-calculator" />
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
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
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
      {label && (
        <label className="block text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <div className={`${label ? 'mt-1' : ''} relative`}>
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
