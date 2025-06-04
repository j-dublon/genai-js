import { render, screen } from "@testing-library/react";

import { EeroImage } from "./EeroImage";

describe("EeroImage", () => {
  it("renders with C-900 package and yellow background", () => {
    render(<EeroImage packageName="C-900" />);

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("bg-core-yellow");
    expect(screen.getByAltText("eero router")).toBeInTheDocument();
    expect(screen.getByText("eero Pro 6E router included")).toBeInTheDocument();
  });

  it("renders with C-500 package and blue background", () => {
    render(<EeroImage packageName="C-500" />);

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("bg-secondary-blue");
  });

  it("renders with C-150 package and pink background", () => {
    render(<EeroImage packageName="C-150" />);

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("bg-secondary-pink");
  });

  it("renders with default blue background for unknown package", () => {
    render(<EeroImage packageName="unknown" />);

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("bg-secondary-blue");
  });
});
