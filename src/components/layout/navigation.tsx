"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navigationLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "TrueTone AI", href: "/truetone" },
  { name: "Insights", href: "/insights" },
  { name: "Speaking", href: "/speaking" },
  { name: "Contact", href: "/contact" },
];

interface NavigationProps {
  className?: string;
  linkClassName?: string;
  isScrolled?: boolean;
  onLinkClick?: () => void;
}

export function Navigation({ 
  className, 
  linkClassName,
  isScrolled = false,
  onLinkClick 
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center", className)}>
      {navigationLinks.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "text-sm font-medium transition-colors hover:text-lilac",
            pathname === item.href
              ? "text-lilac"
              : isScrolled
              ? "text-gray-700 dark:text-gray-200"
              : "text-white/90 hover:text-white",
            linkClassName
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}