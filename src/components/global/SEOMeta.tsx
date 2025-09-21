"use client";

import Head from "next/head";

interface SEOMetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "service";
  keywords?: string;
  schema?: any;
  noIndex?: boolean;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = "/images/Hero_BG.jpg",
  ogType = "website",
  keywords,
  schema,
  noIndex = false,
}) => {
  const fullTitle = title === "Hanstrix" ? title : `${title} | Hanstrix`;
  const baseUrl = "https://hanstrix.com";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Hanstrix Technologies" />
      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hanstrix" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@hanstrix" />
      <meta name="twitter:creator" content="@hanstrix" />

      {/* Additional Meta Tags */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="theme-color" content="#5227FF" />
      <meta name="msapplication-TileColor" content="#5227FF" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Hanstrix" />

      {/* Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hanstrix Technologies",
  alternateName: "Hanstrix",
  url: "https://hanstrix.com",
  logo: "https://hanstrix.com/images/final_logo.png",
  description:
    "Leading provider of AI/ML solutions, ERP software, digital marketing, and web development services.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-0123",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  sameAs: [
    "https://linkedin.com/company/hanstrix",
    "https://twitter.com/hanstrix",
  ],
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hanstrix",
  url: "https://hanstrix.com",
  description:
    "Transform your business with cutting-edge AI/ML, ERP, digital marketing, and web development solutions.",
  publisher: organizationSchema,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hanstrix.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Service Schemas
export const aiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI & Machine Learning Solutions",
  description:
    "Custom AI/ML development, chatbots, automation, and intelligent business solutions.",
  provider: organizationSchema,
  url: "https://hanstrix.com/services/ai-ml",
  serviceType: "Technology Consulting",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI/ML Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom AI Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbots",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Automation",
        },
      },
    ],
  },
};

export const erpServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ERP Software Solutions",
  description:
    "Custom ERP development, implementation, and integration for streamlined business operations.",
  provider: organizationSchema,
  url: "https://hanstrix.com/services/erp-software",
  serviceType: "Software Development",
};

export const digitalMarketingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Solutions",
  description:
    "Comprehensive digital marketing strategies including SEO, social media, and online advertising.",
  provider: organizationSchema,
  url: "https://hanstrix.com/services/digital-marketing",
  serviceType: "Marketing",
};

export const webDevServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development",
  description:
    "Custom website development, e-commerce solutions, and web applications.",
  provider: organizationSchema,
  url: "https://hanstrix.com/services/website-development",
  serviceType: "Web Development",
};
