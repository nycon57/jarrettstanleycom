"use client";

import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DataItem {
  id: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  date: string;
  tag: string;
}

const DATA: DataItem[] = [
  {
    id: "item-1",
    title: "Beyond ChatGPT: Enterprise AI for Mortgage Marketing",
    summary:
      "Advanced AI implementation strategies that drive measurable ROI while maintaining regulatory compliance and customer trust in the mortgage industry.",
    href: "/insights/enterprise-ai-mortgage",
    image: "/assets/images/blog-ai-strategy.jpg",
    date: "December 15, 2024",
    tag: "AI Strategy",
  },
  {
    id: "item-2",
    title: "The $2 Trillion Digital Transformation",
    summary:
      "How forward-thinking mortgage companies are capturing market share through strategic technology adoption and customer experience innovation.",
    href: "/insights/digital-transformation",
    image: "/assets/images/blog-digital-transform.jpg",
    date: "December 10, 2024",
    tag: "Market Leadership",
  },
  {
    id: "item-3",
    title: "From TrueTone AI to Industry Transformation",
    summary:
      "Behind-the-scenes insights from building the mortgage industry's premier AI marketing platform and the lessons learned scaling innovation.",
    href: "/insights/truetone-transformation",
    image: "/assets/images/blog-truetone.jpg",
    date: "December 5, 2024",
    tag: "Executive Insights",
  },
  {
    id: "item-4",
    title: "Compliance-First AI: A Framework for Success",
    summary:
      "A comprehensive guide to implementing AI marketing solutions that enhance performance while maintaining full regulatory compliance.",
    href: "/insights/compliance-ai-framework",
    image: "/assets/images/blog-compliance.jpg",
    date: "November 28, 2024",
    tag: "Compliance",
  },
  {
    id: "item-5",
    title: "The ROI of AI: Real Numbers from Real Implementations",
    summary:
      "Case studies and metrics from successful AI deployments showing 300%+ lead increases and 70% cost reductions across mortgage operations.",
    href: "/insights/ai-roi-metrics",
    image: "/assets/images/blog-roi.jpg",
    date: "November 20, 2024",
    tag: "Case Studies",
  },
];

const LatestInsights = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-orchid">Insights</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Thoughts on AI, mortgage marketing, and the future of our industry
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full hover:bg-lilac/10 disabled:opacity-50 border-lilac/30"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full hover:bg-lilac/10 disabled:opacity-50 border-lilac/30"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))] gap-6">
          {DATA.map((item) => (
            <CarouselItem
              key={item.id}
              className="px-4 md:basis-1/2 md:pr-0 md:pl-4 lg:basis-1/3"
            >
              <div className="group h-full overflow-hidden rounded-xl border border-lilac/20 bg-card shadow-sm transition-all hover:shadow-xl hover:border-lilac/40">
                <Link href={item.href} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-lilac/20 to-orchid/20">
                    <Badge 
                      className="absolute top-4 right-4 z-10 bg-gradient-to-r from-lilac to-orchid text-white border-none"
                    >
                      {item.tag}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-br from-lilac/30 to-orchid/30 mix-blend-multiply" />
                    {/* Using placeholder gradient instead of actual images for now */}
                    <div className="h-full w-full bg-gradient-to-br from-indigo via-orchid to-lilac opacity-80 transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="mb-2 line-clamp-2 text-xl font-semibold tracking-tight group-hover:text-lilac transition-colors">
                        {item.title}
                      </h3>
                      <p className="line-clamp-3 text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full bg-lilac/10 text-lilac border-lilac/20">
                        <Calendar className="mr-1.5 size-3.5" />
                        <span className="text-xs">{item.date}</span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-lilac/10 text-lilac"
                      >
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-16 flex items-center justify-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-8 font-medium hover:bg-gradient-to-r hover:from-lilac hover:to-orchid hover:text-white hover:border-transparent transition-all duration-300 border-lilac/30"
        >
          <Link href="/insights/blog">
            View All Articles
          </Link>
        </Button>
      </div>
    </section>
  );
};

export { LatestInsights };