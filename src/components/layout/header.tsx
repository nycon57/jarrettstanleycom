"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Navigation, navigationLinks } from "./navigation";

const Header = () => {
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm dark:bg-shadow/95"
          : "bg-gradient-to-b from-shadow/80 to-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-signal text-2xl font-bold transition-colors"
          >
            <span className={cn(
              "bg-gradient-to-r from-orchid to-lilac bg-clip-text text-transparent",
              isScrolled ? "" : "from-white to-lavender"
            )}>
              Jarrett Stanley
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation */}
            <Navigation 
              className="space-x-6" 
              isScrolled={isScrolled}
            />
            {/* Utility Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "font-medium transition-colors",
                  isScrolled
                    ? "text-gray-700 hover:text-lilac dark:text-gray-200"
                    : "text-white/90 hover:text-white"
                )}
                asChild
              >
                <Link href="/newsletter">
                  <Mail className="mr-2 h-4 w-4" />
                  Newsletter
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "transition-colors",
                  isScrolled
                    ? "text-gray-700 hover:text-lilac dark:text-gray-200"
                    : "text-white/90 hover:text-white"
                )}
                asChild
              >
                <Link 
                  href="https://linkedin.com/in/jarrettstanley" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </nav>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "transition-colors",
                    isScrolled
                      ? "text-gray-700 hover:text-lilac dark:text-gray-200"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left font-signal text-xl">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col space-y-4">
                  {navigationLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-lilac py-2",
                        pathname === item.href
                          ? "text-lilac"
                          : "text-gray-700 dark:text-gray-200"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Link
                      href="/newsletter"
                      className="flex items-center text-lg font-medium text-gray-700 hover:text-lilac dark:text-gray-200 py-2"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Newsletter Signup
                    </Link>
                    <Link
                      href="https://linkedin.com/in/jarrettstanley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-lg font-medium text-gray-700 hover:text-lilac dark:text-gray-200 py-2"
                    >
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
