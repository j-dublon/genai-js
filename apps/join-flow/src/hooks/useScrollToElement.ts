import { useCallback } from "react";

export const useScrollToElement = (selector: string) => {
  const scrollToElement = useCallback(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selector]);

  return scrollToElement;
};
