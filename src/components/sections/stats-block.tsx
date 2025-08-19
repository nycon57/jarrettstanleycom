"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface StatsBlockProps {
  value: string
  label: string
  suffix?: string
  prefix?: string
  className?: string
}

export function StatsBlock({ value, label, suffix = "", prefix = "", className }: StatsBlockProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseInt(value.replace(/\D/g, ""))
    const duration = 2000
    const steps = 60
    const stepValue = numericValue / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayValue(Math.round(stepValue * currentStep).toString())
      } else {
        setDisplayValue(numericValue.toString())
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div 
      ref={ref}
      className={cn(
        "text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10",
        "transform transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9D7AD6] to-[#7FEDFF] bg-clip-text text-transparent">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 mt-2">{label}</div>
    </div>
  )
}