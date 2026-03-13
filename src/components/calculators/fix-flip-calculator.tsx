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

function getProfitRating(roi: number): {
  label: string
  color: string
  description: string
} {
  if (roi === 0) return { label: '', color: '', description: '' }
  if (roi < 0)
    return {
      label: 'Loss',
      color: 'text-red-600',
      description:
        'This deal loses money. Revisit your purchase price, rehab budget, or ARV estimate.',
    }
  if (roi < 10)
    return {
      label: 'Thin Margin',
      color: 'text-amber-600',
      description:
        'Low margin leaves little room for error. Most experienced flippers target 15%+ ROI to account for unexpected costs.',
    }
  if (roi < 20)
    return {
      label: 'Solid Deal',
      color: 'text-emerald-600',
      description:
        'Healthy profit margin with reasonable buffer for surprises. This is the sweet spot for most flippers.',
    }
  if (roi < 30)
    return {
      label: 'Strong Deal',
      color: 'text-emerald-700',
      description:
        'Above-average return. Verify your ARV with recent comps and make sure rehab estimates are realistic.',
    }
  return {
    label: 'Excellent (verify numbers)',
    color: 'text-blue-600',
    description:
      'Unusually high ROI — double-check the ARV, rehab scope, and holding timeline. If the numbers hold, this is a great flip.',
  }
}

