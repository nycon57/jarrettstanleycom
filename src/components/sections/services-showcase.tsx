"use client";

import { motion } from "motion/react";
import React, { useRef } from "react";
import { RefObject, useEffect, useId, useState } from "react";
import { Mic, Brain, TrendingUp, Users, Sparkles, BarChart, MessageSquare, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";

import { Globe } from "@/components/magicui/globe";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ServicesShowcase = () => {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative py-32 bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-br from-orchid/5 via-transparent to-lilac/5" />
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-signal font-bold mb-4">
            How I Can Help Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-orchid">
              Business Thrive
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your mortgage marketing with AI-powered strategies, proven frameworks, and expert guidance
          </p>
        </div>
        
        <div className="mx-auto max-w-6xl grid gap-5">
          {/* Top Row */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* AI-Powered Marketing Integration - Large Card */}
            <Card className="relative h-96 rounded-3xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow md:col-span-1">
              <CardHeader>
                <h3 className="text-2xl font-semibold tracking-tight">
                  AI-Powered Marketing Integration
                </h3>
                <p className="text-muted-foreground/70 mt-2">
                  Connect your existing marketing tools with cutting-edge AI solutions. Build automated workflows that generate qualified leads while reducing manual effort by 70%.
                </p>
              </CardHeader>
            <CardContent ref={containerRef1} className="relative ml-5">
              <IconCard
                ref={div1Ref as React.RefObject<HTMLDivElement>}
                icon={<Brain className="w-5 h-5" />}
                className="mb-3"
              />
              <IconCard
                ref={div2Ref as React.RefObject<HTMLDivElement>}
                icon={<BarChart className="w-5 h-5" />}
                className="translate-x-32"
              />
              <IconCard
                ref={div3Ref as React.RefObject<HTMLDivElement>}
                icon={<MessageSquare className="w-5 h-5" />}
                className="mt-3"
              />
              <IconCard
                ref={div5Ref as React.RefObject<HTMLDivElement>}
                icon={<Rocket className="w-5 h-5" />}
                className="absolute right-12 top-1/2 -translate-y-1/2"
              />
              <div
                ref={div4Ref as React.RefObject<HTMLDivElement>}
                className="z-99 bg-gradient-to-r from-lilac to-orchid absolute left-1/2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white shadow-lg"
              />
              <AnimatedBeam
                duration={3}
                containerRef={containerRef1}
                fromRef={div1Ref}
                curvature={40}
                toRef={div4Ref}
                gradientStartColor="#907AD6"
                gradientStopColor="#4F518C"
              />
              <AnimatedBeam
                duration={3}
                containerRef={containerRef1}
                fromRef={div2Ref}
                toRef={div4Ref}
                gradientStartColor="#907AD6"
                gradientStopColor="#4F518C"
              />
              <AnimatedBeam
                duration={3}
                containerRef={containerRef1}
                fromRef={div3Ref}
                curvature={-40}
                toRef={div4Ref}
                gradientStartColor="#907AD6"
                gradientStopColor="#4F518C"
              />
              <AnimatedBeam
                duration={3}
                containerRef={containerRef1}
                fromRef={div4Ref}
                toRef={div5Ref}
                gradientStartColor="#907AD6"
                gradientStopColor="#7FDEFF"
              />
            </CardContent>
          </Card>

            {/* Performance Optimization - Right Top Card */}
            <Card className="relative h-96 rounded-3xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Performance Optimization
                </h3>
                <p className="text-muted-foreground/70">
                  Boost your marketing ROI by 300% with data-driven strategies and continuous optimization
                </p>
              </CardHeader>
            <CardContent
              ref={containerRef2}
              className="relative h-[200px] flex flex-col items-center justify-between overflow-hidden"
            >
              <IconCard
                ref={div6Ref as React.RefObject<HTMLDivElement>}
                icon={<TrendingUp className="w-5 h-5" />}
                className="mt-4"
              />

              <IconCard
                ref={div7Ref as React.RefObject<HTMLDivElement>}
                icon={<Sparkles className="w-5 h-5" />}
                className="mb-4"
              />

              <AnimatedBeam
                duration={3}
                containerRef={containerRef2}
                fromRef={div6Ref as React.RefObject<HTMLDivElement>}
                direction="vertical"
                curvature={40}
                toRef={div7Ref as React.RefObject<HTMLDivElement>}
                gradientStartColor="#907AD6"
                gradientStopColor="#7FDEFF"
              />
            </CardContent>
          </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* Speaking & Training - Left Bottom Card */}
            <Card className="relative flex h-96 flex-col rounded-3xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="flex items-center justify-center flex-1">
                <div className="relative w-32 h-32 bg-gradient-to-br from-lilac to-orchid rounded-2xl flex items-center justify-center shadow-xl">
                  <Mic className="w-16 h-16 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-skyward rounded-full animate-pulse"></div>
                </div>
              </CardContent>
              <CardHeader>
                <h3 className="text-xl font-semibold tracking-tight">
                  Speaking & Executive Training
                </h3>
                <p className="text-muted-foreground/70 text-sm">
                  Inspire your team with actionable insights from 50+ keynotes delivered to industry leaders
                </p>
              </CardHeader>
            </Card>
            
            {/* Industry Impact - Right Bottom Card (spans 2 columns) */}
            <Card className="md:col-span-2 h-96 overflow-hidden rounded-3xl border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Industry-Wide Impact
                </h3>
                <p className="text-muted-foreground/70">
                  Join 100+ mortgage companies already transforming their marketing with AI strategies that have generated over $500M in loan originations
                </p>
              </CardHeader>

              <CardContent className="relative h-full">
                <Globe className="absolute -bottom-20 right-0" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServicesShowcase };

const IconCard = ({
  icon,
  className,
  ref,
}: {
  icon: React.ReactNode;
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-gradient-to-br from-lilac/20 to-orchid/20 relative z-10 flex size-14 items-center justify-center rounded-xl border border-lilac/30 shadow-sm",
        className,
      )}
    >
      <div className="text-lilac">{icon}</div>
      <HandleIcon className="absolute -top-3 left-1/2 size-6 -translate-x-1/2" />
      <HandleIcon className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2" />
      <HandleIcon className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rotate-90" />
      <HandleIcon className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rotate-90" />
    </div>
  );
};

const HandleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="14"
      height="5"
      viewBox="0 0 14 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.543457"
        y1="0.972656"
        x2="0.543457"
        y2="4.625"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      <line
        x1="4.54346"
        y1="0.972656"
        x2="4.54346"
        y2="4.625"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      <line
        x1="8.54346"
        y1="0.972656"
        x2="8.54346"
        y2="4.625"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      <line
        x1="12.5435"
        y1="0.972656"
        x2="12.5435"
        y2="4.625"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
    </svg>
  );
};

// AnimatedBeam component implementation
export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  direction?: "horizontal" | "vertical";
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#907AD6",
  gradientStopColor = "#4F518C",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  direction = "horizontal",
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates =
    direction === "vertical"
      ? reverse
        ? {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["90%", "-10%"],
            y2: ["100%", "0%"],
          }
        : {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["10%", "110%"],
            y2: ["0%", "100%"],
          }
      : reverse
        ? {
            x1: ["90%", "-10%"],
            x2: ["100%", "0%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }
        : {
            x1: ["10%", "110%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updatePath();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};