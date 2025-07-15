"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import Link from "next/link";
import React from "react";

export const OrderSummary = () => {
  const { personalDetails, resetFlow, resetAffiliateSession } =
    useJoinFlowStore();

  const handleStartNewOrder = () => {
    resetAffiliateSession();
    resetFlow();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-core-black mb-2">Wooohoo!</h1>
          <h1 className="text-3xl font-bold text-core-black mb-2">
            Welcome to the flock {personalDetails && personalDetails.firstName}!
          </h1>
        </div>

        <div className="text-center">
          <Link href="/join-flow">
            <Button
              type="submit"
              tint="yellow"
              variant="solid"
              onClick={handleStartNewOrder}
            >
              Start a New Order
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
