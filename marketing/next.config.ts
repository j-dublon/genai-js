import type { NextConfig } from "next";
const { JOIN_FLOW_URL } = process.env;

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/join-flow",
        destination: `${JOIN_FLOW_URL}/join-flow`,
      },
    ];
  },
};

export default nextConfig;
