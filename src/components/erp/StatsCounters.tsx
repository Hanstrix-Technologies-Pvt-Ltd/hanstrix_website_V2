"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Processes Automated", value: 1200 },
  { label: "Avg. Deployment Time", value: 6, suffix: " wks" },
  { label: "Uptime SLA", value: 99.9, suffix: "%" },
  { label: "Custom Modules Delivered", value: 85 },
];

export default function StatsCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const rafIds: number[] = [];
    stats.forEach((s, i) => {
      const duration = 900;
      const start = performance.now();
      const animate = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const next =
          Math.round(s.value * eased * (s.value > 100 ? 1 : 100)) /
          (s.value > 100 ? 1 : 100);
        setCounts((prev) => {
          const copy = [...prev];
          copy[i] = Math.min(next, s.value);
          return copy;
        });
        if (p < 1) rafIds[i] = requestAnimationFrame(animate);
      };
      rafIds[i] = requestAnimationFrame(animate);
    });
    return () => rafIds.forEach((id) => cancelAnimationFrame(id));
  }, [started]);

  return (
    <section className="px-6 lg:px-20 py-10 md:py-14">
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <p className="text-3xl md:text-4xl font-extrabold text-gradient-neon">
                {counts[i].toLocaleString()}
                {s.suffix || ""}
              </p>
              <p className="text-gray-300 mt-2 text-sm md:text-base">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
