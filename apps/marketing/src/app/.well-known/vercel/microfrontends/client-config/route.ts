// This route exists to prevent 404 errors during e2e tests
// when testing frontends in isolation
export async function GET(): Promise<Response> {
  return new Response(JSON.stringify({}));
}
