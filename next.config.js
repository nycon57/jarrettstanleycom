const { withBotId } = require('botid/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      '@tabler/icons-react',
      'framer-motion',
      'react-markdown',
      'embla-carousel-react',
      'date-fns',
      'zod',
      'react-hook-form',
      '@portabletext/react',
    ],
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'nksqewatarrgiqvnddcp.supabase.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Well-known agent discovery documents. Next.js ignores dot-directories in
  // the app router, so these canonical paths are rewritten to route handlers.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/.well-known/ai-catalog.json',
          destination: '/api/well-known/ai-catalog',
        },
        {
          source: '/.well-known/mcp/server-card.json',
          destination: '/api/well-known/mcp-server-card',
        },
        {
          source: '/.well-known/mcp.json',
          destination: '/api/well-known/mcp-server-card',
        },
        {
          source: '/mcp/server-card',
          destination: '/api/well-known/mcp-server-card',
        },
        {
          source: '/.well-known/agent-card.json',
          destination: '/api/well-known/agent-card',
        },
        {
          source: '/.well-known/api-catalog',
          destination: '/api/well-known/api-catalog',
        },
        {
          source: '/.well-known/agent-skills/index.json',
          destination: '/api/well-known/agent-skills-index',
        },
        {
          source: '/.well-known/agent-skills/:skill/SKILL.md',
          destination: '/api/well-known/skill-md',
        },
      ],
    };
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Add any necessary redirects here
      {
        source: '/blog',
        destination: '/insights/blog',
        permanent: true,
      },
    ];
  },
  
  // Compress responses
  compress: true,

  // Enable Turbopack (default in Next.js 16)
  turbopack: {},
};

module.exports = withBotId(nextConfig);
