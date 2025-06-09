import { TextWithTickProps } from "@react-component-library/ui";

const defaultTickConfig = {
  backgroundColor: "white",
  className: "font-normal gap-4 md:gap-8",
  iconSize: 24,
  padding: "none",
} as const;

const tickItems = [
  { textInput: "First 3 months free" },
  {
    textInput: "eero Pro 6E router",
    additionalTextInput: "worth £249.00",
    additionalTextStyling: "font-medium",
  },
  { textInput: "£0 setup and installation" },
  { textInput: "UK-based customer service" },
  { textInput: "Ridiculously easy switching" },
  { textInput: "Transparent pricing - no hidden fees" },
  { textInput: "Advanced security" },
  { textInput: "Manage your accounts with our handy app" },
] as const;

export const tickListItems: TextWithTickProps[] = tickItems.map((item) => ({
  ...defaultTickConfig,
  ...item,
}));

export const moreInformationItems = [
  {
    question: "Cuckoo Full Fibre broadband packages",
    answer: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    question: "Broadband without a phone line",
    answer: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    question: "Cuckoo's enhanced security",
    answer: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    question: "eero routers and mesh",
    answer: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
];

export const upgradeOfferText = {
  upgradeOffer: "Plus, you'll get the first 3 months free",
  nextPrice: "From 1st April 2026",
  followingPrice: "From 1st April 2027",
  hideOfferButton: "No thanks",
  upgradeButton: "Upgrade me",
};
