import { generateCICS } from "./generateCICS";

const mockGenerateCICS = vi.fn();
const mockSetBasket = vi.fn();

const basket = {
  createdAt: "2025-06-17T12:33:53.304Z",
  updatedAt: "2025-06-17T12:33:53.304Z",
  optIns: {},
  product: {
    quoteLookup: "6851600d0b63e386433ec807",
    selectionIdentifier: "4",
    extras: [],
  },
  engineer: {},
  billingAddress: {},
  personalDetails: {},
  sales: {},
  id: "685160b10b63e386433ec857",
  addressHistory: [],
};

vi.mock("../payloadClient", async () => {
  return {
    payloadAPI: {
      generateCICS: () => {
        return {
          success: true,
          cics: {
            summaryHref:
              "https://cuckoogb-test-user-documents.s3.path-to-contract-summary",
            informationHref:
              "https://cuckoogb-test-user-documents.s3.path-to-contract-summary",
          },
        };
      },
    },
  };
});

describe("When generating a CICS report", () => {
  it("returns and appends CICS data to an exisitng basket", async () => {
    const expectedBasket = {
      createdAt: "2025-06-17T12:33:53.304Z",
      updatedAt: "2025-06-17T12:33:53.304Z",
      cics: {
        summaryHref:
          "https://cuckoogb-test-user-documents.s3.path-to-contract-summary",
        informationHref:
          "https://cuckoogb-test-user-documents.s3.path-to-contract-summary",
      },
      optIns: {},
      product: {
        quoteLookup: "6851600d0b63e386433ec807",
        selectionIdentifier: "4",
        extras: [],
      },
      engineer: {},
      billingAddress: {},
      personalDetails: {},
      sales: {},
      id: "685160b10b63e386433ec857",
      addressHistory: [],
    };

    mockGenerateCICS.mockReturnValue({
      success: true,
      cics: {
        summaryHref:
          "https://cuckoogb-test-user-documents.s3.path-to-contract-summary",
        informationHref:
          "https://cuckoogb-test-user-documents.s3.path-to-contract-summary",
      },
    });

    await generateCICS(basket, mockSetBasket);

    expect(mockSetBasket).toHaveBeenCalledWith(expectedBasket);
  });
});
