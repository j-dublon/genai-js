import { RefObject, useEffect } from "react";

export const useClearFocus = (
  elementRef: RefObject<HTMLElement | null>,
  eventName: string,
) => {
  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const handleEvent = () => {
        // Clear focus when event occurs
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      };

      element.addEventListener(eventName, handleEvent);

      return () => {
        element.removeEventListener(eventName, handleEvent);
      };
    }
  }, [elementRef, eventName]);
};
