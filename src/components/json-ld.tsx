export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ProInvestorHub',
    url: baseUrl,
    description:
      'Expert guides, calculators, and education for real estate investors.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/glossary?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function articleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  authorName,
}: {
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedAt: string
  authorName: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      url: `${baseUrl}/authors/bill-rice`,
      jobTitle: 'Real Estate Investor & Mortgage Lending Veteran',
      sameAs: ['https://linkedin.com/in/billrice'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProInvestorHub',
      url: baseUrl,
    },
  }
}

export function glossaryJsonLd({
  term,
  definition,
  url,
}: {
  term: string
  definition: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Real Estate Investing Glossary',
      url: `${baseUrl}/glossary`,
    },
  }
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function calculatorJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ProInvestorHub',
    url: baseUrl,
    description:
      'Expert guides, calculators, and education for real estate investors.',
    founder: {
      '@type': 'Person',
      name: 'Bill Rice',
      url: `${baseUrl}/authors/bill-rice`,
    },
    sameAs: [],
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bill Rice',
    url: `${baseUrl}/authors/bill-rice`,
    jobTitle: 'Real Estate Investor & Mortgage Lending Veteran',
    description:
      'Bill Rice has 30+ years of experience in mortgage lending. He founded ProInvestorHub to share real estate investing education, tools, and market analysis.',
    sameAs: ['https://linkedin.com/in/billrice'],
    worksFor: {
      '@type': 'Organization',
      name: 'ProInvestorHub',
      url: baseUrl,
    },
    knowsAbout: [
      'Real Estate Investing',
      'Mortgage Lending',
      'Cap Rate Analysis',
      'BRRRR Strategy',
      'Real Estate Finance',
      'Investment Property Analysis',
    ],
  }
}
