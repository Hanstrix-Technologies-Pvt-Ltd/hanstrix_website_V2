"use client";

import { motion } from "framer-motion";
import { erpSolutions } from "@/content/erp-page-content";
import { useEffect, useState } from "react";

const useCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(pointer: coarse)");
      setCoarse(mq.matches);
      const listener = (e: MediaQueryListEvent) => setCoarse(e.matches);
      mq.addEventListener?.("change", listener);
      return () => mq.removeEventListener?.("change", listener);
    }
  }, []);
  return coarse;
};

const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotX = (0.5 - py) * 6;
  const rotY = (px - 0.5) * 6;
  el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
};
const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
};

export default function Features() {
  const isCoarse = useCoarsePointer();

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-8 sm:py-10">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-5 sm:mb-6 text-center"
        >
          ERP That Fits Your Operations
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.04 },
            },
          }}
          className="flex flex-wrap gap-4 sm:gap-5 justify-center"
        >
          {erpSolutions.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="
                basis-full
                md:basis-[calc(50%-0.625rem)]
                xl:basis-[calc(33.333%-0.833rem)]
              "
            >
              <div
                className="
                  glass-card rounded-2xl overflow-hidden h-full relative group
                  grid grid-cols-[52px_1fr] sm:grid-cols-[60px_1fr]
                  p-0 transition-[transform,box-shadow] duration-200 will-change-transform
                  motion-reduce:transition-none
                "
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={isCoarse ? undefined : handleTilt}
                onMouseLeave={isCoarse ? undefined : resetTilt}
              >
                <div className="relative bg-white/5 border-r border-white/10 flex items-center justify-center py-4">
                  <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-purple-400/0" />
                </div>

                <div className="p-4 sm:p-5 flex flex-col h-full">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-cyan-400/30 transition-all duration-300 motion-reduce:transition-none" />
                  <h3 className="min-h-[2.25rem] sm:min-h-[2.75rem] flex items-center text-base sm:text-lg md:text-xl font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mt-1 flex-1 text-sm sm:text-[0.95rem]">
                    {f.description}
                  </p>
                  <div className="mt-3 sm:mt-4 h-[3px] rounded-full bg-gradient-neon opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
