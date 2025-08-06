import { Button } from "@react-component-library/ui";
import { ChevronVerticalWithCircle } from "@react-component-library/ui/icons";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { createPromotionPillText } from "@/lib/createOfferContent";
import { formatDisplayDateMonthYear, nextApril } from "@/lib/formatDate";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { summaryBarProps } from "./summaryBarProps";

interface SummaryBarProps {
  isDialogOpen: boolean;
  openDialog: () => void;
}

export const SummaryBar: React.FC<SummaryBarProps> = ({
  isDialogOpen,
  openDialog,
}) => {
  const { selectedPackage, eeroSelection } = useJoinFlowStore();

  const formattedPricing = usePricingCalculations(
    selectedPackage,
    eeroSelection,
  );

  if (!selectedPackage) {
    return null;
  }

  const annualPriceRise =
    selectedPackage.prices?.broadband?.annualPriceRise ?? [];
  const nextPriceDate = annualPriceRise[0]?.date;

  const nonDiscountOffers = selectedPackage.offers?.filter(
    (offer) => offer.blockType !== "promotionBlock",
  );

  const promotionText = createPromotionPillText(nonDiscountOffers)?.[0];

  return (
    <div
      data-testid="summary-bar"
      className={`${isDialogOpen ? "hidden" : "w-full shadow-lg bg-core-white  border-ui-grey-300 border-y lg:border-0 px-5 lg:px-0 py-3 md:py-5 lg:bg-ui-grey-100"}`}
    >
      <div className="w-full max-w-[1118px] flex items-center justify-center mx-auto">
        <div className="flex items-center w-full max-w-100 lg:max-w-none gap-2 sm:gap-6 lg:gap-0 justify-center lg:justify-between">
          <div className="flex items-center gap-2 lg:gap-6">
            <div className="hidden lg:flex lg:items-center lg:mr-5">
              <img
                alt="Cuckoo"
                src={summaryBarProps.eeroImage}
                className="w-[111px] h-[72px]"
              />
            </div>
            <div className="flex flex-col whitespace-nowrap font-semibold text-sm lg:text-md">
              <p>
                {selectedPackage.frontendIdentifier}{" "}
                <span className="font-normal text-xs lg:text-sm">
                  Full fibre broadband
                </span>
              </p>
              <div className="text-xxs items-center gap-2 hidden lg:flex leading-[1.6]">
                <img
                  alt="Cuckoo"
                  src={summaryBarProps.biDirectionalImage}
                  className="w-[15px] h-[9px]"
                />
                <p>
                  {selectedPackage.speeds.download}Mbps upload & download speed
                </p>
              </div>
            </div>

            <div className="whitespace-nowrap font-semibold text-sm lg:text-md hidden lg:flex lg:flex-col">
              <p>
                {selectedPackage.termMonths}-month{" "}
                <span className="font-normal text-xs lg:text-sm">contract</span>
              </p>
              <div className="text-xxs leading-[1.6] min-h-[1.2rem]">
                {promotionText && <p>{promotionText} included</p>}
              </div>
            </div>

            <div className="flex flex-col whitespace-nowrap font-semibold text-sm lg:text-md">
              <p>
                £
                {formattedPricing.discountedPrice ||
                  formattedPricing.monthlyPackagePrice}
                <span className="font-normal text-xs lg:text-sm">/month</span>
              </p>
              <div className="text-xxs hidden lg:flex leading-[1.6]">
                <p>
                  £{formattedPricing.nextPrice}/month from{" "}
                  {nextPriceDate
                    ? formatDisplayDateMonthYear(nextPriceDate)
                    : nextApril(new Date())}
                </p>
              </div>
            </div>
          </div>
          <div className="items-center lg:ml-4 hidden lg:flex">
            <Button
              variant="solid"
              size="small"
              tint="white"
              onClick={openDialog}
              className="px-8 py-3"
            >
              <span className="lg:pr-2">View Basket</span>
              <ChevronVerticalWithCircle
                width={20}
                height={20}
                borderColor="#1F1F1F"
              />
            </Button>
          </div>
          <button className="flex items-center lg:hidden" onClick={openDialog}>
            <ChevronVerticalWithCircle
              width={24}
              height={24}
              borderColor="#1F1F1F"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
