"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

interface PaymentSummaryProps {
  monthlyPaymentTitle: string;
  totalMonthlyPaymentTitle: string;
  futurePriceIncreaseText?: string;
}

export const PaymentSummary = ({
  monthlyPaymentTitle,
  totalMonthlyPaymentTitle,
  futurePriceIncreaseText,
}: PaymentSummaryProps) => {
  const { selectedPackage, eeroSelection } = useJoinFlowStore();

  const monthlyPackagePrice = selectedPackage?.price.monthly || 0;
  const monthlyEeroPrice = eeroSelection?.price || 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;

  const predictedIncreaseInNextYear = "3.00";
  const predictedTotalNextYear = monthlyTotal + 3;

  const predictedIncreaseInFollowingYear = "3.00";
  const predictedTotalFollowingYear = predictedTotalNextYear + 3;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md border border-ui-grey-300">
      <h3 className="font-bold mb-4">{monthlyPaymentTitle}</h3>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">{selectedPackage?.name}</h3>
          <p className="text-sm text-ui-grey-500">
            {selectedPackage?.speed.download} Mbps download /{" "}
            {selectedPackage?.speed.upload} Mbps upload
          </p>
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
            {futurePriceIncreaseText && (
              <>
                {futurePriceIncreaseText.replace("{year}", "2026")}
                {predictedIncreaseInNextYear}
              </>
            )}
            {!futurePriceIncreaseText && (
              <>
                {futurePriceIncreaseText}
                {predictedIncreaseInNextYear}
              </>
            )}
          </p>
          <p className="font-bold">£{predictedTotalNextYear.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-ui-grey-500">
            {futurePriceIncreaseText && (
              <>
                {futurePriceIncreaseText.replace("{year}", "2027")}
                {predictedIncreaseInFollowingYear}
              </>
            )}
            {!futurePriceIncreaseText && (
              <>
                {futurePriceIncreaseText}
                {predictedIncreaseInFollowingYear}
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
