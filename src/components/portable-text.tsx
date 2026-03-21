
'use client'

import { PortableText as PortableTextRenderer, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PartnerCTA } from '@/components/partner-cta'
import type { BPVertical } from '@/lib/partner-links'

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
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-text mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-text mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 text-text-muted mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-text-muted my-6">
        {children}
      </blockquote>
    ),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableText({ value }: { value: any }) {
  return <PortableTextRenderer value={value} components={components} />
}
