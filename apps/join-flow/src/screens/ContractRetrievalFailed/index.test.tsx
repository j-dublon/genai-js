import { render, screen } from "@testing-library/react";

import { ContractRetrievalFailed } from ".";

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
      "Whoops, that hasn't quite worked",
      "We're really sorry, but something's not right here. It could be a hiccup on our side, or you may have missed something when adding your details. Either way, our Customer Care team will be in touch to get it all straightened out so you can join Cuckoo.",
      "Or, if you'd rather call them up instead, you can reach them on 0330912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to5.30pm, weekends and bank holidays.",
    ];

    staticContent.forEach((content) => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
});
