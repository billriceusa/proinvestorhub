'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { LenderData } from '@/data/lenders'
import { formatCurrency } from '@/data/lenders'
import { loanTypes } from '@/data/loan-types'
import { usStates } from '@/data/us-states'

type Scenario = {
  creditScore: string
  experience: string
  loanType: string
  propertyType: string
  loanAmount: string
  state: string
  priority: string
}

const defaultScenario: Scenario = {
  creditScore: '',
  experience: '',
  loanType: '',
  propertyType: '',
  loanAmount: '',
  state: '',
  priority: '',
}

const creditTiers = [
  { label: 'Under 600', value: '580' },
  { label: '600–639', value: '620' },
  { label: '640–679', value: '660' },
  { label: '680–719', value: '700' },
  { label: '720+', value: '740' },
]

const experienceLevels = [
  { label: 'First-time investor (0 deals)', value: 'none' },
  { label: '1–2 completed deals', value: 'beginner' },
  { label: '3–5 completed deals', value: 'intermediate' },
  { label: '5+ completed deals', value: 'experienced' },
]

const loanAmountRanges = [
  { label: 'Under $75K', value: '50000' },
  { label: '$75K–$150K', value: '100000' },
  { label: '$150K–$300K', value: '225000' },
  { label: '$300K–$500K', value: '400000' },
  { label: '$500K–$1M', value: '750000' },
  { label: '$1M–$3M', value: '2000000' },
  { label: '$3M+', value: '4000000' },
]

const priorities = [
  { label: 'Lowest rate', value: 'rate' },
  { label: 'Fastest closing', value: 'speed' },
  { label: 'Lowest credit requirement', value: 'credit' },
  { label: 'Highest LTV (least cash needed)', value: 'ltv' },
  { label: 'No experience required', value: 'experience' },
]

