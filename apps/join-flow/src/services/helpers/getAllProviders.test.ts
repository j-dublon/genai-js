import {
  FetchError,
  squidAPI,
} from "@cuckoointernet/util-squid-network-requests";
import { describe, expect, it, vi } from "vitest";

import { getAllProviders } from "./getAllProviders";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      getSwitchMatchServiceProviders: vi.fn(),
    },
  };
});

describe("getAllProviders", () => {
  const mockProviders = [
    {
      id: "1",
      name: "Provider 1",
      losingRcpid: "rcp1",
      isActive: true,
      cuckoo: { isInKraken: true },
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Provider 2",
      losingRcpid: "rcp2",
      isActive: true,
      cuckoo: { isInKraken: true },
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
  ];

  it("should return providers when the API call is successful", async () => {
    vi.mocked(squidAPI.getSwitchMatchServiceProviders).mockResolvedValueOnce(
      mockProviders,
    );

    const result = await getAllProviders();

    expect(result).toEqual({
      providers: mockProviders,
    });
    expect(squidAPI.getSwitchMatchServiceProviders).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors", async () => {
    const networkError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    vi.mocked(squidAPI.getSwitchMatchServiceProviders).mockRejectedValueOnce(
      networkError,
    );

    const result = await getAllProviders();

    expect(result).toEqual({
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
    expect(squidAPI.getSwitchMatchServiceProviders).toHaveBeenCalledTimes(1);
  });

  it("should handle unknown errors", async () => {
    const unknownError = new Error("Something went wrong");
    vi.mocked(squidAPI.getSwitchMatchServiceProviders).mockRejectedValueOnce(
      unknownError,
    );

    const result = await getAllProviders();

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      },
    });
    expect(squidAPI.getSwitchMatchServiceProviders).toHaveBeenCalledTimes(1);
  });

  it("should handle non-error instances", async () => {
    const nonErrorObject = "This is not an Error object";
    vi.mocked(squidAPI.getSwitchMatchServiceProviders).mockRejectedValueOnce(
      nonErrorObject,
    );

    const result = await getAllProviders();

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unknown error"],
      },
    });
    expect(squidAPI.getSwitchMatchServiceProviders).toHaveBeenCalledTimes(1);
  });
});
