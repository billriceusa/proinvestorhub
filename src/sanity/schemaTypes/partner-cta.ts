import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const partnerCta = defineType({
  name: 'partnerCta',
  title: 'Partner CTA',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'vertical',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Find a Lender (DSCR, Hard Money, etc.)', value: 'lenders' },
          { title: 'Find an Investor-Friendly Agent', value: 'agents' },
          { title: 'Find a Tax Professional', value: 'tax' },
          { title: 'Find a Financial Advisor', value: 'finance' },
          { title: 'Find a Property Manager', value: 'property-managers' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Custom Heading',
      type: 'string',
      description: 'Optional. Leave blank to use the default heading for this vertical.',
    }),
    defineField({
      name: 'description',
      title: 'Custom Description',
      type: 'text',
      rows: 2,
      description: 'Optional. Leave blank to use the default description.',
    }),
  ],
  preview: {
    select: { vertical: 'vertical', heading: 'heading' },
    prepare({ vertical, heading }) {
      const labels: Record<string, string> = {
        lenders: 'Lender CTA',
        agents: 'Agent CTA',
        tax: 'Tax Pro CTA',
        finance: 'Finance Pro CTA',
        'property-managers': 'Property Manager CTA',
      }
      return {
        title: heading || labels[vertical] || 'Partner CTA',
        subtitle: `BiggerPockets → ${vertical}`,
      }
    },
  },
})
