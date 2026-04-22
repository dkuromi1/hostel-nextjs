import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";
import withSerwistInit from "@serwist/next";

const isDev = process.env.NODE_ENV === "development";

function getAllowedDevOrigins() {
  const hosts = new Set(["localhost", "127.0.0.1"]);

  for (const networkInterface of Object.values(networkInterfaces())) {
    for (const address of networkInterface ?? []) {
      if (address.family === "IPv4" && !address.internal) {
        hosts.add(address.address);
      }
    }
  }

  return Array.from(hosts);
}

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: isDev,
});

const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {},
  allowedDevOrigins: isDev ? getAllowedDevOrigins() : undefined,
  images: isNetlify
    ? {
      loader: "custom",
      loaderFile: "./lib/netlify-image-loader.ts",
    }
    : undefined,
  compiler: {
    removeConsole: !isDev,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  poweredByHeader: false,
  compress: true,
};

export default withSerwist(nextConfig);
