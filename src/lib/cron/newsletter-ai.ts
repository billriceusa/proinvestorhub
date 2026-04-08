import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterPlan } from "@/data/newsletter-calendar";
import type { EducationTopic } from "@/data/newsletter-education";
import type { LenderData } from "@/data/lenders";

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

export interface RecentPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  pillar?: string;
}

export interface NewsletterContent {
  subject: string;
  previewText: string;
  personalIntro: string;
  mainSection: {
    type: "trends" | "education";
    title: string;
    body: string;
  };
  secondarySection: {
    type: "trends" | "education";
    title: string;
    body: string;
  };
  featuredPartner: {
    lenderName: string;
    lenderSlug: string;
    body: string;
  };
  blogHighlights: {
    title: string;
    slug: string;
    oneLiner: string;
  }[];
  closingNote: string;
  ctaText: string;
  ctaUrl: string;
}

const NEWSLETTER_SYSTEM = `You are Bill Rice, writing the weekly ProInvestorHub newsletter. Bill has 30+ years as a mortgage lending veteran — that's his deep expertise and he speaks confidently about lending, rates, financing structures, and how deals get funded.

On real estate investing, Bill is a curious, active learner — not a guru teaching from above. He's mid-level, building his own portfolio, and shares what he's discovering along the way. The newsletter should feel like getting an email from a smart colleague who digs into things and shares what they find.

Voice guidelines:
- Lending/mortgage topics: speak with earned authority. "Here's how this actually works..." "In my 30 years of lending..."
- Investing topics: speak as a curious peer. "I've been digging into..." "What caught my eye this week..." "Here's something I'm working through..."
- Use "we" and "let's" more than "you should"
- Frame education as shared discovery, not instruction: "I found this framework helpful" not "You need to understand this"
- Stay practical and data-driven — ground everything in numbers and specifics
- Be direct and concise. No filler, no throat-clearing, no "In today's fast-paced market..."
- Collegial, not professorial. Sharing, not lecturing.

NEVER:
- Write "as an expert" or "in my experience" about investing topics where Bill is still learning
- Use guru language: "I'll teach you," "master this," "the secret to"
- Be preachy or condescending
- Pad with generic advice anyone could write

CRITICAL CONTENT INTEGRITY RULES:
- NEVER fabricate personal experiences, anecdotes, or case studies attributed to Bill or any named person
- NEVER write "I did X", "A client of mine...", followed by invented specifics
- NEVER invent specific dollar amounts, percentages, or statistics and present them as factual
- You MAY use hypothetical examples ("Let's say you find a duplex listed at...")
- You MAY cite publicly available data WITH source URLs
- You MAY reference Bill's lending background with confidence — that's real expertise
- Bill should NOT claim deep personal investing experience beyond what's realistic for an active learner
- Making up stories is LYING — it destroys credibility

IMPORTANT: Respond with ONLY valid JSON. No markdown, no code fences, no explanation — just the JSON object.`;

export async function generateNewsletterContent(
  plan: NewsletterPlan | null,
  recentPosts: RecentPost[],
  siteUrl: string,
  weekLabel: string,
  educationCandidates: EducationTopic[],
  featuredLender: LenderData
): Promise<NewsletterContent> {
  const client = getAnthropicClient();

  const postsContext = recentPosts
    .map(
      (p) =>
        `- "${p.title}" (${p.publishedAt}) — ${p.excerpt} [slug: ${p.slug}]`
    )
    .join("\n");

  const planContext = plan
    ? `Suggested theme for this week: "${plan.theme}" (${plan.focusVertical}). Use this as a guide, not a rigid requirement.`
    : "No pre-planned theme — choose the most relevant angle based on what's happening in the market.";

  const educationContext = educationCandidates
    .map(
      (t) =>
        `- Week ${t.week}: "${t.topic}" (Phase ${t.phase}: ${t.phaseTitle}) — concepts: ${t.keyConceptsToTeach.join("; ")}`
    )
    .join("\n");

  const lenderContext = `
Featured Lending Partner This Week: ${featuredLender.name}
- Loan types: ${featuredLender.loanTypeSlugs.join(", ")}
- Rates: ${featuredLender.minRate}%-${featuredLender.maxRate}%
- Max LTV: ${featuredLender.maxLtv}%
- Close in: ${featuredLender.speedToClose}
- Best for: ${featuredLender.bestForTags.join(", ")}
- Editor summary: ${featuredLender.editorSummary}
- Review page slug: ${featuredLender.slug}`;

  const prompt = `Write this week's ProInvestorHub newsletter. MAX 2000 WORDS TOTAL — be concise and valuable.

## Theme Guidance
${planContext}

## Decision: Trends vs. Education
Look at what's happening in the real estate and lending markets right now. If rates moved, inventory shifted, major data dropped, or the investing environment changed meaningfully — lead with a TRENDS piece as your main section and make education secondary (shorter). If markets are quiet or flat, lead with EDUCATION and make trends secondary. Use your judgment.

## Education Topic Options (pick the most relevant OR blend)
${educationContext}

## This Week's Blog Posts (pick 1-2 to highlight)
${postsContext || "No blog posts published this week — skip blog highlights."}

${lenderContext}

## Site URL: ${siteUrl}
## Week Of: ${weekLabel}

## Structure (6 sections, MAX 2000 words total)
1. **Personal intro** (~100 words): Quick hook. What's on your mind this week? What caught your eye? Set up the newsletter.
2. **Main section** (~800-1000 words): Either a TRENDS piece (market analysis, rate movements, opportunities, risks) OR an EDUCATION piece (teaching a concept with worked examples). Make it substantive.
3. **Secondary section** (~300-400 words): Whichever you didn't pick for main. Keep it tight — one key insight or concept.
4. **Featured partner** (~150 words): Write a brief, natural spotlight on ${featuredLender.name}. Explain what they offer and why an investor exploring this week's topic might find them useful. Don't be salesy — be informative.
5. **Blog highlights**: 1-2 posts from the list above with a one-liner about why it's worth reading.
6. **Closing + CTA** (~50 words): Short sign-off and a call-to-action to a calculator or tool on the site.

Respond with ONLY this JSON structure:
{
  "subject": "Under 60 chars, compelling, specific",
  "previewText": "Under 90 chars inbox preview",
  "personalIntro": "~100 words, conversational hook",
  "mainSection": {
    "type": "trends" or "education",
    "title": "Section heading",
    "body": "800-1000 words. Use \\n\\n for paragraph breaks."
  },
  "secondarySection": {
    "type": "trends" or "education",
    "title": "Section heading",
    "body": "300-400 words. Use \\n\\n for paragraph breaks."
  },
  "featuredPartner": {
    "lenderName": "${featuredLender.name}",
    "lenderSlug": "${featuredLender.slug}",
    "body": "~150 words, informative not salesy"
  },
  "blogHighlights": [
    { "title": "Post Title", "slug": "post-slug", "oneLiner": "Why this is worth reading" }
  ],
  "closingNote": "1-2 sentence personal sign-off",
  "ctaText": "Button text for main CTA",
  "ctaUrl": "${siteUrl}/calculators?utm_source=newsletter&utm_medium=email&utm_campaign=weekly&utm_content=${weekLabel}"
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 6144,
    temperature: 0.7,
    system: NEWSLETTER_SYSTEM,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude for newsletter generation");
  }

  let jsonText = textBlock.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(jsonText) as NewsletterContent;
}
