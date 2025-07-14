import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

export interface Appointment {
  endDateTime: Date;
  startDateTime: Date;
  type: string;
  selectionIdentifier?: string;
}

export interface EngineerAppointmentResult {
  documentID: string;
  appointments: Appointment[];
  error?: {
    type:
      | "noAppointmentsFound"
      | "generalError"
      | "validationError"
      | "networkError"
      | "unknownError"
      | "pending";
    message: string;
    details?: string[];
  };
}

export const getEngineerAppointment = async (
  id: string,
  token?: string | null,
): Promise<EngineerAppointmentResult> => {
  try {
    const response = await squidAPI.getEngineerAppointment(id, token);

    if (response.state === "success" && response.data?.response?.appointments) {
      const appointments = response.data.response.appointments;
      return {
        documentID: response.data.documentID,
        appointments: appointments.map((item) => ({
          endDateTime: new Date(item.endDateTime),
          startDateTime: new Date(item.startDateTime),
          type: item.type,
          selectionIdentifier: item.selectionIdentifier,
        })),
      };
    }

    if (response.state === "pending") {
      return {
        documentID: response.documentID,
        appointments: [],
        error: {
          type: "pending",
          message: "Engineer appointment lookup is still in progress",
        },
      };
    }

    if (response.state === "error" && response.data?.errors) {
      const errors = response.data.errors;

      const noAppointmentsError = errors.find(
        (err) => err.blockType === "EngineerAppointmentsNonAvailable",
      );

      if (noAppointmentsError) {
        return {
          documentID: response.data.documentID,
          appointments: [],
          error: {
            type: "noAppointmentsFound",
            message: "No appointments found at this time",
          },
        };
      }

      return {
        documentID: response.data.documentID,
        appointments: [],
        error: {
          type: "generalError",
          message: "There was a problem with the engineer appointment lookup",
          details: errors.map(
            (err) => err.errorMessage || err.blockType || "Unknown error",
          ),
        },
      };
    }

    return {
      documentID: "",
      appointments: [],
      error: {
        type: "generalError",
        message: "No appointment data was returned",
      },
    };
  } catch (error) {
    console.error("Error in getEngineerAppointment:", error);

    if (error instanceof ValidationError) {
      return {
        documentID: "",
        appointments: [],
        error: {
          type: "validationError",
          message: "The appointment ID is invalid",
          details: error.details.map((err) =>
            err.path ? `${err.path} is invalid: ${err.message}` : err.message,
          ),
        },
      };
    }

    if (error instanceof FetchError) {
      return {
        documentID: "",
        appointments: [],
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    return {
      documentID: "",
      appointments: [],
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
