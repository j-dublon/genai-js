import { ReviewCardProps } from "@react-component-library/ui";
import { useState } from "react";

export const useReviewCardExpansion = (reviews: ReviewCardProps[]) => {
  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    new Array(reviews.length).fill(false),
  );

  const toggleExpand = (index: number) => {
    setExpandedStates((prevStates) => {
      if (index < 0 || index >= reviews.length) {
        return prevStates;
      }

      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const hasOverflow = (text: string) => {
    return text.length > 80;
  };

  return {
    expandedStates,
    toggleExpand,
    hasOverflow,
  };
};
