import { beforeEach, describe, expect, it, vi } from "vitest";

import { createQuoteLookupPoll } from "@/services/helpers/createQuoteLookupPoll";
import { payloadAPI } from "@/services/payloadClient";

vi.mock("@/services/payloadClient", () => ({
  payloadAPI: {
    createQuoteLookupAsync: vi.fn(),
    getQuoteLookup: vi.fn(),
  },
}));

describe("createQuoteLookupPoll", () => {
  const mockAffiliateSessionId = "affiliate-123";
  const mockAddressLookupId = "address-123";
  const mockAddressLookupSelectionIdentifier = "selection-123";

  const mockProducts = [
    {
      krakenProductCode: "BT-150-12M_38",
      frontendIdentifier: "150-12",
      termMonths: 12,
      selectionIdentifier: "0",
      installationRequired: true,
      appliedPromotionUUIDs: [],
      prices: {
        basePrice: 3800,
        discountedPrice: 3800,
        annualPriceRise: [
          {
            price: 4100,
            date: "2026-04-01T12:00:00.000Z",
            id: "682f084125d25c4681c1ad20",
          },
        ],
      },
      speeds: {
        download: 25,
        upload: 150,
      },
      extras: [],
      offers: [],
      id: "682f084125d25c4681c1ad36",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe("successful responses", () => {
    it("should return products when initial response is successful", async () => {
      const mockResponse = {
        state: "success" as const,
        data: {
          response: {
            products: mockProducts,
            quotingCode: "quote-123",
          },
          documentID: "doc-123",
        },
      };

      vi.mocked(payloadAPI.createQuoteLookupAsync).mockResolvedValue(
        mockResponse,
      );

      const result = await createQuoteLookupPoll(
        mockAffiliateSessionId,
        mockAddressLookupId,
        mockAddressLookupSelectionIdentifier,
      );

      expect(result).toEqual({
        products: mockProducts,
        quotingCode: "quote-123",
        documentID: "doc-123",
      });
    });

    it("should handle undefined quotingCode in successful response", async () => {
      const mockResponse = {
        state: "success" as const,
        data: {
          response: {
            products: mockProducts,
            quotingCode: undefined,
          },
          documentID: "doc-123",
        },
      };

      vi.mocked(payloadAPI.createQuoteLookupAsync).mockResolvedValue(
        mockResponse,
      );

      const result = await createQuoteLookupPoll(
        mockAffiliateSessionId,
        mockAddressLookupId,
        mockAddressLookupSelectionIdentifier,
      );

      expect(result).toEqual({
        products: mockProducts,
        quotingCode: undefined,
        documentID: "doc-123",
      });
    });

    it("should poll until completion when initial response is pending", async () => {
      vi.useFakeTimers();

      const mockPendingResponse = {
        state: "pending" as const,
        documentID: "doc-123",
      };

      const mockSuccessResponse = {
        state: "success" as const,
        data: {
          response: {
            products: mockProducts,
            quotingCode: "quote-123",
          },
          documentID: "doc-123",
        },
      };

      vi.mocked(payloadAPI.createQuoteLookupAsync).mockResolvedValue(
        mockPendingResponse,
      );

      vi.mocked(payloadAPI.getQuoteLookup)
        .mockResolvedValueOnce({
          state: "pending" as const,
          documentID: "doc-123",
        })
        .mockResolvedValueOnce(mockSuccessResponse);

      const resultPromise = createQuoteLookupPoll(
        mockAffiliateSessionId,
        mockAddressLookupId,
        mockAddressLookupSelectionIdentifier,
      );

      await vi.advanceTimersByTimeAsync(5000);

      const result = await resultPromise;

      expect(payloadAPI.getQuoteLookup).toHaveBeenCalledTimes(2);
      expect(payloadAPI.getQuoteLookup).toHaveBeenCalledWith("doc-123");
      expect(result).toEqual({
        products: mockProducts,
        quotingCode: "quote-123",
        documentID: "doc-123",
      });

      vi.useRealTimers();
    });
  });
});
