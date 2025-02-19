import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { JoinTheFlock } from ".";

describe("JoinTheFlock", () => {
  it("renders the section", () => {
    render(<JoinTheFlock />);
    expect(screen.getByText("Join the flock today")).toBeInTheDocument();
  });

  it("renders the PostcodeChecker with correct placeholder and button text", () => {
    render(<JoinTheFlock />);
    expect(
      screen.getByPlaceholderText("Pop in your address"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Let's go");
  });

  it("renders TrustpilotVertical component", async () => {
    render(<JoinTheFlock trustScore={100} numberOfReviews={100} />);
    const logo = await screen.findByLabelText("TrustPilot Logo");
    expect(logo).toBeInTheDocument();
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
