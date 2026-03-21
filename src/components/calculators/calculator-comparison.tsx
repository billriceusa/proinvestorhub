'use client'

import { useState, useMemo } from 'react'

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

type CalculatorType = 'cap-rate' | 'cash-on-cash' | 'rental-cashflow'

const CALCULATOR_OPTIONS: { key: CalculatorType; label: string }[] = [
  { key: 'cap-rate', label: 'Cap Rate' },
  { key: 'cash-on-cash', label: 'Cash-on-Cash Return' },
  { key: 'rental-cashflow', label: 'Rental Cash Flow' },
]

interface DealInputs {
  label: string
  purchasePrice: string
  grossRent: string
  vacancy: string
  propertyTax: string
  insurance: string
  maintenance: string
  management: string
  otherExpenses: string
  // Cash-on-Cash additional
  downPaymentPercent: string
  interestRate: string
  loanTerm: string
  closingCosts: string
}

function defaultInputs(label: string): DealInputs {
  return {
    label,
    purchasePrice: '',
    grossRent: '',
    vacancy: '5',
    propertyTax: '',
    insurance: '',
    maintenance: '',
    management: '',
    otherExpenses: '',
    downPaymentPercent: '25',
    interestRate: '7',
    loanTerm: '30',
    closingCosts: '',
  }
}

function calculateResults(inputs: DealInputs, type: CalculatorType) {
  const price = parseCurrencyInput(inputs.purchasePrice)
  const annualRent = parseCurrencyInput(inputs.grossRent)
  const vacancyRate = Number(inputs.vacancy) / 100
  const egi = annualRent * (1 - vacancyRate)

  const expenses =
    parseCurrencyInput(inputs.propertyTax) +
    parseCurrencyInput(inputs.insurance) +
    parseCurrencyInput(inputs.maintenance) +
    parseCurrencyInput(inputs.management) +
    parseCurrencyInput(inputs.otherExpenses)

  const noi = egi - expenses
  const capRate = price > 0 ? (noi / price) * 100 : 0

  if (type === 'cap-rate') {
    return { capRate, noi, egi, expenses, price }
  }

  // Cash-on-Cash / Rental Cash Flow
  const downPct = Number(inputs.downPaymentPercent) / 100
  const downPayment = price * downPct
  const closing = parseCurrencyInput(inputs.closingCosts)
  const totalCashInvested = downPayment + closing
  const loanAmount = price - downPayment
  const rate = Number(inputs.interestRate) / 100 / 12
  const term = (Number(inputs.loanTerm) || 30) * 12

  let monthlyPayment = 0
  if (loanAmount > 0 && rate > 0 && term > 0) {
    monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
  }

  const annualDebtService = monthlyPayment * 12
  const annualCashFlow = noi - annualDebtService
  const monthlyCashFlow = annualCashFlow / 12
  const coc = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0

  return {
    capRate,
    noi,
    egi,
    expenses,
    price,
    totalCashInvested,
    annualDebtService,
    annualCashFlow,
    monthlyCashFlow,
    coc,
    loanAmount,
    monthlyPayment,
  }
}

export function CalculatorComparison() {
  const [calcType, setCalcType] = useState<CalculatorType>('cap-rate')
  const [dealA, setDealA] = useState<DealInputs>(defaultInputs('Deal A'))
  const [dealB, setDealB] = useState<DealInputs>(defaultInputs('Deal B'))

  const resultsA = useMemo(() => calculateResults(dealA, calcType), [dealA, calcType])
  const resultsB = useMemo(() => calculateResults(dealB, calcType), [dealB, calcType])

  const hasResults = resultsA.price > 0 && resultsB.price > 0

  return (
    <div>
      {/* Calculator Type Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CALCULATOR_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setCalcType(opt.key)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              calcType === opt.key
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-text-muted hover:bg-surface'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Comparison Summary */}
      {hasResults && (
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
            Comparison Summary
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ComparisonMetric
              label={calcType === 'cap-rate' ? 'Cap Rate' : calcType === 'cash-on-cash' ? 'Cash-on-Cash' : 'Monthly Cash Flow'}
              valueA={
                calcType === 'rental-cashflow'
                  ? formatCurrency((resultsA as { monthlyCashFlow?: number }).monthlyCashFlow ?? 0)
                  : `${(calcType === 'cash-on-cash' ? (resultsA as { coc?: number }).coc ?? 0 : resultsA.capRate).toFixed(2)}%`
              }
              valueB={
                calcType === 'rental-cashflow'
                  ? formatCurrency((resultsB as { monthlyCashFlow?: number }).monthlyCashFlow ?? 0)
                  : `${(calcType === 'cash-on-cash' ? (resultsB as { coc?: number }).coc ?? 0 : resultsB.capRate).toFixed(2)}%`
              }
            />
            <ComparisonMetric
              label="NOI"
              valueA={formatCurrency(resultsA.noi)}
              valueB={formatCurrency(resultsB.noi)}
            />
            <ComparisonMetric
              label="Purchase Price"
              valueA={formatCurrency(resultsA.price)}
              valueB={formatCurrency(resultsB.price)}
            />
          </div>
        </div>
      )}

      {/* Side-by-Side Inputs */}
      <div className="grid gap-8 lg:grid-cols-2">
        <DealPanel
          deal={dealA}
          onChange={setDealA}
          results={resultsA}
          calcType={calcType}
          color="primary"
        />
        <DealPanel
          deal={dealB}
          onChange={setDealB}
          results={resultsB}
          calcType={calcType}
          color="accent"
        />
      </div>
    </div>
  )
}

