"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  Menu,
  Moon,
  Sun,
  Linkedin,
  Mail,
  Mic,
  Briefcase,
  Brain,
  BookOpen,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";

const servicesItems = [
  {
    title: "Speaking Engagements",
    href: "/speaking",
    description: "Keynotes and workshops on AI in mortgage marketing",
    icon: Mic,
  },
  {
    title: "Consulting",
    href: "/consulting",
    description: "Strategic guidance for enterprise mortgage companies",
    icon: Briefcase,
  },
];

const insightsItems = [
  {
    title: "Blog",
    href: "/blog",
    description: "Latest thoughts on AI and mortgage marketing",
    icon: FileText,
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<{ className?: string }> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {Icon && <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />}
            <div className="space-y-1">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function ProfessionalHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
          ? "bg-background/95 backdrop-blur-md border-b"
          : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-signal text-xl sm:text-2xl font-bold transition-colors"
          >
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Jarrett Stanley
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/about" && "bg-accent"
                      )}
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {servicesItems.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Insights</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {insightsItems.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/contact" && "bg-accent"
                      )}
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Utility Actions */}
            <div className="flex items-center gap-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
              >
                <Link
                  href="https://linkedin.com/in/jarrettstanley"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
              >
                <Link href="/newsletter" aria-label="Newsletter Signup">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>

              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              )}

              <Button
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-x-4 lg:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left font-signal">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  <Link
                    href="/about"
                    className={cn(
                      "text-base font-medium transition-colors hover:text-purple-600 py-2",
                      pathname === "/about" && "text-purple-600"
                    )}
                  >
                    About
                  </Link>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground">Services</h3>
                    {servicesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-start gap-3 text-base transition-colors hover:text-purple-600 py-2",
                          pathname === item.href && "text-purple-600"
                        )}
                      >
                        <item.icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground">Insights</h3>
                    {insightsItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-start gap-3 text-base transition-colors hover:text-purple-600 py-2",
                          pathname === item.href && "text-purple-600"
                        )}
                      >
                        <item.icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className={cn(
                      "text-base font-medium transition-colors hover:text-purple-600 py-2",
                      pathname === "/contact" && "text-purple-600"
                    )}
                  >
                    Contact
                  </Link>

                  <div className="border-t pt-4 space-y-3">
                    <Link
                      href="/newsletter"
                      className="flex items-center gap-2 text-base font-medium transition-colors hover:text-purple-600"
                    >
                      <Mail className="h-4 w-4" />
                      Newsletter
                    </Link>
                    <Link
                      href="https://linkedin.com/in/jarrettstanley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base font-medium transition-colors hover:text-purple-600"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                    asChild
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}