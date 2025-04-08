import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDialogElement | null>,
  isModalOpen: boolean,
  onOutsideClick: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && isModalOpen) {
        const elementRect = ref.current.getBoundingClientRect();

        const isOutsideElement =
          event.clientX < elementRect.left ||
          event.clientX > elementRect.right ||
          event.clientY < elementRect.top ||
          event.clientY > elementRect.bottom;

        if (isOutsideElement) {
          onOutsideClick();
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isModalOpen, onOutsideClick]);
};
