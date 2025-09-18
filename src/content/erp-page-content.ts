import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Plug,
  Workflow,
  BarChart,
  Headset,
  Search,
  Code,
  Cloud,
  LifeBuoy,
  Award,
  ShieldCheck,
  Rocket,
  Factory,
  Store,
  Hospital,
  Truck,
  Book,
  Banknote,
} from "lucide-react";

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

export interface Industry {
  name: string;
  description: string;
  icon: LucideIcon;
}

/* ---------- Core ERP Solutions ---------- */
export const erpSolutions: Feature[] = [
  {
    title: "Modular Design",
    description:
      "Pick and choose only the ERP modules your business needs—from inventory and HR to accounting and sales—for a system that fits your unique workflow.",
    icon: Layers,
  },
  {
    title: "Seamless Integration",
    description:
      "Connect your ERP with existing software, third-party apps, and cloud services to unify data and streamline operations.",
    icon: Plug,
  },
  {
    title: "Tailored Workflows",
    description:
      "Every process—purchase, sales, finance, project management—is configured to your requirements to boost efficiency and accuracy.",
    icon: Workflow,
  },
  {
    title: "Business Intelligence",
    description:
      "Real-time analytics and custom dashboards enable smarter decisions and transparent reporting across departments.",
    icon: BarChart,
  },
  {
    title: "Ongoing Support",
    description:
      "Training, technical assistance, and regular upgrades to ensure smooth daily operations and long-term success.",
    icon: Headset,
  },
];

/* ---------- Implementation Process ---------- */
export const howItWorksErp: Step[] = [
  {
    title: "Discovery & Planning",
    description:
      "We dive into your business to identify goals, challenges, and processes—then define a clear ERP roadmap.",
    icon: Search,
  },
  {
    title: "Custom Development",
    description:
      "We build and configure modules and features from the ground up so every component fits your needs.",
    icon: Code,
  },
  {
    title: "Testing & Deployment",
    description:
      "Performance and security testing precede a seamless rollout with minimal disruption.",
    icon: Cloud,
  },
  {
    title: "Training & Support",
    description:
      "Comprehensive user training plus continuous support and maintenance post-launch.",
    icon: LifeBuoy,
  },
];

/* ---------- Why Choose Us (ERP) ---------- */
export const whyChooseUsErp: Feature[] = [
  {
    title: "Industry Expertise",
    description:
      "Deep knowledge across sectors ensures ERP solutions aligned to compliance, best practices, and real-world needs.",
    icon: Award,
  },
  {
    title: "Focus on ROI",
    description:
      "Design centered on measurable value—cost savings, productivity gains, and faster decision-making.",
    icon: Banknote,
  },
  {
    title: "Data Security First",
    description:
      "Robust access controls, encryption, and governance keep your sensitive business data protected.",
    icon: ShieldCheck,
  },
  {
    title: "Proven Implementation",
    description:
      "A structured methodology delivers smooth, predictable, and on-time implementations.",
    icon: Rocket,
  },
];

/* ---------- Key Feature Bullets ---------- */
export const keyFeatures: string[] = [
  "End-to-end process automation across sales, supply chain, accounting, and more.",
  "Real-time BI dashboards and custom reporting.",
  "Secure, role-based access and compliance management.",
  "Scalable architecture to support growth and expansion.",
];

/* ---------- Industries Served ---------- */
export const industries: Industry[] = [
  {
    name: "Manufacturing",
    description:
      "Streamline production, manage supply chains, and optimize inventory with real-time data.",
    icon: Factory,
  },
  {
    name: "Retail",
    description:
      "Unify POS, e-commerce, and inventory to enhance the customer experience.",
    icon: Store,
  },
  {
    name: "Healthcare",
    description:
      "Manage patient data, billing, and resources while ensuring compliance and security.",
    icon: Hospital,
  },
  {
    name: "Distribution",
    description:
      "Optimize logistics, track shipments, and manage warehouse operations efficiently.",
    icon: Truck,
  },
  {
    name: "Education",
    description:
      "Integrate student management, finance, and administration for better school operations.",
    icon: Book,
  },
  {
    name: "Financial Services",
    description:
      "Automate accounting, manage risk, and ensure regulatory compliance with precision.",
    icon: Banknote,
  },
];
