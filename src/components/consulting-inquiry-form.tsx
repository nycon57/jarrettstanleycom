"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ConsultingFormData, consultingFormSchema } from "@/lib/validations/consulting";
import { useAnalytics } from "@/hooks/use-analytics";
import { useFormSuccess } from "@/hooks/use-form-success";
import { ConsultingInquirySuccess } from "@/components/ui/form-success-components";
import { IconLoaderCircle as Loader2 } from '@/components/icons/iconmcp/icons'

function useConsultingInquiryFormView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formStartTime] = useState(() => Date.now());
  const { trackConsultingFormStart, trackConsultingFormSubmit, trackApplicationError } = useAnalytics();
  const { isOpen, data, showSuccess, hideSuccess } = useFormSuccess();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ConsultingFormData>({
    resolver: zodResolver(consultingFormSchema),
  });

  const handleFormStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackConsultingFormStart();
    }
  };

  const onSubmit = async (data: ConsultingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Get tracking data
      const referrer = document.referrer || null;
      const userAgent = navigator.userAgent;
      const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));
      
      // Add tracking data and spam protection to the form data
      const enrichedData = {
        ...data,
        referrer,
        userAgent,
        urlParams,
        website: honeypot, // Honeypot field
        _formStartTime: formStartTime.toString(),
      };

      const response = await fetch('/api/consulting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedData),
      });
      const result = await response.json();

      if (result.success) {
        showSuccess({ 
          name: `${data.first_name} ${data.last_name}`, 
          company: data.company 
        });
        trackConsultingFormSubmit('general_consulting', {
          company_size: data.company_size,
          budget_range: data.budget_range,
          timeline: data.timeline,
          has_phone: !!data.phone,
          preferred_contact: data.preferred_contact_method,
        });
        reset();
        setHasStarted(false);
      } else {
        trackApplicationError('consulting_form_error', 'Form submission failed', 'consulting_inquiry_form');
        throw new Error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      trackApplicationError('consulting_form_exception', String(error), 'consulting_inquiry_form', true);
      toast.error("Failed to send your inquiry. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ConsultingInquirySuccess
        isOpen={isOpen}
        onClose={hideSuccess}
        name={data.name}
        company={data.company}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {/* Honeypot field - hidden from real users */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}
      >
        <label htmlFor="website-consulting">Website</label>
        <input
          type="text"
          id="website-consulting"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="first_name">First name *</Label>
          <Input
            id="first_name"
            {...register("first_name")}
            onFocus={handleFormStart}
          />
          {errors.first_name && (
            <p className="text-sm text-destructive">{errors.first_name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="last_name">Last name *</Label>
          <Input
            id="last_name"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="text-sm text-destructive">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-sm text-destructive">{errors.company.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Your role *</Label>
          <Input
            id="role"
            {...register("role")}
          />
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="company_size">Company size *</Label>
          <Select onValueChange={(value) => setValue("company_size", value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="500+">500+ employees</SelectItem>
            </SelectContent>
          </Select>
          {errors.company_size && (
            <p className="text-sm text-destructive">{errors.company_size.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="budget_range">Budget range *</Label>
          <Select onValueChange={(value) => setValue("budget_range", value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Under $50k">Under $50k</SelectItem>
              <SelectItem value="$50k-$100k">$50k-$100k</SelectItem>
              <SelectItem value="$100k-$250k">$100k-$250k</SelectItem>
              <SelectItem value="$250k-$500k">$250k-$500k</SelectItem>
              <SelectItem value="$500k+">$500k+</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget_range && (
            <p className="text-sm text-destructive">{errors.budget_range.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="timeline">Project timeline *</Label>
        <Select onValueChange={(value) => setValue("timeline", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Immediate">Immediate (Start ASAP)</SelectItem>
            <SelectItem value="1-3 months">1-3 months</SelectItem>
            <SelectItem value="3-6 months">3-6 months</SelectItem>
            <SelectItem value="6+ months">6+ months</SelectItem>
          </SelectContent>
        </Select>
        {errors.timeline && (
          <p className="text-sm text-destructive">{errors.timeline.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="project_description">Project description *</Label>
        <Textarea
          id="project_description"
          {...register("project_description")}
          placeholder="Tell us about your project goals and what you hope to achieve…"
          className="min-h-[120px]"
        />
        {errors.project_description && (
          <p className="text-sm text-destructive">{errors.project_description.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="current_challenges">Current challenges *</Label>
        <Textarea
          id="current_challenges"
          {...register("current_challenges")}
          placeholder="What challenges are you currently facing that led you to seek consulting services?"
          className="min-h-[120px]"
        />
        {errors.current_challenges && (
          <p className="text-sm text-destructive">{errors.current_challenges.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="preferred_contact_method">Preferred contact method</Label>
        <Select 
          defaultValue="email"
          onValueChange={(value) => setValue("preferred_contact_method", value as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select preferred contact method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="both">Email or phone</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferred_contact_method && (
          <p className="text-sm text-destructive">{errors.preferred_contact_method.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send consulting inquiry"
        )}
      </button>
      </form>
    </>
  );

}

export function ConsultingInquiryForm() {
  return useConsultingInquiryFormView();
}

