'use client'

import { buildLenderLink, trackLenderClick, type LenderCTAPlacement } from '@/lib/lender-links'

type Props = {
  websiteUrl: string
  lenderName: string
  lenderSlug: string
  placement: LenderCTAPlacement
  loanType?: string
  state?: string
  editorRating?: number
  className?: string
  children: React.ReactNode
}

export function LenderOutboundLink({
  websiteUrl,
  lenderName,
  lenderSlug,
  placement,
  loanType,
  state,
  editorRating,
  className,
  children,
}: Props) {
  const href = buildLenderLink({ websiteUrl, lenderSlug, placement, loanType, state })

  function handleClick() {
    trackLenderClick({
      lenderName,
      lenderSlug,
      placement,
      destinationUrl: href,
      loanType,
      state,
      editorRating,
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
