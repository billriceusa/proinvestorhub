'use client'

/**
 * Print-to-PDF button. Uses window.print() with a print-optimized stylesheet.
 * No extra dependencies needed — the browser handles PDF generation.
 */
export function DownloadPDF({ label }: { label?: string }) {
  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined' && 'dataLayer' in window) {
          ;(window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: 'markets_interaction',
            action: 'download_pdf',
            page: window.location.pathname,
          })
        }
        window.print()
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors print:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label || 'Download as PDF'}
    </button>
  )
}
