import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

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

const nextConfig: NextConfig = {
  allowedDevOrigins:
    process.env.NODE_ENV === "development" ? getAllowedDevOrigins() : undefined,
};

export default nextConfig;
