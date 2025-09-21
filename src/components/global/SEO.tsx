import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  twitter?: {
    card?: "summary_large_image" | "summary" | "player" | "app";
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  structuredData?: object;
  noindex?: boolean;
}

export const generateSEOMetadata = ({
  title = "Hanstrix Technologies - Leading Digital Transformation Solutions",
  description = "Expert AI & ML, ERP Software, Website Development & Digital Marketing services. Transform your business with cutting-edge technology solutions from Hanstrix Technologies.",
  canonical,
  openGraph,
  twitter,
  noindex = false,
}: SEOProps): Metadata => {
  const siteUrl = "https://hanstrixtechnologies.com";
  const defaultImage = `${siteUrl}/images/og-image.png`;

  return {
    title,
    description,
    ...(canonical && { alternates: { canonical } }),
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Hanstrix Technologies",
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: openGraph?.url || siteUrl,
      images: [
        {
          url: openGraph?.image || defaultImage,
          width: 1200,
          height: 630,
          alt: openGraph?.title || title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: twitter?.card || "summary_large_image",
      site: twitter?.site || "@hanstrixtechnologies",
      creator: twitter?.creator || "@hanstrixtechnologies",
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: [twitter?.image || defaultImage],
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [{ rel: "manifest", url: "/site.webmanifest" }],
    },
    verification: {
      google: "your-google-site-verification-code",
    },
    other: {
      "theme-color": "#5227FF",
      "msapplication-TileColor": "#5227FF",
    },
  };
};

export const StructuredData: React.FC<{ data: object }> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hanstrix Technologies",
  url: "https://hanstrixtechnologies.com",
  logo: "https://hanstrixtechnologies.com/images/final_logo.png",
  description:
    "Leading Digital Transformation Solutions provider specializing in AI & ML, ERP Software, Website Development, and Digital Marketing services.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXX-XXXX-XXX",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/hanstrix-technologies",
    "https://twitter.com/hanstrixtechnologies",
  ],
  foundingDate: "2020",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "50",
  },
  serviceArea: {
    "@type": "Country",
    name: "India",
  },
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hanstrix Technologies",
  url: "https://hanstrixtechnologies.com",
  description:
    "Expert AI & ML, ERP Software, Website Development & Digital Marketing services.",
  publisher: {
    "@type": "Organization",
    name: "Hanstrix Technologies",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://hanstrixtechnologies.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Service Schemas
export const serviceSchemas = {
  aiml: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI & Machine Learning Solutions",
    description:
      "Comprehensive AI and ML solutions including Generative AI, NLP, Computer Vision, and Predictive Analytics.",
    provider: {
      "@type": "Organization",
      name: "Hanstrix Technologies",
    },
    serviceType: "Technology Consulting",
    category: "Artificial Intelligence",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  },
  erp: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ERP Software Solutions",
    description:
      "Custom ERP software development, implementation, and integration services to streamline business operations.",
    provider: {
      "@type": "Organization",
      name: "Hanstrix Technologies",
    },
    serviceType: "Software Development",
    category: "Enterprise Resource Planning",
  },
  webdev: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Development",
    description:
      "Modern, responsive website development using React, Next.js, and cutting-edge web technologies.",
    provider: {
      "@type": "Organization",
      name: "Hanstrix Technologies",
    },
    serviceType: "Web Development",
    category: "Website Design",
  },
  digital: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing",
    description:
      "Data-driven digital marketing services including SEO, PPC, Social Media Marketing, and Content Marketing.",
    provider: {
      "@type": "Organization",
      name: "Hanstrix Technologies",
    },
    serviceType: "Marketing",
    category: "Digital Marketing",
  },
};
