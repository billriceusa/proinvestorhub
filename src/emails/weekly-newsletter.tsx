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

interface NewsletterArticle {
  title: string
  description: string
  url: string
}

interface NewsletterProps {
  issueNumber: number
  date: string
  headline: string
  previewText: string
  intro: string
  featuredArticle: NewsletterArticle
  articles: NewsletterArticle[]
  toolSpotlight?: {
    title: string
    description: string
    url: string
  }
  glossaryTerms?: Array<{
    term: string
    definition: string
    url: string
  }>
  closingNote?: string
}

export function WeeklyNewsletter({
  issueNumber = 1,
  date = 'March 2026',
  headline = 'This Week in Real Estate Investing',
  previewText = 'Your weekly dose of real estate investing insights',
  intro = 'Here\'s what smart investors are paying attention to this week.',
  featuredArticle = {
    title: 'How to Analyze a Rental Property in Under 5 Minutes',
    description:
      'The three numbers that tell you everything you need to know about a deal before diving into the details.',
    url: `${baseUrl}/blog`,
  },
  articles = [],
  toolSpotlight,
  glossaryTerms,
  closingNote = 'Keep building. Keep learning. The best time to invest was yesterday — the second best time is now.',
}: NewsletterProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>
              Pro<span style={logoAccent}>Investor</span>Hub
            </Text>
            <Text style={issueTag}>
              Issue #{issueNumber} &middot; {date}
            </Text>
          </Section>

          {/* Headline */}
          <Section style={heroSection}>
            <Heading style={h1}>{headline}</Heading>
            <Text style={paragraph}>{intro}</Text>
          </Section>

          <Hr style={hr} />

          {/* Featured Article */}
          <Section style={sectionPadded}>
            <Text style={sectionLabel}>FEATURED</Text>
            <Heading as="h2" style={h2Featured}>
              {featuredArticle.title}
            </Heading>
            <Text style={paragraph}>
              {featuredArticle.description}
            </Text>
            <Link href={featuredArticle.url} style={ctaButton}>
              Read the Full Article →
            </Link>
          </Section>

          {/* More Articles */}
          {articles.length > 0 && (
            <>
              <Hr style={hr} />
              <Section style={sectionPadded}>
                <Text style={sectionLabel}>ALSO THIS WEEK</Text>
                {articles.map((article, idx) => (
                  <Section key={idx} style={articleItem}>
                    <Link href={article.url} style={articleTitle}>
                      {article.title}
                    </Link>
                    <Text style={articleDescription}>
                      {article.description}
                    </Text>
                  </Section>
                ))}
              </Section>
            </>
          )}

          {/* Tool Spotlight */}
          {toolSpotlight && (
            <>
              <Hr style={hr} />
              <Section style={sectionPadded}>
                <Text style={sectionLabel}>TOOL SPOTLIGHT</Text>
                <Section style={toolCard}>
                  <Heading as="h3" style={h3}>
                    {toolSpotlight.title}
                  </Heading>
                  <Text style={toolDescription}>
                    {toolSpotlight.description}
                  </Text>
                  <Link href={toolSpotlight.url} style={toolLink}>
                    Try It Free →
                  </Link>
                </Section>
              </Section>
            </>
          )}

          {/* Glossary Spotlight */}
          {glossaryTerms && glossaryTerms.length > 0 && (
            <>
              <Hr style={hr} />
              <Section style={sectionPadded}>
                <Text style={sectionLabel}>TERM OF THE WEEK</Text>
                {glossaryTerms.map((term, idx) => (
                  <Section key={idx} style={glossaryCard}>
                    <Link href={term.url} style={glossaryTerm}>
                      {term.term}
                    </Link>
                    <Text style={glossaryDef}>{term.definition}</Text>
                  </Section>
                ))}
              </Section>
            </>
          )}

          <Hr style={hr} />

          {/* Closing */}
          <Section style={sectionPadded}>
            <Text style={closingParagraph}>{closingNote}</Text>
            <Text style={signature}>
              — Bill Rice, ProInvestorHub
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              You&apos;re receiving this because you subscribed at{' '}
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

export default WeeklyNewsletter

// ── Styles ─────────────────────────────────────────────

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
  margin: '0 0 4px',
}

const logoAccent: React.CSSProperties = {
  color: '#D4A843',
}

const issueTag: React.CSSProperties = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '13px',
  margin: 0,
}

const heroSection: React.CSSProperties = {
  padding: '32px 32px 0',
}

const sectionPadded: React.CSSProperties = {
  padding: '0 32px',
}

const sectionLabel: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 12px',
}

const h1: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '26px',
  fontWeight: 700,
  lineHeight: '34px',
  margin: '0 0 16px',
}

const h2Featured: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '28px',
  margin: '0 0 12px',
}

const h3: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '17px',
  fontWeight: 700,
  lineHeight: '24px',
  margin: '0 0 8px',
}

const paragraph: React.CSSProperties = {
  color: '#4A4A4A',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
}

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#1B4D3E',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '6px',
  marginBottom: '8px',
}

const articleItem: React.CSSProperties = {
  marginBottom: '16px',
}

const articleTitle: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
}

const articleDescription: React.CSSProperties = {
  color: '#6B6B6B',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '4px 0 0',
}

const toolCard: React.CSSProperties = {
  backgroundColor: '#F0F7F4',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '8px',
}

const toolDescription: React.CSSProperties = {
  color: '#4A4A4A',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 12px',
}

const toolLink: React.CSSProperties = {
  color: '#1B4D3E',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
}

const glossaryCard: React.CSSProperties = {
  backgroundColor: '#FFFBF0',
  borderRadius: '8px',
  borderLeft: '4px solid #D4A843',
  padding: '16px 20px',
  marginBottom: '8px',
}

const glossaryTerm: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '16px',
  fontWeight: 700,
  textDecoration: 'none',
}

const glossaryDef: React.CSSProperties = {
  color: '#4A4A4A',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '6px 0 0',
}

const closingParagraph: React.CSSProperties = {
  color: '#4A4A4A',
  fontSize: '15px',
  lineHeight: '24px',
  fontStyle: 'italic',
  margin: '0 0 8px',
}

const signature: React.CSSProperties = {
  color: '#1A1A1A',
  fontSize: '15px',
  fontWeight: 600,
  margin: '0 0 8px',
}

const hr: React.CSSProperties = {
  borderColor: '#E2DED5',
  margin: '24px 32px',
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
