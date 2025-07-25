"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { hydrateEeroProductWithContent } from "@/lib/createEeroOptions";
import { formatDisplayDate } from "@/lib/formatDate";
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
    <div>
      <h3 className="font-medium">{title}</h3>
      {description && <p className="text-sm text-ui-grey-500">{description}</p>}
    </div>
    <div className="text-right">
      <p className="font-bold">{isIncluded ? "Included" : `£${price}`}</p>
    </div>
  </div>
);

interface PriceProjectionProps {
  label: string;
  price: string;
}

const PriceProjection: React.FC<PriceProjectionProps> = ({ label, price }) => (
  <div className="flex justify-between items-center mb-2">
    <p className="text-sm text-ui-grey-500">{label}</p>
    <p className="font-bold">£{price}</p>
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
      ? `From ${formatDisplayDate(annualPriceRise[0].date)}`
      : null;

  const followingPriceLabel =
    annualPriceRise.length > 1
      ? `From ${formatDisplayDate(annualPriceRise[1].date)}`
      : null;

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold mb-4">{monthlyPaymentTitle}</h3>

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

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{totalMonthlyPaymentTitle}</h3>
          <p className="font-bold">
            £{pricing.discountedMonthlyTotal || pricing.monthlyTotal}
          </p>
        </div>
      </div>

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
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
