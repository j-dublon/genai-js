import { Address, BroadbandPackage } from "@/store/useJoinFlowStore";

export const packageSelectionPageText = {
  pageTitle: "Pick the speed you need",
  pageSubtitle: "Your contract length",
  errorMessage: "Please select a package to continue",
  buttonText: "Add to bag",
};

export const speedCalculatorText = {
  title: "Not sure which speed to go for?",
  subtitle:
    "Our super handy calculator will tell you which of our speeds is best for your household.",
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
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
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
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
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
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
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
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
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
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
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
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 24,
    description: "Full fibre speed",
  },
];

export const MOCK_ADDRESS: Address = {
  line1: "Test Address Line 1",
  line2: "Test Address Line 2",
  line3: "London",
  postcode: "SW1A 2AA",
  addressKey: "A00063116639",
  addressKeyType: "NAD",
};
