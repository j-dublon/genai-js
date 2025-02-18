import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { HeroBanner } from ".";

describe("HeroBanner", () => {
  beforeEach(() => {
    render(
      <HeroBanner
        trustScore={100}
        numberOfReviews={100}
        broadbandOffer={true}
      />,
    );
  });

  it("renders the 'Ridiculously fast full fibre broadband' heading", async () => {
    const heading = await screen.findByText(
      "Ridiculously fast full fibre broadband",
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the description text", async () => {
    const description = await screen.findByText(
      "Stream, game and WFH, all at the same time, with no drop-offs.",
    );
    expect(description).toBeInTheDocument();
  });

  it("renders PostcodeChecker input", async () => {
    const input = await screen.findByPlaceholderText("Pop in your address");
    expect(input).toBeInTheDocument();
  });

  it("renders TrustpilotVertical component", async () => {
    const logo = await screen.findByLabelText("TrustPilot Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders all TextWithTick items", async () => {
    const item1 = await screen.findByText("Full fibre speeds up to 900Mbps");
    const item2 = await screen.findByText(
      "UK’s most reliable broadband technology",
    );
    const item3 = await screen.findByText(
      "Free* eero Pro 6E router, worth £249.99**",
    );

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it("applies background image correctly", async () => {
    const heroBanner = await screen.findByTestId("hero-banner");
    expect(heroBanner).toHaveStyle(
      "background-image: url('/assets/images/cuckoo_background.png')",
    );
  });
});
