"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Mic, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(19, 19, 33)"
        gradientBackgroundEnd="rgb(44, 42, 74)"
        firstColor="79, 81, 140"
        secondColor="157, 122, 214"
        thirdColor="218, 191, 255"
        fourthColor="127, 237, 255"
        fifthColor="79, 81, 140"
        pointerColor="157, 122, 214"
        size="80%"
        blendingValue="overlay"
        className="absolute inset-0"
        containerClassName="absolute inset-0"
        interactive={true}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-signal font-bold mb-6 text-white">
              Where Mortgage Marketing Meets 
              <span className="block bg-gradient-to-r from-[#9D7AD6] via-[#DABFFF] to-[#7FEDFF] bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your mortgage business with AI-driven strategies from the CMO who's reshaping how the industry connects with borrowers. Get proven insights from the creator of TrueTone AI.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="xl"
                className="bg-gradient-to-r from-[#9D7AD6] to-[#4F518C] hover:from-[#9D7AD6]/90 hover:to-[#4F518C]/90 text-white"
              >
                <Link href="/speaking">
                  <Mic className="mr-2 h-5 w-5" />
                  Book Speaking Engagement
                </Link>
              </Button>
              <Button 
                asChild
                size="xl"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Link href="#truetone">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore TrueTone AI
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9D7AD6]/20 to-[#7FEDFF]/20 rounded-3xl blur-2xl"></div>
            <Image
              src="/assets/images/Jarrett-Stock-Cutout-1.png"
              alt="Jarrett Stanley - AI Marketing Expert"
              width={500}
              height={600}
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(157,122,214,0.3)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}