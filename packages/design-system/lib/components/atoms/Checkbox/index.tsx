export interface CheckboxProps {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const CheckboxIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.75"
        y="1.25"
        width="25.5"
        height="25.5"
        rx="3.75"
        fill="#1F1F1F"
        stroke="#1F1F1F"
        strokeWidth="2.5"
      />
      <path
        d="M12.5001 15L9.1001 11.5L6.6001 14L12.5001 20L22.0001 10.5L19.5001 8L12.5001 15Z"
        fill="white"
      />
      <path
        d="M12.5 20L6.5 14L9 11.5L12.5 15L19.5 8L22 10.5L12.5 20Z"
        fill="white"
      />
    </svg>
  );
};

export const Checkbox = ({
  label,
  value,
  name,
  checked,
  onChange,
  disabled = false,
  className = "",
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
      <span className="ds:text-xs ds:md:text-sm ds:leading-[1.6] ds:font-normal ds:text-ui-grey-500">
        {label}
      </span>
    </label>
  );
};
