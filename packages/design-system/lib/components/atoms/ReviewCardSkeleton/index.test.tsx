import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReviewCardSkeleton } from ".";

describe("ReviewCardSkeleton", () => {
  it("renders with correct role and base classes", () => {
    render(<ReviewCardSkeleton />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass(
      "flex",
      "flex-col",
      "bg-core-white",
      "w-[290px]",
      "md:w-[368px]",
    );
  });

  it("renders all skeleton lines", () => {
    render(<ReviewCardSkeleton />);

    // Count all elements with animate-shimmer class
    const skeletonLines = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("animate-shimmer"));

    // Should have: title, rating, 3 lines of text, and author
    expect(skeletonLines).toHaveLength(6);
  });

  it("maintains responsive heights", () => {
    render(<ReviewCardSkeleton />);

    const article = screen.getByRole("article");
    expect(article).toHaveClass("h-[340px]", "md:h-[380px]");
  });

  it("renders skeleton lines with correct widths", () => {
    render(<ReviewCardSkeleton />);

    const lines = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("animate-shimmer"));

    // Title line
    expect(lines[0]).toHaveClass("w-3/4");
    // Rating line
    expect(lines[1]).toHaveClass("w-28");
    // Text lines
    expect(lines[2]).toHaveClass("w-full");
    expect(lines[3]).toHaveClass("w-full");
    expect(lines[4]).toHaveClass("w-3/4");
    // Author line
    expect(lines[5]).toHaveClass("w-1/3");
  });
});
