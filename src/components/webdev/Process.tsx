// components/webdev/Process.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processSteps } from "@/content/webdev-page-content";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Step = { title: string; description: string };

const stepPad = (n: number) => String(n).padStart(2, "0");
const wrap = (i: number, len: number) => ((i % len) + len) % len;

export default function Process() {
  const steps = processSteps as Step[];
  const [idx, setIdx] = useState(0);
  const progress = useMemo(() => (idx + 1) / steps.length, [idx, steps.length]);

  // ---------- Desktop keyboard nav ----------
  const goToDesktop = (i: number) => setIdx(wrap(i, steps.length));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToDesktop(idx + 1);
      if (e.key === "ArrowLeft") goToDesktop(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // ---------- Mobile carousel sync ----------
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const ignoreScrollRef = useRef(false);

  const scrollToIndex = (i: number, behavior: ScrollBehavior = "smooth") => {
    const el = cardRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ inline: "center", block: "nearest", behavior });
  };

  const goToMobile = (i: number) => {
    const next = wrap(i, steps.length);
    ignoreScrollRef.current = true;
    setIdx(next);
    scrollToIndex(next, "smooth");
    window.setTimeout(() => (ignoreScrollRef.current = false), 360);
  };

  const makeCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  const handleScroll = () => {
    if (ignoreScrollRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const container = listRef.current;
      if (!container) return;
      const center = container.scrollLeft + container.clientWidth / 2;
      let nearest = 0;
      let min = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(elCenter - center);
        if (d < min) {
          min = d;
          nearest = i;
        }
      });
      setIdx(nearest);
    });
  };

  return (
    <section className="px-6 lg:px-20 py-5 md:py-10">
      {/* NEW: center content on xl */}
      <div className="xl:max-w-[1280px] xl:mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon text-center mb-6"
        >
          From Brief to Production — Our Build Flow
        </motion.h2>

        {/* Desktop / Large: Process Studio */}
        <div className="hidden lg:grid grid-cols-12 gap-8 max-w-7xl mx-auto items-center">
          {/* Left: Step rail */}
          <div className="col-span-5">
            <div
              role="tablist"
              aria-label="Website development process"
              className="relative glass-card rounded-2xl p-4 overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-purple-500/0" />
              <div className="space-y-2">
                {steps.map((s, i) => {
                  const active = i === idx;
                  return (
                    <button
                      key={s.title}
                      id={`process-tab-${i}`}
                      role="tab"
                      aria-selected={active}
                      aria-controls={`process-panel-${i}`}
                      onClick={() => goToDesktop(i)}
                      className={`group w-full text-left rounded-xl px-4 py-3 transition border ${
                        active
                          ? "border-white/15 bg-white/10"
                          : "border-white/5 hover:border-white/10 hover:bg-white/5"
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`relative shrink-0 w-9 h-9 rounded-full grid place-items-center ${
                            active
                              ? "bg-gradient-to-tr from-cyan-500/20 to-purple-500/20"
                              : "bg-white/5"
                          } border border-white/10`}
                        >
                          <span className="text-sm font-semibold text-white">
                            {stepPad(i + 1)}
                          </span>
                          {active && (
                            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan-400/50 animate-pulse" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-sm font-semibold ${
                              active ? "text-white" : "text-white/90"
                            }`}
                          >
                            {s.title}
                          </div>
                          <div className="text-xs text-white/60 line-clamp-1">
                            {s.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-neon rounded-full"
                  style={{ width: `${progress * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => goToDesktop(idx - 1)}
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white/90"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goToDesktop(idx + 1)}
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white/90"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="ml-2 text-sm text-white/70">
                Step <span className="text-white">{idx + 1}</span> of {steps.length}
              </span>
            </div>
          </div>

          {/* Right: Live preview (centered vertically) */}
          <div className="col-span-7 flex items-center justify-center">
            <DesktopPreview idx={idx} steps={steps} />
          </div>
        </div>

        {/* Mobile / Tablet: snap carousel + dots + live preview (no arrows) */}
        <div className="lg:hidden mt-2">
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 custom-scrollbar scroll-smooth"
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-[86%] sm:w-[72%] shrink-0 grow-0 snap-center"
                ref={makeCardRef(i)}
              >
                <div className="glass-card rounded-2xl p-4 border border-white/10 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center">
                      <span className="text-sm font-semibold text-white">
                        {stepPad(i + 1)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white min-h-[1.75rem] flex items-center">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-white/85">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step label — single line on mobile */}
          <div className="mt-3 px-3 flex items-center justify-center gap-2">
            <span className="text-sm text-white/80">
              Step <span className="text-white font-semibold">{idx + 1}</span> of{" "}
              {steps.length}
            </span>
            <span aria-hidden className="text-white/40">•</span>
            <span
              className="truncate text-sm text-white/80 max-w-[60vw] sm:max-w-[50vw]"
              title={steps[idx].title}
            >
              {steps[idx].title}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-neon rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {steps.map((_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => goToMobile(i)}
                  className={`relative h-2.5 rounded-full transition-all ${
                    active ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              );
            })}
          </div>

          {/* Live preview below dots */}
          <div className="mt-5">
            <MobilePreview idx={idx} steps={steps} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopPreview({ idx, steps }: { idx: number; steps: Step[] }) {
  return (
    <div
      id={`process-panel-${idx}`}
      role="tabpanel"
      aria-labelledby={`process-tab-${idx}`}
      className="relative rounded-2xl glass-card border border-white/10 overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[1.25rem]"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(0,255,255,0.15), rgba(138,43,226,0.15), transparent 60%)",
          maskImage:
            "radial-gradient(120% 120% at 50% 50%, black 55%, transparent 60%)",
        }}
      />
      <div className="relative z-10 p-5 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {steps[idx].title}
            </h3>
            <p className="mt-2 text-white/85 leading-relaxed">
              {steps[idx].description}
            </p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                  Artifacts
                </div>
                <ul className="space-y-2 text-sm text-white/85">
                  {idx === 0 && (
                    <>
                      <li>✓ Brief & goals</li>
                      <li>✓ Audience profile</li>
                      <li>✓ Success metrics</li>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <li>✓ Wireframes</li>
                      <li>✓ Design system</li>
                      <li>✓ Prototypes</li>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <li>✓ Component library</li>
                      <li>✓ API contracts</li>
                      <li>✓ CI scripts</li>
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <li>✓ Lighthouse 95+</li>
                      <li>✓ Cross-device QA</li>
                      <li>✓ a11y checks</li>
                    </>
                  )}
                  {idx === 4 && (
                    <>
                      <li>✓ SEO & analytics</li>
                      <li>✓ CDN/edge config</li>
                      <li>✓ Rollback plan</li>
                    </>
                  )}
                  {idx >= 5 && (
                    <>
                      <li>✓ Monitoring</li>
                      <li>✓ Iteration backlog</li>
                      <li>✓ SLA & support</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="rounded-xl bg-black/30 border border-white/10 p-3 font-mono text-[12px] leading-relaxed text-cyan-300/90">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-white/70">
                    {["brief.ts", "design.json", "build.ts", "qa.yml", "deploy.ts", "support.md"][idx] ??
                      "notes.txt"}
                  </span>
                </div>
                <CodeSample idx={idx} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobilePreview({ idx, steps }: { idx: number; steps: Step[] }) {
  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
        >
          <h4 className="text-base font-semibold text-white">
            {steps[idx].title}
          </h4>
          <p className="mt-1 text-sm text-white/85">{steps[idx].description}</p>
          <div className="mt-3 rounded-xl bg-black/30 border border-white/10 p-3 font-mono text-[11px] leading-relaxed text-cyan-300/90">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-400/70" />
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400/70" />
              <span className="inline-block w-2 h-2 rounded-full bg-green-400/70" />
              <span className="ml-2 text-white/70">
                {["brief.ts", "design.json", "build.ts", "qa.yml", "deploy.ts", "support.md"][idx] ??
                  "notes.txt"}
              </span>
            </div>
            <CodeSample idx={idx} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CodeSample({ idx }: { idx: number }) {
  const snippets = [
    `// discovery
export const brief = {
  goals: ["leads", "brand trust"],
  audience: ["B2B buyers", "CTOs"],
  kpis: ["signups", "MQLs"]
}`,
    `// design
const system = {
  colors: ["#00C6FF", "#8A2BE2"],
  spacing: [4, 8, 12, 16],
  components: ["Button", "Card", "Navbar"]
}`,
    `// dev
import { build } from "next";
await build({ swcMinify: true, optimizeCss: true });`,
    `# qa.yml
- run: lighthouse --min-score=0.95
- run: playwright test --project=mobile`,
    `// deploy
export const edge = true;
export const revalidate = 60;`,
    `// support
- monitor: "uptime"
- track: "core web vitals"
- iterate: "AB tests"`,
  ];
  return <pre>{snippets[idx] ?? snippets[0]}</pre>;
}
