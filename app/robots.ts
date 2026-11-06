import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.easygohospitality.in/sitemap.xml",
    host: "https://www.easygohospitality.in",
  };
}

