// Import all section components (existing and planned for ERP)
import HeroSection from "@/components/erp/HeroSection";
import Features from "@/components/erp/Features";
import HowItWorks from "@/components/erp/HowItWorks";
import WhyChooseUs from "@/components/erp/WhyChooseUs";
import IndustriesServed from "@/components/erp/IndustriesServed";
import KeyFeatures from "@/components/erp/KeyFeatures";
import CTASection from "@/components/erp/CTASection";
import StatsCounters from "@/components/erp/StatsCounters";
import BackgroundEffects from "@/components/global/BackgroundEffects";
import CaseStudies from "@/components/erp/CaseStudies";


export default function ERPPage() {
  // Consolidate page content for the AI Summary button
  const serviceName = "ERP Solutions";

  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />

      {/* Page content wrapper */}
      <div className="relative z-10">
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
