import { StoreSelectedPackage } from "@store/useJoinFlowStore";
import { useMemo } from "react";

import { TermLength } from "@/lib/createOfferContent";
import { EeroProduct } from "@/store/useJoinFlowStore";

export const convertPenceToPounds = (pence: number): string =>
  (pence / 100).toFixed(2).replace(/\.00/, "");

const generatePackageName = (speeds: { download: number }): string =>
  `${speeds.download}Mbps`;

export interface PricingCalculations {
  // base price of core broadband product
  monthlyPackagePrice: string;
  // discounted price of core broadband product
  discountedPrice: string;
  // price of core broadband product after first year
  nextPrice: string;
  // price of core broadband product after second year
  followingPrice: string;
  // price of eero products
  monthlyEeroPrice: string;
  // total price of core broadband product and eero products
  monthlyTotal: string;
  // total price of core broadband product and eero products after discount
  discountedMonthlyTotal: string;
  // total price of core broadband product and eero products after first year
  predictedTotalNext: string;
  // total price of core broadband product and eero products after second year
  predictedTotalFollowing: string;
  // total saving of core broadband product with discount
  totalPlanSaving: string;
  // download speed of core broadband product (150Mbps)
  packageName: string;
}

export const usePricingCalculations = (
  selectedPackage: StoreSelectedPackage | null,
  eeroSelection: EeroProduct | null,
): PricingCalculations => {
  return useMemo(() => {
    if (!selectedPackage) {
      return {
        monthlyPackagePrice: "0",
        discountedPrice: "0",
        nextPrice: "0",
        followingPrice: "0",
        monthlyEeroPrice: "0",
        monthlyTotal: "0",
        discountedMonthlyTotal: "0",
        predictedTotalNext: "0",
        predictedTotalFollowing: "0",
        totalPlanSaving: "0",
        packageName: "",
      };
    }

    const monthlyPackagePrice = convertPenceToPounds(
      selectedPackage.prices.basePrice,
    );
    const discountedPrice = convertPenceToPounds(
      selectedPackage.prices.discountedPrice,
    );

    const nextPrice = selectedPackage.prices.annualPriceRise?.[0]?.price
      ? convertPenceToPounds(selectedPackage.prices.annualPriceRise[0].price)
      : monthlyPackagePrice;
    const followingPrice = selectedPackage.prices.annualPriceRise?.[1]?.price
      ? convertPenceToPounds(selectedPackage.prices.annualPriceRise[1].price)
      : nextPrice;

    const monthlyEeroPrice = eeroSelection
      ? convertPenceToPounds(eeroSelection.price)
      : "0";

    // Calculate totals in pence first, then convert to pounds to avoid floating point precision issues
    const eeroSelectionPence = eeroSelection ? eeroSelection.price : 0;
    const monthlyTotal = convertPenceToPounds(
      selectedPackage.prices.basePrice + eeroSelectionPence,
    );
    const discountedMonthlyTotal = convertPenceToPounds(
      selectedPackage.prices.discountedPrice + eeroSelectionPence,
    );

    const nextPricePence =
      selectedPackage.prices.annualPriceRise?.[0]?.price ||
      selectedPackage.prices.basePrice;
    const followingPricePence =
      selectedPackage.prices.annualPriceRise?.[1]?.price || nextPricePence;
    const predictedTotalNext = convertPenceToPounds(
      nextPricePence + eeroSelectionPence,
    );
    const predictedTotalFollowing = convertPenceToPounds(
      followingPricePence + eeroSelectionPence,
    );

    let totalPlanSaving = "0";
    const discountOffer = selectedPackage.offers?.find(
      (offer) => offer.blockType === "promotionBlock",
    );

    if (discountOffer) {
      const discountTermLength = discountOffer.promotion.term;

      totalPlanSaving = convertPenceToPounds(
        (selectedPackage.prices.basePrice -
          selectedPackage.prices.discountedPrice) *
          Number(TermLength[discountTermLength || "wholeContract"]),
      );
    }

    const packageName = generatePackageName(selectedPackage.speeds);

    return {
      monthlyPackagePrice,
      discountedPrice,
      nextPrice,
      followingPrice,
      monthlyEeroPrice,
      monthlyTotal,
      discountedMonthlyTotal,
      predictedTotalNext,
      predictedTotalFollowing,
      totalPlanSaving,
      packageName,
    };
  }, [selectedPackage, eeroSelection]);
};
