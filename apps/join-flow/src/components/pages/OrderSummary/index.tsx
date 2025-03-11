"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import Link from "next/link";
import React from "react";

export const OrderSummary = () => {
  const {
    selectedPackage,
    personalDetails,
    eeroSelection,
    switchingDetails,
    goLiveDetails,
    resetFlow,
  } = useJoinFlowStore();

  const handleStartNewOrder = () => {
    resetFlow();
  };

  const monthlyPackagePrice = selectedPackage?.price.monthly || 0;
  const monthlyEeroPrice = eeroSelection?.price || 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-core-black mb-2">
            Order Complete!
          </h1>
        </div>

        <div className="bg-core-white p-8 rounded-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Your Package</h3>
              {selectedPackage && (
                <div className="mb-6">
                  <div className="border border-core-black rounded-md p-4">
                    <h4 className="font-bold text-core-black">
                      {selectedPackage.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-sm">
                          Download:{" "}
                          <span className="font-medium">
                            {selectedPackage.speed.download} Mbps
                          </span>
                        </div>
                        <div className="text-sm">
                          Upload:{" "}
                          <span className="font-medium">
                            {selectedPackage.speed.upload} Mbps
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          £{selectedPackage.price.monthly}/mo
                        </div>
                        <div className="text-sm">
                          {selectedPackage.contractLength} month contract
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <h3 className="font-bold text-lg mb-4">WiFi Router</h3>
              {eeroSelection && (
                <div className="mb-6">
                  <div className="border border-ui-grey-300 rounded-md p-4">
                    <h4 className="font-bold">{eeroSelection.name}</h4>
                    <p className="text-sm mt-1">{eeroSelection.description}</p>
                    <div className="mt-2 font-medium">
                      {eeroSelection.price > 0
                        ? `£${eeroSelection.price}/mo`
                        : "No additional cost"}
                    </div>
                  </div>
                </div>
              )}

              <h3 className="font-bold text-lg mb-4">Monthly Cost</h3>
              <div className="border border-ui-grey-300 rounded-md p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div>Broadband Package</div>
                    {eeroSelection && eeroSelection.price > 0 && (
                      <div>WiFi Router</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div>£{monthlyPackagePrice.toFixed(2)}/mo</div>
                    {eeroSelection && eeroSelection.price > 0 && (
                      <div>£{eeroSelection.price.toFixed(2)}/mo</div>
                    )}
                  </div>
                </div>
                <div className="border-t border-ui-grey-300 mt-3 pt-3 flex justify-between font-bold">
                  <div>Total</div>
                  <div>£{monthlyTotal.toFixed(2)}/mo</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Personal Details</h3>
              {personalDetails && (
                <div className="border border-ui-grey-300 rounded-md p-4 mb-6">
                  <div className="mb-3">
                    <div className="font-medium">Name</div>
                    <div>
                      {personalDetails.firstName} {personalDetails.lastName}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="font-medium">Contact</div>
                    <div>{personalDetails.email}</div>
                    <div>{personalDetails.phone}</div>
                  </div>
                  <div>
                    <div className="font-medium">Service Address</div>
                    {personalDetails.address && (
                      <>
                        <div>{personalDetails.address.line1}</div>
                        {personalDetails.address.line2 && (
                          <div>{personalDetails.address.line2}</div>
                        )}
                        {personalDetails.address.line3 && (
                          <div>{personalDetails.address.line3}</div>
                        )}
                        <div>{personalDetails.address.postcode}</div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <h3 className="font-bold text-lg mb-4">Installation</h3>
              {goLiveDetails && (
                <div className="border border-ui-grey-300 rounded-md p-4 mb-6">
                  <div className="mb-3">
                    <div className="font-medium">Installation Date</div>
                    <div>{formatDate(goLiveDetails.selectedDate)}</div>
                  </div>
                  {goLiveDetails.engineerSlot && (
                    <div>
                      <div className="font-medium">Time Slot</div>
                      <div>{goLiveDetails.engineerSlot.timeSlot}</div>
                    </div>
                  )}
                </div>
              )}

              <h3 className="font-bold text-lg mb-4">Switching Details</h3>
              {switchingDetails && (
                <div className="border border-ui-grey-300 rounded-md p-4 mb-6">
                  <div>
                    <div className="font-medium">
                      Switching from existing provider
                    </div>
                    <div>
                      {switchingDetails.isWillingToSwitch ? "Yes" : "No"}
                    </div>
                  </div>
                  {switchingDetails.isWillingToSwitch &&
                    switchingDetails.currentProvider && (
                      <div className="mt-3">
                        <div className="font-medium">Current Provider</div>
                        <div>{switchingDetails.currentProvider.name}</div>
                      </div>
                    )}
                  {switchingDetails.switchOrderReference && (
                    <div className="mt-3">
                      <div className="font-medium">Switch Order Reference</div>
                      <div>{switchingDetails.switchOrderReference}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/join-flow">
            <button
              onClick={handleStartNewOrder}
              className="px-6 py-3 bg-secondary-black text-core-black rounded-md"
            >
              Start a New Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
