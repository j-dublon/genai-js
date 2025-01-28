import type { NextConfig } from "next";
const { JOIN_FLOW_URL } = process.env;
console.log("JOIN_FLOW_URL:", process.env.JOIN_FLOW_URL);
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/join-flow",
        destination: `${JOIN_FLOW_URL}/join-flow`,
      },
      {
        source: "/join-flow/:path+",
        destination: `${JOIN_FLOW_URL}/join-flow/:path+`,
      },
      {
        source: "/join-flow-static/_next/:path+",
        destination: `${JOIN_FLOW_URL}/join-flow-static/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
