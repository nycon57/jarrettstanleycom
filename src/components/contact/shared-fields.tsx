"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface SharedFieldsProps {
  formData: ContactFormData;
  onFieldChange: (field: string, value: string) => void;
  emailPlaceholder?: string;
}

export function NameFields({ formData, onFieldChange }: SharedFieldsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="gap-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onFieldChange("firstName", e.target.value)}
          required
          placeholder="First name"
          className="bg-background"
        />
      </div>
      <div className="gap-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onFieldChange("lastName", e.target.value)}
          required
          placeholder="Last name"
          className="bg-background"
        />
      </div>
    </div>
  );
}

export function ContactFields({ formData, onFieldChange, emailPlaceholder = "you@company.com" }: SharedFieldsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="gap-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          required
          placeholder={emailPlaceholder}
          className="bg-background"
        />
      </div>
      <div className="gap-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
          className="bg-background"
        />
      </div>
    </div>
  );
}

export function HoneypotField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        opacity: 0,
        pointerEvents: 'none'
      }}
    >
      <label htmlFor="website">Website (leave blank)</label>
      <input
        type="text"
        id="website"
        name="website"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
