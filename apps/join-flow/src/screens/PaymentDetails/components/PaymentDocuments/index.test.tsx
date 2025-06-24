import { render, screen } from "@testing-library/react";

import { PaymentDocuments } from ".";

describe("PaymentDocuments", async () => {
  it("renders static content", () => {
    const title = "Your cuckoo documents";
    const disclaimer = "Please read and download before joining cuckoo";
    const items = [
      { text: "Contract Summary", href: "https://s3.cuckoo.summary" },
      { text: "Contract Information", href: "https://s3.cuckoo.information" },
      { text: "Terms & Conditions", href: "https://s3.cuckoo.tacs" },
      { text: "Privacy Notice", href: "https://s3.cuckoo.privacy" },
    ];

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
});
