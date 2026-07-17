'use client'

import { useEffect } from 'react'

/**
 * AI-referral tracker.
 *
 * Answer engines (ChatGPT, Perplexity, Claude, Gemini, Copilot) send referral
 * traffic that GA4 otherwise buckets as "Direct" — so every AEO win looks like
 * nothing. This fires a `ai_referral` dataLayer event once per session when the
 * landing referrer is a known AI host, giving GTM/GA4 a signal to build a
 * first-class "AI Assistant" channel and attribute report traffic correctly.
 *
 * Pure measurement: reads document.referrer, writes one dataLayer event. No
 * network, no PII, no cookies beyond a sessionStorage de-dupe flag.
 */

// host substring -> canonical engine label
const AI_HOSTS: [string, string][] = [
  ['chatgpt.com', 'ChatGPT'],
  ['chat.openai.com', 'ChatGPT'],
  ['perplexity.ai', 'Perplexity'],
  ['claude.ai', 'Claude'],
  ['gemini.google.com', 'Gemini'],
  ['copilot.microsoft.com', 'Copilot'],
  ['bing.com', 'Bing Copilot'],
  ['you.com', 'You.com'],
  ['poe.com', 'Poe'],
]

const SESSION_KEY = 'pih_ai_referral_logged'

export function AiReferralTracker() {
  useEffect(() => {
    try {
      const ref = document.referrer
      if (!ref) return
      if (sessionStorage.getItem(SESSION_KEY)) return

      const host = new URL(ref).hostname.replace(/^www\./, '')
      const match = AI_HOSTS.find(([h]) => host === h || host.endsWith(`.${h}`) || host.includes(h))
      if (!match) return

      sessionStorage.setItem(SESSION_KEY, '1')
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({
        event: 'ai_referral',
        ai_source: match[1],
        ai_referrer_host: host,
        landing_page: window.location.pathname,
      })
    } catch {
      // referrer unparseable or storage blocked — nothing to track
    }
  }, [])

  return null
}
