import React from "react";
import HeroSection from "@/components/landing_page/HeroSection";
import ServicesSection from "@/components/landing_page/ServicesSection";
import AboutSection from "@/components/landing_page/AboutSection";
import TestimonialsSection from "@/components/landing_page/TestimonialsSection";
import DigitalGridOverlay from "@/components/landing_page/DigitalGridOverlay";
import ClientLogos from "@/components/landing_page/ClientLogos";
import Counters from "@/components/landing_page/Counters";
import Galaxy from "@/components/Galaxy";
import { MobileOptimizedParallax } from "@/components/global/ParallaxWrapper";
import { StructuredData, serviceSchemas } from "@/components/global/SEO";

export default function Home() {
  return (
    <main className="relative z-0">
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
      <div className="fixed inset-0 z-10 bg-black/30 pointer-events-none" />

      {/* Overlays & Effects for sections */}
      <DigitalGridOverlay />

      <div className="relative z-20">
        <StructuredData data={serviceSchemas.aiml} />
        <StructuredData data={serviceSchemas.erp} />
        <StructuredData data={serviceSchemas.webdev} />
        <StructuredData data={serviceSchemas.digital} />

        {/* Hero section */}
        <HeroSection />

        <MobileOptimizedParallax speed={0.2}>
          <div id="about">
            <AboutSection />
          </div>
        </MobileOptimizedParallax>

        <MobileOptimizedParallax speed={0.3}>
          <ServicesSection />
        </MobileOptimizedParallax>

        <MobileOptimizedParallax speed={0.1}>
          <ClientLogos />
        </MobileOptimizedParallax>

        <MobileOptimizedParallax speed={0.2}>
          <TestimonialsSection />
        </MobileOptimizedParallax>

        <Counters />
      </div>
    </main>
  );
}
