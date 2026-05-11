import { groq } from 'next-sanity';

// Post queries
const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readTimeMinutes,
  isFeatured,
  "author": author->{
    _id,
    name,
    image,
    title,
    company
  },
  "categories": categories[]->{
    _id,
    name,
    slug,
    color
  }
}`;

const paginatedPostsQuery = groq`{
  "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readTimeMinutes,
    isFeatured,
    "author": author->{
      _id,
      name,
      image,
      title,
      company
    },
    "categories": categories[]->{
      _id,
      name,
      slug,
      color
    }
  },
  "totalCount": count(*[_type == "post"])
}`;

// Simple posts query without complex filtering (more reliable)
const allPostsQuery = groq`{
  "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readTimeMinutes,
    isFeatured,
    "author": author->{
      _id,
      name,
      image,
      title,
      company
    },
    "categories": categories[]->{
      _id,
      name,
      slug,
      color
    }
  },
  "totalCount": count(*[_type == "post"])
}`;

export const filteredPostsQuery = groq`{
  "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readTimeMinutes,
    isFeatured,
    "author": author->{
      _id,
      name,
      image,
      title,
      company
    },
    "categories": categories[]->{
      _id,
      name,
      slug,
      color
    }
  },
  "totalCount": count(*[_type == "post"])
}`;

const featuredPostsQuery = groq`*[_type == "post" && isFeatured == true] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readTimeMinutes,
  isFeatured,
  "author": author->{
    _id,
    name,
    image,
    title,
    company
  },
  "categories": categories[]->{
    _id,
    name,
    slug,
    color
  }
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  publishedAt,
  readTimeMinutes,
  isFeatured,
  metaTitle,
  metaDescription,
  "author": author->{
    _id,
    name,
    image,
    title,
    company,
    bio,
    linkedIn,
    twitter
  },
  "categories": categories[]->{
    _id,
    name,
    slug,
    color
  }
}`;

export const relatedPostsQuery = groq`*[_type == "post" && _id != $currentPostId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readTimeMinutes,
  isFeatured,
  "author": author->{
    _id,
    name,
    image,
    title,
    company
  },
  "categories": categories[]->{
    _id,
    name,
    slug,
    color
  }
}`;

export const recentPostsQuery = groq`*[_type == "post" && _id != $currentPostId] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readTimeMinutes,
  isFeatured,
  "author": author->{
    _id,
    name,
    image,
    title,
    company
  },
  "categories": categories[]->{
    _id,
    name,
    slug,
    color
  }
}`;

// Category queries
export const categoriesQuery = groq`*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  color
}`;

const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  color
}`;

// Author queries
const authorsQuery = groq`*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  bio,
  title,
  company,
  linkedIn,
  twitter
}`;

const authorBySlugQuery = groq`*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  image,
  bio,
  title,
  company,
  linkedIn,
  twitter
}`;

// Search query
const searchPostsQuery = groq`*[_type == "post" && (
  title match $query ||
  excerpt match $query ||
  pt::text(content) match $query
)] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readTimeMinutes,
  isFeatured,
  "author": author->{
    _id,
    name,
    image,
    title,
    company
  },
  "categories": categories[]->{
    _id,
    name,
    slug,
    color
  }
}`;

// Slug queries for static generation
const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;
const categorySlugsQuery = groq`*[_type == "category" && defined(slug.current)][].slug.current`;
const authorSlugsQuery = groq`*[_type == "author" && defined(slug.current)][].slug.current`;
