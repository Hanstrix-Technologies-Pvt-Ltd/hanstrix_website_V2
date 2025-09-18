"use client";

import { motion } from "framer-motion";
import { Cpu, Dna, Network, BarChart2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

type IconType = React.ElementType;

export type FeatureItem = {
  title: string;
  description: string;
  icon: IconType;
};

const defaultItems: FeatureItem[] = [
  {
    title: "AI Solution Development",
    description:
      "Crafting bespoke AI systems, smart chatbots, and intelligent recommendation engines to automate processes and enhance customer interactions.",
    icon: Cpu,
  },
  {
    title: "Machine Learning Model Training",
    description:
      "Transforming raw data into actionable insights with custom-built ML models for accurate predictions, precise classifications, and insightful trend analysis.",
    icon: Dna,
  },
  {
    title: "AI Consulting & Integration",
    description:
      "Guiding your AI journey from strategy to seamless integration, ensuring your team is equipped for the future of intelligent automation.",
    icon: Network,
  },
  {
    title: "Advanced Data Analytics & Visualization",
    description:
      "Unlocking hidden value in datasets through advanced analytics, intuitive dashboards, and real-time reporting for unparalleled clarity.",
    icon: BarChart2,
  },
];

const useReducedMotion = () => {
  const pref = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      pref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);
  return pref;
};
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function Features({ items = defaultItems }: { items?: FeatureItem[] }) {
  const reduced = useReducedMotion();
  const allowTilt = useMemo(() => !reduced.current && !isTouchDevice(), [reduced]);

  const rafRef = useRef<number | null>(null);
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowTilt) return;
    const el = e.currentTarget;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - py) * 10;
      const rotY = (px - 0.5) * 10;

      const icon = el.querySelector<HTMLElement>("[data-card-icon]");
      if (icon) icon.style.transform = `translateZ(22px) translateY(-2px)`;

      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    const icon = el.querySelector<HTMLElement>("[data-card-icon]");
    if (icon) icon.style.transform = "translateZ(0) translateY(0)";
  };

  return (
    <section className="px-2 sm:px-6 lg:px-20 py-8 md:py-10">
      {/* XL-only rail: centers heading + grids; spacing unchanged */}
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-6 text-center"
        >
          Our Core AI & ML Solutions
        </motion.h2>

        {/* Desktop / tablet grid — equal-height cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
          className="hidden md:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch"
        >
          {items.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="h-full"
            >
              <div
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className="
                  group relative h-full glass-card rounded-2xl p-5
                  transition-transform duration-300 will-change-transform
                  card-glow-hover
                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                  flex flex-col
                "
                style={{ transformStyle: "preserve-3d" }}
                tabIndex={0}
                aria-label={service.title}
              >
                <div
                  className="
                    pointer-events-none absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ring-1 ring-cyan-400/20
                    shadow-[0_0_20px_rgba(0,255,255,0.15)]
                  "
                />
                <div
                  className="
                    pointer-events-none absolute -inset-10 rounded-[28px]
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,255,255,0.08),rgba(138,43,226,0.06)_60%,transparent_75%)]
                    blur-2xl
                  "
                />

                <div className="flex items-start gap-3 mb-2 min-h-[56px]">
                  <service.icon
                    data-card-icon
                    className="w-6 h-6 text-cyan-400 flex-shrink-0 transition-transform duration-300 mt-1"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-gradient-neonsubtle leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-1">
                  {service.description}
                </p>

                <span
                  className="
                    pointer-events-none mt-4 block h-px
                    bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  "
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile list */}
        <ul className="md:hidden space-y-3 list-inside text-white text-base">
          {items.map((service) => (
            <li
              key={service.title}
              className="flex items-start gap-2 before:content-['➣'] before:text-cyan-400 before:text-2xl"
            >
              <span className="flex-1">
                <strong className="text-gradient-neonsubtle">{service.title}</strong> — {service.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
