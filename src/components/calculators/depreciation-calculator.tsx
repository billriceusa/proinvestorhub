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

export function DepreciationCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [landPercent, setLandPercent] = useState('20')
  const [improvements, setImprovements] = useState('')
  const [propertyClass, setPropertyClass] = useState('residential')
  const [taxRate, setTaxRate] = useState('24')

  useCalculatorState({
    purchasePrice: setPurchasePrice,
    landPercent: setLandPercent,
    improvements: setImprovements,
    propertyClass: setPropertyClass,
    taxRate: setTaxRate,
  })

  const results = useMemo(() => {
    const price = parseCurrencyInput(purchasePrice)
    const landPct = Number(landPercent) / 100
    const landValue = price * landPct
    const improve = parseCurrencyInput(improvements)
    const depreciableBasis = Math.max(0, price - landValue) + improve
    const period = propertyClass === 'commercial' ? 39 : 27.5
    const annualDepreciation = depreciableBasis / period
    const monthlyDepreciation = annualDepreciation / 12
    const taxShield = annualDepreciation * (Number(taxRate) / 100)

    return {
      price,
      landValue,
      depreciableBasis,
      period,
      annualDepreciation,
      monthlyDepreciation,
      taxShield,
    }
  }, [purchasePrice, landPercent, improvements, propertyClass, taxRate])

  const hasInput = results.depreciableBasis > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Property Basis
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              placeholder="300,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Land Value (% of price)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  aria-label="Land Value (% of price)"
                  min="0"
                  max="50"
                  step="1"
                  value={landPercent}
                  onChange={(e) => setLandPercent(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">{landPercent}%</span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                Land can&apos;t be depreciated. Use your county assessor&apos;s land-to-improvement split;
                ~20% is a common default.
                {results.price > 0 && ` ${formatCurrency(results.landValue)} land value.`}
              </p>
            </div>
            <InputField
              label="Capital Improvements Added to Basis"
              value={improvements}
              onChange={setImprovements}
              placeholder="0"
              prefix="$"
              hint="Renovations and improvements that are depreciated with the building."
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Schedule
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text-muted">Property Type</label>
              <select
                aria-label="Property Type"
                value={propertyClass}
                onChange={(e) => setPropertyClass(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="residential">Residential (27.5 yr)</option>
                <option value="commercial">Commercial (39 yr)</option>
              </select>
            </div>
            <InputField
              label="Marginal Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
              placeholder="24"
              suffix="%"
              raw
            />
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">Results</h2>

          <CalculatorActions
            calculatorPath="/calculators/depreciation"
            calculatorName="Depreciation Calculator"
            params={{ purchasePrice, landPercent, improvements, propertyClass, taxRate }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Annual Depreciation</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {formatCurrency(results.annualDepreciation)}
            </p>
            {hasInput && (
              <p className="mt-2 text-sm font-medium text-emerald-600">
                ~{formatCurrency(results.taxShield)}/yr tax shield
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Monthly</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.monthlyDepreciation)}
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Schedule</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">{results.period} yr</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow label="Purchase Price" value={formatCurrency(results.price)} />
            <ResultRow
              label="Less: Land Value"
              value={`(${formatCurrency(results.landValue)})`}
              negative
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Depreciable Basis"
                value={formatCurrency(results.depreciableBasis)}
                bold
              />
            </div>
            <ResultRow
              label="Est. Annual Tax Savings"
              value={formatCurrency(results.taxShield)}
            />
          </div>

          {hasInput && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              Depreciation is a paper deduction that shelters rental income. The IRS recaptures it
              (taxed up to 25%) when you sell — unless you defer with a 1031 exchange. This is an
              estimate; confirm your land split and basis with a tax professional.
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              Annual Depreciation = Depreciable Basis &divide; {results.period}
            </p>
          </div>

          <SaveResultsCTA
            calculatorName="Depreciation Calculator"
            context="depreciation-calculator"
            results={{
              'Annual Depreciation': formatCurrency(results.annualDepreciation),
              'Depreciable Basis': formatCurrency(results.depreciableBasis),
              'Est. Annual Tax Savings': formatCurrency(results.taxShield),
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
      <span className={bold ? 'font-semibold text-text' : 'text-text-muted'}>{label}</span>
      <span className={`tabular-nums ${bold ? 'font-semibold text-text' : ''} ${negative ? 'text-red-500' : ''}`}>
        {value}
      </span>
    </div>
  )
}
