'use client';

import { m } from 'framer-motion';
import Image from 'next/image';

export function LogoLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        <m.div
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.96, 1, 0.96]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative">

          <Image
            src="/assets/images/JS-Logo.png"
            alt="Loading..."
            width={240}
            height={72}
            className="h-16 w-auto"
            priority />

        </m.div>
        
        {/* Subtle glow effect */}
        <m.div
          className="absolute inset-0 blur-xl"
          animate={{
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}>

          <div className="h-full w-full bg-lilac/20" />
        </m.div>

        {/* Minimal loading indicator */}
        <m.div
          className="mt-12 h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-lilac/50 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }} />

      </div>
    </div>);

}

// Minimal logo loader for inline/component loading
