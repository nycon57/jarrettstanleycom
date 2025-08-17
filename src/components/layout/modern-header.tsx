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

export default function ModernHeader() {
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
          icon: <Mic className="size-5 shrink-0" />,
          url: "/speaking",
        },
        {
          title: "Consulting Services", 
          description: "Strategic AI implementation for mortgage companies",
          icon: <Briefcase className="size-5 shrink-0" />,
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
          icon: <BookOpen className="size-5 shrink-0" />,
          url: "/insights/blog",
        },
      ],
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md bg-background/95 border-b border-border/40 shadow-sm"
          : "bg-gradient-to-b from-background/60 to-transparent backdrop-blur-sm"
      )}
    >
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
            title: (
              <Button variant={isScrolled ? "outline" : "ghost"} size="sm" asChild>
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
                  !isScrolled && "text-foreground/90 hover:text-foreground"
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
    </header>
  );
}