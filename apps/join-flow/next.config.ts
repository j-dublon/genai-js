import type { NextConfig } from "next";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

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
};

export default withMicrofrontends(nextConfig);
