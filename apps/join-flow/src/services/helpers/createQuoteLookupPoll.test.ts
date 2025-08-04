import { squidAPI } from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createQuoteLookupPoll } from "@/services/helpers/createQuoteLookupPoll";

vi.mock("@cuckoointernet/util-squid-network-requests", () => ({
  squidAPI: {
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
      cuckooTradingProductID: "123",
      frontendIdentifier: "150-12",
      frontendTitle: "C-150",
      termMonths: 12,
      selectionIdentifier: "0",
      installationRequired: true,
      appliedPromotionUUIDs: [],
      prices: {
        broadbandAndCurrentExtras: {
          basePrice: 3800,
          discount: 0,
          customerPriceIncDiscount: 3800,
          annualPriceRise: [
            {
              price: 4100,
              date: "2026-04-01T12:00:00.000Z",
              id: "682f084125d25c4681c1ad20",
            },
          ],
        },
        currentExtras: {
          basePrice: 0,
          discount: 0,
          customerPriceIncDiscount: 0,
        },
        broadband: {
          basePrice: 3800,
          discount: 0,
          customerPriceIncDiscount: 3800,
          annualPriceRise: [
            {
              price: 4100,
              date: "2026-04-01T12:00:00.000Z",
              id: "682f084125d25c4681c1ad20",
            },
          ],
        },
      },
      speeds: {
        download: 25,
        upload: 150,
      },
      availableExtras: [],
      offers: [],
      id: "682f084125d25c4681c1ad36",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe("responses", () => {
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

      vi.mocked(squidAPI.createQuoteLookupAsync).mockResolvedValue(
        mockPendingResponse,
      );

      vi.mocked(squidAPI.getQuoteLookup)
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

      expect(squidAPI.getQuoteLookup).toHaveBeenCalledTimes(2);
      expect(squidAPI.getQuoteLookup).toHaveBeenCalledWith("doc-123");
      expect(result).toEqual({
        products: mockProducts,
        quotingCode: "quote-123",
        documentID: "doc-123",
      });

      vi.useRealTimers();
    });

    it("should handle JoinSuspended error", async () => {
      const mockErrorResponse = {
        state: "error" as const,
        data: {
          errors: [
            {
              blockType: "JoinSuspended" as const,
              errorMessage: "Join flow is currently unavailable",
            },
          ],
          documentID: "doc-123",
        },
      };

      vi.mocked(squidAPI.createQuoteLookupAsync).mockResolvedValue({
        state: "pending" as const,
        documentID: "doc-123",
      });

      vi.mocked(squidAPI.getQuoteLookup).mockResolvedValue(mockErrorResponse);

      const result = await createQuoteLookupPoll(
        mockAffiliateSessionId,
        mockAddressLookupId,
        mockAddressLookupSelectionIdentifier,
      );

      expect(result).toEqual({
        products: [],
        documentID: "doc-123",
        error: {
          type: "joinSuspended",
          message: "Join flow is currently unavailable",
        },
      });
    });

    it("should handle UnknownError", async () => {
      const mockErrorResponse = {
        state: "error" as const,
        data: {
          errors: [
            {
              blockType: "UnknownError" as const,
              errorMessage: "An unexpected error occurred",
            },
          ],
          documentID: "doc-123",
        },
      };

      vi.mocked(squidAPI.createQuoteLookupAsync).mockResolvedValue({
        state: "pending" as const,
        documentID: "doc-123",
      });

      vi.mocked(squidAPI.getQuoteLookup).mockResolvedValue(mockErrorResponse);

      const result = await createQuoteLookupPoll(
        mockAffiliateSessionId,
        mockAddressLookupId,
        mockAddressLookupSelectionIdentifier,
      );

      expect(result).toEqual({
        products: [],
        documentID: "doc-123",
        error: {
          type: "unknownError",
          message: "An unexpected error occurred",
          details: ["An unexpected error occurred"],
        },
      });
    });

    it("should handle invalidAddressError for various error types", async () => {
      const testCases = [
        "KT-CT-4410KrakenAddressLookupBadPostcode" as const,
        "KT-CT-4616KrakenUnableToCreateQuote" as const,
        "KT-CT-4627KrakenNoProductsAvailableForProperty" as const,
        "QuoteLookupNoProductsAvailableAtAddress" as const,
        "QuoteLookupInvalidSelectionIdentifier" as const,
      ];

      for (const errorType of testCases) {
        const mockErrorResponse = {
          state: "error" as const,
          data: {
            errors: [
              {
                blockType: errorType,
                errorMessage: "This address cannot be serviced",
              },
            ],
            documentID: "doc-123",
          },
        };

        vi.mocked(squidAPI.createQuoteLookupAsync).mockResolvedValue({
          state: "pending" as const,
          documentID: "doc-123",
        });

        vi.mocked(squidAPI.getQuoteLookup).mockResolvedValue(mockErrorResponse);

        const result = await createQuoteLookupPoll(
          mockAffiliateSessionId,
          mockAddressLookupId,
          mockAddressLookupSelectionIdentifier,
        );

        expect(result).toEqual({
          products: [],
          documentID: "doc-123",
          error: {
            type: "invalidAddressError",
            message: "This address cannot be serviced",
            details: ["This address cannot be serviced"],
          },
        });
      }
    });
  });
});
