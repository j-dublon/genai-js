"use client";

import React, { useEffect, useState } from "react";

interface DateOption {
  value: string;
  display: string;
  fullDate: string;
}

export interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  formatDisplayDate: (date: string) => string;
  placeholderText?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
  formatDisplayDate,
  placeholderText = "Select an installation date...",
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [firstAvailableDate, setFirstAvailableDate] = useState<string | null>(
    null,
  );

  const getDates = (): DateOption[] => {
    const dates = [];
    const today = new Date();

    for (let i = 3; i < 17; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dateValue = date.toISOString().split("T")[0];

      const shortDisplay = date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      dates.push({
        value: dateValue,
        display: shortDisplay,
        fullDate: dateValue,
      });
    }

    return dates;
  };

  const availableDates = getDates();

  useEffect(() => {
    if (availableDates.length > 0 && !firstAvailableDate) {
      setFirstAvailableDate(availableDates[0].value);
    }
  }, [availableDates, firstAvailableDate]);

  const handleDateSelect = (dateValue: string) => {
    onDateSelect(dateValue);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const getDisplayText = () => {
    if (selectedDate) {
      return formatDisplayDate(selectedDate);
    } else if (firstAvailableDate) {
      return formatDisplayDate(firstAvailableDate);
    } else {
      return placeholderText;
    }
  };

  return (
    <div className="relative">
      <button
        className="w-full p-3 border border-ui-grey-300 rounded-md text-left bg-core-white"
        onClick={toggleDatePicker}
        type="button"
      >
        <span>{getDisplayText()}</span>
      </button>

      {showDatePicker && (
        <div className="absolute z-10 mt-1 w-full bg-core-white border border-ui-grey-300 rounded-md shadow-lg">
          <div className="p-2 grid grid-cols-3 gap-2">
            {availableDates.map((date) => (
              <button
                key={date.value}
                className={`p-2 rounded-md text-center hover:bg-ui-grey-100 ${
                  selectedDate === date.value
                    ? "bg-secondary-yellow text-core-black font-medium"
                    : ""
                }`}
                onClick={() => handleDateSelect(date.value)}
              >
                {date.display}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
