"use client";

import { useState } from "react";
import { IconArrowRight as ArrowRight } from '@/components/icons/iconmcp/icons'
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormSuccess } from "@/hooks/use-form-success";
import { NewsletterSignupSuccess } from "@/components/ui/form-success-components";
import { toast } from "sonner";

interface CtaSectionProps {
  variant?: "full" | "compact";
  className?: string;
}

const CtaSection = ({
  variant = "full",
  className,
}: CtaSectionProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, data, showSuccess, hideSuccess } = useFormSuccess();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);

      // Add tracking data
      formData.append('userAgent', navigator.userAgent);
      formData.append('referrer', document.referrer);
      formData.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        showSuccess({ email, variant: "modal" });
        setEmail("");
        setFirstName("");
        setLastName("");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <NewsletterSignupSuccess
        isOpen={isOpen}
        onClose={hideSuccess}
        email={data.email}
        variant="modal"
      />
      <section className={cn("hp-section hp-section--lift", variant === "compact" && "!py-16", className)} aria-labelledby="signal-cta-title">
        <div className="shell grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 id="signal-cta-title" className="t-headline">
              Cut through the noise. <span className="t-step">Subscribe to The Signal.</span>
            </h2>
            <p className="t-lede mt-5">
              A weekly newsletter on AI and mortgage marketing, written by a CMO who builds with it every day.
            </p>
          </div>

          {/* WebMCP tool attributes: an in-page agent can see what this form
              does without inferring it from the markup. */}
          <form
            onSubmit={handleSubmit}
            toolname="subscribe_to_the_signal"
            tooldescription="Subscribe an email address to The Signal, Jarrett Stanley's weekly newsletter on AI and mortgage marketing. Requires first name, last name, and email. Only submit with the person's explicit consent."
            className="grid gap-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                aria-label="First name"
                autoComplete="given-name"
              />
              <Input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                aria-label="Last name"
                autoComplete="family-name"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email"
                autoComplete="email"
                className="flex-1"
              />
              <button type="submit" disabled={isSubmitting} className="btn-primary btn-primary--sm disabled:opacity-60">
                {isSubmitting ? "Subscribing…" : "Subscribe"}
                {!isSubmitting && <ArrowRight className="size-4" />}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export { CtaSection };
