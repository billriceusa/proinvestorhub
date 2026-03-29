import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterPlan } from "@/data/newsletter-calendar";
import type { EducationTopic } from "@/data/newsletter-education";

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
  newsUpdate: {
    headline: string;
    items: {
      title: string;
      body: string;
    }[];
  };
  featuredArticle: {
    title: string;
    slug: string;
    spotlight: string;
  };
  quickTips: {
    title: string;
    body: string;
  }[];
  education: {
    weekNumber: number;
    totalWeeks: number;
    phase: string;
    topic: string;
    body: string;
    keyTakeaway: string;
    practicePrompt: string;
    relatedGlossaryTerms: { term: string; slug: string }[];
    relatedCalculators: { name: string; href: string }[];
  };
  industryInsight: {
    headline: string;
    body: string;
  };
  weeklyDigest: {
    title: string;
    slug: string;
    oneLiner: string;
  }[];
  closingNote: string;
  ctaText: string;
  ctaUrl: string;
}

const NEWSLETTER_SYSTEM = `You are Bill Rice, a real estate investor and business strategist with 20+ years of experience, and the author of the ProInvestorHub weekly newsletter. You write with authority, warmth, and specificity.

Newsletter Context:
- Audience: real estate investors (beginners to intermediate), house flippers, rental property owners, BRRRR practitioners, wholesalers, and aspiring landlords
- Goal: deliver weekly value that keeps readers engaged, drives traffic to proinvestorhub.com blog content and calculators, and positions ProInvestorHub as the go-to resource for real estate investing education
- Tone: direct, practical, data-driven — never salesy or generic
- Every tip should be actionable with specific frameworks or publicly verifiable data points
- The newsletter should feel like practical, generous investing education

CRITICAL CONTENT INTEGRITY RULES — NEVER VIOLATE THESE:
- NEVER fabricate personal experiences, anecdotes, or case studies attributed to Bill Rice or any named person
- NEVER write "I did X", "I experienced X", "A client of mine...", "I've seen...", or "In my experience..." followed by invented specifics
- NEVER invent specific dollar amounts, penalties, percentages, or statistics and present them as factual
- You MAY use clearly hypothetical examples ("Let's say you find a duplex listed at...", "Consider a scenario where...")
- You MAY cite publicly available data WITH source URLs
- You MAY reference Bill's verifiable background: 30+ years in mortgage/marketing and real estate, founder of BRSG and Kaleidico
- You MAY use general industry patterns: "Many investors find...", "A common pattern is..."
- When in doubt, frame as hypothetical rather than as personal experience
- Making up stories and presenting them as real experiences is LYING — it destroys credibility

IMPORTANT: You must respond with ONLY valid JSON. No markdown, no code fences, no explanation — just the JSON object.`;

