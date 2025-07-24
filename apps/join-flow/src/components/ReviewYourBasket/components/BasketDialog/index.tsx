import { LoadingModal, useClickOutside } from "@react-component-library/ui";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  reviewYourBasketText,
  slides,
} from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { useLoadingModal } from "@/hooks/useLoadingModal";
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
  pricing: PricingCalculations;
}

export const BasketDialog = ({
  isOpen,
  onClose,
  availablePackages,
  eeroProducts,
  onPlanChange,
  pricing,
}: BasketDialogProps) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [basketIsLoading, setBasketIsLoading] = useState(false);
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen: basketIsLoading,
    slides,
  });

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

  const handleAddressChange = () => {
    setBasketIsLoading(true);
    router.push("/join-flow");
  };

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
                      setBasketIsLoading={setBasketIsLoading}
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
                        setBasketIsLoading={setBasketIsLoading}
                      />
                      <hr className="border-ui-grey-300 bg-ui-grey-300 md:border-ui-grey-400 md:bg-ui-grey-400" />
                      <Subtotal
                        pricing={pricing}
                        selectedPackage={selectedPackage}
                        eeroSelection={eeroSelection}
                        eeroProducts={eeroProducts}
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
                          savingText: reviewYourBasketText.savingText,
                          promotionPillText:
                            reviewYourBasketText.promotionPillText,
                        }}
                      />
                    </>
                  )}
                  <RestartBasket
                    subtitle={reviewYourBasketText.addressWrong}
                    restartText={reviewYourBasketText.startAgain}
                    warningText={reviewYourBasketText.addressChangeWarning}
                    onRestart={handleAddressChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoadingModal
          slides={slidesWithAssetPath}
          loading={basketIsLoading}
          modalRef={loadingModalRef}
        />
      </div>
    </div>
  );
};
