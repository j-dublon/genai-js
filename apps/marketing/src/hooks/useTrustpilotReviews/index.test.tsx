import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, MockedFunction, vi } from "vitest";

import { useTrustpilotReviews } from ".";

const mockedFetch = vi.fn() as MockedFunction<typeof fetch>;

global.fetch = mockedFetch;

describe("useTrustpilotReviews", () => {
  const mockReviewIds = ["review1", "review2"];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return reviews data when the API call is successful", async () => {
    const mockResponse = {
      data: [
        {
          id: "review1",
          title: "Great Service",
          reviewText: "Amazing experience!",
          author: "John Doe",
          starRating: 5,
        },
        {
          id: "review2",
          title: "Excellent",
          reviewText: "Very happy with the service",
          author: "Jane Smith",
          starRating: 4,
        },
      ],
    };

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const { result } = renderHook(() => useTrustpilotReviews(mockReviewIds));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse.data);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(mockedFetch).toHaveBeenCalledWith(
      `/api/trustpilot/reviews?reviewIds=${mockReviewIds.join(",")}`,
      expect.any(Object),
    );
  });

  it("should return null data and set an error when the API call fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockedFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const { result } = renderHook(() => useTrustpilotReviews(mockReviewIds));

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Failed to fetch Trustpilot reviews");
    });

    consoleErrorSpy.mockRestore();
  });

  it("should make a new API call when reviewIds change", async () => {
    const mockResponse = { data: [] };
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const { rerender } = renderHook(
      ({ reviewIds }) => useTrustpilotReviews(reviewIds),
      {
        initialProps: { reviewIds: ["review1"] },
      },
    );

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith(
        "/api/trustpilot/reviews?reviewIds=review1",
        expect.any(Object),
      );
    });

    rerender({ reviewIds: ["review2"] });

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith(
        "/api/trustpilot/reviews?reviewIds=review2",
        expect.any(Object),
      );
    });

    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });
});
