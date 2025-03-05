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
    <section
      aria-label="Mobile App Wrapper"
      className="bg-core-yellow md:px-36 flex justify-center"
    >
      <div className="flex flex-col items-center md:flex-row md:max-w-[1152px] md:gap-5 md:justify-between bg-core-yellow w-full">
        <MobilePhone selectedTextIndex={selectedTextIndex} />

        <MobileApp
          {...mobileAppProps}
          selectedTextIndex={selectedTextIndex}
          setSelectedTextIndex={handleManualSelection}
        />
      </div>
    </section>
  );
};
