"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = { label: string; value: number; suffix?: string };

const stats: Stat[] = [
  { label: "countries serving", value: 10, suffix: "+" },
  { label: "customer satisfaction", value: 99, suffix: "%" },
  { label: "customer support", value: 24, suffix: "x7" },
];

export default function StatsCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const rafIds: number[] = [];
    stats.forEach((s, i) => {
      const duration = 1800; // slower: 1.8s
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4); // smoother ease-out
        const next = Math.round(s.value * eased);
        setCounts((prev) => {
          const copy = [...prev];
          copy[i] = Math.min(next, s.value);
          return copy;
        });
        if (p < 1) rafIds[i] = requestAnimationFrame(tick);
      };
      rafIds[i] = requestAnimationFrame(tick);
    });
    return () => rafIds.forEach((id) => cancelAnimationFrame(id));
  }, [inView]);

  return (
    <section className="px-2 sm:px-4 lg:px-20 pb-5">
      <div
        ref={ref}
        className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto text-center"
      >
        {stats.map((s, i) => {
          const primary = `${counts[i].toLocaleString()}${s.suffix ?? ""}`;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-1"
              aria-label={`${primary} ${s.label}`}
            >
              <p className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                {primary}
              </p>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base capitalize leading-tight">
                {s.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
