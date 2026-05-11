import { Mic, Brain, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
              Work With Me
            </Badge>
            <h2 className="text-center text-3xl font-semibold lg:text-left lg:text-4xl text-foreground">
              What You Get When You{" "}
              <span className="text-lilac">
                Work With Me
              </span>
            </h2>
            <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
              Two decades of mortgage marketing and hands-on experience building AI systems that work in regulated industries. I don&apos;t sell theory &mdash; I share what I&apos;ve built, what failed, and what actually moved the numbers.
            </p>

            <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
              As an independent advisor, I have no vendor allegiances and no software to push. My only incentive is helping you get results &mdash; whether that&apos;s on stage, in a strategy session, or through my newsletter.
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
          <Link href="/speaking" className="flex flex-col gap-4 group">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6 bg-card hover:bg-lilac/5 dark:hover:bg-lilac/10 transition-colors h-full">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Mic className="h-auto w-6 text-lilac" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Speaking Engagements
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Practical keynotes on AI in mortgage marketing. Your audience leaves with frameworks they can use Monday morning, not buzzwords.
              </p>
              <span className="text-lilac text-sm font-medium mt-auto group-hover:underline text-center lg:text-left">
                View topics &amp; book &rarr;
              </span>
            </div>
          </Link>
          <Link href="/services/consulting" className="flex flex-col gap-4 group">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6 bg-card hover:bg-lilac/5 dark:hover:bg-lilac/10 transition-colors h-full">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Brain className="h-auto w-6 text-lilac" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Strategic Consulting
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                AI strategy audits, implementation roadmaps, and team training. Built for mortgage leaders who need a plan, not a pitch deck.
              </p>
              <span className="text-lilac text-sm font-medium mt-auto group-hover:underline text-center lg:text-left">
                Explore consulting &rarr;
              </span>
            </div>
          </Link>
          <Link href="/insights/blog" className="flex flex-col gap-4 group">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6 bg-card hover:bg-lilac/5 dark:hover:bg-lilac/10 transition-colors h-full">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <BookOpen className="h-auto w-6 text-lilac" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  The Signal Newsletter
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Weekly essays on AI, marketing operations, and leadership in mortgage. No fluff, no sponsored content. Just what I&apos;m seeing and thinking.
              </p>
              <span className="text-lilac text-sm font-medium mt-auto group-hover:underline text-center lg:text-left">
                Read The Signal &rarr;
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export { BridgingGapSection };
