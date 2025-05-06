import { Button } from "@react-component-library/ui";
import React, { useEffect, useRef } from "react";

import useJoinFlowStore from "@/store/useJoinFlowStore";

export const ReviewYourBasket = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { selectedPackage, eeroSelection, serviceAddress } = useJoinFlowStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  //TO DO: we need confirmation on how to redirect a user
  if (!selectedPackage) {
    return (
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <p>Oops have you selected a package</p>
      </div>
    );
  }

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeDialog();
    }
  };

  return (
    <div className="w-full h-20 bg-ui-grey-100 flex items-center justify-end px-6">
      <Button variant="solid" size="small" tint="white" onClick={openDialog}>
        View Basket
      </Button>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 bg-core-black/40 bg-opacity-50 w-full h-full p-0 m-0"
        onClick={handleBackdropClick}
        aria-labelledby="dialog-title"
      >
        <div className="flex items-start justify-center w-full h-full pt-16">
          <div className="relative bg-core-white rounded-lg w-full max-w-6xl mx-auto px-12 py-16 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h2 id="dialog-title" className="text-2xl font-bold mb-6">
                Review my basket
              </h2>
              <button
                onClick={closeDialog}
                className="p-2 text-ui-grey-300 hover:text-black"
                aria-label="Close dialog"
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
                    Your address:{" "}
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
                  Broadband plan:{" "}
                  <span className="text-sm font-medium text-ui-grey-500">
                    {selectedPackage.name} full fibre,{" "}
                    {selectedPackage.speed.download} download speed,{" "}
                    {selectedPackage.speed.upload} upload speed
                  </span>{" "}
                </h3>
                <p className="text-tertiary-peach">Change my plan</p>
              </div>
            )}

            {eeroSelection && (
              <div className="border-t border-ui-grey-300 pt-4 mt-4">
                <h3 className="font-normal mb-4">
                  Your mesh network:{" "}
                  <span className="text-sm font-medium text-ui-grey-500">
                    {eeroSelection.name}
                  </span>
                </h3>
                <p className="mb-4">{eeroSelection.description}</p>
                <div className="flex gap-4">
                  <p className="text-tertiary-peach">Add more eeros</p>
                  <p className="text-tertiary-peach">Remove eeros</p>
                </div>
              </div>
            )}

            <div className="border-t border-ui-grey-300 pt-4 my-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Your Subtotal</h3>
              </div>
            </div>

            <div className="bg-ui-grey-100 p-4 rounded-md">
              {selectedPackage && (
                <div className="flex justify-between items-center text-sm font-medium text-ui-grey-500">
                  <p>{selectedPackage.name} full fibre </p>
                  <p className="whitespace-nowrap font-medium">
                    {/* TO DO: it might cost 0 pounds for the first three months for certain plans so this will have to be changed, it depends on the api */}
                    £{selectedPackage.price.monthly}
                    <span className="font-normal">/month</span>
                  </p>
                </div>
              )}

              {eeroSelection && (
                <div className="border-t border-core-white mt-4">
                  <div className="flex justify-between mt-4">
                    {eeroSelection.name}
                    <p className="whitespace-nowrap font-medium">
                      £{eeroSelection.price}
                      <span className="font-normal">/month</span>
                    </p>
                    {/* TO DO: There might be additional installation or setup fees here */}
                  </div>
                </div>
              )}

              <div className="border-t border-core-white mt-4">
                <div className="flex justify-between mt-4">
                  Your total
                  <p className="whitespace-nowrap font-medium">
                    <span className="font-normal">/month</span>
                  </p>
                  {/* TO DO: There might be additional installation or setup fees here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
