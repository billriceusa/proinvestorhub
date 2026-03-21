#!/usr/bin/env node

/**
 * Generate and publish blog posts to Sanity using Claude AI.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... SANITY_API_WRITE_TOKEN=sk-... node scripts/generate-blog-posts.mjs
 *   DRY_RUN=1 ... node scripts/generate-blog-posts.mjs
 */

import { createClient } from '@sanity/client'
import Anthropic from '@anthropic-ai/sdk'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g',
  dataset: 'production',
  apiVersion: '2026-03-14',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const DRY_RUN = process.env.DRY_RUN === '1'
const authorRef = { _type: 'reference', _ref: 'author-bill-rice' }

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// Blog post briefs
const POSTS = [
  {
    title: 'How to Build a Real Estate Portfolio from Scratch',
    slug: 'how-to-build-real-estate-portfolio',
    categories: ['cat-beginner', 'cat-strategies'],
    primaryKeyword: 'build real estate portfolio',
    secondaryKeywords: ['real estate portfolio strategy', 'first rental property', 'scaling rental properties'],
    internalLinks: ['/calculators/cash-on-cash', '/calculators/rental-cashflow', '/glossary/leverage', '/glossary/cash-on-cash-return', '/start-here'],
  },
  {
    title: 'Seller Financing: The Creative Deal Structure Most Investors Miss',
    slug: 'seller-financing-guide',
    categories: ['cat-financing'],
    primaryKeyword: 'seller financing real estate',
    secondaryKeywords: ['creative financing', 'owner financing', 'seller carry back'],
    internalLinks: ['/calculators/mortgage', '/glossary/seller-financing', '/glossary/leverage', '/blog'],
  },
  {
    title: 'Property Management: DIY vs. Hiring a Manager',
    slug: 'property-management-diy-vs-hiring',
    categories: ['cat-strategies'],
    primaryKeyword: 'DIY property management vs hiring',
    secondaryKeywords: ['property management costs', 'self manage rental property', 'when to hire property manager'],
    internalLinks: ['/calculators/rental-cashflow', '/glossary/net-operating-income', '/glossary/vacancy-rate'],
  },
  {
    title: 'How to Use the BRRRR Calculator to Vet Deals Faster',
    slug: 'how-to-use-brrrr-calculator',
    categories: ['cat-analysis', 'cat-strategies'],
    primaryKeyword: 'BRRRR calculator',
    secondaryKeywords: ['BRRRR deal analysis', 'BRRRR method calculator', 'analyze BRRRR deal'],
    internalLinks: ['/calculators/brrrr', '/glossary/brrrr-method', '/glossary/after-repair-value', '/glossary/cash-on-cash-return'],
  },
  {
    title: 'FHA Loans for Investors: The House Hacker\'s Secret Weapon',
    slug: 'fha-loans-house-hacking-guide',
    categories: ['cat-financing', 'cat-beginner'],
    primaryKeyword: 'FHA loan house hacking',
    secondaryKeywords: ['FHA investment property', 'house hacking strategy', 'low down payment investing'],
    internalLinks: ['/calculators/mortgage', '/calculators/rental-cashflow', '/glossary/house-hacking', '/glossary/fha-loan'],
  },
  {
    title: 'Understanding Cap Rate Compression: What It Means for Your Portfolio',
    slug: 'cap-rate-compression-explained',
    categories: ['cat-analysis'],
    primaryKeyword: 'cap rate compression',
    secondaryKeywords: ['cap rate trends', 'real estate cap rates declining', 'what affects cap rates'],
    internalLinks: ['/calculators/cap-rate', '/glossary/cap-rate', '/glossary/cap-rate-compression', '/markets'],
  },
  {
    title: 'Real Estate vs. Stocks: A Data-Driven Comparison',
    slug: 'real-estate-vs-stocks-comparison',
    categories: ['cat-analysis', 'cat-beginner'],
    primaryKeyword: 'real estate vs stocks',
    secondaryKeywords: ['real estate returns vs stock market', 'rental property vs index funds', 'investing comparison'],
    internalLinks: ['/calculators/cash-on-cash', '/glossary/cash-on-cash-return', '/glossary/leverage', '/start-here'],
  },
  {
    title: 'How to Find Off-Market Deals in Any Market',
    slug: 'how-to-find-off-market-deals',
    categories: ['cat-strategies'],
    primaryKeyword: 'off-market real estate deals',
    secondaryKeywords: ['find off market properties', 'direct to seller marketing', 'wholesale real estate deals'],
    internalLinks: ['/calculators/cap-rate', '/calculators/fix-flip', '/glossary/wholesale', '/glossary/after-repair-value'],
  },
  {
    title: 'The Ultimate Guide to Tenant Screening',
    slug: 'tenant-screening-guide',
    categories: ['cat-strategies'],
    primaryKeyword: 'tenant screening guide',
    secondaryKeywords: ['how to screen tenants', 'tenant background check', 'rental application process'],
    internalLinks: ['/calculators/rental-cashflow', '/glossary/vacancy-rate', '/glossary/net-operating-income'],
  },
  {
    title: 'Hard Money vs. DSCR Loans: Which Is Right for Your Deal?',
    slug: 'hard-money-vs-dscr-loans',
    categories: ['cat-financing'],
    primaryKeyword: 'hard money vs DSCR loan',
    secondaryKeywords: ['hard money lending', 'DSCR loan requirements', 'investment property financing'],
    internalLinks: ['/calculators/mortgage', '/glossary/hard-money-loan', '/glossary/dscr-loan', '/glossary/debt-service'],
  },
]

