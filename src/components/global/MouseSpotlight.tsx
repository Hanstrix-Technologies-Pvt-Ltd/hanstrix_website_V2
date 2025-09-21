"use client";

import React, { useEffect, useState } from "react";

interface MouseSpotlightProps {
  size?: number;
  opacity?: number;
  blur?: number;
  color?: string;
  disabled?: boolean;
}

export const MouseSpotlight: React.FC<MouseSpotlightProps> = ({
  size = 400,
  opacity = 0.15,
  blur = 100,
  color = "#ffffff",
  disabled = false,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Handle window focus/blur for better UX
    const handleBlur = () => setIsVisible(false);
    const handleFocus = () => setIsVisible(true);

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [disabled]);

  if (disabled || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at ${mousePosition.x}px ${
          mousePosition.y
        }px, ${color}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")} 0%, transparent 50%)`,
        filter: `blur(${blur}px)`,
        mixBlendMode: "screen",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

// Enhanced version with multiple layers for more realistic lighting
export const AdvancedMouseSpotlight: React.FC<MouseSpotlightProps> = ({
  size = 400,
  opacity = 0.12,
  blur = 80,
  color = "#ffffff",
  disabled = false,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [disabled]);

  if (disabled || !isVisible) return null;

  return (
    <>
      {/* Main spotlight */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at ${
            mousePosition.x
          }px ${mousePosition.y}px, ${color}${Math.round(opacity * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 60%)`,
          filter: `blur(${blur}px)`,
          mixBlendMode: "screen",
          opacity: isVisible ? 1 : 0,
          zIndex: 1000,
        }}
      />

      {/* Inner bright core */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size * 0.3}px circle at ${
            mousePosition.x
          }px ${mousePosition.y}px, ${color}${Math.round(opacity * 2 * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 40%)`,
          filter: `blur(${blur * 0.5}px)`,
          mixBlendMode: "screen",
          opacity: isVisible ? 1 : 0,
          zIndex: 1001,
        }}
      />

      {/* Outer glow */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(${size * 1.5}px circle at ${
            mousePosition.x
          }px ${mousePosition.y}px, ${color}${Math.round(opacity * 0.5 * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 70%)`,
          filter: `blur(${blur * 1.5}px)`,
          mixBlendMode: "screen",
          opacity: isVisible ? 0.8 : 0,
          zIndex: 999,
        }}
      />
    </>
  );
};

// Colored spotlight variant
export const ColoredMouseSpotlight: React.FC<
  MouseSpotlightProps & {
    primaryColor?: string;
    secondaryColor?: string;
  }
> = ({
  size = 400,
  opacity = 0.15,
  blur = 80,
  primaryColor = "#5227FF",
  secondaryColor = "#FF9FFC",
  disabled = false,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  if (disabled || !isVisible) return null;

  return (
    <>
      {/* Primary color layer */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at ${
            mousePosition.x
          }px ${mousePosition.y}px, ${primaryColor}${Math.round(opacity * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 50%)`,
          filter: `blur(${blur}px)`,
          mixBlendMode: "screen",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Secondary color layer (offset slightly) */}
      <div
        className="pointer-events-none fixed inset-0 z-29 transition-opacity duration-400"
        style={{
          background: `radial-gradient(${size * 0.7}px circle at ${
            mousePosition.x + 20
          }px ${mousePosition.y + 20}px, ${secondaryColor}${Math.round(
            opacity * 0.8 * 255
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 40%)`,
          filter: `blur(${blur * 1.2}px)`,
          mixBlendMode: "screen",
          opacity: isVisible ? 0.8 : 0,
        }}
      />
    </>
  );
};

export default MouseSpotlight;
