'use client'

import { motion } from 'framer-motion'
import { Calendar, Briefcase, Award, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItem {
  id: string
  date: string
  title: string
  company?: string
  description: string
  type: 'position' | 'achievement' | 'milestone'
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'position':
      return <Briefcase className="h-5 w-5" />
    case 'achievement':
      return <Award className="h-5 w-5" />
    case 'milestone':
      return <Rocket className="h-5 w-5" />
    default:
      return <Calendar className="h-5 w-5" />
  }
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lilac/20 via-lilac/50 to-lilac/20" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6"
          >
            {/* Icon circle */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background border-2 border-lilac/20 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-lilac to-orchid text-white">
                {item.icon || getIcon(item.type)}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-sm"
              >
                <div className="mb-2 text-sm text-muted-foreground">
                  {item.date}
                </div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                {item.company && (
                  <div className="text-lilac font-medium mb-3">
                    {item.company}
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}