'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { trackLeadCapture, trackCtaDismiss, trackCtaImpression } from '@/lib/tracking'

const STORAGE_KEY = 'pih_exit_intent'
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function isCoolingDown(): boolean {
  try {
    const ts = localStorage.getItem(STORAGE_KEY)
    if (!ts) return false
    return Date.now() - parseInt(ts, 10) < COOLDOWN_MS
  } catch {
    return false
  }
}

function setCooldown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // localStorage unavailable
  }
}

export function ExitIntentModal() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const impressionFired = useRef(false)
  const triggered = useRef(false)

  const openModal = useCallback(() => {
    if (triggered.current || isCoolingDown()) return
    triggered.current = true
    setShow(true)
    if (!impressionFired.current) {
      trackCtaImpression('exit-intent', 'modal')
      impressionFired.current = true
    }
  }, [])

  useEffect(() => {
    if (isCoolingDown()) return

    // Desktop: mouse leaves viewport toward top
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 5) openModal()
    }

    // Mobile: rapid scroll-up (user flicking up to leave)
    let lastScrollY = window.scrollY
    let lastScrollTime = Date.now()

    function handleScroll() {
      const now = Date.now()
      const dy = lastScrollY - window.scrollY // positive = scrolling up
      const dt = now - lastScrollTime

      // Rapid upward scroll: > 300px in < 300ms, near the top of the page
      if (dy > 300 && dt < 300 && window.scrollY < 200) {
        openModal()
      }

      lastScrollY = window.scrollY
      lastScrollTime = now
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [openModal])

  function handleDismiss() {
    setShow(false)
    setCooldown()
    trackCtaDismiss('exit-intent')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'exit-intent' }),
      })

      if (res.ok) {
        trackLeadCapture('exit-intent', email.split('@')[1] || '')
        setStatus('success')
        setCooldown()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 print:hidden"
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss() }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 p-1.5 text-text-light hover:text-text transition-colors rounded-lg hover:bg-surface"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header accent bar */}
        <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-primary to-accent" />

        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text mb-2">You&apos;re in!</h3>
              <p className="text-sm text-text-muted">
                Check your inbox for the Deal Analysis Checklist and your first investor insights.
              </p>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="mt-5 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Continue Reading
              </button>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text sm:text-2xl">
                Before you go — grab this free checklist
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                The <strong className="text-text">Deal Analysis Checklist</strong> pro investors
                use to evaluate every property. 7 sections, 30+ line items — never miss a
                critical number.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Me the Checklist'}
                </button>
              </form>

              {status === 'error' && (
                <p className="mt-2 text-xs text-red-500 text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              <p className="mt-3 text-xs text-text-light text-center">
                Plus weekly investor insights. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
