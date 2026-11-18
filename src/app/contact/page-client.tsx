"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconArrowRight as ArrowRight, IconCheck as CheckCircle, IconSend as Send, IconCamera as Camera } from '@/components/icons/iconmcp/icons'
import { IconMic as IconMicrophone, IconBriefcase, IconCamera } from '@/components/icons/iconmcp/icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useFormSuccess } from "@/hooks/use-form-success";
import { ContactFormSuccess } from "@/components/ui/form-success-components";
import { NameFields, ContactFields, HoneypotField } from "@/components/contact/shared-fields";
import { MediaOutletField, MediaDetailFields, MediaMessageField } from "@/components/contact/media-inquiry-fields";
import { CompanyField, GeneralMessageField } from "@/components/contact/general-fields";

// Contact pathway configurations
const contactPathways = [
  {
    title: "Speaking Engagements",
    description: "Book Jarrett for keynotes, panels, and workshops on AI-powered marketing",
    icon: IconMicrophone,
    action: "Request Speaking",
    href: "#contact-form",
    color: "bg-lilac",
    type: "speaking",
    features: [
      "AI Marketing Strategy",
      "Digital Transformation",
      "Industry Insights",
      "Custom Presentations"
    ]
  },
  {
    title: "Consulting Services",
    description: "Transform your marketing with AI expertise and strategic guidance",
    icon: IconBriefcase,
    action: "Explore Consulting",
    href: "#contact-form",
    color: "bg-orchid",
    type: "consulting",
    features: [
      "AI Implementation",
      "Marketing Automation",
      "Team Training",
      "Strategic Planning"
    ]
  },
  {
    title: "Media Requests",
    description: "Press interviews, expert commentary, and media appearances",
    icon: IconCamera,
    action: "Media Inquiry",
    href: "#contact-form",
    color: "bg-skyward",
    type: "media",
    features: [
      "Expert Commentary",
      "Industry Analysis",
      "Press Interviews",
      "Thought Leadership"
    ]
  }
];

