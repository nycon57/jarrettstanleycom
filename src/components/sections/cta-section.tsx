"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Mail, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CtaSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement newsletter signup
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Static gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-orchid/5" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-lilac/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-skyward/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orchid/3 via-transparent to-lavender/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-signal font-bold text-center tracking-tight">
            Stay Ahead of the
            <span className="block mt-2 bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent animate-gradient bg-300% bg-gradient-x">
              AI Revolution
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl leading-relaxed">
            Get exclusive insights on <span className="text-lilac dark:text-lilac font-semibold">AI-powered mortgage marketing</span> delivered to your inbox. 
            Join <span className="text-orchid dark:text-orchid font-semibold">5,000+ industry leaders</span> who are transforming their business with AI.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
            <div className="relative group">
              {/* Gradient border effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-lilac to-orchid rounded-xl blur opacity-0 group-hover:opacity-50 dark:group-hover:opacity-75 transition duration-300"></div>
              
              <div className="relative flex items-center gap-2 bg-background dark:bg-card border border-border dark:border-border rounded-xl p-1.5 transition-all duration-300 group-hover:border-lilac/30 dark:group-hover:border-lilac/40">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 border-0 bg-transparent px-4 py-3 text-base focus:outline-none focus:ring-0 placeholder:text-muted-foreground/60"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-11 px-6 bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Features */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl">
            <div className="flex items-center justify-center sm:justify-start gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-lilac to-orchid rounded-lg blur-sm opacity-0 group-hover:opacity-50 dark:group-hover:opacity-75 transition duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-lilac/10 to-orchid/10 dark:from-lilac/20 dark:to-orchid/20 rounded-lg flex items-center justify-center border border-lilac/20 dark:border-lilac/30 group-hover:border-lilac/40 dark:group-hover:border-lilac/50 transition-colors">
                  <Brain className="h-5 w-5 text-lilac dark:text-lilac" />
                </div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">AI Insights</div>
                <div className="text-muted-foreground">Weekly deep dives</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orchid to-skyward rounded-lg blur-sm opacity-0 group-hover:opacity-50 dark:group-hover:opacity-75 transition duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-orchid/10 to-skyward/10 dark:from-orchid/20 dark:to-skyward/20 rounded-lg flex items-center justify-center border border-orchid/20 dark:border-orchid/30 group-hover:border-orchid/40 dark:group-hover:border-orchid/50 transition-colors">
                  <Mail className="h-5 w-5 text-orchid dark:text-orchid" />
                </div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Exclusive Content</div>
                <div className="text-muted-foreground">Members-only access</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-skyward to-lavender rounded-lg blur-sm opacity-0 group-hover:opacity-50 dark:group-hover:opacity-75 transition duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-skyward/10 to-lavender/10 dark:from-skyward/20 dark:to-lavender/20 rounded-lg flex items-center justify-center border border-skyward/20 dark:border-skyward/30 group-hover:border-skyward/40 dark:group-hover:border-skyward/50 transition-colors">
                  <TrendingUp className="h-5 w-5 text-skyward dark:text-skyward" />
                </div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Growth Strategies</div>
                <div className="text-muted-foreground">Proven frameworks</div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-lilac dark:text-lilac" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-orchid dark:text-orchid" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-skyward dark:text-skyward" />
              <span>100% free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CtaSection };