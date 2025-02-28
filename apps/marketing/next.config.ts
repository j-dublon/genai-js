import type { NextConfig } from "next";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
};

export default withMicrofrontends(nextConfig);
