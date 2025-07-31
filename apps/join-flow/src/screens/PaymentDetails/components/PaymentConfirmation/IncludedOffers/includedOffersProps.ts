import { Offer } from "@/store/useJoinFlowStore";

export const includedOffersProps: Record<
  Offer["blockType"],
  { title: string; content: string; linkText: string }
> = {
  promotionBlock: {
    title: "Your monthly discount offer",
    content:
      "As a new customer, you'll get £DISCOUNT_VALUE off your bill each month for your first DISCOUNT_TERM months. The discount is automatically applied, starting from your first bill. ",
    linkText: "See more: cuckoo.co/terms",
  },
  giftCardBlock: {
    title: "Your gift card offer",
    content:
      "If you're eligible (you can't have been a Cuckoo customer before), you'll get a gift card by email after 90 days. This is where you can pick the retailer you'd like to shop with. ",
    linkText: "See more: cuckoo.co/terms",
  },
  billCreditBlock: {
    title: "Your bill credit offer",
    content:
      "As a new customer, you'll save £CREDIT_AMOUNT off your bill. The credit will be added to your account after the order's been placed and before your first bill. It can only be used as credit. ",
    linkText: "See more terms to find out more",
  },
};
