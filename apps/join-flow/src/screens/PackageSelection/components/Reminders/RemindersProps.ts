import { TextWithTickProps } from "@react-component-library/ui";

export const heading = "A quick reminder of why you'll love Cuckoo";

export const reminders: TextWithTickProps[] = [
  {
    textInput: "Get 3 months' free with C-900",
    backgroundColor: "secondary-teal",
  },
  { textInput: "eero Pro router included (worth £249.99)", outline: true },
  { textInput: "Full fibre speeds up to 900Mbps", outline: true },
  { textInput: "£0 set-up and installation", outline: true },
  { textInput: "UK-based Customer Care team", outline: true },
];

export const featureImage = {
  src: "/images/eero-egg.svg",
  alt: "Eero router with egg",
};
