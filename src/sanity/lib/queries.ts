import { defineQuery } from 'next-sanity'

// ── Posts ──────────────────────────────────────────────
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{ name, "slug": slug.current, image },
    categories[]->{ _id, title, "slug": slug.current }
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{ name, "slug": slug.current, image, bio },
    categories[]->{ _id, title, "slug": slug.current },
    sources[]{ title, url, publisher, dateAccessed },
    seo
  }
`)

export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]{ "slug": slug.current }
`)

// ── Categories ────────────────────────────────────────
export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`)

// ── Glossary ──────────────────────────────────────────
export const GLOSSARY_TERMS_QUERY = defineQuery(/* groq */ `
  *[_type == "glossaryTerm" && defined(slug.current)]
  | order(term asc) {
    _id,
    term,
    "slug": slug.current,
    definition,
    category
  }
`)

export const GLOSSARY_TERM_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "glossaryTerm" && slug.current == $slug][0] {
    _id,
    term,
    "slug": slug.current,
    definition,
    body,
    category,
    relatedTerms[]->{ _id, term, "slug": slug.current, definition }
  }
`)

export const GLOSSARY_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "glossaryTerm" && defined(slug.current)]{ "slug": slug.current }
`)

// All glossary terms (slim) — used for auto-linking in blog posts
export const GLOSSARY_TERMS_SLIM_QUERY = defineQuery(/* groq */ `
  *[_type == "glossaryTerm" && defined(slug.current)]
  | order(length(term) desc) {
    term,
    "slug": slug.current
  }
`)

// Glossary terms matching a category — used for "Related Terms" on blog posts
export const GLOSSARY_TERMS_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "glossaryTerm" && defined(slug.current) && category == $category]
  | order(term asc) [0...6] {
    _id,
    term,
    "slug": slug.current,
    definition
  }
`)

// Posts matching a category slug — used for "Related Articles" on glossary pages
export const POSTS_BY_CATEGORY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && $categorySlug in categories[]->slug.current]
  | order(publishedAt desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories[]->{ _id, title, "slug": slug.current }
  }
`)

// Posts by category (all, for hub pages)
export const POSTS_BY_CATEGORY_SLUG_ALL_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && $categorySlug in categories[]->slug.current]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    categories[]->{ _id, title, "slug": slug.current }
  }
`)

// ── Loan Types ───────────────────────────────────────
export const LOAN_TYPES_QUERY = defineQuery(/* groq */ `
  *[_type == "loanType" && defined(slug.current)]
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
    relatedStrategies,
    relatedCalculator,
    sortOrder,
    seo
  }
`)

export const LOAN_TYPE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "loanType" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    shortName,
    category,
    description,
    body,
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
    seo
  }
`)

export const LOAN_TYPE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "loanType" && defined(slug.current)]{ "slug": slug.current }
`)

// ── Lenders ──────────────────────────────────────────
export const LENDERS_QUERY = defineQuery(/* groq */ `
  *[_type == "lender" && defined(slug.current)]
  | order(editorRating desc) {
    _id,
    name,
    "slug": slug.current,
    logo { asset->{ _id, url }, alt },
    website,
    description,
    loanTypes[]->{ _id, name, "slug": slug.current, shortName },
    minRate,
    maxRate,
    maxLtv,
    minCreditScore,
    minLoanAmount,
    maxLoanAmount,
    speedToClose,
    nationwide,
    propertyTypes,
    experienceRequired,
    bestForTags,
    pros,
    cons,
    editorRating,
    featured
  }
`)

export const LENDER_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lender" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    logo { asset->{ _id, url }, alt },
    website,
    founded,
    headquarters,
    description,
    loanTypes[]->{ _id, name, "slug": slug.current, shortName },
    minRate,
    maxRate,
    maxLtv,
    minCreditScore,
    minLoanAmount,
    maxLoanAmount,
    originationFee,
    speedToClose,
    statesServed,
    nationwide,
    propertyTypes,
    experienceRequired,
    allowsLlc,
    interestOnlyAvailable,
    prepaymentPenalty,
    foreignNational,
    bestForTags,
    editorialReview,
    pros,
    cons,
    editorRating,
    featured,
    affiliateUrl,
    seo
  }
`)

export const LENDER_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lender" && defined(slug.current)]{ "slug": slug.current }
`)

export const LENDERS_BY_LOAN_TYPE_QUERY = defineQuery(/* groq */ `
  *[_type == "lender" && defined(slug.current) && $loanTypeId in loanTypes[]._ref]
  | order(editorRating desc) {
    _id,
    name,
    "slug": slug.current,
    logo { asset->{ _id, url }, alt },
    description,
    minRate,
    maxRate,
    maxLtv,
    minCreditScore,
    speedToClose,
    nationwide,
    experienceRequired,
    bestForTags,
    editorRating,
    featured
  }
`)

// ── Site Settings ─────────────────────────────────────
export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    title,
    description,
    ogImage {
      asset->{ _id, url }
    },
    footer
  }
`)
