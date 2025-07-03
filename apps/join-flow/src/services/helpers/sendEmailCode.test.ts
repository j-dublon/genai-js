import { describe, expect, it, vi } from "vitest";

import { squidAPI } from "../payloadClient";
import {
  FetchError,
  SendEmailCodeResponse,
  ValidationError,
} from "../payloadTypes";
import { sendEmailCode } from "./sendEmailCode";

vi.mock("../payloadClient", () => ({
  squidAPI: {
    emailValidationSendCode: vi.fn(),
  },
}));

describe("sendEmailCode", () => {
  const mockSendEmailCodeResponse: SendEmailCodeResponse = {
    success: true,
  };

  it("should return a success flag when the API call is successful", async () => {
    vi.mocked(squidAPI.emailValidationSendCode).mockResolvedValueOnce(
      mockSendEmailCodeResponse,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual(mockSendEmailCodeResponse);
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle network errors", async () => {
    const networkError = new FetchError(
      500,
      "Internal Server Error",
      "http://example.com/api",
      {},
      new Response(null, { status: 500, statusText: "Internal Server Error" }),
    );
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      networkError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "networkError",
        message: "Server error: HTTP Error: 500 Internal Server Error",
        details: ["Status: 500"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle validation errors", async () => {
    const validationError = new ValidationError([
      { message: "Send Email Code failed", path: "sendEmailCode" },
    ]);
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      validationError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "validationError",
        message: "Payload Validation Error",
        details: ["sendEmailCode is invalid: Send Email Code failed"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle unknown errors", async () => {
    const unknownError = new Error("Something went wrong");
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      unknownError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Something went wrong"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle non-error instances", async () => {
    const nonErrorObject = "This is not an Error object";
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      nonErrorObject,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Unknown error"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });
});
