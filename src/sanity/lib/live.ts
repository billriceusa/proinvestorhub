import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { cleanSecret } from '@/lib/env'

const readToken = cleanSecret(process.env.SANITY_API_READ_TOKEN)

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2026-03-12' }),
  serverToken: readToken,
  browserToken: readToken,
})
