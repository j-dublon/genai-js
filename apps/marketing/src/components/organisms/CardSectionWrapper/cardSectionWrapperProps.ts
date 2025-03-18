import { getAssetPath } from "@/lib/get-asset-path";

export const props: {
  cardSectionHeading: string;
  cardSectionText: string;
  infoCardContent: [InfoCardProps, InfoCardProps];
  detailedCardContent: InfoCardProps;
} = {
  cardSectionHeading: "A genuinely amazing connection",
  cardSectionText:
    "Our full fibre makes a huge difference when it comes to things like watching TV, gaming online or downloading big files. It's all thanks to those clever fibre optic cables, which are loads speedier and sturdier than copper-based setups.",
  infoCardContent: [
    {
      colorPillText: "15x faster",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "pink",
      listItems: [
        "Lightning-quick downloads and uploads",
        "Lag-free, ping-free gaming",
        "Stream in ultra-HD, all the time",
      ],
    },
    {
      colorPillText: "Loaaads more reliable",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "orange",
      listItems: [
        "Amazing connection even during peak times",
        "Next to no drop-offs on video calls",
        "Super smooth streaming and gaming",
      ],
    },
  ],
  detailedCardContent: {
    titleText: "Meet your new super eero",
    colorPillText: "included with every plan",
    colorPillBackgroundColor: "yellow",
    infoCardBackgroundColor: "light-grey",
    subHeading: "worth £249.99",
    additionalText:
      "Our powerful eero router boosts signal throughout your home, so all your devices stay connected. It can even detect interference from walls and radios, re-directing Wi-Fi where it's actually needed.",
    buttonText: "Oooh, tell me more",
    featureImageProps: {
      backgroundColor: "blue",
      infoCard: true,
      backgroundImage: {
        url: getAssetPath("/images/whooosh.svg"),
        alt: "Whooosh text",
      },
      overlayImage: {
        url: getAssetPath("/images/eero.svg"),
        alt: "Eero router",
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
  featureImageProps?: {
    backgroundColor: BackgroundColors;
    infoCard: boolean;
    backgroundImage: {
      url: string;
      alt: string;
    };
    overlayImage: {
      url: string;
      alt: string;
    };
  };
  listItems?: string[];
}

export type BackgroundColors =
  | "yellow"
  | "pink"
  | "grey"
  | "light-grey"
  | "orange"
  | "blue"
  | "red";
