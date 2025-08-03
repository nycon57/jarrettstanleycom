"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconBook, IconVideo, IconMicrophone, IconDownload, IconUsers, IconTrendingUp, IconCalendar, IconStar, IconSearch, IconFilter, IconTag } from "@tabler/icons-react";
import { CheckCircle, ArrowRight, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const resourceCategories = [
  { id: "all", name: "All Resources", count: 45, icon: IconBook },
  { id: "guides", name: "Guides & Tutorials", count: 18, icon: IconBook },
  { id: "videos", name: "Video Content", count: 12, icon: IconVideo },
  { id: "webinars", name: "Webinars", count: 8, icon: IconUsers },
  { id: "templates", name: "Templates", count: 7, icon: IconDownload }
];

const featuredResources = [
  {
    id: 1,
    title: "Complete Guide to AI-Powered Mortgage Marketing",
    description: "Everything you need to know about using AI to transform your mortgage marketing strategy and generate more leads.",
    type: "guide",
    category: "guides",
    readTime: "15 min read",
    views: "3.2K",
    date: "Dec 15, 2024",
    image: "https://nksqewatarrgiqvnddcp.supabase.co/storage/v1/object/public/ttai-media/subdomains/default-theme/stock/16x9/16x9-ttai-stock-110.jpg",
    featured: true,
    tags: ["AI Marketing", "Lead Generation", "Strategy"]
  },
  {
    id: 2,
    title: "Voice Modeling Best Practices",
    description: "Learn how to create the perfect voice model for authentic content generation.",
    type: "video",
    category: "videos",
    readTime: "8 min watch",
    views: "2.8K",
    date: "Dec 12, 2024",
    image: "https://nksqewatarrgiqvnddcp.supabase.co/storage/v1/object/public/ttai-media/subdomains/default-theme/stock/16x9/16x9-ttai-stock-111.jpg",
    featured: true,
    tags: ["Voice Modeling", "Setup", "Best Practices"]
  },
  {
    id: 3,
    title: "Compliance Automation for Mortgage Professionals",
    description: "Ensure perfect compliance across all your marketing materials with automated tools.",
    type: "webinar",
    category: "webinars",
    readTime: "45 min webinar",
    views: "1.9K",
    date: "Dec 10, 2024",
    image: "https://nksqewatarrgiqvnddcp.supabase.co/storage/v1/object/public/ttai-media/subdomains/default-theme/stock/16x9/16x9-ttai-stock-112.jpg",
    featured: true,
    tags: ["Compliance", "NMLS", "Automation"]
  }
];

const allResources = [
  {
    id: 4,
    title: "Social Media Content Templates",
    description: "Ready-to-use social media templates for mortgage professionals.",
    type: "template",
    category: "templates",
    readTime: "Download",
    views: "2.1K",
    date: "Dec 8, 2024",
    tags: ["Social Media", "Templates", "Content"],
    featured: false
  },
  {
    id: 5,
    title: "Email Marketing Strategies for Loan Officers",
    description: "Proven email marketing tactics to nurture leads and close more loans.",
    type: "guide",
    category: "guides",
    readTime: "12 min read",
    views: "1.7K",
    date: "Dec 5, 2024",
    tags: ["Email Marketing", "Leads", "Conversion"],
    featured: false
  },
  {
    id: 6,
    title: "Building Your Personal Brand in Mortgage",
    description: "Step-by-step guide to establishing yourself as a trusted mortgage expert.",
    type: "video",
    category: "videos",
    readTime: "12 min watch",
    views: "2.3K",
    date: "Dec 3, 2024",
    tags: ["Personal Brand", "Authority", "Trust"],
    featured: false
  },
  {
    id: 7,
    title: "Q4 Mortgage Marketing Trends Webinar",
    description: "Insights and predictions for mortgage marketing in the coming quarter.",
    type: "webinar",
    category: "webinars",
    readTime: "60 min webinar",
    views: "1.5K",
    date: "Nov 28, 2024",
    tags: ["Trends", "Q4", "Marketing"],
    featured: false
  },
  {
    id: 8,
    title: "Blog Post Templates for Mortgage Content",
    description: "Professional blog post templates optimized for mortgage topics.",
    type: "template",
    category: "templates",
    readTime: "Download",
    views: "1.8K",
    date: "Nov 25, 2024",
    tags: ["Blog", "Templates", "SEO"],
    featured: false
  },
  {
    id: 9,
    title: "Client Communication Scripts",
    description: "Proven scripts for every stage of the mortgage process.",
    type: "template",
    category: "templates",
    readTime: "Download",
    views: "3.1K",
    date: "Nov 22, 2024",
    tags: ["Scripts", "Communication", "Process"],
    featured: false
  }
];

const webinars = [
  {
    title: "AI Marketing Mastery for Mortgage Pros",
    date: "January 15, 2025",
    time: "2:00 PM EST",
    presenter: "Sarah Johnson, CEO",
    description: "Learn advanced AI marketing strategies that are driving results for top loan officers.",
    attendees: 245,
    status: "upcoming"
  },
  {
    title: "Compliance Deep Dive: NMLS & Fair Housing",
    date: "January 22, 2025",
    time: "1:00 PM EST",
    presenter: "Jennifer Martinez, VP Product",
    description: "Master compliance requirements and ensure your marketing meets all regulations.",
    attendees: 189,
    status: "upcoming"
  },
  {
    title: "Building Authority Through Content Marketing",
    date: "December 18, 2024",
    time: "2:00 PM EST",
    presenter: "Michael Thompson, VP Sales",
    description: "How to establish yourself as the go-to mortgage expert in your market.",
    attendees: 312,
    status: "recorded"
  }
];

const popularTags = [
  "AI Marketing", "Lead Generation", "Compliance", "Voice Modeling", "Social Media", 
  "Email Marketing", "Personal Brand", "Templates", "NMLS", "Content Strategy"
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = [...featuredResources, ...allResources].filter(resource => {
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-lilac/10 via-background to-orchid/10">
        <motion.div 
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-lilac/10 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-40 h-40 bg-orchid/10 rounded-full blur-2xl"
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 w-fit rounded-full border border-lilac/20 bg-lilac/5 px-6 py-3 text-sm text-foreground backdrop-blur"
          >
            Knowledge Hub & Resource Center
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-4xl text-balance text-4xl font-bold text-foreground lg:text-6xl mb-6"
          >
            Master AI-Powered <span className="text-lilac">Mortgage Marketing</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-3xl text-xl text-muted-foreground mb-8"
          >
            Comprehensive guides, video tutorials, templates, and webinars to help you succeed with TrueTone AI and transform your mortgage marketing strategy.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search guides, videos, templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-lilac focus:border-transparent"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <span className="text-sm text-muted-foreground">Popular tags:</span>
            {popularTags.slice(0, 5).map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="text-sm text-lilac hover:underline"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-lilac text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-lilac/10 hover:text-foreground'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
                <span className="text-xs opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {activeCategory === "all" && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Featured Resources
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our most popular and impactful resources to help you get the most out of TrueTone AI.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8 }}
                  className="bg-background rounded-2xl overflow-hidden shadow-lg border border-lilac/10 hover:shadow-xl hover:border-lilac/30 transition-all group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <motion.span 
                        whileHover={{ scale: 1.1 }}
                        className="bg-lilac text-white px-3 py-1 rounded-full text-xs font-medium uppercase shadow-lg inline-block"
                      >
                        {resource.type}
                      </motion.span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <motion.span 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg inline-block"
                      >
                        Featured
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-lilac transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{resource.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1"
                        >
                          <Clock className="w-4 h-4" />
                          {resource.readTime}
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          {resource.views}
                        </motion.div>
                      </div>
                      <span>{resource.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 2).map((tag, idx) => (
                        <motion.span 
                          key={idx} 
                          whileHover={{ scale: 1.05 }}
                          className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs inline-block"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="flex items-center text-lilac text-sm font-medium"
                    >
                      View Resource <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Resources */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {activeCategory === "all" ? "All Resources" : resourceCategories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <div className="text-muted-foreground">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative bg-card rounded-xl p-6 shadow-lg border border-lilac/10 hover:shadow-xl hover:border-lilac/30 transition-all group cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 to-orchid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-lilac/10 text-lilac px-3 py-1 rounded-full text-xs font-medium uppercase">
                    {resource.type}
                  </span>
                  {resource.featured && (
                    <IconStar className="w-5 h-5 text-orange-500 fill-current" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-lilac transition-colors">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">{resource.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {resource.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {resource.views}
                    </div>
                  </div>
                  <span>{resource.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="flex items-center text-lilac text-sm font-medium"
                >
                  Access Resource <ArrowRight className="w-4 h-4 ml-1" />
                </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Resource Showcase */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden max-w-6xl mx-auto shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-lilac/90 to-orchid/90 p-12 flex flex-col justify-center">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-6"
                >
                  Accelerate Your Success
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/90 mb-8 text-lg"
                >
                  Access our comprehensive library of resources designed specifically for mortgage professionals. From AI marketing guides to compliance templates, we've got everything you need to succeed.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>45+ guides, videos, and templates</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>Monthly live webinars with experts</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5" />
                    <span>Exclusive mortgage industry insights</span>
                  </div>
                </motion.div>
              </div>
              <div className="relative h-[400px] md:h-full">
                <img
                  src="https://nksqewatarrgiqvnddcp.supabase.co/storage/v1/object/public/ttai-media/subdomains/default-theme/stock/16x9/16x9-ttai-stock-115.jpg"
                  alt="Resource Library"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Upcoming Webinars
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our live webinars to learn directly from our experts and connect with other mortgage professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {webinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8 }}
                className="relative bg-background rounded-2xl p-6 shadow-lg border border-lilac/10 hover:border-lilac/30 transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 to-orchid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    webinar.status === 'upcoming' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <IconUsers className="w-4 h-4" />
                    {webinar.attendees}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">{webinar.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{webinar.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconCalendar className="w-4 h-4" />
                    {webinar.date} at {webinar.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconUsers className="w-4 h-4" />
                    Presented by {webinar.presenter}
                  </div>
                </div>
                <Button className="w-full group-hover:border-lilac" variant={webinar.status === 'upcoming' ? 'default' : 'outline'}>
                  {webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Put these resources to work with TrueTone AI. Start your free trial and begin creating authentic, compliant marketing content today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button 
                size="2xl" 
                className="bg-lilac text-white hover:bg-lilac/90 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
                asChild
              >
                <Link href="/waitlist">Start Free Trial</Link>
              </Button>
              <Button 
                size="2xl" 
                variant="outline"
                className="border-lilac/50 text-foreground hover:bg-lilac/10 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
                asChild
              >
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lilac" />
                7-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lilac" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lilac" />
                Access to all resources
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}