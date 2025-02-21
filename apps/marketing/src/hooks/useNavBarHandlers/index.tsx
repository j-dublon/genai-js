import { RefObject, useEffect, useRef, useState } from "react";

export const useNavBarHandlers = () => {
  const [toggled, setToggled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setToggled(false);
        setOpenDropdown(null);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggled(false);
        setOpenDropdown(null);
      }
    };

    if (toggled || openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [toggled, openDropdown]);

  return { toggled, setToggled, openDropdown, setOpenDropdown, drawerRef };
};
