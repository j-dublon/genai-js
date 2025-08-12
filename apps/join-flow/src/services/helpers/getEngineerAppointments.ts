import {
  FetchError,
  squidAPI,
  ValidationError,
} from "@cuckoointernet/util-squid-network-requests";

export interface Appointment {
  endDateTime: Date;
  startDateTime: Date;
  type: string;
  selectionIdentifier?: string;
}

export interface EngineerAppointmentLookupResult {
  documentID: string;
  appointments: Appointment[];
  error?: {
    type:
      | "noAppointmentsFound"
      | "generalError"
      | "validationError"
      | "networkError"
      | "joinSuspended"
      | "basketError"
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
        documentID: response.data.documentID,
        appointments: appointments.map((item) => ({
          endDateTime: new Date(item.endDateTime),
          startDateTime: new Date(item.startDateTime),
          type: item.type,
          selectionIdentifier: item.selectionIdentifier,
        })),
      };
    }

    if (response.state === "error" && response.data?.errors) {
      const errors = response.data.errors;
      const errorBlockTypes = errors.map((err) => err.blockType);

      if (errorBlockTypes.includes("JoinSuspended")) {
        return {
          documentID: "",
          appointments: [],
          error: {
            type: "joinSuspended",
            message: "Join flow is currently unavailable",
          },
        };
      }

      if (errorBlockTypes.includes("EngineerAppointmentsNonAvailable")) {
        return {
          documentID: "",
          appointments: [],
          error: {
            type: "noAppointmentsFound",
            message: "No appointments found at this time",
          },
        };
      }

      if (
        errorBlockTypes.includes(
          "EngineerAppointmentsCouldNotLoadQuoteLookup",
        ) ||
        errorBlockTypes.includes("EngineerAppointmentsInvalidQuoteLookup")
      ) {
        return {
          documentID: "",
          appointments: [],
          error: {
            type: "basketError",
            message: "Error loading quote lookup",
          },
        };
      }

      return {
        documentID: "",
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
    console.error("Error in getAppointments:", error);

    if (error instanceof ValidationError) {
      return {
        documentID: "",
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
