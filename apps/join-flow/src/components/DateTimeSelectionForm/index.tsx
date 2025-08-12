import { zodResolver } from "@hookform/resolvers/zod";
import {
  AccessibleLoadingEgg,
  Button,
  DatePicker,
  LoadingSlide,
  TipCard,
} from "@react-component-library/ui";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormDropdown } from "@/components/FormDropdown";
import { getAssetPath } from "@/lib/get-asset-path";
import { getTimeSlotsForDate } from "@/screens/GoLiveDate/utils/GoLiveDateUtils";
import { Appointment } from "@/services/helpers/getEngineerAppointments";
import {
  GoLiveDateFormValues,
  goLiveDateSchema,
} from "@/validation/join-flow-schema";

import { slide, text } from "./DateTimeSelectionFormProps";

interface DateTimeSelectionFormProps {
  availableAppointments: Appointment[];
  loadingAppointments: boolean;
  appointmentError?: string;
  requiresTimeSlot: boolean;
  defaultSelectedDate?: string | undefined;
  defaultTimeSlot?: string;
  availableDatesLabel: string;
  timeSlotLabel: string;
  timeSlotPlaceHolder: string;
  submitButtonText: string;
  onSubmit: (data: GoLiveDateFormValues) => void | Promise<void>;
  submitButtonAlignment?: "left" | "center" | "right";
  submitButtonFullWidth?: boolean;
  className?: string;
  showSubmitButton?: boolean;
  tipCard?: React.ReactNode;
  isSubmitting?: boolean;
  onRetry?: () => void | Promise<void>;
}

export const DateTimeSelectionForm: React.FC<DateTimeSelectionFormProps> = ({
  availableAppointments,
  loadingAppointments,
  appointmentError,
  requiresTimeSlot,
  defaultSelectedDate = "",
  defaultTimeSlot = "",
  availableDatesLabel,
  timeSlotLabel,
  timeSlotPlaceHolder,
  submitButtonText,
  submitButtonFullWidth,
  submitButtonAlignment = "left",
  onSubmit,
  className = "",
  showSubmitButton = true,
  tipCard,
  isSubmitting,
  onRetry,
}) => {
  const initialTimeslots: Record<string, string> = defaultTimeSlot
    ? { [defaultTimeSlot]: defaultTimeSlot }
    : {};

  const [timeslots, setTimeslots] =
    useState<Record<string, string>>(initialTimeslots);

  const defaultValues = useMemo(
    () => ({
      selectedDate: defaultSelectedDate,
      timeSlot: defaultTimeSlot,
    }),
    [defaultSelectedDate, defaultTimeSlot],
  );

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<GoLiveDateFormValues>({
    resolver: zodResolver(goLiveDateSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const selectedDate = watch("selectedDate");

  useEffect(() => {
    const availableTimeSlots = getTimeSlotsForDate(
      availableAppointments,
      selectedDate,
    );

    const newTimeslots = availableTimeSlots.reduce(
      (
        acc: Record<string, string>,
        slot: { label: string | number; selectionIdentifier: string },
      ) => {
        acc[slot.label] = slot.selectionIdentifier;
        return acc;
      },
      {} as Record<string, string>,
    );

    setTimeslots(newTimeslots);

    if (selectedDate && selectedDate !== defaultSelectedDate) {
      setValue("timeSlot", "");
    }
  }, [availableAppointments, selectedDate, defaultSelectedDate, setValue]);

  const handleFormSubmit = async (data: GoLiveDateFormValues) => {
    if (requiresTimeSlot && !data.timeSlot) {
      setError("timeSlot", {
        type: "manual",
        message: "Please select a time slot",
      });
      return;
    }

    await onSubmit(data);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-md font-semibold mb-4">
              {availableDatesLabel}
            </h2>

            {loadingAppointments ? (
              <div className="flex justify-center">
                <LoadingSlide
                  src={getAssetPath(slide.src)}
                  message={slide.message || ""}
                />
              </div>
            ) : appointmentError ? (
              <TipCard
                image={getAssetPath("/images/stop-hand.svg")}
                backgroundColor="orange"
                className="mt-10 md:mt-0 mb-10 md:mb-6 justify-center md:w-full items-center"
              >
                <span className="font-semibold">{text.errorTipCardText}</span>
              </TipCard>
            ) : (
              <>
                <Controller
                  name="selectedDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      availableDates={availableAppointments.map(
                        (appointment) => appointment.startDateTime,
                      )}
                      selectedDate={field.value}
                      onDateSelect={(date) => field.onChange(date)}
                      disabled={loadingAppointments}
                    />
                  )}
                />
                {errors.selectedDate && (
                  <p className="text-ui-error text-sm mt-1">
                    {errors.selectedDate.message}
                  </p>
                )}
              </>
            )}
          </div>

          {selectedDate &&
            requiresTimeSlot &&
            !appointmentError &&
            !loadingAppointments && (
              <div className="mb-6">
                <FormDropdown
                  dropdownLabel={timeSlotLabel}
                  control={control}
                  name="timeSlot"
                  dropdownPlaceholder={timeSlotPlaceHolder}
                  options={timeslots}
                  errorMessage={errors?.timeSlot?.message}
                />
              </div>
            )}
        </div>

        {tipCard && <div className="mb-6">{tipCard}</div>}

        {showSubmitButton && !appointmentError && (
          <div
            className={`flex mt-10 md:mt-12 ${
              submitButtonAlignment === "right"
                ? "justify-end"
                : submitButtonAlignment === "center"
                  ? "justify-center"
                  : "justify-start"
            }`}
          >
            <Button
              tint="yellow"
              variant="solid"
              type="submit"
              fullWidth={submitButtonFullWidth}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <AccessibleLoadingEgg />
                  Updating...
                </div>
              ) : (
                submitButtonText
              )}
            </Button>
          </div>
        )}

        {appointmentError && (
          <Button
            type="button"
            tint="yellow"
            variant="solid"
            fullWidth={submitButtonFullWidth}
            onClick={onRetry}
          >
            {text.retryButtonText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default DateTimeSelectionForm;
