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

export function ClosingCostsCalculator() {
  const [purchase, setPurchase] = useState('')
  const [downPct, setDownPct] = useState('20')
  const [originationPct, setOriginationPct] = useState('1')
  const [titlePct, setTitlePct] = useState('0.5')
  const [transferPct, setTransferPct] = useState('0.5')
  const [appraisal, setAppraisal] = useState('600')
  const [inspection, setInspection] = useState('500')
  const [prepaids, setPrepaids] = useState('2,500')
  const [other, setOther] = useState('750')

  useCalculatorState({
    purchase: setPurchase,
    downPct: setDownPct,
    originationPct: setOriginationPct,
    titlePct: setTitlePct,
    transferPct: setTransferPct,
    appraisal: setAppraisal,
    inspection: setInspection,
    prepaids: setPrepaids,
    other: setOther,
  })

  const results = useMemo(() => {
    const price = parseCurrencyInput(purchase)
    const down = price * (Number(downPct) / 100)
    const loanAmount = Math.max(0, price - down)

    const origination = loanAmount * (Number(originationPct) / 100)
    const title = price * (Number(titlePct) / 100)
    const transfer = price * (Number(transferPct) / 100)
    const appr = parseCurrencyInput(appraisal)
    const insp = parseCurrencyInput(inspection)
    const pre = parseCurrencyInput(prepaids)
    const oth = parseCurrencyInput(other)

    const totalClosing = origination + title + transfer + appr + insp + pre + oth
    const pctOfPrice = price > 0 ? (totalClosing / price) * 100 : 0
    const cashToClose = down + totalClosing

    return {
      price,
      down,
      loanAmount,
      origination,
      title,
      transfer,
      appr,
      insp,
      pre,
      oth,
      totalClosing,
      pctOfPrice,
      cashToClose,
    }
  }, [purchase, downPct, originationPct, titlePct, transferPct, appraisal, inspection, prepaids, other])

  const hasInput = results.price > 0

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-8 print:hidden">
        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            The Purchase
          </legend>
          <div className="mt-3 space-y-4">
            <InputField label="Purchase Price" value={purchase} onChange={setPurchase} placeholder="300,000" prefix="$" />
            <div>
              <label className="block text-sm font-medium text-text-muted">Down Payment (%)</label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={downPct}
                  onChange={(e) => setDownPct(e.target.value)}
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm font-medium text-text">{downPct}%</span>
              </div>
              {hasInput && (
                <p className="mt-1 text-xs text-text-light">
                  {formatCurrency(results.down)} down · {formatCurrency(results.loanAmount)} financed
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-text uppercase tracking-wide">
            Closing Cost Line Items
          </legend>
          <p className="mt-1 text-xs text-text-light">
            Defaults are typical national estimates — adjust each to your lender and state.
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <InputField label="Loan Origination (% of loan)" value={originationPct} onChange={setOriginationPct} placeholder="1" suffix="%" raw />
            <InputField label="Title & Settlement (% of price)" value={titlePct} onChange={setTitlePct} placeholder="0.5" suffix="%" raw />
            <InputField label="Transfer / Recording (% of price)" value={transferPct} onChange={setTransferPct} placeholder="0.5" suffix="%" raw />
            <InputField label="Appraisal" value={appraisal} onChange={setAppraisal} placeholder="600" prefix="$" />
            <InputField label="Inspection" value={inspection} onChange={setInspection} placeholder="500" prefix="$" />
            <InputField label="Prepaids / Escrow" value={prepaids} onChange={setPrepaids} placeholder="2,500" prefix="$" hint="Prepaid taxes, insurance, interest." />
            <InputField label="Other Fees" value={other} onChange={setOther} placeholder="750" prefix="$" hint="Credit, flood cert, courier, etc." />
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wide">Results</h2>

          <CalculatorActions
            calculatorPath="/calculators/closing-costs"
            calculatorName="Closing Cost Calculator"
            params={{ purchase, downPct, originationPct, titlePct, transferPct, appraisal, inspection, prepaids, other }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">Estimated Closing Costs</p>
            <p className="mt-1 text-5xl font-bold text-primary tabular-nums">
              {formatCurrency(results.totalClosing)}
            </p>
            {hasInput && (
              <p className="mt-2 text-sm font-medium text-text-muted">
                {results.pctOfPrice.toFixed(1)}% of purchase price
              </p>
            )}
          </div>

          <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4 text-center">
            <p className="text-xs text-text-muted">Total Cash to Close</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-text">
              {formatCurrency(results.cashToClose)}
            </p>
            <p className="mt-1 text-xs text-text-light">down payment + closing costs</p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <ResultRow label="Loan Origination" value={formatCurrency(results.origination)} />
            <ResultRow label="Title & Settlement" value={formatCurrency(results.title)} />
            <ResultRow label="Transfer / Recording" value={formatCurrency(results.transfer)} />
            <ResultRow label="Appraisal" value={formatCurrency(results.appr)} />
            <ResultRow label="Inspection" value={formatCurrency(results.insp)} />
            <ResultRow label="Prepaids / Escrow" value={formatCurrency(results.pre)} />
            <ResultRow label="Other Fees" value={formatCurrency(results.oth)} />
            <div className="border-t border-border pt-3">
              <ResultRow label="Total Closing Costs" value={formatCurrency(results.totalClosing)} bold />
            </div>
          </div>

          {hasInput && (
            <div className="mt-6 rounded-lg bg-surface p-4 text-xs text-text-muted leading-5">
              Closing costs typically run 2–5% of the purchase price and vary widely by state and
              lender — transfer taxes especially. This is a planning estimate; your Loan Estimate and
              Closing Disclosure are the binding figures.
            </div>
          )}

          <SaveResultsCTA
            calculatorName="Closing Cost Calculator"
            context="closing-costs-calculator"
            results={{
              'Total Closing Costs': formatCurrency(results.totalClosing),
              '% of Price': `${results.pctOfPrice.toFixed(1)}%`,
              'Total Cash to Close': formatCurrency(results.cashToClose),
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-sm">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light text-sm">{suffix}</span>
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
