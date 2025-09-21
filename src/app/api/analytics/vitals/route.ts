import { NextRequest, NextResponse } from "next/server";

interface WebVitalData {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  url: string;
  timestamp: number;
}

/**
 * API endpoint for collecting Core Web Vitals data
 * This can be integrated with your analytics service
 */
export async function POST(request: NextRequest) {
  try {
    const vitals: WebVitalData = await request.json();

    // Validate the data
    if (!vitals.name || typeof vitals.value !== "number" || !vitals.url) {
      return NextResponse.json(
        { error: "Invalid vitals data" },
        { status: 400 }
      );
    }

    // Log vitals for monitoring (in production, send to your analytics service)
    console.log("📊 Core Web Vitals received:", {
      metric: vitals.name,
      value: vitals.value,
      rating: vitals.rating,
      page: vitals.url,
      timestamp: new Date(vitals.timestamp).toISOString(),
    });

    // Here you can integrate with your analytics service
    // Examples:
    // - Google Analytics 4
    // - Mixpanel
    // - PostHog
    // - Custom database

    // Example: Send to Google Analytics (if you have gtag configured)
    /*
    if (process.env.GA_MEASUREMENT_ID) {
      const gaResponse = await fetch('https://www.google-analytics.com/mp/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: 'web-vitals-client',
          events: [{
            name: 'web_vitals',
            parameters: {
              metric_name: vitals.name,
              metric_value: vitals.value,
              metric_rating: vitals.rating,
              page_location: vitals.url,
            },
          }],
        }),
      });
    }
    */

    // Example: Store in database
    /*
    await db.webVitals.create({
      data: {
        name: vitals.name,
        value: vitals.value,
        rating: vitals.rating,
        url: vitals.url,
        timestamp: new Date(vitals.timestamp),
        userAgent: request.headers.get('user-agent') || 'unknown',
        ip: request.ip || 'unknown',
      },
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing web vitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve aggregated vitals data
 * Useful for creating performance dashboards
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const _timeframe = searchParams.get("timeframe") || "7d";
    const _page = searchParams.get("page");

    // Mock data - replace with actual database queries
    // Note: _timeframe and _page can be used for filtering in real implementation
    const mockData = {
      summary: {
        lcp: { value: 1200, rating: "good", samples: 150 },
        fid: { value: 45, rating: "good", samples: 140 },
        cls: { value: 0.05, rating: "good", samples: 155 },
        fcp: { value: 800, rating: "good", samples: 145 },
        ttfb: { value: 200, rating: "good", samples: 160 },
      },
      trends: [
        { date: "2024-01-01", lcp: 1150, fid: 40, cls: 0.04 },
        { date: "2024-01-02", lcp: 1200, fid: 45, cls: 0.05 },
        // Add more trend data
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error("Error retrieving vitals data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
