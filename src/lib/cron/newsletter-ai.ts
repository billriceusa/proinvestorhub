import OpenAI from "openai";
import type { NewsletterPlan } from "@/data/newsletter-calendar";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  return new OpenAI({ apiKey });
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
  featuredArticle: {
    title: string;
    slug: string;
    spotlight: string;
  };
  quickTips: {
    title: string;
    body: string;
  }[];
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

const NEWSLETTER_SYSTEM = `You are Bill Rice, a real estate investor and business strategist with 20+ years of experience, and the author of the ProInvestorHub weekly newsletter. You write with authority, warmth, and specificity — like a successful mentor sharing hard-won lessons at a real estate meetup.

Newsletter Context:
- Audience: real estate investors (beginners to intermediate), house flippers, rental property owners, BRRRR practitioners, wholesalers, and aspiring landlords
- Goal: deliver weekly value that keeps readers engaged, drives traffic to proinvestorhub.com blog content and calculators, and positions ProInvestorHub as the go-to resource for real estate investing education
- Tone: direct, practical, data-driven — never salesy or generic
- Every tip should include specific numbers, formulas, deal examples, or frameworks the reader can use TODAY
- The newsletter should feel like getting investing advice from the smartest person at a local REIA meeting who also happens to be generous with their knowledge`;

export async function generateNewsletterContent(
  plan: NewsletterPlan | null,
  recentPosts: RecentPost[],
  siteUrl: string,
  weekLabel: string
): Promise<NewsletterContent> {
  const client = getOpenAIClient();

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

  const prompt = `Write the content for this week's ProInvestorHub newsletter.

${planContext}

## This Week's Blog Posts (to feature and digest)
${postsContext || "No blog posts published this week yet — focus on exclusive content and evergreen tips."}

## Site URL
${siteUrl}

## Week Of
${weekLabel}

## Requirements
1. Subject line: compelling, specific, under 60 characters — avoid spam triggers
2. Preview text: the snippet shown in inbox previews, under 90 characters
3. Personal intro: 2-3 short paragraphs from Bill, referencing the theme and setting up the newsletter. Be specific about what happened this week in real estate markets or what readers should focus on.
4. Featured article: pick the BEST blog post from this week's content. Write a 2-3 sentence spotlight that makes readers want to click.
5. Quick tips: 3 exclusive, actionable tips NOT published on the blog. Each should be self-contained and immediately useful. Include specific numbers, formulas, or deal analysis frameworks.
6. Industry insight: a timely data point, trend, or observation about the real estate investing market
7. Weekly digest: one-line summaries for each blog post published this week
8. Closing note: 1-2 sentence personal sign-off
9. CTA: text for the main call-to-action button (drives to calculators or guides on proinvestorhub.com)

Respond with valid JSON:
{
  "subject": "Subject line here",
  "previewText": "Preview text here",
  "personalIntro": "Multi-paragraph intro with line breaks as \\n\\n",
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

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: NEWSLETTER_SYSTEM },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI for newsletter generation");

  return JSON.parse(content) as NewsletterContent;
}
