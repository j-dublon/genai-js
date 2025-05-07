import { useEffect, useRef, useState } from "react";

import EeroSelectionForm from "@/components/ReviewYourBasket/forms/eeroSelectionForm";
import PackageChangeForm, {
  PlanChangeFormData,
} from "@/components/ReviewYourBasket/forms/packageChangeForm";
import { reviewYourBasketText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { BroadbandPackage, EeroProduct } from "@/store/useJoinFlowStore";

interface BasketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: BroadbandPackage | null;
  eeroSelection: EeroProduct | null;
  availablePackages: BroadbandPackage[];
  eeroProducts: EeroProduct[];
  serviceAddress: {
    line1: string;
    line2?: string;
    line3?: string;
  } | null;
  onPlanChange: (data: PlanChangeFormData) => void;
  onEeroSelect: (product: EeroProduct) => void;
  onEeroRemove: () => void;
  onAddressChange: () => void;
  monthlyPackagePrice: number;
  monthlyEeroPrice: number;
  monthlyTotal: number;
  predictedTotalNextYear: number;
  predictedTotalFollowingYear: number;
}

export const BasketDialog = ({
  isOpen,
  onClose,
  selectedPackage,
  eeroSelection,
  availablePackages,
  eeroProducts,
  serviceAddress,
  onPlanChange,
  onEeroSelect,
  onEeroRemove,
  onAddressChange,
  monthlyPackagePrice,
  monthlyEeroPrice,
  monthlyTotal,
  predictedTotalNextYear,
  predictedTotalFollowingYear,
}: BasketDialogProps) => {
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isManagingEeros, setIsManagingEeros] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const getEeroDescription = () => {
    if (!eeroSelection || eeroSelection.id === "no-additional-eero") {
      return "Standard setup with one eero device";
    } else if (eeroSelection.id === "eero-6") {
      return "Enhanced coverage with one additional eero (2 total)";
    } else if (eeroSelection.id === "eero-6-plus") {
      return "Maximum coverage with two additional eeros (3 total)";
    }
    return eeroSelection.description;
  };

  const togglePlanChange = () => {
    setIsChangingPlan(!isChangingPlan);
  };

  const toggleManageEeros = () => {
    setIsManagingEeros(!isManagingEeros);
  };

  const handlePlanChangeSubmit = (data: PlanChangeFormData) => {
    onPlanChange(data);
    setIsChangingPlan(false);
  };

  const handleSelectEero = (product: EeroProduct) => {
    onEeroSelect(product);
    setIsManagingEeros(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      <div
        className="fixed inset-0 bg-[rgba(31,31,31,0.4)]"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="fixed inset-x-0 bottom-0 top-[85px] flex items-start justify-center z-40 overflow-y-auto"
      >
        <div className="relative bg-core-white w-3/5 mx-auto shadow-lg">
          <div className="px-12 py-16">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold mb-6">
                {reviewYourBasketText.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-ui-grey-300 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            {serviceAddress && (
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-normal">
                    {reviewYourBasketText.yourAddress}{" "}
                    <span className="text-sm font-medium text-ui-grey-500">
                      {[
                        serviceAddress.line1,
                        serviceAddress.line2,
                        serviceAddress.line3,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>{" "}
                  </h3>
                </div>
              </div>
            )}

            {selectedPackage && (
              <div className="border-t border-ui-grey-300 pt-4 mt-4">
                <h3 className="font-normal mb-4">
                  {reviewYourBasketText.broadbandPlan}{" "}
                  <span className="text-sm font-medium text-ui-grey-500">
                    {selectedPackage.name} {reviewYourBasketText.fullFiber},{" "}
                    {selectedPackage.speed.download}Mbps download speed,{" "}
                    {selectedPackage.speed.upload}Mbps upload speed -{" "}
                    {selectedPackage.contractLength} months
                  </span>{" "}
                </h3>

                {!isChangingPlan ? (
                  <p
                    className="text-tertiary-peach cursor-pointer"
                    onClick={togglePlanChange}
                  >
                    {reviewYourBasketText.changePlan}
                  </p>
                ) : (
                  <PackageChangeForm
                    availablePackages={availablePackages}
                    onSubmit={handlePlanChangeSubmit}
                    onCancel={togglePlanChange}
                  />
                )}
              </div>
            )}

            {eeroSelection && (
              <div className="border-t border-ui-grey-300 pt-4 mt-4">
                <h3 className="font-normal mb-4">
                  {reviewYourBasketText.yourMeshNetwork}{" "}
                  <span className="text-sm font-medium text-ui-grey-500">
                    {eeroSelection
                      ? eeroSelection.name
                      : reviewYourBasketText.standardEero}
                  </span>
                </h3>
                <p className="mb-4">{getEeroDescription()}</p>

                {!isManagingEeros ? (
                  <div className="flex gap-4">
                    {(!eeroSelection ||
                      eeroSelection.id === "no-additional-eero" ||
                      eeroSelection.id === "eero-6") && (
                      <p
                        className="text-tertiary-peach cursor-pointer"
                        onClick={toggleManageEeros}
                      >
                        {reviewYourBasketText.addMoreEeros}
                      </p>
                    )}
                    {eeroSelection &&
                      eeroSelection.id !== "no-additional-eero" && (
                        <p
                          className="text-tertiary-peach cursor-pointer"
                          onClick={onEeroRemove}
                        >
                          {reviewYourBasketText.removeEeros}
                        </p>
                      )}
                  </div>
                ) : (
                  <EeroSelectionForm
                    eeroProducts={eeroProducts}
                    currentSelection={eeroSelection}
                    onSelect={handleSelectEero}
                    onCancel={toggleManageEeros}
                  />
                )}
              </div>
            )}

            {eeroSelection && (
              <>
                <div className="border-t border-ui-grey-300 pt-4 my-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">
                      {reviewYourBasketText.yourSubtotal}
                    </h3>
                  </div>
                </div>
                <div className="bg-ui-grey-100 p-4 rounded-md">
                  {selectedPackage && (
                    <div className="flex justify-between items-center text-sm">
                      <h3 className="font-bold">
                        {selectedPackage.name}{" "}
                        {reviewYourBasketText.fullFiber}{" "}
                      </h3>
                      <p className="whitespace-nowrap font-medium">
                        £{monthlyPackagePrice}
                        <span className="font-normal">
                          {reviewYourBasketText.perMonth}
                        </span>
                      </p>
                    </div>
                  )}

                  {eeroSelection && (
                    <div className="border-t border-core-white mt-4">
                      <div className="flex justify-between mt-4">
                        <h3 className="font-bold">{eeroSelection.name}</h3>

                        <p className="whitespace-nowrap font-medium">
                          £{monthlyEeroPrice}
                          <span className="font-normal">
                            {reviewYourBasketText.perMonth}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-core-white mt-4">
                    <div className="flex justify-between mt-4">
                      <h3 className="font-bold">
                        {reviewYourBasketText.yourTotal}
                      </h3>

                      <div className="text-right">
                        <p className="whitespace-nowrap font-medium">
                          £{monthlyTotal}
                          <span className="font-normal">
                            {reviewYourBasketText.afterFreePeriod}
                          </span>
                        </p>

                        <div className="mt-4">
                          <p className="whitespace-nowrap font-medium">
                            £{predictedTotalNextYear}
                            <span className="font-normal">
                              {reviewYourBasketText.fromApril2025}
                            </span>
                          </p>
                          <p className="whitespace-nowrap font-medium mt-2">
                            £{predictedTotalFollowingYear}
                            <span className="font-normal">
                              {reviewYourBasketText.fromApril2027}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="mt-6 flex-col justify-between">
              <p className="mb-2">{reviewYourBasketText.addressWrong} </p>
              <p>
                <span
                  onClick={() => onAddressChange()}
                  className="text-tertiary-purple underline font-medium mr-2"
                >
                  {reviewYourBasketText.startAgain}
                </span>
                {reviewYourBasketText.addressChangeWarning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
