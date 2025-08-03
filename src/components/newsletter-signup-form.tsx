"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { NewsletterData, newsletterSchema } from "@/lib/validations/contact";
import { subscribeToNewsletter } from "@/app/actions/email";
import { useAnalytics } from "@/hooks/use-analytics";
import { Mail, Loader2 } from "lucide-react";

interface NewsletterSignupFormProps {
  className?: string;
  variant?: "inline" | "modal" | "footer";
}

export function NewsletterSignupForm({ className = "", variant = "inline" }: NewsletterSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { trackNewsletterStart, trackNewsletterSubmit, trackApplicationError } = useAnalytics();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  });

  const handleFormStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackNewsletterStart(variant);
    }
  };

  const onSubmit = async (data: NewsletterData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('firstName', data.firstName);
      
      // Add tracking data
      formData.append('userAgent', navigator.userAgent);
      formData.append('referrer', document.referrer);
      formData.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

      const result = await subscribeToNewsletter(formData);

      if (result.error) {
        toast.error(result.error);
        trackApplicationError('newsletter_subscription_error', result.error, `newsletter_form_${variant}`);
      } else {
        toast.success("Welcome to the newsletter! Check your email for a welcome message.");
        trackNewsletterSubmit(variant, 'ai_marketing_insights');
        reset();
        setHasStarted(false);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      trackApplicationError('newsletter_subscription_exception', String(error), `newsletter_form_${variant}`, true);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "inline") {
    return (
      <div className={`bg-gradient-to-r from-lilac/10 to-orchid/10 rounded-2xl p-6 ${className}`}>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Stay Ahead with AI Marketing Insights</h3>
          <p className="text-muted-foreground text-sm">
            Get weekly strategies, tools, and behind-the-scenes content from building TrueTone AI
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="sr-only">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="First name"
                className="bg-background"
                onFocus={handleFormStart}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                className="bg-background"
                onFocus={handleFormStart}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-lilac hover:bg-lilac/90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe to Newsletter
              </>
            )}
          </Button>
        </form>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <h4 className="font-semibold mb-4">AI Marketing Newsletter</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Weekly insights on AI-powered marketing strategies
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            {...register("firstName")}
            placeholder="First name"
            className="bg-background"
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName.message}</p>
          )}
          
          <Input
            type="email"
            {...register("email")}
            placeholder="Email address"
            className="bg-background"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
          
          <Button 
            type="submit" 
            size="sm"
            className="w-full bg-lilac hover:bg-lilac/90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    );
  }

  // Modal variant
  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="Your first name"
            className="bg-background"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="your@email.com"
            className="bg-background"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-lilac hover:bg-lilac/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe to Newsletter
            </>
          )}
        </Button>
      </form>
    </div>
  );
}