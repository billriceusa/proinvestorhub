'use client'

import { useState, useMemo } from 'react'
import { CalculatorCTA } from '@/components/calculator-cta'
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

function getDealRating(endBuyerROI: number): {
  label: string
  color: string
  description: string
} {
  if (endBuyerROI > 20)
    return {
      label: 'Strong Deal',
      color: 'text-emerald-600',
      description:
        'This deal offers a compelling return for your end buyer. Strong deals are easier to assign and close quickly.',
    }
  if (endBuyerROI >= 10)
    return {
      label: 'Viable',
      color: 'text-amber-600',
      description:
        'Decent margins for your end buyer. The deal should move, but experienced investors may negotiate your assignment fee down.',
    }
  if (endBuyerROI >= 0)
    return {
      label: 'Tight Margins',
      color: 'text-orange-600',
      description:
        'Thin profit for the end buyer. You may need to reduce your assignment fee or renegotiate the purchase price to make this work.',
    }
  return {
    label: 'Not Viable',
    color: 'text-red-600',
    description:
      'The end buyer would lose money at these numbers. Renegotiate the purchase price, lower your fee, or walk away.',
  }
}

export function WholesaleCalculator() {
  const [arv, setArv] = useState('')
  const [rehabCost, setRehabCost] = useState('')
  const [assignmentFee, setAssignmentFee] = useState('10,000')
  const [investorDiscount, setInvestorDiscount] = useState('70')
  const [closingCostPct, setClosingCostPct] = useState('3')
  const [holdingCosts, setHoldingCosts] = useState('5,000')

  useCalculatorState({
    arv: setArv,
    rehabCost: setRehabCost,
    assignmentFee: setAssignmentFee,
    investorDiscount: setInvestorDiscount,
    closingCostPct: setClosingCostPct,
    holdingCosts: setHoldingCosts,
  })

  const results = useMemo(() => {
    const arvVal = parseCurrencyInput(arv)
    const rehab = parseCurrencyInput(rehabCost)
    const fee = parseCurrencyInput(assignmentFee)
    const discount = Number(investorDiscount) / 100
    const closingPct = Number(closingCostPct) / 100
    const holding = parseCurrencyInput(holdingCosts)

    const closingCosts = arvVal * closingPct
    const mao = arvVal * discount - rehab - closingCosts - holding
    const yourMaxOffer = mao - fee
    const endBuyerProfit =
      arvVal - yourMaxOffer - fee - rehab - closingCosts - holding
    const totalInvestment = yourMaxOffer + fee + rehab
    const endBuyerROI =
      totalInvestment > 0 ? (endBuyerProfit / totalInvestment) * 100 : 0

    return {
      arvVal,
      closingCosts,
      mao,
      yourMaxOffer,
      endBuyerProfit,
      endBuyerROI,
      fee,
    }
  }, [arv, rehabCost, assignmentFee, investorDiscount, closingCostPct, holdingCosts])

  const rating = getDealRating(results.endBuyerROI)
  const hasInput = results.arvVal > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Input Panel */}
      <div className="lg:col-span-3 space-y-8 print:hidden">
        {/* Deal Details */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Deal Details
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="After Repair Value (ARV)"
              value={arv}
              onChange={setArv}
              placeholder="250,000"
              prefix="$"
              hint="What the property will be worth after renovations"
            />
            <InputField
              label="Rehab Cost Estimate"
              value={rehabCost}
              onChange={setRehabCost}
              placeholder="35,000"
              prefix="$"
              hint="Total estimated renovation costs for the end buyer"
            />
            <InputField
              label="Desired Assignment Fee"
              value={assignmentFee}
              onChange={setAssignmentFee}
              placeholder="10,000"
              prefix="$"
              hint="Your wholesale profit when you assign the contract"
            />
          </div>
        </fieldset>

        {/* Investor Parameters */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            End Buyer Parameters
          </legend>
          <p className="mt-1 text-xs text-text-light">
            These represent what your end buyer (investor/flipper) needs to make
            the deal work.
          </p>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Investor&apos;s Target Discount (% of ARV)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="50"
                  max="85"
                  step="1"
                  value={investorDiscount}
                  onChange={(e) => setInvestorDiscount(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {investorDiscount}%
                </span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                The 70% rule is standard — most flippers won&apos;t pay more than 70%
                of ARV
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">
                End Buyer&apos;s Closing Costs (% of ARV)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={closingCostPct}
                  onChange={(e) => setClosingCostPct(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {closingCostPct}%
                </span>
              </div>
            </div>
            <InputField
              label="End Buyer's Holding Costs"
              value={holdingCosts}
              onChange={setHoldingCosts}
              placeholder="5,000"
              prefix="$"
              hint="Taxes, insurance, utilities, loan payments during rehab"
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

          <CalculatorActions
            calculatorPath="/calculators/wholesale"
            calculatorName="Wholesale Calculator"
            params={{
              arv,
              rehabCost,
              assignmentFee,
              investorDiscount,
              closingCostPct,
              holdingCosts,
            }}
          />

          {/* Your Maximum Offer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Your Maximum Offer</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {results.yourMaxOffer > 0
                ? formatCurrency(results.yourMaxOffer)
                : '$0'}
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
              label="Maximum Allowable Offer"
              value={formatCurrency(Math.max(results.mao, 0))}
            />
            <ResultRow
              label="Your Assignment Fee"
              value={formatCurrency(results.fee)}
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="End Buyer's Profit"
                value={formatCurrency(results.endBuyerProfit)}
                bold
                negative={results.endBuyerProfit < 0}
              />
            </div>
            <ResultRow
              label="End Buyer's ROI"
              value={`${results.endBuyerROI.toFixed(1)}%`}
            />
            <ResultRow
              label="Closing Costs"
              value={`(${formatCurrency(results.closingCosts)})`}
              negative
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
              MAO = (ARV &times; Discount%) &minus; Rehab &minus; Closing &minus; Holding
            </p>
          </div>

          <CalculatorCTA context="wholesale-calculator" />
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
