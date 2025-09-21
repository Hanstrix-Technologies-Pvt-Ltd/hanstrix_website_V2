import type { Metadata } from "next";
import Galaxy from "@/components/Galaxy";

// Sections
import HeroSection from "@/components/digital/HeroSection";
import CoreServices from "@/components/digital/CoreServices";
import StrategicPillars from "@/components/digital/StrategicPillars";
import WhyEssential from "@/components/digital/WhyEssential";
import CTASection from "@/components/digital/CTASection";

// Content
import { serviceName } from "@/content/digitalmarketing-page-content";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Hanstrix Technologies",
  description:
    "Data-driven SEO, PPC, Social, Content, and Email marketing that grows your brand, leads, and revenue.",
};

export default function DigitalMarketingPage() {
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
        <HeroSection serviceName={serviceName} />
        <CoreServices />
        <StrategicPillars />
        <WhyEssential />
        <CTASection />
      </div>
    </main>
  );
}
