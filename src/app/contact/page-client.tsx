"use client";

import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
  CheckCircle,
  Send,
  Camera,
} from "lucide-react";
import {
  IconMicrophone,
  IconBriefcase,
  IconCamera,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heading, Text } from "@/components/ui/typography";
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
      <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-32 pt-40 overflow-hidden bg-gradient-to-br from-lilac/10 via-background to-orchid/10">
        <div className="container mx-auto px-4 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 w-fit"
          >
            <Badge variant="lilac" size="lg" className="backdrop-blur">
              Let's Connect
            </Badge>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Heading variant="h1" className="mx-auto max-w-4xl text-balance text-center">
              Ready to Transform Your <span className="text-lilac">Marketing with AI?</span>
            </Heading>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Text variant="large" className="mx-auto max-w-3xl text-center text-muted-foreground">
              Whether you need expert speaking, strategic consulting, or media commentary on AI marketing,
              I'm here to help. Choose the path that best fits your needs.
            </Text>
          </m.div>
        </div>
      </section>

      {/* Contact Pathways */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading variant="h2" className="mb-4 text-center">How Can I Help You?</Heading>
            <Text className="text-muted-foreground max-w-2xl mx-auto text-center">
              Choose the best pathway based on your specific needs and goals
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactPathways.map((pathway, index) => (
              <m.div
                key={pathway.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handlePathwayClick(pathway.type)}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-6">
                <m.div
                  className={`size-12 rounded-full ${pathway.color} flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <pathway.icon className="size-6 text-white" />
                </m.div>
                <h3 className="text-lg font-semibold mb-2 text-foreground text-center">{pathway.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">{pathway.description}</p>

                <div className="gap-y-2 mb-4">
                  {pathway.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-lilac" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="lilac"
                  className="w-full"
                >
                  {pathway.action}
                </Button>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Contact Form */}
      <section id="contact-form" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <m.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Heading variant="h2" className="mb-6">
                  {isMediaInquiry ? 'Media Inquiry' : 'Send Me a Message'}
                </Heading>
                <Text className="text-muted-foreground mb-8">
                  {isMediaInquiry
                    ? "Looking for expert commentary on AI marketing, mortgage industry trends, or digital transformation? I'm available for interviews, quotes, and media appearances."
                    : "Have a question or want to discuss how AI can transform your marketing? Fill out the form and I'll get back to you as soon as possible."
                  }
                </Text>

                <div className="gap-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-lilac" />
                    <span className="text-foreground">
                      {isMediaInquiry ? 'Response within 4 hours' : 'Quick and Personalized response'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-lilac" />
                    <span className="text-foreground">Expert insights and recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-lilac" />
                    <span className="text-foreground">No sales pitch, just helpful advice</span>
                  </div>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="elevated">
                  <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="gap-y-6">
                  <HoneypotField
                    value={formData.website}
                    onChange={(value) => handleFieldChange("website", value)}
                  />

                  <NameFields
                    formData={formData}
                    onFieldChange={handleFieldChange}
                  />

                  <ContactFields
                    formData={formData}
                    onFieldChange={handleFieldChange}
                    emailPlaceholder={isMediaInquiry ? "journalist@outlet.com" : "you@company.com"}
                  />

                  {/* Company/Outlet field — variant-specific */}
                  {isMediaInquiry ? (
                    <MediaOutletField formData={formData} onFieldChange={handleFieldChange} />
                  ) : (
                    <CompanyField formData={formData} onFieldChange={handleFieldChange} />
                  )}

                  {/* Inquiry Type */}
                  <div className="gap-y-2">
                    <Label htmlFor="type">Inquiry Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleFieldChange("type", value)}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="consulting">Consulting Interest</SelectItem>
                        <SelectItem value="speaking">Speaking Opportunity</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Media-specific fields */}
                  {isMediaInquiry && (
                    <>
                      <MediaDetailFields formData={formData} onFieldChange={handleFieldChange} />
                      <MediaMessageField formData={formData} onFieldChange={handleFieldChange} />
                    </>
                  )}

                  {/* General message field */}
                  {!isMediaInquiry && (
                    <GeneralMessageField formData={formData} onFieldChange={handleFieldChange} />
                  )}

                  <Button
                    type="submit"
                    variant={isMediaInquiry ? 'skyward' : 'gradient'}
                    className="w-full"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Send className="mr-2 size-4 animate-pulse" />
                        {isMediaInquiry ? 'Submitting...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        {isMediaInquiry ? <Camera className="mr-2 size-4" /> : <Send className="mr-2 size-4" />}
                        {isMediaInquiry ? 'Submit Media Inquiry' : 'Send Message'}
                      </>
                    )}
                  </Button>
                </form>
                  </CardContent>
                </Card>
              </m.div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );

}

export default function ContactPageClient() {
  return useContactPageClientView();
}

