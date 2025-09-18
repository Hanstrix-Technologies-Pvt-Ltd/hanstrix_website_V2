import React from "react";
import HeroSection from "@/components/landing_page/HeroSection";
import ServicesSection from "@/components/landing_page/ServicesSection";
import AboutSection from "@/components/landing_page/AboutSection";
import TestimonialsSection from "@/components/landing_page/TestimonialsSection";
import Image from "next/image";
import DigitalGridOverlay from "@/components/landing_page/DigitalGridOverlay";
import ClientLogos from "@/components/landing_page/ClientLogos";
import Counters from "@/components/landing_page/Counters";

export default function Home() {
  return (
    <main className="relative z-0">
      {/* Background for sections other than hero */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-crop-mask"
        aria-hidden="true"
      >
        <Image
          src="/images/Main_BG2_Test.jpg"
          alt="" // decorative
          fill
          priority
          placeholder="empty"
          sizes="100vw"
          className="object-cover img-focus-bottom"
        />
      </div>

      {/* Overlays & Effects for non-hero sections */}
      <DigitalGridOverlay />

      <div className="relative">
        {/* Hero section now has its own LiquidEther background */}
        <HeroSection />
        <div id="about">
          <AboutSection />
        </div>
        <ServicesSection />
        <ClientLogos />
        <TestimonialsSection />
        <Counters />
      </div>
    </main>
  );
}
