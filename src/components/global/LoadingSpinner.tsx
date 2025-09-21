"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "#5227FF",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-ping ${sizeClasses[size]} ${className}`}
      style={{ borderColor: `${color} transparent ${color} ${color}` }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]/90 backdrop-blur-sm">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white/80 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export const SectionLoader: React.FC<{ height?: string }> = ({
  height = "h-64",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${height} bg-transparent`}
    >
      <LoadingSpinner size="md" />
    </div>
  );
};

export default LoadingSpinner;
