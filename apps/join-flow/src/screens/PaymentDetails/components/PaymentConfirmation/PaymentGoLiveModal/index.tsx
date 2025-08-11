import { InfoModal, TipCard } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DateTimeSelectionForm from "@/components/DateTimeSelectionForm";
import { getAssetPath } from "@/lib/get-asset-path";
import { goLiveDateText } from "@/screens/GoLiveDate/GoLiveDateProps";
import { fetchEngineerAppointments } from "@/screens/GoLiveDate/utils/GoLiveDateUtils";
import { getCICS } from "@/services/helpers/getCICS";
import { Appointment } from "@/services/helpers/getEngineerAppointments";
import { getGoLiveDates } from "@/services/helpers/getGoLiveDates";
import { updateBasket } from "@/services/helpers/updateBasket";
import { GoLiveDateFormValues } from "@/validation/join-flow-schema";

import { paymentGoLiveText } from "../paymentGoLiveDetailsProps";

interface PaymentGoLiveModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  setIsModalOpen?: (isOpen: boolean) => void;
  isModalOpen?: boolean;
}

export const PaymentGoLiveModal = ({
  modalRef,
  setIsModalOpen,
  isModalOpen = false,
}: PaymentGoLiveModalProps) => {
  const router = useRouter();
  const { availableDatesLabel, timeSlotLabel, timeSlotPlaceHolder } =
    goLiveDateText;

  const { switchingDetails } = useJoinFlowStore();

  const {
    setGoLiveDetails,
    goLiveDetails,
    basket,
    setBasket,
    selectedPackage,
    setErrorInfo,
  } = useJoinFlowStore();

  const [availableAppointments, setAvailableAppointments] = useState<
    Appointment[]
  >([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [appointmentError, setAppointmentError] = useState<string>();
  const [documentID, setDocumentID] = useState<string>("");
  const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!basket?.product?.quoteLookup?.value || hasDataBeenFetched) {
        return;
      }

      setLoadingAppointments(true);

      try {
        if (selectedPackage?.installationRequired) {
          await fetchEngineerAppointments(
            setAppointmentError,
            setAvailableAppointments,
            setDocumentID,
            basket.product.quoteLookup.value as string,
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
        setHasDataBeenFetched(true);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        setLoadingAppointments(false);
      }
    };

    if (isModalOpen && !hasDataBeenFetched) {
      fetchData();
    }
  }, [
    isModalOpen,
    basket?.product?.quoteLookup?.value,
    selectedPackage?.installationRequired,
    hasDataBeenFetched,
  ]);

  const handleFormSubmit = async (data: GoLiveDateFormValues) => {
    if (selectedPackage?.installationRequired && !data.timeSlot) {
      console.error("Time slot required but not provided");
      return;
    }

    try {
      if (!basket) {
        console.error("No basket available");
        return;
      }

      setIsSubmitting(true);
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
        const response = await getCICS(basket.id);
        if (response.success && response.data) {
          setBasket({
            ...result.basket,
            cics: {
              summaryHref: response.data.contractSummary,
              informationHref: response.data.contractInformation,
            },
          });
        } else if (response.error) {
          if (response.error.type === "networkError") {
            setErrorInfo({ type: "networkError" });
            router.push("/join-flow/error");
          } else {
            router.push("/join-flow/payment-details/contract-retrieval-failed");
          }
        }
        setIsSubmitting(false);
      } else if (result.error) {
        console.error("Failed to update basket:", result.error);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Unexpected error updating basket:", error);
      setIsSubmitting(false);
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
      } else {
        console.error("Could not find matching appointment");
        return;
      }
    }

    setGoLiveDetails({
      selectedDate: data.selectedDate,
      engineerTimeSlot,
    });

    modalRef.current?.close();
    setIsModalOpen?.(false);
  };

  const otsSwitchFailedOrSkipped =
    switchingDetails?.otsSwitchStatus === "OTS_FAILED" ||
    switchingDetails?.otsSwitchStatus === "SKIPPED";

  return (
    <InfoModal title={paymentGoLiveText.title} modalRef={modalRef}>
      <DateTimeSelectionForm
        availableAppointments={availableAppointments}
        loadingAppointments={loadingAppointments}
        appointmentError={appointmentError}
        requiresTimeSlot={selectedPackage?.installationRequired || false}
        defaultSelectedDate={goLiveDetails?.selectedDate}
        defaultTimeSlot={goLiveDetails?.engineerTimeSlot?.selectionIdentifier}
        availableDatesLabel={availableDatesLabel}
        timeSlotLabel={timeSlotLabel}
        timeSlotPlaceHolder={timeSlotPlaceHolder}
        submitButtonText={paymentGoLiveText.saveGoLiveInfo}
        submitButtonFullWidth={false}
        submitButtonAlignment="right"
        tipCard={
          <TipCard
            image={getAssetPath("/images/calender.svg")}
            backgroundColor={otsSwitchFailedOrSkipped ? "orange" : "green"}
            className="w-full"
          >
            <span className="font-bold">
              {paymentGoLiveText.textHightlight}{" "}
              <span className="font-normal">
                {otsSwitchFailedOrSkipped
                  ? paymentGoLiveText.goLiveInstructionSkipped
                  : paymentGoLiveText.goLiveInstruction}
              </span>{" "}
            </span>
          </TipCard>
        }
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        className="pt-12"
      />
    </InfoModal>
  );
};
