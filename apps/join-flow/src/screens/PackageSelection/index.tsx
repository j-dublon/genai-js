"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LegalClaims } from "@react-component-library/ui";
import type { Address, BroadbandPackage } from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";

import { useAddress } from "@/hooks/useAddress";
import { HeroBanner } from "@/screens/PackageSelection/components/HeroBanner";
import { NavWrapper } from "@/screens/PackageSelection/components/NavWrapper";
import { Reminders } from "@/screens/PackageSelection/components/Reminders";
import {
  PackageSelectionFormValues,
  packageSelectionSchema,
} from "@/validation/join-flow-schema";

import ChooseYourPackage from "./components/ChooseYourPackage";
import {
  broadbandPackages,
  packageSelectionPageText,
} from "./components/ChooseYourPackage/ChooseYourPackageProps";

const MOCK_ADDRESS: Address = {
  line1: "Test Address Line 1",
  line2: "Test Address Line 2",
  line3: "London",
  postcode: "SW1A 2AA",
  addressKey: "A00063116639",
  addressKeyType: "NAD",
};

const PackageSelection = () => {
  const { errorMessage } = packageSelectionPageText;
  const router = useRouter();
  const { selectPackage, setServiceAddress } = useJoinFlowStore();

  const { selectedAddress } = useAddress({
    initialPostcode: "SW1A 2AA",
    autoFetch: true,
  });

  useEffect(() => {
    if (selectedAddress) {
      const addressToSave: Address = {
        line1: selectedAddress.line1 || "",
        line2: selectedAddress.line2 || undefined,
        line3: selectedAddress.line3 || undefined,
        postcode: selectedAddress.postcode || "",
        addressKey: selectedAddress.addressKey || "",
        addressKeyType: selectedAddress.addressKeyType || "NAD",
      };

      setServiceAddress(addressToSave);
    }
  }, [selectedAddress, setServiceAddress]);

  const {
    setValue,
    formState: { errors },
  } = useForm<PackageSelectionFormValues>({
    resolver: zodResolver(packageSelectionSchema),
    defaultValues: {
      packageId: "",
    },
  });

  const handlePackageSelection = (packageId: string) => {
    const selectedPackage = broadbandPackages.find(
      (pkg) => pkg.id === packageId,
    );

    if (selectedPackage) {
      selectPackage(selectedPackage);

      if (!selectedAddress) {
        setServiceAddress(MOCK_ADDRESS);
      }

      router.push("/join-flow/personal-details");
    }
  };

  const handlePackageClick = (pkg: BroadbandPackage) => {
    setValue("packageId", pkg.id);
    handlePackageSelection(pkg.id);
  };

  return (
    <>
      <NavWrapper />
      <HeroBanner />
      <ChooseYourPackage
        errorMessage={errorMessage}
        hasError={!!errors.packageId}
        onPackageSelect={handlePackageClick}
      />
      <Reminders />
      <LegalClaims backgroundColor="grey-100" />
    </>
  );
};

export default PackageSelection;
