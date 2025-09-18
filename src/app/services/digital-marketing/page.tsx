import type { Metadata } from "next";
import BackgroundEffects from "@/components/global/BackgroundEffects";

// Sections
import HeroSection from "@/components/digital/HeroSection";
import CoreServices from "@/components/digital/CoreServices";
import StrategicPillars from "@/components/digital/StrategicPillars";
import WhyEssential from "@/components/digital/WhyEssential";
import CTASection from "@/components/digital/CTASection";

// Content
import {
  serviceName,
} from "@/content/digitalmarketing-page-content";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Hanstrix Technologies",
  description:
    "Data-driven SEO, PPC, Social, Content, and Email marketing that grows your brand, leads, and revenue.",
};

export default function DigitalMarketingPage() {
  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <HeroSection serviceName={serviceName} />
        <CoreServices />
        <StrategicPillars />
        <WhyEssential />
        <CTASection />
      </div>
    </main>
  );
}
