import { render, screen } from "@testing-library/react";

import { TrustpilotVertical } from ".";

const mockProps = {
  trustScore: 4.5,
  width: 144,
  height: 36,
};

describe("TrustpilotVertical Component", () => {
  it("displays the trust pilot logo", () => {
    render(<TrustpilotVertical {...mockProps} />);
    const logo = screen.getByLabelText("TrustPilot Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the Trustpilot stars with correct aria-label", () => {
    render(<TrustpilotVertical {...mockProps} />);
    const stars = screen.getByLabelText(
      "Trustpilot stars: 4 full star(s) and a half-star",
    );
    expect(stars).toBeInTheDocument();
  });
});
