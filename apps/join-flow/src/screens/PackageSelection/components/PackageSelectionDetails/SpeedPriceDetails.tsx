import { Arrow } from "@react-component-library/ui/icons";

import { sortAnnualPriceRiseByDate } from "@/lib/sortAnnualPriceRise";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

export const SpeedPriceDetails = ({
  pkg,
  promotion,
}: {
  pkg: StoreSelectedPackage;
  promotion: boolean;
}) => {
  const { speeds, prices } = pkg;
  const { download, upload } = speeds;
  const { basePrice, annualPriceRise } = prices;

  const sortedPriceRises = sortAnnualPriceRiseByDate(annualPriceRise);

  const monthly = Math.round(basePrice / 100);

  const nextYearPrice = sortedPriceRises?.[0]?.price || basePrice;
  const followingYearPrice =
    sortedPriceRises?.[1]?.price || sortedPriceRises?.[0]?.price || basePrice;

  const nextYearMonthly = Math.round(nextYearPrice / 100);
  const followingYearMonthly = Math.round(followingYearPrice / 100);

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
                {promotion ? "0" : monthly}
              </span>
              {promotion ? (
                <span className="text-ui-grey-500">/for 3 months</span>
              ) : (
                "/monthly"
              )}
            </p>
            {promotion && (
              <p
                className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-core-black"
                aria-label="Price after promotion"
              >
                <span className="font-semibold">£{monthly}</span>/month from
                then onwards
              </p>
            )}
          </div>
          <hr className="border-t-[2px] text-core-white mx-8 md:mx-0" />
          <div className="pt-4 px-8 pb-6 md:pb-4 flex flex-col gap-2">
            <p
              className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-ui-grey-500"
              aria-label="Price next year"
            >
              <span className="font-semibold text-core-black">
                £{nextYearMonthly}
              </span>
              /month from April 2026
            </p>
            <p
              className="text-sm md:text-md leading-[1.6] md:leading-[1.5] text-ui-grey-500"
              aria-label="Price following year"
            >
              <span className="font-semibold text-core-black">
                £{followingYearMonthly}
              </span>
              /month from April 2027
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
