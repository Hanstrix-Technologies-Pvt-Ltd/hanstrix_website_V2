"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

type Feature = { title: string; desc: string; icon: LucideIcon };

const features: Feature[] = [
  { title: "Robust Security", desc: "Multi-layered encryption and role-based access controls.", icon: ShieldCheck },
  { title: "Real-Time Analytics", desc: "Instant insights across all business modules.", icon: Gauge },
  { title: "Collaborative Workflows", desc: "Boost team productivity with integrated processes.", icon: Users },
  { title: "Scalable Modules", desc: "Add or customize modules as your business grows.", icon: Zap },
];

export default function KeyFeatures() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-16 pt-4">
      {/* BG overlay remains full-bleed */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          before:content-[''] before:absolute before:inset-0
          before:[mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
          before:bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0.06)_26%,transparent_27%),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0.06)_26%,transparent_27%)]
          before:[background-size:22px_22px,22px_22px]
          [background:radial-gradient(55%_40%_at_60%_70%,rgba(138,43,226,0.18),transparent_65%)]
        "
      />

      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl relative z-10 text-center font-bold text-gradient-neon mb-4"
        >
          Key Features That Drive ERP
        </motion.h2>

        {/* Desktop orbit */}
        <div className="hidden md:grid place-items-center mt-6 relative z-10">
          <div className="relative w-[920px] max-w-full aspect-[2.1/1] mx-auto">
            {/* Center hub */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-white/10 overflow-hidden bg-white/[0.05] backdrop-blur-sm shadow-[0_0_60px_rgba(0,200,255,0.25),inset_0_0_50px_rgba(138,43,226,0.15)]"
            >
              <div className="absolute inset-0 rounded-full before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[conic-gradient(from_0deg,rgba(0,200,255,0.45),rgba(138,43,226,0.45),rgba(0,200,255,0.45))] before:animate-[spin_14s_linear_infinite] before:opacity-60" />
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-black/60" />
              </div>
            </motion.div>

            {/* Orbit nodes */}
            <FeatureNode feature={features[0]} style={{ left: "8%", top: "14%" }} fromCenter="translate(150px, 80px)" delay={0.05} />
            <FeatureNode feature={features[1]} style={{ right: "6%", top: "5%" }} fromCenter="translate(-150px, 90px)" delay={0.1} />
            <FeatureNode feature={features[2]} style={{ left: "5%", bottom: "6%" }} fromCenter="translate(155px, -90px)" delay={0.15} />
            <FeatureNode feature={features[3]} style={{ right: "9%", bottom: "10%" }} fromCenter="translate(-155px, -85px)" delay={0.2} />
          </div>
        </div>

        {/* Mobile stack */}
        <div className="md:hidden mt-3 max-w-2xl mx-auto space-y-2.5 relative z-10">
          {features.map((f, i) => (
            <FeatureStackCard key={f.title} feature={f} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  );
}


/* ------- subcomponents ------- */

function FeatureNode({
  feature,
  style,
  fromCenter,
  delay = 0,
}: {
  feature: Feature;
  style: React.CSSProperties;
  fromCenter: string;
  delay?: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="absolute"
      style={style}
    >
      {/* connector */}
      <span
        aria-hidden
        className="absolute -z-10 left-1/2 top-1/2 h-0.5 w-36 origin-left"
        style={{
          transform: `translate(-50%,-50%) ${fromCenter}`,
          background:
            "linear-gradient(90deg, rgba(0,198,255,0.0), rgba(0,198,255,0.6), rgba(138,43,226,0.0))",
          filter: "drop-shadow(0 0 8px rgba(0,198,255,0.6))",
        }}
      />
      {/* equal-size card */}
      <motion.div
        whileHover={{ y: -3, rotate: -0.4 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="
          group relative w-[min(340px,36vw)] max-w-[340px]
          rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md
          px-4 pt-3 pb-2 shadow-[0_8px_24px_rgba(0,0,0,0.26)]
          min-h-[140px] flex
        "
      >
        <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-white/10" />
        <div
          aria-hidden
          className="absolute -right-3 top-2.5 w-10 h-10 blur-2xl"
          style={{ background: "linear-gradient(180deg, rgba(0,198,255,0.6), rgba(138,43,226,0.6))" }}
        />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 grid place-items-center shrink-0">
            <Icon className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{feature.title}</h3>
            <p className="text-gray-300 text-sm leading-snug">{feature.desc}</p>
          </div>
        </div>
        <div className="absolute left-4 right-4 bottom-2 h-[3px] rounded-full bg-gradient-neon" />
      </motion.div>
    </motion.div>
  );
}

function FeatureStackCard({
  feature,
  delay = 0,
}: {
  feature: Feature;
  delay?: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md shadow-[0_8px_22px_rgba(0,0,0,0.22)] px-4 pt-3 pb-2 min-h-[112px] flex items-center"
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-3 -top-1 h-[3px] rounded-full bg-gradient-neon" />
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/6 border border-white/10 grid place-items-center shrink-0">
          <Icon className="w-5 h-5 text-cyan-300" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{feature.title}</h3>
          <p className="text-gray-300 text-sm leading-snug">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
