import { useRouter } from "next/navigation";
import { useCallback } from "react";

import {
  Appointment,
  getEngineerAppointments,
} from "@/services/helpers/getEngineerAppointments";
import useJoinFlowStore from "@/store/useJoinFlowStore";

export const useFetchEngineerAppointments = () => {
  const { setErrorInfo } = useJoinFlowStore();
  const router = useRouter();

  const fetchEngineerAppointments = useCallback(
    async (
      setAppointmentError: (error: string | undefined) => void,
      setAvailableAppointments: (appointments: Appointment[]) => void,
      setDocumentID: (documentID: string) => void,
      quoteLookup: string,
    ) => {
      try {
        setAppointmentError(undefined);
        const response = await getEngineerAppointments(quoteLookup);
        if (response.error) {
          const errorType = response.error.type;
          switch (errorType) {
            case "noAppointmentsFound":
            case "generalError":
              setAppointmentError("Failed to fetch engineer appointments");
              break;
            case "joinSuspended":
              router.push("/join-flow/register-interest/unavailable");
              return;
            case "basketError":
            case "networkError":
            case "validationError":
            case "unknownError":
            default:
              setErrorInfo({ type: errorType });
              router.push("/join-flow/error");
              return;
          }
        }

        const appointments = response.appointments;
        setDocumentID(response.documentID);

        setAvailableAppointments(appointments);
      } catch {
        setErrorInfo({ type: "unknownError" });
        router.push("/join-flow/error");
        return;
      }
    },
    [setErrorInfo, router],
  );

  return { fetchEngineerAppointments };
};
