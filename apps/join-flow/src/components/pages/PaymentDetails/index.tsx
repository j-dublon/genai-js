"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import DemoStepper from "@/components/molecules/DemoStepper";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import { PaymentDetailsFormValues } from "@/validation/join-flow-schema";

export const PaymentDetails = () => {
  const router = useRouter();
  const { selectedPackage, eeroSelection, setCurrentStep } = useJoinFlowStore();

  const { register, handleSubmit, errors, savePaymentDetails } =
    usePaymentForm();

  const monthlyPackagePrice = selectedPackage?.price.monthly || 0;
  const monthlyEeroPrice = eeroSelection?.price || 0;
  const monthlyTotal = monthlyPackagePrice + monthlyEeroPrice;

  const onSubmit = (data: PaymentDetailsFormValues) => {
    savePaymentDetails(data);
    setCurrentStep(5);
    router.push("/join-flow/order-summary");
    return true;
  };

  const handleBack = () => {
    setCurrentStep(4);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DemoStepper />

      <div className="max-w-4xl mx-auto">
        <div className="bg-core-white p-8 rounded-md">
          <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

          <div className="mb-6 bg-ui-grey-100 p-6 rounded-md border border-ui-grey-300">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">{selectedPackage?.name}</h2>
                <p className="text-ui-grey-500">
                  {selectedPackage?.speed.download} Mbps download /{" "}
                  {selectedPackage?.speed.upload} Mbps upload
                </p>
                {eeroSelection && eeroSelection.price > 0 && (
                  <p className="text-ui-grey-500 mt-1">
                    + {eeroSelection.name}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">£{monthlyTotal.toFixed(2)}</p>
                <p className="text-ui-grey-500">per month</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label
                    className="block text-core-black mb-2"
                    htmlFor="accountHolderName"
                  >
                    Account Holder Name
                  </label>
                  <input
                    {...register("accountHolderName", { required: true })}
                    id="accountHolderName"
                    className="w-full px-4 py-2 border border-ui-grey-300 rounded-md focus:outline-none"
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-500 text-sm mt-1">
                      Account holder name is required
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    className="block text-core-black mb-2"
                    htmlFor="accountNumber"
                  >
                    Account Number
                  </label>
                  <input
                    {...register("accountNumber", {
                      required: true,
                      maxLength: 8,
                      pattern: /^\d{8}$/,
                    })}
                    id="accountNumber"
                    placeholder="12345678"
                    className="w-full px-4 py-2 border border-ui-grey-300 rounded-md focus:outline-none"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      Valid 8-digit account number is required
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    className="block text-core-black mb-2"
                    htmlFor="sortCode"
                  >
                    Sort Code
                  </label>
                  <input
                    {...register("sortCode", {
                      required: true,
                      maxLength: 8,
                      pattern: /^\d{2}-\d{2}-\d{2}$/,
                    })}
                    id="sortCode"
                    placeholder="12-34-56"
                    className="w-full px-4 py-2 border border-ui-grey-300 rounded-md focus:outline-none"
                  />
                  {errors.sortCode && (
                    <p className="text-red-500 text-sm mt-1">
                      Valid sort code (xx-xx-xx) is required
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("sameAsServiceAddress")}
                      className="mr-2"
                    />
                    <span className="text-core-black">
                      Use service address as billing address
                    </span>
                  </label>
                </div>

                <div className="flex justify-between mt-8">
                  <Link href="/join-flow/one-touch-switching">
                    <Button onClick={handleBack} tint="white" variant="outline">
                      Back
                    </Button>
                  </Link>

                  <Button type="submit" tint="yellow" variant="solid">
                    Review Everything and Checkout
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
