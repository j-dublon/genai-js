interface ToggleSwitchProps {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

export const ToggleSwitch = ({
  isOn = false,
  onChange,
  leftLabel = "Off",
  rightLabel = "On",
  className = "",
}: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={`Toggle ${isOn ? rightLabel : leftLabel}`}
      onClick={() => onChange(!isOn)}
      className={`ds:relative ds:w-[250px] ds:h-[46px] ds:rounded-lg ds:border-2 ds:border-ui-grey-300 ds:bg-core-white 
        ds:flex ds:items-center ds:justify-center ds:cursor-pointer ds:transition-all ds:duration-300 ds:p-1 ds:gap-1
        ds:before:bg-core-black ds:before:w-[130px] ds:before:h-[38px] ds:before:rounded-[18px] ds:before:absolute
        ${isOn ? "ds:before:right-1" : "ds:before:left-1"} ${className}`}
    >
      <div className="ds:w-1/2 ds:relative ds:z-10 ds:left-1">
        <span
          className={`ds:text-xxs ds:font-semibold ds:leading-[1.6] ${!isOn ? "ds:text-core-white" : "ds:text-core-black"}`}
        >
          {leftLabel}
        </span>
      </div>
      <div className="ds:w-1/2 ds:relative ds:z-10 ds:right-1">
        <span
          className={`ds:text-xxs ds:font-semibold ds:leading-[1.6] ${isOn ? "ds:text-core-white" : "ds:text-core-black"}`}
        >
          {rightLabel}
        </span>
      </div>
    </button>
  );
};
