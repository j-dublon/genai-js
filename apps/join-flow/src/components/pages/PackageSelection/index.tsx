"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTrustpilotScore } from "@react-component-library/ui";
import { broadbandPackages } from "@store/mockData";
import type { BroadbandPackage } from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { HeroBanner } from "@/components/molecules/HeroBanner";
import { NavWrapper } from "@/components/molecules/NavWrapper";
import { Reminders } from "@/components/organisms/Reminders";
import {
  PackageSelectionFormValues,
  packageSelectionSchema,
} from "@/validation/join-flow-schema";

const PackageSelection = () => {
  const router = useRouter();
  const { data: trustpilotRating } = useTrustpilotScore();
  const { selectPackage } = useJoinFlowStore();

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
      selectPackage(selectedPackage);
      router.push("/join-flow/personal-details");
    }
  };

  const handlePackageClick = (pkg: BroadbandPackage) => {
    setValue("packageId", pkg.id);
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <NavWrapper />
      <HeroBanner
        trustScore={trustpilotRating?.trustScore}
        numberOfReviews={trustpilotRating?.numberOfReviews}
      />
      <section className="bg-ui-grey-100 px-mobile sm:px-tablet lg:px-desktop py-12">
        <div className="md:max-w-[1152px] mx-auto">
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
                    <span className="text-3xl font-bold">
                      £{pkg.price.monthly}
                    </span>
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
      </section>
      <Reminders />
    </>
  );
};

export default PackageSelection;
