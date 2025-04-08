import { NextResponse } from "next/server";

export async function GET() {
  // Stub data for Trustpilot; in production real data will be fetched from the route living in marketing app.
  const stubData = {
    trustScore: 4.5,
    numberOfReviews: 4065,
  };

  return NextResponse.json({ success: true, data: stubData });
}
