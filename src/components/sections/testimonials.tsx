"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Real Results. Real People.
          </h2>
          <p className="text-xl text-muted-foreground">
            See what professionals across industries have to say about their experience with TrueTone AI.
          </p>
        </motion.div>

        <div className="relative">
          <div className="h-full overflow-hidden w-full bg-background dark:bg-charcoal rounded-2xl">
            <TestimonialsGrid />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-background dark:from-charcoal to-transparent rounded-b-2xl"></div>
        </div>
      </div>
    </section>
  );
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 6);
  const second = testimonials.slice(6, 12);

  return (
    <div className="relative [mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]">
      <Marquee direction="right" pauseOnHover speed={50}>
        {first.map((testimonial, index) => (
          <Card key={`testimonial-${testimonial.src}-${index}`}>
            <Quote>{testimonial.quote}</Quote>
            <div className="flex gap-2 items-center mt-8">
              <Image
                src={testimonial.src}
                alt={`${testimonial.name} - ${testimonial.designation}`}
                width={40}
                height={40}
                className="rounded-full"
                loading="lazy"
              />
              <div className="flex flex-col">
                <QuoteDescription className="text-foreground">
                  {testimonial.name}
                </QuoteDescription>
                <QuoteDescription className="text-muted-foreground">
                  {testimonial.designation}
                </QuoteDescription>
              </div>
            </div>
          </Card>
        ))}
      </Marquee>
      <Marquee className="mt-10" direction="right" pauseOnHover speed={70}>
        {second.map((testimonial, index) => (
          <Card key={`testimonial-${testimonial.src}-${index}`}>
            <Quote>{testimonial.quote}</Quote>
            <div className="flex gap-2 items-center mt-8">
              <Image
                src={testimonial.src}
                alt={`${testimonial.name} - ${testimonial.designation}`}
                width={40}
                height={40}
                className="rounded-full"
                loading="lazy"
              />
              <div className="flex flex-col">
                <QuoteDescription className="text-foreground">
                  {testimonial.name}
                </QuoteDescription>
                <QuoteDescription className="text-muted-foreground">
                  {testimonial.designation}
                </QuoteDescription>
              </div>
            </div>
          </Card>
        ))}
      </Marquee>
    </div>
  );
};
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-4 md:p-8 rounded-xl min-h-[230px] h-full max-w-md md:max-w-lg mx-4 bg-white dark:bg-slate-800/50 shadow-[0_1px_3px_0px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_0px_rgba(0,0,0,0.2)] group border border-lilac/10 dark:border-slate-700/50 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-sm md:text-base font-semibold dark:text-white text-black py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs md:text-sm font-normal dark:text-neutral-400 text-neutral-600 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    quote:
      "I went from struggling to post once a week to having a month's worth of content ready in an afternoon. The voice synthesis is incredible.",
    src: "/assets/images/testimonials/avatar-1.jpg",
    designation: "Senior Loan Officer, First National Bank",
  },
  {
    name: "Marcus Thompson",
    quote:
      "My clients constantly ask how I always have such relevant, helpful content. Now I can focus on what I do best – helping families find homes.",
    src: "/assets/images/testimonials/avatar-2.jpg",
    designation: "Real Estate Agent, Century 21",
  },
  {
    name: "Jennifer Rodriguez",
    quote:
      "Our team of 12 loan officers now sounds consistently professional and on-brand across all their marketing. Game-changer.",
    src: "/assets/images/testimonials/avatar-3.jpg",
    designation: "Branch Manager, HomeLoan Direct",
  },
  {
    name: "David Park",
    quote:
      "The voice synthesis is incredible. I can create podcast episodes while driving to appointments. My audience doesn't know the difference.",
    src: "/assets/images/testimonials/avatar-4.jpg",
    designation: "Mortgage Consultant & Industry Speaker",
  },
  {
    name: "Rachel Wilson",
    quote:
      "TrueTone AI captured my unique communication style perfectly. Every piece of content sounds like I personally wrote it, but I can scale like never before.",
    src: "/assets/images/testimonials/avatar-5.jpg",
    designation: "Marketing Director, Tech Startup",
  },
  {
    name: "Michael Foster",
    quote:
      "The compliance features give me peace of mind. Every piece of content is automatically checked for industry regulations before publication.",
    src: "/assets/images/testimonials/avatar-6.jpg",
    designation: "Financial Advisor, Independent Practice",
  },
  {
    name: "Lisa Patel",
    quote:
      "From blog posts to email campaigns, everything sounds authentically me. My personal brand has never been stronger or more consistent.",
    src: "/assets/images/testimonials/avatar-7.jpg",
    designation: "Business Coach & Consultant",
  },
  {
    name: "James Rodriguez",
    quote:
      "The 60-second voice profile setup was amazing. Now I have weeks of content scheduled across all my platforms, all sounding exactly like me.",
    src: "/assets/images/testimonials/avatar-8.jpg",
    designation: "Insurance Agent, State Farm",
  },
  {
    name: "Emily Watson",
    quote:
      "I was skeptical about AI-generated content, but TrueTone AI doesn't feel artificial. It amplifies my voice rather than replacing it.",
    src: "/assets/images/testimonials/avatar-9.jpg",
    designation: "Healthcare Practice Owner",
  },
  {
    name: "Robert Kim",
    quote:
      "The professional website hosting plus content creation is a perfect combination. Everything works together seamlessly.",
    src: "/assets/images/testimonials/avatar-10.jpg",
    designation: "Legal Services Professional",
  },
  {
    name: "Amanda Torres",
    quote:
      "My social media engagement has tripled since using TrueTone AI. The content resonates because it truly sounds like me speaking.",
    src: "/assets/images/testimonials/avatar-11.jpg",
    designation: "Fitness Coach & Entrepreneur",
  },
  {
    name: "Christopher Lee",
    quote:
      "Having my voice synthesized for audio content was game-changing. I can create podcast episodes and audio newsletters without recording.",
    src: "/assets/images/testimonials/avatar-12.jpg",
    designation: "Business Development Executive",
  },
];
