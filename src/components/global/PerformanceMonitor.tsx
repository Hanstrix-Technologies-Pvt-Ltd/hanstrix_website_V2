"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Performance Monitoring Component
 * Tracks Core Web Vitals and other performance metrics
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Import web vitals dynamically to avoid SSR issues
    const loadWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import(
          "web-vitals"
        );

        // Core Web Vitals tracking
        const sendToAnalytics = (metric: any) => {
          // Log to console in development
          if (process.env.NODE_ENV === "development") {
            console.log("📊 Web Vital:", {
              name: metric.name,
              value: metric.value,
              rating: metric.rating,
              delta: metric.delta,
            });
          }

          // Send to Google Analytics if available
          if (window.gtag) {
            window.gtag("event", metric.name, {
              event_category: "Web Vitals",
              event_label: metric.id,
              value: Math.round(
                metric.name === "CLS" ? metric.value * 1000 : metric.value
              ),
              non_interaction: true,
            });
          }

          // Send to your analytics service
          // Replace with your analytics endpoint
          if (process.env.NODE_ENV === "production") {
            fetch("/api/analytics/vitals", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: metric.name,
                value: metric.value,
                rating: metric.rating,
                url: window.location.href,
                timestamp: Date.now(),
              }),
            }).catch(console.error);
          }
        };

        // Track all Core Web Vitals
        onCLS(sendToAnalytics);
        onINP(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      } catch (error) {
        console.warn("Failed to load web-vitals:", error);
      }
    };

    loadWebVitals();
  }, []);

  // Monitor resource loading performance
  useEffect(() => {
    if (typeof window === "undefined") return;

    const monitorResources = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === "navigation") {
              const navEntry = entry as PerformanceNavigationTiming;

              if (process.env.NODE_ENV === "development") {
                console.log("🚀 Navigation Performance:", {
                  domContentLoaded:
                    navEntry.domContentLoadedEventEnd - navEntry.startTime,
                  loadComplete: navEntry.loadEventEnd - navEntry.startTime,
                  firstPaint:
                    performance.getEntriesByName("first-paint")[0]?.startTime ||
                    0,
                  firstContentfulPaint:
                    performance.getEntriesByName("first-contentful-paint")[0]
                      ?.startTime || 0,
                });
              }
            }

            if (entry.entryType === "resource") {
              const resourceEntry = entry as PerformanceResourceTiming;

              // Monitor slow resources
              if (resourceEntry.duration > 1000) {
                console.warn("🐌 Slow resource detected:", {
                  name: resourceEntry.name,
                  duration: resourceEntry.duration,
                  size: resourceEntry.transferSize,
                });
              }
            }
          }
        });

        observer.observe({ entryTypes: ["navigation", "resource"] });

        return () => observer.disconnect();
      } catch (error) {
        console.warn("Performance Observer not supported:", error);
      }
    };

    const cleanup = monitorResources();
    return cleanup;
  }, []);

  // Monitor memory usage (if available)
  useEffect(() => {
    if (typeof window === "undefined" || !("memory" in performance)) return;

    const monitorMemory = () => {
      const memory = (performance as any).memory;

      if (process.env.NODE_ENV === "development") {
        console.log("💾 Memory Usage:", {
          used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
          total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
          limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
        });
      }

      // Warn if memory usage is high
      const usagePercent =
        (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercent > 80) {
        console.warn(
          "⚠️ High memory usage detected:",
          `${usagePercent.toFixed(1)}%`
        );
      }
    };

    const interval = setInterval(monitorMemory, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * Performance Budget Monitor
 * Checks if the page exceeds performance budgets
 */
export function PerformanceBudgetMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkBudgets = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          let totalJSSize = 0;
          let totalCSSSize = 0;
          let totalImageSize = 0;

          entries.forEach((entry) => {
            const resourceEntry = entry as PerformanceResourceTiming;
            const name = resourceEntry.name.toLowerCase();

            if (name.includes(".js")) {
              totalJSSize += resourceEntry.transferSize || 0;
            } else if (name.includes(".css")) {
              totalCSSSize += resourceEntry.transferSize || 0;
            } else if (name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
              totalImageSize += resourceEntry.transferSize || 0;
            }
          });

          // Check against budgets (in bytes)
          const budgets = {
            javascript: 300 * 1024, // 300KB
            css: 50 * 1024, // 50KB
            images: 400 * 1024, // 400KB
          };

          if (totalJSSize > budgets.javascript) {
            console.warn("📊 JavaScript budget exceeded:", {
              actual: `${Math.round(totalJSSize / 1024)}KB`,
              budget: `${budgets.javascript / 1024}KB`,
            });
          }

          if (totalCSSSize > budgets.css) {
            console.warn("📊 CSS budget exceeded:", {
              actual: `${Math.round(totalCSSSize / 1024)}KB`,
              budget: `${budgets.css / 1024}KB`,
            });
          }

          if (totalImageSize > budgets.images) {
            console.warn("📊 Image budget exceeded:", {
              actual: `${Math.round(totalImageSize / 1024)}KB`,
              budget: `${budgets.images / 1024}KB`,
            });
          }
        });

        observer.observe({ entryTypes: ["resource"] });
        return () => observer.disconnect();
      } catch (error) {
        console.warn("Performance Observer not supported:", error);
      }
    };

    const cleanup = checkBudgets();
    return cleanup;
  }, []);

  return null;
}
