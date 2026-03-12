import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Short Definition',
      type: 'text',
      rows: 3,
      description: 'A concise definition (1-2 sentences) for previews and SEO',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Full Explanation',
      type: 'blockContent',
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'glossaryTerm' }],
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Financing', value: 'financing' },
          { title: 'Analysis', value: 'analysis' },
          { title: 'Legal', value: 'legal' },
          { title: 'Property Types', value: 'property-types' },
          { title: 'Strategies', value: 'strategies' },
          { title: 'Tax', value: 'tax' },
          { title: 'General', value: 'general' },
        ],
        layout: 'dropdown',
      },
    }),
  ],
  orderings: [
    {
      title: 'Term A-Z',
      name: 'termAsc',
      by: [{ field: 'term', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'term',
      subtitle: 'definition',
    },
  },
})
