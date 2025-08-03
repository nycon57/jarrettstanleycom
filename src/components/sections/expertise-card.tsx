'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExpertiseCardProps {
  title: string
  description: string
  icon: LucideIcon
  skills: string[]
  index?: number
  className?: string
}

export function ExpertiseCard({
  title,
  description,
  icon: Icon,
  skills,
  index = 0,
  className
}: ExpertiseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-xl',
        className
      )}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
      
      {/* Icon */}
      <div className="relative mb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 transition-transform group-hover:scale-110">
          <Icon className="h-7 w-7 text-purple-600" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}