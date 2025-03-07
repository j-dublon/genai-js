import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { HeroBanner } from ".";

vi.mock("@/hooks/usePostcode", () => ({
  usePostcode: () => ({
    postcode: "" as string,
    setPostcode: vi.fn() as React.Dispatch<React.SetStateAction<string>>,
  }),
}));

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
    const input = await screen.findByPlaceholderText("Pop in your postcode");
    expect(input).toBeInTheDocument();
  });

  it("renders TrustpilotHorizontal desktop component", async () => {
    const trustPilotDesktop = screen.getByTestId(
      "trustpilot-horizontal-component-desktop",
    );
    const trustPilotMobile = screen.queryByTestId(
      "trustpilot-horizontal-component-mobile",
    );
    expect(trustPilotDesktop).toHaveClass("md:block hidden");
    expect(trustPilotMobile).toHaveClass("md:hidden");
  });

  it("renders all TextWithTick items", async () => {
    const item1 = await screen.findByText("Full fibre speeds up to 900Mbps");
    const item2 = await screen.findByText(
      "UK’s most reliable broadband technology",
    );
    const item3 = await screen.findByText("eero Pro 6E router with every plan");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });
});
