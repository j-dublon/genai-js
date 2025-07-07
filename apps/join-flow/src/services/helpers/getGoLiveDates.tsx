import { squidAPI } from "../payloadClient";

export const getGoLiveDates = async (): Promise<string[]> => {
  try {
    const response = await squidAPI.getGoLiveDates();

    if (response.length > 0) {
      return response;
    }
    // TODO: error handling for no go live dates
    console.error("No go live dates available");
  } catch (error) {
    console.error("Error in getAppointments:", error);
  }
  return [];
};