export async function generateNewsletterContent(
  plan: NewsletterPlan | null,
  recentPosts: RecentPost[],
  siteUrl: string,
  weekLabel: string,
  educationTopic: EducationTopic
): Promise<NewsletterContent> {
  const client = getAnthropicClient();

  const postsContext = recentPosts
    .map(
      (p) =>
        `- "${p.title}" (${p.publishedAt}) — ${p.excerpt} [slug: ${p.slug}]`
    )
    .join("\n");

  const planContext = plan
    ? `
## Newsletter Calendar Plan for This Week
- Theme: ${plan.theme}
- Focus Vertical: ${plan.focusVertical}
- Planned Exclusive Tip Topics: ${plan.exclusiveTipTopics.join("; ")}
${plan.specialHook ? `- Special Hook: ${plan.specialHook}` : ""}

Follow this plan as a guide, but feel free to adjust if the blog content this week suggests a stronger angle.`
    : `
## No Pre-Planned Newsletter for This Week
Research what's most relevant for our audience right now and create a compelling theme. Consider seasonal factors, market trends, interest rate changes, or timely real estate topics.`;

  const educationContext = `
## RE Investing 101 — Education Section
This week's topic: "${educationTopic.topic}"
Subtitle: ${educationTopic.subtitle}
Phase ${educationTopic.phase} of 6: ${educationTopic.phaseTitle}
Week ${educationTopic.week} of 24

Key concepts to teach:
${educationTopic.keyConceptsToTeach.map((c) => `- ${c}`).join("\n")}

Related glossary terms to reference: ${educationTopic.linkedGlossaryTerms.join(", ") || "none"}
Related calculators to link: ${educationTopic.linkedCalculators.join(", ") || "none"}`;

  const prompt = `Write the content for this week's ProInvestorHub newsletter.

${planContext}

## This Week's Blog Posts (to feature and digest)
${postsContext || "No blog posts published this week yet — focus on exclusive content and evergreen tips."}

${educationContext}

## Site URL
${siteUrl}

## Week Of
${weekLabel}

## Requirements
1. Subject line: compelling, specific, under 60 characters — avoid spam triggers
2. Preview text: the snippet shown in inbox previews, under 90 characters
3. Personal intro: 2-3 short paragraphs from Bill, referencing the theme and setting up the newsletter. Be specific about what happened this week in real estate markets or what readers should focus on.
4. News update: 3-4 current real estate investing and lending market news items. Cover mortgage rate trends, Fed policy impacts, housing supply/demand shifts, regulatory changes, or notable market data. Each item should have a bold title and 2-3 sentence explanation with specific data points (rates, percentages, dollar amounts). Write these as current market commentary based on general trends and publicly available data.
5. Featured article: pick the BEST blog post from this week's content. Write a 2-3 sentence spotlight that makes readers want to click.
6. Quick tips: 3 exclusive, actionable tips NOT published on the blog. Each should be self-contained and immediately useful. Include specific numbers, formulas, or deal analysis frameworks.
7. RE Investing 101: Write a progressive education section teaching "${educationTopic.topic}". Write 3-5 paragraphs that explain the concept clearly for beginners with a worked example using real numbers. End with a practice prompt for the reader to try this week. This is week ${educationTopic.week} of a 24-week curriculum — write as if building on previous weeks' knowledge.
8. Industry insight: a timely data point, trend, or observation about the real estate investing market
9. Weekly digest: one-line summaries for each blog post published this week
10. Closing note: 1-2 sentence personal sign-off
11. CTA: text for the main call-to-action button (drives to calculators or guides on proinvestorhub.com)

Respond with ONLY this JSON structure (no markdown, no code fences):
{
  "subject": "Subject line here",
  "previewText": "Preview text here",
  "personalIntro": "Multi-paragraph intro with line breaks as \\n\\n",
  "newsUpdate": {
    "headline": "This Week in Real Estate",
    "items": [
      { "title": "Bold news headline", "body": "2-3 sentence explanation with data" },
      { "title": "...", "body": "..." },
      { "title": "...", "body": "..." }
    ]
  },
  "featuredArticle": {
    "title": "Post Title",
    "slug": "post-slug",
    "spotlight": "2-3 sentence spotlight text"
  },
  "quickTips": [
    { "title": "Short tip title", "body": "2-4 sentence actionable tip" },
    { "title": "...", "body": "..." },
    { "title": "...", "body": "..." }
  ],
  "education": {
    "weekNumber": ${educationTopic.week},
    "totalWeeks": 24,
    "phase": "${educationTopic.phaseTitle}",
    "topic": "${educationTopic.topic}",
    "body": "3-5 paragraph teaching section with worked example. Use \\n\\n for paragraph breaks.",
    "keyTakeaway": "One sentence the reader should remember from this lesson",
    "practicePrompt": "This week, try... (specific action the reader can take to practice this concept)",
    "relatedGlossaryTerms": [${educationTopic.linkedGlossaryTerms.map((s) => `{ "term": "${s.replace(/-/g, " ")}", "slug": "${s}" }`).join(", ")}],
    "relatedCalculators": [${educationTopic.linkedCalculators.map((c) => `{ "name": "${c.split("/").pop()?.replace(/-/g, " ")}", "href": "${c}" }`).join(", ")}]
  },
  "industryInsight": {
    "headline": "Short headline",
    "body": "2-3 sentence insight with a specific data point or trend"
  },
  "weeklyDigest": [
    { "title": "Post Title", "slug": "post-slug", "oneLiner": "Brief summary" }
  ],
  "closingNote": "Personal sign-off",
  "ctaText": "Button text",
  "ctaUrl": "${siteUrl}/calculators?utm_source=proinvestorhub&utm_medium=email&utm_campaign=weekly-newsletter&utm_content=${weekLabel}"
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    temperature: 0.75,
    system: NEWSLETTER_SYSTEM,
    messages: [
      { role: "user", content: prompt },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude for newsletter generation");
  }

  // Strip any markdown fences
  let jsonText = textBlock.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(jsonText) as NewsletterContent;
}
