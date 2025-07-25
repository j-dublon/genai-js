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
        "ds:relative ds:h-6 ds:w-12 ds:cursor-pointer ds:appearance-none ds:rounded-md ds:bg-core-white ds:shadow-[inset_0_0_0_1px] ds:shadow-ui-grey-400 ds:transition-all ds:duration-300",
        // switch circle, default on left
        "ds:after:absolute ds:after:left-0 ds:after:h-6 ds:after:w-6 ds:after:scale-[.7] ds:after:transform ds:after:rounded-full ds:after:bg-core-black ds:after:transition-all ds:after:duration-300",
        // checked, slide right and change background
        "ds:checked:bg-core-black ds:checked:shadow-[inset_0_0_0_1px] ds:checked:shadow-core-black ds:checked:after:left-6 ds:checked:after:bg-core-white",
        // disabled, affects background, switch could be left or right
        "ds:disabled:cursor-default ds:disabled:bg-ui-grey-400 ds:disabled:shadow-[inset_0_0_0_2px] ds:disabled:shadow-ui-grey-400 ds:disabled:after:bg-core-white",
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
      <Details.Summary className="ds:before:bg-transparent">
        <Details.IndicatorPlusMinus />
        <Details.Label>{header}</Details.Label>
        <Toggle
          className="ds:shrink-0"
          defaultChecked={defaultChecked}
          disabled={disabled}
          onClick={(ev) => {
            // We don't want this event to bubble up to the details component
            ev.stopPropagation();
          }}
          onChange={(ev) => void onChange?.(ev.target.checked)}
        />
      </Details.Summary>
      <Details.Content className="ds:mx-2 ds:mb-2 ds:md:mx-2 ds:md:mb-2">
        <div className="ds:mt-2 ds:space-y-2 ds:md:space-y-4">
          <p className="ds:text-[12px]">{body}</p>
        </div>
      </Details.Content>
    </Details.Root>
  );
};
