import { render, screen } from "@testing-library/react";

import { ReviewCardSkeleton } from ".";

describe("ReviewCardSkeleton", () => {
  it("renders with correct role and base classes", () => {
    render(<ReviewCardSkeleton />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
  });

  it("renders all skeleton lines", () => {
    render(<ReviewCardSkeleton />);

    // Count all elements with animate-shimmer class
    const skeletonLines = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("ds:animate-shimmer"));

    // Should have: title, rating, 3 lines of text, and author
    expect(skeletonLines).toHaveLength(6);
  });
});
