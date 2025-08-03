"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  error?: boolean
  showValidation?: boolean
}

export function EmailInput({ 
  value, 
  onChange, 
  className, 
  error,
  showValidation = true,
  ...props 
}: EmailInputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [validationMessage, setValidationMessage] = React.useState("")
  
  const validateEmail = (email: string): boolean => {
    // RFC 5322 compliant email regex
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim()
    onChange(newValue)

    if (showValidation && newValue) {
      if (!validateEmail(newValue)) {
        setValidationMessage("Please enter a valid email address")
      } else {
        setValidationMessage("")
      }
    } else {
      setValidationMessage("")
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  return (
    <div className="space-y-1">
      <Input
        type="email"
        value={value}
        onChange={handleChange}
        onFocus={(e) => {
          setIsFocused(true)
          if (props.onFocus) {
            props.onFocus(e)
          }
        }}
        onBlur={handleBlur}
        className={cn(
          className,
          "!bg-white",
          error ? "!border-red-500" : "!border-gray-200",
          validationMessage && !isFocused && "border-yellow-500"
        )}
        autoComplete="email"
        spellCheck="false"
        autoCapitalize="off"
        {...props}
      />
      {showValidation && validationMessage && !error && (
        <p className="text-yellow-600 text-xs mt-1">{validationMessage}</p>
      )}
    </div>
  )
}
