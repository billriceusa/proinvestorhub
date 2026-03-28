// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any

export type PostSummary = {
  _id: string
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
  mainImage: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: unknown } } | null
    alt: string | null
  } | null
  author: { name: string | null; slug: string | null; image: SanityImage } | null
  categories: Array<{ _id: string; title: string | null; slug: string | null }> | null
}

export type SourceReference = {
  title: string
  url: string | null
  publisher: string | null
  dateAccessed: string | null
}

export type PostDetail = PostSummary & {
  body: SanityImage
  sources: SourceReference[] | null
  seo: { metaTitle: string | null; metaDescription: string | null } | null
  author: {
    name: string | null
    slug: string | null
    image: SanityImage
    bio: string | null
  } | null
}

export type Category = {
  _id: string
  title: string | null
  slug: string | null
  description: string | null
  postCount: number
}

export type GlossaryTermSummary = {
  _id: string
  term: string | null
  slug: string | null
  definition: string | null
  category: string | null
}

export type GlossaryTermDetail = GlossaryTermSummary & {
  body: SanityImage
  relatedTerms: Array<{
    _id: string
    term: string | null
    slug: string | null
    definition: string | null
  }> | null
}

// ── Loan Types ───────────────────────────────────────
export type LoanTypeSummary = {
  _id: string
  name: string | null
  slug: string | null
  shortName: string | null
  category: string | null
  description: string | null
  typicalRateRange: string | null
  typicalLtvRange: string | null
  typicalTermRange: string | null
  typicalMinCredit: string | null
  bestFor: string[] | null
  pros: string[] | null
  cons: string[] | null
  relatedStrategies: string[] | null
  relatedCalculator: string | null
  sortOrder: number | null
  seo: { metaTitle: string | null; metaDescription: string | null } | null
}

export type LoanTypeDetail = LoanTypeSummary & {
  body: SanityImage
  faqs: Array<{ question: string; answer: string }> | null
}

// ── Lenders ──────────────────────────────────────────
export type LenderLoanTypeRef = {
  _id: string
  name: string | null
  slug: string | null
  shortName: string | null
}

export type LenderSummary = {
  _id: string
  name: string | null
  slug: string | null
  logo: { asset: { _id: string; url: string } | null; alt: string | null } | null
  website: string | null
  description: string | null
  loanTypes: LenderLoanTypeRef[] | null
  minRate: number | null
  maxRate: number | null
  maxLtv: number | null
  minCreditScore: number | null
  minLoanAmount: number | null
  maxLoanAmount: number | null
  speedToClose: string | null
  nationwide: boolean | null
  propertyTypes: string[] | null
  experienceRequired: string | null
  bestForTags: string[] | null
  pros: string[] | null
  cons: string[] | null
  editorRating: number | null
  featured: boolean | null
}

export type LenderDetail = LenderSummary & {
  founded: number | null
  headquarters: string | null
  originationFee: string | null
  statesServed: string[] | null
  allowsLlc: boolean | null
  interestOnlyAvailable: boolean | null
  prepaymentPenalty: string | null
  foreignNational: boolean | null
  editorialReview: SanityImage
  affiliateUrl: string | null
  seo: { metaTitle: string | null; metaDescription: string | null } | null
}
