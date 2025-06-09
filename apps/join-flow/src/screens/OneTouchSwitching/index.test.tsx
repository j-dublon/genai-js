import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createSwitchMatchLookup } from "@/services/helpers/createSwitchMatchLookup";
import { getAllProviders } from "@/services/helpers/getAllProviders";
import { updateBasket } from "@/services/helpers/updateBasket";

import { OneTouchSwitching } from "./index";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
const mockUseRouter = vi.mocked(useRouter);

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/services/helpers/getAllProviders", () => ({
  getAllProviders: vi.fn(),
}));
const mockGetAllProviders = vi.mocked(getAllProviders);

vi.mock("@/services/helpers/createSwitchMatchLookup", () => ({
  createSwitchMatchLookup: vi.fn(),
}));
const mockCreateSwitchMatchLookup = vi.mocked(createSwitchMatchLookup);

vi.mock("@/services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));
const mockUpdateBasket = vi.mocked(updateBasket);

vi.mock("@/components/Stepper", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/Footer", () => ({
  Footer: vi.fn(),
}));

describe("OneTouchSwitching", () => {
  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockStore = {
    setSwitchingDetails: vi.fn(),
    switchingDetails: null,
    setCurrentStep: vi.fn(),
    basket: {
      id: "test-basket-id",
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
  };

  const mockProviders = [
    {
      id: "provider1",
      name: "Provider 1",
      losingRcpid: "rcp1",
      isActive: true,
      cuckoo: { isInKraken: true },
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
    {
      id: "provider2",
      name: "Provider 2",
      losingRcpid: "rcp2",
      isActive: true,
      cuckoo: { isInKraken: true },
      updatedAt: "2024-01-01",
      createdAt: "2024-01-01",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseJoinFlowStore.mockReturnValue(mockStore);
    mockGetAllProviders.mockResolvedValue({ providers: mockProviders });
    mockCreateSwitchMatchLookup.mockResolvedValue({
      switchMatchLookup: "12345678",
    });
    mockUpdateBasket.mockResolvedValue({
      basket: {
        id: "test-basket-id",
        updatedAt: "2024-01-01",
        createdAt: "2024-01-01",
      },
    });
  });

  it("should render the component with initial state", async () => {
    render(<OneTouchSwitching />);

    // Wait for the async fetchProviders effect to complete
    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });

    expect(screen.getByText("Switching to Cuckoo")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We'll tell your current broadband provider that you're leaving them and joining us, so you won't have to. They'll let you know if there are any final charges from them. Find out more about one touch switching",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select your current broadband provider from the list"),
    ).toBeInTheDocument();
    expect(screen.getByText("Pick your provider")).toBeInTheDocument();
    expect(
      screen.getByText(
        "I'm the account holder and happy for Cuckoo to manage my switch",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Skip this step")).toBeInTheDocument();
    expect(screen.getByText("Match my details")).toBeInTheDocument();
  });

  it("should fetch providers on initial render", async () => {
    render(<OneTouchSwitching />);

    await waitFor(() => {
      expect(getAllProviders).toHaveBeenCalled();
    });
  });

  it("should handle provider fetch error", async () => {
    mockGetAllProviders.mockResolvedValue({
      error: {
        type: "networkError",
        message: "Failed to fetch",
        details: ["Network error occurred"],
      },
    });

    render(<OneTouchSwitching />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Sorry, an error occurred. Please try again later or skip this step.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("should handle form submission with valid account number", async () => {
    const user = userEvent.setup();
    const mockFirstAttemptFailedStore = {
      setSwitchingDetails: vi.fn(),
      switchingDetails: {
        otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
      },
      setCurrentStep: vi.fn(),
      basket: {
        id: "test-basket-id",
        updatedAt: "2024-01-01",
        createdAt: "2024-01-01",
      },
    };
    mockUseJoinFlowStore.mockReturnValue(mockFirstAttemptFailedStore);

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded into the dropdown
    await waitFor(() => {
      const providerSelect = screen.getByRole("combobox", { name: "provider" });
      expect(providerSelect).toHaveTextContent("Provider 1");
    });
    const providerSelect = screen.getByRole("combobox", { name: "provider" });
    await user.selectOptions(providerSelect, "rcp1");

    const checkbox = screen.getByRole("checkbox", {
      name: "I'm the account holder and happy for Cuckoo to manage my switch",
    });
    await user.click(checkbox);

    const accountNumberInput = screen.getByRole("textbox", {
      name: "accountNumber",
    });
    await user.type(accountNumberInput, "12345678");
    const submitButton = screen.getByRole("button", {
      name: "Match my details",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
    });
    expect(
      mockFirstAttemptFailedStore.setSwitchingDetails,
    ).toHaveBeenCalledWith({
      currentProvider: mockProviders[0],
      switchOrderReference: "12345678",
      otsSwitchStatus: "SWITCH_SUCCESS",
    });
    expect(mockFirstAttemptFailedStore.setCurrentStep).toHaveBeenCalledWith(3);
  });

  it("should handle form submission with invalid account number", async () => {
    const user = userEvent.setup();
    const mockFirstAttemptFailedStore = {
      setSwitchingDetails: vi.fn(),
      switchingDetails: {
        otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
      },
      setCurrentStep: vi.fn(),
      basket: {
        id: "test-basket-id",
        updatedAt: "2024-01-01",
        createdAt: "2024-01-01",
      },
    };
    mockUseJoinFlowStore.mockReturnValue(mockFirstAttemptFailedStore);
    mockCreateSwitchMatchLookup.mockResolvedValue({
      error: {
        type: "validationError",
        message: "Invalid account number",
        details: ["Account number not found"],
      },
    });

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded into the dropdown
    await waitFor(() => {
      const providerSelect = screen.getByRole("combobox", { name: "provider" });
      expect(providerSelect).toHaveTextContent("Provider 1");
    });
    const providerSelect = screen.getByRole("combobox", { name: "provider" });
    await user.selectOptions(providerSelect, "rcp1");

    const checkbox = screen.getByRole("checkbox", {
      name: "I'm the account holder and happy for Cuckoo to manage my switch",
    });
    await user.click(checkbox);

    const accountNumberInput = screen.getByRole("textbox", {
      name: "accountNumber",
    });
    await user.type(accountNumberInput, "11111111");
    const submitButton = screen.getByRole("button", {
      name: "Match my details",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
    });
    expect(
      mockFirstAttemptFailedStore.setSwitchingDetails,
    ).toHaveBeenCalledWith({
      otsSwitchStatus: "OTS_FAILED",
    });
    expect(mockFirstAttemptFailedStore.setCurrentStep).toHaveBeenCalledWith(3);
  });

  it("should handle skip button click", async () => {
    const user = userEvent.setup();
    render(<OneTouchSwitching />);

    const skipButton = screen.getByRole("button", { name: "Skip this step" });
    await user.click(skipButton);

    expect(mockStore.setSwitchingDetails).toHaveBeenCalledWith({
      otsSwitchStatus: "SKIPPED",
    });
    expect(mockStore.setCurrentStep).toHaveBeenCalledWith(3);
    expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/go-live-date");
  });

  it("should disable buttons during submission", async () => {
    const user = userEvent.setup();
    mockCreateSwitchMatchLookup.mockImplementation(
      () =>
        new Promise((resolve) => {
          // Delay the response to ensure we can check the disabled state
          setTimeout(() => {
            resolve({
              switchMatchLookup: "12345678",
            });
          }, 100);
        }),
    );

    render(<OneTouchSwitching />);

    // Wait for providers to be loaded into the dropdown
    await waitFor(() => {
      const providerSelect = screen.getByRole("combobox", { name: "provider" });
      expect(providerSelect).toHaveTextContent("Provider 1");
    });
    const providerSelect = screen.getByRole("combobox", { name: "provider" });
    await user.selectOptions(providerSelect, "rcp1");

    const checkbox = screen.getByRole("checkbox", {
      name: "I'm the account holder and happy for Cuckoo to manage my switch",
    });
    await user.click(checkbox);

    const skipButton = screen.getByRole("button", { name: "Skip this step" });
    const submitButton = screen.getByRole("button", {
      name: "Match my details",
    });
    await user.click(submitButton);

    // Check that buttons are disabled immediately after clicking
    expect(submitButton).toBeDisabled();
    expect(skipButton).toBeDisabled();

    // Wait for the submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(skipButton).not.toBeDisabled();
    });
  });
});
