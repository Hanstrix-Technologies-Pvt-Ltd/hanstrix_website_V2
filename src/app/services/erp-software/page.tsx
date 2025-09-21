// Import all section components (existing and planned for ERP)
import HeroSection from "@/components/erp/HeroSection";
import Features from "@/components/erp/Features";
import HowItWorks from "@/components/erp/HowItWorks";
import WhyChooseUs from "@/components/erp/WhyChooseUs";
import IndustriesServed from "@/components/erp/IndustriesServed";
import KeyFeatures from "@/components/erp/KeyFeatures";
import CTASection from "@/components/erp/CTASection";
import StatsCounters from "@/components/erp/StatsCounters";
import Galaxy from "@/components/Galaxy";
import CaseStudies from "@/components/erp/CaseStudies";

export default function ERPPage() {
  // Consolidate page content for the AI Summary button
  const serviceName = "ERP Solutions";

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

      {/* Page content wrapper */}
      <div className="relative z-20">
        <HeroSection serviceName={serviceName} />
        <StatsCounters />
        <Features />
        <HowItWorks />
        <IndustriesServed />
        <KeyFeatures />
        <WhyChooseUs />
        <CaseStudies />
        <CTASection />
      </div>
    </main>
  );
}
