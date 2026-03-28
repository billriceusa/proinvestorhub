'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from '@/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eytfm25g'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      S.listItem()
        .title('Lender Directory')
        .child(
          S.list()
            .title('Lender Directory')
            .items([
              S.documentTypeListItem('lender').title('Lenders'),
              S.documentTypeListItem('loanType').title('Loan Types'),
            ])
        ),
      S.documentTypeListItem('marketCity').title('Market Cities'),
      S.documentTypeListItem('glossaryTerm').title('Glossary'),
      S.divider(),
      S.documentTypeListItem('siteSettings').title('Site Settings'),
    ])

export default defineConfig({
  name: 'proinvestorhub',
  title: 'ProInvestorHub',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
