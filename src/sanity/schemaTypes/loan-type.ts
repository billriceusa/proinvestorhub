import { defineType, defineField } from 'sanity'
import { CreditCardIcon } from '@sanity/icons'

export const loanType = defineType({
  name: 'loanType',
  title: 'Loan Type',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "DSCR Loans", "Hard Money Loans"',
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
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
      description: 'Abbreviated label for cards/tags (e.g. "DSCR", "Hard Money")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Short-Term / Acquisition', value: 'short-term' },
          { title: 'Long-Term / Hold', value: 'long-term' },
          { title: 'Transitional / Hybrid', value: 'transitional' },
          { title: 'Specialty', value: 'specialty' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One-paragraph overview for cards and meta descriptions',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Full Guide Content',
      type: 'blockContent',
      description: 'In-depth educational content about this loan type',
    }),
    defineField({
      name: 'typicalRateRange',
      title: 'Typical Rate Range',
      type: 'string',
      description: 'e.g. "6.5%–8.5%" or "10%–14%"',
    }),
    defineField({
      name: 'typicalLtvRange',
      title: 'Typical LTV Range',
      type: 'string',
      description: 'e.g. "75%–80%" or "65%–75%"',
    }),
    defineField({
      name: 'typicalTermRange',
      title: 'Typical Term Range',
      type: 'string',
      description: 'e.g. "30-year fixed" or "6–24 months"',
    }),
    defineField({
      name: 'typicalMinCredit',
      title: 'Typical Minimum Credit Score',
      type: 'string',
      description: 'e.g. "620–680" or "None / Flexible"',
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Who this loan type is ideal for (e.g. "Buy-and-hold investors", "First-time flippers")',
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
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedStrategies',
      title: 'Related Investment Strategies',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Cash Flow', value: 'cash-flow' },
          { title: 'BRRRR', value: 'brrrr' },
          { title: 'House Hacking', value: 'house-hacking' },
          { title: 'Fix & Flip', value: 'fix-flip' },
          { title: 'Appreciation', value: 'appreciation' },
          { title: 'New Construction', value: 'new-construction' },
          { title: 'Short-Term Rental', value: 'str' },
          { title: 'Wholesale', value: 'wholesale' },
        ],
      },
    }),
    defineField({
      name: 'relatedCalculator',
      title: 'Related Calculator',
      type: 'string',
      description: 'URL path to the most relevant calculator (e.g. "/calculators/mortgage")',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first on the directory hub',
      initialValue: 50,
    }),
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
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        'short-term': 'Short-Term / Acquisition',
        'long-term': 'Long-Term / Hold',
        transitional: 'Transitional / Hybrid',
        specialty: 'Specialty',
      }
      return { title, subtitle: categoryLabels[subtitle] || subtitle }
    },
  },
})
