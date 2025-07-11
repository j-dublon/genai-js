import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { PaymentDocuments } from ".";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("PaymentDocuments", async () => {
  const title = "Your cuckoo documents";
  const disclaimer = "Please read and download before joining cuckoo";
  const items = [
    { text: "Contract Summary", href: "https://s3.cuckoo.summary" },
    { text: "Contract Information", href: "https://s3.cuckoo.information" },
    { text: "Terms & Conditions", href: "https://s3.cuckoo.tacs" },
    { text: "Privacy Notice", href: "https://s3.cuckoo.privacy" },
  ];
  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRouter,
    );
  });

  it("renders static content", () => {
    render(
      <PaymentDocuments title={title} disclaimer={disclaimer} items={items} />,
    );

    const expectedContent = [title, disclaimer];
    items.forEach((item) => {
      expectedContent.push(item.text);
    });

    expectedContent.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("redirects the user to the cics error page if the links are invalid or empty", () => {
    render(
      <PaymentDocuments
        title={title}
        disclaimer={disclaimer}
        items={[
          { text: "Contract Summary", href: "/" },
          { text: "Contract Information", href: "/" },
          { text: "Terms & Conditions", href: "https://s3.cuckoo.tacs" },
          { text: "Privacy Notice", href: "https://s3.cuckoo.privacy" },
        ]}
      />,
    );

    expect(mockRouter.push).toHaveBeenCalledWith(
      "/join-flow/payment-details/contract-retrieval-failed",
    );
  });
});
