import { Brain, Target, Trophy, Users } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

const BridgingGapSection = () => {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-orchid/5" />
      <div className="container relative">
        <div className="grid place-content-center gap-10 lg:grid-cols-2">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 lg:items-start">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2.5 py-1.5 text-sm border-lilac/50 text-lilac dark:border-lilac/30"
            >
              <Trophy className="h-auto w-4" />
              Industry Leadership
            </Badge>
            <h2 className="text-center text-3xl font-semibold lg:text-left lg:text-4xl text-foreground">
              Bridging the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-orchid">Technology and Trust</span>
            </h2>
              <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
                With over two decades of experience pioneering AI-powered mortgage marketing, I've helped industry leaders generate over $500M in loan originations through innovative strategies that balance technology, compliance, and customer trust.
              </p>
              
              <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
                As an independent strategic advisor, I bring unbiased expertise and proven methodologies to help mortgage companies navigate the AI revolution. My approach combines deep industry knowledge with cutting-edge technology implementation, ensuring every initiative delivers measurable ROI while maintaining regulatory compliance.
              </p>
          </div>
          <div className="relative ml-auto max-h-[450px] w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-lilac/20 to-orchid/20 rounded-xl blur-3xl"></div>
            <Image
              src="/assets/images/Jarrett-Stock-13.jpg"
              alt="Jarrett Stanley speaking at industry event"
              width={600}
              height={450}
              className="relative rounded-xl object-cover w-full h-full max-h-[450px]"
            />
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6 bg-card hover:bg-lilac/5 dark:hover:bg-lilac/10 transition-colors">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Brain className="h-auto w-6 text-lilac" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Why Work With Me?
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                I bring real-world experience building and deploying AI solutions that have transformed mortgage marketing at scale.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6 bg-card hover:bg-lilac/5 dark:hover:bg-lilac/10 transition-colors">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Target className="h-auto w-6 text-lilac" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  My Mission
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                To empower mortgage companies with AI strategies that drive growth while maintaining compliance and customer trust.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6 bg-card hover:bg-lilac/5 dark:hover:bg-lilac/10 transition-colors">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Users className="h-auto w-6 text-lilac" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Who I Serve
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Forward-thinking mortgage executives ready to embrace AI innovation and transform their marketing operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { BridgingGapSection };