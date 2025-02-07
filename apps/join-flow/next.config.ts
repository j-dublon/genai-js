import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: "/join-flow",
  serverExternalPackages: ["pino", "pino-pretty"],
};

export default nextConfig;
