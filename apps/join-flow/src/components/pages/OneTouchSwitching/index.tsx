"use client";

import { Button } from "@react-component-library/ui";
import { broadbandProviders, mockSwitchingResponse } from "@store/mockData";
import useJoinFlowStore, { SwitchingDetails } from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Stepper from "@/components/molecules/Stepper";
import { GoLiveDate } from "@/components/pages/GoLiveDate";

export const OneTouchSwitching = () => {
  const router = useRouter();
  const { setSwitchingDetails, switchingDetails, setCurrentStep } =
    useJoinFlowStore();

  const [selectedProvider, setSelectedProvider] = useState(
    switchingDetails?.currentProvider?.id || "",
  );

  const [isFetchingData, setIsFetchingData] = useState(false);
  const [showGoLiveDate, setShowGoLiveDate] = useState(false);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(e.target.value);
  };

  const handleContinue = async () => {
    if (!selectedProvider) {
      return;
    }

    setIsFetchingData(true);

    let switchData: SwitchingDetails = {
      isWillingToSwitch: true,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const provider = broadbandProviders.find(
        (p) => p.id === selectedProvider,
      );

      if (provider) {
        switchData = {
          ...switchData,
          currentProvider: provider,
          switchOrderReference: mockSwitchingResponse.switchOrderReference,
        };
      }
    } catch (error) {
      console.error("Error fetching switching data:", error);
    } finally {
      setIsFetchingData(false);
    }

    setSwitchingDetails(switchData);
    setShowGoLiveDate(true);
  };

  const handleBack = () => {
    setCurrentStep(2);
    router.push("/join-flow/eero-selection");
  };

  const handleGoLiveDateBack = () => {
    setShowGoLiveDate(false);
  };

  if (showGoLiveDate) {
    return <GoLiveDate onBack={handleGoLiveDateBack} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Stepper />

      <div className="max-w-3xl mx-auto">
        <div className="bg-core-white p-8 rounded-md">
          <h1 className="text-2xl font-bold mb-2">Click. Switch. Done.</h1>
          <p className="text-ui-grey-500 mb-6">
            We&apos;ll let your provider know you&apos;ve switching to us so you
            don&apos;t have to. They&apos;ll tell you if there&apos;s any final
            charges or existing changes.
          </p>

          <div className="mb-8 p-5 border border-ui-grey-300 rounded-md bg-ui-grey-100">
            <h3 className="font-medium mb-3 text-core-black">
              Select your current broadband provider
            </h3>
            <select
              value={selectedProvider}
              onChange={handleProviderChange}
              className="w-full p-3 border border-ui-grey-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select a provider...
              </option>
              {broadbandProviders.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            <p className="mt-3 text-sm text-ui-grey-500">
              We&apos;ll use One Touch Switching to move your service to Cuckoo
            </p>
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} tint="white" variant="outline">
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!selectedProvider || isFetchingData}
              tint="yellow"
              variant="solid"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTouchSwitching;
