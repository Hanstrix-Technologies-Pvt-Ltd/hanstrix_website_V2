// components/landing_page/ClientLogos.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Logo = { src: string; alt: string };

const logos: Logo[] = [
  { src: "/images/radiant-logo.jpg", alt: "Radiant" },
  { src: "/images/stelz-logo.jpg", alt: "Stelz" },
  { src: "/images/stockNavii-logo.jpg", alt: "StockNavii" },
];

const ClientLogos: React.FC = () => {
  const track = useMemo<Logo[]>(
    () =>
      logos.length > 1 ? [logos[logos.length - 1], ...logos, logos[0]] : logos,
    []
  );
  const [index, setIndex] = useState<number>(logos.length > 1 ? 1 : 0);
  const [anim, setAnim] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // swipe state
  const startX = useRef<number>(0);
  const deltaX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const slideTo = (next: number) => {
    setAnim(true);
    setIndex(next);
  };

  const realIndex =
    logos.length > 1 ? (index - 1 + logos.length) % logos.length : 0;
  const progressPct =
    logos.length > 1 ? ((realIndex + 1) / logos.length) * 100 : 100;

  // Loop handling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTransitionEnd = () => {
      if (logos.length <= 1) return;
      if (index === 0) {
        setAnim(false);
        setIndex(logos.length);
      } else if (index === logos.length + 1) {
        setAnim(false);
        setIndex(1);
      }
    };

    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [index]);

  useEffect(() => {
    if (!anim) {
      const id = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(id);
    }
  }, [anim]);

  // Touch/drag handlers
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
    setAnim(false);
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    deltaX.current = e.touches[0].clientX - startX.current;
    const offset =
      -index * 100 + (deltaX.current / containerRef.current.clientWidth) * 100;
    containerRef.current.style.transform = `translateX(${offset}%)`;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (!containerRef.current) return;
    isDragging.current = false;
    setAnim(true);
    const threshold = 40;
    if (deltaX.current > threshold) slideTo(index - 1);
    else if (deltaX.current < -threshold) slideTo(index + 1);
    else slideTo(index);
  };

  // Buttons
  const prev = () => slideTo(index - 1);
  const next = () => slideTo(index + 1);

  const transformStyle = { transform: `translateX(${-index * 100}%)` };
  const transitionCls = anim
    ? "transition-transform duration-300 ease-out"
    : "";

  return (
    <section aria-label="Client logos" className="py-0 my-0 ">
      <div className="container mx-auto max-w-7xl ">
        <div className="text-center md:pt-5 pb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon mb-3 sm:mb-4">
            Our Clients
          </h1>
        </div>

        {/* Mobile/Tablet: one-logo carousel */}
        <div className="relative block lg:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={containerRef}
              className={`flex w-full ${transitionCls}`}
              style={transformStyle}
            >
              {track.map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="w-full flex-shrink-0 flex justify-center py-2"
                >
                  <Image
                    src={logo.src}
                    alt={`${logo.alt} logo`}
                    width={220}
                    height={80}
                    className="h-16 w-auto object-contain opacity-85"
                    priority={i === 1}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 grid place-items-center hover:bg-black/55 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 grid place-items-center hover:bg-black/55 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="px-16 sm:px-20 md:px-24 mt-2 mb-0">
            <div className="h-1 rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-cyan-400 transition-[width] duration-200"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Desktop: static row */}
        <ul className="hidden lg:flex items-center justify-center gap-12 py-2">
          {logos.map((logo) => (
            <li
              key={logo.src}
              className="opacity-85 hover:opacity-100 transition-opacity"
            >
              <Image
                src={logo.src}
                alt={`${logo.alt} logo`}
                width={220}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ClientLogos;
