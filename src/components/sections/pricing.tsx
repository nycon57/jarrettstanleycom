"use client";

import React from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

export function PricingWithSwitch() {
  return (
    <div className="relative bg-gradient-to-tr from-shadow to-indigo py-10 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between">
        <div className="relative">
          <h2 className="text-center text-xl md:text-4xl font-bold text-white">
            Plans That Grow With You
          </h2>
          <p className="text-center text-sm md:text-base text-white/80 max-w-2xl mt-4 mx-auto font-normal">
            Choose your level. Upgrade anytime. Every plan includes enterprise security, regulatory compliance, and complete data control. 30-day money-back guarantee.
          </p>
        </div>
        <Pricing />
      </div>
    </div>
  );
}

export function Pricing() {
  const [active, setActive] = useState("monthly");
  const tabs = [
    { name: "Monthly", value: "monthly" },
    { name: "Yearly", value: "yearly" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm w-fit mx-auto mt-10 mb-12 rounded-md overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              "text-sm font-medium text-white/80 p-4 rounded-md relative",
              active === tab.value ? "text-white" : ""
            )}
            onClick={() => setActive(tab.value)}
          >
            {active === tab.value && (
              <motion.span
                layoutId="moving-div"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="absolute inset-0 bg-lilac"
              />
            )}
            <span className="relative z-10">{tab.name}</span>
          </button>
        ))}
      </div>
      <div className="mx-auto mt-4 md:mt-20 grid relative z-20 grid-cols-1 gap-4 items-center md:grid-cols-2 xl:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured
                ? "relative bg-lilac shadow-2xl"
                : "bg-white/10 backdrop-blur-sm",
              "rounded-lg px-6 py-8 sm:mx-8 lg:mx-0 h-full flex flex-col justify-between"
            )}
          >
            <div>
              <h3
                id={tier.id}
                className={cn(
                  "text-base font-semibold leading-7",
                  tier.featured ? "text-white" : "text-white/90"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4">
                <motion.span
                  initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: 0.1 * tierIdx,
                  }}
                  key={active}
                  className={cn(
                    "text-4xl font-bold tracking-tight inline-block",
                    tier.featured ? "text-white" : "text-white"
                  )}
                >
                  {active === "monthly" ? tier.priceMonthly : tier.priceYearly}
                </motion.span>
              </p>
              <p
                className={cn(
                  "mt-6 text-sm leading-7 h-12 md:h-12 xl:h-12",
                  tier.featured ? "text-white/90" : "text-white/80"
                )}
              >
                {tier.description}
              </p>
              <ul
                role="list"
                className={cn(
                  "mt-8 space-y-3 text-sm leading-6 sm:mt-10",
                  tier.featured ? "text-white/90" : "text-white/80"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <IconCircleCheckFilled
                      className={cn(
                        "h-6 w-5 flex-none",
                        tier.featured ? "text-white" : "text-lilac"
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                onClick={tier.onClick}
                aria-describedby={tier.id}
                className={cn(
                  "mt-8 transition duration-200 rounded-full py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 block w-full",
                  tier.featured
                    ? "bg-white text-indigo hover:bg-white/90"
                    : "bg-lilac text-white hover:bg-lilac/90"
                )}
              >
                {tier.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
  onClick: () => void;
};

export const tiers: Tier[] = [
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    priceMonthly: "$79/mo",
    priceYearly: "$790/yr",
    description: "Perfect for individual professionals ready to scale their marketing.",
    features: [
      "100 pieces of content monthly",
      "Professional website with custom domain",
      "Schedule to all platforms",
      "Email marketing for up to 2,500 contacts",
      "Voice synthesis using your personal voice",
      "Advanced lead generation tools",
      "Priority customer support",
    ],
    featured: false,
    cta: "Start Free Trial",
    onClick: () => {},
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$199/mo",
    priceYearly: "$1990/yr",
    description: "Built for teams, organizations, and growing businesses.",
    features: [
      "Unlimited content creation",
      "Multiple websites and sub-brands",
      "Team collaboration with role-based permissions",
      "Email marketing for up to 10,000 contacts",
      "White-label options for your brand",
      "Custom integrations and API access",
      "Dedicated account management",
      "Advanced analytics and reporting",
    ],
    featured: true,
    cta: "Contact Sales",
    onClick: () => {},
  },
];