import { render, screen } from "@testing-library/react";

import { ContractRetrievalFailed } from ".";
import { ContractRetrievalFailedProps } from "./ContractRetrievalFailedProps";

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    useTrustpilotScore: () => ({
      data: {
        trustScore: 4.8,
        numberOfReviews: 1234,
      },
      isLoading: false,
      error: null,
    }),
  };
});

describe("ContractRetrievalFailed", () => {
  it("renders the correct content on the error page", () => {
    render(<ContractRetrievalFailed />);

    const staticContent = [
      ContractRetrievalFailedProps.heading,
      ContractRetrievalFailedProps.paragraphs[0],
      ContractRetrievalFailedProps.paragraphs[1],
    ];

    staticContent.forEach((content) => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
});
