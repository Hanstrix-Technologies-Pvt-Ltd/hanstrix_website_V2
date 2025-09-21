"use client";

import { useEffect } from "react";

// Web Vitals monitoring for performance optimization
export const WebVitalsReporter = () => {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV === "production") {
      import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        // Core Web Vitals
        onCLS((metric) => {
          console.log("CLS:", metric);
        });

        onINP((metric) => {
          console.log("INP:", metric);
        });

        onFCP((metric) => {
          console.log("FCP:", metric);
        });

        onLCP((metric) => {
          console.log("LCP:", metric);
        });

        onTTFB((metric) => {
          console.log("TTFB:", metric);
        });
      });
    }
  }, []);

  return null;
};

// Device detection for optimizations
export const useDeviceOptimization = () => {
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const isLowEndDevice = () => {
      // Detect low-end devices
      const memory = (navigator as any).deviceMemory;
      const connection = (navigator as any).connection;

      return (
        (memory && memory < 4) ||
        (connection &&
          (connection.effectiveType === "slow-2g" ||
            connection.effectiveType === "2g"))
      );
    };

    // Apply device-specific optimizations
    if (isMobile) {
      document.documentElement.classList.add("mobile-device");
    }

    if (isLowEndDevice()) {
      document.documentElement.classList.add("low-end-device");
      // Disable expensive animations on low-end devices
      document.documentElement.style.setProperty("--animation-duration", "0ms");
    }

    // Optimize for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduced-motion");
    }
  }, []);
};

export default WebVitalsReporter;
