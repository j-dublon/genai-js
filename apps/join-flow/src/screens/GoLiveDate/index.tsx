"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DatePicker,
  TipCard,
  useClickOutside,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Footer } from "@/components/Footer";
import { FormDropdown } from "@/components/FormDropdown";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useClearFocus } from "@/hooks/useClearFocus";
import { getAssetPath } from "@/lib/get-asset-path";
import { Appointment } from "@/services/helpers/getEngineerAppointments";
import { getGoLiveDates } from "@/services/helpers/getGoLiveDates";
import { updateBasket } from "@/services/helpers/updateBasket";
import {
  GoLiveDateFormValues,
  goLiveDateSchema,
} from "@/validation/join-flow-schema";

import { EngineerVisitModal } from "./components/EngineerVisitModal";
import { OtsFailBanner } from "./components/OtsFailBanner";
import { goLiveDateText } from "./GoLiveDateProps";
import {
  fetchEngineerAppointments,
  getTimeSlotsForDate,
} from "./utils/GoLiveDateUtils";

export const GoLiveDate = () => {
  const {
    title,
    subtitle,
    paragraph,
    engineerLink,
    availableDatesLabel,
    timeSlotLabel,
    timeSlotPlaceHolder,
    continueButtonText,
    otsFailBannerText,
    otsFailBannerHighlightText,
  } = goLiveDateText;

  const router = useRouter();
  const {
    setGoLiveDetails,
    goLiveDetails,
    setCurrentStep,
    switchingDetails,
    basket,
    setBasket,
    selectedPackage,
  } = useJoinFlowStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  const closeEngineerModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  useClickOutside(modalRef, isModalOpen, closeEngineerModal);
  useClearFocus(modalRef, "close");
  const [availableAppointments, setAvailableAppointments] = useState<
    Appointment[]
  >([]);
  const initialTimeslots: Record<string, string> =
    goLiveDetails?.engineerTimeSlot
      ? {
          [goLiveDetails.engineerTimeSlot]: goLiveDetails.engineerTimeSlot,
        }
      : {};

  const [timeslots, setTimeslots] =
    useState<Record<string, string>>(initialTimeslots);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentError, setAppointmentError] = useState<string>();
  const [documentID, setDocumentID] = useState<string>("");

  const defaultValues = useMemo(
    () => ({
      selectedDate: goLiveDetails?.selectedDate || "",
      timeSlot: goLiveDetails?.engineerTimeSlot || "",
    }),
    [goLiveDetails?.selectedDate, goLiveDetails?.engineerTimeSlot],
  );

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<GoLiveDateFormValues>({
    resolver: zodResolver(goLiveDateSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const selectedDate = watch("selectedDate");

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPackage?.installationRequired) {
        fetchEngineerAppointments(
          setAppointmentError,
          setAvailableAppointments,
          setLoadingAppointments,
          setDocumentID,
          basket?.product?.quoteLookup?.value as string,
        );
      } else {
        const goLiveDates = await getGoLiveDates();
        setAvailableAppointments(
          goLiveDates.map((date) => ({
            startDateTime: new Date(date),
            endDateTime: new Date(date),
            type: "allDay",
          })),
        );
        setLoadingAppointments(false);
      }
    };
    // TODO: take user to error screen if no quote lookup
    if (basket?.product?.quoteLookup?.value) {
      fetchData();
    }
  }, [
    basket?.product?.quoteLookup?.value,
    selectedPackage?.installationRequired,
  ]);

  useEffect(() => {
    const availableTimeSlots = getTimeSlotsForDate(
      availableAppointments,
      selectedDate,
    );
    setTimeslots(
      availableTimeSlots.reduce(
        (acc, slot) => {
          acc[slot.label] = slot.selectionIdentifier;
          return acc;
        },
        {} as Record<string, string>,
      ),
    );
  }, [availableAppointments, selectedDate]);

  const onSubmit = async (data: GoLiveDateFormValues) => {
    try {
      if (!basket) {
        console.error("No basket available");
        return;
      }
      if (selectedPackage?.installationRequired && !data.timeSlot) {
        setError("timeSlot", {
          type: "manual",
          message: "Please select a time slot",
        });
        return;
      }
      let result;
      if (selectedPackage?.installationRequired) {
        result = await updateBasket(basket.id, {
          engineer: {
            engineerAppointment: documentID,
            selectionIdentifier: data.timeSlot,
          },
        });
      } else {
        result = await updateBasket(basket.id, {
          goLiveDate: data.selectedDate,
        });
      }

      if (result.basket) {
        setBasket(result.basket);
      } else if (result.error) {
        console.error("Failed to update basket:", result.error);
        return;
      }
    } catch (error) {
      console.error("Unexpected error updating basket:", error);
      return;
    }
    setGoLiveDetails({
      selectedDate: data.selectedDate,
      engineerTimeSlot: data?.timeSlot || "",
    });
    setCurrentStep(4);
    router.push("/join-flow/payment-details");
  };

  if (!basket?.product?.quoteLookup?.value) {
    console.error("no quoting code available");
    return;
  }

  const otsSwitchFailedOrSkipped =
    switchingDetails?.otsSwitchStatus === "OTS_FAILED" ||
    switchingDetails?.otsSwitchStatus === "SKIPPED";

  return (
    <>
      <StepNavigationWithBasket step={3} />
      <div className="container md:max-w-[758px] mx-auto px-4 pb-8 pt-10 lg:pt-20">
        {otsSwitchFailedOrSkipped && (
          <OtsFailBanner
            bannerText={otsFailBannerText}
            highlightText={otsFailBannerHighlightText}
          />
        )}

        {/* TODO: replace with Toast pill once we have it */}
        {switchingDetails?.otsSwitchStatus === "SWITCH_SUCCESS" && (
          <p className="mb-4">Switch successful!</p>
        )}

        <div
          className={`max-w-[758px] px-5 md:px-24 ${
            otsSwitchFailedOrSkipped ? "pt-20" : ""
          }`}
        >
          <h1 className="grid text-2xl font-bold pb-2 md:pb-16 justify-center">
            {title}
          </h1>
          <TipCard
            image={getAssetPath("/images/love.svg")}
            className="mt-10 md:mt-0 mb-10 md:mb-6 bg-secondary-green justify-center md:w-full items-center"
          >
            Yay! We can get you live as early as{" "}
            {availableAppointments.length > 0 ? (
              <span className="font-medium">
                {availableAppointments[0].startDateTime.toLocaleDateString(
                  "en-GB",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </span>
            ) : (
              <span>....</span>
            )}
          </TipCard>
          <p className="text-core-black text-sm leading-[26px] font-medium mb-3">
            {subtitle}
          </p>
          <p className="text-ui-grey-500 text-sm leading-[26px] mb-3">
            {paragraph}
          </p>
          <button
            onClick={() => {
              modalRef.current?.showModal();
              setIsModalOpen(true);
            }}
            className="text-ui-link underline text-sm leading-[26px] font-medium pb-12 bg-transparent border-none cursor-pointer p-0"
          >
            {engineerLink}
          </button>
          <EngineerVisitModal
            modalRef={modalRef}
            modalContent={goLiveDateText.engineerVisitModal}
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 pt-12">
              <div className="mb-6">
                <h2 className="text-md font-semibold mb-4">
                  {availableDatesLabel}
                </h2>

                {appointmentError && (
                  <div className="text-ui-error">{appointmentError}</div>
                )}

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
              </div>

              {selectedDate && selectedPackage?.installationRequired && (
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

            <div className="flex mt-8">
              <Button
                tint="yellow"
                variant="solid"
                type="submit"
                fullWidth={true}
              >
                {continueButtonText}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GoLiveDate;
