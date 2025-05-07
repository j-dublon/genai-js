import { Button } from "@react-component-library/ui";
import { ChevronVerticalWithCircle } from "@react-component-library/ui/icons";

import { reviewYourBasketText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";

interface SummaryBarProps {
  selectedPackage: {
    id: string;
    price: {
      monthly: number;
    };
    speed: {
      download: number;
    };
    priceIncrease: {
      nextYearIncrease: number;
      followingYearIncrease: number;
    };
  } | null;
  isDialogOpen: boolean;
  predictedTotalNextYear: number;
  openDialog: () => void;
}

export const SummaryBar: React.FC<SummaryBarProps> = ({
  selectedPackage,
  isDialogOpen,
  predictedTotalNextYear,
  openDialog,
}) => {
  if (!selectedPackage) {
    return (
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <p>Oops, have you selected a package?</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 shadow-lg bg-core-white border-b border-ui-grey-100 ${
        isDialogOpen ? "lg:bg-core-white" : "lg:bg-ui-grey-100"
      }`}
    >
      <div className="w-full max-w-7xl flex items-center justify-center px-4 py-4 mx-auto">
        <div className="flex items-center gap-6 md:gap-6 lg:gap-10">
          <div className="hidden  lg:flex items-center">
            <img
              alt="Cuckoo"
              src={reviewYourBasketText.eeroImage}
              className="w-[90px] h-[53px]"
            />
          </div>

          <div className="flex flex-col text-md whitespace-nowrap font-medium">
            <p>
              {selectedPackage.id.charAt(0).toUpperCase() +
                selectedPackage.id.slice(1)}{" "}
              <span className="font-normal">Full fibre broadband</span>
            </p>
            <div className="text-xxs items-center gap-2 hidden lg:flex">
              <img
                alt="Cuckoo"
                src={reviewYourBasketText.biDirectionalImage}
                className="w-[15px] h-[9px]"
              />
              <p>{selectedPackage.speed.download} upload and download speed</p>
            </div>
          </div>

          <div className="flex flex-col text-md whitespace-nowrap font-medium hidden lg:flex">
            <p>
              24-month <span className="font-normal">contract</span>
            </p>
            <div className="text-xxs">
              <p>£150 Amazon gift card included</p>
            </div>
          </div>

          <div className="flex flex-col text-md whitespace-nowrap font-medium">
            <p>
              £{selectedPackage.price.monthly}{" "}
              <span className="font-normal">/month</span>
            </p>
            <div className="text-xxs hidden lg:flex">
              <p>£{predictedTotalNextYear}/month from April 2026</p>
            </div>
          </div>
          {!isDialogOpen && (
            <>
              <div className="flex items-center ml-4 hidden lg:flex">
                <Button
                  variant="solid"
                  size="small"
                  tint="white"
                  onClick={openDialog}
                >
                  View Basket{" "}
                  <span className="pl-2">
                    <ChevronVerticalWithCircle
                      width={20}
                      height={20}
                      opacity={"1"}
                    />
                  </span>
                </Button>
              </div>
              <div className="flex items-center ml-4 lg:hidden">
                <span className="pl-2" onClick={openDialog}>
                  <ChevronVerticalWithCircle
                    width={20}
                    height={20}
                    opacity={"1"}
                  />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
