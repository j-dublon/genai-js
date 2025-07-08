"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { formatDisplayDate } from "@/lib/formatDate";
import { getAssetPath } from "@/lib/get-asset-path";
import { sortAnnualPriceRiseByDate } from "@/lib/sortAnnualPriceRise";

import { paymentConfirmationText } from "./PaymentConfirmationProps";

const formatPrice = (amount: number): string => `£${amount}`;

interface LineItemProps {
  title: string;
  description?: string;
  price: number | string;
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
      <p className="font-bold">
        {isIncluded
          ? "Included"
          : typeof price === "number"
            ? formatPrice(price)
            : price}
      </p>
    </div>
  </div>
);

interface PriceProjectionProps {
  label: string;
  price: number;
}

const PriceProjection: React.FC<PriceProjectionProps> = ({ label, price }) => (
  <div className="flex justify-between items-center mb-2">
    <p className="text-sm text-ui-grey-500">{label}</p>
    <p className="font-bold">{formatPrice(price)}</p>
  </div>
);

export const PaymentSummary: React.FC = () => {
  const { selectedPackage, eeroSelection } = useJoinFlowStore();

  const { monthlyPaymentTitle, totalMonthlyPaymentTitle } =
    paymentConfirmationText;

  const pricing = usePricingCalculations(selectedPackage, eeroSelection);

  if (!selectedPackage) {
    return null;
  }

  const annualPriceRise = sortAnnualPriceRiseByDate(
    selectedPackage.prices.annualPriceRise ?? [],
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

  // TODO: Next PR - Sort out content/structures
  const mockEeroSelection = {
    imageURL: getAssetPath("/images/x1_eeros.png"),
    name: "Eero",
    description: "The best eero router",
    price: 700,
  };

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3 className="font-bold mb-4">{monthlyPaymentTitle}</h3>

      <LineItem
        title={pricing.packageName}
        price={pricing.monthlyPackagePrice}
      />

      {eeroSelection && (
        <LineItem
          title={mockEeroSelection.name}
          description={mockEeroSelection.description}
          price={pricing.monthlyEeroPrice}
          isIncluded={pricing.monthlyEeroPrice === 0}
        />
      )}

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{totalMonthlyPaymentTitle}</h3>
          <p className="font-bold">{formatPrice(pricing.monthlyTotal)}</p>
        </div>
      </div>

      <div className="border-t border-ui-grey-300 pt-4 mt-4">
        {nextPriceLabel && (
          <PriceProjection label={nextPriceLabel} price={pricing.nextPrice} />
        )}

        {followingPriceLabel && (
          <PriceProjection
            label={followingPriceLabel}
            price={pricing.followingPrice}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
