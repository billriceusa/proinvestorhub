/**
 * Seed script for the Lender Directory.
 * Creates loanType and lender documents in Sanity from seed data.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<your-token> npx tsx scripts/seed-lender-directory.ts
 *
 * To get a write token:
 *   1. Go to https://www.sanity.io/manage/project/eytfm25g
 *   2. Settings → API → Tokens → Add API Token
 *   3. Name: "Seed Script", Permissions: "Editor"
 *
 * Options:
 *   --dry-run     Print what would be created without writing to Sanity
 *   --loan-types  Only seed loan types
 *   --lenders     Only seed lenders (requires loan types to exist)
 */

import { createClient } from '@sanity/client'
import { loanTypes } from '../src/data/loan-types'
import { lenders } from '../src/data/lenders'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

const isDryRun = process.argv.includes('--dry-run')
const onlyLoanTypes = process.argv.includes('--loan-types')
const onlyLenders = process.argv.includes('--lenders')

if (!token && !isDryRun) {
  console.error('Error: SANITY_WRITE_TOKEN environment variable is required.')
  console.error('Set it or use --dry-run to preview without writing.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-12',
  token: token || undefined,
  useCdn: false,
})

// Generate deterministic IDs for reference linking
function loanTypeId(slug: string): string {
  return `loanType-${slug}`
}

function lenderId(slug: string): string {
  return `lender-${slug}`
}

async function seedLoanTypes() {
  console.log(`\n📋 Seeding ${loanTypes.length} loan types...`)

  const transaction = client.transaction()

  for (const lt of loanTypes) {
    const doc = {
      _id: loanTypeId(lt.slug),
      _type: 'loanType' as const,
      name: lt.name,
      slug: { _type: 'slug', current: lt.slug },
      shortName: lt.shortName,
      category: lt.category,
      description: lt.description,
      typicalRateRange: lt.typicalRateRange,
      typicalLtvRange: lt.typicalLtvRange,
      typicalTermRange: lt.typicalTermRange,
      typicalMinCredit: lt.typicalMinCredit,
      bestFor: lt.bestFor,
      pros: lt.pros,
      cons: lt.cons,
      faqs: lt.faqs.map((faq) => ({
        _type: 'faq',
        _key: faq.question.slice(0, 40).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
        question: faq.question,
        answer: faq.answer,
      })),
      relatedStrategies: lt.relatedStrategies,
      relatedCalculator: lt.relatedCalculator,
      sortOrder: lt.sortOrder,
      seo: {
        metaTitle: lt.metaTitle,
        metaDescription: lt.metaDescription,
      },
      // Note: body (blockContent) and heroContent are stored in seed data
      // and would need manual editing in Sanity Studio for rich text
    }

    if (isDryRun) {
      console.log(`  [DRY RUN] Would create: ${doc._id} → ${lt.name}`)
    } else {
      transaction.createOrReplace(doc)
    }
  }

  if (!isDryRun) {
    await transaction.commit()
    console.log(`✅ Created ${loanTypes.length} loan types`)
  }
}

async function seedLenders() {
  console.log(`\n🏦 Seeding ${lenders.length} lenders...`)

  // Verify loan types exist (needed for references)
  if (!isDryRun) {
    const existingLoanTypes = await client.fetch(
      `*[_type == "loanType"]{ _id, "slug": slug.current }`
    )
    const existingSlugs = new Set(existingLoanTypes.map((lt: { slug: string }) => lt.slug))

    const missingLoanTypes = loanTypes.filter((lt) => !existingSlugs.has(lt.slug))
    if (missingLoanTypes.length > 0) {
      console.warn(
        `⚠️  ${missingLoanTypes.length} loan types not found in Sanity. Run with --loan-types first.`
      )
      console.warn(`   Missing: ${missingLoanTypes.map((lt) => lt.slug).join(', ')}`)
    }
  }

  const transaction = client.transaction()

  for (const l of lenders) {
    const doc = {
      _id: lenderId(l.slug),
      _type: 'lender' as const,
      name: l.name,
      slug: { _type: 'slug', current: l.slug },
      website: l.website,
      founded: l.founded,
      headquarters: l.headquarters,
      description: l.description,
      loanTypes: l.loanTypeSlugs.map((ltSlug) => ({
        _type: 'reference',
        _ref: loanTypeId(ltSlug),
        _key: ltSlug,
      })),
      minRate: l.minRate,
      maxRate: l.maxRate,
      maxLtv: l.maxLtv,
      minCreditScore: l.minCreditScore,
      minLoanAmount: l.minLoanAmount,
      maxLoanAmount: l.maxLoanAmount,
      originationFee: l.originationFee,
      speedToClose: l.speedToClose,
      nationwide: l.nationwide,
      propertyTypes: l.propertyTypes,
      experienceRequired: l.experienceRequired,
      allowsLlc: l.allowsLlc,
      interestOnlyAvailable: l.interestOnlyAvailable,
      prepaymentPenalty: l.prepaymentPenalty,
      foreignNational: l.foreignNational,
      bestForTags: l.bestForTags,
      pros: l.pros,
      cons: l.cons,
      editorRating: l.editorRating,
      featured: l.featured,
      seo: {
        metaTitle: l.metaTitle,
        metaDescription: l.metaDescription,
      },
      // Note: editorialReview (blockContent) would need manual editing
      // in Sanity Studio for rich text formatting
    }

    if (isDryRun) {
      console.log(`  [DRY RUN] Would create: ${doc._id} → ${l.name} (${l.loanTypeSlugs.join(', ')})`)
    } else {
      transaction.createOrReplace(doc)
    }
  }

  if (!isDryRun) {
    await transaction.commit()
    console.log(`✅ Created ${lenders.length} lenders`)
  }
}

async function main() {
  console.log('🚀 Lender Directory Seed Script')
  console.log(`   Project: ${projectId} / ${dataset}`)
  if (isDryRun) console.log('   Mode: DRY RUN (no writes)')

  try {
    if (!onlyLenders) await seedLoanTypes()
    if (!onlyLoanTypes) await seedLenders()

    console.log('\n🎉 Done!')
    if (isDryRun) {
      console.log('   This was a dry run. Add SANITY_WRITE_TOKEN and remove --dry-run to write data.')
    } else {
      console.log('   Open Sanity Studio to review and edit the seeded content.')
      console.log('   Loan types and lenders can now be managed through the Studio.')
    }
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  }
}

main()
