import { useEffect, useRef, useState } from "react";

import EeroSelectionForm from "@/components/ReviewYourBasket/forms/eeroSelectionForm";
import PackageChangeForm, {
  PlanChangeFormData,
} from "@/components/ReviewYourBasket/forms/packageChangeForm";
import { paymentDetailsText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { BroadbandPackage, EeroProduct } from "@/store/useJoinFlowStore";

interface BasketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nextPage: { name: string };
  selectedPackage: BroadbandPackage;
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
}: BasketDialogProps) => {
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isManagingEeros, setIsManagingEeros] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      // Check if showModal is available (it won't be in test environment)
      if (
        dialogRef.current.showModal &&
        typeof dialogRef.current.showModal === "function"
      ) {
        if (!dialogRef.current.open) {
          dialogRef.current.showModal();
        }
      } else {
        // For test environment, set the open attribute manually
        dialogRef.current.setAttribute("open", "");
      }
    } else if (!isOpen && dialogRef.current) {
      if (
        dialogRef.current.close &&
        typeof dialogRef.current.close === "function"
      ) {
        if (dialogRef.current.open) {
          dialogRef.current.close();
        }
      } else {
        dialogRef.current.removeAttribute("open");
      }
    }
  }, [isOpen]);

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

  //TO DO: replace this from api
  const monthlyPackagePrice = selectedPackage.price.monthly;

  const monthlyEeroPrice = eeroSelection ? eeroSelection.price : 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;

  const predictedTotalNextYear =
    monthlyTotal + selectedPackage.priceIncrease.nextYearIncrease;
  const predictedTotalFollowingYear =
    monthlyTotal + selectedPackage.priceIncrease.followingYearIncrease;

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

  return (
    <dialog
      ref={dialogRef}
      className="relative bg-core-white rounded-lg w-full max-w-6xl mx-auto px-12 py-16 max-h-[90vh] overflow-y-auto"
      onClose={onClose}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold mb-6">{paymentDetailsText.title}</h2>
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
              {paymentDetailsText.yourAddress}{" "}
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
            {paymentDetailsText.broadbandPlan}{" "}
            <span className="text-sm font-medium text-ui-grey-500">
              {selectedPackage.name} {paymentDetailsText.fullFiber},{" "}
              {selectedPackage.speed.download}Mbps download speed,{" "}
              {selectedPackage.speed.upload}Mbps upload speed
            </span>{" "}
          </h3>

          {!isChangingPlan ? (
            <p
              className="text-tertiary-peach cursor-pointer"
              onClick={togglePlanChange}
            >
              {paymentDetailsText.changePlan}
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
            {paymentDetailsText.yourMeshNetwork}{" "}
            <span className="text-sm font-medium text-ui-grey-500">
              {eeroSelection
                ? eeroSelection.name
                : paymentDetailsText.standardEero}
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
                  {paymentDetailsText.addMoreEeros}
                </p>
              )}
              {eeroSelection && eeroSelection.id !== "no-additional-eero" && (
                <p
                  className="text-tertiary-peach cursor-pointer"
                  onClick={onEeroRemove}
                >
                  {paymentDetailsText.removeEeros}
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

      {/* Render the subtotal section if eeroSelection exists */}
      {eeroSelection && (
        <>
          <div className="border-t border-ui-grey-300 pt-4 my-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{paymentDetailsText.yourSubtotal}</h3>
            </div>
          </div>
          <div className="bg-ui-grey-100 p-4 rounded-md">
            {selectedPackage && (
              <div className="flex justify-between items-center text-sm">
                <h3 className="font-bold">
                  {selectedPackage.name} {paymentDetailsText.fullFiber}{" "}
                </h3>
                <p className="whitespace-nowrap font-medium">
                  £{selectedPackage.price.monthly}
                  <span className="font-normal">
                    {paymentDetailsText.perMonth}
                  </span>
                </p>
              </div>
            )}

            {eeroSelection && (
              <div className="border-t border-core-white mt-4">
                <div className="flex justify-between mt-4">
                  <h3 className="font-bold">{eeroSelection.name}</h3>

                  <p className="whitespace-nowrap font-medium">
                    £{eeroSelection.price}
                    <span className="font-normal">
                      {paymentDetailsText.perMonth}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-core-white mt-4">
              <div className="flex justify-between mt-4">
                <h3 className="font-bold">{paymentDetailsText.yourTotal}</h3>

                <div className="text-right">
                  <p className="whitespace-nowrap font-medium">
                    £{monthlyTotal}
                    <span className="font-normal">
                      {paymentDetailsText.afterFreePeriod}
                    </span>
                  </p>

                  <div className="mt-4">
                    <p className="whitespace-nowrap font-medium">
                      £{predictedTotalNextYear}
                      <span className="font-normal">
                        {paymentDetailsText.fromApril2025}
                      </span>
                    </p>
                    <p className="whitespace-nowrap font-medium mt-2">
                      £{predictedTotalFollowingYear}
                      <span className="font-normal">
                        {paymentDetailsText.fromApril2027}
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
        <p className="mb-2">{paymentDetailsText.addressWrong} </p>
        <p>
          <span
            onClick={() => onAddressChange()}
            className="text-tertiary-purple underline font-medium mr-2"
          >
            {paymentDetailsText.startAgain}
          </span>
          {paymentDetailsText.addressChangeWarning}
        </p>
      </div>
    </dialog>
  );
};
