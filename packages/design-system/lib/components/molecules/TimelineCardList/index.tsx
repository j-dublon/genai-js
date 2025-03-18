import { ChevronRight } from "@icons/ChevronRight";
import { ChevronVertical } from "@icons/ChevronVertical";
import React from "react";

import { TimelineCard, TimelineCardProps } from "../TimelineCard";

interface TimelineCardListProps {
  timelineCardProps: TimelineCardProps[];
}

export const TimelineCardList = ({
  timelineCardProps,
}: TimelineCardListProps) => {
  return (
    <>
      {timelineCardProps.map((timelineCardProp, index) => (
        <React.Fragment key={timelineCardProp.subHeading}>
          <TimelineCard {...timelineCardProp} />

          {index < timelineCardProps.length - 1 && (
            <div className="ds:flex ds:items-center ds:md:px-1 ds:py-5 ds:justify-center">
              <div className="ds:md:hidden">
                <ChevronVertical />
              </div>
              <div className="ds:hidden ds:md:flex">
                <ChevronRight />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
