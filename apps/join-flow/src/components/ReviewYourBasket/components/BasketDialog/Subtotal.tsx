import { ColorPill } from "@react-component-library/ui";
import { Tag } from "@react-component-library/ui/icons";

import { PricingCalculations } from "@/hooks/usePricingCalculations";
import { formatDisplayDateMonthYear } from "@/lib/formatDate";
import { EeroProduct, StoreSelectedPackage } from "@/store/useJoinFlowStore";

export const Subtotal = ({
  pricing,
  offerText,
  pricingText,
  selectedPackage,
  eeroSelection,
}: {
  offerText?: string;
  selectedPackage: StoreSelectedPackage;
  eeroSelection: EeroProduct;
  pricing: PricingCalculations;
  pricingText: {
    title: string;
    subtitle: string;
    perMonth: string;
    contractText: string;
    eeroRouters: string;
    installationText: string;
    fullFiber: string;
    discountPeriodText: string;
    afterDiscountPeriod: string;
    afterText: string;
  };
}) => {
  const {
    title,
    subtitle,
    perMonth,
    eeroRouters,
    fullFiber,
    installationText,
    contractText,
    afterDiscountPeriod,
    discountPeriodText,
    afterText,
  } = pricingText;

  const {
    discountedPrice,
    monthlyPackagePrice,
    monthlyEeroPrice,
    monthlyTotal,
    predictedTotalNext,
    predictedTotalFollowing,
  } = pricing;

  if (!selectedPackage || !eeroSelection) return null;

  const nextYearsIncreaseDate =
    selectedPackage.prices.annualPriceRise?.[0]?.date;
  const followingYearsIncreaseDate =
    selectedPackage.prices.annualPriceRise?.[1]?.date;

  const hasDiscountedPrice = discountedPrice !== monthlyPackagePrice;

  return (
    <>
      <h2 className="font-semibold text-sm leading-[1.6]">{title}</h2>
      <div className="flex flex-col gap-4 bg-ui-grey-100 p-5 md:p-8 rounded-lg text-xs md:text-sm font-semibold leading-[1.6]">
        <div
          data-testid="package-pricing"
          className="flex flex-col gap-2 md:gap-18 md:flex-row"
        >
          <div className="flex flex-col md:w-1/2">
            <p>{`${selectedPackage.frontendIdentifier} ${fullFiber}`} </p>
            <p className="hidden md:block">
              {`${selectedPackage.termMonths}${contractText}`}
            </p>
          </div>
          <div className="flex flex-col md:w-1/2 gap-2">
            <p>
              £{hasDiscountedPrice ? discountedPrice : monthlyPackagePrice}
              <span className="font-normal">
                {hasDiscountedPrice ? discountPeriodText : perMonth}
              </span>
            </p>
            {hasDiscountedPrice && (
              <p>
                £{monthlyPackagePrice}
                <span className="font-normal">{`${afterText}`}</span>
              </p>
            )}
          </div>
        </div>
        <hr className="border-core-white" />
        <div data-testid="eero-pricing" className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-2 md:gap-18">
            <p className="md:w-1/2">{`x${eeroSelection.totalCount} ${eeroRouters}`}</p>
            <p className="md:w-1/2">
              £{monthlyEeroPrice}
              <span className="font-normal">{perMonth}</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-18">
            <p className="md:w-1/2">{installationText}</p>
            <p className="md:w-1/2">£0</p>
          </div>
        </div>
        <hr className="border-core-white" />
        <div
          data-testid="total-pricing"
          className="flex flex-col md:flex-row gap-4 md:gap-18"
        >
          <div className="flex flex-col md:w-1/2 gap-4">
            <p>{subtitle}</p>
            {offerText && (
              <ColorPill
                icon={<Tag />}
                colorPillText={offerText}
                backgroundColor="white"
                size="small"
                className="bg-offer-gradient"
                textClassName="font-medium text-xxs md:text-xs"
              />
            )}
          </div>
          <div className="flex flex-col md:w-1/2 gap-2">
            <p>
              £{monthlyTotal}
              <span className="font-normal">{`${hasDiscountedPrice ? afterDiscountPeriod : perMonth}`}</span>
            </p>
            {nextYearsIncreaseDate && (
              <p>
                £{predictedTotalNext}
                <span className="font-normal">{`${perMonth} from ${formatDisplayDateMonthYear(nextYearsIncreaseDate)}`}</span>
              </p>
            )}
            {followingYearsIncreaseDate && (
              <p>
                £{predictedTotalFollowing}
                <span className="font-normal">{`${perMonth} from ${formatDisplayDateMonthYear(followingYearsIncreaseDate)}`}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
