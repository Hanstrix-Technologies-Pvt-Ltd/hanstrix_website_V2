"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { coreServices } from "@/content/digitalmarketing-page-content";
import type { LucideIcon } from "lucide-react";

type Service = { title: string; description: string; icon?: LucideIcon };

// disable tilt on coarse pointers (touch)
const useCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(pointer: coarse)");
      setCoarse(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    }
  }, []);
  return coarse;
};

const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  const rx = (0.5 - py) * 5.5;
  const ry = (px - 0.5) * 5.5;
  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
};
const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
};

export default function CoreServices() {
  const services = coreServices as Service[];
  const coarse = useCoarsePointer();

  return (
    <section className="px-4 sm:px-5 lg:px-16 py-8 md:py-10">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon text-center mb-10 md:mb-12"
        >Core Digital Marketing Solutions
        </motion.h2>

        {/* Desktop / tablet: compact alternating spine */}
        <div className="relative hidden md:block max-w-6xl mx-auto">
          {/* central spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[3px] h-full">
            <div className="h-full rounded-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 opacity-60" />
            <div className="absolute left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-cyan-300/70 blur-[1px] animate-spine-pulse" />
          </div>

          <div className="flex flex-col gap-7">
            {services.map((s, idx) => {
              const leftSide = idx % 2 === 0;
              const edgeGrad = leftSide
                ? "from-cyan-400 to-purple-500"
                : "from-purple-500 to-cyan-400";
              const armClass = leftSide
                ? "left-[calc(50%+2px)] bg-gradient-to-r from-cyan-400/80 via-purple-500/80 to-transparent"
                : "right-[calc(50%+2px)] bg-gradient-to-l from-cyan-400/80 via-purple-500/80 to-transparent";

              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16, x: leftSide ? -14 : 14 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative flex ${leftSide ? "justify-start" : "justify-end"} group`}
                >
                  {/* connector arm (decorative) */}
                  <div
                    aria-hidden
                    className={`absolute top-1/2 -translate-y-1/2 ${armClass} w-[56px] h-[2px] rounded-full`}
                  />
                  {/* node (decorative) */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white/40"
                    style={{ background: "radial-gradient(circle, #00C6FF 0%, #8A2BE2 70%, transparent 80%)" }}
                  />

                  {/* card */}
                  <div
                    onMouseMove={coarse ? undefined : onTilt}
                    onMouseLeave={coarse ? undefined : resetTilt}
                    style={{ transformStyle: "preserve-3d" }}
                    className={`
                      relative w-[min(520px,42vw)] rounded-2xl overflow-hidden
                      border border-white/10 bg-white/[0.055] backdrop-blur-md
                      transition-[transform,box-shadow] duration-200 will-change-transform
                      hover:shadow-[0_14px_56px_rgba(0,255,255,0.07)]
                      ${leftSide ? "mr-[70px]" : "ml-[70px]"}
                    `}
                  >
                    {/* gentle sheen */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.06) 38%, transparent 74%)",
                        backgroundSize: "220% 100%",
                        backgroundRepeat: "no-repeat",
                        animation: "sheen 7s linear infinite",
                      }}
                    />

                    {/* vertical neon edge (mirrored) */}
                    <div
                      aria-hidden
                      className={`absolute inset-y-2 ${leftSide ? "left-[-3px]" : "right-[-3px]"} w-[8px] rounded bg-gradient-to-b ${edgeGrad}`}
                    />
                    {/* glow (mirrored) */}
                    <div
                      aria-hidden
                      className={`absolute inset-y-0 ${leftSide ? "left-[-14px]" : "right-[-14px]"} w-9 blur-xl`}
                      style={{ background: "linear-gradient(180deg, rgba(0,198,255,0.48), rgba(138,43,226,0.48))" }}
                    />

                    <div className={`relative z-10 p-4 ${leftSide ? "" : "text-right"}`}>
                      <div className={`flex items-start gap-3 ${leftSide ? "" : "flex-row-reverse"}`}>
                        {s.icon ? (
                          <s.icon className="w-6 h-6 text-cyan-300 shrink-0" />
                        ) : (
                          <span className="w-6 h-6 rounded bg-white/10 border border-white/10" />
                        )}
                        <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                          {s.title}
                        </h3>
                      </div>
                      <p className={`text-gray-300 mt-2 ${leftSide ? "" : "ml-auto"}`}>{s.description}</p>
                      <div className={`mt-3 h-[3px] rounded-full bg-gradient-neon w-[52%] ${leftSide ? "" : "ml-auto"}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden">
          <div className="space-y-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-4 overflow-hidden"
              >
                <div className="absolute inset-y-2 left-0 w-[3px] rounded bg-gradient-to-b from-cyan-400 to-purple-500" aria-hidden />
                <div
                  className="absolute inset-y-0 left-[-10px] w-7 blur-xl"
                  style={{ background: "linear-gradient(180deg, rgba(0,198,255,0.45), rgba(138,43,226,0.45))" }}
                  aria-hidden
                />
                <div className="flex items-start gap-2">
                  {s.icon ? (
                    <s.icon className="w-5 h-5 text-cyan-300 shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded bg-white/10 border border-white/10" />
                  )}
                  <div className="min-w-0">
                    <div className="text-white font-semibold">{s.title}</div>
                    <div className="text-white/80 text-[13px] mt-1">{s.description}</div>
                  </div>
                </div>
                <div className="mt-3 h-[3px] w-[55%] rounded-full bg-gradient-neon" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes sheen { 0% { background-position-x: 0%; } 100% { background-position-x: 100%; } }
        @keyframes spinePulse { 0% { top: 0%; opacity: 0.2; } 50% { opacity: 0.65; } 100% { top: 100%; opacity: 0.2; } }
        .animate-spine-pulse { animation: spinePulse 5.2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
