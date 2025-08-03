"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Clock, 
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
    href: "/speaking",
    color: "bg-green-500",
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
    href: "/services/consulting",
    color: "bg-blue-500",
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
    href: "#media-form",
    color: "bg-orange-500",
    features: [
      "Expert Commentary",
      "Industry Analysis",
      "Press Interviews",
      "Thought Leadership"
    ]
  },
  {
    title: "Partnership Opportunities",
    description: "Strategic partnerships and collaboration opportunities",
    icon: IconUsers,
    action: "Discuss Partnership",
    href: "#general-contact",
    color: "bg-purple-500",
    features: [
      "Strategic Alliances",
      "Technology Integration",
      "Co-marketing",
      "Joint Ventures"
    ]
  }
];

// Social media links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: IconBrandLinkedin,
    href: "https://linkedin.com/in/jarrettstanley",
    color: "bg-[#0077b5]",
    description: "Professional insights and industry updates"
  },
  {
    name: "Twitter",
    icon: IconBrandTwitter,
    href: "https://twitter.com/jarrettstanley",
    color: "bg-[#1da1f2]",
    description: "Quick thoughts and real-time commentary"
  }
];

// Response time expectations
const responseExpectations = [
  {
    type: "Media Requests",
    time: "4 hours",
    description: "Urgent media inquiries and breaking news"
  },
  {
    type: "Speaking Inquiries",
    time: "24 hours",
    description: "Event bookings and speaking opportunities"
  },
  {
    type: "Consulting Requests",
    time: "24 hours",
    description: "Business consulting and strategic partnerships"
  },
  {
    type: "General Inquiries",
    time: "24-48 hours",
    description: "All other questions and requests"
  }
];

