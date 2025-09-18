// components/webdev/Benefits.tsx
"use client";

import { motion } from "framer-motion";
import {
  Search,
  MousePointerClick,
  Rocket,
  Layers,
  BadgeCheck,
  PiggyBank,
} from "lucide-react";

type Benefit = { title: string; icon: React.ElementType };

const benefits: Benefit[] = [
  { title: "Higher search visibility & traffic", icon: Search },
  { title: "Intuitive UX/UI interactions", icon: MousePointerClick },
  { title: "Latest tech for a future-proof website", icon: Rocket },
  { title: "Scalable solutions for evolving needs", icon: Layers },
  { title: "Stronger brand credibility online", icon: BadgeCheck },
  { title: "Lower costs with efficient web systems", icon: PiggyBank },
];

export default function Benefits() {
  return (
    <section className="relative px-6 lg:px-20 py-8 md:py-10">
      {/* faint grid (stays full-bleed) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(0deg, #ffffff25 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #ffffff20 0 1px, transparent 1px 40px)",
        }}
      />

      {/* XL centering wrapper */}
      <div className="xl:max-w-[1280px] xl:mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon text-center">
          Benefits of Working With Us
        </h2>

        {/* metric chips */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {["Lighthouse 95+", "TTFB < 200ms", "A11y & SEO schema", "Edge caching"].map(
            (m) => (
              <span
                key={m}
                className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs sm:text-[13px] text-white/80"
              >
                {m}
              </span>
            )
          )}
        </div>

        {/* ---------- Zig-Zag spine (md+) ---------- */}
        <div className="relative hidden md:block max-w-5xl mx-auto mt-8">
          {/* vertical neon spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400/40 via-white/10 to-purple-500/40" />

          <div className="space-y-6">
            {benefits.map((b, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              return (
                <Row key={b.title} side={side}>
                  <BenefitCard side={side} title={b.title} Icon={b.icon} index={i} />
                </Row>
              );
            })}
          </div>
        </div>

        {/* ---------- Mobile: compact 2-col chips ---------- */}
        <div className="md:hidden mt-6 grid grid-cols-2 gap-2">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="relative rounded-xl border border-white/10 bg-white/[0.06] p-2.5"
            >
              <div className="pointer-events-none absolute left-2 right-2 -top-0.5 h-[2px] rounded-full bg-gradient-neon" />
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 grid place-items-center shrink-0">
                  {/* FIX: Tailwind arbitrary size instead of w-4.5/h-4.5 */}
                  <b.icon className="w-[18px] h-[18px] text-cyan-300" />
                </div>
                <div className="text-[12.5px] text-white/90 leading-snug">{b.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pieces ---------- */

function Row({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      {side === "left" ? (
        <>
          {children}
          <Connector side="right" />
        </>
      ) : (
        <>
          <Connector side="left" />
          {children}
        </>
      )}
    </div>
  );
}

function Connector({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`hidden md:flex items-center ${
        side === "left" ? "justify-end pr-1.5" : "justify-start pl-1.5"
      }`}
    >
      <div className="relative h-[2.5px] w-16 bg-gradient-neon rounded-full">
        <span
          className={`absolute top-1/2 -translate-y-1/2 ${
            side === "left" ? "-left-1.5" : "-right-1.5"
          } w-3 h-3 rounded-full ring-1 ring-white/30`}
          style={{
            background:
              "radial-gradient(circle, rgba(0,198,255,0.9) 0%, rgba(138,43,226,0.85) 70%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}

function BenefitCard({
  side,
  title,
  Icon,
  index,
}: {
  side: "left" | "right";
  title: string;
  Icon: React.ElementType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -14 : 14, y: 4 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.38, delay: index * 0.04 }}
      className={`relative w-full max-w-[480px] min-h-[104px] rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.22)] p-3.5 ${
        side === "left" ? "ml-auto" : "mr-auto"
      }`}
    >
      {/* compact neon edge + glow */}
      {side === "left" ? (
        <>
          <div
            aria-hidden
            className="absolute inset-y-2 left-[-2px] w-[6px] rounded bg-gradient-to-b from-cyan-400 to-purple-500"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-[-12px] w-8 blur-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,198,255,0.5), rgba(138,43,226,0.5))",
            }}
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-y-2 right-[-2px] w-[6px] rounded bg-gradient-to-b from-cyan-400 to-purple-500"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-[-12px] w-8 blur-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,198,255,0.5), rgba(138,43,226,0.5))",
            }}
          />
        </>
      )}

      <div className="flex items-start gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 grid place-items-center shrink-0">
          <Icon className="w-5 h-5 text-cyan-300" />
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-[15.5px] md:text-base">
            {title}
          </h3>
          <div className="mt-2 h-[3px] w-[50%] rounded-full bg-gradient-neon" />
        </div>
      </div>
    </motion.div>
  );
}
