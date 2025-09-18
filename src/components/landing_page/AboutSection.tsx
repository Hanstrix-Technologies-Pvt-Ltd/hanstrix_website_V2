import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  return (
    // Default rhythm + slightly tighter bottom so Services sits closer
    <section id="about" className="relative ">
      <div className="relative z-10 container mx-auto max-w-7xl ">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 md:gap-8 lg:gap-10 mb-10 sm:mb-12 md:mb-14 lg:mb-16 animate-fade-in-up">
          <Card className="bg-transparent border-white/20 text-zinc-200 p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg card-glow-hover rounded-xl">
            <CardHeader className="p-0 mb-2 sm:mb-3">
              <CardTitle className="text-2xl sm:text-[1.65rem] md:text-3xl font-bold text-cyan-400">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-base sm:text-[1.05rem] md:text-lg leading-relaxed">
              <p>
                To be a global leader in innovative technology solutions,
                empowering businesses to transform digitally, achieve
                sustainable growth, and drive positive change through
                cutting-edge website development, digital marketing, AI &amp;
                ML, and customized ERP software.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-white/20 text-zinc-200 p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg card-glow-hover rounded-xl">
            <CardHeader className="p-0 mb-2 sm:mb-3">
              <CardTitle className="text-2xl sm:text-[1.65rem] md:text-3xl font-bold text-cyan-400">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-base sm:text-[1.05rem] md:text-lg leading-relaxed">
              <p>
                At Hanstrix Technologies, our mission is to deliver tailored,
                result-oriented digital solutions that help businesses of all
                sizes accelerate growth, enhance operational efficiency, and
                maximize market impact. We are committed to excellence,
                innovation, and building lasting partnerships through
                technology-driven success.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why choose */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-gradient-neon">
            Why choose Hanstrix Technologies?
          </h2>

          <ul className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-white text-base sm:text-[1.05rem] leading-relaxed">
            <li className="flex items-start lg:text-2xl gap-2">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Expertise in full-stack development and online marketing.
              </span>
            </li>
            <li className="flex items-start lg:text-2xl gap-2">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Proven success in implementing industry-specific AI and ERP
                solutions.
              </span>
            </li>
            <li className="flex items-start lg:text-2xl gap-2">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Dedicated project management and ongoing technical support.
              </span>
            </li>
          </ul>

          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed mt-5 md:mt-7 text-center md:text-left text-white">
            Unlock your business’s true potential —{" "}
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-400/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
            >
              Contact Us
            </Link>{" "}
            and let Hanstrix Technologies guide your journey to digital success!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
