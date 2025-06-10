import { BroadbandPackage, StoreAddress } from "@/store/useJoinFlowStore";

export const packageSelectionPageText = {
  pageTitle: "Pick the speed you need",
  pageSubtitle: "Your contract length",
  errorMessage: "Please select a package to continue",
  buttonText: "Add to bag",
  packageDetailsModalTitle: "Choose your contract length",
  toggleSwitchLabels: {
    left: "12-months",
    right: "24-months",
  },
  promotionSubtitle: "Full fibre speed",
  promotionText: "3 months free",
  promotionActive: true,
  promotionDetailsButton: "Is this plan for me?",
};

export const speedCalculatorText = {
  calculatorModalTitle: "Speed calculator",
  title: "Not sure which speed to go for?",
  subtitle:
    "Our super handy calculator will tell you which of our speeds is best for your household.",
  speedCalculatorButtonText: "I need help choosing",
};

export const broadbandPackages: BroadbandPackage[] = [
  {
    id: "c-150",
    name: "C-150",
    speed: {
      download: 150,
      upload: 30,
    },
    price: {
      monthly: 32,
      setup: 0,
    },
    priceIncrease: {
      nextIncrease: 3.0,
      followingIncrease: 3.0,
    },
    contractLength: 12,
    description: "Full fibre speed",
  },
  {
    id: "c-500",
    name: "C-500",
    speed: {
      download: 500,
      upload: 20,
    },
    price: {
      monthly: 37,
      setup: 0,
    },
    priceIncrease: {
      nextIncrease: 3.0,
      followingIncrease: 3.0,
    },
    contractLength: 12,
    description: "Full fibre speed",
  },
  {
    id: "c-900",
    name: "C-900",
    speed: {
      download: 900,
      upload: 100,
    },
    price: {
      monthly: 43,
      setup: 0,
    },
    priceIncrease: {
      nextIncrease: 3.0,
      followingIncrease: 3.0,
    },
    contractLength: 12,
    description: "Full fibre speed",
  },
  {
    id: "c-150",
    name: "C-150",
    speed: {
      download: 150,
      upload: 30,
    },
    price: {
      monthly: 30,
      setup: 0,
    },
    priceIncrease: {
      nextIncrease: 3.0,
      followingIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
  },
  {
    id: "c-500",
    name: "C-500",
    speed: {
      download: 500,
      upload: 20,
    },
    price: {
      monthly: 35,
      setup: 0,
    },
    priceIncrease: {
      nextIncrease: 3.0,
      followingIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
  },
  {
    id: "c-900",
    name: "C-900",
    speed: {
      download: 900,
      upload: 100,
    },
    price: {
      monthly: 41,
      setup: 0,
    },
    priceIncrease: {
      nextIncrease: 3.0,
      followingIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
  },
];

export const MOCK_ADDRESS: StoreAddress = {
  line1: "Test Address Line 1",
  line2: "Test Address Line 2",
  line3: "London",
  postcode: "SW1A 2AA",
  identifiers: [
    {
      value: "100023297500",
      scheme: "OSS_IDENTIFIER",
      id: "6819e3b812ed0117a8374d36",
    },
  ],
};
