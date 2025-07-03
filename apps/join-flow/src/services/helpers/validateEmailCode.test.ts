import { describe, expect, it, vi } from "vitest";

import { squidAPI } from "../payloadClient";
import {
  FetchError,
  ValidateEmailCodeResponse,
  ValidationError,
} from "../payloadTypes";
import { validateEmailCode } from "./validateEmailCode";

vi.mock("../payloadClient", () => ({
  squidAPI: {
    emailValidationCheckCode: vi.fn(),
  },
}));

describe("validateEmailCode", () => {
  const mockValidateEmailCodeResponse: ValidateEmailCodeResponse = {
    success: true,
    message: "Email code validated successfully",
  };

  it("should return a success flag when the API call is successful", async () => {
    vi.mocked(squidAPI.emailValidationCheckCode).mockResolvedValueOnce(
      mockValidateEmailCodeResponse,
    );

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({ success: true });
    expect(squidAPI.emailValidationCheckCode).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors", async () => {
    const networkError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    vi.mocked(squidAPI.emailValidationCheckCode).mockRejectedValueOnce(
      networkError,
    );

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
    expect(squidAPI.emailValidationCheckCode).toHaveBeenCalledTimes(1);
  });

  it("should handle validation errors", async () => {
    const validationError = new ValidationError([
      { message: "Validate Email Code failed", path: "validateEmailCode" },
    ]);
    vi.mocked(squidAPI.emailValidationCheckCode).mockRejectedValueOnce(
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
    expect(squidAPI.emailValidationCheckCode).toHaveBeenCalledTimes(1);
  });

  it("should handle unknown errors", async () => {
    const unknownError = new Error("Something went wrong");
    vi.mocked(squidAPI.emailValidationCheckCode).mockRejectedValueOnce(
      unknownError,
    );

    const result = await validateEmailCode("123", "123456");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      },
    });
    expect(squidAPI.emailValidationCheckCode).toHaveBeenCalledTimes(1);
  });

  it("should handle non-error instances", async () => {
    const nonErrorObject = "This is not an Error object";
    vi.mocked(squidAPI.emailValidationCheckCode).mockRejectedValueOnce(
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
    expect(squidAPI.emailValidationCheckCode).toHaveBeenCalledTimes(1);
  });
});
