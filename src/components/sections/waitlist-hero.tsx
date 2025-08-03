"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { VideoModal } from "@/components/ui/video-modal";
import { SuccessAnimation } from "@/components/ui/success-animation";
import { IconMail, IconLoader2, IconPlayerPlayFilled, IconAlertCircle } from "@tabler/icons-react";
import { submitWaitlistForm } from "@/app/actions/waitlist";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { z } from "zod";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export function WaitlistHero() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    if (submitError) setSubmitError("");
  };

  const validateForm = () => {
    try {
      waitlistSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const result = await submitWaitlistForm(formData);
      
      // Check if result exists and has success property
      if (result && typeof result === 'object' && 'success' in result) {
        if (result.success) {
          setIsSubmitted(true);
        } else {
          setSubmitError(result.error || "Something went wrong. Please try again.");
        }
      } else {
        console.error("Invalid result from submitWaitlistForm:", result);
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(44, 42, 74)"
          gradientBackgroundEnd="rgb(19, 18, 42)"
          firstColor="44, 42, 74"
          secondColor="44, 42, 74"
          thirdColor="79, 81, 140"
          fourthColor="44, 42, 74"
          fifthColor="79, 81, 140"
          pointerColor="79, 81, 140"
          className="absolute inset-0"
          containerClassName="absolute inset-0 h-full w-full"
        />
        <div className="relative flex min-h-screen items-center justify-center px-4">
          <SuccessAnimation />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment key="waitlist-main">
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://adilo.bigcommand.com/9517005a-d4d6-4c9d-a878-134c59ecc2ef.mp4"
      />
      <div className="relative min-h-screen overflow-hidden">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(44, 42, 74)"
          gradientBackgroundEnd="rgb(19, 18, 42)"
          firstColor="44, 42, 74"
          secondColor="44, 42, 74"
          thirdColor="79, 81, 140"
          fourthColor="44, 42, 74"
          fifthColor="79, 81, 140"
          pointerColor="79, 81, 140"
          className="absolute inset-0"
          containerClassName="absolute inset-0 h-full w-full"
        />

        <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
              {/* Left Column - Content */}
              <motion.div variants={item} className="space-y-8">
                {/* Logo and Video Button - Same line */}
                <div className="flex items-center justify-center lg:justify-start gap-20">
                  <img
                    src="/assets/images/TrueToneAI-Landscape-Logo-White.png"
                    alt="TrueTone AI"
                    className="h-8 md:h-10 w-auto"
                  />
                  <motion.button
                    onClick={() => setIsVideoOpen(true)}
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute -inset-4 animate-ping rounded-full bg-lilac/40 group-hover:bg-lilac/60" />
                    <div className="relative rounded-full bg-lilac p-4 shadow-2xl group-hover:shadow-lilac/25 transition-all duration-200">
                      <IconPlayerPlayFilled className="w-8 h-8 text-white" />
                    </div>
                  </motion.button>
                </div>

                {/* Header Section */}
                <div className="text-center lg:text-left space-y-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                      <span className="text-lilac">Your Message.</span><br/><span className="text-white">Amplified by Intelligence.</span>
                    </h1>
                  </div>
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Be among the first to experience powerful AI that revolutionizes your marketing and sounds exactly like you.
                  </p>
                </div>

                {/* Benefits Section - Simplified */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  {[
                    {
                      emoji: "🎯",
                      title: "Early Access & Beta Pricing",
                      description: "Be first to try our platform with exclusive launch pricing"
                    },
                    {
                      emoji: "🚀",
                      title: "Shape the Future",
                      description: "Your feedback helps build the perfect voice-driven AI"
                    }
                  ].map((benefit, index) => (
                    <motion.div 
                      key={benefit.title} 
                      className="text-center lg:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-lilac/20 rounded-full mb-3">
                        <span className="text-lg">{benefit.emoji}</span>
                      </div>
                      <h3 className="font-semibold text-white mb-2 text-base">{benefit.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div variants={item} className="flex justify-center lg:justify-end">
                <div className="w-full max-w-lg">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* Form Title */}
                    <div className="text-center mb-8">
                      <h2 className="text-1xl md:text-2xl font-bold text-white mb-2">
                        Signup For Exclusive Beta Access
                      </h2>
                      <p className="text-white/70 text-sm">
                        Join the waitlist to be among the first to experience TrueTone AI
                      </p>
                    </div>

                    {/* Error Alert */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                        >
                          <IconAlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-red-300 text-sm">{submitError}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-3">
                              First Name *
                            </label>
                            <Input
                              id="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              placeholder="Enter your first name"
                              className={`w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-lilac/50 focus:ring-lilac/20 ${
                                errors.firstName ? "border-red-400 focus:border-red-400" : ""
                              }`}
                            />
                            {errors.firstName && (
                              <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-3">
                              Last Name *
                            </label>
                            <Input
                              id="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              placeholder="Enter your last name"
                              className={`w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-lilac/50 focus:ring-lilac/20 ${
                                errors.lastName ? "border-red-400 focus:border-red-400" : ""
                              }`}
                            />
                            {errors.lastName && (
                              <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-white mb-3">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email address"
                            className={`w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-lilac/50 focus:ring-lilac/20 ${
                              errors.email ? "border-red-400 focus:border-red-400" : ""
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-white mb-3">
                            Company/Organization
                          </label>
                          <Input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Enter your company name"
                            className={`w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-lilac/50 focus:ring-lilac/20 ${
                              errors.company ? "border-red-400 focus:border-red-400" : ""
                            }`}
                          />
                          {errors.company && (
                            <p className="text-red-400 text-xs mt-1">{errors.company}</p>
                          )}
                        </div>

                        <div className="flex items-start space-x-4">
                          <Checkbox
                            id="marketing-consent"
                            checked={formData.marketingConsent}
                            onCheckedChange={(checked: boolean) => handleInputChange("marketingConsent", checked)}
                            className={`mt-1 border-white/30 data-[state=checked]:bg-lilac data-[state=checked]:border-lilac ${
                              errors.marketingConsent ? "border-red-400" : ""
                            }`}
                          />
                          <div>
                            <label htmlFor="marketing-consent" className="text-sm text-white/80 leading-relaxed">
                              I agree to receive marketing communications from TrueTone AI, including product updates, 
                              beta access notifications, and promotional content via email. I understand that I can 
                              unsubscribe at any time. By providing my information, I acknowledge that TrueTone AI will 
                              process my personal data in accordance with their Privacy Policy for marketing purposes. *
                            </label>
                            {errors.marketingConsent && (
                              <p className="text-red-400 text-xs mt-1">{errors.marketingConsent}</p>
                            )}
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-lilac hover:bg-lilac/90 disabled:bg-gray-500 disabled:opacity-50 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <React.Fragment key="loading">
                              <IconLoader2 className="w-5 h-5 mr-2 animate-spin" />
                              <span>Joining Waitlist...</span>
                            </React.Fragment>
                          ) : (
                            <React.Fragment key="default">
                              <IconMail className="w-5 h-5 mr-2" />
                              <span>Join Beta Waitlist</span>
                            </React.Fragment>
                          )}
                        </Button>

                        <p className="text-xs text-white/60 text-center leading-relaxed">
                          By joining our waitlist, you're taking the first step towards authentic, AI-powered marketing 
                          that scales with your voice. We respect your privacy and will only use your information 
                          to provide you with relevant updates about TrueTone AI.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
} 