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

interface RecommendedArticlesProps {
  posts: BlogPost[];
  currentPostId?: string;
}

export function RecommendedArticles({ posts, currentPostId }: RecommendedArticlesProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Filter out current post if provided
  const filteredPosts = posts.filter(post => post.id !== currentPostId);

  // Don't render if no posts available
  if (!filteredPosts || filteredPosts.length === 0) {
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
    <section className="py-24 bg-background">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-orchid">Articles</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Continue exploring insights on AI and mortgage marketing
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
          {filteredPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="px-4 md:basis-1/2 md:pr-0 md:pl-4 lg:basis-1/3"
            >
              <div className="group h-full overflow-hidden rounded-xl border border-lilac/20 bg-card shadow-sm transition-all hover:shadow-xl hover:border-lilac/40">
                <Link href={`/insights/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-lilac/20 to-orchid/20">
                    {post.categories && post.categories.length > 0 && (
                      <Badge 
                        className="absolute left-4 top-4 z-10 bg-background/90 backdrop-blur-sm"
                        variant="outline"
                      >
                        {post.categories[0].name}
                      </Badge>
                    )}
                    {post.featured_image_url ? (
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Image
                          src="/assets/images/JS-Logo.png"
                          alt={post.title}
                          width={120}
                          height={40}
                          className="opacity-30"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-3">
                      <h3 className="line-clamp-2 text-xl font-semibold group-hover:text-lilac transition-colors">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.published_at}>
                        {format(new Date(post.published_at), "MMM d, yyyy")}
                      </time>
                      {post.read_time_minutes && (
                        <>
                          <span>•</span>
                          <span>{post.read_time_minutes} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}