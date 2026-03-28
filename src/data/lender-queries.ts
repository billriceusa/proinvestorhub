/**
 * Sanity GROQ queries for lender directory data.
 * Falls back to seed data if Sanity query returns empty (safety net).
 */

import { client } from '@/sanity/lib/client'
import {
  loanTypes as seedLoanTypes,
  getLoanTypeBySlug as getSeedLoanTypeBySlug,
  type LoanTypeData,
} from './loan-types'
import {
  lenders as seedLenders,
  getLenderBySlug as getSeedLenderBySlug,
  getLendersByLoanType as getSeedLendersByLoanType,
  getFeaturedLenders as getSeedFeaturedLenders,
  type LenderData,
} from './lenders'

// ── GROQ Queries ──────────────────────────────────────

const LOAN_TYPES_QUERY = `*[_type == "loanType" && defined(slug.current)]
| order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current,
  shortName,
  category,
  description,
  typicalRateRange,
  typicalLtvRange,
  typicalTermRange,
  typicalMinCredit,
  bestFor,
  pros,
  cons,
  faqs[]{ question, answer },
  relatedStrategies,
  relatedCalculator,
  sortOrder,
  seo
}`

const LENDERS_QUERY = `*[_type == "lender" && defined(slug.current)]
| order(editorRating desc) {
  _id,
  name,
  "slug": slug.current,
  website,
  founded,
  headquarters,
  description,
  "loanTypeSlugs": loanTypes[]->slug.current,
  minRate,
  maxRate,
  maxLtv,
  minCreditScore,
  minLoanAmount,
  maxLoanAmount,
  originationFee,
  speedToClose,
  nationwide,
  propertyTypes,
  experienceRequired,
  allowsLlc,
  interestOnlyAvailable,
  prepaymentPenalty,
  foreignNational,
  bestForTags,
  pros,
  cons,
  editorRating,
  featured,
  seo
}`

// ── Typed fetchers with fallback ──────────────────────

export async function getLoanTypes(): Promise<LoanTypeData[]> {
  try {
    const result = await client.fetch(LOAN_TYPES_QUERY)
    if (result && result.length > 0) {
      // Map Sanity shape to LoanTypeData
      return result.map((lt: Record<string, unknown>) => ({
        ...lt,
        heroContent: '', // Rich text not available in list queries
        metaTitle: (lt.seo as Record<string, string>)?.metaTitle || '',
        metaDescription: (lt.seo as Record<string, string>)?.metaDescription || '',
        faqs: (lt.faqs as Array<{ question: string; answer: string }>) || [],
      }))
    }
  } catch {
    // Silently fall back to seed data
  }
  return seedLoanTypes
}

export async function getLoanTypeBySlug(slug: string): Promise<LoanTypeData | undefined> {
  // For now, use seed data directly (has heroContent which Sanity rich text queries need special handling)
  // When Sanity has body content, switch to fetching from Sanity
  return getSeedLoanTypeBySlug(slug)
}

export async function getLenders(): Promise<LenderData[]> {
  try {
    const result = await client.fetch(LENDERS_QUERY)
    if (result && result.length > 0) {
      return result.map((l: Record<string, unknown>) => ({
        ...l,
        loanTypeSlugs: (l.loanTypeSlugs as string[]) || [],
        editorSummary: '', // Rich text not in list query
        metaTitle: (l.seo as Record<string, string>)?.metaTitle || '',
        metaDescription: (l.seo as Record<string, string>)?.metaDescription || '',
      }))
    }
  } catch {
    // Silently fall back to seed data
  }
  return seedLenders
}

export async function getLenderBySlug(slug: string): Promise<LenderData | undefined> {
  // Use seed data for full detail (has editorSummary which is rich text in Sanity)
  return getSeedLenderBySlug(slug)
}

export async function getLendersByLoanType(loanTypeSlug: string): Promise<LenderData[]> {
  return getSeedLendersByLoanType(loanTypeSlug)
}

export async function getFeaturedLenders(): Promise<LenderData[]> {
  return getSeedFeaturedLenders()
}
