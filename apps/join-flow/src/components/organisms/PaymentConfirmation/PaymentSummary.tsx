"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

export const PaymentSummary = () => {
  const { selectedPackage, eeroSelection, priceIncreaseInfo } =
    useJoinFlowStore();

  const {
    monthlyPaymentTitle,
    totalMonthlyPaymentTitle,
    nextYearPriceIncreaseText,
    followingYearPriceIncreaseText,
  } = paymentConfirmationText;

  //TO DO: we need confirmation on how to redirect a user
  if (!selectedPackage) {
    return (
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <p>Oops have you selected a package</p>
      </div>
    );
  }

  const monthlyPackagePrice = selectedPackage.price.monthly;
  const monthlyEeroPrice = eeroSelection ? eeroSelection.price : 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;

  const nextYearIncrease = priceIncreaseInfo
    ? priceIncreaseInfo.nextYearIncrease
    : 3.0;
  const followingYearIncrease = priceIncreaseInfo
    ? priceIncreaseInfo.followingYearIncrease
    : 3.0;

  const predictedTotalNextYear = monthlyTotal + nextYearIncrease;
  const predictedTotalFollowingYear = monthlyTotal + followingYearIncrease;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold mb-4">{monthlyPaymentTitle}</h3>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">{selectedPackage.name}</h3>
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
              <>
                {nextYearPriceIncreaseText.replace("{year}", "2026")}
                {nextYearIncrease.toFixed(2)}
              </>
            )}
          </p>
          <p className="font-bold">£{predictedTotalNextYear.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-ui-grey-500">
            {followingYearPriceIncreaseText && (
              <>
                {followingYearPriceIncreaseText.replace("{year}", "2027")}
                {followingYearIncrease.toFixed(2)}
              </>
            )}
          </p>
          <p className="font-bold">£{predictedTotalFollowingYear.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
