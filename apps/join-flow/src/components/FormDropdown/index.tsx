import { InputField } from "@react-component-library/ui";
import { useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

export interface FormData {
  timeSlot: string;
  selectedDate: string;
}

export interface FormDropDownProps {
  dropdownLabel: string;
  control: Control<FormData>;
  dropdownPlaceholder: string;
  options: string[];
  errorMessage?: string;
}

export const FormDropdown = ({
  dropdownLabel,
  control,
  dropdownPlaceholder,
  options,
  errorMessage,
}: FormDropDownProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={isDropDownOpen ? "md:mb-30 mb-30" : "mb-4"}>
      <h2 className="text-sm font-medium mb-4">{dropdownLabel}</h2>
      <div ref={wrapperRef}>
        <Controller
          name="timeSlot"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <div className="flex justify-center">
                <InputField
                  setIsOpen={setIsDropDownOpen}
                  isOpen={isDropDownOpen}
                  placeholderText={dropdownPlaceholder}
                  value={field.value}
                />
              </div>

              {isDropDownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-core-white border border-ui-grey-300 rounded-md shadow-lg">
                  <div className="p-2">
                    {options.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`p-2 w-full text-left rounded-md hover:bg-ui-grey-100 ${
                          field.value === slot
                            ? "bg-secondary-yellow text-core-black font-medium"
                            : ""
                        }`}
                        onClick={() => {
                          field.onChange(slot);
                          setIsDropDownOpen(false);
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        />
      </div>
      {errorMessage && (
        <p className="text-ui-error text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
