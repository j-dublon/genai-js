import { runMicrofrontendsMiddleware } from "@vercel/microfrontends/next/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await runMicrofrontendsMiddleware({
    request: request,
    flagValues: {
      homepage: async () => false,
    },
  });
  if (response) {
    return response;
  }
}
