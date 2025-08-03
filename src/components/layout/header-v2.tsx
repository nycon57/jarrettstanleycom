"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Navbar2 } from "./navbar2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  Sparkles,
  MessageSquare,
  Briefcase
} from "lucide-react";

export default function HeaderV2() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { 
      title: "About", 
      url: "/about" 
    },
    {
      title: "Services",
      url: "/services",
      items: [
        {
          title: "Speaking Engagements",
          description: "Book Jarrett for your next conference or event",
          icon: <Mic className="size-5 shrink-0 text-purple-600 dark:text-purple-400" />,
          url: "/speaking",
        },
        {
          title: "Consulting Services", 
          description: "Strategic AI implementation for mortgage companies",
          icon: <Briefcase className="size-5 shrink-0 text-purple-600 dark:text-purple-400" />,
          url: "/services/consulting",
        },
      ],
    },
    {
      title: "Insights",
      url: "/insights",
      items: [
        {
          title: "Blog",
          description: "Latest thoughts on AI in mortgage marketing",
          icon: <BookOpen className="size-5 shrink-0 text-purple-600 dark:text-purple-400" />,
          url: "/insights/blog",
        },
        {
          title: "Resources",
          description: "Free guides, templates, and tools",
          icon: <FileText className="size-5 shrink-0 text-purple-600 dark:text-purple-400" />,
          url: "/insights/resources",
        },
      ],
    },
    { 
      title: "TrueTone AI", 
      url: "/truetone-ai" 
    },
  ];

  // Check if we're on a page with a dark hero section
  const isDarkHeroPage = pathname === "/" || pathname === "/truetone-ai";
  const shouldUseLightText = isDarkHeroPage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md bg-background/95 border-b border-border/40 shadow-sm"
          : isDarkHeroPage 
            ? "bg-gradient-to-b from-black/20 to-transparent"
            : "backdrop-blur-sm bg-background/60"
      )}
    >
      <div className={cn(
        shouldUseLightText && "[&_a]:text-white [&_button]:text-white [&_span]:text-white/90 [&_p]:text-white/70"
      )}>
        <Navbar2
          className="py-2"
          logo={{
            url: "/",
            component: (
              <span className={cn(
                "font-signal text-2xl font-bold transition-colors",
                "bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent",
                shouldUseLightText && "from-white to-purple-200"
              )}>
                Jarrett Stanley
              </span>
            )
          }}
          menu={menuItems}
          auth={{
            login: { 
              title: (
                <Button 
                  variant={shouldUseLightText ? "ghost" : "outline"} 
                  size="sm" 
                  asChild
                  className={cn(
                    shouldUseLightText && "hover:bg-white/10 border-white/20"
                  )}
                >
                  <Link href="/contact">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </Button>
              ), 
              url: "/contact" 
            },
            signup: { 
              title: (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                  className={cn(
                    "ml-2",
                    shouldUseLightText && "hover:bg-white/10"
                  )}
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
      </div>
    </header>
  );
}