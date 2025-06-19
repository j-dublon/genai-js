import { StoreSelectedPackage } from "@store/useJoinFlowStore";
import { useMemo } from "react";

import { EeroProduct } from "@/store/useJoinFlowStore";

export const convertPenceToPounds = (pence: number): number => pence / 100;

const generatePackageName = (speeds: { download: number }): string =>
  `${speeds.download}Mbps`;

export interface PricingCalculations {
  monthlyPackagePrice: number;
  discountedPrice: number;
  nextPrice: number;
  followingPrice: number;
  monthlyEeroPrice: number;
  monthlyTotal: number;
  discountedMonthlyTotal: number;
  predictedTotalNext: number;
  predictedTotalFollowing: number;
  packageName: string;
}

export const usePricingCalculations = (
  selectedPackage: StoreSelectedPackage | null,
  eeroSelection: EeroProduct | null,
): PricingCalculations => {
  return useMemo(() => {
    if (!selectedPackage) {
      return {
        monthlyPackagePrice: 0,
        discountedPrice: 0,
        nextPrice: 0,
        followingPrice: 0,
        monthlyEeroPrice: 0,
        monthlyTotal: 0,
        discountedMonthlyTotal: 0,
        predictedTotalNext: 0,
        predictedTotalFollowing: 0,
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
      : 0;

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
      packageName,
    };
  }, [selectedPackage, eeroSelection]);
};
