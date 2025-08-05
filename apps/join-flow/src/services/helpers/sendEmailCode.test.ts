import {
  FetchError,
  type SendEmailCodeResponse,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";
import { describe, expect, it, vi } from "vitest";

import { sendEmailCode } from "./sendEmailCode";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      emailValidationSendCode: vi.fn(),
    },
  };
});

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

  it("should handle invalid basket ID errors", async () => {
    const basketError = new ValidationError([
      {
        message: "Invalid basket ID",
        path: "basketId",
        label: "invalidBasketId",
      },
    ]);
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      basketError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketId is invalid: Invalid basket ID"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle basket email incomplete errors", async () => {
    const basketEmailError = new ValidationError([
      {
        message: "Basket email is incomplete",
        path: "basketEmail",
        label: "basketEmailIncomplete",
      },
    ]);
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      basketEmailError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketEmail is invalid: Basket email is incomplete"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle email code too recent errors", async () => {
    const tooRecentError = new ValidationError([
      {
        message: "Email code was sent too recently",
        path: "emailCode",
        label: "emailCodeTooRecent",
      },
    ]);
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      tooRecentError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "emailCodeTooRecent",
        message: "Payload Validation Error",
        details: ["emailCode is invalid: Email code was sent too recently"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });

  it("should handle email code spam errors", async () => {
    const spamError = new ValidationError([
      {
        message: "Too many email code requests",
        path: "emailCode",
        label: "emailCodeSpam",
      },
    ]);
    vi.mocked(squidAPI.emailValidationSendCode).mockRejectedValueOnce(
      spamError,
    );

    const result = await sendEmailCode("123");

    expect(result).toEqual({
      error: {
        type: "emailCodeSpam",
        message: "Payload Validation Error",
        details: ["emailCode is invalid: Too many email code requests"],
      },
    });
    expect(squidAPI.emailValidationSendCode).toHaveBeenCalledTimes(1);
  });
});
