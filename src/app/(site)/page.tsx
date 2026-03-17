import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary } from '@/sanity/lib/types'
import { JsonLd, websiteJsonLd, organizationJsonLd } from '@/components/json-ld'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { LeadMagnetCTA } from '@/components/lead-magnet-cta'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const features = [
  {
    title: 'Investment Calculators',
    description:
      'Cap rate, cash-on-cash return, BRRRR, and more. Free tools to analyze any deal in seconds.',
    href: '/calculators',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.25-4.5h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm0 2.25h.008v.008H10.5v-.008Zm2.25-4.5h.008v.008H12.75v-.008Zm0 2.25h.008v.008H12.75v-.008Zm2.25-4.5h.008v.008H15v-.008Zm0 2.25h.008v.008H15v-.008ZM5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21Z" />
      </svg>
    ),
  },
  {
    title: 'Expert Guides',
    description:
      'Deep-dive strategies for BRRRR, house hacking, short-term rentals, and building wealth through real estate.',
    href: '/guides',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'Investor Glossary',
    description:
      'Every term you need to know explained clearly — from cap rate to 1031 exchange, NOI to DSCR.',
    href: '/glossary',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
]

export default async function HomePage() {
  let posts: PostSummary[] = []
  try {
    const { data: rawPosts } = await sanityFetch({
      query: POSTS_QUERY,
      params: { limit: 3 },
    })
    posts = (rawPosts || []) as PostSummary[]
  } catch {
    // Sanity not configured yet
  }

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent tracking-wide uppercase">
              Real Estate Investing, Demystified
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Smart Real Estate Investing Starts Here
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Free calculators, expert guides, and an investor glossary — everything you need to analyze deals, learn strategies, and build wealth through real estate.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/calculators"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary-dark shadow-sm hover:bg-accent-light transition-colors"
              >
                Try Our Calculators
              </Link>
              <Link
                href="/blog"
                className="rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-text">
              Everything an Investor Needs
            </h2>
            <p className="mt-4 text-text-muted">
              Whether you&apos;re buying your first rental or scaling a portfolio, we have the tools and knowledge to help.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-xl border border-border bg-surface p-8 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-6">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <LeadMagnetCTA variant="card" />
        </div>
      </section>

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-text">Latest Articles</h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
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
                      <p className="mt-2 text-sm text-text-muted line-clamp-2">
                        {post.excerpt}
                      </p>
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
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <NewsletterSignup
            variant="banner"
            heading="Get Smarter About Real Estate Investing"
            description="Weekly deal analysis frameworks, market insights, and investing strategies delivered to your inbox. Free, no spam, unsubscribe anytime."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-dark">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Make Smarter Investment Decisions?
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Start with our free calculators and guides. No sign-up required.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/calculators"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-light transition-colors"
            >
              Explore Calculators
            </Link>
            <Link
              href="/glossary"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse Glossary
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
