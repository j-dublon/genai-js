import { render, screen } from "@testing-library/react";
import { TrustpilotVertical } from ".";

const mockProps = {
  trustScore: 4.5,
  width: 144,
  height: 36,
  trustPilotLogo: {
    altText: "Trustpilot Logo",
    imgSrc: "https://via.placeholder.com/150"
  }
};

describe("TrustpilotVertical Component", () => {
  it("renders the Trustpilot logo with alt text", () => {
    render(<TrustpilotVertical {...mockProps} />);
    expect(screen.getByAltText("Trustpilot Logo")).toBeInTheDocument();
  });

  it("renders the Trustpilot stars with correct aria-label", () => {
    render(<TrustpilotVertical {...mockProps} />);
    expect(
      screen.getByRole("img", { name: /trustpilot stars/i })
    ).toHaveAttribute(
      "aria-label",
      "Trustpilot stars: 4 full star(s) and a half-star"
    );
  });
});
