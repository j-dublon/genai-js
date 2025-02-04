import { render, screen } from "@testing-library/react";
import { TrustpilotHorizontal } from "./index";

const mockProps = {
  trustScore: 4.5,
  width: 144,
  height: 36,
  numberOfReviews: 123,
  trustPilotLogo: {
    altText: "Trustpilot Logo",
    imgSrc: "https://via.placeholder.com/150",
  },
};

describe("TrustpilotHorizontal Component", () => {
  it("renders the Trustpilot logo with correct alt text", () => {
    render(<TrustpilotHorizontal {...mockProps} />);
    const logo = screen.getByAltText("Trustpilot Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", mockProps.trustPilotLogo.imgSrc);
  });

  it("displays the correct number of reviews", () => {
    render(<TrustpilotHorizontal {...mockProps} />);
    const reviewsText = screen.getByText((content, element) => {
      return (
        content.includes("Based on") &&
        content.includes("reviews") &&
        element?.querySelector(".font-bold")?.textContent ===
          mockProps.numberOfReviews.toLocaleString()
      );
    });
    expect(reviewsText).toBeInTheDocument();
  });
});
