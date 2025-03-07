"use client";
import { CompanyLogoStrip } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

// This will be fed in via the CMS
const logos = [
  {
    altText: "Broadband genie logo",
    width: "100",
    height: "100",
    imgSrc: getAssetPath("/images/broadband-genie.svg"),
  },
  {
    altText: "Compare the market logo",
    width: "100",
    height: "100",
    imgSrc: getAssetPath("/images/compare-the-market.svg"),
  },
  {
    altText: "Go compare logo",
    width: "100",
    height: "100",
    imgSrc: getAssetPath("/images/go-compare.svg"),
  },
  {
    altText: "Money supermarket logo",
    width: "100",
    height: "100",
    imgSrc: getAssetPath("/images/money-supermarket.svg"),
  },
  {
    altText: "Which logo",
    width: "100",
    height: "100",
    imgSrc: getAssetPath("/images/which.svg"),
  },
];

export const CompanyLogoStripWrapper = () => {
  return <CompanyLogoStrip logos={logos} backgroundColor="bg-ui-grey-200" />;
};
