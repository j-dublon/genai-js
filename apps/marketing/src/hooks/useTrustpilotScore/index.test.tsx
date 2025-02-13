import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { useTrustpilotScore } from ".";

const mockedFetch = vi.fn() as unknown as jest.MockedFunction<typeof fetch>;
global.fetch = mockedFetch;

describe("useTrustpilotScore", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return trustScore and numberOfReviews when the API call is successful", async () => {
    const mockResponse = {
      data: {
        trustScore: 4.5,
        numberOfReviews: 150,
      },
    };

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

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
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockedFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const { result } = renderHook(() => useTrustpilotScore());

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Failed to fetch Trustpilot data");
    });

    consoleErrorSpy.mockRestore();
  });
});
