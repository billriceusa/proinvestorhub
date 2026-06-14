'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Mega-menu header. Each top-level menu renders a multi-column panel of grouped
 * links (LendingTree-style). The flagship data report is featured in the
 * "Research" panel. Simple links (Start Here) render inline. "About" lives in
 * the footer, not the primary nav.
 */

type Leaf = {
  name: string
  href: string
  description?: string
  /** Render with an accent highlight (e.g. the flagship report). */
  flagship?: boolean
}
type Column = { heading: string; items: Leaf[]; footer?: Leaf }
type Menu = { name: string; columns: Column[]; align: 'left' | 'right' }

const START_HERE = { name: 'Start Here', href: '/start-here' }

const MENUS: Menu[] = [
  {
    name: 'Calculators',
    align: 'left',
    columns: [
      {
        heading: 'Returns & Analysis',
        items: [
          { name: 'Cap Rate', href: '/calculators/cap-rate' },
          { name: 'Cash-on-Cash Return', href: '/calculators/cash-on-cash' },
          { name: 'Rental Cash Flow', href: '/calculators/rental-cashflow' },
          { name: 'BRRRR', href: '/calculators/brrrr' },
          { name: 'Fix & Flip Profit', href: '/calculators/fix-flip' },
          { name: 'Wholesale Analyzer', href: '/calculators/wholesale' },
        ],
      },
      {
        heading: 'Financing Cost',
        items: [
          { name: 'Mortgage / DSCR Payment', href: '/calculators/mortgage' },
          { name: 'DSCR Loan Qualifier', href: '/calculators/dscr' },
          { name: 'Investment HELOC', href: '/calculators/heloc' },
          { name: 'Hard Money', href: '/calculators/hard-money' },
          { name: 'Mortgage Points', href: '/calculators/mortgage-points' },
          { name: 'Closing Costs', href: '/calculators/closing-costs' },
          { name: 'Refinance', href: '/calculators/refinance' },
        ],
      },
      {
        heading: 'Strategy & Tax',
        items: [
          { name: '1031 Exchange', href: '/calculators/1031-exchange' },
          { name: 'Depreciation', href: '/calculators/depreciation' },
          { name: 'STR Revenue', href: '/calculators/str-revenue' },
          { name: 'Sell vs. Rent', href: '/calculators/sell-vs-rent' },
          { name: 'Quick Rules (1% · 50% · GRM)', href: '/calculators/quick-rules' },
          { name: 'Compare calculators', href: '/calculators/compare' },
        ],
        footer: { name: 'All 18 calculators', href: '/calculators' },
      },
    ],
  },
  {
    name: 'Lenders',
    align: 'left',
    columns: [
      {
        heading: 'Find & Compare',
        items: [
          { name: 'Find a Lender', href: '/lenders/finder', description: 'Match your deal to a lender' },
          { name: 'Lender Directory', href: '/lenders' },
          { name: 'Compare Lenders', href: '/lenders/compare' },
        ],
      },
      {
        heading: 'By Loan Type',
        items: [
          { name: 'DSCR Loans', href: '/lenders/dscr-loans' },
          { name: 'Hard Money Loans', href: '/lenders/hard-money-loans' },
          { name: 'Fix-and-Flip Loans', href: '/lenders/fix-and-flip-loans' },
          { name: 'Bridge Loans', href: '/lenders/bridge-loans' },
          { name: 'Portfolio Loans', href: '/lenders/portfolio-loans' },
          { name: 'Bank Statement Loans', href: '/lenders/bank-statement-loans' },
        ],
        footer: { name: 'All loan types', href: '/lenders' },
      },
    ],
  },
  {
    name: 'Financing',
    align: 'right',
    columns: [
      {
        heading: 'Get Started',
        items: [
          { name: 'Complete Guide', href: '/financing', description: 'Every way to fund a deal' },
          { name: 'Financing Matcher', href: '/financing/matcher', description: 'Match your deal to a loan' },
        ],
      },
      {
        heading: 'Strategies',
        items: [
          { name: 'Creative Financing', href: '/financing/creative-financing', description: 'Seller financing, subject-to & more' },
          { name: 'How-to-Finance Guides', href: '/how-to-finance', description: 'Funding playbooks by scenario' },
        ],
      },
    ],
  },
  {
    name: 'Research',
    align: 'right',
    columns: [
      {
        heading: 'Data Reports',
        items: [
          {
            name: 'Investor Financing Report',
            href: '/reports/investor-financing',
            description: 'HMDA data across 50 states',
            flagship: true,
          },
          { name: 'Methodology', href: '/reports/investor-financing/methodology' },
        ],
        footer: { name: 'All reports', href: '/reports' },
      },
      {
        heading: 'Markets',
        items: [
          { name: 'Market Strategies', href: '/markets' },
          { name: 'Cap Rate by City', href: '/calculators/cap-rate/cities' },
          { name: 'Markets by State', href: '/markets/states' },
        ],
      },
      {
        heading: 'Learn',
        items: [
          { name: 'Blog', href: '/blog' },
          { name: 'Newsletter', href: '/newsletter' },
          { name: 'Glossary', href: '/glossary' },
          { name: 'Guides', href: '/guides' },
        ],
      },
    ],
  },
]

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

