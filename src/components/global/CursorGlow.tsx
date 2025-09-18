"use client";
import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    let rafId: number | null = null;
    let x = 0, y = 0;

    const update = () => {
      root.style.setProperty("--x", `${x}px`);
      root.style.setProperty("--y", `${y}px`);
      rafId = null;
    };

    const queue = () => {
      if (rafId == null) rafId = window.requestAnimationFrame(update);
    };

    const onMouseMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; queue(); };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      x = t.clientX ?? t.pageX; y = t.clientY ?? t.pageY; queue();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
