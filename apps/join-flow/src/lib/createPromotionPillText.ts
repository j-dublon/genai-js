import type { Offer } from "@/store/useJoinFlowStore";

// For now, this is the only term length supported by the backend but can be expanded in the future
enum TermLength {
  "wholeContract" = "24",
}

export const createPromotionPillText = (offers?: Offer[] | null) => {
  if (!offers) return [];

  return offers.map((offer) => {
    switch (offer.blockType) {
      case "giftCardBlock":
        return `£${offer.value} gift card`;
      case "promotionBlock":
        // We only support one promotion value block per promotion, which is enforced in the backend but not obvious from the typing
        const promotionValueBlock = offer.promotion.value?.[0];

        if (
          promotionValueBlock?.blockType === "percentageBased" &&
          promotionValueBlock.value === 100
        ) {
          return `${TermLength[offer.promotion.term!]} months free`;
        }

        if (promotionValueBlock?.blockType === "fixedValue") {
          return `£${promotionValueBlock.value} off x${TermLength[offer.promotion.term || "wholeContract"]} months`;
        }

        return `${promotionValueBlock?.value}% off x${TermLength[offer.promotion.term || "wholeContract"]} months`;
      case "billCreditBlock":
        return `£${offer.value} bill credit`;
    }
  });
};