function LeafLink({ leaf, onNavigate }: { leaf: Leaf; onNavigate: () => void }) {
  return (
    <Link
      href={leaf.href}
      role="menuitem"
      onClick={onNavigate}
      className={`block rounded-lg px-3 py-2 transition-colors ${
        leaf.flagship ? 'bg-accent/10 hover:bg-accent/20' : 'hover:bg-surface'
      }`}
    >
      <span
        className={`block text-sm font-medium ${
          leaf.flagship ? 'text-primary' : 'text-text'
        }`}
      >
        {leaf.name}
      </span>
      {leaf.description && (
        <span className="mt-0.5 block text-xs text-text-light">{leaf.description}</span>
      )}
    </Link>
  )
}

function MegaMenu({
  menu,
  open,
  onToggle,
  onClose,
  registerTrigger,
}: {
  menu: Menu
  open: boolean
  onToggle: () => void
  onClose: () => void
  registerTrigger: (el: HTMLButtonElement | null) => void
}) {
  return (
    <div className="relative">
      <button
        ref={registerTrigger}
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          open ? 'text-primary' : 'text-text-muted hover:text-primary'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {menu.name}
        <ChevronDown open={open} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={`${menu.name} menu`}
          className={`absolute top-full z-50 mt-3 flex max-w-[calc(100vw-2rem)] gap-6 rounded-2xl border border-border bg-white p-5 shadow-xl ${
            menu.align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {menu.columns.map((col) => (
            <div key={col.heading} className="w-52 shrink-0">
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-text-light">
                {col.heading}
              </p>
              <div className="mt-1.5 space-y-0.5">
                {col.items.map((leaf) => (
                  <LeafLink key={leaf.href} leaf={leaf} onNavigate={onClose} />
                ))}
              </div>
              {col.footer && (
                <Link
                  href={col.footer.href}
                  role="menuitem"
                  onClick={onClose}
                  className="mt-1 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-primary hover:text-primary-light"
                >
                  {col.footer.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const closeMenu = useCallback(() => setOpenMenu(null), [])

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!openMenu) return
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openMenu, closeMenu])

  // Close desktop dropdown on Escape, return focus to its trigger
  useEffect(() => {
    if (!openMenu) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        const trigger = triggerRefs.current.get(openMenu!)
        closeMenu()
        trigger?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [openMenu, closeMenu])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            PI
          </div>
          <span className="text-xl font-bold text-text">
            Pro<span className="text-primary">Investor</span>Hub
          </span>
        </Link>

        <div ref={navRef} className="hidden md:flex md:items-center md:gap-7">
          <Link
            href={START_HERE.href}
            className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
          >
            {START_HERE.name}
          </Link>
          {MENUS.map((menu) => (
            <MegaMenu
              key={menu.name}
              menu={menu}
              open={openMenu === menu.name}
              onToggle={() => setOpenMenu(openMenu === menu.name ? null : menu.name)}
              onClose={closeMenu}
              registerTrigger={(el) => {
                if (el) triggerRefs.current.set(menu.name, el)
              }}
            />
          ))}
          <Link
            href="/search"
            className="p-2 text-text-muted transition-colors hover:text-primary"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
          <Link
            href="/lenders/finder"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            Find a Lender
          </Link>
        </div>

        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-muted md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <div className="max-h-[calc(100vh-5rem)] space-y-1 overflow-y-auto px-6 py-4">
            <Link
              href={START_HERE.href}
              className="block py-2 text-base font-semibold text-accent"
              onClick={() => setMobileOpen(false)}
            >
              {START_HERE.name}
            </Link>

            {MENUS.map((menu) => {
              const expanded = mobileSection === menu.name
              return (
                <div key={menu.name} className="border-t border-border/60 pt-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2 text-base font-medium text-text"
                    onClick={() => setMobileSection(expanded ? null : menu.name)}
                    aria-expanded={expanded}
                  >
                    {menu.name}
                    <ChevronDown open={expanded} />
                  </button>
                  {expanded && (
                    <div className="space-y-3 pb-2 pl-3">
                      {menu.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-text-light">
                            {col.heading}
                          </p>
                          <div className="mt-1 space-y-0.5">
                            {col.items.map((leaf) => (
                              <Link
                                key={leaf.href}
                                href={leaf.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block rounded-md px-2 py-1.5 text-sm ${
                                  leaf.flagship
                                    ? 'font-medium text-primary'
                                    : 'text-text-muted hover:text-primary'
                                }`}
                              >
                                {leaf.name}
                              </Link>
                            ))}
                            {col.footer && (
                              <Link
                                href={col.footer.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-2 py-1.5 text-sm font-semibold text-primary"
                              >
                                {col.footer.name} &rarr;
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              href="/search"
              className="block border-t border-border/60 py-3 text-base font-medium text-text-muted hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/lenders/finder"
              className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              onClick={() => setMobileOpen(false)}
            >
              Find a Lender
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
