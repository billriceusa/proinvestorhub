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

type ResultItem = {
  label: string
  value: string
}

export function CalculatorResultsEmail({
  firstName = 'Investor',
  calculatorName = 'Calculator',
  results = [],
}: {
  firstName?: string
  calculatorName?: string
  results?: ResultItem[]
}) {
  return (
    <Html>
      <Head />
      <Preview>{firstName}, your {calculatorName} results from ProInvestorHub.</Preview>
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
            <Heading style={h1}>Your {calculatorName} Results</Heading>
            <Text style={paragraph}>
              Hey {firstName}, here are the results from your analysis. Save this email to reference later as you evaluate deals.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Results Table */}
          <Section>
            <Heading as="h2" style={h2}>Results Summary</Heading>

            {results.map((item) => (
              <Section key={item.label} style={resultRow}>
                <Text style={resultLabel}>{item.label}</Text>
                <Text style={resultValue}>{item.value}</Text>
              </Section>
            ))}
          </Section>

          <Hr style={hr} />

          {/* CTA */}
          <Section style={ctaSection}>
            <Text style={paragraph}>
              Want to run another scenario or try a different calculator?
            </Text>
            <Link href={`${baseUrl}/calculators`} style={ctaButton}>
              Explore All Calculators
            </Link>
            <br />
            <br />
            <Link href={`${baseUrl}/lenders/finder`} style={secondaryLink}>
              Find a Lender for This Deal &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you used a calculator at{' '}
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

export default CalculatorResultsEmail

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

const hr: React.CSSProperties = {
  borderColor: '#E2DED5',
  margin: '24px 32px',
}

const resultRow: React.CSSProperties = {
  padding: '8px 32px',
  borderBottom: '1px solid #F0EDE8',
}

const resultLabel: React.CSSProperties = {
  color: '#6B6B6B',
  fontSize: '13px',
  margin: '0',
}

const resultValue: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '16px',
  fontWeight: 700,
  margin: '2px 0 0',
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
