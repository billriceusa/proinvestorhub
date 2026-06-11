'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  recommendFinancing,
  creativeOptions,
  creditBandToScore,
  DEAL_TYPE_OPTIONS,
  EXIT_OPTIONS,
  CONDITION_OPTIONS,
  TIMELINE_OPTIONS,
  CREDIT_OPTIONS,
  INCOME_OPTIONS,
  CASH_OPTIONS,
  FINANCED_OPTIONS,
  ENTITY_OPTIONS,
  type DealProfile,
} from '@/data/financing-matcher'
import { getLoanTypeBySlug } from '@/data/loan-types'
import { getLendersByLoanType, type LenderData } from '@/data/lenders'

type StepDef = {
  key: keyof DealProfile
  title: string
  subtitle?: string
  options: ReadonlyArray<{ value: string; label: string; help?: string }>
}

const STEPS: StepDef[] = [
  { key: 'dealType', title: 'What kind of deal is this?', subtitle: 'Start here — it shapes everything else.', options: DEAL_TYPE_OPTIONS },
  { key: 'exit', title: 'What’s your exit strategy?', options: EXIT_OPTIONS },
  { key: 'condition', title: 'What condition is the property in?', options: CONDITION_OPTIONS },
  { key: 'timeline', title: 'How fast do you need to close?', options: TIMELINE_OPTIONS },
  { key: 'credit', title: 'What’s your credit score?', options: CREDIT_OPTIONS },
  { key: 'income', title: 'How do you document income?', options: INCOME_OPTIONS },
  { key: 'cash', title: 'How much cash do you have to put in?', subtitle: 'For down payment plus reserves.', options: CASH_OPTIONS },
  { key: 'financedCount', title: 'How many financed properties do you own?', options: FINANCED_OPTIONS },
  { key: 'entity', title: 'How will you take title?', options: ENTITY_OPTIONS },
  { key: 'ownerOccupy', title: 'Will you live in the property?', subtitle: 'Even one unit of a 2–4 unit counts.', options: [
    { value: 'yes', label: 'Yes', help: 'At least a year' },
    { value: 'no', label: 'No', help: 'Pure investment' },
  ] },
]

export function FinancingMatcher({ initialProfile }: { initialProfile?: DealProfile } = {}) {
  const hasInitial = !!initialProfile && Object.values(initialProfile).some(Boolean)
  const [profile, setProfile] = useState<DealProfile>(initialProfile ?? {})
  const [step, setStep] = useState(0)
  const [showResults, setShowResults] = useState(hasInitial)

  const recommendations = useMemo(() => recommendFinancing(profile), [profile])
  const creative = useMemo(() => creativeOptions(profile), [profile])
  const creditCeiling = creditBandToScore(profile.credit)

  const answered = Object.values(profile).filter(Boolean).length
  const atResults = showResults || step >= STEPS.length

  function choose(key: keyof DealProfile, value: string) {
    setProfile((p) => ({ ...p, [key]: value }))
    if (step >= STEPS.length - 1) setShowResults(true)
    else setStep((s) => s + 1)
  }

  function restart() {
    setProfile({})
    setStep(0)
    setShowResults(false)
  }

  if (atResults) {
    return (
      <Results
        recommendations={recommendations}
        creative={creative}
        creditCeiling={creditCeiling}
        onRestart={restart}
        onAdjust={() => {
          setShowResults(false)
          setStep(0)
        }}
      />
    )
  }

  const current = STEPS[step]
  const selected = profile[current.key]

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
      {/* progress */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Question {step + 1} of {STEPS.length}
        </p>
        {profile.dealType && (
          <button
            onClick={() => setShowResults(true)}
            className="text-xs font-semibold text-primary hover:text-primary-light transition-colors"
          >
            See my options →
          </button>
        )}
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* question */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-text sm:text-2xl">{current.title}</h2>
        {current.subtitle && <p className="mt-1 text-sm text-text-muted">{current.subtitle}</p>}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {current.options.map((opt) => {
          const isSel = selected === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => choose(current.key, opt.value)}
              className={`rounded-xl border p-4 text-left transition-all ${
                isSel
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border bg-white hover:border-primary/40 hover:bg-surface'
              }`}
            >
              <span className="block font-semibold text-text">{opt.label}</span>
              {opt.help && <span className="mt-0.5 block text-xs text-text-muted">{opt.help}</span>}
            </button>
          )
        })}
      </div>

      {/* nav */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-sm font-medium text-text-muted hover:text-text disabled:opacity-40 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => {
            if (step >= STEPS.length - 1) setShowResults(true)
            else setStep((s) => s + 1)
          }}
          className="text-sm font-medium text-text-muted hover:text-text transition-colors"
        >
          Skip{answered > 0 ? '' : ' for now'} →
        </button>
      </div>
    </div>
  )
}

