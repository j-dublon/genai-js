import { renderHook, waitFor } from "@testing-library/react";
import { useTrustpilotScore } from ".";

global.fetch = jest.fn();

describe("useTrustpilotScore", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return trustScore and numberOfReviews when the API call is successful", async () => {
    const mockResponse = {
      data: {
        trustScore: 4.5,
        numberOfReviews: 150,
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useTrustpilotScore());

    await waitFor(() => {
      expect(result.current.data).toEqual({
        trustScore: 4.5,
        numberOfReviews: 150,
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should return null data and set an error when the API call fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useTrustpilotScore());

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Failed to fetch Trustpilot data");
    });

    consoleErrorSpy.mockRestore();
  });
});
