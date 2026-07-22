import { createClient } from 'next-sanity';
import { sanityProjectId } from './config';

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = sanityProjectId ?
createClient({
  projectId: sanityProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
}) :
null;
