import { render, screen } from "@testing-library/react";

import { SectionHeading } from ".";

describe("Section Heading Component", () => {
  const props = { headingText: "Test heading" };

  it("renders the SectionHeading with custom text", () => {
    render(<SectionHeading {...props} />);

    const heading = screen.getByRole("heading", { name: /test heading/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test heading");
  });
});
