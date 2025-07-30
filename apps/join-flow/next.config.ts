import { withMicrofrontends } from "@vercel/microfrontends/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  async rewrites() {
    return [
      {
        source: "/join-flow/a/:code",
        destination: "/join-flow/referral/affiliates/:code",
      },
      {
        source: "/join-flow/:path(r|refer)/:code",
        destination: "/join-flow/referral/customer/:code",
      },
    ];
  },
  images: {
    remotePatterns: [
      new URL("https://squid-static.cuckoohatchery-stage.com/**"),
      new URL("https://squid-static.cuckoohatchery.com/**"),
      new URL("http://localhost:3000/**"),
    ],
  },
};

export default withMicrofrontends(nextConfig);
