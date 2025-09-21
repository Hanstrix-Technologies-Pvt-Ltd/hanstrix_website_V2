"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  speed = 0.5,
  offset = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset - speed * 100]
  );
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initSmoothScroll = async () => {
      if (typeof window === "undefined") return;

      try {
        const Lenis = (await import("lenis")).default;

        const lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
          lenisInstance.destroy();
        };
      } catch (error) {
        console.warn("Lenis smooth scrolling not available:", error);
      }
    };

    initSmoothScroll();
  }, []);

  return <>{children}</>;
};

// Intersection Observer hook for performance
export const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

// Performance optimized parallax for mobile
export const MobileOptimizedParallax: React.FC<ParallaxWrapperProps> = ({
  children,
  speed = 0.3,
  className = "",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView(0.1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Disable parallax on mobile for performance
  if (isMobile || !inView) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <ParallaxWrapper speed={speed} className={className}>
      <div ref={ref}>{children}</div>
    </ParallaxWrapper>
  );
};
