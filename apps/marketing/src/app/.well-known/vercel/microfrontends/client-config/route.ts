import { wellKnownNextjsClientConfigAppRoute } from "@vercel/microfrontends/next/endpoints";

export async function GET(): Promise<Response> {
  return wellKnownNextjsClientConfigAppRoute({});
}
