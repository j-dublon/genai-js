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

  it("should handle invalid basket ID errors", async () => {
    const basketError = new ValidationError([
      {
        message: "Invalid basket ID",
        path: "basketId",
        label: "invalidBasketId",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(basketError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketId is invalid: Invalid basket ID"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle basket address history incomplete errors", async () => {
    const addressError = new ValidationError([
      {
        message: "Basket address history is incomplete",
        path: "basketAddress",
        label: "basketAddressHistoryIncomplete",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(addressError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: [
          "basketAddress is invalid: Basket address history is incomplete",
        ],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle basket product missing errors", async () => {
    const productError = new ValidationError([
      {
        message: "Basket product is missing",
        path: "basketProduct",
        label: "basketProductMissing",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(productError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketProduct is invalid: Basket product is missing"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle basket not new sale errors", async () => {
    const saleError = new ValidationError([
      {
        message: "Basket is not a new sale",
        path: "basketSale",
        label: "basketNotNewSale",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(saleError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketSale is invalid: Basket is not a new sale"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle basket email not valid errors", async () => {
    const emailError = new ValidationError([
      {
        message: "Basket email is not valid",
        path: "basketEmail",
        label: "basketEmailNotValid",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(emailError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketEmail is invalid: Basket email is not valid"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle basket name not valid errors", async () => {
    const nameError = new ValidationError([
      {
        message: "Basket name is not valid",
        path: "basketName",
        label: "basketNameNotValid",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(nameError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "basketError",
        message: "Payload Validation Error",
        details: ["basketName is invalid: Basket name is not valid"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle credit check limit reached errors", async () => {
    const limitError = new ValidationError([
      {
        message: "Credit check limit has been reached",
        path: "creditCheck",
        label: "creditCheckLimitReached",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(limitError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "creditCheckLimitReached",
        message: "Payload Validation Error",
        details: [
          "creditCheck is invalid: Credit check limit has been reached",
        ],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });

  it("should handle credit check load hashed errors", async () => {
    const hashedError = new ValidationError([
      {
        message: "Credit check load hashed error",
        path: "creditCheck",
        label: "creditCheckLoadHashedError",
      },
    ]);
    vi.mocked(squidAPI.runCreditCheck).mockRejectedValueOnce(hashedError);

    const result = await runCreditCheck("123");

    expect(result).toEqual({
      error: {
        type: "creditCheckLoadHashedError",
        message: "Payload Validation Error",
        details: ["creditCheck is invalid: Credit check load hashed error"],
      },
    });
    expect(squidAPI.runCreditCheck).toHaveBeenCalledTimes(1);
  });
});
