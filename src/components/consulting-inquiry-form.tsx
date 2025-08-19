"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ConsultingFormData, consultingFormSchema } from "@/lib/validations/consulting";
import { submitConsultingInquiry } from "@/app/actions/email";
import { useAnalytics } from "@/hooks/use-analytics";
import { Loader2 } from "lucide-react";

export function ConsultingInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { trackConsultingFormStart, trackConsultingFormSubmit, trackApplicationError } = useAnalytics();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      
      // Add tracking data to the form data
      const enrichedData = {
        ...data,
        referrer,
        userAgent,
        urlParams,
      };

      const result = await submitConsultingInquiry(enrichedData);

      if (result.success) {
        toast.success("Thank you for your inquiry! We'll be in touch as soon as possible.");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            {...register("first_name")}
            placeholder="John"
            className="bg-background"
            onFocus={handleFormStart}
          />
          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            {...register("last_name")}
            placeholder="Doe"
            className="bg-background"
          />
          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@company.com"
            className="bg-background"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+1 (555) 123-4567"
            className="bg-background"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            {...register("company")}
            placeholder="Acme Mortgage"
            className="bg-background"
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Your Role *</Label>
          <Input
            id="role"
            {...register("role")}
            placeholder="Chief Marketing Officer"
            className="bg-background"
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_size">Company Size *</Label>
          <Select onValueChange={(value) => setValue("company_size", value as any)}>
            <SelectTrigger className="bg-background">
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
            <p className="text-sm text-red-500">{errors.company_size.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget_range">Budget Range *</Label>
          <Select onValueChange={(value) => setValue("budget_range", value as any)}>
            <SelectTrigger className="bg-background">
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
            <p className="text-sm text-red-500">{errors.budget_range.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Project Timeline *</Label>
        <Select onValueChange={(value) => setValue("timeline", value as any)}>
          <SelectTrigger className="bg-background">
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
          <p className="text-sm text-red-500">{errors.timeline.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="project_description">Project Description *</Label>
        <Textarea
          id="project_description"
          {...register("project_description")}
          placeholder="Tell us about your project goals and what you hope to achieve..."
          className="min-h-[120px] bg-background"
        />
        {errors.project_description && (
          <p className="text-sm text-red-500">{errors.project_description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="current_challenges">Current Challenges *</Label>
        <Textarea
          id="current_challenges"
          {...register("current_challenges")}
          placeholder="What challenges are you currently facing that led you to seek consulting services?"
          className="min-h-[120px] bg-background"
        />
        {errors.current_challenges && (
          <p className="text-sm text-red-500">{errors.current_challenges.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferred_contact_method">Preferred Contact Method</Label>
        <Select 
          defaultValue="email"
          onValueChange={(value) => setValue("preferred_contact_method", value as any)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select preferred contact method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="both">Either Email or Phone</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferred_contact_method && (
          <p className="text-sm text-red-500">{errors.preferred_contact_method.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#9D7AD6] hover:bg-[#9D7AD6]/90" 
        disabled={isSubmitting}
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
}