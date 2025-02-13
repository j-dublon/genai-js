import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { TrustpilotStars } from ".";

describe("TrustpilotStars Component", () => {
  it("renders the correct number of full and half stars", () => {
    render(<TrustpilotStars trustScore={4.3} />);
    expect(
      screen.getByRole("img", { name: /trustpilot stars/i }),
    ).toHaveAttribute(
      "aria-label",
      "Trustpilot stars: 4 full star(s) and a half-star",
    );
  });

  it("renders no stars when score is zero", () => {
    render(<TrustpilotStars trustScore={0} />);
    expect(
      screen.getByRole("img", { name: /trustpilot stars/i }),
    ).toHaveAttribute("aria-label", "Trustpilot stars: 0 full star(s)");
  });
});
