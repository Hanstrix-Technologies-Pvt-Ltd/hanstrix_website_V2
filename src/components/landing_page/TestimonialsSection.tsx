"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

// Best 3
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Hanstrix Technologies transformed our online presence. Their expertise in digital marketing drove a significant increase in our lead generation, and the support was excellent.",
    name: "John Doe",
    title: "CEO, Tech Solutions Inc.",
  },
  {
    quote:
      "The customized ERP solution they developed streamlined our operations and cut our costs by 20%. The team was professional and highly responsive.",
    name: "Jane Smith",
    title: "Operations Manager, Global Corp.",
  },
  {
    quote:
      "Their website development team is top-notch. They delivered a beautiful, fast, and secure website that has received nothing but praise from our users.",
    name: "Alex Johnson",
    title: "Founder, Innovate Co.",
  },
];

export default function TestimonialsSection() {
  const N = TESTIMONIALS.length;

  // ---- Mobile: snap carousel with seamless infinite wrap ----
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [snapOn, setSnapOn] = useState(true);

  // Tripled data for infinite loop: [A B C | A B C | A B C]
  const tripled = useMemo(
    () => [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS],
    []
  );
  const baseStartIndex = N; // land on middle copy

  // Measure cell width and land in middle copy on mount/resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      setCellWidth(w);
      setSnapOn(false);
      el.scrollTo({ left: baseStartIndex * w, behavior: "auto" });
      requestAnimationFrame(() => setSnapOn(true));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseStartIndex]);

  // Seamless wrap (last→first and first→last) with invisible teleport
  useEffect(() => {
    const el = trackRef.current;
    if (!el || cellWidth === 0) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const raw = el.scrollLeft / cellWidth;
        const idx = Math.round(raw);

        // Left outer copy (0..N-1) → jump to middle
        if (idx < N) {
          setSnapOn(false);
          el.scrollTo({ left: (idx + N) * cellWidth, behavior: "auto" });
          requestAnimationFrame(() => setSnapOn(true));
          setActive(idx);
          return;
        }

        // Right outer copy (2N..3N-1) → jump to middle
        if (idx >= 2 * N) {
          setSnapOn(false);
          el.scrollTo({ left: (idx - N) * cellWidth, behavior: "auto" });
          requestAnimationFrame(() => setSnapOn(true));
          setActive(idx - 2 * N);
          return;
        }

        // Middle copy → normal
        setActive(idx - N);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [cellWidth, N]);

  return (
    <section id="testimonials" className="relative section-spacing">
      <div className="container mx-auto max-w-7xl container-gutters">
        {/* Center wrapper ensures gradient inline-block headings are centered */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon inline-block">
            Testimonials
          </h2>
        </div>
      </div>

      {/* md-only: marquee scrolling (since N > 2) */}
      {N > 2 && (
        <div className="hidden md:block lg:hidden mt-8">
          <div className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            />
            {/* duplicate once for seamless loop */}
            <div className="flex w-max animate-ts-marquee-slow">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div
                  key={`md-${idx}`}
                  className="w-80 sm:w-[360px] md:w-[380px] px-3"
                >
                  <Card className="bg-transparent border-white/20 text-white p-6 h-full">
                    <CardContent className="p-0">
                      <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                      <div className="text-right mt-4">
                        <p className="font-semibold text-cyan-400">{t.name}</p>
                        <p className="text-sm text-gray-400">{t.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* lg+ static 3-column */}
      <div className="hidden lg:block mt-10">
        <div className="container mx-auto max-w-7xl container-gutters">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <Card
                key={`lg-${idx}`}
                className="bg-transparent border-white/20 text-white p-6 h-full"
              >
                <CardContent className="p-0">
                  <p className="text-base leading-relaxed opacity-90">{t.quote}</p>
                  <div className="text-right mt-4">
                    <p className="font-semibold text-cyan-400">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* sm-only: 1-at-a-time snap carousel, seamless infinite */}
      <div className="md:hidden mt-6">
        <div
          ref={trackRef}
          className={`flex overflow-x-auto no-scrollbar w-full touch-pan-x overscroll-x-contain ${
            snapOn ? "snap-x snap-mandatory" : "snap-none"
          }`}
          style={{
            scrollSnapType: snapOn ? "x mandatory" : "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tripled.map((t, i) => (
            <div
              key={`m-${i}`}
              className="shrink-0 w-full px-4 snap-start"
              style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
            >
              <div className="container mx-auto max-w-3xl">
                <Card className="bg-transparent border-white/20 text-white p-5 h-full">
                  <CardContent className="p-0">
                    <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                    <div className="text-right mt-4">
                      <p className="font-semibold text-cyan-400">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* small progress bars */}
        <div className="mt-5 px-8">
          <div className="mx-auto max-w-[240px] w-full flex items-center gap-2">
            {Array.from({ length: N }).map((_, i) => {
              const isActive = i === active;
              return (
                <span
                  key={i}
                  aria-hidden
                  className="relative h-1 flex-1 rounded-full overflow-hidden bg-white/20"
                >
                  <span
                    className={`absolute left-0 top-0 h-full ${
                      isActive ? "w-full" : "w-0"
                    } bg-gradient-to-r from-cyan-400 to-violet-500 transition-[width] duration-300`}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* local keyframes */}
      <style jsx>{`
        @keyframes ts-marquee-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ts-marquee-slow { animation: ts-marquee-slow 40s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
