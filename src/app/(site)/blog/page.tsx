import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY, POSTS_COUNT_QUERY, CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary, Category } from '@/sanity/lib/types'
import { Pagination } from '@/components/pagination'

const POSTS_PER_PAGE = 12

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert articles on real estate investing strategies, market analysis, deal analysis, and building wealth through property.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1)

  let posts: PostSummary[] = []
  let categories: Category[] = []
  let totalCount = 0

  try {
    const [postsRes, countRes, catsRes] = await Promise.all([
      sanityFetch({ query: POSTS_QUERY, params: { limit: POSTS_PER_PAGE, offset: (currentPage - 1) * POSTS_PER_PAGE } }),
      sanityFetch({ query: POSTS_COUNT_QUERY }),
      sanityFetch({ query: CATEGORIES_QUERY }),
    ])
    posts = (postsRes.data || []) as PostSummary[]
    totalCount = (countRes.data as number) || 0
    categories = (catsRes.data || []) as Category[]
  } catch {
    // Sanity not configured yet
  }

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-text">Blog</h1>
        <p className="mt-4 text-lg text-text-muted">
          Expert insights and strategies for real estate investors at every level.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-text-muted hover:border-primary/40 hover:text-primary transition-all"
            >
              {cat.title}
              {cat.postCount > 0 && (
                <span className="ml-1.5 text-text-light">({cat.postCount})</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  <h2 className="mt-2 text-lg font-semibold text-text group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-3">
                    {post.author && (
                      <span className="text-xs font-medium text-text">
                        {post.author.name}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="text-xs text-text-light">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </>
      ) : (
        <div className="mt-16 text-center rounded-xl border border-dashed border-border bg-white py-16">
          <p className="text-text-muted">No posts published yet.</p>
          <p className="mt-2 text-sm text-text-light">
            Content is managed through the{' '}
            <Link href="/studio" className="text-primary underline">
              Sanity Studio
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
