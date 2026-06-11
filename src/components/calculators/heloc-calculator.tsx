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

function getEquityInsight(
  tappable: number,
  hasInput: boolean,
  cltv: number,
): { label: string; color: string; description: string } {
  if (!hasInput) return { label: '', color: '', description: '' }
  if (tappable <= 0)
    return {
      label: 'Fully leveraged',
      color: 'text-amber-600',
      description: `At a ${cltv}% combined loan-to-value cap, your existing balance already uses up the equity a lender will let you borrow against. Pay down the loan, wait for appreciation, or look for a lender with a higher CLTV before you can pull cash out.`,
    }
  return {
    label: 'Equity available',
    color: 'text-emerald-600',
    description:
      'You have equity a lender may let you tap with a HELOC, home equity loan, or cash-out refinance. Investment-property products carry stricter terms than a primary-residence HELOC — expect lower CLTV caps, higher rates, and fewer lenders — so confirm the actual program before you count on the full amount.',
  }
}

export function HelocCalculator() {
  const [propertyValue, setPropertyValue] = useState('')
  const [mortgageBalance, setMortgageBalance] = useState('')
  const [maxCltv, setMaxCltv] = useState('75')
  const [interestRate, setInterestRate] = useState('8.5')
  const [repaymentType, setRepaymentType] = useState('io')
  const [loanTerm, setLoanTerm] = useState('20')
  const [nextPrice, setNextPrice] = useState('200,000')
  const [nextDownPercent, setNextDownPercent] = useState('25')

  useCalculatorState({
    propertyValue: setPropertyValue,
    mortgageBalance: setMortgageBalance,
    maxCltv: setMaxCltv,
    interestRate: setInterestRate,
    repaymentType: setRepaymentType,
    loanTerm: setLoanTerm,
    nextPrice: setNextPrice,
    nextDownPercent: setNextDownPercent,
  })

  const results = useMemo(() => {
    const value = parseCurrencyInput(propertyValue)
    const balance = parseCurrencyInput(mortgageBalance)
    const cltv = Number(maxCltv) / 100

    const currentEquity = value - balance
    const equityPercent = value > 0 ? (currentEquity / value) * 100 : 0
    const maxDebt = value * cltv
    const tappableEquity = Math.max(0, maxDebt - balance)
    const newTotalDebt = balance + tappableEquity
    const newCltv = value > 0 ? (newTotalDebt / value) * 100 : 0

    const monthlyRate = Number(interestRate) / 100 / 12
    const interestOnlyMonthly = tappableEquity * monthlyRate
    const totalPayments = Number(loanTerm) * 12
    let amortizingMonthly = 0
    if (tappableEquity > 0 && monthlyRate > 0 && totalPayments > 0) {
      amortizingMonthly =
        (tappableEquity *
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
    }
    const monthlyCost =
      repaymentType === 'amortizing' ? amortizingMonthly : interestOnlyMonthly

    const nextDealPrice = parseCurrencyInput(nextPrice)
    const downNeeded = nextDealPrice * (Number(nextDownPercent) / 100)
    const dealsFunded = downNeeded > 0 ? Math.floor(tappableEquity / downNeeded) : 0
    const purchasePower = dealsFunded * nextDealPrice

    return {
      value,
      balance,
      currentEquity,
      equityPercent,
      maxDebt,
      tappableEquity,
      newCltv,
      monthlyCost,
      downNeeded,
      dealsFunded,
      purchasePower,
    }
  }, [
    propertyValue,
    mortgageBalance,
    maxCltv,
    interestRate,
    repaymentType,
    loanTerm,
    nextPrice,
    nextDownPercent,
  ])

  const hasInput = results.value > 0 && results.balance >= 0 && results.balance < results.value * 2
  const insight = getEquityInsight(results.tappableEquity, hasInput, Number(maxCltv))

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        {/* Your Property */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Your Property
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Current Property Value"
              value={propertyValue}
              onChange={setPropertyValue}
              placeholder="300,000"
              prefix="$"
              hint="Today's market value — what it would appraise or sell for now."
            />
            <InputField
              label="Current Mortgage Balance"
              value={mortgageBalance}
              onChange={setMortgageBalance}
              placeholder="150,000"
              prefix="$"
              hint="Total still owed across all liens on this property. Enter 0 if owned free and clear."
            />
          </div>
        </fieldset>

        {/* Borrowing Terms */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Borrowing Terms
          </legend>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Max Combined Loan-to-Value (CLTV)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="50"
                  max="85"
                  step="1"
                  value={maxCltv}
                  onChange={(e) => setMaxCltv(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {maxCltv}%
                </span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                The most a lender will let your total debt reach. Investment
                properties are typically capped at 70–80% — lower than the
                85–90% common on a primary residence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Interest Rate (%)"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="8.5"
                suffix="%"
                raw
                hint="Investment-property rates run above primary-home HELOCs."
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Repayment
                </label>
                <select
                  value={repaymentType}
                  onChange={(e) => setRepaymentType(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="io">Interest-only (draw period)</option>
                  <option value="amortizing">Amortizing (fixed term)</option>
                </select>
              </div>
            </div>
            {repaymentType === 'amortizing' && (
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Repayment Term
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            )}
          </div>
        </fieldset>

        {/* Reinvestment */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Turn Equity Into Buying Power <span className="font-normal normal-case text-text-light">(optional)</span>
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Next Deal Purchase Price"
              value={nextPrice}
              onChange={setNextPrice}
              placeholder="200,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Down Payment on Next Deal
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={nextDownPercent}
                  onChange={(e) => setNextDownPercent(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {nextDownPercent}%
                </span>
              </div>
              {results.downNeeded > 0 && (
                <p className="mt-1 text-xs text-text-light">
                  {formatCurrency(results.downNeeded)} down per deal
                </p>
              )}
            </div>
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
            calculatorPath="/calculators/heloc"
            calculatorName="Investment Property HELOC Calculator"
            params={{
              propertyValue,
              mortgageBalance,
              maxCltv,
              interestRate,
              repaymentType,
              loanTerm,
              nextPrice,
              nextDownPercent,
            }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Tappable Equity</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {formatCurrency(results.tappableEquity)}
            </p>
            {insight.label && (
              <p className={`mt-2 text-sm font-medium ${insight.color}`}>
                {insight.label}
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Current Equity</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.currentEquity)}
              </p>
              <p className="text-xs text-text-light">
                {results.equityPercent.toFixed(0)}% of value
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">
                {repaymentType === 'amortizing' ? 'Monthly Payment' : 'Monthly Interest'}
              </p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.monthlyCost)}
              </p>
              <p className="text-xs text-text-light">on tapped amount</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow
              label="Property Value"
              value={formatCurrency(results.value)}
            />
            <ResultRow
              label="Current Mortgage Balance"
              value={`(${formatCurrency(results.balance)})`}
              negative
            />
            <ResultRow
              label={`Max Debt at ${maxCltv}% CLTV`}
              value={formatCurrency(results.maxDebt)}
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Tappable Equity"
                value={formatCurrency(results.tappableEquity)}
                bold
              />
            </div>
            <ResultRow
              label="Combined LTV After Borrowing"
              value={`${results.newCltv.toFixed(0)}%`}
            />
          </div>

          {hasInput && results.tappableEquity > 0 && results.dealsFunded > 0 && (
            <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Buying Power
              </p>
              <p className="mt-1 text-sm text-text leading-6">
                That equity covers the down payment on{' '}
                <strong className="text-primary">
                  {results.dealsFunded} more {results.dealsFunded === 1 ? 'deal' : 'deals'}
                </strong>{' '}
                at {formatCurrency(results.downNeeded)} down — about{' '}
                <strong className="text-text">
                  {formatCurrency(results.purchasePower)}
                </strong>{' '}
                in additional real estate.
              </p>
            </div>
          )}

          {insight.description && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {insight.description}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              Tappable Equity = (Value &times; Max CLTV) &minus; Current Balance
            </p>
          </div>

          <SaveResultsCTA
            calculatorName="Investment Property HELOC Calculator"
            context="heloc-calculator"
            results={{
              'Tappable Equity': formatCurrency(results.tappableEquity),
              'Current Equity': formatCurrency(results.currentEquity),
              'Combined LTV After Borrowing': `${results.newCltv.toFixed(0)}%`,
              'Est. Monthly Cost': formatCurrency(results.monthlyCost),
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
