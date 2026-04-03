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

function getSTRRating(monthlyNet: number): {
  label: string
  color: string
  description: string
} {
  if (monthlyNet > 2000)
    return {
      label: 'Strong Cash Flow',
      color: 'text-green-600',
      description:
        'This property is generating strong short-term rental income. Reinvest in amenity upgrades, build reserves, or scale your portfolio.',
    }
  if (monthlyNet >= 1000)
    return {
      label: 'Good Cash Flow',
      color: 'text-emerald-600',
      description:
        'Solid returns for a short-term rental. Look for ways to boost nightly rate through better photos, amenities, or dynamic pricing.',
    }
  if (monthlyNet >= 500)
    return {
      label: 'Moderate',
      color: 'text-amber-600',
      description:
        'Positive but thin margins. Small improvements in occupancy or nightly rate could meaningfully increase your bottom line.',
    }
  if (monthlyNet >= 0)
    return {
      label: 'Tight',
      color: 'text-orange-600',
      description:
        'Barely breaking even. Review your pricing strategy, reduce turnover costs, or consider whether a long-term rental would be more stable.',
    }
  return {
    label: 'Negative Cash Flow',
    color: 'text-red-600',
    description:
      'This property is losing money at current assumptions. Increase occupancy, raise nightly rates, or cut expenses to reach profitability.',
  }
}

