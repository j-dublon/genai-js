import { RefObject, useEffect, useRef, useState } from "react";

export const useNavBarHandlers = () => {
  const [toggled, setToggled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggled(false);
        setOpenDropdown(null);
      }
    };

    if (toggled || openDropdown) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [toggled, openDropdown]);

  useEffect(() => {
    if (toggled) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";

        window.scrollTo(0, scrollY);
      };
    }
  }, [toggled]);

  return { toggled, setToggled, openDropdown, setOpenDropdown, drawerRef };
};
