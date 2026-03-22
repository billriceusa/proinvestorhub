import Anthropic from "@anthropic-ai/sdk";
import type { ContentBrief } from "@/data/editorial-calendar";
import type {
  ContentPlan,
  WeeklyBrief,
  GeneratedArticle,
  ArticleSection,
  ArticleSourceReference,
} from "./types";

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

function extractJson(response: Anthropic.Message): string {
  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }
  let text = textBlock.text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return text;
}

const SYSTEM_CONTEXT = `You are the AI content strategist for ProInvestorHub (proinvestorhub.com), an SEO-driven education site that helps real estate investors make smarter decisions through expert guides, calculators, and market analysis.

ICP (Ideal Customer Profile):
- Beginning real estate investors looking to buy their first rental property
- Intermediate investors scaling a portfolio (2-10 properties)
- House flippers evaluating deals and renovation costs
- BRRRR strategy practitioners (Buy, Rehab, Rent, Refinance, Repeat)
- Wholesalers looking for deal analysis and contract strategies
- Rental property investors focused on cash flow and tenant management
- Real estate professionals seeking market data and calculators

Competitors:
- BiggerPockets.com — the dominant community + content platform (broad, community-driven)
- Investopedia Real Estate — definitions and overview content (shallow, not practitioner-focused)
- REtipster.com — land investing and creative strategies (niche, less calculator-focused)

Content Pillars:
1. INVESTMENT STRATEGIES — BRRRR, house flipping, buy-and-hold, wholesale, creative financing
2. MARKET ANALYSIS — Cap rates by city, cash flow analysis, market selection criteria, economic indicators
3. FINANCING & DEALS — Hard money lending, creative financing, deal analysis, underwriting
4. PROPERTY MANAGEMENT — Landlord tips, tenant screening, maintenance budgeting, lease strategies
5. TOOLS & CALCULATORS — ROI calculators, cap rate tools, cash flow analysis, rehab estimators

Content Rules:
- Rotate pillars so no two consecutive posts use the same pillar
- Every post links to 2+ glossary terms, 1+ calculator, and relevant category pages
- Every post has a unique angle NOT covered on BiggerPockets, Investopedia, or REtipster
- All content is authored by Bill Rice with 20+ years of real estate and business experience
- Posts are 2,000-3,500 words with practical, actionable advice
- Tone: authoritative but approachable, data-driven, like a seasoned investor mentoring a newcomer`;

export async function analyzeAndPlan(
  existingPostSlugs: string[],
  editorialCalendar: ContentBrief[],
  glossaryTermSlugs: string[],
  categorySlugs: string[],
  weekDates: { monday: string; wednesday: string; friday: string }
): Promise<ContentPlan> {
  const unpublishedBriefs = editorialCalendar.filter(
    (b) =>
      b.status !== "published" && !existingPostSlugs.includes(b.slug)
  );

  const publishedSlugs = editorialCalendar
    .filter(
      (b) =>
        b.status === "published" || existingPostSlugs.includes(b.slug)
    )
    .map((b) => b.slug);

  const prompt = `Analyze the current state of our content strategy and create a plan for this week.

## Current Content State
- Published posts (${existingPostSlugs.length} total): ${existingPostSlugs.slice(0, 30).join(", ")}
- Editorial calendar briefs not yet published (${unpublishedBriefs.length}): ${unpublishedBriefs.map((b) => `"${b.title}" [${b.pillar}]`).join("; ")}
- Available glossary terms for linking: ${glossaryTermSlugs.slice(0, 40).join(", ")}
- Available category pages for linking: ${categorySlugs.join(", ")}
- Already published from calendar: ${publishedSlugs.join(", ")}

## This Week's Publishing Dates
- Monday: ${weekDates.monday}
- Wednesday: ${weekDates.wednesday}
- Friday: ${weekDates.friday}

## Your Tasks
1. **SEO Strategy Review**: Assess current content gaps and strengths based on our published content vs the full editorial plan.
2. **Competitive Research**: Identify keyword opportunities, trending topics, or new angles in the real estate investing space that we haven't covered. Think about what new investors, flippers, landlords, and BRRRR practitioners are searching for RIGHT NOW.
3. **Content Plan**: Select 3 content briefs for this week. Prefer existing unpublished briefs from the editorial calendar when they're timely and relevant. Create new briefs only if you identify a compelling opportunity that outranks existing options.

Respond with valid JSON matching this structure exactly:
{
  "analysis": {
    "strategyReview": "2-3 paragraph assessment of current content strategy strengths and gaps",
    "competitiveInsights": "2-3 paragraph competitive analysis with specific keyword and topic opportunities",
    "newOpportunities": ["opportunity 1", "opportunity 2", ...],
    "trendingTopics": ["topic 1", "topic 2", ...],
    "recommendedUpdates": ["update 1", "update 2", ...]
  },
  "briefs": [
    {
      "day": "Mon",
      "publishDate": "${weekDates.monday}",
      "slug": "slug-here",
      "title": "Title Here",
      "pillar": "Pillar Name",
      "primaryKeyword": "keyword",
      "secondaryKeywords": ["kw1", "kw2", "kw3"],
      "targetLeadTypes": ["investment-strategies", "market-analysis"],
      "wordCount": "2,500-3,000",
      "competitiveAngle": "What makes this unique vs competitors",
      "outline": ["Section 1 topic", "Section 2 topic", ...],
      "internalLinks": ["/glossary/term", "/calculators/calculator", "/blog/category/slug"]
    },
    { "day": "Wed", ... },
    { "day": "Fri", ... }
  ],
  "calendarNotes": "Summary of calendar decisions and reasoning"
}`;

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    temperature: 0.7,
    system: SYSTEM_CONTEXT,
    messages: [
      { role: "user", content: prompt + "\n\nRespond with ONLY valid JSON (no markdown, no code fences)." },
    ],
  });

  return JSON.parse(extractJson(response)) as ContentPlan;
}

