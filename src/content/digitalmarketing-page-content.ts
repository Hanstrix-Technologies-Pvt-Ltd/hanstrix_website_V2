import {
  Search,
  Rocket,
  Users,
  Edit3 as Edit,
  Mail,
  BarChart2 as BarChart,
  TrendingUp,
  Compass,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const coreServices: Feature[] = [
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Maximize visibility with research-driven keywords, technical SEO and white-hat link acquisition to grow qualified organic traffic.",
    icon: Search,
  },
  {
    title: "Pay-Per-Click (PPC) Advertising",
    description:
      "Acquire targeted leads quickly via Google/Bing & paid social. We tune bids, audiences, and creatives for efficient ROI.",
    icon: Rocket,
  },
  {
    title: "Social Media Marketing",
    description:
      "Grow reach, engagement, and community across Instagram, Facebook, LinkedIn, and more with strategic content & paid boosts.",
    icon: Users,
  },
  {
    title: "Content Marketing",
    description:
      "Build authority and trust with articles, videos, and guides tailored to your audience and funnel stage.",
    icon: Edit,
  },
  {
    title: "Email Marketing",
    description:
      "Nurture prospects and retain customers with segmented, personalized campaigns that convert.",
    icon: Mail,
  },
  {
    title: "Analytics & Reporting",
    description:
      "See every click, lead, and sale. Transparent dashboards and insights for continuous improvement.",
    icon: BarChart,
  },
  {
    title: "Online Reputation Management",
    description:
      "Build and protect your brand’s digital image by monitoring reviews, feedback, and enhancing visibility across the internet",
    icon: Sparkles,
  },
];

export const strategicPillars: Feature[] = [
  {
    title: "Data-Driven Decisions",
    description:
      "Strategies grounded in market research, testing, and analytics for compounding gains.",
    icon: BarChart,
  },
  {
    title: "Precision Targeting",
    description:
      "Find and reach your ICP with high-intent keywords, lookalikes, and behavior signals.",
    icon: Compass,
  },
  {
    title: "Conversion Optimization",
    description:
      "Optimize journeys, forms, and offers—turn traffic into leads and customers.",
    icon: Rocket,
  },
  {
    title: "Continuous Adaptation",
    description:
      "We iterate with the market—new formats, new channels, and fresh creative to stay ahead.",
    icon: TrendingUp,
  },
];

export const whyEssential = [
  "Expand Brand Reach — Connect with a wider audience online and build stronger recognition.",
  "Generate Qualified Leads — Attract high-intent buyers ready to convert.",
  "Maximize ROI — Spend efficiently with measurable outcomes.",
  "Enhance Customer Engagement — Create meaningful, personalized interactions.",
  "Stay Competitive — Move with the market and outperform rivals.",
  "Gain Actionable Insights — Understand what works with clear analytics.",
];

export const serviceName = "Digital Marketing";

export const pageContent = `
Service: ${serviceName}

Our Digital Marketing Services:
${coreServices.map(s => `${s.title}: ${s.description}`).join("\n")}

Our Strategic Pillars:
${strategicPillars.map(p => `${p.title}: ${p.description}`).join("\n")}

Why Digital Marketing is Essential:
${whyEssential.map(w => `- ${w}`).join("\n")}
`;
