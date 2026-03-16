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
