import {
  FetchError,
  RunCreditCheckResponse,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";
import { describe, expect, it, vi } from "vitest";

import { runCreditCheck } from "./runCreditCheck";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      runCreditCheck: vi.fn(),
    },
  };
});

describe("runCreditCheck", () => {
  const mockCreditCheckResponse: RunCreditCheckResponse = {
    status: "PASSED",
  };

  it("should return a status and message when the API call is successful", async () => {
    vi.mocked(squidAPI.runCreditCheck).mockResolvedValueOnce(
      mockCreditCheckResponse,
    );

    const result = await runCreditCheck("123");

    expect(result).toEqual(mockCreditCheckResponse);
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors", async () => {
    const networkError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(networkError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle validation errors", async () => {
    const validationError = new ValidationError([
      { message: "Credit check failed", path: "creditCheck" },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(validationError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "validationError",
        message: "Payload Validation Error",
        details: ["creditCheck is invalid: Credit check failed"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle unknown errors", async () => {
    const unknownError = new Error("Something went wrong");
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(unknownError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle non-error instances", async () => {
    const nonErrorObject = "This is not an Error object";
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(nonErrorObject);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unknown error"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });
});
