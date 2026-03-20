'use client'

import { usePathname } from 'next/navigation'
import {
  TOOLS,
  buildToolLink,
  getToolsForContext,
  type ToolSlug,
} from '@/lib/tool-links'

function trackToolClick(tool: string, placement: string, pageSlug: string, url: string) {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
      event: 'tool_referral_click',
      tool_name: tool,
      cta_placement: placement,
      page_slug: pageSlug,
      destination_url: url,
      cta_type: 'outbound',
    })
  }
}

function slugFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  return segments[segments.length - 1] || 'homepage'
}

/**
 * Renders a grid of contextually relevant tool recommendations.
 * Pass `context` to auto-select tools, or `tools` to specify manually.
 */
export function ToolRecommendations({
  context,
  tools: manualTools,
  heading,
  placement = 'bottom-tools',
}: {
  context?: string
  tools?: ToolSlug[]
  heading?: string
  placement?: string
}) {
  const pathname = usePathname()
  const pageSlug = slugFromPath(pathname)

  const toolSlugs = manualTools || (context ? getToolsForContext(context) : [])
  if (toolSlugs.length === 0) return null

  return (
    <div className="my-10 rounded-xl border border-border bg-white p-6 shadow-sm print:hidden">
      <h3 className="text-sm font-semibold text-text uppercase tracking-wide">
        {heading || 'Tools for This Strategy'}
      </h3>
      <p className="mt-1 text-xs text-text-muted">
        Free tools we recommend for real estate investors.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {toolSlugs.map((slug) => {
          const config = TOOLS[slug]
          const href = buildToolLink({ tool: slug, placement, pageSlug })
          return (
            <a
              key={slug}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackToolClick(config.name, placement, pageSlug, href)}
              className="group rounded-lg border border-border/50 p-4 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                  {config.name}
                </p>
                <span className="text-xs text-text-light">&rarr;</span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-primary/70">
                {config.tagline}
              </p>
              <p className="mt-2 text-xs text-text-muted leading-5">
                {config.description}
              </p>
            </a>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Inline single-tool CTA for embedding within article content.
 */
export function InlineToolCTA({
  tool,
  placement = 'inline-tool',
}: {
  tool: ToolSlug
  placement?: string
}) {
  const pathname = usePathname()
  const pageSlug = slugFromPath(pathname)
  const config = TOOLS[tool]
  const href = buildToolLink({ tool, placement, pageSlug })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackToolClick(config.name, placement, pageSlug, href)}
      className="my-6 flex items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4 transition-all hover:border-primary/40 hover:shadow-sm group print:hidden"
    >
      <div className="flex-1">
        <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
          {config.name} &mdash; {config.tagline}
        </p>
        <p className="mt-1 text-xs text-text-muted">{config.description}</p>
      </div>
      <span className="shrink-0 text-sm font-medium text-primary">
        Try Free &rarr;
      </span>
    </a>
  )
}
