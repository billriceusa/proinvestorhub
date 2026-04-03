'use client'

import { useState, useEffect, useRef } from 'react'
import { trackLeadCapture, trackCtaDismiss, trackCtaImpression } from '@/lib/tracking'

const DISMISS_KEY = 'pih_sticky_cta_dismissed'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const footerRef = useRef<HTMLElement | null>(null)
  const impressionFired = useRef(false)

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem(DISMISS_KEY) === 'true') {
      setDismissed(true)
      return
    }

    // Find the footer element
    footerRef.current = document.querySelector('footer')

    function handleScroll() {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      const footerVisible = footerRef.current
        ? footerRef.current.getBoundingClientRect().top < window.innerHeight
        : false

      if (scrollPercent > 0.4 && !footerVisible) {
        setVisible(true)
        if (!impressionFired.current) {
          trackCtaImpression('sticky-cta', 'bottom-bar')
          impressionFired.current = true
        }
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem(DISMISS_KEY, 'true')
    trackCtaDismiss('sticky-cta')
  }

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
        trackLeadCapture('sticky-cta', email.split('@')[1] || '')
        setStatus('success')
        sessionStorage.setItem(DISMISS_KEY, 'true')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (dismissed || !visible) return null

  if (status === 'success') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-primary-dark print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-white shrink-0">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-sm font-medium text-white">You&apos;re in! Check your inbox.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-primary-dark shadow-2xl print:hidden">
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* Desktop: single row */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent shrink-0">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white truncate">
              Free: Deal Analysis Checklist — 7 sections, 30+ items
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 shrink-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-52 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary-dark hover:bg-accent-light transition-colors disabled:opacity-60 shrink-0"
            >
              {status === 'loading' ? '...' : 'Get It Free'}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="ml-1 p-1 text-white/40 hover:text-white/80 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile: stacked */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-white">
              Free Deal Analysis Checklist
            </p>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 text-white/40 hover:text-white/80 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary-dark hover:bg-accent-light transition-colors disabled:opacity-60 shrink-0"
            >
              {status === 'loading' ? '...' : 'Get It'}
            </button>
          </form>
        </div>

        {status === 'error' && (
          <p className="mt-1 text-xs text-red-300 text-center">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  )
}
