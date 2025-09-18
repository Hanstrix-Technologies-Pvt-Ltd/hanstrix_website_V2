import {
  Cpu,
  Dna,
  Network,
  BarChart2,
  Award,
  ShieldCheck,
  Lightbulb,
  Puzzle,
  Scan,
  Rocket,
  Cloud,
  Handshake,
  MessageSquare,
  TrendingUp,
  Settings,
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

export const coreSolutions: Feature[] = [
  {
    title: "AI Solution Development",
    description:
      "Crafting bespoke AI systems, smart chatbots, and intelligent recommendation engines to automate processes and enhance customer interactions.",
    icon: Cpu,
  },
  {
    title: "Machine Learning Model Training",
    description:
      "Transforming raw data into actionable insights with custom-built ML models for accurate predictions and insightful trend analysis.",
    icon: Dna,
  },
  {
    title: "AI Consulting & Integration",
    description:
      "Guiding your AI journey from strategy to seamless integration, ensuring your team is equipped for the future of intelligent automation.",
    icon: Network,
  },
  {
    title: "Advanced Data Analytics & Visualization",
    description:
      "Unlocking hidden value in datasets through advanced analytics, intuitive dashboards, and real-time reporting for unparalleled clarity.",
    icon: BarChart2,
  },
];

export const whyChooseUs: Feature[] = [
  {
    title: "Unrivaled Expertise",
    description: "Our team comprises seasoned AI scientists and ML engineers with a deep understanding of cutting-edge algorithms and industry best practices.",
    icon: Award,
  },
  {
    title: "Data-Centric Security",
    description: "We prioritize the integrity and security of your data, implementing robust encryption and compliance protocols throughout the AI lifecycle.",
    icon: ShieldCheck,
  },
  {
    title: "Client-Centric Innovation",
    description: "Every solution is meticulously crafted to address your unique business challenges, ensuring a direct and measurable impact on your objectives.",
    icon: Lightbulb,
  },
  {
    title: "Seamless Integration",
    description: "We ensure our AI solutions integrate flawlessly with your existing infrastructure, minimizing disruption and maximizing operational efficiency.",
    icon: Puzzle,
  },
];

export const howItWorks: Step[] = [
  { title: "Strategy & Discovery", description: "We collaborate to define your goals, assess your data landscape, and create a tailored AI roadmap.", icon: Scan },
  { title: "Build & Train", description: "Our experts build and train custom AI/ML models, fine-tuning them for optimal performance and accuracy.", icon: Rocket },
  { title: "Deploy & Integrate", description: "We seamlessly deploy the solution into your existing systems, ensuring a smooth transition with minimal disruption.", icon: Cloud },
  { title: "Optimize & Support", description: "Our partnership continues post-launch with ongoing monitoring, optimization, and dedicated support.", icon: Handshake },
];

export const businessApplications = [
    {
      title: "Automated Customer Support",
      description: "Deploying AI-powered chatbots for instant, personalized, and efficient customer service, significantly reducing response times and elevating satisfaction.",
      icon: MessageSquare,
    },
    {
      title: "Predictive Sales & Demand Forecasting",
      description: "Leveraging sophisticated ML models to accurately forecast market trends, predict consumer behavior, and optimize inventory for strategic business growth.",
      icon: TrendingUp,
    },
    {
      title: "Intelligent Workflow Automation",
      description: "Revolutionizing operational efficiency by automating repetitive tasks and complex workflows with intelligent AI, liberating human potential for innovation.",
      icon: Settings,
    },
]