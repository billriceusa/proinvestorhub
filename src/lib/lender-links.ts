/**
 * UTM link builder and GA4 event tracking for lender directory outbound links.
 *
 * UTM structure:
 *   utm_source=proinvestorhub
 *   utm_medium=referral
 *   utm_campaign=lender-directory
 *   utm_content={placement} (e.g. "profile-cta", "comparison-table", "finder-result")
 *   utm_term={lender-slug}
 *
 * GA4 events pushed via dataLayer:
 *   lender_cta_click — any outbound click to a lender website
 */

export type LenderCTAPlacement =
  | 'profile-cta'        // Main CTA on /lenders/reviews/[slug]
  | 'profile-sidebar'    // Sidebar link on profile page
  | 'comparison-table'   // Side-by-side comparison tool
  | 'finder-result'      // Scenario matcher results
  | 'loan-type-table'    // Table on /lenders/[loanType]
  | 'state-table'        // Table on /lenders/[loanType]/[state]
  | 'hub-table'          // Table on /lenders hub page
  | 'lender-card'        // LenderCard component
  | 'directory-featured' // Featured lenders section

export function buildLenderLink({
  websiteUrl,
  lenderSlug,
  placement,
  loanType,
  state,
}: {
  websiteUrl: string
  lenderSlug: string
  placement: LenderCTAPlacement
  loanType?: string
  state?: string
}): string {
  const url = new URL(websiteUrl)
  url.searchParams.set('utm_source', 'proinvestorhub')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'lender-directory')
  url.searchParams.set('utm_content', placement)
  url.searchParams.set('utm_term', lenderSlug)
  if (loanType) url.searchParams.set('utm_loan_type', loanType)
  if (state) url.searchParams.set('utm_state', state)
  return url.toString()
}

export function trackLenderClick({
  lenderName,
  lenderSlug,
  placement,
  destinationUrl,
  loanType,
  state,
  editorRating,
}: {
  lenderName: string
  lenderSlug: string
  placement: LenderCTAPlacement
  destinationUrl: string
  loanType?: string
  state?: string
  editorRating?: number
}) {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
      event: 'lender_cta_click',
      lender_name: lenderName,
      lender_slug: lenderSlug,
      cta_placement: placement,
      destination_url: destinationUrl,
      loan_type: loanType || '',
      state: state || '',
      editor_rating: editorRating || 0,
      cta_type: 'outbound',
    })
  }
}
