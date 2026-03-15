'use client'

import { usePathname } from 'next/navigation'
import { buildBPLink, BP_VERTICALS, type BPVertical } from '@/lib/partner-links'

function trackBPClick({
  vertical,
  placement,
  slug,
  url,
}: {
  vertical: string
  placement: string
  slug: string
  url: string
}) {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
      event: 'bp_referral_click',
      bp_vertical: vertical,
      cta_placement: placement,
      article_slug: slug,
      destination_url: url,
      cta_type: 'outbound',
    })
  }
}

function slugFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  return segments[segments.length - 1] || 'homepage'
}

type PartnerCTAProps = {
  vertical: BPVertical
  placement: 'inline-cta' | 'bottom-cta' | 'sidebar-cta' | 'hero-cta'
  heading?: string
  description?: string
}

export function PartnerCTA({ vertical, placement, heading, description }: PartnerCTAProps) {
  const pathname = usePathname()
  const articleSlug = slugFromPath(pathname)
  const config = BP_VERTICALS[vertical]
  const href = buildBPLink({ vertical, ctaPlacement: placement, articleSlug })

  function handleClick() {
    trackBPClick({ vertical, placement, slug: articleSlug, url: href })
  }

  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <VerticalIcon vertical={vertical} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text">
            {heading || `Ready to ${config.label.toLowerCase()}?`}
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            {description || config.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleClick}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {config.cta}
              <span aria-hidden="true">&rarr;</span>
            </a>
            <span className="text-xs text-text-muted">
              Free &middot; via BiggerPockets
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PartnerCTAGroup({
  verticals,
  heading = 'Take the Next Step',
}: {
  verticals: BPVertical[]
  heading?: string
}) {
  const pathname = usePathname()
  const articleSlug = slugFromPath(pathname)

  return (
    <div className="my-10 rounded-xl border border-border bg-white p-6">
      <h3 className="text-lg font-semibold text-text">{heading}</h3>
      <p className="mt-1 text-sm text-text-muted">
        Connect with professionals who specialize in real estate investing.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {verticals.map((vertical) => {
          const config = BP_VERTICALS[vertical]
          const href = buildBPLink({ vertical, ctaPlacement: 'bottom-cta', articleSlug })
          return (
            <a
              key={vertical}
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() =>
                trackBPClick({ vertical, placement: 'bottom-cta', slug: articleSlug, url: href })
              }
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-primary/30 hover:shadow-md group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <VerticalIcon vertical={vertical} />
              </div>
              <div>
                <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                  {config.cta}
                </p>
                <p className="text-xs text-text-muted">Free &middot; via BiggerPockets</p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function VerticalIcon({ vertical }: { vertical: BPVertical }) {
  const iconClass = 'h-5 w-5 text-primary'
  switch (vertical) {
    case 'lenders':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
        </svg>
      )
    case 'agents':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      )
    case 'tax':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>
      )
    case 'finance':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    case 'property-managers':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
      )
  }
}
