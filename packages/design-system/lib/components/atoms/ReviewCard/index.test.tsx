import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ReviewCard } from ".";

vi.mock("../TrustpilotStars", () => ({
  TrustpilotStars: ({
    trustScore,
    height,
  }: {
    trustScore: number;
    height: number;
  }) => (
    <div data-testid="mock-trustpilot-stars">
      Score: {trustScore}, Height: {height}
    </div>
  ),
}));

describe("ReviewCard", () => {
  const defaultProps = {
    title: "Great Service",
    starRating: 5,
    reviewText: "Amazing experience with this company!",
    author: "John Doe",
  };

  it("renders all required elements correctly", () => {
    render(<ReviewCard {...defaultProps} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Great Service",
    );
    expect(
      screen.getByText("Amazing experience with this company!"),
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("displays star rating with correct aria-label", () => {
    render(<ReviewCard {...defaultProps} />);

    const ratingContainer = screen.getByLabelText("Rating: 5 out of 5 stars");
    expect(ratingContainer).toBeInTheDocument();
    expect(screen.getByTestId("mock-trustpilot-stars")).toBeInTheDocument();
  });

  it("handles long review text without breaking layout", () => {
    const longReviewProps = {
      ...defaultProps,
      reviewText: "A".repeat(300),
    };

    render(<ReviewCard {...longReviewProps} />);
    expect(screen.getByText("A".repeat(300))).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveClass("flex", "flex-col");
  });
});
