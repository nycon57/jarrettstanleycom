import { z } from "zod"

export const waitlistSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  marketingConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to marketing communications to continue"
    })
})

export type WaitlistFormData = z.infer<typeof waitlistSchema> 