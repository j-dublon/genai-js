import Link from "next/link";

import { getAssetPath } from "@/lib/get-asset-path";

// TODO: This is a temporary type until we have the CMS setup
export type EeroContent = {
  code: string;
  heading: string;
  description: string;
  totalCount: number;
  imageURL: string;
};

export const eeroProducts: EeroContent[] = [
  {
    code: "EERO_MESH_ROUTER_X1",
    heading: "No additional Eero needed",
    description: "Just one eero provided by us.",
    totalCount: 1,
    imageURL: getAssetPath("/images/x1_eeros.png"),
  },
  {
    code: "EERO_MESH_ROUTER_X2",
    heading: "Add one extra eero to your plan",
    description:
      "2 eeros will cover an area of approximately XXX square metres and is perfect for most UK homes.",
    totalCount: 2,
    imageURL: getAssetPath("/images/x2_eeros.png"),
  },
  {
    code: "EERO_MESH_ROUTER_X3",
    heading: "Add 2 extra eeros to your plan",
    description:
      "3 eero routers will cover an area of approximately XXX square metres, and is perfect for really large homes, multiple floors and connection outside.",
    totalCount: 3,
    imageURL: getAssetPath("/images/x3_eeros.png"),
  },
];

export const eeroPageContent = {
  nextStepPillText: "Switching & going live",
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
