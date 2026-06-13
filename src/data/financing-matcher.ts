/**
 * Financing Matcher — decision engine.
 *
 * Takes an investor's DEAL profile and recommends which financing TYPE(s) fit,
 * with "why it fits" / "watch out" reasoning, then the UI hands off to the
 * existing lender pool (getLendersByLoanType) and Lender Finder.
 *
 * This module is pure data + logic (no React) so the recommendation rules are
 * unit-testable. The 12 institutional types come from loan-types.ts; creative
 * strategies (seller financing, subject-to, etc.) surface as educational
 * "also consider" cards per the locked v1 scope.
 */

import type { LoanTypeData } from './loan-types'
import { loanTypes } from './loan-types'

// ── Deal profile (the wizard inputs) ─────────────────────────────────────────
// Every field optional: undefined / '' means "not sure / skipped".

export type DealType =
  | 'turnkey-rental'
  | 'value-add-brrrr'
  | 'flip'
  | 'ground-up'
  | 'short-term-rental'
  | 'multifamily-5plus'
  | 'wholesale'

export type ExitStrategy = 'hold' | 'refi-hold' | 'sell-after-rehab' | '1031'
export type Condition = 'turnkey' | 'light-cosmetic' | 'heavy-rehab' | 'tear-down'
export type Timeline = 'urgent' | 'weeks' | 'normal' | 'flexible'
export type CreditBand = '760plus' | '700-759' | '660-699' | '620-659' | 'below-620'
export type IncomeDocs = 'w2' | 'self-employed' | 'no-doc'
export type CashBand = 'under-25k' | '25-50k' | '50-100k' | '100k-plus'
export type FinancedCount = '0-4' | '5-9' | '10plus'
export type Entity = 'personal' | 'llc'
export type YesNo = 'yes' | 'no'

export type DealProfile = {
  dealType?: DealType
  exit?: ExitStrategy
  condition?: Condition
  timeline?: Timeline
  credit?: CreditBand
  income?: IncomeDocs
  cash?: CashBand
  financedCount?: FinancedCount
  entity?: Entity
  ownerOccupy?: YesNo
}

type Slug = LoanTypeData['slug']

export type Recommendation = {
  slug: Slug
  fit: number // 0–100, for display
  raw: number // unclamped score, for ranking (can exceed 100)
  reasons: string[]
  cautions: string[]
  chainNote?: string
}

export type CreativeOption = {
  id: string
  name: string
  blurb: string
  whenToUse: string
  href?: string // only set when a live destination exists (e.g. the HELOC calculator)
}

// ── Wizard option metadata (consumed by the component) ───────────────────────

export const DEAL_TYPE_OPTIONS: Array<{ value: DealType; label: string; help: string }> = [
  { value: 'turnkey-rental', label: 'Turnkey rental', help: 'Move-in-ready buy-and-hold' },
  { value: 'value-add-brrrr', label: 'Value-add / BRRRR', help: 'Rehab, rent, refinance, repeat' },
  { value: 'flip', label: 'Fix & flip', help: 'Rehab and resell for profit' },
  { value: 'ground-up', label: 'Ground-up build', help: 'New construction from land' },
  { value: 'short-term-rental', label: 'Short-term rental', help: 'Airbnb / VRBO' },
  { value: 'multifamily-5plus', label: 'Multifamily (5+ units)', help: 'Commercial-size apartments' },
  { value: 'wholesale', label: 'Wholesale', help: 'Assign the contract, no long-term hold' },
]

export const EXIT_OPTIONS: Array<{ value: ExitStrategy; label: string; help: string }> = [
  { value: 'hold', label: 'Hold long-term', help: 'Keep it and cash flow' },
  { value: 'refi-hold', label: 'Refinance & hold (BRRRR)', help: 'Pull capital back out, keep the asset' },
  { value: 'sell-after-rehab', label: 'Sell after rehab', help: 'Flip it for a quick gain' },
  { value: '1031', label: '1031 into the next deal', help: 'Defer taxes, trade up' },
]

export const CONDITION_OPTIONS: Array<{ value: Condition; label: string; help: string }> = [
  { value: 'turnkey', label: 'Turnkey', help: 'Rent-ready as-is' },
  { value: 'light-cosmetic', label: 'Light cosmetic', help: 'Paint, floors, minor updates' },
  { value: 'heavy-rehab', label: 'Heavy rehab', help: 'Major systems / gut renovation' },
  { value: 'tear-down', label: 'Tear-down', help: 'Demolish and rebuild' },
]

