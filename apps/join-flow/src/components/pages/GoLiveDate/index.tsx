"use client";

import { Button } from "@react-component-library/ui";
import { availableInstallationDates } from "@store/mockData";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import DemoStepper from "@/components/molecules/DemoStepper";

export const GoLiveDate = () => {
  const router = useRouter();
  const { setGoLiveDetails, goLiveDetails, setCurrentStep } =
    useJoinFlowStore();

  const [selectedDate, setSelectedDate] = useState(
    goLiveDetails?.selectedDate || "",
  );

  useEffect(() => {
    if (selectedDate && !goLiveDetails?.engineerSlot?.timeSlot) {
      const slots = availableInstallationDates.find(
        (d) => d.date === selectedDate,
      )?.slots;
      if (slots && slots.length > 0) {
        setSelectedSlot(slots[0].timeSlot);
      }
    }
  }, [selectedDate, goLiveDetails?.engineerSlot?.timeSlot]);

  const [selectedSlot, setSelectedSlot] = useState(
    goLiveDetails?.engineerSlot?.timeSlot || "",
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    const slots = availableInstallationDates.find(
      (d) => d.date === newDate,
    )?.slots;
    if (slots && slots.length > 0) {
      setSelectedSlot(slots[0].timeSlot);
    } else {
      setSelectedSlot("");
    }
  };

  const handleContinue = () => {
    if (!selectedDate) {
      return;
    }

    setGoLiveDetails({
      selectedDate,
      engineerSlot: {
        date: selectedDate,
        timeSlot: selectedSlot,
      },
    });

    setCurrentStep(5);
    router.push("/join-flow/payment-details");
  };

  const handleBack = () => {
    setCurrentStep(3);
    router.push("/join-flow/one-touch-switching");
  };

  const formatDate = (dateString: string) => {
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
      <DemoStepper />

      <div className="max-w-3xl mx-auto">
        <div className="bg-core-white p-8 rounded-md">
          <h1 className="text-2xl font-bold mb-2">Choose Your Go Live Date</h1>
          <p className="text-ui-grey-500 mb-6">
            Select when you&apos;d like your broadband service to be activated
          </p>

          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Available Dates</h2>
              <select
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-3 border border-ui-grey-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select an installation date...
                </option>
                {availableInstallationDates.map((dateOption) => (
                  <option key={dateOption.date} value={dateOption.date}>
                    {formatDate(dateOption.date)} ({dateOption.slots.length}{" "}
                    slots available)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} tint="white" variant="outline">
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!selectedDate}
              tint="yellow"
              variant="solid"
            >
              Continue to pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoLiveDate;
