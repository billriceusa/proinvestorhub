type DataLayer = Record<string, unknown>[]

function getDataLayer(): DataLayer | null {
  if (typeof window === 'undefined' || !('dataLayer' in window)) return null
  return (window as unknown as { dataLayer: DataLayer }).dataLayer
}

export function trackLeadCapture(
  source: 'lender-finder' | 'calculator-save' | 'lead-magnet' | 'newsletter' | 'exit-intent' | 'sticky-cta',
  emailDomain: string,
  metadata?: Record<string, unknown>
) {
  getDataLayer()?.push({
    event: 'lead_capture',
    lead_source: source,
    email_domain: emailDomain,
    ...metadata,
  })
}

export function trackCtaImpression(
  ctaType: string,
  location: string
) {
  getDataLayer()?.push({
    event: 'cta_impression',
    cta_type: ctaType,
    cta_location: location,
  })
}

export function trackCtaClick(
  ctaType: string,
  location: string,
  destination?: string
) {
  getDataLayer()?.push({
    event: 'cta_click',
    cta_type: ctaType,
    cta_location: location,
    ...(destination && { cta_destination: destination }),
  })
}

export function trackCtaDismiss(ctaType: string) {
  getDataLayer()?.push({
    event: 'cta_dismiss',
    cta_type: ctaType,
  })
}

export function trackLenderFinderCapture(
  emailDomain: string,
  scenario: Record<string, unknown>
) {
  getDataLayer()?.push({
    event: 'lender_finder_email_capture',
    email_domain: emailDomain,
    ...scenario,
  })
}

export function trackLenderFinderSkip(scenario: Record<string, unknown>) {
  getDataLayer()?.push({
    event: 'lender_finder_skip',
    ...scenario,
  })
}

export function trackCalculatorSave(
  calculatorName: string,
  emailDomain: string,
  results?: Record<string, unknown>
) {
  getDataLayer()?.push({
    event: 'calculator_results_save',
    calculator_name: calculatorName,
    email_domain: emailDomain,
    ...results,
  })
}
