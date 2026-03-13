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

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (principal <= 0 || annualRate <= 0 || termYears <= 0) return 0
  const r = annualRate / 100 / 12
  const n = termYears * 12
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

type LoanType = 'conventional' | 'dscr'

export function MortgageCalculator() {
  const [loanType, setLoanType] = useState<LoanType>('conventional')

  // Shared
  const [propertyPrice, setPropertyPrice] = useState('')
  const [downPaymentPercent, setDownPaymentPercent] = useState('25')
  const [interestRate, setInterestRate] = useState('7')
  const [loanTerm, setLoanTerm] = useState('30')

  // Escrow / extras
  const [annualTax, setAnnualTax] = useState('')
  const [annualInsurance, setAnnualInsurance] = useState('')
  const [monthlyPMI, setMonthlyPMI] = useState('')
  const [monthlyHOA, setMonthlyHOA] = useState('')

  // DSCR fields
  const [monthlyRent, setMonthlyRent] = useState('')
  const [vacancyRate, setVacancyRate] = useState('5')
  const [annualMaintenance, setAnnualMaintenance] = useState('')
  const [annualManagement, setAnnualManagement] = useState('')

  const results = useMemo(() => {
    const price = parseCurrencyInput(propertyPrice)
    const downPct = Number(downPaymentPercent) / 100
    const downPayment = price * downPct
    const loanAmount = price - downPayment
    const rate = Number(interestRate)
    const term = Number(loanTerm) || 30

    const monthlyPI = calculateMonthlyPayment(loanAmount, rate, term)
    const monthlyTax = parseCurrencyInput(annualTax) / 12
    const monthlyIns = parseCurrencyInput(annualInsurance) / 12
    const pmi = parseCurrencyInput(monthlyPMI)
    const hoa = parseCurrencyInput(monthlyHOA)

    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyIns + pmi + hoa
    const totalOverLife = monthlyPI * term * 12
    const totalInterest = totalOverLife - loanAmount

    // DSCR
    const rent = parseCurrencyInput(monthlyRent)
    const vacancy = Number(vacancyRate) / 100
    const effectiveRent = rent * (1 - vacancy)
    const maint = parseCurrencyInput(annualMaintenance) / 12
    const mgmt = parseCurrencyInput(annualManagement) / 12

    const noi = effectiveRent - monthlyTax - monthlyIns - maint - mgmt - hoa
    const debtService = monthlyPI
    const dscr = debtService > 0 ? noi / debtService : 0

    const monthlyCashFlow = noi - debtService

    return {
      price,
      downPayment,
      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyIns,
      pmi,
      hoa,
      totalMonthlyPayment,
      totalOverLife,
      totalInterest,
      effectiveRent,
      noi,
      debtService,
      dscr,
      monthlyCashFlow,
      annualCashFlow: monthlyCashFlow * 12,
    }
  }, [
    propertyPrice, downPaymentPercent, interestRate, loanTerm,
    annualTax, annualInsurance, monthlyPMI, monthlyHOA,
    monthlyRent, vacancyRate, annualMaintenance, annualManagement,
  ])

  const hasInput = results.price > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Input Panel */}
      <div className="lg:col-span-3 space-y-8">
        {/* Loan Type Toggle */}
        <div>
          <label className="block text-sm font-semibold text-text uppercase tracking-wide mb-3">
            Loan Type
          </label>
          <div className="flex gap-2">
            {([
              { key: 'conventional' as const, label: 'Conventional Mortgage' },
              { key: 'dscr' as const, label: 'DSCR Loan' },
            ]).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setLoanType(opt.key)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  loanType === opt.key
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-text-muted hover:bg-surface'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-text-light">
            {loanType === 'dscr'
              ? 'DSCR loans qualify based on rental income, not personal income. Add rental details below.'
              : 'Standard mortgage calculator with escrow breakdown.'}
          </p>
        </div>

        {/* Loan Details */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Loan Details
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Property Price"
              value={propertyPrice}
              onChange={setPropertyPrice}
              placeholder="300,000"
              prefix="$"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Down Payment
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min={loanType === 'dscr' ? '15' : '3'}
                  max="50"
                  step="1"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {downPaymentPercent}%
                </span>
              </div>
              {hasInput && (
                <p className="mt-1 text-xs text-text-light">
                  {formatCurrency(results.downPayment)} down &middot;{' '}
                  {formatCurrency(results.loanAmount)} loan
                </p>
              )}
            </div>
            <InputField
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="7"
              suffix="%"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Loan Term
              </label>
              <div className="mt-1 flex gap-2">
                {['15', '20', '25', '30'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setLoanTerm(t)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      loanTerm === t
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-text-muted hover:bg-surface'
                    }`}
                  >
                    {t} yr
                  </button>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Taxes & Insurance */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Taxes, Insurance &amp; Fees
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField label="Annual Property Tax" value={annualTax} onChange={setAnnualTax} placeholder="3,600" prefix="$" />
            <InputField label="Annual Insurance" value={annualInsurance} onChange={setAnnualInsurance} placeholder="1,800" prefix="$" />
            <InputField label="Monthly PMI" value={monthlyPMI} onChange={setMonthlyPMI} placeholder="0" prefix="$" hint="Usually required if <20% down" />
            <InputField label="Monthly HOA" value={monthlyHOA} onChange={setMonthlyHOA} placeholder="0" prefix="$" />
          </div>
        </fieldset>

        {/* DSCR Section */}
        {loanType === 'dscr' && (
          <fieldset>
            <legend className="text-sm font-semibold text-text uppercase tracking-wide">
              Rental Income (DSCR Qualification)
            </legend>
            <p className="mt-1 text-xs text-text-light">
              Lenders typically require a DSCR of 1.0 or higher. Some allow 0.75+ with higher rates.
            </p>
            <div className="mt-3 space-y-4">
              <InputField
                label="Monthly Rent"
                value={monthlyRent}
                onChange={setMonthlyRent}
                placeholder="2,200"
                prefix="$"
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Vacancy Rate
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range" min="0" max="15" step="1"
                    value={vacancyRate}
                    onChange={(e) => setVacancyRate(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-12 text-right text-sm font-medium text-text">
                    {vacancyRate}%
                  </span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Annual Maintenance" value={annualMaintenance} onChange={setAnnualMaintenance} placeholder="2,000" prefix="$" />
                <InputField label="Annual Management" value={annualManagement} onChange={setAnnualManagement} placeholder="2,400" prefix="$" hint="Typically 8-10% of gross rent" />
              </div>
            </div>
          </fieldset>
        )}
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            {loanType === 'dscr' ? 'DSCR Loan Analysis' : 'Payment Summary'}
          </h2>

          {/* Main Metric */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Total Monthly Payment</p>
            <p className="mt-1 text-4xl font-bold text-primary tabular-nums">
              {formatCurrency(results.totalMonthlyPayment)}
            </p>
            <p className="mt-1 text-xs text-text-light">
              P&I: {formatCurrency(results.monthlyPI)} &middot;
              Escrow: {formatCurrency(results.monthlyTax + results.monthlyIns + results.pmi + results.hoa)}
            </p>
          </div>

          {/* DSCR Badge */}
          {loanType === 'dscr' && results.dscr > 0 && (
            <div className="mt-4 text-center">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                  results.dscr >= 1.25
                    ? 'bg-emerald-50 text-emerald-700'
                    : results.dscr >= 1.0
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-600'
                }`}
              >
                DSCR: {results.dscr.toFixed(2)}x
                <span className="text-xs font-normal">
                  {results.dscr >= 1.25
                    ? '(Strong)'
                    : results.dscr >= 1.0
                      ? '(Meets minimum)'
                      : '(Below 1.0)'}
                </span>
              </div>
            </div>
          )}

          {/* Breakdown */}
          <div className="mt-6 space-y-2 text-sm">
            <p className="text-xs font-semibold text-text uppercase tracking-wide mb-2">
              Monthly Breakdown
            </p>
            <ResultRow label="Principal & Interest" value={formatCurrency(results.monthlyPI)} />
            <ResultRow label="Property Tax" value={formatCurrency(results.monthlyTax)} />
            <ResultRow label="Insurance" value={formatCurrency(results.monthlyIns)} />
            {results.pmi > 0 && <ResultRow label="PMI" value={formatCurrency(results.pmi)} />}
            {results.hoa > 0 && <ResultRow label="HOA" value={formatCurrency(results.hoa)} />}
            <div className="border-t border-border pt-2">
              <ResultRow label="Total Payment" value={formatCurrency(results.totalMonthlyPayment)} bold />
            </div>
          </div>

          {/* DSCR Cash Flow */}
          {loanType === 'dscr' && parseCurrencyInput(monthlyRent) > 0 && (
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-xs font-semibold text-text uppercase tracking-wide mb-2">
                Cash Flow
              </p>
              <ResultRow label="Effective Rent" value={formatCurrency(results.effectiveRent)} />
              <ResultRow label="NOI (monthly)" value={formatCurrency(results.noi)} />
              <ResultRow label="Debt Service" value={`(${formatCurrency(results.debtService)})`} negative />
              <div className="border-t border-border pt-2">
                <ResultRow label="Net Cash Flow" value={formatCurrency(results.monthlyCashFlow)} bold />
              </div>
              <ResultRow label="Annual Cash Flow" value={formatCurrency(results.annualCashFlow)} />
            </div>
          )}

          {/* Loan Summary */}
          <div className="mt-6 space-y-2 text-sm">
            <p className="text-xs font-semibold text-text uppercase tracking-wide mb-2">
              Loan Summary
            </p>
            <ResultRow label="Loan Amount" value={formatCurrency(results.loanAmount)} />
            <ResultRow label="Down Payment" value={formatCurrency(results.downPayment)} />
            <ResultRow label="Total Interest" value={formatCurrency(results.totalInterest)} />
            <ResultRow label="Total Paid (P&I)" value={formatCurrency(results.totalOverLife)} />
          </div>

          {/* DSCR Context */}
          {loanType === 'dscr' && results.dscr > 0 && (
            <div
              className={`mt-6 rounded-lg p-4 text-xs leading-5 ${
                results.dscr >= 1.25
                  ? 'bg-emerald-50 text-emerald-700'
                  : results.dscr >= 1.0
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-600'
              }`}
            >
              {results.dscr >= 1.25
                ? 'Strong DSCR — most lenders will approve this deal. You may qualify for better rates.'
                : results.dscr >= 1.0
                  ? 'Meets the minimum DSCR requirement. Some lenders may require higher ratios or charge a rate premium.'
                  : 'Below the 1.0 minimum. The property\'s income doesn\'t cover its debt service. Consider a larger down payment, lower price, or higher rent.'}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-text-light text-center">
              {loanType === 'dscr'
                ? 'DSCR = NOI / Debt Service'
                : 'P&I = Principal + Interest'}
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
