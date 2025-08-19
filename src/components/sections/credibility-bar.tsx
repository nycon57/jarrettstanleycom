"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Brain, Mic, Users } from 'lucide-react'

const credibilityItems = [
  { icon: Award, title: "AI Marketing Pioneer", subtitle: "20+ Years Transforming Mortgage Marketing Through Innovation" },
  { icon: Brain, title: "Strategic Advisor", subtitle: "Architecting AI Solutions That Drive $500M+ in Loan Originations" },
  { icon: Mic, title: "Keynote Authority", subtitle: "Featured Speaker at Major Industry Events Nationwide" },
  { icon: Users, title: "Trusted Partner", subtitle: "Empowering Fortune 500 and Enterprise Mortgage Leaders" }
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
                  <motion.div 
                    className="relative mx-auto w-16 h-16 mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-lilac to-orchid rounded-2xl"></div>
                    <div className="absolute inset-1 bg-background/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
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