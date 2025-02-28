import type { NextRequest } from "next/server";
import { runMicrofrontendsMiddleware } from "@vercel/microfrontends/next/middleware";

export async function middleware(request: NextRequest) {
  const response = await runMicrofrontendsMiddleware({
    request: request,
    fromApp: "marketing",
  });
  if (response) {
    return response;
  }
}
