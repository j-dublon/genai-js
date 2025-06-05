import { RadioIcon } from "@icons/Radio";

export interface RadioProps {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const Radio = ({
  label,
  value,
  name,
  checked,
  onChange,
  disabled = false,
  className = "",
}: RadioProps) => {
  const radioClasses = `ds:relative ds:peer ds:h-7 ds:w-7 ds:bg-core-white ds:border-ui-grey-300 ds:appearance-none ds:rounded-full ds:border-2 
  ds:checked:border-core-black ${disabled ? "ds:cursor-not-allowed" : "ds:cursor-pointer"} ${className}`;

  return (
    <label className="ds:flex ds:items-center ds:gap-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        className={radioClasses}
        disabled={disabled}
        aria-checked={checked}
      />
      <RadioIcon className="ds:absolute ds:hidden ds:peer-checked:block ds:rounded-full ds:w-7 ds:h-7" />
      <span className="ds:text-xs ds:md:text-sm ds:leading-[1.6] ds:font-normal ds:text-ui-grey-500">
        {label}
      </span>
    </label>
  );
};
