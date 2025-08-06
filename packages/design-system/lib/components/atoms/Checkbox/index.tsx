import { CheckboxIcon } from "@icons/CheckboxIcon";
import { ReactNode } from "react";

export interface CheckboxProps {
  label: ReactNode;
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export const Checkbox = ({
  label,
  value,
  name,
  checked,
  onChange,
  disabled = false,
  className = "",
  labelClassName = "",
}: CheckboxProps) => {
  const checkboxClasses = `ds:relative ds:peer ds:shrink-0 ds:h-7 ds:w-7 ds:rounded-[5px] ds:border-2 ds:appearance-none 
  ds:border-ui-grey-300 ds:bg-core-white ds:checked:bg-core-black ds:checked:border-core-black
  ${disabled ? "ds:cursor-not-allowed" : "  ds:cursor-pointer"}
  ${className}`;

  return (
    <label className="ds:flex ds:items-center ds:gap-3">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className={checkboxClasses}
        disabled={disabled}
        aria-checked={checked}
      />
      <CheckboxIcon
        className={`ds:absolute ds:hidden ds:peer-checked:block ds:rounded-[5px] ds:w-7 ds:h-7 ${disabled ? "ds:cursor-not-allowed" : "ds:cursor-pointer"}`}
      />
      <span
        className={`ds:text-xs ds:md:text-sm ds:leading-[1.6] ds:font-normal ds:text-ui-grey-500 ${labelClassName}`}
      >
        {label}
      </span>
    </label>
  );
};
