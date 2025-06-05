"use client";

import { LegalClaims } from "@react-component-library/ui/server";

import { ChooseYourPackage } from "@/screens/PackageSelection/components/ChooseYourPackage";
import { HeroBanner } from "@/screens/PackageSelection/components/HeroBanner";
import { NavWrapper } from "@/screens/PackageSelection/components/NavWrapper";
import { NotReadyToJoin } from "@/screens/PackageSelection/components/NotReadyToJoin";
import { Reminders } from "@/screens/PackageSelection/components/Reminders";

const PackageSelection = () => {
  return (
    <>
      <NavWrapper />
      <HeroBanner />
      <ChooseYourPackage />
      <Reminders />
      <NotReadyToJoin />
      <LegalClaims backgroundColor="grey-100" />
    </>
  );
};

export default PackageSelection;
