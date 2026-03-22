import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { strategies } from '@/data/market-strategies'
import { cities } from '@/data/cap-rate-cities'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, glossaryTerms] = await Promise.all([
    client.fetch<Array<{ slug: string; publishedAt: string | null }>>(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
    ),
    client.fetch<Array<{ slug: string }>>(
      `*[_type == "glossaryTerm" && defined(slug.current)] { "slug": slug.current }`
    ),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/cap-rate`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/cash-on-cash`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/rental-cashflow`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/brrrr`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/fix-flip`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/mortgage`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/authors/bill-rice`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/start-here`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/cap-rate-report`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/deal-analysis-checklist`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/calculators/1031-exchange`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/str-revenue`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/wholesale`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/compare`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/best-cities`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/markets`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...strategies.map((s) => ({
      url: `${baseUrl}/markets/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...strategies.map((s) => ({
      url: `${baseUrl}/guides/best-cities/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/calculators/cap-rate/cities`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...cities.map((c) => ({
      url: `${baseUrl}/calculators/cap-rate/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const postPages: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const glossaryPages: MetadataRoute.Sitemap = (glossaryTerms ?? []).map(
    (term) => ({
      url: `${baseUrl}/glossary/${term.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  )

  return [...staticPages, ...postPages, ...glossaryPages]
}
