import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "next-sanity";
import { sectionsToPortableText } from "@/lib/cron/ai-content";
import type { ArticleSection, ArticleSourceReference } from "@/lib/cron/types";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const COMPARISONS = [
  {
    slug: "brrrr-vs-buy-and-hold",
    title: "BRRRR vs Buy-and-Hold: Which Strategy Builds Wealth Faster?",
    strategies: ["BRRRR", "Buy-and-Hold"],
    difficulty: "intermediate",
    primaryKeyword: "BRRRR vs buy and hold",
  },
  {
    slug: "house-hacking-vs-traditional-rental",
    title: "House Hacking vs Traditional Rental: First-Time Investor Guide",
    strategies: ["House Hacking", "Traditional Rental"],
    difficulty: "beginner",
    primaryKeyword: "house hacking vs rental property",
  },
  {
    slug: "fix-and-flip-vs-brrrr",
    title: "Fix and Flip vs BRRRR: Short-Term Profit vs Long-Term Wealth",
    strategies: ["Fix & Flip", "BRRRR"],
    difficulty: "intermediate",
    primaryKeyword: "fix and flip vs BRRRR",
  },
  {
    slug: "cash-flow-vs-appreciation",
    title: "Cash Flow vs Appreciation: Which Investment Strategy Wins?",
    strategies: ["Cash Flow Investing", "Appreciation Investing"],
    difficulty: "beginner",
    primaryKeyword: "cash flow vs appreciation real estate",
  },
  {
    slug: "short-term-rental-vs-long-term-rental",
    title: "Short-Term Rentals vs Long-Term Rentals: Airbnb or Tenants?",
    strategies: ["Short-Term Rental (STR)", "Long-Term Rental"],
    difficulty: "intermediate",
    primaryKeyword: "short term rental vs long term rental",
  },
  {
    slug: "wholesale-vs-fix-and-flip",
    title: "Wholesale vs Fix and Flip: No Money Down vs Hands-On Profit",
    strategies: ["Wholesaling", "Fix & Flip"],
    difficulty: "beginner",
    primaryKeyword: "wholesale vs fix and flip real estate",
  },
];

function getSanityWriteClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2026-03-14",
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
    useCdn: false,
  });
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

async function generateComparison(
  comp: (typeof COMPARISONS)[number]
): Promise<{
  sections: ArticleSection[];
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keyTakeaways: string[];
  sources: ArticleSourceReference[];
}> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const prompt = `Write a comprehensive comparison guide: "${comp.title}"

Compare ${comp.strategies[0]} vs ${comp.strategies[1]} for real estate investors.

## Voice
Write as Bill Rice — 30+ year mortgage lending veteran, active real estate investor who is still learning. Lending topics: speak with authority. Investing topics: speak as a curious peer sharing what you've found.

## Structure (use these exact H2 headings)
1. Quick Summary (2-3 sentence overview of each strategy)
2. How ${comp.strategies[0]} Works (3-4 paragraphs with a worked example using "Let's say...")
3. How ${comp.strategies[1]} Works (3-4 paragraphs with a worked example)
4. Side-by-Side Comparison (cover: Capital Required, Time Commitment, Risk Level, Cash Flow, Scalability, Best For)
5. When to Choose ${comp.strategies[0]} (2-3 specific scenarios)
6. When to Choose ${comp.strategies[1]} (2-3 specific scenarios)
7. Can You Combine Both? (1-2 paragraphs on hybrid approaches)
8. The Bottom Line

## Requirements
- 2,500-3,500 words total
- Use specific numbers in examples (purchase prices, rents, returns)
- Frame examples as hypothetical: "Let's say..." not "I did..."
- Include 5-8 external source references (Federal Reserve, NAR, Census, Zillow, etc.)
- Primary keyword: "${comp.primaryKeyword}" — use naturally 3-5 times
- Be practical and actionable, not theoretical

CRITICAL: NEVER fabricate personal experiences. Use hypothetical framing or cite public data.

Respond with ONLY this JSON (no markdown fences):
{
  "excerpt": "Under 200 chars summary",
  "seoTitle": "Under 60 chars with keyword",
  "seoDescription": "Under 160 chars with keyword",
  "keyTakeaways": ["5-8 key points readers will learn"],
  "sections": [
    { "text": "paragraph or heading text", "style": "h2 or normal or h3 or blockquote", "links": [{"text": "anchor text", "href": "/internal/link"}] }
  ],
  "sources": [
    { "title": "Source title", "url": "https://...", "publisher": "Organization" }
  ]
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    temperature: 0.7,
    system:
      "You are a real estate investing content writer. Respond with ONLY valid JSON. No markdown, no code fences.",
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  let jsonText = textBlock.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(jsonText);
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sanity = getSanityWriteClient();
  const results: { slug: string; status: string }[] = [];

  for (const comp of COMPARISONS) {
    const docId = `guide-${comp.slug}`;

    // Check if already exists
    const existing = await sanity.fetch<{ _id: string } | null>(
      `*[_type == "guide" && _id == $id][0]{ _id }`,
      { id: docId }
    );

    if (existing) {
      results.push({ slug: comp.slug, status: "exists" });
      continue;
    }

    try {
      console.log(`[Guides] Generating: ${comp.title}`);
      const content = await generateComparison(comp);

      const doc = {
        _id: docId,
        _type: "guide" as const,
        title: comp.title,
        slug: { _type: "slug" as const, current: comp.slug },
        author: { _type: "reference" as const, _ref: "author-bill-rice" },
        publishedAt: new Date().toISOString(),
        excerpt: content.excerpt,
        difficulty: comp.difficulty,
        guideType: "comparison",
        keyTakeaways: content.keyTakeaways,
        body: sectionsToPortableText(content.sections),
        sources: (content.sources || []).map((s) => ({
          _type: "source",
          _key: randomKey(),
          title: s.title,
          url: s.url,
          publisher: s.publisher,
          dateAccessed: new Date().toISOString().split("T")[0],
        })),
        categories: [
          { _type: "reference" as const, _ref: "cat-strategies", _key: randomKey() },
        ],
        seo: {
          metaTitle: content.seoTitle,
          metaDescription: content.seoDescription,
        },
      };

      await sanity.createOrReplace(doc);
      console.log(`[Guides] Published: ${comp.slug}`);
      results.push({ slug: comp.slug, status: "published" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[Guides] Failed ${comp.slug}:`, msg);
      results.push({ slug: comp.slug, status: `error: ${msg}` });
    }
  }

  return NextResponse.json({
    success: true,
    results,
  });
}
