import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import type { PostDetail } from '@/sanity/lib/types'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'

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

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.vercel.app'

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

      <div className="mt-12">
        <NewsletterSignup variant="card" />
      </div>
    </article>
  )
}
