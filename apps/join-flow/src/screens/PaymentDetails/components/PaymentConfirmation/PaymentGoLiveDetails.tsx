import { TipCard, useClickOutside } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import React, { useRef, useState } from "react";

import { useClearFocus } from "@/hooks/useClearFocus";
import { formatDisplayDate } from "@/lib/formatDate";
import { getAssetPath } from "@/lib/get-asset-path";

import { paymentGoLiveText } from "./paymentGoLiveDetailsProps";
import { PaymentGoLiveModal } from "./PaymentGoLiveModal";

export const PaymentGoLiveDetails = ({}) => {
  const { goLiveDetails } = useJoinFlowStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { switchingDetails } = useJoinFlowStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  const closePaymentGoLiveModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  useClickOutside(modalRef, isModalOpen, closePaymentGoLiveModal);
  useClearFocus(modalRef, "close");

  if (!goLiveDetails) {
    return null;
  }

  const details = goLiveDetails;

  const formatTimeSlot = (timeSlot: typeof details.engineerTimeSlot) => {
    if (!timeSlot) return "";

    const startTime = new Date(timeSlot.startDateTime);
    const endTime = new Date(timeSlot.endDateTime);

    const formatTime = (date: Date) => {
      const hours = date.getHours();
      if (hours === 0) return "12am";
      if (hours < 12) return `${hours}am`;
      if (hours === 12) return "12pm";
      return `${hours - 12}pm`;
    };

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const formattedSchedule = details.engineerTimeSlot
    ? `${formatDisplayDate(details.selectedDate)} - ${formatTimeSlot(details.engineerTimeSlot)}`
    : formatDisplayDate(details.selectedDate);

  const handleChangeMyDetails = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

  const otsSwitchFailedOrSkipped =
    switchingDetails?.otsSwitchStatus === "OTS_FAILED" ||
    switchingDetails?.otsSwitchStatus === "SKIPPED";

  return (
    <>
      <div className="bg-ui-grey-100 p-6 rounded-md">
        <h3>
          <span className="font-bold">{formattedSchedule}</span>{" "}
          <button
            type="button"
            className="underline font-semibold text-ui-link cursor-pointer bg-transparent border-none p-0 mt-2"
            onClick={handleChangeMyDetails}
          >
            {paymentGoLiveText.changeText}
          </button>
        </h3>
        <div className="mt-4">
          <span className="font-bold">
            {paymentGoLiveText.textHightlight}{" "}
            <span className="font-normal">
              {otsSwitchFailedOrSkipped
                ? paymentGoLiveText.goLiveInstructionSkipped
                : paymentGoLiveText.goLiveInstruction}{" "}
              {paymentGoLiveText.pleaseRead}
            </span>{" "}
          </span>
          <a
            className="underline font-semibold text-ui-link cursor-pointer bg-transparent border-none p-0"
            href={paymentGoLiveText.switchingDetailsHref}
          >
            {paymentGoLiveText.switchingDetailsLabel}
          </a>
        </div>

        <TipCard
          image={getAssetPath("/images/linked-hands.svg")}
          backgroundColor="green"
          className="mb-4 items-center justify-center md:mb-6 md:w-full mt-6"
        >
          <span>
            <span className="text-xs text-ui-teal font-semibold md:text-sm">
              {paymentGoLiveText.tipCardHighlight}
            </span>{" "}
            {paymentGoLiveText.tipCardText}
          </span>
        </TipCard>
        <PaymentGoLiveModal
          modalRef={modalRef}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </div>
    </>
  );
};

export default PaymentGoLiveDetails;
