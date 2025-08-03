"use server";

import { z } from "zod";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { submitWaitlistSignup } from "./email";

export async function submitWaitlistForm(values: z.infer<typeof waitlistSchema>) {
  try {
    // Get tracking data (these will be added by the client-side form)
    const data = {
      ...values,
      referrer: null,
      userAgent: null,
      urlParams: {},
    };
    
    const result = await submitWaitlistSignup(data);
    
    if (result.success) {
      return { success: true };
    } else {
      throw new Error("Failed to submit waitlist form");
    }
  } catch (error) {
    console.error("Error submitting waitlist form:", error);
    return { success: false, error: "Failed to submit form" };
  }
}