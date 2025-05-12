import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EeroCard } from "./";

export const mockEeroProduct = {
  id: "eero-6-plus",
  name: "Eero Pro 6",
  heading: "Add 2 extra eeros to your plan",
  description: (
    <>
      3 eero routers will cover an area of approximately XXX square metres, and
      is perfect for really large homes, multiple floors and connection outside.
      Help me decide
    </>
  ),
  totalCount: 3,
  imageURL: "/images/x3_eeros.png",
  price: 14.0,
  isSelected: false,
};

const buttonText = {
  choose: "Add Eero",
  remove: "Remove Eero",
};

describe("EeroCard", () => {
  it("renders product heading, description, and image", () => {
    render(
      <EeroCard
        product={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
      />,
    );

    expect(screen.getByText(mockEeroProduct.heading)).toBeInTheDocument();

    const descriptionText = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "p" &&
        content.includes("3 eero routers will cover an area") &&
        content.includes("Help me decide")
      );
    });
    expect(descriptionText).toBeInTheDocument();

    expect(screen.getByAltText("Eero router image.")).toHaveAttribute(
      "src",
      mockEeroProduct.imageURL,
    );
  });

  it("renders correct price and count info", () => {
    render(
      <EeroCard
        product={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
      />,
    );

    expect(screen.getByText("Add 2 extra eeros")).toBeInTheDocument();
    expect(screen.getByText("+£14")).toBeInTheDocument();
    const paragraph = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "p" &&
        content.includes("You'll have") &&
        content.includes("eero routers")
      );
    });
    expect(paragraph).toBeInTheDocument();
  });

  it("renders 'choose' button when inactive", () => {
    render(
      <EeroCard
        product={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Add Eero/i }),
    ).toBeInTheDocument();
  });

  it("renders 'remove' button when active", () => {
    render(
      <EeroCard
        product={mockEeroProduct}
        isActive={true}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Remove Eero/i }),
    ).toBeInTheDocument();
  });

  it("calls handleSelectEero when button is clicked", () => {
    const handleSelectEero = vi.fn();

    render(
      <EeroCard
        product={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={handleSelectEero}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Eero/i }));
    expect(handleSelectEero).toHaveBeenCalledWith(mockEeroProduct);
  });
});
