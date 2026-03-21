'use client'

import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  { name: 'Start Here', href: '/start-here', accent: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Markets', href: '/markets' },
  { name: 'Glossary', href: '/glossary' },
  { name: 'Guides', href: '/guides' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            PI
          </div>
          <span className="text-xl font-bold text-text">
            Pro<span className="text-primary">Investor</span>Hub
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={
                item.accent
                  ? 'text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full hover:bg-accent/20 transition-colors'
                  : 'text-sm font-medium text-text-muted hover:text-primary transition-colors'
              }
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border">
          <div className="space-y-1 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-text-muted hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