export async function writeArticle(
  brief: WeeklyBrief,
  glossaryTermSlugs: string[],
  categorySlugs: string[]
): Promise<GeneratedArticle> {
  const prompt = `Write a complete blog post based on this content brief.

## Brief
- Title: ${brief.title}
- Primary Keyword: ${brief.primaryKeyword}
- Secondary Keywords: ${brief.secondaryKeywords.join(", ")}
- Pillar: ${brief.pillar}
- Target Word Count: ${brief.wordCount}
- Competitive Angle: ${brief.competitiveAngle}
- Outline: ${brief.outline.map((s, i) => `${i + 1}. ${s}`).join("\n")}
- Internal Links to Include: ${brief.internalLinks.join(", ")}

## Available Internal Links
- Glossary terms: ${glossaryTermSlugs.slice(0, 30).join(", ")}
- Category pages: ${categorySlugs.join(", ")}
- Calculators: /calculators/cap-rate, /calculators/cash-flow, /calculators/roi, /calculators/rehab-estimator

## Writing Requirements
- Write as Bill Rice, 20+ year real estate and business veteran, sharing real experience
- 2,000-3,500 words of substantive, actionable content
- Use specific numbers, examples, case studies, and frameworks — not generic advice
- Naturally incorporate the primary keyword 3-5 times and secondary keywords 1-2 times each
- Reference internal links naturally within the content (mention the topic, readers can find the link)
- Include practical templates, checklists, deal analysis frameworks, or formulas the reader can use immediately
- Tone: authoritative, direct, data-driven — like a seasoned investor mentoring a newcomer

## External Source Citation Requirements
- For every statistical claim, market data point, rate benchmark, or regulatory reference, cite the authoritative source with an inline link
- Target 5-10 external source links per article minimum
- Weave citations naturally into the text (e.g., "According to the Federal Reserve..." or "...per the National Association of Realtors")
- ALWAYS cite the original primary source, not a secondary aggregator
- Approved source categories (prefer in this order):
  1. Government data: Federal Reserve (FRED), Census Bureau, BLS, HUD, FHFA, IRS publications
  2. GSE data: Fannie Mae, Freddie Mac housing surveys and reports
  3. Industry associations: NAR (nar.realtor), MBA, NAHB
  4. Academic/research: Harvard Joint Center for Housing Studies, Urban Institute Housing Finance
  5. Market data providers: Zillow Research, Redfin Data Center, CoreLogic, ATTOM Data
  6. Legal/regulatory: State landlord-tenant statutes, IRS.gov, CFPB
  7. Reputable financial media: Wall Street Journal, Bloomberg (for timely data only)
- For each "normal" paragraph that cites a source, include a "links" array with objects containing "text" (the exact anchor text as it appears in the paragraph) and "href" (the full URL)
- IMPORTANT: The "text" value must be an exact substring of the section "text" — it will be matched using indexOf()

Respond with valid JSON matching this structure:
{
  "excerpt": "2-3 sentence compelling excerpt for the post listing (under 200 chars)",
  "seoTitle": "SEO title under 60 characters with primary keyword",
  "seoDescription": "Meta description under 160 characters with primary keyword",
  "contentType": "pillar" or "cluster",
  "sections": [
    { "text": "Opening paragraph text...", "style": "normal" },
    { "text": "Section Heading", "style": "h2" },
    { "text": "According to the Federal Reserve, current 30-year mortgage rates...", "style": "normal", "links": [{"text": "Federal Reserve", "href": "https://fred.stlouisfed.org/series/MORTGAGE30US"}] },
    { "text": "| Feature | Option A | Option B |\\n|---|---|---|\\n| Rate | 10% | 7% |", "style": "table" },
    ...
  ],
  "sources": [
    { "title": "30-Year Fixed Rate Mortgage Average", "url": "https://fred.stlouisfed.org/series/MORTGAGE30US", "publisher": "Federal Reserve Bank of St. Louis" },
    ...
  ]
}

Write the FULL article with all sections. Each "sections" entry is one paragraph or heading. Use "h2" for main sections, "h3" for subsections, "normal" for body paragraphs, and "table" for comparison/data tables. For tables, use markdown table syntax with pipe-delimited columns and a separator row (e.g. "| Header1 | Header2 |\\n|---|---|\\n| Cell1 | Cell2 |"). Include at least 15-25 sections for a complete article. Include a "sources" array at the end listing all external sources referenced in the article.`;

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 12288,
    temperature: 0.8,
    system: `${SYSTEM_CONTEXT}\n\nYou are now writing as Bill Rice. Write with authority, specificity, and practical examples. Include actual numbers, deal analysis examples, formulas, and frameworks — not vague advice. Every paragraph should teach something actionable. You may use fictional examples and hypothetical scenarios but NEVER present them as real personal experiences.`,
    messages: [
      { role: "user", content: prompt + "\n\nRespond with ONLY valid JSON (no markdown, no code fences)." },
    ],
  });

  const content = extractJson(response);

  const parsed = JSON.parse(content) as {
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    contentType: "pillar" | "cluster";
    sections: ArticleSection[];
    sources?: ArticleSourceReference[];
  };

  return {
    brief,
    ...parsed,
    sources: parsed.sources || [],
  };
}

