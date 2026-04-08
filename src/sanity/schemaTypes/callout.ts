import { defineField, defineType } from 'sanity'

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Key Concept', value: 'key-concept' },
          { title: 'Pro Tip', value: 'pro-tip' },
          { title: 'Warning', value: 'warning' },
          { title: 'Example', value: 'example' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', type: 'type' },
    prepare({ title, type }) {
      const labels: Record<string, string> = {
        'key-concept': 'Key Concept',
        'pro-tip': 'Pro Tip',
        warning: 'Warning',
        example: 'Example',
      }
      return {
        title: title || labels[type] || 'Callout',
        subtitle: labels[type] || type,
      }
    },
  },
})
