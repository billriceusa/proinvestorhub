import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

const baseUrl = 'https://proinvestorhub.com'

export function Drip3FinancingEmail({ firstName = 'there' }: { firstName?: string }) {
  return (
    <Html>
      <Head />
      <Preview>How investor loans actually work — DSCR, hard money, and what lenders look for</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
          </Section>

          <Section style={heroSection}>
            <Heading style={h1}>Understanding Investor Financing</Heading>
            <Text style={paragraph}>
              Hey {firstName} — one of the biggest surprises for new investors
              is that investment property loans are completely different from
              the mortgage on your home. Here&apos;s what you need to know.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>The 4 Main Loan Types</Heading>

            <Text style={listItem}>
              <strong style={bold}>DSCR Loans (most popular for rentals)</strong>
              <br />
              Qualified based on the property&apos;s income, not yours. If the rent
              covers the mortgage payment (DSCR of 1.0+), you can qualify. No tax
              returns or employment verification needed. Rates are higher than
              conventional, but the speed and flexibility are worth it.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Hard Money (for flips and BRRRR)</strong>
              <br />
              Short-term loans (6-18 months) based on the property&apos;s after-repair
              value (ARV). Higher rates (10-14%) but fast closing (7-14 days). You
              use these to acquire, rehab, then refinance into permanent financing.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Conventional Investment Loans</strong>
              <br />
              Traditional bank loans for investment properties. Best rates but
              strictest requirements: 20-25% down, strong credit (700+), full
              income documentation. Limited to 10 financed properties for most
              lenders.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Portfolio/Private Lenders</strong>
              <br />
              Smaller banks or private individuals who hold loans on their own
              books. More flexible terms, especially for experienced investors
              with 5+ properties. Relationships matter here.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>Find Your Match</Heading>
            <Text style={paragraph}>
              We track 20+ investor lenders across all four categories. Our Lender
              Finder matches you based on your credit score, experience, loan type,
              and what matters most to you (rate, speed, or LTV).
            </Text>
            <Link href={`${baseUrl}/lenders/finder`} style={ctaLink}>
              Try the Lender Finder &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/glossary/dscr-loan`} style={ctaLink}>
              Learn: What is a DSCR Loan? &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/calculators/mortgage`} style={ctaLink}>
              Mortgage / DSCR Payment Calculator &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={paragraph}>
              <strong style={bold}>Your homework:</strong> Go back to the deal you
              analyzed on Day 3. Now run it through the Mortgage/DSCR calculator
              with 20% down at 8% interest. How does financing change the
              cash-on-cash return?
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you signed up at{' '}
              <Link href={baseUrl} style={footerLink}>proinvestorhub.com</Link>.
              Day 5 of your investor education series.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Drip3FinancingEmail

const main: React.CSSProperties = { backgroundColor: '#F8F7F4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }
const container: React.CSSProperties = { maxWidth: '580px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', marginTop: '32px', marginBottom: '32px' }
const header: React.CSSProperties = { backgroundColor: '#1B4D3E', padding: '24px 32px' }
const logoText: React.CSSProperties = { color: '#ffffff', fontSize: '22px', fontWeight: 700, margin: 0 }
const logoAccent: React.CSSProperties = { color: '#D4A843' }
const heroSection: React.CSSProperties = { padding: '32px 32px 0' }
const h1: React.CSSProperties = { color: '#1A1A1A', fontSize: '28px', fontWeight: 700, lineHeight: '36px', margin: '0 0 16px' }
const h2: React.CSSProperties = { color: '#1A1A1A', fontSize: '20px', fontWeight: 700, lineHeight: '28px', margin: '0 0 16px', padding: '0 32px' }
const paragraph: React.CSSProperties = { color: '#4A4A4A', fontSize: '16px', lineHeight: '26px', margin: '0 0 16px', padding: '0 32px' }
const listItem: React.CSSProperties = { color: '#4A4A4A', fontSize: '15px', lineHeight: '24px', margin: '0 0 16px', padding: '0 32px' }
const bold: React.CSSProperties = { color: '#1A1A1A' }
const hr: React.CSSProperties = { borderColor: '#E2DED5', margin: '24px 32px' }
const ctaLink: React.CSSProperties = { color: '#1B4D3E', fontSize: '15px', fontWeight: 600, textDecoration: 'none', paddingLeft: '32px' }
const footer: React.CSSProperties = { color: '#9A9A9A', fontSize: '13px', lineHeight: '20px', textAlign: 'center' as const, padding: '0 32px', margin: '0 0 8px' }
const footerLink: React.CSSProperties = { color: '#9A9A9A', textDecoration: 'underline' }
