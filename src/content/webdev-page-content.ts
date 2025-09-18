import {
  LayoutDashboard,
  Smartphone,
  Search,
  ShoppingCart,
  LifeBuoy,
  Lightbulb,
  Zap,
  TrendingUp,
  Code,
  ShieldCheck,
  Rocket,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const coreOfferings: Feature[] = [
  {
    title: "Custom Website Design",
    description:
      "Visually appealing, brand-true websites that convert—crafted for your goals and audiences.",
    icon: LayoutDashboard,
  },
  {
    title: "Responsive & Mobile-Friendly",
    description:
      "Seamless experiences across phones, tablets, and desktops to maximize engagement.",
    icon: Smartphone,
  },
  {
    title: "SEO-Optimized Build",
    description:
      "Performance, semantic HTML, structured data, and meta hygiene for better rankings.",
    icon: Search,
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Secure payments, inventory, and smooth checkout flows that boost conversion.",
    icon: ShoppingCart,
  },
  {
    title: "Website Maintenance & Support",
    description:
      "Updates, monitoring, and security hardening so your site stays fast and secure.",
    icon: LifeBuoy,
  },
];

export const whyChooseUs: Feature[] = [
  {
    title: "Strategic Design & UX",
    description:
      "User-centric, accessible interfaces that guide visitors to action.",
    icon: Lightbulb,
  },
  {
    title: "Performance Driven",
    description:
      "Lighthouse-friendly builds: fast TTFB, optimized assets, and edge caching.",
    icon: Zap,
  },
  {
    title: "Scalable Architecture",
    description:
      "Composable components and CMS-ready content that grow with your needs.",
    icon: TrendingUp,
  },
  {
    title: "Modern Stack",
    description:
      "Next.js, React, TypeScript, Tailwind, and best practices baked in.",
    icon: Code,
  },
  {
    title: "Security by Design",
    description:
      "Input validation, headers, CSRF/SSR protections, and hardened deployments.",
    icon: ShieldCheck,
  },
];

export const processSteps: Step[] = [
  {
    title: "Discovery & Strategy",
    description:
      "Define KPIs, audiences, IA, and a roadmap aligned to measurable outcomes.",
    icon: Search,
  },
  {
    title: "UI/UX Design",
    description:
      "Wireframes → high-fidelity visuals → interactive prototypes.",
    icon: Palette,
  },
  {
    title: "Development & Coding",
    description:
      "Clean, accessible, and test-covered code with CI/CD pipelines.",
    icon: Code,
  },
  {
    title: "Testing & QA",
    description:
      "Cross-browser/device tests, a11y checks, and performance budgets.",
    icon: ShieldCheck,
  },
  {
    title: "Deployment & Launch",
    description:
      "Optimized builds, CDN/edge, observability, and error reporting.",
    icon: Rocket,
  },
  {
    title: "Post-Launch Support",
    description:
      "Monitoring, analytics reviews, and continuous improvements.",
    icon: LifeBuoy,
  },
];

export const benefits: string[] = [
  "Higher search visibility and traffic",
  "Intuitive UX/UI interactions",
  "Future-proof tech choices",
  "Scalable for evolving needs",
  "Stronger brand credibility",
  "Lower long-term costs",
];
