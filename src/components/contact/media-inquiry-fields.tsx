"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaFormData {
  outlet: string;
  role: string;
  deadline: string;
  topic: string;
  interviewType: string;
  message: string;
}

interface MediaInquiryFieldsProps {
  formData: MediaFormData;
  onFieldChange: (field: string, value: string) => void;
}

export function MediaOutletField({ formData, onFieldChange }: MediaInquiryFieldsProps) {
  return (
    <div className="gap-y-2">
      <Label htmlFor="outlet">Media Outlet *</Label>
      <Input
        id="outlet"
        value={formData.outlet}
        onChange={(e) => onFieldChange("outlet", e.target.value)}
        required
        placeholder="e.g., Forbes, Wall Street Journal"
        className="bg-background"
      />
    </div>
  );
}

export function MediaDetailFields({ formData, onFieldChange }: MediaInquiryFieldsProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="gap-y-2">
          <Label htmlFor="role">Your Role *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => onFieldChange("role", e.target.value)}
            required
            placeholder="e.g., Staff Writer, Editor"
            className="bg-background"
          />
        </div>
        <div className="gap-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => onFieldChange("deadline", e.target.value)}
            className="bg-background"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="gap-y-2">
          <Label htmlFor="topic">Story Topic *</Label>
          <Input
            id="topic"
            value={formData.topic}
            onChange={(e) => onFieldChange("topic", e.target.value)}
            required
            placeholder="e.g., AI in mortgage marketing"
            className="bg-background"
          />
        </div>
        <div className="gap-y-2">
          <Label htmlFor="interviewType">Interview Format *</Label>
          <Select
            value={formData.interviewType}
            onValueChange={(value) => onFieldChange("interviewType", value)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="written">Written Q&A</SelectItem>
              <SelectItem value="phone">Phone Interview</SelectItem>
              <SelectItem value="video">Video Interview</SelectItem>
              <SelectItem value="in-person">In-Person Interview</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

export function MediaMessageField({ formData, onFieldChange }: MediaInquiryFieldsProps) {
  return (
    <div className="gap-y-2">
      <Label htmlFor="message">Additional Details</Label>
      <Textarea
        id="message"
        value={formData.message}
        onChange={(e) => onFieldChange("message", e.target.value)}
        placeholder="Background on the story, specific angles you're exploring, questions you have..."
        className="min-h-[120px] bg-background"
      />
    </div>
  );
}
