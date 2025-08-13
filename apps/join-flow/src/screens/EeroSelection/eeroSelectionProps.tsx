import { LoadingModalSlide } from "@/hooks/useLoadingModal";
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
    code: "EERO_MESH_ROUTER_X0",
    heading: "No additional Eero needed",
    description: "Just one eero provided by us.",
    totalCount: 1,
    imageURL: getAssetPath("/images/x1_eeros.png"),
  },
  {
    code: "EERO_MESH_ROUTER_X1",
    heading: "Add one extra eero to your plan",
    description:
      "2 eeros will cover an area of approximately 380 square metres and is perfect for most UK homes.",
    totalCount: 2,
    imageURL: getAssetPath("/images/x2_eeros.png"),
  },
  {
    code: "EERO_MESH_ROUTER_X2",
    heading: "Add 2 extra eeros to your plan",
    description:
      "3 eero routers will cover an area of approximately 560 square metres, and is perfect for really large homes, multiple floors and connection outside.",
    totalCount: 3,
    imageURL: getAssetPath("/images/x3_eeros.png"),
  },
];

export const eeroPageContent = {
  nextStepPillText: "Switching & going live",
  title: "Get whole home mesh Wi-Fi",
  description: [
    "Multiple eeros can connect together to create a powerful mesh network – meaning amazing signal everywhere.",
    "Your plan comes with one eero included.",
    "Why not add more?",
  ],
  linkText: "mesh network",
  noAdditionalCostText: "No additional cost",
  monthlyCostSuffix: "/month",
  currencySymbol: "£",
  backButtonText: "Back",
  validationRequiredText: "Please select an eero product",
  validationInvalidText: "Please select a valid eero product",
  infoModalTitle: "TrueMesh explained",
  infoModalSubtitle:
    "Their patented TrueMesh technology lets multiple eeros work together to intelligently spread Wi-Fi throughout your home.",
  infoModalContent: [
    "This is particularly useful in larger homes, where the signal might have previously struggled to reach every room.",
    "The eeros constantly monitor the signal strength and adapt to make sure there are no weak areas or slow connections.",
    "When you join Cuckoo, you can add up to three eeros to create a TrueMesh connection for your home and say goodbye to dead spots. Woohoo!",
  ],
  infoModalImage: "/images/true-mesh.svg",
  modalButtonText: "Okay, got it",
  helpButtonText: "Help me decide",
  helpModalTitle: "How many eeros do I need?",
  helpModalSubtitle:
    "Not sure how many eeros to get? Here's a quick guide to help you choose.",
  helpModalContent: [
    {
      subtitle: "One eero covers up to 190 square metres.",
      description: "Perfect for a studio, small flat or smaller home.",
    },
    {
      subtitle: "Two eeros covers up to 380 square metres",
      description: "Ideal for medium-sized homes over a couple of floors.",
    },
    {
      subtitle: "Three eeros covers up to 560 square metres. ",
      description:
        "Best for larger homes, or if you have thick walls made of brick or stone. This will give you the very strongest signal.",
    },
  ],
  helpModalTipCardText:
    "Just so you know, you can add up to three eeros to your plan anytime on My Account or on the Cuckoo app.",
};

export const eeroChooseProductButtonText = {
  choose: "Choose",
  remove: "Remove",
};

export const eeroContinueButtonText = {
  next: "Next",
  continueButtonText: "No thanks, I only want 1 eero",
};

export const slides: LoadingModalSlide[] = [
  {
    src: "/images/world-animated.gif",
    message: "Figuring out how many Eeros will keep your nest connected.",
  },
  {
    src: "/images/sunglasses-animated.gif",
    message: "Making sure every room gets a cozy signal.",
  },
  {
    src: "/images/rocket-animated.gif",
    message: "Just checking which extras will give your broadband wings!",
  },
];
