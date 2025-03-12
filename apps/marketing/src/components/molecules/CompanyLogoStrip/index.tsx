"use client";
import { CompanyLogoStrip } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

// This will be fed in via the CMS
const logos = [
  {
    altText: "Money Saving Expert logo",
    width: "265",
    height: "25",
    imgSrc: getAssetPath("/images/money-saving-expert.svg"),
  },
  {
    altText: "Octopus Energy logo",
    width: "145",
    height: "50",
    imgSrc: getAssetPath("/images/octopus-energy.svg"),
  },
  {
    altText: "Ramblers logo",
    width: "180",
    height: "50",
    imgSrc: getAssetPath("/images/ramblers.svg"),
  },
  {
    altText: "Cycling UK logo",
    width: "138",
    height: "50",
    imgSrc: getAssetPath("/images/cycling-uk.svg"),
  },
  {
    altText: "Which logo",
    width: "200",
    height: "44",
    imgSrc: getAssetPath("/images/which.svg"),
  },
];

export const CompanyLogoStripWrapper = () => {
  return <CompanyLogoStrip logos={logos} backgroundColor="bg-ui-grey-100" />;
};
