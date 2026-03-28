'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

type NavItem =
  | { name: string; href: string; accent?: boolean }
  | { name: string; children: Array<{ name: string; href: string; description?: string }> }

const navigation: NavItem[] = [
  { name: 'Start Here', href: '/start-here', accent: true },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Lenders', href: '/lenders' },
  { name: 'Markets', href: '/markets' },
  {
    name: 'Learn',
    children: [
      { name: 'Blog', href: '/blog', description: 'Articles & guides' },
      { name: 'Glossary', href: '/glossary', description: 'A–Z investor terms' },
      { name: 'Guides', href: '/guides', description: 'Strategy deep dives' },
    ],
  },
  { name: 'About', href: '/about' },
]

// All items flattened for mobile menu
const mobileNavigation = [
  { name: 'Start Here', href: '/start-here' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Lenders', href: '/lenders' },
  { name: 'Markets', href: '/markets' },
  { name: 'Blog', href: '/blog' },
  { name: 'Glossary', href: '/glossary' },
  { name: 'Guides', href: '/guides' },
  { name: 'About', href: '/about' },
]

function DropdownMenu({ item }: { item: Extract<NavItem, { children: unknown[] }> }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors"
      >
        {item.name}
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-white py-2 shadow-lg z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 hover:bg-surface transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="text-sm font-medium text-text">{child.name}</span>
              {child.description && (
                <span className="block text-xs text-text-light mt-0.5">
                  {child.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

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
          {navigation.map((item) =>
            'children' in item ? (
              <DropdownMenu key={item.name} item={item} />
            ) : (
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
            )
          )}
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
            {mobileNavigation.map((item) => (
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
