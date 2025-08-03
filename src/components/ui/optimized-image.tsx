'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { ImageSkeleton } from './loading-states'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  skeletonClassName?: string
  containerClassName?: string
  lazy?: boolean
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/assets/images/placeholder.svg',
  skeletonClassName,
  containerClassName,
  className,
  lazy = true,
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const [isInView, setIsInView] = useState(!lazy)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, isInView])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', containerClassName)}>
      {isLoading && (
        <ImageSkeleton 
          className={cn('absolute inset-0 z-10', skeletonClassName)} 
        />
      )}
      
      {isInView && (
        <Image
          src={imageSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            error && 'opacity-75',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          priority={!lazy}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          quality={90}
          {...props}
        />
      )}
    </div>
  )
}

// Pre-configured variants for common use cases
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      lazy={false}
      priority
      quality={100}
      {...props}
    />
  )
}

export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

export function AvatarImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      quality={90}
      sizes="(max-width: 768px) 60px, 80px"
      {...props}
    />
  )
}

export function BlogPostImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
      {...props}
    />
  )
}