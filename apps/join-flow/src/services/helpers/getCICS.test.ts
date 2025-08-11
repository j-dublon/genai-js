import { squidAPI } from "@cuckoointernet/util-squid-network-requests";

import { CicsResponse, getCICS } from "./getCICS";

vi.mock("@cuckoointernet/util-squid-network-requests", async () => {
  const actual = await vi.importActual(
    "@cuckoointernet/util-squid-network-requests",
  );
  return {
    ...actual,
    squidAPI: {
      getCICS: vi.fn(),
    },
  };
});
const mockGetCICS = vi.mocked(squidAPI.getCICS);

describe("When getting contract information / summary for a customer", () => {
  afterEach(() => {
    mockGetCICS.mockClear();
  });

  it("fetches the contract links correctly", async () => {
    mockGetCICS.mockResolvedValue({
      summaryHref: "https://s3.cuckoo.co/contractSummary",
      informationHref: "https://s3.cuckoo.co/contractInformation",
    });

    const expectedResponse: CicsResponse = {
      success: true,
      data: {
        contractSummary: "https://s3.cuckoo.co/contractSummary",
        contractInformation: "https://s3.cuckoo.co/contractInformation",
      },
    };

    const actualResponse = await getCICS("abc");
    expect(actualResponse).toStrictEqual(expectedResponse);
  });

  it("fails gracefully if we cannot get the contract information", async () => {
    mockGetCICS.mockImplementationOnce(() => {
      throw new Error("Some 4XX or 5XX response");
    });

    const actualResponse = await getCICS("123");

    expect(actualResponse).toStrictEqual({
      error: {
        type: "unknownError",
        message: "An unexpected error occurred",
        details: ["Some 4XX or 5XX response"],
      },
    });
  });
});
