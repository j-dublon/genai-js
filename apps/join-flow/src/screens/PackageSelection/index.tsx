"use client";

import { LegalClaims } from "@react-component-library/ui/server";

import { HeroBanner } from "@/screens/PackageSelection/components/HeroBanner";
import { NavWrapper } from "@/screens/PackageSelection/components/NavWrapper";
import { Reminders } from "@/screens/PackageSelection/components/Reminders";

import { ChooseYourPackage } from "./components/ChooseYourPackage";

const PackageSelection = () => {
  return (
    <>
      <NavWrapper />
      <HeroBanner />
      <ChooseYourPackage />
      <Reminders />
      <LegalClaims backgroundColor="grey-100" />
    </>
  );
};

export default PackageSelection;
