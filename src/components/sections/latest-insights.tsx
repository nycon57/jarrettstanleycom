"use client";

import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BlogPost } from "@/lib/supabase";

interface LatestInsightsProps {
  posts: BlogPost[];
}

const LatestInsights = ({ posts }: LatestInsightsProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Don't render if no posts available
  if (!posts || posts.length === 0) {
    return null;
  }

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
          {posts.map((post) => (
            <CarouselItem
              key={post.id}
              className="px-4 md:basis-1/2 md:pr-0 md:pl-4 lg:basis-1/3"
            >
              <div className="group h-full overflow-hidden rounded-xl border border-lilac/20 bg-card shadow-sm transition-all hover:shadow-xl hover:border-lilac/40">
                <Link href={`/insights/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-lilac/20 to-orchid/20">
                    {post.categories && post.categories.length > 0 && (
                      <Badge 
                        className="absolute top-4 right-4 z-10 bg-gradient-to-r from-lilac to-orchid text-white border-none"
                      >
                        {post.categories[0].name}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-lilac/30 to-orchid/30 mix-blend-multiply" />
                    {post.featured_image_url ? (
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-indigo via-orchid to-lilac opacity-80 transition duration-500 group-hover:scale-105 flex items-center justify-center">
                        <Image
                          src="/assets/images/JS-Logo-white.png"
                          alt="Jarrett Stanley Logo"
                          width={200}
                          height={200}
                          className="opacity-90 w-[61%] h-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="mb-2 line-clamp-2 text-xl font-semibold tracking-tight group-hover:text-lilac transition-colors">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full bg-lilac/10 text-lilac border-lilac/20">
                        <Calendar className="mr-1.5 size-3.5" />
                        <span className="text-xs">{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
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