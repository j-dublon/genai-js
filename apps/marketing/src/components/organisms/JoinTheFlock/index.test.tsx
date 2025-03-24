import "@testing-library/jest-dom";

import { render, screen, within } from "@testing-library/react";
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
    const desktopSubmitButton = screen.getByTestId("desktop-submit");
    expect(desktopSubmitButton).toHaveClass("ds:hidden", "ds:sm:flex");
    expect(within(desktopSubmitButton).getByRole("button")).toHaveTextContent(
      "Let's go",
    );
    expect(screen.getByTestId("mobile-submit")).toHaveClass(
      "ds:block",
      "ds:sm:hidden",
    );
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
    const listItems = [
      "£0 set-up & installation",
      "UK-based Customer Care team",
      "Ridiculously easy switching",
      "Handy app to manage your account",
      "Cuckoo Protect (worth £199.98)",
    ];
    listItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
