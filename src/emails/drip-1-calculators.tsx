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

export function Drip1CalculatorsEmail({ firstName = 'there' }: { firstName?: string }) {
  return (
    <Html>
      <Head />
      <Preview>3 calculators every real estate investor needs to master</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
          </Section>

          <Section style={heroSection}>
            <Heading style={h1}>Hey {firstName}, Let&apos;s Talk Numbers</Heading>
            <Text style={paragraph}>
              The difference between a good deal and a bad one often comes down to
              three numbers. Here are the calculators that experienced investors use
              on every single deal — and how to use them.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>1. Cap Rate Calculator</Heading>
            <Text style={paragraph}>
              Cap rate is the first metric you should run on any property. It tells
              you what return the property generates independent of financing — so
              you can compare deals apples-to-apples.
            </Text>
            <Text style={paragraph}>
              <strong style={bold}>Quick rule:</strong> 6-8% is solid for most markets.
              Under 4% means you&apos;re betting on appreciation. Over 10% — verify
              the numbers carefully.
            </Text>
            <Link href={`${baseUrl}/calculators/cap-rate`} style={ctaLink}>
              Try the Cap Rate Calculator &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>2. Cash-on-Cash Return</Heading>
            <Text style={paragraph}>
              Cap rate ignores financing. Cash-on-cash shows you what your actual
              invested dollars earn annually. This is the number that tells you
              whether leverage is working for or against you.
            </Text>
            <Text style={paragraph}>
              <strong style={bold}>Quick rule:</strong> 8-12% cash-on-cash is
              strong. If it&apos;s under 5%, the deal probably isn&apos;t worth
              the management headache.
            </Text>
            <Link href={`${baseUrl}/calculators/cash-on-cash`} style={ctaLink}>
              Try Cash-on-Cash Calculator &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>3. Rental Cash Flow</Heading>
            <Text style={paragraph}>
              Cash flow is the heartbeat of a rental property. This calculator
              gives you the full picture — monthly income minus every expense,
              including the ones beginners forget (vacancy, maintenance, management).
            </Text>
            <Text style={paragraph}>
              <strong style={bold}>Quick rule:</strong> Positive cash flow after
              ALL expenses (including reserves) means the property pays for itself.
              $200+/month per unit is a good target for beginners.
            </Text>
            <Link href={`${baseUrl}/calculators/rental-cashflow`} style={ctaLink}>
              Try Rental Cash Flow Calculator &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={paragraph}>
              <strong style={bold}>Your homework:</strong> Pick any property on
              Zillow or Realtor.com and run it through all three calculators. Even
              if you&apos;re not buying yet, this builds the muscle memory that
              separates serious investors from tire-kickers.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you signed up at{' '}
              <Link href={baseUrl} style={footerLink}>proinvestorhub.com</Link>.
              Day 1 of your investor education series.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Drip1CalculatorsEmail

const main: React.CSSProperties = { backgroundColor: '#F8F7F4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }
const container: React.CSSProperties = { maxWidth: '580px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', marginTop: '32px', marginBottom: '32px' }
const header: React.CSSProperties = { backgroundColor: '#1B4D3E', padding: '24px 32px' }
const logoText: React.CSSProperties = { color: '#ffffff', fontSize: '22px', fontWeight: 700, margin: 0 }
const logoAccent: React.CSSProperties = { color: '#D4A843' }
const heroSection: React.CSSProperties = { padding: '32px 32px 0' }
const h1: React.CSSProperties = { color: '#1A1A1A', fontSize: '28px', fontWeight: 700, lineHeight: '36px', margin: '0 0 16px' }
const h2: React.CSSProperties = { color: '#1A1A1A', fontSize: '20px', fontWeight: 700, lineHeight: '28px', margin: '0 0 12px', padding: '0 32px' }
const paragraph: React.CSSProperties = { color: '#4A4A4A', fontSize: '16px', lineHeight: '26px', margin: '0 0 16px', padding: '0 32px' }
const bold: React.CSSProperties = { color: '#1A1A1A' }
const hr: React.CSSProperties = { borderColor: '#E2DED5', margin: '24px 32px' }
const ctaLink: React.CSSProperties = { color: '#1B4D3E', fontSize: '15px', fontWeight: 600, textDecoration: 'none', paddingLeft: '32px' }
const footer: React.CSSProperties = { color: '#9A9A9A', fontSize: '13px', lineHeight: '20px', textAlign: 'center' as const, padding: '0 32px', margin: '0 0 8px' }
const footerLink: React.CSSProperties = { color: '#9A9A9A', textDecoration: 'underline' }
