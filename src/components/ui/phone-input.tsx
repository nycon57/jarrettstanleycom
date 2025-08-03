"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  error?: boolean
}

export function PhoneInput({ value, onChange, className, error, ...props }: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    // Strip all non-numeric characters
    const numbers = input.replace(/\D/g, '')
    
    // Limit to 10 digits
    const limited = numbers.slice(0, 10)
    
    // Format the number
    if (limited.length === 0) return ''
    if (limited.length <= 3) return `(${limited}`
    if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    onChange(formatted)
  }

  return (
    <Input
      type="tel"
      value={value}
      onChange={handleChange}
      className={cn(
        className,
        "!bg-white",
        error ? "!border-red-500" : "!border-gray-200"
      )}
      placeholder="(XXX) XXX-XXXX"
      {...props}
    />
  )
}
