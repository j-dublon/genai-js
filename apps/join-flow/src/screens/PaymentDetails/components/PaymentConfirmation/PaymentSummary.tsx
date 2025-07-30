"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { hydrateEeroProductWithContent } from "@/lib/createEeroOptions";
import { formatDisplayDateMonthYear } from "@/lib/formatDate";
import { getAssetPath } from "@/lib/get-asset-path";
import { sortAnnualPriceRiseByDate } from "@/lib/sortAnnualPriceRise";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

interface LineItemProps {
  title: string;
  description?: string;
  price: string;
  isIncluded?: boolean;
}

const LineItem: React.FC<LineItemProps> = ({
  title,
  description,
  price,
  isIncluded = false,
}) => (
  <div className="flex justify-between items-center mb-4">
    <div className="text-ui-grey-500 text-xs md:text-sm font-normal">
      <p>{title}</p>
      {description && <p>{description}</p>}
    </div>
    <div className="text-right">
      <p className="text-xs md:text-sm font-semibold">
        {isIncluded ? "Included" : `£${price}`}
      </p>
    </div>
  </div>
);

interface PriceProjectionProps {
  label: string[];
  price: string;
}

const PriceProjection: React.FC<PriceProjectionProps> = ({ label, price }) => (
  <div className="flex justify-between items-center mb-2">
    <p className="text-xs md:text-sm text-ui-grey-500">
      {label[0]}
      <span className="font-semibold">{label[1]}</span>
    </p>
    <p className="text-xs md:text-sm font-semibold">£{price}</p>
  </div>
);

export const PaymentSummary: React.FC = () => {
  const { selectedPackage, eeroSelection } = useJoinFlowStore();

  const { monthlyPaymentTitle, totalMonthlyPaymentTitle, eeroProductContent } =
    paymentConfirmationText;

  const pricing = usePricingCalculations(selectedPackage, eeroSelection);

  const eeroSelectionWithContent = hydrateEeroProductWithContent(
    eeroSelection,
    eeroProductContent,
  );

  if (!selectedPackage) {
    return null;
  }

  const annualPriceRise = sortAnnualPriceRiseByDate(
    selectedPackage.prices.broadbandAndCurrentExtras.annualPriceRise ?? [],
  );

  if (!annualPriceRise) {
    return null;
  }

  const nextPriceLabel =
    annualPriceRise.length > 0
      ? [
          `From ${formatDisplayDateMonthYear(annualPriceRise[0].date)} an increase of `,
          `£${Number(pricing.predictedTotalNext) - Number(pricing.monthlyTotal)}`,
        ]
      : null;

  const followingPriceLabel =
    annualPriceRise.length > 1
      ? [
          `From ${formatDisplayDateMonthYear(annualPriceRise[1].date)} an increase of `,
          `£${Number(pricing.predictedTotalFollowing) - Number(pricing.predictedTotalNext)}`,
        ]
      : null;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-lg md:rounded-md">
      <div className="flex flex-row justify-between items-center mb-6 md:mb-8">
        <h3 className="text-xs md:text-sm font-medium">
          {monthlyPaymentTitle}
        </h3>
        <img
          role="presentation"
          src={getAssetPath("/images/direct-debit.svg")}
          alt=""
          width={92}
        />
      </div>

      <LineItem
        title={pricing.packageName}
        price={pricing.discountedPrice || pricing.monthlyPackagePrice}
      />

      {eeroSelectionWithContent && (
        <LineItem
          title={eeroSelectionWithContent.heading}
          description={eeroSelectionWithContent.description}
          price={pricing.monthlyEeroPrice}
          isIncluded={pricing.monthlyEeroPrice === "0"}
        />
      )}

      <div className="border-t border-ui-grey-400 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs md:text-sm font-medium">
            {totalMonthlyPaymentTitle}
          </h3>
          <p className="text-xs md:text-sm font-semibold">
            £{pricing.discountedMonthlyTotal || pricing.monthlyTotal}
          </p>
        </div>
      </div>

      <div className="border-t border-ui-grey-400 pt-4 mt-4">
        {nextPriceLabel && (
          <PriceProjection
            label={nextPriceLabel}
            price={pricing.predictedTotalNext}
          />
        )}

        {followingPriceLabel && (
          <PriceProjection
            label={followingPriceLabel}
            price={pricing.predictedTotalFollowing}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
