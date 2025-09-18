"use client";

import React, { useEffect, useRef } from "react";

/**
 * Lightweight canvas particles with soft links and neon palette.
 * - No external deps, no runtime version pitfalls.
 * - Auto scales with DPR, density reduced on small screens.
 * - Z-index 0, full-screen, pointer-events none.
 */
export default function CanvasBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let width = 0, height = 0, dpr = 1;

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let points: P[] = [];

    const colors = ["#22d3ee", "#8b5cf6", "#60a5fa"]; // cyan / violet / blue

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // particle count scales with area; lower on mobile
      const base = width < 640 ? 45 : width < 1024 ? 80 : 120;
      const target = base;
      points = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 1.2 + Math.random() * 2.2, // size
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };

    const dist2 = (a: P, b: P) => {
      const dx = a.x - b.x, dy = a.y - b.y;
      return dx * dx + dy * dy;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // soft vignette fill for depth (very subtle)
      const g = ctx.createRadialGradient(width * 0.7, height * 0.3, 0, width * 0.7, height * 0.3, Math.max(width, height));
      g.addColorStop(0, "rgba(34, 211, 238, 0.05)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const d2 = dist2(a, b);
          const max = 140; // link distance (px)
          if (d2 < max * max) {
            const alpha = 0.25 * (1 - Math.sqrt(d2) / max);
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // points
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + "CC"; // hex + alpha ~ 0.8
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => { resize(); };
    resize();
    tick();
    window.addEventListener("resize", onResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
