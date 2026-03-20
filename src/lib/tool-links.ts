/**
 * Affiliate tool recommendations with UTM tracking.
 * Pre-monetization: these are helpful outbound links to build partner data.
 * No affiliate IDs until 10K uniques/month threshold.
 */

export type ToolSlug = 'dealcheck' | 'baselane' | 'rentredi' | 'landlord-studio'

export type ToolConfig = {
  name: string
  url: string
  campaign: string
  tagline: string
  description: string
  /** Which page contexts this tool is most relevant for */
  contexts: string[]
}

export const TOOLS: Record<ToolSlug, ToolConfig> = {
  dealcheck: {
    name: 'DealCheck',
    url: 'https://dealcheck.io',
    campaign: 'tool-dealcheck',
    tagline: 'Analyze deals in minutes',
    description:
      'Run rental property, BRRRR, flip, and wholesale analyses with real numbers. Import listings directly from Zillow and Redfin.',
    contexts: [
      'cap-rate',
      'cash-on-cash',
      'brrrr',
      'fix-flip',
      'rental-cashflow',
      'wholesale',
      'deal-analysis',
    ],
  },
  baselane: {
    name: 'Baselane',
    url: 'https://www.baselane.com',
    campaign: 'tool-baselane',
    tagline: 'Banking built for landlords',
    description:
      'Free landlord banking with automated rent collection, bookkeeping, and reporting. Designed specifically for rental property owners.',
    contexts: [
      'rental-cashflow',
      'property-management',
      'cash-flow',
      'getting-started',
    ],
  },
  rentredi: {
    name: 'RentRedi',
    url: 'https://www.rentredi.com',
    campaign: 'tool-rentredi',
    tagline: 'Property management made simple',
    description:
      'All-in-one property management app: tenant screening, rent collection, maintenance requests, and accounting from your phone.',
    contexts: [
      'property-management',
      'rental-cashflow',
      'house-hacking',
      'getting-started',
    ],
  },
  'landlord-studio': {
    name: 'Landlord Studio',
    url: 'https://www.landlordstudio.com',
    campaign: 'tool-landlord-studio',
    tagline: 'Track income, expenses & reports',
    description:
      'Property management and accounting software for landlords. Track income and expenses, generate tax-ready reports, and manage tenants.',
    contexts: [
      'rental-cashflow',
      'tax-legal',
      'property-management',
      'deal-analysis',
    ],
  },
}

/**
 * Build a UTM-tracked link to an affiliate tool.
 */
export function buildToolLink({
  tool,
  placement,
  pageSlug,
}: {
  tool: ToolSlug
  placement: string
  pageSlug: string
}): string {
  const config = TOOLS[tool]
  const params = new URLSearchParams({
    utm_source: 'proinvestorhub',
    utm_medium: 'referral',
    utm_campaign: config.campaign,
    utm_content: placement,
    utm_term: pageSlug,
  })
  return `${config.url}?${params.toString()}`
}

/**
 * Returns tools relevant to a given page context (e.g. 'brrrr', 'cash-flow').
 */
export function getToolsForContext(context: string): ToolSlug[] {
  return (Object.entries(TOOLS) as [ToolSlug, ToolConfig][])
    .filter(([, config]) => config.contexts.includes(context))
    .map(([slug]) => slug)
}
