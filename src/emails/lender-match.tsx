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

type LenderMatch = {
  name: string
  slug: string
  editorRating: number
  minRate: number
  maxRate: number
  maxLtv: number
  speedToClose: string
}

type Scenario = {
  creditScore?: string
  loanType?: string
  state?: string
  priority?: string
}

export function LenderMatchEmail({
  firstName = 'Investor',
  topMatches = [],
  scenario = {},
}: {
  firstName?: string
  topMatches?: LenderMatch[]
  scenario?: Scenario
}) {
  return (
    <Html>
      <Head />
      <Preview>{firstName}, your personalized lender matches from ProInvestorHub are ready.</Preview>
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
            <Heading style={h1}>{firstName}, Your Lender Matches</Heading>
            <Text style={paragraph}>
              Based on your search criteria, we found {topMatches.length} lender{topMatches.length !== 1 ? 's' : ''} that
              match your investment scenario. Here are your top matches:
            </Text>
          </Section>

          {/* Scenario Summary */}
          {Object.keys(scenario).length > 0 && (
            <Section style={scenarioBox}>
              <Text style={scenarioTitle}>Your Search Criteria</Text>
              {scenario.loanType && (
                <Text style={scenarioItem}>Loan Type: {scenario.loanType}</Text>
              )}
              {scenario.creditScore && (
                <Text style={scenarioItem}>Credit Score: {scenario.creditScore}+</Text>
              )}
              {scenario.state && (
                <Text style={scenarioItem}>State: {scenario.state}</Text>
              )}
              {scenario.priority && (
                <Text style={scenarioItem}>Priority: {scenario.priority}</Text>
              )}
            </Section>
          )}

          <Hr style={hr} />

          {/* Lender Results */}
          <Section>
            <Heading as="h2" style={h2}>
              Your Top Matches
            </Heading>

            {topMatches.map((lender, i) => (
              <Section key={lender.slug} style={lenderCard}>
                <Text style={lenderRank}>#{i + 1}{i === 0 ? ' — Best Match' : ''}</Text>
                <Link
                  href={`${baseUrl}/lenders/reviews/${lender.slug}`}
                  style={lenderName}
                >
                  {lender.name}
                </Link>
                <Text style={lenderStats}>
                  Rating: {lender.editorRating.toFixed(1)}/5 &nbsp;|&nbsp;
                  Rates: {lender.minRate}%–{lender.maxRate}% &nbsp;|&nbsp;
                  Max LTV: {lender.maxLtv}% &nbsp;|&nbsp;
                  Close: {lender.speedToClose}
                </Text>
                <Link
                  href={`${baseUrl}/lenders/reviews/${lender.slug}`}
                  style={reviewLink}
                >
                  Read Full Review &rarr;
                </Link>
              </Section>
            ))}
          </Section>

          <Hr style={hr} />

          {/* CTA */}
          <Section style={ctaSection}>
            <Text style={paragraph}>
              Want to explore more options or refine your search?
            </Text>
            <Link href={`${baseUrl}/lenders/finder`} style={ctaButton}>
              Back to Lender Finder
            </Link>
            <br />
            <br />
            <Link href={`${baseUrl}/lenders/compare`} style={secondaryLink}>
              Compare Lenders Side-by-Side &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you used the Lender Finder at{' '}
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

export default LenderMatchEmail

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
  fontSize: '26px',
  fontWeight: 700,
  lineHeight: '34px',
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

const scenarioBox: React.CSSProperties = {
  backgroundColor: '#F8F7F4',
  borderRadius: '8px',
  padding: '16px 24px',
  margin: '0 32px 16px',
}

const scenarioTitle: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '14px',
  fontWeight: 700,
  margin: '0 0 8px',
}

const scenarioItem: React.CSSProperties = {
  color: '#6B6B6B',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
}

const hr: React.CSSProperties = {
  borderColor: '#E2DED5',
  margin: '24px 32px',
}

const lenderCard: React.CSSProperties = {
  backgroundColor: '#F8F7F4',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '0 32px 12px',
}

const lenderRank: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px',
}

const lenderName: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '18px',
  fontWeight: 700,
  textDecoration: 'none',
}

const lenderStats: React.CSSProperties = {
  color: '#6B6B6B',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '8px 0',
}

const reviewLink: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
}

const ctaSection: React.CSSProperties = {
  textAlign: 'center' as const,
  padding: '0 32px',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: '#1B4D3E',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  display: 'inline-block',
}

const secondaryLink: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
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