export function STRCalculator() {
  // Property inputs
  const [nightlyRate, setNightlyRate] = useState('')
  const [occupancy, setOccupancy] = useState('65')
  const [bedrooms, setBedrooms] = useState('2')
  const [cleaningFee, setCleaningFee] = useState('')
  const [avgStayLength, setAvgStayLength] = useState('3')

  // Expense inputs
  const [cleaningCost, setCleaningCost] = useState('')
  const [platformFees, setPlatformFees] = useState('3')
  const [managementFee, setManagementFee] = useState('20')
  const [utilities, setUtilities] = useState('')
  const [supplies, setSupplies] = useState('')
  const [insurance, setInsurance] = useState('')
  const [propertyTax, setPropertyTax] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [furnishingCost, setFurnishingCost] = useState('')

  useCalculatorState({
    nightlyRate: setNightlyRate,
    occupancy: setOccupancy,
    bedrooms: setBedrooms,
    cleaningFee: setCleaningFee,
    avgStayLength: setAvgStayLength,
    cleaningCost: setCleaningCost,
    platformFees: setPlatformFees,
    managementFee: setManagementFee,
    utilities: setUtilities,
    supplies: setSupplies,
    insurance: setInsurance,
    propertyTax: setPropertyTax,
    maintenance: setMaintenance,
    furnishingCost: setFurnishingCost,
  })

  const results = useMemo(() => {
    const rate = parseCurrencyInput(nightlyRate)
    const occRate = Number(occupancy) / 100
    const beds = Number(bedrooms) || 1
    const cleanFee = parseCurrencyInput(cleaningFee)
    const stayLen = Number(avgStayLength) || 1

    const nightsBooked = Math.round(365 * occRate)
    const turnovers = nightsBooked > 0 ? Math.round(nightsBooked / stayLen) : 0

    const grossRentalRevenue = nightsBooked * rate
    const cleaningFeeRevenue = turnovers * cleanFee
    const totalGrossRevenue = grossRentalRevenue + cleaningFeeRevenue

    // Expenses
    const cleaningCosts = turnovers * parseCurrencyInput(cleaningCost)
    const platformCost = grossRentalRevenue * (Number(platformFees) / 100)
    const managementCost = grossRentalRevenue * (Number(managementFee) / 100)
    const utilitiesCost = parseCurrencyInput(utilities) * 12
    const suppliesCost = parseCurrencyInput(supplies) * 12
    const insuranceCost = parseCurrencyInput(insurance)
    const taxCost = parseCurrencyInput(propertyTax)
    const maintenanceCost = parseCurrencyInput(maintenance)
    const furnishingAmort = parseCurrencyInput(furnishingCost) / 3

    const totalExpenses =
      cleaningCosts +
      platformCost +
      managementCost +
      utilitiesCost +
      suppliesCost +
      insuranceCost +
      taxCost +
      maintenanceCost +
      furnishingAmort

    const noi = totalGrossRevenue - totalExpenses
    const monthlyNet = noi / 12
    const revenuePerBedroom = beds > 0 ? totalGrossRevenue / beds : 0
    const expenseRatio =
      totalGrossRevenue > 0 ? (totalExpenses / totalGrossRevenue) * 100 : 0

    // Occupancy breakeven: find occupancy where NOI = 0
    // NOI = (365 * occ * rate) + ((365 * occ / stayLen) * cleanFee) - expenses_that_scale - fixed_expenses
    // Scaling expenses: cleaning costs, platform fees, management
    // Fixed expenses: utilities, supplies, insurance, taxes, maintenance, furnishing
    const fixedExpenses =
      utilitiesCost +
      suppliesCost +
      insuranceCost +
      taxCost +
      maintenanceCost +
      furnishingAmort
    // Revenue per night of occupancy: rate + cleanFee/stayLen
    const revenuePerNight = rate + cleanFee / stayLen
    // Variable cost per night: cleaningCost/stayLen + rate*platformFees% + rate*managementFee%
    const variableCostPerNight =
      parseCurrencyInput(cleaningCost) / stayLen +
      rate * (Number(platformFees) / 100) +
      rate * (Number(managementFee) / 100)
    const netPerNight = revenuePerNight - variableCostPerNight
    const breakevenNights = netPerNight > 0 ? fixedExpenses / netPerNight : 0
    const breakevenOccupancy =
      breakevenNights > 0 ? Math.min((breakevenNights / 365) * 100, 100) : 0

    return {
      nightsBooked,
      turnovers,
      grossRentalRevenue,
      cleaningFeeRevenue,
      totalGrossRevenue,
      cleaningCosts,
      platformCost,
      managementCost,
      utilitiesCost,
      suppliesCost,
      insuranceCost,
      taxCost,
      maintenanceCost,
      furnishingAmort,
      totalExpenses,
      noi,
      monthlyNet,
      revenuePerBedroom,
      expenseRatio,
      breakevenOccupancy,
      rate,
    }
  }, [
    nightlyRate,
    occupancy,
    bedrooms,
    cleaningFee,
    avgStayLength,
    cleaningCost,
    platformFees,
    managementFee,
    utilities,
    supplies,
    insurance,
    propertyTax,
    maintenance,
    furnishingCost,
  ])

  const rating = getSTRRating(results.monthlyNet)
  const hasInput = results.rate > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Input Panel */}
      <div className="lg:col-span-3 space-y-8 print:hidden">
        {/* Property */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Property
          </legend>
          <div className="mt-3 space-y-4">
            <InputField
              label="Average Nightly Rate"
              value={nightlyRate}
              onChange={setNightlyRate}
              placeholder="200"
              prefix="$"
              hint="Your average rate across seasons"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Occupancy Rate
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {occupancy}%
                </span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                National average is 55-65%. Top performers hit 75%+.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Number of Bedrooms
              </label>
              <div className="mt-1">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                >
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5 Bedrooms</option>
                  <option value="6">6+ Bedrooms</option>
                </select>
              </div>
            </div>
            <InputField
              label="Cleaning Fee per Stay"
              value={cleaningFee}
              onChange={setCleaningFee}
              placeholder="150"
              prefix="$"
              hint="Amount charged to guests per booking"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Average Stay Length (nights)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="14"
                  step="1"
                  value={avgStayLength}
                  onChange={(e) => setAvgStayLength(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {avgStayLength}
                </span>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Operating Expenses */}
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Operating Expenses
          </legend>
          <p className="mt-1 text-xs text-text-light">
            STR expenses are typically higher than long-term rentals due to
            turnover, furnishings, and platform fees.
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField
              label="Cleaning Cost per Turnover"
              value={cleaningCost}
              onChange={setCleaningCost}
              placeholder="100"
              prefix="$"
              hint="Your actual cleaning expense"
            />
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Platform Fees (Airbnb/VRBO)
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={platformFees}
                  onChange={(e) => setPlatformFees(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {platformFees}%
                </span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                Airbnb host-only fee is 3%. Split-fee model varies.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted">
                Property Management
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={managementFee}
                  onChange={(e) => setManagementFee(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">
                  {managementFee}%
                </span>
              </div>
              <p className="mt-1 text-xs text-text-light">
                Set to 0% if self-managed. STR managers charge 15-25%.
              </p>
            </div>
            <InputField
              label="Utilities (monthly)"
              value={utilities}
              onChange={setUtilities}
              placeholder="300"
              prefix="$"
              hint="Electric, water, gas, internet, cable"
            />
            <InputField
              label="Supplies & Consumables (monthly)"
              value={supplies}
              onChange={setSupplies}
              placeholder="100"
              prefix="$"
              hint="Toiletries, linens replacement, coffee, etc."
            />
            <InputField
              label="Insurance (annual)"
              value={insurance}
              onChange={setInsurance}
              placeholder="2,500"
              prefix="$"
              hint="STR-specific policy, not standard homeowners"
            />
            <InputField
              label="Property Taxes (annual)"
              value={propertyTax}
              onChange={setPropertyTax}
              placeholder="4,000"
              prefix="$"
            />
            <InputField
              label="Maintenance (annual)"
              value={maintenance}
              onChange={setMaintenance}
              placeholder="3,000"
              prefix="$"
              hint="Higher wear and tear than LTR"
            />
            <InputField
              label="Furnishing Cost (total)"
              value={furnishingCost}
              onChange={setFurnishingCost}
              placeholder="15,000"
              prefix="$"
              hint="Amortized over 3 years"
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
            calculatorPath="/calculators/str-revenue"
            calculatorName="STR Revenue Calculator"
            params={{
              nightlyRate,
              occupancy,
              bedrooms,
              cleaningFee,
              avgStayLength,
              cleaningCost,
              platformFees,
              managementFee,
              utilities,
              supplies,
              insurance,
              propertyTax,
              maintenance,
              furnishingCost,
            }}
          />

          {/* Monthly Net Income */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Monthly Net Income</p>
            <p
              className={`mt-1 text-5xl font-bold tabular-nums ${results.monthlyNet >= 0 ? 'text-primary' : 'text-red-600'}`}
            >
              {formatCurrency(Math.round(results.monthlyNet))}
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
              label="Annual NOI"
              value={formatCurrency(Math.round(results.noi))}
              bold
            />
            <ResultRow
              label="Gross Revenue"
              value={formatCurrency(Math.round(results.totalGrossRevenue))}
            />
            <ResultRow
              label="Total Expenses"
              value={`(${formatCurrency(Math.round(results.totalExpenses))})`}
              negative
            />
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Expense Ratio"
                value={`${results.expenseRatio.toFixed(1)}%`}
              />
              <div className="mt-3">
                <ResultRow
                  label="Revenue per Bedroom"
                  value={formatCurrency(
                    Math.round(results.revenuePerBedroom)
                  )}
                />
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <ResultRow
                label="Nights Booked"
                value={`${results.nightsBooked}`}
              />
              <div className="mt-3">
                <ResultRow
                  label="Turnovers / Year"
                  value={`${results.turnovers}`}
                />
              </div>
              {hasInput && results.breakevenOccupancy > 0 && (
                <div className="mt-3">
                  <ResultRow
                    label="Breakeven Occupancy"
                    value={`${results.breakevenOccupancy.toFixed(1)}%`}
                  />
                </div>
              )}
            </div>
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
              NOI = Gross Revenue &minus; Operating Expenses
            </p>
          </div>

          <SaveResultsCTA
            calculatorName="STR Revenue Calculator"
            context="str-revenue-calculator"
            results={{
              'Monthly Net Income': formatCurrency(Math.round(results.monthlyNet)),
              'Annual NOI': formatCurrency(Math.round(results.noi)),
              'Gross Revenue': formatCurrency(Math.round(results.totalGrossRevenue)),
              'Expense Ratio': `${results.expenseRatio.toFixed(1)}%`,
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
