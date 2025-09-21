import type { Metadata } from "next";
import Galaxy from "@/components/Galaxy";

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
    description:
      "Production-grade AI & ML solutions that drive measurable ROI.",
    images: ["/og/ai-ml.png"],
  },
};

export default function AIMLPage() {
  return (
    <main className="relative text-white overflow-x-hidden">
      {/* Full-page Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
          starSpeed={0.2}
          density={0.3}
          hueShift={0}
          speed={0.4}
          mouseInteraction={true}
          glowIntensity={0.3}
          saturation={0.4}
          mouseRepulsion={true}
          twinkleIntensity={0.2}
          rotationSpeed={0.03}
          repulsionStrength={1.0}
          autoCenterRepulsion={0}
          transparent={false}
        />
      </div>

      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 z-10 bg-black/40 pointer-events-none" />

      <div className="relative z-20">
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
