export type BPVertical =
  | 'agents'
  | 'lenders'
  | 'tax'
  | 'finance'
  | 'property-managers'

export const BP_VERTICALS: Record<
  BPVertical,
  { label: string; path: string; campaign: string; description: string; cta: string }
> = {
  lenders: {
    label: 'Find a Lender',
    path: '/business/finder/lenders',
    campaign: 'bp-finder-lenders',
    description:
      'Match with investor-friendly lenders who specialize in DSCR, hard money, bridge loans, and more. Free and commitment-free.',
    cta: 'Find an Investor-Friendly Lender',
  },
  agents: {
    label: 'Find an Agent',
    path: '/business/finder/agents',
    campaign: 'bp-finder-agents',
    description:
      'Connect with real estate agents who understand investment strategy, know your local market, and move fast on deals.',
    cta: 'Match with an Investor-Friendly Agent',
  },
  tax: {
    label: 'Find a Tax Pro',
    path: '/business/finder/tax-and-financial-services',
    campaign: 'bp-finder-tax',
    description:
      'Find CPAs, enrolled agents, and tax strategists who specialize in real estate investing and can maximize your deductions.',
    cta: 'Find a Real Estate Tax Professional',
  },
  finance: {
    label: 'Find a Financial Advisor',
    path: '/business/finder/finance-pros',
    campaign: 'bp-finder-finance',
    description:
      'Work with financial advisors who understand how real estate fits into your overall wealth-building strategy.',
    cta: 'Match with a Financial Advisor',
  },
  'property-managers': {
    label: 'Find a Property Manager',
    path: '/business/finder/property-managers',
    campaign: 'bp-finder-pm',
    description:
      'Connect with trusted property managers who know your market, property type, and investment strategy.',
    cta: 'Find a Property Manager',
  },
}

export function buildBPLink({
  vertical,
  ctaPlacement,
  articleSlug,
}: {
  vertical: BPVertical
  ctaPlacement: string
  articleSlug: string
}): string {
  const config = BP_VERTICALS[vertical]
  const params = new URLSearchParams({
    utm_source: 'proinvestorhub',
    utm_medium: 'referral',
    utm_campaign: config.campaign,
    utm_content: ctaPlacement,
    utm_term: articleSlug,
  })
  return `https://www.biggerpockets.com${config.path}?${params.toString()}`
}
