"use client";

import { motion } from "motion/react";
import { Mic, Brain, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Mic,
    title: "Speaking Engagements",
    description:
      "Keynotes and workshops on AI-powered mortgage marketing, built around real results — not vendor demos.",
    bullets: [
      "AI strategy for mortgage marketing teams",
      "Building compliant AI workflows at scale",
      "The CMO's playbook for marketing automation",
    ],
    cta: "View Topics & Book",
    href: "/speaking",
  },
  {
    icon: Brain,
    title: "Strategic Consulting",
    description:
      "Hands-on advisory for mortgage companies ready to integrate AI into their marketing operations.",
    bullets: [
      "AI readiness audits and implementation roadmaps",
      "Marketing technology stack optimization",
      "Team training and capability building",
    ],
    cta: "Explore Consulting",
    href: "/services/consulting",
  },
  {
    icon: BookOpen,
    title: "The Signal Newsletter",
    description:
      "Weekly essays on AI, mortgage marketing, and leadership. Written by a practitioner, not a pundit.",
    bullets: [
      "AI tool reviews with honest assessments",
      "Frameworks from 20+ years in mortgage marketing",
      "How mortgage companies are actually using AI",
    ],
    cta: "Read The Signal",
    href: "/insights/blog",
  },
];

const ServicesShowcase = () => {
  return (
    <section className="relative py-32 bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-br from-orchid/5 via-transparent to-lilac/5" />
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-signal font-bold mb-4">
            Three Ways to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-orchid">
              Work With Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Speaking, consulting, or subscribe to The Signal. Pick the path that fits.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <Card className="relative flex flex-col h-full rounded-3xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-lilac/10 to-orchid/10 dark:from-lilac/20 dark:to-orchid/20 rounded-2xl flex items-center justify-center border border-lilac/20 mb-4">
                    <service.icon className="w-7 h-7 text-lilac" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground/70 mt-2">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <ul className="space-y-3 mb-8 flex-1">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-lilac mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-lilac/30 hover:bg-gradient-to-r hover:from-lilac hover:to-orchid hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    <Link href={service.href}>
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ServicesShowcase };
