"use client";

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Navbar2 } from './navbar2'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Mic, 
  Users, 
  BookOpen, 
  FileText,
  GraduationCap,
  Home,
  Mail,
  Moon,
  Sun,
  Sparkles
} from 'lucide-react'

export default function NewHeader() {
  const { theme, setTheme } = useTheme()

  const menuItems = [
    { 
      title: "Home", 
      url: "/" 
    },
    {
      title: "Services",
      url: "/services",
      items: [
        {
          title: "Speaking Engagements",
          description: "Book Jarrett for your next conference or event",
          icon: <Mic className="size-5 shrink-0" />,
          url: "/speaking",
        },
        {
          title: "Consulting Services",
          description: "Strategic AI implementation for mortgage companies",
          icon: <Brain className="size-5 shrink-0" />,
          url: "/services/consulting",
        },
      ],
    },
    { 
      title: "About", 
      url: "/about" 
    },
  ]

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40">
      <Navbar2
        logo={{
          url: "/",
          src: "/assets/images/logo.svg",
          alt: "Jarrett Stanley",
          title: "Jarrett Stanley",
        }}
        menu={menuItems}
        auth={{
          login: { 
            title: <><Mail className="w-4 h-4 mr-2" />Contact</>, 
            url: "/contact" 
          },
          signup: { 
            title: (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  setTheme(theme === "dark" ? "light" : "dark")
                }}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            ), 
            url: "#" 
          },
        }}
      />
    </header>
  )
}