import React, { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          id={id}
          ref={ref}
          className={`w-full px-4 py-2 h-[62px] border-2 ${error ? "border-ui-error" : "border-ui-grey-300"} rounded-[8px] placeholder-black ${className || ""}`}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {error && <p className="text-ui-error text-sm mt-1">{error.message}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
