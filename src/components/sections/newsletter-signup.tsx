"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Loader2, Mail } from "lucide-react"

interface NewsletterSignupProps {
  className?: string
}

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement newsletter signup logic
    setTimeout(() => {
      setStatus("success")
      setIsLoading(false)
      setEmail("")
    }, 1500)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#9D7AD6]/20 to-[#7FEDFF]/20 blur-3xl" />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="text-center max-w-2xl mx-auto">
          <Mail className="w-12 h-12 text-[#9D7AD6] mx-auto mb-4" />
          <h3 className="text-3xl font-signal font-bold mb-4">
            Stay Ahead of the AI Revolution
          </h3>
          <p className="text-gray-300 mb-8">
            Get exclusive insights on AI-powered mortgage marketing delivered to your inbox. 
            Join 5,000+ industry leaders who are transforming their business with AI.
          </p>
          
          {status === "success" ? (
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
              Thank you for subscribing! Check your email to confirm.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-[#9D7AD6] to-[#4F518C] hover:from-[#9D7AD6]/90 hover:to-[#4F518C]/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}