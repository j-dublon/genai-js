import { describe, expect, it, vi } from "vitest";

import { payloadAPI } from "../payloadClient";
import {
  FetchError,
  RunCreditCheckResponse,
  ValidationError,
} from "../payloadTypes";
import { runCreditCheck } from "./runCreditCheck";

vi.mock("../payloadClient", () => ({
  payloadAPI: {
    runCreditCheck: vi.fn(),
  },
}));

describe("runCreditCheck", () => {
  const mockCreditCheckResponse: RunCreditCheckResponse = {
    status: "PASSED",
    message: "Credit check passed",
  };

  it("should return a status and message when the API call is successful", async () => {
    vi.mocked(payloadAPI.runCreditCheck).mockResolvedValueOnce(
      mockCreditCheckResponse,
    );

    const result = await runCreditCheck("123");

    expect(result).toEqual(mockCreditCheckResponse);
    expect(payloadAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors", async () => {
    const networkError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    vi.mocked(payloadAPI.runCreditCheck).mockRejectedValueOnce(networkError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
    expect(payloadAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle validation errors", async () => {
    const validationError = new ValidationError([
      { message: "Credit check failed", path: "creditCheck" },
    ]);
    vi.mocked(payloadAPI.runCreditCheck).mockRejectedValueOnce(validationError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "validationError",
        message: "Payload Validation Error",
        details: ["creditCheck is invalid: Credit check failed"],
      },
    });
    expect(payloadAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle unknown errors", async () => {
    const unknownError = new Error("Something went wrong");
    vi.mocked(payloadAPI.runCreditCheck).mockRejectedValueOnce(unknownError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      },
    });
    expect(payloadAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle non-error instances", async () => {
    const nonErrorObject = "This is not an Error object";
    vi.mocked(payloadAPI.runCreditCheck).mockRejectedValueOnce(nonErrorObject);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unknown error"],
      },
    });
    expect(payloadAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });
});
