"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { howItWorks, Step } from "@/content/aiml-page-content";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const TimelineStep = ({ step, index }: { step: Step; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] } },
      }}
      role="listitem"
      className={`w-full lg:w-1/2 ${isEven ? "lg:self-start lg:text-left" : "lg:self-end lg:text-right"}`}
    >
      <div className="glass-card p-6 rounded-2xl h-full">
        <div className={`flex items-center gap-3 mb-2 ${!isEven && "lg:justify-end"}`}>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-bold border border-cyan-400/30">
            {index + 1}
          </span>
          <div className="flex items-center gap-3">
            <step.icon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <h3 className="text-lg md:text-xl font-semibold text-gradient-neonsubtle leading-snug">
              {step.title}
            </h3>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">{step.description}</p>
      </div>
    </motion.li>
  );
};

export default function HowItWorks() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={timelineRef} className="px-6 lg:px-20 md:pt-5 relative">
      {/* XL rail only — no spacing changes */}
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-10 text-center"
        >
          Our AI Development Process
        </motion.h2>

        <div className="max-w-5xl mx-auto relative">
          {/* Center line on lg+ */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/60 to-purple-500/0"
            aria-hidden="true"
          />
          {/* Left line on mobile */}
          <div
            className="lg:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-purple-500/0"
            aria-hidden="true"
          />

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            role="list"
            className="relative flex flex-col items-center lg:items-start gap-y-8"
          >
            {howItWorks.map((step, index) => (
              <TimelineStep key={step.title} step={step} index={index} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
