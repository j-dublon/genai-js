import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SimpleNavBar } from "./index";

describe("SimpleNavBar", () => {
  const mockLogo = (
    <img
      alt="Cuckoo"
      width={130}
      height={50}
      src="/images/cuckoo.svg"
      className="min-w-[130px] min-h-[50px]"
    />
  );

  it("renders with required props", () => {
    render(<SimpleNavBar logo={mockLogo} />);

    const logo = screen.getByAltText("Cuckoo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/cuckoo.svg");
    expect(logo.parentElement).toHaveAttribute("href", "/");

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders with info text when provided", () => {
    const infoText = "Mock info text";
    render(<SimpleNavBar logo={mockLogo} infoText={infoText} />);

    const infoButton = screen.getByRole("button", { name: infoText });
    expect(infoButton).toBeInTheDocument();
  });

  it("renders with additional info text when provided", () => {
    const additionalInfoText = "Mock additional info text";
    render(
      <SimpleNavBar logo={mockLogo} additionalInfoText={additionalInfoText} />,
    );

    expect(screen.getByText(additionalInfoText)).toBeInTheDocument();
  });

  it("calls onInfoClick when the info button is clicked", () => {
    const handleInfoClick = vi.fn();
    const infoText = "Click me";
    render(
      <SimpleNavBar
        logo={mockLogo}
        infoText={infoText}
        onInfoClick={handleInfoClick}
      />,
    );

    const infoButton = screen.getByText(infoText);
    fireEvent.click(infoButton);

    expect(handleInfoClick).toHaveBeenCalledTimes(1);
  });
});
