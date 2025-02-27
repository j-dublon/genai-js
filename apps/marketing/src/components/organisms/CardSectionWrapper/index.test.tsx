import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CardSectionWrapper } from ".";
import { props } from "./cardSectionWrapperProps";

describe("CardSectionWrapper", () => {
  const {
    cardSectionHeading,
    cardSectionText,
    infoCardContent,
    detailedCardContent,
  } = props;

  describe("First section of Card Section", () => {
    it("renders the heading", () => {
      render(<CardSectionWrapper />);
      expect(screen.getByText(cardSectionHeading)).toBeInTheDocument();
    });
    it("renders the paragraph", () => {
      render(<CardSectionWrapper />);
      expect(screen.getByText(cardSectionText)).toBeInTheDocument();
    });
    it("renders the first card with list items", () => {
      render(<CardSectionWrapper />);
      expect(
        screen.getByText(infoCardContent[0].colorPillText),
      ).toBeInTheDocument();
      if (infoCardContent[0]?.listItems) {
        infoCardContent[0].listItems.forEach((item) => {
          expect(screen.getByText(item)).toBeInTheDocument();
        });
      }
    });
    it("renders the second card with list items", () => {
      render(<CardSectionWrapper />);
      expect(
        screen.getByText(infoCardContent[1].colorPillText),
      ).toBeInTheDocument();
      if (infoCardContent[1]?.listItems) {
        infoCardContent[1].listItems.forEach((item) => {
          expect(screen.getByText(item)).toBeInTheDocument();
        });
      }
    });
  });

  describe("Second section of Card Section", () => {
    it("renders the heading", () => {
      render(<CardSectionWrapper />);
      if (detailedCardContent?.titleText) {
        expect(
          screen.getByText(detailedCardContent.titleText),
        ).toBeInTheDocument();
      }
    });

    it("renders the color pill", () => {
      render(<CardSectionWrapper />);
      if (detailedCardContent?.colorPillText) {
        expect(
          screen.getByText(detailedCardContent.colorPillText),
        ).toBeInTheDocument();
      }
    });

    it("renders the subheading", () => {
      render(<CardSectionWrapper />);
      if (detailedCardContent?.subHeading) {
        expect(
          screen.getByText(detailedCardContent.subHeading),
        ).toBeInTheDocument();
      }
    });

    it("renders the additional text", () => {
      render(<CardSectionWrapper />);
      if (detailedCardContent?.additionalText) {
        expect(
          screen.getByText(detailedCardContent.additionalText),
        ).toBeInTheDocument();
      }
    });

    it("renders the button", () => {
      render(<CardSectionWrapper />);
      if (detailedCardContent?.buttonText) {
        expect(
          screen.getByText(detailedCardContent.buttonText),
        ).toBeInTheDocument();
      }
    });
  });
});
