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

type Step = 'buy' | 'rehab' | 'rent' | 'refinance' | 'results'
const STEPS: { key: Step; label: string; num: number }[] = [
  { key: 'buy', label: 'Buy', num: 1 },
  { key: 'rehab', label: 'Rehab', num: 2 },
  { key: 'rent', label: 'Rent', num: 3 },
  { key: 'refinance', label: 'Refinance', num: 4 },
  { key: 'results', label: 'Results', num: 5 },
]

export function BRRRRCalculator() {
  const [step, setStep] = useState<Step>('buy')

  // Buy
  const [purchasePrice, setPurchasePrice] = useState('')
  const [closingCostPercent, setClosingCostPercent] = useState('3')
  const [purchaseFinancing, setPurchaseFinancing] = useState<'cash' | 'loan'>('cash')
  const [purchaseLoanAmount, setPurchaseLoanAmount] = useState('')
  const [purchaseLoanRate, setPurchaseLoanRate] = useState('')
  const [purchaseLoanTermMonths, setPurchaseLoanTermMonths] = useState('12')

  // Rehab
  const [rehabCost, setRehabCost] = useState('')
  const [rehabDurationMonths, setRehabDurationMonths] = useState('3')
  const [holdingCostsMonthly, setHoldingCostsMonthly] = useState('')

  // Rent
  const [monthlyRent, setMonthlyRent] = useState('')
  const [vacancyRate, setVacancyRate] = useState('5')
  const [propertyTax, setPropertyTax] = useState('')
  const [insurance, setInsurance] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [managementFee, setManagementFee] = useState('')
  const [otherExpenses, setOtherExpenses] = useState('')

  // Refinance
  const [arv, setArv] = useState('')
  const [refiLtv, setRefiLtv] = useState('75')
  const [refiRate, setRefiRate] = useState('7')
  const [refiTerm, setRefiTerm] = useState('30')
  const [refiClosingCostPercent, setRefiClosingCostPercent] = useState('2')

  const results = useMemo(() => {
    const price = parseCurrencyInput(purchasePrice)
    const closingCosts = price * (Number(closingCostPercent) / 100)
    const rehab = parseCurrencyInput(rehabCost)
    const rehabMonths = Number(rehabDurationMonths) || 1
    const holdingPerMonth = parseCurrencyInput(holdingCostsMonthly)
    const totalHolding = holdingPerMonth * rehabMonths

    // Purchase financing
    let purchaseCashNeeded: number
    let purchaseLoanPaymentMonthly = 0
    let purchaseInterestDuringRehab = 0

    if (purchaseFinancing === 'loan') {
      const loanAmt = parseCurrencyInput(purchaseLoanAmount)
      const loanRate = Number(purchaseLoanRate) || 0
      purchaseCashNeeded = price - loanAmt + closingCosts
      purchaseLoanPaymentMonthly =
        loanRate > 0 ? loanAmt * (loanRate / 100 / 12) : 0 // interest-only for short-term
      purchaseInterestDuringRehab = purchaseLoanPaymentMonthly * rehabMonths
    } else {
      purchaseCashNeeded = price + closingCosts
    }

    const totalCashInvested =
      purchaseCashNeeded + rehab + totalHolding + purchaseInterestDuringRehab

    // Rent phase
    const rent = parseCurrencyInput(monthlyRent)
    const vacancy = Number(vacancyRate) / 100
    const effectiveRent = rent * (1 - vacancy)
    const annualExpenses =
      parseCurrencyInput(propertyTax) +
      parseCurrencyInput(insurance) +
      parseCurrencyInput(maintenance) +
      parseCurrencyInput(managementFee) +
      parseCurrencyInput(otherExpenses)
    const monthlyExpenses = annualExpenses / 12
    const monthlyNOI = effectiveRent - monthlyExpenses

    // Refinance
    const afterRepairValue = parseCurrencyInput(arv)
    const refiLtvPercent = Number(refiLtv) / 100
    const newLoanAmount = afterRepairValue * refiLtvPercent
    const refiClosingCosts =
      newLoanAmount * (Number(refiClosingCostPercent) / 100)
    const refiRateNum = Number(refiRate)
    const refiTermNum = Number(refiTerm)
    const newMonthlyPayment = calculateMonthlyPayment(
      newLoanAmount,
      refiRateNum,
      refiTermNum
    )

    // Cash recovered from refinance (minus closing costs, minus purchase loan payoff if applicable)
    let purchaseLoanPayoff = 0
    if (purchaseFinancing === 'loan') {
      purchaseLoanPayoff = parseCurrencyInput(purchaseLoanAmount)
    }
    const cashFromRefi =
      newLoanAmount - refiClosingCosts - purchaseLoanPayoff

    const cashLeftInDeal = Math.max(totalCashInvested - cashFromRefi, 0)
    const cashPulledOut = cashFromRefi - totalCashInvested
    const allCashOut = cashPulledOut >= 0

    const monthlyCashFlow = monthlyNOI - newMonthlyPayment
    const annualCashFlow = monthlyCashFlow * 12
    const cashOnCash =
      cashLeftInDeal > 0 ? (annualCashFlow / cashLeftInDeal) * 100 : 0
    const infiniteReturn = allCashOut && annualCashFlow > 0

    const equity = afterRepairValue - newLoanAmount

    return {
      // Buy
      price,
      closingCosts,
      purchaseCashNeeded,
      purchaseInterestDuringRehab,
      // Rehab
      rehab,
      rehabMonths,
      totalHolding,
      totalCashInvested,
      // Rent
      effectiveRent,
      monthlyExpenses,
      monthlyNOI,
      annualNOI: monthlyNOI * 12,
      // Refinance
      afterRepairValue,
      newLoanAmount,
      refiClosingCosts,
      newMonthlyPayment,
      cashFromRefi,
      purchaseLoanPayoff,
      // Final
      cashLeftInDeal,
      cashPulledOut,
      allCashOut,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCash,
      infiniteReturn,
      equity,
    }
  }, [
    purchasePrice, closingCostPercent, purchaseFinancing, purchaseLoanAmount,
    purchaseLoanRate, purchaseLoanTermMonths, rehabCost, rehabDurationMonths,
    holdingCostsMonthly, monthlyRent, vacancyRate, propertyTax, insurance,
    maintenance, managementFee, otherExpenses, arv, refiLtv, refiRate,
    refiTerm, refiClosingCostPercent,
  ])

  const stepIdx = STEPS.findIndex((s) => s.key === step)
  const canGoBack = stepIdx > 0
  const canGoForward = stepIdx < STEPS.length - 1

  return (
    <div>
      {/* Step Navigation */}
      <nav className="mb-8 flex items-center gap-1 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(s.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              step === s.key
                ? 'bg-primary text-white'
                : i < stepIdx
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'bg-surface text-text-muted hover:bg-surface/80'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                step === s.key
                  ? 'bg-white/20 text-white'
                  : i < stepIdx
                    ? 'bg-primary/20 text-primary'
                    : 'bg-border text-text-light'
              }`}
            >
              {i < stepIdx ? '✓' : s.num}
            </span>
            {s.label}
          </button>
        ))}
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Input Panel */}
        <div className="lg:col-span-3">
          {step === 'buy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-text">
                Step 1: Buy — Acquisition Details
              </h2>
              <p className="text-sm text-text-muted">
                Enter the purchase price and how you plan to finance the
                acquisition.
              </p>
              <InputField
                label="Purchase Price"
                value={purchasePrice}
                onChange={setPurchasePrice}
                placeholder="150,000"
                prefix="$"
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Closing Costs
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range" min="0" max="6" step="0.5"
                    value={closingCostPercent}
                    onChange={(e) => setClosingCostPercent(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-16 text-right text-sm font-medium text-text">
                    {closingCostPercent}%
                  </span>
                </div>
                {parseCurrencyInput(purchasePrice) > 0 && (
                  <p className="mt-1 text-xs text-text-light">
                    = {formatCurrency(results.closingCosts)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  How are you financing the purchase?
                </label>
                <div className="flex gap-2">
                  {(['cash', 'loan'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPurchaseFinancing(opt)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        purchaseFinancing === opt
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-text-muted hover:bg-surface'
                      }`}
                    >
                      {opt === 'cash' ? 'All Cash' : 'Hard Money / Loan'}
                    </button>
                  ))}
                </div>
              </div>

              {purchaseFinancing === 'loan' && (
                <div className="rounded-lg border border-border p-4 space-y-4 bg-surface/50">
                  <InputField
                    label="Loan Amount"
                    value={purchaseLoanAmount}
                    onChange={setPurchaseLoanAmount}
                    placeholder="120,000"
                    prefix="$"
                  />
                  <InputField
                    label="Interest Rate (annual)"
                    value={purchaseLoanRate}
                    onChange={setPurchaseLoanRate}
                    placeholder="12"
                    suffix="%"
                  />
                  <InputField
                    label="Loan Term (months)"
                    value={purchaseLoanTermMonths}
                    onChange={(v) => setPurchaseLoanTermMonths(v)}
                    placeholder="12"
                  />
                </div>
              )}
            </div>
          )}

          {step === 'rehab' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-text">
                Step 2: Rehab — Renovation Budget
              </h2>
              <p className="text-sm text-text-muted">
                Estimate the total renovation cost and timeline. Include holding
                costs like utilities, insurance, and loan interest during rehab.
              </p>
              <InputField
                label="Total Rehab Cost"
                value={rehabCost}
                onChange={setRehabCost}
                placeholder="40,000"
                prefix="$"
              />
              <InputField
                label="Rehab Duration (months)"
                value={rehabDurationMonths}
                onChange={setRehabDurationMonths}
                placeholder="3"
              />
              <InputField
                label="Monthly Holding Costs During Rehab"
                value={holdingCostsMonthly}
                onChange={setHoldingCostsMonthly}
                placeholder="500"
                prefix="$"
                hint="Utilities, insurance, taxes, etc. while property is vacant"
              />
              <div className="rounded-lg bg-surface p-4">
                <p className="text-sm font-medium text-text">
                  Total holding costs:{' '}
                  <span className="text-primary">
                    {formatCurrency(results.totalHolding)}
                  </span>{' '}
                  ({results.rehabMonths} months)
                </p>
              </div>
            </div>
          )}

          {step === 'rent' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-text">
                Step 3: Rent — Income & Expenses
              </h2>
              <p className="text-sm text-text-muted">
                Enter the monthly rent you expect after rehab and all annual
                operating expenses.
              </p>
              <InputField
                label="Monthly Rent"
                value={monthlyRent}
                onChange={setMonthlyRent}
                placeholder="1,500"
                prefix="$"
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Vacancy Rate
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range" min="0" max="20" step="1"
                    value={vacancyRate}
                    onChange={(e) => setVacancyRate(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-12 text-right text-sm font-medium text-text">
                    {vacancyRate}%
                  </span>
                </div>
              </div>
              <fieldset>
                <legend className="text-sm font-semibold text-text uppercase tracking-wide">
                  Annual Operating Expenses
                </legend>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <InputField label="Property Taxes" value={propertyTax} onChange={setPropertyTax} placeholder="2,400" prefix="$" />
                  <InputField label="Insurance" value={insurance} onChange={setInsurance} placeholder="1,200" prefix="$" />
                  <InputField label="Maintenance & Repairs" value={maintenance} onChange={setMaintenance} placeholder="1,800" prefix="$" />
                  <InputField label="Property Management" value={managementFee} onChange={setManagementFee} placeholder="1,800" prefix="$" hint="Typically 8-10% of gross rent" />
                  <InputField label="Other Expenses" value={otherExpenses} onChange={setOtherExpenses} placeholder="0" prefix="$" />
                </div>
              </fieldset>
            </div>
          )}

          {step === 'refinance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-text">
                Step 4: Refinance — Cash-Out Refi
              </h2>
              <p className="text-sm text-text-muted">
                Enter the appraised value after rehab (ARV) and the terms of your
                new long-term loan. The goal is to pull out as much of your
                original cash as possible.
              </p>
              <InputField
                label="After Repair Value (ARV)"
                value={arv}
                onChange={setArv}
                placeholder="250,000"
                prefix="$"
                hint="Appraised value after renovations"
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Refinance LTV
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range" min="50" max="85" step="5"
                    value={refiLtv}
                    onChange={(e) => setRefiLtv(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-12 text-right text-sm font-medium text-text">
                    {refiLtv}%
                  </span>
                </div>
                {parseCurrencyInput(arv) > 0 && (
                  <p className="mt-1 text-xs text-text-light">
                    New loan: {formatCurrency(results.newLoanAmount)}
                  </p>
                )}
              </div>
              <InputField
                label="Interest Rate"
                value={refiRate}
                onChange={setRefiRate}
                placeholder="7"
                suffix="%"
              />
              <InputField
                label="Loan Term (years)"
                value={refiTerm}
                onChange={setRefiTerm}
                placeholder="30"
              />
              <div>
                <label className="block text-sm font-medium text-text-muted">
                  Refinance Closing Costs
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range" min="0" max="5" step="0.5"
                    value={refiClosingCostPercent}
                    onChange={(e) => setRefiClosingCostPercent(e.target.value)}
                    className="flex-1 accent-primary"
                  />
                  <span className="w-16 text-right text-sm font-medium text-text">
                    {refiClosingCostPercent}%
                  </span>
                </div>
                {results.newLoanAmount > 0 && (
                  <p className="mt-1 text-xs text-text-light">
                    = {formatCurrency(results.refiClosingCosts)}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 'results' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-text">
                BRRRR Deal Analysis
              </h2>

              {/* Investment Summary */}
              <div className="rounded-xl border border-border p-6 space-y-4">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
                  Total Cash Invested
                </h3>
                <div className="space-y-2 text-sm">
                  <ResultRow label="Purchase Price" value={formatCurrency(results.price)} />
                  <ResultRow label="Closing Costs (purchase)" value={formatCurrency(results.closingCosts)} />
                  {purchaseFinancing === 'loan' && (
                    <>
                      <ResultRow label="Less: Purchase Loan" value={`(${formatCurrency(parseCurrencyInput(purchaseLoanAmount))})`} negative />
                      <ResultRow label="Interest During Rehab" value={formatCurrency(results.purchaseInterestDuringRehab)} />
                    </>
                  )}
                  <ResultRow label="Rehab Cost" value={formatCurrency(results.rehab)} />
                  <ResultRow label={`Holding Costs (${results.rehabMonths} mo)`} value={formatCurrency(results.totalHolding)} />
                  <div className="border-t border-border pt-2">
                    <ResultRow label="Total Cash In" value={formatCurrency(results.totalCashInvested)} bold />
                  </div>
                </div>
              </div>

              {/* Refinance */}
              <div className="rounded-xl border border-border p-6 space-y-4">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
                  Cash-Out Refinance
                </h3>
                <div className="space-y-2 text-sm">
                  <ResultRow label="After Repair Value" value={formatCurrency(results.afterRepairValue)} />
                  <ResultRow label={`New Loan (${refiLtv}% LTV)`} value={formatCurrency(results.newLoanAmount)} />
                  <ResultRow label="Refi Closing Costs" value={`(${formatCurrency(results.refiClosingCosts)})`} negative />
                  {purchaseFinancing === 'loan' && (
                    <ResultRow label="Pay Off Purchase Loan" value={`(${formatCurrency(results.purchaseLoanPayoff)})`} negative />
                  )}
                  <div className="border-t border-border pt-2">
                    <ResultRow label="Cash Received from Refi" value={formatCurrency(results.cashFromRefi)} bold />
                  </div>
                </div>
              </div>

              {/* Monthly Cash Flow */}
              <div className="rounded-xl border border-border p-6 space-y-4">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
                  Monthly Cash Flow (After Refinance)
                </h3>
                <div className="space-y-2 text-sm">
                  <ResultRow label="Effective Rent" value={formatCurrency(results.effectiveRent)} />
                  <ResultRow label="Operating Expenses" value={`(${formatCurrency(results.monthlyExpenses)})`} negative />
                  <ResultRow label="NOI" value={formatCurrency(results.monthlyNOI)} bold />
                  <ResultRow label="New Mortgage Payment" value={`(${formatCurrency(results.newMonthlyPayment)})`} negative />
                  <div className="border-t border-border pt-2">
                    <ResultRow label="Net Cash Flow" value={formatCurrency(results.monthlyCashFlow)} bold />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => canGoBack && setStep(STEPS[stepIdx - 1].key)}
              disabled={!canGoBack}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:bg-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              &larr; Back
            </button>
            {canGoForward && (
              <button
                type="button"
                onClick={() => setStep(STEPS[stepIdx + 1].key)}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                {stepIdx === STEPS.length - 2 ? 'See Results' : 'Next'} &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Side Summary Panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
              BRRRR Summary
            </h2>

            {/* Key Metric */}
            <div className="mt-6 text-center">
              {results.infiniteReturn ? (
                <>
                  <p className="text-sm text-text-muted">Cash-on-Cash Return</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-600">
                    ∞ Infinite
                  </p>
                  <p className="mt-1 text-xs text-emerald-600 font-medium">
                    All cash recovered + {formatCurrency(results.cashPulledOut)}{' '}
                    profit
                  </p>
                </>
              ) : results.cashOnCash !== 0 ? (
                <>
                  <p className="text-sm text-text-muted">Cash-on-Cash Return</p>
                  <p className="mt-1 text-4xl font-bold text-primary tabular-nums">
                    {results.cashOnCash.toFixed(1)}%
                  </p>
                </>
              ) : (
                <p className="text-sm text-text-muted">
                  Fill in deal details to see your returns
                </p>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MetricCard
                label="Cash Left in Deal"
                value={formatCurrency(results.cashLeftInDeal)}
                highlight={results.allCashOut}
                highlightLabel="$0 — All Out!"
              />
              <MetricCard
                label="Monthly Cash Flow"
                value={formatCurrency(results.monthlyCashFlow)}
                positive={results.monthlyCashFlow > 0}
                negative={results.monthlyCashFlow < 0}
              />
              <MetricCard
                label="Annual Cash Flow"
                value={formatCurrency(results.annualCashFlow)}
                positive={results.annualCashFlow > 0}
                negative={results.annualCashFlow < 0}
              />
              <MetricCard
                label="Equity"
                value={formatCurrency(results.equity)}
              />
            </div>

            {/* Deal Quality */}
            {results.totalCashInvested > 0 && (
              <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5 space-y-2">
                {results.allCashOut ? (
                  <p className="text-emerald-700 font-medium">
                    This is a home-run BRRRR — you recovered all your cash and can
                    immediately redeploy into the next deal.
                  </p>
                ) : results.cashLeftInDeal > 0 && results.monthlyCashFlow > 0 ? (
                  <p>
                    You have {formatCurrency(results.cashLeftInDeal)} left in this
                    deal earning{' '}
                    {results.cashOnCash.toFixed(1)}% cash-on-cash. Consider
                    whether this return justifies the capital tied up vs. your
                    next opportunity.
                  </p>
                ) : results.monthlyCashFlow < 0 ? (
                  <p className="text-red-600">
                    Negative cash flow after refinance. Consider a lower rehab
                    budget, higher rent, or better refi terms.
                  </p>
                ) : null}
                <p>
                  Equity position: {formatCurrency(results.equity)} (
                  {results.afterRepairValue > 0
                    ? ((results.equity / results.afterRepairValue) * 100).toFixed(0)
                    : 0}
                  % of ARV)
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-border pt-4">
              <p className="text-xs text-text-light text-center">
                BRRRR = Buy, Rehab, Rent, Refinance, Repeat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  positive,
  negative,
  highlight,
  highlightLabel,
}: {
  label: string
  value: string
  positive?: boolean
  negative?: boolean
  highlight?: boolean
  highlightLabel?: string
}) {
  return (
    <div
      className={`rounded-lg p-3 text-center ${
        highlight
          ? 'bg-emerald-50'
          : negative
            ? 'bg-red-50'
            : 'bg-surface'
      }`}
    >
      <p className="text-xs text-text-muted">{label}</p>
      <p
        className={`mt-1 text-lg font-bold tabular-nums ${
          highlight
            ? 'text-emerald-600'
            : negative
              ? 'text-red-600'
              : positive
                ? 'text-emerald-700'
                : 'text-text'
        }`}
      >
        {highlight && highlightLabel ? highlightLabel : value}
      </p>
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
