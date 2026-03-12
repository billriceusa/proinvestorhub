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

export function RentalCashFlowCalculator() {
  const [units, setUnits] = useState([
    { id: 1, label: 'Unit 1', rent: '' },
  ])
  const [otherIncome, setOtherIncome] = useState('')
  const [vacancy, setVacancy] = useState('5')
  const [propertyTax, setPropertyTax] = useState('')
  const [insurance, setInsurance] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [management, setManagement] = useState('')
  const [utilities, setUtilities] = useState('')
  const [hoa, setHoa] = useState('')
  const [otherExpenses, setOtherExpenses] = useState('')
  const [mortgagePayment, setMortgagePayment] = useState('')

  function addUnit() {
    setUnits((prev) => [
      ...prev,
      { id: prev.length + 1, label: `Unit ${prev.length + 1}`, rent: '' },
    ])
  }

  function removeUnit(id: number) {
    if (units.length <= 1) return
    setUnits((prev) => prev.filter((u) => u.id !== id))
  }

  function updateUnitRent(id: number, rent: string) {
    const cleaned = rent.replace(/[^0-9.]/g, '')
    const formatted =
      cleaned === '' ? '' : Number(cleaned).toLocaleString('en-US')
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, rent: isNaN(Number(cleaned)) ? u.rent : formatted } : u))
    )
  }

  const results = useMemo(() => {
    const monthlyGrossRent = units.reduce(
      (sum, u) => sum + parseCurrencyInput(u.rent),
      0
    )
    const monthlyOther = parseCurrencyInput(otherIncome)
    const monthlyGrossIncome = monthlyGrossRent + monthlyOther
    const vacancyRate = Number(vacancy) / 100
    const monthlyVacancyLoss = monthlyGrossRent * vacancyRate
    const monthlyEffectiveIncome = monthlyGrossIncome - monthlyVacancyLoss

    const monthlyExpenses = {
      propertyTax: parseCurrencyInput(propertyTax) / 12,
      insurance: parseCurrencyInput(insurance) / 12,
      maintenance: parseCurrencyInput(maintenance) / 12,
      management: parseCurrencyInput(management) / 12,
      utilities: parseCurrencyInput(utilities) / 12,
      hoa: parseCurrencyInput(hoa) / 12,
      other: parseCurrencyInput(otherExpenses) / 12,
    }
    const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce(
      (a, b) => a + b,
      0
    )

    const monthlyNOI = monthlyEffectiveIncome - totalMonthlyExpenses
    const monthlyMortgage = parseCurrencyInput(mortgagePayment)
    const monthlyCashFlow = monthlyNOI - monthlyMortgage

    return {
      monthlyGrossRent,
      monthlyGrossIncome,
      monthlyVacancyLoss,
      monthlyEffectiveIncome,
      monthlyExpenses,
      totalMonthlyExpenses,
      monthlyNOI,
      monthlyMortgage,
      monthlyCashFlow,
      annualGrossIncome: monthlyGrossIncome * 12,
      annualEffectiveIncome: monthlyEffectiveIncome * 12,
      annualExpenses: totalMonthlyExpenses * 12,
      annualNOI: monthlyNOI * 12,
      annualDebtService: monthlyMortgage * 12,
      annualCashFlow: monthlyCashFlow * 12,
    }
  }, [units, otherIncome, vacancy, propertyTax, insurance, maintenance, management, utilities, hoa, otherExpenses, mortgagePayment])

  const cashFlowPositive = results.monthlyCashFlow >= 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8">
        {/* Rental Income */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Monthly Rental Income
          </legend>
          <div className="mt-3 space-y-3">
            {units.map((unit) => (
              <div key={unit.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <InputField
                    label={unit.label}
                    value={unit.rent}
                    onChange={(v) => updateUnitRent(unit.id, v)}
                    placeholder="1,500"
                    prefix="$"
                    raw
                  />
                </div>
                {units.length > 1 && (
                  <button
                    onClick={() => removeUnit(unit.id)}
                    className="mb-0.5 rounded-lg border border-border px-3 py-2.5 text-sm text-text-muted hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                    type="button"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addUnit}
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
              type="button"
            >
              + Add Unit
            </button>
          </div>
          <div className="mt-4">
            <InputField
              label="Other Monthly Income (laundry, parking, etc.)"
              value={otherIncome}
              onChange={setOtherIncome}
              placeholder="0"
              prefix="$"
            />
          </div>
          <div className="mt-4">
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
        </fieldset>

        {/* Expenses */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Annual Operating Expenses
          </legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField label="Property Taxes" value={propertyTax} onChange={setPropertyTax} placeholder="3,000" prefix="$" />
            <InputField label="Insurance" value={insurance} onChange={setInsurance} placeholder="1,500" prefix="$" />
            <InputField label="Maintenance & Repairs" value={maintenance} onChange={setMaintenance} placeholder="2,000" prefix="$" />
            <InputField label="Property Management" value={management} onChange={setManagement} placeholder="2,400" prefix="$" />
            <InputField label="Utilities (owner-paid)" value={utilities} onChange={setUtilities} placeholder="0" prefix="$" />
            <InputField label="HOA / Condo Fees" value={hoa} onChange={setHoa} placeholder="0" prefix="$" />
            <InputField label="Other Expenses" value={otherExpenses} onChange={setOtherExpenses} placeholder="0" prefix="$" />
          </div>
        </fieldset>

        {/* Mortgage */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Monthly Mortgage Payment
          </legend>
          <p className="mt-1 text-xs text-text-light">
            Principal + interest (P&I). Use our cash-on-cash calculator to compute this from loan details.
          </p>
          <div className="mt-3">
            <InputField
              label="Monthly P&I Payment"
              value={mortgagePayment}
              onChange={setMortgagePayment}
              placeholder="1,200"
              prefix="$"
            />
          </div>
        </fieldset>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
            Cash Flow Summary
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className={`rounded-lg p-4 ${cashFlowPositive ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <p className="text-xs text-text-muted">Monthly</p>
              <p className={`mt-1 text-2xl font-bold tabular-nums ${cashFlowPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                {formatCurrency(results.monthlyCashFlow)}
              </p>
            </div>
            <div className={`rounded-lg p-4 ${cashFlowPositive ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <p className="text-xs text-text-muted">Annual</p>
              <p className={`mt-1 text-2xl font-bold tabular-nums ${cashFlowPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                {formatCurrency(results.annualCashFlow)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <p className="text-xs font-semibold text-text uppercase tracking-wide mb-2">Monthly Breakdown</p>
            <ResultRow label="Gross Rental Income" value={formatCurrency(results.monthlyGrossRent)} />
            {parseCurrencyInput(otherIncome) > 0 && (
              <ResultRow label="Other Income" value={formatCurrency(parseCurrencyInput(otherIncome))} />
            )}
            <ResultRow label={`Vacancy (${vacancy}%)`} value={`(${formatCurrency(results.monthlyVacancyLoss)})`} negative />
            <div className="border-t border-border pt-2">
              <ResultRow label="Effective Income" value={formatCurrency(results.monthlyEffectiveIncome)} bold />
            </div>

            <div className="pt-2">
              <ResultRow label="Property Tax" value={`(${formatCurrency(results.monthlyExpenses.propertyTax)})`} negative />
              <ResultRow label="Insurance" value={`(${formatCurrency(results.monthlyExpenses.insurance)})`} negative />
              <ResultRow label="Maintenance" value={`(${formatCurrency(results.monthlyExpenses.maintenance)})`} negative />
              <ResultRow label="Management" value={`(${formatCurrency(results.monthlyExpenses.management)})`} negative />
              {results.monthlyExpenses.utilities > 0 && (
                <ResultRow label="Utilities" value={`(${formatCurrency(results.monthlyExpenses.utilities)})`} negative />
              )}
              {results.monthlyExpenses.hoa > 0 && (
                <ResultRow label="HOA" value={`(${formatCurrency(results.monthlyExpenses.hoa)})`} negative />
              )}
              {results.monthlyExpenses.other > 0 && (
                <ResultRow label="Other" value={`(${formatCurrency(results.monthlyExpenses.other)})`} negative />
              )}
            </div>

            <div className="border-t border-border pt-2">
              <ResultRow label="NOI" value={formatCurrency(results.monthlyNOI)} bold />
            </div>

            {results.monthlyMortgage > 0 && (
              <ResultRow label="Mortgage (P&I)" value={`(${formatCurrency(results.monthlyMortgage)})`} negative />
            )}

            <div className="border-t border-border pt-2">
              <ResultRow
                label="Net Cash Flow"
                value={formatCurrency(results.monthlyCashFlow)}
                bold
              />
            </div>
          </div>

          {results.monthlyGrossRent > 0 && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              {cashFlowPositive
                ? `This property generates ${formatCurrency(results.monthlyCashFlow)}/mo in positive cash flow after all expenses and debt service.`
                : `This property is cash-flow negative by ${formatCurrency(Math.abs(results.monthlyCashFlow))}/mo. Consider raising rent, reducing expenses, or increasing your down payment.`}
            </div>
          )}
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
  raw,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
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
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''}`}
        />
      </div>
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
