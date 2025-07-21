import { describe, expect, it } from "vitest";

import type { Offer } from "@/store/useJoinFlowStore";

import { createPromotionPillText } from "./createOfferContent";

describe("createOfferContent", () => {
  describe("no offers", () => {
    it("should return empty array when offers is null", () => {
      const result = createPromotionPillText(null);

      expect(result).toEqual([]);
    });

    it("should return empty array when offers is undefined", () => {
      const result = createPromotionPillText(undefined);

      expect(result).toEqual([]);
    });

    it("should return empty array when offers is empty", () => {
      const result = createPromotionPillText([]);

      expect(result).toEqual([]);
    });
  });

  describe("gift card offers", () => {
    it("should format gift card offer correctly", () => {
      const offers: Offer[] = [
        {
          blockType: "giftCardBlock",
          value: 50,
        },
      ];

      const result = createPromotionPillText(offers);

      expect(result).toEqual(["£50 gift card"]);
    });
  });

  describe("percentageBased promotions", () => {
    it("should format 100% off promotion as 'months free'", () => {
      const offers: Offer[] = [
        {
          blockType: "promotionBlock",
          promotion: {
            id: "promo-1",
            term: "wholeContract",
            value: [
              {
                value: 100,
                blockType: "percentageBased",
              },
            ],
          },
        },
      ];

      const result = createPromotionPillText(offers);

      expect(result).toEqual(["24 months free"]);
    });

    it("should format other percentage off promotions correctly", () => {
      const offers: Offer[] = [
        {
          blockType: "promotionBlock",
          promotion: {
            id: "promo-1",
            term: "wholeContract",
            value: [
              {
                value: 50,
                blockType: "percentageBased",
              },
            ],
          },
        },
      ];

      const result = createPromotionPillText(offers);

      expect(result).toEqual(["50% off x24 months"]);
    });
  });

  describe("fixedValue promotions", () => {
    it("should format fixed value promotions correctly", () => {
      const offers: Offer[] = [
        {
          blockType: "promotionBlock",
          promotion: {
            id: "promo-1",
            term: "wholeContract",
            value: [
              {
                value: 10,
                blockType: "fixedValue",
              },
            ],
          },
        },
      ];

      const result = createPromotionPillText(offers);

      expect(result).toEqual(["£10 off x24 months"]);
    });
  });

  describe("bill credit offers", () => {
    it("should format bill credit offer correctly", () => {
      const offers: Offer[] = [
        {
          blockType: "billCreditBlock",
          value: 30,
        },
      ];

      const result = createPromotionPillText(offers);

      expect(result).toEqual(["£30 bill credit"]);
    });
  });

  describe("multiple offer types", () => {
    it("should handle multiple different offer types", () => {
      const offers: Offer[] = [
        {
          blockType: "giftCardBlock",
          value: 25,
        },
        {
          blockType: "promotionBlock",
          promotion: {
            id: "promo-1",
            term: "wholeContract",
            value: [
              {
                value: 100,
                blockType: "percentageBased",
              },
            ],
          },
        },
      ];

      const result = createPromotionPillText(offers);

      expect(result).toEqual(["£25 gift card", "24 months free"]);
    });
  });
});
