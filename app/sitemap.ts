import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/rooms",
    "/experiences",
    siteConfig.features.showRegionalTrails ? "/experiences/theth-valbona-hiking-guide" : null,
    "/gallery",
    "/contact",
  ].filter((route): route is string => typeof route === "string");

  return routes.map((route) => ({
    url: getSiteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