export const TIMELINE_OPTIONS: Array<{ value: Timeline; label: string; help: string }> = [
  { value: 'urgent', label: 'Under 14 days', help: 'Auction, competing with cash' },
  { value: 'weeks', label: '2–4 weeks', help: 'Tight but workable' },
  { value: 'normal', label: '30–45 days', help: 'Standard timeline' },
  { value: 'flexible', label: 'Flexible', help: 'No rush' },
]

export const CREDIT_OPTIONS: Array<{ value: CreditBand; label: string }> = [
  { value: '760plus', label: '760+' },
  { value: '700-759', label: '700–759' },
  { value: '660-699', label: '660–699' },
  { value: '620-659', label: '620–659' },
  { value: 'below-620', label: 'Below 620' },
]

export const INCOME_OPTIONS: Array<{ value: IncomeDocs; label: string; help: string }> = [
  { value: 'w2', label: 'W-2 / documented', help: 'Tax returns and pay stubs available' },
  { value: 'self-employed', label: 'Self-employed', help: 'Complex returns, heavy write-offs' },
  { value: 'no-doc', label: 'Prefer no income docs', help: 'Qualify on the property instead' },
]

export const CASH_OPTIONS: Array<{ value: CashBand; label: string }> = [
  { value: 'under-25k', label: 'Under $25k' },
  { value: '25-50k', label: '$25k–$50k' },
  { value: '50-100k', label: '$50k–$100k' },
  { value: '100k-plus', label: '$100k+' },
]

export const FINANCED_OPTIONS: Array<{ value: FinancedCount; label: string; help: string }> = [
  { value: '0-4', label: '0–4 properties', help: '' },
  { value: '5-9', label: '5–9 properties', help: 'Reserves ramp up here' },
  { value: '10plus', label: '10+ properties', help: 'Past the conventional cap' },
]

export const ENTITY_OPTIONS: Array<{ value: Entity; label: string }> = [
  { value: 'personal', label: 'My personal name' },
  { value: 'llc', label: 'An LLC / entity' },
]

// ── Scoring tables ───────────────────────────────────────────────────────────

// Base relevance of each financing type to each deal type (0–100).
const BASE: Record<Slug, Partial<Record<DealType, number>>> = {
  'dscr-loans': { 'turnkey-rental': 78, 'value-add-brrrr': 58, flip: 8, 'ground-up': 12, 'short-term-rental': 76, 'multifamily-5plus': 30, wholesale: 4 },
  'conventional-investment': { 'turnkey-rental': 80, 'value-add-brrrr': 40, flip: 5, 'ground-up': 10, 'short-term-rental': 66, 'multifamily-5plus': 18, wholesale: 0 },
  'portfolio-loans': { 'turnkey-rental': 54, 'value-add-brrrr': 46, flip: 10, 'ground-up': 22, 'short-term-rental': 50, 'multifamily-5plus': 56, wholesale: 4 },
  'hard-money-loans': { 'turnkey-rental': 14, 'value-add-brrrr': 80, flip: 88, 'ground-up': 40, 'short-term-rental': 24, 'multifamily-5plus': 34, wholesale: 56 },
  'fix-and-flip-loans': { 'turnkey-rental': 6, 'value-add-brrrr': 70, flip: 90, 'ground-up': 28, 'short-term-rental': 14, 'multifamily-5plus': 18, wholesale: 34 },
  'bridge-loans': { 'turnkey-rental': 18, 'value-add-brrrr': 68, flip: 54, 'ground-up': 34, 'short-term-rental': 28, 'multifamily-5plus': 64, wholesale: 22 },
  'construction-loans': { 'turnkey-rental': 3, 'value-add-brrrr': 30, flip: 24, 'ground-up': 92, 'short-term-rental': 14, 'multifamily-5plus': 44, wholesale: 0 },
  'fix-and-rent-loans': { 'turnkey-rental': 20, 'value-add-brrrr': 90, flip: 14, 'ground-up': 18, 'short-term-rental': 40, 'multifamily-5plus': 16, wholesale: 2 },
  'commercial-loans': { 'turnkey-rental': 10, 'value-add-brrrr': 22, flip: 6, 'ground-up': 40, 'short-term-rental': 14, 'multifamily-5plus': 90, wholesale: 0 },
  'bank-statement-loans': { 'turnkey-rental': 54, 'value-add-brrrr': 34, flip: 6, 'ground-up': 10, 'short-term-rental': 50, 'multifamily-5plus': 16, wholesale: 0 },
  'private-money-loans': { 'turnkey-rental': 24, 'value-add-brrrr': 56, flip: 60, 'ground-up': 46, 'short-term-rental': 26, 'multifamily-5plus': 38, wholesale: 60 },
  'sba-loans': { 'turnkey-rental': 6, 'value-add-brrrr': 8, flip: 0, 'ground-up': 30, 'short-term-rental': 8, 'multifamily-5plus': 40, wholesale: 0 },
}

