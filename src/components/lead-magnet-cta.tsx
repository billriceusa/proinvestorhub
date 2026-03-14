'use client'

import { useState } from 'react'
import Link from 'next/link'

type Variant = 'inline' | 'card' | 'banner'

export function LeadMagnetCTA({
  variant = 'card',
  heading,
  description,
}: {
  variant?: Variant
  heading?: string
  description?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Push dataLayer event
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event: 'cta_click',
        type: 'lead_magnet',
        lead_magnet: 'deal-analysis-checklist',
        email_domain: email.split('@')[1],
      })
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const defaultHeading = 'Free: Rental Property Deal Analysis Checklist'
  const defaultDescription =
    'The step-by-step checklist pro investors use to evaluate every deal. 7 sections, 30+ line items — never miss a critical number again.'

  if (status === 'success') {
    return (
      <div className={wrapperClass(variant)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-text">Your checklist is ready!</p>
            <p className="text-sm text-text-muted">
              Check your inbox for a confirmation, and grab your checklist below.
            </p>
          </div>
        </div>
        <Link
          href="/resources/deal-analysis-checklist"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          View &amp; Print Your Checklist
        </Link>
      </div>
    )
  }

  return (
    <div className={wrapperClass(variant)}>
      {variant !== 'inline' && (
        <div className="mb-1">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
            variant === 'banner' ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'
          }`}>
            Free Download
          </span>
        </div>
      )}
      <div className={variant === 'inline' ? '' : 'mb-4'}>
        <h3
          className={
            variant === 'banner'
              ? 'text-lg font-bold text-white sm:text-xl'
              : 'text-lg font-bold text-text'
          }
        >
          {heading || defaultHeading}
        </h3>
        <p
          className={`mt-1 text-sm ${variant === 'banner' ? 'text-white/70' : 'text-text-muted'}`}
        >
          {description || defaultDescription}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`flex gap-2 ${variant === 'inline' ? 'mt-3' : ''} ${variant === 'banner' ? 'flex-col sm:flex-row sm:max-w-md' : ''}`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${
            variant === 'banner'
              ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-1 focus:ring-accent'
              : 'border-border bg-white text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 shrink-0 ${
            variant === 'banner'
              ? 'bg-accent text-primary-dark hover:bg-accent-light'
              : 'bg-primary text-white hover:bg-primary-light'
          }`}
        >
          {status === 'loading' ? 'Sending...' : 'Get the Checklist'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      <p className={`mt-2 text-xs ${variant === 'banner' ? 'text-white/50' : 'text-text-light'}`}>
        We&apos;ll also subscribe you to our weekly investor newsletter. Unsubscribe anytime.
      </p>
    </div>
  )
}

function wrapperClass(variant: Variant): string {
  switch (variant) {
    case 'inline':
      return ''
    case 'banner':
      return 'bg-primary rounded-xl p-6 sm:p-8'
    case 'card':
    default:
      return 'rounded-xl border border-border bg-white p-6 shadow-sm'
  }
}
