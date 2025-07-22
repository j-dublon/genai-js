"use client";

import {
  ColorPill,
  TipCard,
  useClickOutside,
} from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { DateTimeSelectionForm } from "@/components/DateTimeSelectionForm";
import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useClearFocus } from "@/hooks/useClearFocus";
import { PILL_FADE_OUT_DELAY, PILL_HIDE_DELAY } from "@/lib/constants";
import { getAssetPath } from "@/lib/get-asset-path";
import { Appointment } from "@/services/helpers/getEngineerAppointments";
import { getGoLiveDates } from "@/services/helpers/getGoLiveDates";
import { updateBasket } from "@/services/helpers/updateBasket";
import { GoLiveDateFormValues } from "@/validation/join-flow-schema";

import { EngineerVisitModal } from "./components/EngineerVisitModal";
import { OtsFailBanner } from "./components/OtsFailBanner";
import { goLiveDateText } from "./GoLiveDateProps";
import { fetchEngineerAppointments } from "./utils/GoLiveDateUtils";

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
  const [showPill, setShowPill] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
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
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentError, setAppointmentError] = useState<string>();
  const [documentID, setDocumentID] = useState<string>("");

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
    setShowPill(true);
    setFadeOut(false);

    const fadeOuttimer = setTimeout(
      () => setFadeOut(true),
      PILL_FADE_OUT_DELAY,
    );
    const hidePillTimer = setTimeout(() => setShowPill(false), PILL_HIDE_DELAY);

    return () => {
      clearTimeout(fadeOuttimer);
      clearTimeout(hidePillTimer);
    };
  }, []);

  const handleFormSubmit = async (data: GoLiveDateFormValues) => {
    try {
      if (!basket) {
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
        return;
      }
    } catch {
      return;
    }

    let engineerTimeSlot = undefined;

    if (selectedPackage?.installationRequired && data.timeSlot) {
      const formDate = new Date(data.selectedDate);
      const year = formDate.getFullYear();
      const month = String(formDate.getMonth() + 1).padStart(2, "0");
      const day = String(formDate.getDate()).padStart(2, "0");
      const formDateISO = `${year}-${month}-${day}`;

      const selectedAppointment = availableAppointments.find((appointment) => {
        const appointmentDate = appointment.startDateTime
          .toISOString()
          .split("T")[0];

        return (
          appointmentDate === formDateISO &&
          appointment.selectionIdentifier === data.timeSlot
        );
      });

      if (selectedAppointment) {
        engineerTimeSlot = {
          startDateTime: selectedAppointment.startDateTime.toISOString(),
          endDateTime: selectedAppointment.endDateTime.toISOString(),
          selectionIdentifier: selectedAppointment.selectionIdentifier!,
        };
      }
    }

    setGoLiveDetails({
      selectedDate: data.selectedDate,
      engineerTimeSlot,
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

        {switchingDetails?.otsSwitchStatus === "SWITCH_SUCCESS" && showPill && (
          <div className="flex justify-center mb-6 pt-6">
            <ColorPill
              colorPillText="Switching successful"
              backgroundColor="offer-gradient"
              size="small"
              icon={<TickWithCircle circleFill="none" tickFill="black" />}
              className={`px-4 pt-2 pb-2.5 transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}
            />
          </div>
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

          <DateTimeSelectionForm
            availableAppointments={availableAppointments}
            loadingAppointments={loadingAppointments}
            appointmentError={appointmentError}
            requiresTimeSlot={selectedPackage?.installationRequired || false}
            defaultSelectedDate={goLiveDetails?.selectedDate}
            defaultTimeSlot={
              goLiveDetails?.engineerTimeSlot?.selectionIdentifier
            }
            availableDatesLabel={availableDatesLabel}
            timeSlotLabel={timeSlotLabel}
            timeSlotPlaceHolder={timeSlotPlaceHolder}
            submitButtonText={continueButtonText}
            onSubmit={handleFormSubmit}
            className="pt-12"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GoLiveDate;
