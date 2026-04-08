import { createClient } from "next-sanity";
import type { GeneratedArticle } from "./types";
import type { NewsletterContent } from "./newsletter-ai";
import { sectionsToPortableText } from "./ai-content";

function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

  if (!projectId || !token) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN"
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-14",
    token,
    useCdn: false,
  });
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

function ref(id: string) {
  return { _type: "reference", _ref: id, _key: randomKey() };
}

const PILLAR_CATEGORY_MAP: Record<string, string> = {
  "Investment Strategies": "cat-strategies",
  "Market Analysis": "cat-markets",
  "Financing & Deals": "cat-financing",
  "Property Management": "cat-analysis",
  "Tools & Calculators": "cat-analysis",
};

export async function getExistingPostSlugs(): Promise<string[]> {
  const client = getSanityWriteClient();
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "post"]{ "slug": slug.current }`
  );
  return posts.map((p) => p.slug);
}

export async function getGlossaryTermSlugs(): Promise<string[]> {
  const client = getSanityWriteClient();
  const terms = await client.fetch<{ slug: string }[]>(
    `*[_type == "glossaryTerm"]{ "slug": slug.current }`
  );
  return terms.map((t) => t.slug);
}

export async function getCategorySlugs(): Promise<string[]> {
  const client = getSanityWriteClient();
  const categories = await client.fetch<{ slug: string }[]>(
    `*[_type == "category"]{ "slug": slug.current }`
  );
  return categories.map((c) => c.slug);
}

export async function publishArticle(
  article: GeneratedArticle
): Promise<{ id: string; slug: string }> {
  const client = getSanityWriteClient();
  const postId = `post-${article.brief.slug}`;

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "post" && _id == $id][0]{ _id }`,
    { id: postId }
  );
  if (existing) {
    console.log(`Post already exists: ${postId}, skipping`);
    return { id: postId, slug: article.brief.slug };
  }

  const categoryId =
    PILLAR_CATEGORY_MAP[article.brief.pillar] || "cat-strategies";

  const publishedAt = new Date(
    article.brief.publishDate + "T09:00:00Z"
  ).toISOString();

  const doc = {
    _id: postId,
    _type: "post" as const,
    title: article.brief.title,
    slug: { _type: "slug" as const, current: article.brief.slug },
    excerpt: article.excerpt,
    publishedAt,
    contentType: article.contentType,
    isFeatured: false,
    author: ref("author-bill-rice"),
    categories: [ref(categoryId)],
    seo: {
      metaTitle: article.seoTitle,
      metaDescription: article.seoDescription,
    },
    body: sectionsToPortableText(article.sections),
    sources: (article.sources || []).map((s) => ({
      _type: "source",
      _key: randomKey(),
      title: s.title,
      url: s.url,
      publisher: s.publisher,
      dateAccessed: new Date().toISOString().split("T")[0],
    })),
  };

  await client.createOrReplace(doc);
  console.log(`Published: ${article.brief.title}`);

  return { id: postId, slug: article.brief.slug };
}

export async function publishNewsletterIssue(
  content: NewsletterContent,
  html: string,
  weekLabel: string,
  issueNumber: number
): Promise<{ id: string; slug: string }> {
  const client = getSanityWriteClient();
  const slug = weekLabel;
  const docId = `newsletter-${slug}`;

  const doc = {
    _id: docId,
    _type: "newsletterIssue" as const,
    issueNumber,
    subject: content.subject,
    slug: { _type: "slug" as const, current: slug },
    publishedAt: new Date(weekLabel + "T09:00:00Z").toISOString(),
    previewText: content.previewText,
    excerpt: content.personalIntro.substring(0, 200),
    contentJson: JSON.stringify(content),
    emailHtml: html,
    seo: {
      metaTitle: `${content.subject} | ProInvestorHub Newsletter`,
      metaDescription: content.previewText,
    },
  };

  await client.createOrReplace(doc);
  console.log(`Published newsletter: ${content.subject} → /newsletter/${slug}`);

  return { id: docId, slug };
}
