import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EeroCardProps } from "@/components/EeroCard";

import EeroSelection from "./";

// Mocks
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@store/useJoinFlowStore", async () => {
  const actual = await vi.importActual<
    typeof import("@store/useJoinFlowStore")
  >("@store/useJoinFlowStore");
  return {
    ...actual,
    default: () => ({
      eeroSelection: null,
      setCurrentStep: vi.fn(),
    }),
    setState: vi.fn(),
  };
});

vi.mock("@/components/ReviewYourBasket", () => ({
  ReviewYourBasket: () => <div data-testid="review-basket">Review Basket</div>,
}));
vi.mock("@/components/Stepper", () => ({
  default: () => <div data-testid="stepper">Stepper</div>,
}));
vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));
vi.mock("@/components/EeroCard", () => ({
  EeroCard: ({ product, isActive, handleSelectEero }: EeroCardProps) => (
    <div data-testid={`eero-card-${product.id}`}>
      <button onClick={() => handleSelectEero(product)}>
        {isActive ? "Remove" : "Choose"} {product.name}
      </button>
    </div>
  ),
}));
vi.mock("@/validation/join-flow-schema", () => ({
  eeroSelectionSchema: {
    parse: vi.fn(),
  },
}));
vi.mock("./eeroSelectionProps", () => ({
  eeroPageContent: {
    title: "Eero Selection",
    description: "Choose your Eero setup",
    backButtonText: "Back",
  },
  eeroChooseProductButtonText: {
    choose: "Choose",
    remove: "Remove",
  },
  eeroContinueButtonText: {
    continueButtonText: "Continue",
    next: "Next",
  },
  eeroProducts: [
    {
      id: "eero-1",
      name: "Eero One",
      heading: "Basic Eero",
      imageURL: "",
      description: "One router.",
      totalCount: 1,
      price: 500,
      isSelected: false,
    },
    {
      id: "eero-2",
      name: "Eero Two",
      heading: "Advanced Eero",
      imageURL: "",
      description: "Two routers.",
      totalCount: 2,
      price: 1000,
      isSelected: false,
    },
  ],
}));

describe("EeroSelection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title and description", () => {
    render(<EeroSelection />);
    expect(screen.getByText("Eero Selection")).toBeInTheDocument();
    expect(screen.getByText("Choose your Eero setup")).toBeInTheDocument();
  });

  it("renders Eero cards", () => {
    render(<EeroSelection />);
    expect(screen.getByTestId("eero-card-eero-1")).toBeInTheDocument();
    expect(screen.getByTestId("eero-card-eero-2")).toBeInTheDocument();
  });

  it("selects and toggles eero product", () => {
    render(<EeroSelection />);

    const chooseButton = screen.getByText("Choose Eero One");
    fireEvent.click(chooseButton);
    // Clicking again should remove it
    const removeButton = screen.getByText("Remove Eero One");
    expect(removeButton).toBeInTheDocument();
  });
});
