'use client'

import { useState } from 'react'
import { trackCalculatorSave } from '@/lib/tracking'

export function SaveResultsCTA({
  calculatorName,
  results,
  context,
}: {
  calculatorName: string
  results: Record<string, string | number>
  context: string
}) {
  const [expanded, setExpanded] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !firstName) return

    setStatus('loading')

    try {
      const res = await fetch('/api/calculator-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          calculatorName,
          results,
        }),
      })

      if (res.ok) {
        trackCalculatorSave(context, email.split('@')[1] || '', results)
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Results sent!</p>
            <p className="text-xs text-text-muted">Check your inbox for a copy of these results.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="w-full rounded-lg border border-primary/20 bg-primary/5 p-4 text-left hover:border-primary/40 hover:bg-primary/10 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Save These Results</p>
            <p className="text-xs text-text-muted">Email yourself a copy to reference later</p>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="text-sm font-semibold text-text mb-3">Email My Results</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending...' : 'Send Results'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">Something went wrong. Please try again.</p>
      )}

      <p className="mt-2 text-xs text-text-light">
        We&apos;ll also subscribe you to weekly investor insights. No spam.
      </p>
    </div>
  )
}
