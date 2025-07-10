import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { EeroOption } from "@/lib/createEeroOptions";
import { getCICS } from "@/services/helpers/getCICS";
import { updateBasket } from "@/services/helpers/updateBasket";
import useJoinFlowStore, { type EeroProduct } from "@/store/useJoinFlowStore";

import { EeroInfo } from "./EeroInfo";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));
const mockUpdateBasket = vi.mocked(updateBasket);

vi.mock("@/services/helpers/getCICS", () => ({
  getCICS: vi.fn(),
}));
const mockGetCICS = vi.mocked(getCICS);

const mockEeroSelection: EeroProduct = {
  code: "EERO_MESH_ROUTER_X2",
  family: "mesh_routers",
  selectionIdentifier: "2",
  price: 1000,
};

const mockEeroProducts: EeroOption[] = [
  {
    code: "EERO_MESH_ROUTER_X1",
    family: "mesh_routers",
    selectionIdentifier: "1",
    price: 0,
    heading: "No additional Eero needed",
    description: "Just one eero provided by us.",
    imageURL: "/images/x1_eeros.png",
    totalCount: 1,
  },
  {
    code: "EERO_MESH_ROUTER_X2",
    family: "mesh_routers",
    selectionIdentifier: "2",
    price: 1000,
    heading: "Add one extra eero to your plan",
    description:
      "2 eeros will cover an area of approximately XXX square metres.",
    imageURL: "/images/x2_eeros.png",
    totalCount: 2,
  },
  {
    code: "EERO_MESH_ROUTER_X3",
    family: "mesh_routers",
    selectionIdentifier: "3",
    price: 2000,
    heading: "Add 2 extra eeros to your plan",
    description:
      "3 eero routers will cover an area of approximately XXX square metres.",
    imageURL: "/images/x3_eeros.png",
    totalCount: 3,
  },
];

const mockEeroInfoText = {
  title: "Your mesh network",
  addMoreEeros: "Add more eeros",
  removeEeros: "Remove eeros",
};

