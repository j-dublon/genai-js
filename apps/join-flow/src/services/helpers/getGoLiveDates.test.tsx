import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { getGoLiveDates } from "@/services/helpers/getGoLiveDates";
import { squidAPI } from "@/services/payloadClient";

vi.mock("@/services/payloadClient");

describe("getGoLiveDates", () => {
  const mockedSquidAPI = squidAPI as unknown as {
    getGoLiveDates: Mock;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the response array when there are multiple go live dates", async () => {
    const mockDates = ["2024-07-01", "2024-07-02"];
    mockedSquidAPI.getGoLiveDates.mockResolvedValue(mockDates);

    const result = await getGoLiveDates();

    expect(result).toEqual(mockDates);
    expect(mockedSquidAPI.getGoLiveDates).toHaveBeenCalledTimes(1);
  });

  it("logs error and returns empty array when response has 0 dates", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockedSquidAPI.getGoLiveDates.mockResolvedValue([]);

    const result = await getGoLiveDates();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith("No go live dates available");

    consoleErrorSpy.mockRestore();
  });

  it("logs error and returns empty array on API failure", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const error = new Error("Network error");
    mockedSquidAPI.getGoLiveDates.mockRejectedValue(error);

    const result = await getGoLiveDates();

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error in getAppointments:",
      error,
    );

    consoleErrorSpy.mockRestore();
  });
});
