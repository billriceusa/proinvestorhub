'use client'

import { useState } from 'react'
import Link from 'next/link'

type Offer = {
  id: string
  type: 'newsletter' | 'resource' | 'affiliate' | 'custom'
  heading: string
  description: string
  cta: string
  href?: string
  onClick?: () => void
}

const defaultNewsletterOffer: Offer = {
  id: 'newsletter',
  type: 'newsletter',
  heading: 'Get Smarter Deal Analysis',
  description:
    'Weekly insights on cap rates, cash flow, and strategies used by experienced investors. Free, no spam.',
  cta: 'Subscribe',
}

export function CalculatorCTA({
  offers,
  context,
}: {
  offers?: Offer[]
  context?: string
}) {
  const activeOffers = offers || [defaultNewsletterOffer]
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setEmailSent(true)
        setEmail('')
        if (typeof window !== 'undefined' && 'dataLayer' in window) {
          ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: 'newsletter_signup',
            signup_location: context || 'calculator',
            email_domain: email.split('@')[1],
          })
        }
      }
    } catch {
      // Silently fail — don't interrupt calculator UX
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800">You&apos;re subscribed!</p>
            <p className="text-xs text-emerald-600">
              Check your inbox for a welcome email.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {activeOffers.map((offer) => {
        if (offer.type === 'newsletter') {
          return (
            <div
              key={offer.id}
              className="rounded-lg border border-primary/20 bg-primary/5 p-4"
            >
              <p className="text-sm font-semibold text-text">{offer.heading}</p>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                {offer.description}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 min-w-0 rounded-md border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light transition-colors disabled:opacity-60"
                >
                  {loading ? '...' : offer.cta}
                </button>
              </form>
            </div>
          )
        }

        if (offer.type === 'resource' || offer.type === 'affiliate' || offer.type === 'custom') {
          return (
            <Link
              key={offer.id}
              href={offer.href || '#'}
              className="block rounded-lg border border-accent/30 bg-accent/5 p-4 hover:bg-accent/10 transition-colors group"
            >
              <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                {offer.heading}
              </p>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                {offer.description}
              </p>
              <span className="mt-2 inline-flex items-center text-xs font-semibold text-primary">
                {offer.cta} &rarr;
              </span>
            </Link>
          )
        }

        return null
      })}
    </div>
  )
}
