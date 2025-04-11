import { ChevronVerticalWithCircle } from "@icons/ChevronVerticalWithCircle";
import { enGB } from "date-fns/locale/en-GB";
import { forwardRef, useEffect, useRef, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";

export interface DatePickerProps {
  availableDates: Date[];
  selectedDate: string;
  onDateSelect: (date: string | undefined) => void;
  placeholderText?: string;
}

registerLocale("en-GB", enGB);

interface CustomInputProps {
  isOpen: boolean;
  placeholderText: string;
  setIsOpen: (arg0: boolean) => void;
  value?: string;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, placeholderText, isOpen, setIsOpen }, ref) => (
    <button
      className="ds:border ds:border-ui-grey-400 ds:rounded-xs ds:p-2 ds:w-[350px] ds:md:w-[565px] ds:h-16 ds:flex ds:justify-between ds:items-center"
      onClick={() => {
        if (setIsOpen) setIsOpen(!isOpen);
      }}
      ref={ref}
    >
      <span>{value || placeholderText}</span>
      <div
        data-testid="arrow-icon"
        className={`ds:absolute ds:right-2 ds:top-1/2 ds:transform ds:-translate-y-1/2 ds:text-gray-500 ds:pointer-events-none ${
          isOpen ? "" : "ds:rotate-180"
        }`}
      >
        <ChevronVerticalWithCircle width={32} height={32} />
      </div>
    </button>
  ),
);
CustomInput.displayName = "Custom input";

export const DatePicker = ({
  availableDates,
  selectedDate,
  onDateSelect,
  placeholderText = "Please select a date",
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
    <div
      className={`ds:flex ds:relative ds:my-4 ds:justify-center ds:w-full ${isOpen ? "ds:md:mb-110 ds:mb-70" : "ds:mb-4m"}`}
    >
      <div ref={wrapperRef}>
        <ReactDatePicker
          selected={selected}
          onSelect={handleDateSelect}
          minDate={availableDates[0]}
          maxDate={availableDates[availableDates.length - 1]}
          className="ds:border ds:border-ui-grey-400 ds:rounded-xs ds:p-2 ds:w-[375px] ds:md:w-[565px] ds:h-16"
          calendarClassName="calendar-style ds:md:justify-center ds:w-[350px] ds:md:w-[565px] ds:px-2"
          renderDayContents={(day, date) => (
            <div
              className={`.react-datepicker__day--selected ds:flex ds:justify-center ds:items-center ds:md:h-[55px] ds:md:w-[77px]`}
            >
              <div className={`ds:font-lg ${getDayClassName(date)}`}>{day}</div>
            </div>
          )}
          popperModifiers={[
            {
              name: "remove-flip",
              fn: () => ({ reset: { placement: "bottom", rects: true } }),
            },
          ]}
          showPopperArrow={false}
          popperPlacement="bottom"
          locale="en-GB"
          dateFormat="EEEE, MMM dd yyyy"
          placeholderText={placeholderText}
          open={isOpen}
          onCalendarClose={() => setIsOpen(false)}
          onCalendarOpen={() => setIsOpen(true)}
          customInput={
            <CustomInput
              placeholderText={placeholderText}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          }
        />
      </div>
    </div>
  );
};
