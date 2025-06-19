import { Button } from "@react-component-library/ui";
import { ChevronVerticalWithCircle } from "@react-component-library/ui/icons";

import { reviewYourBasketText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { formatDisplayDateMonthYear, nextApril } from "@/lib/formatDate";
import { formatPriceHideZeroPence } from "@/lib/formatPriceHideZeroPence";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

interface SummaryBarProps {
  selectedPackage: StoreSelectedPackage | null;
  isDialogOpen: boolean;
  predictedTotalNext: number;
  openDialog: () => void;
}

export const SummaryBar: React.FC<SummaryBarProps> = ({
  selectedPackage,
  isDialogOpen,
  predictedTotalNext,
  openDialog,
}) => {
  if (!selectedPackage) {
    return null;
  }

  const annualPriceRise = selectedPackage.prices?.annualPriceRise ?? [];
  const nextPriceDate = annualPriceRise[0]?.date;

  return (
    <div
      data-testid="summary-bar"
      className={`${isDialogOpen ? "hidden" : "w-full fixed top-20 left-0 z-49 shadow-lg bg-core-white  border-ui-grey-300 border-y lg:border-0 px-5 lg:px-0 py-3 md:py-5 lg:bg-ui-grey-100"}`}
    >
      <div className="w-full max-w-[1118px] flex items-center justify-center mx-auto">
        <div className="flex items-center w-full max-w-100 lg:max-w-none gap-2 sm:gap-6 lg:gap-0 justify-center lg:justify-between">
          <div className="flex items-center gap-2 lg:gap-6">
            <div className="hidden lg:flex lg:items-center lg:mr-5">
              <img
                alt="Cuckoo"
                src={reviewYourBasketText.eeroImage}
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
                  src={reviewYourBasketText.biDirectionalImage}
                  className="w-[15px] h-[9px]"
                />
                <p>
                  {selectedPackage.speeds.download}Mbps upload & download speed
                </p>
              </div>
            </div>

            <div className="whitespace-nowrap font-semibold text-sm lg:text-md hidden lg:flex lg:flex-col">
              <p>
                {selectedPackage.termMonths}/month{" "}
                <span className="font-normal text-xs lg:text-sm">contract</span>
              </p>
              <div className="text-xxs leading-[1.6]">
                {/* TODO: This needs to come from offers on the selectedPackage */}
                <p>£150 Amazon gift card included</p>
              </div>
            </div>

            <div className="flex flex-col whitespace-nowrap font-semibold text-sm lg:text-md">
              <p>
                {formatPriceHideZeroPence(selectedPackage.prices.basePrice)}
                <span className="font-normal text-xs lg:text-sm">/month</span>
              </p>
              <div className="text-xxs hidden lg:flex leading-[1.6]">
                <p>
                  £{predictedTotalNext}/month from{" "}
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
