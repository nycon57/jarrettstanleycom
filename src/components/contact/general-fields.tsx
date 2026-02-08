"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GeneralFormData {
  company: string;
  message: string;
}

interface GeneralFieldsProps {
  formData: GeneralFormData;
  onFieldChange: (field: string, value: string) => void;
}

export function CompanyField({ formData, onFieldChange }: GeneralFieldsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="company">Company</Label>
      <Input
        id="company"
        value={formData.company}
        onChange={(e) => onFieldChange("company", e.target.value)}
        placeholder="Your company"
        className="bg-background"
      />
    </div>
  );
}

export function GeneralMessageField({ formData, onFieldChange }: GeneralFieldsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message *</Label>
      <Textarea
        id="message"
        value={formData.message}
        onChange={(e) => onFieldChange("message", e.target.value)}
        required
        placeholder="Tell me about your goals, challenges, or what you'd like to discuss..."
        className="min-h-[120px] bg-background"
      />
    </div>
  );
}
