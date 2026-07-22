const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || ''

export const isSanityProjectConfigured = /^[a-z0-9-]{4,32}$/i.test(configuredProjectId)
export const sanityProjectId = isSanityProjectConfigured ? configuredProjectId : null
