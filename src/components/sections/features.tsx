"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  IconArticle,
  IconMail,
  IconPhoto,
  IconMicrophone,
  IconVideo,
  IconWaveSine,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const scrollToWaitlist = () => {
  const waitlistSection = document.querySelector('[data-section="waitlist"]');
  if (waitlistSection) {
    waitlistSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export function Features() {
  const features = [
    {
      title: "Blog Posts That Build Authority",
      description:
        "Transform industry news into thought leadership. 800-2000 word articles written in your authentic voice, SEO-optimized and compliance-checked.",
      icon: <IconArticle className="w-6 h-6" />,
    },
    {
      title: "Email Campaigns That Feel Personal",
      description:
        "Every email, newsletter, and drip campaign written in your voice, addressing your clients' exact needs with compliance disclaimers included.",
      icon: <IconMail className="w-6 h-6" />,
    },
    {
      title: "Professional Videos in Minutes",
      description:
        "Hollywood production quality videos with your branding, voice, and message. From social clips to comprehensive client presentations.",
      icon: <IconPhoto className="w-6 h-6" />,
    },
    {
      title: "Your Voice, Synthesized",
      description: "Revolutionary AI voice modeling creates audio content using your actual voice. Podcast episodes, audio newsletters, and more.",
      icon: <IconMicrophone className="w-6 h-6" />,
    },
    {
      title: "Video Scripts That Sound Like You",
      description: "Word-perfect scripts that match your speaking style. Teleprompter-ready, time-optimized, and naturally conversational.",
      icon: <IconVideo className="w-6 h-6" />,
    },
    {
      title: "Social Media That Actually Engages",
      description:
        "LinkedIn posts that start conversations, Instagram stories that build relationships. Complete with hashtags and optimal timing.",
      icon: <IconWaveSine className="w-6 h-6" />,
    },
  ];
  return (
    <section className="-mt-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Everything You Need. Nothing You Don't.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Stop staring at blank pages. Start with intelligent suggestions. TrueTone AI creates content that sounds exactly like you wrote it across every channel your clients use.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" variant="default" onClick={scrollToWaitlist} aria-label="Join beta waitlist">
                Join Beta Waitlist
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 relative z-10">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-lilac/30 dark:border-lilac/40",
        (index % 2 === 0) && "lg:border-l border-lilac/30 dark:border-lilac/40",
        index < 4 && "lg:border-b border-lilac/30 dark:border-lilac/40"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-r from-lilac/10 to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10 px-10 text-lilac/70 dark:text-lilac group-hover/feature:text-lilac dark:group-hover/feature:text-lilac/90 transition-colors duration-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-lilac/30 dark:bg-lilac/50 group-hover/feature:bg-lilac transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </motion.div>
  );
};
