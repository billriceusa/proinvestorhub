import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: 'Real Estate Investing Guides',
  description:
    'Comprehensive guides for real estate investors. Learn BRRRR, house hacking, short-term rentals, and more strategies to build wealth.',
}

export default async function GuidesPage() {
  let posts: PostSummary[] = []
  try {
    const { data: rawPosts } = await sanityFetch({
      query: POSTS_QUERY,
      params: { limit: 50 },
    })
    posts = (rawPosts || []) as PostSummary[]
  } catch {
    // Sanity not configured yet
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-text">Investing Guides</h1>
        <p className="mt-4 text-lg text-text-muted">
          In-depth guides covering every real estate investing strategy. Written
          for investors, by investors.
        </p>
      </div>

      {/* Best Cities Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Best Cities by Strategy</h2>
        <p className="mt-2 text-text-muted">
          Data-driven rankings of the top markets for every major investing strategy.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'BRRRR', slug: 'brrrr', desc: 'Low entry, high ARV spread' },
            { name: 'Cash Flow', slug: 'cash-flow', desc: 'High rent-to-price ratios' },
            { name: 'House Hacking', slug: 'house-hacking', desc: 'Affordable multifamily' },
            { name: 'Appreciation', slug: 'appreciation', desc: 'Population and job growth' },
          ].map((s) => (
            <Link
              key={s.slug}
              href={`/guides/best-cities/${s.slug}`}
              className="group rounded-xl border border-border bg-white p-5 hover:shadow-lg hover:border-primary/40 transition-all"
            >
              <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                Best {s.name} Markets
              </h3>
              <p className="mt-1 text-sm text-text-muted">{s.desc}</p>
              <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                View 15 cities &rarr;
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/guides/best-cities"
          className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors"
        >
          View all strategies &rarr;
        </Link>
      </section>

      {posts.length > 0 ? (
        <div className="mt-12 space-y-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row gap-6 rounded-xl border border-border bg-white p-6 hover:shadow-lg transition-all"
            >
              {post.mainImage?.asset && (
                <div className="shrink-0 overflow-hidden rounded-lg md:w-64">
                  <Image
                    src={urlFor(post.mainImage).width(256).height(144).url()}
                    alt={post.mainImage.alt || post.title || ''}
                    width={256}
                    height={144}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1">
                {post.categories && post.categories.length > 0 && (
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {post.categories[0].title}
                  </span>
                )}
                <h2 className="mt-1 text-xl font-semibold text-text group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-text-muted">{post.excerpt}</p>
                )}
                {post.publishedAt && (
                  <p className="mt-3 text-xs text-text-light">
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
        <div className="mt-16 text-center rounded-xl border border-dashed border-border bg-white py-16">
          <p className="text-text-muted">No guides published yet.</p>
          <p className="mt-2 text-sm text-text-light">
            Check back soon or visit the{' '}
            <Link href="/blog" className="text-primary underline">
              Blog
            </Link>{' '}
            for the latest content.
          </p>
        </div>
      )}
    </div>
  )
}
