'use client'

import { useState, useEffect } from 'react'
import { trackLeadCapture } from '@/lib/tracking'

const STORAGE_KEY = 'pih_content_unlocked'

export function GatedContent({
  children,
  previewHeight = '300px',
}: {
  children: React.ReactNode
  previewHeight?: string
}) {
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') setUnlocked(true)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !firstName) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        trackLeadCapture('lead-magnet', email.split('@')[1] || '')
        localStorage.setItem(STORAGE_KEY, 'true')
        setUnlocked(true)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="relative print:contents">
      {/* Blurred preview */}
      <div
        className="overflow-hidden select-none pointer-events-none print:filter-none print:overflow-visible print:select-auto print:pointer-events-auto"
        style={{ maxHeight: previewHeight }}
        aria-hidden="true"
      >
        <div className="blur-sm opacity-60">
          {children}
        </div>
      </div>

      {/* Gate overlay */}
      <div className="relative -mt-24 pt-24 bg-gradient-to-t from-white via-white/95 to-transparent print:hidden">
        <div className="rounded-xl border border-primary/20 bg-white p-8 shadow-lg max-w-md mx-auto text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text">
            Unlock the Full Resource
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Enter your name and email to access the complete checklist, print it, and keep it for every deal.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Unlocking...' : 'Get Full Access'}
            </button>
          </form>

          {status === 'error' && (
            <p className="mt-2 text-xs text-red-500">Something went wrong. Please try again.</p>
          )}

          <p className="mt-3 text-xs text-text-light">
            We&apos;ll also subscribe you to our weekly investor newsletter. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
