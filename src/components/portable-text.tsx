
'use client'

import { PortableText as PortableTextRenderer, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PartnerCTA } from '@/components/partner-cta'
import { LeadMagnetCTA } from '@/components/lead-magnet-cta'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { CalculatorCTA } from '@/components/calculator-cta'
import type { BPVertical } from '@/lib/partner-links'
import { useGlossaryLinker } from '@/lib/glossary-linker'

/** Extract plain text from a Portable Text block's span children */
function blockToText(value: { children?: { text?: string }[] }): string {
  if (!value?.children) return ''
  return value.children.map(c => c.text ?? '').join('')
}

function trackCtaClick(href: string, text: string) {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
      event: 'cta_click',
      cta_type: href.startsWith('http') ? 'outbound' : 'internal',
      cta_url: href,
      cta_text: text,
      cta_location: 'content',
    })
  }
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    partnerCta: ({ value }: { value: { vertical: BPVertical; heading?: string; description?: string } }) => (
      <PartnerCTA
        vertical={value.vertical}
        placement="inline-cta"
        heading={value.heading}
        description={value.description}
      />
    ),
    callout: ({ value }: { value: { type: string; title?: string; body: string } }) => {
      const config: Record<string, { border: string; bg: string; iconColor: string; defaultTitle: string; icon: string }> = {
        'key-concept': {
          border: 'border-l-primary',
          bg: 'bg-emerald-50',
          iconColor: 'text-primary',
          defaultTitle: 'Key Concept',
          icon: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
        },
        'pro-tip': {
          border: 'border-l-accent',
          bg: 'bg-amber-50',
          iconColor: 'text-amber-600',
          defaultTitle: 'Pro Tip',
          icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z',
        },
        warning: {
          border: 'border-l-red-500',
          bg: 'bg-red-50',
          iconColor: 'text-red-500',
          defaultTitle: 'Warning',
          icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
        },
        example: {
          border: 'border-l-blue-500',
          bg: 'bg-blue-50',
          iconColor: 'text-blue-500',
          defaultTitle: 'Example',
          icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
        },
      }

      const c = config[value.type] || config['key-concept']
      const title = value.title || c.defaultTitle

      return (
        <div className={`my-6 rounded-lg border-l-4 ${c.border} ${c.bg} p-4 sm:p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <svg className={`h-5 w-5 shrink-0 ${c.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
            </svg>
            <p className={`text-sm font-bold uppercase tracking-wide ${c.iconColor}`}>{title}</p>
          </div>
          <p className="text-sm text-text leading-relaxed">{value.body}</p>
        </div>
      )
    },
    inlineCta: ({ value }: { value: { ctaType: string; heading?: string; description?: string } }) => {
      switch (value.ctaType) {
        case 'lead-magnet':
          return (
            <div className="my-8">
              <LeadMagnetCTA variant="card" heading={value.heading} description={value.description} />
            </div>
          )
        case 'newsletter':
          return (
            <div className="my-8">
              <NewsletterSignup variant="card" heading={value.heading} description={value.description} source="inline-cta" />
            </div>
          )
        case 'calculator':
          return (
            <div className="my-8">
              <CalculatorCTA context="inline-cta" />
            </div>
          )
        case 'lender-finder':
          return (
            <div className="my-8">
              <a
                href="/lenders/finder"
                className="block rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-text">{value.heading || 'Find the Right Lender'}</p>
                    <p className="text-sm text-text-muted">{value.description || 'Match with investor-friendly lenders based on your deal type, experience, and property.'}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-primary">Try the Lender Finder &rarr;</p>
              </a>
            </div>
          )
        default:
          return null
      }
    },
    simpleTable: ({ value }: { value: { rows: { _key: string; cells: string[] }[] } }) => {
      if (!value?.rows?.length) return null
      const [headerRow, ...bodyRows] = value.rows
      return (
        <div className="my-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-alt text-text font-semibold">
              <tr>
                {headerRow.cells.map((cell, i) => (
                  <th key={i} className="px-4 py-3 whitespace-nowrap">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-text-muted">
              {bodyRows.map((row) => (
                <tr key={row._key} className="border-t border-border">
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-4 py-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
  block: {
    h2: ({ children, value }) => {
      const text = blockToText(value as { children?: { text?: string }[] })
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      return <h2 id={id} className="text-2xl font-bold text-text mt-10 mb-4 scroll-mt-24">{children}</h2>
    },
    h3: ({ children, value }) => {
      const text = blockToText(value as { children?: { text?: string }[] })
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      return <h3 id={id} className="text-xl font-semibold text-text mt-8 mb-3 scroll-mt-24">{children}</h3>
    },
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-text mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 text-text-muted mb-4">{children}</p>
    ),
    blockquote: ({ children, value }) => {
      const text = blockToText(value as { children?: { text?: string }[] })

      // Detect checklist patterns: ☐, ✓, ✔ markers
      if (/[☐✓✔]/.test(text)) {
        // Split on each checklist marker, keeping the marker with its text
        const parts = text.split(/(?=[☐✓✔])/).filter(Boolean)
        const checkItems: string[] = []
        let leadingText = ''
        let trailingText = ''

        for (const part of parts) {
          const trimmed = part.replace(/\s*\|\s*$/, '').trim()
          if (/^[☐✓✔]/.test(trimmed)) {
            // Check if trailing non-checklist text is appended to the last item
            const match = trimmed.match(/^([☐✓✔][^.?]*[.?])\s*((?:If|When|Note|Once)\b[\s\S]*)$/)
            if (match) {
              checkItems.push(match[1].trim())
              trailingText = match[2].trim()
            } else {
              checkItems.push(trimmed)
            }
          } else if (checkItems.length === 0) {
            leadingText = trimmed
          } else {
            trailingText = trimmed
          }
        }

        if (checkItems.length > 1) {
          return (
            <blockquote className="border-l-4 border-primary pl-4 text-text-muted my-6">
              {leadingText && (
                <p className="font-semibold mb-2">{leadingText}</p>
              )}
              <ul className="list-none space-y-2 p-0 m-0">
                {checkItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {trailingText && (
                <p className="mt-3 text-sm italic">{trailingText}</p>
              )}
            </blockquote>
          )
        }
      }

      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-text-muted my-6">
          {children}
        </blockquote>
      )
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary underline hover:text-primary-light transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={() => {
          if (value?.href) {
            trackCtaClick(value.href, typeof children === 'string' ? children : value.href)
          }
        }}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface-alt px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-muted">{children}</ol>
    ),
  },
}

function GlossaryNormal({ children }: { children?: React.ReactNode }) {
  const autoLink = useGlossaryLinker()

  // Process children to auto-link glossary terms in plain text spans
  const processed = processChildren(children, autoLink)

  return (
    <p className="text-base leading-7 text-text-muted mb-4">{processed}</p>
  )
}

function processChildren(
  children: React.ReactNode,
  autoLink: (text: string) => React.ReactNode
): React.ReactNode {
  if (!children) return children
  if (typeof children === 'string') return autoLink(children)
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === 'string') {
        return <span key={i}>{autoLink(child)}</span>
      }
      return child
    })
  }
  return children
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableText({ value, enableGlossaryLinks = false }: { value: any; enableGlossaryLinks?: boolean }) {
  if (enableGlossaryLinks) {
    const blockDefs = components.block as Record<string, unknown>
    const glossaryComponents: PortableTextComponents = {
      ...components,
      block: {
        h2: blockDefs.h2,
        h3: blockDefs.h3,
        h4: blockDefs.h4,
        blockquote: blockDefs.blockquote,
        normal: GlossaryNormal,
      } as PortableTextComponents['block'],
    }
    return <PortableTextRenderer value={value} components={glossaryComponents} />
  }
  return <PortableTextRenderer value={value} components={components} />
}
