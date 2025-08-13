import useJoinFlowStore from "@store/useJoinFlowStore";
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EeroCardProps } from "@/screens/EeroSelection/components/EeroCard";
import { updateBasket } from "@/services/helpers/updateBasket";

import EeroSelection from "./";

// Mocks
vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

vi.mock("@store/useJoinFlowStore", async () => ({
  default: vi.fn(),
}));
const mockJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/components/StepNavigationWithBasket", () => ({
  StepNavigationWithBasket: () => <div data-testid="stepper">Stepper</div>,
}));
vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));
vi.mock("./components/EeroCard", () => ({
  EeroCard: ({
    eero,
    isActive,
    handleSelectEero,
    helpButton,
  }: EeroCardProps) => (
    <div data-testid={`eero-card-${eero.selectionIdentifier}`}>
      <button onClick={() => handleSelectEero(eero)}>
        {isActive ? "Remove" : "Choose"} {eero.heading}
      </button>
      <button onClick={helpButton.onHelpClick}>{helpButton.buttonText}</button>
    </div>
  ),
}));
vi.mock("@/validation/join-flow-schema", () => ({
  eeroSelectionSchema: {
    parse: vi.fn(),
  },
}));

vi.mock("@/hooks/useLoadingModal", () => ({
  useLoadingModal: vi.fn().mockReturnValue({
    loadingModalRef: vi.fn(),
    slidesWithAssetPath: [
      {
        src: "/images/world-animated.gif",
        message: "Sit tight! We're checking out your area",
      },
    ],
  }),
}));

vi.mock("./eeroSelectionProps", () => ({
  eeroPageContent: {
    title: "Eero Selection",
    description: ["Choose your Eero setup"],
    backButtonText: "Back",
    linkText: "Eero setup",
    infoModalTitle: "TrueMesh explained",
    infoModalSubtitle: "infoModal subtitle",
    infoModalContent: [
      "infoModal content 1",
      "infoModal content 2",
      "infoModal content 3",
    ],
    infoModalImage: "/images/true-mesh.svg",
    modalButtonText: "Okay, got it",
    helpButtonText: "Help me decide",
    helpModalTitle: "Help me decide",
    helpModalSubtitle: "Help modal subtitle.",
    helpModalContent: [
      {
        subtitle: "Help modal description subtitle.",
        description: "Help modal description.",
      },
    ],
    helpModalTipCardText: "Help modal tip card text.",
  },
  eeroChooseProductButtonText: {
    choose: "Choose",
    remove: "Remove",
  },
  eeroContinueButtonText: {
    continueButtonText: "Continue",
    next: "Next",
  },
  eeroProducts: [],
  slides: [
    {
      src: "/images/world-animated.gif",
      message: "Sit tight! We're checking out your area",
    },
    {
      src: "/images/sunglasses-animated.gif",
      message: "Oooh, some lovely parts round where you live",
    },
    {
      src: "/images/rocket-animated.gif",
      message: "Just putting all your eggs in one broadband basket",
    },
  ],
}));

vi.mock("@/lib/createEeroOptions", () => ({
  createEeroOptions: vi.fn().mockReturnValue([
    {
      code: "EERO_MESH_ROUTER_X0",
      family: "mesh_routers",
      selectionIdentifier: "default",
      price: 0,
      heading: "Included eero",
      imageURL: "",
      description: "One router.",
      totalCount: 1,
    },
    {
      code: "EERO_MESH_ROUTER_X1",
      family: "mesh_routers",
      selectionIdentifier: "0",
      price: 700,
      heading: "One extra Eero",
      imageURL: "",
      description: "Two routers.",
      totalCount: 2,
    },
    {
      code: "EERO_MESH_ROUTER_X2",
      family: "mesh_routers",
      selectionIdentifier: "1",
      price: 1400,
      heading: "Two extra Eeros",
      imageURL: "",
      description: "Three routers.",
      totalCount: 3,
    },
    {
      code: "EERO_MESH_ROUTER_X3",
      family: "mesh_routers",
      selectionIdentifier: "2",
      price: 2100,
      heading: "Three extra Eeros",
      imageURL: "",
      description: "Four routers.",
      totalCount: 4,
    },
  ]),
}));

