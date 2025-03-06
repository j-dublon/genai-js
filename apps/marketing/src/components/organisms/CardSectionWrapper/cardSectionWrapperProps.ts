export const props: {
  cardSectionHeading: string;
  cardSectionText: string;
  infoCardContent: [InfoCardProps, InfoCardProps];
  detailedCardContent: InfoCardProps;
} = {
  cardSectionHeading: "A genuinely amazing connection",
  cardSectionText:
    "Our full fibre makes a huge difference when it comes to things like watching TV, gaming online or downloading big files. It’s all thanks to those clever fibre optic cables, which are loads speedier and sturdier than copper-based setups.",
  infoCardContent: [
    {
      colorPillText: "15x faster",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "pink",
      listItems: [
        "Instant downloads and uploads",
        "Lag-free, ping-free gaming",
        "Stream in ultra-HD, all the time",
      ],
    },
    {
      colorPillText: "5x more reliable",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "orange",
      listItems: [
        "No drop-offs on video calls",
        "Buffer-free streaming and gaming",
        "Keep all your devices connected",
      ],
    },
  ],
  detailedCardContent: {
    titleText: "Meet your new super eero",
    colorPillText: "included with every plan*",
    colorPillBackgroundColor: "yellow",
    infoCardBackgroundColor: "light-grey",
    subHeading: "worth £249.99**",
    additionalText:
      "Our seriously powerful eero router boosts your Wi-Fi throughout your home, so you're always connected. It can even detect interference from walls and radios, directing signal straight to your devices.",
    buttonText: "Oooh, tell me more",
    featureImageProps: {
      backgroundColor: "blue",
      infoCard: true,
      backgroundImage: {
        url: "/assets/images/whooosh.svg",
        alt: "Whooosh text",
      },
      overlayImage: {
        url: "/assets/images/eero.svg",
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
