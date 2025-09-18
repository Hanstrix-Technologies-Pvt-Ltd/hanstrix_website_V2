"use client";

import { motion } from "framer-motion";
import { whyEssential } from "@/content/digitalmarketing-page-content";
import { CheckCircle2 } from "lucide-react";

export default function WhyEssential() {
  return (
    // Reduced bottom padding kept as you set
    <section className="px-6 lg:px-20 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon text-center mb-8 md:mb-12 pt-2 md:pt-4"
        >
          Why Digital Marketing Is Essential
        </motion.h2>

        {/* Desktop/Tablet: alternating signal ribbons */}
        <div className="hidden sm:block max-w-5xl mx-auto">
          <div className="relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-purple-500/0"
              aria-hidden
            />
            <ul className="space-y-6">
              {whyEssential.map((text, i) => {
                const leftSide = i % 2 === 0;
                return (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    className={`relative flex ${leftSide ? "justify-start pr-10" : "justify-end pl-10"}`}
                  >
                    <span
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ring-2 ring-white/40"
                      style={{ background: "radial-gradient(circle, #00C6FF 0%, #8A2BE2 70%, transparent 80%)" }}
                      aria-hidden
                    />
                    <div
                      className={`
                        relative w-[min(92vw,520px)] rounded-xl border border-white/10
                        bg-white/[0.06] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                        px-5 py-4
                        ${leftSide ? "ml-0 mr-[8%]" : "mr-0 ml-[8%]"}
                      `}
                    >
                      <div
                        aria-hidden
                        className={`absolute inset-y-2 ${leftSide ? "right-[-3px]" : "left-[-3px]"} w-[8px] rounded bg-gradient-to-b from-cyan-400 to-purple-500`}
                      />
                      <div
                        aria-hidden
                        className={`absolute inset-y-0 ${leftSide ? "right-[-16px]" : "left-[-16px]"} w-10 blur-2xl`}
                        style={{ background: "linear-gradient(180deg, rgba(0,198,255,0.55), rgba(138,43,226,0.55))" }}
                      />
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/6 border border-white/10 grid place-items-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-cyan-300" aria-hidden="true" />
                        </div>
                        <p className="text-white/90">{text}</p>
                      </div>
                      <div className="mt-3 h-[3px] w-[60%] rounded-full bg-gradient-neon" />
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="sm:hidden max-w-5xl mx-auto mt-2">
          <ul className="space-y-3">
            {whyEssential.map((text, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.035 }}
                className="h-full"
              >
                <div className="relative rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.22)] px-4 py-3 min-h-[96px] flex items-center">
                  <div className="pointer-events-none absolute inset-x-3 -top-1 h-[3px] rounded-full bg-gradient-neon" aria-hidden />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-white/6 border border-white/10 grid place-items-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                    </div>
                    <p className="text-white/90 text-sm leading-snug">{text}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
