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

export function Drip4MarketsEmail({ firstName = 'there' }: { firstName?: string }) {
  return (
    <Html>
      <Head />
      <Preview>How to pick the right market for your investment strategy</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
          </Section>

          <Section style={heroSection}>
            <Heading style={h1}>Finding the Right Market</Heading>
            <Text style={paragraph}>
              Hey {firstName} — you&apos;ve got the calculators down and you
              understand financing. Now the question is: where should you invest?
              The market you choose matters more than the individual property.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>What Makes a Good Market?</Heading>

            <Text style={listItem}>
              <strong style={bold}>Population growth</strong>
              <br />
              More people = more renters = more demand. Look for cities growing
              1%+ annually. Markets losing population are playing defense.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Rent-to-price ratio</strong>
              <br />
              This is the 1% rule at the market level. Cities where median rent
              is close to 1% of median home price are cash-flow friendly.
              Expensive coastal cities rarely hit this mark.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Job diversity</strong>
              <br />
              One-industry towns are risky. Markets with healthcare, education,
              government, and tech sectors are more resilient to downturns.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Landlord-friendly laws</strong>
              <br />
              Eviction timelines, rent control, and tenant protections vary
              dramatically by state. This directly impacts your risk profile
              and cash flow reliability.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>Our Market Rankings</Heading>
            <Text style={paragraph}>
              We track 50+ cities across 4 investment strategies, scoring them
              on cap rate, rent-to-price, population growth, median income, and
              vacancy rates. Updated monthly with Census, HUD, and FRED data.
            </Text>
            <Link href={`${baseUrl}/markets/cash-flow`} style={ctaLink}>
              Best Cities for Cash Flow &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/markets/brrrr`} style={ctaLink}>
              Best Cities for BRRRR &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/markets/house-hacking`} style={ctaLink}>
              Best Cities for House Hacking &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/resources/cap-rate-report`} style={ctaLink}>
              50-City Cap Rate Report (printable) &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={paragraph}>
              <strong style={bold}>Your homework:</strong> Pick 3 cities from
              our rankings that interest you. Compare their cap rates, rent-to-price
              ratios, and population growth. Which one feels like the best fit for
              your strategy and risk tolerance?
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you signed up at{' '}
              <Link href={baseUrl} style={footerLink}>proinvestorhub.com</Link>.
              Day 7 of your investor education series.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Drip4MarketsEmail

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
