'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Download, FileText, Video, Headphones, CheckSquare, BookOpen, FileCheck } from 'lucide-react'
import { Resource } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ResourceCardProps {
  resource: Resource
  onDownload?: (resource: Resource) => void
  className?: string
}

const resourceTypeIcons = {
  whitepaper: FileText,
  ebook: BookOpen,
  template: FileCheck,
  guide: BookOpen,
  checklist: CheckSquare,
  video: Video,
  podcast: Headphones,
}

const resourceTypeLabels = {
  whitepaper: 'Whitepaper',
  ebook: 'eBook',
  template: 'Template',
  guide: 'Guide',
  checklist: 'Checklist',
  video: 'Video',
  podcast: 'Podcast',
}

export function ResourceCard({ resource, onDownload, className }: ResourceCardProps) {
  const IconComponent = resourceTypeIcons[resource.resource_type]

  const handleDownload = () => {
    if (onDownload) {
      onDownload(resource)
    }
  }

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50">
        {resource.thumbnail_url ? (
          <Image
            src={resource.thumbnail_url}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconComponent className="w-16 h-16 text-purple-400" />
          </div>
        )}
        {resource.is_featured && (
          <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
            Featured
          </Badge>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-purple-700">
            {resourceTypeLabels[resource.resource_type]}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {resource.categories?.slice(0, 2).map((category) => (
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
        
        <h3 className="font-signal font-bold text-xl leading-tight transition-colors group-hover:text-purple-600">
          {resource.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {resource.file_size_mb && (
            <span>{resource.file_size_mb} MB</span>
          )}
          <span>{resource.download_count} downloads</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          {resource.requires_email ? 'Download (Email Required)' : 'Download'}
        </Button>
      </CardFooter>
    </Card>
  )
}