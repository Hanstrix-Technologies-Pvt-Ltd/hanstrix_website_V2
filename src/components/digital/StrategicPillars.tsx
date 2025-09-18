"use client";

import { motion } from "framer-motion";
import { strategicPillars } from "@/content/digitalmarketing-page-content";

export default function StrategicPillars() {
  return (
    <section className="px-6 lg:px-20 pt-8 md:pt-10">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon text-center mb-8 md:mb-12"
        >
          Strategic Pillars — How We Drive Growth
        </motion.h2>

        {/* desktop/tablet cards */}
        <div className="hidden sm:flex flex-wrap justify-center gap-5">
          {strategicPillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="basis-full sm:basis-[calc(50%-10px)] xl:basis-[calc(25%-12px)]"
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-5 h-full overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(220px circle at 20% 0%, rgba(0,198,255,0.10), rgba(138,43,226,0.10) 40%, transparent 60%)",
                  }}
                />
                <div className="relative flex items-start gap-3">
                  <p.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                  <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">{p.title}</h3>
                </div>
                <p className="relative text-gray-300 mt-2">{p.description}</p>
                <div className="relative mt-4 h-[3px] rounded-full bg-gradient-neon w-[60%]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* mobile list */}
        <ul className="sm:hidden space-y-3 list-inside text-white text-base">
          {strategicPillars.map((p) => (
            <li key={p.title} className="flex items-start gap-2 before:content-['➣'] before:text-cyan-400">
              <span>
                <strong className="text-gradient-neonsubtle">{p.title}</strong> — {p.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
