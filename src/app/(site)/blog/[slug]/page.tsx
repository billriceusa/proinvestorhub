import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, GLOSSARY_TERMS_BY_CATEGORY_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import type { PostDetail } from '@/sanity/lib/types'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'

// Map post category slugs to glossary categories
const postCategoryToGlossary: Record<string, string> = {
  'deal-analysis': 'analysis',
  financing: 'financing',
  strategies: 'strategies',
  'tax-legal': 'tax',
  'getting-started': 'general',
  markets: 'general',
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

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: post.mainImage?.asset
      ? { images: [{ url: urlFor(post.mainImage).width(1200).height(630).url() }] }
      : undefined,
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
            <span
              key={cat._id}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {cat.title}
            </span>
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
            <p className="text-sm font-medium text-text">{post.author.name}</p>
          )}
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
        <div className="mt-10">
          <PortableText value={post.body} />
        </div>
      )}

      {post.author?.bio && (
        <div className="mt-16 rounded-xl border border-border bg-white p-6">
          <div className="flex items-center gap-4">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(56).height(56).url()}
                alt={post.author.name || ''}
                width={56}
                height={56}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-text">{post.author.name}</p>
              <p className="text-sm text-text-muted">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}

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
        <NewsletterSignup variant="card" />
      </div>
    </article>
  )
}
