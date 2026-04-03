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

export function Drip5StrategyEmail({ firstName = 'there' }: { firstName?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Pick your strategy — the 4 paths real estate investors take (and which one fits you)</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
          </Section>

          <Section style={heroSection}>
            <Heading style={h1}>Choosing Your Strategy</Heading>
            <Text style={paragraph}>
              Hey {firstName} — over the past 10 days, you&apos;ve learned how to
              analyze deals, understand financing, and evaluate markets. Now it&apos;s
              time to decide: which strategy fits your goals, capital, and risk
              tolerance?
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>The 4 Core Strategies</Heading>

            <Text style={listItem}>
              <strong style={bold}>Buy &amp; Hold Rentals</strong>
              <br />
              <em>Best for:</em> Long-term wealth builders with patience.
              <br />
              You buy, rent out, and hold for years. Wealth comes from cash flow,
              appreciation, mortgage paydown, and tax benefits compounding over
              time. This is the strategy most millionaire investors used.
              <br />
              <em>Capital needed:</em> $30K-$80K per property (20-25% down).
            </Text>

            <Text style={listItem}>
              <strong style={bold}>BRRRR Method</strong>
              <br />
              <em>Best for:</em> Active investors who want to scale fast.
              <br />
              Buy undervalued, Rehab, Rent, Refinance (pull cash out), Repeat.
              If done well, you recover most or all of your capital and keep a
              cash-flowing asset. Higher risk, higher reward.
              <br />
              <em>Capital needed:</em> $50K-$100K per deal (recycled).
            </Text>

            <Text style={listItem}>
              <strong style={bold}>House Hacking</strong>
              <br />
              <em>Best for:</em> First-time investors with limited capital.
              <br />
              Buy a 2-4 unit property, live in one unit, rent the others. Your
              tenants cover your mortgage. You can use FHA loans with as little
              as 3.5% down. This is the lowest-barrier entry into investing.
              <br />
              <em>Capital needed:</em> $10K-$30K (owner-occupant financing).
            </Text>

            <Text style={listItem}>
              <strong style={bold}>Fix &amp; Flip</strong>
              <br />
              <em>Best for:</em> People who want quick returns and enjoy project management.
              <br />
              Buy distressed, renovate, sell for profit. Typical timeline: 3-6
              months. This is active income, not passive — and profits are taxed
              as ordinary income. But it can generate significant cash fast.
              <br />
              <em>Capital needed:</em> $50K-$150K per project (or hard money).
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>My Advice</Heading>
            <Text style={paragraph}>
              Pick ONE strategy and master it before branching out. Most successful
              investors I know built their foundation with buy-and-hold or house
              hacking, then added BRRRR or flipping once they had systems in place.
            </Text>
            <Text style={paragraph}>
              The worst thing you can do is try everything at once. Depth beats
              breadth in real estate investing.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>Keep Learning</Heading>
            <Text style={paragraph}>
              This wraps up your 5-email crash course. From here, you&apos;ll get
              our weekly newsletter with market analysis, deal breakdowns, and
              strategy insights. Here are the tools you&apos;ll keep coming back to:
            </Text>
            <Link href={`${baseUrl}/calculators`} style={ctaLink}>
              All 9 Calculators &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/lenders/finder`} style={ctaLink}>
              Lender Finder &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/markets`} style={ctaLink}>
              Market Rankings &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/glossary`} style={ctaLink}>
              Investor Glossary &rarr;
            </Link>
            <br /><br />
            <Link href={`${baseUrl}/blog`} style={ctaLink}>
              Expert Blog &rarr;
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={paragraph}>
              Thanks for investing the time to learn, {firstName}. The fact that
              you&apos;re educating yourself before jumping in puts you ahead of
              most people who buy on impulse. Keep going.
            </Text>
            <Text style={signoff}>
              — Bill Rice, Founder of ProInvestorHub
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you signed up at{' '}
              <Link href={baseUrl} style={footerLink}>proinvestorhub.com</Link>.
              Day 10 — final email in your investor education series. You&apos;ll
              now receive our weekly newsletter.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Drip5StrategyEmail

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
const signoff: React.CSSProperties = { color: '#1A1A1A', fontSize: '15px', fontWeight: 600, padding: '0 32px', margin: '0' }
const footer: React.CSSProperties = { color: '#9A9A9A', fontSize: '13px', lineHeight: '20px', textAlign: 'center' as const, padding: '0 32px', margin: '0 0 8px' }
const footerLink: React.CSSProperties = { color: '#9A9A9A', textDecoration: 'underline' }
