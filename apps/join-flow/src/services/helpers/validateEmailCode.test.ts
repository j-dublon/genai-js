import { describe, expect, it, vi } from "vitest";

import { payloadAPI } from "../payloadClient";
import {
  FetchError,
  ValidateEmailCodeResponse,
  ValidationError,
} from "../payloadTypes";
import { validateEmailCode } from "./validateEmailCode";

vi.mock("../payloadClient", () => ({
  payloadAPI: {
    validateEmailCode: vi.fn(),
  },
}));

describe("sendEmailCode", () => {
  const mockValidateEmailCodeResponse: ValidateEmailCodeResponse = {
    success: true,
    message: "Email code validated successfully",
  };

  it("should return a success flag when the API call is successful", async () => {
    vi.mocked(payloadAPI.validateEmailCode).mockResolvedValueOnce(
      mockValidateEmailCodeResponse,
    );

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({ success: true });
    expect(payloadAPI.validateEmailCode).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors", async () => {
    const networkError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    vi.mocked(payloadAPI.validateEmailCode).mockRejectedValueOnce(networkError);

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
    expect(payloadAPI.validateEmailCode).toHaveBeenCalledTimes(1);
  });

  it("should handle validation errors", async () => {
    const validationError = new ValidationError([
      { message: "Validate Email Code failed", path: "validateEmailCode" },
    ]);
    vi.mocked(payloadAPI.validateEmailCode).mockRejectedValueOnce(
      validationError,
    );

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({
      error: {
        type: "validationError",
        message: "Payload Validation Error",
        details: ["validateEmailCode is invalid: Validate Email Code failed"],
      },
    });
    expect(payloadAPI.validateEmailCode).toHaveBeenCalledTimes(1);
  });

  it("should handle unknown errors", async () => {
    const unknownError = new Error("Something went wrong");
    vi.mocked(payloadAPI.validateEmailCode).mockRejectedValueOnce(unknownError);

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      },
    });
    expect(payloadAPI.validateEmailCode).toHaveBeenCalledTimes(1);
  });

  it("should handle non-error instances", async () => {
    const nonErrorObject = "This is not an Error object";
    vi.mocked(payloadAPI.validateEmailCode).mockRejectedValueOnce(
      nonErrorObject,
    );

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unknown error"],
      },
    });
    expect(payloadAPI.validateEmailCode).toHaveBeenCalledTimes(1);
  });
});
