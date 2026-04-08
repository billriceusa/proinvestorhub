import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary } from '@/sanity/lib/types'
import { JsonLd, personJsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'

const AUTHOR_POSTS_QUERY = `*[_type == "post" && author->slug.current == "bill-rice"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage { asset, alt },
  "categories": categories[]->{ title, "slug": slug.current }
}`

export const metadata: Metadata = {
  title: 'Bill Rice — Author | ProInvestorHub',
  description:
    'Bill Rice is the founder and author at ProInvestorHub. With 30+ years in mortgage lending, he writes about real estate investing strategies, deal analysis, and market trends.',
  alternates: { canonical: '/authors/bill-rice' },
}

export default async function BillRiceAuthorPage() {
  let posts: PostSummary[] = []
  try {
    const { data } = await sanityFetch({ query: AUTHOR_POSTS_QUERY })
    posts = (data || []) as PostSummary[]
  } catch {
    // Sanity not configured
  }

  return (
    <>
      <JsonLd data={personJsonLd()} />

      {/* Author Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/10 text-white text-3xl font-bold">
              BR
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Bill Rice</h1>
              <p className="mt-2 text-accent font-medium">Founder &amp; Author, ProInvestorHub</p>
              <p className="mt-4 text-white/80 max-w-2xl leading-7">
                Real estate investor, mortgage lending veteran with 30+ years of experience, former AFOSI Special Agent, and founder of BRSG. I built ProInvestorHub to document my investing journey and share the tools and knowledge I wish I had starting out.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  30+ Years Mortgage Lending
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  BRSG Founder
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  Real Estate Investor
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  AFOSI Special Agent (Ret.)
                </span>
                <a
                  href="https://billrice.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 hover:bg-white/20 transition-colors"
                >
                  Full Bio
                </a>
                <a
                  href="https://linkedin.com/in/billrice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 hover:bg-white/20 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Articles by Bill Rice
            {posts.length > 0 && (
              <span className="ml-3 text-base font-normal text-text-muted">
                ({posts.length} articles)
              </span>
            )}
          </h2>

          {posts.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-white hover:shadow-lg transition-all"
                >
                  {post.mainImage?.asset && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(338).url()}
                        alt={post.mainImage.alt || post.title || ''}
                        width={600}
                        height={338}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        {post.categories[0].title}
                      </span>
                    )}
                    <h3 className="mt-2 text-lg font-semibold text-text group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-text-muted line-clamp-2">{post.excerpt}</p>
                    )}
                    {post.publishedAt && (
                      <p className="mt-4 text-xs text-text-light">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-text-muted">Articles coming soon.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <NewsletterSignup
            variant="banner"
            heading="Get Bill's Weekly Newsletter"
            description="Market news, investing education, and deal analysis tips delivered every Tuesday."
          />
        </div>
      </section>
    </>
  )
}
