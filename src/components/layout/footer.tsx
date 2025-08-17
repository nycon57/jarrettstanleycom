"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  services: [
    { name: "AI Strategy Consulting", href: "/services#consulting" },
    { name: "Speaking Engagements", href: "/speaking" },
    { name: "Executive Coaching", href: "/services#coaching" },
    { name: "Marketing Automation", href: "/services#automation" },
  ],
  resources: [
    { name: "Blog & Insights", href: "/insights" },
    { name: "Newsletter Archive", href: "/newsletter/archive" },
  ],
  connect: [
    { name: "Contact", href: "/contact" },
    { name: "Book a Call", href: "/contact#book" },
    { name: "Media Kit", href: "/media-kit" },
  ],
};

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/jarrettstanley",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/jarrettstanley",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:jarrett@jarrettstanley.com",
    icon: Mail,
  },
];

export function Footer() {

  return (
    <footer className="bg-gradient-to-b from-indigo to-shadow border-t border-white/10">
      <div className="container mx-auto px-6 py-16 lg:py-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="inline-block mb-4 hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/assets/images/JS-Logo-white.png"
                alt="Jarrett Stanley"
                width={240}
                height={72}
                className="h-8 sm:h-9 md:h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Chief Marketing Officer at Nationwide Mortgage Bankers.
              Speaker, consultant, and AI innovator in mortgage marketing.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-white/60 hover:text-lilac transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-signal font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-signal font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-signal font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Jarrett Stanley. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
