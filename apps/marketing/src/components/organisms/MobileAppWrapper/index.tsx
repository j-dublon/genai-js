"use client";
import { MobileApp, MobilePhone } from "@react-component-library/ui";
import { useEffect, useState } from "react";

import { mobileAppProps } from "./mobileAppProps";

export const MobileAppWrapper = () => {
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);
  const [isManualSelection, setIsManualSelection] = useState<boolean>(false);

  useEffect(() => {
    if (isManualSelection) return;

    const interval = setInterval(() => {
      setSelectedTextIndex((prevText) =>
        prevText !== null ? (prevText + 1) % 4 : 0,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isManualSelection]);

  const handleManualSelection = (index: number) => {
    setSelectedTextIndex(index);
    setIsManualSelection(true);
  };
  return (
    <div className="md:flex bg-core-yellow md:px-36 justify-center">
      <div className="md:max-w-[1152px] flex flex-col md:flex-row items-center md:gap-20 bg-core-yellow">
        <MobilePhone selectedTextIndex={selectedTextIndex} />

        <MobileApp
          {...mobileAppProps}
          selectedTextIndex={selectedTextIndex}
          setSelectedTextIndex={handleManualSelection}
        />
      </div>
    </div>
  );
};
