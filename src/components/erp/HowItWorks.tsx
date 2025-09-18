"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { howItWorksErp } from "@/content/erp-page-content";

export default function HowItWorks() {
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 20%"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="px-6 lg:px-20 py-10 md:py-14">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-6 text-center"
        >
          Our ERP Implementation Process
        </motion.h2>

        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto" ref={railRef} aria-hidden={true}>
            <div className="absolute left-0 right-0 top-[34px] h-[2px] bg-white/10 rounded-full" />
            <motion.div
              className="absolute left-0 top-[34px] h-[2px] bg-gradient-neon rounded-full origin-left"
              style={{ width: progressWidth }}
            />
            <div className="grid grid-cols-4 gap-6">
              {howItWorksErp.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                  aria-label={`${idx + 1}. ${step.title}`}
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-cyan-400" />
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(70%_70%_at_50%_50%,rgba(0,255,255,0.12),transparent)]" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white min-h-[2.25rem] flex items-center justify-center">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-gray-300 text-sm leading-relaxed max-w-[18rem]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet */}
        <div className="lg:hidden">
          <ul className="space-y-3">
            {howItWorksErp.map((step, idx) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                viewport={{ once: true }}
                className="flex gap-3"
              >
                <div className="mt-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 ring-2 ring-cyan-400/25" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <step.icon className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-base font-semibold text-white">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
