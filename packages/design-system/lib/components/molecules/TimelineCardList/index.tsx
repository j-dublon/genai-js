import { ChevronRight } from "@icons/ChevronRight";
import { ChevronVertical } from "@icons/ChevronVertical";
import React, { useEffect, useState } from "react";

import { TimelineCard, TimelineCardProps } from "../TimelineCard";

interface TimelineCardListProps {
  timelineCardProps: TimelineCardProps[];
}

export const TimelineCardList = ({
  timelineCardProps,
}: TimelineCardListProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {timelineCardProps.map((timelineCardProp, index) => (
        <React.Fragment key={timelineCardProp.subHeading}>
          <TimelineCard {...timelineCardProp} />

          {index < timelineCardProps.length - 1 && (
            <div className="ds:flex ds:items-center ds:md:px-1 ds:py-5 ds:justify-center">
              {isMobile ? <ChevronVertical /> : <ChevronRight />}
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
