'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Clock, Eye } from 'lucide-react'
import { BlogPost } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export function BlogPostCard({ post, featured = false, className }: BlogPostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.published_at), { addSuffix: true })

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg",
      featured && "md:col-span-2 lg:col-span-3",
      className
    )}>
      <Link href={`/insights/blog/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="bg-gradient-to-br from-lilac to-orchid w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img
                  src="/assets/images/JS-Logo-white.png"
                  alt="Jarrett Stanley Logo"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    console.error('Logo failed to load:', e);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.textContent = 'JS';
                    fallback.className = 'text-white text-lg font-bold';
                    target.parentNode?.appendChild(fallback);
                  }}
                  onLoad={() => console.log('Logo loaded successfully')}
                />
              </div>
            </div>
          )}
          {post.is_featured && (
            <Badge className="absolute top-4 left-4 bg-skyward text-shadow hover:bg-skyward/90">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories?.slice(0, 2).map((category) => (
            <Badge
              key={category.id}
              variant="secondary"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
              className="text-xs"
            >
              {category.name}
            </Badge>
          ))}
        </div>
        
        <Link href={`/insights/blog/${post.slug}`}>
          <h3 className={cn(
            "font-signal font-bold leading-tight transition-colors group-hover:text-lilac",
            featured ? "text-2xl" : "text-xl"
          )}>
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className={cn(
          "text-muted-foreground line-clamp-3",
          featured ? "text-base" : "text-sm"
        )}>
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.read_time_minutes} min read</span>
          </div>
          {post.view_count !== undefined && (
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.view_count} views</span>
            </div>
          )}
        </div>
        <time dateTime={post.published_at}>
          {formattedDate}
        </time>
      </CardFooter>
    </Card>
  )
}