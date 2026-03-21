import { defineType, defineField, defineArrayMember } from 'sanity'

export const simpleTable = defineType({
  name: 'simpleTable',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { rows: 'rows' },
    prepare({ rows }) {
      const firstRow = rows?.[0]?.cells?.join(' | ') ?? 'Empty table'
      return { title: `Table (${rows?.length ?? 0} rows)`, subtitle: firstRow }
    },
  },
})
