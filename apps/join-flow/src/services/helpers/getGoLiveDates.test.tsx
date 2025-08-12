import { squidAPI } from "@cuckoointernet/util-squid-network-requests";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { getGoLiveDates } from "@/services/helpers/getGoLiveDates";

vi.mock("@cuckoointernet/util-squid-network-requests");

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
    mockedSquidAPI.getGoLiveDates.mockResolvedValue([]);

    const result = await getGoLiveDates();

    expect(result).toEqual([]);
  });

  it("logs error and returns empty array on API failure", async () => {
    const error = new Error("Network error");
    mockedSquidAPI.getGoLiveDates.mockRejectedValue(error);

    const result = await getGoLiveDates();

    expect(result).toEqual([]);
  });
});
