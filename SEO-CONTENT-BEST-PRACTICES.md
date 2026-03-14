# Best Practices: Building SEO Content-Driven Lead Generation & Affiliate Websites

> A comprehensive playbook derived from building ProInvestorHub — a content-first education platform for real estate investors. This guide documents the architecture, strategy, and processes for launching an SEO-driven site that generates traffic and converts visitors into leads (and eventually revenue) as efficiently as possible.

---

## Table of Contents

1. [Strategic Foundation](#1-strategic-foundation)
2. [Technical Architecture](#2-technical-architecture)
3. [SEO Infrastructure](#3-seo-infrastructure)
4. [Content Architecture & Strategy](#4-content-architecture--strategy)
5. [Interactive Tool Strategy (Calculators)](#5-interactive-tool-strategy-calculators)
6. [Lead Generation & Conversion System](#6-lead-generation--conversion-system)
7. [Email & Newsletter Infrastructure](#7-email--newsletter-infrastructure)
8. [Internal Linking & Content Flywheel](#8-internal-linking--content-flywheel)
9. [Analytics & Measurement](#9-analytics--measurement)
10. [Content Production Process](#10-content-production-process)
11. [Launch Checklist](#11-launch-checklist)
12. [Post-Launch Growth Playbook](#12-post-launch-growth-playbook)
13. [Affiliate Monetization Layer](#13-affiliate-monetization-layer)

---

## 1. Strategic Foundation

### 1.1 Choose Your Niche Positioning

The most critical decision is selecting a niche and positioning. The winning formula:

- **Pick a niche where people make financial decisions.** Real estate, personal finance, SaaS tools, insurance, health — niches where the audience has money to spend and actively searches for education before purchasing.
- **Position as the unbiased educator, not the seller.** When all top-ranking content comes from companies selling their own product (lenders writing about loans, software companies writing about their tool category), an independent education-first guide is a clear gap. This is your differentiator.
- **Adopt a "NerdWallet for X" model.** Provide free tools + expert content + unbiased comparisons. Build trust through utility, then monetize through leads and affiliate relationships.

### 1.2 Define Your Content Pillars

Before writing a single word, define 4-6 content pillars that represent the major topic clusters your site will own. Each pillar becomes a topical authority hub.

| Pillar | What It Covers | Why It Works |
|--------|---------------|-------------|
| Core Skill (e.g., Deal Analysis) | The fundamental competency your audience needs | High search volume, evergreen, positions you as the expert |
| Strategies | Different approaches to the goal | Audiences search by strategy name, high engagement |
| Financing/Tools | How to fund/implement | High commercial intent, strong affiliate potential |
| Tax/Legal/Compliance | Rules and regulations | Authoritative content, frequently updated, trust builder |
| Market/Trend Analysis | Where and when to act | Time-sensitive, shareable, drives repeat visits |
| Getting Started | Beginner on-ramp | Highest volume keywords, widest funnel |

### 1.3 Map Revenue Model Before Building

Decide your monetization path upfront because it affects every architecture decision:

| Model | Infrastructure Needed | Content Angle |
|-------|----------------------|---------------|
| **Lead Generation** | Email capture, lead magnets, newsletter | Education-first, value before ask |
| **Affiliate** | CTA components with tracking, comparison content | Unbiased reviews, "best X for Y" content |
| **Hybrid (recommended)** | Both of the above | Build list first, introduce affiliate later |

**The recommended path:** Start with lead generation (email list building). Once you have traffic and trust, layer in affiliate offers. This order matters because it builds audience trust before monetization, and an email list is an owned asset you control regardless of algorithm changes.

---

## 2. Technical Architecture

### 2.1 Recommended Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js (App Router) | Static generation for speed, server components for SEO, API routes for backend logic |
| **CMS** | Sanity.io (or any headless CMS) | Structured content, embedded studio, flexible schemas with SEO fields built in |
| **Styling** | Tailwind CSS | Rapid development, consistent design, responsive by default |
| **Email** | Resend (or SendGrid/Mailchimp) | Transactional + marketing emails, contact management, audience segmentation |
| **Analytics** | Google Tag Manager + GA4 | Event tracking, conversion measurement, flexible without code changes |
| **Deployment** | Vercel | Edge performance, automatic HTTPS, preview deployments, ISR support |
| **Language** | TypeScript | Type safety prevents bugs in content-heavy sites with many data shapes |

### 2.2 Project Structure

Organize your project around content types, not technical concerns:

```
src/
├── app/
│   ├── (site)/                    # Public-facing routes (grouped layout)
│   │   ├── blog/                  # Blog listing + [slug] detail
│   │   ├── calculators/           # Interactive tools
│   │   ├── glossary/              # Term definitions (long-tail SEO)
│   │   ├── guides/                # Deep-dive content
│   │   ├── resources/             # Lead magnets, checklists
│   │   └── page.tsx               # Homepage
│   ├── api/
│   │   ├── newsletter/            # Email signup + broadcast endpoints
│   │   └── og/                    # Dynamic Open Graph image generation
│   ├── studio/                    # Embedded CMS admin
│   ├── layout.tsx                 # Root layout (metadata, analytics, fonts)
│   ├── robots.ts                  # Programmatic robots.txt
│   ├── sitemap.ts                 # Dynamic XML sitemap
│   └── manifest.ts                # PWA manifest
├── components/
│   ├── calculators/               # Interactive tool components
│   ├── analytics.tsx              # GTM integration
│   ├── calculator-cta.tsx         # Contextual CTAs on tool pages
│   ├── json-ld.tsx                # Structured data generators
│   ├── lead-magnet-cta.tsx        # Lead magnet signup (multiple variants)
│   ├── newsletter-signup.tsx      # Newsletter CTA (multiple variants)
│   ├── header.tsx                 # Site navigation
│   ├── footer.tsx                 # Footer with links + inline signup
│   └── portable-text.tsx          # CMS rich text renderer
├── data/                          # Static datasets (city data, comparisons)
├── emails/                        # Email templates (React Email)
│   ├── welcome.tsx                # Welcome sequence
│   └── weekly-newsletter.tsx      # Newsletter template
├── sanity/
│   ├── lib/                       # CMS client, queries, helpers
│   └── schemaTypes/               # Content models with SEO fields
└── scripts/                       # Content seeding, crosslinking, newsletters
```

### 2.3 Architecture Principles

1. **Server Components by default.** Only add `'use client'` for interactive elements (calculators, forms, mobile menus). This maximizes SEO crawlability and page speed.
2. **Static generation for content pages.** Use `generateStaticParams()` for blog posts, glossary terms, and calculator pages. Every content page should be statically generated at build time.
3. **Minimal client-side JavaScript.** Keep interactive components small and wrap them in small client component wrappers. The educational content surrounding them should be server-rendered HTML.
4. **Grouped route layout.** Use Next.js route groups like `(site)` to share a layout (header/footer) across all public pages without affecting URL structure.

---

## 3. SEO Infrastructure

### 3.1 Metadata System

Build a layered metadata system that provides defaults with per-page overrides:

**Root Layout (defaults):**
- Set `title.template` to `'%s | YourSiteName'` for consistent title formatting
- Define default `description`, `openGraph`, and `twitter` metadata
- Set `metadataBase` for resolving relative OG image URLs
- Include canonical URL via `alternates.canonical`
- Add search engine verification codes (Google Search Console, Bing Webmaster)

**Per-Page Metadata:**
- Every content page implements `generateMetadata()` that pulls from CMS SEO fields
- CMS schema includes `seo.metaTitle` (≤60 chars) and `seo.metaDescription` (≤160 chars) with validation warnings
- Fall back to content title/excerpt when SEO fields aren't filled

**Calculator/Tool Pages:**
- Static metadata exports with keyword-optimized titles
- Format: `"[Tool Name] | Free [Category] Tool"` (e.g., "Cap Rate Calculator | Free Capitalization Rate Tool")
- Description includes "free" and "no sign-up required" to boost CTR

### 3.2 Robots.txt

Programmatic `robots.ts` that:
- Allows crawling of all public content (`/`)
- Blocks CMS admin areas (`/studio`)
- References the sitemap URL

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### 3.3 XML Sitemap

Dynamic `sitemap.ts` that:
- Fetches all published content from the CMS at build time
- Assigns priorities: homepage (1.0) > section indexes (0.9) > tools (0.8) > blog posts (0.7) > glossary terms (0.6)
- Includes `lastModified` dates from CMS publish timestamps
- Sets appropriate `changeFrequency` for each content type

### 3.4 Structured Data (JSON-LD)

Create reusable JSON-LD generators for every content type:

| Schema Type | Where Used | SEO Benefit |
|-------------|-----------|-------------|
| `WebSite` | Homepage | Sitelinks search box in Google |
| `Organization` | Homepage | Knowledge panel, brand recognition |
| `Article` | Blog posts | Rich results, author attribution |
| `DefinedTerm` + `DefinedTermSet` | Glossary terms | Dictionary/definition rich results |
| `FAQPage` | Calculator pages, glossary terms | FAQ rich results (expandable answers in SERPs) |
| `WebApplication` | Calculator pages | Software app rich results |
| `BreadcrumbList` | All content pages | Breadcrumb trail in SERPs |

**Implementation pattern:** Build a `JsonLd` component that accepts a data object and renders a `<script type="application/ld+json">` tag. Create typed factory functions for each schema type.

### 3.5 Dynamic Open Graph Images

Generate OG images on-the-fly via an API route:
- Use Next.js `ImageResponse` (Vercel OG) at the edge
- Accept query parameters: `title`, `category`, `type`
- Apply consistent brand styling (colors, logo, typography)
- Optionally fetch relevant imagery from Unsplash for article OG images
- Apply dark gradient overlays for text readability

This eliminates the need to manually create social sharing images for every piece of content.

### 3.6 CMS Schema SEO Fields

Build SEO directly into your content model:

```typescript
defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Keep under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under 160 characters'),
    }),
  ],
})
```

Also add validation to excerpts: `rule.max(200).warning('Keep under 200 characters for best SEO')`.

---

## 4. Content Architecture & Strategy

### 4.1 The Four Content Types

Build four distinct content types, each serving a different role in the SEO funnel:

| Content Type | Purpose | SEO Role | Conversion Role |
|-------------|---------|----------|----------------|
| **Blog (Pillar + Cluster)** | Deep educational content | Target primary + secondary keywords | Drives newsletter signups, links to tools |
| **Glossary** | Term definitions | Long-tail keyword coverage at scale | Links to calculators and blog posts |
| **Calculators/Tools** | Interactive utilities | "Calculator" keywords, high engagement | Direct lead capture, affiliate placement |
| **Guides/Resources** | Comprehensive references | "Complete guide" keywords | Lead magnets, gated content |

### 4.2 Pillar-Cluster Content Model

Organize blog content using the hub-and-spoke model:

**Pillar Posts (4,000-5,500 words):**
- Target high-volume primary keywords (e.g., "BRRRR method," "house flipping guide")
- Serve as the comprehensive, authoritative resource on a topic
- Link outward to 5-10 cluster posts and relevant tools
- Include embedded calculators and data tables
- Update annually with current-year data

**Cluster Posts (2,000-3,500 words):**
- Target specific long-tail keywords (e.g., "real estate depreciation tax benefit")
- Link back to the parent pillar post
- Link across to related cluster posts and glossary terms
- More focused, actionable, single-topic content

### 4.3 Content Brief Structure

Every piece of content should start from a structured brief:

```markdown
## [Title]

**Primary keyword:** "[exact target keyword]"
**Secondary keywords:** [3-5 related keywords]
**Slug:** `url-friendly-slug`
**Category:** [Content Pillar]
**Target length:** [word range]

### Competitive Angle
[What gap exists in current top-ranking content? What can you do differently?]

### Outline
1. [Section with hook/angle]
2. [Educational section → link to relevant tool]
3. [Comparison or data section → table/chart]
4. [Worked example with real numbers]
5. [Tool embed or walkthrough]

### Internal Links
- `/calculators/relevant-tool` — [context for link]
- `/blog/related-pillar` — [context for link]
- `/glossary/term-1`, `/glossary/term-2`, `/glossary/term-3`
```

### 4.4 Competitive Angle Analysis

For every piece of content, answer: **"Why will this rank above what already exists?"**

Common differentiators:
- **Current-year data** when competitors use outdated statistics
- **Unbiased perspective** when top results are from companies selling their own product
- **Embedded tools** (calculators) that competitors don't have
- **Worked examples with real numbers** when competitors stay abstract
- **Visual data** (tables, comparisons) when competitors use text-heavy formats
- **Actionable frameworks** when competitors just describe concepts

### 4.5 Glossary as a Long-Tail SEO Machine

A glossary is one of the highest-leverage content types for SEO:

- **Scale:** 50-100+ terms create massive keyword coverage with minimal effort per page
- **Internal linking hub:** Every glossary term links to related terms, calculators, and blog posts
- **Programmatic content generation:** Start with short definitions, then expand high-traffic terms into 500-800 word mini-articles
- **Structured data:** Each term gets `DefinedTerm` schema markup for rich results
- **Searchable index:** Add client-side search/filter on the glossary index page (A-Z navigation)

Structure glossary pages to include:
1. Term definition (highlighted card)
2. "Why It Matters for Investors" section
3. Key takeaways
4. Related calculators (with contextual descriptions)
5. Related terms (2-column grid)
6. Related articles from the blog
7. Newsletter signup CTA

---

## 5. Interactive Tool Strategy (Calculators)

### 5.1 Why Calculators Are the Highest-Leverage SEO Asset

Calculators provide:
- **Exceptional engagement metrics** — users spend 3-5x longer on calculator pages than articles
- **Natural backlink targets** — other sites link to useful free tools
- **"Calculator" keyword modifiers** — high-intent, commercial keywords (e.g., "cap rate calculator")
- **Conversion opportunities** — users who run calculations are in active decision-making mode
- **Sticky navigation** — users bookmark and return to calculators

### 5.2 Calculator Page Architecture

Every calculator page should follow this structure:

1. **Breadcrumb navigation** (with BreadcrumbList JSON-LD)
2. **H1 + introductory paragraph** (keyword-optimized, explains the metric)
3. **The calculator tool** (interactive client component)
4. **Contextual CTA** (newsletter signup or affiliate offer below results)
5. **Educational content** (1,000-2,000 words of "how to use" + "what is a good [metric]")
6. **Comparison tables** (e.g., "Cap Rates by City" with real data)
7. **FAQ section** (with FAQPage JSON-LD schema)
8. **Related calculator links**

This structure means every calculator page is also a content page that can rank for informational keywords, not just "[metric] calculator."

### 5.3 Calculator CTA System

Build a flexible CTA component that supports multiple offer types:

```typescript
type Offer = {
  id: string
  type: 'newsletter' | 'resource' | 'affiliate' | 'custom'
  heading: string
  description: string
  cta: string
  href?: string
}
```

Place CTAs contextually after the user has received value from the calculator. The default should be a newsletter signup, with the ability to swap in affiliate offers per-calculator once you have monetization partners.

### 5.4 Recommended Calculator Categories

Build calculators that map to your content pillars:

| Calculator | Keyword Target | Content Link |
|-----------|---------------|-------------|
| Core metric calculators | "[metric] calculator" | Links to blog posts explaining the metric |
| Strategy-specific tools | "[strategy] calculator" | Links to strategy guide pillar |
| Comparison tools | "[A] vs [B] calculator" | Links to comparison blog posts |
| Tax/savings estimators | "[tax concept] calculator" | Links to tax strategy content |
| Location-based tools | "[metric] by city" | Links to market analysis content |

---

## 6. Lead Generation & Conversion System

### 6.1 The Conversion Architecture

Build three types of conversion components, each with multiple visual variants:

**1. Newsletter Signup (`newsletter-signup.tsx`)**
- **Variants:** `inline` (minimal, for footer), `card` (bordered box), `banner` (full-width colored)
- **Placement:** Footer (inline), end of blog posts (card), homepage (banner), glossary pages (card)
- **Copy:** Emphasize value delivery — "Weekly insights on [topic]" not "Sign up for our newsletter"

**2. Lead Magnet CTA (`lead-magnet-cta.tsx`)**
- **Variants:** `inline`, `card`, `banner`
- **Offer:** A tangible deliverable (checklist, template, spreadsheet) in exchange for email
- **Flow:** Email → API signup → Welcome email → Redirect to resource page
- **Copy:** Specific and quantified — "7 sections, 30+ line items" beats "Get our free guide"

**3. Calculator CTA (`calculator-cta.tsx`)**
- **Placement:** Below calculator results (the moment of highest engagement)
- **Default:** Newsletter signup with context-relevant copy
- **Affiliate-ready:** Accepts `type: 'affiliate'` offers with click tracking

### 6.2 CTA Placement Strategy

Place CTAs at natural engagement peaks, never interrupting the user's flow:

| Location | Component | Why It Works |
|----------|-----------|-------------|
| Homepage (mid-page) | Lead Magnet CTA (card) | After feature overview, before blog posts |
| Homepage (bottom) | Newsletter Signup (banner) | Clear next step before footer |
| Blog post (end) | Newsletter Signup (card) | Reader finished article, wants more |
| Blog post (mid, long articles) | Lead Magnet CTA (inline) | After significant value delivery |
| Calculator (below results) | Calculator CTA | Peak engagement moment |
| Glossary term (bottom) | Newsletter Signup (card) | Contextual copy referencing the term |
| Footer (site-wide) | Newsletter Signup (inline) | Persistent, non-intrusive |

### 6.3 Lead Magnet Design Principles

The best lead magnets for SEO content sites:
- **Checklists** that complement your tools (e.g., "Deal Analysis Checklist" pairs with calculators)
- **Templates/Spreadsheets** that extend your calculators offline
- **Printable reference guides** that compress your glossary into a portable format
- **Frameworks** that turn blog content into step-by-step processes

What matters: The lead magnet should be **adjacent to** your content, not a repackaging of it. If your blog post teaches "How to Analyze a Rental Property," the lead magnet is the checklist you actually use while analyzing — complementary, not duplicative.

### 6.4 Form Design Best Practices

- **Single field (email only)** for newsletter signups — reducing friction is worth the trade-off
- **Clear value proposition** above the form — what they get, how often, and that it's free
- **Transparent messaging** about what happens — "We'll also subscribe you to our weekly newsletter. Unsubscribe anytime."
- **Success state** that provides immediate value — don't just say "thanks," give them a link to a resource
- **Loading states** with disabled buttons to prevent double-submission
- **Error handling** that doesn't lose the user's input

---

## 7. Email & Newsletter Infrastructure

### 7.1 Email Flow Architecture

```
User signs up → API Route → Create Contact (Resend) + Send Welcome Email
                                                    ↓
                                        Weekly Newsletter (manual trigger)
                                                    ↓
                                    Featured Article + Tool Spotlight + Glossary Term
                                                    ↓
                                            Drive traffic back to site
```

### 7.2 Welcome Email

The welcome email is your first impression. Structure it as:

1. **Hero:** "Welcome to Smarter [Topic]" — warm, specific, branded
2. **What You'll Get:** 3 bullet points describing the value (frameworks, insights, strategies)
3. **Start Here:** 4 curated links to your best content (calculator, glossary, blog, guide)
4. **Footer:** Clear attribution and implicit unsubscribe option

The welcome email should drive first engagement with your highest-value tools. Every link in the welcome email should point to content with a conversion opportunity (calculator with CTA, blog post with newsletter re-signup).

### 7.3 Newsletter Structure

Each weekly newsletter issue follows a consistent format:

1. **Headline** — One compelling hook for the week
2. **Featured Article** — Deep-dive blog post with CTA button ("Read the Full Article →")
3. **Also This Week** — 1-2 shorter articles or glossary links
4. **Tool Spotlight** — Rotate through calculators with specific use-case tips
5. **Term of the Week** — Glossary term with definition (drives glossary traffic)
6. **Closing Note** — Personal sign-off from a real person (builds trust)

### 7.4 Newsletter Send Process

Build a secure broadcast system:

1. **Define issue content** in a script file (title, featured article, links)
2. **Test send** to your own email: `node scripts/send-newsletter.mjs --issue 1 --test you@email.com`
3. **Review** the email in your inbox
4. **Broadcast** to all subscribers: `node scripts/send-newsletter.mjs --issue 1 --broadcast`
5. **API security:** Protect the send endpoint with a Bearer token (`NEWSLETTER_SEND_SECRET`)

### 7.5 Newsletter Alignment with Content Calendar

Every newsletter should be tightly coupled with your content calendar:

- The **featured article** is the blog post published that week
- The **tool spotlight** is the calculator most relevant to that article
- The **glossary term** is a concept mentioned in the article
- All links point back to your site, driving return visits and engagement

---

## 8. Internal Linking & Content Flywheel

### 8.1 The Content Flywheel

The most important architectural insight: **every content type should link to every other content type.** This creates a self-reinforcing flywheel:

```
Blog Post → links to → Glossary Terms (definitions)
Blog Post → links to → Calculators (apply concepts)
Blog Post → links to → Other Blog Posts (related reading)

Glossary Term → links to → Related Terms (deeper understanding)
Glossary Term → links to → Calculators (apply this concept)
Glossary Term → links to → Blog Posts (learn more)

Calculator → links to → Blog Posts (educational content below tool)
Calculator → links to → Glossary Terms (define metrics used)
Calculator → links to → Other Calculators (related analysis)

Homepage → links to → All section indexes
Footer → links to → Key pages in each section
```

### 8.2 Internal Linking Rules

Follow these rules for every piece of content:

1. **Every blog post** should link to 2-3 glossary terms and at least 1 calculator
2. **Every calculator page** includes 1,000-2,000 words of educational content with links to related blog posts and glossary terms
3. **Every glossary term** links to related calculators and blog articles in the same category
4. **Target 1 primary keyword + 2-3 secondary keywords per post**
5. **Meta descriptions should include a call-to-action** ("Free calculator included")
6. **Cross-link between related content within the same pillar** (cluster → pillar → cluster)

### 8.3 Automated Cross-Linking

Build a script that programmatically cross-links content:

**How it works:**
1. Fetch all glossary terms from the CMS (sorted by term length, longest first)
2. Fetch all blog posts with their body content
3. For each post, find the first occurrence of each glossary term in body text
4. Convert that text span into a Portable Text link pointing to `/glossary/{slug}`
5. Skip terms that are already linked, and skip headings (H2/H3/H4)
6. Only link each term once per post (first occurrence)

This ensures that as your glossary grows, existing blog posts automatically gain relevant internal links without manual editing.

### 8.4 Category Mapping

Create explicit mappings between content categories across content types:

```typescript
const postCategoryToGlossary: Record<string, string> = {
  'deal-analysis': 'analysis',
  financing: 'financing',
  strategies: 'strategies',
  'tax-legal': 'tax',
  'getting-started': 'general',
}
```

Use these mappings to:
- Show "Key Terms to Know" on blog posts (glossary terms matching the post's category)
- Show "Related Articles" on glossary pages (blog posts matching the term's category)
- Show "Related Calculators" on glossary pages (calculators matching the term's category)

---

## 9. Analytics & Measurement

### 9.1 GTM Integration

Use Google Tag Manager loaded via Next.js `Script` component with `afterInteractive` strategy:

```typescript
export function GoogleTagManager() {
  if (!GTM_ID) return null
  return (
    <Script id="gtm-script" strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${GTM_ID}');` }}
    />
  )
}
```

Include the `<noscript>` iframe fallback in the body for completeness.

### 9.2 Key Events to Track

Define and push custom `dataLayer` events for every conversion point:

| Event | When Fired | Data Points |
|-------|-----------|-------------|
| `newsletter_signup` | Newsletter form submitted successfully | `signup_location`, `email_domain` |
| `cta_click` | Lead magnet or affiliate CTA clicked | `type`, `lead_magnet` or `cta_id`, `cta_location`, `email_domain` |
| `calculator_usage` | User runs a calculation (optional) | `calculator_name`, `input_values` (anonymized) |

Example implementation:
```typescript
if (typeof window !== 'undefined' && 'dataLayer' in window) {
  (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
    event: 'newsletter_signup',
    signup_location: context || 'calculator',
    email_domain: email.split('@')[1],
  })
}
```

### 9.3 Metrics to Monitor

**Traffic metrics:**
- Organic search sessions (by landing page)
- Keyword rankings (target keywords per content pillar)
- Click-through rate from SERPs (optimize titles/descriptions for low-CTR pages)
- Pages per session (measures internal linking effectiveness)

**Engagement metrics:**
- Time on page (calculators should be 3-5x blog posts)
- Calculator completion rate
- Glossary search usage
- Scroll depth on long-form content

**Conversion metrics:**
- Newsletter signup rate (by page and component variant)
- Lead magnet conversion rate
- Affiliate CTA click-through rate
- Email open and click rates

---

## 10. Content Production Process

### 10.1 Pre-Launch Content Plan

Before launching, have a minimum viable content base:

| Content Type | Minimum Count | Purpose |
|-------------|--------------|---------|
| Blog posts | 5-10 | Cover each pillar with at least 1 post |
| Glossary terms | 50-100 | Long-tail keyword foundation |
| Calculators | 3-5 | Core tools that your audience needs |
| Lead magnet | 1 | Primary conversion offer |
| Email templates | 2 | Welcome email + newsletter template |

### 10.2 12-Week Launch Calendar Template

Structure your first 12 weeks to systematically build topical authority:

**Each week delivers:**
- 1 blog post (alternating pillars)
- 1 newsletter issue (featuring that week's post)
- Newsletter includes: featured article + tool spotlight + glossary term of the week

**Pillar rotation ensures** you don't publish 4 posts in one topic and leave others empty. Spread content across all pillars in the first 12 weeks.

### 10.3 Content Brief to Published Post Workflow

1. **Research:** Identify primary keyword, analyze top 10 SERP results, find competitive angle
2. **Brief:** Write structured content brief (see template in Section 4.3)
3. **Draft:** Write the full post following the brief outline
4. **Optimize:** Add internal links (2-3 glossary terms, 1+ calculator, related posts)
5. **SEO fields:** Fill metaTitle (≤60 chars), metaDescription (≤160 chars), excerpt (≤200 chars)
6. **Image:** Add hero image with descriptive alt text
7. **Publish:** Set publishedAt date, assign to category, assign author
8. **Cross-link:** Run the automated cross-linking script
9. **Newsletter:** Include in that week's newsletter issue
10. **Monitor:** Track ranking and traffic after 2-4 weeks

### 10.4 Glossary Enrichment Process

Scale your glossary from definitions to mini-articles in batches:

1. **Wave 1:** Seed 50-100 terms with 1-2 sentence definitions
2. **Wave 2:** Enrich high-traffic terms with 500-800 word body content (examples, formulas, context)
3. **Wave 3:** Add cross-references (`relatedTerms`) between terms in the same category
4. **Wave 4:** Run cross-linking script to add glossary links in blog posts
5. **Ongoing:** Expand terms mentioned in new blog posts with richer content

---

## 11. Launch Checklist

### Pre-Launch Technical Checklist

- [ ] **Domain & hosting:** Custom domain configured, HTTPS enabled
- [ ] **DNS records:** Set up for email sending domain verification (Resend/SendGrid SPF, DKIM, DMARC)
- [ ] **Environment variables:** All production values set (CMS, analytics, email, site URL)
- [ ] **Google Search Console:** Site verified, sitemap submitted
- [ ] **Bing Webmaster Tools:** Site verified
- [ ] **Google Tag Manager:** Container created, GTM ID configured
- [ ] **GA4:** Property created, connected to GTM
- [ ] **Robots.txt:** Accessible at `/robots.txt`, sitemap referenced
- [ ] **Sitemap:** Accessible at `/sitemap.xml`, includes all content pages
- [ ] **OG images:** Generating correctly for all page types
- [ ] **Mobile responsiveness:** All pages render correctly on mobile
- [ ] **Page speed:** Core Web Vitals passing (Lighthouse 90+)
- [ ] **404 page:** Custom 404 with navigation back to main content areas

### Pre-Launch Content Checklist

- [ ] **Homepage:** Hero, feature grid, lead magnet CTA, latest posts, newsletter CTA, bottom CTA
- [ ] **Blog:** 5-10 published posts across content pillars
- [ ] **Glossary:** 50+ terms with definitions, categorized
- [ ] **Calculators:** 3-5 functional tools with educational content below
- [ ] **Lead magnet:** Created, hosted, email flow tested
- [ ] **Welcome email:** Designed, tested, sending correctly
- [ ] **Newsletter template:** Designed, tested with sample content
- [ ] **Header navigation:** Links to Blog, Calculators, Glossary, Guides
- [ ] **Footer:** Section links, newsletter inline signup, copyright
- [ ] **All pages:** JSON-LD structured data, breadcrumbs, metadata

### Pre-Launch SEO Checklist

- [ ] **Every page** has a unique `<title>` tag (≤60 chars)
- [ ] **Every page** has a unique `<meta name="description">` (≤160 chars)
- [ ] **Every page** has Open Graph tags (title, description, image)
- [ ] **Every image** has descriptive `alt` text
- [ ] **Every blog post** links to 2+ glossary terms and 1+ calculator
- [ ] **Every calculator** has 1,000+ words of educational content
- [ ] **Every glossary term** links to related calculators and articles
- [ ] **Internal linking** cross-references are in place
- [ ] **Canonical URLs** are set correctly
- [ ] **Heading hierarchy** is correct (one H1, logical H2/H3 structure)
- [ ] **URL slugs** are keyword-optimized and human-readable

---

## 12. Post-Launch Growth Playbook

### 12.1 Weeks 1-4: Foundation

- **Publish weekly:** 1 blog post + 1 newsletter issue per week
- **Monitor indexing:** Check Google Search Console for crawl errors and indexing status
- **Fix issues:** Address any crawl errors, missing sitemaps, or schema validation issues
- **Enrich glossary:** Add body content to the 10 highest-potential terms

### 12.2 Weeks 5-12: Momentum

- **Maintain cadence:** Continue weekly blog + newsletter
- **Analyze traffic:** Identify which content is gaining traction, double down on those pillars
- **Build backlinks:** Guest post on industry sites, link to your calculators
- **Expand calculators:** Add 1-2 new calculators based on content gaps
- **Cross-promote:** Share content in relevant communities (not spam — add genuine value)

### 12.3 Months 3-6: Scaling

- **Update top performers:** Refresh posts with current-year data
- **Content clusters:** Complete the full pillar-cluster model for your top 2 pillars
- **Glossary depth:** Expand remaining terms to 500-800 word mini-articles
- **Calculator features:** Add PDF export, comparison modes, save/share functionality
- **Email segmentation:** Segment newsletter subscribers by interest area

### 12.4 Months 6-12: Monetization

- **Introduce affiliate offers:** Start with 1-2 high-quality, relevant affiliate products
- **A/B test CTAs:** Test different CTA copy, placement, and offers
- **Comparison content:** Create "Best X for Y" articles that naturally incorporate affiliate links
- **Sponsored content opportunities:** Your traffic and email list become valuable to relevant companies
- **Product ideas:** Your most popular calculators and content reveal what products your audience needs

---

## 13. Affiliate Monetization Layer

### 13.1 When to Add Affiliate Revenue

**Wait until you have:**
- 10,000+ monthly organic sessions (or 5,000+ for high-value niches)
- 1,000+ email subscribers
- Established trust and content authority
- Clear understanding of which products your audience needs

### 13.2 Affiliate Integration Architecture

The infrastructure should already be built into your CTA system:

```typescript
type Offer = {
  id: string
  type: 'newsletter' | 'resource' | 'affiliate' | 'custom'
  heading: string
  description: string
  cta: string
  href?: string  // affiliate link
}
```

**On calculator pages:** Replace default newsletter CTA with relevant affiliate offers
- After a mortgage calculation → link to mortgage comparison tool/lender
- After a cash flow analysis → link to property management software
- After a BRRRR calculation → link to hard money lender comparison

**On comparison blog posts:** Natural integration in "Best X for Y" content with disclosure.

### 13.3 Affiliate Link Management

- Use `rel="nofollow sponsored"` on all affiliate links
- Track all affiliate clicks through GTM `dataLayer` events with `cta_type: 'affiliate'`
- Centralize affiliate offers in a configuration so links can be updated site-wide
- Add FTC disclosure on pages containing affiliate links
- Never compromise editorial integrity — recommend products you would actually use

### 13.4 Revenue Stacking Model

The full monetization stack, in order of implementation:

1. **Email list** (free, owned asset, compounds over time)
2. **Affiliate revenue** (passive, scales with traffic)
3. **Sponsored newsletter** (when you have 5,000+ subscribers)
4. **Premium content/tools** (when you understand your audience deeply)
5. **Own products** (the ultimate monetization — courses, software, consulting)

---

## Appendix A: Environment Variables Reference

| Variable | Purpose | When Needed |
|----------|---------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS project identifier | Always |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS dataset (e.g., `production`) | Always |
| `SANITY_API_READ_TOKEN` | CMS read access for server-side queries | Always |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata and sitemaps | Always |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | When analytics is configured |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification code | At launch |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster verification code | At launch |
| `RESEND_API_KEY` | Email service authentication | When email is configured |
| `RESEND_SEGMENT_ID` | Newsletter subscriber segment | When email is configured |
| `RESEND_FROM_EMAIL` | Sender email address (verify domain first) | When email is configured |
| `NEWSLETTER_SEND_SECRET` | Auth token for newsletter broadcast endpoint | When newsletter is configured |
| `UNSPLASH_ACCESS_KEY` | Dynamic OG image backgrounds (optional) | Optional enhancement |

## Appendix B: Content Calendar Template

| Week | Blog Post | Pillar | Target Keywords | Newsletter Theme | Tool Spotlight | Glossary Term |
|------|-----------|--------|----------------|-----------------|---------------|---------------|
| 1 | [Title] | [Pillar] | [primary], [secondary] | [Hook headline] | [Calculator] | [Term] |
| 2 | [Title] | [Pillar] | [primary], [secondary] | [Hook headline] | [Calculator] | [Term] |
| ... | ... | ... | ... | ... | ... | ... |

**Rules:**
- Alternate between content pillars week to week
- Each newsletter features the corresponding blog post
- Rotate calculator spotlights to cover all tools in 12 weeks
- Choose glossary terms that appear in that week's blog post

## Appendix C: SEO Content Checklist (Per-Post)

Use this checklist before publishing every piece of content:

- [ ] Primary keyword appears in: title, H1, first paragraph, meta description, URL slug
- [ ] Secondary keywords appear naturally in H2s and body text
- [ ] Meta title is ≤60 characters and includes primary keyword
- [ ] Meta description is ≤160 characters, includes primary keyword and CTA
- [ ] URL slug is concise and keyword-optimized
- [ ] H1 tag is unique and matches the page purpose
- [ ] H2/H3 hierarchy is logical and covers key subtopics
- [ ] Content includes at least one worked example with real numbers
- [ ] Internal links: 2-3 glossary terms, 1+ calculator, 1+ related blog post
- [ ] Images have descriptive alt text (not stuffed with keywords)
- [ ] Content is at least 2,000 words for cluster posts, 4,000+ for pillars
- [ ] Competitive angle is clear — this post adds value that top results lack
- [ ] CTA is present (newsletter or lead magnet) at the end of the article
- [ ] JSON-LD structured data is generated (Article, BreadcrumbList)
- [ ] Open Graph image is generating correctly

---

*This guide is a living document. Update it as you learn what works for your specific niche, audience, and traffic patterns.*
