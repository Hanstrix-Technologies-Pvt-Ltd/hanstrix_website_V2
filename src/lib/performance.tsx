"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image, { ImageProps } from "next/image";

// Lazy loading hook for performance
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Performance optimized image component
interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  quality = 85,
  ...props
}) => {
  const { ref, isVisible } = useLazyLoad(0.1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {(isVisible || priority) && (
        <Image
          src={src}
          alt={alt}
          quality={quality}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      )}
      {!isLoaded && (isVisible || priority) && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  );
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === "undefined") return;

  // Preload critical images
  const criticalImages = ["/images/final_logo.png", "/images/Hero_BG.jpg"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts (if using external fonts)
  const criticalFonts: string[] = [
    // Add any critical font URLs here
  ];

  criticalFonts.forEach((href: string) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";
    link.href = href;
    document.head.appendChild(link);
  });
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Type assertion for performance entries with value property
        const performanceEntry = entry as PerformanceEntry & { value?: number };
        console.log(`${entry.name}: ${performanceEntry.value || "N/A"}`);

        // You can send this data to analytics
        // Example: sendToAnalytics(entry.name, performanceEntry.value);
      });
    });

    try {
      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
      });
    } catch (_e) {
      // Fallback for browsers that don't support these metrics
      console.warn("Performance monitoring not supported");
    }

    return () => observer.disconnect();
  }, []);
};

// Debounce hook for performance
export const useDebounce = function <T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for scroll events
export const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: T) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );
};

// Device type detection for adaptive performance
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  return deviceType;
};

// Connection quality detection
export const useConnectionQuality = () => {
  const [connectionQuality, setConnectionQuality] = useState<"fast" | "slow">(
    "fast"
  );

  useEffect(() => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;

      const updateConnectionQuality = () => {
        const effectiveType = connection.effectiveType;
        setConnectionQuality(effectiveType === "4g" ? "fast" : "slow");
      };

      updateConnectionQuality();
      connection.addEventListener("change", updateConnectionQuality);

      return () => {
        connection.removeEventListener("change", updateConnectionQuality);
      };
    }
  }, []);

  return connectionQuality;
};

// Adaptive loading based on device and connection
export const useAdaptiveLoading = () => {
  const deviceType = useDeviceType();
  const connectionQuality = useConnectionQuality();

  const shouldReduceAnimations =
    deviceType === "mobile" || connectionQuality === "slow";
  const shouldReduceImageQuality = connectionQuality === "slow";
  const shouldLazyLoad = deviceType === "mobile";

  return {
    shouldReduceAnimations,
    shouldReduceImageQuality,
    shouldLazyLoad,
    imageQuality: shouldReduceImageQuality ? 60 : 85,
    animationDuration: shouldReduceAnimations ? 0.2 : 0.4,
  };
};
