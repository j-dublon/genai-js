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
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Footer } from "@/components/Footer";
import { FormDropdown } from "@/components/FormDropdown";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useClearFocus } from "@/hooks/useClearFocus";
import { getAssetPath } from "@/lib/get-asset-path";
import PaymentDetails from "@/screens/PaymentDetails";
import {
  Appointment,
  getEngineerAppointments,
} from "@/services/helpers/getEngineerAppointments";
import {
  GoLiveDateFormValues,
  goLiveDateSchema,
} from "@/validation/join-flow-schema";

import { EngineerVisitModal } from "./components/EngineerVisitModal";
import { OtsFailBanner } from "./components/OtsFailBanner";
import { goLiveDateText } from "./GoLiveDateProps";

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
  } = goLiveDateText;

  const router = useRouter();
  const {
    setGoLiveDetails,
    goLiveDetails,
    setCurrentStep,
    switchingDetails,
    basket,
  } = useJoinFlowStore();

  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
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
  const initialTimeslots: Record<string, string> = goLiveDetails?.engineerSlot
    ?.timeSlot
    ? {
        [goLiveDetails.engineerSlot.timeSlot]:
          goLiveDetails.engineerSlot.timeSlot,
      }
    : {};

  const [timeslots, setTimeslots] =
    useState<Record<string, string>>(initialTimeslots);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentError, setAppointmentError] = useState<string>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GoLiveDateFormValues>({
    resolver: zodResolver(goLiveDateSchema),
    defaultValues: {
      selectedDate: goLiveDetails?.selectedDate || "",
      timeSlot: goLiveDetails?.engineerSlot?.timeSlot || "",
    },
    mode: "onSubmit",
  });

  const selectedDate = watch("selectedDate");

  const timeSlotLabelMap: Record<string, string> = {
    am: "8am - 1pm",
    pm: "1pm - 6pm",
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getEngineerAppointments(
          basket?.product?.quoteLookup as string,
        );
        if (response.error) {
          console.error("Failed to fetch engineer appointments");
          setAppointmentError("Failed to fetch engineer appointments");
        }

        const appointments = response.appointments || [];

        setAvailableAppointments(appointments);
      } catch (error) {
        console.error("Failed to fetch engineer appointments", error);
        setAppointmentError("Failed to fetch engineer appointments");
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [basket?.product?.quoteLookup]);

  useEffect(() => {
    const getTimeSlotsForDate = (
      appointments: Appointment[],
      selectedDate: string,
    ): string[] => {
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);

      const appointmentsOnDate = appointments.filter((appt) => {
        const apptDate = new Date(appt.startDateTime);
        apptDate.setHours(0, 0, 0, 0);
        return apptDate.getTime() === selected.getTime();
      });

      const uniqueTypes = Array.from(
        new Set(appointmentsOnDate.map((appt) => appt.type)),
      );

      const availableSlots = uniqueTypes
        .map((type) => timeSlotLabelMap[type])
        .filter(Boolean) as string[];

      return availableSlots;
    };

    const availableTimeSlots = getTimeSlotsForDate(
      availableAppointments,
      selectedDate,
    );
    setTimeslots(
      availableTimeSlots.reduce(
        (acc, label) => {
          acc[label] = label;
          return acc;
        },
        {} as Record<string, string>,
      ),
    );
  }, [availableAppointments, selectedDate]);

  const onSubmit = (data: GoLiveDateFormValues) => {
    setGoLiveDetails({
      selectedDate: data.selectedDate,
      engineerSlot: {
        date: data.selectedDate,
        timeSlot: data.timeSlot,
      },
    });
    setCurrentStep(4);
    setShowPaymentDetails(true);
    router.push("/join-flow/payment-details");
  };

  const handlePaymentDetailsBack = () => {
    setShowPaymentDetails(false);
  };

  const handlePaymentDetailsComplete = () => {
    setCurrentStep(5);
    router.push("/join-flow/order-summary");
  };

  if (showPaymentDetails) {
    return (
      <PaymentDetails
        onGoBack={handlePaymentDetailsBack}
        onComplete={handlePaymentDetailsComplete}
      />
    );
  }

  if (!basket?.product?.quoteLookup) {
    console.error("no quoting code available");
    return;
  }

  return (
    <>
      <StepNavigationWithBasket step={3} />
      <div className="container md:max-w-[565px] mx-auto px-4 pb-8 pt-10 lg:pt-20">
        {switchingDetails?.otsSwitchStatus === "OTS_FAILED" && (
          <OtsFailBanner bannerText={otsFailBannerText} />
        )}

        {/* TODO: replace with Toast pill once we have it */}
        {switchingDetails?.otsSwitchStatus === "SWITCH_SUCCESS" && (
          <p className="mb-4">Switch successful!</p>
        )}

        <div className="max-w-3xl mx-auto pt-[38px]">
          <h1 className="grid text-2xl font-bold pb-2 md:pb-16 justify-center">
            {title}
          </h1>
          <TipCard
            image={{
              src: getAssetPath("/images/love.svg"),
              alt: "Love heart speech bubble",
            }}
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

              {selectedDate && (
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
                disabled={!selectedDate}
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
