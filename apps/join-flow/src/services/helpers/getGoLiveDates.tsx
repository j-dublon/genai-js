import { squidAPI } from "@cuckoointernet/util-squid-network-requests";

export const getGoLiveDates = async (): Promise<string[]> => {
  try {
    const response = await squidAPI.getGoLiveDates();

    if (response.length > 0) {
      return response;
    } else return [];
  } catch {
    return [];
  }
};
