import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { strategies } from '@/data/market-strategies'
import { cities } from '@/data/cap-rate-cities'
import { getStatesList } from '@/data/city-strategy-helpers'
import { categoryHubContent } from '@/data/category-content'
import { loanTypes } from '@/data/loan-types'
import { lenders } from '@/data/lenders'
import { usStates } from '@/data/us-states'
import { lenderComparisons } from '@/data/lender-comparisons'
import { financingScenarios } from '@/data/financing-scenarios'
import { financingTypes } from '@/data/financing-types'
import { states as investorFinancingStates } from '@/data/hmda-investor'
import { states as rentalYieldStates } from '@/data/rental-yield'
import { states as investorLenderStates } from '@/data/hmda-lenders'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, glossaryTerms, newsletterIssues, guidePages] = await Promise.all([
    client.fetch<Array<{ slug: string; publishedAt: string | null }>>(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
    ),
    client.fetch<Array<{ slug: string }>>(
      `*[_type == "glossaryTerm" && defined(slug.current)] { "slug": slug.current }`
    ),
    client.fetch<Array<{ slug: string; publishedAt: string | null }>>(
      `*[_type == "newsletterIssue" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
    ),
    client.fetch<Array<{ slug: string; publishedAt: string | null }>>(
      `*[_type == "guide" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
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
      url: `${baseUrl}/calculators/depreciation`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/sell-vs-rent`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/hard-money`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/mortgage-points`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/closing-costs`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/quick-rules`,
      changeFrequency: 'monthly',
      priority: 0.7,
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
      url: `${baseUrl}/markets`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...strategies.map((s) => ({
      url: `${baseUrl}/markets/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
    // City x Strategy pages (208 pages)
    ...strategies.flatMap((s) =>
      cities.map((c) => ({
        url: `${baseUrl}/markets/${s.slug}/${c.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    ),
    // State pages
    {
      url: `${baseUrl}/markets/states`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...getStatesList().map((state) => ({
      url: `${baseUrl}/markets/states/${state.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Blog category hub pages
    ...categoryHubContent.map((cat) => ({
      url: `${baseUrl}/blog/category/${cat.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // ── Lender Directory ──────────────────────────────
    {
      url: `${baseUrl}/lenders`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lenders/compare`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lenders/finder`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Loan type pages (12)
    ...loanTypes.map((lt) => ({
      url: `${baseUrl}/lenders/${lt.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Lender review pages (20+)
    ...lenders.map((l) => ({
      url: `${baseUrl}/lenders/reviews/${l.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Lender-vs-lender comparison pages
    ...lenderComparisons.map((c) => ({
      url: `${baseUrl}/lenders/compare/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // State × Loan type pages (600)
    ...loanTypes.flatMap((lt) =>
      usStates.map((state) => ({
        url: `${baseUrl}/lenders/${lt.slug}/${state.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    ),
    // ── Financing tools & guides ──────────────────────
    {
      url: `${baseUrl}/financing`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/heloc`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/dscr`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/refinance`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/financing/matcher`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-finance`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...financingScenarios.map((s) => ({
      url: `${baseUrl}/how-to-finance/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...financingTypes.map((t) => ({
      url: `${baseUrl}/financing/${t.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/reports`, changeFrequency: 'monthly' as const, priority: 0.8 },
    {
      url: `${baseUrl}/reports/investor-financing`,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reports/investor-financing/methodology`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...investorFinancingStates.map((s) => ({
      url: `${baseUrl}/reports/investor-financing/${s.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/reports/rental-yield`,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reports/rental-yield/methodology`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...rentalYieldStates.map((s) => ({
      url: `${baseUrl}/reports/rental-yield/${s.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/reports/rent-growth`,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reports/investor-lenders`,
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reports/investor-lenders/methodology`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...investorLenderStates.map((s) => ({
      url: `${baseUrl}/reports/investor-lenders/${s.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]

  // Duplicate posts 301-redirected to a canonical URL (see next.config.ts).
  // Keep them out of the sitemap so we don't advertise URLs that redirect.
  const REDIRECTED_POST_SLUGS = new Set([
    'dscr-loans-explained-real-estate-investors',
    'dscr-loans-explained-complete-guide-real-estate-investors-2026',
    'dscr-investor-financing-guide',
  ])
  const postPages: MetadataRoute.Sitemap = (posts ?? [])
    .filter((post) => !REDIRECTED_POST_SLUGS.has(post.slug))
    .map((post) => ({
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

  const newsletterPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/newsletter`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...(newsletterIssues ?? []).map((issue) => ({
      url: `${baseUrl}/newsletter/${issue.slug}`,
      lastModified: issue.publishedAt ? new Date(issue.publishedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const guidePageEntries: MetadataRoute.Sitemap = (guidePages ?? []).map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: g.publishedAt ? new Date(g.publishedAt) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...postPages, ...glossaryPages, ...newsletterPages, ...guidePageEntries]
}
