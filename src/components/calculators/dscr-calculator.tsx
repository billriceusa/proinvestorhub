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

// Inverse: largest loan whose P&I equals a given monthly payment.
function loanFromPI(pi: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12
  const n = years * 12
  if (pi <= 0 || n <= 0) return 0
  if (r === 0) return pi * n
  return (pi * (1 - Math.pow(1 + r, -n))) / r
}

function getDscrRating(dscr: number, target: number): {
  label: string
  color: string
  description: string
} {
  if (dscr <= 0) return { label: '', color: '', description: '' }
  if (dscr < 1)
    return {
      label: 'Below break-even',
      color: 'text-red-600',
      description:
        'The rent does not cover the payment (DSCR under 1.0). Most DSCR lenders will decline, require a larger down payment to shrink the loan, or quote a higher rate on a sub-1.0 program.',
    }
  if (dscr < target)
    return {
      label: 'Below lender target',
      color: 'text-amber-600',
      description:
        'The property cash-flows, but falls short of your target DSCR. Increase the down payment, find higher rent, or look for a lender with a lower DSCR minimum.',
    }
  if (dscr < 1.25)
    return {
      label: 'Qualifies',
      color: 'text-emerald-600',
      description:
        'Meets the common 1.0+ requirement. Pushing the ratio toward 1.25 generally unlocks better rates and higher leverage.',
    }
  return {
    label: 'Strong',
    color: 'text-blue-600',
    description:
      'A DSCR of 1.25+ typically qualifies for a lender’s best pricing tier and maximum leverage.',
  }
}

export function DscrCalculator() {
  const [monthlyRent, setMonthlyRent] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('7.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [annualTax, setAnnualTax] = useState('')
  const [annualInsurance, setAnnualInsurance] = useState('')
  const [monthlyHOA, setMonthlyHOA] = useState('')
  const [targetDscr, setTargetDscr] = useState('1.0')

  useCalculatorState({
    monthlyRent: setMonthlyRent,
    loanAmount: setLoanAmount,
    interestRate: setInterestRate,
    loanTerm: setLoanTerm,
    annualTax: setAnnualTax,
    annualInsurance: setAnnualInsurance,
    monthlyHOA: setMonthlyHOA,
    targetDscr: setTargetDscr,
  })

  const results = useMemo(() => {
    const rent = parseCurrencyInput(monthlyRent)
    const loan = parseCurrencyInput(loanAmount)
    const rate = Number(interestRate)
    const years = Number(loanTerm)
    const target = Number(targetDscr) || 1

    const pi = monthlyPI(loan, rate, years)
    const tax = parseCurrencyInput(annualTax) / 12
    const ins = parseCurrencyInput(annualInsurance) / 12
    const hoa = parseCurrencyInput(monthlyHOA)
    const pitia = pi + tax + ins + hoa
    const dscr = pitia > 0 ? rent / pitia : 0

    // Max loan that still clears the target DSCR.
    const fixedCarry = tax + ins + hoa
    const allowedPitia = target > 0 ? rent / target : 0
    const allowedPI = allowedPitia - fixedCarry
    const maxLoan = allowedPI > 0 ? loanFromPI(allowedPI, rate, years) : 0

    return { rent, loan, pi, tax, ins, hoa, pitia, dscr, target, maxLoan, allowedPI }
  }, [monthlyRent, loanAmount, interestRate, loanTerm, annualTax, annualInsurance, monthlyHOA, targetDscr])

  const rating = getDscrRating(results.dscr, results.target)
  const hasInput = results.rent > 0 && results.pitia > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Rental Income
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Monthly Rent (gross)"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="2,400"
              prefix="$"
              hint="DSCR lenders qualify on gross market rent — often from a lease or an appraiser’s 1007 rent schedule."
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Target DSCR (lender minimum)
              </label>
              <select
                value={targetDscr}
                onChange={(e) => setTargetDscr(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="0.75">0.75 (lenient program)</option>
                <option value="1.0">1.0 (most common)</option>
                <option value="1.1">1.1</option>
                <option value="1.25">1.25 (best pricing)</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Loan
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              placeholder="240,000"
              prefix="$"
            />
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
                <label className="block text-sm font-medium text-text-muted">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="30">30 years</option>
                  <option value="25">25 years</option>
                  <option value="20">20 years</option>
                  <option value="15">15 years</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Carrying Costs
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField
              label="Annual Property Taxes"
              value={annualTax}
              onChange={setAnnualTax}
              placeholder="3,600"
              prefix="$"
            />
            <InputField
              label="Annual Insurance"
              value={annualInsurance}
              onChange={setAnnualInsurance}
              placeholder="1,500"
              prefix="$"
            />
            <InputField
              label="Monthly HOA / Dues"
              value={monthlyHOA}
              onChange={setMonthlyHOA}
              placeholder="0"
              prefix="$"
            />
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">Results</h2>

          <CalculatorActions
            calculatorPath="/calculators/dscr"
            calculatorName="DSCR Loan Calculator"
            params={{
              monthlyRent,
              loanAmount,
              interestRate,
              loanTerm,
              annualTax,
              annualInsurance,
              monthlyHOA,
              targetDscr,
            }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Debt Service Coverage Ratio</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {results.dscr.toFixed(2)}
            </p>
            {hasInput && rating.label && (
              <p className={`mt-2 text-sm font-medium ${rating.color}`}>{rating.label}</p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Monthly PITIA</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.pitia)}
              </p>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <p className="text-xs text-text-muted">Max Loan @ {results.target.toFixed(2)}</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-text">
                {formatCurrency(results.maxLoan)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow label="Principal & Interest" value={formatCurrency(results.pi)} />
            <ResultRow label="Taxes (monthly)" value={formatCurrency(results.tax)} />
            <ResultRow label="Insurance (monthly)" value={formatCurrency(results.ins)} />
            {results.hoa > 0 && <ResultRow label="HOA / Dues" value={formatCurrency(results.hoa)} />}
            <div className="border-t border-border pt-3">
              <ResultRow label="Total PITIA" value={formatCurrency(results.pitia)} bold />
            </div>
            <ResultRow label="Monthly Rent" value={formatCurrency(results.rent)} />
          </div>

          {hasInput && rating.description && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {rating.description}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              DSCR = Monthly Rent &divide; Total PITIA
            </p>
          </div>

          <SaveResultsCTA
            calculatorName="DSCR Loan Calculator"
            context="dscr-calculator"
            results={{
              DSCR: results.dscr.toFixed(2),
              'Monthly PITIA': formatCurrency(results.pitia),
              [`Max Loan @ ${results.target.toFixed(2)} DSCR`]: formatCurrency(results.maxLoan),
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
