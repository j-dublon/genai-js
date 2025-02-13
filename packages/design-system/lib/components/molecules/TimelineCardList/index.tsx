import { Chevron } from "@icons/Chevron";
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
      {timelineCardProps.map(
        (timelineCardProp: TimelineCardProps, index: number) => (
          <React.Fragment key={`${timelineCardProp.subHeading}${index}`}>
            <TimelineCard {...timelineCardProp} />

            {index < timelineCardProps.length - 1 && (
              <div className="flex md:flex-row flex-col items-center py-3 md:px-1">
                <Chevron
                  chevronWithCircle={false}
                  className="transform rotate-90 h-8 md:rotate-0 md:w-12 md:h-12"
                />
              </div>
            )}
          </React.Fragment>
        ),
      )}
    </>
  );
};