export default function ContactPage() {
  const [generalFormData, setGeneralFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    type: "general",
    message: "",
  });
  const [mediaFormData, setMediaFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    outlet: "",
    role: "",
    deadline: "",
    topic: "",
    interviewType: "written",
    message: "",
  });
  const [generalLoading, setGeneralLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralLoading(true);

    try {
      const formData = new FormData();
      Object.entries(generalFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add tracking data
      formData.append('userAgent', navigator.userAgent);
      formData.append('referrer', document.referrer);
      formData.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

      const result = await submitContactForm(formData);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setGeneralFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          type: "general",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setGeneralLoading(false);
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMediaLoading(true);

    try {
      const formData = new FormData();
      Object.entries(mediaFormData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add tracking data
      formData.append('userAgent', navigator.userAgent);
      formData.append('referrer', document.referrer);
      formData.append('urlParams', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search))));

      const result = await submitMediaInquiry(formData);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Media inquiry submitted! We'll respond within 4 hours.");
        setMediaFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          outlet: "",
          role: "",
          deadline: "",
          topic: "",
          interviewType: "written",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending media inquiry:", error);
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setMediaLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-lilac/10 via-background to-orchid/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 w-fit rounded-full border border-lilac/20 bg-lilac/5 px-6 py-3 text-sm text-foreground backdrop-blur"
          >
            Let's Connect
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-4xl text-balance text-4xl font-bold text-foreground lg:text-6xl mb-6"
          >
            Ready to Transform Your <span className="text-lilac">Marketing with AI?</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-3xl text-xl text-muted-foreground mb-8"
          >
            Whether you need expert speaking, strategic consulting, or media commentary on AI marketing, 
            I'm here to help. Choose the path that best fits your needs.
          </motion.p>
        </div>
      </section>

      {/* Contact Pathways */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">How Can I Help You?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the best pathway based on your specific needs and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactPathways.map((pathway, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg border border-lilac/10 hover:shadow-xl transition-all group"
              >
                <div className={`w-12 h-12 rounded-full ${pathway.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <pathway.icon className="w-6 h-6 text-white" />
                </div>
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
                  asChild 
                  size="sm" 
                  variant="outline" 
                  className="w-full hover:bg-lilac/10 transition-colors"
                >
                  <Link href={pathway.href}>{pathway.action}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* General Contact Form */}
      <section id="general-contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Send Me a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have a question or want to discuss how AI can transform your marketing? 
                  Fill out the form and I'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-lilac" />
                    <span className="text-foreground">Personalized response within 24 hours</span>
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
                className="bg-background rounded-2xl p-8 shadow-lg border border-lilac/10"
              >
                <form onSubmit={handleGeneralSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={generalFormData.name}
                        onChange={(e) => setGeneralFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder="Your full name"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={generalFormData.email}
                        onChange={(e) => setGeneralFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder="you@company.com"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={generalFormData.company}
                        onChange={(e) => setGeneralFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your company"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={generalFormData.phone}
                        onChange={(e) => setGeneralFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Inquiry Type</Label>
                    <Select value={generalFormData.type} onValueChange={(value) => setGeneralFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="consulting">Consulting Interest</SelectItem>
                        <SelectItem value="speaking">Speaking Opportunity</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={generalFormData.message}
                      onChange={(e) => setGeneralFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      placeholder="Tell me about your goals, challenges, or what you'd like to discuss..."
                      className="min-h-[120px] bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-lilac hover:bg-lilac/90" 
                    disabled={generalLoading}
                    size="lg"
                  >
                    {generalLoading ? (
                      <>
                        <Send className="mr-2 h-4 w-4 animate-pulse" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Inquiry Form */}
      <section id="media-form" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Media Inquiries</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Looking for expert commentary on AI marketing, mortgage industry trends, or digital transformation? 
                I'm available for interviews, quotes, and media appearances.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Response within 4 hours</span>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-lilac/10">
              <form onSubmit={handleMediaSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={mediaFormData.firstName}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                      placeholder="First name"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={mediaFormData.lastName}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                      placeholder="Last name"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mediaEmail">Email *</Label>
                    <Input
                      id="mediaEmail"
                      type="email"
                      value={mediaFormData.email}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="journalist@outlet.com"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediaPhone">Phone</Label>
                    <Input
                      id="mediaPhone"
                      type="tel"
                      value={mediaFormData.phone}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="outlet">Media Outlet *</Label>
                    <Input
                      id="outlet"
                      value={mediaFormData.outlet}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, outlet: e.target.value }))}
                      required
                      placeholder="e.g., Forbes, Wall Street Journal"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role *</Label>
                    <Input
                      id="role"
                      value={mediaFormData.role}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, role: e.target.value }))}
                      required
                      placeholder="e.g., Staff Writer, Editor"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="datetime-local"
                      value={mediaFormData.deadline}
                      onChange={(e) => setMediaFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interviewType">Interview Format *</Label>
                    <Select 
                      value={mediaFormData.interviewType} 
                      onValueChange={(value) => setMediaFormData(prev => ({ ...prev, interviewType: value }))}
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

                <div className="space-y-2">
                  <Label htmlFor="topic">Story Topic *</Label>
                  <Input
                    id="topic"
                    value={mediaFormData.topic}
                    onChange={(e) => setMediaFormData(prev => ({ ...prev, topic: e.target.value }))}
                    required
                    placeholder="e.g., AI in mortgage marketing, digital transformation trends"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mediaMessage">Additional Details</Label>
                  <Textarea
                    id="mediaMessage"
                    value={mediaFormData.message}
                    onChange={(e) => setMediaFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Background on the story, specific angles you're exploring, questions you have..."
                    className="min-h-[100px] bg-background"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600" 
                  disabled={mediaLoading}
                  size="lg"
                >
                  {mediaLoading ? (
                    <>
                      <Camera className="mr-2 h-4 w-4 animate-pulse" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Submit Media Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Response Expectations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Response Time Expectations</h2>
            <p className="text-muted-foreground">I understand your time is valuable. Here's what you can expect:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {responseExpectations.map((expectation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-md border border-lilac/10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-lilac/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-lilac" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{expectation.type}</h3>
                <div className="text-2xl font-bold text-lilac mb-2">{expectation.time}</div>
                <p className="text-sm text-muted-foreground">{expectation.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Connect & Press Kit */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">Connect on Social Media</h3>
                <p className="text-muted-foreground mb-6">
                  Follow me for daily insights, industry updates, and behind-the-scenes content from building TrueTone AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link.color} text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:opacity-90 transition-opacity`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{link.name}</div>
                        <div className="text-xs opacity-90">{link.description}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Press Kit */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">Digital Press Kit</h3>
                <p className="text-muted-foreground mb-6">
                  High-resolution photos, detailed bio, company information, and recent achievements for media use.
                </p>
                
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
                    <span className="text-sm text-foreground">TrueTone AI screenshots and logos</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="w-4 h-4 text-lilac" />
                    <span className="text-sm text-foreground">Speaking topics and presentations</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  <a href="mailto:jarrett@jarrettstanley.com?subject=Press Kit Request">
                    <Download className="mr-2 h-4 w-4" />
                    Request Press Kit
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact Info */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Prefer Direct Contact?</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 shadow-md border border-lilac/10">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">Email</h4>
                <a 
                  href="mailto:jarrett@jarrettstanley.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  jarrett@jarrettstanley.com
                </a>
                <p className="text-sm text-muted-foreground mt-2">Best for detailed questions and follow-ups</p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-md border border-lilac/10">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <IconCalendar className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">Schedule a Call</h4>
                <a 
                  href="https://calendly.com/jarrettstanley/consultation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Book 30-min consultation
                </a>
                <p className="text-sm text-muted-foreground mt-2">For strategic discussions and planning</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}