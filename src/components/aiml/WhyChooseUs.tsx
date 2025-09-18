"use client";

import { motion } from "framer-motion";
import { whyChooseUs } from "@/content/aiml-page-content";

// simple 3D tilt (desktop only)
const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotX = (0.5 - py) * 8;
  const rotY = (px - 0.5) * 8;
  el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
};
const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
};

export default function WhyChooseUs() {
  return (
    <section className="px-6 lg:px-20 pb-15 md:pb-18">
      {/* XL rail only — keeps laptops the same, centers on ultrawide */}
      <div className="xl:mx-auto xl:max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-8 text-center"
        >
          Why Partner With Hanstrix?
        </motion.h2>

        {/* Mobile: compact points list */}
        <ul className="md:hidden space-y-4">
          {whyChooseUs.map((item, idx) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <item.icon className="w-5 h-5 text-cyan-400 mt-1 shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-semibold text-white leading-snug">{item.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Desktop/Tablet: glass cards grid */}
        <div
          className="
            hidden md:grid max-w-6xl mx-auto
            grid-cols-1 md:grid-cols-2 gap-6
            auto-rows-[1fr]
          "
        >
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div
                className="
                  glass-card rounded-2xl p-5 h-full
                  transition-transform duration-200 will-change-transform
                  relative group flex flex-col
                  ring-1 ring-cyan-400/20
                  shadow-[0_0_20px_rgba(0,255,255,0.15)]
                "
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="relative z-10 flex items-start gap-3">
                  <item.icon className="w-7 h-7 text-cyan-400 shrink-0" aria-hidden="true" />
                  <h3
                    className="
                      text-lg md:text-xl font-semibold text-white leading-snug
                      min-h-[2.5rem] flex items-center
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                <p className="relative z-10 text-gray-300 mt-3 leading-relaxed flex-1">
                  {item.description}
                </p>

                <div className="relative z-10 mt-4 h-[3px] rounded-full bg-gradient-neon opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
