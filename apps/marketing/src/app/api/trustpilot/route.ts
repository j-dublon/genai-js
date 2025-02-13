import { NextResponse } from "next/server";

import logger from "@/lib/logger";

const hourAsSeconds = 3600;
const TRUSTPILOT_API_KEY = process.env.TRUSTPILOT_API_KEY;

export async function GET() {
  if (!TRUSTPILOT_API_KEY) {
    const errorMessage =
      "TRUSTPILOT_API_KEY is not defined in environment variables.";
    logger.error(errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }

  const url = `https://api.trustpilot.com/v1/business-units/find?name=cuckoo.co&apikey=${TRUSTPILOT_API_KEY}`;

  try {
    logger.info(`Fetching Trustpilot data from URL: ${url}`);
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: hourAsSeconds }, // Cache response for an hour
    });

    if (response.ok) {
      const data = await response.json();
      const clientData = {
        trustScore: data?.score?.trustScore,
        numberOfReviews: data?.numberOfReviews?.total,
      };

      logger.info("Successfully fetched Trustpilot data", clientData);
      return NextResponse.json({ success: true, data: clientData });
    } else {
      logger.error("Failed to fetch Trustpilot data", {
        url,
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { success: false, error: "Failed to fetch Trustpilot data" },
        { status: 500 },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error fetching Trustpilot data", { error: error.message });
    } else {
      logger.error("An unexpected non-error was thrown", { error });
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
