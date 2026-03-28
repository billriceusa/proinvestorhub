/**
 * Lender-vs-lender comparison pairings for programmatic SEO pages.
 * Each pairing generates a /lenders/compare/[slug] page.
 *
 * Pairings are chosen based on:
 * 1. Shared loan types (investors comparing similar products)
 * 2. Brand recognition (investors searching "[A] vs [B]")
 * 3. Competitive positioning (different strengths worth comparing)
 */

import { lenders, type LenderData } from './lenders'
import { loanTypes } from './loan-types'

export type LenderComparison = {
  slug: string
  lenderA: string // slug
  lenderB: string // slug
  title: string
  metaTitle: string
  metaDescription: string
  angle: string // editorial angle for the comparison
  sharedLoanTypes: string[] // loan type slugs they both offer
}

export const lenderComparisons: LenderComparison[] = [
  // ── Top-tier all-around lender matchups ──────────────
  {
    slug: 'kiavi-vs-lima-one',
    lenderA: 'kiavi',
    lenderB: 'lima-one-capital',
    title: 'Kiavi vs Lima One Capital: Which Is Better for Real Estate Investors?',
    metaTitle: 'Kiavi vs Lima One Capital 2026: Rates, LTV & Side-by-Side Review | ProInvestorHub',
    metaDescription: 'Kiavi vs Lima One Capital — compare rates, LTV, closing speed, and products. Expert analysis from a 30-year lending veteran helps you choose the right lender.',
    angle: 'Both are top-tier multi-product lenders. Kiavi wins on tech and speed for experienced borrowers; Lima One wins on product breadth (construction, multifamily) and accessibility for new investors.',
    sharedLoanTypes: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans', 'fix-and-rent-loans'],
  },
  {
    slug: 'kiavi-vs-rcn-capital',
    lenderA: 'kiavi',
    lenderB: 'rcn-capital',
    title: 'Kiavi vs RCN Capital: Comparing Two Top Investor Lenders',
    metaTitle: 'Kiavi vs RCN Capital 2026: Rates, Credit Requirements & Review | ProInvestorHub',
    metaDescription: 'Kiavi vs RCN Capital compared. Rates, credit score minimums, LTV, and closing speed side by side. Find which lender fits your investment strategy.',
    angle: 'Kiavi has the better tech platform and volume pricing; RCN Capital accepts lower credit scores (620 vs 640) and offers foreign national programs. Choose RCN if credit is a factor.',
    sharedLoanTypes: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans'],
  },
  {
    slug: 'lima-one-vs-rcn-capital',
    lenderA: 'lima-one-capital',
    lenderB: 'rcn-capital',
    title: 'Lima One Capital vs RCN Capital: Full Comparison for Investors',
    metaTitle: 'Lima One vs RCN Capital 2026: Rates, Products & Expert Review | ProInvestorHub',
    metaDescription: 'Lima One Capital vs RCN Capital — which is better for your deal? Compare rates, LTV, construction options, and credit requirements side by side.',
    angle: 'Lima One offers construction financing and multifamily that RCN doesn\'t. RCN has lower credit minimums. Both work with first-time investors.',
    sharedLoanTypes: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans'],
  },

  // ── DSCR specialist matchups ────────────────────────
  {
    slug: 'kiavi-vs-visio-lending',
    lenderA: 'kiavi',
    lenderB: 'visio-lending',
    title: 'Kiavi vs Visio Lending: Which DSCR Lender Is Better?',
    metaTitle: 'Kiavi vs Visio Lending 2026: DSCR Loan Comparison | ProInvestorHub',
    metaDescription: 'Kiavi vs Visio Lending for DSCR loans. Compare rates, prepayment penalties, and product range. One is a multi-product platform, the other a DSCR specialist.',
    angle: 'Kiavi offers flips + DSCR on one platform; Visio is DSCR-only but with deep expertise. Visio has a 5-year prepay penalty vs Kiavi\'s 3-year — a key difference for investors who may sell.',
    sharedLoanTypes: ['dscr-loans'],
  },
  {
    slug: 'visio-lending-vs-griffin-funding',
    lenderA: 'visio-lending',
    lenderB: 'griffin-funding',
    title: 'Visio Lending vs Griffin Funding: DSCR Loan Comparison',
    metaTitle: 'Visio Lending vs Griffin Funding 2026: DSCR Rates & Terms | ProInvestorHub',
    metaDescription: 'Visio Lending vs Griffin Funding for DSCR rental loans. Compare rates, credit requirements, and bank statement options. Expert side-by-side review.',
    angle: 'Both strong DSCR lenders. Griffin adds bank statement programs and accepts 620 credit; Visio requires 680 but has deeper DSCR specialization. Griffin is better for self-employed borrowers.',
    sharedLoanTypes: ['dscr-loans'],
  },
  {
    slug: 'angel-oak-vs-griffin-funding',
    lenderA: 'angel-oak',
    lenderB: 'griffin-funding',
    title: 'Angel Oak vs Griffin Funding: Non-QM Lender Comparison',
    metaTitle: 'Angel Oak vs Griffin Funding 2026: DSCR & Bank Statement Loans | ProInvestorHub',
    metaDescription: 'Angel Oak vs Griffin Funding — two top non-QM lenders compared. DSCR and bank statement programs, rates, credit requirements, and expert analysis.',
    angle: 'Both offer DSCR + bank statement programs. Angel Oak is larger and works primarily through brokers; Griffin is more direct-to-consumer with a lower credit floor (620 vs 660).',
    sharedLoanTypes: ['dscr-loans', 'bank-statement-loans'],
  },
  {
    slug: 'defy-mortgage-vs-griffin-funding',
    lenderA: 'defy-mortgage',
    lenderB: 'griffin-funding',
    title: 'Defy Mortgage vs Griffin Funding: Which Non-QM Lender Wins?',
    metaTitle: 'Defy Mortgage vs Griffin Funding 2026: DSCR & STR Loan Review | ProInvestorHub',
    metaDescription: 'Defy Mortgage vs Griffin Funding for DSCR and bank statement loans. Which is better for Airbnb investors? Side-by-side rates, terms, and expert analysis.',
    angle: 'Defy is strongest for Airbnb/STR investors with explicit short-term rental DSCR programs. Griffin is more versatile with lower credit minimums. Both offer foreign national programs.',
    sharedLoanTypes: ['dscr-loans', 'bank-statement-loans'],
  },

  // ── Fix-and-flip matchups ───────────────────────────
  {
    slug: 'kiavi-vs-new-silver',
    lenderA: 'kiavi',
    lenderB: 'new-silver',
    title: 'Kiavi vs New Silver: Which Fix-and-Flip Lender Is Faster?',
    metaTitle: 'Kiavi vs New Silver 2026: Speed, Rates & Fix-and-Flip Review | ProInvestorHub',
    metaDescription: 'Kiavi vs New Silver for fix-and-flip loans. Compare closing speed (5 vs 10 days), rates, LTV, and technology platforms. Expert investor lender comparison.',
    angle: 'Both are tech-forward flip lenders. New Silver\'s instant term sheets and 5-day closings edge Kiavi on speed. Kiavi wins on DSCR products and volume pricing for repeat borrowers.',
    sharedLoanTypes: ['fix-and-flip-loans', 'dscr-loans', 'bridge-loans'],
  },
  {
    slug: 'new-silver-vs-groundfloor',
    lenderA: 'new-silver',
    lenderB: 'groundfloor',
    title: 'New Silver vs Groundfloor: Fix-and-Flip Lender Comparison',
    metaTitle: 'New Silver vs Groundfloor 2026: Flip Loan Rates & Terms | ProInvestorHub',
    metaDescription: 'New Silver vs Groundfloor for fix-and-flip loans. Compare rates, prepayment penalties, credit requirements, and closing speed. Expert analysis.',
    angle: 'New Silver is faster and accepts higher loan amounts; Groundfloor has no prepayment penalties and a lower credit floor (600). Groundfloor\'s crowdfunding model is unique.',
    sharedLoanTypes: ['fix-and-flip-loans', 'hard-money-loans'],
  },
  {
    slug: 'lima-one-vs-civic-financial',
    lenderA: 'lima-one-capital',
    lenderB: 'civic-financial',
    title: 'Lima One Capital vs Civic Financial: Full-Service Lender Comparison',
    metaTitle: 'Lima One vs Civic Financial 2026: Rates, Products & Review | ProInvestorHub',
    metaDescription: 'Lima One Capital vs Civic Financial Services — two full-service investor lenders compared. Flip, bridge, and DSCR products side by side with expert analysis.',
    angle: 'Both offer flip + bridge + DSCR under one roof. Lima One adds construction financing; Civic is bank-backed (Pacific Western) for extra stability. Lima One is more accessible to new investors.',
    sharedLoanTypes: ['hard-money-loans', 'fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
  },

  // ── Portfolio / scale matchups ──────────────────────
  {
    slug: 'corevest-vs-lima-one',
    lenderA: 'corevest',
    lenderB: 'lima-one-capital',
    title: 'CoreVest vs Lima One: Which Is Better for Portfolio Investors?',
    metaTitle: 'CoreVest vs Lima One 2026: Portfolio & DSCR Loan Comparison | ProInvestorHub',
    metaDescription: 'CoreVest vs Lima One Capital for portfolio investors. Blanket loans, construction, DSCR — compare terms for investors with 5+ properties. Expert review.',
    angle: 'CoreVest is built for scale (blanket loans, $100M+ capacity, build-to-rent) but requires 5+ deals experience and $500K minimum. Lima One is more accessible for investors still growing toward portfolio scale.',
    sharedLoanTypes: ['dscr-loans', 'bridge-loans', 'construction-loans'],
  },
  {
    slug: 'corevest-vs-velocity-mortgage',
    lenderA: 'corevest',
    lenderB: 'velocity-mortgage',
    title: 'CoreVest vs Velocity Mortgage: Portfolio Lender Comparison',
    metaTitle: 'CoreVest vs Velocity Mortgage 2026: Portfolio & Commercial Loans | ProInvestorHub',
    metaDescription: 'CoreVest vs Velocity Mortgage Capital for portfolio investors. Blanket loans, commercial DSCR, and build-to-rent options compared. Expert analysis.',
    angle: 'CoreVest specializes in blanket loans and build-to-rent; Velocity bridges residential and small commercial (5+ units). Velocity has a 20-year track record; CoreVest is backed by Redwood Trust.',
    sharedLoanTypes: ['dscr-loans'],
  },

  // ── Regional vs national ────────────────────────────
  {
    slug: 'kiavi-vs-tidal-loans',
    lenderA: 'kiavi',
    lenderB: 'tidal-loans',
    title: 'Kiavi vs Tidal Loans: National vs Texas-Focused Lender',
    metaTitle: 'Kiavi vs Tidal Loans 2026: Texas Investor Lender Comparison | ProInvestorHub',
    metaDescription: 'Kiavi (nationwide) vs Tidal Loans (Texas-focused) — which is better for Texas investors? Compare rates, speed, and local expertise. Expert review.',
    angle: 'Tidal Loans has deeper Texas market expertise and can close in 7 days; Kiavi offers better tech and more products. Texas-only investors should consider Tidal; multi-state investors need Kiavi.',
    sharedLoanTypes: ['hard-money-loans', 'fix-and-flip-loans', 'dscr-loans', 'bridge-loans'],
  },

  // ── Customer service focused ────────────────────────
  {
    slug: 'easy-street-vs-kiavi',
    lenderA: 'easy-street-capital',
    lenderB: 'kiavi',
    title: 'Easy Street Capital vs Kiavi: Service vs Technology',
    metaTitle: 'Easy Street Capital vs Kiavi 2026: Rates, Service & Comparison | ProInvestorHub',
    metaDescription: 'Easy Street Capital vs Kiavi — human touch vs tech platform. Compare DSCR and flip loan rates, closing speed, and borrower experience. Expert review.',
    angle: 'Easy Street wins on customer service and human communication; Kiavi wins on technology and volume pricing. First-time investors may prefer Easy Street\'s hand-holding; experienced flippers will appreciate Kiavi\'s efficiency.',
    sharedLoanTypes: ['dscr-loans', 'fix-and-flip-loans', 'bridge-loans'],
  },

  // ── STR / Airbnb focused ────────────────────────────
  {
    slug: 'defy-mortgage-vs-visio-lending',
    lenderA: 'defy-mortgage',
    lenderB: 'visio-lending',
    title: 'Defy Mortgage vs Visio Lending: DSCR for Airbnb & Rentals',
    metaTitle: 'Defy Mortgage vs Visio Lending 2026: STR & DSCR Comparison | ProInvestorHub',
    metaDescription: 'Defy Mortgage vs Visio Lending for DSCR loans. Which is better for Airbnb properties? Compare STR income policies, rates, and terms. Expert review.',
    angle: 'Defy explicitly accepts Airbnb/STR income for DSCR qualification using AirDNA data. Visio requires traditional leases for most programs. If you\'re building an STR portfolio, Defy is the clear choice.',
    sharedLoanTypes: ['dscr-loans'],
  },

  // ── Low credit / accessibility ──────────────────────
  {
    slug: 'rcn-capital-vs-groundfloor',
    lenderA: 'rcn-capital',
    lenderB: 'groundfloor',
    title: 'RCN Capital vs Groundfloor: Best Options for Lower Credit Scores',
    metaTitle: 'RCN Capital vs Groundfloor 2026: Low Credit Investor Loans | ProInvestorHub',
    metaDescription: 'RCN Capital vs Groundfloor for investors with lower credit scores. Compare minimums (600-620), rates, and product availability. Expert analysis.',
    angle: 'Both accept credit scores that most lenders won\'t touch. RCN offers more products (DSCR + flip + bridge) with a 620 minimum; Groundfloor accepts 600 but is flip-only with higher origination fees.',
    sharedLoanTypes: ['fix-and-flip-loans'],
  },

  // ── Small deal / low-cost market lenders ─────────────
  {
    slug: 'park-place-vs-groundfloor',
    lenderA: 'park-place-finance',
    lenderB: 'groundfloor',
    title: 'Park Place Finance vs Groundfloor: Small Deal Lender Comparison',
    metaTitle: 'Park Place Finance vs Groundfloor 2026: Small Loan Comparison | ProInvestorHub',
    metaDescription: 'Park Place Finance vs Groundfloor for small flips and low-cost market investing. Compare minimum loans ($50K vs $75K), rates, and terms. Expert review.',
    angle: 'Park Place has the lowest minimum loan in the industry ($50K) and finances land — ideal for Detroit, Memphis, and other low-cost markets. Groundfloor has no prepayment penalty. Both work with beginners.',
    sharedLoanTypes: ['hard-money-loans', 'fix-and-flip-loans'],
  },
]

export function getComparisonBySlug(slug: string): LenderComparison | undefined {
  return lenderComparisons.find((c) => c.slug === slug)
}

export function getComparisonData(comparison: LenderComparison): {
  comparison: LenderComparison
  lenderA: LenderData
  lenderB: LenderData
} | null {
  const lenderA = lenders.find((l) => l.slug === comparison.lenderA)
  const lenderB = lenders.find((l) => l.slug === comparison.lenderB)
  if (!lenderA || !lenderB) return null
  return { comparison, lenderA, lenderB }
}

export function getComparisonsForLender(lenderSlug: string): LenderComparison[] {
  return lenderComparisons.filter(
    (c) => c.lenderA === lenderSlug || c.lenderB === lenderSlug
  )
}
