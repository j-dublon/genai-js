"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { broadbandPackages } from "@store/mockData";
import type { BroadbandPackage } from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { useAddress } from "@/hooks/useAddress";
import {
  PackageSelectionFormValues,
  packageSelectionSchema,
} from "@/validation/join-flow-schema";

const PackageSelection = () => {
  const router = useRouter();
  const { selectPackage, setPriceIncreaseInfo } = useJoinFlowStore();

  const {
    selectedAddress,
    loading: addressLoading,
    error: addressError,
  } = useAddress({
    initialPostcode: "SW1A 2AA",
    autoFetch: true,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PackageSelectionFormValues>({
    resolver: zodResolver(packageSelectionSchema),
    defaultValues: {
      packageId: "",
    },
  });

  const onSubmit = (data: PackageSelectionFormValues) => {
    const selectedPackage = broadbandPackages.find(
      (pkg) => pkg.id === data.packageId,
    );

    if (selectedPackage) {
      setPriceIncreaseInfo({
        nextYearIncrease: 3.0,
        followingYearIncrease: 3.0,
      });

      selectPackage(selectedPackage);
      router.push("/join-flow/personal-details");
    }
  };

  const handlePackageClick = (pkg: BroadbandPackage) => {
    setValue("packageId", pkg.id);
    handleSubmit(onSubmit)();
  };

  const renderAddressInfo = () => {
    if (addressLoading) {
      return (
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 rounded-full animate-spin"></div>
            <p>Loading your address...</p>
          </div>
        </div>
      );
    }

    if (addressError) {
      return (
        <div className="p-4 border border-core-red rounded-md">
          <p className="text-red-600">{addressError}</p>
        </div>
      );
    }

    if (selectedAddress) {
      return (
        <div className="p-4">
          <h3 className="font-semibold mb-2">Your delivery address:</h3>
          <p>{selectedAddress.line1}</p>
          {selectedAddress.line2 && <p>{selectedAddress.line2}</p>}
          {selectedAddress.line3 && <p>{selectedAddress.line3}</p>}
          <p>{selectedAddress.postcode}</p>
        </div>
      );
    }

    return (
      <div className="p-4 border rounded-md">
        <p className="text-core-yellow">No address information available</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">{renderAddressInfo()}</div>

      <h1 className="text-3xl font-bold text-center mb-2">
        Choose Your Broadband Package
      </h1>
      <p className="text-center mb-8">
        Select the package that suits your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {broadbandPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold">{pkg.name}</h2>
              <div className="mt-2">
                <span className="text-3xl font-bold">£{pkg.price.monthly}</span>
                <span className="text-sm">/month</span>
              </div>
              <p className="mt-2 text-sm">
                {pkg.contractLength} month contract
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <div>
                  <p className="font-bold">{pkg.speed.download} Mbps</p>
                  <p className="text-sm">Download</p>
                </div>
                <div className="ml-auto">
                  <p className="font-bold">{pkg.speed.upload} Mbps</p>
                  <p className="text-sm">Upload</p>
                </div>
              </div>

              <p className="mb-4">{pkg.description}</p>

              <button
                onClick={() => handlePackageClick(pkg)}
                className="w-full py-3 font-bold rounded-md transition-colors"
              >
                Add to basket
              </button>
            </div>
          </div>
        ))}
      </div>

      {errors.packageId && (
        <p className="text-core-red mt-4 text-center">
          {errors.packageId.message}
        </p>
      )}
    </div>
  );
};

export default PackageSelection;