vi.mock("@/services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));
const mockUpdateBasket = vi.mocked(updateBasket);

vi.mock("@/hooks/useLoadingModal", () => ({
  useLoadingModal: vi.fn().mockReturnValue({
    loadingModalRef: vi.fn(),
    slidesWithAssetPath: [
      {
        src: "/images/world-animated.gif",
        message: "Sit tight! We're checking out your area",
      },
    ],
  }),
}));

describe("EeroSelection", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockJoinFlowStore.mockReturnValue({
      eeroSelection: null,
      setCurrentStep: vi.fn(),
      selectEeroProduct: vi.fn(),
      isLoadingModalOpen: false,
      setIsLoadingModalOpen: vi.fn(),
      setErrorInfo: vi.fn(),
    });
    mockUpdateBasket.mockResolvedValue({
      basket: {
        id: "test-basket-id",
        updatedAt: "2024-01-01",
        createdAt: "2024-01-01",
      },
    });
  });

  it("renders title and description", () => {
    render(<EeroSelection />);

    expect(screen.getByText("Eero Selection")).toBeInTheDocument();
    expect(screen.getByText("Choose your")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Eero setup" }),
    ).toBeInTheDocument();
  });

  it("attempts to open the info modal when clicking the link text, and renders the correct content", async () => {
    const user = userEvent.setup();
    render(<EeroSelection />);
    const linkText = screen.getByRole("button", { name: "Eero setup" });
    await user.click(linkText);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    [
      "TrueMesh explained",
      "infoModal subtitle",
      "infoModal content 1",
      "infoModal content 2",
      "infoModal content 3",
      "Okay, got it",
    ].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("attempts to open the help modal when clicking the help button, and renders the correct content", async () => {
    const user = userEvent.setup();
    render(<EeroSelection />);
    const helpButton = screen.getAllByRole("button", {
      name: "Help me decide",
    });
    await user.click(helpButton[0]);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    [
      "Help modal subtitle.",
      "Help modal description subtitle.",
      "Help modal description.",
      "Help modal tip card text.",
    ].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("renders Eero cards for extra eero options", () => {
    render(<EeroSelection />);

    expect(screen.getByTestId("eero-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("eero-card-2")).toBeInTheDocument();
  });

  it("selects and toggles eero product", async () => {
    const user = userEvent.setup();
    render(<EeroSelection />);

    const chooseButton = screen.getByText("Choose One extra Eero");
    await user.click(chooseButton);
    const removeButton = screen.getByText("Remove One extra Eero");

    expect(removeButton).toBeInTheDocument();
  });

  it("renders the toast message pill", () => {
    render(<EeroSelection />);
    expect(screen.getByText("Your info has been saved")).toBeInTheDocument();
  });

  it("hides the toast message pill after 10 seconds", async () => {
    vi.useFakeTimers();
    render(<EeroSelection />);

    await act(async () => {
      vi.advanceTimersByTime(10000);
    });

    expect(
      screen.queryByText("Your info has been saved"),
    ).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  describe("updating the basket", () => {
    it("shouldn't call update basket API if eero is already in basket", async () => {
      const user = userEvent.setup();
      mockJoinFlowStore.mockReturnValue({
        basket: {
          product: {
            extras: [
              {
                selectionIdentifier: "0",
              },
            ],
          },
        },
        setCurrentStep: vi.fn(),
        selectEeroProduct: vi.fn(),
        isLoadingModalOpen: false,
        setIsLoadingModalOpen: vi.fn(),
      });
      render(<EeroSelection />);

      const chooseButton = screen.getByRole("button", {
        name: "Choose One extra Eero",
      });
      await user.click(chooseButton);

      const continueButton = screen.getByRole("button", { name: "Next" });
      await user.click(continueButton);

      expect(mockUpdateBasket).not.toHaveBeenCalled();
    });

    it("shouldn't call update basket API if no additional eero is selected and no extras in basket", async () => {
      const user = userEvent.setup();
      mockJoinFlowStore.mockReturnValue({
        basket: {
          product: {
            extras: [],
          },
        },
        setCurrentStep: vi.fn(),
        selectEeroProduct: vi.fn(),
        isLoadingModalOpen: false,
        setIsLoadingModalOpen: vi.fn(),
      });
      render(<EeroSelection />);

      const continueButton = screen.getByRole("button", { name: "Continue" });
      await user.click(continueButton);

      expect(mockUpdateBasket).not.toHaveBeenCalled();
    });

    it("should call update basket API if no additional eero is selected and extras in basket", async () => {
      const user = userEvent.setup();
      mockJoinFlowStore.mockReturnValue({
        basket: {
          product: {
            extras: [
              {
                selectionIdentifier: "2",
              },
            ],
          },
        },
        setCurrentStep: vi.fn(),
        selectEeroProduct: vi.fn(),
        setBasket: vi.fn(),
        isLoadingModalOpen: false,
        setIsLoadingModalOpen: vi.fn(),
      });
      render(<EeroSelection />);

      const continueButton = screen.getByRole("button", { name: "Continue" });
      await user.click(continueButton);

      expect(mockUpdateBasket).toHaveBeenCalled();
    });

    it("should call update basket API if additional eero is selected that is not in basket", async () => {
      const user = userEvent.setup();
      mockJoinFlowStore.mockReturnValue({
        basket: {
          product: {
            extras: [
              {
                selectionIdentifier: "2",
              },
            ],
          },
        },
        setCurrentStep: vi.fn(),
        selectEeroProduct: vi.fn(),
        setBasket: vi.fn(),
        isLoadingModalOpen: false,
        setIsLoadingModalOpen: vi.fn(),
      });
      render(<EeroSelection />);

      const chooseButton = screen.getByRole("button", {
        name: "Choose Two extra Eeros",
      });
      await user.click(chooseButton);

      const continueButton = screen.getByRole("button", { name: "Next" });
      await user.click(continueButton);

      expect(mockUpdateBasket).toHaveBeenCalled();
    });
  });

  it("should open the loading modal when clicking continue button", async () => {
    const user = userEvent.setup();
    const mockSetIsLoadingModalOpen = vi.fn();
    mockJoinFlowStore.mockReturnValue({
      basket: {
        product: {
          extras: [
            {
              selectionIdentifier: "0",
            },
          ],
        },
      },
      setCurrentStep: vi.fn(),
      selectEeroProduct: vi.fn(),
      setBasket: vi.fn(),
      isLoadingModalOpen: false,
      setIsLoadingModalOpen: mockSetIsLoadingModalOpen,
    });
    render(<EeroSelection />);

    const chooseButton = screen.getByRole("button", {
      name: "Choose Two extra Eeros",
    });
    await user.click(chooseButton);

    const continueButton = screen.getByRole("button", { name: "Next" });
    await user.click(continueButton);

    expect(mockSetIsLoadingModalOpen).toHaveBeenCalledWith(true);
  });
});
