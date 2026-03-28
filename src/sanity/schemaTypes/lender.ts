import { defineType, defineField, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const lender = defineType({
  name: 'lender',
  title: 'Lender',
  type: 'document',
  icon: CaseIcon,
  fields: [
    // ── Identity ──────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Lender Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'founded',
      title: 'Founded Year',
      type: 'number',
    }),
    defineField({
      name: 'headquarters',
      title: 'Headquarters',
      type: 'string',
      description: 'e.g. "San Francisco, CA"',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One-paragraph overview for cards and meta descriptions',
      validation: (rule) => rule.required(),
    }),

    // ── Loan Products ─────────────────────────────────
    defineField({
      name: 'loanTypes',
      title: 'Loan Types Offered',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'loanType' }] }],
      validation: (rule) => rule.required().min(1),
    }),

    // ── Lending Parameters ────────────────────────────
    defineField({
      name: 'minRate',
      title: 'Minimum Rate (%)',
      type: 'number',
      description: 'Lowest advertised rate (e.g. 6.5)',
    }),
    defineField({
      name: 'maxRate',
      title: 'Maximum Rate (%)',
      type: 'number',
      description: 'Highest typical rate (e.g. 9.0)',
    }),
    defineField({
      name: 'maxLtv',
      title: 'Max LTV (%)',
      type: 'number',
      description: 'e.g. 80 for 80% LTV',
    }),
    defineField({
      name: 'minCreditScore',
      title: 'Minimum Credit Score',
      type: 'number',
      description: 'Lowest credit score accepted (e.g. 620)',
    }),
    defineField({
      name: 'minLoanAmount',
      title: 'Minimum Loan Amount',
      type: 'number',
      description: 'e.g. 75000',
    }),
    defineField({
      name: 'maxLoanAmount',
      title: 'Maximum Loan Amount',
      type: 'number',
      description: 'e.g. 5000000',
    }),
    defineField({
      name: 'originationFee',
      title: 'Origination Fee',
      type: 'string',
      description: 'e.g. "1–2 points" or "1.5%"',
    }),
    defineField({
      name: 'speedToClose',
      title: 'Speed to Close',
      type: 'string',
      description: 'e.g. "10–14 days" or "21–30 days"',
    }),

    // ── Coverage & Requirements ───────────────────────
    defineField({
      name: 'statesServed',
      title: 'States Served',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Two-letter abbreviations. Leave empty for nationwide.',
    }),
    defineField({
      name: 'nationwide',
      title: 'Nationwide',
      type: 'boolean',
      description: 'Lends in all 50 states (or nearly all)',
      initialValue: false,
    }),
    defineField({
      name: 'propertyTypes',
      title: 'Property Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Single Family (1-4 units)', value: 'sfr' },
          { title: 'Multifamily (5+ units)', value: 'multifamily' },
          { title: 'Mixed Use', value: 'mixed-use' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Short-Term Rental / Airbnb', value: 'str' },
          { title: 'Condo', value: 'condo' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Mobile / Manufactured', value: 'mobile' },
          { title: 'Land', value: 'land' },
          { title: 'New Construction', value: 'new-construction' },
        ],
      },
    }),
    defineField({
      name: 'experienceRequired',
      title: 'Experience Required',
      type: 'string',
      options: {
        list: [
          { title: 'No experience required', value: 'none' },
          { title: '1-2 deals', value: 'beginner' },
          { title: '3-5 deals', value: 'intermediate' },
          { title: '5+ deals', value: 'experienced' },
          { title: 'Varies by product', value: 'varies' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'allowsLlc',
      title: 'Allows LLC / Entity Borrowing',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'interestOnlyAvailable',
      title: 'Interest-Only Option',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'prepaymentPenalty',
      title: 'Prepayment Penalty',
      type: 'string',
      description: 'e.g. "3-2-1 step-down" or "None" or "Varies"',
    }),
    defineField({
      name: 'foreignNational',
      title: 'Foreign National Programs',
      type: 'boolean',
      description: 'Offers programs for non-US citizens',
      initialValue: false,
    }),

    // ── Best-For Tags ─────────────────────────────────
    defineField({
      name: 'bestForTags',
      title: 'Best For Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "First-time investors", "BRRRR strategy", "High-volume flippers"',
    }),

    // ── Editorial Content ─────────────────────────────
    defineField({
      name: 'editorialReview',
      title: 'Editorial Review',
      type: 'blockContent',
      description: "Your expert take on this lender — this is the E-E-A-T differentiator",
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'editorRating',
      title: 'Editor Rating',
      type: 'number',
      description: 'Overall rating out of 5 (e.g. 4.2)',
      validation: (rule) => rule.min(1).max(5),
    }),

    // ── Affiliate / Partner ───────────────────────────
    defineField({
      name: 'affiliateUrl',
      title: 'Affiliate / Referral URL',
      type: 'url',
      description: 'Tracked affiliate link (optional)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Lender',
      type: 'boolean',
      description: 'Show in featured/promoted positions',
      initialValue: false,
    }),

    // ── SEO ───────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Editor Rating (High to Low)',
      name: 'ratingDesc',
      by: [{ field: 'editorRating', direction: 'desc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 80) + '...' : '',
        media,
      }
    },
  },
})
