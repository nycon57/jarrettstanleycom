'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Star, Award as AwardIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AwardItem {
  id: string
  title: string
  organization: string
  year: string
  description?: string
  type: 'award' | 'recognition' | 'certification' | 'achievement'
}

interface AwardsRecognitionProps {
  items: AwardItem[]
  className?: string
}

const getIcon = (type: AwardItem['type']) => {
  switch (type) {
    case 'award':
      return <Trophy className="h-5 w-5" />
    case 'recognition':
      return <Star className="h-5 w-5" />
    case 'certification':
      return <Medal className="h-5 w-5" />
    case 'achievement':
      return <AwardIcon className="h-5 w-5" />
    default:
      return <Trophy className="h-5 w-5" />
  }
}

export function AwardsRecognition({ items, className }: AwardsRecognitionProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all hover:shadow-lg"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
          
          <div className="relative flex gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 text-purple-600">
                {getIcon(item.type)}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{item.organization}</span>
                <span>•</span>
                <span>{item.year}</span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}