import type { Metadata } from 'next'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'

/**
 * Affiliate & Material-Connection Disclosure
 * Per the BRSG Affiliate & Sponsorship Disclosure Standard v1.1
 * (standards.billricestrategy.com/compliance/standards/affiliate-disclosure/)
 * and FTC 16 CFR Part 255.
 */

const contactEmail = 'hello@proinvestorhub.com'
const lastUpdated = 'June 25, 2026'
const link = 'text-primary underline hover:opacity-80'
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proinvestorhub.com'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'How ProInvestorHub makes money, how our lender directory works, our FTC affiliate disclosure, and our editorial independence policy.',
  alternates: { canonical: '/affiliate-disclosure' },
  robots: { index: false, follow: true },
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Affiliate Disclosure', url: `${baseUrl}/affiliate-disclosure` },
        ])}
      />

      <h1 className="text-4xl font-bold text-text">Affiliate &amp; Material-Connection Disclosure</h1>
      <p className="mt-2 text-sm text-text-light">Last updated: {lastUpdated}</p>

      <div className="mt-10 space-y-8 text-base leading-7 text-text-muted">
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">How ProInvestorHub makes money</h2>
          <p>
            ProInvestorHub is operated by Bill Rice Strategy Group (BRC LLC d/b/a Bill Rice Strategy Group). We
            publish educational content, calculators, and a lender directory for real-estate investors. Where we
            earn revenue, it is through advertising and affiliate relationships — and where any such relationship
            exists, we disclose it clearly and never let it change our ratings or editorial conclusions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">How our lender directory works</h2>
          <p>
            Our lender directory, ratings, and comparisons are <strong className="text-text">editorial</strong>. We
            select and rank lenders on the merits using our published methodology — a lender cannot pay to be
            listed, to rank higher, or to appear in a comparison it does not belong in. Outbound links in the
            directory currently point to each lender&apos;s own website, and we do not sell your information to
            lenders.
          </p>
          <p className="mt-4">
            If a lender in the directory ever becomes an affiliate partner — meaning we would earn a commission or
            referral fee when you click through and take an action — that listing will be marked with an
            &quot;Affiliate partner&quot; label, and the link will be a tracked affiliate link. That labeling is
            built into the directory so the disclosure appears right at the listing, not just on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Affiliate links elsewhere on the site</h2>
          <p>
            Some links elsewhere on the site — for example to investor tools or software we mention — may be
            affiliate links, meaning we may earn a commission if you sign up through them at no additional cost to
            you. Where a link is an affiliate link, it is marked accordingly. Content that references a product
            category generally, or that cites public data, is editorial and carries no affiliate relationship.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Editorial independence</h2>
          <p>
            Affiliate relationships do not determine our editorial conclusions. We do not accept payment to change a
            rating or a recommendation. When our interest in an outcome is material, we tell you — at the listing
            and here — so you can weigh the recommendation accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Questions</h2>
          <p>
            If you have any questions about these relationships or this disclosure, contact us at{' '}
            <a href={`mailto:${contactEmail}`} className={link}>{contactEmail}</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
