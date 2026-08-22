import { groq } from 'next-sanity';




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





