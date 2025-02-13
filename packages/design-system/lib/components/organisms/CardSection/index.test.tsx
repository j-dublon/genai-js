import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CardSection, CardSectionProps } from ".";

const mockCardSectionProps: CardSectionProps = {
  infoCardContent: [
    {
      titleText: "Full fibre speeds up to 900Mbps",
      colorPillText: "32x faster",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "pink",
      subHeading: "than copper-based broadband.",
    },
    {
      titleText: "Full fibre direct to your home",
      colorPillText: "5x more reliable",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "orange",
      subHeading: "than copper-based broadband.",
    },
  ],
  detailedCardContent: {
    titleText: "A properly fancy router",
    colorPillText: "worth £249.99*",
    colorPillBackgroundColor: "yellow",
    infoCardBackgroundColor: "grey",
    subHeading: "Free eero Pro 6E",
    additionalText:
      "TrueMesh technology, built-in security, and signal and coverage literally everywhere in your home? Yep, we’d say that’s very fancy indeed.",
    buttonText: "Tell me more",
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

describe("Card Section Component", () => {
  it("renders the first card", () => {
    render(<CardSection {...mockCardSectionProps} />);

    const titleText =
      mockCardSectionProps.infoCardContent[0].titleText ||
      "Full fibre speeds up to 900Mbps";

    const colorPillText =
      mockCardSectionProps.infoCardContent[0].colorPillText || "32x faster";

    const subHeading =
      mockCardSectionProps.infoCardContent[0].subHeading ||
      "than copper-based broadband.";
    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(colorPillText)).toBeInTheDocument();
    expect(screen.getByText(titleText)).toHaveStyle(
      "background-color: bg-core-yellow",
    );
    expect(screen.getByText(titleText)).toHaveStyle(
      "background-color: bg-core-pink",
    );
    expect(screen.getAllByText(subHeading)[0]).toBeInTheDocument();
  });

  it("renders the second card", () => {
    render(<CardSection {...mockCardSectionProps} />);
    const titleText =
      mockCardSectionProps.infoCardContent[1].titleText ||
      "Full fibre direct to your home";

    const colorPillText =
      mockCardSectionProps.infoCardContent[1].colorPillText ||
      "5x more reliable";

    const subHeading =
      mockCardSectionProps.infoCardContent[1].subHeading ||
      "than copper-based broadband.";
    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(colorPillText)).toBeInTheDocument();
    expect(screen.getByText(titleText)).toHaveStyle(
      "background-color: bg-core-yellow",
    );
    expect(screen.getByText(titleText)).toHaveStyle(
      "background-color: bg-core-pink",
    );
    expect(screen.getAllByText(subHeading)[1]).toBeInTheDocument();
  });
});
