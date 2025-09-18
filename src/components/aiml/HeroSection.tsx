"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, Dna, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  serviceName: string;
  bgAltImage?: string;
}

const ROTATING = ["Healthcare", "FinTech", "Retail", "Logistics", "EdTech", "SaaS"] as const;

const HIGHLIGHTS = [
  { icon: Cpu, title: "AI Solution Dev", desc: "Chatbots, recommenders & automation that ship." },
  { icon: Dna, title: "ML Model Training", desc: "Custom models tuned on your data & KPIs." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Encryption, access control, and governance." },
] as const;

export default function HeroSection({
  serviceName,
  bgAltImage = "/images/AI.png",
}: HeroSectionProps) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Magnetic hover for CTA (client-only)
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMx((e.clientX - (r.left + r.width / 2)) * 0.1);
    setMy((e.clientY - (r.top + r.height / 2)) * 0.1);
  };
  const resetMagnet = () => {
    setMx(0);
    setMy(0);
  };

  return (
    <section className="section-spacing section-spacing--loose hero-mobile-fold hero-md-compact hero-overrides relative">
      <div className="container container-gutters">
        <div className="mx-auto w-full max-w-[1280px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* TEXT — fills first fold on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="hero-first-screen text-center lg:text-left"
          >
            {/* Badge (center on mobile, left on md+) */}
            <div className="flex justify-center lg:justify-start mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs sm:text-sm text-gray-300">
                  Intelligence • Real-time Insights • Personalization
                </span>
              </span>
            </div>

            {/* Headings */}
            <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-neon leading-tight">
              {serviceName}
            </h1>
            <h2 className="mt-2 text-[18px] sm:text-xl md:text-3xl lg:text-4xl text-white font-semibold">
              Innovative AI & ML Services to Accelerate Your Business
            </h2>

            {/* Two concise paragraphs (parity with ERP/Digital density) */}
            <p className="mt-4 text-[15px] sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-[34ch] sm:max-w-[48ch] md:max-w-3xl mx-auto lg:mx-0">
              Stay competitive with <b className="text-gradient-neonsubtle">AI & machine learning</b> that power
              smarter decisions, automate workflows, and personalize experiences at scale.
            </p>
            <p className="mt-2 text-[15px] sm:text-base md:text-lg text-white/80 leading-relaxed max-w-[34ch] sm:max-w-[48ch] md:max-w-3xl mx-auto lg:mx-0">
              From discovery to deployment and ongoing optimization—we handle the full lifecycle and
              integrate with your stack.
            </p>

            {/* Rotating line */}
            <div className="mt-4 h-6 sm:h-8 md:h-10 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="inline-block text-sm sm:text-lg md:text-2xl font-semibold text-gradient-neonsubtle"
                >
                  We build smarter AI for {ROTATING[idx]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA (universal .btn) */}
            <div className="mt-6 md:mt-3 lg:mt-3 flex justify-center lg:justify-start">
              <a
                href="/contact"
                onMouseMove={handleMouseMove}
                onMouseLeave={resetMagnet}
                style={{ transform: `translate(${mx}px, ${my}px)` }}
                className="btn btn--pill"
                aria-label="Get a Free Consult"
              >
                Get a Free Consult
              </a>
            </div>

            {/* Mobile-only compact highlights (match Digital/ERP pattern) */}
            <div className="mt-5 grid grid-cols-2 gap-3 md:hidden">
              {[HIGHLIGHTS[0], HIGHLIGHTS[1]].map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-semibold">{title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop/Tablet highlights (md+) */}
            <div className="mt-6 hidden md:grid grid-cols-1 sm:grid-cols-3 gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-4 border border-white/10 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-cyan-300 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold">{title}</div>
                      <div className="mt-1 text-xs text-white/70">{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* IMAGE — below the fold on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-10 lg:mt-0 flex justify-center items-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[540px]"
            >
              <Image
                src={bgAltImage}
                alt="Artificial Intelligence and Machine Learning Illustration"
                width={800}
                height={560}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 540px"
                className="rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl object-contain img-focus-bottom"
                priority
              />
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-2xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
