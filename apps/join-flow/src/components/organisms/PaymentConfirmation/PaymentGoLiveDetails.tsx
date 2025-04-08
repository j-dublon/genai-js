"use client";

import useJoinFlowStore from "@store/useJoinFlowStore";
import React from "react";

import { formatDisplayDate } from "@/lib/formatDate";

export const PaymentGoLiveDetails = ({}) => {
  const { goLiveDetails } = useJoinFlowStore();

  const formattedSchedule = goLiveDetails?.engineerSlot
    ? `${formatDisplayDate(goLiveDetails.engineerSlot.date)} - ${goLiveDetails.engineerSlot.timeSlot}`
    : "";

  return (
    <div className="bg-ui-grey-100 p-6 rounded-md">
      <h3>
        <span className="font-bold">{formattedSchedule}</span>{" "}
        {/* TO DO: Change this logic after spike for redirection and confirmation from design */}
        <span className="font-normal text-ui-error">Change</span>
      </h3>
    </div>
  );
};

export default PaymentGoLiveDetails;
