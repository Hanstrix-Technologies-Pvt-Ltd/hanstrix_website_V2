"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface NeuralVisualizerProps {
  layers?: number[];           // nodes per layer
  cycleSec?: number;           // animation duration
  nodeRadius?: number;         // base node radius
}

export default function NeuralVisualizer({
  layers = [3, 5, 4, 2],
  cycleSec = 3.5,
  nodeRadius = 8,
}: NeuralVisualizerProps) {
  const layout = useMemo(() => {
    // layout constants
    const w = 800;           // viewbox width
    const h = 260;           // viewbox height
    const padX = 80;         // horizontal padding
    const padY = 30;         // vertical padding
    const usableW = w - padX * 2;
    const layerGap = usableW / (layers.length - 1);

    // Compute node coords per layer
    const layerPoints: { x: number; y: number }[][] = layers.map((count, li) => {
      const x = padX + li * layerGap;
      const innerH = h - padY * 2;
      const gap = count > 1 ? innerH / (count - 1) : 0;
      return Array.from({ length: count }, (_, ni) => ({
        x,
        y: padY + (count > 1 ? ni * gap : h / 2),
      }));
    });

    // Build all edges (connections) left->right
    const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
    for (let l = 0; l < layerPoints.length - 1; l++) {
      const from = layerPoints[l];
      const to = layerPoints[l + 1];
      for (let i = 0; i < from.length; i++) {
        for (let j = 0; j < to.length; j++) {
          edges.push({
            x1: from[i].x,
            y1: from[i].y,
            x2: to[j].x,
            y2: to[j].y,
            key: `${l}-${i}->${l + 1}-${j}`,
          });
        }
      }
    }

    return { w, h, layerPoints, edges };
  }, [layers]);

  return (
    <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
      <svg
        viewBox={`0 0 ${layout.w} ${layout.h}`}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Neural network animated visualization"
      >
        {/* defs: gradients + glow */}
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(138,43,226,0.2)" />
            <stop offset="100%" stopColor="rgba(0,255,255,0.15)" />
          </linearGradient>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,255,255,0.9)" />
            <stop offset="60%" stopColor="rgba(0,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(0,255,255,0.25)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* edges */}
        {layout.edges.map((e, idx) => (
          <motion.line
            key={e.key}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="white"
            strokeWidth={1.2}
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: [0.18, 0.45, 0.18] }}
            transition={{
              duration: cycleSec,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (idx % layers.length) * 0.15,
            }}
          />
        ))}

        {/* traveling “signal” dots along edges */}
        {layout.edges.map((e, idx) => {
          const dx = e.x2 - e.x1;
          const dy = e.y2 - e.y1;
          const len = Math.hypot(dx, dy);
          // unit vector for motion
          const ux = dx / len;
          const uy = dy / len;
          const travel = len - nodeRadius * 2;

          return (
            <motion.circle
              key={`pulse-${e.key}`}
              r={2.3}
              fill="rgba(0,255,255,0.9)"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: cycleSec * 0.8,
                repeat: Infinity,
                ease: "linear",
                delay: (idx % 12) * 0.07,
              }}
              // Use motionValue via attribute animations (x/y) along the edge
              cx={e.x1 + ux * nodeRadius}
              cy={e.y1 + uy * nodeRadius}
            >
              <animate
                attributeName="cx"
                from={e.x1 + ux * nodeRadius}
                to={e.x1 + ux * (nodeRadius + travel)}
                dur={`${cycleSec}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from={e.y1 + uy * nodeRadius}
                to={e.y1 + uy * (nodeRadius + travel)}
                dur={`${cycleSec}s`}
                repeatCount="indefinite"
              />
            </motion.circle>
          );
        })}

        {/* nodes */}
        {layout.layerPoints.map((pts, li) =>
          pts.map((p, ni) => (
            <g key={`n-${li}-${ni}`} transform={`translate(${p.x}, ${p.y})`}>
              <motion.circle
                r={nodeRadius}
                fill="url(#nodeGrad)"
                filter="url(#glow)"
                initial={{ scale: 0.95, opacity: 0.85 }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.85, 1, 0.85] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (li * 0.12 + ni * 0.07) % 1.5,
                }}
              />
              {/* subtle ring */}
              <circle
                r={nodeRadius + 5}
                fill="none"
                stroke="rgba(0,255,255,0.25)"
                strokeWidth={0.8}
              />
            </g>
          ))
        )}
      </svg>
    </div>
  );
}
