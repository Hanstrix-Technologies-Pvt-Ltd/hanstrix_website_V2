import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hanstrix.com";

  // Static pages
  const staticPages = ["", "/contact", "/privacy", "/terms"];

  // Service pages
  const servicePages = [
    "/services/ai-ml",
    "/services/erp-software",
    "/services/digital-marketing",
    "/services/website-development",
  ];

  const currentDate = new Date();

  const staticSitemapEntries: MetadataRoute.Sitemap = staticPages.map(
    (page) => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : 0.8,
    })
  );

  const serviceSitemapEntries: MetadataRoute.Sitemap = servicePages.map(
    (page) => ({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  return [...staticSitemapEntries, ...serviceSitemapEntries];
}
