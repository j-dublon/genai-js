import { Arrow } from "@react-component-library/ui/icons";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { TermLength } from "@/lib/createOfferContent";
import { formatDisplayDateMonthYear } from "@/lib/formatDate";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

export const SpeedPriceDetails = ({ pkg }: { pkg: StoreSelectedPackage }) => {
  const { speeds } = pkg;
  const { download, upload } = speeds;

  const pricing = usePricingCalculations(pkg, null);
  const annualPriceRise = pkg.prices?.annualPriceRise ?? [];
  const nextPriceDate = annualPriceRise[0]?.date;
  const followingPriceDate = annualPriceRise[1]?.date;

  const discountPromotion = pkg.offers?.find(
    (offer) => offer.blockType === "promotionBlock",
  )?.promotion;

  return (
    <div className="flex flex-col gap-6 pb-2 md:pb-0">
      <div className="flex flex-col gap-4 md:gap-6">
        <h3 className="text-sm md:text-md font-medium">Our speed promise</h3>
        <div className="bg-ui-grey-100 rounded-lg flex flex-col px-8 py-6 text-sm md:text-md leading-[1.6] md:leading-[1.5]">
          <div
            className="flex flex-row items-center gap-2"
            aria-label="Upload speed"
          >
            <Arrow direction="up" className="w-4 h-5" color="#6F89FF" />
            <p className="text-ui-grey-500">
              <span className="font-semibold text-core-black">
                {upload}Mbps
              </span>{" "}
              upload speed
            </p>
          </div>
          <div
            className="flex flex-row items-center gap-2"
            aria-label="Download speed"
          >
            <Arrow direction="down" className="w-4 h-5" color="#009EA8" />
            <p className="text-ui-grey-500">
              <span className="font-semibold text-core-black">
                {download}Mbps
              </span>{" "}
              download speed
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-6">
        <h3 className="text-sm md:text-md font-medium">
          What you&apos;ll be paying
        </h3>
        <div className="bg-ui-grey-100 rounded-lg">
          <div className="pb-4 px-8 pt-6 md:pt-4 flex flex-col gap-2">
            <p
              className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-core-black"
              aria-label="Current monthly price"
            >
              £
              <span className="font-semibold text-[26px] md:text-3xl leading-[1.5]">
                {pricing.discountedPrice || pricing.monthlyPackagePrice}
              </span>
              {discountPromotion ? (
                <span className="text-ui-grey-500">
                  /for {TermLength[discountPromotion.term || "wholeContract"]}{" "}
                  months
                </span>
              ) : (
                "/monthly"
              )}
            </p>
            {discountPromotion && (
              <p
                className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-core-black"
                aria-label="Price after promotion"
              >
                <span className="font-semibold">
                  £{pricing.monthlyPackagePrice}
                </span>
                /month from then onwards
              </p>
            )}
          </div>
          <hr className="border-t-[2px] text-core-white mx-8 md:mx-0" />
          <div className="pt-4 px-8 pb-6 md:pb-4 flex flex-col gap-2">
            {nextPriceDate && (
              <p
                className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-ui-grey-500"
                aria-label="Price next displayed"
              >
                <span className="font-semibold text-core-black">
                  £{pricing.nextPrice}
                </span>
                /month from {formatDisplayDateMonthYear(nextPriceDate)}
              </p>
            )}
            {followingPriceDate && (
              <p
                className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-ui-grey-500"
                aria-label="Price following display"
              >
                <span className="font-semibold text-core-black">
                  £{pricing.followingPrice}
                </span>
                /month from {formatDisplayDateMonthYear(followingPriceDate)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
