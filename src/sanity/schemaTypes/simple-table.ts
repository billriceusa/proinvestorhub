import { defineType, defineField, defineArrayMember } from 'sanity'

export const simpleTable = defineType({
  name: 'simpleTable',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption shown above the table.',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      description: 'First row is treated as the header.',
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
    select: { caption: 'caption', rows: 'rows' },
    prepare({ caption, rows }) {
      const firstRow = rows?.[0]?.cells?.join(' | ') ?? 'Empty table'
      return {
        title: caption || `Table (${rows?.length ?? 0} rows)`,
        subtitle: firstRow,
      }
    },
  },
})