function useContactPageClientView() {
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    type: "general",
    message: "",

    // Media-specific fields
    outlet: "",
    role: "",
    deadline: "",
    topic: "",
    interviewType: "written",

    // Honeypot field (should remain empty - bots fill this)
    website: ""
  });

  const [loading, setLoading] = useState(false);
  const { isOpen, data, showSuccess, hideSuccess } = useFormSuccess();

  // Track when form was first rendered (for timing-based bot detection)
  const [formStartTime] = useState(() => Date.now());

  // Handle URL parameters to pre-select inquiry type
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type && ['speaking', 'consulting', 'media'].includes(type)) {
      setFormData(prev => ({ ...prev, type }));
    }
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePathwayClick = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSubmit = new FormData();

      // Add honeypot and timing fields for spam protection
      formDataToSubmit.append('website', formData.website);
      formDataToSubmit.append('_formStartTime', formStartTime.toString());

      if (formData.type === 'media') {
        formDataToSubmit.append('first_name', formData.firstName);
        formDataToSubmit.append('last_name', formData.lastName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('outlet', formData.outlet);
        formDataToSubmit.append('role', formData.role);
        formDataToSubmit.append('deadline', formData.deadline);
        formDataToSubmit.append('topic', formData.topic);
        formDataToSubmit.append('interview_type', formData.interviewType);
        formDataToSubmit.append('message', formData.message);

        formDataToSubmit.append('userAgent', navigator.userAgent);
        formDataToSubmit.append('referrer', document.referrer);
        formDataToSubmit.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

        const response = await fetch('/api/contact/media', {
          method: 'POST',
          body: formDataToSubmit,
        });
        const result = await response.json();

        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Media inquiry submitted! We'll respond as soon as possible.");
          resetForm();
        }
      } else {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName;
        formDataToSubmit.append('name', fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('company', formData.company);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('type', formData.type);
        formDataToSubmit.append('message', formData.message);

        formDataToSubmit.append('userAgent', navigator.userAgent);
        formDataToSubmit.append('referrer', document.referrer);
        formDataToSubmit.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formDataToSubmit,
        });
        const result = await response.json();

        if (result.error) {
          toast.error(result.error);
        } else if (result.success) {
          const fullName = `${formData.firstName} ${formData.lastName}`.trim();
          showSuccess({ name: fullName });
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      type: "general",
      message: "",
      outlet: "",
      role: "",
      deadline: "",
      topic: "",
      interviewType: "written",
      website: ""
    });
  };

  const isMediaInquiry = formData.type === 'media';

  return (
    <>
      <ContactFormSuccess
        isOpen={isOpen}
        onClose={hideSuccess}
        name={data.name}
      />
      <section className="page-hero page-hero--tight">
        <div className="shell relative z-[2] stagger">
          <h1 className="t-hero max-w-[14ch]" style={{ '--i': 0 } as React.CSSProperties}>
            Let&apos;s talk.
          </h1>
          <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
            Whether you need expert speaking, strategic consulting, or media commentary on AI marketing, I&apos;m here to
            help. Choose the path that best fits your needs.
          </p>
        </div>
      </section>

      <section className="hp-section !pt-0" aria-label="Ways to work together">
        <div className="shell">
          <ul className="border-t border-hp-rule">
            {contactPathways.map((pathway) => {
              const isSpeaking = pathway.type === 'speaking'
              return (
                <li
                  key={pathway.type}
                  className="grid gap-4 border-b border-hp-rule py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_15rem] md:items-baseline md:gap-12"
                >
                  <h2 className="t-title">{pathway.title}</h2>
                  <p className="text-[0.9375rem] leading-relaxed text-hp-muted">{pathway.description}</p>
                  {isSpeaking ? (
                    <Link href="/speaking#book" className="btn-ghost justify-self-start md:justify-self-end">
                      Send a speaking inquiry
                      <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePathwayClick(pathway.type)}
                      className="btn-ghost justify-self-start md:justify-self-end"
                    >
                      {pathway.action}
                      <ArrowRight className="size-4" />
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section id="contact-form" className="hp-section hp-section--lift scroll-mt-20" aria-labelledby="contact-form-title">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="contact-form-title" className="t-headline">
              {isMediaInquiry ? 'Media inquiry.' : 'Send me a message.'}
            </h2>
            <p className="t-lede mt-5">
              {isMediaInquiry
                ? "Looking for expert commentary on AI marketing, mortgage industry trends, or digital transformation? I'm available for interviews, quotes, and media appearances."
                : "Have a question or want to discuss how AI can transform your marketing? Fill out the form and I'll get back to you as soon as possible."}
            </p>
            <ul className="mt-8 grid gap-3 text-[0.9375rem] text-hp-text">
              {[isMediaInquiry ? 'Response within 4 hours' : 'Quick and personalized response', 'Expert insights and recommendations', 'No sales pitch, just helpful advice'].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-hp-lilac" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hp-card p-6 sm:p-9">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <HoneypotField
                value={formData.website}
                onChange={(value) => handleFieldChange("website", value)}
              />

              <NameFields formData={formData} onFieldChange={handleFieldChange} />

              <ContactFields
                formData={formData}
                onFieldChange={handleFieldChange}
                emailPlaceholder={isMediaInquiry ? "journalist@outlet.com" : "you@company.com"}
              />

              {isMediaInquiry ? (
                <MediaOutletField formData={formData} onFieldChange={handleFieldChange} />
              ) : (
                <CompanyField formData={formData} onFieldChange={handleFieldChange} />
              )}

              <div className="grid gap-2">
                <Label htmlFor="type">Inquiry type</Label>
                <Select value={formData.type} onValueChange={(value) => handleFieldChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General question</SelectItem>
                    <SelectItem value="consulting">Consulting interest</SelectItem>
                    <SelectItem value="speaking">Speaking opportunity</SelectItem>
                    <SelectItem value="media">Media inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isMediaInquiry && (
                <>
                  <MediaDetailFields formData={formData} onFieldChange={handleFieldChange} />
                  <MediaMessageField formData={formData} onFieldChange={handleFieldChange} />
                </>
              )}

              {!isMediaInquiry && (
                <GeneralMessageField formData={formData} onFieldChange={handleFieldChange} />
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-self-start">
                {loading
                  ? isMediaInquiry ? 'Submitting…' : 'Sending…'
                  : isMediaInquiry ? 'Submit media inquiry' : 'Send message'}
                {isMediaInquiry ? <Camera className="size-4" /> : <Send className="size-4" />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );

}

export default function ContactPageClient() {
  return useContactPageClientView();
}

