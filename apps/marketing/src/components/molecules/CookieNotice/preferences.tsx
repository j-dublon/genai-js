import cx from "classnames";
import { ComponentProps } from "react";

import * as Details from "./details";

interface PreferencesProps {
  body: string;
  defaultChecked: boolean;
  disabled: boolean;
  header: string;
  onChange: (checked: boolean) => void;
}

const Toggle = (props: ComponentProps<"input">) => {
  const { className } = props;

  return (
    <input
      {...props}
      className={cx(
        // remove defaults and setup background
        "relative h-6 w-12 cursor-pointer appearance-none rounded-md bg-core-white shadow-[inset_0_0_0_1px] shadow-ui-grey-400 transition-all duration-300",
        // switch circle, default on left
        "after:absolute after:left-0 after:h-6 after:w-6 after:scale-[.7] after:transform after:rounded-full after:bg-core-black after:transition-all after:duration-300",
        // checked, slide right and change background
        "checked:bg-core-black checked:shadow-[inset_0_0_0_1px] checked:shadow-core-black checked:after:left-6 checked:after:bg-core-white",
        // disabled, affects background, switch could be left or right
        "disabled:cursor-default disabled:bg-ui-grey-400 disabled:shadow-[inset_0_0_0_2px] disabled:shadow-ui-grey-400 disabled:after:bg-core-white",
        className,
      )}
      type="checkbox"
    />
  );
};

export const Preferences = (props: PreferencesProps) => {
  const { header, body, defaultChecked, disabled, onChange } = props;

  return (
    <Details.Root variant="sm">
      <Details.Summary className="before:bg-transparent">
        <Details.IndicatorPlusMinus />
        <Details.Label>{header}</Details.Label>
        <Toggle
          className="shrink-0"
          defaultChecked={defaultChecked}
          disabled={disabled}
          onClick={(ev) => {
            // We don't want this event to bubble up to the details component
            ev.stopPropagation();
          }}
          onChange={(ev) => void onChange?.(ev.target.checked)}
        />
      </Details.Summary>
      <Details.Content className="mx-2 mb-2 md:mx-2 md:mb-2">
        <div className="mt-2 space-y-2 md:space-y-4">
          <p className="text-[12px]]">{body}</p>
        </div>
      </Details.Content>
    </Details.Root>
  );
};
