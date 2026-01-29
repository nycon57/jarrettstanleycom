import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Log config for debugging
console.log('Sanity config:', { projectId, dataset, apiVersion })

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN during development to see fresh content
  // Use the token if available (for draft content)
  token: process.env.SANITY_API_TOKEN,
})
