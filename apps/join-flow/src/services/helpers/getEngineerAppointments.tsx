import { squidAPI } from "@/services/payloadClient";
import { FetchError, ValidationError } from "@/services/payloadTypes";

export interface Appointment {
  endDateTime: Date;
  startDateTime: Date;
  type: string;
}

export interface EngineerAppointmentLookupResult {
  appointments: Appointment[];
  error?: {
    type:
      | "noAppointmentsFound"
      | "generalError"
      | "validationError"
      | "networkError"
      | "unknownError";
    message: string;
    details?: string[];
  };
}

export const getEngineerAppointments = async (
  id: string,
): Promise<EngineerAppointmentLookupResult> => {
  try {
    const response = await squidAPI.createEngineerAppointmentSync({
      quoteLookup: id,
    });

    if (response.state === "success" && response.data?.response?.appointments) {
      const appointments = response.data.response.appointments;
      return {
        appointments: appointments.map((item) => ({
          endDateTime: new Date(item.endDateTime),
          startDateTime: new Date(item.startDateTime),
          type: item.type,
        })),
      };
    }

    if (response.state === "error" && response.data?.errors) {
      const errors = response.data.errors;

      const noAppointmentsError = errors.find(
        (err) => err.blockType === "EngineerAppointmentsNonAvailable",
      );

      if (noAppointmentsError) {
        return {
          appointments: [],
          error: {
            type: "noAppointmentsFound",
            message: "No appointments found at this time",
          },
        };
      }
      return {
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
      appointments: [],
      error: {
        type: "generalError",
        message: "No appointment data was returned",
      },
    };
  } catch (error) {
    console.error("Error in getAppointments:", error);

    if (error instanceof ValidationError) {
      return {
        appointments: [],
        error: {
          type: "validationError",
          message: "The quoting code is invalid",
          details: error.details.map((err) =>
            err.path ? `${err.path} is invalid: ${err.message}` : err.message,
          ),
        },
      };
    }

    if (error instanceof FetchError) {
      return {
        appointments: [],
        error: {
          type: "networkError",
          message: `Server error: ${error.message}`,
          details: [`Status: ${error.response?.status}`],
        },
      };
    }

    return {
      appointments: [],
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: [error instanceof Error ? error.message : "Unknown error"],
      },
    };
  }
};
