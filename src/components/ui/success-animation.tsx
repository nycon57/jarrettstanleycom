"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconCheck, IconSparkles, IconRocket, IconMail } from "@tabler/icons-react";

interface SuccessAnimationProps {
  onComplete?: () => void;
}

export function SuccessAnimation({ onComplete }: SuccessAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate confetti particles only on client
    setConfettiParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      }))
    );

    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Don't render confetti on server
  if (!isMounted) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Main success content */}
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Success Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-8 shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 200, 
              damping: 10,
              delay: 0.2 
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <IconCheck className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Welcome Aboard!
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            You're now part of the TrueTone AI revolution! Get ready to transform how you create authentic marketing content.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {[
              {
                icon: IconRocket,
                title: "Early Access",
                description: "First to experience the future"
              },
              {
                icon: IconSparkles,
                title: "Beta Pricing",
                description: "Exclusive launch discounts"
              },
              {
                icon: IconMail,
                title: "VIP Updates",
                description: "Behind-the-scenes insights"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.2, duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-lilac/20 rounded-full mb-3">
                  <feature.icon className="w-6 h-6 text-lilac" />
                </div>
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Keep an eye on your inbox – amazing things are coming your way! 🚀
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-gradient-to-r from-lilac to-purple-400 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 360, 720],
                y: [0, -50, 100],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Main success content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Success Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-8 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.2 
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <IconCheck className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Welcome Aboard!
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          You're now part of the TrueTone AI revolution! Get ready to transform how you create authentic marketing content.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {[
            {
              icon: IconRocket,
              title: "Early Access",
              description: "First to experience the future"
            },
            {
              icon: IconSparkles,
              title: "Beta Pricing",
              description: "Exclusive launch discounts"
            },
            {
              icon: IconMail,
              title: "VIP Updates",
              description: "Behind-the-scenes insights"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + index * 0.2, duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-lilac/20 rounded-full mb-3">
                <feature.icon className="w-6 h-6 text-lilac" />
              </div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          Keep an eye on your inbox – amazing things are coming your way! 🚀
        </motion.p>
      </motion.div>
    </div>
  );
} 