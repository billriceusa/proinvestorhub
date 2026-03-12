import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Create a project at https://www.sanity.io/manage and add the ID to .env.local'
  )
}

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2026-03-12',
  useCdn: true,
})
