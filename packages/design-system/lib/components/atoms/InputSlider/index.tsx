export interface InputSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  className?: string;
  disabled?: boolean;
  name?: string;
  label?: string;
}

export const InputSlider = ({
  value,
  min,
  max,
  onChange,
  showValue = true,
  className = "",
  disabled = false,
  name,
  label,
}: InputSliderProps) => {
  const isMin = value === min;

  const webkitThumbStyles = `ds:[&::-webkit-slider-thumb]:appearance-none ds:[&::-webkit-slider-thumb]:w-8 
  ds:[&::-webkit-slider-thumb]:h-8 ds:[&::-webkit-slider-thumb]:rounded-full 
  ${isMin ? "ds:[&::-webkit-slider-thumb]:bg-core-white" : "ds:[&::-webkit-slider-thumb]:bg-core-yellow"}
  ds:[&::-webkit-slider-thumb]:border-3 ds:[&::-webkit-slider-thumb]:border-ui-grey-300 ds:[&::-webkit-slider-thumb]:cursor-grab`;

  const mozThumbStyles = `ds:[&::-moz-range-thumb]:appearance-none ds:[&::-moz-range-thumb]:w-8 ds:[&::-moz-range-thumb]:h-8 
  ds:[&::-moz-range-thumb]:rounded-full ${isMin ? "ds:[&::-moz-range-thumb]:bg-core-white" : "ds:[&::-moz-range-thumb]:bg-core-yellow"}
  ds:[&::-moz-range-thumb]:border-3 ds:[&::-moz-range-thumb]:border-ui-grey-300 ds:[&::-moz-range-thumb]:cursor-grab`;

  const thumbClasses = `${webkitThumbStyles} ${mozThumbStyles}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleValueClick = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="ds:flex ds:items-center">
      {label && (
        <label htmlFor={name} className="ds:text-sm ds:font-medium ds:mr-2">
          {label}
        </label>
      )}
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label ? label : `${name} slider`}
        className={`ds:w-full ds:h-1 ds:bg-ui-grey-300 ds:rounded-[10px] ds:appearance-none ds:max-w-[600px] 
          ${showValue && "ds:rounded-r-none"} ${thumbClasses} ${disabled ? "ds:cursor-not-allowed" : "ds:cursor-pointer"} ${className}`}
      />
      {showValue && (
        <button
          type="button"
          className={`ds:shrink-0 ds:w-[48px] ds:h-[48px] ds:bg-core-white ds:border-2 ds:border-ui-grey-300 ds:text-core-black 
            ds:text-xs ds:font-medium ds:rounded-sm ds:py-3 ds:text-center ds:-translate-x-[1px]
            ${disabled ? "ds:cursor-not-allowed" : value < max ? "ds:cursor-pointer ds:hover:bg-ui-grey-100" : "ds:cursor-default"}`}
          onClick={handleValueClick}
          disabled={value == max || disabled}
          aria-label={`Set value to ${value + 1}`}
        >
          {value === max ? `${value}+` : value}
        </button>
      )}
    </div>
  );
};
