import { useEffect, useRef } from "react";

export const useDropdown = (
  name: string,
  openDropdown: string | null,
  setOpenDropdown: (name: string | null) => void,
) => {
  //useRef defaults to null after initialization, so this is ensure a non-null assertion
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const isOpen = openDropdown === name;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setOpenDropdown]);

  return { isOpen, dropdownRef };
};