// Minimum credit each type realistically needs (gate below this).
const CREDIT_FLOOR: Record<Slug, number> = {
  'dscr-loans': 620,
  'conventional-investment': 660,
  'portfolio-loans': 640,
  'hard-money-loans': 0,
  'fix-and-flip-loans': 620,
  'bridge-loans': 620,
  'construction-loans': 680,
  'fix-and-rent-loans': 660,
  'commercial-loans': 660,
  'bank-statement-loans': 660,
  'private-money-loans': 0,
  'sba-loans': 680,
}

const LONG_TERM: Slug[] = ['dscr-loans', 'conventional-investment', 'portfolio-loans', 'bank-statement-loans']
const SHORT_TERM: Slug[] = ['hard-money-loans', 'fix-and-flip-loans', 'bridge-loans', 'private-money-loans']

const CREDIT_VALUE: Record<CreditBand, number> = {
  '760plus': 760,
  '700-759': 700,
  '660-699': 660,
  '620-659': 620,
  'below-620': 580,
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

// ── Core: score a single financing type against the profile ──────────────────

function scoreType(slug: Slug, p: DealProfile): Recommendation | null {
  const base = p.dealType ? BASE[slug][p.dealType] : 50
  if (base === undefined) return null
  let fit = base
  const reasons: string[] = []
  const cautions: string[] = []
  let chainNote: string | undefined

  // Hard gate: SBA requires owner-occupancy.
  if (slug === 'sba-loans' && p.ownerOccupy === 'no') return null

  // Hard gate: conventional caps at 10 financed properties.
  if (slug === 'conventional-investment' && p.financedCount === '10plus') return null

  // Credit gate.
  if (p.credit && CREDIT_VALUE[p.credit] < CREDIT_FLOOR[slug]) return null
  if (p.credit && CREDIT_VALUE[p.credit] >= CREDIT_FLOOR[slug] + 80 && CREDIT_FLOOR[slug] >= 640) {
    fit += 4
    reasons.push('Your credit clears this product comfortably, unlocking its best pricing')
  }

  // Exit strategy.
  if (p.exit === 'sell-after-rehab') {
    if (LONG_TERM.includes(slug)) {
      fit -= 45
      cautions.push('30-year products carry prepayment penalties — a poor fit for a quick sale')
    }
    if (SHORT_TERM.includes(slug)) {
      fit += 12
      reasons.push('Short-term, interest-only structure matches a fast resale')
    }
  }
  if (p.exit === 'refi-hold') {
    if (slug === 'fix-and-rent-loans') {
      fit += 16
      reasons.push('One loan covers the rehab and the long-term refinance — the BRRRR shortcut')
    }
    if (slug === 'hard-money-loans' || slug === 'bridge-loans') {
      chainNote = 'Acquire now, then refinance into a DSCR loan once the property is stabilized'
    }
    if (slug === 'dscr-loans') {
      fit += 10
      reasons.push('The standard permanent refinance to end a BRRRR and pull your capital back out')
    }
  }
  if (p.exit === 'hold' && LONG_TERM.includes(slug)) {
    fit += 6
    reasons.push('Built for long-term holds')
  }
  if (p.exit === '1031' && (LONG_TERM.includes(slug) || slug === 'commercial-loans')) {
    fit += 4
    reasons.push('Works cleanly as financing for a 1031 replacement property')
  }

  // Property condition.
  if ((p.condition === 'heavy-rehab' || p.condition === 'tear-down')) {
    if (slug === 'dscr-loans' || slug === 'conventional-investment' || slug === 'bank-statement-loans') {
      fit -= 30
      cautions.push('Agency and DSCR lenders generally require a rent-ready property — use this for the refinance, not the rehab')
    }
    if (slug === 'hard-money-loans' || slug === 'fix-and-flip-loans' || slug === 'private-money-loans' || slug === 'bridge-loans' || slug === 'fix-and-rent-loans') {
      fit += 10
      reasons.push('Funds the purchase and the rehab — built for distressed property')
    }
  }
  if (p.condition === 'tear-down' && slug === 'construction-loans') {
    fit += 8
    reasons.push('Draw-based funding designed for ground-up rebuilds')
  }
  if ((p.condition === 'turnkey' || p.condition === 'light-cosmetic') && (slug === 'dscr-loans' || slug === 'conventional-investment')) {
    fit += 6
    reasons.push('A rent-ready property qualifies for permanent financing right away')
  }

  // Timeline / speed.
  if (p.timeline === 'urgent') {
    if (slug === 'hard-money-loans') { fit += 16; reasons.push('Closes in 7–14 days — the fastest money available') }
    if (slug === 'private-money-loans') { fit += 12; reasons.push('A private lender can fund in days') }
    if (slug === 'bridge-loans') { fit += 8; reasons.push('Fast closings for time-sensitive acquisitions') }
    if (slug === 'conventional-investment' || slug === 'dscr-loans' || slug === 'commercial-loans' || slug === 'sba-loans' || slug === 'bank-statement-loans') {
      fit -= 14
      cautions.push('Agency-style underwriting typically needs 30–45+ days to close')
    }
  }

  // Income documentation.
  if (p.income === 'self-employed' || p.income === 'no-doc') {
    if (slug === 'conventional-investment') {
      fit -= p.income === 'no-doc' ? 50 : 22
      cautions.push('Conventional needs full tax returns and W-2s — hard for self-employed borrowers')
    }
    if (slug === 'dscr-loans') { fit += 10; reasons.push('Qualifies on the property’s rent, not your personal income') }
    if (slug === 'bank-statement-loans' && p.income === 'self-employed') { fit += 28; reasons.push('Uses 12–24 months of bank statements instead of tax returns') }
    if (slug === 'bank-statement-loans' && p.income === 'no-doc') { fit -= 8 }
    if (slug === 'private-money-loans' || slug === 'hard-money-loans') { fit += 6; reasons.push('Asset-based — minimal personal income scrutiny') }
  }
  if (p.income === 'w2' && slug === 'conventional-investment') {
    fit += 10
    reasons.push('Documented W-2 income earns the lowest investor rates')
  }

  // Entity.
  if (p.entity === 'llc') {
    if (slug === 'dscr-loans') { fit += 8; reasons.push('Close directly in your LLC') }
    if (slug === 'portfolio-loans' || slug === 'commercial-loans' || slug === 'hard-money-loans' || slug === 'private-money-loans') { fit += 4 }
    if (slug === 'conventional-investment') { fit -= 12; cautions.push('Conventional usually requires title in your personal name, not an LLC') }
  }

  // Portfolio size.
  if (p.financedCount === '10plus') {
    if (slug === 'dscr-loans') { fit += 10; reasons.push('No cap on the number of financed properties') }
    if (slug === 'portfolio-loans') { fit += 10; reasons.push('Blanket and portfolio loans scale past the conventional cap') }
    if (slug === 'commercial-loans') { fit += 4 }
  }
  if (p.financedCount === '5-9') {
    if (slug === 'conventional-investment') { fit -= 10; cautions.push('Properties 5–10 require six months of reserves each under Fannie/Freddie') }
    if (slug === 'portfolio-loans' || slug === 'dscr-loans') { fit += 4 }
  }

  // Owner-occupy unlocks SBA's best case.
  if (slug === 'sba-loans' && p.ownerOccupy === 'yes') {
    fit += 18
    reasons.push('Owner-occupying 51%+ unlocks SBA’s 10%-down, below-market terms')
  }

  const display = clamp(fit)
  if (display <= 0) return null
  return { slug, fit: display, raw: fit, reasons: reasons.slice(0, 3), cautions: cautions.slice(0, 2), chainNote }
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Rank financing types for a deal. Returns the strongest matches (fit-sorted),
 * always at least 2 when any are viable, capped at `max`.
 */
export function recommendFinancing(profile: DealProfile, max = 4): Recommendation[] {
  const scored = loanTypes
    .map((lt) => scoreType(lt.slug, profile))
    .filter((r): r is Recommendation => r !== null)
    .sort((a, b) => b.raw - a.raw)

  const strong = scored.filter((r) => r.fit >= 45)
  const result = strong.length >= 2 ? strong : scored.slice(0, 2)
  return result.slice(0, max)
}

const CREATIVE_CATALOG: Array<CreativeOption & { when: (p: DealProfile) => boolean }> = [
  {
    id: 'heloc-cashout',
    name: 'HELOC / cash-out on equity you already hold',
    blurb: 'Tap equity in a property you own to fund the down payment on this one — often cheaper than a partner or hard money.',
    whenToUse: 'You have equity in another property and are short on cash for this deal.',
    href: '/calculators/heloc',
    when: (p) => p.cash === 'under-25k' || p.cash === '25-50k' || p.exit === 'refi-hold',
  },
  {
    id: 'fha-va-househack',
    name: 'FHA / VA house-hack (owner-occupied)',
    blurb: 'Live in one unit of a 2–4 unit and put as little as 0–3.5% down with owner-occupied financing.',
    whenToUse: 'You’re willing to live in the property for a year.',
    href: '/financing/house-hacking',
    when: (p) => p.ownerOccupy === 'yes',
  },
  {
    id: 'seller-financing',
    name: 'Seller financing',
    blurb: 'The seller acts as the bank. No institutional qualifying, and the terms are negotiable.',
    whenToUse: 'Your credit or income docs are a hurdle, or you want creative terms.',
    href: '/financing/seller-financing',
    when: (p) => p.cash === 'under-25k' || p.credit === 'below-620' || p.income === 'no-doc',
  },
  {
    id: 'subject-to',
    name: 'Subject-to (take over the existing loan)',
    blurb: 'Acquire the property and keep the seller’s existing mortgage in place. Powerful, but watch the due-on-sale clause.',
    whenToUse: 'Low cash and a motivated seller with an assumable-in-practice low-rate loan.',
    href: '/financing/subject-to',
    when: (p) => p.cash === 'under-25k' || p.income === 'no-doc',
  },
  {
    id: 'partnerships-jv',
    name: 'Partnership / JV',
    blurb: 'Bring the deal and the work; a partner brings the capital. Split the returns.',
    whenToUse: 'You have little of your own cash but a strong deal.',
    href: '/financing/partnerships-jv',
    when: (p) => p.cash === 'under-25k',
  },
  {
    id: 'syndication',
    name: 'Syndication',
    blurb: 'Pool capital from passive investors to fund a larger deal than you could alone.',
    whenToUse: 'You’re scaling into larger multifamily or commercial.',
    href: '/financing/real-estate-syndication',
    when: (p) => p.dealType === 'multifamily-5plus',
  },
  {
    id: 'transactional-funding',
    name: 'Transactional funding',
    blurb: 'One-day funding for a wholesale double-close — you never use your own cash.',
    whenToUse: 'You’re wholesaling and need to fund a simultaneous close.',
    href: '/financing/transactional-funding',
    when: (p) => p.dealType === 'wholesale',
  },
]

/** "Also worth considering" creative-finance options for this profile (max 3). */
export function creativeOptions(profile: DealProfile): CreativeOption[] {
  return CREATIVE_CATALOG.filter((c) => c.when(profile))
    .slice(0, 3)
    .map((c) => ({ id: c.id, name: c.name, blurb: c.blurb, whenToUse: c.whenToUse, href: c.href }))
}

/** Map a deal-type value to a one-line plain-English summary (for scenario copy). */
export function dealTypeLabel(value?: DealType): string {
  return DEAL_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? 'your deal'
}

/** Numeric credit ceiling for a band — used to filter lenders by their min credit score. */
export function creditBandToScore(band?: CreditBand): number | undefined {
  return band ? CREDIT_VALUE[band] : undefined
}
