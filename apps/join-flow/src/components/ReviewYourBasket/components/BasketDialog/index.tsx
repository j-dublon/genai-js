import { useClickOutside } from "@react-component-library/ui";
import { useEffect, useRef } from "react";

import { reviewYourBasketText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { PricingCalculations } from "@/hooks/usePricingCalculations";
import type { EeroOption } from "@/lib/createEeroOptions";
import useJoinFlowStore, {
  type StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

import { AddressInfo } from "./AddressInfo";
import { BasketHeader } from "./BasketHeader";
import { EeroInfo } from "./EeroInfo";
import { PackageInfo } from "./PackageInfo";
import { RestartBasket } from "./RestartBasket";
import { Subtotal } from "./Subtotal";

interface BasketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availablePackages: StoreSelectedPackage[];
  eeroProducts: EeroOption[];
  onPlanChange: (selectedPlanId: string) => Promise<void>;
  onAddressChange: () => void;
  pricing: PricingCalculations;
}

export const BasketDialog = ({
  isOpen,
  onClose,
  availablePackages,
  eeroProducts,
  onPlanChange,
  onAddressChange,
  pricing,
}: BasketDialogProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { serviceAddress, selectedPackage, eeroSelection } = useJoinFlowStore();

  const { yourMeshNetwork, addMoreEeros, removeEeros } = reviewYourBasketText;

  useClickOutside(modalRef, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      <div className="fixed inset-0 bg-[rgba(31,31,31,0.4)]" />
      <div className="fixed inset-x-0 bottom-0 top-20 flex items-start justify-center z-40 overflow-y-auto">
        <div
          ref={modalRef}
          className="relative w-full md:w-[80%] h-auto max-w-[1143px] mx-auto md:rounded-b-[50px] bg-ui-grey-100 md:bg-core-white"
        >
          <div className="py-3 px-5 md:py-10">
            <div className="w-full max-w-[713px] mx-auto flex flex-col gap-6 md:gap-16">
              <BasketHeader
                onClose={onClose}
                title={reviewYourBasketText.title}
              />
              <div
                id="review-your-basket-content"
                className="bg-core-white rounded-lg p-4 md:p-0"
              >
                <div className="border md:border-none border-ui-grey-300 rounded-lg p-4 md:p-0 flex flex-col gap-6 md:gap-8">
                  {serviceAddress && (
                    <AddressInfo
                      title={reviewYourBasketText.yourAddress}
                      address={serviceAddress}
                    />
                  )}
                  <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                  {selectedPackage && (
                    <PackageInfo
                      changePlanButtonText={reviewYourBasketText.changePlan}
                      broadbandPlanText={reviewYourBasketText.broadbandPlan}
                      planDescriptionText={reviewYourBasketText.fullFiber}
                      availablePackages={availablePackages}
                      onPlanChange={onPlanChange}
                      selectedPackage={selectedPackage}
                    />
                  )}
                  <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                  {eeroSelection && selectedPackage && (
                    <>
                      <EeroInfo
                        monthlyEeroPrice={pricing.monthlyEeroPrice}
                        eeroSelection={eeroSelection}
                        eeroProducts={eeroProducts}
                        eeroInfoText={{
                          title: yourMeshNetwork,
                          addMoreEeros,
                          removeEeros,
                        }}
                      />
                      <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                      <Subtotal
                        pricing={pricing}
                        selectedPackage={selectedPackage}
                        eeroSelection={eeroSelection}
                        eeroProducts={eeroProducts}
                        // TODO: offer text should be based on any applicable offers?
                        offerText={reviewYourBasketText.offerText}
                        pricingText={{
                          title: reviewYourBasketText.yourSubtotal,
                          subtitle: reviewYourBasketText.yourTotal,
                          fullFiber: reviewYourBasketText.fullFiber,
                          perMonth: reviewYourBasketText.perMonth,
                          eeroRouters: reviewYourBasketText.eeroRouters,
                          contractText: reviewYourBasketText.contractText,
                          installationText:
                            reviewYourBasketText.installationText,
                          discountPeriodText:
                            reviewYourBasketText.discountPeriodText,
                          afterText: reviewYourBasketText.afterText,
                          afterDiscountPeriod:
                            reviewYourBasketText.afterDiscountPeriod,
                        }}
                      />
                    </>
                  )}
                  <RestartBasket
                    subtitle={reviewYourBasketText.addressWrong}
                    restartText={reviewYourBasketText.startAgain}
                    warningText={reviewYourBasketText.addressChangeWarning}
                    onRestart={onAddressChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
