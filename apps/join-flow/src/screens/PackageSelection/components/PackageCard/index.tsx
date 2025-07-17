import { PromotionCard } from "@react-component-library/ui";
import { ArrowWithCircle } from "@react-component-library/ui/icons";

import { convertPenceToPounds } from "@/hooks/usePricingCalculations";
import { createPromotionPillText } from "@/lib/createPromotionPillText";
import { packageSelectionPageText } from "@/screens/PackageSelection/components/ChooseYourPackage/ChooseYourPackageProps";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

interface PackageCardProps {
  pkg: StoreSelectedPackage;
  onPackageSelect: (pkg: StoreSelectedPackage) => void;
  onViewDetails?: (pkg: StoreSelectedPackage) => void;
  tint: "pink" | "blue" | "yellow";
  buttonText: string;
  className?: string;
  featurePackage?: boolean;
}

export const PackageCard = ({
  pkg,
  onPackageSelect,
  onViewDetails,
  tint,
  buttonText,
  className = "",
  featurePackage = false,
}: PackageCardProps) => {
  const features = [
    {
      icon: <ArrowWithCircle direction="down" />,
      value: pkg.speeds.download,
      label: "download speed",
      unit: "Mbps",
    },
    {
      icon: <ArrowWithCircle direction="up" />,
      value: pkg.speeds.upload,
      label: "upload speed",
      unit: "Mbps",
    },
  ];

  const additionalPrices: { price: number; label: string; date: string }[] = [];
  const promotionPillsText = createPromotionPillText(pkg.offers);

  if (pkg.prices.annualPriceRise?.[0]?.price) {
    additionalPrices.push({
      price: convertPenceToPounds(pkg.prices.annualPriceRise[0].price),
      label: "From",
      date: pkg.prices.annualPriceRise[0].date,
    });
  }
  if (pkg.prices.annualPriceRise?.[1]?.price) {
    additionalPrices.push({
      price: convertPenceToPounds(pkg.prices.annualPriceRise[1].price),
      label: "From",
      date: pkg.prices.annualPriceRise[1].date,
    });
  }

  return (
    <PromotionCard
      heading={pkg.frontendTitle}
      subtitle={packageSelectionPageText.promotionSubtitle}
      features={features}
      mainPrice={convertPenceToPounds(pkg.prices.basePrice)}
      currency="£"
      priceLabel="/month"
      additionalPrices={additionalPrices}
      buttonText={buttonText}
      onButtonClick={() => onPackageSelect(pkg)}
      detailsButtonText={packageSelectionPageText.promotionDetailsButton}
      onDetailsClick={onViewDetails ? () => onViewDetails(pkg) : undefined}
      tint={tint}
      className={className}
      featured={featurePackage}
      promotionPillsText={promotionPillsText}
      data={{ ...pkg, id: pkg.id ?? undefined }}
    />
  );
};
