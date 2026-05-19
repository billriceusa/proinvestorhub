/**
 * Backfill pillar→category mapping after the cat-analysis collision fix.
 *
 * Before this fix, sanity-publish.ts mapped BOTH "Property Management" and
 * "Tools & Calculators" pillars to `cat-analysis` (Deal Analysis). The code
 * fix points them at the new `cat-property-management` and `cat-tools`
 * categories. This script:
 *
 *   1. Ensures the two new category documents exist (idempotent).
 *   2. Reads EDITORIAL_CALENDAR — the source of pillar truth — to find the
 *      exact slugs that belong to those two pillars (no guessing; we do NOT
 *      re-tag every cat-analysis post, only ones provably from these pillars).
 *   3. Re-tags the matching published posts to the correct category.
 *
 * Dry-run by default. Pass --apply to write to Sanity.
 *
 *   npx tsx --env-file=.env.local scripts/backfill-pillar-categories.ts
 *   npx tsx --env-file=.env.local scripts/backfill-pillar-categories.ts --apply
 */
import { createClient } from "@sanity/client";
import { EDITORIAL_CALENDAR } from "../src/data/editorial-calendar";

const APPLY = process.argv.includes("--apply");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2026-03-12",
  token,
  useCdn: false,
});

const NEW_CATEGORIES = [
  {
    _id: "cat-property-management",
    _type: "category",
    title: "Property Management",
    slug: { _type: "slug", current: "property-management" },
    description:
      "Tenant screening, leasing, maintenance, evictions, and self-managing vs. hiring a property manager.",
  },
  {
    _id: "cat-tools",
    _type: "category",
    title: "Tools & Calculators",
    slug: { _type: "slug", current: "tools" },
    description:
      "Deal calculators, analysis spreadsheets, and tools for evaluating real estate investments.",
  },
];

// Mirrors PILLAR_CATEGORY_MAP in src/lib/cron/sanity-publish.ts for the two
// previously-colliding pillars.
const PILLAR_FIX: Record<string, string> = {
  "Property Management": "cat-property-management",
  "Tools & Calculators": "cat-tools",
};

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

async function main() {
  console.log(
    `\nPillar→category backfill — ${APPLY ? "APPLY (will write)" : "DRY RUN (no writes)"}\n`
  );

  // 1. Ensure new category docs exist.
  for (const cat of NEW_CATEGORIES) {
    const existing = await client.fetch(`*[_id == $id][0]._id`, { id: cat._id });
    if (existing) {
      console.log(`category ${cat._id} — already exists`);
    } else if (APPLY) {
      await client.createIfNotExists(cat);
      console.log(`category ${cat._id} — CREATED`);
    } else {
      console.log(`category ${cat._id} — would CREATE`);
    }
  }

  // 2. Affected slugs from the editorial calendar (source of pillar truth).
  const affected = EDITORIAL_CALENDAR.filter(
    (b) => PILLAR_FIX[b.pillar]
  ).map((b) => ({
    slug: b.slug,
    pillar: b.pillar,
    correctCat: PILLAR_FIX[b.pillar],
  }));

  console.log(
    `\n${affected.length} briefs in affected pillars (Property Management, Tools & Calculators)\n`
  );

  let patched = 0;
  let alreadyOk = 0;
  let notPublished = 0;

  for (const a of affected) {
    const postId = `post-${a.slug}`;
    const post = await client.fetch<{
      _id: string;
      title: string;
      cats: string[] | null;
    } | null>(
      `*[_id == $id][0]{ _id, title, "cats": categories[]._ref }`,
      { id: postId }
    );

    if (!post) {
      notPublished++;
      console.log(`  - ${a.slug} — not published yet (skip)`);
      continue;
    }

    const cats = post.cats ?? [];
    const isCorrect = cats.length === 1 && cats[0] === a.correctCat;
    if (isCorrect) {
      alreadyOk++;
      console.log(`  ✓ ${a.slug} — already ${a.correctCat}`);
      continue;
    }

    console.log(
      `  → ${a.slug} — [${cats.join(", ") || "none"}] ⇒ [${a.correctCat}]  (${a.pillar})`
    );
    if (APPLY) {
      await client
        .patch(postId)
        .set({
          categories: [
            { _type: "reference", _ref: a.correctCat, _key: randomKey() },
          ],
        })
        .commit();
    }
    patched++;
  }

  console.log(
    `\nSummary: ${patched} ${APPLY ? "patched" : "to patch"}, ${alreadyOk} already correct, ${notPublished} not published.\n`
  );
  if (!APPLY && patched > 0) {
    console.log("Re-run with --apply to write these changes.\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
