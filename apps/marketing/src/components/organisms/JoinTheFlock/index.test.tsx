import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { JoinTheFlock } from ".";

vi.mock("@/hooks/usePostcode", () => ({
  usePostcode: () => ({
    handleFormSubmit: vi.fn() as (e: React.FormEvent) => void,
    postcode: "" as string,
    setPostcode: vi.fn() as React.Dispatch<React.SetStateAction<string>>,
  }),
}));

describe("JoinTheFlock", () => {
  it("renders the section", () => {
    render(<JoinTheFlock />);
    expect(screen.getByText("Join the flock today")).toBeInTheDocument();
  });

  it("renders the PostcodeChecker with correct placeholder and button text", () => {
    render(<JoinTheFlock />);
    expect(
      screen.getByPlaceholderText("Pop in your postcode"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Let's go");
  });

  it("renders TrustpilotVertical component", async () => {
    render(<JoinTheFlock trustScore={100} numberOfReviews={100} />);
    const logo = await screen.findAllByLabelText("TrustPilot Logo");
    expect(logo[0]).toBeInTheDocument();
  });

  test("does not render TrustpilotHorizontal when trustScore and numberOfReviews are not provided", () => {
    render(<JoinTheFlock />);
    expect(screen.queryByText("Trust Score:")).toBeNull();
  });

  test("renders the text with ticks list", () => {
    render(<JoinTheFlock />);
    const textItems = [
      "UK-based Customer Care team",
      "Ridiculously easy switching",
      "Free setup and installation",
      "Handy app to manage your account",
    ];
    textItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
