"use client";

import BackgroundEffects from "@/components/global/BackgroundEffects";
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
      <BackgroundEffects />

      <div className="relative z-10">
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