const propertyTypeOptions = [
  { label: 'Single Family (1-4 units)', value: 'sfr' },
  { label: 'Multifamily (5+ units)', value: 'multifamily' },
  { label: 'Mixed Use', value: 'mixed-use' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Short-Term Rental / Airbnb', value: 'str' },
  { label: 'Condo', value: 'condo' },
  { label: 'Townhouse', value: 'townhouse' },
  { label: 'New Construction', value: 'new-construction' },
]

function matchAndScore(lender: LenderData, scenario: Scenario): { matches: boolean; score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []
  let matches = true

  // Credit score filter
  if (scenario.creditScore) {
    const credit = parseInt(scenario.creditScore)
    if (lender.minCreditScore > credit) {
      matches = false
    } else {
      const margin = credit - lender.minCreditScore
      if (margin >= 80) { score += 2; reasons.push('Well above credit minimum') }
      else if (margin >= 20) { score += 1; reasons.push('Meets credit requirement') }
      else { reasons.push('Meets minimum credit score') }
    }
  }

  // Experience filter
  if (scenario.experience) {
    const experienceOrder = ['none', 'beginner', 'intermediate', 'experienced']
    const userLevel = experienceOrder.indexOf(scenario.experience)
    const lenderLevel = experienceOrder.indexOf(lender.experienceRequired)
    if (lenderLevel > userLevel) {
      matches = false
    } else if (lenderLevel <= userLevel) {
      score += 1
      if (lender.experienceRequired === 'none') reasons.push('No experience required')
    }
  }

  // Loan type filter
  if (scenario.loanType) {
    if (!lender.loanTypeSlugs.includes(scenario.loanType)) {
      matches = false
    } else {
      score += 2
    }
  }

  // Property type filter
  if (scenario.propertyType) {
    if (!lender.propertyTypes.includes(scenario.propertyType)) {
      matches = false
    } else {
      score += 1
    }
  }

  // Loan amount filter
  if (scenario.loanAmount) {
    const amount = parseInt(scenario.loanAmount)
    if (amount < lender.minLoanAmount || amount > lender.maxLoanAmount) {
      matches = false
    } else {
      score += 1
    }
  }

  // State filter (nationwide always matches)
  if (scenario.state && !lender.nationwide) {
    matches = false // Regional lenders need explicit state matching — for safety, exclude
  }

  // Priority scoring
  if (scenario.priority && matches) {
    switch (scenario.priority) {
      case 'rate':
        score += (15 - lender.minRate) // Lower rate = higher score
        if (lender.minRate <= 7) reasons.push('Competitive rates')
        break
      case 'speed':
        // Parse first number from speed string
        const speedMatch = lender.speedToClose.match(/(\d+)/)
        if (speedMatch) {
          score += (30 - parseInt(speedMatch[1])) / 3
          if (parseInt(speedMatch[1]) <= 10) reasons.push('Fast closing')
        }
        break
      case 'credit':
        score += (750 - lender.minCreditScore) / 20
        if (lender.minCreditScore <= 620) reasons.push('Low credit requirement')
        break
      case 'ltv':
        score += lender.maxLtv / 10
        if (lender.maxLtv >= 80) reasons.push('High LTV available')
        break
      case 'experience':
        if (lender.experienceRequired === 'none') {
          score += 5
          reasons.push('No experience required')
        }
        break
    }
  }

  // Base rating bonus
  score += lender.editorRating

  // Featured bonus
  if (lender.featured) score += 0.5

  return { matches, score, reasons: [...new Set(reasons)] }
}

export function LenderFinder({ allLenders }: { allLenders: LenderData[] }) {
  const [scenario, setScenario] = useState<Scenario>(defaultScenario)
  const [showResults, setShowResults] = useState(false)

  const results = useMemo(() => {
    if (!showResults) return []
    return allLenders
      .map((lender) => ({
        lender,
        ...matchAndScore(lender, scenario),
      }))
      .filter((r) => r.matches)
      .sort((a, b) => b.score - a.score)
  }, [allLenders, scenario, showResults])

  const hasFilters = Object.values(scenario).some((v) => v !== '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowResults(true)
  }

  function handleReset() {
    setScenario(defaultScenario)
    setShowResults(false)
  }

  function updateField(field: keyof Scenario, value: string) {
    setScenario((prev) => ({ ...prev, [field]: value }))
    setShowResults(false)
  }

  return (
    <div>
      {/* Scenario Form */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-6 shadow-sm mb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Credit Score */}
          <div>
            <label htmlFor="credit" className="block text-sm font-semibold text-text mb-1.5">
              Credit Score Range
            </label>
            <select
              id="credit"
              value={scenario.creditScore}
              onChange={(e) => updateField('creditScore', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Any credit score</option>
              {creditTiers.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-semibold text-text mb-1.5">
              Investing Experience
            </label>
            <select
              id="experience"
              value={scenario.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Any experience level</option>
              {experienceLevels.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Loan Type */}
          <div>
            <label htmlFor="loanType" className="block text-sm font-semibold text-text mb-1.5">
              Loan Type Needed
            </label>
            <select
              id="loanType"
              value={scenario.loanType}
              onChange={(e) => updateField('loanType', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Any loan type</option>
              {loanTypes.sort((a, b) => a.sortOrder - b.sortOrder).map((lt) => (
                <option key={lt.slug} value={lt.slug}>{lt.name}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="propertyType" className="block text-sm font-semibold text-text mb-1.5">
              Property Type
            </label>
            <select
              id="propertyType"
              value={scenario.propertyType}
              onChange={(e) => updateField('propertyType', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Any property type</option>
              {propertyTypeOptions.map((pt) => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
          </div>

          {/* Loan Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-text mb-1.5">
              Loan Amount
            </label>
            <select
              id="amount"
              value={scenario.loanAmount}
              onChange={(e) => updateField('loanAmount', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Any amount</option>
              {loanAmountRanges.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-text mb-1.5">
              Investment State
            </label>
            <select
              id="state"
              value={scenario.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Any state</option>
              {usStates.map((s) => (
                <option key={s.abbreviation} value={s.abbreviation}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="sm:col-span-2 lg:col-span-3">
            <label htmlFor="priority" className="block text-sm font-semibold text-text mb-1.5">
              What Matters Most?
            </label>
            <select
              id="priority"
              value={scenario.priority}
              onChange={(e) => updateField('priority', e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">No preference</option>
              {priorities.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={!hasFilters}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find Matching Lenders
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-text-muted hover:text-text hover:border-text-muted transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {showResults && (
        <div>
          <h2 className="text-xl font-bold text-text mb-2">
            {results.length > 0
              ? `${results.length} Lender${results.length !== 1 ? 's' : ''} Match Your Scenario`
              : 'No Exact Matches Found'}
          </h2>

          {results.length === 0 && (
            <div className="rounded-xl border border-border bg-white p-8 text-center mb-8">
              <p className="text-text-muted mb-4">
                No lenders in our directory match all of your criteria. Try
                adjusting your filters — particularly credit score, loan amount,
                or property type.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4 mb-8">
              {results.map(({ lender, reasons }, i) => (
                <div
                  key={lender.slug}
                  className={`rounded-xl border bg-white p-6 shadow-sm transition-all ${
                    i === 0 ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3">
                        {i === 0 && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                            Best Match
                          </span>
                        )}
                        <Link
                          href={`/lenders/reviews/${lender.slug}`}
                          className="text-lg font-bold text-text hover:text-primary transition-colors"
                        >
                          {lender.name}
                        </Link>
                      </div>
                      <p className="mt-1 text-sm text-text-muted line-clamp-2">
                        {lender.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {lender.editorRating.toFixed(1)}
                      </p>
                      <p className="text-xs text-text-light">Editor Rating</p>
                    </div>
                  </div>

                  {/* Key Stats Row */}
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 text-xs">
                    <div>
                      <span className="text-text-light">Rates</span>
                      <p className="font-semibold text-text tabular-nums">
                        {lender.minRate}%–{lender.maxRate}%
                      </p>
                    </div>
                    <div>
                      <span className="text-text-light">Max LTV</span>
                      <p className="font-semibold text-text tabular-nums">{lender.maxLtv}%</p>
                    </div>
                    <div>
                      <span className="text-text-light">Min Credit</span>
                      <p className="font-semibold text-text tabular-nums">{lender.minCreditScore}</p>
                    </div>
                    <div>
                      <span className="text-text-light">Close In</span>
                      <p className="font-semibold text-text">{lender.speedToClose}</p>
                    </div>
                    <div>
                      <span className="text-text-light">Loan Range</span>
                      <p className="font-semibold text-text tabular-nums">
                        {formatCurrency(lender.minLoanAmount)}–{formatCurrency(lender.maxLoanAmount)}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-light">Fee</span>
                      <p className="font-semibold text-text">{lender.originationFee}</p>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  {reasons.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {reasons.map((reason) => (
                        <span
                          key={reason}
                          className="rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-xs font-medium text-green-700"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/lenders/reviews/${lender.slug}`}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
                    >
                      Full Review
                    </Link>
                    <Link
                      href="/lenders/compare"
                      className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      Compare
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
