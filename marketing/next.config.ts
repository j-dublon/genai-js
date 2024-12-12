import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/join-flow",
        destination: `https://join-flow-multizone-demo.vercel.app/join-flow`, //change this to the right url !!
      },
    ];
  },
};

export default nextConfig;
