import { render, screen } from "@testing-library/react";

import { Heading } from ".";

describe("Heading Component", () => {
  const props = { headingText: "Test heading" };

  it("renders the Heading with custom text", () => {
    render(<Heading {...props} />);

    const heading = screen.getByRole("heading", { name: /test heading/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test heading");
  });
});
