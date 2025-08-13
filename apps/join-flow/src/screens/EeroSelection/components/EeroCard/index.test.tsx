import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EeroCard } from ".";

export const mockEeroProduct = {
  code: "EERO_MESH_ROUTER_X3",
  family: "mesh_routers",
  selectionIdentifier: "0",
  heading: "Add 2 extra eeros to your plan",
  description: "Mocked description",
  totalCount: 3,
  imageURL: "/images/x3_eeros.png",
  price: 2100,
};

const buttonText = {
  choose: "Add Eero",
  remove: "Remove Eero",
};

describe("EeroCard", () => {
  it("renders product heading, description, and image", () => {
    render(
      <EeroCard
        eero={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
        helpButton={{
          onHelpClick: vi.fn(),
          buttonText: "Help me decide",
        }}
      />,
    );

    expect(screen.getByText(mockEeroProduct.heading)).toBeInTheDocument();

    expect(screen.getByText("Mocked description")).toBeInTheDocument();
    expect(screen.getByAltText("Eero router image.")).toHaveAttribute(
      "src",
      mockEeroProduct.imageURL,
    );
  });

  it("renders correct price and count info", () => {
    render(
      <EeroCard
        eero={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
        helpButton={{
          onHelpClick: vi.fn(),
          buttonText: "Help me decide",
        }}
      />,
    );

    expect(screen.getByText("Add 2 extra eeros")).toBeInTheDocument();
    expect(screen.getByText("+£21")).toBeInTheDocument();
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
        eero={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
        helpButton={{
          onHelpClick: vi.fn(),
          buttonText: "Help me decide",
        }}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Add Eero/i }),
    ).toBeInTheDocument();
  });

  it("renders 'remove' button when active", () => {
    render(
      <EeroCard
        eero={mockEeroProduct}
        isActive={true}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
        helpButton={{
          onHelpClick: vi.fn(),
          buttonText: "Help me decide",
        }}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Remove Eero/i }),
    ).toBeInTheDocument();
  });

  it("calls handleSelectEero when button is clicked", async () => {
    const user = userEvent.setup();
    const handleSelectEero = vi.fn();

    render(
      <EeroCard
        eero={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={handleSelectEero}
        helpButton={{
          onHelpClick: vi.fn(),
          buttonText: "Help me decide",
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Add Eero/i }));
    expect(handleSelectEero).toHaveBeenCalledWith(mockEeroProduct);
  });

  it("calls onHelpClick when help button is clicked", async () => {
    const user = userEvent.setup();
    const onHelpClick = vi.fn();
    render(
      <EeroCard
        eero={mockEeroProduct}
        isActive={false}
        eeroChooseProductButtonText={buttonText}
        handleSelectEero={vi.fn()}
        helpButton={{ onHelpClick, buttonText: "Help me decide" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Help me decide/i }));
    expect(onHelpClick).toHaveBeenCalled();
  });
});