// ── Results ──────────────────────────────────────────────────────────────────

function Results({
  recommendations,
  creative,
  creditCeiling,
  onRestart,
  onAdjust,
}: {
  recommendations: ReturnType<typeof recommendFinancing>
  creative: ReturnType<typeof creativeOptions>
  creditCeiling?: number
  onRestart: () => void
  onAdjust: () => void
}) {
  const hasAny = recommendations.length > 0
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-text">
          {hasAny ? 'Your financing options' : 'Tell us a bit more'}
        </h2>
        <div className="flex gap-3 text-sm font-medium">
          <button onClick={onAdjust} className="text-primary hover:text-primary-light transition-colors">
            Adjust answers
          </button>
          <button onClick={onRestart} className="text-text-muted hover:text-text transition-colors">
            Start over
          </button>
        </div>
      </div>

      {!hasAny && (
        <p className="mt-4 text-text-muted">
          Pick a deal type and a few details and we’ll line up the financing that fits.
        </p>
      )}

      <div className="mt-6 space-y-5">
        {recommendations.map((rec, i) => (
          <RecCard key={rec.slug} rec={rec} rank={i + 1} creditCeiling={creditCeiling} />
        ))}
      </div>

      {creative.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Also worth considering
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {creative.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-surface p-5">
                <p className="font-semibold text-text">{c.name}</p>
                <p className="mt-1.5 text-sm text-text-muted leading-6">{c.blurb}</p>
                <p className="mt-2 text-xs text-text-light">
                  <span className="font-medium text-text-muted">When it fits:</span> {c.whenToUse}
                </p>
                {c.href && (
                  <Link
                    href={c.href}
                    className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                  >
                    Open the tool →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {hasAny && (
        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h3 className="text-lg font-bold text-text">Ready to get matched with a lender?</h3>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-text-muted">
            The Lender Finder ranks our reviewed lenders against your full profile and sends your top matches.
          </p>
          <Link
            href="/lenders/finder"
            className="mt-4 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Find my lender →
          </Link>
        </div>
      )}
    </div>
  )
}

function RecCard({
  rec,
  rank,
  creditCeiling,
}: {
  rec: ReturnType<typeof recommendFinancing>[number]
  rank: number
  creditCeiling?: number
}) {
  const lt = getLoanTypeBySlug(rec.slug)
  if (!lt) return null

  const lenders: LenderData[] = getLendersByLoanType(rec.slug)
    .filter((l) => (creditCeiling ? l.minCreditScore <= creditCeiling : true))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.editorRating - a.editorRating)
    .slice(0, 3)

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {rank === 1 && (
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                Best fit
              </span>
            )}
            <h3 className="text-xl font-bold text-text">{lt.name}</h3>
          </div>
          <p className="mt-1.5 text-sm text-text-muted leading-6">{lt.description}</p>
        </div>
        <div className="shrink-0 text-center">
          <div className="text-2xl font-bold text-primary tabular-nums">{rec.fit}%</div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-text-light">fit</div>
        </div>
      </div>

      {/* stat chips */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Rate" value={lt.typicalRateRange} />
        <Stat label="LTV" value={lt.typicalLtvRange} />
        <Stat label="Term" value={lt.typicalTermRange} />
        <Stat label="Min credit" value={lt.typicalMinCredit} />
      </div>

      {rec.chainNote && (
        <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-text">
          <span className="font-semibold">Strategy:</span> {rec.chainNote}
        </div>
      )}

      {(rec.reasons.length > 0 || rec.cautions.length > 0) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rec.reasons.length > 0 && (
            <ul className="space-y-1.5">
              {rec.reasons.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-muted">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
          {rec.cautions.length > 0 && (
            <ul className="space-y-1.5">
              {rec.cautions.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-muted">
                  <span className="mt-0.5 text-amber-600">!</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* lender preview */}
      {lenders.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Lenders to start with
          </p>
          <div className="mt-3 space-y-2">
            {lenders.map((l) => (
              <Link
                key={l.slug}
                href={`/lenders/reviews/${l.slug}`}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 hover:border-primary/40 hover:bg-surface transition-colors"
              >
                <span className="font-medium text-text">{l.name}</span>
                <span className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="tabular-nums">from {l.minRate}%</span>
                  <span className="tabular-nums text-accent">★ {l.editorRating.toFixed(1)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <Link href={`/lenders/${rec.slug}`} className="text-primary hover:text-primary-light transition-colors">
          Compare all {lt.shortName} lenders →
        </Link>
        <Link href={lt.relatedCalculator} className="text-primary hover:text-primary-light transition-colors">
          Run the numbers →
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-text-light">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-text">{value}</div>
    </div>
  )
}
