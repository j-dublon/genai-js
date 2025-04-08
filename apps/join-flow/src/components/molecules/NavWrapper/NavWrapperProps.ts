import { getAssetPath } from "@/lib/get-asset-path";

export const props = {
  additionalInfoText:
    "In fact, it's the UK's most reliable broadband technology.",
  infoText: "All our plans use full fibre.",
  title: "What's full fibre all about?",
  subtitle:
    "Full fibre, also known as Fibre to the Premises or FTTP, is the very latest home broadband technology.",
  content:
    "Full fibre broadband (also known as FTTP) uses fibre optic cables that run directly into your home, giving you brilliantly fast speeds with amazing reliability. Unlike copper cables that degrade over time, fibre cables are much stronger and tougher - meaning fewer dropouts and buffering, and a future-proof connection.",
  image: getAssetPath("/images/full-fibre.png"),
  buttonText: "Ok, got it",
};
