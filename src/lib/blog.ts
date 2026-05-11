import type { BlogPost, BlogCategory } from '@/types/blog';
import type { BreadcrumbItem } from '@/lib/pseo';
import type { TransformedPost, TransformedCategory } from '@/lib/sanity/types';

// --- Categories ---

export const blogCategories: BlogCategory[] = [
{
  slug: 'leadership',
  name: 'Leadership & Strategy',
  description: 'Strategic thinking, decision-making frameworks, and leadership insights for marketing executives.',
  color: '#8B5CF6',
  badgeVariant: 'lavender'
},
{
  slug: 'data-analytics',
  name: 'Data & Analytics',
  description: 'Making sense of metrics, dashboards, and data-driven decision making.',
  color: '#A855F7',
  badgeVariant: 'orchid'
},
{
  slug: 'operations',
  name: 'Marketing Operations',
  description: 'Systems, processes, and workflows that keep marketing teams running efficiently.',
  color: '#38BDF8',
  badgeVariant: 'skyward'
},
{
  slug: 'ai-automation',
  name: 'AI & Automation',
  description: 'Practical applications of AI and automation in mortgage marketing.',
  color: '#C084FC',
  badgeVariant: 'lilac'
}];


// --- Data Loading ---

let postsCache: BlogPost[] | null = null;

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;
  try {
    const mod = await import('@/data/blog');
    postsCache = mod.blogPosts;
    return postsCache;
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((p) => p.slug === slug);
}

async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((p) => p.categories.includes(categorySlug));
}

async function getBlogPostsBySeries(seriesSlug: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.
  filter((p) => p.series?.slug === seriesSlug).
  sort((a, b) => (a.series?.issueNumber || 0) - (b.series?.issueNumber || 0));
}

export async function getRelatedBlogPosts(
currentSlug: string,
limit: number = 3)
: Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const currentCategories = new Set(current.categories);
  const scored = [];
  for (const post of posts) {
    if (post.slug === currentSlug) continue;

    scored.push({
      post,
      score:
        post.categories.filter((category) => currentCategories.has(category)).length +
        (post.series?.slug === current.series?.slug ? 2 : 0)
    });
  }

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}

// --- Adapters for existing UI components ---

export function toTransformedPost(post: BlogPost): TransformedPost {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featured_image_url: post.featuredImage,
    published_at: post.publishedAt,
    read_time_minutes: post.readTimeMinutes,
    is_featured: post.isFeatured,
    author_name: post.author.name,
    categories: post.categories.map((slug) => {
      const cat = blogCategories.find((c) => c.slug === slug);
      return {
        id: slug,
        name: cat?.name || slug,
        slug: slug,
        color: cat?.color || '#8B5CF6'
      };
    })
  };
}

function toTransformedCategory(cat: BlogCategory): TransformedCategory {
  return {
    id: cat.slug,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    color: cat.color
  };
}

// --- Breadcrumb helpers ---

export function buildBlogBreadcrumbs(post?: BlogPost): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/insights/blog' }];

  if (post) {
    crumbs.push({ name: post.title, href: `/insights/blog/${post.slug}` });
  }
  return crumbs;
}
