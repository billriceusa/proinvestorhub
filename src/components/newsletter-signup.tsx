'use client'

import { useState } from 'react'

type Variant = 'inline' | 'card' | 'banner'

export function NewsletterSignup({
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

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        if (typeof window !== 'undefined' && 'dataLayer' in window) {
          ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: 'newsletter_signup',
            email_domain: email.split('@')[1],
          })
        }
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={wrapperClass(variant)}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-text">You&apos;re in!</p>
            <p className="text-sm text-text-muted">
              We&apos;ll send you the best insights for real estate investors.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const defaultHeading = variant === 'banner'
    ? 'Get investor insights delivered weekly'
    : 'Stay Ahead of the Market'

  const defaultDescription = variant === 'banner'
    ? 'Cap rate trends, deal analysis frameworks, and strategies — no spam, unsubscribe anytime.'
    : 'Weekly insights on deal analysis, market trends, and investing strategies. Free, no spam.'

  return (
    <div className={wrapperClass(variant)}>
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
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
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
