import type { Metadata } from "next";
import BackgroundEffects from "@/components/global/BackgroundEffects";

// Sections (each now owns its spacing/container)
import HeroSection from "@/components/aiml/HeroSection";
import StatsCounters from "@/components/aiml/StatsCounters";
import Features from "@/components/aiml/Features";
import HowItWorks from "@/components/aiml/HowItWorks";
import InteractiveShowcase from "@/components/aiml/InteractiveShowcase";
import WhyChooseUs from "@/components/aiml/WhyChooseUs";
import BusinessApplications from "@/components/aiml/BusinessApplications";
import CaseStudies from "@/components/aiml/CaseStudies";
import CTASection from "@/components/aiml/CTASection";

export const metadata: Metadata = {
  title: "AI & ML Solutions | Hanstrix",
  description:
    "Production-grade AI & ML solutions that drive measurable ROI. Talk to us to explore models, pipelines, and deployment.",
  openGraph: {
    title: "AI & ML Solutions | Hanstrix",
    description: "Production-grade AI & ML solutions that drive measurable ROI.",
    images: ["/og/ai-ml.png"],
  },
};

export default function AIMLPage() {
  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <HeroSection serviceName="AI & ML Solutions" />
        <StatsCounters />
        <Features />
        <HowItWorks />
        <InteractiveShowcase />
        <WhyChooseUs />
        <BusinessApplications />
        <CaseStudies />
        <CTASection />
      </div>
    </main>
  );
}
