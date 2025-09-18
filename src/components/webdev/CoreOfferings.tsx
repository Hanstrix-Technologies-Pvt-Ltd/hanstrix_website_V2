"use client";

import { motion } from "framer-motion";
import { coreOfferings } from "@/content/webdev-page-content";

// pointer-reactive glow (perf-safe)
const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.setProperty("--mx", `${x}px`);
  el.style.setProperty("--my", `${y}px`);
};

// simple tilt (kept subtle)
const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotX = (0.5 - py) * 5;
  const rotY = (px - 0.5) * 5;
  el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
};
const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
};

export default function CoreOfferings() {
  return (
    <section className="px-6 lg:px-20 py-8 md:py-10">
      <div className="xl:max-w-[1280px] xl:mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-5 text-center"
        >
          Core Website Development Services
        </motion.h2>

        {/* Desktop / tablet */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
          }}
          className="hidden sm:flex flex-wrap justify-center gap-4"
        >
          {coreOfferings.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="basis-full sm:basis-[calc(50%-8px)] xl:basis-[calc(33.333%-10px)]"
            >
              <div
                className="
                  glass-card rounded-2xl h-full overflow-hidden relative group
                  transition-transform duration-200 will-change-transform flex
                "
                style={{
                  transformStyle: "preserve-3d",
                  backgroundImage:
                    "radial-gradient(180px 180px at var(--mx,50%) var(--my,50%), rgba(0,255,255,0.10), rgba(138,43,226,0.08) 40%, transparent 65%)",
                  backgroundBlendMode: "screen",
                }}
                onMouseMove={(e) => {
                  onMove(e);
                  handleTilt(e);
                }}
                onMouseLeave={resetTilt}
              >
                <div className="relative z-10 p-4 md:p-5 flex flex-col w-full">
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-md bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white leading-snug min-h-[2.25rem] md:min-h-[2.5rem] flex items-center">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 mt-2 md:mt-2.5 leading-relaxed text-sm md:text-[15px] flex-1">
                    {item.description}
                  </p>

                  <div className="mt-4">
                    <div className="h-[3px] rounded-full bg-gradient-neon opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <button
                    className="absolute inset-0 outline-none focus-visible:ring-2 ring-cyan-400/50 rounded-2xl"
                    aria-label={item.title}
                    tabIndex={0}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-cyan-400/30 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: compact bullets */}
        <ul className="sm:hidden space-y-3 text-white text-[15px] leading-relaxed">
          {coreOfferings.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] text-cyan-400">➣</span>
              <span>
                <strong className="text-gradient-neonsubtle">{item.title}</strong> — {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
