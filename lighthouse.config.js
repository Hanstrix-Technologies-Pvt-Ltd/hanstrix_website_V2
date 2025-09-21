/**
 * Lighthouse Configuration for Hanstrix Website
 * Optimized for performance, accessibility, SEO, and best practices
 */

module.exports = {
  ci: {
    collect: {
      // URLs to test (add your deployed URLs here)
      url: [
        "http://localhost:3000",
        "http://localhost:3000/services/ai-ml",
        "http://localhost:3000/services/website-development",
        "http://localhost:3000/services/digital-marketing",
        "http://localhost:3000/services/erp-software",
        "http://localhost:3000/contact",
      ],
      startServerCommand: "npm run build && npm start",
      startServerReadyPattern: "ready on",
      settings: {
        // Desktop and mobile testing
        preset: "desktop",
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
        // Performance budget
        budgets: [
          {
            path: "/*",
            resourceSizes: [
              { resourceType: "script", budget: 300 },
              { resourceType: "image", budget: 400 },
              { resourceType: "stylesheet", budget: 50 },
              { resourceType: "font", budget: 100 },
            ],
            resourceCounts: [{ resourceType: "third-party", budget: 10 }],
          },
        ],
      },
    },
    assert: {
      assertions: {
        // Performance thresholds
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        // Core Web Vitals
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "speed-index": ["warn", { maxNumericValue: 3000 }],
        // Additional metrics
        interactive: ["warn", { maxNumericValue: 3000 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
