"use client";

import { type SVGProps, useEffect, useId, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Jarrett is not only one of the best graphic designers that I know, but his passion and work ethic are second to none. He has an intensity about him that is so appreciated because it also seasoned with patience and understanding and it makes him a pleasure to work with. To put it simply, Jarrett is built to lead people and have creative control over a brand or project, from his attention to the details, vision, ability to stay with current trends, uncanny knack for design, systematic approach to project management, willingness to hear criticisms and outside input, ability to make deadlines without micromanaging, and his passion for excellence is to be admired by any employee. Jarrett would be one of my top picks for a creative dream team.",
    author: "Travis Harger",
    role: "Creative Director of Video & Photography",
    company: "Commercial Cinematographer",
    date: "January 19, 2018",
  },
  {
    id: 2,
    quote:
      "I've had the pleasure of working with Jarrett for 3 years. He is a creative genius, with an impeccable track record of creating a successful vision for our brand. Because of his vision, he was able to change the position of our company from a small local lender with an \"ok\" image to a national mortgage lender that is now competing with the best of the best. His strength comes from not only his vast knowledge of design and business principles, but also the respect he garners from his team. Under Jarrett's management, his team has grown exponentially, both creatively and personally, as he is able to bring out the best in everyone. I can not recommend Jarrett highly enough! Not only does he excel in everything he does, he's a fantastic guy to have as part of a team.",
    author: "Stacey Sifuentes, CPC",
    role: "Entrepreneur | Growth Hacker | Speaker",
    company: "Management",
    date: "June 17, 2016",
  },
  {
    id: 3,
    quote:
      "Dedicated, innovative, skilled, proficient, loyal, and endeared leader are all common descriptors that I've frequently used to describe Jarrett. He embodies a rare form of warm, yet decisive leadership that inspires and leads others from the front through example. Jarrett's vast wealth of business knowledge and his high level of expertise in design for digital and print, UI, UX and his core and fundamental understanding of product, software, and web development, coupled with his ability to formulate plans and strategies to achieve goals and effectively execute on them is second to none. In the simplest terms, Jarrett is a leader who builds brands and grows companies into market leaders.",
    author: "Corey Shelton",
    role: "CMO | Driving Digital Transformation",
    company: "Brand Growth & CX Optimization",
    date: "June 16, 2016",
  },
];

export function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateSelection = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    
    updateSelection();
    api.on("select", updateSelection);
    
    return () => {
      api.off("select", updateSelection);
    };
  }, [api]);

  return (
    <section className="relative py-32 bg-muted/30" aria-label="Customer Testimonials">
      <div className="absolute inset-0 bg-gradient-to-br from-skyward/5 via-transparent to-lavender/5" />
      <div className="container max-w-4xl relative">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-orchid">People Are Saying</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by industry leaders who've experienced transformative results
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full hover:bg-lilac/10 disabled:opacity-50 border-lilac/30"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full hover:bg-lilac/10 disabled:opacity-50 border-lilac/30"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="flex cursor-grab flex-col gap-6 lg:gap-8"
              >
                <div className="relative">
                  <div className="absolute -top-8 -left-4 text-6xl text-lilac/20 font-serif">"</div>
                  <blockquote className="pointer-events-none text-2xl leading-relaxed font-medium tracking-tight text-balance select-none md:text-3xl lg:text-3xl text-foreground">
                    {testimonial.quote}
                  </blockquote>
                  <div className="absolute -bottom-8 -right-4 text-6xl text-lilac/20 font-serif rotate-180">"</div>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-lilac to-orchid flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="h-8 w-[1px] bg-border" aria-hidden="true" />
                  <div>
                    <cite className="font-semibold not-italic text-foreground">
                      {testimonial.author}
                    </cite>
                    <p className="text-sm font-medium text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className="mt-10 flex gap-2 justify-center lg:mt-16"
          role="tablist"
          aria-label="Testimonials navigation"
        >
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              className={cn(
                "size-3 cursor-pointer rounded-full transition-all duration-300",
                index === current
                  ? "bg-gradient-to-r from-lilac to-orchid w-8"
                  : "bg-muted-foreground/20 hover:bg-muted-foreground/50",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === current}
              role="tab"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-16 isolate z-[-1] h-[300px] md:top-28 lg:top-32">
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-background via-background/40 to-transparent" />
        <PlusSigns className="size-full text-lilac/[0.05]" />
      </div>
    </section>
  );
}

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 18;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 4;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};