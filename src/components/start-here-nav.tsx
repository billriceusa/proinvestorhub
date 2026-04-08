'use client'

import { useState, useEffect } from 'react'

const steps = [
  { id: 'learn-the-language', label: 'Language', step: 1 },
  { id: 'understand-the-numbers', label: 'Numbers', step: 2 },
  { id: 'learn-the-strategies', label: 'Strategies', step: 3 },
  { id: 'study-real-markets', label: 'Markets', step: 4 },
  { id: '24-week-curriculum', label: 'Curriculum', step: 5 },
  { id: 'faq', label: 'FAQ', step: 6 },
]

export function StartHereNav() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sections = steps
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    function handleScroll() {
      const scrollY = window.scrollY
      setVisible(scrollY > 400)

      let current: string | null = null
      for (const section of sections) {
        if (section.offsetTop - 100 <= scrollY) {
          current = section.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur-sm print:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none sm:gap-2">
          {steps.map((step) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeId === step.id
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:bg-surface hover:text-text'
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                activeId === step.id
                  ? 'bg-white/20 text-white'
                  : 'bg-primary/10 text-primary'
              }`}>
                {step.step}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