const SYSTEM = `You are writing a blog post for ProInvestorHub (proinvestorhub.com), authored by Bill Rice, a real estate investor and mortgage lending veteran with 30+ years of experience.

Writing rules:
- Write 2,000-3,000 words of substantive, actionable content
- Use specific numbers, hypothetical deal examples, formulas, and frameworks — not generic advice
- You may use hypothetical examples ("Let's say you find a duplex listed at $250K...") but NEVER present them as real personal experiences. Do not write "I once bought..." or "A client of mine..." — we do not lie.
- Tone: authoritative, direct, data-driven — like a seasoned investor mentoring a newcomer
- Naturally reference internal links by mentioning topics (glossary terms, calculators) readers can explore
- Include practical templates, checklists, or frameworks the reader can use immediately

Output format: Return ONLY a JSON object with this structure (no markdown, no code fences):
{
  "excerpt": "2-3 sentence excerpt under 200 chars",
  "seoTitle": "SEO title under 60 chars with primary keyword",
  "seoDescription": "Meta description under 160 chars with primary keyword",
  "sections": [
    { "text": "Opening paragraph...", "style": "normal" },
    { "text": "Section Heading", "style": "h2" },
    { "text": "Body paragraph...", "style": "normal" },
    { "text": "Subsection", "style": "h3" },
    ...
  ]
}

Include 20-30 sections for a complete article. Use "h2" for main sections, "h3" for subsections, "normal" for paragraphs, "blockquote" for key formulas or callouts.`

async function generatePost(brief) {
  const prompt = `Write a complete blog post:

Title: ${brief.title}
Primary Keyword: ${brief.primaryKeyword}
Secondary Keywords: ${brief.secondaryKeywords.join(', ')}
Internal Links to Reference: ${brief.internalLinks.join(', ')}

Naturally incorporate the primary keyword 3-5 times and secondary keywords 1-2 times each. Reference internal link topics naturally within the content.

Return ONLY the JSON object.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8192,
    temperature: 0.8,
    system: SYSTEM,
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') throw new Error('No response')

  let json = textBlock.text.trim()
  if (json.startsWith('```')) {
    json = json.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  return JSON.parse(json)
}

function sectionsToPortableText(sections) {
  return sections.map((section) => ({
    _type: 'block',
    _key: randomKey(),
    style: section.style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomKey(),
        text: section.text,
        marks: [],
      },
    ],
  }))
}

async function main() {
  console.log(`\nBlog Post Generator`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE — publishing to Sanity'}`)
  console.log(`Posts: ${POSTS.length}\n`)

  // Check which posts already exist
  const existingSlugs = await client.fetch(
    `*[_type == "post"].slug.current`
  )
  const existingSet = new Set(existingSlugs)

  let created = 0
  let skipped = 0
  let failed = 0

  for (let i = 0; i < POSTS.length; i++) {
    const brief = POSTS[i]

    if (existingSet.has(brief.slug)) {
      console.log(`[${i + 1}/${POSTS.length}] SKIP: "${brief.title}" (already exists)`)
      skipped++
      continue
    }

    console.log(`[${i + 1}/${POSTS.length}] Generating: "${brief.title}"...`)

    try {
      const content = await generatePost(brief)

      const doc = {
        _type: 'post',
        title: brief.title,
        slug: { _type: 'slug', current: brief.slug },
        author: authorRef,
        categories: brief.categories.map((cat, idx) => ({
          _type: 'reference',
          _ref: cat,
          _key: `c${idx + 1}`,
        })),
        publishedAt: new Date().toISOString(),
        excerpt: content.excerpt,
        seo: {
          metaTitle: content.seoTitle,
          metaDescription: content.seoDescription,
        },
        body: sectionsToPortableText(content.sections),
      }

      if (DRY_RUN) {
        console.log(`   ✓ Generated: ${content.sections.length} sections`)
        console.log(`   SEO: ${content.seoTitle}`)
        console.log(`   Excerpt: ${content.excerpt}`)
      } else {
        await client.create(doc)
        console.log(`   ✓ Published: ${content.sections.length} sections`)
      }

      created++
    } catch (err) {
      console.error(`   ✗ Failed: ${err.message}`)
      failed++
    }

    // Rate limit between API calls
    if (i < POSTS.length - 1) {
      await sleep(3000)
    }
  }

  console.log(`\nResults:`)
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Failed: ${failed}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
