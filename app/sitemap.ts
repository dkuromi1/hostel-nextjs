import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/rooms",
    "/experiences",
    "/experiences/theth-valbona-hiking-guide",
    "/gallery",
    "/contact",
  ];

  return routes.map((route) => ({
    url: getSiteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
