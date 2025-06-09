import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SimpleNavBar } from "./index";

describe("SimpleNavBar", () => {
  const mockLogo = (
    <img
      alt="Mock Logo"
      width={130}
      height={50}
      src="/images/cuckoo.svg"
      className="min-w-[130px] min-h-[50px]"
    />
  );

  it("renders with defaults", () => {
    render(<SimpleNavBar />);

    const logo = screen.getByLabelText("Cuckoo Logo");
    expect(logo).toBeInTheDocument();
    expect(logo.parentElement).toHaveAttribute("href", "/");
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("ds:fixed");
    expect(header.firstChild).toHaveClass("ds:bg-core-white");
  });

  it("renders with different logo if provided", () => {
    render(<SimpleNavBar logo={mockLogo} />);

    const logo = screen.getByAltText("Mock Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders with children when provided", () => {
    const mockChildren = "Mock children";
    render(
      <SimpleNavBar logo={mockLogo}>
        <p>{mockChildren}</p>
      </SimpleNavBar>,
    );

    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it("renders without fixed class when fixed is false", () => {
    render(<SimpleNavBar fixed={false} />);

    const nav = screen.getByRole("banner");
    expect(nav).not.toHaveClass("ds:fixed");
  });

  it("renders with yellow background when backgroundColor is yellow", () => {
    render(<SimpleNavBar backgroundColor="yellow" />);

    const header = screen.getByRole("banner");
    expect(header.firstChild).toHaveClass("ds:bg-core-yellow");
  });
});
