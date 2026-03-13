/**
 * Newsletter Send Script
 *
 * Usage:
 *   node scripts/send-newsletter.mjs --issue 1 --test you@example.com
 *   node scripts/send-newsletter.mjs --issue 1 --broadcast
 *
 * Environment:
 *   NEWSLETTER_SEND_SECRET  - Auth token (must match Vercel env var)
 *   SITE_URL                - Base URL (default: https://proinvestorhub.com)
 */

const SITE_URL = process.env.SITE_URL || 'https://proinvestorhub.com'
const SEND_SECRET = process.env.NEWSLETTER_SEND_SECRET

if (!SEND_SECRET) {
  console.error('Missing NEWSLETTER_SEND_SECRET environment variable')
  process.exit(1)
}

const args = process.argv.slice(2)
const issueIdx = args.indexOf('--issue')
const testIdx = args.indexOf('--test')
const isBroadcast = args.includes('--broadcast')

const issueNumber = issueIdx !== -1 ? Number(args[issueIdx + 1]) : 1
const testEmail = testIdx !== -1 ? args[testIdx + 1] : null

if (!testEmail && !isBroadcast) {
  console.error('Specify --test <email> for a test send, or --broadcast for all subscribers')
  process.exit(1)
}

// ── Newsletter Content Library ─────────────────────────
// Add new issues here. Each object matches the WeeklyNewsletter props.

const issues = {
  1: {
    issueNumber: 1,
    date: 'March 2026',
    headline: 'The 3 Numbers That Make or Break Every Deal',
    previewText: 'Cap rate, CoC return, and NOI — the metrics that separate smart investors from the rest.',
    intro: "Welcome to the very first ProInvestorHub newsletter. Each week, we'll deliver actionable insights, deal analysis frameworks, and tools to help you invest smarter. Let's start with the three numbers every investor needs to master.",
    featuredArticle: {
      title: 'How to Analyze a Rental Property in Under 5 Minutes',
      description:
        "Every experienced investor has a quick screening process. Here are the three metrics that tell you whether a deal is worth deeper analysis — before you waste hours on a property that doesn't pencil.",
      url: `${SITE_URL}/blog/cap-rate-explained`,
    },
    articles: [
      {
        title: '5 Real Estate Investing Strategies for Beginners in 2026',
        description: 'From house hacking to BRRRR, find the approach that fits your budget and goals.',
        url: `${SITE_URL}/blog/5-real-estate-investing-strategies-beginners-2026`,
      },
    ],
    toolSpotlight: {
      title: 'Cap Rate Calculator',
      description:
        'Compare investment properties in seconds. Enter purchase price and operating income to see cap rate, NOI, and expense ratio — instantly and free.',
      url: `${SITE_URL}/calculators/cap-rate`,
    },
    glossaryTerms: [
      {
        term: 'Net Operating Income (NOI)',
        definition:
          "Total income after operating expenses, before mortgage payments. NOI is the foundation of every deal analysis metric — cap rate, DSCR, and cash flow all start here.",
        url: `${SITE_URL}/glossary/noi`,
      },
    ],
    closingNote:
      "Keep building. Keep learning. The best time to invest was yesterday — the second best time is now.",
  },

  2: {
    issueNumber: 2,
    date: 'March 2026',
    headline: 'The Strategy That Lets You Recycle Capital Infinitely',
    previewText: 'BRRRR explained: how investors buy properties and get all their cash back.',
    intro: "This week, we're breaking down the BRRRR method — the investment strategy that lets you buy a property, force appreciation through renovation, and pull all your capital back out to do it again.",
    featuredArticle: {
      title: 'BRRRR Method: How to Recycle Your Capital Deal After Deal',
      description:
        "Buy, Rehab, Rent, Refinance, Repeat. Here's exactly how the math works, with a real-world example showing how investors achieve infinite returns.",
      url: `${SITE_URL}/blog`,
    },
    articles: [],
    toolSpotlight: {
      title: 'BRRRR Calculator',
      description:
        "Walk through each phase of a BRRRR deal — purchase, rehab, rent, refinance — and see if you'll get all your cash back. Free, no sign-up.",
      url: `${SITE_URL}/calculators/brrrr`,
    },
    glossaryTerms: [
      {
        term: 'After Repair Value (ARV)',
        definition:
          "The estimated market value after renovations. ARV is the linchpin of every BRRRR deal — it determines how much you can refinance and whether you'll recover your capital.",
        url: `${SITE_URL}/glossary/arv`,
      },
    ],
    closingNote:
      "The BRRRR method isn't magic — it's math. And now you have a free calculator to run the numbers before you commit.",
  },

  3: {
    issueNumber: 3,
    date: 'March 2026',
    headline: "The Loan Product That Changed the Game for Investors",
    previewText: 'DSCR loans: qualify based on rental income, not your W-2.',
    intro: "If you've ever been told you have 'too many properties' to get another mortgage, DSCR loans are your answer. This week, we break down how they work and when they make sense.",
    featuredArticle: {
      title: 'DSCR Loans Explained: How to Qualify Without W-2 Income',
      description:
        "DSCR loans qualify you based on the property's rental income instead of your personal tax returns. Here's how the math works, what lenders look for, and when they're better than conventional financing.",
      url: `${SITE_URL}/blog`,
    },
    articles: [],
    toolSpotlight: {
      title: 'Mortgage & DSCR Calculator',
      description:
        "Toggle between conventional and DSCR mode to see your monthly payment, cash flow, and debt service coverage ratio. Instantly see if your deal qualifies.",
      url: `${SITE_URL}/calculators/mortgage`,
    },
    glossaryTerms: [
      {
        term: 'Debt Service Coverage Ratio (DSCR)',
        definition:
          "The ratio of a property's NOI to its debt service. A DSCR of 1.25 means the property generates 25% more income than needed to cover the mortgage — the sweet spot for most lenders.",
        url: `${SITE_URL}/glossary/dscr`,
      },
    ],
    closingNote:
      "DSCR loans removed the biggest barrier for scaling investors. Use our calculator to see if your next deal qualifies.",
  },
}

// ── Send ───────────────────────────────────────────────

async function send() {
  const issue = issues[issueNumber]
  if (!issue) {
    console.error(`Issue #${issueNumber} not found. Available: ${Object.keys(issues).join(', ')}`)
    process.exit(1)
  }

  const payload = {
    ...issue,
    ...(testEmail ? { testEmail } : {}),
  }

  const mode = testEmail ? `TEST → ${testEmail}` : 'BROADCAST → all subscribers'
  console.log(`\nSending newsletter #${issueNumber}: "${issue.headline}"`)
  console.log(`Mode: ${mode}\n`)

  if (isBroadcast) {
    console.log('⚠️  BROADCASTING to all subscribers in 5 seconds...')
    console.log('    Press Ctrl+C to cancel.\n')
    await new Promise((r) => setTimeout(r, 5000))
  }

  const res = await fetch(`${SITE_URL}/api/newsletter/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SEND_SECRET}`,
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (res.ok) {
    console.log('✓ Newsletter sent successfully!')
    console.log(JSON.stringify(result, null, 2))
  } else {
    console.error('✗ Failed to send:', result)
    process.exit(1)
  }
}

send().catch((err) => {
  console.error('Send failed:', err.message)
  process.exit(1)
})
