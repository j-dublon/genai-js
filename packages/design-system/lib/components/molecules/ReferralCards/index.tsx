import cx from "classnames";
import React from "react";

interface ReferralCardProps {
  width?: "small" | "medium";
  children: React.ReactNode;
  className?: string;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        "ds:w-full ds:md:w-[270px] ds:bg-core-grey-200 ds:p-4 ds:rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface ReferralCardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ReferralCardWrapper: React.FC<ReferralCardWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        "ds:flex ds:flex-col ds:items-center ds:justify-between ds:w-full ds:gap-4",
        "ds:md:flex-row ds:md:gap-2",
        className,
      )}
    >
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </div>
  );
};