function ComparisonMetric({
  label,
  valueA,
  valueB,
}: {
  label: string
  valueA: string
  valueB: string
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-text-muted mb-2">{label}</p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-lg font-bold text-primary tabular-nums">{valueA}</span>
        <span className="text-text-light text-xs">vs</span>
        <span className="text-lg font-bold text-accent tabular-nums">{valueB}</span>
      </div>
    </div>
  )
}

function DealPanel({
  deal,
  onChange,
  results,
  calcType,
  color,
}: {
  deal: DealInputs
  onChange: (d: DealInputs) => void
  results: ReturnType<typeof calculateResults>
  calcType: CalculatorType
  color: 'primary' | 'accent'
}) {
  const update = (field: keyof DealInputs, value: string) => {
    onChange({ ...deal, [field]: value })
  }

  const borderColor = color === 'primary' ? 'border-primary/30' : 'border-accent/30'
  const headerBg = color === 'primary' ? 'bg-primary' : 'bg-accent'
  const headerText = color === 'primary' ? 'text-white' : 'text-primary-dark'

  return (
    <div className={`rounded-xl border ${borderColor} overflow-hidden`}>
      {/* Header */}
      <div className={`${headerBg} px-6 py-4`}>
        <input
          type="text"
          value={deal.label}
          onChange={(e) => update('label', e.target.value)}
          className={`bg-transparent ${headerText} font-bold text-lg outline-none placeholder:opacity-50 w-full`}
          placeholder="Deal name..."
        />
      </div>

      <div className="p-6 space-y-4">
        {/* Core Inputs */}
        <CompactInput label="Purchase Price" value={deal.purchasePrice} onChange={(v) => update('purchasePrice', v)} prefix="$" placeholder="250,000" />
        <CompactInput label="Annual Gross Rent" value={deal.grossRent} onChange={(v) => update('grossRent', v)} prefix="$" placeholder="30,000" />

        <div className="flex items-center gap-3">
          <label className="text-xs text-text-muted w-24 shrink-0">Vacancy</label>
          <input type="range" min="0" max="20" step="1" value={deal.vacancy} onChange={(e) => update('vacancy', e.target.value)} className="flex-1 accent-primary" />
          <span className="w-10 text-right text-xs font-medium text-text">{deal.vacancy}%</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CompactInput label="Property Tax" value={deal.propertyTax} onChange={(v) => update('propertyTax', v)} prefix="$" placeholder="3,000" />
          <CompactInput label="Insurance" value={deal.insurance} onChange={(v) => update('insurance', v)} prefix="$" placeholder="1,500" />
          <CompactInput label="Maintenance" value={deal.maintenance} onChange={(v) => update('maintenance', v)} prefix="$" placeholder="2,000" />
          <CompactInput label="Management" value={deal.management} onChange={(v) => update('management', v)} prefix="$" placeholder="2,400" />
        </div>

        {/* Financing (for cash-on-cash and rental cash flow) */}
        {calcType !== 'cap-rate' && (
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-xs font-semibold text-text uppercase tracking-wide">Financing</p>
            <div className="flex items-center gap-3">
              <label className="text-xs text-text-muted w-24 shrink-0">Down Payment</label>
              <input type="range" min="0" max="100" step="5" value={deal.downPaymentPercent} onChange={(e) => update('downPaymentPercent', e.target.value)} className="flex-1 accent-primary" />
              <span className="w-10 text-right text-xs font-medium text-text">{deal.downPaymentPercent}%</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CompactInput label="Interest Rate" value={deal.interestRate} onChange={(v) => update('interestRate', v)} suffix="%" placeholder="7" />
              <CompactInput label="Closing Costs" value={deal.closingCosts} onChange={(v) => update('closingCosts', v)} prefix="$" placeholder="5,000" />
            </div>
          </div>
        )}

        {/* Results */}
        {results.price > 0 && (
          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-xs font-semibold text-text uppercase tracking-wide">Results</p>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Cap Rate</span>
              <span className="font-semibold tabular-nums">{results.capRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">NOI</span>
              <span className="font-semibold tabular-nums">{formatCurrency(results.noi)}</span>
            </div>
            {calcType !== 'cap-rate' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Cash-on-Cash</span>
                  <span className="font-semibold tabular-nums">{((results as { coc?: number }).coc ?? 0).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Monthly Cash Flow</span>
                  <span className={`font-semibold tabular-nums ${((results as { monthlyCashFlow?: number }).monthlyCashFlow ?? 0) < 0 ? 'text-red-500' : ''}`}>
                    {formatCurrency((results as { monthlyCashFlow?: number }).monthlyCashFlow ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Annual Cash Flow</span>
                  <span className={`font-semibold tabular-nums ${((results as { annualCashFlow?: number }).annualCashFlow ?? 0) < 0 ? 'text-red-500' : ''}`}>
                    {formatCurrency((results as { annualCashFlow?: number }).annualCashFlow ?? 0)}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function CompactInput({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
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
      <label className="block text-xs text-text-muted mb-1">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-light text-xs">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-border bg-white px-2.5 py-2 text-xs text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-6' : ''} ${suffix ? 'pr-6' : ''}`}
        />
        {suffix && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-light text-xs">{suffix}</span>
        )}
      </div>
    </div>
  )
}
