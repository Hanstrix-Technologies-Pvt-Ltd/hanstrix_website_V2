"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useDeviceType, useAdaptiveLoading } from "@/lib/performance";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized Image Component
 * Uses adaptive loading based on device capabilities and connection speed
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  fill = false,
  sizes,
  quality,
  placeholder = "empty",
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();
  const { shouldLazyLoad, imageQuality } = useAdaptiveLoading();

  // Determine optimal quality based on device and connection
  const adaptiveQuality = quality || imageQuality;

  // Generate responsive sizes if not provided
  const responsiveSizes =
    sizes || deviceType === "mobile"
      ? "(max-width: 768px) 100vw, 50vw"
      : "(max-width: 1200px) 50vw, 33vw";

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Intersection Observer for lazy loading on slower connections
  useEffect(() => {
    if (!shouldLazyLoad || priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a slight delay for very slow connections
            setTimeout(() => {
              setIsLoaded(true);
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [shouldLazyLoad, priority]);

  // Render error state
  if (hasError) {
    return (
      <div
        className={`bg-gray-800 rounded flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded" />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={adaptiveQuality}
        sizes={responsiveSizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
        // Performance optimizations
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Fade-in effect */}
      <div
        className={`
          absolute inset-0 bg-gray-900 transition-opacity duration-500 pointer-events-none
          ${isLoaded ? "opacity-0" : "opacity-20"}
        `}
      />
    </div>
  );
}

/**
 * Optimized Background Image Component
 * For hero sections and large background images
 */
export function OptimizedBackgroundImage({
  src,
  alt,
  priority = false,
  className = "",
  children,
  quality = 85,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
  quality?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const deviceType = useDeviceType();
  const { imageQuality } = useAdaptiveLoading();

  // Use lower quality for mobile devices
  const adaptiveQuality =
    deviceType === "mobile" ? Math.min(quality, imageQuality) : quality;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={adaptiveQuality}
        onLoad={() => setIsLoaded(true)}
        className={`
          object-cover object-center transition-opacity duration-700
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        sizes="100vw"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
    </div>
  );
}

/**
 * Responsive Image Grid Component
 * Optimized for gallery layouts
 */
export function OptimizedImageGrid({
  images,
  columns = 3,
}: {
  images: Array<{
    src: string;
    alt: string;
    aspectRatio?: number;
  }>;
  columns?: number;
}) {
  const deviceType = useDeviceType();

  // Adjust columns based on device
  const responsiveColumns =
    deviceType === "mobile" ? 1 : deviceType === "tablet" ? 2 : columns;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
      }}
    >
      {images.map((image, index) => (
        <OptimizedImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={400}
          height={Math.round(400 / (image.aspectRatio || 1))}
          className="rounded-lg"
          sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${
            100 / responsiveColumns
          }vw`}
        />
      ))}
    </div>
  );
}
