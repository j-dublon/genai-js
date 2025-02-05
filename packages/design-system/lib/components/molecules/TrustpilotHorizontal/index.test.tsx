import { render, screen } from "@testing-library/react";
import { TrustpilotHorizontal } from "./index";

const mockProps = {
  trustScore: 4.5,
  width: 144,
  height: 36,
  numberOfReviews: 123,
  trustPilotAriaLabel: "Trustpilot Logo",
};

describe("TrustpilotHorizontal Component", () => {
  it("renders the Trustpilot logo with correct aria-label", () => {
    render(<TrustpilotHorizontal {...mockProps} />);
    const logo = screen.getByLabelText("Trustpilot Logo");
    expect(logo).toBeInTheDocument();
  });

  it("displays the correct number of reviews", () => {
    render(<TrustpilotHorizontal {...mockProps} />);
    const reviewsText = screen.getByText(/Based on/i);
    expect(reviewsText).toBeInTheDocument();
    expect(reviewsText).toHaveTextContent(
      `Based on ${mockProps.numberOfReviews.toLocaleString()} reviews`
    );
  });
});
