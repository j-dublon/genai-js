import { StoreSelectedPackage } from "@store/useJoinFlowStore";
import { useMemo } from "react";

import { TermLength } from "@/lib/createOfferContent";
import { EeroProduct } from "@/store/useJoinFlowStore";

export const convertPenceToPounds = (pence: number): string =>
  (pence / 100).toFixed(2).replace(/\.00/, "");

const generatePackageName = (speeds: { download: number }): string =>
  `C-${speeds.download} full fibre broadband`;

export interface PricingCalculations {
  /** base price of core broadband product */
  monthlyPackagePrice: string;
  /** discounted price of core broadband product */
  discountedPrice: string;
  /** price of selected eero products */
  monthlyEeroPrice: string;
  /** total base price of core broadband product and eero products */
  monthlyTotal: string;
  /** total discounted price of core broadband product and eero products */
  discountedMonthlyTotal: string;
  /** The value of the price increase for the next year */
  nextPriceRiseAmount: string;
  /** The value of the price increase for the second year */
  followingPriceRiseAmount: string;
  /** price of core broadband product after first year (inc discounts) */
  nextPrice: string;
  /** price of core broadband product after second year (inc discounts) */
  followingPrice: string;
  /** total price of core broadband product and eero products after first year (inc discounts) */
  predictedTotalNext: string;
  /** total price of core broadband product and eero products after second year (inc discounts) */
  predictedTotalFollowing: string;
  /** monthly saving of discount on core broadband product */
  monthlySaving: string;
  /** total saving of discount on core broadband product across the contract */
  totalPlanSaving: string;
  /** download speed of core broadband product (e.g. 150Mbps) */
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
        nextPriceRiseAmount: "0",
        followingPriceRiseAmount: "0",
        monthlySaving: "0",
        totalPlanSaving: "0",
        packageName: "",
      };
    }

    const monthlyPackagePrice = convertPenceToPounds(
      selectedPackage.prices.broadband.basePrice,
    );
    const discountedPrice = convertPenceToPounds(
      selectedPackage.prices.broadband.customerPriceIncDiscount,
    );

    // Calculate totals in pence first, then convert to pounds to avoid floating point precision issues
    const eeroSelectionPence = eeroSelection ? eeroSelection.price : 0;
    const monthlyEeroPrice = convertPenceToPounds(eeroSelectionPence);

    const monthlyTotal = convertPenceToPounds(
      selectedPackage.prices.broadband.basePrice + eeroSelectionPence,
    );
    const discountedMonthlyTotal = convertPenceToPounds(
      selectedPackage.prices.broadband.customerPriceIncDiscount +
        eeroSelectionPence,
    );

    const nextPricePence =
      selectedPackage.prices.broadband.annualPriceRise?.[0]?.price ||
      selectedPackage.prices.broadband.basePrice;
    const followingPricePence =
      selectedPackage.prices.broadband.annualPriceRise?.[1]?.price ||
      nextPricePence;

    const nextPriceRiseAmount = convertPenceToPounds(
      nextPricePence -
        selectedPackage.prices.broadband.customerPriceIncDiscount,
    );
    const followingPriceRiseAmount = convertPenceToPounds(
      followingPricePence - nextPricePence,
    );

    // Reminder: These are the price rises, excluding extras
    const nextPrice = convertPenceToPounds(nextPricePence);
    const followingPrice = convertPenceToPounds(followingPricePence);

    // Reminder: These are the price rises, including extras
    const predictedTotalNext = convertPenceToPounds(
      nextPricePence + eeroSelectionPence,
    );
    const predictedTotalFollowing = convertPenceToPounds(
      followingPricePence + eeroSelectionPence,
    );

    let totalPlanSaving = "0";
    let monthlySaving = "0";
    const discountOffer = selectedPackage.offers?.find(
      (offer) => offer.blockType === "promotionBlock",
    );

    if (discountOffer) {
      const discountTermLength = discountOffer.promotion.term;

      totalPlanSaving = convertPenceToPounds(
        (selectedPackage.prices.broadband.basePrice -
          selectedPackage.prices.broadband.customerPriceIncDiscount) *
          Number(TermLength[discountTermLength || "wholeContract"]),
      );

      monthlySaving = convertPenceToPounds(
        selectedPackage.prices.broadband.discount,
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
      nextPriceRiseAmount,
      followingPriceRiseAmount,
      monthlySaving,
      totalPlanSaving,
      packageName,
    };
  }, [selectedPackage, eeroSelection]);
};
