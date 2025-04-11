import { EeroProduct } from "@/store/useJoinFlowStore";

export const eeroProducts: EeroProduct[] = [
  {
    id: "eero-6",
    name: "eero 6",
    description: "Add one extra eero",
    price: 5.0,
    isSelected: false,
  },
  {
    id: "eero-6-plus",
    name: "eero 6 Plus",
    description: "Add one two extra eeros",
    price: 7.5,
    isSelected: false,
  },
];

export const eeroPageContent = {
  title: "Choose Your WiFi Router",
  description:
    "Enhance your broadband with an eero mesh WiFi system for whole-home coverage",
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
  continueButtonText: "No thanks, I only want one eero",
};
