"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Send,
  Mic,
  Briefcase,
  Camera,
  Users,
  ExternalLink,
  Download,
  Globe
} from "lucide-react";
import { 
  IconMail, 
  IconPhone, 
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMicrophone,
  IconBriefcase,
  IconCamera,
  IconUsers,
  IconDownload,
  IconCalendar
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heading, Text } from "@/components/ui/typography";
import { toast } from "sonner";
import Link from "next/link";
import { submitContactForm, submitMediaInquiry } from "@/app/actions/email";

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

// Social media links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    href: "https://linkedin.com/in/jarrettstanley",
    color: "bg-[#0077b5] dark:bg-[#0077b5]",
    description: "Professional insights and industry updates"
  },
  {
    name: "Twitter",
    icon: IconBrandTwitter,
    href: "https://twitter.com/jarrettstanley",
    color: "bg-[#1da1f2] dark:bg-[#1da1f2]",
    description: "Quick thoughts and real-time commentary"
  }
];


export default function ContactPage() {
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
    interviewType: "written"
  });
  
  const [loading, setLoading] = useState(false);

  // Handle URL parameters to pre-select inquiry type
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type && ['speaking', 'consulting', 'media'].includes(type)) {
      setFormData(prev => ({ ...prev, type }));
    }
  }, []);

  const handlePathwayClick = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    // Smooth scroll to form
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
      
      if (formData.type === 'media') {
        // Prepare media inquiry data
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
        
        // Add tracking data
        formDataToSubmit.append('userAgent', navigator.userAgent);
        formDataToSubmit.append('referrer', document.referrer);
        formDataToSubmit.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

        const result = await submitMediaInquiry(formDataToSubmit);
        
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Media inquiry submitted! We'll respond as soon as possible.");
          resetForm();
        }
      } else {
        // Prepare general contact data
        const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName;
        formDataToSubmit.append('name', fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('company', formData.company);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('type', formData.type);
        formDataToSubmit.append('message', formData.message);
        
        // Add tracking data
        formDataToSubmit.append('userAgent', navigator.userAgent);
        formDataToSubmit.append('referrer', document.referrer);
        formDataToSubmit.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

        const result = await submitContactForm(formDataToSubmit);
        
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Message sent successfully! I'll get back to you as soon as possible.");
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
      interviewType: "written"
    });
  };

  const isMediaInquiry = formData.type === 'media';

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-32 pt-40 overflow-hidden bg-gradient-to-br from-lilac/10 via-background to-orchid/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 w-fit"
          >
            <Badge variant="lilac" size="lg" className="backdrop-blur">
              Let's Connect
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Heading variant="h1" className="mx-auto max-w-4xl text-balance text-center">
              Ready to Transform Your <span className="text-lilac">Marketing with AI?</span>
            </Heading>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Text variant="large" className="mx-auto max-w-3xl text-center text-muted-foreground">
              Whether you need expert speaking, strategic consulting, or media commentary on AI marketing, 
              I'm here to help. Choose the path that best fits your needs.
            </Text>
          </motion.div>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handlePathwayClick(pathway.type)}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-6">
                <motion.div 
                  className={`w-12 h-12 rounded-full ${pathway.color} flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <pathway.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-foreground text-center">{pathway.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">{pathway.description}</p>
                
                <div className="space-y-2 mb-4">
                  {pathway.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lilac" />
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Contact Form */}
      <section id="contact-form" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
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
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-lilac" />
                    <span className="text-foreground">
                      {isMediaInquiry ? 'Response within 4 hours' : 'Quick and Personalized response'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-lilac" />
                    <span className="text-foreground">Expert insights and recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-lilac" />
                    <span className="text-foreground">No sales pitch, just helpful advice</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="elevated">
                  <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        placeholder="First name"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        placeholder="Last name"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Contact fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder={isMediaInquiry ? "journalist@outlet.com" : "you@company.com"}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Company/Outlet field */}
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      {isMediaInquiry ? 'Media Outlet *' : 'Company'}
                    </Label>
                    <Input
                      id="company"
                      value={isMediaInquiry ? formData.outlet : formData.company}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        [isMediaInquiry ? 'outlet' : 'company']: e.target.value 
                      }))}
                      required={isMediaInquiry}
                      placeholder={isMediaInquiry ? "e.g., Forbes, Wall Street Journal" : "Your company"}
                      className="bg-background"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Inquiry Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
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
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="role">Your Role *</Label>
                          <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            required
                            placeholder="e.g., Staff Writer, Editor"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deadline">Deadline</Label>
                          <Input
                            id="deadline"
                            type="datetime-local"
                            value={formData.deadline}
                            onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="topic">Story Topic *</Label>
                          <Input
                            id="topic"
                            value={formData.topic}
                            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                            required
                            placeholder="e.g., AI in mortgage marketing"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interviewType">Interview Format *</Label>
                          <Select 
                            value={formData.interviewType} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, interviewType: value }))}
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
                  )}

                  {/* Message field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {isMediaInquiry ? 'Additional Details' : 'Message *'}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required={!isMediaInquiry}
                      placeholder={isMediaInquiry 
                        ? "Background on the story, specific angles you're exploring, questions you have..."
                        : "Tell me about your goals, challenges, or what you'd like to discuss..."
                      }
                      className="min-h-[120px] bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant={isMediaInquiry ? 'skyward' : 'gradient'}
                    className="w-full"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Send className="mr-2 h-4 w-4 animate-pulse" />
                        {isMediaInquiry ? 'Submitting...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        {isMediaInquiry ? <Camera className="mr-2 h-4 w-4" /> : <Send className="mr-2 h-4 w-4" />}
                        {isMediaInquiry ? 'Submit Media Inquiry' : 'Send Message'}
                      </>
                    )}
                  </Button>
                </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connect & Press Kit - Hidden */}
      {/* <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Social Media */}
              {/* <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <Heading variant="h3" className="mb-4">Connect on Social Media</Heading>
                <Text className="text-muted-foreground mb-6">
                  Follow me for daily insights, industry updates, and behind-the-scenes content from my work in AI marketing innovation.
                </Text>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${link.color} text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:opacity-90 transition-opacity`}
                    >
                      <link.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{link.name}</div>
                        <div className="text-xs opacity-90">{link.description}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div> */}

              {/* Press Kit */}
              {/* <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <Heading variant="h3" className="mb-4">Media & Press Kit</Heading>
                <Text className="text-muted-foreground mb-6">
                  High-resolution photos, bio, and background materials for journalists and event organizers.
                </Text>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="w-4 h-4 text-lilac" />
                    <span className="text-sm text-foreground">Professional headshots (high-res)</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="w-4 h-4 text-lilac" />
                    <span className="text-sm text-foreground">Detailed biography and credentials</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="w-4 h-4 text-lilac" />
                    <span className="text-sm text-foreground">AI marketing platform case studies and examples</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="w-4 h-4 text-lilac" />
                    <span className="text-sm text-foreground">Speaking topics and sample presentations</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    asChild 
                    variant="lilac"
                  >
                    <Link href="mailto:jarrett@jarrettstanley.com?subject=Press Kit Request">
                      <Download className="mr-2 h-4 w-4" />
                      Request Press Kit
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="lilac"
                  >
                    <Link href="/speaking">
                      <Mic className="mr-2 h-4 w-4" />
                      Speaking Info
                    </Link>
                  </Button>
                </div>
              </motion.div> */}
            {/* </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}