"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoaderCircle as Loader2 } from '@/components/icons/iconmcp/icons'
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SPEAKING_TOPICS,
  speakingFormSchema,
  type SpeakingFormData,
} from "@/lib/validations/speaking";
import { useAnalytics } from "@/hooks/use-analytics";
import { AUDIENCES, FORMATS, TOPICS } from "@/lib/speaking";

const EVENT_FORMATS = [
  "Keynote",
  "Workshop",
  "Panel or fireside chat",
  "Webinar or virtual",
  "Not sure yet",
] as const;

const AUDIENCE_SIZES = ["Under 50", "50-150", "150-500", "500+", "Not sure yet"] as const;

const BUDGET_RANGES = [
  "Under $5k",
  "$5k-$10k",
  "$10k-$25k",
  "$25k+",
  "Prefer to discuss",
] as const;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

export function SpeakingInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formStartTime] = useState(() => Date.now());
  const { trackSpeaking, trackApplicationError } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<SpeakingFormData>({
    resolver: zodResolver(speakingFormSchema),
    defaultValues: { topic_preferences: [] },
  });

  const selectedTopics = useWatch({ control, name: "topic_preferences" }) ?? [];

  // Runs after the useWatch subscriptions above, so the prefilled values reach them.
  // "Book this session" (the session builder) arrives as ?topic=&format=&audience=#book.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = TOPICS.find((t) => t.id === params.get("topic"));
    const format = FORMATS.find((f) => f.id === params.get("format"));
    const audience = AUDIENCES.find((a) => a.id === params.get("audience"));
    if (topic) setValue("topic_preferences", [topic.formValue]);
    if (format) setValue("event_format", format.formValue);
    if (topic && format && audience) {
      setValue(
        "message",
        `Session: "${topic.session}" as a ${format.label.toLowerCase()}, for ${audience.line.toLowerCase()}.\n\n`,
      );
    }
  }, [setValue]);


  const toggleTopic = (topic: string) => {
    const next = selectedTopics.includes(topic)
      ? selectedTopics.filter((entry) => entry !== topic)
      : [...selectedTopics, topic];
    setValue("topic_preferences", next);
  };

  const onSubmit = async (data: SpeakingFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          topic_preferences: selectedTopics,
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
          urlParams: Object.fromEntries(new URLSearchParams(window.location.search)),
          website: honeypot,
          _formStartTime: formStartTime.toString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Speaking inquiry submission failed");
      }

      trackSpeaking("form_submit", selectedTopics[0]);
      toast.success("Inquiry sent — you'll hear back within two business days.");
      reset();
      setHoneypot("");
    } catch (error) {
      console.error("Error submitting speaking inquiry:", error);
      trackApplicationError(
        "speaking_form_exception",
        String(error),
        "speaking_inquiry_form",
        true
      );
      toast.error("Failed to send your inquiry. Please try again, or email hello@jarrettstanley.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }}
      >
        <label htmlFor="website-speaking">Website</label>
        <input
          type="text"
          id="website-speaking"
          name="website"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="first_name">First name *</Label>
          <Input id="first_name" {...register("first_name")} className="mt-2" />
          <FieldError message={errors.first_name?.message} />
        </div>
        <div>
          <Label htmlFor="last_name">Last name *</Label>
          <Input id="last_name" {...register("last_name")} className="mt-2" />
          <FieldError message={errors.last_name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} className="mt-2" />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} className="mt-2" />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="company">Organization *</Label>
          <Input id="company" {...register("company")} className="mt-2" />
          <FieldError message={errors.company?.message} />
        </div>
        <div>
          <Label htmlFor="role">Your role</Label>
          <Input id="role" {...register("role")} className="mt-2" />
          <FieldError message={errors.role?.message} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="event_name">Event name *</Label>
          <Input id="event_name" {...register("event_name")} className="mt-2" />
          <FieldError message={errors.event_name?.message} />
        </div>
        <div>
          <Label htmlFor="event_date">Event date *</Label>
          <Input
            id="event_date"
            type="date"
            {...register("event_date")}
            className="mt-2"
          />
          <FieldError message={errors.event_date?.message} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="event_location">Location or venue</Label>
          <Input
            id="event_location"
            placeholder="City, venue, or “virtual”"
            {...register("event_location")}
            className="mt-2"
          />
          <FieldError message={errors.event_location?.message} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <Label htmlFor="event_format">Format *</Label>
          <Controller
            control={control}
            name="event_format"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={(value) => value && field.onChange(value)}>
                <SelectTrigger id="event_format" className="mt-2">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_FORMATS.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.event_format?.message} />
        </div>
        <div>
          <Label htmlFor="audience_size">Audience size *</Label>
          <Select onValueChange={(value) => setValue("audience_size", value as SpeakingFormData["audience_size"])}>
            <SelectTrigger id="audience_size" className="mt-2">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {AUDIENCE_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.audience_size?.message} />
        </div>
        <div>
          <Label htmlFor="budget_range">Budget *</Label>
          <Select onValueChange={(value) => setValue("budget_range", value as SpeakingFormData["budget_range"])}>
            <SelectTrigger id="budget_range" className="mt-2">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_RANGES.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.budget_range?.message} />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-hp-text">
          Topics you are interested in
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SPEAKING_TOPICS.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <button
                type="button"
                key={topic}
                onClick={() => toggleTopic(topic)}
                aria-pressed={isSelected}
                className="choice aria-pressed:border-[oklch(0.72_0.155_298/0.65)] aria-pressed:bg-[oklch(0.42_0.13_298/0.24)] aria-pressed:text-hp-text"
              >
                {topic}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="message">About your audience and goals *</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Who is in the room, what should they walk out with, and anything else that shapes the session."
          {...register("message")}
          className="mt-2"
        />
        <FieldError message={errors.message?.message} />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-self-start">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send speaking inquiry"
        )}
      </button>

      <p className="text-sm text-hp-soft">
        Fees vary with event type, location, and how much the session is customized. You will get
        a specific quote back, not a rate card.
      </p>
    </form>
  );
}
