import { useEffect, useState } from "react";

interface TrustpilotReview {
  id: string;
  title: string;
  reviewText: string;
  author: string;
  starRating: number;
}

export const useTrustpilotReviews = (reviewIds: string[]) => {
  const [data, setData] = useState<TrustpilotReview[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrustpilotReviews = async (reviewIds: string[]) => {
      setLoading(true);
      setError(null);

      // Join reviewIds as a comma-separated list
      const queryParam = reviewIds.join(",");

      try {
        const response = await fetch(
          `/api/trustpilot/reviews?reviewIds=${queryParam}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
            mode: "same-origin",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Trustpilot reviews");
        }

        const { data } = await response.json();
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching Trustpilot reviews:", err.message);
        } else {
          setError("An unknown error occurred.");
          console.error(
            "An unknown error occurred while fetching Trustpilot reviews",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrustpilotReviews(reviewIds);
  }, [reviewIds]);

  return { data, loading, error };
};
