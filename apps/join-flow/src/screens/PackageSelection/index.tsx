"use client";

import { LegalClaims } from "@react-component-library/ui/server";

import { AffiliateHeaderBanner } from "@/components/AffiliateHeaderBanner";
import { ChooseYourPackage } from "@/screens/PackageSelection/components/ChooseYourPackage";
import { HeroBanner } from "@/screens/PackageSelection/components/HeroBanner";
import { NavWrapper } from "@/screens/PackageSelection/components/NavWrapper";
import { NotReadyToJoin } from "@/screens/PackageSelection/components/NotReadyToJoin";
import { Reminders } from "@/screens/PackageSelection/components/Reminders";

const PackageSelection = () => {
  return (
    <>
      <NavWrapper />
      <AffiliateHeaderBanner />
      <HeroBanner />
      <ChooseYourPackage />
      <Reminders />
      <NotReadyToJoin />
      <LegalClaims backgroundColor="yellow" className="ds:md:bg-ui-grey-100" />
    </>
  );
};

export default PackageSelection;
