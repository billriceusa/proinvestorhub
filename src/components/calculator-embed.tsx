'use client'

import { useState } from 'react'

export function CalculatorEmbed({
  calculatorName,
  calculatorPath,
}: {
  calculatorName: string
  calculatorPath: string
}) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const siteUrl = 'https://proinvestorhub.com'
  const embedCode = `<iframe src="${siteUrl}${calculatorPath}?embed=1" width="100%" height="600" style="border:1px solid #e5e7eb;border-radius:12px;" title="${calculatorName} — ProInvestorHub" loading="lazy"></iframe>\n<p style="font-size:12px;color:#6b7280;margin-top:8px;">Powered by <a href="${siteUrl}${calculatorPath}" style="color:#1B4D3E;" target="_blank" rel="noopener">ProInvestorHub</a></p>`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = embedCode
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
          <span className="text-sm font-medium text-text">Embed this calculator on your site</span>
        </div>
        <svg
          className={`h-4 w-4 text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4">
          <p className="text-xs text-text-muted mb-3">
            Copy the code below and paste it into your website&apos;s HTML. Free to use with attribution.
          </p>
          <div className="relative">
            <pre className="rounded-lg bg-white border border-border p-3 text-xs text-text-muted overflow-x-auto whitespace-pre-wrap break-all font-mono">
              {embedCode}
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-2 right-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-light transition-colors"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
