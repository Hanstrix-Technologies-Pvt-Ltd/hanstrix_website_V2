import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="
        relative
        flex items-center
        text-center text-white
        px-4
        py-16 sm:py-20 md:py-0
        min-h-[calc(100svh-var(--nav-h))]
        no-anchoring
      "
    >
      {/* Content */}
      <div className="relative z-20 section-center-xl max-w-6xl w-full space-y-8 mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up px-2 sm:px-4">
          Hanstrix Technologies
          <br />
          <span className="text-gradient-neon block mt-2 text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-snug">
            Leading Digital Transformation Solutions
          </span>
        </h1>

        <div
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in-up px-2 sm:px-4"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="font-bold text-lg sm:text-xl md:text-2xl mb-3">
            We are your Trusted Partner
          </p>
          <p>
            As one of the top technology companies, we deliver result-oriented
            solutions in{" "}
            <strong className="text-gradient-neonsubtle text-xl sm:text-xl md:text-2xl">
              AI &amp; Machine Learning
            </strong>
            ,{" "}
            <strong className="text-gradient-neonsubtle text-xl sm:text-xl md:text-2xl">
              Customized ERP Software
            </strong>
            ,{" "}
            <strong className="text-gradient-neonsubtle text-xl sm:text-xl md:text-2xl">
              Website Development
            </strong>
            , and{" "}
            <strong className="text-gradient-neonsubtle text-xl sm:text-xl md:text-2xl">
              Digital Marketing
            </strong>{" "}
            to help businesses grow digitally, reach their audience, and
            streamline operations.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link href="#services">
            <Button className="btn w-full sm:w-auto">
              Explore Our Services
            </Button>
          </Link>

          <Link href="\contact">
            <Button
              variant="outline"
              className="btn--outline w-full sm:w-auto font-bold py-3 px-8"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Blend to page bg */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  );
};

export default HeroSection;
