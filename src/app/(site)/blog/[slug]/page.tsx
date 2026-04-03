import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, GLOSSARY_TERMS_BY_CATEGORY_QUERY, GLOSSARY_TERMS_SLIM_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import { PartnerCTAGroup } from '@/components/partner-cta'
import type { PostDetail } from '@/sanity/lib/types'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { LeadMagnetCTA } from '@/components/lead-magnet-cta'
import { RelatedMarkets } from '@/components/related-markets'
import { ToolRecommendations } from '@/components/tool-recommendations'
import { GlossaryProvider } from '@/lib/glossary-linker'
import { TableOfContents, extractTocItems } from '@/components/table-of-contents'

// Map post category slugs to glossary categories
const postCategoryToGlossary: Record<string, string> = {
  'deal-analysis': 'analysis',
  financing: 'financing',
  strategies: 'strategies',
  'tax-legal': 'tax',
  'getting-started': 'general',
  markets: 'general',
}

// Map post category slugs to tool recommendation contexts
const postCategoryToToolContext: Record<string, string> = {
  'deal-analysis': 'deal-analysis',
  financing: 'deal-analysis',
  strategies: 'deal-analysis',
  'tax-legal': 'tax-legal',
  'getting-started': 'getting-started',
  markets: 'cash-flow',
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: POST_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Array<{ slug: string }>) || []).map((post) => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  const post = data as PostDetail | null
  if (!post) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'
  const category = post.categories?.[0]?.title || ''
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/api/og?title=${encodeURIComponent(post.title || '')}&category=${encodeURIComponent(category)}&type=article`

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { images: [{ url: ogImage, width: 1200, height: 630 }] },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  })
  const post = data as PostDetail | null

  if (!post) notFound()

  // Fetch related glossary terms based on post's first category
  const firstCatSlug = post.categories?.[0]?.slug || 'getting-started'
  const glossaryCategory = postCategoryToGlossary[firstCatSlug] || 'general'
  const { data: relatedTermsData } = await sanityFetch({
    query: GLOSSARY_TERMS_BY_CATEGORY_QUERY,
    params: { category: glossaryCategory },
  })
  const relatedTerms = (relatedTermsData as Array<{ _id: string; term: string; slug: string; definition: string }>) || []

  // Fetch all glossary terms for auto-linking in body text
  const { data: allGlossaryData } = await sanityFetch({
    query: GLOSSARY_TERMS_SLIM_QUERY,
  })
  const glossaryTermsForLinking = (allGlossaryData as Array<{ term: string; slug: string }>) || []

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={articleJsonLd({
          title: post.title || '',
          description: post.excerpt || '',
          url: `${baseUrl}/blog/${post.slug}`,
          imageUrl: post.mainImage?.asset
            ? urlFor(post.mainImage).width(1200).height(630).url()
            : undefined,
          publishedAt: post.publishedAt || '',
          authorName: post.author?.name || 'ProInvestorHub',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title || '', url: `${baseUrl}/blog/${post.slug}` },
        ])}
      />
      <nav className="mb-8 text-sm text-text-muted">
        <Link href="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{post.title}</span>
      </nav>

      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 mb-4">
          {post.categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold text-text sm:text-4xl lg:text-5xl leading-tight">
        {post.title}
      </h1>

      <div className="mt-6 flex items-center gap-4">
        {post.author?.image && (
          <Image
            src={urlFor(post.author.image).width(40).height(40).url()}
            alt={post.author.name || ''}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          {post.author && (
            <Link href="/authors/bill-rice" className="text-sm font-medium text-text hover:text-primary transition-colors">
              {post.author.name}
            </Link>
          )}
          <p className="text-xs text-text-light">30+ years in mortgage lending</p>
          {post.publishedAt && (
            <p className="text-xs text-text-muted">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {post.mainImage?.asset && (
        <div className="mt-8 overflow-hidden rounded-xl">
          <Image
            src={urlFor(post.mainImage).width(960).height(540).url()}
            alt={post.mainImage.alt || ''}
            width={960}
            height={540}
            className="w-full"
            priority
          />
        </div>
      )}

      {post.body && (
        <div className="mt-8">
          <TableOfContents
            items={extractTocItems(
              post.body as Array<{ _type: string; style?: string; children?: Array<{ text?: string }> }>
            )}
          />
        </div>
      )}

      {post.body && (() => {
        const bodyBlocks = post.body as Array<{ _type: string; style?: string; _key: string }>
        const h2Indices = bodyBlocks
          .map((block, i) => (block._type === 'block' && block.style === 'h2' ? i : -1))
          .filter((i) => i >= 0)

        // Insert CTA after the 3rd H2's content section (or after the last H2 if fewer than 3)
        const insertAfterIndex = h2Indices.length >= 3
          ? (h2Indices[3] ?? bodyBlocks.length) // Insert before 4th H2 (after 3rd section)
          : null

        if (insertAfterIndex !== null && insertAfterIndex > 0) {
          const bodyBefore = bodyBlocks.slice(0, insertAfterIndex)
          const bodyAfter = bodyBlocks.slice(insertAfterIndex)

          return (
            <div className="mt-10">
              <GlossaryProvider terms={glossaryTermsForLinking}>
                <PortableText value={bodyBefore} enableGlossaryLinks />
              </GlossaryProvider>

              <div className="my-10">
                <LeadMagnetCTA variant="card" />
              </div>

              <GlossaryProvider terms={glossaryTermsForLinking}>
                <PortableText value={bodyAfter} enableGlossaryLinks />
              </GlossaryProvider>
            </div>
          )
        }

        return (
          <div className="mt-10">
            <GlossaryProvider terms={glossaryTermsForLinking}>
              <PortableText value={post.body} enableGlossaryLinks />
            </GlossaryProvider>
          </div>
        )
      })()}

      {/* Related Markets — scans post text for city mentions */}
      {post.body && (
        <RelatedMarkets
          bodyText={
            (post.body as Array<{ _type: string; children?: Array<{ text?: string }> }>)
              .filter((b) => b._type === 'block')
              .flatMap((b) => b.children?.map((c) => c.text || '') || [])
              .join(' ')
          }
        />
      )}

      {post.sources && post.sources.length > 0 && (
        <section className="mt-10 border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-text mb-3">Sources</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-text-muted">
            {post.sources.map((source, i) => (
              <li key={i}>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary-light transition-colors"
                  >
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                {source.publisher && <span> — {source.publisher}</span>}
                {source.dateAccessed && (
                  <span className="text-text-light"> (accessed {source.dateAccessed})</span>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {post.author && (
        <div className="mt-16 rounded-xl border border-border bg-white p-6">
          <div className="flex items-start gap-4">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(56).height(56).url()}
                alt={post.author.name || ''}
                width={56}
                height={56}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <Link href="/authors/bill-rice" className="font-semibold text-text hover:text-primary transition-colors">
                {post.author.name}
              </Link>
              <p className="text-xs text-primary font-medium mt-0.5">30+ years in mortgage lending &middot; BRSG Founder</p>
              {post.author.bio && (
                <p className="text-sm text-text-muted mt-2">{post.author.bio}</p>
              )}
              <div className="mt-3 flex items-center gap-4">
                <Link href="/authors/bill-rice" className="text-xs font-medium text-primary hover:text-primary-light transition-colors">
                  View all articles &rarr;
                </Link>
                <a
                  href="https://linkedin.com/in/billrice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-text-muted hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BiggerPockets partner CTAs */}
      <PartnerCTAGroup
        verticals={['lenders', 'agents', 'tax', 'property-managers']}
        heading="Take the Next Step"
      />

      {/* Tool Recommendations */}
      <ToolRecommendations
        context={postCategoryToToolContext[firstCatSlug] || 'deal-analysis'}
        heading="Investor Tools We Recommend"
        placement="blog-bottom"
      />

      {/* Related glossary terms */}
      {relatedTerms.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-text mb-4">Key Terms to Know</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedTerms.map((term) => (
              <Link
                key={term._id}
                href={`/glossary/${term.slug}`}
                className="rounded-lg border border-border bg-white p-4 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                  {term.term}
                </h3>
                <p className="mt-1 text-sm text-text-muted line-clamp-2">
                  {term.definition}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/glossary"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Browse all glossary terms &rarr;
            </Link>
          </div>
        </section>
      )}

      <div className="mt-12">
        <LeadMagnetCTA variant="card" />
      </div>
    </article>
  )
}
