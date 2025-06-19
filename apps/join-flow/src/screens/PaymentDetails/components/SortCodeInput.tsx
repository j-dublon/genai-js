import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldError } from "react-hook-form";

type SortCodeInputProps = {
  register: UseFormRegisterReturn;
  id: string;
  placeholder: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const SortCodeInput = ({
  register,
  id,
  placeholder,
  error,
  inputProps,
}: SortCodeInputProps) => {
  const { onChange, onBlur, name, ref } = register;
  const [isTouched, setIsTouched] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digits = value.replace(/\D/g, "");

    let formattedValue = "";
    if (digits.length > 0) {
      formattedValue += digits.substring(0, Math.min(2, digits.length));

      if (digits.length > 2) {
        formattedValue += "-" + digits.substring(2, Math.min(4, digits.length));

        if (digits.length > 4) {
          formattedValue +=
            "-" + digits.substring(4, Math.min(6, digits.length));
        }
      }
    }

    e.target.value = formattedValue;
    setHasContent(formattedValue.length > 0);
    onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    onBlur(e);
  };

  const showError = isTouched && !!error && !hasContent;

  return (
    <div className="w-full">
      <input
        type="text"
        id={id}
        name={name}
        ref={ref}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 h-[62px] border-2 ${showError ? "border-ui-error" : "border-ui-grey-300"} rounded-[8px] placeholder-black`}
        aria-invalid={showError ? "true" : "false"}
        maxLength={8}
        inputMode="numeric"
        {...inputProps}
      />
      {showError && (
        <p className="text-ui-error text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};
