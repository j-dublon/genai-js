export const props: {
  infoCardContent: [InfoCardProps, InfoCardProps];
  detailedCardContent: InfoCardProps;
} = {
  infoCardContent: [
    {
      titleText: "Our full fibre broadband is",
      colorPillText: "32x faster and...",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "pink",
    },
    {
      colorPillText: "... 5x more reliable",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "orange",
      subHeading: "than copper-based broadband.",
    },
  ],
  detailedCardContent: {
    titleText: "Meet your super eero",
    colorPillText: "worth £249.99**",
    colorPillBackgroundColor: "yellow",
    infoCardBackgroundColor: "grey",
    subHeading: "Free* eero Pro 6E router",
    additionalText:
      "The eero router makes your Wi-Fi signal nice and strong all throughout your home, thanks to something called TrueMesh technology. \n\n That means no dead spots or drop-offs – even if you fancied an afternoon of WFHing in the garden.",
    buttonText: "Oooh, tell me more",
    featureTextProps: {
      topText: "Whooooo",
      bottomText: "ooooosh",
      backgroundColor: "blue",
      textColor: "white",
      textScale: 3,
      textGap: "medium",
      infoCard: true,
      image: {
        url: "/assets/images/eero.svg",
        alt: "It's an image of an eero router",
      },
    },
  },
};

export interface InfoCardProps {
  titleText?: string;
  colorPillText: string;
  colorPillBackgroundColor: BackgroundColors;
  infoCardBackgroundColor: BackgroundColors;
  subHeading?: string;
  additionalText?: string;
  buttonText?: string;
  featureTextProps?: {
    topText: string;
    bottomText: string;
    backgroundColor: BackgroundColors;
    textColor: TextColorList;
    textScale: number;
    textGap: TextGapList;
    infoCard: boolean;
    image: {
      url: string;
      alt: string;
    };
  };
}

export type BackgroundColors =
  | "yellow"
  | "pink"
  | "grey"
  | "orange"
  | "blue"
  | "red";

export type TextColorList = "indigo" | "black" | "white" | "grey";

export type TextGapList = "small" | "medium" | "large";
