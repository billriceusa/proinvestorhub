import { defineType, defineField, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const marketCity = defineType({
  name: 'marketCity',
  title: 'Market City',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'Two-letter abbreviation (e.g. MI, OH)',
      validation: (rule) => rule.required().max(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'medianHomePrice',
      title: 'Median Home Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'medianRent',
      title: 'Median Rent',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'avgCapRate',
      title: 'Average Cap Rate (%)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rentToPrice',
      title: 'Rent-to-Price Ratio',
      type: 'number',
      description: 'Monthly rent / home price (e.g. 0.0124)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'population',
      title: 'Population',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'populationGrowth',
      title: 'Population Growth (%)',
      type: 'number',
      description: 'Percent change over last decade',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'medianHouseholdIncome',
      title: 'Median Household Income',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'vacancyRate',
      title: 'Vacancy Rate (%)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'propertyTaxRate',
      title: 'Property Tax Rate (%)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'investorTakeaway',
      title: 'Investor Takeaway',
      type: 'text',
      rows: 4,
      description: 'Editorial summary for this market',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'neighborhoods',
      title: 'Top Neighborhoods',
      type: 'array',
      description: 'Key neighborhoods for real estate investors in this market',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'neighborhood',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, description: 'Why this neighborhood matters for investors' }),
            defineField({
              name: 'investorProfile',
              title: 'Best For',
              type: 'string',
              options: {
                list: [
                  { title: 'Cash Flow', value: 'cash-flow' },
                  { title: 'BRRRR', value: 'brrrr' },
                  { title: 'House Hacking', value: 'house-hacking' },
                  { title: 'Appreciation', value: 'appreciation' },
                  { title: 'Mixed', value: 'mixed' },
                ],
                layout: 'dropdown',
              },
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'investorProfile' },
          },
        }),
      ],
    }),
    defineField({
      name: 'dataUpdatedAt',
      title: 'Data Updated At',
      type: 'datetime',
      description: 'When the market data was last refreshed from public sources',
    }),
    defineField({
      name: 'dataSources',
      title: 'Data Sources',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Which APIs/sources contributed to this data (e.g. Census ACS, HUD FMR, FRED)',
    }),
  ],
  orderings: [
    {
      title: 'Cap Rate (High to Low)',
      name: 'capRateDesc',
      by: [{ field: 'avgCapRate', direction: 'desc' }],
    },
    {
      title: 'City A-Z',
      name: 'cityAsc',
      by: [{ field: 'city', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'state',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title}, ${subtitle}`,
        subtitle: `Market Data`,
      }
    },
  },
})
