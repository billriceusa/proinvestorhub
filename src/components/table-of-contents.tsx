'use client'

import { useState } from 'react'

type TocItem = {
  text: string
  id: string
  level: 'h2' | 'h3'
}

export type { TocItem }

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [collapsed, setCollapsed] = useState(false)

  if (items.length < 3) return null

  return (
    <nav className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between text-sm font-semibold text-text"
      >
        In This Article
        <svg
          className={`h-4 w-4 text-text-muted transition-transform ${collapsed ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {!collapsed && (
        <ol className="mt-4 space-y-2">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors hover:text-primary ${
                  item.level === 'h3'
                    ? 'pl-4 text-text-light hover:text-primary'
                    : 'font-medium text-text-muted'
                }`}
              >
                {item.level === 'h2' && (
                  <span className="text-text-light mr-2">{items.filter((t, j) => j <= i && t.level === 'h2').length}.</span>
                )}
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}