const mockBasket = {
  id: "basket-123",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const defaultProps = {
  eeroSelection: mockEeroSelection,
  monthlyEeroPrice: 10,
  eeroProducts: mockEeroProducts,
  eeroInfoText: mockEeroInfoText,
};

describe("EeroInfo", () => {
  const mockSelectEeroProduct = vi.fn();
  const mockSetBasket = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn();

    mockUseJoinFlowStore.mockReturnValue({
      selectEeroProduct: mockSelectEeroProduct,
      basket: mockBasket,
      setBasket: mockSetBasket,
    } as ReturnType<typeof useJoinFlowStore>);

    mockUpdateBasket.mockResolvedValue({
      basket: { ...mockBasket, updatedAt: "2024-01-01T01:00:00Z" },
    });

    mockGetCICS.mockResolvedValue({
      success: true,
      data: {
        contractInformation: "https://s3.cuckoo.co/contractInformation",
        contractSummary: "https://s3.cuckoo.co/contractSummary",
      },
    });
  });

  describe("rendering", () => {
    it("should render the title and eero count", () => {
      render(<EeroInfo {...defaultProps} />);

      expect(screen.getByText("Your mesh network")).toBeInTheDocument();
      expect(
        screen.getByText("You've got 2x eero routers"),
      ).toBeInTheDocument();
    });

    it("should render singular form for 1 eero", () => {
      const singleEeroSelection = {
        ...mockEeroSelection,
        code: "EERO_MESH_ROUTER_X1",
      };
      render(
        <EeroInfo {...defaultProps} eeroSelection={singleEeroSelection} />,
      );

      expect(screen.getByText("You've got 1x eero router")).toBeInTheDocument();
    });

    it("should render the eero image when imageURL is available", () => {
      render(<EeroInfo {...defaultProps} />);

      const image = screen.getByAltText("Add one extra eero to your plan");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/images/x2_eeros.png");
    });

    it("should render the eero description", () => {
      render(<EeroInfo {...defaultProps} />);

      expect(
        screen.getByText(
          "2 eeros will cover an area of approximately XXX square metres.",
        ),
      ).toBeInTheDocument();
    });

    it("should render monthly price when eero has a price", () => {
      render(<EeroInfo {...defaultProps} />);

      expect(screen.getByText("+£10")).toBeInTheDocument();
      expect(screen.getByText("/month extra")).toBeInTheDocument();
    });

    it("should not render monthly price when eero price is 0", () => {
      const freeEeroSelection = { ...mockEeroSelection, price: 0 };
      render(<EeroInfo {...defaultProps} eeroSelection={freeEeroSelection} />);

      expect(screen.queryByText("/month extra")).not.toBeInTheDocument();
    });

    it("should render add more eeros button when not at maximum", () => {
      render(<EeroInfo {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: "Add more eeros" }),
      ).toBeInTheDocument();
    });

    it("should render remove eeros button when not at minimum", () => {
      render(<EeroInfo {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: "Remove eeros" }),
      ).toBeInTheDocument();
    });

    it("should not render add more eeros button when at maximum", () => {
      const maxEeroSelection = {
        ...mockEeroSelection,
        code: "EERO_MESH_ROUTER_X3",
      };
      render(<EeroInfo {...defaultProps} eeroSelection={maxEeroSelection} />);

      expect(
        screen.queryByTestId("pill-button-Add more eeros"),
      ).not.toBeInTheDocument();
    });

    it("should not render remove eeros button when at minimum", () => {
      const minEeroSelection = {
        ...mockEeroSelection,
        code: "EERO_MESH_ROUTER_X1",
      };
      render(<EeroInfo {...defaultProps} eeroSelection={minEeroSelection} />);

      expect(
        screen.queryByTestId("pill-button-Remove eeros"),
      ).not.toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should handle increasing eeros successfully", async () => {
      const user = userEvent.setup();
      render(<EeroInfo {...defaultProps} />);

      const addButton = screen.getByRole("button", { name: "Add more eeros" });
      await user.click(addButton);

      await waitFor(() => {
        expect(mockUpdateBasket).toHaveBeenCalledWith("basket-123", {
          product: {
            extras: [
              {
                family: "mesh_routers",
                selectionIdentifier: "3",
              },
            ],
          },
        });
      });

      expect(mockSetBasket).toHaveBeenCalledWith({
        ...mockBasket,
        updatedAt: "2024-01-01T01:00:00Z",
        cics: {
          informationHref: "https://s3.cuckoo.co/contractInformation",
          summaryHref: "https://s3.cuckoo.co/contractSummary",
        },
      });
      expect(mockSelectEeroProduct).toHaveBeenCalledWith(mockEeroProducts[2]);
    });

    it("should handle decreasing eeros successfully", async () => {
      const user = userEvent.setup();
      render(<EeroInfo {...defaultProps} />);

      const removeButton = screen.getByRole("button", { name: "Remove eeros" });
      await user.click(removeButton);

      await waitFor(() => {
        expect(mockUpdateBasket).toHaveBeenCalledWith("basket-123", {
          product: {
            extras: [
              {
                family: "mesh_routers",
                selectionIdentifier: "1",
              },
            ],
          },
        });
      });

      expect(mockSetBasket).toHaveBeenCalledWith({
        ...mockBasket,
        updatedAt: "2024-01-01T01:00:00Z",
        cics: {
          informationHref: "https://s3.cuckoo.co/contractInformation",
          summaryHref: "https://s3.cuckoo.co/contractSummary",
        },
      });
      expect(mockSelectEeroProduct).toHaveBeenCalledWith(mockEeroProducts[0]);
    });

    it("should not call selectEeroProduct when updateBasket fails", async () => {
      const user = userEvent.setup();
      mockUpdateBasket.mockResolvedValue({
        error: {
          type: "networkError",
          message: "Server error",
          details: ["Status: 500"],
        },
      });

      render(<EeroInfo {...defaultProps} />);

      const addButton = screen.getByRole("button", { name: "Add more eeros" });
      await user.click(addButton);

      await waitFor(() => {
        expect(mockUpdateBasket).toHaveBeenCalled();
      });

      expect(mockSelectEeroProduct).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith("Error updating basket:", {
        type: "networkError",
        message: "Server error",
        details: ["Status: 500"],
      });
    });

    it("should not call selectEeroProduct when updateBasket throws an error", async () => {
      const user = userEvent.setup();
      mockUpdateBasket.mockRejectedValue(new Error("Network error"));

      render(<EeroInfo {...defaultProps} />);

      const addButton = screen.getByRole("button", { name: "Add more eeros" });
      await user.click(addButton);

      await waitFor(() => {
        expect(mockUpdateBasket).toHaveBeenCalled();
      });

      expect(mockSelectEeroProduct).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        "Unexpected error updating basket:",
        expect.any(Error),
      );
    });

    it("should not call selectEeroProduct when no basket ID is available", async () => {
      const user = userEvent.setup();
      mockUseJoinFlowStore.mockReturnValue({
        selectEeroProduct: mockSelectEeroProduct,
        basket: null,
        setBasket: mockSetBasket,
      } as ReturnType<typeof useJoinFlowStore>);

      render(<EeroInfo {...defaultProps} />);

      const addButton = screen.getByRole("button", { name: "Add more eeros" });
      await user.click(addButton);

      expect(mockUpdateBasket).not.toHaveBeenCalled();
      expect(mockSelectEeroProduct).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith("No basket ID found");
    });
  });
});
