import { defineType, defineField, defineArrayMember } from 'sanity'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning('Keep under 200 characters'),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'guideType',
      title: 'Guide Type',
      type: 'string',
      options: {
        list: [
          { title: 'Strategy Guide', value: 'strategy' },
          { title: 'Comparison', value: 'comparison' },
          { title: 'How-To', value: 'how-to' },
          { title: 'Market Analysis', value: 'market' },
        ],
      },
      initialValue: 'strategy',
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: '5-8 main points readers will learn',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'sources',
      title: 'Sources & References',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'source',
          title: 'Source',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url', type: 'url', validation: (r) => r.uri({ scheme: ['http', 'https'] }) }),
            defineField({ name: 'publisher', type: 'string' }),
            defineField({ name: 'dateAccessed', type: 'date' }),
          ],
          preview: { select: { title: 'title', subtitle: 'publisher' } },
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          validation: (r) => r.max(60).warning('Keep under 60 characters'),
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          rows: 3,
          validation: (r) => r.max(160).warning('Keep under 160 characters'),
        }),
      ],
    }),
  ],
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'guideType', media: 'mainImage' },
  },
})
