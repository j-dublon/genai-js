import Link from "next/link";

import { getAssetPath } from "@/lib/get-asset-path";
import { EeroProduct } from "@/store/useJoinFlowStore";

export const eeroProducts: EeroProduct[] = [
  {
    id: "eero-6",
    name: "eero 6",
    heading: "Add one extra eero to your plan",
    description:
      "2 eeros will cover an area of approximately XXX square metres and is perfect for most UK homes.",
    totalCount: 2,
    imageURL: getAssetPath("/images/x2_eeros.png"),
    price: 7.0,
    isSelected: false,
  },
  {
    id: "eero-6-plus",
    name: "eero 6 Plus",
    heading: "Add 2 extra eeros to your plan",
    description:
      "3 eero routers will cover an area of approximately XXX square metres, and is perfect for really large homes, multiple floors and connection outside.",
    totalCount: 3,
    imageURL: getAssetPath("/images/x3_eeros.png"),
    price: 14.0,
    isSelected: false,
  },
];

export const eeroPageContent = {
  title: "Get whole home mesh Wi-Fi",
  description: (
    <>
      Multiple eeros can connect together to create a powerful{" "}
      <Link href="" className="font-medium underline text-ui-link">
        {" "}
        mesh network{" "}
      </Link>{" "}
      – meaning amazing signal everywhere.{" "}
      <span className="font-medium">
        Your plan comes with one eero included.
      </span>{" "}
      <a href="/add-more" target="_blank" rel="noopener noreferrer">
        Why not add more?
      </a>
    </>
  ),
  noAdditionalCostText: "No additional cost",
  monthlyCostSuffix: "/month",
  currencySymbol: "£",
  backButtonText: "Back",
  validationRequiredText: "Please select an eero product",
  validationInvalidText: "Please select a valid eero product",
};

export const eeroChooseProductButtonText = {
  choose: "Choose",
  remove: "Remove",
};

export const eeroContinueButtonText = {
  next: "Next",
  continueButtonText: "No thanks, I only want 1 eero",
};
