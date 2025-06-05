import cx from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  "aria-invalid"?: boolean;
  className?: string;
  id?: string;
  inputType?: "number" | "text";
  hasSubmitted: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      className,
      "aria-invalid": isInvalid,
      inputType = "text",
      hasSubmitted,
      ...inputProps
    },
    ref,
  ) => {
    let validityClassName = "";

    if (hasSubmitted) {
      if (isInvalid === false) {
        validityClassName = "border-ui-teal";
      } else if (isInvalid) {
        validityClassName = "border-ui-error";
      }
    }

    return (
      <input
        {...inputProps}
        id={id}
        aria-invalid={isInvalid}
        ref={ref}
        className={cx(
          "border-2 bg-core-white p-3 text-xs md:text-sm font-semibold text-core-black focus:outline-none",
          validityClassName || "border-ui-grey-300",
          className,
        )}
        type={inputType}
      />
    );
  },
);

TextInput.displayName = "TextInput";