function parseMarkdownTable(text: string): { rows: { _key: string; cells: string[] }[] } | null {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return null;
  // Check that lines contain pipe-delimited content
  if (!lines[0].includes("|")) return null;

  const parseRow = (line: string): string[] =>
    line.split("|").map((c) => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length);

  const rows: { _key: string; cells: string[] }[] = [];
  for (const line of lines) {
    // Skip separator rows like |---|---|
    if (/^\|?[\s-:|]+\|?$/.test(line)) continue;
    rows.push({ _key: randomKey(), cells: parseRow(line) });
  }
  return rows.length >= 1 ? { rows } : null;
}

export function sectionsToPortableText(
  sections: ArticleSection[]
): Record<string, unknown>[] {
  return sections.map((section) => {
    // Handle explicit table style or detect markdown table syntax
    if (section.style === "table" || (section.text.includes("|") && section.text.includes("\n") && section.text.split("\n").filter((l) => l.trim()).length >= 2)) {
      const table = parseMarkdownTable(section.text);
      if (table) {
        return {
          _type: "simpleTable",
          _key: randomKey(),
          rows: table.rows,
        };
      }
    }

    // If the section has inline links, split text into spans with markDefs
    if (section.links && section.links.length > 0) {
      const markDefs: Record<string, unknown>[] = [];
      const children: Record<string, unknown>[] = [];
      let cursor = 0;

      // Resolve each link's position using indexOf (more reliable than startOffset)
      const resolvedLinks = section.links
        .map((link) => {
          const idx = section.text.indexOf(link.text);
          return idx >= 0 ? { ...link, start: idx, end: idx + link.text.length } : null;
        })
        .filter((l): l is NonNullable<typeof l> => l !== null)
        .sort((a, b) => a.start - b.start);

      for (const link of resolvedLinks) {
        // Skip overlapping links
        if (link.start < cursor) continue;

        // Text before this link
        if (link.start > cursor) {
          children.push({
            _type: "span",
            _key: randomKey(),
            text: section.text.slice(cursor, link.start),
            marks: [],
          });
        }

        // The linked span
        const markKey = randomKey();
        markDefs.push({ _type: "link", _key: markKey, href: link.href });
        children.push({
          _type: "span",
          _key: randomKey(),
          text: link.text,
          marks: [markKey],
        });
        cursor = link.end;
      }

      // Remaining text after last link
      if (cursor < section.text.length) {
        children.push({
          _type: "span",
          _key: randomKey(),
          text: section.text.slice(cursor),
          marks: [],
        });
      }

      // Fallback if no links resolved (e.g., all text mismatches)
      if (children.length === 0) {
        children.push({
          _type: "span",
          _key: randomKey(),
          text: section.text,
          marks: [],
        });
      }

      return {
        _type: "block",
        _key: randomKey(),
        style: section.style === "table" ? "normal" : section.style,
        markDefs,
        children,
      };
    }

    return {
      _type: "block",
      _key: randomKey(),
      style: section.style === "table" ? "normal" : section.style,
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: randomKey(),
          text: section.text,
          marks: [],
        },
      ],
    };
  });
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}
