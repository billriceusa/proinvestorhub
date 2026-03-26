import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import {
  POSTS_BY_CATEGORY_SLUG_ALL_QUERY,
  GLOSSARY_TERMS_BY_CATEGORY_QUERY,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/components/json-ld'
import { CalculatorCTA } from '@/components/calculator-cta'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { categoryHubContent } from '@/data/category-content'

export function generateStaticParams() {
  return categoryHubContent.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = categoryHubContent.find((c) => c.slug === slug)
  if (!category) return {}

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
    },
  }
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = categoryHubContent.find((c) => c.slug === slug)
  if (!category) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

  const [postsResult, glossaryResult] = await Promise.all([
    sanityFetch({
      query: POSTS_BY_CATEGORY_SLUG_ALL_QUERY,
      params: { categorySlug: slug },
    }),
    sanityFetch({
      query: GLOSSARY_TERMS_BY_CATEGORY_QUERY,
      params: { category: category.relatedGlossaryCategory },
    }),
  ])

  const posts = postsResult.data ?? []
  const glossaryTerms = glossaryResult.data ?? []

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          {
            name: category.title,
            url: `${baseUrl}/blog/category/${slug}`,
          },
        ])}
      />
      <JsonLd data={faqJsonLd(category.faqs)} />

      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/blog"
          className="hover:text-primary transition-colors"
        >
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{category.title}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          {category.title}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {/* Overview */}
      <div className="max-w-3xl mb-12">
        <p className="text-text-muted leading-7">{category.description}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {/* Posts Grid */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              All Articles
            </h2>
            {posts.length === 0 ? (
              <p className="text-text-muted">
                No articles published yet. Check back soon.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {posts.map((post: any) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-xl border border-border bg-white shadow-sm hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden"
                  >
                    {post.mainImage?.asset?.url && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <Image
                          src={urlFor(post.mainImage)
                            .width(600)
                            .height(338)
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          width={600}
                          height={338}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 text-sm text-text-muted line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishedAt && (
                        <p className="mt-3 text-xs text-text-light">
                          {new Date(post.publishedAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {category.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-text">{faq.question}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <NewsletterSignup variant="card" />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Calculators */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Related Calculators
            </h3>
            <div className="mt-4 space-y-3">
              {category.relatedCalculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="block rounded-lg border border-border/50 px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-text">
                    {calc.label}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {calc.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Glossary Terms */}
          {glossaryTerms.length > 0 && (
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
                Key Terms to Know
              </h3>
              <div className="mt-4 space-y-3">
                {glossaryTerms.map((term: any) => (
                  <Link
                    key={term._id}
                    href={`/glossary/${term.slug}`}
                    className="block rounded-lg border border-border/50 px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <p className="text-sm font-medium text-text">
                      {term.term}
                    </p>
                    {term.definition && (
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                        {term.definition}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
              <Link
                href="/glossary"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                Browse Full Glossary &rarr;
              </Link>
            </div>
          )}

          {/* Other Categories */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
              Other Topics
            </h3>
            <div className="mt-4 space-y-3">
              {categoryHubContent
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog/category/${c.slug}`}
                    className="block rounded-lg border border-border/50 px-4 py-3 text-sm font-medium text-text hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all"
                  >
                    {c.title}
                  </Link>
                ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sticky top-24">
            <CalculatorCTA context={`category-${slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
