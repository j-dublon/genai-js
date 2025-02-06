export const getTrustpilotScore = async () => {
  const response = await fetch("/api/trustpilot/fetch-trust-score", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
    mode: "same-origin",
  });

  if (response.ok) {
    const { data } = await response.json();
    return {
      trustScore: data.trustScore,
      numberOfReviews: data.numberOfReviews,
    };
  } else {
    throw new Error("Failed to fetch Trustpilot data");
  }
};
