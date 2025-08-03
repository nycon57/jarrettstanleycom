"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { IconMail, IconCheck, IconLoader2 } from "@tabler/icons-react";
import { submitWaitlistForm } from "@/app/actions/waitlist";
import { toast } from "sonner";

export function WaitlistSignup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !email || !firstName) return;

    setIsSubmitting(true);
    
    try {
      const result = await submitWaitlistForm({
        email,
        firstName,
        lastName,
        company,
        marketingConsent: agreed
      });
      
      if (result.success) {
        setIsSubmitted(true);
        toast.success('Successfully joined the waitlist!');
      } else {
        toast.error(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-b from-orchid/10 to-background" data-section="waitlist">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <IconCheck className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Welcome to the Future!
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              You're now on the TrueTone AI beta waitlist. We'll be in touch soon with exclusive early access to transform how you create authentic marketing content.
            </p>
            <p className="text-sm text-muted-foreground">
              Keep an eye on your inbox - big things are coming your way.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-orchid/10 to-background" data-section="waitlist">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-lilac/10 text-lilac px-4 py-2 rounded-full text-sm font-medium mb-6">
              <IconMail className="w-4 h-4" />
              Beta Access Available
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Be First to Experience the Future
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our exclusive beta waitlist and be among the first to amplify your voice with TrueTone AI. 
              Limited early access spots available for professionals ready to revolutionize their marketing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-background/50 backdrop-blur-sm border border-lilac/20 rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company/Organization
                  </label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing-consent"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="marketing-consent" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to receive marketing communications from TrueTone AI, including product updates, 
                    beta access notifications, and promotional content via email. I understand that I can 
                    unsubscribe at any time by clicking the unsubscribe link in any email or by contacting 
                    support. By providing my information, I acknowledge that TrueTone AI will process my 
                    personal data in accordance with their Privacy Policy for marketing purposes. *
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={!agreed || !email || !firstName || isSubmitting}
                  className="w-full bg-lilac hover:bg-lilac/90 text-white font-semibold py-3 text-lg"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <IconLoader2 className="w-5 h-5 mr-2 animate-spin" />
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      <IconMail className="w-5 h-5 mr-2" />
                      Join Beta Waitlist
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By joining our waitlist, you're taking the first step towards authentic, AI-powered marketing 
                  that scales with your voice. We respect your privacy and will only use your information 
                  to provide you with relevant updates about TrueTone AI.
                </p>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-lilac mb-2">🎯</div>
                <h3 className="font-semibold text-foreground mb-1">Early Access</h3>
                <p className="text-sm text-muted-foreground">Be first to try our revolutionary voice-driven AI</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lilac mb-2">💰</div>
                <h3 className="font-semibold text-foreground mb-1">Beta Pricing</h3>
                <p className="text-sm text-muted-foreground">Exclusive launch pricing for early adopters</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lilac mb-2">🚀</div>
                <h3 className="font-semibold text-foreground mb-1">Shape the Future</h3>
                <p className="text-sm text-muted-foreground">Your feedback helps build the perfect platform</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 