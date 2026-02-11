"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const credibilityItems = [
  { stat: "20+", label: "Years", subtitle: "Leading mortgage marketing at enterprise scale" },
  { stat: "Enterprise", label: "Scale", subtitle: "AI marketing strategies built for national mortgage lenders" },
  { stat: "50+", label: "Events", subtitle: "Keynote speaker at industry conferences nationwide" },
  { stat: "2", label: "Companies", subtitle: "CMO at Nationwide Mortgage Bankers. CEO at TrueTone AI" },
]

export function CredibilityBar() {
  return (
    <section className="relative z-10 py-16 bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-skyward/5 dark:from-lilac/10 dark:via-transparent dark:to-skyward/10"></div>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {credibilityItems.map((item, index) => (
            <motion.div
              key={index}
              className="group text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <Card variant="blur" className="text-center hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl md:text-5xl font-signal font-bold bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent mb-1">
                    {item.stat}
                  </div>
                  <div className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                    {item.label}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
