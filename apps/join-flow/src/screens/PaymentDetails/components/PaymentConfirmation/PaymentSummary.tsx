"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { sortAnnualPriceRiseByDate } from "@/lib/sortAnnualPriceRise";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

export const PaymentSummary = () => {
  const { selectedPackage, eeroSelection } = useJoinFlowStore();

  const {
    monthlyPaymentTitle,
    totalMonthlyPaymentTitle,
    nextYearPriceIncreaseText,
    followingYearPriceIncreaseText,
  } = paymentConfirmationText;

  if (!selectedPackage) {
    return (
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <p>Oops have you selected a package</p>
      </div>
    );
  }

  const monthlyPackagePrice = Math.round(
    selectedPackage.prices.basePrice / 100,
  );
  const monthlyEeroPrice = eeroSelection ? eeroSelection.price : 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;

  const sortedPriceRises = sortAnnualPriceRiseByDate(
    selectedPackage.prices.annualPriceRise,
  );

  const nextYearPrice =
    sortedPriceRises?.[0]?.price || selectedPackage.prices.basePrice;
  const followingYearPrice =
    sortedPriceRises?.[1]?.price ||
    sortedPriceRises?.[0]?.price ||
    selectedPackage.prices.basePrice;

  const nextYearMonthly = Math.round(nextYearPrice / 100);
  const followingYearMonthly = Math.round(followingYearPrice / 100);

  const predictedTotalNextYear = nextYearMonthly + monthlyEeroPrice;
  const predictedTotalFollowingYear = followingYearMonthly + monthlyEeroPrice;

  const packageName = `${selectedPackage.speeds.download}Mbps`;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold mb-4">{monthlyPaymentTitle}</h3>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">{packageName}</h3>
        </div>
        <div className="text-right">
          <p className="font-bold">£{monthlyPackagePrice.toFixed(2)}</p>
        </div>
      </div>

      {eeroSelection && (
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium">{eeroSelection.name}</h3>
            <p className="text-sm text-ui-grey-500">
              {eeroSelection.description}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">
              {eeroSelection.price > 0
                ? `£${eeroSelection.price.toFixed(2)}`
                : "Included"}
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{totalMonthlyPaymentTitle}</h3>
          <p className="font-bold">£{monthlyTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-ui-grey-500">
            {nextYearPriceIncreaseText && (
              <>{nextYearPriceIncreaseText.replace("{year}", "2026")}</>
            )}
          </p>
          <p className="font-bold">£{predictedTotalNextYear.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-ui-grey-500">
            {followingYearPriceIncreaseText && (
              <>{followingYearPriceIncreaseText.replace("{year}", "2027")}</>
            )}
          </p>
          <p className="font-bold">£{predictedTotalFollowingYear.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
