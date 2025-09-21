import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import AIChatbotGlobal from "@/components/global/AIChatbotGlobal";
import ToasterClient from "@/components/global/ToasterClient";
import { SmoothScrollProvider } from "@/components/global/ParallaxWrapper";
import {
  StructuredData,
  organizationSchema,
  websiteSchema,
} from "@/components/global/SEO";
import PerformanceMonitor, {
  PerformanceBudgetMonitor,
} from "@/components/global/PerformanceMonitor";
import WebVitalsReporter from "@/components/global/WebVitalsReporter";
import { AdvancedMouseSpotlight } from "@/components/global/MouseSpotlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://hanstrixtechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hanstrix Technologies - Leading Digital Transformation Solutions",
    template: "%s | Hanstrix Technologies",
  },
  description:
    "Expert AI & ML, ERP Software, Website Development & Digital Marketing services. Transform your business with cutting-edge technology solutions from Hanstrix Technologies.",
  keywords: [
    "AI",
    "Machine Learning",
    "ERP Software",
    "Website Development",
    "Digital Marketing",
    "Technology Solutions",
    "Business Transformation",
  ],
  authors: [{ name: "Hanstrix Technologies" }],
  creator: "Hanstrix Technologies",
  publisher: "Hanstrix Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hanstrix Technologies",
    title: "Hanstrix Technologies - Leading Digital Transformation Solutions",
    description:
      "Expert AI & ML, ERP Software, Website Development & Digital Marketing services.",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Hanstrix Technologies - Digital Transformation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanstrix Technologies - Leading Digital Transformation Solutions",
    description:
      "Expert AI & ML, ERP Software, Website Development & Digital Marketing services.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <meta name="theme-color" content="#5227FF" />
        <meta name="msapplication-TileColor" content="#5227FF" />

        {/* Favicon and Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Hanstrix" />
        <link rel="apple-touch-startup-image" href="/images/Hero_BG.jpg" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Critical resource hints */}
        <link
          rel="preload"
          href="/images/final_logo.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/Hero_BG.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <div className="relative w-full min-h-screen flex flex-col bg-[#030303] text-white">
            <Navbar />
            <main className="stack-below-nav no-anchoring flex-grow relative z-10">
              {children}
            </main>
            <Footer />
            <AIChatbotGlobal />
            <ToasterClient />
            <PerformanceMonitor />
            <PerformanceBudgetMonitor />
            <WebVitalsReporter />
            <AdvancedMouseSpotlight
              size={300}
              opacity={0.4}
              blur={40}
              color="#4ade80"
            />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
