"use client"

import { Button } from '@/components/ui/button'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { 
  Twitter,
  Linkedin,
  Facebook,
  Link2
} from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  shareUrl: string
  title: string
}

export function ShareButtons({ shareUrl, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center space-x-4">
      <Button asChild variant="outline" size="sm">
        <TrackedLink
          href={shareLinks.twitter}
          trackingData={{
            linkText: 'Share on Twitter',
            linkType: 'social'
          }}
          external
          className="flex items-center space-x-2"
        >
          <Twitter className="w-4 h-4" />
          <span>Twitter</span>
        </TrackedLink>
      </Button>
      
      <Button asChild variant="outline" size="sm">
        <TrackedLink
          href={shareLinks.linkedin}
          trackingData={{
            linkText: 'Share on LinkedIn',
            linkType: 'social'
          }}
          external
          className="flex items-center space-x-2"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </TrackedLink>
      </Button>
      
      <Button asChild variant="outline" size="sm">
        <TrackedLink
          href={shareLinks.facebook}
          trackingData={{
            linkText: 'Share on Facebook',
            linkType: 'social'
          }}
          external
          className="flex items-center space-x-2"
        >
          <Facebook className="w-4 h-4" />
          <span>Facebook</span>
        </TrackedLink>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={copyToClipboard}
        className="flex items-center space-x-2"
      >
        <Link2 className="w-4 h-4" />
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </Button>
    </div>
  )
}