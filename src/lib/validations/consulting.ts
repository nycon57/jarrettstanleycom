import { z } from "zod";

export const consultingFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  company_size: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"], {
    required_error: "Please select a company size",
  }),
  budget_range: z.enum(["Under $50k", "$50k-$100k", "$100k-$250k", "$250k-$500k", "$500k+"], {
    required_error: "Please select a budget range",
  }),
  timeline: z.enum(["Immediate", "1-3 months", "3-6 months", "6+ months"], {
    required_error: "Please select a timeline",
  }),
  project_description: z.string().min(10, "Please provide more details about your project"),
  current_challenges: z.string().min(10, "Please describe your current challenges"),
  preferred_contact_method: z.enum(["email", "phone", "both"]).default("email"),
});

export type ConsultingFormData = z.infer<typeof consultingFormSchema>;