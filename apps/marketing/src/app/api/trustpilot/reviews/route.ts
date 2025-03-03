import { NextRequest, NextResponse } from "next/server";

import logger from "@/lib/logger";

const oneDayAsSeconds = 86400;
const TRUSTPILOT_API_KEY = process.env.TRUSTPILOT_API_KEY;

interface Review {
  id: string;
  title: string;
  reviewText: string;
  author: string;
  starRating: number;
}

// object to cache filtered reviews on server and avoid repeatedly re-filtering the same reviews
const reviewsCache = new Map<
  string,
  { reviews: Review[]; timestamp: number }
>();

export async function GET(req: NextRequest) {
  const cacheId = req.nextUrl.searchParams.getAll("reviewIds")[0] || "";

  if (!cacheId) {
    return NextResponse.json(
      { success: false, error: "No review IDs provided." },
      { status: 400 },
    );
  }

  const targetReviewIds = cacheId.split(",");

  // Check if cache exists and validity
  const cacheEntry = reviewsCache.get(cacheId);

  if (cacheEntry) {
    const currentTime = Date.now();
    const cacheAge = currentTime - cacheEntry.timestamp;

    // If cached data is less than 24 hours old, return it
    if (cacheAge < oneDayAsSeconds * 1000) {
      logger.info("Returned cached Trustpilot reviews", cacheEntry.reviews);
      return NextResponse.json({
        success: true,
        data: cacheEntry.reviews,
      });
    }
  }

  // If cache does not exist or is expired, fetch new data from Trustpilot
  if (!TRUSTPILOT_API_KEY) {
    const errorMessage =
      "TRUSTPILOT_API_KEY is not defined in environment variables.";
    logger.error(errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }

  const fetchReview = async (reviewId: string) => {
    const trustpilotUrl = `https://api.trustpilot.com/v1/reviews/${reviewId}?apikey=${TRUSTPILOT_API_KEY}`;

    try {
      const response = await fetch(trustpilotUrl, {
        method: "GET",
        next: { revalidate: oneDayAsSeconds },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch review with ID: ${reviewId}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      logger.error(`Error fetching review with ID: ${reviewId}`, error);
      return null;
    }
  };

  try {
    logger.info(`Fetching Trustpilot reviews`);

    // Fetch all reviews in parallel
    const reviewsData = await Promise.all(
      targetReviewIds.map((reviewId) => fetchReview(reviewId)),
    );

    // Filter out any null or invalid results and map the fetched reviews to only store the data we need
    const reviews = reviewsData
      .filter((review) => review !== null)
      .map((data) => ({
        id: data.id,
        title: data.title,
        author: data.consumer.displayName,
        reviewText: data.text,
        starRating: data.stars,
      }));

    if (reviews.length === 0) {
      return NextResponse.json(
        { success: false, error: "No reviews found." },
        { status: 404 },
      );
    }

    // Cache the reviews data for 24 hours
    reviewsCache.set(cacheId, {
      reviews,
      timestamp: Date.now(),
    });

    logger.info("Successfully fetched Trustpilot reviews", reviews);

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error fetching Trustpilot reviews", {
        error: error.message,
      });
    } else {
      logger.error("An unexpected non-error was thrown", { error });
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
