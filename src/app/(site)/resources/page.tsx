import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Resources for Real Estate Investors',
  description:
    'Free downloadable tools, checklists, and templates for real estate investors. Analyze deals faster and make smarter investment decisions.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Free Resources for Real Estate Investors | ProInvestorHub',
    description:
      'Free downloadable tools, checklists, and templates for real estate investors.',
    url: '/resources',
  },
}

const resources = [
  {
    title: 'Rental Property Deal Analysis Checklist',
    description:
      'A printable 7-section checklist covering every number you need to evaluate a rental property deal — from income analysis and expense breakdown to the final go/no-go decision.',
    href: '/resources/deal-analysis-checklist',
    badge: 'Checklist',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Free Resources for Real Estate Investors
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Downloadable checklists, templates, and tools to help you analyze deals faster and invest smarter.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group flex flex-col rounded-xl border border-border bg-surface p-8 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {resource.icon}
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-dark tracking-wide uppercase">
                    {resource.badge}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  {resource.title}
                </h2>
                <p className="mt-2 text-sm text-text-muted leading-6 flex-1">
                  {resource.description}
                </p>
                <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                  Get this resource
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
