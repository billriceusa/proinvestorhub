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

export function Drip2FirstDealEmail({ firstName = 'there' }: { firstName?: string }) {
  return (
    <Html>
      <Head />
      <Preview>The step-by-step process for analyzing your first investment deal</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
          </Section>

          <Section style={heroSection}>
            <Heading style={h1}>How to Analyze Your First Deal</Heading>
            <Text style={paragraph}>
              Hey {firstName} — now that you&apos;ve got the calculators in your
              toolkit, let&apos;s walk through how experienced investors actually
              evaluate a property from scratch. This is the process, simplified.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>The 5-Step Deal Analysis</Heading>

            <Text style={listItem}>
              <strong style={bold}>Step 1: Screen with the 1% rule.</strong>
              <br />
              Monthly rent should be roughly 1% of the purchase price. A $200K
              property should rent for ~$2,000/month. This isn&apos;t a hard rule,
              but it quickly filters out properties that won&apos;t cash flow.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Step 2: Run the cap rate.</strong>
              <br />
              Estimate annual rent, subtract realistic expenses (taxes, insurance,
              maintenance, vacancy, management), and divide by the purchase price.
              This gives you a financing-independent view of the deal.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Step 3: Calculate cash-on-cash with financing.</strong>
              <br />
              Now factor in your down payment, loan terms, and monthly mortgage.
              What does your actual cash earn? This is the number that matters for
              your portfolio.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Step 4: Stress-test your assumptions.</strong>
              <br />
              What if vacancy is 10% instead of 5%? What if you need a new roof in
              year 2? What if rates go up when you refinance? Run the scenarios.
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Step 5: Check the checklist.</strong>
              <br />
              Use our Deal Analysis Checklist to make sure you haven&apos;t missed
              anything — 7 sections, 30+ line items covering everything from
              comps to exit strategy.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>Your Free Tools</Heading>
            <Link href={`${baseUrl}/resources/deal-analysis-checklist`} style={ctaLink}>
              Download the Deal Analysis Checklist &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/calculators/brrrr`} style={ctaLink}>
              Try the BRRRR Calculator (for value-add deals) &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/glossary/net-operating-income`} style={ctaLink}>
              Learn: What is NOI and why it matters &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={paragraph}>
              <strong style={bold}>Your homework:</strong> Find a real listing in
              a market you&apos;re curious about. Run it through Steps 1-3. Don&apos;t
              worry about being perfect — the goal is to build the habit of
              analyzing before reacting.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you signed up at{' '}
              <Link href={baseUrl} style={footerLink}>proinvestorhub.com</Link>.
              Day 3 of your investor education series.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Drip2FirstDealEmail

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
