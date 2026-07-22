'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { isSanityProjectConfigured, sanityProjectId } from './src/lib/sanity/config'

export { isSanityProjectConfigured }
const projectId = sanityProjectId || 'missing-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'jarrettstanley-studio',
  title: 'Jarrett Stanley Blog CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