export function FixFlipCalculator() {
  // Acquisition
  const [purchasePrice, setPurchasePrice] = useState('')
  const [closingCostBuy, setClosingCostBuy] = useState('2')
  const [arv, setArv] = useState('')

  // Rehab
  const [rehabCost, setRehabCost] = useState('')
  const [contingency, setContingency] = useState('10')

  // Holding
  const [holdingMonths, setHoldingMonths] = useState('6')
  const [monthlyLoanPayment, setMonthlyLoanPayment] = useState('')
  const [monthlyTaxes, setMonthlyTaxes] = useState('')
  const [monthlyInsurance, setMonthlyInsurance] = useState('')
  const [monthlyUtilities, setMonthlyUtilities] = useState('')
  const [monthlyOther, setMonthlyOther] = useState('')

  // Selling
  const [agentCommission, setAgentCommission] = useState('6')
  const [closingCostSell, setClosingCostSell] = useState('1.5')

  const results = useMemo(() => {
    const price = parseCurrencyInput(purchasePrice)
    const afterRepairValue = parseCurrencyInput(arv)
    const rehab = parseCurrencyInput(rehabCost)
    const contingencyPct = Number(contingency) / 100
    const rehabWithContingency = rehab * (1 + contingencyPct)
    const months = Number(holdingMonths) || 1

    // Acquisition costs
    const buyClosing = price * (Number(closingCostBuy) / 100)
    const totalAcquisition = price + buyClosing

    // Monthly holding costs
    const holdPerMonth =
      parseCurrencyInput(monthlyLoanPayment) +
      parseCurrencyInput(monthlyTaxes) +
      parseCurrencyInput(monthlyInsurance) +
      parseCurrencyInput(monthlyUtilities) +
      parseCurrencyInput(monthlyOther)
    const totalHolding = holdPerMonth * months

    // Selling costs
    const commission = afterRepairValue * (Number(agentCommission) / 100)
    const sellClosing = afterRepairValue * (Number(closingCostSell) / 100)
    const totalSellingCosts = commission + sellClosing

    // Total costs & profit
    const totalCosts =
      totalAcquisition + rehabWithContingency + totalHolding + totalSellingCosts
    const profit = afterRepairValue - totalCosts
    const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0
    const totalCashInvested = totalAcquisition + rehabWithContingency + totalHolding
    const roiOnCash =
      totalCashInvested > 0 ? (profit / totalCashInvested) * 100 : 0

    // 70% rule check
    const maxPurchasePrice70 = afterRepairValue * 0.7 - rehab
    const meetsRule = price <= maxPurchasePrice70 && price > 0

    // Profit per month
    const profitPerMonth = months > 0 ? profit / months : 0

    return {
      price,
      afterRepairValue,
      buyClosing,
      totalAcquisition,
      rehab,
      rehabWithContingency,
      totalHolding,
      holdPerMonth,
      months,
      commission,
      sellClosing,
      totalSellingCosts,
      totalCosts,
      profit,
      roi,
      roiOnCash,
      maxPurchasePrice70,
      meetsRule,
      profitPerMonth,
    }
  }, [
    purchasePrice, closingCostBuy, arv, rehabCost, contingency,
    holdingMonths, monthlyLoanPayment, monthlyTaxes, monthlyInsurance,
    monthlyUtilities, monthlyOther, agentCommission, closingCostSell,
  ])

  const rating = getProfitRating(results.roi)
  const hasInput = results.price > 0 && results.afterRepairValue > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Input Panel */}
      <div className="lg:col-span-3 space-y-8">
        {/* Acquisition */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Acquisition
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              placeholder="150,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Buyer Closing Costs
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range" min="0" max="5" step="0.5"
                  value={closingCostBuy}
                  onChange={(e) => setClosingCostBuy(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {closingCostBuy}%
                </span>
              </div>
            </div>
            <InputField
              label="After Repair Value (ARV)"
              value={arv}
              onChange={setArv}
              placeholder="250,000"
              prefix="$"
              hint="Expected sale price after renovations"
            />
          </div>
        </fieldset>

        {/* Rehab */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Rehab Budget
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Estimated Rehab Cost"
              value={rehabCost}
              onChange={setRehabCost}
              placeholder="40,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Contingency Buffer
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range" min="0" max="25" step="5"
                  value={contingency}
                  onChange={(e) => setContingency(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {contingency}%
                </span>
              </div>
              {parseCurrencyInput(rehabCost) > 0 && (
                <p className="mt-1 text-xs text-text-light">
                  Rehab with buffer: {formatCurrency(results.rehabWithContingency)}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Holding Costs */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Holding Costs
          </legend>
          <p className="mt-1 text-xs text-text-light">
            Monthly costs while you own the property (rehab + listing time).
          </p>
          <div className="mt-3 space-y-4">
            <InputField
              label="Project Duration (months)"
              value={holdingMonths}
              onChange={setHoldingMonths}
              placeholder="6"
              hint="Total time from purchase to sale"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Loan Payment (monthly)" value={monthlyLoanPayment} onChange={setMonthlyLoanPayment} placeholder="1,000" prefix="$" hint="Interest or P&I on acquisition loan" />
              <InputField label="Property Taxes (monthly)" value={monthlyTaxes} onChange={setMonthlyTaxes} placeholder="250" prefix="$" />
              <InputField label="Insurance (monthly)" value={monthlyInsurance} onChange={setMonthlyInsurance} placeholder="150" prefix="$" />
              <InputField label="Utilities (monthly)" value={monthlyUtilities} onChange={setMonthlyUtilities} placeholder="200" prefix="$" />
              <InputField label="Other (monthly)" value={monthlyOther} onChange={setMonthlyOther} placeholder="0" prefix="$" />
            </div>
          </div>
        </fieldset>

        {/* Selling Costs */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Selling Costs
          </legend>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Agent Commission
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range" min="0" max="8" step="0.5"
                  value={agentCommission}
                  onChange={(e) => setAgentCommission(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {agentCommission}%
                </span>
              </div>
              {results.afterRepairValue > 0 && (
                <p className="mt-1 text-xs text-text-light">
                  = {formatCurrency(results.commission)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Seller Closing Costs
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range" min="0" max="4" step="0.5"
                  value={closingCostSell}
                  onChange={(e) => setClosingCostSell(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {closingCostSell}%
                </span>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            Flip Profit Analysis
          </h2>

          {/* Main Metric */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Estimated Profit</p>
            <p
              className={`mt-1 text-4xl font-bold tabular-nums ${
                results.profit >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(results.profit)}
            </p>
            {hasInput && rating.label && (
              <p className={`mt-2 text-sm font-medium ${rating.color}`}>
                {rating.label} — {results.roi.toFixed(1)}% ROI
              </p>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-surface p-3 text-center">
              <p className="text-xs text-text-muted">ROI</p>
              <p className="mt-1 text-lg font-bold text-text tabular-nums">
                {results.roi.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3 text-center">
              <p className="text-xs text-text-muted">Profit / Month</p>
              <p className={`mt-1 text-lg font-bold tabular-nums ${results.profitPerMonth >= 0 ? 'text-text' : 'text-red-600'}`}>
                {formatCurrency(results.profitPerMonth)}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-6 space-y-2 text-sm">
            <p className="text-xs font-semibold text-text uppercase tracking-wide mb-2">
              Cost Breakdown
            </p>
            <ResultRow label="Sale Price (ARV)" value={formatCurrency(results.afterRepairValue)} />
            <div className="pt-1">
              <ResultRow label="Purchase + Closing" value={`(${formatCurrency(results.totalAcquisition)})`} negative />
              <ResultRow label={`Rehab (${contingency}% buffer)`} value={`(${formatCurrency(results.rehabWithContingency)})`} negative />
              <ResultRow label={`Holding (${results.months} mo)`} value={`(${formatCurrency(results.totalHolding)})`} negative />
              <ResultRow label="Selling Costs" value={`(${formatCurrency(results.totalSellingCosts)})`} negative />
            </div>
            <div className="border-t border-border pt-2">
              <ResultRow label="Total Costs" value={formatCurrency(results.totalCosts)} bold />
            </div>
            <div className="border-t border-border pt-2">
              <ResultRow
                label="Net Profit"
                value={formatCurrency(results.profit)}
                bold
              />
            </div>
          </div>

          {/* 70% Rule */}
          {hasInput && (
            <div
              className={`mt-6 rounded-lg p-4 text-xs leading-5 ${
                results.meetsRule
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              <p className="font-semibold mb-1">70% Rule Check</p>
              <p>
                Max purchase price: {formatCurrency(results.maxPurchasePrice70)}
                <br />
                Your price: {formatCurrency(results.price)}
                <br />
                {results.meetsRule
                  ? 'Meets the 70% rule guideline.'
                  : `Exceeds the 70% rule by ${formatCurrency(results.price - results.maxPurchasePrice70)}.`}
              </p>
            </div>
          )}

          {/* Context */}
          {hasInput && rating.description && (
            <div className="mt-4 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {rating.description}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              70% Rule: Max Price = ARV &times; 70% &minus; Rehab
            </p>
          </div>
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
    <div className="flex justify-between py-0.5">
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
