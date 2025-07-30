"use client";

import {
  ColorPill,
  LoadingModal,
  TipCard,
  useClickOutside,
} from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect, useRef, useState } from "react";

import { DateTimeSelectionForm } from "@/components/DateTimeSelectionForm";
import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useClearFocus } from "@/hooks/useClearFocus";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { PILL_FADE_OUT_DELAY, PILL_HIDE_DELAY } from "@/lib/constants";
import { getAssetPath } from "@/lib/get-asset-path";
import { Appointment } from "@/services/helpers/getEngineerAppointments";
import { getGoLiveDates } from "@/services/helpers/getGoLiveDates";
import { updateBasket } from "@/services/helpers/updateBasket";
import { GoLiveDateFormValues } from "@/validation/join-flow-schema";

import { EngineerVisitModal } from "./components/EngineerVisitModal";
import { OtsFailBanner } from "./components/OtsFailBanner";
import { goLiveDateText, slides } from "./GoLiveDateProps";
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
    tipCardText,
  } = goLiveDateText;

  const router = useRouter();
  const posthog = usePostHog();
  const {
    setGoLiveDetails,
    goLiveDetails,
    setCurrentStep,
    switchingDetails,
    basket,
    setBasket,
    selectedPackage,
    isLoadingModalOpen,
    setIsLoadingModalOpen,
  } = useJoinFlowStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPill, setShowPill] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });

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
      setLoadingAppointments(true);

      try {
        if (selectedPackage?.installationRequired) {
          await fetchEngineerAppointments(
            setAppointmentError,
            setAvailableAppointments,
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
        }
        setLoadingAppointments(false);
      } catch (error) {
        setAppointmentError("Failed to fetch go-live dates");
        console.error("Failed to fetch dates", error);
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
    posthog.capture("join_flow_submitted_go_live_date");
    try {
      if (!basket) {
        return;
      }

      let result;
      setIsLoadingModalOpen(true);

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
        setIsLoadingModalOpen(false);
        return;
      }
    } catch (error) {
      setIsLoadingModalOpen(false);
      console.error("Error in handleFormSubmit", error);
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
    setIsLoadingModalOpen(false);
    return;
  }

  const otsSwitchFailedOrSkipped =
    switchingDetails?.otsSwitchStatus === "OTS_FAILED" ||
    switchingDetails?.otsSwitchStatus === "SKIPPED";

  return (
    <>
      <LoadingModal
        modalRef={loadingModalRef}
        slides={slidesWithAssetPath}
        loading={isLoadingModalOpen}
      />
      <StepNavigationWithBasket step={3} />
      <div className="container md:max-w-[758px] mx-auto px-4 md:pb-16 pt-10 lg:pt-20">
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
          <h1 className="grid text-2xl font-bold pb-10 md:pb-12 justify-center">
            {title}
          </h1>
          {!loadingAppointments &&
            !appointmentError &&
            availableAppointments.length > 0 && (
              <TipCard
                image={getAssetPath("/images/love.svg")}
                backgroundColor="green"
                className="mb-10 md:mb-6 justify-center md:w-full items-center"
              >
                {tipCardText}
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
              </TipCard>
            )}
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
            className="text-ui-link underline text-sm leading-[26px] font-medium bg-transparent border-none cursor-pointer p-0"
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
            className="pt-6 md:pt-12"
            submitButtonFullWidth
          />
          <hr className="mt-10 md:hidden border-ui-grey-300 bg-ui-grey-300 border w-full" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GoLiveDate;
