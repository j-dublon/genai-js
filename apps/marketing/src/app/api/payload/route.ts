import { payloadRouteHandler } from "./payloadRouteHandler";

export async function GET() {
  return payloadRouteHandler();
}
