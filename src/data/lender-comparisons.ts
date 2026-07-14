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
  // Optional per-comparison verification date (ISO YYYY-MM-DD). Set this during a
  // real lender-rate verification pass to surface a "Reviewed {date}" stamp that
  // overrides the data-file's git-derived "Updated {date}" fallback. Never a
  // fabricated/frozen literal — see content-freshness.ts.
  lastReviewed?: string
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

  // ── Brand-name head-to-heads (added 2026-06-27) ──────
  {
    slug: 'kiavi-vs-corevest',
    lenderA: 'kiavi',
    lenderB: 'corevest',
    title: 'Kiavi vs CoreVest: Single-Deal Speed vs Portfolio Scale',
    metaTitle: 'Kiavi vs CoreVest 2026: Portfolio vs Single-Deal Loans | ProInvestorHub',
    metaDescription: 'Kiavi vs CoreVest compared. Single-deal digital lending vs portfolio blanket loans — rates, LTV, loan minimums, and experience requirements side by side.',
    angle: 'Kiavi is built for individual-deal investors — 1-4 unit residential, $100K minimum, no experience required, and fast fully-digital closings. CoreVest is built for scale: blanket and build-to-rent loans up to $100M, but with a $500K minimum and a 5+ deals experience requirement. Choose Kiavi while you grow deal-by-deal; move to CoreVest once you are financing portfolios.',
    sharedLoanTypes: ['dscr-loans', 'bridge-loans'],
  },
  {
    slug: 'lima-one-vs-roc-capital',
    lenderA: 'lima-one-capital',
    lenderB: 'roc-capital',
    title: 'Lima One Capital vs Roc Capital: Product Range vs Credit Flexibility',
    metaTitle: 'Lima One vs Roc Capital 2026: Rates, Credit & Products | ProInvestorHub',
    metaDescription: 'Lima One Capital vs Roc Capital — compare rates, credit minimums (660 vs 620), construction options, and product range. Expert investor lender analysis.',
    angle: 'Lima One has the broader product range — ground-up construction, multifamily, and foreign national programs — and works with newer investors at a 660 credit floor. Roc Capital accepts lower credit (620) and prices competitively for volume borrowers, but its platform is less polished. Choose Lima One for construction or multifamily; Roc if your credit is tighter.',
    sharedLoanTypes: ['fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
  },
  {
    slug: 'roc-capital-vs-rcn-capital',
    lenderA: 'roc-capital',
    lenderB: 'rcn-capital',
    title: 'Roc Capital vs RCN Capital: Two Volume Private Lenders Compared',
    metaTitle: 'Roc Capital vs RCN Capital 2026: Rates, Credit & Terms | ProInvestorHub',
    metaDescription: 'Roc Capital vs RCN Capital for fix-and-flip, bridge, and DSCR loans. Same 620 credit floor — compare rates, max loan size, and foreign national options.',
    angle: 'Two volume-focused private lenders with the same 620 credit floor. RCN Capital advertises a lower starting rate (6.5% vs 7%) and adds foreign national programs, but tops out at a $2.5M loan. Roc Capital offers hard money alongside DSCR and a higher $5M max. Close call: RCN for foreign-national or lower-rate DSCR, Roc for larger or hard-money deals.',
    sharedLoanTypes: ['fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
  },
  {
    slug: 'kiavi-vs-civic-financial',
    lenderA: 'kiavi',
    lenderB: 'civic-financial',
    title: 'Kiavi vs Civic Financial: Digital Platform vs Product Breadth',
    metaTitle: 'Kiavi vs Civic Financial 2026: Rates, Speed & Products | ProInvestorHub',
    metaDescription: 'Kiavi vs Civic Financial compared. Digital 1-4 unit lending vs a broader product range (hard money, multifamily). Rates, closing speed, and terms side by side.',
    angle: 'Both close in 10-21 days at a 640 credit floor. Kiavi\'s fully digital platform and lower starting rate (6.5% vs 7.5%) suit 1-4 unit residential investors. Civic Financial, backed by the Roc360 lending group, adds hard money, multifamily, and mixed-use eligibility plus a higher $5M max loan. Kiavi for streamlined residential; Civic for larger or commercial-adjacent deals.',
    sharedLoanTypes: ['fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
  },

  // ── Brand-name head-to-heads, batch 2 (added 2026-06-27) ──
  {
    slug: 'kiavi-vs-griffin-funding',
    lenderA: 'kiavi',
    lenderB: 'griffin-funding',
    title: 'Kiavi vs Griffin Funding: Multi-Product Platform vs DSCR Specialist',
    metaTitle: 'Kiavi vs Griffin Funding 2026: DSCR Rates & Terms | ProInvestorHub',
    metaDescription: 'Kiavi vs Griffin Funding compared. Multi-product investor lending vs DSCR + bank-statement loans for self-employed borrowers. Rates, credit floors, and terms.',
    angle: 'Kiavi is a multi-product platform — flips, bridge, and DSCR — for active 1-4 unit investors, with fast fully-digital closings. Griffin Funding focuses on DSCR and bank-statement loans for self-employed borrowers and foreign nationals, accepts a lower 620 credit floor, but has no flip or bridge products and closes slower (21-30 days). Choose Kiavi for active multi-strategy investing; Griffin for self-employed or foreign-national DSCR borrowers.',
    sharedLoanTypes: ['dscr-loans'],
  },
  {
    slug: 'lima-one-vs-new-silver',
    lenderA: 'lima-one-capital',
    lenderB: 'new-silver',
    title: 'Lima One Capital vs New Silver: Product Range vs Closing Speed',
    metaTitle: 'Lima One vs New Silver 2026: Speed, Rates & Products | ProInvestorHub',
    metaDescription: 'Lima One Capital vs New Silver — closing speed (5 vs 14 days) vs product breadth (construction, multifamily). Compare rates, credit floors, and terms.',
    angle: 'New Silver wins on speed — instant term sheets and 5-day closings — and accepts a slightly lower 650 credit floor. Lima One has the broader product range (ground-up construction, multifamily, foreign national) and a longer track record (2010 vs 2018). Choose New Silver for fast flips; Lima One for construction, multifamily, or a more established lender.',
    sharedLoanTypes: ['fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
  },
  {
    slug: 'new-silver-vs-rcn-capital',
    lenderA: 'new-silver',
    lenderB: 'rcn-capital',
    title: 'New Silver vs RCN Capital: Closing Speed vs Credit Flexibility',
    metaTitle: 'New Silver vs RCN Capital 2026: Speed, Rates & Credit | ProInvestorHub',
    metaDescription: 'New Silver vs RCN Capital for flip, bridge, and DSCR loans. Closing speed and loan size vs a lower credit floor (620) and foreign national options. Expert review.',
    angle: 'New Silver is faster (5-day closings, instant term sheets) but starts at a higher rate (7.5% vs 6.5%) and a 650 credit floor. RCN Capital accepts 620 credit, adds foreign national programs, and starts lower, but closes slower and caps loans at $2.5M (vs New Silver\'s $5M). Choose New Silver for speed and larger loans; RCN for lower credit, foreign-national, or rate-sensitive deals.',
    sharedLoanTypes: ['fix-and-flip-loans', 'bridge-loans', 'dscr-loans'],
  },
  {
    slug: 'visio-lending-vs-lendency',
    lenderA: 'visio-lending',
    lenderB: 'lendency',
    title: 'Visio Lending vs Lendency: DSCR Specialist Comparison',
    metaTitle: 'Visio Lending vs Lendency 2026: DSCR Loan Comparison | ProInvestorHub',
    metaDescription: 'Visio Lending vs Lendency — two DSCR-only lenders compared. Credit floors (680 vs 660), interest-only options, multifamily eligibility, and closing speed.',
    angle: 'Two DSCR-only specialists. Visio has deeper specialization, multifamily (2-8 unit) eligibility, and interest-only options, but requires 680 credit and a 5-year prepayment period. Lendency is newer, accepts 660 credit, and closes faster (14-21 days) with a simpler process — but offers no interest-only. Choose Visio for multifamily or interest-only DSCR; Lendency for a lower credit floor and faster closing.',
    sharedLoanTypes: ['dscr-loans'],
  },
  {
    slug: 'angel-oak-vs-visio-lending',
    lenderA: 'angel-oak',
    lenderB: 'visio-lending',
    title: 'Angel Oak vs Visio Lending: Non-QM DSCR Lender Comparison',
    metaTitle: 'Angel Oak vs Visio Lending 2026: DSCR & Non-QM Loans | ProInvestorHub',
    metaDescription: 'Angel Oak vs Visio Lending — two non-QM DSCR lenders. Bank-statement programs and foreign national options vs direct DSCR specialization and multifamily.',
    angle: 'Both are established non-QM lenders. Angel Oak adds bank-statement programs for self-employed borrowers, foreign national financing, and a lower 660 credit floor — but works largely through mortgage brokers. Visio is a direct DSCR specialist with multifamily (2-8 unit) eligibility and a lower rate ceiling, but requires 680 credit. Choose Angel Oak for self-employed or broker-sourced borrowers; Visio for direct DSCR with multifamily.',
    sharedLoanTypes: ['dscr-loans'],
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
