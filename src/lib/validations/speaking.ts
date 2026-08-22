import { z } from "zod";

/** Topics Jarrett speaks on, mirroring the signature topics on /speaking. */
export const SPEAKING_TOPICS = [
  "AI in Mortgage Marketing",
  "Digital Transformation",
  "Building Marketing Teams",
  "Custom topic",
] as const;

export const speakingFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  event_name: z.string().min(1, "Event name is required"),
  event_date: z.string().min(1, "Event date is required"),
  event_location: z.string().optional(),
  event_format: z.enum(
    ["Keynote", "Workshop", "Panel or fireside chat", "Webinar or virtual", "Not sure yet"],
    { required_error: "Please select a format" }
  ),
  audience_size: z.enum(["Under 50", "50-150", "150-500", "500+", "Not sure yet"], {
    required_error: "Please select an audience size",
  }),
  budget_range: z.enum(
    ["Under $5k", "$5k-$10k", "$10k-$25k", "$25k+", "Prefer to discuss"],
    { required_error: "Please select a budget range" }
  ),
  topic_preferences: z.array(z.string()).default([]),
  message: z.string().min(10, "Tell us a little about your audience and goals"),
});

export type SpeakingFormData = z.infer<typeof speakingFormSchema>;
