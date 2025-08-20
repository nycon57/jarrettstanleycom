"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions/email";
import { useAnalytics } from "@/hooks/use-analytics";
import { useFormSuccess } from "@/hooks/use-form-success";
import { ContactFormSuccess } from "@/components/ui/form-success-components";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { trackContactFormStart, trackContactFormSubmit, trackApplicationError } = useAnalytics();
  const { isOpen, data, showSuccess, hideSuccess } = useFormSuccess();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "general",
    company: "",
    phone: "",
  });

  // Track form start when user begins typing
  const handleFormStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackContactFormStart();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      
      // Add tracking data
      form.append('userAgent', navigator.userAgent);
      form.append('referrer', document.referrer);
      form.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

      const result = await submitContactForm(form);
      
      if (result.error) {
        toast.error(result.error);
        trackApplicationError('form_submission_error', result.error, 'contact_form');
      } else if (result.success) {
        showSuccess({ name: formData.name });
        trackContactFormSubmit({
          inquiry_type: formData.type,
          has_company: !!formData.company,
          has_phone: !!formData.phone,
          message_length: formData.message.length,
        });
        setFormData({ 
          name: "", 
          email: "", 
          message: "", 
          type: "general",
          company: "",
          phone: "",
        });
        setHasStarted(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      trackApplicationError('form_submission_exception', String(error), 'contact_form', true);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ContactFormSuccess
        isOpen={isOpen}
        onClose={hideSuccess}
        name={data.name}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
            handleFormStart();
          }}
          required
          placeholder="Your name"
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
            handleFormStart();
          }}
          required
          placeholder="you@example.com"
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, message: e.target.value }));
            handleFormStart();
          }}
          required
          placeholder="How can we help?"
          className="min-h-[150px] bg-background"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
      </form>
    </>
  );
}
