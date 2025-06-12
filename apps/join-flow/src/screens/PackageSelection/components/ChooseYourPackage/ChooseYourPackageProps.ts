import { StoreAddress } from "@/store/useJoinFlowStore";

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
