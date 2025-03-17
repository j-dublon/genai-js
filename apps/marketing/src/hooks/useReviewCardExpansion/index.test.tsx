import { ReviewCardProps } from "@react-component-library/ui";
import { act, renderHook } from "@testing-library/react";

import { useReviewCardExpansion } from "./index";

describe("useReviewCardExpansion", () => {
  const mockReviews: ReviewCardProps[] = [
    {
      id: "1",
      title: "Short review",
      author: "User 1",
      starRating: 5,
      reviewText: "Short review",
    },
    {
      id: "2",
      title:
        "This is a longer review that should exceed the 80 character limit to test the overflow functionality",
      author: "User 2",
      starRating: 4,
      reviewText:
        "This is a longer review that should exceed the 80 character limit to test the overflow functionality",
    },
    {
      id: "3",
      title: "Another short review",
      author: "User 3",
      starRating: 3,
      reviewText: "Another short review",
    },
  ];

  test("should initialize with all reviews collapsed", () => {
    const { result } = renderHook(() => useReviewCardExpansion(mockReviews));

    expect(result.current.expandedStates).toEqual([false, false, false]);
  });

  test("should toggle expansion state correctly", () => {
    const { result } = renderHook(() => useReviewCardExpansion(mockReviews));

    // Toggle the first review
    act(() => {
      result.current.toggleExpand(0);
    });
    expect(result.current.expandedStates).toEqual([true, false, false]);

    // Toggle the second review
    act(() => {
      result.current.toggleExpand(1);
    });
    expect(result.current.expandedStates).toEqual([true, true, false]);

    // Toggle the first review again (should collapse)
    act(() => {
      result.current.toggleExpand(0);
    });
    expect(result.current.expandedStates).toEqual([false, true, false]);
  });

  test("should correctly identify text with overflow", () => {
    const { result } = renderHook(() => useReviewCardExpansion(mockReviews));

    expect(result.current.hasOverflow("Short text")).toBe(false);
    expect(
      result.current.hasOverflow(
        "This is a longer text that should exceed the 80 character limit to test the overflow functionality",
      ),
    ).toBe(true);
  });

  test("should handle empty reviews array", () => {
    const { result } = renderHook(() => useReviewCardExpansion([]));

    expect(result.current.expandedStates).toEqual([]);

    act(() => {
      result.current.toggleExpand(0);
    });
    expect(result.current.expandedStates).toEqual([]);
  });
});
