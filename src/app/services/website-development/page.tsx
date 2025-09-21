"use client";

import Galaxy from "@/components/Galaxy";
import HeroSection from "@/components/webdev/HeroSection";
import CoreOfferings from "@/components/webdev/CoreOfferings";
import WhyChooseUs from "@/components/webdev/WhyChooseUs";
import Process from "@/components/webdev/Process";
import Benefits from "@/components/webdev/Benefits";
import CTASection from "@/components/webdev/CTASection";

export default function WebsiteDevelopmentPage() {
  const serviceName = "Website Development";

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
        <CoreOfferings />
        <WhyChooseUs />
        <Process />
        <Benefits />
        <CTASection />
      </div>
    </main>
  );
}
