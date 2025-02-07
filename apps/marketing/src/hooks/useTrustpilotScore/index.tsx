import { useState, useEffect } from "react";

interface TrustpilotData {
  trustScore: number;
  numberOfReviews: number;
}

export const useTrustpilotScore = () => {
  const [data, setData] = useState<TrustpilotData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrustpilotData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/trustpilot", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
          mode: "same-origin",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Trustpilot data");
        }

        const { data } = await response.json();
        setData({
          trustScore: data.trustScore,
          numberOfReviews: data.numberOfReviews,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching Trustpilot data:", err.message);
        } else {
          setError("An unknown error occurred.");
          console.error(
            "An unknown error occurred while fetching Trustpilot data",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrustpilotData();
  }, []);

  return { data, loading, error };
};
