"use client";

import { Button } from "@/components/ui/button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { Minus } from "lucide-react";
import { useState } from "react";
import { VideoModal } from "@/components/ui/video-modal";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};


const scrollToWaitlist = () => {
  const waitlistSection = document.querySelector('[data-section="waitlist"]');
  if (waitlistSection) {
    waitlistSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  return (
    <>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://adilo.bigcommand.com/9517005a-d4d6-4c9d-a878-134c59ecc2ef.mp4"
      />
      <AnimatePresence>
        <div className="relative min-h-screen overflow-hidden">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(44, 42, 74)"
            gradientBackgroundEnd="rgb(19, 18, 42)"
            firstColor="44, 42, 74"
            secondColor="44, 42, 74"
            thirdColor="79, 81, 140"
            fourthColor="44, 42, 74"
            fifthColor="79, 81, 140"
            pointerColor="79, 81, 140"
            className="absolute inset-0"
            containerClassName="absolute inset-0 h-[800px] w-full"
          />
          <div className="absolute inset-0 "></div>
          <section className="relative flex min-h-screen flex-col justify-center">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="container flex flex-col gap-6 pt-32 text-center"
            >
              <motion.div
                variants={item}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  href="/waitlist"
                  className="group mx-auto mb-3 w-fit gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/10"
                >
                  <span className="mr-1 font-medium">
                    The 60-Second Voice Revolution
                  </span>
                  <span aria-hidden="true">Record once. Sound like you everywhere.</span>
                  <Minus className="mx-1 inline-block w-4" aria-hidden="true" />
                  <span className="font-semibold group-hover:underline">
                    Join Beta
                  </span>
                </Link>
              </motion.div>
              <div>
              <motion.h2
                variants={item}
                className="mx-auto max-w-6xl text-balance text-2xl font-semibold text-white lg:text-2xl"
              >
                Your Voice. Amplified by Intelligence.
              </motion.h2>
              <motion.h1
                variants={item}
                className="mx-auto max-w-6xl text-balance text-4xl font-semibold text-white lg:text-5xl mt-4"
              >
                Authentic marketing that scales.
              </motion.h1>
              </div>
              <motion.p
                variants={item}
                className="mx-auto max-w-4xl text-white/80 lg:text-xl"
              >
                Create your unique TrueTone Profile and watch as AI captures your voice, personality, and expertise. From blog posts to video scripts, every piece of content sounds exactly like you wrote it. Because your voice matters. And now, it scales.
              </motion.p>
              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Button 
                    size="2xl" 
                    className="bg-lilac text-white hover:bg-lilac/90 dark:hover:bg-lilac/75 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
                    onClick={scrollToWaitlist}
                    aria-label="Scroll to waitlist signup form"
                  >
                    Join Beta Waitlist
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Link href="/waitlist">
                    <Button 
                      size="2xl" 
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <div className="relative">
              <div className="mx-auto max-w-screen-xl px-4 pb-48">
                <div className="relative mx-auto max-w-screen-lg px-8 mt-16 mb-32">
                  <div className="relative">
                    <div className="relative">
                      <motion.div
                        variants={item}
                        initial="hidden"
                        animate="show"
                        className="relative group/video cursor-pointer"
                        onClick={() => setIsVideoOpen(true)}
                        aria-label="Play demo video"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-lilac/20 via-shadow/20 to-charcoal/20 rounded-lg shadow-lg" />
                        <img
                          src="https://nksqewatarrgiqvnddcp.supabase.co/storage/v1/object/public/ttai-media/subdomains/default-theme/stock/16x9/16x9-ttai-stock-13.jpg"
                          alt="TrueTone AI Dashboard"
                          className="w-full rounded-lg shadow-2xl relative"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="relative">
                            <div className="absolute -inset-4 animate-ping rounded-full bg-lilac/30" />
                            <div className="relative rounded-full bg-lilac p-6">
                              <IconPlayerPlayFilled className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity rounded-lg z-10" />
                      </motion.div>
                    </div>
                  </div>
                  {/* Removed flanking images as requested */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </AnimatePresence>
    </>
  );
}

