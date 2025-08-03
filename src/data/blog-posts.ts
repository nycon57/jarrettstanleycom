export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  imageUrl?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Revolutionizing Social Media Management with AI',
    slug: 'revolutionizing-social-media-management-with-ai',
    excerpt: 'Discover how artificial intelligence is transforming the way businesses manage their social media presence.',
    content: `# Revolutionizing Social Media Management with AI

Artificial intelligence is changing the game for social media management. From content creation to engagement analysis, AI tools are making it easier than ever to maintain an effective social media presence.

## The Power of AI in Content Creation

AI can now help generate ideas, write captions, and even create images for your social media posts. This not only saves time but also ensures a consistent flow of high-quality content.

## Automated Engagement Analysis

With AI-powered analytics, you can better understand your audience's behavior and preferences, allowing you to optimize your content strategy for maximum impact.`,
    date: '2025-01-22',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'
  },
  {
    id: '2',
    title: 'Best Practices for Social Media Success in 2025',
    slug: 'best-practices-for-social-media-success-2025',
    excerpt: 'Learn the latest strategies and best practices for achieving success on social media platforms in 2025.',
    content: `# Best Practices for Social Media Success in 2025

As social media continues to evolve, staying up-to-date with the latest best practices is crucial for success. Here are the key strategies to focus on in 2025.

## Authenticity is Key

Modern audiences value authentic content more than ever. Focus on creating genuine connections with your audience through honest, transparent communication.

## Leverage Video Content

Short-form video content continues to dominate social media. Incorporate more video content into your strategy to increase engagement and reach.`,
    date: '2025-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113'
  },
  {
    id: '3',
    title: 'The Future of Social Media Marketing',
    slug: 'future-of-social-media-marketing',
    excerpt: 'Explore emerging trends and technologies that will shape the future of social media marketing.',
    content: `# The Future of Social Media Marketing

The social media landscape is constantly evolving, with new technologies and trends emerging regularly. Here's what to expect in the coming years.

## Virtual Reality Integration

Social media platforms are increasingly incorporating VR elements, creating more immersive experiences for users.

## AI-Driven Personalization

Artificial intelligence will continue to improve content personalization, making social media marketing more effective and targeted.`,
    date: '2025-01-08',
    imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0'
  }
]
