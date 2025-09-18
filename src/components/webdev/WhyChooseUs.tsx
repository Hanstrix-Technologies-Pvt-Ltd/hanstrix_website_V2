"use client";

import { motion, type Variants } from "framer-motion";
import { whyChooseUs } from "@/content/webdev-page-content";

export default function WhyChooseUs() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const stripe: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const gradients = [
    "linear-gradient(90deg, rgba(0,198,255,0.16), rgba(138,43,226,0.16))",
    "linear-gradient(90deg, rgba(138,43,226,0.16), rgba(0,198,255,0.16))",
    "linear-gradient(90deg, rgba(0,198,255,0.20), rgba(0,198,255,0.06))",
  ];

  const clipRight = "polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)";
  const clipLeft = "polygon(0 50%, 4% 0, 100% 0, 100% 100%, 4% 100%)";

  return (
    <section className="px-6 lg:px-20 py-5 md:py-12 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          background:
            "repeating-linear-gradient(0deg, #ffffff20 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #ffffff12 0 1px, transparent 1px 40px)",
        }}
      />

      <div className="xl:max-w-[1280px] xl:mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon text-center"
        >
          Why Choose Hanstrix for Web Development?
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="hidden sm:block max-w-6xl mx-auto mt-8 space-y-5"
        >
          {whyChooseUs.map((item, i) => {
            const even = i % 2 === 0;
            const bg = gradients[i % gradients.length];

            return (
              <motion.article key={item.title} variants={stripe} className="relative">
                <div
                  className={`absolute top-1.5 bottom-1.5 w-[8px] rounded ${even ? "right-[-4px]" : "left-[-4px]"}`}
                  style={{ background: "linear-gradient(180deg, #00C6FF, #8A2BE2, #00C6FF)" }}
                />
                <div
                  aria-hidden
                  className={`absolute top-0 bottom-0 w-14 blur-2xl ${even ? "right-[-18px]" : "left-[-18px]"}`}
                  style={{ background: "linear-gradient(180deg, rgba(0,198,255,0.55), rgba(138,43,226,0.55))", opacity: 0.9 }}
                />

                <div
                  className="relative overflow-hidden rounded-2xl border border-white/10 glass-card"
                  style={{ clipPath: even ? clipRight : clipLeft }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: bg, backgroundSize: "200% 100%" }}
                    initial={{ backgroundPositionX: even ? "0%" : "100%" }}
                    animate={{ backgroundPositionX: even ? ["0%", "100%", "0%"] : ["100%", "0%", "100%"] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{ background: "repeating-linear-gradient(180deg, #ffffff40 0 1px, transparent 1px 28px)" }}
                  />
                  <div className={`relative z-10 flex items-start gap-4 p-5 md:p-6 ${even ? "" : "flex-row-reverse text-right"}`}>
                    <div className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 grid place-items-center shrink-0">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 ${even ? "justify-between" : "justify-between flex-row-reverse"}`}>
                        <h3 className="text-lg md:text-xl font-semibold text-white truncate">{item.title}</h3>
                        <motion.div
                          initial={{ width: "20%" }}
                          whileInView={{ width: "42%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7 }}
                          className="hidden md:block h-[3px] rounded-full bg-gradient-neon opacity-90"
                        />
                      </div>
                      <p className={`text-gray-300 mt-2 ${even ? "" : "ml-auto"}`}>{item.description}</p>
                      <motion.div
                        initial={{ width: "28%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`mt-4 h-[3px] rounded-full bg-gradient-neon opacity-90 ${even ? "" : "ml-auto"}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Mobile — compact points */}
        <ul className="sm:hidden mt-6 space-y-3 list-inside text-white text-base">
          {whyChooseUs.map((item) => (
            <li key={item.title} className="flex items-start gap-2 before:content-['✓'] before:text-cyan-400">
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
