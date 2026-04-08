import { defineField, defineType } from 'sanity'

export const inlineCta = defineType({
  name: 'inlineCta',
  title: 'Inline CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'ctaType',
      title: 'CTA Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lead Magnet (Deal Checklist)', value: 'lead-magnet' },
          { title: 'Newsletter Signup', value: 'newsletter' },
          { title: 'Calculator CTA', value: 'calculator' },
          { title: 'Find a Lender', value: 'lender-finder' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Custom Heading',
      type: 'string',
      description: 'Optional — overrides the default heading for this CTA type',
    }),
    defineField({
      name: 'description',
      title: 'Custom Description',
      type: 'string',
      description: 'Optional — overrides the default description',
    }),
  ],
  preview: {
    select: { ctaType: 'ctaType', heading: 'heading' },
    prepare({ ctaType, heading }) {
      const labels: Record<string, string> = {
        'lead-magnet': 'Lead Magnet CTA',
        newsletter: 'Newsletter CTA',
        calculator: 'Calculator CTA',
        'lender-finder': 'Lender Finder CTA',
      }
      return {
        title: heading || labels[ctaType] || 'Inline CTA',
        subtitle: labels[ctaType] || ctaType,
      }
    },
  },
})
