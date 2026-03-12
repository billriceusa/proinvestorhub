import Link from 'next/link'

const footerLinks = {
  Learn: [
    { name: 'Blog', href: '/blog' },
    { name: 'Glossary', href: '/glossary' },
    { name: 'Guides', href: '/guides' },
  ],
  Tools: [
    { name: 'Calculators', href: '/calculators' },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                PI
              </div>
              <span className="text-lg font-bold text-text">
                Pro<span className="text-primary">Investor</span>Hub
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              Expert education and tools for real estate investors. Make smarter
              investment decisions backed by data and knowledge.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-text">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-text-light">
            &copy; {year} ProInvestorHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
