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

export function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ProInvestorHub — real estate investing, demystified.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={h1}>Welcome to Smarter Investing</Heading>
            <Text style={paragraph}>
              You&apos;re in. Every Tuesday, I share what I&apos;m learning
              about real estate investing — deals I&apos;m analyzing, market
              data that caught my eye, and the frameworks I find most useful.
              Think of it as notes from a fellow investor who happens to have
              30 years in mortgage lending.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* What to Expect */}
          <Section>
            <Heading as="h2" style={h2}>
              What You&apos;ll Get
            </Heading>

            <Text style={listItem}>
              <strong style={bold}>Deal Analysis Frameworks</strong>
              <br />
              Learn to evaluate cap rates, cash-on-cash returns, and NOI like a
              pro — with real examples, not textbook theory.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Market Insights</strong>
              <br />
              Data-driven analysis on where smart money is flowing, emerging
              markets, and macro trends affecting real estate.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Strategy Deep-Dives</strong>
              <br />
              BRRRR, house hacking, short-term rentals, 1031 exchanges — the
              strategies that actually build portfolios.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Start Here */}
          <Section>
            <Heading as="h2" style={h2}>
              Start Here
            </Heading>
            <Text style={paragraph}>
              While you wait for our next newsletter, check out these resources:
            </Text>

            <Link href={`${baseUrl}/calculators/cap-rate`} style={link}>
              Cap Rate Calculator →
            </Link>
            <br />
            <Text style={linkDescription}>
              The fastest way to compare investment properties.
            </Text>

            <Link href={`${baseUrl}/calculators/cash-on-cash`} style={link}>
              Cash-on-Cash Return Calculator →
            </Link>
            <br />
            <Text style={linkDescription}>
              See how leverage affects your real returns.
            </Text>

            <Link href={`${baseUrl}/glossary`} style={link}>
              Investor Glossary →
            </Link>
            <br />
            <Text style={linkDescription}>
              Every term you need to know, explained clearly.
            </Text>

            <Link href={`${baseUrl}/blog`} style={link}>
              Latest Articles →
            </Link>
            <br />
            <Text style={linkDescription}>
              Expert guides on strategies, markets, and deal analysis.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you signed up at{' '}
              <Link href={baseUrl} style={footerLink}>
                proinvestorhub.com
              </Link>
              .
            </Text>
            <Text style={footer}>
              Real Estate Investing, Demystified.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

const main: React.CSSProperties = {
  backgroundColor: '#F8F7F4',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
}

const container: React.CSSProperties = {
  maxWidth: '580px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  marginTop: '32px',
  marginBottom: '32px',
}

const header: React.CSSProperties = {
  backgroundColor: '#1B4D3E',
  padding: '24px 32px',
}

const logoText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 700,
  margin: 0,
}

const logoAccent: React.CSSProperties = {
  color: '#D4A843',
}

const heroSection: React.CSSProperties = {
  padding: '32px 32px 0',
}

const h1: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36px',
  margin: '0 0 16px',
}

const h2: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '28px',
  margin: '0 0 16px',
  padding: '0 32px',
}

const paragraph: React.CSSProperties = {
  color: '#4A4A4A',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
  padding: '0 32px',
}

const listItem: React.CSSProperties = {
  color: '#4A4A4A',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
  padding: '0 32px',
}

const bold: React.CSSProperties = {
  color: '#1A1A1A',
}

const hr: React.CSSProperties = {
  borderColor: '#E2DED5',
  margin: '24px 32px',
}

const link: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  paddingLeft: '32px',
}

const linkDescription: React.CSSProperties = {
  color: '#6B6B6B',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0 16px',
  padding: '0 32px',
}

const footer: React.CSSProperties = {
  color: '#9A9A9A',
  fontSize: '13px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  padding: '0 32px',
  margin: '0 0 8px',
}

const footerLink: React.CSSProperties = {
  color: '#9A9A9A',
  textDecoration: 'underline',
}
