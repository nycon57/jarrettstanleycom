"use client";

import React, { useSyncExternalStore } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Mail, 
  X, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Users, 
  Calendar,
  MessageCircle,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CONFETTI_DOTS = Array.from({ length: 15 }, (_, position) => ({
  id: `confetti-${position + 1}`,
  x: ((position * 53) % 400) - 200,
  duration: 2 + position % 3 * 0.5,
  delay: position % 5 * 0.1,
}));

function subscribeToStepTicker(onStoreChange: () => void) {
  const interval = window.setInterval(onStoreChange, 2000);
  return () => window.clearInterval(interval);
}

function useStepTicker(isOpen: boolean, stepCount: number) {
  return useSyncExternalStore(
    isOpen ? subscribeToStepTicker : () => () => {},
    () => Math.floor(Date.now() / 2000) % stepCount,
    () => 0
  );
}

interface BaseSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

// Contact Form Success Component
interface ContactFormSuccessProps extends BaseSuccessProps {
  name?: string;
}

export function ContactFormSuccess({ 
  isOpen, 
  onClose, 
  onContinue,
  name = "there"
}: ContactFormSuccessProps) {
  const showConfetti = isOpen;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            className="relative max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confetti Effect */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {CONFETTI_DOTS.map((dot) => (
                  <m.div
                    key={dot.id}
                    className="absolute size-2 bg-gradient-to-r from-lilac to-orchid rounded-full"
                    initial={{ 
                      x: dot.x,
                      y: -20,
                      rotate: 0,
                      scale: 0.95
                    }}
                    animate={{ 
                      y: 500,
                      rotate: 360,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: dot.duration,
                      delay: dot.delay,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}

            <Card className="relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-lilac/10 via-orchid/5 to-transparent" />
              
              <div className="relative p-8 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  onClick={onClose}
                >
                  <X className="size-4" />
                </Button>

                {/* Success Icon */}
                <m.div
                  className="inline-flex items-center justify-center size-16 bg-gradient-to-r from-lilac to-orchid rounded-full mb-6 shadow-lg"
                  initial={{ scale: 0.95, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.2 
                  }}
                >
                  <CheckCircle className="size-8 text-white" />
                </m.div>

                {/* Title */}
                <m.h2
                  className="text-2xl font-semibold mb-3 text-lilac"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Message Sent Successfully!
                </m.h2>

                {/* Description */}
                <m.p
                  className="text-muted-foreground mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you{name !== "there" ? `, ${name}` : ""}! I've received your message and will get back to you within 24 hours.
                </m.p>

                {/* Next Steps */}
                <m.div
                  className="bg-gradient-to-r from-lilac/5 to-orchid/5 rounded-lg p-4 mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="size-4 text-lilac flex-shrink-0" />
                    <span>Keep an eye on your inbox for my response</span>
                  </div>
                </m.div>

                {/* Action Buttons */}
                <m.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    variant="gradient" 
                    className="flex-1"
                    onClick={onContinue || onClose}
                  >
                    Continue Exploring
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="sm:w-auto"
                  >
                    Close
                  </Button>
                </m.div>
              </div>
            </Card>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

// Consulting Inquiry Success Component
interface ConsultingInquirySuccessProps extends BaseSuccessProps {
  name?: string;
  company?: string;
}

export function ConsultingInquirySuccess({ 
  isOpen, 
  onClose, 
  onContinue,
  name = "there",
  company
}: ConsultingInquirySuccessProps) {
  const nextSteps = [
    {
      icon: MessageCircle,
      title: "Initial Review",
      description: "I'll review your inquiry within 24 hours",
      timing: "24 hours"
    },
    {
      icon: Calendar,
      title: "Strategy Call",
      description: "We'll schedule a consultation call",
      timing: "2-3 days"
    },
    {
      icon: Brain,
      title: "Custom Proposal",
      description: "Receive a tailored AI marketing strategy",
      timing: "1 week"
    }
  ];

  const currentStep = useStepTicker(isOpen, nextSteps.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            className="relative max-w-lg w-full"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-lilac/10 via-orchid/5 to-transparent" />
              
              <div className="relative p-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  onClick={onClose}
                >
                  <X className="size-4" />
                </Button>

                {/* Header */}
                <div className="text-center mb-8">
                  <m.div
                    className="inline-flex items-center justify-center size-16 bg-gradient-to-r from-lilac to-orchid rounded-full mb-4 shadow-lg"
                    initial={{ scale: 0.95, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      delay: 0.2 
                    }}
                  >
                    <Sparkles className="size-8 text-white" />
                  </m.div>

                  <m.h2
                    className="text-2xl font-semibold mb-2 text-lilac"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Consulting Inquiry Received!
                  </m.h2>

                  <m.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Thank you{name !== "there" ? `, ${name}` : ""}{company ? ` from ${company}` : ""}! 
                    Let's transform your mortgage marketing with AI.
                  </m.p>
                </div>

                {/* Next Steps Timeline */}
                <m.div
                  className="gap-y-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-sm font-semibold text-muted-foreground text-center mb-4">
                    What Happens Next
                  </h3>
                  
                  {nextSteps.map((step, index) => {
                    const isActive = index === currentStep;
                    const IconComponent = step.icon;
                    
                    return (
                      <m.div
                        key={step.title}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                          isActive 
                            ? 'bg-gradient-to-r from-lilac/10 to-orchid/10 border border-lilac/20' 
                            : 'bg-muted/30'
                        }`}
                        animate={{ 
                          scale: isActive ? 1.02 : 1,
                          opacity: isActive ? 1 : 0.7
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-lilac to-orchid shadow-lg' 
                            : 'bg-muted'
                        }`}>
                          <IconComponent className={`size-5 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{step.title}</h4>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                        
                        <div className="text-xs font-medium text-lilac">
                          {step.timing}
                        </div>
                      </m.div>
                    );
                  })}
                </m.div>

                {/* Action Buttons */}
                <m.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button 
                    variant="gradient" 
                    className="flex-1"
                    onClick={onContinue || onClose}
                  >
                    Explore Services
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="sm:w-auto"
                  >
                    Close
                  </Button>
                </m.div>
              </div>
            </Card>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

// Newsletter Signup Success Component
interface NewsletterSignupSuccessProps extends BaseSuccessProps {
  email?: string;
  variant?: "modal" | "inline" | "footer";
}

export function NewsletterSignupSuccess({ 
  isOpen, 
  onClose, 
  onContinue,
  email,
  variant = "modal"
}: NewsletterSignupSuccessProps) {
  const showPulse = isOpen;

  const benefits = [
    {
      icon: Brain,
      title: "AI Marketing Insights",
      description: "Weekly strategies that convert"
    },
    {
      icon: Users,
      title: "Industry Connections",
      description: "Network with mortgage leaders"
    },
    {
      icon: Sparkles,
      title: "Exclusive Content",
      description: "Access to premium resources"
    }
  ];

  if (variant === "inline") {
    return (
      <AnimatePresence>
        {isOpen && (
          <m.div
            className="bg-gradient-to-r from-lilac/10 to-orchid/10 border border-lilac/20 rounded-lg p-6"
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <m.div
                className="flex-shrink-0 size-12 bg-gradient-to-r from-lilac to-orchid rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="size-6 text-white" />
              </m.div>
              
              <div className="flex-1">
                <m.h3
                  className="font-semibold text-foreground mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome to the AI Revolution!
                </m.h3>
                <m.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Check your email for exclusive AI marketing insights.
                </m.p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            className="relative max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl">
              {/* Animated background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-lilac/10 via-orchid/5 to-transparent" />
                {showPulse && (
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-lilac/20 to-orchid/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </div>
              
              <div className="relative p-8 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  onClick={onClose}
                >
                  <X className="size-4" />
                </Button>

                {/* Success Icon with pulse */}
                <m.div
                  className="relative inline-flex items-center justify-center size-16 bg-gradient-to-r from-lilac to-orchid rounded-full mb-6 shadow-lg"
                  initial={{ scale: 0.95, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.2 
                  }}
                >
                  {showPulse && (
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-lilac to-orchid rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                  )}
                  <Mail className="size-8 text-white relative z-10" />
                </m.div>

                {/* Title */}
                <m.h2
                  className="text-2xl font-semibold mb-3 text-lilac"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  You're In!
                </m.h2>

                {/* Description */}
                <m.p
                  className="text-muted-foreground mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {email ? `Welcome to the community, ${email.split('@')[0]}!` : "Welcome to the community!"} 
                  You'll receive cutting-edge AI marketing strategies directly in your inbox.
                </m.p>

                {/* Benefits */}
                <m.div
                  className="grid gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <m.div
                        key={benefit.title}
                        className="flex items-center gap-3 text-left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0 size-8 bg-gradient-to-r from-lilac/20 to-orchid/20 rounded-full flex items-center justify-center">
                          <IconComponent className="size-4 text-lilac" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">{benefit.description}</p>
                        </div>
                      </m.div>
                    );
                  })}
                </m.div>

                {/* Email confirmation */}
                <m.div
                  className="bg-gradient-to-r from-lilac/5 to-orchid/5 rounded-lg p-4 mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Send className="size-4 text-lilac flex-shrink-0" />
                    <span>Confirmation email sent - check your inbox!</span>
                  </div>
                </m.div>

                {/* Action Buttons */}
                <m.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button 
                    variant="gradient" 
                    className="flex-1"
                    onClick={onContinue || onClose}
                  >
                    Explore Resources
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="sm:w-auto"
                  >
                    Close
                  </Button>
                </m.div>
              </div>
            </Card>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
