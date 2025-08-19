"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useNavState } from '@/hooks/useNavState';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Mic,
  Briefcase,
  BookOpen,
  FileText,
  Linkedin,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Navigation items with submenu structure
const navigationItems = [
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "/services",
    submenu: [
      { 
        name: "Speaking Engagements", 
        href: "/speaking", 
        description: "Keynotes and workshops on AI in mortgage marketing", 
        icon: Mic 
      },
      { 
        name: "Consulting", 
        href: "/services/consulting", 
        description: "Strategic guidance for enterprise mortgage companies", 
        icon: Briefcase 
      }
    ]
  },
  { name: "Blog", href: "/insights/blog" },
  { name: "Contact", href: "/contact" }
];

interface SubmenuItemProps {
  item: {
    name: string;
    href: string;
    description: string;
    icon: React.ElementType;
  };
  onClose: () => void;
}

const SubmenuItem = ({ item, onClose }: SubmenuItemProps) => {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-lilac/5 hover:to-skyward/5 transition-all duration-300 border border-transparent hover:border-lilac/20"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lilac to-orchid flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-lilac transition-colors duration-300">
            {item.name}
          </p>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-lilac group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {item.description}
        </p>
      </div>
    </Link>
  );
};

interface MegaMenuProps {
  items: typeof navigationItems[1]['submenu'];
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu = ({ items, isOpen, onClose }: MegaMenuProps) => {
  if (!items) return null;

  return (
    <div className={cn(
      "absolute top-full left-1/2 -translate-x-1/2 w-96 bg-white/95 dark:bg-shadow/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl transition-all duration-300 z-50",
      isOpen 
        ? "opacity-100 translate-y-2 visible" 
        : "opacity-0 translate-y-0 invisible"
    )}>
      <div className="p-6">
        <div className="space-y-2">
          {items.map((item) => (
            <SubmenuItem key={item.name} item={item} onClose={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ThemeToggleProps {
  shouldUseLightText: boolean;
}

const ThemeToggle = ({ shouldUseLightText }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        "relative w-9 h-9 rounded-full transition-all duration-300 hover:scale-110",
        shouldUseLightText 
          ? "text-white hover:bg-white/20" 
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      <Sun className={cn(
        "w-4 h-4 transition-all duration-500 absolute",
        theme === 'dark' ? "rotate-90 scale-0" : "rotate-0 scale-100"
      )} />
      <Moon className={cn(
        "w-4 h-4 transition-all duration-500 absolute",
        theme === 'dark' ? "rotate-0 scale-100" : "-rotate-90 scale-0"
      )} />
    </Button>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const MobileMenu = ({ isOpen, onClose, pathname }: MobileMenuProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Mobile menu panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 bg-white dark:bg-shadow border-l border-gray-200 dark:border-gray-700 transition-transform duration-300 z-50",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <Image
              src="/assets/images/JS-Logo.png"
              alt="Jarrett Stanley"
              width={160}
              height={48}
              className="h-5 sm:h-6 w-auto dark:hidden"
            />
            <Image
              src="/assets/images/JS-Logo-white.png"
              alt="Jarrett Stanley"
              width={160}
              height={48}
              className="h-5 sm:h-6 w-auto hidden dark:block"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation items */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl text-left font-medium transition-all duration-300",
                          pathname.startsWith(item.href)
                            ? "bg-gradient-to-r from-lilac/10 to-skyward/10 text-lilac"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          openSubmenu === item.name ? "rotate-180" : "rotate-0"
                        )} />
                      </button>
                      
                      <div className={cn(
                        "overflow-hidden transition-all duration-300",
                        openSubmenu === item.name ? "max-h-96 mt-2" : "max-h-0"
                      )}>
                        <div className="pl-4 space-y-1">
                          {item.submenu.map((subItem) => {
                            const Icon = subItem.icon;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={onClose}
                                className={cn(
                                  "flex items-center space-x-3 p-3 rounded-lg transition-all duration-300",
                                  pathname === subItem.href
                                    ? "bg-gradient-to-r from-lilac/20 to-skyward/20 text-lilac"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                )}
                              >
                                <Icon className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">{subItem.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-500">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block w-full p-3 rounded-xl font-medium transition-all duration-300",
                        pathname === item.href
                          ? "bg-gradient-to-r from-lilac/10 to-skyward/10 text-lilac"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 text-white border-0 rounded-xl h-12 font-medium transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="https://linkedin.com/in/jarrettstanley"
                  className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-lilac hover:bg-lilac/10 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <ThemeToggle shouldUseLightText={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export function ModernNavigation() {
  const { navState, isCompact, shouldUseLightText, isVisible } = useNavState();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Check if component is mounted (for theme)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const getNavStyles = () => {
    switch (navState) {
      case 'transparent':
        return 'bg-transparent border-transparent shadow-none';
      case 'blurred':
        return 'bg-white/10 backdrop-blur-md border-white/20 shadow-sm';
      case 'solid':
        return 'bg-white dark:bg-shadow border-gray-200 dark:border-gray-700 shadow-lg';
      case 'hidden':
        return 'bg-white dark:bg-shadow border-gray-200 dark:border-gray-700 shadow-lg';
      default:
        return 'bg-white dark:bg-shadow border-gray-200 dark:border-gray-700 shadow-lg';
    }
  };

  const textColorClasses = shouldUseLightText 
    ? 'text-white' 
    : 'text-gray-900 dark:text-white';

  const linkHoverClasses = shouldUseLightText
    ? 'hover:text-skyward'
    : 'hover:text-lilac';

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b",
        getNavStyles(),
        isCompact ? 'h-16' : 'h-20',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative hover:scale-105 transition-transform duration-300"
            >
              {mounted && theme === 'dark' ? (
                <Image
                  src="/assets/images/JS-Logo-white.png"
                  alt="Jarrett Stanley"
                  width={200}
                  height={60}
                  className={cn(
                    "w-auto transition-all duration-300",
                    isCompact ? "h-6 sm:h-7" : "h-7 sm:h-8"
                  )}
                  priority
                />
              ) : (
                <Image
                  src="/assets/images/JS-Logo.png"
                  alt="Jarrett Stanley"
                  width={200}
                  height={60}
                  className={cn(
                    "w-auto transition-all duration-300",
                    isCompact ? "h-6 sm:h-7" : "h-7 sm:h-8"
                  )}
                  priority
                />
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      }}
                    >
                      <button className={cn(
                        "flex items-center space-x-1 font-medium transition-all duration-300 py-2 px-1",
                        textColorClasses,
                        linkHoverClasses,
                        pathname.startsWith(item.href) ? 'text-lilac' : ''
                      )}>
                        <span>{item.name}</span>
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          activeDropdown === item.name ? 'rotate-180' : 'rotate-0'
                        )} />
                      </button>
                      
                      <MegaMenu 
                        items={item.submenu}
                        isOpen={activeDropdown === item.name}
                        onClose={() => setActiveDropdown(null)}
                      />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "font-medium transition-all duration-300 py-2 px-1 relative",
                        textColorClasses,
                        linkHoverClasses,
                        pathname === item.href ? 'text-lilac' : ''
                      )}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lilac to-skyward rounded-full" />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Social link */}
              <Link
                href="https://linkedin.com/in/jarrettstanley"
                className={cn(
                  "hidden sm:flex p-2 rounded-full transition-all duration-300 hover:scale-110",
                  shouldUseLightText 
                    ? "text-white hover:bg-white/20" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </Link>

              {/* Theme toggle - desktop */}
              <div className="hidden sm:block">
                <ThemeToggle shouldUseLightText={shouldUseLightText} />
              </div>

              {/* CTA Button - desktop */}
              <Button 
                asChild
                className="hidden lg:flex bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 text-white border-0 rounded-xl px-6 py-2 font-medium transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "lg:hidden w-9 h-9 rounded-full transition-all duration-300",
                  shouldUseLightText 
                    ? "text-white hover:bg-white/20" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-5 h-5">
                  <Menu className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMobileMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                  )} />
                  <X className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMobileMenuOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                  )} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}