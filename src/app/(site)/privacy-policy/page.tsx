import type { Metadata } from 'next'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'

// ────────────────────────────────────────────────────────────────────────────
// Per-site config. This page is the canonical BRSG fleet privacy policy; only
// this block changes between sites. It implements the Privacy Policy & CCPA/CPRA
// Standard v1.0 (standards.billricestrategy.com/compliance/standards/privacy-policy/).
// ────────────────────────────────────────────────────────────────────────────
const config = {
  siteName: 'ProInvestorHub',
  domain: 'proinvestorhub.com',
  contactEmail: 'hello@proinvestorhub.com',
  lastUpdated: 'June 25, 2026',
  linkClass: 'text-primary underline hover:opacity-80',
  // Data-flow flags drive which sections render:
  hasNewsletter: true,
  hasLeadForm: true, // lender finder / lead intake
  routesLeadsToThirdParties: true, // lender directory + Find Your Lender referrals
  hasAffiliateLinks: true,
}

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `${config.siteName} privacy policy — what we collect, how we use it, your CCPA/CPRA rights, and how to contact us.`,
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${config.domain}`

export default function PrivacyPolicyPage() {
  const c = config
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Privacy Policy', url: `${baseUrl}/privacy-policy` },
        ])}
      />

      <h1 className="text-4xl font-bold text-text">Privacy Policy</h1>
      <p className="mt-2 text-sm text-text-light">Last updated: {c.lastUpdated}</p>

      <div className="mt-10 space-y-8 text-base leading-7 text-text-muted">
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Overview</h2>
          <p>
            {c.siteName} (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is operated by Bill Rice Strategy Group
            (BRC LLC d/b/a Bill Rice Strategy Group). This policy explains what information we collect when you
            visit {c.domain}, how we use it, who we share it with, and the rights you have over it.
          </p>
          <p className="mt-4">
            We collect minimal data and we do not sell your personal information. This notice is provided at and
            before the point of collection, and the full policy is always available here.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Information We Collect</h2>
          <h3 className="text-lg font-semibold text-text mt-6 mb-2">Information you provide</h3>
          <ul className="space-y-2 list-disc list-inside">
            {c.hasNewsletter && (
              <li>
                <strong className="text-text">Newsletter signup:</strong> your email address when you subscribe.
                Stored with our email service provider.
              </li>
            )}
            {c.hasLeadForm && (
              <li>
                <strong className="text-text">Forms and downloads:</strong> information you enter into a form or to
                access gated content — typically your name and email, and any details you choose to include.
              </li>
            )}
            <li>
              <strong className="text-text">Direct contact:</strong> information you include when you email us.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-text mt-6 mb-2">Information collected automatically</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              <strong className="text-text">Analytics data:</strong> we use analytics tools to understand how
              visitors use the site — pages viewed, time on site, referral source, device type, and approximate
              (country/city-level) location. These tools use cookies and similar identifiers.
            </li>
            <li>
              <strong className="text-text">Server logs:</strong> our hosting provider automatically logs IP
              addresses, browser type, and request timestamps for security and performance.
            </li>
          </ul>

          <p className="mt-4">
            In CCPA terms, these fall into the categories of <em>identifiers</em> (name, email, IP address) and{' '}
            <em>internet or other electronic network activity</em> (browsing and interaction data). We do not
            knowingly collect Social Security numbers, financial account numbers, or other sensitive personal
            information through this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">How We Use Your Information</h2>
          <ul className="space-y-2 list-disc list-inside">
            {c.hasNewsletter && <li>To send our newsletter, if you subscribed</li>}
            <li>To respond to your inquiries and provide the content or tools you request</li>
            {c.routesLeadsToThirdParties && (
              <li>To connect you, at your request, with lenders or providers you ask to be matched with</li>
            )}
            <li>To understand how our content is used and improve the site</li>
            <li>To detect and prevent abuse or security incidents</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">How We Share Information</h2>
          <p>We share personal information only with the categories of recipients below:</p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li><strong className="text-text">Service providers / processors</strong> that operate the site on our behalf — hosting, analytics, email delivery, and content management. They may process data only to provide their service to us.</li>
            {c.routesLeadsToThirdParties && (
              <li><strong className="text-text">Lenders or providers you ask to be matched with</strong> — if you use a tool or form that requests a referral, we pass the information you submit to the provider(s) you selected so they can contact you. We do this only at your direction.</li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Sale or Sharing of Personal Information</h2>
          <p>
            We do <strong className="text-text">not</strong> sell your personal information for money.
          </p>
          <p className="mt-4">
            Under the California Privacy Rights Act (CPRA), the use of third-party analytics or advertising
            cookies can be considered &quot;sharing&quot; personal information for cross-context behavioral
            advertising, even when no money changes hands.{' '}
            {c.routesLeadsToThirdParties ? (
              <>
                In addition, when you ask to be matched with a lender or provider, the information you submit is
                transferred to that third party. You can opt out of the sale or sharing of your personal
                information at any time — see &quot;Do Not Sell or Share&quot; below.
              </>
            ) : (
              <>
                You can opt out of this sharing — see &quot;Do Not Sell or Share&quot; below.
              </>
            )}
          </p>
          <h3 className="text-lg font-semibold text-text mt-6 mb-2">Do Not Sell or Share My Personal Information</h3>
          <p>
            To opt out of the sale or sharing of your personal information, you can: (1) disable analytics/advertising
            cookies in your browser or via the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={c.linkClass}>
              Google Analytics Opt-out Add-on
            </a>
            ; and (2) email us at{' '}
            <a href={`mailto:${c.contactEmail}`} className={c.linkClass}>{c.contactEmail}</a>{' '}
            with the subject &quot;Do Not Sell or Share&quot; and we will honor your request. We will not discriminate
            against you for exercising this right.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Your California Privacy Rights (CCPA/CPRA)</h2>
          <p>If you are a California resident, you have the right to:</p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li><strong className="text-text">Know and access</strong> the personal information we have collected about you and how we use and share it</li>
            <li><strong className="text-text">Delete</strong> personal information we have collected from you</li>
            <li><strong className="text-text">Correct</strong> inaccurate personal information</li>
            <li><strong className="text-text">Opt out</strong> of the sale or sharing of your personal information</li>
            <li><strong className="text-text">Limit</strong> the use of sensitive personal information (we do not collect sensitive personal information through this site)</li>
            <li><strong className="text-text">Non-discrimination</strong> for exercising any of these rights</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, email{' '}
            <a href={`mailto:${c.contactEmail}`} className={c.linkClass}>{c.contactEmail}</a>. We may need to verify
            your identity before responding. Residents of other states with comparable privacy laws have similar
            rights and may use the same contact.
          </p>
        </section>

        {c.hasAffiliateLinks && (
          <section>
            <h2 className="text-2xl font-bold text-text mb-4">Affiliate Links</h2>
            <p>
              Some links on this site are affiliate links. When you click one, the destination may set cookies to
              track the referral, and we may include tracking parameters for our own analytics. See our{' '}
              <a href="/affiliate-disclosure" className={c.linkClass}>affiliate disclosure</a> for details.
            </p>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Cookies</h2>
          <p>
            We use analytics cookies (such as Google Analytics) to measure site usage, and our tag manager to
            manage those tags. You can disable cookies through your browser settings; the site will continue to
            function without them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Data Retention</h2>
          <p>
            We keep newsletter and contact information for as long as you remain subscribed or until you ask us to
            delete it. Form submissions are kept only as long as needed to act on your request and to meet legal or
            recordkeeping obligations. Analytics data is retained according to our analytics provider&apos;s default
            retention period.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Children&apos;s Privacy</h2>
          <p>
            This site is intended for adults. We do not knowingly collect personal information from children under
            13 (or under 16 for the purposes of sale/sharing). If you believe a child has provided us information,
            contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes are posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text mb-4">Contact Us</h2>
          <p>
            For any privacy request or question, contact us at{' '}
            <a href={`mailto:${c.contactEmail}`} className={c.linkClass}>{c.contactEmail}</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
