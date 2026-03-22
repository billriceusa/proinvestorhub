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
