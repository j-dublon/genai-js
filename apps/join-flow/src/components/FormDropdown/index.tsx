import { InputField } from "@react-component-library/ui";
import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, Path } from "react-hook-form";

export interface FormDropDownProps<T extends Record<string, unknown>, V> {
  dropdownLabel?: string;
  control: Control<T>;
  name: Path<T>;
  dropdownPlaceholder: string;
  options: Record<string, V>;
  errorMessage?: string;
  showLabel?: boolean;
  initiallyOpen?: boolean;
  bottomButtonText?: string;
  bottomButtonOnClick?: () => void;
  showTick?: boolean;
  errorMessageStyling?: string;
}

export const FormDropdown = <T extends Record<string, unknown>, V>({
  dropdownLabel,
  control,
  name,
  dropdownPlaceholder,
  options,
  errorMessage,
  initiallyOpen = false,
  bottomButtonText,
  bottomButtonOnClick,
  showTick = true,
  errorMessageStyling = "text-ui-error text-sm mt-1",
}: FormDropDownProps<T, V>) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(initiallyOpen);
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
    <>
      <h2 className="text-sm font-medium mb-4">{dropdownLabel}</h2>
      <div ref={wrapperRef}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <>
                <div className="flex justify-center">
                  <InputField
                    setIsOpen={setIsDropDownOpen}
                    isOpen={isDropDownOpen}
                    placeholderText={dropdownPlaceholder}
                    value={
                      field.value
                        ? Object.keys(options).find((key) =>
                            isEqual(options[key], field.value),
                          )
                        : ""
                    }
                    showTick={showTick}
                  />
                </div>

                {isDropDownOpen && (
                  <div
                    className={`mt-1 w-full bg-core-white border border-ui-grey-300 shadow-lg max-h-[250px] md:max-h-[300px] overflow-y-auto ${bottomButtonText ? "rounded-t-xs" : "rounded-xs"}`}
                  >
                    <div className="p-4">
                      {Object.entries(options).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          className={`p-2 w-full text-left rounded-xs hover:bg-ui-grey-100 ${
                            isEqual(value, field.value)
                              ? "text-core-black font-medium"
                              : ""
                          }`}
                          onClick={() => {
                            field.onChange(value);
                            setIsDropDownOpen(false);
                          }}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {bottomButtonText && isDropDownOpen && (
                  <button
                    type="button"
                    className="p-4 w-full text-left rounded-b-xs text-core-black font-semibold block border-ui-grey-300 border border-t-0 hover:bg-ui-grey-100"
                    onClick={bottomButtonOnClick}
                  >
                    {bottomButtonText}
                  </button>
                )}
              </>
            );
          }}
        />
      </div>
      {errorMessage && <p className={errorMessageStyling}>{errorMessage}</p>}
    </>
  );
};
