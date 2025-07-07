import { enGB } from "date-fns/locale/en-GB";
import { useEffect, useRef, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";

import { DropdownInputField } from "../InputField";

export interface DatePickerProps {
  availableDates: Date[];
  selectedDate: string;
  onDateSelect: (date: string | undefined) => void;
  placeholderText?: string;
  buttonClassName?: string;
  outerClassName?: string;
  disabled?: boolean;
  overlay?: boolean;
}

registerLocale("en-GB", enGB);

export const DatePicker = ({
  availableDates,
  selectedDate,
  onDateSelect,
  placeholderText = "Please select a date",
  buttonClassName,
  outerClassName,
  disabled = false,
  overlay = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = selectedDate !== "" ? new Date(selectedDate) : null;

  const getDayClassName = (date: Date) => {
    return date.toDateString() === selected?.toDateString()
      ? "ds:items-center ds:justify-center ds:flex ds:rounded-xl ds:border-2 ds:border-ui-teal ds:w-[2.5em] ds:h-[2.5em] ds:md:w-[3em] ds:md:h-[3em]"
      : "";
  };

  const handleDateSelect = (date: Date | null) => {
    onDateSelect(date?.toDateString() || "");
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`ds:relative ds:my-4 ${outerClassName}`}>
      <div
        className={`ds:flex ds:flex-col ds:w-full ds:gap-2 ds:justify-center ${
          !overlay && isOpen ? "ds:md:mb-5 ds:mb-5" : "ds:mb-4m"
        }`}
        ref={wrapperRef}
      >
        <DropdownInputField
          placeholderText={placeholderText}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          value={selectedDate}
          className={buttonClassName}
          disabled={disabled}
        />
        {isOpen && (
          <div
            className={
              overlay
                ? "ds:absolute ds:top-full ds:left-0 ds:z-50 ds:mt-1 ds:w-full"
                : ""
            }
          >
            <ReactDatePicker
              selected={selected}
              onSelect={handleDateSelect}
              minDate={availableDates[0]}
              maxDate={availableDates[availableDates.length - 1]}
              calendarClassName="calendar-style ds:md:justify-center ds:px-2 ds:w-full"
              renderDayContents={(day, date) => (
                <div
                  key={date.toDateString()}
                  className={`.react-datepicker__day--selected ds:flex ds:justify-center ds:items-center ds:md:h-[55px] ds:md:w-[77px]`}
                >
                  <div className={`ds:font-lg ${getDayClassName(date)}`}>
                    {day}
                  </div>
                </div>
              )}
              showPopperArrow={false}
              locale="en-GB"
              dateFormat="EEEE, MMM dd yyyy"
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
};
