import { z } from "zod";

// General contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
  type: z.enum(["general", "speaking", "consulting", "media"]).default("general"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

// Media inquiry form schema
export const mediaInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  outlet: z.string().min(1, "Media outlet is required"),
  role: z.string().min(1, "Your role is required"),
  deadline: z.string().optional(),
  topic: z.string().min(1, "Topic is required").max(500, "Topic must be less than 500 characters"),
  interviewType: z.enum(["written", "phone", "video", "in-person"], {
    required_error: "Please select an interview type",
  }),
  message: z.string().optional().transform(val => val || undefined),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
});

// Resource download schema
export const resourceDownloadSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().optional(),
  company: z.string().optional(),
  resourceId: z.string().min(1, "Resource ID is required"),
});

// Speaking inquiry form schema (enhanced)
export const speakingInquirySchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  event_name: z.string().optional(),
  event_date: z.string().optional(),
  audience_size: z.enum([
    "Under 50", 
    "50-100", 
    "100-300", 
    "300-500", 
    "500-1000", 
    "1000+"
  ]).optional(),
  budget_range: z.enum([
    "Under $5k",
    "$5k-$10k", 
    "$10k-$15k",
    "$15k-$25k",
    "$25k-$50k",
    "$50k+"
  ]).optional(),
  topic_preferences: z.array(z.string()).optional(),
  message: z.string().optional(),
  preferred_contact_method: z.enum(["email", "phone", "both"]).default("email"),
});

// Types
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type MediaInquiryData = z.infer<typeof mediaInquirySchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type ResourceDownloadData = z.infer<typeof resourceDownloadSchema>;
export type SpeakingInquiryData = z.infer<typeof speakingInquirySchema>;

// Validation helper functions
export const validateContactForm = (data: unknown) => {
  return contactFormSchema.safeParse(data);
};

export const validateMediaInquiry = (data: unknown) => {
  return mediaInquirySchema.safeParse(data);
};

export const validateNewsletter = (data: unknown) => {
  return newsletterSchema.safeParse(data);
};

export const validateResourceDownload = (data: unknown) => {
  return resourceDownloadSchema.safeParse(data);
};

export const validateSpeakingInquiry = (data: unknown) => {
  return speakingInquirySchema.safeParse(data);
};